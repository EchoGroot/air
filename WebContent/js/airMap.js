var airMap={
		map:null,
		layer:null,
		airportLayer:null,
		importApi:function(){
			dojo.require("esri.map");
			dojo.require("esri.layers.GraphicsLayer");
			dojo.require("esri.tasks.QueryTask"); 
			dojo.require("esri.symbols.SimpleMarkerSymbol");
			dojo.require("esri.symbols.TextSymbol"); 
			dojo.require("esri.geometry.Point");
			dojo.require("esri.symbols.PictureMarkerSymbol");
			dojo.require("esri.symbols.SimpleLineSymbol");
			dojo.require("esri.symbols.Font");
		},
		initMap:function(id){
			this.importApi();
			this.map=new esri.Map(id,{
			    logo:false, //隐藏logo
			});
			//加载底图数据绘制底图
			this.layer=new esri.layers.ArcGISTiledMapServiceLayer("http://52.80.233.216:6080/arcgis/rest/services/JT_CMJK/DCJ_BASE_ZBAA_JT_JK/MapServer");
			//绘制飞机显示的图层
			this.airportLayer=new esri.layers.GraphicsLayer({id:"airportLayer"});
			//将图层加载到底图容器
			this.map.addLayers([this.layer,this.airportLayer]);
		},
		graphicImage:function(img){
			//创建图片对象
			var pictureSymbol=new esri.symbol.PictureMarkerSymbol(img.url, img.width, img.height);
			//定义图片角度
			pictureSymbol.setAngle(img.vec);
			//创建具体要绘制图片的要素
			var graphic=new esri.Graphic(new esri.geometry.Point(img.pointX,img.pointY,airMap.map.spatialReference),pictureSymbol);
			airMap.airportLayer.add(graphic);
		},
		graphicText:function(txt){
			var textSymbol=new esri.symbols.TextSymbol(txt.content,new esri.symbols.Font(txt.size),txt.color);
			textSymbol.setOffset(txt.ofX,txt.ofY);
			var textGraphic=new esri.Graphic(new esri.geometry.Point(txt.pointX,txt.pointY,airMap.map.spatialReference),textSymbol);
			airMap.airportLayer.add(textGraphic);

		},
		graphicAir:function(airport){
			this.graphicImage({
				pointX:airport.pointX,
				pointY:airport.pointY,
				vec:airport.vec,
				url:"image/airport.png",
				width:"40",
				height:"40"
			});
			this.graphicText({
				content:airport.airportName,
				color:"#efefef",
				size:14,
				pointX:airport.pointX,
				pointY:airport.pointY,
				ofX:"0",
				ofY:"15"
			});
		},
		graphicPoint:function(point){
			this.graphicImage({
				pointX:point.pointX,
				pointY:point.pointY,				
				url:"image/point.png",
				width:"25",
				height:"25"
			})
		},
		clearLayer:function(){
			this.airportLayer.clear();
		}
}


