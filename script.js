const catImage = document.getElementById("catImage");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

generateBtn.addEventListener("click", generateImage);
downloadBtn.addEventListener("click", downloadImage);

function generateImage() {
    fetch("https://api.thecatapi.com/v1/images/search")
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                catImage.src = data[0].url;
                catImage.style.display = "block";
            }
        })
        .catch(error => console.error("Error al obtener la imagen:", error));
}

function downloadImage() {
    if (catImage.src) {
        fetch(catImage.src)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "gatito.jpg";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            })
            .catch(error => console.error("Error al descargar la imagen: ", error));
    }
}
