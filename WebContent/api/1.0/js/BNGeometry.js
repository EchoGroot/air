define(["js/BNUtil"],function(util){
	BNPoint=function(x,y,spatialReference){ //创建一个点
		return new esri.geometry.Point(x,y,spatialReference);
};
BNPolygon=function(json){
	return new esri.geometry.Polygon(json);
};
BNPolyline=function(json){
	return new esri.geometry.Polyline(json);
};
BNCircle=function(center, options){
	return new esri.geometry.Circle(center, options);
}
		function _person(BNMap){
	        var _this = this;
	        
	        //构造函数安全模式，避免创建时候丢掉new关键字
	        if(_this instanceof _person){
	        	_this.BNMap=BNMap;
	        	_this.createPoint=function(x,y,spatialReference){ //创建点
        			return BNPoint(x,y,spatialReference);
        		};
        		_this.createPolyline=function(json){ //创建线
        			return BNPolyline(json);
        		};
        		_this.createPolygon=function(json){ //创建面
        			return BNPolygon(json);
        		};
        		_this.createCircle=function(center, options){
        			return BNCircle(center, options);
        		}
	        	
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
	
