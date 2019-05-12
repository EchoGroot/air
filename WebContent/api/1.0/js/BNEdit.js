define(["js/BNUtil","esri/toolbars/edit","dojo/_base/event"],function(util,Edit,event){
		var c=0;
		var editToolbar=null;
		var editType=null;
		function _person(BNMap){
	        var _this = this;
	        _this.BNMap=BNMap;
	        _this.editToolbar = new Edit(BNMap.InnerMap);
	        
	        //构造函数安全模式，避免创建时候丢掉new关键字
	        if(_this instanceof _person){
	        	_this.start=function(type){
		        	editType=type;
		        	_this.editToolbar = new Edit(BNMap.InnerMap);
		        };
		        _this.startOperation=function(even,Callback,ErrorCallback){
		        	if(util.isNotEmpty(editType)){
		        		
		        		switch(editType){
		        		case "add":
		        			_this.BNMap.startDraw(even,Callback);
		        			break;
		        		case "edit":
		        			event.stop(even);
		        					_this.editToolbar.activate(Edit.EDIT_VERTICES | Edit.MOVE | Edit.ROTATE | Edit.SCALE, even.graphic);
		        					//_this.editToolbar.onDeactivate=null;
		        					if(util.isNotEmpty(Callback)){
		        						_this.editToolbar.on("deactivate",Callback);
		        					}
		        			break;
		        		case "delete":
		        			Callback();
		        			break;
		        		}
		        	}else{
		        		ErrorCallback({"message":"请先开始编辑操作"});
		        	}
		        };
		        _this.endOperation=function(name,g,option,Callback,ErrorCallback){
		        	if(util.isNotEmpty(editType)){
		        		switch(editType){
			        		case "add":
				        			if(util.isNotEmpty(option)){
				        				var o=new Object();
				        				for( os in option){
				        					o[os]=option[os];
				        				}
				        				g.setAttributes(o);
				        			}
				        			var layer=_this.BNMap.getLayer(name);
				        			layer.applyEdits([g], null, null,function(data){
				        				// layer.refresh();
										return Callback(data);
									},function(){
										ErrorCallback({"message":"新增失败"});
									});
			        			break;
			        		case "edit":
			        			var layer=_this.BNMap.getLayer(name);
			        			layer.applyEdits(null, [g], null,function(editResults){
			        				// layer.refresh();
			        				Callback(editResults);
			        			},function(data){
			        				ErrorCallback(data);
			        			});
			        			break;
			        		case "delete":
			        			var layer=_this.BNMap.getLayer(name);
			        			layer.applyEdits(null, null, [g],function(editResults){
			        				//layer.refresh();
			        				Callback(editResults);
			        			},function(data){
			        				ErrorCallback(data);
			        			});
			        			break;
			        	}
		        	}else{
		        		ErrorCallback({"message":"请先开始编辑操作"});
		        	}
		        	
		        };
	        		
	        	
	        	_this.operateRest=function(name,operateType,geoJson,Callback,ErrorCallback){//在线REST编辑新增	
					geoJson=(operateType=="deletes"?geoJson:JSON.stringify(geoJson));
					 $.ajax({//通过jsonp跨域请求
			            url : "http://"+localhostApi+"/apiDemo/featureOperate/operate.do",
			            data:{
			            	name:name,
			            	token:token,
			            	operateType:operateType,
							geoJson:geoJson
			            },
			            async : false,
			            type : "GET",
			            dataType : "jsonp", // 返回的数据类型，设置为JSONP方式
			            jsonp : 'callback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
			            jsonpCallback: 'handleResponse', //设置回调函数名
			            success: function(result, status, xhr){
						  var layer=_this.BNMap.getLayer(name);
			             
						 // layer.refresh();
						  return Callback(result);
			            }
			        }); 
				};

			
	        	_this.queryRest=function(name,operateType,outFilds,operateStr,Callback,ErrorCallback){//在线REST查询	
					//geoJson=(operateType=="deletes"?geoJson:JSON.stringify(geoJson));
					 $.ajax({//通过jsonp跨域请求
			            url : "http://"+localhostApi+"/apiDemo/featureOperate/query.do",
			            data:{
			            	name:name,
			            	token:token,
			            	operateType:operateType,
							outFilds:outFilds,
							operateStr:operateStr,
			            },
			            async : false,
			            type : "GET",
			            dataType : "jsonp", // 返回的数据类型，设置为JSONP方式
			            jsonp : 'callback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
			            jsonpCallback: 'handleResponse', //设置回调函数名
			            success: function(result, status, xhr){
						  //var layer=_this.BNMap.getLayer(name);
			             
						 // layer.refresh();
						  return Callback(result);
			            }
			        }); 
				};













	        		_this.stop=function(){
	        		//	_this.editToolbar.onDeactivate=null;
	        			_this.editToolbar.deactivate();
	        			_this.BNMap.stopDraw();
	        			_this.BNMap.clear();
	        			 _this.editToolbar = new Edit(_this.BNMap.InnerMap);
	        			
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
	
