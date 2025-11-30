// Inline AppConfig để tránh phụ thuộc file riêng biệt
const AppConfig = {
  admin: {
    defaultUsername: "admin",
    defaultPassword: "admin123",
  }
};

function checkAdminAccess() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("Vui long dang nhap de truy cap Admin Panel!");
    window.location.href = "../Pages/login.html";
    return null;
  }

  if (currentUser.username !== AppConfig.admin.defaultUsername) {
    alert("Ban khong co quyen truy cap Admin Panel!");
    window.location.href = "../../index.html";
    return null;
  }

  return currentUser;
}

function loadUsersData() {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  console.log("Loaded users:", users);
  return users;
}

function calculateStatistics(users) {
  const totalUsers = users.length;
  let totalLessons = 0;
  let activeUsers = 0;

  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    
    if (user.completedLessons) {
      totalLessons += user.completedLessons.length;
    }

    var recentActivity = 0;
    if (user.contributions) {
      var last7Days = user.contributions.slice(-7);
      for (var j = 0; j < last7Days.length; j++) {
        recentActivity += last7Days[j];
      }
    }
    
    if (recentActivity > 0) {
      activeUsers++;
    }
  }

  const totalAvailableLessons = 10;
  var avgProgress = 0;
  if (totalUsers > 0) {
    avgProgress = Math.round((totalLessons / (totalUsers * totalAvailableLessons)) * 1000) / 10;
  }

  return {
    totalUsers: totalUsers,
    totalLessons: totalLessons,
    avgProgress: avgProgress,
    activeUsers: activeUsers,
  };
}

function displayStatistics(stats) {
  document.getElementById("total-users").textContent = stats.totalUsers;
  document.getElementById("total-lessons").textContent = stats.totalLessons;
  document.getElementById("avg-progress").textContent = stats.avgProgress + "%";
  document.getElementById("active-users").textContent = stats.activeUsers;
}

function renderUsersTable(users, searchTerm, filter) {
  searchTerm = searchTerm || "";
  filter = filter || "all";
  
  const tbody = document.querySelector("#users-table tbody");
  tbody.innerHTML = "";

  var filteredUsers = users;

  if (searchTerm) {
    filteredUsers = filteredUsers.filter(function(user) {
      var name = user.name.toLowerCase();
      var username = user.username.toLowerCase();
      var term = searchTerm.toLowerCase();
      return name.indexOf(term) !== -1 || username.indexOf(term) !== -1;
    });
  }

  if (filter === "active") {
    filteredUsers = filteredUsers.filter(function(user) {
      var recentActivity = 0;
      if (user.contributions) {
        var last7Days = user.contributions.slice(-7);
        for (var i = 0; i < last7Days.length; i++) {
          recentActivity += last7Days[i];
        }
      }
      return recentActivity > 0;
    });
  } else if (filter === "inactive") {
    filteredUsers = filteredUsers.filter(function(user) {
      var recentActivity = 0;
      if (user.contributions) {
        var last7Days = user.contributions.slice(-7);
        for (var i = 0; i < last7Days.length; i++) {
          recentActivity += last7Days[i];
        }
      }
      return recentActivity === 0;
    });
  }

  if (filteredUsers.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7"><div class="empty-state"><p>Khong tim thay nguoi dung nao</p></div></td></tr>';
    return;
  }

  for (var i = 0; i < filteredUsers.length; i++) {
    var user = filteredUsers[i];
    var row = document.createElement("tr");
    
    var completed = user.completedLessons ? user.completedLessons.length : 0;
    
    var recentActivity = 0;
    if (user.contributions) {
      var last7Days = user.contributions.slice(-7);
      for (var j = 0; j < last7Days.length; j++) {
        recentActivity += last7Days[j];
      }
    }

    var regDate = new Date().toLocaleDateString("vi-VN");
    if (user.registrationDate) {
      regDate = new Date(user.registrationDate).toLocaleDateString("vi-VN");
    }

    var isAdmin = user.username === AppConfig.admin.defaultUsername;
    var isActive = recentActivity > 0;

    var statusBadge = '';
    if (isAdmin) {
      statusBadge = '<span class="badge badge-admin">Admin</span>';
    } else if (isActive) {
      statusBadge = '<span class="badge badge-active">Hoat dong</span>';
    } else {
      statusBadge = '<span class="badge">Khong hoat dong</span>';
    }

    var actionButtons = '';
    if (isAdmin) {
      actionButtons = '<span style="color: #666; font-style: italic;">Khong the xoa</span>';
    } else {
      actionButtons = '<button class="action-btn view-btn" onclick="viewUser(\'' + user.username + '\')">Xem</button>' +
                      '<button class="action-btn delete-btn" onclick="deleteUser(\'' + user.username + '\')">Xoa</button>';
    }

    row.innerHTML = '<td><strong>' + (user.name || "N/A") + '</strong></td>' +
                    '<td>' + user.username + '</td>' +
                    '<td>' + completed + ' bai</td>' +
                    '<td>' + recentActivity + ' hoat dong</td>' +
                    '<td>' + regDate + '</td>' +
                    '<td>' + statusBadge + '</td>' +
                    '<td>' + actionButtons + '</td>';

    tbody.appendChild(row);
  }
}

window.viewUser = function (username) {
  const users = loadUsersData();
  var user = null;
  
  for (var i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      user = users[i];
      break;
    }
  }

  if (user) {
    var completed = user.completedLessons || [];
    var totalContributions = 0;
    if (user.contributions) {
      for (var i = 0; i < user.contributions.length; i++) {
        totalContributions += user.contributions[i];
      }
    }

    alert("Chi tiet nguoi dung\n\n" +
          "Ten: " + user.name + "\n" +
          "Username: " + user.username + "\n" +
          "Bai hoc hoan thanh: " + completed.length + "\n" +
          "Tong hoat dong: " + totalContributions + " ngay\n" +
          "Tieu su: " + (user.bio || "Chua co"));
  }
};

window.deleteUser = function (username) {
  if (username === AppConfig.admin.defaultUsername) {
    alert("Khong the xoa tai khoan Admin!");
    return;
  }

  if (confirm("Ban co chac chan muon xoa nguoi dung \"" + username + "\"?")) {
    var users = loadUsersData();
    var newUsers = [];
    
    for (var i = 0; i < users.length; i++) {
      if (users[i].username !== username) {
        newUsers.push(users[i]);
      }
    }
    
    localStorage.setItem("users", JSON.stringify(newUsers));
    location.reload();
  }
};

function setupControls(users) {
  const searchInput = document.getElementById("search-input");
  const filterSelect = document.getElementById("filter-select");

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value;
    const filter = filterSelect.value;
    renderUsersTable(users, searchTerm, filter);
  });

  filterSelect.addEventListener("change", function () {
    const filter = this.value;
    const searchTerm = searchInput.value;
    renderUsersTable(users, searchTerm, filter);
  });
}

function initAdminPanel() {
  const admin = checkAdminAccess();
  if (!admin) {
    return;
  }

  const users = loadUsersData();

  const stats = calculateStatistics(users);
  displayStatistics(stats);

  renderUsersTable(users);

  setupControls(users);

  console.log("Admin Panel loaded successfully");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAdminPanel);
} else {
  initAdminPanel();
}
