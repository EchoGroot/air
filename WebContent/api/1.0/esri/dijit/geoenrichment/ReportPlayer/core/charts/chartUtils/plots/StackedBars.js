// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/charts/chartUtils/plots/StackedBars",["dojo/_base/declare","dojox/charting/plot2d/StackedBars","./labelsRendering/_BarsLabelRenderingFix"],function(c,e,d){return c([e,d],{_renderInside:function(a,c,e,b,d){x=b.x+b.width-this.opt.labelOffset;y=b.y+a.box.h/a.numRows+(b.height-a.box.h)/2-2;this.renderLabel(c,x,y,a.text,d,!0,"end")}})});