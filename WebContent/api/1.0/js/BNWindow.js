define(["js/BNUtil"],function(util){
	var ANCHOR=new myMap();
	ANCHOR.put("LOWERLEFT","ANCHOR_LOWERLEFT");//窗口位于点的左下
	ANCHOR.put("LOWERRIGHT","ANCHOR_LOWERRIGHT");//右下
	ANCHOR.put("UPPERLEFT","ANCHOR_UPPERLEFT");//左上
	ANCHOR.put("UPPERRIGHT","ANCHOR_UPPERRIGHT");//右上
	
	getBNWindow=function(options){  //创建window
		if(util.isNotEmpty(options.title)){
			options.map.infoWindow.setTitle(options.title);
		}
		map.infoWindow.setContent(options.content);
		if(util.isNotEmpty(options.resize)){
			options.map.infoWindow.resize(options.resize.width, options.resize.height);
		}
		return options.map.infoWindow;
	};

	
	
	function _person(titles,content,resize,BNmap){
        var _this = this;
        //构造函数安全模式，避免创建时候丢掉new关键字
        if(_this instanceof _person){
            //共有属性, 方法
        	if(titles instanceof Object){
				return getBNWindow(titles);
			}else{
				var t=new Object();
				if(util.isNotEmpty(titles)){
					t.title=titles;
				}
				if(util.isNotEmpty(titles)){
					t.title=titles;
				}
				if(util.isNotEmpty(titles)){
					t.title=titles;
				}
				if(util.isNotEmpty(titles)){
					t.title=titles;
				}
				var t={
						"title":titles,
						"content":content,
						"resize":resize,
						"map":BNmap.InnerMap,
				};
				map=t.map;
				return getBNWindow(t);
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