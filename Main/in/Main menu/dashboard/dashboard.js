document.addEventListener("DOMContentLoaded", function () {
  // Hiển thị thông tin người dùng hoặc admin
  const accountType = localStorage.getItem("accountType");
  const user = JSON.parse(localStorage.getItem("user"));
  const userInfo = document.querySelector(".user-info");

  if (accountType === "user" && user) {
    userInfo.querySelector("h4").textContent = user.name || "User";
    userInfo.querySelector("p").textContent = "User";
  } else if (accountType === "admin" && user) {
    userInfo.querySelector("h4").textContent = user.username || "Admin";
    userInfo.querySelector("p").textContent = "Administrator";
  } else {
    window.location.href = "/Main/out/login.html";
  }

  // Mobile menu toggle
  const createMobileMenuButton = () => {
    const mainContent = document.querySelector(".main-content");
    const mobileMenuBtn = document.createElement("button");
    mobileMenuBtn.classList.add("mobile-menu-btn");
    mobileMenuBtn.innerHTML = '<i class="ri-menu-line"></i>';
    mobileMenuBtn.style.position = "fixed";
    mobileMenuBtn.style.top = "20px";
    mobileMenuBtn.style.left = "20px";
    mobileMenuBtn.style.zIndex = "1001";
    mobileMenuBtn.style.background = "#171717";
    mobileMenuBtn.style.color = "#fff";
    mobileMenuBtn.style.border = "none";
    mobileMenuBtn.style.borderRadius = "8px";
    mobileMenuBtn.style.padding = "10px";
    mobileMenuBtn.style.display = "none";
    mobileMenuBtn.style.cursor = "pointer";

    // Only show on mobile
    const mediaQuery = window.matchMedia("(max-width: 576px)");
    if (mediaQuery.matches) {
      mobileMenuBtn.style.display = "block";
    }

    mediaQuery.addEventListener("change", (e) => {
      if (e.matches) {
        mobileMenuBtn.style.display = "block";
      } else {
        mobileMenuBtn.style.display = "none";
        document.querySelector(".sidebar").classList.remove("active");
      }
    });

    mobileMenuBtn.addEventListener("click", () => {
      document.querySelector(".sidebar").classList.toggle("active");
    });

    document.body.appendChild(mobileMenuBtn);
  };

  createMobileMenuButton();

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", (e) => {
    const sidebar = document.querySelector(".sidebar");
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

    if (
      window.innerWidth <= 576 &&
      sidebar.classList.contains("active") &&
      !sidebar.contains(e.target) &&
      e.target !== mobileMenuBtn &&
      !mobileMenuBtn.contains(e.target)
    ) {
      sidebar.classList.remove("active");
    }
  });

  // Action buttons functionality
  const setupActionButtons = () => {
    // Edit buttons
    document.querySelectorAll(".action-btn.edit").forEach((btn) => {
      btn.addEventListener("click", function () {
        const row = this.closest("tr");
        const animalName = row.querySelector(".animal-info span").textContent;
        alert(`Edit ${animalName}`);
        // In a real application, this would open an edit modal or redirect to edit page
      });
    });

    // View buttons
    document.querySelectorAll(".action-btn.view").forEach((btn) => {
      btn.addEventListener("click", function () {
        const row = this.closest("tr");
        const animalName = row.querySelector(".animal-info span").textContent;
        alert(`View details for ${animalName}`);
        // In a real application, this would open a details modal or redirect to details page
      });
    });

    // Delete buttons
    document.querySelectorAll(".action-btn.delete").forEach((btn) => {
      btn.addEventListener("click", function () {
        const row = this.closest("tr");
        const animalName = row.querySelector(".animal-info span").textContent;
        if (confirm(`Are you sure you want to delete ${animalName}?`)) {
          alert(`${animalName} has been deleted`);
          // In a real application, this would send a delete request to the server
          // and remove the row from the table on success
          row.remove();
        }
      });
    });
  };

  setupActionButtons();

  // Notifications dropdown
  const setupNotifications = () => {
    const notificationsIcon = document.querySelector(".notifications");

    if (notificationsIcon) {
      notificationsIcon.addEventListener("click", function () {
        // Create dropdown if it doesn't exist
        let dropdown = document.querySelector(".notifications-dropdown");

        if (!dropdown) {
          dropdown = document.createElement("div");
          dropdown.classList.add("notifications-dropdown");
          dropdown.style.position = "absolute";
          dropdown.style.top = "40px";
          dropdown.style.right = "0";
          dropdown.style.width = "300px";
          dropdown.style.background = "#171717";
          dropdown.style.borderRadius = "8px";
          dropdown.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)";
          dropdown.style.zIndex = "1000";
          dropdown.style.padding = "15px";

          // Add notifications
          dropdown.innerHTML = `
                        <h3 style="color: #fff; font-size: 16px; margin-bottom: 10px;">Notifications</h3>
                        <div class="notification-item" style="padding: 10px; border-bottom: 1px solid #2a2a2a;">
                            <p style="color: #fff; margin: 0 0 5px;">New animal added to database</p>
                            <span style="color: #a3a3a3; font-size: 12px;">2 hours ago</span>
                        </div>
                        <div class="notification-item" style="padding: 10px; border-bottom: 1px solid #2a2a2a;">
                            <p style="color: #fff; margin: 0 0 5px;">Conservation status updated</p>
                            <span style="color: #a3a3a3; font-size: 12px;">5 hours ago</span>
                        </div>
                        <div class="notification-item" style="padding: 10px;">
                            <p style="color: #fff; margin: 0 0 5px;">System maintenance scheduled</p>
                            <span style="color: #a3a3a3; font-size: 12px;">1 day ago</span>
                        </div>
                        <a href="#" style="display: block; text-align: center; color: #a3e635; margin-top: 10px; font-size: 14px;">View All</a>
                    `;

          notificationsIcon.appendChild(dropdown);
        } else {
          // Toggle dropdown visibility
          dropdown.style.display =
            dropdown.style.display === "none" ? "block" : "none";
        }

        // Close dropdown when clicking outside
        document.addEventListener("click", function closeDropdown(e) {
          if (!notificationsIcon.contains(e.target)) {
            dropdown.style.display = "none";
            document.removeEventListener("click", closeDropdown);
          }
        });
      });
    }
  };

  setupNotifications();

  // Simulate data loading
  const simulateLoading = () => {
    // Add loading state to the page
    const dashboard = document.querySelector(".dashboard-content");
    dashboard.style.opacity = "0.6";

    // Create loading spinner
    const spinner = document.createElement("div");
    spinner.classList.add("loading-spinner");
    spinner.style.position = "fixed";
    spinner.style.top = "50%";
    spinner.style.left = "50%";
    spinner.style.transform = "translate(-50%, -50%)";
    spinner.style.width = "50px";
    spinner.style.height = "50px";
    spinner.style.border = "5px solid #2a2a2a";
    spinner.style.borderTopColor = "#a3e635";
    spinner.style.borderRadius = "50%";
    spinner.style.animation = "spin 1s linear infinite";

    // Add keyframes for spinner animation
    const style = document.createElement("style");
    style.innerHTML = `
            @keyframes spin {
                0% { transform: translate(-50%, -50%) rotate(0deg); }
                100% { transform: translate(-50%, -50%) rotate(360deg); }
            }
        `;
    document.head.appendChild(style);

    document.body.appendChild(spinner);

    // Remove loading state after 1 second
    setTimeout(() => {
      dashboard.style.opacity = "1";
      spinner.remove();
    }, 1000);
  };

  // Uncomment to simulate loading on page load
  // simulateLoading();

  // Add event listeners for quick action buttons
  document.querySelectorAll(".action-card").forEach((card) => {
    card.addEventListener("click", function (e) {
      // Prevent default only if it's a link
      if (this.tagName === "A") {
        e.preventDefault();
      }

      const action = this.querySelector("span").textContent;

      switch (action) {
        case "Add Animal":
          window.location.href = "animals.html?action=add";
          break;
        case "New Category":
          window.location.href = "categories.html?action=add";
          break;
        case "Generate Report":
          alert("Generating report...");
          // In a real application, this would trigger a report generation
          break;
        case "Settings":
          window.location.href = "settings.html";
          break;
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
    // Check user role and set permissions
    checkUserRole();

    // Mobile menu toggle (reused from dashboard.js)
    if (typeof createMobileMenuButton === "function") {
        createMobileMenuButton();
    }

    // Setup filter functionality
    setupFilters();

    // Setup modal functionality
    setupModal();

    // Setup form submission
    setupFormSubmission();

    // Setup search functionality
    setupSearch();
});

// Check user role from localStorage and set permissions accordingly
function checkUserRole() {
    // ... (existing code remains unchanged)
}

// Setup filter functionality
function setupFilters() {
    const regionFilter = document.getElementById("region-filter");
    const typeFilter = document.getElementById("type-filter");

    const applyFilters = () => {
        const selectedRegion = regionFilter.value.toLowerCase();
        const selectedType = typeFilter.value.toLowerCase();
        const searchQuery = (document.getElementById("search-input")?.value || "").toLowerCase();

        document.querySelectorAll(".habitat-card").forEach((card) => {
            const regionElement = card.querySelector(".habitat-region");
            const typeElement = card.querySelector(".habitat-type");
            const nameElement = card.querySelector(".habitat-details h3");
            const descriptionElement = card.querySelector(".habitat-details p");

            const cardRegion = regionElement ? regionElement.textContent.toLowerCase() : "";
            const cardType = typeElement ? typeElement.classList[1] : "";
            const cardName = nameElement ? nameElement.textContent.toLowerCase() : "";
            const cardDescription = descriptionElement ? descriptionElement.textContent.toLowerCase() : "";

            const matchesRegion = !selectedRegion || cardRegion === selectedRegion;
            const matchesType = !selectedType || cardType === selectedType;
            const matchesSearch = !searchQuery || 
                cardName.includes(searchQuery) || 
                cardDescription.includes(searchQuery);

            if (matchesRegion && matchesType && matchesSearch) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    };

    regionFilter.addEventListener("change", applyFilters);
    typeFilter.addEventListener("change", applyFilters);
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById("search-input");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            console.log("Search input changed:", this.value);
            setupFilters(); // Reuse the filter function to apply search
        });
    }
}

// Setup modal functionality
function setupModal() {
    // ... (existing code remains unchanged)
}

// Close add habitat modal
function closeModal() {
    // ... (existing code remains unchanged)
}

// Close habitat details modal
function closeDetailsModal() {
    // ... (existing code remains unchanged)
}

// Setup form submission
function setupFormSubmission() {
    // ... (existing code remains unchanged)
}

// View habitat details, editHabitat, deleteHabitat, editHabitatFromModal, setUserRole
// ... (existing code remains unchanged)