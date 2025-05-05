// script.js

let studentData = [];

// 1. Load & parse CSV (header harus: tgl_lahir;id_siswa;nama_siswa;jurusan;status)
fetch('data siswa.csv')
  .then(res => res.text())
  .then(csvText => {
    const lines = csvText.trim().split('\n');
    const header = lines.shift().split(';').map(h => h.trim());
    studentData = lines.map(line => {
      const vals = line.split(';').map(v => v.trim());
      const obj = {};
      header.forEach((h,i) => obj[h] = vals[i]);
      return {
        id_siswa:   obj['id_siswa'],
        tgl_lahir:  obj['tgl_lahir'],                        // ganti nipd → tgl_lahir
        nama_siswa: obj['nama_siswa'],
        jurusan:    obj['jurusan'],
        lulus:      obj['status'].toLowerCase() === 'lulus'
      };
    });
    initApp();
  })
  .catch(err => console.error('Gagal load CSV:', err));

function initApp() {
  // Dark mode
  const darkSwitch = document.getElementById('darkSwitch');
  if (darkSwitch) {
    if (localStorage.getItem('darkMode') === 'on') {
      document.body.classList.add('dark-mode');
      darkSwitch.checked = true;
    }
    darkSwitch.addEventListener('change', () => {
      document.body.classList.toggle('dark-mode', darkSwitch.checked);
      localStorage.setItem('darkMode', darkSwitch.checked ? 'on' : 'off');
    });
  }

  // Form cekstatus
  const form = document.getElementById('form-cekstatus');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const id  = document.getElementById('id_siswa').value.trim();
      const tgl = document.getElementById('tgl_lahir').value.trim();
      const rec = studentData.find(s => s.id_siswa === id && s.tgl_lahir === tgl);
      if (!rec) {
        return alert('⚠️ Data tidak ditemukan. Pastikan ID & Tanggal Lahir benar (YYYY-MM-DD).');
      }
      sessionStorage.setItem('selectedStudent', JSON.stringify(rec));
      window.location.href = 'pengumuman.html';
    });
  }

  // Load pengumuman
  const cont = document.getElementById('content');
  if (cont) {
    const data = sessionStorage.getItem('selectedStudent');
    if (!data) {
      cont.innerHTML = `
        <div class="alert alert-warning mt-4">
          ⚠️ Harap Masukan <strong>ID Siswa</strong> dan <strong>Tanggal Lahir</strong> terlebih dahulu!
        </div>`;
    } else {
      const s = JSON.parse(data);
      cont.innerHTML = `
        <div class="card text-center mt-4 p-3">
          <h5 class="mb-3">Hasil Cek Kelulusan</h5>
          <p><strong>ID Siswa:</strong> ${s.id_siswa}</p>
          <p><strong>Tgl. Lahir:</strong> ${s.tgl_lahir}</p>
          <p><strong>Nama:</strong> ${s.nama_siswa}</p>
          <p><strong>Jurusan:</strong> ${s.jurusan}</p>
          <p class="mt-3">Anda dinyatakan: <strong>${s.lulus ? 'LULUS 🎉' : 'TIDAK LULUS 😢'}</strong></p>
          <button class="btn btn-secondary mt-3" onclick="sessionStorage.removeItem('selectedStudent');window.location='cekstatus.html'">
            🔄 Coba Lagi
          </button>
        </div>`;
    }
  }

  // Footer offcanvas
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
