// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/types/arcgis/form/GeorectPosElement","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has ../../../../../kernel ../../../form/OpenElement dojo/i18n!../../../nls/i18nArcGIS dojo/i18n!../../../nls/i18nBase".split(" "),function(a,e,g,h,k,l,m,n){a=a([l],{postCreate:function(){this.inherited(arguments)},beforeValidateValue:function(a,f,b){if(null!==b&&0!==e.trim(b).length){var c=!0;a=b.split(" ");g.some(a,function(a){try{var b=!1,d=Number(e.trim(a));"undefined"!==typeof d&&
null!==d&&!isNaN(d)&&isFinite(d)&&(b=!0);b||(c=!1)}catch(p){console.error(p),c=!1}if(!c)return!0});c||(a=n.validation.pattern,b=m.hints.listOfDoubles,f.isValid=!1,f.message=a.replace("{label}",f.label).replace("{message}",b))}}});h("extend-esri")&&e.setObject("dijit.metadata.types.arcgis.form.GeorectPosElement",a,k);return a});