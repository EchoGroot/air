$(function(){
	airMap.initMap("map");
	var socket=new WebSocket("ws://localhost:8080/air/server");
	var state=false;
	socket.onopen=function(){
		
		state=true;
	}
	socket.onclose=function(){
		
	}
	
	function showAir(air){
		airMap.clearLayer();
		airMap.graphicAir(air);
	}
	window.onbeforeunload=function(){
		socket.onclose();
	}
	socket.onmessage=function(e){
		var obj=JSON.parse(e.data);
		if(obj.type=="showAirs"){
			airMap.clearLayer();
			for(var pro in obj.content){
				console.log(obj.content[pro])
				airMap.graphicAir(obj.content[pro]);
			};
		}else if(obj.type=="showError"){
			alert(obj.content);
		}
	}
	$("#find").click(function(){
		var value=$("#txt").val();
		if(value==""){
			alert("请输入航班号");
			return;
		}
		socket.send(getMessage("findAirport",value));
		//socket.send("{\"type\":\""+"findAirport"+"\"}");
	})
	$("#all").click(function(){
		socket.send(getMessage("showAll",""));
	})
	$("#clear").click(function(){
		socket.send(getMessage("clearAll",""));
	})
	function getMessage(type,content){
		return "{\"type\":\""+type+"\",\"content\":\""+content+"\"}";
	}
	
	/*airMap.graphicImage({
		pointX:"498109.69842127495",
		pointY:"499977.09118213184",
		vec:"75",
		url:"image/airport.png",
		width:"40",
		height:"40"
	});
	airMap.graphicText({
		content:"nihao",
		color:"#efefef",
		size:20,
		pointX:"498109.69842127495",
		pointY:"499977.09118213184",
		ofX:"0",
		ofY:"15"
	})*/
/*	airMap.graphicAir({
		airportName:"A3",
		vec:90,
		pointX:"499752.23503968166",
		pointY:"500005.5339473507"
	});
	airMap.graphicAir({
		airportName:"A3",
		vec:90,
		pointX:"499590.309715831",
		pointY:"500015.05896640074"
	});
	airMap.graphicAir({
		airportName:"A3",
		vec:90,
		pointX:"499428.38439198036",
		pointY:"500015.05896640074"
	});
	airMap.graphicAir({
		airportName:"A3",
		vec:90,
		pointX:"499290.27161575475",
		pointY:"500015.05896640074"
	});
	airMap.graphicAir({
		airportName:"A3",
		vec:90,
		pointX:"499133.10880142916",
		pointY:"500019.82147592574"
	});*/
	/*airMap.graphicPoint({
		pointX:"499318.3755019625",
		pointY:"499991.6432945694"
	});*/
	/*setTimeout(()=>{
		airMap.clearLayer();
	},3000);*/
	airMap.map.on("click",function(e){
		console.log(e);
		airMap.graphicPoint({
			pointX:e.mapPoint.x,
			pointY:e.mapPoint.y
		});
	})
	
})












