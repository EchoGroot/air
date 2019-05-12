// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/utils/htmlToSvg/supportClasses/TransformUtil",["dojo/dom-geometry","dojo/dom-style","dojo/sniff"],function(k,e,f){function g(){return f("safari")||f("webkit")?"webkitTransform":"transform"}function l(){return f("safari")||f("webkit")?"webkitTransformOrigin":"transformOrigin"}var m={getBox:function(a,d){var c=h.disableTransform(a,d),b=k.position(a);h.restoreTransform(c);return b}},h={disableTransform:function(a,d){function c(a){var c=e.get(a,g());c&&"none"!==c&&(a.style[g()]=
"none",b=b||[],b.push({node:a,transform:c}))}var b;(function(){c(a);for(var b=d;b&&(b.style.transform||b.style.parentHasTransform);)c(b.node),b=b.parentVs})();return b&&{restoreInfos:b}},restoreTransform:function(a){a&&a.restoreInfos.forEach(function(a){a&&e.set(a.node,g(),a.transform)})}},n={getTransform:function(a,d,c){if(c=this._getInheritedTransform(d,c)){if(-1!==c.indexOf("translate"))return c;var b=k.position(d),f=e.get(d,l());e.set(d,l(),-a.x+"px "+-a.y+"px");a=k.position(d);e.set(d,l(),f);
return"translate("+-(a.x+a.w/2-(b.x+b.w/2))+" "+-(a.y+a.h/2-(b.y+b.h/2))+") "+c}},_getInheritedTransform:function(a,d){var c=e.get(a,g());c&&"none"!==c||(c=void 0);for(var b=d;b&&(b.style.transform||b.style.parentHasTransform);)c=b.style.transform||c,b=b.parentVs;return c}};return{measureNode:function(a,d){var c=m.getBox(a,d);return{box:c,transform:n.getTransform(c,a,d)}},disableTransform:h.disableTransform,restoreTransform:h.restoreTransform}});