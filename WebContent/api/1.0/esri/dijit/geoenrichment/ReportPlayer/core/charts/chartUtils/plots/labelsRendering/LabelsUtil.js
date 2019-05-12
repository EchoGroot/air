// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/charts/chartUtils/plots/labelsRendering/LabelsUtil",["dojox/gfx"],function(c){return{getLabelInfo:function(a,b,d){a=a.opt.labelFunc.apply(a,[b,a.opt.fixed,a.opt.precision])||"";b=-1!==a.indexOf("two-row-label\x3d'true'")?2:1;a=a.replace(" two-row-label\x3d'true'","");a=a.replace(" two-row-label\x3d'false'","");return{text:a,numRows:b,box:c._base._getTextBox(a,{font:d.series.font})}}}});