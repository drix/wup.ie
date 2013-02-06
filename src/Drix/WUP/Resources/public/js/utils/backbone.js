

// Add Retry function for the backbone core
_.extend(Backbone.Model.prototype, {
	retry: 3,
	retried: 0,
    sync: function(method, model, options) {
        var $this = this, args = arguments;
        var errorHandler = options.error;
        options.error = function(xhr, xhrb) {// code for compatibility with old versions of backbone
            var errorHandlerArgs = arguments, tryagain = false;
			switch(xhr.status || xhrb.status){ 
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
					if($this.retried++ < $this.retry) tryagain = true;
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
			}
			// try again
            if (tryagain) {
                Backbone.sync.apply($this, args);
            } else {
			// give up
                $this.retried = 0;
				if(errorHandler) errorHandler.apply($this, errorHandlerArgs);
				else alert('Error');
            }
        };
		// the first call
        Backbone.sync.apply(this, args);
    }
});