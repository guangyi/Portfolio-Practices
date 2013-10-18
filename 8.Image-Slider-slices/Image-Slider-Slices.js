function imageSlider(slices){
	var slider = document.getElementById('slider');
	var container = document.getElementById("container")
	var pager = document.getElementById('pager');
	var sliceDiv = new Array;	
	var sliceHeight;
	//getImgIter returns the root node of iteration.
	//var imgIter = getImgIter(slider);
	// first child of root
	var iter = new getImgIter(slider);
	var imgIter = iter.imgIter;
	var currentBackground = imgIter.firstChild();
	//var lastImag = imgIter.lastChild();
	
	var initSlices = function(){
		var slides = slider.children;
		slider.style.width = slides[0].offsetWidth + 'px';
		var computedStyle = document.defaultView.getComputedStyle(slider, null);
		// pay attention to the return, string or number!
		var sliceWidth = computedStyle.width.replace('px', "") / slices;
		sliceHeight = computedStyle.height.replace("px","");			
		for(var i = 0; i < slices; i++){
			sliceDiv[i] = document.createElement("div");
			sliceDiv[i].className = "sliceDiv";
			container.appendChild(sliceDiv[i]);
			// styly and setAttribute????
			sliceDiv[i].style.width = parseInt(sliceWidth) + 'px';
			// set slices position one by one. 
			sliceDiv[i].style.left = parseInt(sliceWidth * i) + 'px';
			sliceDiv[i].style.backgroundPosition = '-' + sliceWidth * i + 'px';
			sliceDiv[i].setAttribute('z-index', slides.length + 1 );
		}
	};
	var switchBackground = function(){
		currentBackground.style.display = 'none';
		if (imgIter.nextNode() != null){
			currentBackground = imgIter.currentNode;
		}
		else{
			imgIter.currentNode = iter.root();
			currentBackground = imgIter.firstChild();
		}		
		currentBackground.style.display = 'block';
	};
	var setSlicesBkgd = function(src){
		for(var i = 0; i < slices; i++){
			sliceDiv[i].style.opacity = 1;
			sliceDiv[i].style.backgroundImage = 'url(' + src + ')';
		}
	};
	this.animateSlices = function(){	
		initSlices();
		var that = this;	
		var opts = {
				duration:2000,
				delta:function(p){ return Math.max(0, 2 * p - 1);},
				step:function(delta){
						for(var i = 0; i < sliceDiv.length; i++){
							sliceDiv[i].style.opacity = 1 - delta;
							var delayDelta = delta - i / 10;
							if(i % 2 == 0){
								sliceDiv[i].style.top = '-' + parseInt(delta * sliceHeight) + 'px';
							}
							else sliceDiv[i].style.top = parseInt(delta * sliceHeight) + 'px';
						}						
						if(delta == 1){
							for(var i = 0; i < sliceDiv.length; i++){
								//sliceDiv[i].style.backgroundImage = 'none';
								//sliceDiv[i].style.backgroundColor = "transparent";
								sliceDiv[i].style.top = '0px';
							}
						}
					},
				init:function(){
						setSlicesBkgd(currentBackground.src);
						switchBackground()
					},
				callBack:function(){
						genericAnimation(opts);
					}
				};
		genericAnimation(opts);
	}
}
function getImgIter(rootNode){
	this.rootNode = rootNode;
	var filter = function(node){
			// lack of parentsis!
			return node.tagName.toLowerCase() == "img" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
		}
	this.imgIter = document.createTreeWalker(this.rootNode, NodeFilter.SHOW_ELEMENT, filter, false);
}
getImgIter.prototype.root = function(){
	return this.rootNode;
}
function genericAnimation(opts){
	var start = new Date;
	opts.init();
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
			opts.callBack();
		}
	}, opts.delay || 17);
}
window.onload = function(){
	var slider = new imageSlider(20)
	//var sliceDiv = slider.generateSlices();
	slider.animateSlices();
}