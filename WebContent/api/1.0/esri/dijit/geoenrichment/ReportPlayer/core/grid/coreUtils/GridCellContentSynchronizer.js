// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/grid/coreUtils/GridCellContentSynchronizer",["./GridDataUtil","../../supportClasses/templateJsonUtils/fieldInfo/FieldInfoBuilder"],function(d,e){return{syncParentFieldInfoWithElementState:function(a,b){if(a&&b){var c=d.getFieldInfo(a);c&&(c.isChart||(c.isImage?d.setFieldInfo(a,e.createFieldInfoFromImage(b.toJson(),b.imageTriggerJson)):c.isShape?d.setFieldInfo(a,e.createFieldInfoFromShape(b.toJson())):c.isReportSection?d.setFieldInfo(a,e.createFieldInfoFromSection(b.toJson())):
c.isInfographic&&d.setFieldInfo(a,e.createFieldInfoFromInfographic(b.toJson()))))}}}});