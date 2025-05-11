const pool = require("../config/db");
const bcrypt = require("bcrypt");
require("dotenv").config();

const createAdminTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      reset_token VARCHAR(255),
      reset_token_expiry BIGINT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log("Admin table created or already exists");

    const defaultUsername = "admin";
    const defaultPassword = process.env.ADMIN_PASSWORD || "admin123";
    const defaultEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const checkAdmin = await pool.query(
      "SELECT * FROM admins WHERE username = $1",
      [defaultUsername]
    );
    if (checkAdmin.rows.length === 0) {
      await pool.query(
        "INSERT INTO admins (username, password, email) VALUES ($1, $2, $3)",
        [defaultUsername, hashedPassword, defaultEmail]
      );
      console.log("Default admin created");
    }
  } catch (error) {
    console.error("Error creating admin table:", error);
  }
};

module.exports = { createAdminTable };
