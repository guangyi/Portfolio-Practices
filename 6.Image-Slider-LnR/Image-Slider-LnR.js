
//1. set ul width 
//2. image-slider when click prev/next button
var ul;
var li_items;
var image_number;
var image_width;
var prev, next;
var current = 0;

function init(){
	ul = document.getElementById('image_slider');
	li_items = ul.children;
	image_number = li_items.length;
	image_width = li_items[0].children[0].clientWidth;
	ul.style.width = parseInt(image_width * image_number) + 'px';
	prev = document.getElementById("prev");
	next = document.getElementById("next");
	//.onclike = slide(-1) will be fired when onload;
	prev.onclick = function(){slide(-1);};
	next.onclick = function(){slide(1);};
}

function slide(direction){
	var currentLeft = -1 * current * image_width;
	var opts1 = {
		duration:1000,
		delta:function(p){return p;},
		step:function(delta){
			ul.style.left = parseInt(currentLeft - direction * delta * image_width) + 'px';
		},	
	};
	var opts2 = {
		duration:2000,
		delta:function(p){return p;},
		step:function(delta){
			ul.style.left = parseInt(currentLeft + direction * ((image_number - 1) * image_width * delta)) + 'px';
		},
	};
			
	if ((direction == -1 && current == 0) || (direction == 1 && current == image_number-1)){
		id = animate(opts2);	
		current = image_number - 1 - current;	
	}
	else{
		current = current + direction;
		id = animate(opts1);
	}	
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
		}
	}, opts.delay || 17);
	return id;

}
window.onload = init;