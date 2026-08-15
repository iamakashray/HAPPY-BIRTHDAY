const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(screen => screen.classList.remove("active"));

  const target = document.getElementById(id);

  if (target) {
    target.classList.add("active");
  }
}


// ===============================
// START → LETTER COVER
// ===============================

document.getElementById("startBtn").addEventListener("click", () => {
  showScreen("letter-cover");
});


// ===============================
// OPEN LETTER
// ===============================

document.getElementById("openLetterBtn").addEventListener("click", () => {
  showScreen("letter");
});


// ===============================
// INTRO VIDEO
// ===============================

const introVideo = document.getElementById("introVideo");
const introVideoScreen = document.getElementById("intro-video-screen");

let introStarted = false;
let introFinished = false;


// Next button → Intro video
document.getElementById("nextToIntroVideo").addEventListener("click", () => {

  introStarted = false;
  introFinished = false;

  showScreen("intro-video-screen");

  introVideoScreen.classList.remove("transitioning");

  introVideo.pause();
  introVideo.currentTime = 0;

  // IMPORTANT:
  // Wait until GitHub Pages actually loads enough video data.
  if (introVideo.readyState >= 2) {
    playIntroVideo();
  } else {
    introVideo.load();
    introVideo.addEventListener("loadeddata", playIntroVideo, {
      once: true
    });
  }
});


function playIntroVideo() {

  if (introStarted || introFinished) return;

  introStarted = true;

  introVideo.play()
    .then(() => {
      console.log("Intro video playing successfully");
    })
    .catch(error => {

      console.error("Intro video play failed:", error);

      // Try muted playback as fallback.
      introVideo.muted = true;

      introVideo.play()
        .then(() => {
          console.log("Intro video playing muted");
        })
        .catch(error2 => {
          console.error("Muted playback also failed:", error2);
        });
    });
}


// Intro video finished → Photo
introVideo.addEventListener("ended", () => {

  if (introFinished) return;

  introFinished = true;

  introVideoScreen.classList.add("transitioning");

  setTimeout(() => {

    introVideo.pause();
    introVideo.currentTime = 0;

    introVideoScreen.classList.remove("transitioning");

    showScreen("photo-screen");

  }, 900);
});


// Video loading error
introVideo.addEventListener("error", () => {

  console.error(
    "Intro video could not be loaded.",
    introVideo.error
  );

});


// ===============================
// PHOTO → FINAL VIDEO
// ===============================

document.getElementById("nextToVideo").addEventListener("click", () => {
  showScreen("video-screen");
});


// ===============================
// FINAL VIDEO
// ===============================

const video = document.getElementById("birthdayVideo");
const playButton = document.getElementById("playVideoBtn");


// Tap to Play
playButton.addEventListener("click", async () => {

  try {

    await video.play();

    playButton.classList.add("hidden");

  } catch (error) {

    console.error("Final video play failed:", error);

    video.controls = true;

  }

});


// Video starts
video.addEventListener("play", () => {

  playButton.classList.add("hidden");

  const heading = document.querySelector(".video-heading");
  const finalLine = document.querySelector(".final-line");

  if (heading) {
    heading.classList.add("video-text-hidden");
  }

  if (finalLine) {
    finalLine.classList.add("video-text-hidden");
  }

});


// Video paused
video.addEventListener("pause", () => {

  if (!video.ended) {
    playButton.classList.remove("hidden");
  }

});


// Video finished
video.addEventListener("ended", () => {

  playButton.classList.remove("hidden");

  playButton.querySelector("span:last-child").textContent =
    "Play Again";

});
