define([
        "js/BNSymbolLibrary","esri/renderers/SimpleRenderer","js/BNUtil",
  		"esri/symbols/PictureMarkerSymbol",
  		"esri/symbols/SimpleMarkerSymbol",
  		"esri/symbols/SimpleLineSymbol",
  		"esri/symbols/SimpleFillSymbol",
  		"esri/symbols/Font",
  		"esri/symbols/TextSymbol",
  		"dojo/domReady!"],function(BNSymbolLibrary,SimpleRenderer,util,PictureMarkerSymbol,SimpleMarkerSymbol, SimpleLineSymbol,SimpleFillSymbol,Font, TextSymbol){
	var pointSymbol=new SimpleMarkerSymbol(); //默认点的样式
	pointSymbol.setOutline(null);
	pointSymbol.setColor(new esri.Color([153,255,255,1]));
	pointSymbol.setSize("10");
	var polygonSymbol=new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new esri.Color([255,0,0]), 2), new esri.Color([255,0,0,1]));//面高亮
	var firstSymbol=new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new esri.Color([255, 0, 0]), 2);//线
	var testFont=new Font("10pt",Font.STYLE_NORMAL,Font.VARIANT_NORMAL,Font.WEIGHT_BOLD,"Arial"); //字体样式
		testColor=new esri.Color([0, 0, 0]);
	var testAreasymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new esri.Color([255, 0, 0]), 2),new esri.Color([0, 0, 255, 0.5])); //测面的颜色
	var testDistancesymbol=new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new esri.Color([255, 0, 0]), 2);//测距颜色


		pointSymbolFunction=function(col,size,flag){ //点的符号
			var pointSymbols=pointSymbol;
			pointSymbols.setOutline(null);
			if(util.isNotEmpty(col)){
				pointSymbols.setColor(new esri.Color(col));
			}else{
				pointSymbols.setColor(new esri.Color([153,255,255,1]));
			}
			if(util.isNotEmpty(size)){
				pointSymbols.setSize(size);//点高亮
			}else{
				pointSymbols.setSize("10");//点高亮
			}
			if(util.isEmpty(col) && util.isEmpty(size) && util.isNotEmpty(flag)){
				if(flag){
					return pointSymbol;
				}else{
					return new SimpleMarkerSymbol();
				}
				
			}else if(util.isEmpty(col) && util.isEmpty(size) && util.isEmpty(flag)){
				return new SimpleMarkerSymbol();
			}else{
				return pointSymbols;
			}
		};
		
		polygonSymbolFunction=function(style,Symbol,color){ //面的符号
			
			if(util.isEmpty(color) && util.isEmpty(Symbol) && util.isEmpty(style)){
				return polygonSymbol;
			}else{
				var g=new SimpleFillSymbol();
				g.setColor(new esri.Color(color));
				g.setStyle(style);
				if(util.isNotEmpty(Symbol)){
					g.setOutline(Symbol);
				}
				return g;
			}
			
		};
		SimpleLineSymbolFunction=function(STYLE,color,Width){ //线的符号
			if(util.isEmpty(STYLE) && util.isEmpty(color) && util.isEmpty(Width)){
				return firstSymbol;
			}else{
				var g=new SimpleLineSymbol();
				g.setColor(color);
				g.setStyle(STYLE);
				g.setWidth(Width);
				return g;
			}
			
			return this.firstSymbol;
		};
		textSymbolfunction=function(text,font,color){ //字体符号
			if(util.isEmpty(text) && util.isEmpty(font) && util.isEmpty(color)){
				return testFont;
			}else{
				return new TextSymbol(text,font,new esri.Color(color));
			}
			
		};
		fontFunction=function(size,STYLE_NORMAL,VARIANT_NORMAL,WEIGHT_BOLD,fon){//字体
			return new Font(size,STYLE_NORMAL,VARIANT_NORMAL,WEIGHT_BOLD,fon);
		};
		
	
		PictureMarkerSymbolFunction=function(image,wi,hi){ //图片符号
			
			return new PictureMarkerSymbol(image, wi,hi);
		};
		
		
	function _person(){
        var _this = this;
        _this.testAreasymbol=testAreasymbol;
        _this.testDistancesymbol=testDistancesymbol;
        //构造函数安全模式，避免创建时候丢掉new关键字
        if(_this instanceof _person){
        			_this.STYLE_ITALIC="STYLE_ITALIC";
					_this.STYLE_NORMAL="STYLE_NORMAL";
					_this.STYLE_OBLIQUE="STYLE_OBLIQUE";
					_this.VARIANT_NORMAL="VARIANT_NORMAL";
					_this.VARIANT_SMALLCAPS="VARIANT_SMALLCAPS";
					_this.WEIGHT_BOLD="WEIGHT_BOLD";
					_this.WEIGHT_BOLDER="WEIGHT_BOLDER";
					_this.WEIGHT_LIGHTER="WEIGHT_LIGHTER";
					_this.WEIGHT_NORMAL="WEIGHT_NORMAL";
					_this.AED="AED"; //AED
		            _this.TV="TV"; //TV
		            _this.TV1="AED"; //tv1
		            _this.WIFI_IDENTIFICATION="WIFI_IDENTIFICATION"; //WIFI标识
		            _this.CARPIPESTATION="CARPIPESTATION"; //车管站
		            _this.TOOLSELFABANDONEDBOX="TOOLSELFABANDONEDBOX"; //刀具自弃箱
		            _this.CHECKINCOUNTER="CHECKINCOUNTER"; //登机柜台
		            _this.GROUNDLAMP="GROUNDLAMP"; //地灯
		            _this.PHONE="PHONE"; //电话
		            _this.ELECTROMOBILE="ELECTROMOBILE"; //电瓶车
		            _this.ELEVATOR="ELEVATOR"; //电梯
		            _this.SERVICEDESK="SERVICEDESK"; //服务柜台
		            _this.LOCKERROOM="LOCKERROOM"; //更衣室
		            _this.GUANGXUAN="GUANGXUAN"; //广宣
		            _this.BAGGAGEINQUIRIES="BAGGAGEINQUIRIES"; //行李查询





            		_this.pointSymbol=function(col,size){ //点
            			return pointSymbolFunction(col,size);
            		};
            		_this.polygonSymbol=function(color,Symbol,style){//面
            			return polygonSymbolFunction(color,Symbol,style);
            		};
            		_this.SimpleRenderer=function(symbol){
            			return new SimpleRenderer({"symbol":symbol});
            		};
            		_this.simpleLineSymbol=function(STYLE,color,Width){ //线
            			return SimpleLineSymbolFunction(STYLE,color,Width);
            		};
            		_this.textSymbol=function(text,font,color){ //字体符号
            			return textSymbolfunction(text,font,color);
            		};
            		_this.font=function(size,STYLE_NORMAL,VARIANT_NORMAL,WEIGHT_BOLD,fon){ //字体
            			return fontFunction(size,STYLE_NORMAL,VARIANT_NORMAL,WEIGHT_BOLD,fon);
            		};
            		_this.PictureMarkerSymbol=function(image,wi,hi){ //带有图片的符号
			            if(util.isNotEmpty(image)){
							try {
								var imagec=BNSymbolLibrary[image];
								if(util.isNotEmpty(imagec)){
									image=imagec;
								}
								
							} catch (e) {
								// TODO: handle exception
							}
							
						}
            			return PictureMarkerSymbolFunction(image,wi,hi);
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