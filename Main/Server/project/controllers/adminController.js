const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  sendAdminLoginEmail,
  sendResetPasswordEmail,
} = require("../utils/mailer");
require("dotenv").config();

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const query = "SELECT * FROM admins WHERE username = $1";
    const result = await pool.query(query, [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid username" });
    }

    const admin = result.rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const newLoginCount = (admin.login_count || 0) + 1;
    await pool.query(
      "UPDATE admins SET login_count = $1, last_login = $2 WHERE id = $3",
      [newLoginCount, new Date(), admin.id]
    );

    res.json({
      message: "Admin logged in",
      admin: { id: admin.id, username: admin.username, email: admin.email },
    });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ error: "Error logging in: " + error.message });
  }
};

const changePassword = async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;
  try {
    const query = "SELECT * FROM admins WHERE username = $1";
    const result = await pool.query(query, [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid username" });
    }

    const admin = result.rows[0];
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid current password" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE admins SET password = $1 WHERE username = $2", [
      hashedNewPassword,
      username,
    ]);

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res
      .status(500)
      .json({ error: "Error changing password: " + error.message });
  }
};

const forgotPasswordAdmin = async (req, res) => {
  const { username } = req.body;
  try {
    const query = "SELECT * FROM admins WHERE username = $1";
    const result = await pool.query(query, [username]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const admin = result.rows[0];
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    const expiry = Date.now() + 3600000;

    await pool.query(
      "UPDATE admins SET reset_token = $1, reset_token_expiry = $2 WHERE username = $3",
      [token, expiry, username]
    );
    await sendResetPasswordEmail(admin.email, token, "admin");
    res.json({ message: "Reset password email sent to admin email" });
  } catch (error) {
    console.error("Error processing forgot password:", error);
    res
      .status(500)
      .json({ error: "Error processing forgot password: " + error.message });
  }
};

const resetPasswordAdmin = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const query =
      "SELECT * FROM admins WHERE username = $1 AND reset_token = $2 AND reset_token_expiry > $3";
    const result = await pool.query(query, [
      decoded.username,
      token,
      Date.now(),
    ]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query(
      "UPDATE admins SET password = $1, reset_token = NULL, reset_token_expiry = NULL WHERE username = $2",
      [hashedPassword, decoded.username]
    );
    res.json({ message: "Admin password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ error: "Error resetting password: " + error.message });
  }
};

module.exports = {
  loginAdmin,
  changePassword,
  forgotPasswordAdmin,
  resetPasswordAdmin,
};
