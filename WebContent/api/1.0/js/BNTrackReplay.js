define(["esri/tasks/ProjectParameters","js/BNmapUtil","esri/tasks/query",
     	"esri/tasks/QueryTask","esri/TimeExtent","js/BNUtil"],function(ProjectParameters,BNmapUtil,Query,QueryTask,TimeExtent,util){
	function _person(BNMap){
        var _this = this;
        _this.BNMap=BNMap;
        //构造函数安全模式，避免创建时候丢掉new关键字
        if(_this instanceof _person){
            //共有属性, 方法
           _this.lineLayer=_this.BNMap.creatGraphicsLayer({"id":"lineLayer"});
           _this.pointLayer=_this.BNMap.creatGraphicsLayer({"id":"pointLayer"});
           _this.BNMap.addGraphicsLayer(_this.lineLayer);
           _this.BNMap.addGraphicsLayer(_this.pointLayer);
           _this.playbackData = [];//轨迹回放数据
           _this.isPause = true;
           _this.load=function(id,jsonArray){
           	for(var i=0;i<jsonArray.length;i++){
           			$("#"+id).append("<option value=\""+jsonArray[i].id+"\">"+jsonArray[i].name+"</option>");
           	}
           }

          doLatLngTransformMapXY=function(mapPointarr,fromSR1,toSR,Callback,ErrorCallback){
    			var mapPoints=[];
    			for(var i=0;i<mapPointarr.length;i++){
    				var x=mapPointarr[i][0];
    				var y=mapPointarr[i][1];
    				var mapPoint = new esri.geometry.Point(x,y,fromSR1);
    				mapPoints[mapPoints.length]=mapPoint;
    			}
    			var params = new ProjectParameters();
    			params.geometries = mapPoints;
    			params.geometryType="esriGeometryPoint";
    		    params.inSR = fromSR1;
    		    params.outSR = toSR
    			params.transformForward=false;
    		    _this.BNMap.geometryServices.project(params).then(Callback,ErrorCallback);
    		};
/**
		 * 查询轨迹回放数据
		 */
		queryPlackbackData=function(url, params, successfunc, errorfunc){

			var queryTask = new QueryTask(url);
			var query = new Query();
			//查询where条件
			query.where =params.where;
			//返回属性
			query.outFields = ["*"];
			//排序
			query.orderByFields = params.orderByFields;
			var sdate=new Date(params.startTime);
			var edata=new Date(params.endTime);
			var c=(edata.getTime()-sdate.getTime())/1000/60/60;
			if(c>24){
				errorfunc({"message":"开始时间和结束时间间隔不能大于一天"});
				return;
			}

			//设置查询时间范围
			var timeExtent = new TimeExtent(new Date(params.startTime), new Date(params.endTime));
			query.timeExtent = timeExtent;
			//是否返回几何对象
			query.returnGeometry = true;
			
			//执行查询任务
			queryTask.execute(query, function(result){//成功回调函数
				var data = result.features;
				var len = data.length;
				console.log(len);
				var tArray = new Array(); //先声明一维
				if(data[0].geometry.spatialReference!=_this.BNMap.spatialReference){
				for(var k=0;k<len;k++){ //一维长度为i,i为变量，可以根据实际情况改变
					tArray[k]=new Array(); //声明二维，每一个一维数组里面的一个元素都是一个数组；
					for(var j=0;j<1;j++){ //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；
					tArray[k][0]=""+data[k].geometry.x+""; //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
					tArray[k][1]=""+data[k].geometry.y+""; //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
					 }
					}
				doLatLngTransformMapXY(tArray,data[0].geometry.spatialReference,_this.BNMap.spatialReference,function(data1){
					for(var i=0;i<data.length;i++){
						data[i].geometry=data1[i]
					}	
					if(len>0){
					haveData = true;
					var jianGe = params.lineInterval;
					var paths = [];
					var path = [];
					for(var i=0; i<len; i++){
						var graphic = data[i];
						var geometry = graphic.geometry;
						if(i==0){
							_this.BNMap.InnerMap.centerAt(geometry);
						}
						
						
						
						var time = graphic.attributes.DataTimeSort;
						
						var point = [geometry.x, geometry.y];
						
						if(i+1 < len){
							var g = data[i+1];
							var t = g.attributes.DataTimeSort;
							if(t-time > jianGe*1000){
								paths.push(path);
								path = [];
								path.push(point);
							}else{
								path.push(point);
							}
						}
						var symbol = new esri.symbol.SimpleMarkerSymbol();
						symbol.setColor("blue");
						symbol.setSize(5);
						graphic.symbol = symbol;
						var dt = {graphic: graphic, time: new Date(time).Format("yyyy-MM-dd hh:mm:ss")};
						_this.playbackData.push(dt);
						paths.push(path);
						}
						
						
					}
					
					var lines ={
							geometry:{
								"paths":paths
							},
							"symbol":{
								"color":[255,0,0],
								"width":2,
								"type":"esriSLS",
								"style":"esriSLSSolid"
							}
					};
					var lineGraphic = new esri.Graphic(lines);
					_this.lineLayer.add(lineGraphic);		
									
				});






				}else{

					if(len>0){
					haveData = true;
					var jianGe = params.lineInterval;
					var paths = [];
					var path = [];
					for(var i=0; i<len; i++){
						var graphic = data[i];
						var geometry = graphic.geometry;
						if(i==0){
							_this.BNMap.InnerMap.centerAt(geometry);
						}
						
						
						
						var time = graphic.attributes.DataTimeSort;
						
						var point = [geometry.x, geometry.y];
						
						if(i+1 < len){
							var g = data[i+1];
							var t = g.attributes.DataTimeSort;
							if(t-time > jianGe*1000){
								paths.push(path);
								path = [];
								path.push(point);
							}else{
								path.push(point);
							}
						}
						var symbol = new esri.symbol.SimpleMarkerSymbol();
						symbol.setColor("blue");
						symbol.setSize(5);
						graphic.symbol = symbol;
						var dt = {graphic: graphic, time: new Date(time).Format("yyyy-MM-dd hh:mm:ss")};
						_this.playbackData.push(dt);
						paths.push(path);
						}
						
						
					}
					
					var lines ={
							geometry:{
								"paths":paths
							},
							"symbol":{
								"color":[255,0,0],
								"width":2,
								"type":"esriSLS",
								"style":"esriSLSSolid"
							}
					};
					var lineGraphic = new esri.Graphic(lines);
					_this.lineLayer.add(lineGraphic);






				}
				
				if(successfunc && typeof successfunc=="function"){
					_this.maxCount=len;
					successfunc({"result":data,max:len});
				}
				
			},function(data){//失败回调函数
				if(errorfunc && typeof errorfunc=="function"){
					errorfunc(data);
				}
			});
		},
            _this.query=function(name,options,Callback,ErrorCallback){
            	_this.clear();
            	var url=_this.BNMap.directorys.trackrePlayServices[name].url;
            	queryPlackbackData(url,options,Callback,ErrorCallback);
            }
        _this.minCount=0;
        _this.maxCount=0;
        _this.speed=0;
        _this.playbackTimer=null;
        _this.slider=null;
        _this.sliderTime=null;
         _this.start=function(){
				 _this.playbackTimer = setInterval(function(){
				 	_this.minCount= _this.minCount + 1;
						if(_this.minCount < _this.playbackData.length){
							var data = _this.playbackData[_this.minCount];
							_this.pointLayer.add(data.graphic);
							$("#"+_this.slider+"").val(_this.minCount);
							$("#"+_this.sliderTime+"").html(data.time);
			        }
			        if((_this.minCount+1)>_this.maxCount){
			         		_this.minCount=0;
			         	}
				 }, _this.speed);
			}
			
          _this.clear=function(){
           	_this.lineLayer.clear();
           	_this.pointLayer.clear();
           	if(util.isNotEmpty(_this.playbackTimer)){
				clearTimeout(_this.playbackTimer);
				
           	}
           	_this.minCount=0;
		    _this.maxCount=0;
		    _this.speed=0;
		    _this.playbackTimer=null;
		    _this.playbackData = [];//轨迹回放数据
		    if(util.isNotEmpty(_this.slider)){
				$("#"+_this.slider+"").val(0);
				
           	}
           	if(util.isNotEmpty(_this.sliderTime)){
				$("#"+_this.sliderTime+"").html("");
				
           	}
           }
        	//lineLayer
        	//pointLayer
		/**
 * 日期转字符串
 * @param fmt
 * @returns
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o){
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
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