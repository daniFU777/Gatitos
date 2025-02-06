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
                convertToJPG(blob);
            })
            .catch(error => console.error("Error al descargar la imagen: ", error));
    }
}

function convertToJPG(blob) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
        const img = new Image();
        img.src = reader.result;
        img.onload = function () {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            
            canvas.toBlob((jpgBlob) => {
                const url = URL.createObjectURL(jpgBlob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "gatito.jpg";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, "image/jpeg", 1.0);
        };
    };
}
