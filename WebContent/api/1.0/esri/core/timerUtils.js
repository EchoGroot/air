// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/core/timerUtils",[],function(){function d(c){var b,a=c.length;for(b=0;b<a;b++)c[b]()}var a={LOW:1,HIGH:2},e,b={};b[a.LOW]=[];b[a.HIGH]=[];var f=function(){clearTimeout(e);e=null;var c=b[a.HIGH];b[a.HIGH]=[];d(c);c=b[a.LOW];b[a.LOW]=[];d(c)};return{priority:a,callbackQueue:b,setTimeout:function(c,a){var d=[a,b[a].push(c)-1];e||(e=setTimeout(f,0));return d},clearTimeout:function(a){a&&b[a[0]].splice(a[1],1)}}});