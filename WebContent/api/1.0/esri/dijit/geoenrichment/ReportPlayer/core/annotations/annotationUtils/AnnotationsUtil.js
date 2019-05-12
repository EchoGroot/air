// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/annotations/annotationUtils/AnnotationsUtil",["dojo/dom-style"],function(d){return{alignAnnotationContainer:function(b,e){var c=e&&e.horizontalAlign||"left",f=e&&e.verticalAlign||"top",a={left:"auto",right:"auto",top:"auto",bottom:"auto"};d.set(b.content,a);switch(c){case "left":a.left="0px";break;case "center":var c=b.getWidth(),g=d.get(b.content,"width");a.left=(c-g)/2+"px";break;case "right":a.right="0px"}switch(f){case "top":a.top="0px";break;
case "middle":f=b.getHeight();c=d.get(b.content,"height");a.top=(f-c)/2+"px";break;case "bottom":a.bottom="0px"}d.set(b.content,a)}}});