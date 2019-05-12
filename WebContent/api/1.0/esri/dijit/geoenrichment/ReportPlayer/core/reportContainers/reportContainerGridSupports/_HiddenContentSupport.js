// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/reportContainers/reportContainerGridSupports/_HiddenContentSupport",["dojo/_base/declare"],function(b){return b(null,{collapseContent:function(){this._grids.forEach(function(a){a.collapseContent()});this._syncFillerContainer()},hasHiddenContent:function(){return this._grids.some(function(a){return a.hasHiddenContent()})},resizeRowHeightToShowCellsContent:function(){var a;this._grids.forEach(function(b){a=b.resizeRowHeightToShowCellsContent()||a});
return a}})});