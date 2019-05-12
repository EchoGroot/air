// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/tasks/geoenrichment/GeoenrichmentTask","../../declare dojo/_base/array dojo/dom-construct ./taskHelper ../FeatureSet ./EnrichParameters ./ReportParameters ../../urlUtils ../../IdentityManager ../../geometry/Point ../../geometry/Polygon ../../geometry/Polyline dojo/i18n!../../nls/jsapi".split(" "),function(r,t,h,f,u,l,m,v,w,x,y,z,k){function n(a){this.name="UserError";this.message=a||""}function p(a,b){return a.getAvailableCountries().then(function(a){for(var c=0;c<a.length;c++)if(a[c].id==
b)return a[c].name})}function q(a){a=a.getExtent();return new x((a.xmin+a.xmax)/2,(a.ymin+a.ymax)/2,a.spatialReference)}k=k.geoenrichment.task.GeoenrichmentTask;n.prototype=Error.prototype;return r("esri.tasks.geoenrichment.GeoenrichmentTask",null,{token:null,url:null,constructor:function(a){this.url=a||v.getProtocolForWebResource()+"//geoenrich.arcgis.com/arcgis/rest/services/World/GeoenrichmentServer"},enrich:function(a){return f.invokeMethod(this,"/Geoenrichment/enrich",function(){a instanceof
l||(a=new l(a));return f.jsonToRest(a.toJson())},function(a){(!a.results||1>a.results.length||!a.results[0].value||!a.results[0].value.FeatureSet||1>a.results[0].value.FeatureSet.length)&&f.throwEmptyResponse();var b={featureSets:[],messages:a.messages};a=a.results[0].value.FeatureSet;for(var c=0;c<a.length;c++)b.featureSets.push(new u(a[c]));return b},"onEnrichComplete","onError")},getAvailableCountries:function(){return f.invokeMethod(this,"/Geoenrichment/Countries",null,function(a){if(a.error)throw a.error;
a=a.countries;for(var b=0;b<a.length;b++){var e=a[b].datasets;delete a[b].datasets;a[b].datasetIDs=e}return a},"onGetAvailableCountriesComplete","onError")},getDataCollections:function(a,b,e,c){var d;b?d="/GetDataCollections/execute":(d="/Geoenrichment/DataCollections",a&&(d+="/"+a));return f.invokeMethod(this,d,function(){var g={suppressNullValues:!0};e&&(g.outFields=0===e.length?"none":JSON.stringify(e));b&&(a&&(g.sourcecountry=a),g.searchtext="id:"+b);c&&(g.addDerivativeVariables=JSON.stringify(c));
return g},function(a){if(a.error)throw a.error;a=a.results||a.dataCollections||a.DataCollections;for(var b=0;b<a.length;b++)a[b]={id:a[b].dataCollectionID,metadata:a[b].metadata,variables:a[b].data};return a},"onGetDataCollectionsComplete","onError")},createReport:function(a){var b=this;w.getCredential(this.url).then(function(e){try{var c=h.create("form",{target:"_blank",action:b.url+"/Geoenrichment/CreateReport",method:"post"});a instanceof m||(a=new m(a));var d=f.jsonToRest(a.toJson());d.f="bin";
d.token=e.token;for(var g in d)d.hasOwnProperty(g)&&h.create("input",{type:"hidden",name:g,value:d[g]},c);h.place(c,document.body);c.submit();h.destroy(c)}catch(A){b.onError(A)}},function(a){b.onError(a)})},getReports:function(a){var b=this;return p(this,a).then(function(a){return f.invokeMethod(b,"/Geoenrichment/Reports/"+a,null,function(a){for(var b=0;b<a.reports.length;b++){var c=a.reports[b].reportID;delete a.reports[b].reportID;a.reports[b].id=c}return a.reports},"onGetReportsComplete","onError")})},
getStandardGeographyLevels:function(a){function b(a){return f.invokeMethod(e,a,null,function(a){a=a.geographyLevels;for(var b=0;b<a.length;b++){var c=a[b];c.id=c.countryID;delete c.countryID;c.name=c.countryName;delete c.countryName;for(var c=c.datasets,e=0;e<c.length;e++){var d=c[e];d.id=d.datasetID;delete d.datasetID;d.geographyLayers=d.levels;delete d.levels}}return a},"onGetStandardGeographyLevelsComplete","onError")}var e=this;return a?p(this,a).then(function(a){return b("/Geoenrichment/StandardGeographyLevels/"+
a)}):b("/Geoenrichment/StandardGeographyLevels")},getServiceLimits:function(){return f.invokeMethod(this,"/Geoenrichment/ServiceLimits",null,function(a){return a.serviceLimits.value},"onGetServiceLimitsComplete","onError")},getCountries:function(a){var b;switch(a.type){case "point":b=a;break;case "polyline":b=a.paths[0];a=new z(a.spatialReference);a.addPath(b);b=q(a);break;case "polygon":b=a.rings[0],a=new y(a.spatialReference),a.addRing(b),b=q(a)}return this.enrich({variables:["GlobalIntersect.*"],
studyAreas:[{geometry:b}],forStorage:!1}).then(function(a){var b=[];a=a.featureSets[0].features;for(var d=0;d<a.length;d++){var e=a[d].attributes.sourceCountry;0>t.indexOf(b,e)&&b.push(e)}if(0===b.length)throw new n(k.noData);return b})},onEnrichComplete:function(a){},onGetAvailableCountriesComplete:function(a){},onGetDataCollectionsComplete:function(a){},onCreateReportComplete:function(a){},onGetReportsComplete:function(a){},onGetStandardGeographyLevelsComplete:function(a){},onGetServiceLimitsComplete:function(a){},
onError:function(a){}})});