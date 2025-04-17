/* script.js */

// Redirect jika user sudah login
function redirectIfLoggedIn() {
  const user = getUser();
  if (user) {
    window.location.href = "dashboard.html";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleLogin();
    });
  }
  
  // Jika halaman statistik
  if (document.getElementById("chartBar")) {
    populateBarChart();
  }
  
  // Jika halaman data_lulus_siswa
  if (document.getElementById("cardContainer") && window.location.href.indexOf("data_lulus_siswa.html") > -1) {
    populateSubjectCards();
  }
  
  // Jika halaman data_lulus_admin
  if (document.getElementById("adminTable")) {
    populateAdminTable();
  }
  
  // Update menu
  updateMenu();

  // Jika dashboard
  if (window.location.href.indexOf("dashboard.html") > -1) {
    displayUserDetails();
  }
});

// Fungsi login
function handleLogin() {
  const usernameInput = document.getElementById("username").value.trim();
  const passwordInput = document.getElementById("password").value.trim();
  const loginMessage = document.getElementById("loginMessage");

  // Cek admin
  if (usernameInput === "admin" && passwordInput === "ysdmk2012") {
    const user = { username: "admin", role: "admin", name: "Administrator" };
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "dashboard.html";
    return;
  }

  // Cek siswa
  const student = studentData.find(s => s.username === usernameInput);
  if (student && passwordInput === student.id.toString()) {
    // Hitung average dari tiga mapel
    const average = Math.round((student.math + student.indo + student.english) / 3);
    
    const user = {
      username: student.username,
      role: "siswa",
      name: student.name,
      id: student.id,
      birthplace: student.birthplace,
      birthdate: student.birthdate,
      math: student.math,
      indo: student.indo,
      english: student.english,
      average: average
    };
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "dashboard.html";
    return;
  }

  loginMessage.innerHTML = '<div class="alert alert-danger" role="alert">Username atau password salah!</div>';
}

// Dapatkan user
function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// Cek akses
function checkAccess(requiredRole) {
  const user = getUser();
  if (requiredRole === "notLoggedIn" && user) {
    window.location.href = "dashboard.html";
  }
  if (requiredRole === "admin") {
    if (!user || user.role !== "admin") {
      alert("Akses ditolak! Halaman ini hanya untuk admin.");
      window.location.href = "login.html";
      return;
    }
  }
  if (requiredRole === "siswa") {
    if (!user || user.role !== "siswa") {
      alert("Akses ditolak! Halaman ini hanya untuk siswa.");
      window.location.href = "login.html";
      return;
    }
  }
  if ((requiredRole === "dashboard" || requiredRole === "pengumuman") && !user) {
    alert("Anda harus login terlebih dahulu.");
    window.location.href = "login.html";
    return;
  }
}

// Tampilkan detail user di dashboard
function displayUserDetails() {
  const user = getUser();
  if (user && document.getElementById("userDetails")) {
    let graduationStatus = "";
    if (user.average !== undefined) {
      graduationStatus = user.average >= passThreshold ? "Terlampaui 🎉" : "Tercapai ❌";
    }
    const birthInfo = user.birthplace && user.birthdate
      ? `<p><strong>Tempat, Tanggal Lahir:</strong> ${user.birthplace}, ${user.birthdate}</p>`
      : "";
    
    document.getElementById("userDetails").innerHTML = `
      <p><strong>Nama:</strong> ${user.name} 😊</p>
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Role:</strong> ${user.role}</p>
      ${birthInfo}
      <p><strong>Matematika:</strong> ${user.math}</p>
      <p><strong>Bahasa Indonesia:</strong> ${user.indo}</p>
      <p><strong>Bahasa Inggris:</strong> ${user.english}</p>
      <p><strong>Nilai Rata-Rata:</strong> ${user.average}</p>
      <p><strong>Status Kelulusan:</strong> ${graduationStatus}</p>
    `;
  }
}

// Logout
function logout() {
  localStorage.removeItem("user");
  setTimeout(function () {
    window.location.href = "index.html";
  }, 1500);
}

// Halaman data_lulus_siswa
function populateSubjectCards() {
  const user = getUser();
  if (!user) return;

  // Data mapel dari user
  const subjectData = [
    { subject: "Matematika", score: user.math },
    { subject: "Bahasa Indonesia", score: user.indo },
    { subject: "Bahasa Inggris", score: user.english }
  ];

  const container = document.getElementById("cardContainer");
  subjectData.forEach(s => {
    const status = s.score >= passThreshold ? "Terlampaui 🎉" : "Tercapai ❌";
    const card = document.createElement("div");
    card.className = "col-md-4 mb-3";
    card.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${s.subject}</h5>
          <p class="card-text"><strong>Nilai:</strong> ${s.score}</p>
          <p class="card-text"><strong>Status:</strong> ${status}</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Halaman statistik
function populateBarChart() {
  const ctx = document.getElementById('chartBar').getContext('2d');
  const labels = studentData.map(s => s.name);
  const data = studentData.map(s => Math.round((s.math + s.indo + s.english) / 3));

  const backgroundColors = data.map(avg =>
    avg >= passThreshold ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)'
  );
  const borderColors = data.map(avg =>
    avg >= passThreshold ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'
  );

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Nilai Rata-Rata',
        data: data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}

// Halaman data_lulus_admin
function populateAdminTable() {
  const tbody = document.getElementById("adminTable");
  studentData.forEach((s, index) => {
    const average = Math.round((s.math + s.indo + s.english) / 3);
    const status = average >= passThreshold ? "Terlampaui 🎉" : "Tercapai ❌";
    const birthInfo = s.birthplace && s.birthdate
      ? `${s.birthplace}, ${s.birthdate}`
      : "-";
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${s.name}</td>
        <td>${s.id}</td>
        <td>${birthInfo}</td>
        <td>${average}</td>
        <td>${status}</td>
      </tr>
    `;
  });
}

// Update menu
function updateMenu() {
  const user = getUser();
  let menuHTML = '';
  if (user) {
    if (user.role === "admin") {
      menuHTML += `<li class="nav-item"><a class="nav-link" href="dashboard.html">🏠 Dashboard</a></li>`;
      menuHTML += `<li class="nav-item"><a class="nav-link" href="pengumuman.html">📢 Pengumuman</a></li>`;
      menuHTML += `<li class="nav-item"><a class="nav-link" href="statistik.html">📈 Statistik</a></li>`;
      menuHTML += `<li class="nav-item"><a class="nav-link" href="data_lulus_admin.html">📋 Data Kelulusan</a></li>`;
      menuHTML += `<li class="nav-item"><a class="nav-link" href="logout.html">🚪 Logout</a></li>`;
    } else if (user.role === "siswa") {
      menuHTML += `<li class="nav-item"><a class="nav-link" href="dashboard.html">🏠 Dashboard</a></li>`;
      menuHTML += `<li class="nav-item"><a class="nav-link" href="pengumuman.html">📢 Pengumuman</a></li>`;
      menuHTML += `<li class="nav-item"><a class="nav-link" href="data_lulus_siswa.html">📚 Mata Pelajaran</a></li>`;
      menuHTML += `<li class="nav-item"><a class="nav-link" href="logout.html">🚪 Logout</a></li>`;
    }
  }
  const sidebarMenu = document.getElementById("sidebarMenu");
  const sidebarMenuDesktop = document.getElementById("sidebarMenuDesktop");
  if (sidebarMenu) sidebarMenu.innerHTML = menuHTML;
  if (sidebarMenuDesktop) sidebarMenuDesktop.innerHTML = menuHTML;
}
