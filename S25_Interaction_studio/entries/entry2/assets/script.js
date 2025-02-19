window.onload = () => {
    const icon = document.getElementById('icon');
    const iconContainer = document.getElementById('icon-container');
    const content = document.getElementById('content');
    const poemLines = document.querySelectorAll('.poem-line');
    const waterEffectContainer = document.getElementById('water-effect-container');
    const exploreButton = document.getElementById('explore-button');

    icon.addEventListener('click', () => {
        iconContainer.classList.add('icon-small');
        iconContainer.style.top = '20px';
        iconContainer.style.left = 'calc(100% - 130px)';
        iconContainer.style.transform = 'translate(0, 0)';

        setTimeout(() => {
            content.style.display = 'block';
            gsap.to('.water-effect-text', {
                x: "-100%",
                duration: 20,  
                repeat: -1,
                ease: "linear",
            });

            const timeline = gsap.timeline();
            timeline.to(poemLines[0], { duration: 3, y: -30, opacity: 1, filter: "blur(1px)", ease: "sine.inOut" });
            timeline.to(poemLines[1], { duration: 3, y: -30, opacity: 1, filter: "blur(1px)", ease: "sine.inOut" }, "+=0.3");
            timeline.to(poemLines[2], { duration: 3, y: -30, opacity: 1, filter: "blur(1px)", ease: "sine.inOut" }, "+=0.3");
            timeline.to(poemLines[3], { duration: 3, y: -30, opacity: 1, filter: "blur(1px)", ease: "sine.inOut" }, "+=0.3");

            setTimeout(() => {
                exploreButton.style.opacity = "1";
                exploreButton.style.transform = "translate(-50%, -50%) scale(1)";
            }, 4000);
        }, 1500);
    });
};



const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = { x: null, y: null };

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle());
  }
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `rgba(255, 255, 255, 1)`; 
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size *= 0.95;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    if (particlesArray[i].size <= 0.5) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}

animate();
