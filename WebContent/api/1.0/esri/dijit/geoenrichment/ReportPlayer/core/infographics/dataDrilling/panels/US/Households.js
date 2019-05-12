// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/infographics/dataDrilling/panels/US/Households",["../../ChartBuilder","../../../../charts/chartUtils/ChartTypes"],function(b,c){var a={avgHouseholdSize:{fieldInfo:{isInfographic:!0,infographicJson:{type:"OneVar",variables:["KeyGlobalFacts.AVGHHSZ"]}}}};a.householdsWithNoVehicles={states:"n,p",fieldInfo:{isChart:!0,chartJson:b.createChart({type:c.COLUMN,title:"Households with No Vehicles Available (ACS)",points:[{label:"Owner Occupied HHs",fullName:"AtRisk.ACSOVEH0"},
{label:"Renter HHs",fullName:"vehiclesavailable.ACSRVEH0"}]})}};return a});