var localhostApi=location.host;
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
function getQueryStrings(url,name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = url.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

	var v=null;
	var token=null;
	var ck=document.getElementsByTagName("script");
	for(var i=0;i<ck.length;i++){
		var d=ck[i].src.split("/")[ck[0].src.split("/").length-1];
		if(d.split("?")[0]=="init.js"){
			v=getQueryStrings("?"+d.split("?")[1],"v");
			token=getQueryStrings("?"+d.split("?")[1],"token");
			break;
	
		}
	}
	var host = location.host;
	if(host!=localhostApi){ //本地api
		localhostApi=host;
	}
	localhostApi = localhostApi + "/air";
	if(token==undefined || token==null || token==""){
		//window.location.href="http://"+localhostApi+"/api/error.html";
	}else {
		if(v=="1.0"){
			document.write("<script src='http://"+localhostApi+"/api/1.0/init.js'></script>");
		}
	}