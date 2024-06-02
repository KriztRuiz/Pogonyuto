import { seleccionarPogonyutoJugador, seleccionarAtaquesJugador } from './jugador.js';
import { seleccionarPogonyutoEnemigo, seleccionarAtaquesEnemigo } from './enemigo.js';
import { realizarTurnoJugador, realizarTurnoEnemigo } from './logica-de-combate.js';
import { inicializarCombateVisual, actualizarCombateVisual, mostrarResultado, seleccionarAtaqueVisual } from './game.js';

async function main() {
    let pogonyutoJugador;
    let ataquesJugador;
    let vidaJugadorActual;
    let pogonyutoEnemigo;
    let vidaEnemigoActual;

    while (true) {
        pogonyutoJugador = await seleccionarPogonyutoJugador();
        ataquesJugador = await seleccionarAtaquesJugador(pogonyutoJugador);
        vidaJugadorActual = pogonyutoJugador.vida;

        pogonyutoEnemigo = seleccionarPogonyutoEnemigo();
        vidaEnemigoActual = pogonyutoEnemigo.vida;

        inicializarCombateVisual(pogonyutoJugador, pogonyutoEnemigo);

        while (vidaJugadorActual > 0 && vidaEnemigoActual > 0) {
            actualizarCombateVisual(pogonyutoJugador, vidaJugadorActual, pogonyutoEnemigo, vidaEnemigoActual);

            const ataqueJugador = await seleccionarAtaqueVisual(ataquesJugador);
            vidaEnemigoActual = realizarTurnoJugador(ataqueJugador, vidaEnemigoActual, pogonyutoJugador, pogonyutoEnemigo);

            if (vidaEnemigoActual > 0) {
                vidaJugadorActual = realizarTurnoEnemigo(vidaJugadorActual, ataquesJugador, pogonyutoEnemigo, pogonyutoJugador);
            }

            actualizarCombateVisual(pogonyutoJugador, vidaJugadorActual, pogonyutoEnemigo, vidaEnemigoActual);
        }

        mostrarResultado(vidaJugadorActual > 0);

        const opcion = prompt("¿Quieres reiniciar (r) o terminar (t)? ");
        if (opcion.toLowerCase() !== 'r') break;
    }
}

main();
