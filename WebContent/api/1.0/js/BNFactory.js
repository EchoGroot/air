define([ "js/BNTrackReplay","js/BNStreamLayer","js/BNRoutePlanning","js/BNUtil","js/BNDirectorys","js/BNMap","js/BNEdit","js/BNHeatMap","js/BNWindow","js/BNGeometry","js/BNSymbol","js/BNmapUtil","js/BNPointAggregation"],function(BNTrackReplay,BNStreamLayer,BNRoutePlanning,utils,BNDirectoryss,BNMaps,BNEdit,BNHeatMap,BNWindow,BNGeometry,BNSymbol,BNmapUtil,BNPointAggregation){
	var map=null;	
	getFactory=function(id,options){ //去拿到id对应要创建的类型

			BNDirectory=new BNDirectoryss();

						
			
			if( typeof id =="string"){
				if(id=="BNEdit"){
					return new BNEdit(options);
				}else if(id=="BNHeatMap"){
					return new BNHeatMap(options);
				}else if(id=="BNPointAggregation"){
					return new BNPointAggregation(options);
				}else if(id=="BNmapUtil"){
					return new BNmapUtil(options);
				}else if(id=="BNStreamLayer"){
					return new BNStreamLayer(options);
				}else if(id=="BNTrackReplay"){
					return new BNTrackReplay(options);
				}else if(id=="BNRoutePlanning"){
					return new BNRoutePlanning(options);
				}else if(id=="BNWindow"){
					if(utils.isNotEmpty(options)){
						return new BNWindow(options);
					}else{
						return new BNWindow(null,null,null,map);
					}
				}else if(id=="BNGeometry"){
					return new BNGeometry(options);
				}else if(id=="BNSymbol"){
					return new BNSymbol();
				}
				/*else if(utils.isNotEmpty(BNDirectory.arrayList.LBSService[id])){
						//初始化服务
					}*/
					else{
					for(var i in BNDirectory.arrayList){
						if(utils.isNotEmpty(BNDirectory.arrayList[i].id)){
							if(BNDirectory.arrayList[i].id==id){
								if(utils.isNotEmpty(options)){
									map=new BNMaps(BNDirectory.arrayList[i],options);
									map.maps=BNDirectory.arrayList[i];
									map.directorys=BNDirectory.arrayList;
									return map;
								}else{
									map=new BNMaps(BNDirectory.arrayList[i],null);
									map.maps=BNDirectory.arrayList[i];
									map.directorys=BNDirectory.arrayList;
									return map;
								}
							}
						}
							    　　
					}
				}
			}
			/*else{
				if(utils.isNotEmpty(id.type)){
					if(utils.isNotEmpty(options)){
						var m=new BNMaps(id,options);
						m.arrayList=BNDirectory.arrayList;
						return m;
					}else{
						var m=new BNMaps(id,null);
						return m;
					}
				}
				
				
				
				
				
			}*/
			
		};
		
		
		function _person(option,options,Callback,ErrorCallback){
	        var _this = this;
	        //构造函数安全模式，避免创建时候丢掉new关键字
	        if(_this instanceof _person){
	        		if(utils.isNotEmpty(Callback)){
	        			Callback(getFactory(option,options)); //获得创建的类型
	        		}
	        		return getFactory(option,options); //返回创建的类
	        	
	        	/*if(util.isNotEmpty(option.token)){ //令牌不为空
	        		_this.createObject=function(options,Callback,ErrorCallback){
	        			if(util.isNotEmpty(options)){
	        				if(util.isNotEmpty(options)){
	        					
	        					switch (options){
	                			case "map":
	                				Callback(new BNMap());
	                				return new BNMap();
	                				//return new BNMap(options.option,options.Callback,options.ErrorCallback);
	                				break;
	                			}
	        					
	        				}else{
	        					return ErrorCallback({"message":"resourcesId 不能为空"});
	        				}
	        			}else{
	        				return ErrorCallback({"message":"请输入要创建的类"});
	        			}
	        			
	        			
	        		};
	        	}else if(util.isEmpty(option.token)){
	        		ErrorCallback({message:"请输入令牌！"});
	        		//return "";
	        	}else if(util.isEmpty(option.resid)){
	        		ErrorCallback({message:"请输入专题图编号！"});
	        		//return "";
	        	}*/
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