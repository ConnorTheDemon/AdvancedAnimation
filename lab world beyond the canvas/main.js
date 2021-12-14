window.addEventListener("load", init);
var canvas, context, canvasLocation, canvas2, context2, mouseXSub, mouseYSub, flipped, triangleLoc;
var particles = [];
let mouseX = mouseY = 0;
let mouseDownMain = mouseDownSub = isFlipped = false;
bounds = {
  width: 2000,
  height: 2000,
  top: -1000,
  left: -1000
}
//var particles = []; //fully aware of the fact that I'm using an array compared to something else
function init(){
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
  canvas = document.getElementById("cnv");
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
  context = canvas.getContext("2d");
  canvas2 = document.getElementById("cnv2");
  context2 = canvas2.getContext("2d");
  canvasLocation = new JSVector(0,0);
  window.addEventListener("keypress", keyPressHandler);
  window.addEventListener("click", clickHandler);
  loadTriangle(); //loads the triangleLoc
  //this.triangleLoc = new JSVector(triangle.getLocX(),triangle.getLocY());
  loadTarget();

  animate();
}
function animate(){
  context.clearRect(0,0,canvas.width,canvas.height);
  context.save();
  context.beginPath();
  context.translate(-canvasLocation.x,-canvasLocation.y);
  context.strokeStyle = 'red';
  context.lineWidth = 5;
  context.moveTo(-2000,0);
  context.lineTo(2000,0);
  context.moveTo(0,-2000);
  context.lineTo(0,2000);
  context.stroke();
  context.beginPath();
  context.rect(bounds.top, bounds.left, bounds.width, bounds.height);
  context.strokeStyle = 'green';
  context.stroke();
  //triangle.getCanvasLocation(canvasLocation.x, canvasLocation.y);
  triangle.draw();
  target.draw();

  for (let i = 0; i<particles.length; i++){
    context.lineWidth = 1.5;
    particles[i].draw();
  }
  context.restore();

  context2.clearRect(0,0,canvas2.width,canvas2.height);
  context2.save();

  context2.beginPath();
  context2.scale(0.1,0.1);
  context2.translate(bounds.width/2,bounds.height/2)
  context2.strokeStyle = 'red';
  context2.lineWidth = 5;
  context2.moveTo(-2000,0)
  context2.lineTo(2000,0);
  context2.moveTo(0,-2000);
  context2.lineTo(0,2000);
  context2.stroke();

  context2.beginPath();
  context2.rect(bounds.top, bounds.left, bounds.width, bounds.height);
  context2.strokeStyle = 'green';
  context2.stroke();

  context2.beginPath();
  context2.rect(canvasLocation.x,canvasLocation.y,canvas.width,canvas.height);
  context2.strokeStyle = "rgba(128,128,128,1)";
  context2.stroke();
  target.update();
  target.draw2();
  triangle.update();
  triangle.draw2();
  //updateTriangle();
  if (mouseDownMain){
      createParticle(); //creates particle every frame
  }
  for (let i = 0; i<particles.length; i++){
    particles[i].update();
    particles[i].draw2();
    //console.log(particles[i].flipped);
    particles[i].flipped(isFlipped);
    if (particles[i].isDead() == true){
      particles.splice(i,1);
      i--; //stops rendering if the particle has 'died'
    }
  }
  if(mouseDownSub){
    canvasLocation.x = mouseXSub * 10
    canvasLocation.y = mouseYSub* 10
    mouseDownSub = false;
  }
  context2.restore();
  window.requestAnimationFrame(animate);
  }
  function loadTarget(){
    let x = 500;
    let y = 400;
    let r = 20;
    let color = "blue";
    target = new Target(x, y, r, color)
  }

  function loadTriangle(){ //initialization and creation of ball instances
      let x = Math.random()*150;
      let y = Math.random()*150;
      let dx = Math.random() + 2;
      let dy = Math.random() + 2;
      let r = 40;
      let color = "red";
      triangle = new Triangle(x, y, dx, dy, r, color) //create new ball instance with set variables
  }
  function createParticle(){
    for (let i = 0; i<1; i++){ //Setting the value to >1 creates multiple particles each frame
      let radius = 15;
      let x = mouseX+ Math.random()*100-50; //middle of the canvas, with up to 50 pixels of variation in each direction
      let y = mouseY+Math.random()*100-50;
      let dx = Math.random()*5 - 2.5; //initial velocity of x, can be anywhere from -2.5 to 2.5.
      let dy = Math.random()*7.5 - 3.75; //can be anywhere from -3.75 to 3.75
      let r = Math.floor(Math.random()*255);
      let g = Math.floor(Math.random()*255);
      let b = Math.floor(Math.random()*255);
      let a = 1; //gives particle random color and sets to 100% opacity
      let clr = "rgba("+r+","+g+","+b+","+a+")"
      let life = Math.floor(Math.random()*90)+90; //particle can last from 1.5 to 3 seconds
      particles.push(new Particle(x, y, dx, dy, radius, clr, life, r, g, b));
      //console.log(mouseX + "   " + mouseY);
      }
    }
    function updateTriangle(){
      //triangle.setLocX(this.triangleLoc.x);
      //triangle.setLocY(this.triangleLoc.y);
    }
function keyPressHandler(event){
  if(event.code == "KeyW"){
    {
      canvasLocation.y -= 10;
    }
  }
  if(event.code == "KeyS"){
    canvasLocation.y -= -10;
  }
  if(event.code == "KeyA"){
    canvasLocation.x -= 10;
  }
  if(event.code == "KeyD"){
    canvasLocation.x -= -10;
  }
  if(event.code == "KeyC"){
    console.log(canvas.width + canvas2.width + 5);

  }
  if(event.code == "KeyF"){
    if (isFlipped == false){
      isFlipped = true;
    }
    else{
      isFlipped = false;
    }
  }
}
function clickHandler(event){

  //mouseX = event.clientX+10;
  //mouseY = event.clientY+10;
  mouseXSub = mouseXCheck = event.clientX+10;
  mouseYSub = mouseYCheck = event.clientY+10;
  console.log("pre modification:" + mouseX+ "  "+ mouseY)
  console.log("canvas width:"+ canvas.width)
  if(mouseXSub>canvas.width+5 && mouseXSub<canvas.width+canvas2.width+5 && mouseYSub<650 && mouseYSub>650-canvas.height){
    mouseXSub -= canvas.width+5 + 160;
    mouseYSub -= 550
    console.log(mouseX+ "  "+mouseY);
    mouseDownSub = true;
  }
  else if(mouseXCheck<canvas.width-10 && mouseYCheck<canvas.height-10){
      mouseX = event.clientX+10;
      mouseY = event.clientY+10;
      mouseX += canvasLocation.x;
      mouseY += canvasLocation.y;
      mouseDownMain = true;// 805 345
    }
}
