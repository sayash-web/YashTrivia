// Floating Background Hearts Generator
function createFloatingHearts() {
    const container = id('floatingHeartsBg');
    const hearts = ['💖', '💗', '💓', '💕', '✨', '🌸', '💘'];
    
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-float');
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${6 + Math.random() * 6}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.fontSize = `${1.2 + Math.random() * 1.5}rem`;
        container.appendChild(heart);
    }
}

function id(name) {
    return document.getElementById(name);
}

// Interactive surprise messages & confetti
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();

    const hugBtn = id('hugBtn');
    const kissBtn = id('kissBtn');
    const celebrateBtn = id('celebrateBtn');
    const surpriseMsg = id('surpriseMessage');
    const mainHeart = id('mainHeart');

    function triggerConfetti() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }

    hugBtn.addEventListener('click', () => {
        surpriseMsg.classList.remove('hidden');
        surpriseMsg.innerHTML = "🤗 <strong>A big, warm virtual hug is wrapped around you right now!</strong> Imagine me holding you close and never letting go until we see each other again.";
        triggerConfetti();
    });

    kissBtn.addEventListener('click', () => {
        surpriseMsg.classList.remove('hidden');
        surpriseMsg.innerHTML = "💋 <strong>Sending 18,000 sweet kisses across the distance straight to Sayon!</strong> You deserve all the love in the world.";
        triggerConfetti();
    });

    celebrateBtn.addEventListener('click', () => {
        surpriseMsg.classList.remove('hidden');
        surpriseMsg.innerHTML = "🎉 <strong>Happy 18th Monthaversary Sayon!</strong> Here's to 1.5 years of pure bliss and a lifetime of adventures waiting for us!";
        
        // Extra confetti burst
        if (typeof confetti === 'function') {
            const end = Date.now() + (2 * 1000);
            const colors = ['#ff4081', '#ffffff', '#ffd54f'];

            (function frame() {
                confetti({
                    particleCount: 4,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
                    particleCount: 4,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    });

    mainHeart.addEventListener('click', () => {
        triggerConfetti();
    });

    // YouTube IFrame API Integration for "we fell in love in october" by girl in red
    let player = null;
    let isPlaying = false;
    const musicBtn = id('musicToggle');

    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('youtubePlayer', {
            height: '0',
            width: '0',
            videoId: 'iggmiF7DNoM', // "we fell in love in october" by girl in red
            playerVars: {
                'playsinline': 1,
                'loop': 1,
                'playlist': 'iggmiF7DNoM'
            },
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    };

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING) {
            isPlaying = true;
            musicBtn.classList.add('playing');
            musicBtn.querySelector('.music-text').innerText = 'Playing "we fell in love in october" 💖';
        } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
            isPlaying = false;
            musicBtn.classList.remove('playing');
            musicBtn.querySelector('.music-text').innerText = 'Play "we fell in love in october" 🎶';
        }
    }

    musicBtn.addEventListener('click', () => {
        if (!player || typeof player.playVideo !== 'function') return;

        if (!isPlaying) {
            player.playVideo();
        } else {
            player.pauseVideo();
        }
    });
});

// Flip card handler
function flipCard(cardElement) {
    cardElement.classList.toggle('flipped');
}
