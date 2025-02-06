document.addEventListener("DOMContentLoaded", function() {
    const catImage = document.getElementById("catImage");
    const generateBtn = document.getElementById("generateBtn");

    generateBtn.addEventListener("click", function() {
        fetch("https://api.thecatapi.com/v1/images/search")
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    catImage.src = data[0].url;
                    catImage.style.display = "block";
                }
            })
            .catch(error => console.error("Error al obtener la imagen:", error));
    });
});
