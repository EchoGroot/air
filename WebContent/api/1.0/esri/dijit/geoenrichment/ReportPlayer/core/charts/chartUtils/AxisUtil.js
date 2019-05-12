// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/charts/chartUtils/AxisUtil",[],function(){var f={},c;f.getPrettifyYAxisParameters=function(g,f){if(!c){c=[];for(var a=-20;20>a;a++)c.push(1*Math.pow(10,a)),c.push(2*Math.pow(10,a)),c.push(5*Math.pow(10,a))}for(var b,e,a=0;a<c.length;a++){var d=c[a+1];if(g>c[a]&&g<=d){b=d/5;e=b/5;break}}for(d=a=0;(a+1)*b<=g;)a++;for(;a*b+(d+1)*e<=g;)d++;b={majorTickStep:b,minorTickStep:e,max:a*b+(d+2)*e};f&&(b.includeZero=!0,b.min=.9*-e,b.fixLower="none");return b};
return f});