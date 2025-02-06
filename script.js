const catImage = document.getElementById("catImage");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

generateBtn.addEventListener("click", async () => {
    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        const data = await response.json();
        const imageUrl = data[0].url;

        // Cargar la imagen en la etiqueta <img>
        catImage.src = imageUrl;

        // Mostrar el botón de descarga
        downloadBtn.style.display = "block";

        // Esperar a que la imagen cargue antes de habilitar la descarga
        catImage.onload = () => {
            downloadBtn.onclick = () => descargarImagen(catImage);
        };
    } catch (error) {
        console.error("Error al obtener la imagen:", error);
    }
});

function descargarImagen(imgElement) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Configurar el tamaño del canvas
    canvas.width = imgElement.naturalWidth;
    canvas.height = imgElement.naturalHeight;

    // Dibujar la imagen en el canvas
    ctx.drawImage(imgElement, 0, 0);

    // Convertir el canvas en una imagen descargable
    const enlace = document.createElement("a");
    enlace.href = canvas.toDataURL("image/jpeg");
    enlace.download = "gatito.jpg";
    enlace.click();
}
