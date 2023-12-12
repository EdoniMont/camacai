const Camera_botao = document.getElementById("Camera_botao");

Camera_botao.addEventListener("click", function () {
    // Abre uma nova janela ou guia do navegador
    const newWindow = window.open("camera.html", "CameraWindow", "width=400,height=600");
    
    // Define uma função para iniciar a câmera na nova janela
    newWindow.onload = function () {
        newWindow.startCamera();
    };
});
