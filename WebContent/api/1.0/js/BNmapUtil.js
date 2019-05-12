define(["js/BNUtil","esri/tasks/ProjectParameters"],function(util,ProjectParameters){
	function _person(BNMap,Callback,ErrorCallback){
        var _this = this;
        _this.BNMap=BNMap;
        //构造函数安全模式，避免创建时候丢掉new关键字
        if(_this instanceof _person){
        	//根据token 去后台查询资源目录
        	_this.doLatLngTransformMapXY=function(mapPointarr,fromSR1,toSR,Callback,ErrorCallback){
    			var mapPoints=[];
    			for(var i=0;i<mapPointarr.length;i++){
    				var x=mapPointarr[i][0];
    				var y=mapPointarr[i][1];
    				var mapPoint = new esri.geometry.Point(x,y,new esri.SpatialReference(fromSR1));
    				mapPoints[mapPoints.length]=mapPoint;
    			}
    			var params = new ProjectParameters();
    			params.geometries = mapPoints;
    			params.geometryType="esriGeometryPoint";
    		    params.inSR = new esri.SpatialReference(fromSR1);
    		    params.outSR = toSR
    			params.transformForward=false;
    		    _this.BNMap.geometryServices.project(params).then(Callback,ErrorCallback);
    		};
    		if(util.isNotEmpty(Callback)){
        		Callback(_this);
        	}
        	return _this;
        		
        }else{
        	if(util.isNotEmpty(Callback)){
        		Callback(new _person());
        	}	
        	
            return new _person();
        }
    }
	_person.prototype = {
	        constructor: _person,
	        drink: "sd",
	    };
	    return _person;

});


