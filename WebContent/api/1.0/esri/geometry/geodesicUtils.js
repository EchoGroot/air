// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/geometry/geodesicUtils","dojo/_base/array dojo/_base/lang dojo/has ../kernel ../SpatialReference ./Point ./Polyline ./Polygon".split(" "),function(u,H,N,O,C,v,D,I){function J(a){return!!(a&&a.wkid&&E[a.wkid])}function B(a){return J(a)?E[a.wkid]:E[4326]}function w(a){var m=a.spatialReference,d=B(m),b=d.a,d=d.eSq,k=Math.sqrt(d),g=Math.sin(a.y*r);return new v(b*a.x*r,0<d?b*(1-d)*(g/(1-d*g*g)-1/(2*k)*Math.log((1-k*g)/(1+k*g)))*.5:b*g,m)}function x(a,m,d,b,k){var g=B(k),f=g.a,h=g.b,g=g.f,
n=Math.sin(d);d=Math.cos(d);var e=(1-g)*Math.tan(a);a=1/Math.sqrt(1+e*e);for(var c=e*a,z=Math.atan2(e,d),e=a*n,y=e*e,t=1-y,f=t*(f*f-h*h)/(h*h),K=1+f/16384*(4096+f*(-768+f*(320-175*f))),u=f/1024*(256+f*(-128+f*(74-47*f))),f=b/(h*K),A=2*Math.PI,q,l,p,L;1E-12<Math.abs(f-A);)p=Math.cos(2*z+f),q=Math.sin(f),l=Math.cos(f),L=u*q*(p+u/4*(l*(-1+2*p*p)-u/6*p*(-3+4*q*q)*(-3+4*p*p))),A=f,f=b/(h*K)+L;b=c*q-a*l*d;h=g/16*t*(4+g*(4-3*t));return new v((m+(Math.atan2(q*n,a*l-c*q*d)-(1-h)*g*e*(f+h*q*(p+h*l*(-1+2*p*
p)))))/r,Math.atan2(c*l+a*q*d,(1-g)*Math.sqrt(y+b*b))/r,k)}function F(a,m,d,b,k){var g=B(k),f=g.a;k=g.b;var h=g.f,n=b-m,e=Math.atan((1-h)*Math.tan(a)),c=Math.atan((1-h)*Math.tan(d)),z=Math.sin(e),e=Math.cos(e),y=Math.sin(c),c=Math.cos(c),t=n,r,u=1E3,A,q,l,p,v,w,x;do{l=Math.sin(t);p=Math.cos(t);q=Math.sqrt(c*l*c*l+(e*y-z*c*p)*(e*y-z*c*p));if(0===q)return 0;p=z*y+e*c*p;v=Math.atan2(q,p);w=e*c*l/q;A=1-w*w;l=p-2*z*y/A;isNaN(l)&&(l=0);x=h/16*A*(4+h*(4-3*A));r=t;t=n+(1-x)*h*w*(v+x*q*(l+x*p*(-1+2*l*l)))}while(1E-12<
Math.abs(t-r)&&0<--u);if(0===u)return k=b-m,{azimuth:Math.atan2(Math.sin(k)*Math.cos(d),Math.cos(a)*Math.sin(d)-Math.sin(a)*Math.cos(d)*Math.cos(k)),geodesicDistance:Math.acos(Math.sin(a)*Math.sin(d)+Math.cos(a)*Math.cos(d)*Math.cos(b-m))*g.radius};a=A*(f*f-k*k)/(k*k);m=a/1024*(256+a*(-128+a*(74-47*a)));return{azimuth:Math.atan2(c*Math.sin(t),e*y-z*c*Math.cos(t)),geodesicDistance:k*(1+a/16384*(4096+a*(-768+a*(320-175*a))))*(v-m*q*(l+m/4*(p*(-1+2*l*l)-m/6*l*(-3+4*q*q)*(-3+4*l*l)))),reverseAzimuth:Math.atan2(e*
Math.sin(t),e*y*Math.cos(t)-z*c)}}function M(a,m){if(!(a instanceof D||a instanceof I))throw console.error("_geodesicDensify: the input geometry is neither polyline nor polygon"),Error("_geodesicDensify: the input geometry is neither polyline nor polygon");var d=a.spatialReference,b=B(d).radius/1E4;m<b&&(m=b);var b=a instanceof D,k=[],g;u.forEach(b?a.paths:a.rings,function(a){k.push(g=[]);g.push([a[0][0],a[0][1]]);var h,n,e,c,f,b;h=a[0][0]*r;n=a[0][1]*r;for(f=0;f<a.length-1;f++)if(e=a[f+1][0]*r,c=
a[f+1][1]*r,h!==e||n!==c){c=F(n,h,c,e,d);e=c.azimuth;c=c.geodesicDistance;var t=c/m;if(1<t){for(b=1;b<=t-1;b++){var u=x(n,h,e,b*m,d);g.push([u.x,u.y])}b=x(n,h,e,(c+Math.floor(t-1)*m)/2,d);g.push([b.x,b.y])}n=x(n,h,e,c,d);g.push([n.x,n.y]);h=n.x*r;n=n.y*r}});return b?new D({paths:k,spatialReference:d}):new I({rings:k,spatialReference:d})}var G={esriMeters:1,esriKilometers:1E3,esriYards:.9144,esriFeet:.3048,esriMiles:1609.344,esriNauticalMiles:1852,esriInches:.0254,esriDecimeters:.1,esriCentimeters:.01,
esriMillimeters:.001,esriSquareMeters:1,esriSquareKilometers:1E6,esriSquareYards:.83612736,esriSquareFeet:.09290304,esriSquareMiles:2589988.110336,esriAcres:4046.8564224,esriHectares:1E4,esriAres:100,esriSquareInches:6.4516E-4,esriSquareMillimeters:1E-6,esriSquareCentimeters:1E-4,esriSquareDecimeters:.01},r=Math.PI/180,E={4326:{a:6378137,b:6356752.31424518,f:1/298.257223563,eSq:.006694379990197414,radius:6371008.771415059},104900:{a:2439700,b:2439700,f:0,eSq:0,radius:2439700},104901:{a:6051E3,b:6051E3,
f:0,eSq:0,radius:6051E3},104902:{a:6051800,b:6051800,f:0,eSq:0,radius:6051800},104903:{a:1737400,b:1737400,f:0,eSq:0,radius:1737400},104904:{a:3393400,b:3375730,f:1/192.04301075,eSq:.01038722,radius:3387510},104905:{a:3396190,b:3376200,f:1/169.89444722,eSq:.01173737,radius:3389526.6666666665},104906:{a:6200,b:6200,f:0,eSq:0,radius:6200},104907:{a:11100,b:11100,f:0,eSq:0,radius:11100},104912:{a:2409300,b:2409300,f:0,eSq:0,radius:2409300},104915:{a:1562090,b:1562090,f:0,eSq:0,radius:1562090},104916:{a:2632345,
b:2632345,f:0,eSq:0,radius:2632345},104918:{a:1821460,b:1821460,f:0,eSq:0,radius:1821460},104929:{a:249400,b:249400,f:0,eSq:0,radius:249400},104943:{a:2575E3,b:2575E3,f:0,eSq:0,radius:2575E3},104971:{a:3396190,b:3396190,f:0,eSq:0,radius:3396190},104972:{a:47E4,b:47E4,f:0,eSq:0,radius:47E4},104973:{a:255E3,b:255E3,f:0,eSq:0,radius:255E3},104974:{a:2439400,b:2439400,f:0,eSq:0,radius:2439400}};C={isSupported:J,getSpheroidInfo:B,geodesicDensify:M,geodesicLengths:function(a,m){var d=[];u.forEach(a,function(a,
k){var g=0,f=a.spatialReference;u.forEach(a.paths,function(a,d){var e=0,c,b,n,h,k;for(c=1;c<a.length;c++)if(b=a[c-1][0]*r,n=a[c][0]*r,h=a[c-1][1]*r,k=a[c][1]*r,h!==k||b!==n)b=F(h,b,k,n,f),e+=b.geodesicDistance;g+=e});g/=G[m];d.push(g)});return d},geodesicAreas:function(a,m){var d=[],b=[];u.forEach(a,function(a,b){var f=.0015696101447650193*B(a.spatialReference).radius;d.push(M(a,f))});u.forEach(d,function(a,d){var f=0,h=a.spatialReference;u.forEach(a.rings,function(a,d){var c=w(new v(a[0][0],a[0][1],
h)),b=w(new v(a[a.length-1][0],a[a.length-1][1],h)),g=b.x*c.y-c.x*b.y,e;for(e=0;e<a.length-1;e++)c=w(new v(a[e+1][0],a[e+1][1],h)),b=w(new v(a[e][0],a[e][1],h)),g+=b.x*c.y-c.x*b.y;f+=g});f/=G[m];b.push(f/-2)});return b},_unitsDictionary:G,_toEqualAreaPoint:w,_directGeodeticSolver:x,_inverseGeodeticSolver:F};N("extend-esri")&&H.mixin(H.getObject("geometry",!0,O),C);return C});