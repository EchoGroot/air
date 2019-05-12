// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/themes/ThemeUpdateUtil",["esri/dijit/geoenrichment/utils/ObjectUtil","./ThemeLibrary","./ThemeUtil"],function(f,g,c){return{populateMissingStyles:function(b){if(b){var a=c.getThemeColors(b),d=g.getDefaultTheme({defaultFontFamilty:b.document.fontFamily,defaultFontSize:b.document.fontSize}),e=b.chart.colors.slice();c.applyThemeColorsToTheme(d,a,e);f.populateObject(b,d,!1);a=b.chart;a.colors=e;a.icon=a.icon||lang.clone(b.infographic.staticInfographic.icon);
a.xAxis.lineColor=a.xAxis.lineColor||a.xAxis.axisStyle.color;a.yAxis.lineColor=a.yAxis.lineColor||a.yAxis.axisStyle.color}}}});