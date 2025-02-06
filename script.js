const catImage = document.createElement("img"); // Crear imagen dinámicamente
catImage.style.maxWidth = "500px"; // Ajustar tamaño
catImage.style.display = "block"; // Mostrar en bloque
catImage.style.margin = "20px auto"; // Centrar

const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

// Agregar la imagen al cuerpo del documento
document.body.insertBefore(catImage, generateBtn);

generateBtn.addEventListener("click", async () => {
    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        const data = await response.json();
        const imageUrl = data[0].url;

        // Cargar la imagen en el <img>
        catImage.src = imageUrl;
        catImage.crossOrigin = "anonymous"; // Evitar problemas CORS en canvas

        // Mostrar el botón de descarga cuando la imagen cargue
        catImage.onload = () => {
            downloadBtn.style.display = "block";
        };
    } catch (error) {
        console.error("Error al obtener la imagen:", error);
    }
});

downloadBtn.addEventListener("click", () => {
    if (!catImage.src) {
        alert("Primero genera una imagen");
        return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = catImage.naturalWidth;
    canvas.height = catImage.naturalHeight;

    ctx.drawImage(catImage, 0, 0);

    const enlace = document.createElement("a");
    enlace.href = canvas.toDataURL("image/jpeg");
    enlace.download = "gatito.jpg";
    enlace.click();
});
