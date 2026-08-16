const pool = require("../config/database");

async function getProducts(req, res, next) {
  try {
    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim()
        : "";

    if (search.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Search text is too long"
      });
    }

    let result;

    if (search) {
      result = await pool.query(
        `SELECT *
         FROM products
         WHERE name ILIKE $1
            OR description ILIKE $1
            OR sku ILIKE $1
         ORDER BY id`,
        [`%${search}%`]
      );
    } else {
      result = await pool.query(
        "SELECT * FROM products ORDER BY id"
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

async function getProductById(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product ID must be a positive integer"
      });
    }

    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
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

async function createProduct(req, res, next) {
  try {
    const {
      category_id,
      name,
      description,
      price,
      stock_quantity,
      sku
    } = req.body;

    if (
      category_id === undefined ||
      typeof name !== "string" ||
      !name.trim() ||
      price === undefined ||
      stock_quantity === undefined ||
      typeof sku !== "string" ||
      !sku.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Category, name, price, stock quantity, and SKU are required"
      });
    }

    const categoryId = Number(category_id);
    const productPrice = Number(price);
    const stockQuantity = Number(stock_quantity);

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Category ID must be a positive integer"
      });
    }

    if (!Number.isFinite(productPrice) || productPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than zero"
      });
    }

    if (!Number.isInteger(stockQuantity) || stockQuantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock quantity cannot be negative"
      });
    }

    const productDescription =
      typeof description === "string" && description.trim()
        ? description.trim()
        : null;

    const result = await pool.query(
      `INSERT INTO products
       (category_id, name, description, price, stock_quantity, sku)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        categoryId,
        name.trim(),
        productDescription,
        productPrice,
        stockQuantity,
        sku.trim()
      ]
    );

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: result.rows[0]
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "SKU already exists"
      });
    }

    if (error.code === "23503") {
      return res.status(400).json({
        success: false,
        message: "Category does not exist"
      });
    }

    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product ID must be a positive integer"
      });
    }

    const {
      category_id,
      name,
      description,
      price,
      stock_quantity,
      sku,
      is_active
    } = req.body;

    if (
      category_id === undefined ||
      typeof name !== "string" ||
      !name.trim() ||
      price === undefined ||
      stock_quantity === undefined ||
      typeof sku !== "string" ||
      !sku.trim() ||
      typeof is_active !== "boolean"
    ) {
      return res.status(400).json({
        success: false,
        message: "All product fields are required"
      });
    }

    const categoryId = Number(category_id);
    const productPrice = Number(price);
    const stockQuantity = Number(stock_quantity);

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Category ID must be a positive integer"
      });
    }

    if (!Number.isFinite(productPrice) || productPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than zero"
      });
    }

    if (!Number.isInteger(stockQuantity) || stockQuantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock quantity cannot be negative"
      });
    }

    const productDescription =
      typeof description === "string" && description.trim()
        ? description.trim()
        : null;

    const result = await pool.query(
      `UPDATE products
       SET category_id = $1,
           name = $2,
           description = $3,
           price = $4,
           stock_quantity = $5,
           sku = $6,
           is_active = $7,
           updated_at = NOW()
       WHERE id = $8
       RETURNING *`,
      [
        categoryId,
        name.trim(),
        productDescription,
        productPrice,
        stockQuantity,
        sku.trim(),
        is_active,
        id
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: result.rows[0]
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "SKU already exists"
      });
    }

    if (error.code === "23503") {
      return res.status(400).json({
        success: false,
        message: "Category does not exist"
      });
    }

    next(error);
  }
}

async function deactivateProduct(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product ID must be a positive integer"
      });
    }

    const result = await pool.query(
      `UPDATE products
       SET is_active = false,
           updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deactivated successfully",
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product ID must be a positive integer"
      });
    }

    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: result.rows[0]
    });
  } catch (error) {
    if (error.code === "23503") {
      return res.status(409).json({
        success: false,
        message: "Product cannot be deleted because it is used in an order"
      });
    }

    next(error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deactivateProduct,
  deleteProduct
};