const pool = require("../config/db");

// Lấy tất cả động vật
exports.getAll = async () => {
    const result = await pool.query("SELECT * FROM animals ORDER BY id DESC");
    return result.rows;
};

// Thêm động vật mới
exports.add = async (data) => {
    const { animalName, scientificName, category, status, habitat, description, image_url } = data;
    const result = await pool.query(
        `INSERT INTO animals (animal_name, scientific_name, category, status, habitat, description, image_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [animalName, scientificName, category, status, habitat, description, image_url]
    );
    return result.rows[0];
};

// Sửa động vật
exports.update = async (id, data) => {
    const { animalName, scientificName, category, status, habitat, description } = data;
    const result = await pool.query(
        `UPDATE animals SET animal_name=$1, scientific_name=$2, category=$3, status=$4, habitat=$5, description=$6 WHERE id=$7 RETURNING *`,
        [animalName, scientificName, category, status, habitat, description, id]
    );
    return result.rows[0];
};

// Xóa động vật
exports.remove = async (id) => {
    await pool.query("DELETE FROM animals WHERE id=$1", [id]);
};