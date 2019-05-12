// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
(function(a){a.importScripts&&a.importScripts("./GeometryUtil_base.js");a.addEventListener&&a.addEventListener("message",function(b){var c=b.data.rings;c.forEach(function(a){(new GeometryUtil_base.RingInfo(a)).generalize(b.data.maxAllowableOffset,.8)});a.postMessage&&a.postMessage({rings:c})},!1)})(this);