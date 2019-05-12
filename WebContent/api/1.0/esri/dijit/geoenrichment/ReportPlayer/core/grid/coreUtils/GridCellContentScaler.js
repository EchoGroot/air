// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/grid/coreUtils/GridCellContentScaler",["./GridDataUtil"],function(f){return{fitContentInsideCell:function(a){var c=f.getFieldInfo(a);if(c&&a.content){var d=a.content,b=a.parentGrid,e=a[b.hasRealBorders?"getContentWidth":"getWidth"](),b=a[b.hasRealBorders?"getContentHeight":"getHeight"]();c.isChart?d.resize(e,b):c.isImage||c.isShape?d.resize({w:e,h:b},a.getFullStyle()):c.isReportSection?(d.setResizedHeight(b,{resizeContentProportionally:!0}),d.setWidth(e,
{resizeContentProportionally:!0})):c.isInfographic&&d.resize(e,b)}}}});