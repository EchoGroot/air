/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/promise/Promise",["../_base/lang"],function(c){function b(){throw new TypeError("abstract");}return c.extend(function(){},{then:function(a,c,d){b()},cancel:function(a,c){b()},isResolved:function(){b()},isRejected:function(){b()},isFulfilled:function(){b()},isCanceled:function(){b()},always:function(a){return this.then(a,a)},"catch":function(a){return this.then(null,a)},otherwise:function(a){return this.then(null,a)},trace:function(){return this},traceRejected:function(){return this},
toString:function(){return"[object Promise]"}})});