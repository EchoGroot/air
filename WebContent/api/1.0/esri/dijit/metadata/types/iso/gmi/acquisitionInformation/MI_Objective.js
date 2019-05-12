// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/types/iso/gmi/acquisitionInformation/templates/MI_Objective.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/AbstractObject" data-dojo-props\x3d"target:\'gmi:MI_Objective\',minOccurs:0"\x3e\r\n  \r\n    \x3c!-- \r\n      http://www.isotc211.org/2005/gmi/acquisitionInformation.xsd\r\n      \x3cxs:sequence\x3e\r\n        \x3cxs:element name\x3d"identifier" type\x3d"gmd:MD_Identifier_PropertyType" maxOccurs\x3d"unbounded"/\x3e\r\n        \x3cxs:element name\x3d"priority" type\x3d"gco:CharacterString_PropertyType" minOccurs\x3d"0"/\x3e\r\n        \x3cxs:element name\x3d"type" type\x3d"gmi:MI_ObjectiveTypeCode_PropertyType" minOccurs\x3d"0" maxOccurs\x3d"unbounded"/\x3e\r\n        \x3cxs:element name\x3d"function" type\x3d"gco:CharacterString_PropertyType" minOccurs\x3d"0" maxOccurs\x3d"unbounded"/\x3e\r\n        \x3cxs:element name\x3d"extent" type\x3d"gmd:EX_Extent_PropertyType" minOccurs\x3d"0" maxOccurs\x3d"unbounded"/\x3e\r\n        \x3cxs:element name\x3d"pass" type\x3d"gmi:MI_PlatformPass_PropertyType" minOccurs\x3d"0" maxOccurs\x3d"unbounded"/\x3e\r\n        \x3cxs:element name\x3d"sensingInstrument" type\x3d"gmi:MI_Instrument_PropertyType" minOccurs\x3d"0" maxOccurs\x3d"unbounded"/\x3e\r\n        \x3cxs:element name\x3d"objectiveOccurrence" type\x3d"gmi:MI_Event_PropertyType" maxOccurs\x3d"unbounded"/\x3e\r\n      \x3c/xs:sequence\x3e\r\n     --\x3e\r\n     \r\n     \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Tabs"\x3e\r\n     \r\n      \x3c!-- identification section --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Section"\r\n          data-dojo-props\x3d"showHeader:false,label:\'${i18nIso.MI_Objective.sections.identification}\'"\x3e\r\n\r\n        \x3c!-- identifier --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/ObjectReference"\r\n          data-dojo-props\x3d"target:\'gmi:identifier\',maxOccurs:\'unbounded\',label:\'${i18nIso.MI_Objective.identifier}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmd/identification/SimpleMD_Identifier"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \r\n        \x3c!-- priority - priority applied to the target --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n          data-dojo-props\x3d"target:\'gmi:priority\',minOccurs:0,label:\'${i18nIso.MI_Objective.priority}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/GcoElement" data-dojo-props\x3d"target:\'gco:CharacterString\'"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \r\n        \x3c!-- type - collection technique for the objective --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/CodeListReference"\r\n          data-dojo-props\x3d"target:\'gmi:type\',minOccurs:0,maxOccurs:\'unbounded\',\r\n            label:\'${i18nIso.MI_ObjectiveTypeCode.caption}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmi/acquisitionInformation/MI_ObjectiveTypeCode"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \r\n        \x3c!-- function - role or purpose performed by or activity performed at the objective --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n          data-dojo-props\x3d"target:\'gmi:function\',minOccurs:0,maxOccurs:\'unbounded\',label:\'${i18nIso.MI_Objective.sFunction}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/GcoElement" data-dojo-props\x3d"target:\'gco:CharacterString\'"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- extent section --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Section"\r\n          data-dojo-props\x3d"showHeader:false,label:\'${i18nIso.MI_Objective.sections.extent}\'"\x3e\r\n          \r\n        \x3c!-- extent --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/ObjectReference"\r\n          data-dojo-props\x3d"target:\'gmi:extent\',minOccurs:0,maxOccurs:\'unbounded\',label:\'${i18nIso.MI_Objective.extent}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/AbstractObject" data-dojo-props\x3d"target:\'gmd:EX_Extent\',minOccurs:0"\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmd/extent/GeographicElement"\x3e\x3c/div\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmd/extent/TemporalElement"\x3e\x3c/div\x3e\r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- pass section \r\n      \x3cdiv data-dojo-type\x3d"gxe/form/Section" \r\n          data-dojo-props\x3d"showHeader:false,label:\'${i18nIso.MI_Objective.sections.pass}\'"\x3e\r\n        \x3cdiv data-dojo-type\x3d"gxe/form/iso/ObjectReference"\r\n          data-dojo-props\x3d"target:\'gmi:pass\',minOccurs:0,maxOccurs:\'unbounded\',label:\'${i18nIso.MI_Objective.pass}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"gxe/types/iso/gmi/acquisitionInformation/MI_PlatformPass"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n      --\x3e\r\n      \r\n      \x3c!-- sensingInstrument section --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Section"\r\n          data-dojo-props\x3d"showHeader:false,label:\'${i18nIso.MI_Objective.sections.sensingInstrument}\'"\x3e\r\n      \r\n        \x3c!-- sensingInstrument (allow MI_Instrument references) --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/ObjectReference"\r\n          data-dojo-props\x3d"target:\'gmi:sensingInstrument\',minOccurs:0,maxOccurs:\'unbounded\',\r\n            label:\'${i18nIso.MI_Objective.sensingInstrumentReference}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Attribute" data-dojo-props\x3d"target:\'xlink:href\',showHeader:false"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- objectiveOccurrence section --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Section"\r\n          data-dojo-props\x3d"showHeader:false,label:\'${i18nIso.MI_Objective.sections.objectiveOccurrence}\'"\x3e\r\n      \r\n        \x3c!-- objectiveOccurrence - event or events associated with objective completion --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/ObjectReference"\r\n          data-dojo-props\x3d"target:\'gmi:objectiveOccurrence\',maxOccurs:\'unbounded\',\r\n            label:\'${i18nIso.MI_Objective.objectiveOccurrence}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmi/acquisitionInformation/MI_Event"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \r\n    \x3c/div\x3e    \r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/iso/gmi/acquisitionInformation/MI_Objective","dojo/_base/declare dojo/_base/lang dojo/has ../../../../base/Descriptor ../../../../form/Attribute ../../../../form/Element ../../../../form/Section ../../../../form/Tabs ../../../../form/iso/AbstractObject ../../../../form/iso/CodeListReference ../../../../form/iso/GcoElement ../../../../form/iso/ObjectReference ../../gmd/identification/SimpleMD_Identifier ../../gmd/extent/GeographicElement ../../gmd/extent/TemporalElement ./MI_ObjectiveTypeCode ./MI_Event dojo/text!./templates/MI_Objective.html ../../../../../../kernel".split(" "),
function(a,b,c,d,g,h,k,l,m,n,p,q,r,t,u,v,w,e,f){a=a(d,{templateString:e});c("extend-esri")&&b.setObject("dijit.metadata.types.iso.gmi.acquisitionInformation.MI_Objective",a,f);return a});