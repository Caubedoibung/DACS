// animals.js
document.addEventListener("DOMContentLoaded", function () {
    // Set user info in the UI
    const setUserInfo = () => {
        const userData = JSON.parse(localStorage.getItem("user"));
        const userInfoElement = document.querySelector(".user-info span:first-child");
        if (userData && userInfoElement) {
            userInfoElement.textContent = userData.name || "Unknown User";
        }
    };
    setUserInfo();

    // Mobile menu toggle
    let createMobileMenuButton;
    if (typeof createMobileMenuButton !== "function") {
        createMobileMenuButton = () => {
            const mobileMenuButton = document.querySelector(".mobile-menu-button");
            const mobileMenu = document.querySelector(".mobile-menu");
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener("click", () => {
                    mobileMenu.classList.toggle("active");
                });
            }
        };
    }
    if (typeof createMobileMenuButton === "function") {
        createMobileMenuButton();
    }

    // View toggle functionality
    const setupViewToggle = () => {
        const gridView = document.querySelector(".animals-grid");
        const listView = document.querySelector(".animals-list");
        const gridBtn = document.querySelector('.view-btn[data-view="grid"]');
        const listBtn = document.querySelector('.view-btn[data-view="list"]');

        gridBtn.addEventListener("click", function () {
            gridBtn.classList.add("active");
            listBtn.classList.remove("active");
            gridView.classList.add("active-view");
            listView.classList.remove("active-view");
            localStorage.setItem("animalViewPreference", "grid");
        });

        listBtn.addEventListener("click", function () {
            listBtn.classList.add("active");
            gridBtn.classList.remove("active");
            listView.classList.add("active-view");
            gridView.classList.remove("active-view");
            localStorage.setItem("animalViewPreference", "list");
        });

        const savedView = localStorage.getItem("animalViewPreference");
        if (savedView === "list") {
            listBtn.click();
        }
    };
    setupViewToggle();

   const setupFilters = () => {
    const searchInput = document.getElementById("search-animals");
    const categoryFilter = document.getElementById("category-filter");
    const statusFilter = document.getElementById("status-filter");
    const habitatFilter = document.getElementById("habitat-filter");

    // Nếu thiếu bất kỳ phần tử nào thì không gán sự kiện
    if (!searchInput || !categoryFilter || !statusFilter || !habitatFilter) {
        console.warn("Thiếu phần tử filter, bỏ qua setupFilters");
        return;
    }
    
        const applyFilters = () => {
            const searchValue = searchInput.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
            const categoryValue = categoryFilter.value.toLowerCase();
            const statusValue = statusFilter.value.toLowerCase();
            const habitatValue = habitatFilter.value.toLowerCase();
    
            document.querySelectorAll(".animal-card").forEach((card) => {
                const name = card.querySelector(".animal-details h3").textContent.toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const category = card.querySelector(".animal-meta span:first-child").textContent.toLowerCase();
                const status = card.querySelector(".status").textContent.toLowerCase();
                const habitat = card.querySelector(".animal-meta span:last-child").textContent.toLowerCase();
    
                const matchesName = !searchValue || name.includes(searchValue);
                const matchesCategory = !categoryValue || category.includes(categoryValue);
                const matchesStatus = !statusValue || status.includes(statusValue);
                const matchesHabitat = !habitatValue || habitat.includes(habitatValue);
    
                card.style.display = (matchesName && matchesCategory && matchesStatus && matchesHabitat) ? "block" : "none";
            });
    
            document.querySelectorAll(".animals-list tbody tr").forEach((row) => {
                const name = row.querySelector(".animal-info span").textContent.toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const category = row.querySelector("td:nth-child(3)").textContent.toLowerCase();
                const habitat = row.querySelector("td:nth-child(4)").textContent.toLowerCase();
                const status = row.querySelector(".status").textContent.toLowerCase();
    
                const matchesName = !searchValue || name.includes(searchValue);
                const matchesCategory = !categoryValue || category.includes(categoryValue);
                const matchesStatus = !statusValue || status.includes(statusValue);
                const matchesHabitat = !habitatValue || habitat.includes(habitatValue);
    
                row.style.display = (matchesName && matchesCategory && matchesStatus && matchesHabitat) ? "table-row" : "none";
            });
        };
    
        searchInput.addEventListener("input", applyFilters);
        categoryFilter.addEventListener("change", applyFilters);
        statusFilter.addEventListener("change", applyFilters);
        habitatFilter.addEventListener("change", applyFilters);
    };
    setupFilters();

    // Helper functions to format category and status for display
    const formatCategory = (category) => {
        const categories = {
            mammals: "Thú",
            birds: "Chim",
            reptiles: "Bò sát",
            amphibians: "Lưỡng cư",
            fish: "Cá",
            invertebrates: "Thân mềm",
        };
        return categories[category] || category;
    };

    const formatStatus = (status) => {
        const statuses = {
            "least-concern": "Ít quan tâm",
            vulnerable: "Bị đe dọa",
            endangered: "Nguy cấp",
            critical: "Nguy hiểm",
        };
        return statuses[status] || status;
    };

    // Function to add a new animal to both Grid and List views
    const addAnimalToUI = (animal) => {
        const gridView = document.querySelector(".animals-grid");
        const listView = document.querySelector(".animals-list tbody");
        console.log("Animal render:", animal);
                // ...existing code...
        const imageSrc = animal.image_url.startsWith("http") ? animal.image_url : `http://localhost:3001${animal.image_url}`;
        // ...existing code...

        const animalCard = document.createElement("div");
        animalCard.classList.add("animal-card");
        animalCard.dataset.animalId = animal.id || animal.animal_id;
        animalCard.innerHTML = `
            <div class="animal-image">
                <img src="${imageSrc}" alt="${animal.animalName}">
                <span class="status ${animal.status}">${formatStatus(animal.status)}</span>
            </div>
            <div class="animal-details">
                <h3>${animal.animalName}</h3>
                <p class="scientific-name">${animal.scientificName}</p>
                <div class="animal-meta">
                    <span><i class="ri-folder-line"></i> ${formatCategory(animal.category)}</span>
                    <span><i class="ri-earth-line"></i> ${animal.habitat || "Unknown"}</span>
                </div>
                <div class="card-actions">
                    <button class="card-btn view"><i class="ri-eye-line"></i></button>
                    <button class="card-btn edit"><i class="ri-edit-line"></i></button>
                    <button class="card-btn delete"><i class="ri-delete-bin-line"></i></button>
                </div>
            </div>
        `;
        gridView.insertBefore(animalCard, gridView.firstChild);

        const listRow = document.createElement("tr");
        listRow.dataset.animalId = animal.id || animal.animal_id;
        listRow.innerHTML = `
            <td>
                <div class="animal-info">
                    <img src="${imageSrc}" alt="${animal.animalName}">
                    <span>${animal.animalName}</span>
                </div>
            </td>
            <td>${animal.scientificName}</td>
            <td>${formatCategory(animal.category)}</td>
            <td>${animal.habitat || "Unknown"}</td>
            <td><span class="status ${animal.status}">${formatStatus(animal.status)}</span></td>
            <td>
                <div class="actions">
                    <button class="action-btn view"><i class="ri-eye-line"></i></button>
                    <button class="action-btn edit"><i class="ri-edit-line"></i></button>
                    <button class="action-btn delete"><i class="ri-delete-bin-line"></i></button>
                </div>
            </td>
        `;
        listView.insertBefore(listRow, listView.firstChild);

        setupActionButtons();
    };

    // Get user role from localStorage
    const getUserRole = () => {
        const accountType = localStorage.getItem("accountType");
        if (!accountType) {
            console.error("No account type found in localStorage. Defaulting to 'user'.");
            return "user";
        }
        return accountType;
    };

    // Function to save pending animals for user submissions
    const savePendingAnimal = async (animalData) => {
        let pendingAnimals = JSON.parse(localStorage.getItem("pendingAnimals")) || [];
        const pendingAnimal = { ...animalData, imageDataUrl: "/images/1img.jpg", status: "pending" };
        pendingAnimals.push(pendingAnimal);
        try {
            localStorage.setItem("pendingAnimals", JSON.stringify(pendingAnimals));
        } catch (e) {
            console.error("Failed to save to localStorage:", e);
            alert("Không thể gửi động vật. Vui lòng thử lại.");
        }
    };

    // Function for admin to approve a pending animal
    const approvePendingAnimal = (animalData) => {
        addAnimalToUI(animalData);
        let pendingAnimals = JSON.parse(localStorage.getItem("pendingAnimals")) || [];
        pendingAnimals = pendingAnimals.filter(
            (animal) => animal.animalName !== animalData.animalName
        );
        localStorage.setItem("pendingAnimals", JSON.stringify(pendingAnimals));
    };

    // Function for admin to reject a pending animal
    const rejectPendingAnimal = (animalData) => {
        let pendingAnimals = JSON.parse(localStorage.getItem("pendingAnimals")) || [];
        pendingAnimals = pendingAnimals.filter(
            (animal) => animal.animalName !== animalData.animalName
        );
        localStorage.setItem("pendingAnimals", JSON.stringify(pendingAnimals));
    };

    // Modal functionality
 // animals.js (chỉ hiển thị phần setupModal đã sửa)
const setupModal = () => {
    const addAnimalBtn = document.getElementById("add-animal-btn");
    const addModal = document.getElementById("add-animal-modal");
    const closeModalBtns = addModal ? addModal.querySelectorAll(".close-modal") : [];
    const form = document.getElementById("add-animal-form");

    // Kiểm tra sự tồn tại của các phần tử
    if (!addAnimalBtn) {
        console.error("Add animal button with id 'add-animal-btn' not found!");
        return;
    }
    if (!addModal) {
        console.error("Add animal modal with id 'add-animal-modal' not found!");
        return;
    }
    if (!form) {
        console.error("Add animal form with id 'add-animal-form' not found!");
        return;
    }

    // Mở modal khi bấm nút "Add Animal"
    addAnimalBtn.addEventListener("click", () => {
        console.log("Add Animal button clicked");
        addModal.classList.add("active");
        document.body.style.overflow = "hidden";
        form.reset();
    });

    // Đóng modal khi bấm nút đóng hoặc click ra ngoài
    closeModalBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            console.log("Close modal button clicked");
            addModal.classList.remove("active");
            document.body.style.overflow = "";
        });
    });

    addModal.addEventListener("click", (e) => {
        if (e.target === addModal) {
            console.log("Clicked outside modal to close");
            addModal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

    // Xử lý submit form
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const animalName = form["animal-name"].value.trim();
        const scientificName = form["scientific-name"].value.trim();
        const category = form["category"].value;
        const status = form["conservation-status"].value;
        const habitat = form["habitat"].value;
        const description = form["description"].value.trim();

        if (!animalName) return alert("Vui lòng nhập tên động vật.");
        if (!category || category === "Chọn Loài") return alert("Vui lòng chọn loài.");
        if (!status || status === "Chọn Trạng Thái") return alert("Vui lòng chọn trạng thái bảo tồn.");
        if (!habitat || habitat === "Chọn Môi Trường Sống") return alert("Vui lòng chọn môi trường sống.");

        const userRole = getUserRole();

        if (userRole === "admin") {
            const formData = new FormData(form);
            try {
                const response = await fetch("http://localhost:3001/api/admin/add-animal", {
                    method: "POST",
                    body: formData
                });
                const result = await response.json();
                alert(result.message || result.error);

                if (response.ok) {
                    // Tải lại toàn bộ danh sách động vật từ server để cập nhật grid và list
                    await loadAnimals();
                } else {
                    console.error("Failed to add animal:", result);
                }

                addModal.classList.remove("active");
                document.body.style.overflow = "";
                form.reset();
            } catch (err) {
                alert("Lỗi khi gửi dữ liệu lên server!");
            }
        } else {
            await savePendingAnimal({
                animalName,
                scientificName,
                category,
                status,
                habitat,
                description
            });
            alert(`Động vật "${animalName}" đã được gửi để phê duyệt. Chờ admin phê duyệt.`);
            addModal.classList.remove("active");
            document.body.style.overflow = "";
            form.reset();
        }
    });
};
    // ...existing code...
     // ...existing code...
    const setupActionButtons = () => {
        const viewModal = document.getElementById("view-animal-modal");
        const editModal = document.getElementById("edit-animal-modal");
        const getRole = () => localStorage.getItem("accountType") || "user";
    
        // Xử lý nút xem chi tiết (cho cả grid và list)
        document.querySelectorAll(".card-btn.view, .action-btn.view").forEach(btn => {
            btn.onclick = function () {
                let card = this.closest(".animal-card");
                let row = this.closest("tr");
                let name, scientific, category, status, habitat, description, img;
    
                if (card) {
                    name = card.querySelector("h3").textContent;
                    scientific = card.querySelector(".scientific-name").textContent;
                    category = card.querySelector(".animal-meta span:first-child").textContent.replace(/.*\s/, "");
                    status = card.querySelector(".status").textContent;
                    habitat = card.querySelector(".animal-meta span:last-child").textContent.replace(/.*\s/, "");
                    description = card.querySelector(".animal-details").dataset.description || "";
                    img = card.querySelector(".animal-image img").src;
                    
                } else if (row) {
                    name = row.querySelector(".animal-info span").textContent;
                    scientific = row.querySelector("td:nth-child(2)").textContent;
                    category = row.querySelector("td:nth-child(3)").textContent;
                    habitat = row.querySelector("td:nth-child(4)").textContent;
                    status = row.querySelector(".status").textContent;
                    description = row.dataset.description || "";
                    img = row.querySelector(".animal-info img").src;
                }
    
                document.getElementById("view-animal-name").textContent = name || "";
                document.getElementById("view-scientific-name").textContent = scientific || "";
                document.getElementById("view-category").textContent = category || "";
                document.getElementById("view-conservation-status").textContent = status || "";
                document.getElementById("view-habitat").textContent = habitat || "";
                document.getElementById("view-animal-image").src = img || "";
                document.getElementById("view-description").textContent = description || "";
                viewModal.classList.add("active");
                document.body.style.overflow = "hidden";
            };
        });
    
// ...existing code...
document.querySelectorAll(".card-btn.edit, .action-btn.edit").forEach(btn => {
    btn.onclick = function () {
        if (getRole() !== "admin") {
            alert("Bạn không có quyền dùng chức năng này");
            return;
        }
        let card = this.closest(".animal-card");
        let row = this.closest("tr");
        let name, scientific, category, status, habitat, description, animalId;

        if (card) {
            name = card.querySelector("h3").textContent;
            scientific = card.querySelector(".scientific-name").textContent;
            category = card.querySelector(".animal-meta span:first-child").textContent.replace(/.*\s/, "");
            status = card.querySelector(".status").textContent;
            habitat = card.querySelector(".animal-meta span:last-child").textContent.replace(/.*\s/, "");
            description = card.querySelector(".animal-details").dataset.description || "";
            // Lấy id từ thuộc tính data-animal-id (bạn cần thêm khi render)
            animalId = card.dataset.animalId;
        } else if (row) {
            name = row.querySelector(".animal-info span").textContent;
            scientific = row.querySelector("td:nth-child(2)").textContent;
            category = row.querySelector("td:nth-child(3)").textContent;
            habitat = row.querySelector("td:nth-child(4)").textContent;
            status = row.querySelector(".status").textContent;
            description = row.dataset.description || "";
            animalId = row.dataset.animalId;
        }

        document.getElementById("edit-animal-name").value = name || "";
        document.getElementById("edit-scientific-name").value = scientific || "";
        document.getElementById("edit-category").value = category || "";
        document.getElementById("edit-conservation-status").value = status || "";
        document.getElementById("edit-habitat").value = habitat || "";
        document.getElementById("edit-description").value = description || "";
        // Gán id vào form
        document.getElementById("edit-animal-form").dataset.animalId = animalId || "";
        editModal.classList.add("active");
        document.body.style.overflow = "hidden";
    };
});
        // Xử lý nút xóa giữ nguyên như cũ
    
        document.querySelectorAll(".card-btn.delete, .action-btn.delete").forEach(btn => {
            btn.onclick = function () {
                if (getRole() !== "admin") {
                    alert("Bạn không có quyền dùng chức năng này");
                    return;
                }
                if (confirm("Bạn có chắc muốn xóa động vật này?")) {
                    let card = this.closest(".animal-card");
                    let row = this.closest("tr");
                    if (card) card.remove();
                    if (row) row.remove();
                    // TODO: Gọi API xóa ở backend nếu cần
                }
            };
        });
    
        // Đóng modal khi bấm nút đóng
        document.querySelectorAll(".close-modal").forEach(btn => {
            btn.onclick = function () {
                this.closest(".modal").classList.remove("active");
                document.body.style.overflow = "";
            };
        });
    };
    // ...existing code...
// ...existing code...
async function loadAnimals() {
    try {
        const response = await fetch("http://localhost:3001/api/animals");
        const animals = await response.json();
        console.log("Animals from API:", animals);

        // Kiểm tra sự tồn tại của grid và list
        const grid = document.querySelector(".animals-grid");
        const list = document.querySelector(".animals-list tbody");
        if (!grid || !list) {
            console.error("Không tìm thấy .animals-grid hoặc .animals-list tbody");
            return;
        }

        grid.innerHTML = "";
        list.innerHTML = "";
        animals.forEach(animal => {
            addAnimalToUI({
                animalName: animal.animal_name || animal.animalName,
                scientificName: animal.scientific_name || animal.scientificName,
                category: animal.category,
                status: animal.status,
                habitat: animal.habitat,
                description: animal.description,
                image_url: animal.image_url || animal.imageDataUrl // Sửa lại key này
            });
        });

        // Sau khi render lại, cần gán lại sự kiện cho các nút
        setupActionButtons();
    } catch (err) {
        alert("Không thể tải danh sách động vật!");
        console.error(err);
    }
}
// ...existing code...
    const setupPagination = () => {
        const pageButtons = document.querySelectorAll(".page-btn:not(.prev):not(.next)");
        const prevBtn = document.querySelector(".page-btn.prev");
        const nextBtn = document.querySelector(".page-btn.next");

          if (!pageButtons.length || !prevBtn || !nextBtn) {
        console.warn("Không tìm thấy nút phân trang, bỏ qua setupPagination");
        return;
    }

        pageButtons.forEach((btn) => {
            btn.addEventListener("click", function () {
                pageButtons.forEach((b) => b.classList.remove("active"));
                this.classList.add("active");
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        });

        prevBtn.addEventListener("click", function () {
            const activeBtn = document.querySelector(".page-btn.active");
            const prevPageBtn = activeBtn.previousElementSibling;
            if (prevPageBtn && !prevPageBtn.classList.contains("prev")) {
                prevPageBtn.click();
            }
        });

        nextBtn.addEventListener("click", function () {
            const activeBtn = document.querySelector(".page-btn.active");
            const nextPageBtn = activeBtn.nextElementSibling;
            if (
                nextPageBtn &&
                !nextPageBtn.classList.contains("next") &&
                !nextPageBtn.classList.contains("page-ellipsis")
            ) {
                nextPageBtn.click();
            }
        });
    };

    const handleUrlParams = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const action = urlParams.get("action");
        if (action === "add") {
            const addAnimalBtn = document.getElementById("add-animal-btn");
            if (addAnimalBtn) addAnimalBtn.click();
        }
    };
// ...existing code...

document.getElementById("edit-animal-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Lấy dữ liệu từ form sửa
    const animalName = document.getElementById("edit-animal-name").value.trim();
    const scientificName = document.getElementById("edit-scientific-name").value.trim();
    const category = document.getElementById("edit-category").value;
    const status = document.getElementById("edit-conservation-status").value;
    const habitat = document.getElementById("edit-habitat").value;
    const description = document.getElementById("edit-description").value.trim();

    // Lấy id động vật đang sửa
    const animalId = document.getElementById("edit-animal-form").dataset.animalId;

    // Gửi dữ liệu lên backend
    await fetch(`http://localhost:3001/api/admin/edit-animal/${animalId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ animalName, scientificName, category, status, habitat, description })
    });

    // Reload lại danh sách
    await loadAnimals();

    // Đóng modal
    document.getElementById("edit-animal-modal").classList.remove("active");
    document.body.style.overflow = "";
});
    // Gọi các hàm khởi tạo
    setupModal();
    setupActionButtons();
    setupPagination();
    handleUrlParams();
    loadAnimals();
  
});