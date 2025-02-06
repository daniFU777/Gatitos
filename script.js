document.addEventListener("DOMContentLoaded", function() {
    const catImage = document.getElementById("catImage");
    const generateBtn = document.getElementById("generateBtn");
    const downloadBtn = document.getElementById("downloadBtn");

    function disableButton() {
        generateBtn.disabled = true;
        generateBtn.innerText = "Espera 10s...";
        setTimeout(() => {
            generateBtn.disabled = false;
            generateBtn.innerText = "Generar imagen";
        }, 10000);
    }

    generateBtn.addEventListener("click", function() {
        disableButton();
        fetch("https://api.thecatapi.com/v1/images/search")
            .then(response => response.json())
            .then(data => {
                if (data.length > 0 && data[0].url) {
                    const imageUrl = data[0].url;
                    catImage.src = imageUrl;
                    catImage.style.display = "block";

                    // Preparar descarga con fetch y Blob
                    fetch(imageUrl)
                        .then(response => response.blob())
                        .then(blob => {
                            const blobUrl = URL.createObjectURL(blob);
                            downloadBtn.href = blobUrl;
                            downloadBtn.download = "gatito.jpg"; // Forzar descarga
                            downloadBtn.style.display = "block";
                        })
                        .catch(error => console.error("Error al preparar la descarga:", error));
                } else {
                    console.error("No se recibieron datos válidos.");
                }
            })
            .catch(error => console.error("Error al obtener la imagen:", error));
    });

    downloadBtn.addEventListener("click", function(event) {
        if (!downloadBtn.href.startsWith("blob:")) {
            event.preventDefault();
            console.warn("La imagen aún no está lista para descargar.");
        }
    });
});
