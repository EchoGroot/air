// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/utils/SVGUtil",["dojo/sniff","dojo/dom-construct"],function(g,k){var d={},e;d.getOuterHTML=function(a){if(a.outerHTML)return a.outerHTML;if(!a.parentNode)return"";var d=a.parentNode;e=e||k.create("div",null,document.body);var f=a.nextSibling;a.parentNode.removeChild(a);e.appendChild(a);var b=a.parentNode.innerHTML;if(g("ie")||g("trident")){var c=b.match(/<svg.*?>/)[0],l=c.length,h=c.match(/xmlns=".*?"/g);h&&2===h.length&&(c=c.replace(/xmlns=".*?"/,""),b=c+b.substr(l))}b=
b.replace('"none meet"','"none"');e.removeChild(a);f?f.parentNode.insertBefore(a,f):d.appendChild(a);return b};return d});