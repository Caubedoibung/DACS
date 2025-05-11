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
  const roleFilter = document.getElementById("role-filter");
  const statusFilter = document.getElementById("status-filter");

  const applyFilters = () => {
    const selectedRole = roleFilter.value.toLowerCase();
    const selectedStatus = statusFilter.value.toLowerCase();

    const rows = document.querySelectorAll(".users-table tbody tr");

    rows.forEach((row) => {
      const roleElement = row.querySelector(".role");
      const statusElement = row.querySelector(".status");

      const rowRole = roleElement ? roleElement.classList[1] : "";
      const rowStatus = statusElement ? statusElement.classList[1] : "";

      const matchesRole = !selectedRole || rowRole === selectedRole;
      const matchesStatus = !selectedStatus || rowStatus === selectedStatus;

      if (matchesRole && matchesStatus) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  };

  roleFilter.addEventListener("change", applyFilters);
  statusFilter.addEventListener("change", applyFilters);
}

// Setup modal functionality
function setupModal() {
  const modal = document.getElementById("add-user-modal");
  const addBtn = document.getElementById("add-user-btn");

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

// Close add user modal
function closeModal() {
  const modal = document.getElementById("add-user-modal");
  modal.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
  document.getElementById("add-user-form").reset();
}

// Close user details modal
function closeDetailsModal() {
  const modal = document.getElementById("user-details-modal");
  modal.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
}

// Setup form submission
function setupFormSubmission() {
  const form = document.getElementById("add-user-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("user-role").value;
    const status = document.getElementById("user-status").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Validate passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // In a real application, you would send this data to the server
    // For demo purposes, we'll just show an alert
    alert(`User "${firstName} ${lastName}" added successfully!`);

    // Close modal and reset form
    closeModal();
  });
}

// User data for the modal
const userData = {
  "admin-user": {
    name: "Admin User",
    id: "#001",
    email: "admin@example.com",
    role: "admin",
    roleText: "Administrator",
    status: "active",
    statusText: "Active",
    avatar: "../img/imgLogin.jpg",
    createdDate: "Jan 15, 2023",
    lastLogin: "Today, 10:45 AM",
    lastUpdated: "Mar 22, 2023",
    loginCount: "42",
    permissions: [
      { icon: "ri-user-settings-line", text: "User Management" },
      { icon: "ri-shield-star-line", text: "System Administration" },
      { icon: "ri-database-2-line", text: "Database Access" },
      { icon: "ri-file-edit-line", text: "Content Management" },
      { icon: "ri-settings-line", text: "System Settings" },
      { icon: "ri-file-chart-line", text: "Reports Access" },
    ],
    activity: [
      {
        icon: "ri-login-circle-line",
        text: "Logged into the system",
        time: "Today, 10:45 AM",
      },
      {
        icon: "ri-user-add-line",
        text: "Added new user: Sarah Johnson",
        time: "Yesterday, 14:30 PM",
      },
      {
        icon: "ri-settings-line",
        text: "Updated system settings",
        time: "Yesterday, 11:15 AM",
      },
      {
        icon: "ri-database-2-line",
        text: "Performed database backup",
        time: "3 days ago",
      },
    ],
  },
  "sarah-johnson": {
    name: "Sarah Johnson",
    id: "#002",
    email: "sarah.j@example.com",
    role: "admin",
    roleText: "Administrator",
    status: "active",
    statusText: "Active",
    avatar: "../img/imgLogin.jpg",
    createdDate: "Feb 03, 2023",
    lastLogin: "Today, 09:12 AM",
    lastUpdated: "Apr 10, 2023",
    loginCount: "38",
    permissions: [
      { icon: "ri-user-settings-line", text: "User Management" },
      { icon: "ri-shield-star-line", text: "System Administration" },
      { icon: "ri-database-2-line", text: "Database Access" },
      { icon: "ri-file-edit-line", text: "Content Management" },
      { icon: "ri-settings-line", text: "System Settings" },
      { icon: "ri-file-chart-line", text: "Reports Access" },
    ],
    activity: [
      {
        icon: "ri-login-circle-line",
        text: "Logged into the system",
        time: "Today, 09:12 AM",
      },
      {
        icon: "ri-bear-smile-line",
        text: "Added new animal: Snow Leopard",
        time: "Yesterday, 16:45 PM",
      },
      {
        icon: "ri-earth-line",
        text: "Updated habitat information",
        time: "2 days ago",
      },
      {
        icon: "ri-file-chart-line",
        text: "Generated monthly report",
        time: "5 days ago",
      },
    ],
  },
  "michael-chen": {
    name: "Michael Chen",
    id: "#003",
    email: "michael.c@example.com",
    role: "editor",
    roleText: "Editor",
    status: "active",
    statusText: "Active",
    avatar: "../img/imgLogin.jpg",
    createdDate: "Mar 15, 2023",
    lastLogin: "Yesterday, 15:30 PM",
    lastUpdated: "May 05, 2023",
    loginCount: "26",
    permissions: [
      { icon: "ri-file-edit-line", text: "Content Management" },
      { icon: "ri-bear-smile-line", text: "Animal Records" },
      { icon: "ri-folder-line", text: "Categories Management" },
      { icon: "ri-earth-line", text: "Habitats Management" },
    ],
    activity: [
      {
        icon: "ri-login-circle-line",
        text: "Logged into the system",
        time: "Yesterday, 15:30 PM",
      },
      {
        icon: "ri-bear-smile-line",
        text: "Updated animal information: Bengal Tiger",
        time: "2 days ago",
      },
      {
        icon: "ri-folder-line",
        text: "Added new category: Marine Mammals",
        time: "4 days ago",
      },
      {
        icon: "ri-file-edit-line",
        text: "Edited content on homepage",
        time: "1 week ago",
      },
    ],
  },
  "emily-rodriguez": {
    name: "Emily Rodriguez",
    id: "#004",
    email: "emily.r@example.com",
    role: "editor",
    roleText: "Editor",
    status: "active",
    statusText: "Active",
    avatar: "../img/imgLogin.jpg",
    createdDate: "Apr 02, 2023",
    lastLogin: "Yesterday, 11:20 AM",
    lastUpdated: "Jun 12, 2023",
    loginCount: "19",
    permissions: [
      { icon: "ri-file-edit-line", text: "Content Management" },
      { icon: "ri-bear-smile-line", text: "Animal Records" },
      { icon: "ri-folder-line", text: "Categories Management" },
      { icon: "ri-earth-line", text: "Habitats Management" },
    ],
    activity: [
      {
        icon: "ri-login-circle-line",
        text: "Logged into the system",
        time: "Yesterday, 11:20 AM",
      },
      {
        icon: "ri-shield-star-line",
        text: "Updated conservation program details",
        time: "3 days ago",
      },
      {
        icon: "ri-earth-line",
        text: "Added new habitat: Alpine Tundra",
        time: "5 days ago",
      },
      {
        icon: "ri-bear-smile-line",
        text: "Updated animal status: California Condor",
        time: "1 week ago",
      },
    ],
  },
  "david-wilson": {
    name: "David Wilson",
    id: "#005",
    email: "david.w@example.com",
    role: "viewer",
    roleText: "Viewer",
    status: "inactive",
    statusText: "Inactive",
    avatar: "../img/imgLogin.jpg",
    createdDate: "May 10, 2023",
    lastLogin: "3 days ago",
    lastUpdated: "May 10, 2023",
    loginCount: "5",
    permissions: [
      { icon: "ri-eye-line", text: "View Animal Records" },
      { icon: "ri-eye-line", text: "View Categories" },
      { icon: "ri-eye-line", text: "View Habitats" },
    ],
    activity: [
      {
        icon: "ri-login-circle-line",
        text: "Logged into the system",
        time: "3 days ago",
      },
      {
        icon: "ri-eye-line",
        text: "Viewed animal details: African Elephant",
        time: "3 days ago",
      },
      {
        icon: "ri-eye-line",
        text: "Viewed conservation programs",
        time: "3 days ago",
      },
      {
        icon: "ri-logout-circle-line",
        text: "Logged out of the system",
        time: "3 days ago",
      },
    ],
  },
  "jessica-kim": {
    name: "Jessica Kim",
    id: "#006",
    email: "jessica.k@example.com",
    role: "viewer",
    roleText: "Viewer",
    status: "active",
    statusText: "Active",
    avatar: "../img/imgLogin.jpg",
    createdDate: "Jun 05, 2023",
    lastLogin: "Today, 08:45 AM",
    lastUpdated: "Jun 05, 2023",
    loginCount: "12",
    permissions: [
      { icon: "ri-eye-line", text: "View Animal Records" },
      { icon: "ri-eye-line", text: "View Categories" },
      { icon: "ri-eye-line", text: "View Habitats" },
    ],
    activity: [
      {
        icon: "ri-login-circle-line",
        text: "Logged into the system",
        time: "Today, 08:45 AM",
      },
      {
        icon: "ri-eye-line",
        text: "Viewed habitat details: Coral Reef",
        time: "Today, 09:10 AM",
      },
      {
        icon: "ri-eye-line",
        text: "Viewed animal details: Great White Shark",
        time: "Today, 09:25 AM",
      },
      {
        icon: "ri-eye-line",
        text: "Viewed conservation programs",
        time: "Today, 09:40 AM",
      },
    ],
  },
};

// View user details
function viewUser(userId) {
  const user = userData[userId];
  if (!user) return;

  // Populate modal with user data
  document.getElementById("modal-user-name").textContent = user.name;
  document.getElementById("modal-user-id").textContent = `ID: ${user.id}`;
  document.getElementById("modal-user-email").textContent = user.email;
  document.getElementById("modal-user-avatar").src = user.avatar;
  document.getElementById("modal-user-avatar").alt = user.name;

  const roleElement = document.getElementById("modal-user-role");
  roleElement.textContent = user.roleText;
  roleElement.className = "role " + user.role;

  const statusElement = document.getElementById("modal-user-status");
  statusElement.textContent = user.statusText;
  statusElement.className = "status " + user.status;

  document.getElementById("modal-created-date").textContent = user.createdDate;
  document.getElementById("modal-last-login").textContent = user.lastLogin;
  document.getElementById("modal-last-updated").textContent = user.lastUpdated;
  document.getElementById("modal-login-count").textContent = user.loginCount;

  // Populate permissions list
  const permissionsList = document.getElementById("modal-permissions");
  permissionsList.innerHTML = "";

  user.permissions.forEach((permission) => {
    const permissionItem = document.createElement("div");
    permissionItem.className = "permission-item";

    permissionItem.innerHTML = `
            <i class="${permission.icon} permission-icon"></i>
            <span class="permission-text">${permission.text}</span>
        `;

    permissionsList.appendChild(permissionItem);
  });

  // Populate activity list
  const activityList = document.getElementById("modal-activity");
  activityList.innerHTML = "";

  user.activity.forEach((activity) => {
    const activityItem = document.createElement("div");
    activityItem.className = "activity-item";

    activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <p class="activity-text">${activity.text}</p>
                <p class="activity-time">${activity.time}</p>
            </div>
        `;

    activityList.appendChild(activityItem);
  });

  // Show modal
  const modal = document.getElementById("user-details-modal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

// Admin functions
function editUser(userId) {
  // In a real application, this would open an edit form
  alert(`Admin function: Edit ${userData[userId].name}`);
}

function deleteUser(userId) {
  // In a real application, this would show a confirmation dialog and delete the user
  if (confirm(`Are you sure you want to delete ${userData[userId].name}?`)) {
    alert(`Admin function: ${userData[userId].name} has been deleted`);
  }
}

function editUserFromModal() {
  const userName = document.getElementById("modal-user-name").textContent;
  alert(`Admin function: Edit ${userName}`);
  closeDetailsModal();
}

function resetPassword() {
  const userName = document.getElementById("modal-user-name").textContent;
  alert(`Admin function: Reset password for ${userName}`);
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
