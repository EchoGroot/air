// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/infographics/InfographicTypes",["dojo/_base/lang"],function(g){var b={STATIC:"static",ATTACHMENTS:"attachments",AREA_DETAILS:"areaDetails",INTERESTING_FACTS:"interestingFacts"},d={AGE_PYRAMID:"AgePyramid",TAPESTRY:"Tapestry",RELATED_VARS:"RelatedVariables",ONE_VAR:"OneVar"},e={},c;for(c in d)e[d[c]]=!0;g.mixin(b,d);var f={};for(c in b)f[b[c]]=!0;b.isDynamic=function(a){return e[a]};b.isSupported=function(a){return f[a]};b.fixTapestryNameToWidget=
function(a){return"TapestryNEW"===a?"Tapestry":a};b.fixTapestryNameToData=function(a){return"Tapestry"===a?"TapestryNEW":a};return b});