// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/vectorTiles/RenderBucket",["require","exports","../../core/tsSupport/extendsHelper","../../core/tsSupport/decorateHelper"],function(d,e,g,f){Object.defineProperty(e,"__esModule",{value:!0});d=function(){return function(c){this.type=c}}();e.RenderBucket=d;f=function(c){function b(){var a=c.call(this,2)||this;a.triangleElementStart=0;a.triangleElementCount=0;a.joinStart=0;a.joinCount=0;return a}g(b,c);b.prototype.hasData=function(){return 0<this.triangleElementCount||
0<this.joinCount};return b}(d);e.LineRenderBucket=f;f=function(c){function b(){var a=c.call(this,1)||this;a.triangleElementStart=0;a.triangleElementCount=0;a.outlineElementStart=0;a.outlineElementCount=0;return a}g(b,c);b.prototype.hasData=function(){return 0<this.triangleElementCount||0<this.outlineElementCount};return b}(d);e.FillRenderBucket=f;f=function(c){function b(){var a=c.call(this,3)||this;a.markerPerPageElementsMap=new Map;a.glyphPerPageElementsMap=new Map;a.isSDF=!1;return a}g(b,c);b.prototype.hasData=
function(){return 0<this.markerPerPageElementsMap.size||0<this.glyphPerPageElementsMap.size};return b}(d);e.SymbolRenderBucket=f;d=function(c){function b(){return c.call(this,0)||this}g(b,c);b.prototype.hasData=function(){return!0};return b}(d);e.BackgroundRenderBucket=d});