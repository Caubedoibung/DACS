document.addEventListener("DOMContentLoaded", function () {
  // Check user role and set permissions
  checkUserRole();

  // Mobile menu toggle (reused from dashboard.js)
  if (typeof createMobileMenuButton === "function") {
    createMobileMenuButton();
  }

  // Setup settings tabs
  setupSettingsTabs();

  // Setup theme options
  setupThemeOptions();

  // Setup color options
  setupColorOptions();

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

// Setup settings tabs
function setupSettingsTabs() {
  const tabLinks = document.querySelectorAll(".settings-nav li");
  const tabContents = document.querySelectorAll(".settings-tab");

  tabLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Remove active class from all tabs
      tabLinks.forEach((item) => item.classList.remove("active"));
      tabContents.forEach((item) => item.classList.remove("active"));

      // Add active class to current tab
      this.classList.add("active");

      // Show corresponding tab content
      const tabId = this.getAttribute("data-tab");
      document.getElementById(`${tabId}-tab`).classList.add("active");
    });
  });
}

// Setup theme options
function setupThemeOptions() {
  const themeOptions = document.querySelectorAll(".theme-option");

  themeOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove active class from all options
      themeOptions.forEach((item) => item.classList.remove("active"));

      // Add active class to selected option
      this.classList.add("active");

      // In a real application, you would apply the theme here
      // For demo purposes, we'll just show an alert
      const theme = this.querySelector(".theme-preview").classList[1];
      console.log(`Theme changed to: ${theme}`);
    });
  });
}

// Setup color options
function setupColorOptions() {
  const colorOptions = document.querySelectorAll(".color-option");

  colorOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove active class from all options
      colorOptions.forEach((item) => item.classList.remove("active"));

      // Add active class to selected option
      this.classList.add("active");

      // In a real application, you would apply the color here
      // For demo purposes, we'll just show an alert
      const color = this.style.getPropertyValue("--color");
      console.log(`Accent color changed to: ${color}`);
    });
  });
}

// Setup form submission
function setupFormSubmission() {
  const saveBtns = document.querySelectorAll(".save-btn");

  saveBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // In a real application, you would save the settings here
      // For demo purposes, we'll just show an alert
      alert("Settings saved successfully!");
    });
  });

  const cancelBtns = document.querySelectorAll(".cancel-btn");

  cancelBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // In a real application, you would reset the form here
      // For demo purposes, we'll just show an alert
      if (confirm("Are you sure you want to reset to default settings?")) {
        alert("Settings reset to default!");
      }
    });
  });
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
