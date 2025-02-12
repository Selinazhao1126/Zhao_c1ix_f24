const text = "So long as men can breathe or eyes can see, So long lives this, and this gives life to thee.";
const words = text.split(" ");
const wordContainer = document.getElementById("word-container");

function createRandomWord(word) {
    const wordElement = document.createElement("span");
    wordElement.classList.add("word");
    wordElement.innerText = word;

    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    wordElement.style.left = `${randomX}vw`;
    wordElement.style.top = `${randomY}vh`;

    setTimeout(() => {
        wordElement.classList.add("appear");
    }, Math.random() * 8000);  

    wordContainer.appendChild(wordElement);
}

for (let i = 0; i < 1200; i++) {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    createRandomWord(randomWord);
}

wordContainer.addEventListener("click", () => {
    wordContainer.innerHTML = "";
    const lines = [
        "So long as men can breathe or eyes can see,",
        "So long lives this,",
        "and this gives life to thee."
    ];

    lines.forEach((line, index) => {
        const lineElement = document.createElement("div");
        lineElement.classList.add("line");
        lineElement.innerText = line;
        lineElement.style.position = "absolute";
        lineElement.style.top = `${35 + index * 10}vh`;
        lineElement.style.left = "5vw";
        lineElement.style.opacity = "0";

        setTimeout(() => {
            lineElement.style.opacity = "1";
            lineElement.style.transform = "translateY(-10px)";
        }, index * 1500);

        wordContainer.appendChild(lineElement);
    });
});

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
