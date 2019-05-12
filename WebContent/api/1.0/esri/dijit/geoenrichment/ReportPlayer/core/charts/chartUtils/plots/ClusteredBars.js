// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/charts/chartUtils/plots/ClusteredBars",["dojo/_base/declare","./_ClusteredBarsBase"],function(h,k){return h(k,{_drawBar:function(a,c,b,d,g,f,e){d.series.showColumnBarBackground&&this.createRect(e,a,{x:b.x,y:b.y,width:g.width-f.l-f.r,height:b.height}).setFill(d.series.columnBarBackgroundColor);c=this._plotFill(d.series.fill,g,f);c=this._shapeFill(c,b);a=this.createRect(e,a,b).setFill(c).setStroke(d.series.stroke);e.dyn.fill=a.getFill();e.dyn.stroke=
a.getStroke();return{shape:a,rect:b}}})});