define(function(){ //var BNDirectorys=
	function _person(){
        var _this = this;
        //构造函数安全模式，避免创建时候丢掉new关键字
        if(_this instanceof _person){
            //旅服资源TRAVELCLOTHES
            _this.AED="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/AED.png"; //AED
            _this.TV="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/TV.png"; //TV
            _this.TV1="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/AED.png"; //tv1
            _this.WIFI_IDENTIFICATION="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/WIFI_IDENTIFICATION.png"; //WIFI标识
            _this.CARPIPESTATION="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/CARPIPESTATION.png"; //车管站
            _this.TOOLSELFABANDONEDBOX="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/TOOLSELFABANDONEDBOX.png"; //刀具自弃箱
            _this.CHECKINCOUNTER="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/CHECKINCOUNTER.png"; //登机柜台
            _this.GROUNDLAMP="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/GROUNDLAMP.png"; //地灯
            _this.PHONE="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/PHONE.png"; //电话
            _this.ELECTROMOBILE="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/ELECTROMOBILE.png"; //电瓶车
            _this.ELEVATOR="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/ELEVATOR.png"; //电梯
            _this.SERVICEDESK="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/SERVICEDESK.png"; //服务柜台
            _this.LOCKERROOM="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/LOCKERROOM.png"; //更衣室
            _this.GUANGXUAN="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/GUANGXUAN.png"; //广宣
            _this.BAGGAGEINQUIRIES="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/BAGGAGEINQUIRIES.png"; //行李查询
            _this.BAGGAGESERVICE="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/BAGGAGESERVICE.png"; //行李服务
            _this.MEETINGPOINT="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/MEETINGPOINT.png"; //会客点
            _this.DONATIONBOX="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/DONATIONBOX.png"; //捐款箱
            _this.STAIRS="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/STAIRS.png"; //楼梯
            _this.TICKETSERVICE="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/TICKETSERVICE.png"; //票务服务
            _this.PRAYERROOM="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/PRAYERROOM.png"; //祈祷室
            _this.CLEANINGCAR="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/CLEANINGCAR.png"; //清洁车
            _this.SWEEPINGCARCHARGING="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/SWEEPINGCARCHARGING.png"; //扫地车充电
            _this.LIFTERSTORAGEPOINT="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/LIFTERSTORAGEPOINT.png"; //升降车存放点
            _this.LOSTANDFOUND="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/LOSTANDFOUND.png"; //失物招领
            _this.HANDBOOK="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/HANDBOOK.png"; //手册栏
            _this.MOBILEPHONECHARGER="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/MOBILEPHONECHARGER.png"; //手机充电器
            _this.CARTSTORAGEPOINT="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/CARTSTORAGEPOINT.png"; //手推车存放点
            _this.UNKNOWN="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/UNKNOWN.png"; //未知
            _this.INQUIRE="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/INQUIRE.png"; //问询
            _this.SMOKINGROOM="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/SMOKINGROOM.png"; //吸烟室
            _this.RESTROOM="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/RESTROOM.png"; //洗手间
            _this.LOUNGE="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/LOUNGE.png"; //休息室
            _this.MEDICALROOM="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/MEDICALROOM.png"; //医疗室
            _this.WATERDISPENSER="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/WATERDISPENSER.png"; //饮水机
            _this.EMPLOYEESTORAGECABINET="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/EMPLOYEESTORAGECABINET.png"; //员工用寄存柜
            _this.TEMPORARYSTORAGEROOM="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/TEMPORARYSTORAGEROOM.png"; //暂存室
            _this.TRANSFERSERVICE="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/TRANSFERSERVICE.png"; //中转服务
            _this.SELFSERVICEQUERYTERMINAL="http://"+localhostApi+"/api/img/SYMBOL/TRAVELCLOTHES/SELFSERVICEQUERYTERMINAL.png"; //自助查询终端
            //弱电WEAKCURRENT
            _this.WIRINGDEVICEPOINT="http://"+localhostApi+"/api/img/SYMBOL/WEAKCURRENT/WIRINGDEVICEPOINT.png"; //布线器件点
            _this.GOOUTREQUESTBUTTON="http://"+localhostApi+"/api/img/SYMBOL/WEAKCURRENT/GOOUTREQUESTBUTTON.png"; //出门请求按钮
            _this.ELECTRICLOCK="http://"+localhostApi+"/api/img/SYMBOL/WEAKCURRENT/ELECTRICLOCK.png"; //电控锁
            _this.CARDREADER="http://"+localhostApi+"/api/img/SYMBOL/WEAKCURRENT/CARDREADER.png"; //读卡器
            _this.BRANCHDISTRIBUTOR="http://"+localhostApi+"/api/img/SYMBOL/WEAKCURRENT/BRANCHDISTRIBUTOR.png"; //分支分配器
            _this.POWERSPLITTER="http://"+localhostApi+"/api/img/SYMBOL/WEAKCURRENT/POWERSPLITTER.png"; //功分耦合器
            _this.RADIOBROADCAST="http://"+localhostApi+"/api/img/SYMBOL/WEAKCURRENT/RADIOBROADCAST.png"; //广播
            _this.NAVIGATIONDISPLAY="http://"+localhostApi+"/api/img/SYMBOL/WEAKCURRENT/NAVIGATIONDISPLAY.png"; //航显
            _this.INTEGRATIONPOINT="http://"+localhostApi+"/api/img/SYMBOL/WEAKCURRENT/INTEGRATIONPOINT.png"; //集成点
            _this.MONITOR="http://"+localhostApi+"/api/img/SYMBOL/WEAKCURRENT/MONITOR.png"; //监控
            _this.DEPARTUREFROMTHEPORT="http://"+localhostApi+"/api/img/SYMBOL/WEAKCURRENT/DEPARTUREFROMTHEPORT.png"; //离港
            _this.ENTRANCEGUARD="http://"+localhostApi+"/api/img/SYMBOL/WEAKCURRENT/ENTRANCEGUARD.png"; //门禁
            _this.THREEDIMENSIONALPANORAMICCOLLECTIONPOINT="http://"+localhostApi+"/api/img/SYMBOL/WEAKCURRENT/THREEDIMENSIONALPANORAMICCOLLECTIONPOINT.png"; //三维全景采集点
            _this.CLOCK="http://"+localhostApi+"/api/img/SYMBOL/WEAKCURRENT/CLOCK.png"; //时钟
            _this.SIGNALCOMMUNICATION="http://"+localhostApi+"/api/img/SYMBOL/WEAKCURRENT/SIGNALCOMMUNICATION.png"; //通信
            _this.ICON="http://"+localhostApi+"/api/img/SYMBOL/WEAKCURRENT/ICON.png"; //图标
            _this.TELECOMMUNICATIONS="http://"+localhostApi+"/api/img/SYMBOL/WEAKCURRENT/TELECOMMUNICATIONS.png"; //无线通讯
            _this.LIMITED_TV="http://"+localhostApi+"/api/img/SYMBOL/WEAKCURRENT/LIMITED_TV.png"; //有限电视
            _this.CABLE_TV="http://"+localhostApi+"/api/img/SYMBOL/WEAKCURRENT/CABLE_TV.png"; //有线电视
            _this.GROUNDLAMP="http://"+localhostApi+"/api/img/SYMBOL/WEAKCURRENT/GROUNDLAMP.png"; //地灯
            
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