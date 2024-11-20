let currentImageUrl = "https://cataas.com/cat"; // URL de la imagen generada

// Función para generar una nueva imagen de gatito
function generateCatImage() {
    const imgElement = document.getElementById("catImage");
    // Nueva URL para la imagen
    currentImageUrl = `https://cataas.com/cat?t=${new Date().getTime()}`;
    imgElement.src = currentImageUrl; // Asigna la nueva URL
}

// Función para escanear la imagen con el marco y descargarla
function scanAndDownloadImage() {
    const imgElement = document.getElementById("catImage");

    // Verificar que la imagen esté cargada correctamente
    if (imgElement.complete && imgElement.naturalHeight !== 0) {
        // Crear un canvas para capturar la imagen y el marco
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Establecer el tamaño del canvas igual al de la imagen con su marco
        const imageWidth = imgElement.width;
        const imageHeight = imgElement.height;
        canvas.width = imageWidth + 20; // Añadir espacio para el borde
        canvas.height = imageHeight + 20; // Añadir espacio para el borde

        // Dibujar el borde (marco) y la imagen
        ctx.fillStyle = "#4b0082"; // Color del borde
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Dibuja el borde morado
        ctx.drawImage(imgElement, 10, 10, imageWidth, imageHeight); // Dibuja la imagen dentro del borde

        // Convertir el canvas a un archivo de imagen descargable
        const dataUrl = canvas.toDataURL('image/jpeg'); // Convertir a formato JPEG
        const link = document.createElement('a');
        link.href = dataUrl; // Establecer el enlace para descargar la imagen
        link.download = 'gatito_con_marcado.jpg'; // Nombre del archivo descargado
        document.body.appendChild(link); // Asegurarse de que el enlace esté en el DOM
        link.click(); // Simular el clic para iniciar la descarga
        document.body.removeChild(link); // Limpiar el enlace temporal
    } else {
        alert("La imagen no se ha cargado correctamente. Intenta generar una nueva imagen.");
    }
}
