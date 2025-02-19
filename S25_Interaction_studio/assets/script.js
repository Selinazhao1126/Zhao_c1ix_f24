window.onload = () => {
  const icon = document.getElementById('icon');
  const iconContainer = document.getElementById('icon-container');
  
  icon.addEventListener('click', () => {
      iconContainer.classList.add('icon-small');
      iconContainer.style.top = '20px';
      iconContainer.style.left = 'calc(100% - 130px)';
      iconContainer.style.transform = 'translate(0, 0)';

      setTimeout(() => {
          document.getElementById('top-left').style.opacity = '1';
          document.getElementById('top-left').style.transform = 'translateY(0)';
      }, 1500);

      setTimeout(() => {
          document.getElementById('summer-text').style.opacity = '1';
          document.getElementById('summer-text').style.transform = 'translateY(0)';
      }, 3000);

      setTimeout(() => {
          document.getElementById('thou-text').style.opacity = '1';
          document.getElementById('thou-text').style.transform = 'translateY(0)';
      }, 4500);
  });

  document.getElementById('blank-space').addEventListener('click', () => {
      document.getElementById('blank-space').innerText = '...';

      setTimeout(() => {
          document.getElementById('summer-text').style.opacity = '1';
          document.getElementById('summer-text').style.transform = 'translateY(0)';
      }, 500);

      setTimeout(() => {
          document.getElementById('thou-text').style.opacity = '1';
          document.getElementById('thou-text').style.transform = 'translateY(0)';
      }, 2500);
  });
};

function fadeOutElements(event) {
  event.preventDefault(); 

  const elementsToFadeOut = document.querySelectorAll(".top-left, .center, .bottom, #icon-container");

  elementsToFadeOut.forEach(el => {
      el.classList.add("fade-out");
  });

  setTimeout(() => {
      window.location.href = event.target.href;
  }, 1000); 
}

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
