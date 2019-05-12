// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/utils/htmlToSvg/supportClasses/text/ReplaceUtil",[],function(){var b={collapseMultipleSpaces:function(a){return a.replace(/ {2,}/g," ")},removeReturns:function(a){return b.collapseMultipleSpaces(a.replace(new RegExp(String.fromCharCode(10),"g")," "))}};return b});