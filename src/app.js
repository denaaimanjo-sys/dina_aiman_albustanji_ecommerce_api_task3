const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const productsRoutes = require("./routes/productsRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const usersRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");
const {
  notFound,
  errorHandler
} = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiter");
const app = express();

app.use(helmet());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use("/api", apiLimiter);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-commerce API is running"
  });
});

app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;