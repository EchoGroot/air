// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/core/Error",["require","exports","./tsSupport/extendsHelper","./Message","./lang"],function(a,l,g,h,k){a=function(a){function b(c,d,e){var f=a.call(this,c,d,e)||this;return f instanceof b?f:new b(c,d,e)}g(b,a);b.prototype.toJSON=function(){return{name:this.name,message:this.message,details:k.clone(this.details),dojoType:this.dojoType}};b.fromJSON=function(c){var a=new b(c.name,c.message,c.details);a.dojoType=c.dojoType;return a};return b}(h);a.prototype.type="error";
return a});