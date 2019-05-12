// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/dataProviders/supportClasses/ge/LocalGEChart",["dojo/_base/declare","./LocalGEBase"],function(d,e){return d(e,{_cacheData:!0,constructor:function(a,b){this._initGE(null,b,a.calculatorName)},getFieldValueAt:function(a,b){var c=this.getData().features[b];return c&&c.attributes[a]||0}})});