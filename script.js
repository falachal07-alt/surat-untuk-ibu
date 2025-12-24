const startBtn = document.getElementById('startButton');
const startOverlay = document.getElementById('startOverlay');
const mainContainer = document.getElementById('mainContainer');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const envelope = document.getElementById('envelopeWrapper');
const typeMessage = document.getElementById('typeMessage');
const hugBtn = document.getElementById('hugBtn');
const promiseBtn = document.getElementById('promiseBtn');
const promiseText = document.getElementById('promiseText');

const fullMessage = "Ibu... Seorang perempuan berdaya yang diam-diam menguatkan dunia lewat doa-doanya. Terima kasih sudah menjadi pelabuhan ternyaman saat aku lelah diterjang badai kehidupan. Maaf jika aku jarang mengatakannya, tapi setiap detik nafasku adalah rasa syukur karena memilikimu. Engkau adalah keajaiban nyata dalam hidupku.";

const promises = [
    "Aku janji akan lebih sering memberi kabar padamu.",
    "Aku janji akan selalu mendoakan kesehatanmu.",
    "Aku janji akan selalu berusaha membuatmu bangga.",
    "Aku janji akan menjaga diriku baik-baik untukmu."
];

let hasOpened = false;
let isPlaying = false;

// 1. Tombol Mulai
startBtn.addEventListener('click', () => {
    startOverlay.style.opacity = '0';
    setTimeout(() => {
        startOverlay.style.display = 'none';
        mainContainer.style.display = 'flex';
    }, 1000);
    playMusic();
});

function playMusic() {
    bgMusic.play().then(() => {
        isPlaying = true;
        musicToggle.innerText = '🔊';
    }).catch(() => {
        isPlaying = false;
        musicToggle.innerText = '🔇';
    });
}


// 2. Interaksi Amplop
envelope.addEventListener('click', () => {
    if(!hasOpened) {
        envelope.classList.add('active');
        hasOpened = true;
        setTimeout(startTyping, 1000);
        speakMessage();
    }
});

function startTyping() {
    let i = 0;
    function type() {
        if (i < fullMessage.length) {
            typeMessage.innerHTML += fullMessage.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    type();
}

// 3. Suara Narasi Anak
function speakMessage() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(fullMessage);
        const voices = window.speechSynthesis.getVoices();
        const idVoice = voices.find(v => v.lang.includes('id'));
        if(idVoice) utter.voice = idVoice;
        utter.pitch = 1.6; 
        utter.rate = 0.85; 
        window.speechSynthesis.speak(utter);
    }
}

// 4. Fitur Pelukan Hangat (Hati jatuh dari atas)
hugBtn.addEventListener('click', () => {
    for(let i=0; i<30; i++) createFallingElement('❤️');
    hugBtn.innerText = "Pelukan Terkirim! ❤️";
    setTimeout(() => { hugBtn.innerText = "Kirim Pelukan Hangat 🤗"; }, 2000);
});

// 5. Fitur Janji Kecil
promiseBtn.addEventListener('click', () => {
    const randomPromise = promises[Math.floor(Math.random() * promises.length)];
    promiseText.innerText = `Janji Ananda: ${randomPromise}`;
    promiseText.style.display = 'block';
    for(let i=0; i<15; i++) createFallingElement('✨');
});

// Fungsi untuk elemen jatuh dari atas
function createFallingElement(emoji) {
    const el = document.createElement('div');
    el.className = 'floating';
    el.innerText = emoji;
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = '-10vh'; // Mulai dari atas layar
    el.style.fontSize = (Math.random() * 20 + 20) + 'px';
    const duration = Math.random() * 3 + 2; 
    el.style.animation = `fall ${duration}s linear forwards`;

    document.body.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000);
}

// 6. Kelopak Bunga Berjatuhan Otomatis
function spawnPetal() {
    const petals = ['🌸', '🌺', '🍃'];
    const p = document.createElement('div');
    p.className = 'floating';
    p.innerText = petals[Math.floor(Math.random() * petals.length)];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = '-5vh';
    p.style.fontSize = (Math.random() * 15 + 15) + 'px';
    p.style.animation = `fall ${Math.random()*5 + 5}s linear forwards`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 10000);
}

setInterval(spawnPetal, 1200);

window.speechSynthesis.getVoices();