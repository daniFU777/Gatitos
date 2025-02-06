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
                    catImage.src = data[0].url;
                    catImage.style.display = "block";
                    downloadBtn.href = data[0].url;
                    downloadBtn.style.display = "block";
                } else {
                    console.error("No se recibieron datos válidos.");
                }
            })
            .catch(error => console.error("Error al obtener la imagen:", error));
    });
});
