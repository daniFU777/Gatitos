function generateCatImage() {
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
    };
}
