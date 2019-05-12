// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/vectorTiles/GlyphSource",["require","exports","../../core/promiseUtils","../../request","../../core/pbf"],function(r,t,m,n,p){var e=function(){function a(b){this._metrics=[];this._bitmaps=[];if(b)for(;b.next();)switch(b.tag()){case 1:for(var d=b.getMessage();d.next();)switch(d.tag()){case 3:for(var c=d.getMessage(),a=void 0,f=void 0,g=void 0,e=void 0,h=void 0,k=void 0,l=void 0;c.next();)switch(c.tag()){case 1:a=c.getUInt32();break;case 2:f=c.getBytes();break;
case 3:g=c.getUInt32();break;case 4:e=c.getUInt32();break;case 5:h=c.getSInt32();break;case 6:k=c.getSInt32();break;case 7:l=c.getUInt32();break;default:c.skip()}a&&(this._metrics[a]={width:g,height:e,left:h,top:k,advance:l},this._bitmaps[a]=f);break;default:d.skip()}break;default:b.skip()}}a.prototype.getMetrics=function(b){return this._metrics[b]};a.prototype.getBitmap=function(b){return this._bitmaps[b]};return a}(),q=function(){function a(){this._ranges=[]}a.prototype.getRange=function(b){return this._ranges[b]};
a.prototype.addRange=function(b,d){this._ranges[b]=d};return a}();return function(){function a(b){this._glyphInfo={};this._baseURL=b}a.prototype.getRange=function(b,d){var c=this._getFontStack(b);if(c.getRange(d))return m.resolve();var a=256*d,f=a+255,a=this._baseURL.replace("{fontstack}",b).replace("{range}",a+"-"+f);return n(a,{callbackParamName:"callback",responseType:"array-buffer"}).then(function(b){c.addRange(d,new e(new p(new Uint8Array(b.data),new DataView(b.data))))}).otherwise(function(){c.addRange(d,
new e)})};a.prototype.getGlyph=function(b,a){var c=this._getFontStack(b);if(c){var d=Math.floor(a/256);if(!(256<d)&&(c=c.getRange(d)))return{metrics:c.getMetrics(a),bitmap:c.getBitmap(a)}}};a.prototype._getFontStack=function(a){var b=this._glyphInfo[a];b||(b=this._glyphInfo[a]=new q);return b};return a}()});