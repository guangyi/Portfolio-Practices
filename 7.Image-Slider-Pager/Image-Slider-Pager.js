
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
	ul.style.width = parseInt(imageWidth * imageNumber) + 'px';
	prev = document.getElementById("prev");
	next = document.getElementById("next");
	generatePager(imageNumber);
	//.onclike = slide(-1) will be fired when onload;
	/*
	prev.onclick = function(){slide(-1);};
	next.onclick = function(){slide(1);};*/
	prev.onclick = onClickPrev;
	//prev.onclick = function(){ onClickPrev();};
	next.onclick = onClickNext;
}

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
*generatePager automatically. no need to change when image number changes.	
*/
function generatePager(imageNumber){	
	var pageNumber;
	var pagerDiv = document.getElementById('pager');
	for (var i = 0; i < imageNumber; i++){
		var li = document.createElement('li');
		pageNumber = document.createTextNode(parseInt(i + 1));
		li.appendChild(pageNumber);
		pagerDiv.appendChild(li);
		// add event inside a loop, closure issue.
		var j = i;
		li.onclick = (function(i){
			return function(){
				slideTo(i);
			}
		}(i));
		/*li.onclick = (function(i2){
			return slideTo(i2);
		}(i));*/
	}
	// style.width can't get width from css sheet. 	
	var computedStyle = document.defaultView.getComputedStyle(li, null);
	//border width 1px; offsetWidth = 22; offsetWidth returns a number
	var liWidth = li.offsetWidth;
	// remove px from the string returned. like '5px'-->'5'
	var liMargin = parseInt(computedStyle.margin.replace('px',""));
	// margin on both left and right side.
	pagerDiv.style.width = parseInt((liWidth + liMargin * 2) * imageNumber) + 'px';
}
window.onload = init;
/*
foo.onclike = function(){
	var a="foo";
	return onClickNext(a);
}
*/
