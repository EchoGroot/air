// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/charts/chartUtils/plots/StackedColumns",["dojo/_base/declare","dojox/charting/plot2d/StackedColumns","./labelsRendering/_ColumnsLabelRenderingFix"],function(b,e,c){return b([e,c],{_renderInside:function(a,b,e,d,c){this.renderLabel(b,d.x+d.width/2,d.y+a.box.h-a.box.h*(a.numRows-1)/2,a.text,c,!0)}})});