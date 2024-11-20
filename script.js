let isGenerating = false;  // Controla el estado de la generación de la imagen

function generateCatImage() {
    const button = document.getElementById('generateButton');  // Seleccionamos el botón de generar
    if (isGenerating) {
        return;  // Si ya se está generando una imagen, no hacer nada
    }

    isGenerating = true;  // Marcar que se está generando
    button.style.display = 'none';  // Ocultar el botón
    button.disabled = true;  // Deshabilitar el botón

    const loader = document.getElementById('loader');
    const catImage = document.getElementById('catImage');

    loader.style.display = 'block';  // Mostrar el indicador de carga
    catImage.style.display = 'none'; // Ocultar la imagen mientras se carga

    // Hacer la solicitud para generar la imagen
    const imageUrl = "https://cataas.com/cat?random=" + new Date().getTime(); // Evitar caché agregando un parámetro único

    // Cargar la nueva imagen
    catImage.src = imageUrl;

    // Temporizador de 10 segundos para recargar la página si no se carga la imagen
    const timeout = setTimeout(() => {
        location.reload();  // Recargar la página
    }, 10000); // 10 segundos (10000 ms)

    // Esperar a que la imagen se haya cargado
    catImage.onload = function() {
        clearTimeout(timeout);  // Limpiar el temporizador si la imagen se carga antes del tiempo límite
        loader.style.display = 'none'; // Ocultar el indicador de carga
        catImage.style.display = 'block'; // Mostrar la imagen

        // Habilitar y mostrar el botón después de 3 segundos
        setTimeout(() => {
            isGenerating = false;  // Marcar como no generando
            button.style.display = 'block';  // Mostrar el botón
            button.disabled = false;  // Habilitar el botón
        }, 3000);  // Esperar 3 segundos antes de permitir otro clic
    };
}
