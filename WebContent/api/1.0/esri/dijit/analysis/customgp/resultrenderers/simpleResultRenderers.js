// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/analysis/customgp/resultrenderers/simpleResultRenderers","dojo/_base/declare dojo/_base/html ../BaseResultRenderer ./FeatureSetRenderer ./RecordSetRenderer ./ResultImageLayerRenderer".split(" "),function(b,c,d,e,f,g){var a={};a.UnsupportRenderer=b(d,{baseClass:"jimu-gp-resultrenderer-base jimu-gp-renderer-unsupport",postCreate:function(){this.inherited(arguments);c.setAttr(this.domNode,"innerHTML",this.message)}});a.SimpleResultRenderer=b(d,{baseClass:"jimu-gp-resultrenderer-base jimu-gp-renderer-simple",
postCreate:function(){this.inherited(arguments);c.setAttr(this.domNode,"innerHTML",this.message)}});a.ErrorResultRenderer=b(d,{baseClass:"jimu-gp-resultrenderer-base jimu-gp-renderer-error",postCreate:function(){this.inherited(arguments);c.setAttr(this.domNode,"innerHTML",this.message)}});a.RecordSetTable=f;a.DrawResultFeatureSet=e;a.AddResultImageLayer=g;return a});