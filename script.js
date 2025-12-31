/* ===========================
   GLOBAL STATE
   =========================== */
let selectedMood = null;
let selectedStatus = null;
let lastResult = '';

/* ===========================
   INITIALIZATION
   =========================== */
document.addEventListener('DOMContentLoaded', function() {
    initializeCountdown();
    setupCanvas();
});

/* ===========================
   COUNTDOWN TIMER
   =========================== */
function initializeCountdown() {
    // Check if we should show countdown (optional feature)
    // Set this to true if you want to lock until midnight
    const enableCountdown = false; // Set to true to enable countdown lock

    if (!enableCountdown) {
        return;
    }

    const countdownOverlay = document.getElementById('countdown-overlay');
    const countdownDisplay = document.getElementById('countdown-display');

    // Target date: January 1, 2026, 00:00:00
    const targetDate = new Date('2026-01-01T00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            // Countdown finished - hide overlay
            countdownOverlay.classList.add('hidden');
            clearInterval(countdownInterval);
            return;
        }

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display countdown
        countdownDisplay.textContent =
            `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Show overlay and start countdown
    countdownOverlay.classList.remove('hidden');
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

/* ===========================
   1. ONE-LINE MESSAGE GENERATOR
   =========================== */
// Array of message templates with [Name] placeholder
const messageTemplates = [
    "In 2026, [Name] chooses growth over fear",
    "[Name] discovers that 2026 is the year of bold transformations",
    "This year, [Name] unlocks new levels of confidence and purpose",
    "[Name] embraces 2026 with courage and unwavering determination",
    "2026 belongs to [Name] - a year of limitless possibilities",
    "[Name] walks into 2026 ready to rewrite their story",
    "In 2026, [Name] becomes the architect of their own destiny",
    "[Name] turns dreams into reality throughout 2026",
    "This year, [Name] chooses progress over perfection",
    "[Name] makes 2026 the year they've always imagined",
    "2026 is when [Name] proves that anything is possible",
    "[Name] steps into 2026 with purpose, passion, and power",
    "In 2026, [Name] breaks barriers and sets new standards",
    "[Name] creates their best chapter yet in 2026",
    "This year, [Name] transforms challenges into stepping stones"
];

function generateMessage() {
    const nameInput = document.getElementById('message-name');
    const resultBox = document.getElementById('message-result');
    const name = nameInput.value.trim();

    // Validation
    if (!name) {
        showError(resultBox, 'Please enter your name');
        return;
    }

    // Random message selection
    const randomIndex = Math.floor(Math.random() * messageTemplates.length);
    const message = messageTemplates[randomIndex].replace('[Name]', name);

    // Store result for sharing
    lastResult = message;

    // Display result
    resultBox.innerHTML = `<p>${message}</p>`;
    resultBox.classList.remove('hidden');

    // Trigger celebration
    triggerCelebration();
}

/* ===========================
   2. 2026 PREDICTION GENERATOR
   =========================== */
// Mood-based prediction templates
const predictions = {
    happy: [
        "Your happiness multiplies in 2026! Expect joyful connections, creative breakthroughs, and moments that make your heart sing.",
        "2026 amplifies your positive energy! New friendships bloom, exciting opportunities appear, and your optimism becomes contagious.",
        "Your joy becomes your superpower in 2026! Watch as your enthusiasm opens doors and attracts wonderful experiences.",
        "This year, your happiness creates ripple effects! Your positive spirit inspires others and brings unexpected blessings.",
        "2026 rewards your optimism! Expect delightful surprises, meaningful celebrations, and reasons to smile every day."
    ],
    calm: [
        "Your inner peace guides you to clarity in 2026. Expect balanced growth, mindful decisions, and serene progress.",
        "2026 honors your calm wisdom. You'll find harmony in chaos, make centered choices, and inspire others with your tranquility.",
        "Your peaceful energy attracts stability in 2026. Steady growth, meaningful rest, and gentle transformations await you.",
        "This year, your calmness becomes your strength. You navigate challenges with grace and find beauty in stillness.",
        "2026 brings you the gift of presence. Your ability to stay grounded leads to profound personal insights and steady success."
    ],
    focused: [
        "Your laser focus manifests incredible results in 2026! Goals become achievements, plans become reality, and dedication pays off.",
        "2026 is your breakthrough year! Your determination breaks through barriers and your vision becomes crystal clear.",
        "Your focus becomes unstoppable in 2026. Expect major progress in your goals, recognition for your efforts, and tangible success.",
        "This year, your discipline creates miracles. Watch as your consistent effort transforms dreams into concrete accomplishments.",
        "2026 rewards your commitment! Your strategic thinking and persistent action lead to remarkable achievements."
    ],
    unsure: [
        "2026 brings you the clarity you seek. Trust that uncertainty is simply a path to discovering your true direction.",
        "Your questions lead to beautiful answers in 2026. Embrace exploration - you'll find your purpose through experience.",
        "This year, being unsure becomes your greatest teacher. 2026 guides you toward self-discovery and unexpected clarity.",
        "2026 transforms your uncertainty into curiosity. New experiences reveal hidden strengths and illuminate your path forward.",
        "Your openness to possibilities makes 2026 magical. Trust the journey - clarity arrives through action, not waiting."
    ]
};

function selectMood(mood) {
    // Remove previous selection
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Add selection to clicked button
    const selectedBtn = document.querySelector(`.mood-btn[data-mood="${mood}"]`);
    selectedBtn.classList.add('selected');

    // Store selection
    selectedMood = mood;
}

function generatePrediction() {
    const nameInput = document.getElementById('prediction-name');
    const resultBox = document.getElementById('prediction-result');
    const name = nameInput.value.trim();

    // Validation
    if (!name) {
        showError(resultBox, 'Please enter your name');
        return;
    }

    if (!selectedMood) {
        showError(resultBox, 'Please select your mood');
        return;
    }

    // Get random prediction for selected mood
    const moodPredictions = predictions[selectedMood];
    const randomIndex = Math.floor(Math.random() * moodPredictions.length);
    const prediction = moodPredictions[randomIndex];

    // Personalize with name
    const personalizedPrediction = `<strong>${name}</strong>, ${prediction}`;

    // Store result for sharing
    lastResult = `${name}'s 2026 Prediction: ${prediction}`;

    // Display result
    resultBox.innerHTML = `<p>${personalizedPrediction}</p>`;
    resultBox.classList.remove('hidden');

    // Trigger celebration
    triggerCelebration();
}

/* ===========================
   3. WISH PROBABILITY CHECKER
   =========================== */
// Encouraging messages for different probability ranges
const encouragementMessages = {
    high: [
        "The universe is strongly aligned with this wish! Keep taking action toward it.",
        "Excellent prospects! Your wish has powerful momentum behind it.",
        "The stars are aligned! This wish is well within your reach.",
        "Outstanding probability! Trust the process and stay committed.",
        "Exceptional chances! Your wish is manifesting beautifully."
    ],
    medium: [
        "Solid potential! With focus and effort, this wish can absolutely come true.",
        "Good chances! Stay positive and keep working toward it.",
        "Promising outlook! Your dedication will make the difference.",
        "Strong possibility! Believe in yourself and take consistent action.",
        "Great potential! Your wish is worth pursuing with confidence."
    ],
    decent: [
        "Encouraging prospects! Small steps forward will build momentum.",
        "There's real potential here! Stay hopeful and keep believing.",
        "Positive signs! Your wish has a fighting chance with your commitment.",
        "Good foundation! With persistence, this wish can manifest.",
        "Hopeful outlook! Trust in the journey and stay dedicated."
    ]
};

function checkWishProbability() {
    const wishInput = document.getElementById('wish-text');
    const resultBox = document.getElementById('wish-result');
    const wish = wishInput.value.trim();

    // Validation
    if (!wish) {
        showError(resultBox, 'Please enter your wish');
        return;
    }

    // Generate random probability between 45% and 95%
    const probability = Math.floor(Math.random() * 51) + 45; // 45-95

    // Determine message category based on probability
    let messageCategory;
    if (probability >= 75) {
        messageCategory = 'high';
    } else if (probability >= 60) {
        messageCategory = 'medium';
    } else {
        messageCategory = 'decent';
    }

    // Get random encouragement message
    const messages = encouragementMessages[messageCategory];
    const randomIndex = Math.floor(Math.random() * messages.length);
    const message = messages[randomIndex];

    // Store result for sharing
    lastResult = `My 2026 wish has a ${probability}% chance! ${message}`;

    // Display result with probability
    resultBox.innerHTML = `
        <span class="probability">${probability}%</span>
        <p>${message}</p>
    `;
    resultBox.classList.remove('hidden');

    // Trigger celebration
    triggerCelebration();
}

/* ===========================
   4. LIFE PARTNER PREDICTION
   =========================== */
// Status-based insights
const partnerInsights = {
    single: [
        "2026 brings emotional clarity before commitment. Focus on becoming the person you want to attract.",
        "This year, self-discovery leads to authentic connections. Your independence is your greatest relationship asset.",
        "2026 invites you to define what partnership truly means to you. Clarity attracts the right person.",
        "Focus on your personal growth in 2026. The right person appears when you're genuinely ready.",
        "This year teaches you that being single is powerful preparation. Trust in divine timing."
    ],
    healing: [
        "2026 is your year of gentle recovery and renewed self-love. Healing creates space for healthier connections.",
        "This year honors your healing journey. As you mend, you attract relationships that truly nourish your soul.",
        "2026 brings closure and new beginnings. Your healing process is preparing you for something beautiful.",
        "Focus on self-compassion in 2026. True healing attracts genuine love when the time is right.",
        "This year, your healing becomes your strength. Take all the time you need - the right person will wait."
    ],
    ready: [
        "2026 opens doors to meaningful connection. Your readiness attracts someone equally prepared for partnership.",
        "This year, your openness creates opportunities for genuine love. Stay true to your values and trust the process.",
        "2026 brings you closer to authentic partnership. Your emotional readiness is your greatest asset.",
        "Your readiness shines in 2026! Expect to meet someone who matches your energy and commitment.",
        "This year rewards your emotional preparation. Stay open, stay authentic, and trust in perfect timing."
    ]
};

function selectStatus(status) {
    // Remove previous selection
    document.querySelectorAll('.status-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Add selection to clicked button
    const selectedBtn = document.querySelector(`.status-btn[data-status="${status}"]`);
    selectedBtn.classList.add('selected');

    // Store selection
    selectedStatus = status;
}

function generatePartnerInsight() {
    const nameInput = document.getElementById('partner-name');
    const resultBox = document.getElementById('partner-result');
    const name = nameInput.value.trim();

    // Validation
    if (!name) {
        showError(resultBox, 'Please enter your name');
        return;
    }

    if (!selectedStatus) {
        showError(resultBox, 'Please select your status');
        return;
    }

    // Get random insight for selected status
    const statusInsights = partnerInsights[selectedStatus];
    const randomIndex = Math.floor(Math.random() * statusInsights.length);
    const insight = statusInsights[randomIndex];

    // Personalize with name
    const personalizedInsight = `<strong>${name}</strong>, ${insight}`;

    // Store result for sharing
    lastResult = `${name}'s 2026 Love Journey: ${insight}`;

    // Display result
    resultBox.innerHTML = `<p>${personalizedInsight}</p>`;
    resultBox.classList.remove('hidden');

    // Trigger celebration
    triggerCelebration();
}

/* ===========================
   ERROR HANDLING
   =========================== */
function showError(resultBox, message) {
    resultBox.innerHTML = `<p style="color: var(--neon-pink);">⚠️ ${message}</p>`;
    resultBox.classList.remove('hidden');

    // Auto-hide error after 3 seconds
    setTimeout(() => {
        resultBox.classList.add('hidden');
    }, 3000);
}

/* ===========================
   CELEBRATION EFFECTS
   =========================== */
function triggerCelebration() {
    // Show success overlay
    const overlay = document.getElementById('success-overlay');
    overlay.classList.remove('hidden');

    // Start fireworks
    startFireworks();

    // Hide overlay after 3 seconds
    setTimeout(() => {
        overlay.classList.add('hidden');
        stopFireworks();
    }, 3000);
}

/* ===========================
   FIREWORKS ANIMATION
   =========================== */
let fireworksInterval;
let canvas;
let ctx;
let particles = [];

function setupCanvas() {
    canvas = document.getElementById('fireworks-canvas');
    ctx = canvas.getContext('2d');
    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function startFireworks() {
    canvas.classList.add('active');
    particles = [];

    // Create multiple fireworks
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFirework();
        }, i * 200);
    }

    // Animation loop
    fireworksInterval = setInterval(() => {
        updateFireworks();
    }, 1000 / 60); // 60 FPS
}

function stopFireworks() {
    clearInterval(fireworksInterval);
    canvas.classList.remove('active');
    particles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height / 2);
    const colors = ['#b967ff', '#05d9e8', '#ff2a6d', '#01ffc3', '#ffea00'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Create particle burst
    for (let i = 0; i < 50; i++) {
        const angle = (Math.PI * 2 * i) / 50;
        const velocity = 2 + Math.random() * 3;

        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            life: 1,
            color: color
        });
    }
}

function updateFireworks() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.05; // Gravity
        particle.life -= 0.01;

        if (particle.life <= 0) {
            particles.splice(index, 1);
            return;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.life;
        ctx.fill();
        ctx.globalAlpha = 1;
    });

    // Create new firework periodically
    if (Math.random() < 0.03) {
        createFirework();
    }
}

/* ===========================
   SOCIAL SHARING
   =========================== */
function shareOnTwitter() {
    if (!lastResult) {
        alert('Generate a prediction first!');
        return;
    }

    const text = encodeURIComponent(`${lastResult} ✨ #Welcome2026 #NewYear2026`);
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank', 'width=600,height=400');
}

function shareOnFacebook() {
    if (!lastResult) {
        alert('Generate a prediction first!');
        return;
    }

    const url = encodeURIComponent(window.location.href);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

function downloadResult() {
    if (!lastResult) {
        alert('Generate a prediction first!');
        return;
    }

    // Create a canvas to draw the result
    const downloadCanvas = document.createElement('canvas');
    downloadCanvas.width = 1200;
    downloadCanvas.height = 630;
    const downloadCtx = downloadCanvas.getContext('2d');

    // Background gradient
    const gradient = downloadCtx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, '#0a0a0f');
    gradient.addColorStop(0.5, '#1a0a20');
    gradient.addColorStop(1, '#0a0a0f');
    downloadCtx.fillStyle = gradient;
    downloadCtx.fillRect(0, 0, 1200, 630);

    // Title
    downloadCtx.fillStyle = '#b967ff';
    downloadCtx.font = 'bold 60px Arial';
    downloadCtx.textAlign = 'center';
    downloadCtx.fillText('✨ Welcome to 2026 ✨', 600, 100);

    // Result text (wrapped)
    downloadCtx.fillStyle = '#ffffff';
    downloadCtx.font = '32px Arial';
    wrapText(downloadCtx, lastResult, 600, 300, 1000, 45);

    // Footer
    downloadCtx.fillStyle = '#6b6b7b';
    downloadCtx.font = '24px Arial';
    downloadCtx.fillText('Your New Year Journey', 600, 550);

    // Download
    downloadCanvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '2026-prediction.png';
        a.click();
        URL.revokeObjectURL(url);
    });
}

// Helper function to wrap text on canvas
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let testLine = '';
    let lineArray = [];

    for (let n = 0; n < words.length; n++) {
        testLine += `${words[n]} `;
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
            lineArray.push(line);
            line = `${words[n]} `;
            testLine = `${words[n]} `;
        } else {
            line += `${words[n]} `;
        }
    }
    lineArray.push(line);

    // Center the text block
    const startY = y - (lineArray.length * lineHeight) / 2;

    for (let k = 0; k < lineArray.length; k++) {
        context.fillText(lineArray[k], x, startY + (k * lineHeight));
    }
}

/* ===========================
   KEYBOARD SHORTCUTS
   =========================== */
document.addEventListener('keydown', function(e) {
    // Enter key submits the focused form
    if (e.key === 'Enter' && !e.shiftKey) {
        const activeElement = document.activeElement;

        // Check which card the active element is in
        if (activeElement.id === 'message-name') {
            e.preventDefault();
            generateMessage();
        } else if (activeElement.id === 'prediction-name') {
            e.preventDefault();
            if (selectedMood) generatePrediction();
        } else if (activeElement.id === 'wish-text' && !e.shiftKey) {
            e.preventDefault();
            checkWishProbability();
        } else if (activeElement.id === 'partner-name') {
            e.preventDefault();
            if (selectedStatus) generatePartnerInsight();
        }
    }
});