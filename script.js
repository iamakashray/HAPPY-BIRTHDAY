// ==========================================
// SCREEN MANAGEMENT
// ==========================================

const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  const targetScreen = document.getElementById(id);

  if (targetScreen) {
    targetScreen.classList.add("active");
  } else {
    console.error(`Screen not found: ${id}`);
  }
}


// ==========================================
// START SCREEN → LETTER COVER
// ==========================================

const startBtn = document.getElementById("startBtn");

if (startBtn) {
  startBtn.addEventListener("click", () => {
    showScreen("letter-cover");
  });
}


// ==========================================
// LETTER COVER → LETTER
// ==========================================

const openLetterBtn = document.getElementById("openLetterBtn");

if (openLetterBtn) {
  openLetterBtn.addEventListener("click", () => {
    showScreen("letter");
  });
}


// ==========================================
// INTRO VIDEO
// ==========================================

const introVideo = document.getElementById("introVideo");
const introVideoScreen =
  document.getElementById("intro-video-screen");


// ==========================================
// PHOTO MUSIC
// ==========================================

const photoMusic = document.getElementById("photoMusic");


// ==========================================
// CELEBRATION / CONFETTI
// ==========================================

const celebrationContainer =
  document.getElementById("celebration-container");

let celebrationInterval = null;


function createCelebration() {

  if (!celebrationContainer) return;

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

  if (celebrationContainer) {
    celebrationContainer.innerHTML = "";
  }
}


// ==========================================
// START INTRO VIDEO
// ==========================================

async function startIntroVideo() {

  showScreen("intro-video-screen");

  if (introVideoScreen) {
    introVideoScreen.classList.remove("transitioning");
  }

  if (!introVideo) {
    console.error("Intro video not found.");
    goToPhoto();
    return;
  }

  try {

    introVideo.currentTime = 0;

    await introVideo.play();

  } catch (error) {

    console.log("Intro video autoplay failed:", error);

    // If video cannot play, go to photo automatically
    setTimeout(goToPhoto, 700);
  }
}


// ==========================================
// INTRO VIDEO → PHOTO
// ==========================================

function goToPhoto() {

  if (!introVideoScreen) {
    showPhotoScreen();
    return;
  }

  // Prevent multiple transitions
  if (introVideoScreen.classList.contains("transitioning")) {
    return;
  }

  introVideoScreen.classList.add("transitioning");

  setTimeout(() => {

    if (introVideo) {
      introVideo.pause();
      introVideo.currentTime = 0;
    }

    introVideoScreen.classList.remove("transitioning");

    showPhotoScreen();

  }, 900);
}


// ==========================================
// SHOW PHOTO
// ==========================================

function showPhotoScreen() {

  // Show photo
  showScreen("photo-screen");

  // Start background music
  if (photoMusic) {

    photoMusic.currentTime = 0;

    photoMusic.play().catch(error => {
      console.log("Photo music playback failed:", error);
    });
  }

  // Start celebration
  startCelebration();
}


// ==========================================
// LETTER → INTRO VIDEO
// ==========================================

const nextToIntroVideo =
  document.getElementById("nextToIntroVideo");

if (nextToIntroVideo) {

  nextToIntroVideo.addEventListener(
    "click",
    startIntroVideo
  );
}


// ==========================================
// INTRO VIDEO → PHOTO
// ==========================================

if (introVideo) {

  introVideo.addEventListener(
    "ended",
    goToPhoto
  );

  introVideo.addEventListener(
    "error",
    () => {

      console.log("Intro video error.");

      setTimeout(goToPhoto, 300);
    }
  );
}


// ==========================================
// PHOTO → FINAL MESSAGE
// ==========================================

const nextToVideo =
  document.getElementById("nextToVideo");

if (nextToVideo) {

  nextToVideo.addEventListener("click", () => {

    // Stop photo music
    if (photoMusic) {

      photoMusic.pause();
      photoMusic.currentTime = 0;
    }

    // Stop celebration
    stopCelebration();

    // Directly show final message
    showScreen("final-screen");

  });
}


// ==========================================
// SAFETY CHECK
// ==========================================

// Make sure the page always starts from intro
showScreen("intro");
