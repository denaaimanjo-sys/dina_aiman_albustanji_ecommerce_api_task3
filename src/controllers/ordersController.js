const pool = require("../config/database");

async function getOrders(req, res, next) {
  try {
    let result;

    if (req.user.role === "admin") {
      result = await pool.query(
        `SELECT id, user_id, status, total_amount, shipping_address, notes, created_at, updated_at
         FROM orders
         ORDER BY id DESC`
      );
    } else {
      result = await pool.query(
        `SELECT id, user_id, status, total_amount, shipping_address, notes, created_at, updated_at
         FROM orders
         WHERE user_id = $1
         ORDER BY id DESC`,
        [req.user.id]
      );
    }

    res.status(200).json({
      success: true,
      count: result.rowCount,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
}

async function getOrderById(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Order ID must be a positive integer"
      });
    }

    let result;

    if (req.user.role === "admin") {
      result = await pool.query(
        `SELECT id, user_id, status, total_amount, shipping_address, notes, created_at, updated_at
         FROM orders
         WHERE id = $1`,
        [id]
      );
    } else {
      result = await pool.query(
        `SELECT id, user_id, status, total_amount, shipping_address, notes, created_at, updated_at
         FROM orders
         WHERE id = $1 AND user_id = $2`,
        [id, req.user.id]
      );
    }

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
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
  getOrders,
  getOrderById
};