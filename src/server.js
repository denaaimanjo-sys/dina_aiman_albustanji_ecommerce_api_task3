require("dotenv").config();

const app = require("./app");
const pool = require("./config/database");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await pool.query("SELECT NOW()");
    console.log("Connected to Neon PostgreSQL");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed");
    process.exit(1);
  }
}

startServer();