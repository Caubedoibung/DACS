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
  const regionFilter = document.getElementById("region-filter");
  const typeFilter = document.getElementById("type-filter");

  const applyFilters = () => {
    const selectedRegion = regionFilter.value.toLowerCase();
    const selectedType = typeFilter.value.toLowerCase();

    document.querySelectorAll(".habitat-card").forEach((card) => {
      const regionElement = card.querySelector(".habitat-region");
      const typeElement = card.querySelector(".habitat-type");

      const cardRegion = regionElement
        ? regionElement.textContent.toLowerCase()
        : "";
      const cardType = typeElement ? typeElement.classList[1] : "";

      const matchesRegion = !selectedRegion || cardRegion === selectedRegion;
      const matchesType = !selectedType || cardType === selectedType;

      if (matchesRegion && matchesType) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  };

  regionFilter.addEventListener("change", applyFilters);
  typeFilter.addEventListener("change", applyFilters);
}

// Setup modal functionality
function setupModal() {
  const modal = document.getElementById("add-habitat-modal");
  const addBtn = document.getElementById("add-habitat-btn");

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

// Close add habitat modal
function closeModal() {
  const modal = document.getElementById("add-habitat-modal");
  modal.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
  document.getElementById("add-habitat-form").reset();
}

// Close habitat details modal
function closeDetailsModal() {
  const modal = document.getElementById("habitat-details-modal");
  modal.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
}

// Setup form submission
function setupFormSubmission() {
  const form = document.getElementById("add-habitat-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const habitatName = document.getElementById("habitat-name").value;
    const description = document.getElementById("habitat-description").value;
    const type = document.getElementById("habitat-type").value;
    const region = document.getElementById("habitat-region").value;
    const imageFile = document.getElementById("habitat-image").files[0];

    // In a real application, you would send this data to the server
    // For demo purposes, we'll just show an alert
    alert(`Habitat "${habitatName}" added successfully!`);

    // Close modal and reset form
    closeModal();
  });
}

// Habitat data for the modal
const habitatData = {
  savanna: {
    name: "Savanna",
    description:
      "Grassland ecosystem with scattered trees, characterized by warm temperatures year-round and seasonal rainfall. Savannas are home to some of the most iconic wildlife on Earth, including lions, elephants, giraffes, and zebras. They cover approximately 20% of the Earth's land surface and are found primarily in Africa, but also in South America, Australia, and parts of Asia.",
    image: "../img/imglion.jpg",
    type: "terrestrial",
    typeText: "Terrestrial",
    region: "Africa",
    animalCount: 124,
    endangeredCount: 36,
    categoryCount: 5,
    animals: [
      {
        name: "African Lion",
        image: "../img/imglion.jpg",
        scientific: "Panthera leo",
        category: "Mammals",
        status: "vulnerable",
      },
      {
        name: "African Elephant",
        image: "../img/imglion.jpg",
        scientific: "Loxodonta africana",
        category: "Mammals",
        status: "endangered",
      },
      {
        name: "Giraffe",
        image: "../img/imglion.jpg",
        scientific: "Giraffa camelopardalis",
        category: "Mammals",
        status: "vulnerable",
      },
      {
        name: "Zebra",
        image: "../img/imglion.jpg",
        scientific: "Equus quagga",
        category: "Mammals",
        status: "least-concern",
      },
      {
        name: "Cheetah",
        image: "../img/imglion.jpg",
        scientific: "Acinonyx jubatus",
        category: "Mammals",
        status: "endangered",
      },
    ],
  },
  "coral-reef": {
    name: "Coral Reef",
    description:
      "Diverse underwater ecosystems held together by calcium carbonate structures secreted by corals. Coral reefs are among the most diverse ecosystems on Earth, housing approximately 25% of all marine species despite covering less than 1% of the ocean floor. They are found in shallow, tropical waters and provide critical habitat for thousands of species of fish, invertebrates, and other marine life.",
    image: "../img/imgshark.jpg",
    type: "aquatic",
    typeText: "Aquatic",
    region: "Oceans",
    animalCount: 186,
    endangeredCount: 42,
    categoryCount: 8,
    animals: [
      {
        name: "Clownfish",
        image: "../img/imgshark.jpg",
        scientific: "Amphiprioninae",
        category: "Fish",
        status: "least-concern",
      },
      {
        name: "Blue Tang",
        image: "../img/imgshark.jpg",
        scientific: "Paracanthurus hepatus",
        category: "Fish",
        status: "least-concern",
      },
      {
        name: "Hawksbill Turtle",
        image: "../img/imgshark.jpg",
        scientific: "Eretmochelys imbricata",
        category: "Reptiles",
        status: "critical",
      },
      {
        name: "Reef Shark",
        image: "../img/imgshark.jpg",
        scientific: "Carcharhinus melanopterus",
        category: "Fish",
        status: "vulnerable",
      },
      {
        name: "Giant Clam",
        image: "../img/imgshark.jpg",
        scientific: "Tridacna gigas",
        category: "Invertebrates",
        status: "vulnerable",
      },
    ],
  },
  rainforest: {
    name: "Rainforest",
    description:
      "Forest characterized by high rainfall, with annual rainfall in the case of tropical rainforests between 250-450 cm. Rainforests are incredibly diverse ecosystems that are home to more than half of the world's plant and animal species. They play a crucial role in regulating global climate by absorbing carbon dioxide and producing oxygen. The largest rainforest, the Amazon, spans nine countries in South America.",
    image: "../img/imgsnake.jpg",
    type: "terrestrial",
    typeText: "Terrestrial",
    region: "South America",
    animalCount: 214,
    endangeredCount: 68,
    categoryCount: 12,
    animals: [
      {
        name: "Poison Dart Frog",
        image: "../img/imgfrog.jpg",
        scientific: "Dendrobatidae",
        category: "Amphibians",
        status: "critical",
      },
      {
        name: "Jaguar",
        image: "../img/imglion.jpg",
        scientific: "Panthera onca",
        category: "Mammals",
        status: "endangered",
      },
      {
        name: "Toucan",
        image: "../img/imgeagle.jpg",
        scientific: "Ramphastidae",
        category: "Birds",
        status: "least-concern",
      },
      {
        name: "Anaconda",
        image: "../img/imgsnake.jpg",
        scientific: "Eunectes murinus",
        category: "Reptiles",
        status: "least-concern",
      },
      {
        name: "Spider Monkey",
        image: "../img/imglion.jpg",
        scientific: "Ateles",
        category: "Mammals",
        status: "endangered",
      },
    ],
  },
  wetlands: {
    name: "Wetlands",
    description:
      "Land areas that are saturated or flooded with water either permanently or seasonally. Wetlands are highly productive ecosystems that provide habitat for numerous species of plants, fish, birds, and other wildlife. They also play important roles in water purification, flood control, and shoreline stability. Types of wetlands include marshes, swamps, bogs, and fens.",
    image: "../img/imgfrog.jpg",
    type: "aquatic",
    typeText: "Aquatic",
    region: "Global",
    animalCount: 156,
    endangeredCount: 48,
    categoryCount: 7,
    animals: [
      {
        name: "American Alligator",
        image: "../img/imgsnake.jpg",
        scientific: "Alligator mississippiensis",
        category: "Reptiles",
        status: "least-concern",
      },
      {
        name: "Great Blue Heron",
        image: "../img/imgeagle.jpg",
        scientific: "Ardea herodias",
        category: "Birds",
        status: "least-concern",
      },
      {
        name: "River Otter",
        image: "../img/imglion.jpg",
        scientific: "Lontra canadensis",
        category: "Mammals",
        status: "least-concern",
      },
      {
        name: "Bullfrog",
        image: "../img/imgfrog.jpg",
        scientific: "Lithobates catesbeianus",
        category: "Amphibians",
        status: "least-concern",
      },
      {
        name: "Dragonfly",
        image: "../img/imgjellyfish.jpg",
        scientific: "Anisoptera",
        category: "Invertebrates",
        status: "least-concern",
      },
    ],
  },
  mountains: {
    name: "Mountains",
    description:
      "Large landform that rises prominently above its surroundings, characterized by steep slopes. Mountain ecosystems are characterized by distinct elevational zonation of vegetation and animal communities. They are home to specialized species adapted to harsh conditions including cold temperatures, high UV radiation, and low oxygen levels. Mountains also serve as important water sources, with many major rivers originating in mountain ranges.",
    image: "../img/imgeagle.jpg",
    type: "terrestrial",
    typeText: "Terrestrial",
    region: "Global",
    animalCount: 98,
    endangeredCount: 32,
    categoryCount: 6,
    animals: [
      {
        name: "Bald Eagle",
        image: "../img/imgeagle.jpg",
        scientific: "Haliaeetus leucocephalus",
        category: "Birds",
        status: "least-concern",
      },
      {
        name: "Snow Leopard",
        image: "../img/imglion.jpg",
        scientific: "Panthera uncia",
        category: "Mammals",
        status: "endangered",
      },
      {
        name: "Mountain Goat",
        image: "../img/imglion.jpg",
        scientific: "Oreamnos americanus",
        category: "Mammals",
        status: "least-concern",
      },
      {
        name: "Alpine Marmot",
        image: "../img/imglion.jpg",
        scientific: "Marmota marmota",
        category: "Mammals",
        status: "least-concern",
      },
      {
        name: "Golden Eagle",
        image: "../img/imgeagle.jpg",
        scientific: "Aquila chrysaetos",
        category: "Birds",
        status: "least-concern",
      },
    ],
  },
  "deep-ocean": {
    name: "Deep Ocean",
    description:
      "The deepest parts of the ocean, characterized by high pressure, cold temperatures, and absence of light. The deep ocean is one of the least explored environments on Earth, with many species still undiscovered. Despite harsh conditions including extreme pressure, cold temperatures, and no sunlight, the deep ocean supports a surprising diversity of life. Many deep-sea creatures have evolved bioluminescence to communicate, attract prey, or deter predators in the darkness.",
    image: "../img/imgjellyfish.jpg",
    type: "aquatic",
    typeText: "Aquatic",
    region: "Oceans",
    animalCount: 112,
    endangeredCount: 28,
    categoryCount: 4,
    animals: [
      {
        name: "Giant Squid",
        image: "../img/imgjellyfish.jpg",
        scientific: "Architeuthis dux",
        category: "Invertebrates",
        status: "least-concern",
      },
      {
        name: "Anglerfish",
        image: "../img/imgshark.jpg",
        scientific: "Lophiiformes",
        category: "Fish",
        status: "least-concern",
      },
      {
        name: "Dumbo Octopus",
        image: "../img/imgjellyfish.jpg",
        scientific: "Grimpoteuthis",
        category: "Invertebrates",
        status: "least-concern",
      },
      {
        name: "Vampire Squid",
        image: "../img/imgjellyfish.jpg",
        scientific: "Vampyroteuthis infernalis",
        category: "Invertebrates",
        status: "least-concern",
      },
      {
        name: "Gulper Eel",
        image: "../img/imgshark.jpg",
        scientific: "Eurypharynx pelecanoides",
        category: "Fish",
        status: "least-concern",
      },
    ],
  },
};

// View habitat details
function viewHabitat(habitatId) {
  const habitat = habitatData[habitatId];
  if (!habitat) return;

  // Populate modal with habitat data
  document.getElementById("modal-habitat-name").textContent = habitat.name;
  document.getElementById("modal-habitat-image").src = habitat.image;
  document.getElementById("modal-habitat-image").alt = habitat.name;

  const typeElement = document.getElementById("modal-habitat-type");
  typeElement.textContent = habitat.typeText;
  typeElement.className = "habitat-type " + habitat.type;

  document.getElementById("modal-habitat-region").textContent = habitat.region;
  document.getElementById("modal-habitat-description").textContent =
    habitat.description;

  // Set stats
  document.getElementById("modal-animal-count").textContent =
    habitat.animalCount;
  document.getElementById("modal-endangered-count").textContent =
    habitat.endangeredCount;
  document.getElementById("modal-category-count").textContent =
    habitat.categoryCount;

  // Populate animals list
  const animalsList = document.getElementById("habitat-animals-list");
  animalsList.innerHTML = "";

  habitat.animals.forEach((animal) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>
                <div class="animal-info">
                    <img src="${animal.image}" alt="${animal.name}">
                    <span>${animal.name}</span>
                </div>
            </td>
            <td>${animal.scientific}</td>
            <td>${animal.category}</td>
            <td><span class="status ${animal.status}">${
      animal.status.charAt(0).toUpperCase() + animal.status.slice(1)
    }</span></td>
        `;

    animalsList.appendChild(row);
  });

  // Show modal
  const modal = document.getElementById("habitat-details-modal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

// Admin functions
function editHabitat(habitatId) {
  // In a real application, this would open an edit form
  alert(`Admin function: Edit ${habitatData[habitatId].name}`);
}

function deleteHabitat(habitatId) {
  // In a real application, this would show a confirmation dialog and delete the habitat
  if (
    confirm(`Are you sure you want to delete ${habitatData[habitatId].name}?`)
  ) {
    alert(`Admin function: ${habitatData[habitatId].name} has been deleted`);
  }
}

function editHabitatFromModal() {
  const habitatName = document.getElementById("modal-habitat-name").textContent;
  alert(`Admin function: Edit ${habitatName}`);
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
