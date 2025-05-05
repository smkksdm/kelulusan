// Toggle Dark Mode
const switchBtn = document.getElementById('darkSwitch');
switchBtn?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// CSV Data Load & Populate Dropdowns
let siswaData = [];
fetch('data_siswa.csv')
  .then(r => r.text())
  .then(text => {
    const lines = text.trim().split('\n');
    const headers = lines.shift().split(',');
    siswaData = lines.map(l => Object.fromEntries(l.split(',').map((v,i) => [headers[i], v])));
    // Isi jurusan unik
    const jurusSet = new Set(siswaData.map(s => s.jurusan));
    const jurusanEl = document.getElementById('jurusan');
    jurusSet.forEach(j => jurusanEl.innerHTML += `<option value="${j}">${j}</option>`);
  });

// Ketika Jurusan dipilih, isi dropdown siswa
document.getElementById('jurusan')?.addEventListener('change', e => {
  const sel = e.target.value;
  const sEl = document.getElementById('siswa');
  sEl.innerHTML = '<option value="">-- Pilih Siswa --</option>';
  siswaData.filter(s => s.jurusan === sel).forEach(s => {
    sEl.innerHTML += `<option value="${s.id_siswa}" data-nama="${s.nama_siswa}">${s.nama_siswa}</option>`;
  });
});

// Tombol Cek Status
document.getElementById('cekBtn')?.addEventListener('click', ()=>{
  const id = document.getElementById('siswa').value;
  const tgl = document.getElementById('tgl_lahir').value;
  if(!id||!tgl) return alert('Lengkapi semua field!');
  sessionStorage.setItem('pilih', JSON.stringify({ id, tgl }));
  window.location.href = 'pengumuman.html';
});

// Halaman pengumuman: baca sessionStorage
if(window.location.pathname.endsWith('pengumuman.html')){
  const data = JSON.parse(sessionStorage.getItem('pilih')|| null);
  if(!data) return;
  const siswa = siswaData.find(s => s.id_siswa === data.id && s.tgl_lahir === data.tgl);
  if(!siswa) return;
  document.getElementById('alertBox').style.display = 'none';
  document.getElementById('resultCard').style.display = 'block';
  document.getElementById('r_nama').textContent = siswa.nama_siswa;
  document.getElementById('r_jurusan').textContent = siswa.jurusan;
  document.getElementById('r_status').textContent = siswa.status;
  if(siswa.status.toLowerCase() === 'lulus') {
    document.getElementById('infoLulus').style.display = 'block';
  } else {
    document.getElementById('infoTidakLulus').style.display = 'block';
  }
}