// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/utils/signIn/SignInHelper",["dojo/Deferred","dojo/when","esri/arcgis/OAuthInfo","esri/IdentityManager","esri/kernel"],function(g,h,k,b,d){return{signIn:function(a){var e=new g;a.forceFreshStart&&d.id.destroyCredentials();var f=function(){h(a.callback&&a.callback(d.id.credentials[0].userId),e.resolve)},c=new k({portalUrl:a.portalUrl,appId:a.appId,popup:!!a.popup});b.registerOAuthInfos([c]);b.checkSignInStatus(c.portalUrl).then(f).otherwise(function(){b.getCredential(c.portalUrl,
{oAuthPopupConfirmation:!1}).then(f)});return e.promise}}});