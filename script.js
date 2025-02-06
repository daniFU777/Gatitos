document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    
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

    document.body.insertBefore(catImage, generateBtn);
    document.body.insertBefore(downloadBtn, generateBtn.nextSibling);

    generateBtn.addEventListener("click", async () => {
        try {
            const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=1&size=full", {
                headers: {
                    "x-api-key": "TU_CLAVE_DE_API_AQUI" // Agrega tu clave si es necesario
                }
            });
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
});
