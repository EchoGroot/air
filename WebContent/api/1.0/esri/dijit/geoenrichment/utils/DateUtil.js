// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/utils/DateUtil",["dojo/date/locale"],function(b){return{getReportFooterDate:function(a){return b.format(a||new Date,{datePattern:"MMMM d, yyyy",selector:"date"})},formatShortDate:function(a){return b.format(a||new Date,{datePattern:"MM/dd/yyyy",selector:"date"})},getFullYear:function(){return(new Date).getFullYear()}}});