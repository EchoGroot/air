// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/dataProviders/supportClasses/tasks/EnrichAreasTask","dojo/_base/declare dojo/_base/lang esri/kernel esri/SpatialReference esri/graphic ../GEUtil esri/dijit/geoenrichment/utils/GeometryUtil".split(" "),function(k,f,l,m,n,p,g){function h(){var a=l.id.credentials[0];return a&&a.token}return k(null,{enrichAreas:function(a){var b={};b.studyAreas=this._analysisAreasToStudyAreas(a.analysisAreas,a.countryID,a.comparisonLevels);a.report?b.analysisVariables=[{itemid:a.report.reportID,
url:a.report.portalUrl,token:h(),outFields:["*"]}]:a.fields&&(b.analysisVariables=a.fields);return this._doRunTask(b,a,"enrich")},createReport:function(a){var b={f:"bin",format:"xml",reportfields:{}};b.report={itemid:a.report.reportID,url:a.report.portalUrl,token:h()};b.studyAreas=this._analysisAreasToStudyAreas(a.analysisAreas,a.countryID);return this._doRunTask(b,a,"createReport")},_analysisAreasToStudyAreas:function(a,b,c){var e=this,d=[];a=a.map(function(a){if(a.geographies&&a.geographies.length)return e._studyAreaFromGeographies(a.geographies,
b,!0);d.push(a.feature);return"feature"});d=this._generalizeFeatures(d);a=a.map(function(a){return"feature"===a?(a=d.shift(),{attributes:f.mixin({},a.attributes),geometry:a.geometry.toJson()}):a});c&&(c=c.map(function(a){return{layer:a}}),a.forEach(function(a){a.comparisonLevels=c}));return a},_generalizeFeatures:function(a,b){b=void 0!==b?b:0;var c=g.needGeneralizeGeometry(a,0<b?3*b:-3,0);c&&(a=a.map(function(a){return new n(a.geometry,a.symbol,a.attributes)}),g.generalizeGeometry(a,c,0));return a},
createFeatureForGeographies:function(a,b){var c={returnGeometry:!0,outSR:new m(102100),studyAreas:[this._studyAreaFromGeographies(a,b.countryID,!0)],dataCollections:["GlobalIntersect"]};return this._doRunTask(c,b,"enrich")},_studyAreaFromGeographies:function(a,b,c){b={sourceCountry:b,layer:null,ids:null};var e=null,d=[];a.forEach(function(a){if(!a||!a.id)throw Error("Wrong geography.");var b=a.levelId;if(b)if(!e)e=b;else if(e!==b)throw Error("Geographies have different level IDs.");d.push(a.id)});
b.layer=e;b.ids=c?[d.join(",")]:d;return b},_doRunTask:function(a,b,c){a=f.mixin({f:"json",useData:{sourceCountry:b.countryID,hierarchy:b.hierarchy||"census"},forStorage:!1},a);for(var e in a){var d=a[e];"object"===typeof d&&(a[e]=JSON.stringify(d))}return p[c](b.geoenrichmentUrl,a)}})});