function getDirection(event, obj){
	//this is the function to get mouse enter/out direction
	//By detecting the mouse position on which area-- 
	// inside(entering) or outside(out) the target element
	//event.pageX and event.pageY to get the mouse position
	var mouseX = event.pageX;
	var mouseY = event.pageY;
	var elementX = obj.offset().left;//JS: obj.offsetLeft;
	var elementY = obj.offset().top;//JS: obj.offsetTop;
	var elWidth = obj.outerWidth();
	var elHeight = obj.outerHeight();
	var relativeX = mouseX - elementX;
	var relativeY = mouseY - elementY;
	var x = (relativeX - (elWidth / 2) * (elWidth > elHeight ? (elHeight / elWidth) : 1));
	var y = (relativeY - (elHeight / 2) * (elHeight > elWidth ? (elWidth / elHeight) : 1));
    // learned from stack overflow--how to detect which direction mouse come 
    var d = Math.round( Math.atan2(y, x) / 1.57079633 + 5 ) % 4;
    return d;
};

var addClasses = function(direction, obj, state){
	switch( direction ){
		case 0: obj.addClass(state + '_top'); break;
		case 1: obj.addClass(state + '_right'); break;
		case 2: obj.addClass(state + '_bottom'); break;
		case 3: obj.addClass(state + '_left'); break;
	}
};
var removeClasses = function(obj){
	var removePattern = / (in|out|rotate)_[a-zA-Z_]+/g;
	obj.each(function(){
		var currentClasses = $(this).attr('class');
		var removeName = currentClasses.match(removePattern);
		if (removeName != null){
			$(this).removeClass(removeName[0]);
		}
	});
	// regular expression to match current class name
	// that includeing state( in/out)
};

$(document).ready(function(){
	// Both these two style works!!!
	// mouseleave and mouseenter is different with mousehover and mouseout
	// mouseleave and mouseenter won't affect the child of the animated element.
	$('.shelterWrapper').on('mouseenter', function(event){
			//$(this).children('.introShlter').css('')
			$(this).children('.cube').animate({'opacity':'0'},200);
			var d = getDirection(event, $(this));
			removeClasses($(this).children('.introShlter'));
			addClasses(d, $(this).children('.introShlter'), 'in');
		});
	$('.shelterWrapper').mouseleave(function(event){
		var d = getDirection(event, $(this));
		$(this).children('.cube').delay(500).animate({'opacity':'1'},200);
		removeClasses($(this).children('.introShlter'));
		addClasses(d, $(this).children('.introShlter'), 'out');
	});
	$('.description').mouseenter(function(event){
		var d = getDirection(event, $(this));

		switch(d){
			case 0:
			case 1: 
				var shelter = $(this).children( '.proShelter.top' );
				var descrpt = $(this).children( '.descrpt.down' );
				removeClasses( $(this).children() );
				addClasses( d, shelter, 'in' );	
				addClasses( d, descrpt, 'rotate_in' );
				break; 
			case 2: 
			case 3:
				var shelter = $(this).children( '.proShelter.down' );
				var descrpt = $(this).children( '.descrpt.top' );
				removeClasses( $(this).children() );	
				addClasses( d, shelter, 'in' );
				addClasses( d, descrpt, 'rotate_in' );
				break;			
		}
		
	});
	$('.description').mouseleave(function(event){
		var d = getDirection(event, $(this));
			switch(d){
			case 0:
			case 1:
				var shelter = $(this).children( '.proShelter.top' );
				var descrpt = $(this).children( '.descrpt.down' );
				removeClasses( $(this).children() );	
				addClasses( d, shelter, 'out' );	
				addClasses( d, descrpt, 'rotate_out' );
				break; 
			case 2:
			case 3:
				var shelter = $(this).children( '.proShelter.down' );
				var descrpt = $(this).children( '.descrpt.top' );
				removeClasses( $(this).children() );	
				addClasses( d, shelter, 'out' );
				addClasses( d, descrpt, 'rotate_out' );
				break;	
			}
	});
});