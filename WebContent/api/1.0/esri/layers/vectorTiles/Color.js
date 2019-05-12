// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/Color",["require","exports","esri/Color"],function(d,e,c){return function(){function b(a){return new c(a)}b.toUnitRGBA=function(a){return[a.r/255,a.g/255,a.b/255,null!=a.a?a.a:1]};return b}()});