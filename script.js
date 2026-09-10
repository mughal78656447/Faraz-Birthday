let currentPage = 0;
const pages = document.querySelectorAll('.page');
const pageNum = document.getElementById('pageNum');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const partyBtn = document.getElementById('partyBtn');
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

let musicPlaying = false;

// میوزک آن / آف کرن لئی
function toggleMusic() {
    if (musicPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        musicPlaying = false;
    } else {
        bgMusic.play();
        musicBtn.classList.add('playing');
        musicPlaying = true;
    }
}

// سکرین تے کتے وی پہلی واری کلک کرن تے میوزک خودبخود پلے ہو جاوے گا (Browser Policies)
document.body.addEventListener('click', () => {
    if (!musicPlaying) {
        bgMusic.play().then(() => {
            musicBtn.classList.add('playing');
            musicPlaying = true;
        }).catch(() => {});
    }
}, { once: true });

function updatePages() {
    pages.forEach((page, index) => {
        page.classList.remove('active');
        if (index === currentPage) {
            page.classList.add('active');
        }
    });

    pageNum.innerText = `${currentPage + 1} / ${pages.length}`;

    if (currentPage === pages.length - 1) {
        fireConfetti();
    }
}

nextBtn.addEventListener('click', () => {
    if (currentPage < pages.length - 1) {
        currentPage++;
        updatePages();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        updatePages();
    }
});

if (partyBtn) {
    partyBtn.addEventListener('click', fireConfetti);
}

function fireConfetti() {
    confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
    });
}