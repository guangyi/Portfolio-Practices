var Blog = function(){
	function blogSlider(){
	}
	blogSlider.prototype.liWidth = $('.slider > ul > li').first().width();
	blogSlider.prototype.len = $('#sliderLeft > ul > li').length;// how mamy li children
	blogSlider.prototype.current = 1;// current item displaying
	blogSlider.prototype.slider = $('.slider > ul');
	blogSlider.prototype.id = '';
	blogSlider.prototype.init = function(){
		this.current = 1;
		this.id = '';
		var liWidth = this.liWidth;
		var len = this.len;
		this.slider.each( function(){
			// add first and last element as clone element, so the slider could be a loop
			var first = $(this).children('li:first');
			var last =  $(this).children('li:last');
			// user before: prepend() will append element as the first child element of matched elements.
			first.before(last.clone(true));// ; clone(true) clone data 
			last.after(first.clone(true));
			$(this).width(liWidth * (len + 2));// set ul width
			$(this).css('left', -1 * liWidth);
		});
	};
	blogSlider.prototype.autoSlide = function(){
		var blogSliderThis = this;
		this.id = setInterval( function slide(){
			var direction = -1 ;
			blogSliderThis.animation(direction);
		}, 9000);
	};
	blogSlider.prototype.animation = function(direction){

		var that = this;
		if ( 0 < that.current && that.current <= that.len){
			that.move(direction);
			that.current += direction * -1;
		}
		else if( that.current === 0  || that.current > that.len){
			that.toEnd();
			that.animation(direction);
		}
	}
	blogSlider.prototype.move = function(direction){
		var that = this;
		that.slider.each(function(){
			$(this).animate({
				left:'+=' + direction * that.liWidth
			}, 3000);
		});
	};
	blogSlider.prototype.toEnd = function(){
		this.current = (this.current === 0)? this.len:1;
		var distance = -1 * this.liWidth * this.current;
		this.slider.each(function(){
			$(this).css('left', distance );
		});
	};
	blogSlider.prototype.btnContrl = function(event){
		var that = this;
		var direction = (event.target.id === 'prev')? 1: -1;
		if( $('.slider > ul').is(':not(:animated)')){
			//stop current interval and restart
			clearInterval(that.id)
			that.animation(direction);
		}
		else{
			//stop current interval and restart
			that.slider.stop(false,true);
			clearInterval(that.id);
			console.log('yes');
		}
		that.autoSlide();
	};
	blogSlider.prototype.reset = function(){
		var that = this;
		$('.slider > ul > li').width($('.slider').width());
		this.liWidth = $('#sliderLeft > ul > li').first().width();
		this.slider.each( function(){
			$(this).width(that.liWidth * (that.len + 2));
			$(this).css('left',-1 * that.current * that.liWidth);
		});
	}
	var bs = new blogSlider();
	bs.init();

	this.start = function(){
		// only init when create a new blog object.
		bs.autoSlide();
		// if put it in the start function, it will be called multitimes!
		// maybe should unbind it in stop function!
		$('.btnCtrl').on('click', function(event){
			bs.btnContrl(event);
		});
	};
	this.reset = function() {
		bs.reset();
	}
	this.AnimId = function(){
		return bs.id;
	}
	this.stop = function(){
		console.log('clear' + bs.id);
		clearInterval(bs.id);
		$('.btnCtrl').unbind('click');
	}
};

$(document).ready(function(){
	$('.slider > ul > li').width( $('.slider').width());
	var blog = new Blog();
	blog.start();
})