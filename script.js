document.addEventListener("DOMContentLoaded", () => {
    const catImage = document.getElementById("catImage");
    const generateButton = document.getElementById("generateButton");
    const downloadButton = document.getElementById("downloadButton");
    const loader = document.getElementById("loader");

    async function fetchCatImage() {
        loader.style.display = "block";
        catImage.style.display = "none"; // Oculta la imagen mientras carga
        downloadButton.style.display = "none"; // Oculta el botón de descarga

        try {
            const response = await fetch("https://api.thecatapi.com/v1/images/search");
            const data = await response.json();
            catImage.src = data[0].url;
            catImage.style.display = "block"; // Muestra la imagen cuando se carga
            downloadButton.style.display = "block"; // Muestra el botón de descarga
        } catch (error) {
            console.error("Error al obtener la imagen: ", error);
        } finally {
            loader.style.display = "none";
        }
    }

    function downloadImage() {
        if (catImage.src) {
            const link = document.createElement("a");
            link.href = catImage.src;
            link.download = "gatito.jpg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    generateButton.addEventListener("click", fetchCatImage);
    downloadButton.addEventListener("click", downloadImage);
});
