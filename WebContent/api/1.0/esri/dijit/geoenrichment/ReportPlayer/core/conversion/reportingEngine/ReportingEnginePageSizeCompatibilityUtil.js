// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/conversion/reportingEngine/ReportingEnginePageSizeCompatibilityUtil",["../../supportClasses/DocumentOptions"],function(c){var b={},e={a4:1,letter:1};b.getReportingEnginePageSize=function(a,b){if(e[a])return a;var d=c.SIZE_TYPE_TO_DIM_HASH[a]&&c.SIZE_TYPE_TO_DIM_HASH[a][b];return d?c.combineCustomSizeString(d.w,d.h):a};return b});