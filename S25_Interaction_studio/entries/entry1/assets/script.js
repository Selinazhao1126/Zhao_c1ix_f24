window.onload = () => {
    const icon = document.getElementById('icon');
    const iconContainer = document.getElementById('icon-container');
    const textSection1 = document.getElementById('section-1');
    const textSection2 = document.getElementById('section-2');
    const textSection3 = document.getElementById('section-3');
    const typingText = document.getElementById("typing-text");
    const neonText = document.querySelector(".neon-text"); 

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
            typingText.innerHTML = "";
            typeEffect();
        }, 3000);

        setTimeout(() => {
            textSection3.style.opacity = "1";  
            textSection3.style.transform = "translateY(0)";
            neonText.style.opacity = "1"; 
            neonText.style.visibility = "visible"; 
        }, 4500);
    });
};

function typeEffect() {
    const text = "Rough winds shake the darling buds of May,";
    let i = 0;
    const speed = 100;
    const typingText = document.getElementById("typing-text");

    function type() {
        if (i < text.length) {
            typingText.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
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
    particlesArray.forEach((particle, i) => {
        particle.update();
        particle.draw();
        if (particle.size <= 0.5) particlesArray.splice(i, 1);
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

animate();
