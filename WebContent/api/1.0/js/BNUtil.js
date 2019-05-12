define(function(){ //var BNDirectorys=
	function _person(){
        var _this = this;
        //构造函数安全模式，避免创建时候丢掉new关键字
        if(_this instanceof _person){
            //共有属性, 方法
        	/**
        	 * constructor isNotEmpty
        	 */
        	_this.isNotEmpty=function(o){ //判断是否为空
        		var flag=false;
        		if(o!=null && o!="" && o!=undefined){
        			flag=true;
        		}
                if(o==false){
                    return true;
                }else{
        		return flag;
                }
        	};
        	_this.isEmpty=function(o){ //判断是否为空
                 
        		var flag=false;
        		if(o==null || o=="" || o==undefined){
        			flag=true;
        		}
                if(o==false){
                    return false;
                }
        		return flag;
        	};
        
        }else{
        	
            return new _person();
        }
    }
	_person.prototype = {
	        constructor: _person,
	        drink: "sd",
	    };
	    return _person;
}());