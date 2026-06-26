//                 INICIO DE TODA UNA EXPERIENCIA


//                        VARIABLES  

// generamos 6 posibles estados:"PORTADA", "MESA", "TRANSICION", "MENU", "CINE", "FIN" 

// ESTADO PRINCIPAL DEL SISTEMA :) 

let estadoActual = "PORTADA"; 
let saborActual = ""; 

// FONDOS Y TAMAÑOS 
let fondo1, fondo2;
let tam1 = 800, tam2 = 800, tam3 = 620, tam4 = 180, tam5 = 800;
let yFondo2Final;

// IMÁGENES Y BOTONES 
let portada, fruta, fruta2;
let f1, quesito2, todito;
let flecha1, flecha2;
let TBC, fin, reiniciar, clickea;

// GIFS 
let gif1, gif2, comequesito, comefrutilla, secometodo;
let gifActual;

// MUSICA
let festin;

// POSICIONES Y MOVIMIENTO 
let x, y;
let xFruta, yFruta;


let mostrarFlecha = false; 

// Memoria para saber qué botones ya se presionaron (por ejemplo "scape" si ya fue presionado no volvera a funcionar si se vuelve a presionar, se activa nuevamente al empezar otra vez el juego)
let vistoFrutilla = false;
let vistoQueso = false;
let vistoTodo = false;

// variable para el efecto ratatuille :3
let sabores = [];


//                FUNCIONES BASE DEL JUEGO


function preload() {
  gif1 = loadImage("gif/Parte-01-REMY.gif");
  gif2 = loadImage("gif/Parte-02-REMY.gif");

  portada = loadImage("img/portada.png");
  fruta = loadImage("img/potefruta01-1.png");
  fruta2 = loadImage("img/potefruta02.png");
  f1 = loadImage("img/frutilla.png");
  quesito2 = loadImage("img/quesito.png");
  todito = loadImage("img/QF.png"); 

  fondo1 = loadImage("img/fondo01.png");
  fondo2 = loadImage("img/mantel.jpg");

  flecha1 = loadImage("img/flecha1.png");
  flecha2 = loadImage("img/flecha2.png");

  comequesito = loadImage("gif/remy01-comequesito.gif");
  comefrutilla = loadImage("gif/remy01-comefrutilla.gif");
  secometodo = loadImage("gif/remy-secometodo.gif"); 

  TBC = loadImage("img/continuara.png");
  fin = loadImage("img/finremy.png");
  reiniciar = loadImage("img/repetir.png");
  
  clickea = loadImage("img/clicky.png"); 

  festin = loadSound("song/lefestin.mp3");

}

function setup() {
  createCanvas(800, 800);
  imageMode(CORNER);
  
  // VELOCIDAD DE LOS GIFS
 
  if (gif1) gif1.delay(150); 
  if (gif2) gif2.delay(150); 
  if (comequesito) comequesito.delay(150);
  if (comefrutilla) comefrutilla.delay(150);
  if (secometodo) secometodo.delay(150);

  resetAnimacion();
}

function resetAnimacion() {
  estadoActual = "PORTADA";
  saborActual = "";
  
  x = width;
  y = 0;
  xFruta = -300;
  yFruta = height / 2;
  yFondo2Final = height;
  mostrarFlecha = false; 

  vistoFrutilla = false;
  vistoQueso = false;
  vistoTodo = false;

  gifActual = gif1;

  if (gif1 && typeof gif1.setFrame === 'function') gif1.setFrame(0);
  if (gif2 && typeof gif2.setFrame === 'function') gif2.setFrame(0);
  
  sabores = [];

// se detiene la música si el boton "reiniciar" es presionado
  if (festin && festin.isPlaying()) {
    festin.stop();
  }
}


//                BUCLE PRINCIPAL 
//           nuestra maquina de estados


function draw() {
  background(220);

  switch (estadoActual) {
      
    case "PORTADA":
      image(portada, 0, 0, width, height);
      break;

    case "MESA":

      
      image(fondo1, 0, 0, tam1, tam1);
      image(fondo2, 0, 400, tam2, tam2);
      image(gifActual, x, y, 800, 800);

      let centro = (width - 800) / 2;
      if (x > centro) {
        x -= 6;
      } else {
        x = centro;
      }

      image(fruta, 80, 130, tam3, tam3);

      if (gifActual === gif2 && typeof gif2.getCurrentFrame === 'function') {
        if (gif2.getCurrentFrame() >= gif2.numFrames() - 10) {
          mostrarFlecha = true; 
        }
      }

      if (mostrarFlecha) {
        image(flecha1, 620, 620, tam4, tam4);
      }
      
      // clicky aparece solo en MESA
      image(clickea, mouseX - 25, mouseY - 25, 100, 100); 
      break;

    case "TRANSICION":
      image(fondo1, 0, 0, tam1, tam1);
      image(fondo2, 0, 400, tam2, tam2);
      image(gifActual, x, y, 800, 800);
      image(fruta, 80, 130, tam3, tam3);

      if (yFondo2Final > 0) {
        yFondo2Final -= 8;
      } else {
        estadoActual = "MENU";
      }
      image(fondo2, 0, yFondo2Final, width, height);
      break;

    case "MENU":
      image(fondo2, 0, 0, width, height);
      image(fruta2, 0, 0, width, height);

      let hoverF1 = mouseX >= 10 && mouseX <= 260 && mouseY >= 10 && mouseY <= 260;
      image(f1, 10, 10, hoverF1 ? 280 : 250, hoverF1 ? 280 : 250);

      let hoverT = mouseX >= 275 && mouseX <= 525 && mouseY >= 10 && mouseY <= 260;
      image(todito, 275, 10, hoverT ? 280 : 250, hoverT ? 280 : 250);

      let hoverQ = mouseX >= 540 && mouseX <= 790 && mouseY >= 10 && mouseY <= 260;
      image(quesito2, 540, 10, hoverQ ? 280 : 250, hoverQ ? 280 : 250);

      if (vistoFrutilla && vistoQueso && vistoTodo) {
        let tbcX = 500; 
        let tbcY = 590; 
        let tbcSize = 250;
        let hoverTBC = mouseX >= tbcX && mouseX <= tbcX + tbcSize && mouseY >= tbcY && mouseY <= tbcY + tbcSize;
        
        image(TBC, tbcX, tbcY, hoverTBC ? 280 : 250, hoverTBC ? 280 : 250);
      }
      break;

    case "CINE":
      background(0);
      
      if (saborActual === "frutilla") image(comefrutilla, 0, 0, tam5, tam5);
      if (saborActual === "queso") image(comequesito, 0, 0, tam5, tam5);
      if (saborActual === "todo") image(secometodo, 0, 0, tam5, tam5);

      image(flecha2, 20, 620, tam4, tam4);
      dibujarSabores(saborActual);
      
      // clicky aparece solo en CINE
      image(clickea, mouseX - 25, mouseY - 25, 100, 100);
      break;

    case "FIN":
      image(fin, 0, 0, width, height);
      
      let reinX = 620; 
      let reinY = 620;
      let hoverRein = mouseX >= reinX && mouseX <= reinX + tam4 && mouseY >= reinY && mouseY <= reinY + tam4;
      
      image(reiniciar, reinX, reinY, hoverRein ? 200 : tam4, hoverRein ? 200 : tam4);
      break;
  }
}


//            EFECTO VISUAL RATATOUILLE ;3


function dibujarSabores(ingrediente) {
  if (mouseIsPressed) {
    let colorTono;
    if (ingrediente === 'queso') colorTono = random(35, 60); 
    else if (ingrediente === 'frutilla') colorTono = random(320, 360); 
    else if (ingrediente === 'todo') colorTono = random(1) > 0.5 ? random(35, 60) : random(320, 360);
    else colorTono = random(360); 

    sabores.push({
      posX: mouseX + random(-30, 30),
      posY: mouseY + random(-30, 30),
      color: colorTono,
      tam: random(10, 60),
      tipo: int(random(2)),
      alfa: 1
    });
  }

  push(); 
  colorMode(HSB, 360, 100, 100, 1);
  for (let i = sabores.length - 1; i >= 0; i--) {
    let s = sabores[i];

    if (s.tipo === 0) {
      noStroke();
      fill(s.color, 80, 100, s.alfa);
      circle(s.posX, s.posY, s.tam);
    } else {
      noFill();
      stroke(s.color, 80, 100, s.alfa);
      strokeWeight(4);
      circle(s.posX, s.posY, s.tam * 1.5);
    }

    s.alfa -= 0.02;   
    s.posY -= 0.5;    

    if (s.alfa <= 0) sabores.splice(i, 1);
  }
  pop();
}

//                    JUEGA CON REMY
//             aquí interactua el usuario con el juego


function keyPressed() {
  if (key === " " && estadoActual === "PORTADA") {
    estadoActual = "MESA";
    
// La cancion le festin se repoduce luego de la portada al apretar "space" y le pusimos .loop() para que se repita si se acaba
    if (festin && !festin.isPlaying()) {
      festin.loop();
    }
  }
}

function mousePressed() {
  switch (estadoActual) {
      
    case "MESA":
      if (gifActual === gif1) {
        gifActual = gif2;
        if (gif2 && typeof gif2.setFrame === 'function') gif2.setFrame(0);
      } 
      else if (mostrarFlecha) {
        if (mouseX >= 620 && mouseX <= 620 + tam4 && mouseY >= 620 && mouseY <= 620 + tam4) {
          estadoActual = "TRANSICION";
        }
      }
      break;

    case "MENU":
      if (mouseX >= 10 && mouseX <= 260 && mouseY >= 10 && mouseY <= 260) {
        saborActual = "frutilla";
        vistoFrutilla = true; 
        estadoActual = "CINE";
      }
      else if (mouseX >= 275 && mouseX <= 525 && mouseY >= 10 && mouseY <= 260) {
        saborActual = "todo";
        vistoTodo = true; 
        estadoActual = "CINE";
      }
      else if (mouseX >= 540 && mouseX <= 790 && mouseY >= 10 && mouseY <= 260) {
        saborActual = "queso";
        vistoQueso = true; 
        estadoActual = "CINE";
      }
      else if (vistoFrutilla && vistoQueso && vistoTodo) {
        let tbcX = 500; 
        let tbcY = 590; 
        let tbcSize = 250;
        if (mouseX >= tbcX && mouseX <= tbcX + tbcSize && mouseY >= tbcY && mouseY <= tbcY + tbcSize) {
          estadoActual = "FIN";
        }
      }
      break;

    case "CINE":
      if (mouseX >= 20 && mouseX <= 20 + tam4 && mouseY >= 620 && mouseY <= 620 + tam4) {
        estadoActual = "MENU";
        sabores = []; 
      }
      break;

    case "FIN":
      let reinX = 620;
      let reinY = 620;
      if (mouseX >= reinX && mouseX <= reinX + tam4 && mouseY >= reinY && mouseY <= reinY + tam4) {
        resetAnimacion();
      }
      break;
  }
}

// fin de nuestro juego, apreta boton "reiniciar" para vivir la experiencia ratatuille otra vez :3