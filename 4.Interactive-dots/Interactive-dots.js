var canvas;
var context;
// dictionary??
var mouse = {x: 0, y: 0};
var dotsArray = [];
var distance;
var mouseMove = false;
var mouseDown = false;
var mouseUp = false;

function init(){
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext("2d");
	// These event are added to element canvas, not the certain content within canvas
	canvas.addEventListener("mousemove", mousemove, false);
	canvas.addEventListener("mousedown", mousedown, false);
	canvas.addEventListener("mouseup", mouseup, false);
	canvas.width = canvas.clientWidth;
	canvas.height =  canvas.clientHeight;
	
	var dot1 = new Dots();	
	dotsArray.push(dot1);
	dot1.draw();
	// For chrome, 17ms got the smoothest animation
	// even though the dot stay still on the canvas, but still need setInterval()
	// to run update function every 17ms because it needs to know when the mouse change
	// its position and then fire the update function
	setInterval(update, 17);
}
function Dots(){
	//initX and initY and initRadius is to set the dot to it's original state.
	//if it's too small, the  mousemove animation doesn't function very well
	this.radius = Math.floor(10 + Math.random() * 20);
	this.initRadius = this.radius;
	this.x = this.radius  + Math.random() * (canvas.width -  2 * this.radius);
	this.y = Math.random() * canvas.height;
	this.initX = this.x;
	this.initY = this.y;
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

function mousemove(event){
	//event.clientX is the mouse position from viewport
	//but dots on canvas has it's own position regarding canvas. 
	//canvas.offsetLeft/Top to calculate the mouse position regarding canvas
	mouse.x = event.clientX - canvas.offsetLeft;
	mouse.y = event.clientY - canvas.offsetTop;
}
function mousedown(event){
	mouseDown = true;
	mouseUp = false;
}
function mouseup(event){
	mouseDown = false;
	mouseUp = true;
}

function addDots(){
	var dot = new Dots();
	dotsArray.push(dot);
	dot.draw();
}
function update(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (i = 0; i<dotsArray.length; i++){
		var dot = dotsArray[i]
		// calculate the distance between the dot's center and current mouse position
		distance = Math.sqrt(Math.pow(mouse.x - dot.x, 2) + Math.pow(mouse.y - dot.y, 2)); 
		// if the mouse is pointing at the dot, the dot becomes larger.
		if (distance <= dot.radius){
			//mouseMove = true;
			if(dot.radius < 45){
				dot.radius = dot.radius + 3;
			}			
		}
		// if the mouse point outside the dot
		// the dot will get smaller until its original radius
		if(distance > dot.radius){
			if(dot.radius != dot.initRadius){
				dot.radius = dot.radius - 1;				
			}
		}
		// if click any where on the canvas, without mouseup
		// all the dots that 50 pixel away will come toward where the mouse points at
		if(mouseDown){
			// xDirection and yDirection is to mark which direction to go
			// right or left, top or down
			var xDirection;
			var yDirection;
			if (distance > 50){
				if (mouse.x > dot.x){
					xDirection = 1;
				}
				else {
					xDirection = -1;

				}
				if (mouse.y > dot.y){
					yDirection = 1;
				}
				else {
					yDirection = -1;

				}
				dot.x = dot.x + xDirection * 2;
				dot.y = dot.y + yDirection * 2;
			}
		}
		// when mouse up, the dot go back to its original position
		if(mouseUp){
			dot.x = dot.initX;
			dot.y = dot.initY;
		}
		dot.draw();
	}
}
window.onload = init;