// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/infographics/infographicUtils/InfographicRenderer",["dojo/dom-construct","../InfographicContainer"],function(c,d){return{createInfographicPage:function(a,e){var b=a.node?c.create("div",null,a.node):void 0,b=new (e||d)(a.creationParams,b);"function"===typeof a.placeFunc&&a.placeFunc(b);b.updateInfographic(a.json);return b}}});