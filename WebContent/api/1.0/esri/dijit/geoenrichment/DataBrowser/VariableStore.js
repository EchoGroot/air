// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/DataBrowser/VariableStore","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/Deferred dojo/store/util/SimpleQueryEngine dojo/store/util/QueryResults ./DeferredStore ./KeywordFilter".split(" "),function(r,k,g,t,u,v,p,w){return r(null,{categories:null,dataCollections:null,favorites:null,idProperty:"fullName",_data:null,_variables:null,queryEngine:u,constructor:function(){this.categories=new p({syncQuery:k.hitch(this,this._queryCategories)});this.dataCollections=
new p({syncQuery:k.hitch(this,this._queryDataCollections)})},_queryCategories:function(a,b){a=this._cleanUpCountryID(a);var c;"object"==typeof a&&a.dataCollectionID?(c=this.dataCollections.get(a.dataCollectionID),delete a.dataCollectionID,c=c?c.categories:[]):c=this.categories.data;return this.categories.queryEngine(a,b)(c)},_queryDataCollections:function(a,b){a=this._cleanUpCountryID(a);var c;"object"==typeof a&&a.categoryID?(c=this.categories.get(a.categoryID),delete a.categoryID,c=c?c.dataCollections:
[]):c=this.dataCollections.data;return this.dataCollections.queryEngine(a,b)(c)},_cleanUpCountryID:function(a){"object"==typeof a&&(a=k.mixin({},a),"countryID"in a&&delete a.countryID);return a},_clearAllStores:function(){this._data=[];this._variables={};this.categories.setData();this.dataCollections.setData()},synchronize:function(a){return(new t).resolve()},get:function(a){return this._variables[a]||null},getIdentity:function(a){return a&&a[this.idProperty]||null},query:function(a,b){return this._asyncQuery(a,
b)},_asyncQuery:function(a,b,c){return v(p.resolveCallback(c&&c._resolver||this.categories.resolver,a,k.hitch(this,this._syncQuery,a,b,c)))},_syncQuery:function(a,b,c){var d={},e=[c&&c.queryFilter||k.hitch(this,this.queryFilter)];if("function"==typeof a)e.push(a);else{a=a||{};var h,l,f;for(f in a)switch(f){case "countryID":break;case "categoryID":case "dataCollectionID":d[f]=a[f];break;case "searchString":var g=new w(a[f]);e.push(function(a){return g.match(a)});break;case "favorites":var m=a[f];m&&
(m=c&&"undefined"!==typeof c.favorites?c.favorites:this.favorites,e.push(k.hitch(this,function(a){return m&&m.contains&&m.contains(this.getIdentity(a))})));break;case "filters":var q=this._prepareFilterHash(a[f]);q&&e.push(function(a){for(var b in a.filteringTags)if(q[b]||q["*"])return!0;return!1});break;case "additionalData":l=a[f];break;default:h=h||{},h[f]=a[f]}h&&e.push(function(a){for(var b in h){var c=h[b];if(c&&c.test){if(!c.test(a[b],a))return!1}else if(c!=a[b])return!1}return!0})}a=this._composeQuery(e);
return d.dataCollectionID?this._queryDCVariables(d.dataCollectionID,a,b,l):d.categoryID?this._queryCategoryVariables(d.categoryID,a,b,l):this._queryAllVariables(a,b,l)},_queryDCVariables:function(a,b,c,d){var e=this.dataCollections.get(a);!e&&d&&(e=d.getDataCollection(a));return e&&this._query(e.getVisibleVariables(),b,c)||[]},_queryCategoryVariables:function(a,b,c,d){var e=this.categories.get(a);!e&&d&&(e=d.getCategory(a));return e&&this._query(e.data,b,c)||[]},_queryAllVariables:function(a,b,c){return this._query(this._data,
a,b,c&&c.getVariables())},_composeQuery:function(a){return 1==a.length?a[0]:function(b){return g.every(a,function(a){return a(b)})}},queryFilter:function(a){return!a.missedInCategories},_query:function(a,b,c,d){var e=a.length;this._addAdditionalData(a,d);b=this.queryEngine(b,c)(a);a.length=e;return b},_addAdditionalData:function(a,b){g.forEach(b,function(b){b instanceof Array?this._addAdditionalData(a,b):b&&a.push(b)},this)},getPopularVariables:function(a,b,c){return a&&a.getPopularVariables?a.getPopularVariables(b,
c):[]},getRefineFilters:function(a){var b={};if(a.dataCollectionID){var c=this.dataCollections.get(a.dataCollectionID);!c&&a.additionalData&&(c=a.additionalData.getDataCollection(a.dataCollectionID));c&&c.filters&&this._combineFilters(c.filters,b)}else a.categoryID?(c=this.categories.get(a.categoryID),!c&&a.additionalData&&(c=a.additionalData.getCategory(a.categoryID)),c&&this._collectCategoryFilters(c,b)):this._collectAllFilters(b,a.additionalData);if((a=this._prepareFilterHash(a.filters))&&!a["*"]){var c=
b,b={},d;for(d in c)a[d]&&(b[d]=c[d])}return b},_prepareFilterHash:function(a){"string"==typeof a&&(a=a.split(","));if(!a||!a.length)return null;var b={};g.forEach(a,function(a){b[k.trim(a)]=!0});return b},_collectAllFilters:function(a,b){g.forEach(this.categories.data,function(b){this._collectCategoryFilters(b,a)},this);g.forEach(b&&b.getCategories(),function(b){this._collectCategoryFilters(b,a)},this)},_collectCategoryFilters:function(a,b){g.forEach(a.dataCollections,function(a){this._combineFilters(a.filters,
b)},this)},_combineFilters:function(a,b){for(var c in a){var d=a[c],e=b[d.id];e?this._mergeFilter(e,d):(e=k.mixin({},d),b[d.id]=e)}},_mergeFilter:function(a,b){if(a.type==b.type)if("Range"==a.type){var c=a.rangeMin,d=b.rangeMin;!isNaN(c)&&!isNaN(d)&&c>d&&(a.rangeMin=d);c=a.rangeMax;d=b.rangeMax;!isNaN(c)&&!isNaN(d)&&c<d&&(a.rangeMax=d)}else c=this._arrayToObject(a.enumValues.split(",")),d=b.enumValues.split(","),g.forEach(d,function(b){c[b]||(a.enumValues+=","+b)})},getStates:function(a){return null},
_processDataCollections:function(a,b){b=b||{variables:{},categories:{},dataCollections:[]};g.forEach(a,function(a){if(!this._isDataCollectionDisallowed(a)){var c=a.variables||a.data;a=k.mixin({id:a.id||a.dataCollectionID},a.metadata);g.forEach(a.filters,function(a){this._prepareFilter(a)},this);a.filters=this._arrayToObject(a.filters,"id");a.hash={};a.data=a.variables=[];a.hasVariable=function(a){a=a&&a.id;return!(!a||void 0===this.hash[a.toUpperCase()])};a.getVisibleVariables=function(){return g.filter(this.data,
function(a){return this.hash[a.id.toUpperCase()]},this)};var d=[];g.forEach(a.categories,function(c){(c=this._prepareCategory(c,a,b))&&d.push(c)},this);a.categories=d;g.forEach(c,function(c){this._processVariable(c,a,b)},this);b.dataCollections.push(a)}},this);var c=this.categories.queryEngine({},{sort:[{attribute:"displayOrder",descending:!0}]})(this._objectToArray(b.categories));this.categories.setData(c);this.dataCollections.setData(b.dataCollections);return b},_prepareFilter:function(a){"Range"==
a.type?(a.rangeMin=Number(a.rangeMin),a.rangeMin||(a.rangeMin=0),a.rangeMax=Number(a.rangeMax)):a.enumValues=this._trimArray(a.enumValues.split(",")).join(",")},_prepareCategory:function(a,b,c){var d=Number(a.displayOrder)||0,e=c.categories[a.id];if(e)e.displayOrder=Math.max(d,e.displayOrder);else{e=a;e.hash={};e.data=[];e.dataCollections=[];e.displayOrder=d;e.popularityHash={};var h=this;e.getPopularVariables=function(a,b){this.popularityArray||(this.popularityArray=h._objectToArray(this.popularityHash));
return h._queryPopularVariables(this.popularityArray,a,b)};c.categories[a.id]=e}e.dataCollections.push(b);return e},_queryPopularVariables:function(a,b,c){var d=this,e=c&&c.queryFilter||this.queryFilter;a=this.queryEngine(function(a){return(a=d.get(a.id))?e(a):!1},b)(a);for(b=0;b<a.length;b++)a[b]=this.get(a[b].id);return a},_processVariable:function(a,b,c){var d=a.popularity;void 0!==d&&(delete a.popularity,d=Number(d));b.categories&&b.categories.length||(a.missedInCategories=!0);if(!this._isVariableDisallowed(a)){this._prepareVariable(a);
var e=this._createUniqueVariableId(a).toUpperCase(),h=b.id+"."+a.id,l=this._isVariableAllowedInCategories(a,b),f=c.variables[e];if(f){f.missedInCategories&&!a.missedInCategories&&delete f.missedInCategories;c=f.hideInDataBrowser&&a.hideInDataBrowser;e=f.__sourceDesc||a.__sourceDesc;Object.keys(a.filteringTags).length&&(Object.keys(f.filteringTags).length?(k.mixin(a.filteringTags,f.filteringTags),a.indexBase=f.indexBase||a.indexBase,a[this.idProperty]=f[this.idProperty]):(a[this.idProperty]=h,e=a.__sourceDesc||
f.__sourceDesc),k.mixin(f,a));if(f.__sourceDesc=e)f.description=e;f.hideInDataBrowser=!!c}else f=a,f[this.idProperty]=h,c.variables[e]=f,this._data.push(f);this._registerVariable(f,h);var h=f[this.idProperty],n=h.toUpperCase();b.hasVariable(f)||(b.hash[f.id]=!!l,b.data.push(f));l&&g.forEach(b.categories,function(a){a.hash[n]||(a.hash[n]=f,a.data.push(f));if(d){var b=a.popularityHash[n];b?b.popularity<d&&(b.popularity=d):(b={id:h,popularity:d},a.popularityHash[n]=b)}},this)}},_isDataCollectionDisallowed:function(a){return!a.metadata||
!a.metadata.categories},_isVariableDisallowed:function(a){return!a.fieldCategory},_createUniqueVariableId:function(a){return a.id+"."+a.alias},_registerVariable:function(a,b){this._variables[b]=a},_isVariableAllowedInCategories:function(a,b){return!0},_prepareVariable:function(a){a.id=a.id.toUpperCase();a.units=a.units&&a.units.toUpperCase();a.filteringTags=this._arrayToObject(a.filteringTags,"id");a.percentBase=a.percentBase||null;a.percentBaseAlias=a.percentBaseAlias||null;a.averageBase=a.averageBase||
null;a.averageBaseAlias=a.averageBaseAlias||null;a.indexBase=a.indexBase||null;a.__sourceDesc=a.description;a.description||(a.description=a.alias)},_trimArray:function(a){for(var b=0;b<a.length;b++)a[b]=k.trim(a[b]);return a},_objectToArray:function(a){var b=[],c;for(c in a)b.push(a[c]);return b},_arrayToObject:function(a,b){var c={};g.forEach(a,function(a){c[b?a[b]:a]=a});return c}})});