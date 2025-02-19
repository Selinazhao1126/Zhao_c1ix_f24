window.onload = () => {
    const icon = document.getElementById('icon');
    const iconContainer = document.getElementById('icon-container');
    const textSection1 = document.getElementById('section-1');
    const textSection2 = document.getElementById('section-2');
    const shadeText = document.getElementById('shade');
    const eternalText = document.getElementById('eternal-lines');

    icon.addEventListener('click', () => {
        iconContainer.classList.add('icon-small');
        iconContainer.style.top = '20px';
        iconContainer.style.left = 'calc(100% - 130px)';
        iconContainer.style.transform = 'translate(0, 0)';

        setTimeout(() => {
            textSection1.classList.add('show-text');
        }, 2500); 

        setTimeout(() => {
            textSection2.classList.add('show-text');
        }, 4000);

        setTimeout(() => {
            textSection1.classList.add('pulse');
            textSection2.classList.add('pulse');
        }, 5000);
    });

    shadeText.addEventListener("click", () => {
        for (let i = 0; i < 200; i++) {
            let span = document.createElement("span");
            span.innerText = "SHADE";
            span.style.position = "absolute";
            span.style.color = "rgba(255,255,255,0.5)";
            span.style.fontSize = `${Math.random() * 2 + 1}rem`;
            span.style.left = `${Math.random() * 100}%`;
            span.style.top = `${Math.random() * 100}%`;
            span.style.transition = "transform 2s ease-out, opacity 2s ease-out";
            document.body.appendChild(span);
            
            setTimeout(() => {
                span.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`;
                span.style.opacity = "0";
            }, 100);

            setTimeout(() => span.remove(), 2500);
        }
    });

    eternalText.addEventListener("click", () => {
        window.location.href = "/Users/selina/Desktop/Zhao_c1ix_f24/S25_Interaction_studio/entries/entry5/entry5.html";
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
