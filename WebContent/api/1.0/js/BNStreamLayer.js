define([
        "js/BNUtil","esri/renderers/SimpleRenderer","esri/renderers/UniqueValueRenderer","esri/toolbars/draw",
        "esri/layers/StreamLayer",
        "esri/InfoTemplate",
        "esri/graphic",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "dojo/_base/Color",
        "dojo/on",
        "dojo/domReady!"], function(
        		util,SimpleRenderer,UniqueValueRenderer,Draw, StreamLayer, InfoTemplate, Graphic, PictureMarkerSymbol,
                SimpleLineSymbol, Color, on
      ){
        	
		function _person(BNMap){
	        var _this = this;
	        _this.BNMap=BNMap;
	        _this.streamLayerArry=new myMap();
	        if(_this instanceof _person){
	        	
	        	_this.init=function(array){
	        		for(var i=0;i<array.length;i++){
	        			streamLayer = new StreamLayer(BNMap.directorys["flowServices"][array[i]].url, {
	        	          purgeOptions: { displayCount: 10000 },
	        	          infoTemplate: new InfoTemplate("Attributes", "${*}")
	        	        });
	     
	        	        _this.streamLayerArry.put(array[i],streamLayer);
	        	        BNMap.addGraphicsLayer(streamLayer);
	        		}
	        		return _this.streamLayerArry;
	        	};
	        	_this.clear=function(){
	        		for(var i=0;i<_this.streamLayerArry.size();i++){
	        			BNMap.delGraphicsLayer(_this.streamLayerArry.get(_this.streamLayerArry.keys[i]));
	        		}
	        		
	        	};
	        	_this.clear=function(){
	        		BNMap.delGraphicsLayer(_this.streamLayer);
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
	
