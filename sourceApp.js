var util = require("util"),
    http = require("http"),
    fs   = require('fs'),
    url  = require('url'),
    request = require('request'); 

var script = 'var z=new Date();var y=(z.getUTCFullYear())+""+(1+z.getMonth())+""+z.getDate()+""+z.getHours();!function(j,g,d,b){var c=g.createElement(d);c.type="text/javascript",c.async=!0,c.src=b;var f=g.getElementsByTagName(d)[0];f.parentNode.insertBefore(c,f);if(c.readyState){c.onreadystatechange=function(){if(c.readyState=="loaded"||c.readyState=="complete"){c.onreadystatechange=null;viImageJs(opt)}}}else{c.onload=function(){viImageJs(opt)}}}(window,document,"script","http://cdn.visenze.com/ctc/dist/viconnect_imagejs_latest.min.js?v="+y);!function(j,g,d,b){var c=g.createElement(d);c.rel="stylesheet";c.type="text/css",c.async=!0,c.href=b;var f=g.getElementsByTagName(d)[0];f.parentNode.insertBefore(c,f)}(window,document,"link","http://cdn.visenze.com/ctc/dist/viconnect_imagejs_latest.min.css?v="+y);var opt={accessKey:"a8734bc3ad6fa1e7800ac7db6d0ed1f8",secretKey:"0c2534a8250a6b02cbc01551420466cf"};'

var SDKInjector = (function(){

	var init = function(){
		console.log("Injector INIT");
	};

	var getParts = function(inputUrl){
		var result = {};
		result.hostname = url.parse(inputUrl).hostname;
		result.path = url.parse(inputUrl).path;
		return result;
	};

	var inject = function(inputUrl, cb){
		var parts = getParts(inputUrl);
		processPage(inputUrl, parts.path, cb);
	};

	var insert = function(content){
		var split = content.split("</head>");
		var completeContent = split[0] + "<script>" + script + "</script>" + "</head>" + split[1];
		return completeContent;
	};

	var processPage = function(inputUrl, inputUrlPath, cb){
		console.log("inputUrlPath: " + inputUrlPath);
		
		var fileName = inputUrlPath.split("/").join("-") + ".html";

		request(inputUrl, function(error, response, html){

	        if(!error){
	            var htmlContent = insert(html);
	            console.log("Retrieved response!");

		    	fs.writeFileSync(fileName, htmlContent, {flag : 'w'});
		    	cb(fileName);
	        }
	    });
	};

	return {
		init: init,
		inject: inject
	}

})();

module.exports = SDKInjector;