const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendAdminLoginEmail = async (adminEmail, username, password) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: adminEmail,
    subject: "Admin Login Credentials",
    text: `Username: ${username}\nPassword: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Admin login email sent");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendResetPasswordEmail = async (email, token, type = "user") => {
  const resetUrl = `http://localhost:3000/reset-password?token=${token}&type=${type}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Reset ${type === "admin" ? "Admin" : "User"} Password`,
    text: `Click the following link to reset your password: ${resetUrl}\nThis link will expire in 1 hour.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`${type} reset password email sent to ${email}`);
  } catch (error) {
    console.error("Error sending reset password email:", error);
  }
};

module.exports = { sendAdminLoginEmail, sendResetPasswordEmail };
