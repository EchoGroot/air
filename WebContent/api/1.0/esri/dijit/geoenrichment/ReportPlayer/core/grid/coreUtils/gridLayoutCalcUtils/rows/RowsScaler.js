// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/grid/coreUtils/gridLayoutCalcUtils/rows/RowsScaler",["./RowDataUtil"],function(b){return{recalcRowsToFitHeight:function(a,c){var g=b.recalcGridHeight(a),d=c/g;1!==d&&(a.store.data.forEach(function(e){a.columns.some(function(f,c){if(!a.looseResize&&c)return!0;b.setDataHeight(a,e,f.field,b.getDataHeight(a,e,f.field)*d)})}),b.recalcGridHeight(a))}}});