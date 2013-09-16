var canvas;
var context;
// dictionary??
var mouse = {x: 0, y: 0};
var dotsArray = [];
var distance;
var mouseMove = false;
function init(){
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext("2d");
	canvas.addEventListener("mousemove", mouseOver, false);
	canvas.width = canvas.clientWidth;
	canvas.height =  canvas.clientHeight;
	//canvas.addEventListener("mouseout", mouseOut,false);
	var dot1 = new Dots();	
	dotsArray.push(dot1);
	dot1.draw();
	setInterval(update, 1);
}


function Dots(){
	this.radius = Math.floor(5 + Math.random() * 20);
	this.initRadius = this.radius;
	this.x = this.radius  + Math.random() * (canvas.width -  2 * this.radius);
	this.y = Math.random() * canvas.height;
	
	this.color = 'rgb(' + parseInt(Math.random() * 255) + ', ' +
				parseInt(Math.random() * 255) + ', ' +
				parseInt(Math.random() * 255) + ')';
}

Dots.prototype.draw = function(){
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	context.fillStyle = this.color;
	context.closePath();
	context.fill();
}

function mouseOver(event){
	//event.clientX is the mouse position from viewport
	//but dots on canvas has it's own position regarding canvas. 
	//canvas.offsetLeft/Top to calculate the mouse position regarding canvas
	mouse.x = event.clientX - canvas.offsetLeft;
	mouse.y = event.clientY - canvas.offsetTop;
	
}

function addDots(){
	var dot = new Dots();
	dotsArray.push(dot);
	dot.draw();
}
function update(){

	for (i = 0; i<dotsArray.length; i++){
		distance = Math.sqrt(Math.pow(mouse.x - dotsArray[i].x, 2) + Math.pow(mouse.y - dotsArray[i].y, 2)); 
		if (distance <= dotsArray[i].radius){
			mouseMove = true;
			if (dotsArray[i].radius < 40){
				dotsArray[i].radius = dotsArray[i].radius + 1;
				//dotsArray[i].draw();
			}
			
		}
		if (mouseMove && distance > dotsArray[i].radius){
			if(dotsArray[i].radius != dotsArray[i].initRadius){
				dotsArray[i].radius = dotsArray[i].radius - 1;
				context.clearRect(0, 0, canvas.width, canvas.height);
								
			}
		}
		dotsArray[i].draw();
	}
}
window.onload = init;