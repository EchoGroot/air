// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/charts/chartUtils/plots/ClusteredColumns",["dojo/_base/declare","./_ClusteredColumnsBase"],function(h,k){return h(k,{_drawColumn:function(a,c,b,d,g,e,f){d.series.showColumnBarBackground&&this.createRect(f,a,{x:b.x,y:e.t,width:b.width,height:g.height-e.t-e.b}).setFill(d.series.columnBarBackgroundColor);c=this._plotFill(d.series.fill,g,e);c=this._shapeFill(c,b);a=this.createRect(f,a,b).setFill(c).setStroke(d.series.stroke);f.dyn.fill=a.getFill();f.dyn.stroke=
a.getStroke();return{shape:a,rect:b}}})});