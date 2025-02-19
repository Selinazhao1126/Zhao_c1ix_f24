window.onload = () => {
    const icon = document.getElementById('icon');
    const iconContainer = document.getElementById('icon-container');
    const textSection1 = document.getElementById('section-1');
    const textSection2 = document.getElementById('section-2');
    const textSection3 = document.getElementById('section-3');
    const typingText = document.getElementById("typing-text");

    const sentence = "Rough winds shake the darling buds of May,";
    let isRaining = false;

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
            typingText.innerHTML = sentence;
        }, 3000);

        setTimeout(() => {
            textSection3.style.opacity = "1";  
            textSection3.style.transform = "translateY(0)";
        }, 4500);
    });

    typingText.addEventListener("click", () => {
        if (!isRaining) {
            isRaining = true;
            makeLetterRain();
        }
    });

    function makeLetterRain() {
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.top = "40%";
        container.style.right = "10%";
        container.style.fontSize = "3rem";
        container.style.color = "#e4eaff";
        container.style.textAlign = "right";
        container.style.pointerEvents = "none";
        document.body.appendChild(container);

        sentence.split("").forEach((char, i) => {
            const span = document.createElement("span");
            span.textContent = char;
            span.style.position = "absolute";
            span.style.right = `${10 + i * 30}px`;
            span.style.top = "-50px";
            span.style.opacity = "1";
            span.style.transition = "transform 1s ease-in, opacity 1s ease-in";
            container.appendChild(span);

            setTimeout(() => {
                span.style.transform = `translateY(500px) rotate(${Math.random() * 360}deg)`;
                span.style.opacity = "0";
            }, Math.random() * 1000 + 500);
        });

        setTimeout(() => {
            container.remove();
            isRaining = false;
        }, 3000);
    }
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
