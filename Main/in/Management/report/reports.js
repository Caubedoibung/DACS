document.addEventListener("DOMContentLoaded", function () {
  // Check user role and set permissions
  checkUserRole();

  // Mobile menu toggle (reused from dashboard.js)
  if (typeof createMobileMenuButton === "function") {
    createMobileMenuButton();
  }

  // Setup report tabs
  setupReportTabs();

  // Setup report filters
  setupReportFilters();

  // Setup export functionality
  setupExportButtons();
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

// Setup report tabs
function setupReportTabs() {
  const tabLinks = document.querySelectorAll(".reports-nav li");
  const tabContents = document.querySelectorAll(".report-tab");

  tabLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Remove active class from all tabs
      tabLinks.forEach((item) => item.classList.remove("active"));
      tabContents.forEach((item) => item.classList.remove("active"));

      // Add active class to current tab
      this.classList.add("active");

      // Show corresponding tab content
      const reportId = this.getAttribute("data-report");
      document.getElementById(`${reportId}-report`).classList.add("active");
    });
  });
}

// Setup report filters
function setupReportFilters() {
  const filters = document.querySelectorAll(".filter-group select");

  filters.forEach((filter) => {
    filter.addEventListener("change", function () {
      // In a real application, this would filter the data
      // For demo purposes, we'll just log the selected filters
      console.log(`Filter ${this.id} changed to: ${this.value}`);
    });
  });
}

// Setup export buttons
function setupExportButtons() {
  const exportButtons = document.querySelectorAll(".action-button");

  exportButtons.forEach((button) => {
    if (button.textContent.includes("Export")) {
      button.addEventListener("click", function () {
        // In a real application, this would export the data
        // For demo purposes, we'll just show an alert
        alert("Report exported successfully!");
      });
    }

    if (button.textContent.includes("Refresh")) {
      button.addEventListener("click", function () {
        // In a real application, this would refresh the data
        //  {
        // In a real application, this would refresh the data
        // For demo purposes, we'll just show an alert
        alert("Report data refreshed!");
      });
    }

    if (button.textContent.includes("Filter")) {
      button.addEventListener("click", function () {
        // In a real application, this would apply all filters
        // For demo purposes, we'll just show an alert
        alert("Filters applied!");
      });
    }

    if (button.textContent.includes("Create New Report")) {
      button.addEventListener("click", function () {
        // In a real application, this would open a report builder
        // For demo purposes, we'll just show an alert
        alert("Report builder would open here!");
      });
    }
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
