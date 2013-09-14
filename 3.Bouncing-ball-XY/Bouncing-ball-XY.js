var canvas;
var context;
var unitTime = 0.1;
var dy;
// it's the acceleration of risistence 
var af = -3;
var afx = -6;
// initial one ball
var ball = new Ball(100, 0, 20, "rgb(255, 100, 255)");
var ballArray = new Array(ball);
var gravity = 10;

function init(){
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext("2d");
	// if not do so, the width/height won't be changed
	// only clientWidth/height be change.
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	setInterval(update, 5);
}

function update(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (i = 0; i < ballArray.length; i++){
		ballArray[i].draw();
		// if ball property stop == true, the ball keep still
		if (!ballArray[i].stop){			
			ballArray[i].move();
		}
	}
}

function Ball(x, y, radius, color){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.vy0 = 0; 
	this.vx0 = Math.floor(Math.random() * 30);
	// each ball has it's own moving dirction!
	// YDirection = 1 means the ball is falling down
	this.YDirection = 1;
	// XDirection = -1 means moving toward left, 1 means right
	// moving left or right is random by using mod 2
	var directions = [-1, 1];
	this.XDirection = directions[this.vx0 % 2]; 
	this.Ystop = false;  
	this.stop = false;                                                                      
}
Ball.prototype.draw = function(){
	context.beginPath()
	context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	context.fillStyle = this.color;
	context.closePath();
	context.fill();
}

Ball.prototype.move = function(){	
	// if y comes to the bottom of the canvas, it should rebound
	// YDirection = -1 means the ball is going up
	// YDirection = 1 means the ball is falling down.
	// when going up, the new y position will be this.y - dy
	if (this.y >= canvas.height - this.radius && this.YDirection == 1){
		this.YDirection = -1;
	}
	if (this.x <= this.radius || this.x >= canvas.width - this.radius){
		this.XDirection *= -1;
	}
	// Physical Equation: dy = v0 * t + 1/2 * a * t^2
	// vt = vo + a * t
	// Moving down: a = g - af; Moving up: a = g + af; 
	// Up: "a" should be negative because it's opposite the moving direction
	// so set YDirection to -1
	if (!this.Ystop){
		dy = this.vy0 * unitTime + 1/2 * (this.YDirection * gravity + af) * Math.pow(unitTime, 2);
		this.vy0 = this.vy0 + (this.YDirection * gravity + af) * unitTime;
		this.y += this.YDirection * dy;
	}
	dx = this.vx0 * unitTime + 1/2 * afx * Math.pow(unitTime, 2);
	this.vx0 = this.vx0 + afx * unitTime / 50;
	this.x += this.XDirection * dx;
	// if this.vy0 <= 0 it means the ball comes to the highest point 
	// it will fall down again. set YDirection to 1
	if (this.vy0 <= 0){
		this.YDirection = 1;
	}
	//if this.stop property is true, then the 	
	if (this.y >= canvas.height - this.radius && this.vy0 <= 0){
		this.Ystop = true;
	}
	if (this.vx0 <= 0 && this.vy0 <= 0 && this.y >= canvas.height - this.radius){
		this.stop = true;
	}
}
/**
*  "addBall" button fire this function to add as many different ball as possible
**/
function addBall(){
	var color = 'rgb(' + parseInt(Math.random() * 255) + ', ' +
		parseInt(Math.random() * 255) + ', ' +
		parseInt(Math.random() * 255) + ')';
	var radius = 5 + Math.floor(Math.random() * 30);
	// when random = 1, x = canvas width - radius
	// when random = 0, x = radius. so all balls are within canvas
	var x = radius  + Math.random() * (canvas.width -  2 * radius);
	var y = Math.random() * canvas.height / 4;
 	var ball = new Ball(x, y, radius, color);
 	ballArray.push(ball);
}
function clearAll(){
	ballArray = [];	
}
window.onload = init;
