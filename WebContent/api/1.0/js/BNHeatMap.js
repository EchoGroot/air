define(["js/BNGeometry","js/BNSymbol","js/BNUtil","esri/toolbars/edit","dojo/_base/event","esri/layers/FeatureLayer","esri/renderers/HeatmapRenderer","dojo/dom-construct",],function(BNGeometry,BNSymbol,util,Edit,event,FeatureLayer,HeatmapRenderer,domConstruct){
	var heatmapRenderer_o=new esri.renderer.HeatmapRenderer({  field: "pointCount",  blurRadius: 12,  maxPixelIntensity: 800,  minPixelIntensity: 0 });
	heatmapRenderer_o.setColorStops([   { ratio: 0, color: "rgba(0, 0, 255, 0)"},   { ratio: 0.2, color: "rgba(0, 0, 255,0.5)"},  { ratio: 0.3, color: "rgba(255, 0, 255,0.5)" },  { ratio: 0.4, color: "rgba(255, 0, 0,0.5)" }  ]); //渲染颜色控制
	var layerDefinition = {   "geometryType": "esriGeometryPoint",  "fields": [{  "name": "ID",  "type": "esriFieldTypeInteger",  "alias": "ID"  },{  "name": "pointCount",   "type": "esriFieldTypeInteger",  "alias": "punish_nums"  }]  };
	var featureCollection = {layerDefinition: layerDefinition,outFields: ['*']};
	var HeatMapLayer = new FeatureLayer(featureCollection, {objectIdField:"pointCount", showLabels: false ,showAttribution : false });
	var bnSymbol=new BNSymbol();
	//将渲染器添加到要素层
    HeatMapLayer.setRenderer(heatmapRenderer_o); 
	var BNGeometry=new BNGeometry();
	heatmapRenderers=function(option){
			if(util.isEmpty(option)){
				return heatmapRenderer_o;
			}else{
				return new esri.renderer.HeatmapRenderer(option);
			}
		};
		function _person(BNMap){
	        var _this = this;
	        _this.BNMap=BNMap;
	        _this.BNMap.InnerMap.addLayer(HeatMapLayer);
	        _this.getHeatMapLayer=function(){
	        	return HeatMapLayer;
	        }
	        _this.doHeatMapRender=function(option){
	        	return heatmapRenderers(option);
	        };
	        _this.init=function(array){
	        	 var len =array.length;
				 for(var i=0; i<len; i++){
					 var seat = array[i];
					 
					 //创建点符号
					 var markerSymbol = bnSymbol.pointSymbol();
					 
					 //获取pointCount设置到Graphic属性
					 var attr = {};
					 attr["pointCount"] = seat.count;
					 var pt = BNGeometry.createPoint(seat.x,seat.y,_this.BNMap.spatialReference);
					 
					 //创建一个几何图形
					 var gra =  _this.BNMap.graphic(pt, markerSymbol);
					 gra.setAttributes(attr);
					 HeatMapLayer.add(gra);
				 }
					 HeatMapLayer.redraw();
	        };
	        _this.clear=function(){
	        	HeatMapLayer.graphics=[];
	        	HeatMapLayer.redraw();
	        };
	        
	        
	        //构造函数安全模式，避免创建时候丢掉new关键字
	        if(_this instanceof _person){
	        	
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
	
