define([
        "js/BNUtil"], function(util){
		 
		
		function _person(BNMap){
	        var _this = this;
	        _this.BNMap=BNMap;
	        _this.InterestList=null; //兴趣点集合
	        _this.routePlanningLayer=null;
	        _this.routePlanningLayer=_this.BNMap.creatGraphicsLayer({id:"routePlanning"});
	        _this.BNMap.addGraphicsLayer(_this.routePlanningLayer);
	        //构造函数安全模式，避免创建时f候丢掉new关键字
	        if(_this instanceof _person){
	        	_this.init=function(name1,name2){
	        		//协议
					var protocol = window.location.protocol;
					//端口
					var host = window.location.host;
	        		$.ajax({
			            async : false,
			            url : ""+protocol+"//"+host+"/AGSP/agsp_pathPlan_init.json",
			            type : "get",
			            dataType : "jsonp", // 返回的数据类型，设置为JSONP方式
			            jsonp : 'callback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
			            jsonpCallback: 'handleResponse', //设置回调函数名
			            success: function(result, status, xhr){
			                _this.InterestList=result.spotsInfo;
	        				 if(util.isNotEmpty(name1) || util.isNotEmpty(name2)){
	        					 var html="";
	        					 for(var i=0;i<result.spotsInfo.length;i++){
	        						 html+="<option value=\""+bNRoutePlanning.InterestList[i].coords.name+"\">"+bNRoutePlanning.InterestList[i].coords.name+"</option>";
		        				 }
	        					 $("#"+name1).html(html);
	        					 $("#"+name2).html(html);
	        				 }
	        				return result;
			            }
			        });
	        	};
	        	_this.query=function(name1,name2,type,symbol){
					//协议
					var protocol = window.location.protocol;
					//端口
					var host = window.location.host;
	        		$.ajax({
			            async : false,
			            url : ""+protocol+"//"+host+"/AGSP/agsp_pathPlan_plan.json",
			            type : "get",
			            dataType : "jsonp", // 返回的数据类型，设置为JSONP方式
			            jsonp : 'callback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
			            jsonpCallback: 'handleResponse', //设置回调函数名
			            data:{start:name1,end:name2},
			            success: function(result, status, xhr){
	        				for(var i=0;i<result.path.points.length;i++){
	        					 var polylineJson = {
	        							    "paths":[result.path.points[i]],
	        							    "spatialReference":_this.BNMap.spatialReference
	        							  };
	        				var point=new esri.geometry.Polyline(polylineJson);
	        				if(util.isNotEmpty(symbol)){
	        					var graphic=_this.BNMap.graphic(point,symbol);
	        					_this.routePlanningLayer.add(graphic);
	        				}else{
	        					var symbols=new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new esri.Color([255, 0, 0]), 2);
	        					var graphic=_this.BNMap.graphic(point,symbols);
	        					_this.routePlanningLayer.add(graphic);
	        				}
	        				}
							if(type == "start"){
								//导航开始点
								var startPoint = new esri.geometry.Point(result.path.points[0][result.path.points[0].length-1][0],result.path.points[0][result.path.points[0].length-1][1],_this.BNMap.spatialReference);
								var startSymbols = new esri.symbol.PictureMarkerSymbol("http://"+localhostApi+"/api/img/GreenPin1LargeB.png",32,32);
								var startgraphic=_this.BNMap.graphic(startPoint,startSymbols);
								_this.routePlanningLayer.add(startgraphic);
							}else if(type == "pass"){
								//导航途径点
								var passPoint = new esri.geometry.Point(result.path.points[0][0][0],result.path.points[0][0][1],_this.BNMap.spatialReference);
								var passSymbols = new esri.symbol.PictureMarkerSymbol("http://"+localhostApi+"/api/img/BluePin1LargeB.png",32,32);
								var passgraphic=_this.BNMap.graphic(startPoint,startSymbols);
								_this.routePlanningLayer.add(startgraphic);
							}else if(type == "end"){
								//导航开始点
								var startPoint = new esri.geometry.Point(result.path.points[0][0][0],result.path.points[0][0][1],_this.BNMap.spatialReference);
								var startSymbols = new esri.symbol.PictureMarkerSymbol("http://"+localhostApi+"/api/img/BluePin1LargeB.png",32,32);
								var startgraphic=_this.BNMap.graphic(startPoint,startSymbols);
								_this.routePlanningLayer.add(startgraphic);
								//导航结束点
								var endPoint = new esri.geometry.Point(result.path.points[result.path.points.length-1][0][0],result.path.points[result.path.points.length-1][0][1],_this.BNMap.spatialReference);
								var endSymbols = new esri.symbol.PictureMarkerSymbol("http://"+localhostApi+"/api/img/RedPin1LargeB.png",32,32);
								var endgraphic=_this.BNMap.graphic(endPoint,endSymbols);
								_this.routePlanningLayer.add(endgraphic);
							}else if(type == "single"){
								//导航开始点
								var startPoint = new esri.geometry.Point(result.path.points[0][result.path.points[0].length-1][0],result.path.points[0][result.path.points[0].length-1][1],_this.BNMap.spatialReference);
								var startSymbols = new esri.symbol.PictureMarkerSymbol("http://"+localhostApi+"/api/img/GreenPin1LargeB.png",32,32);
								var startgraphic=_this.BNMap.graphic(startPoint,startSymbols);
								_this.routePlanningLayer.add(startgraphic);
								//导航结束点
								var endPoint = new esri.geometry.Point(result.path.points[result.path.points.length-1][0][0],result.path.points[result.path.points.length-1][0][1],_this.BNMap.spatialReference);
								var endSymbols = new esri.symbol.PictureMarkerSymbol("http://"+localhostApi+"/api/img/RedPin1LargeB.png",32,32);
								var endgraphic=_this.BNMap.graphic(endPoint,endSymbols);
								_this.routePlanningLayer.add(endgraphic);
							}
	        				 //查询结果显示
	        				return result.path.points;
			            }
			        });
	        	};
	        	_this.querys=function(option,options,symbol){
	        		$.ajax({
			            async : false,
			            url : "http://"+localhostApi+"/apiDemo/RoutePlanning/customQuery.do",
			            type : "GET",
			            dataType : "jsonp", // 返回的数据类型，设置为JSONP方式
			            jsonp : 'callback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
			            jsonpCallback: 'handleResponse', //设置回调函数名
			            data:{x:option.x,y:option.y,x1:options.x,y1:options.y,terminal:option.terminal,floor:option.floor,terminal1:options.terminal,floor1:options.floor},
			            success: function(result, status, xhr){
			               
	        				for(var i=0;i<result.points.length;i++){
	        					 var polylineJson = {
	        							    "paths":[result.points[i]],
	        							    "spatialReference":_this.BNMap.spatialReference
	        							  };
	        				var point=new esri.geometry.Polyline(polylineJson);
	        				if(util.isNotEmpty(symbol)){
	        					var graphic=_this.BNMap.graphic(point,symbol);
	        					_this.routePlanningLayer.add(graphic);
	        				}else{
	        					var symbols=new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new esri.Color([255, 0, 0]), 2);
	        					var graphic=_this.BNMap.graphic(point,symbols);
	        					_this.routePlanningLayer.add(graphic);
	        				}
	        				}
	        				 //查询结果显示
	        				return result;
			            }
			        });
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
	
