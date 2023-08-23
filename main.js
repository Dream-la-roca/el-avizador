var objetos = [];
var detectado = false;
var encontrado = false
var buscado = ""
function setup() {
    canvas = createCanvas(1000, 700);
    background("green");
    detector = ml5.objectDetector("cocossd", listo);
    video = createCapture(VIDEO);
    video.size(1000, 700);
    video.hide();
}
function listo() {
    console.log("listo!!!");
    detectado = true;

}
function respuesta(error, resultado) {
    if (!error) {
        console.log(resultado);
        objetos = resultado;

    }
}
function draw() {
    detector.detect(video, respuesta);
    image(video, 0, 0, 1000, 700)
    encontrado = false
    if (detectado) {
        for (var i = 0; i < objetos.length; i++) {
            buscado = document.getElementById("buscando").value
            if (objetos[i].label == buscado) {
                encontrado = true;
            }
            noFill();
            stroke("green");
            rect(objetos[i].x, objetos[i].y, objetos[i].width, objetos[i].height)
            nombre = objetos[i].label;
            porcentaje = Math.round(objetos[i].confidence * 100);
            mensaje = nombre + "  " + porcentaje + "%";
            textSize(30);
            text(mensaje, objetos[i].x, objetos[i].y)
        }
        if (encontrado == true) {
            document.getElementById("avizador").innerHTML = buscado + "localizado"
        } else {
            document.getElementById("avizador").innerHTML = "AVISO!!! Se avisa que el aviso que se iba a avisar no se aviso, se avisara hasta nuevo aviso atte: el avisador"
        }
    }
}
function preload(){
    alarma = loadSound("nuclear_alarm.mp3")
}