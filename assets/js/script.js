// script.js

let studentData = [];

// 1. Load & parse CSV
fetch('data siswa.csv')
  .then(res => res.text())
  .then(csvText => {
    const lines = csvText.trim().split('\n');
    // misal header: nipd;id_siswa;nama_siswa;jurusan;status
    const header = lines.shift().split(';').map(h => h.trim());
    studentData = lines.map(line => {
      const cols = line.split(';').map(c => c.trim());
      const obj = {};
      header.forEach((h, i) => obj[h] = cols[i]);
      return {
        id_siswa:   obj['id_siswa'],
        nipd:       obj['nipd'],
        nama_siswa: obj['nama_siswa'],
        jurusan:    obj['jurusan'],
        lulus:      obj['status'].toLowerCase() === 'lulus'
      };
    });
    initApp();
  })
  .catch(err => console.error('Gagal load CSV:', err));

// 2. Setelah data siap, inisiasi seluruh logic
function initApp() {
  // ===== Dark Mode Init & Toggle =====
  const darkSwitch = document.getElementById('darkSwitch');
  if (darkSwitch) {
    if (localStorage.getItem('darkMode') === 'on') {
      document.body.classList.add('dark-mode');
      darkSwitch.checked = true;
    }
    darkSwitch.addEventListener('change', () => {
      if (darkSwitch.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode','on');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode','off');
      }
    });
  }

  // ===== Form Cek Status =====
  const form = document.getElementById('form-cekstatus');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const id   = document.getElementById('id_siswa').value.trim();
      const nipd = document.getElementById('nipd').value.trim();
      const rec  = studentData.find(s => s.id_siswa === id && s.nipd === nipd);
      if (!rec) return alert('Data tidak ditemukan, cek lagi ya!');
      sessionStorage.setItem('selectedStudent', JSON.stringify(rec));
      window.location.href = 'pengumuman.html';
    });
  }

  // ===== Load Pengumuman =====
  const container = document.getElementById('content');
  if (container) {
    const data = sessionStorage.getItem('selectedStudent');
    if (!data) {
      container.innerHTML = `
        <div class="alert alert-warning mt-4 fade-in">
          Harap Masukan ID Siswa dan NIPD terlebih dahulu...
        </div>`;
    } else {
      const s = JSON.parse(data);
      container.innerHTML = `
        <div class="card text-center mt-4 p-3 fade-in">
          <div class="mb-3"><i class="bi bi-person-circle" style="font-size:3rem;"></i></div>
          <p><strong>NIPD:</strong> ${s.nipd}</p>
          <p><strong>Nama:</strong> ${s.nama_siswa}</p>
          <p><strong>Jurusan:</strong> ${s.jurusan}</p>
          <p>Anda dinyatakan: <strong>${s.lulus ? 'LULUS 🎉' : 'TIDAK LULUS 😢'}</strong></p>
          <button class="btn btn-secondary mt-3" onclick="sessionStorage.removeItem('selectedStudent');window.location='cekstatus.html'">
            Coba Lagi
          </button>
        </div>`;
    }
  }

  // ===== Footer Offcanvas Menu =====
  const offEl = document.getElementById('footerMenu');
  if (offEl) {
    const off = new bootstrap.Offcanvas(offEl);
    document.querySelectorAll('.footer i').forEach(ic => {
      ic.style.cursor = 'pointer';
      ic.addEventListener('click', e => {
        e.preventDefault();
        off.toggle();
      });
    });
  }
}

// NOTE: Pastikan file CSV-nya bernama tepat "data siswa.csv" dan ter‐host di root folder portal-mu.
