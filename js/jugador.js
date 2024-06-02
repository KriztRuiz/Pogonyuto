import { pogonyutos } from './pogonyutos.js';
import { ataques } from './ataques.js';
import { seleccionarAleatorio } from './util.js';

export async function seleccionarPogonyutoJugador() {
    const nombres = Object.keys(pogonyutos);
    let nombre = seleccionarAleatorio(nombres);
    return { nombre, ...pogonyutos[nombre] };
}

export async function seleccionarAtaquesJugador(pogonyuto) {
    const ataquesSeleccionados = [];
    const ataquesDisponibles = [...pogonyuto.ataques];

    while (ataquesSeleccionados.length < 3) {
        const ataque = seleccionarAleatorio(ataquesDisponibles);
        ataquesSeleccionados.push({ ...ataques[ataque], nombre: ataque });
        ataquesDisponibles.splice(ataquesDisponibles.indexOf(ataque), 1);
    }

    return ataquesSeleccionados;
}
