// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/utils/DnDUtil",["dojo/on"],function(c){return{addNoDragClickHandler:function(m,f,a){var g=a&&a.tolerance||0,e,b,d=c(m,"mousedown",function(a){b&&b.remove();var d=a.clientX,h=a.clientY,k;e=c(document.body,"mousemove",function(l){var a=l.clientY;if(0<Math.abs(l.clientX-d)||0<Math.abs(a-h))k=!0});b=c.once(document.body,"mouseup",function(a){e.remove();var b=a.clientX,c=a.clientY;!k&&Math.abs(b-d)<=g&&Math.abs(c-h)<=g&&f&&f(a)})});return{remove:function(){e&&e.remove();
b&&b.remove();d&&d.remove()}}}}});