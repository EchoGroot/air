define([
        "js/BNUtil",
        "dojo/parser", 
        "dojo/ready",
        "dojo/_base/array",
        "esri/Color",
        "dojo/dom-style",
        "dojo/query",
        "esri/map", 
        "esri/request",
        "esri/graphic",
        "esri/geometry/Extent",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/PictureMarkerSymbol",
        "esri/renderers/ClassBreaksRenderer",
        "esri/layers/GraphicsLayer",
        "esri/SpatialReference",
        "esri/dijit/PopupTemplate",
        "esri/geometry/Point",
        "esri/geometry/webMercatorUtils",
        "extras/ClusterLayer",
        "dijit/layout/BorderContainer", 
        "dijit/layout/ContentPane", 
        "dojo/domReady!"
      ], function(
        util,parser, ready, arrayUtils, Color, domStyle, query,
        Map, esriRequest, Graphic, Extent,
        SimpleMarkerSymbol, SimpleFillSymbol, PictureMarkerSymbol, ClassBreaksRenderer,
        GraphicsLayer, SpatialReference, PopupTemplate, Point, webMercatorUtils,
        ClusterLayer
      ){
		var options=null;
		
		function _person(BNMap){
	        var _this = this;
	        _this.BNMap=BNMap;
	        //构造函数安全模式，避免创建时候丢掉new关键字
	        if(_this instanceof _person){
	        	_this.init=function(option,name,error){
	        	options=option;
	        	var layer=_this.BNMap.getLayer(name);
	        	layer.hide();
	        	if(util.isNotEmpty(layer)){
	        		var photos = esriRequest({
	                    url: ""+layer.url+"/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&gdbVersion=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=&f=pjson",
	                    handleAs: "json"
	                  });
	        	 photos.then(addClusters, error);
	        	}else{
	        		error({"message":"没有找到这个id或名称的专题服务"});
	        	}
	        	};
	        	_this.clusterLayer=null;
	        	addClusters=function(resp){
	        		var photoInfo = {};
	                photoInfo.data = arrayUtils.map(resp.features, function(p) {
	                  var latlng = new  Point(parseFloat(p.geometry.x), parseFloat(p.geometry.y), _this.spatialReference);
	                  var webMercator = webMercatorUtils.geographicToWebMercator(latlng);
	                  if(util.isNotEmpty(options.attributes)){
	                	  var attributes ={};
	                	  for(var i=0;i<options.attributes.length;i++){
	                		  attributes[options.attributes[i].cName]=p.attributes[options.attributes[i].eName];
		                  }
	                  }else{
	                	  return null;
	                  }
	                  return {
	                    "x": p.geometry.x,
	                    "y": p.geometry.y,
	                    "attributes": attributes,
	                    
	                  };
	                });
	                 _this.clusterLayer = new ClusterLayer({
	                  "data": photoInfo.data,
	                  "distance": options.distance,
	                  "id": "clusters",
	                  "labelColor": "#fff",
	                  "labelOffset": 10,
	                  "resolution": _this.BNMap.getExtent().getWidth() / map.width,
	                  "singleColor": "#888",
	                  "spatialReference": _this.spatialReference
	                 
	                });
	                var defaultSym = new SimpleMarkerSymbol().setSize(4);
	                var renderer = new ClassBreaksRenderer(defaultSym, "clusterCount");
	                if(util.isNotEmpty(options.bak)){
	                	for(var i=0;i<options.bak.length;i++){
	                		  renderer.addBreak(options.bak[i].minCount,options.bak[i].maxCount,options.bak[i].symbol);
	                	}
	                }
	                 _this.clusterLayer.setRenderer(renderer);
	                _this.BNMap.addGraphicsLayer( _this.clusterLayer);
	        	};
			}else{
				            return new _person();
				        };
				        
	    			}
				_person.prototype = {
				        constructor: _person,
				        drink: "water",
				    };
		return _person;
		
		
	});
	
