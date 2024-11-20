let isGenerating = false;  // Controla el estado de la generación de la imagen

function generateCatImage() {
    const button = document.querySelector("button");  // Seleccionamos el botón de generar
    if (isGenerating) {
        return;  // Si ya se está generando una imagen, no hacer nada
    }

    isGenerating = true;  // Marcar que se está generando
    button.disabled = true;  // Deshabilitar el botón

    const loader = document.getElementById('loader');
    const catImage = document.getElementById('catImage');

    loader.style.display = 'block';  // Mostrar el indicador de carga
    catImage.style.display = 'none'; // Ocultar la imagen mientras se carga

    // Hacer la solicitud para generar la imagen
    const imageUrl = "https://cataas.com/cat?random=" + new Date().getTime(); // Evitar caché agregando un parámetro único

    // Cargar la nueva imagen
    catImage.src = imageUrl;

    // Esperar a que la imagen se haya cargado
    catImage.onload = function() {
        loader.style.display = 'none'; // Ocultar el indicador de carga
        catImage.style.display = 'block'; // Mostrar la imagen

        // Habilitar el botón después de 3 segundos
        setTimeout(() => {
            isGenerating = false;  // Marcar como no generando
            button.disabled = false;  // Habilitar el botón
        }, 3000);  // Esperar 3 segundos antes de permitir otro clic
    };
}
