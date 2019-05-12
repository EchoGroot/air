define([
        "esri/tasks/PrintParameters","esri/tasks/PrintTemplate","esri/tasks/PrintTask","esri/dijit/Print","esri/map","js/download","dojo/domReady!"],
        function(PrintParameters,PrintTemplate,PrintTask,Print,Map,download){
	
	function _person(BNMap){
        var _this = this;
      _this.BNMap=BNMap;
        //构造函数安全模式，避免创建时候丢掉new关键字
        if(_this instanceof _person){
        			
_this.preview=function (oper){//打印
	            if (oper < 10){
		            bdhtml=window.document.body.innerHTML;//获取当前页的html代码
    sprnstr="<!--startprint"+oper+"-->";//设置打印开始区域
    eprnstr="<!--endprint"+oper+"-->";//设置打印结束区域
    prnhtml=bdhtml.substring(bdhtml.indexOf(sprnstr)+18); //从开始代码向后取html
    prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));//从结束代码向前取html
    window.document.body.innerHTML=prnhtml;
    window.print();
    window.document.body.innerHTML=bdhtml;
	            } else {
	            	window.print();
	            }
            };
            
            _this.dowloadMap=function(){//地图下载
            	//parser.parse();
        	    
            var printTask = new PrintTask(BNMap.directorys["funcitonResources"][BNMap.directorys["funcitonResources"].print].mapPrintService);
			    var template = new PrintTemplate();
			     
			    template.layoutOptions = {
			        "authorText": "paq",
			        "copyrightText": "copyright info here",
			        "legendLayers": [],
			        "titleText": "Pool Permits",
			        "scalebarUnit": "Miles"
			    };
			    template.exportOptions = {
			        width: $("#"+BNMap.initOptions.id).width(),
			        height: $("#"+BNMap.initOptions.id).height(),
			        dpi: Number(90)
			    };
			    template.format = "png32";
			    template.layout = "MAP_ONLY";
			    template.preserveScale = false;
			    var params = new PrintParameters();
			    params.map = _this.BNMap.InnerMap;
			    params.template = template;
			    printTask.execute(params, function (evt) {
			        download(evt.url);
			    });
            };




            		
            		
			        }else{
			            return new _person();
			        };
			        
    			}
			_person.prototype = {
			        constructor: _person,
			        drink: "bnpring",
			    };
	return _person;
});