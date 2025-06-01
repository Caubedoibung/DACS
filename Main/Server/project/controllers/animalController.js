const Animal = require("../models/animalModel");

// Lấy danh sách động vật
exports.getAllAnimals = async (req, res) => {
    try {
        const animals = await Animal.getAll();
        res.json(animals);
    } catch (error) {
        res.status(500).json({ error: "Lỗi khi lấy danh sách động vật!" });
    }
};

// Thêm động vật mới
exports.addAnimal = async (req, res) => {
    try {
        const { animal_name, scientific_name, category, status, habitat, description } = req.body;
        // Nếu có upload ảnh, xử lý ở đây, ví dụ: req.file.path
        const image_url = req.file ? req.file.path : null;
        const animal = await Animal.add({
            animalName: animal_name,
            scientificName: scientific_name,
            category,
            status,
            habitat,
            description,
            image_url,
        });
        res.json({ message: "Thêm động vật thành công!", animal });
    } catch (error) {
        res.status(500).json({ error: "Lỗi khi thêm động vật!" });
    }
};

// Sửa động vật
exports.editAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        const { animalName, scientificName, category, status, habitat, description } = req.body;
        const animal = await Animal.update(id, { animalName, scientificName, category, status, habitat, description });
        if (!animal) return res.status(404).json({ error: "Không tìm thấy động vật để sửa!" });
        res.json({ message: "Cập nhật động vật thành công!", animal });
    } catch (error) {
        res.status(500).json({ error: "Lỗi khi cập nhật động vật!" });
    }
};

// Xóa động vật
exports.deleteAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        await Animal.remove(id);
        res.json({ message: "Đã xóa động vật!" });
    } catch (error) {
        res.status(500).json({ error: "Lỗi khi xóa động vật!" });
    }
};