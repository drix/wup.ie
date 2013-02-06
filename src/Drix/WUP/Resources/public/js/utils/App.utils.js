// variable used for debuging
var track;

var App = { models:{}, views:{}, collections:{}, utils:{} };

App.evpool = _.extend({}, Backbone.Events);

$.urlParam = function(name){
	var params = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return params == null ? '' : (params[1] || '');
}

App.utils.objectToUrlencode = function(obj){
	var r = '1';
	for( var i in obj ) r += '&'+i+'='+encodeURIComponent(obj[i]);
	return r;
}

App.utils.createObjectURL = function(i){ 
	var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
	return URL.createObjectURL(i);
}

App.utils.rotate = function($el, degree){
	degree = 'rotate('+degree+'deg)';
	$el
		/* Chrome &amp; Safari */
		.css('-webkit-transform', degree)
		/* Firefox */
		.css('-moz-transform', degree)
		/* IE 9+ */
		.css('-ms-transform', degree)
		/* Opera */
		.css('-o-transform', degree)
		/* CSS3 */
		.css('transform', degree);
		/* IE 7-8 */ // 45deg
		//filter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678, sizingMethod='auto expand');
	return $el;
}

App.utils.resizeCrop = function( src, width, height ){ // {img, width, height}
	var crop = width == 0 || height == 0;
	// not resize
	if(src.width <= width && height == 0) {
		width  = src.width;
		height = src.height;
	}
	// resize
	if( src.width > width && height == 0){
		height = src.height * (width / src.width);
	}
	
	// check scale
	var xscale = width  / src.width;
	var yscale = height / src.height;
	var scale  = crop ? Math.min(xscale, yscale) : Math.max(xscale, yscale);
	// create empty canvas
	var canvas = document.createElement("canvas");					
	canvas.width  = width ? width   : Math.round(src.width  * scale);
	canvas.height = height ? height : Math.round(src.height * scale);
	canvas.getContext("2d").scale(scale,scale);
	// crop it top center
	canvas.getContext("2d").drawImage(src, ((src.width * scale) - canvas.width) * -.5 , ((src.height * scale) - canvas.height) * -.5 );
	return canvas;
}

App.utils.identifyBrowser = function(userAgent, elements) {
    var regexps = {
            'Chrome': [ /Chrome\/(\S+)/ ],
            'Firefox': [ /Firefox\/(\S+)/ ],
            'MSIE': [ /MSIE (\S+);/ ],
            'Opera': [
                /Opera\/.*?Version\/(\S+)/,     /* Opera 10 */
                /Opera\/(\S+)/                  /* Opera 9 and older */
            ],
            'Safari': [ /Version\/(\S+).*?Safari\// ]
        },
        re, m, browser, version;
 
    if (userAgent === undefined)
        userAgent = navigator.userAgent;
 
    if (elements === undefined)
        elements = 2;
    else if (elements === 0)
        elements = 1337;
 
    for (browser in regexps)
        while (re = regexps[browser].shift())
            if (m = userAgent.match(re)) {
                version = (m[1].match(new RegExp('[^.]+(?:\.[^.]+){0,' + --elements + '}')))[0];
                return {browser:browser,version:version};
            }
 
    return null;
};

App.utils.restrictBrowser = function(data){
  var ua = App.utils.identifyBrowser();
  return data[ua.browser] === false || data[ua.browser] > ua.version;
};
