const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/animals", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM animals ORDER BY id DESC");
        res.json(result.rows);
    } catch (error) {
        console.error("DB error:", error); // Thêm dòng này
        res.status(500).json({ error: "Lỗi khi lấy danh sách động vật!" });
    }
});

module.exports = router;