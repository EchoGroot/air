//>>built
define("dijit/layout/BorderContainer","dojo/_base/array dojo/cookie dojo/_base/declare dojo/dom-class dojo/dom-construct dojo/dom-geometry dojo/dom-style dojo/keys dojo/_base/lang dojo/on dojo/touch ../_WidgetBase ../_Widget ../_TemplatedMixin ./LayoutContainer ./utils".split(" "),function(h,l,d,e,m,f,n,k,g,q,y,w,r,t,u,x){var p=d("dijit.layout._Splitter",[r,t],{live:!0,templateString:'\x3cdiv class\x3d"dijitSplitter" data-dojo-attach-event\x3d"onkeydown:_onKeyDown,press:_startDrag,onmouseenter:_onMouse,onmouseleave:_onMouse" tabIndex\x3d"0" role\x3d"separator"\x3e\x3cdiv class\x3d"dijitSplitterThumb"\x3e\x3c/div\x3e\x3c/div\x3e',
constructor:function(){this._handlers=[]},postMixInProperties:function(){this.inherited(arguments);this.horizontal=/top|bottom/.test(this.region);this._factor=/top|left/.test(this.region)?1:-1;this._cookieName=this.container.id+"_"+this.region},buildRendering:function(){this.inherited(arguments);e.add(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V"));if(this.container.persist){var a=l(this._cookieName);a&&(this.child.domNode.style[this.horizontal?"height":"width"]=a)}},_computeMaxSize:function(){var a=
this.horizontal?"h":"w",c=f.getMarginBox(this.child.domNode)[a],b=h.filter(this.container.getChildren(),function(a){return"center"==a.region})[0],a=f.getContentBox(b.domNode)[a]-10;return Math.min(this.child.maxSize,c+a)},_startDrag:function(a){this.cover||(this.cover=m.place("\x3cdiv class\x3ddijitSplitterCover\x3e\x3c/div\x3e",this.child.domNode,"after"));e.add(this.cover,"dijitSplitterCoverActive");this.fake&&m.destroy(this.fake);(this._resize=this.live)||((this.fake=this.domNode.cloneNode(!0)).removeAttribute("id"),
e.add(this.domNode,"dijitSplitterShadow"),m.place(this.fake,this.domNode,"after"));e.add(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active");this.fake&&e.remove(this.fake,"dijitSplitterHover dijitSplitter"+(this.horizontal?"H":"V")+"Hover");var c=this._factor,b=this.horizontal,d=b?"pageY":"pageX",h=a[d],k=this.domNode.style,b=b?"h":"w",l=n.getComputedStyle(this.child.domNode),r=f.getMarginBox(this.child.domNode,l)[b],t=this._computeMaxSize(),u=Math.max(this.child.minSize,
f.getPadBorderExtents(this.child.domNode,l)[b]+10),b=this.region,p="top"==b||"bottom"==b?"top":"left",v=parseInt(k[p],10),w=this._resize,x=g.hitch(this.container,"_layoutChildren",this.child.id),b=this.ownerDocument;this._handlers=this._handlers.concat([q(b,y.move,this._drag=function(a,b){var e=a[d]-h,f=c*e+r,g=Math.max(Math.min(f,t),u);(w||b)&&x(g);k[p]=e+v+c*(g-f)+"px"}),q(b,"dragstart",function(a){a.stopPropagation();a.preventDefault()}),q(this.ownerDocumentBody,"selectstart",function(a){a.stopPropagation();
a.preventDefault()}),q(b,y.release,g.hitch(this,"_stopDrag"))]);a.stopPropagation();a.preventDefault()},_onMouse:function(a){a="mouseover"==a.type||"mouseenter"==a.type;e.toggle(this.domNode,"dijitSplitterHover",a);e.toggle(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V")+"Hover",a)},_stopDrag:function(a){try{this.cover&&e.remove(this.cover,"dijitSplitterCoverActive"),this.fake&&m.destroy(this.fake),e.remove(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active dijitSplitterShadow"),
this._drag(a),this._drag(a,!0)}finally{this._cleanupHandlers(),delete this._drag}this.container.persist&&l(this._cookieName,this.child.domNode.style[this.horizontal?"height":"width"],{expires:365})},_cleanupHandlers:function(){for(var a;a=this._handlers.pop();)a.remove()},_onKeyDown:function(a){this._resize=!0;var c=this.horizontal,b=1;switch(a.keyCode){case c?k.UP_ARROW:k.LEFT_ARROW:b*=-1;case c?k.DOWN_ARROW:k.RIGHT_ARROW:break;default:return}c=f.getMarginSize(this.child.domNode)[c?"h":"w"]+this._factor*
b;this.container._layoutChildren(this.child.id,Math.max(Math.min(c,this._computeMaxSize()),this.child.minSize));a.stopPropagation();a.preventDefault()},destroy:function(){this._cleanupHandlers();delete this.child;delete this.container;delete this.cover;delete this.fake;this.inherited(arguments)}}),v=d("dijit.layout._Gutter",[r,t],{templateString:'\x3cdiv class\x3d"dijitGutter" role\x3d"presentation"\x3e\x3c/div\x3e',postMixInProperties:function(){this.inherited(arguments);this.horizontal=/top|bottom/.test(this.region)},
buildRendering:function(){this.inherited(arguments);e.add(this.domNode,"dijitGutter"+(this.horizontal?"H":"V"))}});d=d("dijit.layout.BorderContainer",u,{gutters:!0,liveSplitters:!0,persist:!1,baseClass:"dijitBorderContainer",_splitterClass:p,postMixInProperties:function(){this.gutters||(this.baseClass+="NoGutter");this.inherited(arguments)},_setupChild:function(a){this.inherited(arguments);var c=a.region,b=a.isLeftToRight();"leading"==c&&(c=b?"left":"right");"trailing"==c&&(c=b?"right":"left");c&&
"center"!=c&&(a.splitter||this.gutters)&&!a._splitterWidget&&(b=a.splitter?this._splitterClass:v,g.isString(b)&&(b=g.getObject(b)),b=new b({id:a.id+"_splitter",container:this,child:a,region:c,live:this.liveSplitters}),b.isSplitter=!0,a._splitterWidget=b,c="bottom"==c||c==(this.isLeftToRight()?"right":"left"),m.place(b.domNode,a.domNode,c?"before":"after"),b.startup())},layout:function(){this._layoutChildren()},removeChild:function(a){var c=a._splitterWidget;c&&(c.destroy(),delete a._splitterWidget);
this.inherited(arguments)},getChildren:function(){return h.filter(this.inherited(arguments),function(a){return!a.isSplitter})},getSplitter:function(a){return h.filter(this.getChildren(),function(c){return c.region==a})[0]._splitterWidget},resize:function(a,c){if(!this.cs||!this.pe){var b=this.domNode;this.cs=n.getComputedStyle(b);this.pe=f.getPadExtents(b,this.cs);this.pe.r=n.toPixelValue(b,this.cs.paddingRight);this.pe.b=n.toPixelValue(b,this.cs.paddingBottom);n.set(b,"padding","0px")}this.inherited(arguments)},
_layoutChildren:function(a,c){if(this._borderBox&&this._borderBox.h){var b=[];h.forEach(this._getOrderedChildren(),function(a){b.push(a);a._splitterWidget&&b.push(a._splitterWidget)});x.layoutChildren(this.domNode,{l:this.pe.l,t:this.pe.t,w:this._borderBox.w-this.pe.w,h:this._borderBox.h-this.pe.h},b,a,c)}},destroyRecursive:function(){h.forEach(this.getChildren(),function(a){var c=a._splitterWidget;c&&c.destroy();delete a._splitterWidget});this.inherited(arguments)}});d.ChildWidgetProperties={splitter:!1,
minSize:0,maxSize:Infinity};g.mixin(d.ChildWidgetProperties,u.ChildWidgetProperties);g.extend(w,d.ChildWidgetProperties);d._Splitter=p;d._Gutter=v;return d});