// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/infographics/infographicUtils/InfographicJsonUtil",["esri/dijit/geoenrichment/config","esri/dijit/geoenrichment/utils/ArrayUtil"],function(d,e){var b={getDefaultLevels:function(){var a=d.levels.slice();a.push(d.highestLevel);return a},getLevels:function(a){a=a.levels&&a.levels.length?a.levels:b.getDefaultLevels();return e.removeDuplicates(a)},getSubLevels:function(a){a=b.getLevels(a);a.pop();return a},getHighestLevel:function(a){a=b.getLevels(a);
return a[a.length-1]},setLevels:function(a,c){c=e.removeDuplicates(c||[]);a.levels=c.length?c:b.getDefaultLevels()}};return b});