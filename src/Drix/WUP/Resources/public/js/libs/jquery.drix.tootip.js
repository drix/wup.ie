/*
 * jquery.drix.tootip.js 0.1 
 *
 * created by Adriano Spadoni
 */

(function($, window) {
	// show green tooltip
	var Tooltip = function(target, message, seconds) {
		// clean old tooltip
		$("body > div.tooltip").remove();
		// create a new tooltip
		var tp = $('<div class="tooltip green" for="'+target.attr('id')+'">'+message+'</div>');
		// add the new tooltip
		$('body').append(tp);
		// position and display tooltip
		tp.css(target.offset()).css('margin-top',((3+tp.outerHeight())*-1)+'px').fadeIn(300);
		// auto hide it?
		if(seconds) setTimeout(function(){ Tooltip.close(target.attr('id'));}, seconds*1000);
	}
	Tooltip.close = function(id){
		$("div.tooltip[for="+id+"]").fadeOut(300, function() {
			$(this).detach();
		});
	}
	
	// display errors using jquery
	var FormError = function(field, message){
		var name = field.attr('name');
		// find the right form
		var form = field.closest('form');
		// remove old error messages for the field
		form.find('div.error[for='+name+']').remove();
		// add actions and tooltip
		field.addClass("error").on('keyup', function(e){ 
			$(this).removeClass('error').unbind('keyup'); 
			$(this).closest('form').find('div.error[for='+$(this).attr('name')+']').remove();
		}).after('<div class="error" for="'+name+'"><span class="grid16"></span>'+message+'</div>');
		// resize, add close action and show tooltip
		form.find('div.error[for='+name+']').css('max-width',form.width()).fadeIn(300).find('.grid16').click(function(){ $(this).parent().animate({opacity: .0}, 500, function(){ $(this).remove(); }); });
	}
	FormError.closeAll = function(form){
		(form || $('form')).find('div.error').animate({opacity: .0}, 300, function(){ $(this).remove(); });
	}
	
	window.FormError = FormError;	
	window.Tooltip 	 = Tooltip;	
})(jQuery, window);