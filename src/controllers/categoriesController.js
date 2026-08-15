const pool = require("../config/database");

async function getCategories(req, res, next) {
  try {
    const result = await pool.query(
      "SELECT * FROM categories ORDER BY id"
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

async function getCategoryById(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Category ID must be a positive integer"
      });
    }

    const result = await pool.query(
      "SELECT * FROM categories WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
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

async function createCategory(req, res, next) {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required"
      });
    }

    const result = await pool.query(
      `INSERT INTO categories (name, description)
       VALUES ($1, $2)
       RETURNING *`,
      [name.trim(), description ? description.trim() : null]
    );

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result.rows[0]
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Category name already exists"
      });
    }

    next(error);
  }
}

async function updateCategory(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { name, description, is_active } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Category ID must be a positive integer"
      });
    }

    if (!name || !name.trim() || typeof is_active !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Name and valid active status are required"
      });
    }

    const result = await pool.query(
      `UPDATE categories
       SET name = $1,
           description = $2,
           is_active = $3
       WHERE id = $4
       RETURNING *`,
      [
        name.trim(),
        description ? description.trim() : null,
        is_active,
        id
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result.rows[0]
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Category name already exists"
      });
    }

    next(error);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Category ID must be a positive integer"
      });
    }

    const result = await pool.query(
      "DELETE FROM categories WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: result.rows[0]
    });
  } catch (error) {
    if (error.code === "23503") {
      return res.status(409).json({
        success: false,
        message: "Category cannot be deleted because it contains products"
      });
    }

    next(error);
  }
}

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};