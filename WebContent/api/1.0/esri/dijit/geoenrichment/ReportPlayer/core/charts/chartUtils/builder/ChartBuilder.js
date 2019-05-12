// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/charts/chartUtils/builder/ChartBuilder",["esri/dijit/geoenrichment/ReportPlayer/config","../ChartTypes","./_RoundChartBuilder","./_ColumnBarLineChartBuilder","esri/dijit/geoenrichment/utils/ObjectUtil"],function(d,e,b,c,f){return{supportConditionalStyling:function(a){return c.supportConditionalStyling(a)||b.supportConditionalStyling(a)},getChartBuilder:function(a){return e.isRoundChart(a)?b:c},checkSeriesAreValid:function(a){return d.charts.showErrorIfHasUnavailableData?
!a.some(function(a){return a.data.some(function(a){return a.isUnavailableData})}):!0}}});