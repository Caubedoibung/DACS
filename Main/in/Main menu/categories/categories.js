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
});

// Check user role from localStorage and set permissions accordingly
function checkUserRole() {
  // In a real application, this would verify the JWT token or session
  // For demo purposes, we'll use localStorage
  const userRole = localStorage.getItem("userRole") || "user";
  const userName = localStorage.getItem("userName") || "Guest User";

  // Update UI based on role
  document.getElementById("user-name").textContent = userName;

  if (userRole === "admin") {
    // Show admin elements
    document.getElementById("user-role").textContent = "Administrator";
    document.getElementById("admin-menu").style.display = "block";

    // Show admin-only buttons
    const adminElements = document.querySelectorAll(".admin-only");
    adminElements.forEach((element) => {
      element.style.display = "flex";
    });
  } else {
    // Hide admin elements for regular users
    document.getElementById("user-role").textContent = "Viewer";
    document.getElementById("admin-menu").style.display = "none";

    // Hide admin-only buttons
    const adminElements = document.querySelectorAll(".admin-only");
    adminElements.forEach((element) => {
      element.style.display = "none";
    });
  }
}

// Setup filter functionality
function setupFilters() {
  const statusFilter = document.getElementById("status-filter");

  statusFilter.addEventListener("change", function () {
    const selectedStatus = this.value.toLowerCase();

    document.querySelectorAll(".category-card").forEach((card) => {
      const statusElement = card.querySelector(".status");
      const cardStatus = statusElement ? statusElement.classList[1] : "";

      if (!selectedStatus || cardStatus === selectedStatus) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// Setup modal functionality
function setupModal() {
  const modal = document.getElementById("add-category-modal");
  const addBtn = document.getElementById("add-category-btn");

  if (addBtn) {
    addBtn.addEventListener("click", function () {
      modal.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent scrolling
    });
  }

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// Close add category modal
function closeModal() {
  const modal = document.getElementById("add-category-modal");
  modal.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
  document.getElementById("add-category-form").reset();
}

// Close category details modal
function closeDetailsModal() {
  const modal = document.getElementById("category-details-modal");
  modal.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
}

// Setup form submission
function setupFormSubmission() {
  const form = document.getElementById("add-category-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const categoryName = document.getElementById("category-name").value;
    const description = document.getElementById("category-description").value;
    const icon = document.getElementById("category-icon").value;
    const status = document.getElementById("category-status").value;

    // In a real application, you would send this data to the server
    // For demo purposes, we'll just show an alert
    alert(`Category "${categoryName}" added successfully!`);

    // Close modal and reset form
    closeModal();
  });
}

// Category data for the modal
const categoryData = {
  mammals: {
    name: "Mammals",
    description:
      "Warm-blooded vertebrates characterized by hair/fur, mammary glands, and a neocortex",
    icon: "ri-bear-smile-line",
    iconColor: "#a3e635",
    iconBg: "rgba(163, 230, 53, 0.2)",
    status: "active",
    animalCount: 248,
    endangeredCount: 42,
    habitatCount: 18,
    animals: [
      {
        name: "African Lion",
        image: "../img/imglion.jpg",
        scientific: "Panthera leo",
        status: "vulnerable",
        habitat: "Africa",
      },
      {
        name: "Bengal Tiger",
        image: "../img/imglion.jpg",
        scientific: "Panthera tigris",
        status: "endangered",
        habitat: "Asia",
      },
      {
        name: "Gray Wolf",
        image: "../img/imglion.jpg",
        scientific: "Canis lupus",
        status: "least-concern",
        habitat: "North America",
      },
      {
        name: "African Elephant",
        image: "../img/imglion.jpg",
        scientific: "Loxodonta africana",
        status: "endangered",
        habitat: "Africa",
      },
      {
        name: "Polar Bear",
        image: "../img/imglion.jpg",
        scientific: "Ursus maritimus",
        status: "vulnerable",
        habitat: "Arctic",
      },
    ],
  },
  birds: {
    name: "Birds",
    description:
      "Warm-blooded vertebrates characterized by feathers, beaks, and laying eggs",
    icon: "ri-flight-takeoff-line",
    iconColor: "#2d89a8",
    iconBg: "rgba(45, 137, 168, 0.2)",
    status: "active",
    animalCount: 186,
    endangeredCount: 28,
    habitatCount: 14,
    animals: [
      {
        name: "Bald Eagle",
        image: "../img/imgeagle.jpg",
        scientific: "Haliaeetus leucocephalus",
        status: "least-concern",
        habitat: "North America",
      },
      {
        name: "Peregrine Falcon",
        image: "../img/imgeagle.jpg",
        scientific: "Falco peregrinus",
        status: "least-concern",
        habitat: "Global",
      },
      {
        name: "California Condor",
        image: "../img/imgeagle.jpg",
        scientific: "Gymnogyps californianus",
        status: "critical",
        habitat: "North America",
      },
      {
        name: "Emperor Penguin",
        image: "../img/imgeagle.jpg",
        scientific: "Aptenodytes forsteri",
        status: "vulnerable",
        habitat: "Antarctica",
      },
      {
        name: "Scarlet Macaw",
        image: "../img/imgeagle.jpg",
        scientific: "Ara macao",
        status: "endangered",
        habitat: "South America",
      },
    ],
  },
  reptiles: {
    name: "Reptiles",
    description:
      "Cold-blooded vertebrates characterized by scales, laying eggs, and ectothermic metabolism",
    icon: "ri-snake-line",
    iconColor: "#f83600",
    iconBg: "rgba(248, 54, 0, 0.2)",
    status: "active",
    animalCount: 142,
    endangeredCount: 36,
    habitatCount: 12,
    animals: [
      {
        name: "King Cobra",
        image: "../img/imgsnake.jpg",
        scientific: "Ophiophagus hannah",
        status: "vulnerable",
        habitat: "Asia",
      },
      {
        name: "Komodo Dragon",
        image: "../img/imgsnake.jpg",
        scientific: "Varanus komodoensis",
        status: "endangered",
        habitat: "Indonesia",
      },
      {
        name: "Galapagos Tortoise",
        image: "../img/imgsnake.jpg",
        scientific: "Chelonoidis niger",
        status: "vulnerable",
        habitat: "Galapagos Islands",
      },
      {
        name: "American Alligator",
        image: "../img/imgsnake.jpg",
        scientific: "Alligator mississippiensis",
        status: "least-concern",
        habitat: "North America",
      },
      {
        name: "Tuatara",
        image: "../img/imgsnake.jpg",
        scientific: "Sphenodon punctatus",
        status: "endangered",
        habitat: "New Zealand",
      },
    ],
  },
  amphibians: {
    name: "Amphibians",
    description:
      "Cold-blooded vertebrates that live both in water and on land during their life cycle",
    icon: "ri-water-flash-line",
    iconColor: "#0fd850",
    iconBg: "rgba(15, 216, 80, 0.2)",
    status: "active",
    animalCount: 98,
    endangeredCount: 32,
    habitatCount: 8,
    animals: [
      {
        name: "Poison Dart Frog",
        image: "../img/imgfrog.jpg",
        scientific: "Dendrobatidae",
        status: "critical",
        habitat: "South America",
      },
      {
        name: "Axolotl",
        image: "../img/imgfrog.jpg",
        scientific: "Ambystoma mexicanum",
        status: "critical",
        habitat: "Mexico",
      },
      {
        name: "American Bullfrog",
        image: "../img/imgfrog.jpg",
        scientific: "Lithobates catesbeianus",
        status: "least-concern",
        habitat: "North America",
      },
      {
        name: "Fire Salamander",
        image: "../img/imgfrog.jpg",
        scientific: "Salamandra salamandra",
        status: "least-concern",
        habitat: "Europe",
      },
      {
        name: "Golden Toad",
        image: "../img/imgfrog.jpg",
        scientific: "Incilius periglenes",
        status: "extinct",
        habitat: "Costa Rica",
      },
    ],
  },
  fish: {
    name: "Fish",
    description:
      "Aquatic vertebrates characterized by gills, fins, and living in water",
    icon: "ri-fish-line",
    iconColor: "#2d89a8",
    iconBg: "rgba(45, 137, 168, 0.2)",
    status: "active",
    animalCount: 156,
    endangeredCount: 48,
    habitatCount: 10,
    animals: [
      {
        name: "Great White Shark",
        image: "../img/imgshark.jpg",
        scientific: "Carcharodon carcharias",
        status: "endangered",
        habitat: "Oceans",
      },
      {
        name: "Clownfish",
        image: "../img/imgshark.jpg",
        scientific: "Amphiprioninae",
        status: "least-concern",
        habitat: "Coral Reefs",
      },
      {
        name: "Atlantic Bluefin Tuna",
        image: "../img/imgshark.jpg",
        scientific: "Thunnus thynnus",
        status: "endangered",
        habitat: "Atlantic Ocean",
      },
      {
        name: "Seahorse",
        image: "../img/imgshark.jpg",
        scientific: "Hippocampus",
        status: "vulnerable",
        habitat: "Coral Reefs",
      },
      {
        name: "Manta Ray",
        image: "../img/imgshark.jpg",
        scientific: "Manta birostris",
        status: "vulnerable",
        habitat: "Tropical Waters",
      },
    ],
  },
  invertebrates: {
    name: "Invertebrates",
    description:
      "Animals without a backbone or spinal column, including insects, mollusks, and more",
    icon: "ri-bug-line",
    iconColor: "#f9d423",
    iconBg: "rgba(248, 212, 35, 0.2)",
    status: "active",
    animalCount: 418,
    endangeredCount: 86,
    habitatCount: 24,
    animals: [
      {
        name: "Box Jellyfish",
        image: "../img/imgjellyfish.jpg",
        scientific: "Cubozoa",
        status: "least-concern",
        habitat: "Oceans",
      },
      {
        name: "Giant Squid",
        image: "../img/imgjellyfish.jpg",
        scientific: "Architeuthis dux",
        status: "least-concern",
        habitat: "Deep Ocean",
      },
      {
        name: "Monarch Butterfly",
        image: "../img/imgjellyfish.jpg",
        scientific: "Danaus plexippus",
        status: "endangered",
        habitat: "North America",
      },
      {
        name: "Blue Ringed Octopus",
        image: "../img/imgjellyfish.jpg",
        scientific: "Hapalochlaena",
        status: "least-concern",
        habitat: "Pacific Ocean",
      },
      {
        name: "Goliath Birdeater",
        image: "../img/imgjellyfish.jpg",
        scientific: "Theraphosa blondi",
        status: "least-concern",
        habitat: "South America",
      },
    ],
  },
};

// View category details
function viewCategory(categoryId) {
  const category = categoryData[categoryId];
  if (!category) return;

  // Populate modal with category data
  document.getElementById("modal-category-name").textContent = category.name;
  document.getElementById("modal-category-description").textContent =
    category.description;

  // Set icon
  const iconElement = document.getElementById("modal-category-icon");
  iconElement.style.backgroundColor = category.iconBg;
  iconElement.innerHTML = `<i class="${category.icon}" style="color: ${category.iconColor};"></i>`;

  // Set stats
  document.getElementById("modal-animal-count").textContent =
    category.animalCount;
  document.getElementById("modal-endangered-count").textContent =
    category.endangeredCount;
  document.getElementById("modal-habitat-count").textContent =
    category.habitatCount;

  // Populate animals list
  const animalsList = document.getElementById("category-animals-list");
  animalsList.innerHTML = "";

  category.animals.forEach((animal) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>
                <div class="animal-info">
                    <img src="${animal.image}" alt="${animal.name}">
                    <span>${animal.name}</span>
                </div>
            </td>
            <td>${animal.scientific}</td>
            <td><span class="status ${animal.status}">${
      animal.status.charAt(0).toUpperCase() + animal.status.slice(1)
    }</span></td>
            <td>${animal.habitat}</td>
        `;

    animalsList.appendChild(row);
  });

  // Show modal
  const modal = document.getElementById("category-details-modal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

// Admin functions
function editCategory(categoryId) {
  // In a real application, this would open an edit form
  alert(`Admin function: Edit ${categoryData[categoryId].name}`);
}

function deleteCategory(categoryId) {
  // In a real application, this would show a confirmation dialog and delete the category
  if (
    confirm(`Are you sure you want to delete ${categoryData[categoryId].name}?`)
  ) {
    alert(`Admin function: ${categoryData[categoryId].name} has been deleted`);
  }
}

function editCategoryFromModal() {
  const categoryName = document.getElementById(
    "modal-category-name"
  ).textContent;
  alert(`Admin function: Edit ${categoryName}`);
  closeDetailsModal();
}

// Set up demo user roles for testing
function setUserRole(role) {
  localStorage.setItem("userRole", role);
  localStorage.setItem(
    "userName",
    role === "admin" ? "Admin User" : "Regular User"
  );
  checkUserRole();
  alert(`User role set to: ${role}`);
}

// For testing: Add these lines to console to switch roles
// setUserRole('admin') - to set admin role
// setUserRole('user') - to set regular user role

// Dummy function to avoid errors. In a real application, this would be defined elsewhere.
function createMobileMenuButton() {
  // Implementation would go here
}
