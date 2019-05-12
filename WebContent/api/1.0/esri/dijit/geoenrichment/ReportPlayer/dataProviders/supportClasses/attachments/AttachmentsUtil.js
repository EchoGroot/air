// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/dataProviders/supportClasses/attachments/AttachmentsUtil",[],function(){return{getFeatureAttachmentInfos:function(b){var a=b.getLayer();if(a&&a.hasAttachments&&a.queryAttachmentInfos)return a.queryAttachmentInfos(b.attributes[a.objectIdField])}}});