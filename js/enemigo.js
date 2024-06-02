import { pogonyutos } from './pogonyutos.js';
import { ataques } from './ataques.js';
import { seleccionarAleatorio } from './util.js';

export function seleccionarPogonyutoEnemigo() {
    const nombre = seleccionarAleatorio(Object.keys(pogonyutos));
    return { nombre, ...pogonyutos[nombre] };
}

export function seleccionarAtaquesEnemigo(pogonyuto) {
    const ataquesSeleccionados = [];
    const ataquesDisponibles = [...pogonyuto.ataques];
    
    while (ataquesSeleccionados.length < 3) {
        const ataque = seleccionarAleatorio(ataquesDisponibles);
        ataquesSeleccionados.push({ ...ataques[ataque], nombre: ataque });
        ataquesDisponibles.splice(ataquesDisponibles.indexOf(ataque), 1);
    }

    return ataquesSeleccionados;
}
