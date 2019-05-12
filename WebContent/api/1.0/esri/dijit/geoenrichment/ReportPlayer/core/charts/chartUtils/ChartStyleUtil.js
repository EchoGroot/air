// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/charts/chartUtils/ChartStyleUtil",["dojo/_base/lang"],function(f){var a={},g={left:1,right:1,top:1,bottom:1,width:1,height:1,fontSize:1};a.getStyleObjWithUnits=function(a,b){b=b||"px";var c=f.mixin({},a),d;for(d in c)if(g[d]){var e=c[d];!e||"string"===typeof e&&-1!==e.indexOf(b)||(c[d]=e+b)}return c};return a});