const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(screen => screen.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}


// Start button
document.getElementById("startBtn").addEventListener("click", () => {
  showScreen("letter-cover");
});


// Open letter
document.getElementById("openLetterBtn").addEventListener("click", () => {
  showScreen("letter");
});


// Intro Video
const introVideo = document.getElementById("introVideo");
const introVideoScreen = document.getElementById("intro-video-screen");


// Photo Music
const photoMusic = document.getElementById("photoMusic");


// Start Intro Video
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


// Go to Photo
function goToPhoto() {
  introVideoScreen.classList.add("transitioning");

  setTimeout(() => {
    introVideo.pause();
    introVideo.currentTime = 0;
    introVideoScreen.classList.remove("transitioning");

    // Show Photo
    showScreen("photo-screen");

    // Start Photo Background Music
    photoMusic.currentTime = 0;
    photoMusic.play().catch(error => {
      console.log("Music playback failed:", error);
    });

  }, 900);
}


// Letter → Intro Video
document.getElementById("nextToIntroVideo").addEventListener("click", startIntroVideo);


// Intro Video ended → Photo + Music
introVideo.addEventListener("ended", goToPhoto);


// Intro Video error → Photo + Music
introVideo.addEventListener("error", () => {
  setTimeout(goToPhoto, 300);
});


// Photo → Final Video
document.getElementById("nextToVideo").addEventListener("click", () => {

  // Stop Photo Music
  photoMusic.pause();
  photoMusic.currentTime = 0;

  showScreen("video-screen");
});


// Final Birthday Video
const video = document.getElementById("birthdayVideo");
const playButton = document.getElementById("playVideoBtn");


// Play button
playButton.addEventListener("click", async () => {
  try {
    await video.play();
    playButton.classList.add("hidden");
  } catch (error) {
    video.controls = true;
  }
});


// Video starts
video.addEventListener("play", () => {
  playButton.classList.add("hidden");

  const heading = document.querySelector(".video-heading");
  const finalLine = document.querySelector(".final-line");

  if (heading) heading.classList.add("video-text-hidden");
  if (finalLine) finalLine.classList.add("video-text-hidden");
});


// Video pauses
video.addEventListener("pause", () => {
  if (!video.ended) {
    playButton.classList.remove("hidden");
  }
});


// Video ends
video.addEventListener("ended", () => {
  playButton.classList.remove("hidden");

  playButton.querySelector("span:last-child").textContent = "Play Again";

  const heading = document.querySelector(".video-heading");
  const finalLine = document.querySelector(".final-line");

  if (heading) heading.classList.remove("video-text-hidden");
  if (finalLine) finalLine.classList.remove("video-text-hidden");
});
