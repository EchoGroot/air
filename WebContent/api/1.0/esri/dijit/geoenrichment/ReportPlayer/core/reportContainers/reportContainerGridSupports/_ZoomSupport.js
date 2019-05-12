// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/reportContainers/reportContainerGridSupports/_ZoomSupport",["dojo/_base/declare","../containerGridUtils/ZoomUtil"],function(c,a){return c(null,{getZoomInfo:function(){return a.getZoomInfo(this)},setZoomInfo:function(b){a.setZoomInfo(this,b)},zoomIn:function(){a.zoomIn(this)},zoomOut:function(){a.zoomOut(this)},zoomToFitPage:function(){a.zoomToFitPage(this)},zoomToFitPageWidth:function(){a.zoomToFitPageWidth(this)},setZoomPercent:function(b){a.setZoomPercent(this,
b)},setBestZoom:function(){a.setBestZoom(this)},resetZoom:function(){a.reset(this)},onZoomChanged:function(){}})});