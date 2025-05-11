const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendResetPasswordEmail } = require("../utils/mailer");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const adminCheck = await pool.query(
      "SELECT * FROM admins WHERE email = $1",
      [email]
    );
    if (adminCheck.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Email is already used for an Admin account" });
    }

    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users (name, email, password, login_count, last_login) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const result = await pool.query(query, [
      name,
      email,
      hashedPassword,
      0,
      null,
    ]);
    res.status(201).json({ message: "User registered", user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Error registering user: " + error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminCheck = await pool.query(
      "SELECT * FROM admins WHERE email = $1",
      [email]
    );
    if (adminCheck.rows.length > 0) {
      return res.status(401).json({
        error:
          "This email belongs to an Admin account. Please select 'Admin' in the account type.",
      });
    }

    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    if (result.rows.length === 0)
      return res.status(401).json({ error: "User not found" });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    const newLoginCount = (user.login_count || 0) + 1;
    await pool.query(
      "UPDATE users SET login_count = $1, last_login = $2 WHERE id = $3",
      [newLoginCount, new Date(), user.id]
    );

    res.json({
      message: "User logged in",
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in: " + error.message });
  }
};

const forgotPasswordUser = async (req, res) => {
  const { email } = req.body;
  try {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "User not found" });

    const user = result.rows[0];
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    const expiry = Date.now() + 3600000;

    await pool.query(
      "UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE email = $3",
      [token, expiry, email]
    );
    await sendResetPasswordEmail(email, token, "user");
    res.json({ message: "Reset password email sent" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error processing forgot password: " + error.message });
  }
};

const resetPasswordUser = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const query =
      "SELECT * FROM users WHERE email = $1 AND reset_token = $2 AND reset_token_expiry > $3";
    const result = await pool.query(query, [decoded.email, token, Date.now()]);
    if (result.rows.length === 0)
      return res.status(400).json({ error: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query(
      "UPDATE users SET password = $1, reset_token = NULL, reset_token_expiry = NULL WHERE email = $2",
      [hashedPassword, decoded.email]
    );
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error resetting password: " + error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPasswordUser,
  resetPasswordUser,
};
