export const ataques = {
    'Agujero Picante': { dano: 10, contador: 0 },
    'Espinas Afiladas': { dano: 0, contador: 0, especial: 'incrementar' },
    'Lanzamiento de Pua': { dano: 20, contador: 0, requisito: 'contador' },
    'Abrazo Espinoso': { dano: 15, contador: 0 },
    'Tornado de Arena': { dano: 10, contador: 0, especial: 'incrementar' },
    'Ascuas': { dano: 5, contador: 0 },
    'Suelo Quemado': { dano: 5, contador: 0, especial: 'incrementar_2' },
    'Llamarada': { dano: 25, contador: 0, cooldown: 2 },
    'Onda de Calor': { dano: 5, contador: 0, especial: 'incrementar_2' },
    'Tornado de Fuego': { dano: 10, contador: 0 },
    'Chorro de Agua': { dano: 10, contador: 0 },
    'Lluvia': { dano: 0, contador: 0, especial: 'incrementar' },
    'Tormenta': { dano: 20, contador: 0, cooldown: 1 },
    'Ola': { dano: 15, contador: 0 },
    'Geiser': { dano: 15, contador: 0 }
};

export function aumentarContador(ataque, ataques) {
    if (ataques[ataque]) {
        ataques[ataque].contador++;
    }
}
