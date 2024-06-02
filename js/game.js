import { pogonyutos } from './pogonyutos.js';
import { ataques } from './ataques.js';
import { seleccionarPogonyutoEnemigo } from './enemigo.js';
import { seleccionarAtaqueVisual, inicializarCombateVisual, actualizarCombateVisual, mostrarResultado, drawAtaques } from './combate.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let pogonyutoJugador;
let pogonyutoEnemigo;
let vidaJugador;
let vidaEnemigo;
let ataquesJugador = [];
let seleccionandoAtaques = false;
let ataqueSeleccionadoCallback;

function inicializarCombateVisual(jugador, enemigo) {
    pogonyutoJugador = jugador;
    vidaJugador = jugador.vida;
    pogonyutoEnemigo = enemigo;
    vidaEnemigo = enemigo.vida;
    draw();
}

function actualizarCombateVisual(jugador, vidaJugadorActual, enemigo, vidaEnemigoActual) {
    vidaJugador = vidaJugadorActual;
    vidaEnemigo = vidaEnemigoActual;
    draw();
}

function mostrarResultado(jugadorGana) {
    if (jugadorGana) {
        alert('¡Has ganado!');
    } else {
        alert('¡Has perdido!');
    }
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!pogonyutoJugador) {
        drawSeleccionPogonyuto();
    } else if (seleccionandoAtaques) {
        drawSeleccionAtaques();
    } else {
        drawCombate();
    }
}

function drawSeleccionPogonyuto() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Selecciona tu Pogonyuto:', 300, 100);

    const pogonyutoImgs = [
        { nombre: 'Spiny', src: 'img/Spiny-removebg.png' },
        { nombre: 'Flamy', src: 'img/Flamy-removebg.png' },
        { nombre: 'Watery', src: 'img/Watery-removebg.png' }
    ];

    pogonyutoImgs.forEach((pogonyuto, index) => {
        const img = document.createElement('img');
        img.src = pogonyuto.src;
        img.id = pogonyuto.nombre.toLowerCase();
        img.onload = () => {
            const x = 150 + index * 200;
            const y = 150;
            const scaleFactor = 0.2;
            const width = img.naturalWidth * scaleFactor;
            const height = img.naturalHeight * scaleFactor;
            ctx.drawImage(img, x, y, width, height);

            img.onclick = () => {
                pogonyutoJugador = pogonyutos[pogonyuto.nombre];
                vidaJugador = pogonyutoJugador.vida;
                seleccionandoAtaques = true;
                draw();
            };
            img.style.display = 'none';
            document.body.appendChild(img);

            canvas.addEventListener('click', function onClick(event) {
                const rect = canvas.getBoundingClientRect();
                const mouseX = event.clientX - rect.left;
                const mouseY = event.clientY - rect.top;
                if (
                    mouseX >= x && mouseX <= x + width &&
                    mouseY >= y && mouseY <= y + height
                ) {
                    img.onclick();
                    canvas.removeEventListener('click', onClick);
                }
            });
        };
    });
}

function drawSeleccionAtaques() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Selecciona tus ataques:', 300, 100);

    const ataquesDisponibles = pogonyutoJugador.ataques;

    ataquesDisponibles.forEach((ataque, index) => {
        const y = 150 + index * 40;
        ctx.fillStyle = ataquesJugador.includes(ataques[ataque]) ? '#A9A9A9' : '#4CAF50';
        ctx.fillRect(300, y, 200, 30);
        ctx.fillStyle = 'white';
        ctx.fillText(ataque, 310, y + 20);

        canvas.addEventListener('click', function onClick(event) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            if (
                mouseX >= 300 && mouseX <= 500 &&
                mouseY >= y && mouseY <= y + 30 &&
                !ataquesJugador.includes(ataques[ataque])
            ) {
                if (ataquesJugador.length < 3) {
                    ataquesJugador.push(ataques[ataque]);
                    if (ataquesJugador.length === 3) {
                        seleccionandoAtaques = false;
                        pogonyutoEnemigo = seleccionarPogonyutoEnemigo();
                        vidaEnemigo = pogonyutoEnemigo.vida;
                    }
                    draw();
                }
                canvas.removeEventListener('click', onClick);
            }
        });
    });
}

function drawCombate() {
    if (!pogonyutoJugador || !pogonyutoJugador.nombre || !pogonyutoEnemigo || !pogonyutoEnemigo.nombre) {
        return;
    }

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`${pogonyutoJugador.nombre} (${vidaJugador})`, 50, 40);
    ctx.fillText(`${pogonyutoEnemigo.nombre} (${vidaEnemigo})`, 650, 40);

    ctx.fillStyle = 'red';
    ctx.fillRect(50, 50, vidaJugador, 20);

    ctx.fillStyle = 'blue';
    ctx.fillRect(650, 50, vidaEnemigo, 20);

    const jugadorImg = document.getElementById(pogonyutoJugador.nombre.toLowerCase());
    if (jugadorImg) {
        const scaleFactor = 0.2;
        const width = jugadorImg.naturalWidth * scaleFactor;
        const height = jugadorImg.naturalHeight * scaleFactor;
        ctx.drawImage(jugadorImg, 50, canvas.height - height - 20, width, height);
    }

    const enemigoImg = document.getElementById(pogonyutoEnemigo.nombre.toLowerCase());
    if (enemigoImg) {
        const scaleFactor = 0.2;
        const width = enemigoImg.naturalWidth * scaleFactor;
        const height = enemigoImg.naturalHeight * scaleFactor;
        ctx.drawImage(enemigoImg, canvas.width - width - 50, canvas.height - height - 20, width, height);
    }

    drawAtaques();
}

function drawAtaques() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Selecciona tu ataque:', 300, 500);

    ataquesJugador.forEach((ataque, index) => {
        const y = 520 + index * 40;
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(300, y, 200, 30);
        ctx.fillStyle = 'white';
        ctx.fillText(ataque.nombre, 310, y + 20);

        canvas.addEventListener('click', function onClick(event) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            if (
                mouseX >= 300 && mouseX <= 500 &&
                mouseY >= y && mouseY <= y + 30
            ) {
                seleccionarAtaqueVisual(ataque);
                ctx.fillStyle = '#A9A9A9';
                ctx.fillRect(300, y, 200, 30);
                ctx.fillStyle = 'white';
                ctx.fillText(ataque.nombre, 310, y + 20);
                canvas.removeEventListener('click', onClick);
            }
        });
    });
}

function seleccionarAtaqueVisual(ataque) {
    if (ataqueSeleccionadoCallback) {
        ataqueSeleccionadoCallback(ataque);
        ataqueSeleccionadoCallback = null;
    }
}

draw();

export { inicializarCombateVisual, actualizarCombateVisual, mostrarResultado, drawAtaques, seleccionarAtaqueVisual };
