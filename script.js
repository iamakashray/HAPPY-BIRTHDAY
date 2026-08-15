const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(screen => screen.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.getElementById("startBtn").addEventListener("click", () => {
  showScreen("letter-cover");
});

document.getElementById("openLetterBtn").addEventListener("click", () => {
  showScreen("letter");
});

const introVideo = document.getElementById("introVideo");
const introVideoScreen = document.getElementById("intro-video-screen");

async function startIntroVideo() {
  showScreen("intro-video-screen");
  introVideoScreen.classList.remove("transitioning");

  // User click immediately before this function makes playback much more
  // likely to be allowed by the browser.
  try {
    introVideo.currentTime = 0;
    await introVideo.play();
  } catch (error) {
    // If autoplay is blocked, continue to the photo so the experience
    // does not get stuck.
    setTimeout(goToPhoto, 700);
  }
}

function goToPhoto() {
  introVideoScreen.classList.add("transitioning");

  setTimeout(() => {
    introVideo.pause();
    introVideo.currentTime = 0;
    introVideoScreen.classList.remove("transitioning");
    showScreen("photo-screen");
  }, 900);
}

document.getElementById("nextToIntroVideo").addEventListener("click", startIntroVideo);

introVideo.addEventListener("ended", goToPhoto);

introVideo.addEventListener("error", () => {
  // Missing/invalid intro video should not block the birthday page.
  setTimeout(goToPhoto, 300);
});

document.getElementById("nextToVideo").addEventListener("click", () => {
  showScreen("video-screen");
});

const video = document.getElementById("birthdayVideo");
const playButton = document.getElementById("playVideoBtn");

playButton.addEventListener("click", async () => {
  try {
    await video.play();
    playButton.classList.add("hidden");
  } catch (error) {
    // Browser blocked autoplay-style playback; controls still work.
    video.controls = true;
  }
});

video.addEventListener("play", () => {
  playButton.classList.add("hidden");

  // Once the video starts, remove every extra text element
  // so the video becomes the only visible content.
  const heading = document.querySelector(".video-heading");
  const finalLine = document.querySelector(".final-line");

  if (heading) heading.classList.add("video-text-hidden");
  if (finalLine) finalLine.classList.add("video-text-hidden");
});

video.addEventListener("pause", () => {
  if (!video.ended) {
    playButton.classList.remove("hidden");
  }
});

video.addEventListener("ended", () => {
  playButton.classList.remove("hidden");
  playButton.querySelector("span:last-child").textContent = "Play Again";

  const heading = document.querySelector(".video-heading");
  const finalLine = document.querySelector(".final-line");

  if (heading) heading.classList.remove("video-text-hidden");
  if (finalLine) finalLine.classList.remove("video-text-hidden");
});
