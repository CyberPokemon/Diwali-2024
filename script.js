const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let sparkles = [];

function Sparkle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 1;
    this.color = getRandomColor();
    this.velocityX = Math.random() * 2 - 1;
    this.velocityY = Math.random() * 2 - 1;
}

function getRandomColor() {
    const colors = [
        '#FF0000', '#FFA500', '#FFFF00', '#00FF00',
        '#0000FF', '#800080', '#FFC0CB', '#FFD700'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sparkles.forEach((sparkle, index) => {
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
        ctx.fillStyle = sparkle.color;
        ctx.fill();

        sparkle.x += sparkle.velocityX;
        sparkle.y += sparkle.velocityY;

        if (sparkle.x < 0 || sparkle.x > canvas.width || sparkle.y < 0 || sparkle.y > canvas.height) {
            sparkles.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

function addSparkles(x, y) {
    for (let i = 0; i < 10; i++) {
        sparkles.push(new Sparkle(x, y));
    }
}

document.addEventListener('mousemove', (e) => {
    addSparkles(e.clientX, e.clientY);
});

document.addEventListener('click', (e) => {
    addSparkles(e.clientX, e.clientY);
});

document.addEventListener('touchmove', (e) => {
    e.preventDefault();
    Array.from(e.touches).forEach(touch => {
        addSparkles(touch.clientX, touch.clientY);
    });
}, { passive: false });

document.addEventListener('touchstart', (e) => {
    e.preventDefault();
    Array.from(e.touches).forEach(touch => {
        addSparkles(touch.clientX, touch.clientY);
    });
}, { passive: false });

animate();
