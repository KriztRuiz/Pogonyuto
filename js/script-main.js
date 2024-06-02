// script-main.js

window.addEventListener('load', () => {
    // Añadir clase transitioned al body para las transiciones de fondo y texto
    document.body.classList.add('transitioned');

    let currentBackground = 0;
    const backgrounds = [
        'img/background/background1.jpg',
        'img/background/background2.jpg',
        'img/background/background3.jpg',
        'img/background/background4.jpg'
    ];

    // Crear el div para el fondo animado
    const backgroundElement = document.createElement('div');
    backgroundElement.classList.add('background');
    document.body.appendChild(backgroundElement);

    const changeBackground = () => {
        backgroundElement.style.backgroundImage = `url(${backgrounds[currentBackground]})`;
        currentBackground = (currentBackground + 1) % backgrounds.length;
    };

    const backgroundInterval = setInterval(changeBackground, 10000); // Cambia cada 10 segundos
    changeBackground(); // Cambia inmediatamente al cargar

    document.getElementById('start-button').addEventListener('click', () => {
        clearInterval(backgroundInterval);
        backgroundElement.style.animation = 'none'; // Detiene la animación del fondo
    });

    // Transiciones para las sílabas y las imágenes
    setTimeout(() => {
        const syllables = document.querySelectorAll('.syllable');
        syllables.forEach((img, index) => {
            setTimeout(() => {
                img.classList.add('visible');
                setTimeout(() => {
                    img.classList.add('final');
                }, 1000); // Reducir tamaño después de 1 segundo
            }, index * 1000); // Aparecer una por una con un segundo de diferencia
        });

        // Aparecer las otras imágenes después de las sílabas
        setTimeout(() => {
            const images = document.querySelectorAll('.image-container img');
            images.forEach((img, index) => {
                setTimeout(() => {
                    img.classList.add('visible');
                }, index * 300); // Aparecer una por una con un segundo de diferencia
            });

            // Mostrar el footer después de que todas las imágenes hayan aparecido
            setTimeout(() => {
                const footer = document.querySelector('.footer-container');
                footer.classList.remove('hidden');
            }, images.length * 300); // Esperar el tiempo necesario para que todas las imágenes aparezcan

        }, syllables.length * 2000); // Esperar el tiempo necesario para que todas las sílabas aparezcan y se reduzcan
    }, 2000); // Esperar 2 segundos para asegurarse de que la transición del fondo haya terminado
});
