const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}


// ==============================
// START SCREEN
// ==============================

document.getElementById("startBtn").addEventListener("click", () => {
  showScreen("letter-cover");
});


// ==============================
// LETTER
// ==============================

document.getElementById("openLetterBtn").addEventListener("click", () => {
  showScreen("letter");
});


// ==============================
// INTRO VIDEO
// ==============================

const introVideo = document.getElementById("introVideo");
const introVideoScreen = document.getElementById("intro-video-screen");


// ==============================
// PHOTO MUSIC
// ==============================

const photoMusic = document.getElementById("photoMusic");


// ==============================
// CELEBRATION
// ==============================

const celebrationContainer =
  document.getElementById("celebration-container");

let celebrationInterval = null;


function createCelebration() {

  for (let i = 0; i < 80; i++) {

    const confetti = document.createElement("div");

    confetti.className = "confetti";

    confetti.style.left =
      Math.random() * 100 + "%";

    confetti.style.background =
      `hsl(${Math.random() * 360}, 100%, 65%)`;

    confetti.style.animationDelay =
      Math.random() * 0.8 + "s";

    confetti.style.animationDuration =
      2.5 + Math.random() * 2 + "s";

    celebrationContainer.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}


function startCelebration() {

  stopCelebration();

  // First celebration immediately
  createCelebration();

  // Repeat every 7 seconds
  celebrationInterval = setInterval(() => {
    createCelebration();
  }, 7000);
}


function stopCelebration() {

  if (celebrationInterval !== null) {
    clearInterval(celebrationInterval);
    celebrationInterval = null;
  }

  celebrationContainer.innerHTML = "";
}


// ==============================
// START INTRO VIDEO
// ==============================

async function startIntroVideo() {

  showScreen("intro-video-screen");

  introVideoScreen.classList.remove("transitioning");

  try {

    introVideo.currentTime = 0;

    await introVideo.play();

  } catch (error) {

    setTimeout(goToPhoto, 700);

  }
}


// ==============================
// INTRO VIDEO → PHOTO
// ==============================

function goToPhoto() {

  introVideoScreen.classList.add("transitioning");

  setTimeout(() => {

    introVideo.pause();

    introVideo.currentTime = 0;

    introVideoScreen.classList.remove("transitioning");


    // Show photo
    showScreen("photo-screen");


    // Start background music
    photoMusic.currentTime = 0;

    photoMusic.play().catch(error => {
      console.log("Music playback failed:", error);
    });


    // Start celebration
    startCelebration();

  }, 900);
}


// Letter → Intro Video
document
  .getElementById("nextToIntroVideo")
  .addEventListener("click", startIntroVideo);


// Intro Video → Photo
introVideo.addEventListener("ended", goToPhoto);


// Intro Video error → Photo
introVideo.addEventListener("error", () => {

  setTimeout(goToPhoto, 300);

});

// ==============================
// PHOTO → FINAL MESSAGE
// ==============================

const nextToVideo = document.getElementById("nextToVideo");

nextToVideo.addEventListener("click", () => {

  // Stop photo music
  photoMusic.pause();
  photoMusic.currentTime = 0;

  // Stop celebration
  stopCelebration();

  // Show final message directly
  showScreen("final-screen");

});
