window.onload = () => {
    const icon = document.getElementById('icon');
    const iconContainer = document.getElementById('icon-container');
    const textSection1 = document.getElementById('section-1');
    const textSection2 = document.getElementById('section-2');
    const summerText = document.getElementById('summer');
    const interactiveText = document.getElementById('interactive-text');

    icon.addEventListener('click', () => {
        iconContainer.classList.add('icon-small');
        iconContainer.style.top = '30px';
        iconContainer.style.left = '30px';
        iconContainer.style.transform = 'translate(0, 0)';

        setTimeout(() => {
            textSection1.style.opacity = "1";  
            textSection1.style.transform = "translateY(0)";
        }, 1500);

        setTimeout(() => {
            textSection2.style.opacity = "1";  
            textSection2.style.transform = "translateY(0)";
        }, 3000);
    });

    summerText.addEventListener("click", () => {
        window.location.href = "/Users/selina/Desktop/Zhao_c1ix_f24/S25_Interaction_studio/entries/entry4/entry4.html";
    });

    summerText.addEventListener("mouseover", () => {
        summerText.classList.add("rotating-text");
    });

    summerText.addEventListener("mouseout", () => {
        summerText.classList.remove("rotating-text");
    });

    interactiveText.addEventListener("click", () => {
        let letters = interactiveText.innerText.split('');
        interactiveText.innerHTML = '';
        
        letters.forEach((letter, i) => {
            let span = document.createElement('span');
            span.innerText = letter;
            span.style.display = 'inline-block';
            span.style.transition = 'transform 1s ease-in-out';
            interactiveText.appendChild(span);
            
            setTimeout(() => {
                span.style.transform = `rotate(${Math.random() * 360}deg) translate(${Math.random() * 50}px, ${Math.random() * 50}px)`;
                span.style.opacity = '0.5';
            }, i * 100);
        });

        setTimeout(() => {
            interactiveText.innerText = "Nor lose possession of that fair thou owest;";
        }, 3000);
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

