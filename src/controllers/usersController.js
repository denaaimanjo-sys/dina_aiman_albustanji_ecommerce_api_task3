const pool = require("../config/database");

async function getUsers(req, res, next) {
  try {
    const result = await pool.query(
      `SELECT id, full_name, email, phone, role, is_active, created_at
       FROM users
       ORDER BY id`
    );

    res.status(200).json({
      success: true,
      count: result.rowCount,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "User ID must be a positive integer"
      });
    }

    const result = await pool.query(
      `SELECT id, full_name, email, phone, role, is_active, created_at
       FROM users
       WHERE id = $1`,
      [id]
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

async function createUser(req, res, next) {
  try {
    const {
      full_name,
      email,
      phone,
      role
    } = req.body;

    if (
      !full_name ||
      !full_name.trim() ||
      !email ||
      !email.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Full name and email are required"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const userRole = role || "customer";

    if (!["customer", "admin"].includes(userRole)) {
      return res.status(400).json({
        success: false,
        message: "Role must be customer or admin"
      });
    }

    const result = await pool.query(
      `INSERT INTO users
       (full_name, email, phone, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, full_name, email, phone, role, is_active, created_at`,
      [
        full_name.trim(),
        normalizedEmail,
        phone ? phone.trim() : null,
        userRole
      ]
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result.rows[0]
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    next(error);
  }
}

async function updateUserStatus(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { is_active } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "User ID must be a positive integer"
      });
    }

    if (typeof is_active !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "is_active must be true or false"
      });
    }

    const result = await pool.query(
      `UPDATE users
       SET is_active = $1
       WHERE id = $2
       RETURNING id, full_name, email, phone, role, is_active, created_at`,
      [is_active, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserStatus
};