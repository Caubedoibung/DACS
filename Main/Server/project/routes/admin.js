const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const pool = require("../config/db");
const multer = require("multer");
const path = require("path");

// Các route quản lý admin
router.post("/login", adminController.loginAdmin);
router.post("/change-password", adminController.changePassword);
router.post("/forgot-password", adminController.forgotPasswordAdmin);
router.post("/reset-password", adminController.resetPasswordAdmin);

router.get("/api/animals", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM animals ORDER BY id DESC");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Lỗi khi lấy danh sách động vật!" });
    }
});

// Cấu hình Multer để lưu file vào thư mục uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post("/add-animal", upload.single("image"), async (req, res) => {
  const { animal_name, scientific_name, category, status, habitat, description } = req.body;
  const image_url = req.file ? "/uploads/" + req.file.filename : null;
  try {
    // Kiểm tra trùng
    const check = await pool.query(
      "SELECT 1 FROM animals WHERE animal_name = $1 AND scientific_name = $2",
      [animal_name, scientific_name]
    );
    if (check.rows.length > 0) {
      return res.status(400).json({ error: "Động vật này đã tồn tại!" });
    }

    await pool.query(
      `INSERT INTO animals (animal_name, scientific_name, category, status, habitat, description, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [animal_name, scientific_name, category, status, habitat, description, image_url]
    );
    res.json({ message: "Thêm động vật thành công!" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi thêm động vật!" });
  }
});
module.exports = router;