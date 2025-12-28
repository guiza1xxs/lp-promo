/** docReady function */
!function(t,e){"use strict";function n(){if(!a){a=!0;for(var t=0;t<o.length;t++)o[t].fn.call(window,o[t].ctx);o=[]}}function d(){"complete"===document.readyState&&n()}t=t||"docReady",e=e||window;var o=[],a=!1,c=!1;e[t]=function(t,e){return a?void setTimeout(function(){t(e)},1):(o.push({fn:t,ctx:e}),void("complete"===document.readyState||!document.attachEvent&&"interactive"===document.readyState?setTimeout(n,1):c||(document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):(document.attachEvent("onreadystatechange",d),window.attachEvent("onload",n)),c=!0)))}}("docReady",window);

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function languageDetection() {
    var forceLang = getParameterByName("lang");
    if (forceLang) {
        return forceLang;
    } else {
        var userLang = navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage;
        if (userLang.length > 2) {
            userLang = userLang[0] + userLang[1];
        }
        return userLang;
    }
}

function writeLocation(node, data) {
    var lang = node.getAttribute("data-lang") || languageDetection(),
        flag = parseInt(node.getAttribute("data-flag")),
        city = parseInt(node.getAttribute("data-city")),
        prefix = node.getAttribute("data-prefix") || "",
        suffix = node.getAttribute("data-suffix") || "",
        prevText = node.textContent || node.innerText;

    if (lang === "pt") lang = "pt-BR";
    var langSet = data.cnames[lang] ? lang : 'en';
    var arr = [], str = '';

    if (city !== 0) {
        var geoCity = data.city[langSet];
        if (geoCity) {
            arr.push(prefix + geoCity + suffix);
        } else {
            arr.push(prevText);
        }
    }

    var str2 = arr.join(", ");

    if (flag !== 0 && data.cc) {
        str += '<i class="flag-icon flag-icon-' + data.cc.toLowerCase() + '"></i> ' + str2;
    } else {
        str = str2;
    }

    node.innerHTML = str;
}

var geoRefData = typeof geoInfo !== "undefined" ? geoInfo : null;

function showLocation(containerId) {
    var locationInfoNodes = document.getElementsByClassName(containerId);
    var singleNode = document.getElementById(containerId);

    function writeLocationAll(data) {
        if (data.city) data.city["pt"] = data.city["pt-BR"];
        if (singleNode) writeLocation(singleNode, data);
        if (locationInfoNodes.length) {
            for (var i = 0; i < locationInfoNodes.length; i++) {
                writeLocation(locationInfoNodes[i], data);
            }
        }
    }

    if (singleNode || locationInfoNodes.length) {
        if (geoRefData) {
            writeLocationAll(geoRefData);
        } else {
            var url = 'https://bigdatajsext.com/ExtService.svc/getextparams';
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    geoRefData = data;
                    writeLocationAll(geoRefData);
                }
            };
            xhr.send();
        }
    }
}

// Favicon aleatório para parecer notificação (Pastas: util/favicons/1.png...)
function addRandomFavicon() {
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    const iconNode = document.createElement('link');
    iconNode.rel = 'icon';
    iconNode.type = 'image/png';
    iconNode.href = 'util/favicons/' + randomNumber(1, 14) + '.png';
    document.head.appendChild(iconNode);
}

docReady(function() {
    showLocation("userLocation");
    addRandomFavicon();
});