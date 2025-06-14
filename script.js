const landing = document.getElementById('landingPage');
const mainLayout = document.getElementById('mainLayout');
const enterBtn = document.getElementById('enterBtn');

enterBtn.addEventListener('click', () => {
  landing.style.opacity = '0';
  setTimeout(() => {
    landing.style.display = 'none';
    mainLayout.style.display = 'block';
  }, 600);
});

const executores = {
  pc: [
    {
      nome: 'Swift',
      img: 'https://atlantisexecutor.com/wp-content/uploads/2025/04/swift-executor.png',
      link: 'https://getswift.gg/'
    }
  ],
  android: [
    {
      nome: 'Delta',
      img: 'https://images.sftcdn.net/images/t_app-icon-m/p/ed66733d-2d77-4331-a8d1-97d5ca7924b5/2787774532/delta-executor-Download-Delta-Executor.jpg',
      link: 'https://delta.webfiles.pro/file/Delta-2.675.715.apk'
    },
    {
      nome: 'Working!',
      img: 'https://th.bing.com/th/id/R.0cf4c3f4470d70fac2435a25594d95dd?rik=qDK%2fVu%2bwChHKsA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fRed-Ball-PNG-High-Quality-Image.png&ehk=F6%2bvIgpY5c9dGM0w07S0QKu%2b6gnqtvo0YnZOyk7OtZU%3d&risl=&pid=ImgRaw&r=0',
      link: '#'
    }
  ],
  ios: [
    {
      nome: 'Delta',
      img: 'https://images.sftcdn.net/images/t_app-icon-m/p/ed66733d-2d77-4331-a8d1-97d5ca7924b5/2787774532/delta-executor-Download-Delta-Executor.jpg',
      link: 'http://delta.webfiles.pro/file/Delta-2.675.715.ipa'
    }
  ]
};

function popularGrid(idGrid, lista) {
  const grid = document.getElementById(idGrid);
  lista.forEach(exec => {
    const card = document.createElement('a');
    card.classList.add('executor-card');
    card.href = exec.link;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';

    card.innerHTML = `
      <img src="${exec.img}" alt="${exec.nome}" />
      <h3>${exec.nome}</h3>
    `;
    grid.appendChild(card);
  });
}

popularGrid('pcGrid', executores.pc);
popularGrid('androidGrid', executores.android);
popularGrid('iosGrid', executores.ios);

// --- ANIMAÇÃO DE NEVE COM CANVAS --- //

const snowCanvas = document.createElement('canvas');
snowCanvas.id = 'snowCanvas';
snowCanvas.style.position = 'fixed';
snowCanvas.style.top = 0;
snowCanvas.style.left = 0;
snowCanvas.style.width = '100vw';
snowCanvas.style.height = '100vh';
snowCanvas.style.pointerEvents = 'none';
snowCanvas.style.zIndex = '1';
document.body.appendChild(snowCanvas);

const ctx = snowCanvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
snowCanvas.width = width;
snowCanvas.height = height;

const flakesCount = 100;
const flakes = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Flake {
  constructor() {
    this.x = random(0, width);
    this.y = random(-height, 0);
    this.radius = random(2, 5);
    this.speedY = random(1, 3);
    this.speedX = random(-0.5, 0.5);
    this.opacity = random(0.3, 0.9);
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.y > height) {
      this.y = random(-10, 0);
      this.x = random(0, width);
    }
    if (this.x > width) this.x = 0;
    else if (this.x < 0) this.x = width;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
  }
}

function initFlakes() {
  for (let i = 0; i < flakesCount; i++) {
    flakes.push(new Flake());
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  flakes.forEach(flake => {
    flake.update();
    flake.draw();
  });
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  snowCanvas.width = width;
  snowCanvas.height = height;
});

initFlakes();
animate();
