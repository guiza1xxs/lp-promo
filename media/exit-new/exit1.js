/* docReady is a single plain javascript function that provides a method of scheduling one or more javascript functions to run at some later point when the DOM has finished loading. */
!function(t,e){"use strict";function n(){if(!a){a=!0;for(var t=0;t<o.length;t++)o[t].fn.call(window,o[t].ctx);o=[]}}function d(){"complete"===document.readyState&&n()}t=t||"docReady",e=e||window;var o=[],a=!1,c=!1;e[t]=function(t,e){return a?void setTimeout(function(){t(e)},1):(o.push({fn:t,ctx:e}),void("complete"===document.readyState||!document.attachEvent&&"interactive"===document.readyState?setTimeout(n,1):c||(document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):(document.attachEvent("onreadystatechange",d),window.attachEvent("onload",n)),c=!0)))}}("docReady",window);

var PreventExitSplash = true;

function getUrlParameter(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
getUrlParameter("p") === "0" ? PreventExitSplash = true : PreventExitSplash = false;

var exitsplashpage =  getUrlWithParam('x=3');

function getUrlWithParam(param) {
	var url = window.location.href;

	if (url.includes("x=")) {
		url = url.replace(/(x=)[0-9]{1,2}/, param)
	} else {
		var sign = url.includes("?") ? "&" : "?";
		url = url + sign + param;
	}

	return url;
}

function DisplayExitSplash(e) {
	if (PreventExitSplash === false) {

		setTimeout(function () {
			PreventExitSplash = true;
			window.location.href = exitsplashpage;
		}, 20);

		e.preventDefault();
		e.returnValue = 'Ok';

		return 'Ok';
	}
}

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

function addClickEvent(a, i, func) {
	if (typeof a[i].onclick != 'function') {
		a[i].onclick = func;
	}
}

var disablelinksfunc = function() {
	var a = document.getElementsByTagName('A');
	for (var i = 0; i < a.length; i++) {
		if (a[i].target !== '_blank' && a[i].getAttribute("href") === '/web/') {
			addClickEvent(a, i, function() {
				PreventExitSplash = true;
			});
		} else {
			addClickEvent(a, i, function() {
				PreventExitSplash = false;
			});
		}
	}
};

disablelinksfunc();
addLoadEvent(disablelinksfunc);

var disableformsfunc = function() {
	var f = document.getElementsByTagName('FORM');
	for (var i = 0; i < f.length; i++) {
		if (!f[i].onclick) {
			f[i].onclick = function() {
				PreventExitSplash = true;
			}
		} else if (!f[i].onsubmit) {
			f[i].onsubmit = function() {
				PreventExitSplash = true;
			}
		}
	}
};

addLoadEvent(disableformsfunc);

docReady(function(e) {

	if (!PreventExitSplash) {
		document.documentElement.onclick = function (e) {
			PreventExitSplash = !!(e.target.tagName.toLowerCase() === 'a' && e.target.getAttribute("href") === '/web/' && e.target.getAttribute("target") !== '_blank' || e.target.closest("a[href^='/web/'") || e.target.tagName.toLowerCase() === 'a' && e.target.getAttribute("href") === '/unsubscribe.aspx');
		}
		window.addEventListener('beforeunload', function (e) {
			DisplayExitSplash(e);
		});
	}
});