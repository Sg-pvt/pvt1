let highestZ = 1;
document.addEventListener('contextmenu', event => event.preventDefault());
let currentsong = new Audio();
let surpriseflag = false;
currentsong.src = "images/uify.mp3";

// currentsong.play();
play.addEventListener("click", () => {
  if (currentsong.paused) {
    currentsong.play();
    play.children[0].src = "images/seekbarpause.svg";
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.9,
      startVelocity: 30,
      shapes: ["heart"],
      colors: ["1C00FF", "FDAFDC", "FFFFFF"],
    };

    confetti({
      ...defaults,
      particleCount: 85,
      scalar: 2,
    });

    confetti({
      ...defaults,
      particleCount: 45,
      scalar: 3,
    });

    confetti({
      ...defaults,
      particleCount: 20,
      scalar: 4,
    });
  } else {
    currentsong.pause();
    play.children[0].src = "./images/seekbarplay.svg";
  }
});
currentsong.addEventListener("timeupdate", () => {
  document.querySelector(".circle").style.width =
    (currentsong.currentTime / currentsong.duration) * 100 + "%";
});
document.querySelector(".circle").style.width =
  (currentsong.currentTime / currentsong.duration) * 100 + "%";

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    document.addEventListener("mousemove", (e) => {
      if (!this.rotating) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }

      const dirX = e.clientX - this.mouseTouchX;
      const dirY = e.clientY - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = (180 * angle) / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if (this.rotating) {
        this.rotation = degrees;
      }

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform = `translateX(${
          this.currentPaperX
        }px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    paper.addEventListener("mousedown", (e) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;

      if (e.button === 0) {
        this.mouseTouchX = this.mouseX;
        this.mouseTouchY = this.mouseY;
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
      }
      if (e.button === 2) {
        this.rotating = true;
      }
    });
    window.addEventListener("mouseup", () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll(".paper"));

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});

document
  .getElementsByClassName("polaroid")[1]
  .addEventListener("mousedown", () => {
    document.getElementsByClassName("polaroid")[1].children[0].play();
    surpriseflag = true;
  });

document.getElementById("reveal").children[1].addEventListener("click", () => {
  const duration = 15 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  if (surpriseflag) {

const duration = 20 * 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);

  // since particles fall down, start a bit higher than random
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      zIndex:200
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      zIndex:200
    })
  );
}, 250);
    document.getElementById("reveal").children[0].src =
      "./images/ins2.png";
  }
});
document.querySelector(".hiddenoffset").addEventListener("click", (e) => {
  let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

  document.querySelector(".circle").style.width = percent + "%";
  currentsong.currentTime = (currentsong.duration * percent) / 100;
});
