const pool = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logSecurityEvent = require("../middleware/securityLogger");

async function register(req, res, next) {
  try {
    const { full_name, email, password } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [normalizedEmail]
    );

    if (existingUser.rowCount > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `INSERT INTO users
       (full_name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, full_name, email, phone, role, is_active, created_at`,
      [
        full_name.trim(),
        normalizedEmail,
        passwordHash,
        "customer"
      ]
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    const result = await pool.query(
      `SELECT id, full_name, email, password_hash, role, is_active
       FROM users
       WHERE email = $1`,
      [normalizedEmail]
    );

    if (result.rowCount === 0) {
      logSecurityEvent("LOGIN_FAILED", req);

      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const user = result.rows[0];

    if (!user.is_active) {
      logSecurityEvent("LOGIN_INACTIVE_ACCOUNT", req, user.id);

      return res.status(401).json({
        success: false,
        message: "Account is inactive"
      });
    }

    if (!user.password_hash) {
      logSecurityEvent("LOGIN_FAILED", req, user.id);

      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      logSecurityEvent("LOGIN_FAILED", req, user.id);

      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });
  } catch (error) {
    next(error);
  }
}

async function me(req, res, next) {
  try {
    const result = await pool.query(
      `SELECT id, full_name, email, phone, role, is_active, created_at
       FROM users
       WHERE id = $1`,
      [req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  me
};