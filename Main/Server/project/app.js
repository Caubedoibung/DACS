const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const pool = require("./config/db");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const animalRoutes = require("./routes/animals");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", animalRoutes);

const initDatabase = async () => {
  try {
    // Tạo bảng users
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        reset_token VARCHAR(255),
        reset_token_expiry BIGINT,
        login_count INT DEFAULT 0,
        last_login TIMESTAMP
      )
    `);
    console.log("User table created or already exists");

    // Tạo bảng admins
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        reset_token VARCHAR(255),
        reset_token_expiry BIGINT,
        login_count INT DEFAULT 0,
        last_login TIMESTAMP
      )
    `);
    console.log("Admin table created or already exists");

    // Chèn Admin mặc định
    const adminHashedPassword = await bcrypt.hash("admin123", 10);
    await pool.query(
      "INSERT INTO admins (username, email, password, login_count, last_login) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (username) DO NOTHING",
      ["admin", "huymt0401@gmail.com", adminHashedPassword, 0, null]
    );
    console.log("Default admin created");

    // Tạo bảng animals
    await pool.query(`
      CREATE TABLE IF NOT EXISTS animals (
        id SERIAL PRIMARY KEY,
        animal_name VARCHAR(255) NOT NULL,
        scientific_name VARCHAR(255),
        category VARCHAR(100),
        status VARCHAR(100),
        habitat VARCHAR(255),
        description TEXT,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Animals table created or already exists");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

initDatabase();

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});