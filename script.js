/* ==========================================================================
   ROMANTIC TRIVIA WEBSITE JAVASCRIPT
   ========================================================================== */

// Target email address
const TARGET_EMAIL = "yashgaur1012@gmail.com";
const WEB3FORMS_KEY = "80f8295b-01a2-4a00-983c-d383925c4efc"; 

// 10 Questions Array as per request
const triviaQuestions = [
    {
        id: 1,
        question: "Q1) When is Yash's birthday?",
        options: [
            "December 10 2006",
            "November 10 2006",
            "December 12 2006",
            "October 10 2006"
        ],
        correct: 0
    },
    {
        id: 2,
        question: "Q2) What is Yash's favourite color?",
        options: [
            "Blue",
            "Crimson Red",
            "Pastel Pink",
            "Emerald Green"
        ],
        correct: 0
    },
    {
        id: 3,
        question: "Q3) What does Yash do when Sayon is busy and he is free?",
        options: [
            "Wait for Sayon",
            "Play's games alon",
            "Takes a long nap",
            "Scrolls Instagram endlessly"
        ],
        correct: 0
    },
    {
        id: 4,
        question: "Q4) What is Yash's comfort food?",
        options: [
            "Pizza",
            "Burgers",
            "Tacos",
            "Pasta"
        ],
        correct: 0
    },
    {
        id: 5,
        question: "Q5) On a scale of 1 to 10 how much does Yash love you?",
        options: [
            "10",
            "7",
            "8",
            "9"
        ],
        correct: 0
    },
    {
        id: 6,
        question: "Q6) Who does Yash love the most?",
        options: [
            "Sayon"
        ],
        correct: 0
    },
    {
        id: 7,
        question: "Q7) Who does Yash want?",
        options: [
            "Sayon"
        ],
        correct: 0
    },
    {
        id: 8,
        question: "Q8) Who does Yash want to marry?",
        options: [
            "Sayon"
        ],
        correct: 0
    },
    {
        id: 9,
        question: "Q9) Who is Yash's favorite person to talk to every single day?",
        options: [
            "Sayon"
        ],
        correct: 0
    },
    {
        id: 10,
        question: "Q10) Who holds the key to Yash's heart forever?",
        options: [
            "Sayon"
        ],
        correct: 0
    }
];

// YouTube Video ID for "We fell in love in october" by girl in red
const SONG_OCTOBER_ID = "iggmiF7DNoM";

let currentQuestionIndex = 0;
let userAnswers = [];
let userScore = 0;
let isMuted = false;

// Background Audio Stream via Hidden Iframe
function playBackgroundTrack(videoId, title) {
    const iframe = document.getElementById("youtubeIframe");
    if (iframe) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&loop=1&playlist=${videoId}`;
        document.getElementById("songTitle").innerText = "🎶 " + title;
        document.getElementById("toggleMusicBtn").innerText = "🔊 Mute";
        isMuted = false;
    }
}

function toggleMute() {
    const iframe = document.getElementById("youtubeIframe");
    const btn = document.getElementById("toggleMusicBtn");

    if (!isMuted) {
        iframe.src = "about:blank";
        btn.innerText = "🔇 Unmute";
        isMuted = true;
    } else {
        playBackgroundTrack(SONG_OCTOBER_ID, "We fell in love in october");
        btn.innerText = "🔊 Mute";
        isMuted = false;
    }
}

// Create Floating Hearts
function initFloatingHearts() {
    const container = document.getElementById("heartsContainer");
    const heartSymbols = ["💖", "💕", "🌸", "✨", "💗", "💘"];

    for (let i = 0; i < 25; i++) {
        const heart = document.createElement("div");
        heart.className = "floating-heart";
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (8 + Math.random() * 8) + "s";
        heart.style.animationDelay = (Math.random() * 5) + "s";
        heart.style.fontSize = (16 + Math.random() * 20) + "px";
        container.appendChild(heart);
    }
}

// Show a specific screen
function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
        screen.classList.add("hidden");
    });

    const target = document.getElementById(screenId);
    if (target) {
        target.classList.remove("hidden");
        target.classList.add("active");
    }
}

// Render Current Question
function renderQuestion() {
    const q = triviaQuestions[currentQuestionIndex];
    document.getElementById("questionCounter").innerText = `Question ${currentQuestionIndex + 1} of ${triviaQuestions.length}`;
    
    const percent = Math.round(((currentQuestionIndex + 1) / triviaQuestions.length) * 100);
    document.getElementById("progressPercent").innerText = `${percent}%`;
    document.getElementById("progressBar").style.width = `${percent}%`;

    document.getElementById("questionText").innerText = q.question;

    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = "";

    const optionPrefixes = ["A", "B", "C", "D"];

    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerHTML = `
            <span class="option-prefix">${optionPrefixes[index] || "•"}</span>
            <span class="option-text">${option}</span>
        `;

        btn.onclick = () => selectOption(index, option);
        optionsContainer.appendChild(btn);
    });
}

// Handle Option Selection
function selectOption(optionIndex, optionText) {
    const currentQ = triviaQuestions[currentQuestionIndex];
    
    if (optionIndex === currentQ.correct) {
        userScore++;
    }

    userAnswers.push({
        question: currentQ.question,
        selectedAnswer: optionText,
        isCorrect: optionIndex === currentQ.correct
    });

    if (typeof confetti === "function") {
        confetti({
            particleCount: 25,
            spread: 60,
            origin: { y: 0.7 }
        });
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < triviaQuestions.length) {
        const card = document.getElementById("questionCard");
        card.style.opacity = "0";
        card.style.transform = "translateX(-20px)";

        setTimeout(() => {
            renderQuestion();
            card.style.opacity = "1";
            card.style.transform = "translateX(0)";
        }, 250);
    } else {
        finishQuiz();
    }
}

// Finish Quiz & Email Results
function finishQuiz() {
    showScreen("screenScore");
    document.getElementById("scoreDisplay").innerText = `${userScore} / ${triviaQuestions.length}`;

    if (typeof confetti === "function") {
        confetti({
            particleCount: 120,
            spread: 100,
            origin: { y: 0.6 }
        });
    }

    sendAnswersToYash();
}

// Email Submission using Web3Forms
function sendAnswersToYash() {
    const emailStatus = document.getElementById("emailStatus");
    emailStatus.innerText = "💌 Mailing Sayon's answers to Yash...";

    let formattedAnswers = "Sayon's Trivia Results 💕:\n\n";
    userAnswers.forEach((ans, idx) => {
        formattedAnswers += `${ans.question}\nAnswered: ${ans.selectedAnswer}\n\n`;
    });
    formattedAnswers += `Final Score: ${userScore}/${triviaQuestions.length}`;

    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "💕 Sayon finished your romantic trivia! 💕");
    formData.append("from_name", "Sayon's Trivia App");
    formData.append("email", TARGET_EMAIL);
    formData.append("message", formattedAnswers);

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            emailStatus.innerText = "✨ Yash received your answers successfully!";
        } else {
            emailStatus.innerText = "💌 Answers recorded with love!";
        }
    })
    .catch(err => {
        emailStatus.innerText = "💌 Answers recorded with love!";
    });
}

// Event Listeners Initialization
document.addEventListener("DOMContentLoaded", () => {
    initFloatingHearts();

    // Start Quiz Button triggers background song "We fell in love in october"
    document.getElementById("startQuizBtn").addEventListener("click", () => {
        playBackgroundTrack(SONG_OCTOBER_ID, "We fell in love in october");
        showScreen("screenQuiz");
        renderQuestion();
    });

    // Mute/Unmute toggle button
    document.getElementById("toggleMusicBtn").addEventListener("click", toggleMute);

    // View Letter Button (keeps playing "We fell in love in october")
    document.getElementById("viewLetterBtn").addEventListener("click", () => {
        showScreen("screenLetter");

        if (typeof confetti === "function") {
            confetti({
                particleCount: 150,
                spread: 120,
                origin: { y: 0.5 }
            });
        }
    });
});
