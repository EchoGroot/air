define(["js/BNUtil"],function(util) {
			var arrayList = null;
			function _person(Callback, ErrorCallback) {

				var _this = this;
				// 构造函数安全模式，避免创建时候丢掉new关键字
				if (_this instanceof _person) {
					//协议
					var protocol = window.location.protocol;
					//端口
					var host = window.location.host;
					$.ajax({
						async : false,
						 url : "http://52.81.43.7:9080/AGSP/api_businesslogic.json",
						//url : "http://192.168.1.151:8080/AGSP_XA/api_businesslogic.json",
						type : "post",
						data: {logicId:"20.16.03",userId:"admin"},
						success: function(result){
							// 根据token 去后台查询资源目录
							_this.arrayList = result.arrayList;
						}
					});
					
					_this.keys=function(){
						var key=new Array();
						for(var i in BNDirectory.arrayList){
					    　　key.push(i);
					　　}
						return key;
					};
					
					// 根据ip拿到资源
					_this.getDirectory = function(id) {
						if (util.isNotEmpty(id)) {
							return arrayList[id];
						} else {
							return arrayList;
						}

					};
					if (util.isNotEmpty(Callback)) {
						Callback(_this);
					}

					return _this;

				} else {
					if (util.isNotEmpty(Callback)) {
						Callback(new _person());
					}

					return new _person();
				}
			}
			_person.prototype = {
				constructor : _person,
				drink : "sd",
			};
			return _person;

		});