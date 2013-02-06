/**
 *
 *  AJAX Error Handler, version 0.1
 *  Built at 2012/12/19 10:28 GMT
 *	By Adriano Spadoni
 *
 *
 *	Tips:
 *	
 *	- It's disabled by default.
 *	For enable it you just need add:
 *	$.ajax({
 *		url : "/api/x",
 *		data : data,
 * 		retry : 3 <- try 3 times before give up
 *	});
 *
 *	- to abort before call again:
 *	if(xhr && xhr.readystate != 4) xhr.abort();
 *	
 *	- before any redirect call, use:
 *	$.xhrPool.abortAll() 
 *	
 *	- to display the number of tries use:
 *	if(xhr.statusText != 'abort'){
 *		if(this.retried + 1 < this.retry){
 *			msg = "retrying... " + (this.retried + 1) + ' of ' + this.retry;
 *		} else {
 *			msg = "retried " + this.retry + ' times.';
 *		}
 *	}
 *
 **/

// Ajax Pool
$.xhrPool = [];
$.xhrPool.abortAll = function() {
    $(this).each(function(idx, xhr) {
        xhr.abort();
    });
    $.xhrPool.length = 0
};

// Ajax Error Handler
$.xhrError = function(e, xhr, o, r){
	if(o.retried++ < o.retry)  $.ajax(o);
	/*switch(xhr.status){ 
		case 401: // 401 Unauthorized
		case 407: // 407 Proxy Authentication Required
		// session probably expired, inform the user and redirect to login page in 5 secs
		
			// TODO: new MsgBox({title:'', body:'', buttons:[{value:action}]});
		break;
		case 408: // 408 Request Timeout
		case 500: // 500 Internal Server Error
		case 502: // 502 Bad Gateway
		case 503: // 503 Service Unavailable
		case 504: // 504 Gateway Timeout
		// try again 3 times before give up	
			if(o.retried++ < o.retry) { 
				$.ajax(o);
			}
		break;
		default: 
		// inform the user
			// 400 Bad Request
			// 402 Payment Required
			// 403 Forbidden
			// 404 Not Found
			// 405 Method Not Allowed
			// 406 Not Acceptable
			// 409 Conflict
			// 410 Gone
			// 411 Length Required
			// 412 Precondition Failed
			// 413 Request Entity Too Large
			// 414 Request-URI Too Long
			// 415 Unsupported Media Type
			// 416 Requested Range Not Satisfiable
			// 417 Expectation Failed
			// 501 Not Implemented
			// 505 HTTP Version Not Supported
			
			// TODO: new MsgBox({title:'', body:'', buttons:[{value:action}]});
	}*/
}

// Ajax call setup
$.ajaxSetup({
	dataType 	:"json",
	timeout 	: 30000,
	retried 	: 0,
	retry	 	: 0,
	contentType : "application/json",
	beforeSend 	: function(xhr) {
		xhr.setRequestHeader("application/json");
        $.xhrPool.push(xhr);
	},
    complete 	: function(xhr) {
		// remove from the $.xhrPool
        var index = $.xhrPool.indexOf(xhr);
        if (index > -1) {
            $.xhrPool.splice(index, 1);
        }
    }
});

// add error listener
$(document).ajaxError($.xhrError);
