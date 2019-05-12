// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/images/ImageDataHolder",["./DefaultLogo","./DefaultLogoGraphicReportGeneric"],function(d,e){var a={},b={"classiclogo.png":d,"graphiclogo.png":e};a.putImageData=function(c,a){"string"===typeof c&&(b[c.toLowerCase()]=a)};a.getImageData=function(a){return"string"!==typeof a?null:b[a.toLowerCase()]};return a});