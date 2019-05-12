// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/annotations/shape/ShapeRenderer",["dojo/_base/lang","./ShapeContainer"],function(c,d){return{createShapeContainer:function(a){var b=new d(c.mixin({},a.creationParams,{shapeJson:a.json,relativeParent:a.relativeParent}),a.node);"function"===typeof a.placeFunc&&a.placeFunc(b);return b}}});