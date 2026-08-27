// Script Hitung Mundur HUT RI (Dinamis Otomatis Setiap Tahun)
function getNextHutRI() {
    const now = new Date();
    let currentYear = now.getFullYear();
    let target = new Date(`August 17, ${currentYear} 00:00:00`);

    if (now.getTime() > target.getTime()) {
        currentYear += 1;
        target = new Date(`August 17, ${currentYear} 00:00:00`);
    }

    const hutAge = currentYear - 1945;
    return { targetTime: target.getTime(), year: currentYear, age: hutAge };
}

function updateCountdown() {
    const nextHut = getNextHutRI();
    const now = new Date().getTime();
    const difference = nextHut.targetTime - now;

    const formatZero = (num) => String(num).padStart(2, '0');

    document.getElementById("hut-title").innerText = `Nusantara Emas • HUT RI Ke-${nextHut.age} (17 Agustus ${nextHut.year})`;
    document.getElementById("countdown-heading").innerText = `HITUNG MUNDUR HUT RI KE-${nextHut.age} (${nextHut.year})`;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = formatZero(days);
        document.getElementById("hours").innerText = formatZero(hours);
        document.getElementById("minutes").innerText = formatZero(minutes);
        document.getElementById("seconds").innerText = formatZero(seconds);
    } else {
        document.getElementById("timer").innerHTML = `<h3 style='color:#ff1e42; font-family:"Cinzel Decorative", serif; font-size:1.3rem;'>SELAMAT HARI KEMERDEKAAN REPUBLIK INDONESIA KE-${nextHut.age}! 🇮🇩</h3>`;
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Control Pemutar Audio Background
const audioBtn = document.getElementById("audioToggleBtn");
const bgAudio = document.getElementById("bgAudio");
const audioIcon = document.getElementById("audioIcon");
const audioText = document.getElementById("audioText");

// Event Listener: Putar / Jeda HANYA saat tombol diklik
audioBtn.addEventListener("click", () => {
    if (bgAudio.paused) {
        bgAudio.play().then(() => {
            audioIcon.innerText = "⏸️";
            audioText.innerText = "Jeda Audio";
        }).catch(error => {
            console.error("Gagal memutar audio. Periksa file/path audio:", error);
            alert("File audio tidak ditemukan atau gagal dimuat.");
        });
    } else {
        bgAudio.pause();
        audioIcon.innerText = "🎵";
        audioText.innerText = 'Putar "Iqro" - Raim Laode';
    }
});