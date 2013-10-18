//1. set ul width 
//2. image when click prev/next button
var ul;
var liItems;
var imageNumber;
var imageWidth;
var prev, next;
var currentPostion = 0;
var currentImage = 0;


function init(){
	ul = document.getElementById('image_slider');
	liItems = ul.children;
	imageNumber = liItems.length;
	imageWidth = liItems[0].children[0].clientWidth;
	// set ul's width as the total width of all images in image slider.
	ul.style.width = parseInt(imageWidth * imageNumber) + 'px';
	prev = document.getElementById("prev");
	next = document.getElementById("next");
	/*.onclike = slide(-1) will be fired when onload;
	closure?? */
	prev.onclick = function(){ onClickPrev();};
	next.onclick = function(){ onClickNext();};
}
/**
* clicking prev. if current image is the first image, ul slide all the way to the last one
* otherwise, it slide to the image on the left of current image.
**/
function onClickPrev(){
	if (currentImage == 0){
		slideTo(imageNumber - 1);
	} 		
	else{
		slideTo(currentImage - 1);
	}		
}
/**
* clicking next. if current image is the last image, ul slide all the way to the first one
* otherwise, it slide to the image on the right of current image.
**/
function onClickNext(){
	if (currentImage == imageNumber - 1){
		slideTo(0);
	}		
	else{
		slideTo(currentImage + 1);
	}		
}

/**
* slideTo is the function that actually does the movement.
* it takes one variable--imageToGo as parameter. it's an int stands for the image will be displayed
* By comparing imageToGo and currentImage, it can be decided which direction to move, left or right
* left: direction = -1; right: direction = 1
* so the new left position is the current postion plus/minus (number of imagesToGo * image width)
* when the step function is finished, a callback function will be called to set current image to imageToGo
**/
function slideTo(imageToGo){
	var direction;
	var numOfImageToGo = Math.abs(imageToGo - currentImage);
	direction = currentImage > imageToGo ? 1 : -1;
	currentPostion = -1 * currentImage * imageWidth;
	var opts = {
		duration:1000,
		delta:function(p){return p;},
		step:function(delta){
			ul.style.left = parseInt(currentPostion + direction * delta * imageWidth * numOfImageToGo) + 'px';
		},
		callback:function(){currentImage = imageToGo;}	
	};
	animate(opts);
}

/**
* animate is a generic function for animation. 
* but what the animation does, doesn't defined here
*/
function animate(opts){
	var start = new Date;
	var id = setInterval(function(){
		var timePassed = new Date - start;
		var progress = timePassed / opts.duration;
		if (progress > 1){
			progress = 1;
		}
		var delta = opts.delta(progress);
		opts.step(delta);
		if (progress == 1){
			clearInterval(id);
			opts.callback();
		}
	}, opts.delay || 17);
}
window.onload = init;