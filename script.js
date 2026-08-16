document.addEventListener("DOMContentLoaded", () => {
document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // SCREEN MANAGEMENT
  // ==========================================

  const screens = document.querySelectorAll(".screen");

  function showScreen(id) {

    screens.forEach(screen => {
      screen.classList.remove("active");
    });

    const target = document.getElementById(id);

    if (target) {
      target.classList.add("active");
    } else {
      console.error("Screen not found:", id);
    }
  }


  // ==========================================
  // ELEMENTS
  // ==========================================

  const startBtn =
    document.getElementById("startBtn");

  const openLetterBtn =
    document.getElementById("openLetterBtn");

  const nextToIntroVideo =
    document.getElementById("nextToIntroVideo");

  const nextToVideo =
    document.getElementById("nextToVideo");

  const introVideo =
    document.getElementById("introVideo");

  const introVideoScreen =
    document.getElementById("intro-video-screen");

  const photoMusic =
    document.getElementById("photoMusic");

  const celebrationContainer =
    document.getElementById("celebration-container");


  // ==========================================
  // START SCREEN
  // ==========================================

  startBtn?.addEventListener("click", () => {

    showScreen("letter-cover");

  });


  // ==========================================
  // LETTER COVER → LETTER
  // ==========================================

  openLetterBtn?.addEventListener("click", () => {

    showScreen("letter");

  });


  // ==========================================
  // CELEBRATION
  // ==========================================

  let celebrationInterval = null;


  function createCelebration() {

    if (!celebrationContainer) return;

    for (let i = 0; i < 80; i++) {

      const confetti =
        document.createElement("div");

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

    createCelebration();

    celebrationInterval =
      setInterval(() => {

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
  // INTRO VIDEO
  // ==========================================

  function startIntroVideo() {

    showScreen("intro-video-screen");

    if (introVideoScreen) {

      introVideoScreen.classList.remove(
        "transitioning"
      );

    }

    if (!introVideo) {

      console.error("introVideo not found");

      goToPhoto();

      return;
    }

    introVideo.currentTime = 0;

    const playPromise =
      introVideo.play();

    if (playPromise !== undefined) {

      playPromise.catch(error => {

        console.log(
          "Video autoplay failed:",
          error
        );

        setTimeout(
          goToPhoto,
          700
        );

      });

    }
  }


  // ==========================================
  // INTRO VIDEO → PHOTO
  // ==========================================

  function goToPhoto() {

    if (
      introVideoScreen &&
      !introVideoScreen.classList.contains(
        "transitioning"
      )
    ) {

      introVideoScreen.classList.add(
        "transitioning"
      );

      setTimeout(() => {

        if (introVideo) {

          introVideo.pause();

          introVideo.currentTime = 0;

        }

        introVideoScreen.classList.remove(
          "transitioning"
        );

        showPhoto();

      }, 900);

    } else {

      showPhoto();

    }
  }


  // ==========================================
  // SHOW PHOTO
  // ==========================================

  function showPhoto() {

    showScreen("photo-screen");

    // Music
    if (photoMusic) {

      photoMusic.currentTime = 0;

      photoMusic.play().catch(error => {

        console.log(
          "Music playback failed:",
          error
        );

      });

    }

    // Confetti
    startCelebration();

  }


  // ==========================================
  // LETTER → INTRO VIDEO
  // ==========================================

  nextToIntroVideo?.addEventListener(
    "click",
    startIntroVideo
  );


  // ==========================================
  // INTRO VIDEO EVENTS
  // ==========================================

  introVideo?.addEventListener(
    "ended",
    goToPhoto
  );


  introVideo?.addEventListener(
    "error",
    () => {

      console.log(
        "Intro video error"
      );

      setTimeout(
        goToPhoto,
        300
      );

    }
  );


  // ==========================================
  // PHOTO → FINAL MESSAGE
  // ==========================================

  nextToVideo?.addEventListener(
    "click",
    () => {

      // Stop music
      if (photoMusic) {

        photoMusic.pause();

        photoMusic.currentTime = 0;

      }

      // Stop confetti
      stopCelebration();

      // Directly show final message
      showScreen("final-screen");

    }
  );


  // ==========================================
  // IMPORTANT:
  // START ONLY WITH INTRO SCREEN
  });
  // ==========================================

  showScreen("intro");

});
console.log("NEW SCRIPT LOADED");
console.log("Active screen:", document.querySelector(".screen.active")?.id);

showScreen("intro");
