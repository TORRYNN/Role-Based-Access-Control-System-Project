let users = [
  { username: "JohnDoe", role: "Admin", status: "Active" },
  { username: "JaneSmith", role: "Editor", status: "Inactive" },
  { username: "John", role: "Admin", status: "Active" },
  { username: "Smith", role: "Editor", status: "Inactive" },
];

// Mock Roles
let roles = [
  { name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { name: "Editor", permissions: ["Read", "Write"] },
];

function addUser() {
  // Create form HTML dynamically with Cancel button
  const formHtml = `
    <div class="fform">
    <form id="add-user-form">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" placeholder="Enter username" class="input-field" required>
      
      <label for="role">Role:</label>
      <select id="role" name="role" class="input-field">
        ${roles.map((role) => `<option value="${role.name}">${role.name}</option>`).join("")}
      </select>
      
      <label for="status">Status:</label>
      <select id="status" name="status" class="input-field">
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      
      <button type="submit" class="submit-btn">Add User</button>
      <button type="button" class="cancel-btn" onclick="cancelAddUser()">Cancel</button>
    </form>
    </div>
    
  `;

  // Create container for the form and append it to the body
  const container = document.createElement("div");
  container.classList.add("form-container");
  container.innerHTML = formHtml;
  document.body.appendChild(container);

  // Add event listener for form submission
  document.getElementById("add-user-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const role = document.getElementById("role").value;
    const status = document.getElementById("status").value;

    users.push({ username, role, status });
    loadUsers();  // Refresh users list
    container.remove();  // Remove the form after submission
  });
}

// Function to cancel user creation and remove the form
function cancelAddUser() {
  const formContainer = document.querySelector(".fform").parentElement;
  formContainer.remove(); // Removes the form when Cancel button is clicked
}

// Function to switch sections
function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.style.display = section.id === sectionId ? "block" : "none";
  });
}

// Load Users
function loadUsers() {
  const userTableBody = document.querySelector("#user-table tbody");
  userTableBody.innerHTML = users
    .map(
      (user, index) => `
        <tr>
          <td>${user.username}</td>
          <td>${user.role}</td>
          <td>${user.status}</td>
          <td>
            <button onclick="editUser(${index})">Edit</button>
            <button onclick="deleteUser(${index})">Delete</button>
          </td>
        </tr>
      `
    )
    .join("");
}

// Edit User
function editUser(index) {
  const user = users[index];
  const username = prompt("Edit username:", user.username);
  const role = prompt("Edit role:", user.role);
  const status = prompt("Edit status (Active/Inactive):", user.status);
  users[index] = { username, role, status };
  loadUsers();
}

// Delete User
function deleteUser(index) {
  if (confirm("Are you sure you want to delete this user?")) {
    users.splice(index, 1);
    loadUsers();
  }
}

// Load Roles
function loadRoles() {
  const roleTableBody = document.querySelector("#role-table tbody");
  roleTableBody.innerHTML = roles
    .map(
      (role, index) => `
        <tr>
          <td>${role.name}</td>
          <td>${role.permissions.join(", ")}</td>
          <td>
            <button onclick="editRole(${index})">Edit</button>
            <button onclick="deleteRole(${index})">Delete</button>
          </td>
        </tr>
      `
    )
    .join("");
}
function addRole() {
  // Create form HTML dynamically for adding a new role
  const formHtml = `
    <div class="fform">
    <form id="add-role-form">
      <label for="role-name">Role Name:</label>
      <input type="text" id="role-name" name="role-name" placeholder="Enter role name" class="input-field" required>
      
      <label for="permissions">Permissions:</label>
      <div id="permissions" class="permissions-container">
        <label><input type="checkbox" value="Read"> Read</label>
        <label><input type="checkbox" value="Write"> Write</label>
        <label><input type="checkbox" value="Delete"> Delete</label>
        <label><input type="checkbox" value="Execute"> Execute</label>
      </div>

      <button type="submit" class="submit-btn">Add Role</button>
      <button type="button" class="cancel-btn" onclick="cancelAddRole()">Cancel</button>
    </form>
    </div>
  `;

  // Create container for the form and append it to the body
  const container = document.createElement("div");
  container.classList.add("form-container");
  container.innerHTML = formHtml;
  document.body.appendChild(container);

  // Add event listener for form submission
  document.getElementById("add-role-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const roleName = document.getElementById("role-name").value;
    const selectedPermissions = Array.from(
      document.querySelectorAll("#permissions input:checked")
    ).map((checkbox) => checkbox.value);

    // Add the new role to the roles array
    roles.push({ name: roleName, permissions: selectedPermissions });
    loadRoles();  // Refresh roles list
    container.remove();  // Remove the form after submission
    populateRoles();  // Re-populate the roles dropdown in user form
  });
}

// Function to cancel role creation and remove the form
function cancelAddRole() {
  const formContainer = document.querySelector(".fform").parentElement;
  formContainer.remove(); // Removes the form when Cancel button is clicked
}

// Edit Role
function editRole(index) {
  const role = roles[index];
  const name = prompt("Edit role name:", role.name);
  const permissions = prompt(
    "Edit permissions (comma-separated):",
    role.permissions.join(",")
  ).split(",");
  roles[index] = { name, permissions };
  loadRoles();
  populateRoles();
}

// Delete Role
function deleteRole(index) {
  if (confirm("Are you sure you want to delete this role?")) {
    roles.splice(index, 1);
    loadRoles();
    populateRoles();
  }
}

// Populate Roles in Dropdown
function populateRoles() {
  const roleSelect = document.getElementById("role");
  roleSelect.innerHTML = roles
    .map((role, index) => `<option value="${index}">${role.name}</option>`)
    .join("");
}

// Assign Permissions
document
  .getElementById("assign-permissions-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const roleIndex = document.getElementById("role").value;
    const selectedPermissions = Array.from(
      document.querySelectorAll("#assign-permissions-form input:checked")
    ).map((checkbox) => checkbox.value);
    roles[roleIndex].permissions = selectedPermissions;
    alert("Permissions assigned successfully!");
    loadRoles();
  });

// Initialize
document.getElementById("add-user-btn").addEventListener("click", addUser);
document.getElementById("add-role-btn").addEventListener("click", addRole);
loadUsers();
loadRoles();
populateRoles();
