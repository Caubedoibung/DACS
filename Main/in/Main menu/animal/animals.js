document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle (reused from dashboard.js)
  // Declare createMobileMenuButton if it's not already defined elsewhere
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

      // Save preference to localStorage
      localStorage.setItem("animalViewPreference", "grid");
    });

    listBtn.addEventListener("click", function () {
      listBtn.classList.add("active");
      gridBtn.classList.remove("active");
      listView.classList.add("active-view");
      gridView.classList.remove("active-view");

      // Save preference to localStorage
      localStorage.setItem("animalViewPreference", "list");
    });

    // Load saved preference
    const savedView = localStorage.getItem("animalViewPreference");
    if (savedView === "list") {
      listBtn.click();
    }
  };

  setupViewToggle();

  // Filter functionality
  const setupFilters = () => {
    const categoryFilter = document.getElementById("category-filter");
    const statusFilter = document.getElementById("status-filter");
    const habitatFilter = document.getElementById("habitat-filter");

    const applyFilters = () => {
      const categoryValue = categoryFilter.value.toLowerCase();
      const statusValue = statusFilter.value.toLowerCase();
      const habitatValue = habitatFilter.value.toLowerCase();

      // Filter grid view
      document.querySelectorAll(".animal-card").forEach((card) => {
        const category = card
          .querySelector(".animal-meta span:first-child")
          .textContent.toLowerCase();
        const status = card
          .querySelector(".status")
          .className.replace("status ", "")
          .toLowerCase();
        const habitat = card
          .querySelector(".animal-meta span:last-child")
          .textContent.toLowerCase();

        const matchesCategory =
          !categoryValue || category.includes(categoryValue);
        const matchesStatus = !statusValue || status === statusValue;
        const matchesHabitat = !habitatValue || habitat.includes(habitatValue);

        if (matchesCategory && matchesStatus && matchesHabitat) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });

      // Filter list view
      document.querySelectorAll(".animals-list tbody tr").forEach((row) => {
        const category = row
          .querySelector("td:nth-child(3)")
          .textContent.toLowerCase();
        const habitat = row
          .querySelector("td:nth-child(4)")
          .textContent.toLowerCase();
        const status = row
          .querySelector(".status")
          .className.replace("status ", "")
          .toLowerCase();

        const matchesCategory =
          !categoryValue || category.includes(categoryValue);
        const matchesStatus = !statusValue || status === statusValue;
        const matchesHabitat = !habitatValue || habitat.includes(habitatValue);

        if (matchesCategory && matchesStatus && matchesHabitat) {
          row.style.display = "table-row";
        } else {
          row.style.display = "none";
        }
      });
    };

    categoryFilter.addEventListener("change", applyFilters);
    statusFilter.addEventListener("change", applyFilters);
    habitatFilter.addEventListener("change", applyFilters);
  };

  setupFilters();

  // Modal functionality
  const setupModal = () => {
    const modal = document.getElementById("add-animal-modal");
    const addBtn = document.getElementById("add-animal-btn");
    const closeBtn = document.querySelector(".close-modal");
    const cancelBtn = document.querySelector(".cancel-btn");
    const form = document.getElementById("add-animal-form");

    const openModal = () => {
      modal.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent scrolling
    };

    const closeModal = () => {
      modal.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
      form.reset(); // Reset form fields
    };

    // Check URL parameters for action=add
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("action") === "add") {
      openModal();
      // Clean URL without reloading page
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    addBtn.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);
    cancelBtn.addEventListener("click", closeModal);

    // Close modal when clicking outside
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Form submission
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const animalName = document.getElementById("animal-name").value;
      const scientificName = document.getElementById("scientific-name").value;
      const category = document.getElementById("category").value;
      const status = document.getElementById("conservation-status").value;
      const habitat = document.getElementById("habitat").value;
      const description = document.getElementById("description").value;
      const imageFile = document.getElementById("animal-image").files[0];

      // In a real application, you would send this data to the server
      // For demo purposes, we'll just show an alert
      alert(`Animal "${animalName}" added successfully!`);

      // Close modal and reset form
      closeModal();

      // Optionally, you could add the new animal to the UI
      // This would require creating new DOM elements
    });
  };

  setupModal();

  // Action buttons functionality
  const setupActionButtons = () => {
    // Grid view buttons
    document.querySelectorAll(".card-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const card = this.closest(".animal-card");
        const animalName = card.querySelector("h3").textContent;

        if (this.classList.contains("view")) {
          alert(`View details for ${animalName}`);
          // In a real application, this would redirect to a details page
        } else if (this.classList.contains("edit")) {
          alert(`Edit ${animalName}`);
          // In a real application, this would open an edit modal
        } else if (this.classList.contains("delete")) {
          if (confirm(`Are you sure you want to delete ${animalName}?`)) {
            alert(`${animalName} has been deleted`);
            card.remove();
          }
        }
      });
    });

    // List view buttons (reusing code from dashboard.js)
    document.querySelectorAll(".animals-list .action-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const row = this.closest("tr");
        const animalName = row.querySelector(".animal-info span").textContent;

        if (this.classList.contains("view")) {
          alert(`View details for ${animalName}`);
        } else if (this.classList.contains("edit")) {
          alert(`Edit ${animalName}`);
        } else if (this.classList.contains("delete")) {
          if (confirm(`Are you sure you want to delete ${animalName}?`)) {
            alert(`${animalName} has been deleted`);
            row.remove();
          }
        }
      });
    });

    // Export button
    document
      .getElementById("export-btn")
      .addEventListener("click", function () {
        alert("Exporting animal data...");
        // In a real application, this would trigger a download
      });
  };

  setupActionButtons();

  // Pagination functionality
  const setupPagination = () => {
    const pageButtons = document.querySelectorAll(
      ".page-btn:not(.prev):not(.next)"
    );
    const prevBtn = document.querySelector(".page-btn.prev");
    const nextBtn = document.querySelector(".page-btn.next");

    pageButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        pageButtons.forEach((b) => b.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        // In a real application, this would load the corresponding page data
        // For demo purposes, we'll just scroll to top
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

  setupPagination();

  // Check for URL parameters to handle specific actions
  const handleUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get("action");

    if (action === "add") {
      // Modal is already handled in setupModal()
    }
  };

  handleUrlParams();
});
