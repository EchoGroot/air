// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/annotations/image/ImageRenderer",["dojo/_base/lang","dojo/aspect","./ImageContainer"],function(c,e,d){return{createImageContainer:function(a){var b=new d(c.mixin({},a.creationParams,{imageJson:a.json,relativeParent:a.relativeParent}),a.node);"function"===typeof a.placeFunc&&a.placeFunc(b);return b}}});