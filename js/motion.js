function initMotionPages() {
	
}






function setHandlerBar(){
	var handlerisDown = false;
	  $('.handle-bar').mousedown(function() {
	        handlerisDown = true;
	        console.log("handlerisDown");
	    });
	    $(window).mousemove(function(e) {
	        if (handlerisDown) {
	            var position = e.clientX / window.innerWidth;
	            setHandlerBarPosition(position);
	        }
	    }).mouseup(function() {
	        handlerisDown = false;
	        console.log("handlerisUp");
	    });
}

function setHandlerBarPosition(percentage) {
    percentage = Math.min(0.7, Math.max(0.1, percentage));
    var position = percentage * 100;
    $('.code-container').css('width', position + '%');
    $('.motion-container').css('width', (100 - position) + '%');
    $('.handle-bar').css('right', (100 - position) + '%');
}