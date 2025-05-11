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
  const regionFilter = document.getElementById("region-filter");

  const applyFilters = () => {
    const selectedStatus = statusFilter.value.toLowerCase();
    const selectedRegion = regionFilter.value.toLowerCase();

    const rows = document.querySelectorAll(".conservation-table tbody tr");

    rows.forEach((row) => {
      const statusElement = row.querySelector(".status");
      const regionCell = row.querySelector("td:nth-child(3)");

      const rowStatus = statusElement ? statusElement.classList[1] : "";
      const rowRegion = regionCell ? regionCell.textContent.toLowerCase() : "";

      const matchesStatus = !selectedStatus || rowStatus === selectedStatus;
      const matchesRegion =
        !selectedRegion || rowRegion.toLowerCase() === selectedRegion;

      if (matchesStatus && matchesRegion) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  };

  statusFilter.addEventListener("change", applyFilters);
  regionFilter.addEventListener("change", applyFilters);
}

// Setup modal functionality
function setupModal() {
  const modal = document.getElementById("add-program-modal");
  const addBtn = document.getElementById("add-program-btn");

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

// Close add program modal
function closeModal() {
  const modal = document.getElementById("add-program-modal");
  modal.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
  document.getElementById("add-program-form").reset();
}

// Close program details modal
function closeDetailsModal() {
  const modal = document.getElementById("program-details-modal");
  modal.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
}

// Setup form submission
function setupFormSubmission() {
  const form = document.getElementById("add-program-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const programName = document.getElementById("program-name").value;
    const organization = document.getElementById("organization").value;
    const targetSpecies = document.getElementById("target-species").value;
    const region = document.getElementById("program-region").value;
    const status = document.getElementById("program-status").value;
    const budget = document.getElementById("program-budget").value;
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
    const description = document.getElementById("program-description").value;

    // In a real application, you would send this data to the server
    // For demo purposes, we'll just show an alert
    alert(`Program "${programName}" added successfully!`);

    // Close modal and reset form
    closeModal();
  });
}

// Program data for the modal
const programData = {
  "tiger-conservation": {
    name: "Tiger Conservation Initiative",
    organization: "World Wildlife Fund",
    targetSpecies: "Bengal Tiger",
    region: "Asia",
    status: "active",
    statusText: "Active",
    budget: "$850,000",
    startDate: "January 15, 2022",
    endDate: "December 31, 2025",
    duration: "4 years",
    description:
      "The Tiger Conservation Initiative aims to protect and increase wild tiger populations across Asia. The program focuses on anti-poaching efforts, habitat preservation, and community engagement to reduce human-tiger conflicts. Through collaborative efforts with local governments and communities, the initiative works to create sustainable solutions for tiger conservation.",
    achievements: [
      "Increased tiger population by 15% in target regions",
      "Established 3 new protected areas covering 500,000 hectares",
      "Trained 120 rangers in anti-poaching techniques",
      "Reduced poaching incidents by 40% in the last year",
      "Implemented community-based monitoring systems in 24 villages",
    ],
    species: [
      {
        name: "Bengal Tiger",
        image: "../img/imglion.jpg",
        status: "endangered",
      },
      {
        name: "Indochinese Tiger",
        image: "../img/imglion.jpg",
        status: "critical",
      },
      {
        name: "Malayan Tiger",
        image: "../img/imglion.jpg",
        status: "critical",
      },
    ],
  },
  "coral-restoration": {
    name: "Coral Reef Restoration",
    organization: "Ocean Conservation Society",
    targetSpecies: "Multiple Coral Species",
    region: "Oceans",
    status: "active",
    statusText: "Active",
    budget: "$1,200,000",
    startDate: "March 22, 2021",
    endDate: "March 22, 2026",
    duration: "5 years",
    description:
      "The Coral Reef Restoration program focuses on rehabilitating damaged coral reefs through innovative techniques such as coral gardening and artificial reef structures. The program also addresses the root causes of coral decline, including water pollution, overfishing, and climate change. By working with local communities and governments, the initiative promotes sustainable marine practices and coral conservation.",
    achievements: [
      "Successfully transplanted over 10,000 coral fragments",
      "Established 15 coral nurseries across 5 different regions",
      "Trained 80 local divers in coral restoration techniques",
      "Improved water quality in 7 key reef areas",
      "Developed new heat-resistant coral strains",
    ],
    species: [
      {
        name: "Staghorn Coral",
        image: "../img/imgshark.jpg",
        status: "critical",
      },
      {
        name: "Elkhorn Coral",
        image: "../img/imgshark.jpg",
        status: "critical",
      },
      {
        name: "Brain Coral",
        image: "../img/imgshark.jpg",
        status: "vulnerable",
      },
      {
        name: "Table Coral",
        image: "../img/imgshark.jpg",
        status: "vulnerable",
      },
    ],
  },
  "elephant-protection": {
    name: "African Elephant Protection",
    organization: "African Wildlife Foundation",
    targetSpecies: "African Elephant",
    region: "Africa",
    status: "active",
    statusText: "Active",
    budget: "$920,000",
    startDate: "September 10, 2022",
    endDate: "September 10, 2027",
    duration: "5 years",
    description:
      "The African Elephant Protection program works to secure a future for elephants by combating poaching, reducing human-elephant conflict, and preserving critical habitats. The initiative employs advanced tracking technology, supports anti-poaching units, and works with local communities to develop sustainable livelihoods that don't threaten elephant populations. The program also advocates for stronger international policies against ivory trade.",
    achievements: [
      "Reduced elephant poaching by 35% in target areas",
      "Protected 1.2 million acres of elephant habitat",
      "Installed 45 early warning systems to reduce human-elephant conflicts",
      "Trained and equipped 60 anti-poaching rangers",
      "Established alternative livelihood programs in 18 communities",
    ],
    species: [
      {
        name: "African Bush Elephant",
        image: "../img/imglion.jpg",
        status: "endangered",
      },
      {
        name: "African Forest Elephant",
        image: "../img/imglion.jpg",
        status: "critical",
      },
    ],
  },
  "amazon-preservation": {
    name: "Amazon Rainforest Preservation",
    organization: "Rainforest Alliance",
    targetSpecies: "Multiple Species",
    region: "South America",
    status: "active",
    statusText: "Active",
    budget: "$1,500,000",
    startDate: "June 05, 2021",
    endDate: "June 05, 2026",
    duration: "5 years",
    description:
      "The Amazon Rainforest Preservation program works to protect the world's largest rainforest through a combination of conservation initiatives, sustainable development projects, and policy advocacy. The program focuses on preventing deforestation, supporting indigenous communities, and promoting sustainable agriculture and forestry practices. By preserving the Amazon, the initiative helps protect biodiversity, maintain carbon sequestration, and support the livelihoods of millions of people.",
    achievements: [
      "Protected over 2 million acres of primary rainforest",
      "Partnered with 35 indigenous communities to establish land rights",
      "Reduced illegal logging by 28% in monitored areas",
      "Implemented sustainable agriculture practices with 120 farming communities",
      "Established 12 wildlife corridors connecting fragmented forest areas",
    ],
    species: [
      { name: "Jaguar", image: "../img/imglion.jpg", status: "endangered" },
      {
        name: "Poison Dart Frog",
        image: "../img/imgfrog.jpg",
        status: "critical",
      },
      {
        name: "Scarlet Macaw",
        image: "../img/imgeagle.jpg",
        status: "endangered",
      },
      {
        name: "Giant Otter",
        image: "../img/imglion.jpg",
        status: "endangered",
      },
      {
        name: "Amazon River Dolphin",
        image: "../img/imgshark.jpg",
        status: "endangered",
      },
    ],
  },
  "polar-bear-research": {
    name: "Polar Bear Research",
    organization: "Arctic Research Institute",
    targetSpecies: "Polar Bear",
    region: "Arctic",
    status: "planned",
    statusText: "Planned",
    budget: "$750,000",
    startDate: "January 15, 2024",
    endDate: "January 15, 2027",
    duration: "3 years",
    description:
      "The Polar Bear Research program aims to study the impacts of climate change on polar bear populations and develop conservation strategies to ensure their survival. The initiative will use satellite tracking, genetic analysis, and field observations to monitor polar bear health, movement patterns, and adaptation to changing ice conditions. The research will inform policy recommendations for Arctic conservation and climate change mitigation.",
    achievements: [
      "Secured funding and partnerships for the 3-year research program",
      "Developed advanced tracking technology for harsh Arctic conditions",
      "Established collaboration with 5 Arctic research stations",
      "Created comprehensive research protocol for consistent data collection",
      "Recruited team of 15 specialized researchers and field technicians",
    ],
    species: [
      { name: "Polar Bear", image: "../img/imglion.jpg", status: "vulnerable" },
    ],
  },
  "condor-recovery": {
    name: "California Condor Recovery",
    organization: "North American Conservation Fund",
    targetSpecies: "California Condor",
    region: "North America",
    status: "completed",
    statusText: "Completed",
    budget: "$620,000",
    startDate: "April 18, 2020",
    endDate: "April 18, 2023",
    duration: "3 years",
    description:
      "The California Condor Recovery program worked to bring the California condor back from the brink of extinction through captive breeding, reintroduction, and habitat protection. The initiative addressed key threats to condors, including lead poisoning from ammunition, habitat loss, and power line collisions. Through collaborative efforts with government agencies, private landowners, and conservation organizations, the program successfully increased wild condor populations and improved their long-term survival prospects.",
    achievements: [
      "Increased wild California condor population from 22 to 93 individuals",
      "Successfully released 45 captive-bred condors into the wild",
      "Established 3 new protected nesting sites",
      "Implemented lead ammunition regulations in key condor habitat",
      "Developed new veterinary treatments for lead poisoning",
      "Created public education programs reaching over 50,000 people",
    ],
    species: [
      {
        name: "California Condor",
        image: "../img/imgeagle.jpg",
        status: "critical",
      },
    ],
  },
};

// View program details
function viewProgram(programId) {
  const program = programData[programId];
  if (!program) return;

  // Populate modal with program data
  document.getElementById("modal-program-name").textContent = program.name;
  document.getElementById("modal-program-org").textContent =
    program.organization;

  const statusElement = document.getElementById("modal-program-status");
  statusElement.textContent = program.statusText;
  statusElement.className = "status " + program.status;

  document.getElementById("modal-target-species").textContent =
    program.targetSpecies;
  document.getElementById("modal-region").textContent = program.region;
  document.getElementById("modal-budget").textContent = program.budget;
  document.getElementById("modal-start-date").textContent = program.startDate;
  document.getElementById("modal-end-date").textContent =
    program.endDate || "Ongoing";
  document.getElementById("modal-duration").textContent = program.duration;
  document.getElementById("modal-description").textContent =
    program.description;

  // Populate achievements list
  const achievementsList = document.getElementById("modal-achievements");
  achievementsList.innerHTML = "";

  program.achievements.forEach((achievement) => {
    const li = document.createElement("li");
    li.textContent = achievement;
    achievementsList.appendChild(li);
  });

  // Populate species grid
  const speciesGrid = document.getElementById("modal-species-grid");
  speciesGrid.innerHTML = "";

  program.species.forEach((species) => {
    const speciesCard = document.createElement("div");
    speciesCard.className = "species-card";

    speciesCard.innerHTML = `
            <div class="species-image">
                <img src="${species.image}" alt="${species.name}">
            </div>
            <div class="species-info">
                <p class="species-name">${species.name}</p>
                <span class="species-status status ${species.status}">${
      species.status.charAt(0).toUpperCase() + species.status.slice(1)
    }</span>
            </div>
        `;

    speciesGrid.appendChild(speciesCard);
  });

  // Show modal
  const modal = document.getElementById("program-details-modal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

// Admin functions
function editProgram(programId) {
  // In a real application, this would open an edit form
  alert(`Admin function: Edit ${programData[programId].name}`);
}

function deleteProgram(programId) {
  // In a real application, this would show a confirmation dialog and delete the program
  if (
    confirm(`Are you sure you want to delete ${programData[programId].name}?`)
  ) {
    alert(`Admin function: ${programData[programId].name} has been deleted`);
  }
}

function editProgramFromModal() {
  const programName = document.getElementById("modal-program-name").textContent;
  alert(`Admin function: Edit ${programName}`);
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
