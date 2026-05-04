/**
 * ========================================
 * Portal Kelulusan - SMKS Kesehatan SDM Sumedang
 * JavaScript File
 * ========================================
 * 
 * Features:
 * - DBLess system using JSON data file
 * - NIK validation
 * - Result display with animations
 * - Error handling
 */

// ========================================
// Configuration
// ========================================
const CONFIG = {
    DATA_FILE: 'data.json',
    MIN_NIK_LENGTH: 16,
    MAX_NIK_LENGTH: 16,
    LOADING_DELAY: 1500 // ms
};

// ========================================
// Sample Data (Fallback if JSON file not found)
// ========================================
const SAMPLE_DATA = [
    {
        "nipd": "3211235904080001",
        "nama": "Ade Nayla Zahrotu Shita",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "81,31",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211225604060001",
        "nama": "Alicya Suci Cahyaningsih",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "76,94",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211174411070001",
        "nama": "Annya Syahniarti",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "78,84",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211234807070002",
        "nama": "Bhidara",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "79,41",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211176709080002",
        "nama": "Dina Cahaya Ramadan",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "78,54",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211186901070001",
        "nama": "Dina Damayanti",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "86,53",
        "keterangan": "Dengan Predikat Sangat Memuaskan"
    },
    {
        "nipd": "3211186611070001",
        "nama": "Eliza Nurul Aulia",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "79,62",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3173065509070002",
        "nama": "Fadla Siti Sahara",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "84,17",
        "keterangan": "Dengan Predikat Sangat Memuaskan"
    },
    {
        "nipd": "3211224210070004",
        "nama": "Jilan Rasya Fitriani",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "78,96",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "2171104606070003",
        "nama": "Keira Putri Affendy",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "79,75",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211085705080002",
        "nama": "Keysha Putri Indriani",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "77,71",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211104105080001",
        "nama": "Melda Azhara Suciani",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "79,62",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211080807070001",
        "nama": "Muhammad Rizky Ikhsan Fadillah",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "78,28",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211054901090001",
        "nama": "Mulani Asyadika Pitriyani",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "78,47",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211226008070004",
        "nama": "Nadya Rahma Agustin",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "78,95",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211174808080003",
        "nama": "Naila Ayu Nurzahra",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "84,74",
        "keterangan": "Dengan Predikat Sangat Memuaskan"
    },
    {
        "nipd": "3211174604080004",
        "nama": "Natasya Aurella Apriliani",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "81,72",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211174602080005",
        "nama": "Rachel Amanda Putri",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "80,82",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211214709070002",
        "nama": "Resva Palhi Ramdiani",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "79,57",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211054809080002",
        "nama": "Riri Haerani",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "78,66",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3277017012070004",
        "nama": "Sabrina Haqqoni",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "78,63",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211220702080003",
        "nama": "Setiawan Rizky",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "79,48",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211074710070001",
        "nama": "Suci Halfi Hasanah",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "79,03",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211236107070002",
        "nama": "Syifa Yuliya Azahra",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "80,40",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211186909080001",
        "nama": "Tasya Syabila",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "77,92",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211175506080003",
        "nama": "Tyara Nur Auliya Rahma",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "84,84",
        "keterangan": "Dengan Predikat Sangat Memuaskan"
    },
    {
        "nipd": "3672037006080001",
        "nama": "Valina Amellya Eko Putri",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "79,87",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211084512070002",
        "nama": "Yesa Lutvia",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "80,76",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211226412070004",
        "nama": "Devi Anti Amanda Putri",
        "kelas": "XII FTC",
        "jurusan": "Farmasi Klinis dan Komunitas",
        "status": "LULUS",
        "nilai_rata": "85,60",
        "keterangan": "Dengan Predikat Sangat Memuaskan"
    },
    {
        "nipd": "3211084302080001",
        "nama": "Febri Sekar Ayu Herdianti",
        "kelas": "XII FTC",
        "jurusan": "Farmasi Klinis dan Komunitas",
        "status": "LULUS",
        "nilai_rata": "81,71",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211076102060001",
        "nama": "Fitri Febriyanti",
        "kelas": "XII FTC",
        "jurusan": "Farmasi Klinis dan Komunitas",
        "status": "LULUS",
        "nilai_rata": "83,06",
        "keterangan": "Dengan Predikat Sangat Memuaskan"
    },
    {
        "nipd": "3211226910070003",
        "nama": "Fuja Nur Oktaviani Dwiraja",
        "kelas": "XII FTC",
        "jurusan": "Farmasi Klinis dan Komunitas",
        "status": "LULUS",
        "nilai_rata": "81,29",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211084403090001",
        "nama": "Kayla Kenya Kafka Nafiska Arifin",
        "kelas": "XII FTC",
        "jurusan": "Farmasi Klinis dan Komunitas",
        "status": "LULUS",
        "nilai_rata": "80,59",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211234705070001",
        "nama": "Neng Maylaffayza Dwi Guzarot",
        "kelas": "XII FTC",
        "jurusan": "Farmasi Klinis dan Komunitas",
        "status": "LULUS",
        "nilai_rata": "84,91",
        "keterangan": "Dengan Predikat Sangat Memuaskan"
    },
    {
        "nipd": "3211225808080001",
        "nama": "Neng Sely",
        "kelas": "XII FTC",
        "jurusan": "Farmasi Klinis dan Komunitas",
        "status": "LULUS",
        "nilai_rata": "83,68",
        "keterangan": "Dengan Predikat Sangat Memuaskan"
    },
    {
        "nipd": "3211076802080001",
        "nama": "Nurul Isya",
        "kelas": "XII FTC",
        "jurusan": "Farmasi Klinis dan Komunitas",
        "status": "LULUS",
        "nilai_rata": "79,33",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211104511070001",
        "nama": "Riska Nanda Rosita",
        "kelas": "XII FTC",
        "jurusan": "Farmasi Klinis dan Komunitas",
        "status": "LULUS",
        "nilai_rata": "81,14",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211225201080001",
        "nama": "Sabrina Mutmainah",
        "kelas": "XII FTC",
        "jurusan": "Farmasi Klinis dan Komunitas",
        "status": "LULUS",
        "nilai_rata": "81,04",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211055702080002",
        "nama": "Sinta Sari Maulani",
        "kelas": "XII FTC",
        "jurusan": "Farmasi Klinis dan Komunitas",
        "status": "LULUS",
        "nilai_rata": "79,75",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211084908070002",
        "nama": "Wendy Agisty",
        "kelas": "XII FTC",
        "jurusan": "Farmasi Klinis dan Komunitas",
        "status": "LULUS",
        "nilai_rata": "85,77",
        "keterangan": "Dengan Predikat Sangat Memuaskan"
    },
    {
        "nipd": "3211186610080002",
        "nama": "Dea Cantika Angwar",
        "kelas": "XII FTC",
        "jurusan": "Teknologi Laboratorium Medik",
        "status": "LULUS",
        "nilai_rata": "86,17",
        "keterangan": "Dengan Predikat Sangat Memuaskan"
    },
    {
        "nipd": "3211170202080002",
        "nama": "Rexy Febiansyah",
        "kelas": "XII FTC",
        "jurusan": "Teknologi Laboratorium Medik",
        "status": "LULUS",
        "nilai_rata": "80,28",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211221201080001",
        "nama": "Rizal Sukmana",
        "kelas": "XII FTC",
        "jurusan": "Teknologi Laboratorium Medik",
        "status": "LULUS",
        "nilai_rata": "76,17",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211176309070003",
        "nama": "Sofia Nurbila Pasha",
        "kelas": "XII FTC",
        "jurusan": "Teknologi Laboratorium Medik",
        "status": "LULUS",
        "nilai_rata": "80,11",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211225501080001",
        "nama": "Chelsea Pratiwi",
        "kelas": "XII FTC",
        "jurusan": "Tata Kecantikan Kulit dan Rambut",
        "status": "LULUS",
        "nilai_rata": "82,33",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211235007080003",
        "nama": "Fina Nuraeni",
        "kelas": "XII FTC",
        "jurusan": "Tata Kecantikan Kulit dan Rambut",
        "status": "LULUS",
        "nilai_rata": "80,07",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211225205070002",
        "nama": "Klara Wulan Maycellani",
        "kelas": "XII FTC",
        "jurusan": "Tata Kecantikan Kulit dan Rambut",
        "status": "LULUS",
        "nilai_rata": "78,29",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3211230702080001",
        "nama": "Opik Hermawan",
        "kelas": "XII FTC",
        "jurusan": "Tata Kecantikan Kulit dan Rambut",
        "status": "LULUS",
        "nilai_rata": "74,22",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "3216106702080006",
        "nama": "Zilha Melbilqis",
        "kelas": "XII Kep",
        "jurusan": "Asisten Keperawatan",
        "status": "LULUS",
        "nilai_rata": "84,49",
        "keterangan": "Dengan Predikat Sangat Memuaskan"
    }
];

// ========================================
// Global Variables
// ========================================
let studentData = [];
let isLoading = false;

// ========================================
// DOM Elements
// ========================================
const elements = {
    form: null,
    nikInput: null,
    loadingIndicator: null,
    resultDisplay: null,
    errorDisplay: null,
    resultContent: null,
    errorMessage: null
};

// ========================================
// Initialize Application
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    initializeEventListeners();
    loadStudentData();
});

/**
 * Initialize DOM element references
 */
function initializeElements() {
    elements.form = document.getElementById('graduationForm');
    elements.nikInput = document.getElementById('nikInput');
    elements.loadingIndicator = document.getElementById('loadingIndicator');
    elements.resultDisplay = document.getElementById('resultDisplay');
    elements.errorDisplay = document.getElementById('errorDisplay');
    elements.resultContent = document.getElementById('resultContent');
    elements.errorMessage = document.getElementById('errorMessage');
}

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
    // Form submission
    if (elements.form) {
        elements.form.addEventListener('submit', handleFormSubmit);
    }
    
    // Input validation on typing
    if (elements.nikInput) {
        elements.nikInput.addEventListener('input', handleNikInput);
        elements.nikInput.addEventListener('keypress', handleNumericOnly);
    }
}

/**
 * Load student data from JSON file
 */
async function loadStudentData() {
    try {
        const response = await fetch(CONFIG.DATA_FILE);
        
        if (!response.ok) {
            throw new Error('Failed to load data file');
        }
        
        studentData = await response.json();
        console.log('✅ Data loaded successfully:', studentData.length, 'students');
        
    } catch (error) {
        console.warn('⚠️ Using sample data (JSON file not found):', error.message);
        studentData = SAMPLE_DATA;
    }
}

/**
 * Handle NIK input - only allow numbers
 */
function handleNumericOnly(event) {
    const charCode = event.which ? event.which : event.keyCode;
    
    // Allow numbers (48-57), backspace (8), delete (46), tab (9), arrow keys
    if (charCode > 31 && (charCode < 48 || charCode > 57) && 
        ![8, 9, 46, 37, 38, 39, 40].includes(charCode)) {
        event.preventDefault();
        return false;
    }
}

/**
 * Handle NIK input formatting
 */
function handleNikInput(event) {
    const input = event.target;
    let value = input.value;
    
    // Remove non-numeric characters
    value = value.replace(/[^0-9]/g, '');
    
    // Limit to max length
    if (value.length > CONFIG.MAX_NIK_LENGTH) {
        value = value.substring(0, CONFIG.MAX_NIK_LENGTH);
    }
    
    input.value = value;
    
    // Hide previous results when user starts typing
    hideResults();
    hideError();
}

/**
 * Handle form submission
 */
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const nik = elements.nikInput.value.trim();
    
    // Validate NIK
    if (!validateNik(nik)) {
        showError('NIK harus terdiri dari 16 digit angka!');
        return;
    }
    
    // Check if already loading
    if (isLoading) {
        return;
    }
    
    // Start loading
    startLoading();
    
    // Simulate network delay for better UX
    await sleep(CONFIG.LOADING_DELAY);
    
    // Search for student
    const student = findStudentByNik(nik);
    
    // Stop loading
    stopLoading();
    
    // Display result
    if (student) {
        displayResult(student);
    } else {
        showError('Data siswa dengan NIK ' + nik + ' tidak ditemukan. Silahkan periksa kembali NIK Anda atau hubungi admin.');
    }
}

/**
 * Validate NIK format
 */
function validateNik(nik) {
    if (!nik) return false;
    if (nik.length !== CONFIG.MIN_NIK_LENGTH) return false;
    if (!/^\d{16}$/.test(nik)) return false;
    return true;
}

/**
 * Find student by NIK
 */
function findStudentByNik(nik) {
    return studentData.find(student => student.nipd === nik);
}

/**
 * Display search result
 */
function displayResult(student) {
    const isGraduated = student.status.toUpperCase() === 'LULUS';
    const statusColor = isGraduated ? '#00ff41' : '#ff003c';
    const statusGlow = isGraduated ? 
        '0 0 10px rgba(0, 255, 65, 0.7), 0 0 20px rgba(0, 255, 65, 0.5)' :
        '0 0 10px rgba(255, 0, 60, 0.7), 0 0 20px rgba(255, 0, 60, 0.5)';
    
    const html = `
        <div class="student-info">
            <div class="info-item">
                <div class="info-label"><i class="fas fa-id-card"></i> NIK</div>
                <div class="info-value">${formatNik(student.nipd)}</div>
            </div>
            <div class="info-item">
                <div class="info-label"><i class="fas fa-user"></i> Nama Siswa</div>
                <div class="info-value">${student.nama}</div>
            </div>
            <div class="info-item">
                <div class="info-label"><i class="fas fa-chalkboard-teacher"></i> Kelas</div>
                <div class="info-value">${student.kelas}</div>
            </div>
            <div class="info-item">
                <div class="info-label"><i class="fas fa-graduation-cap"></i> Jurusan</div>
                <div class="info-value">${student.jurusan}</div>
            </div>
            ${student.nilai_rata ? `
            <div class="info-item">
                <div class="info-label"><i class="fas fa-star"></i> Nilai Rata-rata</div>
                <div class="info-value">${student.nilai_rata}</div>
            </div>
            ` : ''}
        </div>
        
        <div class="graduation-status">
            <p style="margin-bottom: 0.5rem; font-size: 1.1rem;">Status Kelulusan:</p>
            <div class="status-badge" style="color: ${statusColor}; text-shadow: ${statusGlow};">
                <i class="fas ${isGraduated ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                ${student.status}
            </div>
            ${student.keterangan ? `
            <p style="margin-top: 1rem; color: ${statusColor}; font-size: 1rem;">
                ${student.keterangan}
            </p>
            ` : ''}
        </div>
        
        <div style="margin-top: 1.5rem; text-align: center;">
            <button onclick="printResult()" class="btn cyber-btn" style="font-size: 1rem; padding: 0.75rem 1.5rem;">
                <i class="fas fa-print"></i> Cetak Hasil
            </button>
            <button onclick="resetSearch()" class="btn cyber-btn" style="font-size: 1rem; padding: 0.75rem 1.5rem; margin-left: 0.5rem; background: linear-gradient(135deg, #ff00ff 0%, #9d00ff 100%);">
                <i class="fas fa-redo"></i> Cek Lagi
            </button>
        </div>
    `;
    
    elements.resultContent.innerHTML = html;
    elements.resultDisplay.classList.remove('d-none');
    
    // Scroll to result
    setTimeout(() => {
        elements.resultDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

/**
 * Show error message
 */
function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorDisplay.classList.remove('d-none');
    
    // Hide after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

/**
 * Hide error message
 */
function hideError() {
    elements.errorDisplay.classList.add('d-none');
}

/**
 * Hide results
 */
function hideResults() {
    elements.resultDisplay.classList.add('d-none');
}

/**
 * Start loading state
 */
function startLoading() {
    isLoading = true;
    elements.loadingIndicator.classList.remove('d-none');
    elements.form.querySelector('button[type="submit"]').disabled = true;
    elements.nikInput.disabled = true;
}

/**
 * Stop loading state
 */
function stopLoading() {
    isLoading = false;
    elements.loadingIndicator.classList.add('d-none');
    elements.form.querySelector('button[type="submit"]').disabled = false;
    elements.nikInput.disabled = false;
    elements.nikInput.focus();
}

/**
 * Reset search form
 */
function resetSearch() {
    elements.nikInput.value = '';
    hideResults();
    hideError();
    elements.nikInput.focus();
}

/**
 * Print result
 */
function printResult() {
    window.print();
}

/**
 * Format NIK with dashes (optional)
 */
function formatNik(nik) {
    // You can customize the format here
    // Example: 3211-2359-0408-0001
    return nik;
}

/**
 * Sleep utility function
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * SweetAlert2 integration for beautiful alerts
 */
function showSuccessAlert(message) {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: 'Berhasil!',
            text: message,
            icon: 'success',
            confirmButtonText: 'OK',
            background: 'rgba(10, 10, 15, 0.95)',
            color: '#e0e0e0',
            confirmButtonColor: '#00ffff',
            backdrop: `
                rgba(0, 0, 0, 0.8)
                url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M0 50 Q 25 25, 50 50 T 100 50' stroke='rgba(0, 255, 255, 0.1)' fill='none'/%3E%3C/svg%3E")
                left top
                no-repeat
            `
        });
    }
}

/**
 * Show info alert
 */
function showInfoAlert(message) {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: 'Informasi',
            text: message,
            icon: 'info',
            confirmButtonText: 'Mengerti',
            background: 'rgba(10, 10, 15, 0.95)',
            color: '#e0e0e0',
            confirmButtonColor: '#00ffff'
        });
    }
}

// ========================================
// Utility Functions
// ========================================

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for performance
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Log with timestamp
 */
function log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = type === 'error' ? '❌' : type === 'warn' ? '⚠️' : '✅';
    console.log(`${prefix} [${timestamp}] ${message}`);
}

/**
 * Export data to CSV (for admin use)
 */
function exportToCSV() {
    if (studentData.length === 0) {
        console.warn('No data to export');
        return;
    }
    
    const headers = Object.keys(studentData[0]);
    const csv = [
        headers.join(','),
        ...studentData.map(row => 
            headers.map(fieldName => 
                JSON.stringify(row[fieldName], (key, value) => value === null ? '' : value)
            ).join(',')
        )
    ].join('\r\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'data_kelulusan.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Make functions available globally
window.resetSearch = resetSearch;
window.printResult = printResult;
window.exportToCSV = exportToCSV;

/**
 * ========================================
 * HTML5 Audio Autoplay Handler
 * ========================================
 * Browser modern memblokir autoplay dengan suara.
 * Solusi: Start muted, lalu unmute saat user interaksi pertama.
 */
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bgMusic');
    
    if (audio) {
        // Coba play langsung (akan berhasil jika browser mengizinkan)
        audio.play().catch(e => {
            console.log('⚠️ Autoplay diblokir browser, menunggu interaksi user...');
        });
        
        // Unmute saat user interaksi pertama (klik, touch, keypress, scroll)
        const enableAudio = () => {
            if (audio.muted) {
                audio.muted = false;
                audio.volume = 0.5; // Set volume 50%
                console.log('🔊 Audio enabled - Background music playing!');
                
                // Hapus semua listener setelah audio aktif
                document.removeEventListener('click', enableAudio);
                document.removeEventListener('touchstart', enableAudio);
                document.removeEventListener('keydown', enableAudio);
                document.removeEventListener('scroll', enableAudio);
            }
        };
        
        // Tambahkan listener untuk interaksi user
        document.addEventListener('click', enableAudio);
        document.addEventListener('touchstart', enableAudio);
        document.addEventListener('keydown', enableAudio);
        document.addEventListener('scroll', enableAudio);
        
        console.log('🎵 HTML5 Audio player initialized with autoplay (muted until user interaction)');
    }
});

console.log('🚀 Portal Kelulusan initialized successfully!');
console.log('📊 Loaded', studentData.length, 'student records');
