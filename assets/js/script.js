// Jalankan setelah DOM siap
window.addEventListener('DOMContentLoaded', () => {
  // Toggle Dark Mode
  const switchBtn = document.getElementById('darkSwitch');
  // Cek state dari localStorage biar persist
  if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  switchBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDark);
  });

  // CSV Data Load & Populate Dropdowns
  let siswaData = [];
  fetch('data_siswa.csv')
    .then(r => r.text())
    .then(text => {
      const lines = text.trim().split('
');
      const headers = lines.shift().split(',');
      siswaData = lines.map(l => Object.fromEntries(
        l.split(',').map((v,i) => [headers[i].trim(), v.trim()])
      ));

      // Isi dropdown jurusan
      const jurusanEl = document.getElementById('jurusan');
      if (jurusanEl) {
        const jurusSet = [...new Set(siswaData.map(s => s.jurusan))];
        jurusSet.forEach(j => {
          const opt = document.createElement('option');
          opt.value = j;
          opt.textContent = j;
          jurusanEl.append(opt);
        });
      }

      // Kalau di halaman pengumuman, jalankan render
      if (window.location.pathname.endsWith('pengumuman.html')) {
        const stored = sessionStorage.getItem('pilih');
        if (stored) {
          const data = JSON.parse(stored);
          const siswa = siswaData.find(s => s.id_siswa === data.id && s.tgl_lahir === data.tgl);
          if (siswa) {
            document.getElementById('alertBox').style.display = 'none';
            document.getElementById('resultCard').style.display = 'block';
            document.getElementById('r_nama').textContent = siswa.nama_siswa;
            document.getElementById('r_jurusan').textContent = siswa.jurusan;
            document.getElementById('r_status').textContent = siswa.status;
            if (siswa.status.toLowerCase() === 'lulus') {
              document.getElementById('infoLulus').style.display = 'block';
            } else {
              document.getElementById('infoTidakLulus').style.display = 'block';
            }
          }
        }
      }
    })
    .catch(err => console.error('Fetch error:', err));

  // Event: Saat Jurusan berubah isi dropdown siswa
  const jurusanSelect = document.getElementById('jurusan');
  jurusanSelect?.addEventListener('change', e => {
    const sel = e.target.value;
    const sEl = document.getElementById('siswa');
    if (!sEl) return;
    sEl.innerHTML = '<option value="">-- Pilih Siswa --</option>';
    siswaData
      .filter(s => s.jurusan === sel)
      .forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id_siswa;
        opt.textContent = s.nama_siswa;
        sEl.append(opt);
      });
  });

  // Tombol Cek Status
  document.getElementById('cekBtn')?.addEventListener('click', () => {
    const id = document.getElementById('siswa').value;
    const tgl = document.getElementById('tgl_lahir').value.trim();
    if (!id || !tgl) {
      alert('Lengkapi semua field!');
      return;
    }
    sessionStorage.setItem('pilih', JSON.stringify({ id, tgl }));
    window.location.href = 'pengumuman.html';
  });
});