export function calcularDano(ataque, atacante, defensor) {
    let dano = ataque.dano + ataque.contador * 5;

    if ((atacante.tipo === 'planta' && defensor.tipo === 'agua') ||
        (atacante.tipo === 'fuego' && defensor.tipo === 'planta') ||
        (atacante.tipo === 'agua' && defensor.tipo === 'fuego')) {
        dano += 5;
    } else if ((atacante.tipo === 'planta' && defensor.tipo === 'fuego') ||
            (atacante.tipo === 'fuego' && defensor.tipo === 'agua') ||
            (atacante.tipo === 'agua' && defensor.tipo === 'planta')) {
        dano -= 5;
    }

    return Math.max(dano, 0);
}

export function realizarTurnoJugador(ataqueJugador, vidaEnemigoActual, pogonyutoJugador, pogonyutoEnemigo) {
    const dano = calcularDano(ataqueJugador, pogonyutoJugador, pogonyutoEnemigo);
    return vidaEnemigoActual - dano;
}

export function realizarTurnoEnemigo(vidaJugadorActual, ataquesEnemigo, pogonyutoEnemigo, pogonyutoJugador) {
    const ataqueEnemigo = seleccionarAleatorio(ataquesEnemigo);
    const dano = calcularDano(ataqueEnemigo, pogonyutoEnemigo, pogonyutoJugador);
    return vidaJugadorActual - dano;
}
