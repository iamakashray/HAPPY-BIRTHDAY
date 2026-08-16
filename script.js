document.addEventListener("DOMContentLoaded", function () {

  const screens = document.querySelectorAll(".screen");

  function showScreen(id) {
    screens.forEach(screen => {
      screen.classList.remove("active");
    });

    const target = document.getElementById(id);

    if (target) {
      target.classList.add("active");
    }
  }


  // =========================
  // INTRO → LETTER COVER
  // =========================

  const startBtn = document.getElementById("startBtn");

  if (startBtn) {
    startBtn.addEventListener("click", function () {
      showScreen("letter-cover");
    });
  }


  // =========================
  // LETTER COVER → LETTER
  // =========================

  const openLetterBtn =
    document.getElementById("openLetterBtn");

  if (openLetterBtn) {
    openLetterBtn.addEventListener("click", function () {
      showScreen("letter");
    });
  }


  // =========================
  // ELEMENTS
  // =========================

  const nextToIntroVideo =
    document.getElementById("nextToIntroVideo");

  const introVideo =
    document.getElementById("introVideo");

  const introVideoScreen =
    document.getElementById("intro-video-screen");

  const nextToVideo =
    document.getElementById("nextToVideo");

  const photoMusic =
    document.getElementById("photoMusic");

  const celebrationContainer =
    document.getElementById("celebration-container");


  // =========================
  // LETTER → INTRO VIDEO
  // =========================

  if (nextToIntroVideo) {

    nextToIntroVideo.addEventListener("click", function () {

      showScreen("intro-video-screen");

      if (introVideo) {

        introVideo.currentTime = 0;

        introVideo.play().catch(function () {

          // If video cannot autoplay,
          // go directly to photo
          setTimeout(goToPhoto, 700);

        });

      } else {

        goToPhoto();

      }

    });

  }


  // =========================
  // VIDEO → PHOTO
  // =========================

  function goToPhoto() {

    if (introVideoScreen) {
      introVideoScreen.classList.add("transitioning");
    }

    setTimeout(function () {

      if (introVideo) {
        introVideo.pause();
        introVideo.currentTime = 0;
      }

      showScreen("photo-screen");

      if (photoMusic) {

        photoMusic.currentTime = 0;

        photoMusic.play().catch(function (error) {
          console.log("Music blocked:", error);
        });

      }

      startCelebration();

    }, 900);

  }


  // =========================
  // VIDEO EVENTS
  // =========================

  if (introVideo) {

    introVideo.addEventListener("ended", goToPhoto);

    introVideo.addEventListener("error", function () {

      setTimeout(goToPhoto, 300);

    });

  }


  // =========================
  // CONFETTI
  // =========================

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

      setTimeout(function () {
        confetti.remove();
      }, 5000);

    }

  }


  function startCelebration() {

    stopCelebration();

    createCelebration();

    celebrationInterval =
      setInterval(createCelebration, 7000);

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


  // =========================
  // PHOTO → FINAL MESSAGE
  // =========================

  if (nextToVideo) {

    nextToVideo.addEventListener("click", function () {

      if (photoMusic) {

        photoMusic.pause();
        photoMusic.currentTime = 0;

      }

      stopCelebration();

      showScreen("final-screen");

    });

  }


  // =========================
  // FORCE INITIAL SCREEN
  // =========================

  showScreen("intro");

});
