document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    const container = document.getElementById("container");

    if (!generateBtn || !container) {
        console.error("Error: No se encontró el botón 'generateBtn' o el contenedor 'container'.");
        return;
    }

    let catImage = document.createElement("img");
    catImage.style.maxWidth = "500px";
    catImage.style.display = "block";
    catImage.style.margin = "20px auto";

    let downloadBtn = document.createElement("button");
    downloadBtn.innerText = "Descargar imagen";
    downloadBtn.style.display = "none";
    downloadBtn.style.margin = "10px auto";
    downloadBtn.style.padding = "10px";
    downloadBtn.style.backgroundColor = "purple";
    downloadBtn.style.color = "white";
    downloadBtn.style.border = "none";
    downloadBtn.style.cursor = "pointer";

    container.appendChild(catImage);
    container.appendChild(downloadBtn);

    generateBtn.addEventListener("click", async () => {
        try {
            const response = await fetch("https://api.thecatapi.com/v1/images/search");
            const data = await response.json();

            if (!data || data.length === 0) {
                throw new Error("No se encontró ninguna imagen.");
            }

            catImage.src = data[0].url;
            catImage.crossOrigin = "anonymous"; 

            catImage.onload = () => {
                downloadBtn.style.display = "block";
            };

        } catch (error) {
            console.error("Error al obtener la imagen:", error);
        }
    });

    downloadBtn.addEventListener("click", () => {
        if (!catImage.src) {
            alert("Genera una imagen antes de descargar.");
            return;
        }

        const link = document.createElement("a");
        link.href = catImage.src;
        link.download = "gatito.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
