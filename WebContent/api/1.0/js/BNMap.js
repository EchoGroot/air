define(
  ["esri/dijit/Scalebar", "dijit/Menu", "dijit/MenuItem", "js/BNSymbol",
    "esri/geometry/Polygon", "esri/geometry/Polyline", "js/BNUtil",
    "esri/renderers/HeatmapRenderer", "dojo/dom-construct",
    "esri/InfoTemplate", "esri/dijit/InfoWindowLite",
    "esri/layers/GraphicsLayer", "dojo/dom", "dojo/dom-attr",
    "dojo/_base/array", "esri/Color", "dojo/number", "dojo/parser",
    "dojo/i18n!esri/nls/jsapi", "dijit/registry",
    "esri/InfoTemplate", "esri/tasks/QueryTask",
    "esri/tasks/query", "esri/config", "esri/map",
    "esri/geometry/Polyline", "esri/symbols/PictureMarkerSymbol",
    "esri/graphicsUtils", "esri/geometry/Circle",
    "dojo/_base/event", "esri/layers/FeatureLayer",
    "esri/geometry/Geometry", "esri/tasks/IdentifyTask",
    "esri/toolbars/draw", "esri/toolbars/edit",
    "esri/geometry/Point", "esri/SpatialReference",
    "esri/tasks/IdentifyParameters", "esri/graphic",
    "esri/tasks/GeometryService", "esri/tasks/RelationParameters",
    "esri/tasks/BufferParameters", "esri/toolbars/draw",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol", "esri/geometry/Extent",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/symbols/Font", "esri/symbols/TextSymbol",
    "esri/tasks/AreasAndLengthsParameters",
    "esri/tasks/LengthsParameters", "esri/toolbars/navigation",
    "esri/dijit/OverviewMap", "dojo/on", "dojo/parser",
    "dijit/registry", "dijit/Toolbar", "dijit/form/Button",
    "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
    "dijit/layout/TabContainer", "dojo/domReady!"
  ],
  function (Scalebar, Menu, MenuItem, BNSymbol, Polygon, Polyline, util,
    HeatmapRenderer, domConstruct, InfoTemplate, InfoWindowLite,
    GraphicsLayer, dom, domAttr, esarray, Color, number, parser,
    lang, registry, InfoTemplate, QueryTask, Query, esriConfig,
    Map, Polyline, PictureMarkerSymbol, graphicsUtils, Circle,
    event, FeatureLayer, Geometry, IdentifyTask, Draw, Edit, Point,
    SpatialReference, IdentifyParameters, Graphic, GeometryService,
    RelationParameters, BufferParameters, Draw, SimpleMarkerSymbol,
    SimpleLineSymbol, SimpleFillSymbol, Extent,
    ArcGISDynamicMapServiceLayer, Font, TextSymbol,
    AreasAndLengthsParameters, LengthsParameters, Navigation,
    OverviewMap, on, parser, registry) {
    esriConfig.defaults.io.proxyUrl = "http://" + localhostApi + "/Java/proxy.jsp";
    esriConfig.defaults.io.alwaysUseProxy = false;
    var map = "";
    var Extents = null;
    var bnSymbol = new BNSymbol();
    var convert = new myMap(); // 坐标系 自定义的可以提供转换
    convert.put("4326", "4326"); // 窗口位于点的左下
    var layerList = new myMap(); // 大集合 可以搜索
    var layerLists = new myMap(); // 大集合 可以搜索
    // mode:FeatureLayer.MODE_SNAPSHOT,
    var layerArray = new Array(); // 所有的layer 以后要往map中放
    var mapOption = null;
    var geometryServices = null;
    var pointSymbol = new SimpleMarkerSymbol(); // 默认点的样式
    pointSymbol.setOutline(null);
    pointSymbol.setColor(new Color([153, 255, 255, 1]));
    pointSymbol.setSize("10");
    var polygonSymbol = new SimpleFillSymbol(
      SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(
        SimpleLineSymbol.STYLE_SOLID, new Color(
          [255, 0, 0]), 2), new Color([255, 0, 0,
        1
      ])); // 面高亮
    var firstSymbol = new SimpleLineSymbol(
      SimpleLineSymbol.STYLE_SOLID, Color([255, 0, 0]), 2); // 线
    var testFont = new Font("10pt", Font.STYLE_NORMAL,
      Font.VARIANT_NORMAL, Font.WEIGHT_BOLD, "Arial"); // 字体样式
    testColor = new Color([0, 0, 0]);
    var testAreasymbol = new SimpleFillSymbol(
      SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(
        SimpleLineSymbol.STYLE_SOLID, new esri.Color([255,
          0, 0
        ]), 2), new esri.Color([0, 0, 255,
        0.5
      ])); // 测面的颜色
    var testDistancesymbol = new SimpleLineSymbol(
      SimpleLineSymbol.STYLE_SOLID,
      new esri.Color([255, 0, 0]), 2); // 测距颜色
    var BottomMap = new myMap();
    BMap = function (name, Objects) {
      map = new Map(name, Objects);
      return map;
    };
    BNGisTiledMapServiceLayer = function (url, option) { // 切片要素
      return new esri.layers.ArcGISTiledMapServiceLayer(url);
    };
    BNGisDynamicMapServiceLayer = function (url, option) { // 动态要素
      if (util.isEmpty(option)) {
        // var
        // DynamicMapServiceLayerOption={id:"dynamicMap"};
        return new esri.layers.ArcGISDynamicMapServiceLayer(url);
      } else {
        return new esri.layers.ArcGISDynamicMapServiceLayer(url,
          option);
      }
    };
    BNGisFeatureLayers = function (url, option) { // 要素图层
      if (util.isNotEmpty(option)) {
        return new esri.layers.FeatureLayer(url, option);
      } else {
        var FeatureLayerOption = {
          mode: 0,
          outFields: ["*"]
        };
        return new esri.layers.FeatureLayer(url, FeatureLayerOption);
      }
    };
    var switchList = new myMap(); // 切片底图
    var overviewMapDijit = null;
    var c = 0;
    var Mys = new myMap();
    var MysId = new myMap();
    var Mys2 = new myMap();
    var c1 = false;
    initLayer = function (array) { // 只初始化layer 不绑定到map上
      var c = array.baseMap;
      if (util.isNotEmpty(c)) {
        for (var i = 0; i < c.length; i++) {
          if (c.length == 1) {
            BNFloor = array.baseMap[i].name;
          } else {
            if (util.isNotEmpty(array.baseMap[i].display)) {
              if (array.baseMap[i].display) {
                BNFloor = array.baseMap[i].name;
              }
            } else {
              BNFloor = array.baseMap[i].name;
              break;
            }
          }
        }
      }
      overviewMapDijit = null;
      c = 0;
      Extents = null;
      BottomMap = new myMap();
      Mys = new myMap();
      MysId = new myMap();
      Mys2 = new myMap();
      switchList = new myMap();
      layerArray = new Array();
      layerList = new myMap();
      layerLists = new myMap();
      if (util.isNotEmpty(array.childrens)) { // 判断是否是融合地图
        if (array.type == "主专题图") {
          if (!(array.baseMap instanceof Array)) {
            var layer = BNGisTiledMapServiceLayer(array.baseMap.url);
            layerLists.put(array.baseMap.id, layer);
            layerLists.put(array.baseMap.name, layer);
            // layerList.put(array.baseMap.id,layer);
            // layerList.put(array.baseMap.name,layer);
            layerArray[layerArray.length] = layer; // 要加载的地图layer
            BottomMap.put(array.baseMap.id, layer);
            BottomMap.put(array.baseMap.name, layer);
            if (util.isEmpty(Extents) && util.isNotEmpty(array.baseMap.xmax)) {
              Extents = array.baseMap;
            };
            c = 1;
            if (util.isNotEmpty(array.baseElement)) { // 判断是否有要素
              // 如果有就加载
              var lis1 = array.baseElement;
              for (var j = 0; j < lis1.length; j++) {
                if (util.isNotEmpty(lis1[j].url)) { // 如果有，那么就是最后一级
                  var layer = BNGisFeatureLayers(lis1[j].url);
                  layerLists.put(lis1[j].id, layer);
                  layerLists.put(lis1[j].name, layer);
                  BottomMap.put(lis1[j].id, layer);
                  BottomMap.put(lis1[j].name, layer);
                  layerArray[layerArray.length] = layer; // 要加载的地图layer
                  if (lis1[j].display == false) {
                    Mys2.put(lis1[j].id, layer);
                    layer.hide();
                  }
                } else if (util.isNotEmpty(lis1[j].childrens)) { // 判断是否有下一级
                  var lis2 = lis1[j].childrens;
                  for (var h = 0; h < lis2.length; h++) {
                    if (util
                      .isNotEmpty(lis2[h].childrens)) {
                      for (var m = 0; m < lis2[h].childrens.length; m++) {
                        if (util
                          .isNotEmpty(lis2[h].childrens[m].baseElement)) {
                          for (var l = 0; l < lis2[h].childrens[m].baseElement.length; l++) {
                            if (util
                              .isNotEmpty(lis2[h].childrens[m].baseElement[l].url)) {
                              var layer = BNGisFeatureLayers(lis2[h].childrens[m].baseElement[l].url);
                              layerLists.put(lis2[h].childrens[m].baseElement[l].id,layer);
                              layerLists
                                .put(
                                  lis2[h].childrens[m].baseElement[l].name,
                                  layer);
                              layerArray[layerArray.length] = layer; // 要加载的地图layer
                              if (lis1[j].display == false) {
                                Mys2
                                  .put(
                                    lis2[h].childrens[m].baseElement[l].id,
                                    layer);
                                layer
                                  .hide();
                              }
                            } else {
                              alert();
                            }
                          }
                        }
                      }
                    } else if (util
                      .isNotEmpty(lis2[h].baseElement)) {
                      for (var l = 0; l < lis2[h].baseElement.length; l++) {
                        if (util
                          .isNotEmpty(lis2[h].baseElement[l].url)) {
                          var layer = BNGisFeatureLayers(lis2[h].baseElement[l].url);
                          layerLists
                            .put(
                              lis2[h].baseElement[l].id,
                              layer);
                          layerLists
                            .put(
                              lis2[h].baseElement[l].name,
                              layer);
                          layerArray[layerArray.length] = layer; // 要加载的地图layer
                          if (lis1[j].display == false) {
                            Mys2
                              .put(
                                lis2[h].baseElement[l].id,
                                layer);
                            layer.hide();
                          }
                        } else {
                          alert();
                        }
                      }
                    }
                  }
                }
              }
            }
          } else {
            for (var i = 0; i < array.baseMap.length; i++) {
              var layer = BNGisTiledMapServiceLayer(array.baseMap[i].url);
              layerLists.put(array.baseMap[i].id, layer);
              layerLists.put(array.baseMap[i].name, layer);
              // layerList.put(array.baseMap.id,layer);
              // layerList.put(array.baseMap.name,layer);
              BottomMap.put(array.baseMap[i].id, layer);
              BottomMap.put(array.baseMap[i].name, layer);
              if (util.isNotEmpty(array.baseMap[i].display)) {
                if (array.baseMap[i].display) {
                  layer.show();
                } else {
                  layer.hide();
                }
              }
              layerArray[layerArray.length] = layer; // 要加载的地图layer
              if (util.isEmpty(Extents) && util.isNotEmpty(array.baseMap.xmax)) {
                Extents = array.baseMap;
              };
              c = 1;
            }
            if (util.isNotEmpty(array.baseElement)) { // 判断是否有要素
              // 如果有就加载
              var lis1 = array.baseElement;
              for (var j = 0; j < lis1.length; j++) {
                if (util.isNotEmpty(lis1[j].url)) { // 如果有，那么就是最后一级
                  var layer = BNGisFeatureLayers(lis1[j].url);
                  layerLists.put(lis1[j].id, layer);
                  layerLists.put(lis1[j].name, layer);
                  layerArray[layerArray.length] = layer; // 要加载的地图layer
                  if (lis1[j].display == false) {
                    Mys2.put(lis1[j].id, layer);
                    layer.hide();
                  }
                } else if (util
                  .isNotEmpty(lis1[j].childrens)) { // 判断是否有下一级
                  var lis2 = lis1[j].childrens;
                  for (var h = 0; h < lis2.length; h++) {
                    if (util
                      .isNotEmpty(lis2[h].childrens)) {
                      for (var m = 0; m < lis2[h].childrens.length; m++) {
                        if (util
                          .isNotEmpty(lis2[h].childrens[m].baseElement)) {
                          for (var l = 0; l < lis2[h].childrens[m].baseElement.length; l++) {
                            if (util
                              .isNotEmpty(lis2[h].childrens[m].baseElement[l].url)) {
                              var layer = BNGisFeatureLayers(lis2[h].childrens[m].baseElement[l].url);
                              layerLists
                                .put(
                                  lis2[h].childrens[m].baseElement[l].id,
                                  layer);
                              layerLists
                                .put(
                                  lis2[h].childrens[m].baseElement[l].name,
                                  layer);
                              layerArray[layerArray.length] = layer; // 要加载的地图layer
                              if (lis1[j].display == false) {
                                Mys2
                                  .put(
                                    lis2[h].childrens[m].baseElement[l].id,
                                    layer);
                                layer
                                  .hide();
                              }
                            } else {
                              alert();
                            }
                          }
                        } else {
                          var layer = BNGisFeatureLayers(lis2[h].url);
                          layerLists.put(
                            lis2[h].id,
                            layer);
                          layerLists.put(
                            lis2[h].name,
                            layer);
                          layerArray[layerArray.length] = layer; // 要加载的地图layer
                          if (c == 1) {
                            Mys1.put(
                              lis2[h].id,
                              layer);
                            layer.hide();
                          }
                        }
                      }
                    } else if (util
                      .isNotEmpty(lis2[h].baseElement)) {
                      for (var l = 0; l < lis2[h].baseElement.length; l++) {
                        if (util
                          .isNotEmpty(lis2[h].baseElement[l].url)) {
                          var layer = BNGisFeatureLayers(lis2[h].baseElement[l].url);
                          layerLists
                            .put(
                              lis2[h].baseElement[l].id,
                              layer);
                          layerLists
                            .put(
                              lis2[h].baseElement[l].name,
                              layer);
                          layerArray[layerArray.length] = layer; // 要加载的地图layer
                          if (lis1[j].display == false) {
                            Mys2
                              .put(
                                lis2[h].baseElement[l].id,
                                layer);
                            layer.hide();
                          }
                        } else {
                          alert();
                        }
                      }
                    } else {
                      var layer = BNGisFeatureLayers(lis2[h].url);
                      layerLists.put(lis2[h].id,
                        layer);
                      layerLists.put(lis2[h].name,
                        layer);
                      layerArray[layerArray.length] = layer; // 要加载的地图layer
                      if (c == 1) {
                        Mys1.put(lis2[h].id, layer);
                        layer.hide();
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          if (!(array.baseMap instanceof Array)) {
            var layer = BNGisTiledMapServiceLayer(array.baseMap.url);
            layerLists.put(array.baseMap.id, layer);
            layerLists.put(array.baseMap.name, layer);
            // layerList.put(array.baseMap.id,layer);
            // layerList.put(array.baseMap.name,layer);
            layerArray[layerArray.length] = layer; // 要加载的地图layer
            if (util.isEmpty(Extents) && util.isNotEmpty(array.baseMap.xmax)) {
              Extents = array.baseMap;
            };
            c = 1;
          }
        }
      } else {
        var s = array;
        var c = new Object();
        var as = new Array();
        as[0] = s;
        c.childrens = as;
        array = c;
      }
      if (util.isNotEmpty(array.childrens)) { // 判断是否有下级
        var lis = array.childrens;
        for (var i = 0; i < lis.length; i++) {
          var Mys1 = new myMap();
          if (util.isNotEmpty(lis[i].baseMap)) { // 下级是否有切片
            var lis1 = lis[i].baseMap;
            for (var j = 0; j < lis1.length; j++) {
              var layer = BNGisTiledMapServiceLayer(array.childrens[i].baseMap[j].url);
              layerLists
                .put(array.childrens[i].baseMap[j].id,
                  layer);
              layerLists.put(
                array.childrens[i].baseMap[j].name,
                layer);
              layerArray[layerArray.length] = layer; // 要加载的地图layer
              if (c == 1) {
                Mys1.put(array.childrens[i].baseMap[j].id,
                  layer);
                switchList.put(
                  array.childrens[i].baseMap[j].name,
                  layer);
                layer.hide();
              }
            };
          }
          if (util.isNotEmpty(array.childrens[i].baseElement)) { // 判断是否有要素
            // 如果有就加载
            var lis1 = array.childrens[i].baseElement;
            for (var j = 0; j < lis1.length; j++) {
              if (util.isNotEmpty(lis1[j].url)) { // 如果有，那么就是最后一级
                var layer = BNGisFeatureLayers(lis1[j].url);
                layerLists.put(lis1[j].id, layer);
                layerLists.put(lis1[j].name, layer);
                layerArray[layerArray.length] = layer; // 要加载的地图layer
                if (c == 1) {
                  Mys1.put(lis1[j].id, layer);
                  layer.hide();
                }
              } else if (util.isNotEmpty(lis1[j].childrens)) { // 判断是否有下一级
                var lis2 = lis1[j].childrens;
                for (var h = 0; h < lis2.length; h++) {
                  if (util.isNotEmpty(lis2[h].childrens)) {
                    for (var m = 0; m < lis2[h].childrens.length; m++) {
                      if (util
                        .isNotEmpty(lis2[h].childrens[m].baseElement)) {
                        for (var l = 0; l < lis2[h].childrens[m].baseElement.length; l++) {
                          if (util
                            .isNotEmpty(lis2[h].childrens[m].baseElement[l].url)) {
                            var layer = BNGisFeatureLayers(lis2[h].childrens[m].baseElement[l].url);
                            layerLists
                              .put(
                                lis2[h].childrens[m].baseElement[l].id,
                                layer);
                            layerLists
                              .put(
                                lis2[h].childrens[m].baseElement[l].name,
                                layer);
                            layerArray[layerArray.length] = layer; // 要加载的地图layer
                            if (c == 1) {
                              Mys1
                                .put(
                                  lis2[h].childrens[m].baseElement[l].id,
                                  layer);
                              layer.hide();
                            }
                          } else {}
                        }
                      } else {
                        var layer = BNGisFeatureLayers(lis2[h].url);
                        layerLists.put(lis2[h].id,
                          layer);
                        layerLists
                          .put(lis2[h].name,
                            layer);
                        layerArray[layerArray.length] = layer; // 要加载的地图layer
                        if (c == 1) {
                          Mys1.put(lis2[h].id,
                            layer);
                          layer.hide();
                        }
                      }
                    }
                  } else if (util
                    .isNotEmpty(lis2[h].baseElement)) {
                    for (var l = 0; l < lis2[h].baseElement.length; l++) {
                      if (util
                        .isNotEmpty(lis2[h].baseElement[l].url)) {
                        var layer = BNGisFeatureLayers(lis2[h].baseElement[l].url);
                        layerLists
                          .put(
                            lis2[h].baseElement[l].id,
                            layer);
                        layerLists
                          .put(
                            lis2[h].baseElement[l].name,
                            layer);
                        layerArray[layerArray.length] = layer; // 要加载的地图layer
                        if (c == 1) {
                          Mys1
                            .put(
                              lis2[h].baseElement[l].id,
                              layer);
                          layer.hide();
                        }
                      } else {}
                    }
                  } else {
                    var layer = BNGisFeatureLayers(lis2[h].url);
                    layerLists.put(lis2[h].id, layer);
                    layerLists.put(lis2[h].name, layer);
                    layerArray[layerArray.length] = layer; // 要加载的地图layer
                    if (c == 1) {
                      Mys1.put(lis2[h].id, layer);
                      layer.hide();
                    }
                  }
                }
              }
            }
          }
          if (c == 1) {
            Mys.put(lis[i].name, Mys1);
            MysId.put(lis[i].id, Mys1);
          }
        };
        //
      };
      if (util.isNotEmpty(array.GeometryServices)) {
        geometryServices = new GeometryService(
          array.GeometryServices.url); // 本身使用
      } else if (util.isNotEmpty(array.childrens)) {
        geometryServices = new GeometryService(
          array.childrens[0].GeometryServices.url);
      }
      return layerList;
    };
    init = function () { // 初始化
      esri.config.defaults.io.corsDetection = false;
      esriConfig.defaults.map.panDuration = 500; // 单位是毫秒，默认值是250
      esriConfig.defaults.map.panRate = 50; // 单位是毫秒，默认值是25
      for (var i = 0; i < layerArray.length; i++) {
        map.addLayer(layerArray[i]);
      }
      if (util.isNotEmpty(Extents)) {
        setTimeout(function () {
          map.setExtent(new Extent(Extents.xmin, Extents.ymin,
            Extents.xmax, Extents.ymax,
            map.spatialReference));
        }, 1000);
        //
      }
      if (util.isNotEmpty(switchList)) {
        // 融合地图
        if (util.isNotEmpty(mapOption)) {
          if ($("#panel-box").html() == undefined) {
            $("#" + mapOption.id).css("position", "relative");
            $("#" + mapOption.id)
              .append(
                '<div id="panel-box" style="display:none;background:#fff;margin: 0px;background-size: 100% 100%;text-align: center;position: absolute;right: 29px;bottom: 50px;color: #333;overflow: hidden;"></div>'
              );
          }
        }
        map
          .on(
            "zoom-end",
            function () {
              if (map.getLevel() >= 3) {
                if ($("#panel-box").html() != "") {
                  $("#panel-box").show();
                } else {
                  var html = "";
                  for (var i = 0; i < switchList
                    .keys().length; i++) {
                    if (i == 0) {
                      html += "<li style=\"list-style: none;cursor: pointer;height: 35px;line-height: 40px;    padding: 0 5px 0 5px;\" onclick='f12(\"" + switchList
                        .keys()[i] + "\",this)'>" + switchList
                        .keys()[i] + "</li>";
                    } else if ((i + 1) != switchList
                      .keys().length) {
                      html += "<li style=\"list-style: none;cursor: pointer;height: 35px;line-height: 40px;    padding: 0 5px 0 5px;\" onclick='f12(\"" + switchList
                        .keys()[i] + "\",this)'>" + switchList
                        .keys()[i] + "</li>";
                    } else {
                      html += "<li style=\"list-style: none;cursor: pointer;height: 35px;line-height: 30px;    padding: 0 5px 0 5px;\" onclick='f12(\"" + switchList
                        .keys()[i] + "\",this)'>" + switchList
                        .keys()[i] + "</li>";
                    }
                    $("#panel-box").html(html);
                  }
                  $("#panel-box").show();
                }
              } else {
                if (util.isNotEmpty($("#panel-box")
                  .html())) {
                  for (var i = 0; i < Mys.keys().length; i++) {
                    var m = Mys
                      .get(Mys.keys()[i]);
                    for (var j = 0; j < m
                      .keys().length; j++) {
                      m.get(m.keys()[j])
                        .hide();
                    }
                  }
                  /*
                   * for(var
                   * i=0;i<Mys2.keys().length;i++){
                   * var
                   * m=Mys2.get(Mys2.keys()[i]);
                   * m.show(); }
                   */
                  document
                    .getElementById("panel-box").style.display = "none";
                }
                for (var i = 0; i < Mys.keys().length; i++) { // 先全部隐藏
                  $($("#panel-box li")[i]).css(
                    "background", "");
                  $($("#panel-box li")[i]).css(
                    "color", "#333");
                  var m = Mys.get(Mys.keys()[i]);
                  for (var j = 0; j < m.keys().length; j++) {
                    m.get(m.keys()[j]).hide();
                  }
                }
              }
            });
      }
    };
    f12 = function (name, o) {
      BNFloor = name;
      for (var i = 0; i < Mys2.keys().length; i++) {
        var m = Mys2.get(Mys2.keys()[i]);
        m.hide();
      }
      for (var i = 0; i < Mys.keys().length; i++) { // 先全部隐藏
        $($("#panel-box li")[i]).css("background", "");
        $($("#panel-box li")[i]).css("color", "#333");
        var m = Mys.get(Mys.keys()[i]);
        for (var j = 0; j < m.keys().length; j++) {
          m.get(m.keys()[j]).hide();
        }
      }
      /*
       * if(map.getLevel()<3){ map.setLevel(3);
       * navToolbar.zoomToFullExtent(); }
       */
      for (var i = 0; i < Mys.keys().length; i++) { // 先全部隐藏
        var m = Mys.get(Mys.keys()[i]);
        if (name == Mys.keys()[i] || name == MysId.keys()[i]) {
          name = Mys.keys()[i];
          for (var j = 0; j < m.keys().length; j++) {
            m.get(m.keys()[j]).show();
          }
        }
      }
      if (util.isNotEmpty(o)) {
        $(o).css("background", "#3385ff");
        $(o).css("color", "#fff");
      } else {
        for (var i = 0; i < $("#panel-box li").length; i++) {
          if ($($("#panel-box li")[i]).html() == name) {
            $($("#panel-box li")[i]).css("background",
              "#3385ff");
            $($("#panel-box li")[i]).css("color", "#fff");
          }
        }
      }
    };
    BNNavToolbar = function (InnerMap) { // 小工具效果
      return new Navigation(InnerMap);
    };
    mapQuerys = function (name, option, Callback, ErrorCallback) { // 查询
      var query = new Query();
      if (util.isNotEmpty(option.where) && util.isNotEmpty(option.SYSTEM_CODE)) {
        if (option.SYSTEM_CODE.length > 1000) {
          if (util.isNotEmpty(ErrorCallback)) {
            ErrorCallback({
              "message": "SYSTEM_CODE过长，不得超过1000"
            });
          }
          return {
            "message": "SYSTEM_CODE过长，不得超过1000"
          };
        }
        var system = "(";
        for (var i = 0; i < option.SYSTEM_CODE.length; i++) {
          system += "'" + option.SYSTEM_CODE[i] + "'" + ",";
        }
        system = system.substring(0, system.length - 1) + ")";
        query.where = option.where + " and SYSTEM_CODE in" + system;
      } else if (util.isNotEmpty(option.where) && util.isEmpty(option.SYSTEM_CODE)) {
        query.where = option.where;
      } else if (util.isEmpty(option.where) && util.isNotEmpty(option.SYSTEM_CODE)) {
        if (option.SYSTEM_CODE.length > 1000) {
          return {
            "message": "SYSTEM_CODE过长，不得超过1000"
          };
        }
        var system = "(";
        for (var i = 0; i < option.SYSTEM_CODE.length; i++) {
          system += "'" + option.SYSTEM_CODE[i] + "'" + ",";
        }
        system = system.substring(0, system.length - 1) + ")";
        query.where = "SYSTEM_CODE in" + system;
      } else if (util.isEmpty(option.where) && util.isEmpty(option.SYSTEM_CODE)) {
        query.where = "1=1";
      }
      if (util.isNotEmpty(option.geometry)) { // not
        if (option.geometry.type == "point") {
          option.geometry = Circle(option.geometry, {
            "radius": 10
          }); // 添加缓存
        }
        query.geometry = option.geometry;
      }
      query.returnGeometry = true;
      if (util.isEmpty(option.options)) {
        query.outFields = ["*"];
      } else {
        query.outFields = option.options;
      }
      /*
       * if(util.isEmpty(Maplayer.options)){ }
       */
      var layer = layerLists.get(name);
      queryTask = new QueryTask(layer.url);
      queryTask.execute(query, function (results) {
        Callback(results.features);
      }, function onError(data) {
        if (util.isNotEmpty(ErrorCallback)) {
          ErrorCallback(data);
        }
      });
    };
    mapResourceQuerys = function (name, option, Callback, ErrorCallback) { // 资源查询
      var query = new Query();
      query.where = option.where;
      query.returnGeometry = true;
      query.outFields = option.options;
      var layer = layerLists.get(name);
      queryTask = new QueryTask(layer.url);
      queryTask.execute(query, function (results) {
        Callback(results.features);
      }, function onError(data) {
        ErrorCallback(data);
      });
    };
    graphics = function (geometry, Symbol) { //
      return new Graphic(geometry, Symbol);
    };
    PictureMarkerSymbolFunction = function (image, wi, hi) { // 图片符号
      return new PictureMarkerSymbol(image, wi, hi);
    };
    BNGraphicsLayer = function (option) {
      if (util.isEmpty(option)) {
        return new GraphicsLayer();
      } else {
        return new GraphicsLayer(option);
      }
    };
    var navToolbar = null;
    var drawingTool = null;

    function _person(array, options, Callback, ErrorCallback) {
      var _this = this;
      _this.displayDistUnits = "米";
      // 构造函数安全模式，避免创建时候丢掉new关键字
      if (_this instanceof _person) {
        // 共有属性, 方法
        _this.resourceLayer = initLayer(array);
        _this.maps = null;
        _this.directorys = null;
        _this.initOptions = options;
        _this.getResourceLayer = function (name) {
          return _this.resourceLayer.get(name);
        };
        _this.layerLists = function () {
          return layerLists;
        }
        _this.getLayer = function (name) {
          var layer = layerLists.get(name);
          return layer;
        };
        if (util.isNotEmpty(options)) {
          if (util.isNotEmpty(options.id)) {
            _this.InnerMap = BMap(options.id, options.options); // 初始化map
            _this.initOptions = options;
            mapOption = options;
            navToolbar = BNNavToolbar(_this.InnerMap);
            drawingTool = new Draw(_this.InnerMap);
            _this.geometryServices = geometryServices;
            init();
            _this.spatialReference = new SpatialReference({
              "wkt": 'PROJCS["BNAH",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Berghaus_Star"],PARAMETER["False_Easting",500000.0],PARAMETER["False_Northing",500000.0],PARAMETER["Central_Meridian",116.385],PARAMETER["Latitude_Of_Origin",39.461],PARAMETER["XY_Plane_Rotation",-7.0],UNIT["Meter",1.0]]'
            });
            _this.InnerMap
              .on(
                "load",
                function () {
                  _this.spatialReference = _this.InnerMap.spatialReference;
                });
          } else {
            if (util.isNotEmpty(ErrorCallback)) {
              ErrorCallback({
                "message": "地图加载id不能为空"
              });
            } else {
              return {
                "message": "地图加载id不能为空"
              };
            }
          }
        } else {
          _this.BNInit = function (options, Callback,
            ErrorCallback) { // 初始化方法
            // 根据数据去初始化地图，后期添加自定义字段
            // 比如是否默认显示，默认隐藏
            if (util.isNotEmpty(options.id)) {
              _this.InnerMap = BMap(options.id,
                options.options); // 初始化map
              navToolbar = BNNavToolbar(_this.InnerMap);
              drawingTool = new Draw(_this.InnerMap);
              _this.geometryServices = geometryServices;
              init();
            }
            _this.spatialReference = new SpatialReference({
              "wkt": 'PROJCS["BNAH",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Berghaus_Star"],PARAMETER["False_Easting",500000.0],PARAMETER["False_Northing",500000.0],PARAMETER["Central_Meridian",116.385],PARAMETER["Latitude_Of_Origin",39.461],PARAMETER["XY_Plane_Rotation",-7.0],UNIT["Meter",1.0]]'
            });
            _this.InnerMap
              .on(
                "load",
                function () {
                  _this.spatialReference = _this.InnerMap.spatialReference;
                });
            mapOption = options;
            if (util.isNotEmpty(mapOption)) {
              if ($("#panel-box").html() == undefined) {
                $("#" + mapOption.id).css("position",
                  "relative");
                $("#" + mapOption.id)
                  .append(
                    '<div id="panel-box" style="display:none;background:#fff;margin: 0px;background-size: 100% 100%;width:45px;text-align: center;position: absolute;right: 29px;bottom: 50px;color: #333;overflow: hidden;"></div>'
                  );
              }
              /*
               * {
               * "layer":BindLayer,
               * "where":"1=1",
               * "options":["SYSTEM_CODE"], "" }
               */
              //
            } else {
              if (util.isNotEmpty(ErrorCallback)) {
                ErrorCallback({
                  "message": "地图加载id不能为空"
                });
              } else {
                return {
                  "message": "地图加载id不能为空"
                };
              }
            }
          };
        }
        /*
         * _this.BNQueryLayer=function(BindLayer,Callback,ErrorCallback){
         * //查询方法 return
         * BNQueryLayer(BindLayer,Callback,ErrorCallback); };
         */
        _this.switchDCJ = function (name) {
          // BNMap.InnerMap.setZoom(3);
          // _this.setCenter();
          // BNMap.setExtent(BNMap.Extent(501791.72027497564,504481.7671330348,504331.7253549858,505783.51973654,BNMap.spatialReference))
          f12(name);
        };
        _this.Extent = function (xmin, ymin, xmax, ymax,
          spatialReference) {
          return new Extent(xmin, ymin, xmax, ymax,
            spatialReference);
        };
        // 地图显示隐藏
        _this.visableLayers = function (layerArray, flag) {
          for (var i = 0; i < layerArray.length; i++) {
            if (flag) {
              _this.getLayer(layerArray[i]).show();
            } else {
              _this.getLayer(layerArray[i]).hide();
            }
          }
        };
        _this.setCenter = function (point) {
          if (point) {
            _this.InnerMap.centerAt(point);
          } else {
            // _this.InnerMap.setZoom(1);
            navToolbar.zoomToFullExtent();
            // _this.InnerMap.centerAt(_this.InnerMap.extent.getCenter());
          }
        };
        // 地图切换
        _this.switchMap = function (array) {
          if (typeof array == "string") {
            for (var i in _this.directorys) {
              if (util.isNotEmpty(_this.directorys[i].id)) {
                if (_this.directorys[i].id == array) {
                  _this.maps = _this.directorys[i];
                  var c = _this.maps;
                  if (util.isNotEmpty(c)) {
                    for (var i = 0; i < c.length; i++) {
                      if (c.length == 1) {
                        BNFloor = c.baseMap[i].name;
                      } else {
                        if (util
                          .isNotEmpty(c.baseMap[i].display)) {
                          if (c.baseMap[i].display) {
                            BNFloor = c.baseMap[i].name;
                          }
                        } else {
                          BNFloor = c.baseMap[i].name;
                          break;
                        }
                      }
                    }
                  }
                }
              }
            }
            if (util.isNotEmpty(_this.maps)) {
              if (_this.maps.id == array) { // 第一级
                // //有大场景的融合底图
                var ztt = _this.maps; // 拿到要加载的专题图
                _this.InnerMap = null;
                document.getElementById(mapOption.id).innerHTML = "";
                _this.InnerMap = BMap(mapOption.id,
                  mapOption.options); // 初始化map
                navToolbar = BNNavToolbar(_this.InnerMap);
                drawingTool = new Draw(_this.InnerMap);
                _this.geometryServices = geometryServices;
                // _this.InnerMap=BMap(mapOption.id,mapOption.options);
                // //初始化map
                // navToolbar=BNNavToolbar(_this.InnerMap);
                // drawingTool=new
                // Draw(_this.InnerMap);
                setTimeout(
                  function () {
                    initLayer(ztt);
                    // setTimeout(function(){
                    init();
                    _this.spatialReference = new SpatialReference({
                      "wkt": 'PROJCS["BNAH",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Berghaus_Star"],PARAMETER["False_Easting",500000.0],PARAMETER["False_Northing",500000.0],PARAMETER["Central_Meridian",116.385],PARAMETER["Latitude_Of_Origin",39.461],PARAMETER["XY_Plane_Rotation",-7.0],UNIT["Meter",1.0]]'
                    });
                    _this.InnerMap
                      .on(
                        "load",
                        function () {
                          _this.spatialReference = _this.InnerMap.spatialReference;
                        });
                    // },500);
                  }, 500);
              } else {
                if (util.isNotEmpty(_this.maps.childrens)) { // 判断是否有下级
                  var lists = _this.maps.childrens; // 拿到下级
                  for (var i = 0; i < lists.length; i++) {
                    if (_this.maps.childrens[i].id == array) {
                      var ztt = _this.maps.childrens[i]; // 拿到要加载的专题图
                      _this.InnerMap = null;
                      document
                        .getElementById(mapOption.id).innerHTML = "";
                      _this.InnerMap = BMap(
                        mapOption.id,
                        mapOption.options); // 初始化map
                      navToolbar = BNNavToolbar(_this.InnerMap);
                      drawingTool = new Draw(
                        _this.InnerMap);
                      _this.geometryServices = geometryServices;
                      // _this.InnerMap=BMap(mapOption.id,mapOption.options);
                      // //初始化map
                      // navToolbar=BNNavToolbar(_this.InnerMap);
                      // drawingTool=new
                      // Draw(_this.InnerMap);
                      setTimeout(
                        function () {
                          initLayer(ztt);
                          // setTimeout(function(){
                          init();
                          _this.spatialReference = new SpatialReference({
                            "wkt": 'PROJCS["BNAH",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Berghaus_Star"],PARAMETER["False_Easting",500000.0],PARAMETER["False_Northing",500000.0],PARAMETER["Central_Meridian",116.385],PARAMETER["Latitude_Of_Origin",39.461],PARAMETER["XY_Plane_Rotation",-7.0],UNIT["Meter",1.0]]'
                          });
                          _this.InnerMap
                            .on(
                              "load",
                              function () {
                                _this.spatialReference = _this.InnerMap.spatialReference;
                              });
                          // },500);
                        }, 500);
                    }
                  }
                }
              }
            } else {
              return {
                "message": "未使用BN工厂模式创建，不能使用id切换"
              };
            }
          } else {
            _this.InnerMap = null;
            document.getElementById(mapOption.id).innerHTML = "";
            _this.InnerMap = BMap(mapOption.id,
              mapOption.options); // 初始化map
            navToolbar = BNNavToolbar(_this.InnerMap);
            setTimeout(
              function () {
                initLayer(array);
                init();
                _this.spatialReference = new SpatialReference({
                  "wkt": 'PROJCS["BNAH",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Berghaus_Star"],PARAMETER["False_Easting",500000.0],PARAMETER["False_Northing",500000.0],PARAMETER["Central_Meridian",116.385],PARAMETER["Latitude_Of_Origin",39.461],PARAMETER["XY_Plane_Rotation",-7.0],UNIT["Meter",1.0]]'
                });
                _this.InnerMap
                  .on(
                    "load",
                    function () {
                      _this.spatialReference = _this.InnerMap.spatialReference;
                    });
              }, 500);
          }
        };
        addLayers = function (name) {
          c = name;
          if (util.isNotEmpty(c)) {
            if (util.isNotEmpty(c.baseMap)) { // 判断切片是否为空
              if ((c.baseMap) instanceof Array) { // 循环资源目录
                for (var v = 0; v < c.baseMap.length; v++) { // 循环添加切片
                  d = BNGisTiledMapServiceLayer(c.baseMap[v].url); // 创建切片
                  if (util.isEmpty(layerLists.get(c.id))) { // 判断地图上是否已经添加了改专题图
                    layerLists.put(c.name, d); // 添加到大集合中
                    layerLists.put(c.id, d); // 添加到大集合中
                    if (BNFloor == c.name) { // 判断当前打开的地图是否是当前的地图
                      d.show(); // 如果是当前打开的底图
                      // 当前添加的切片默认显示
                    } else {
                      d.hide(); // 当前添加的切片默认隐藏
                    }
                    _this.InnerMap.addLayer(d); // 添加到地图上
                    if (util.isEmpty(switchList
                      .get(c.name))) { // 判断切换集合中是否有当前的专题图
                      switchList.put(c.name, d); // 没有的话添加到切片集合中
                      if (map.getLevel() >= 3) {
                        var html = "";
                        for (var i = 0; i < switchList
                          .keys().length; i++) {
                          /* if(i==0){ */
                          if (switchList.keys()[i] == BNFloor) {
                            html +=
                              "<li style=\"list-style: none;cursor: pointer;height: 35px;    padding: 0 5px 0 5px;line-height: 40px;background:#3385ff;color:#fff;\" onclick='f12(\"" +
                              switchList
                              .keys()[i] + "\",this)'>" + switchList
                              .keys()[i] + "</li>";
                          } else {
                            html += "<li style=\"list-style: none;cursor: pointer;height: 35px;    padding: 0 5px 0 5px;line-height: 40px;\" onclick='f12(\"" + switchList
                              .keys()[i] + "\",this)'>" + switchList
                              .keys()[i] + "</li>";
                          }
                          $("#panel-box").html(
                            html);
                        }
                        $("#panel-box").show();
                      }
                    } else {
                      if (switchList.get(c.name).type == "Feature Layer") {
                        switchList.remove(c.name);
                        switchList.put(c.name, d);
                      }
                    }
                  }
                  var s = Mys.get(c.name); // 拿到当前准备添加的数组
                  if (util.isEmpty(s)) { // 如果为空
                    Mys.put(c.name, new myMap());
                    s = Mys.get(c.name);
                    s.put(c.baseMap[v].id, d);
                  } else {
                    s.put(c.baseMap[v].id, d);
                  }
                }
              } else {
                d = BNGisTiledMapServiceLayer(c.baseMap.url); // 创建切片
                if (util.isEmpty(layerLists.get(c.id))) { // 判断地图上是否已经添加了改专题图
                  layerLists.put(c.name, d); // 添加到大集合中
                  layerLists.put(c.id, d); // 添加到大集合中
                  if (BNFloor == c.name) { // 判断当前打开的地图是否是当前的地图
                    d.show(); // 如果是当前打开的底图
                    // 当前添加的切片默认显示
                  } else {
                    d.hide(); // 当前添加的切片默认隐藏
                  }
                  _this.InnerMap.addLayer(d); // 添加到地图上
                  if (util
                    .isEmpty(switchList.get(c.name))) { // 判断切换集合中是否有当前的专题图
                    switchList.put(c.name, d); // 没有的话添加到切片集合中
                    if (map.getLevel() >= 3) {
                      var html = "";
                      for (var i = 0; i < switchList
                        .keys().length; i++) {
                        /* if(i==0){ */
                        if (switchList.keys()[i] == BNFloor) {
                          html +=
                            "<li style=\"list-style: none;cursor: pointer;height: 35px;    padding: 0 5px 0 5px;line-height: 40px;background:#3385ff;color:#fff;\" onclick='f12(\"" +
                            switchList
                            .keys()[i] + "\",this)'>" + switchList
                            .keys()[i] + "</li>";
                        } else {
                          html += "<li style=\"list-style: none;cursor: pointer;height: 35px;    padding: 0 5px 0 5px;line-height: 40px;\" onclick='f12(\"" + switchList
                            .keys()[i] + "\",this)'>" + switchList
                            .keys()[i] + "</li>";
                        }
                        $("#panel-box").html(html);
                      }
                      $("#panel-box").show();
                    }
                  } else {
                    if (switchList.get(c.name).type == "Feature Layer") {
                      switchList.remove(c.name);
                      switchList.put(c.name, d);
                    }
                  }
                }
              }
            }
            if (util.isNotEmpty(c.baseElement)) {
              for (var v = 0; v < c.baseElement.length; v++) {
                d = BNGisFeatureLayers(c.baseElement[v].url);
                var s = Mys.get(c.name); // 拿到当前准备添加的数组
                if (util.isNotEmpty(s)) { // 判断当前添加的数组是否为空
                  if (BNFloor == c.name) {
                    d.show();
                  } else {
                    d.hide();
                  }
                  if (util.isNotEmpty(Mys2
                    .get(c.baseElement[v].id))) {
                    Mys2.put(c.baseElement[v].id, d);
                  }
                  _this.InnerMap.addLayer(d);
                  layerLists
                    .put(c.baseElement[v].name, d);
                  layerLists.put(c.baseElement[v].id, d);
                  s.put(c.baseElement[v].id, d);
                } else {
                  if (BNFloor == c.name) {
                    d.show();
                  } else {
                    d.hide();
                  }
                  Mys2.put(c.baseElement[v].id, d);
                  Mys.put(c.name, new myMap());
                  _this.InnerMap.addLayer(d);
                  layerLists
                    .put(c.baseElement[v].name, d);
                  layerLists.put(c.baseElement[v].id, d);
                  var s = Mys.get(c.name); // 拿到当前准备添加的数组
                  s.put(c.baseElement[v].id, d);
                  if (util
                    .isEmpty(switchList.get(c.name))) {
                    switchList.put(c.baseElement[v].id,
                      d);
                    if (map.getLevel() >= 3) {
                      var html = "";
                      for (var i = 0; i < switchList
                        .keys().length; i++) {
                        /* if(i==0){ */
                        if (switchList.keys()[i] == BNFloor) {
                          html +=
                            "<li style=\"list-style: none;cursor: pointer;height: 35px;    padding: 0 5px 0 5px;line-height: 40px;background:#3385ff;color:#fff;\" onclick='f12(\"" +
                            switchList
                            .keys()[i] + "\",this)'>" + switchList
                            .keys()[i] + "</li>";
                        } else {
                          html += "<li style=\"list-style: none;cursor: pointer;height: 35px;    padding: 0 5px 0 5px;line-height: 40px;\" onclick='f12(\"" + switchList
                            .keys()[i] + "\",this)'>" + switchList
                            .keys()[i] + "</li>";
                        }
                        $("#panel-box").html(html);
                      }
                      $("#panel-box").show();
                    }
                  }
                }
              }
            }
          }
        };
        removeLayers=function(name){
            c=name;
            if (util.isNotEmpty(c)) {
   		 if (util.isNotEmpty(c.baseMap)) { // 判断切片是否为空
   		     for (var v = 0; v < c.baseMap.length; v++) { // 循环删除切片
   			 var d=layerLists.get(c.name);
   			 if(util.isNotEmpty(d)){
                      	     _this.InnerMap.removeLayer(d);
                      	 }
                      	 var d=layerLists.get(c.id);
   			 if(util.isNotEmpty(d)){
                      	     _this.InnerMap.removeLayer(d);
                      	 }
   			     layerLists.remove(c.name); // 添加到大集合中
                            layerLists.remove(c.id);
                            switchList.remove(c.name);
                            switchList.remove(c.id);
   		     }
   		     if (map.getLevel() >= 3) {
                            var html = "";
                            for (var i = 0; i < switchList.keys().length; i++) {
                              if (switchList.keys()[i] == BNFloor) {
                                html +=
                                  "<li style=\"list-style: none;cursor: pointer;height: 35px;    padding: 0 5px 0 5px;line-height: 40px;background:#3385ff;color:#fff;\" onclick='f12(\"" +
                                  switchList
                                  .keys()[i] + "\",this)'>" + switchList
                                  .keys()[i] + "</li>";
                              } else {
                                html += "<li style=\"list-style: none;cursor: pointer;height: 35px;    padding: 0 5px 0 5px;line-height: 40px;\" onclick='f12(\"" +
                                  switchList
                                  .keys()[i] + "\",this)'>" + switchList
                                  .keys()[i] + "</li>";
                              }
                              
                            }
                            $("#panel-box").html(html);
                            $("#panel-box").show();
                          }else{
                              $("#panel-box").hide();
                          }
   		 }
   		 
   		 if (util.isNotEmpty(c.baseElement)) {
                        for (var v = 0; v < c.baseElement.length; v++) {
                   	 var d=layerLists.get(c.baseElement[v].name);
                   	 if(util.isNotEmpty(d)){
                      	     _this.InnerMap.removeLayer(d);
                      	 }
   			 layerLists.remove(c.baseElement[v].name); // 添加到大集合中
                            layerLists.remove(c.baseElement[v].id);
                            switchList.remove(c.baseElement[v].id);
                            Mys.remove(c.baseElement[v].id);
                            Mys2.remove(c.baseElement[v].id);
                            Mys.remove(c.id);
                            Mys.remove(c.name);
                        }
   		 }
   		 if (util.isNotEmpty(c.childrens)) {
                        for (var l = 0; l < c.childrens.length; l++) {
                   	 removeLayers(c.childrens[l]);
                        }
                      }
   	     }
        }
        _this.removeLayer=function(name){
            for (var i in _this.directorys) {
        	 var c = _this.directorys[i];
        	 if (util.isNotEmpty(c.name) || util.isNotEmpty(c.id)) {
        	     if ((c.name == name) || (c.id == name)) {
        		 if (util.isNotEmpty(c)) {
            		 if (util.isNotEmpty(c.baseMap)) { // 判断切片是否为空
            		     for (var v = 0; v < c.baseMap.length; v++) { // 循环删除切片
            			 var d=layerLists.get(c.name);
            			 if(util.isNotEmpty(d)){
                               	     _this.InnerMap.removeLayer(d);
                               	 }
                               	 var d=layerLists.get(c.id);
            			 if(util.isNotEmpty(d)){
                               	     _this.InnerMap.removeLayer(d);
                               	 }
            			     layerLists.remove(c.name); // 添加到大集合中
                                     layerLists.remove(c.id);
                                     switchList.remove(c.name);
                                     switchList.remove(c.id);
            		     }
            		     if (map.getLevel() >= 3) {
                                     var html = "";
                                     for (var i = 0; i < switchList.keys().length; i++) {
                                       if (switchList.keys()[i] == BNFloor) {
                                         html +=
                                           "<li style=\"list-style: none;cursor: pointer;height: 35px;    padding: 0 5px 0 5px;line-height: 40px;background:#3385ff;color:#fff;\" onclick='f12(\"" +
                                           switchList
                                           .keys()[i] + "\",this)'>" + switchList
                                           .keys()[i] + "</li>";
                                       } else {
                                         html += "<li style=\"list-style: none;cursor: pointer;height: 35px;    padding: 0 5px 0 5px;line-height: 40px;\" onclick='f12(\"" +
                                           switchList
                                           .keys()[i] + "\",this)'>" + switchList
                                           .keys()[i] + "</li>";
                                       }
                                       
                                     }
                                     $("#panel-box").html(html);
                                     $("#panel-box").show();
                                   }else{
                                       $("#panel-box").hide();
                                   }
            		 }
            		 
            		 if (util.isNotEmpty(c.baseElement)) {
                                 for (var v = 0; v < c.baseElement.length; v++) {
                            	 var d=layerLists.get(c.baseElement[v].name);
                            	 if(util.isNotEmpty(d)){
                               	     _this.InnerMap.removeLayer(d);
                               	 }
            			 layerLists.remove(c.baseElement[v].name); // 添加到大集合中
                                     layerLists.remove(c.baseElement[v].id);
                                     switchList.remove(c.baseElement[v].id);
                                     Mys.remove(c.baseElement[v].id);
                                     Mys2.remove(c.baseElement[v].id);
                                     Mys.remove(c.id);
                                     Mys.remove(c.name);
                                 }
            		 }
            		 if (util.isNotEmpty(c.childrens)) {
                                 for (var l = 0; l < c.childrens.length; l++) {
                            	 removeLayers(c.childrens[l]);
                                 }
                               }
            	     }
        	     }
        	     
        	 }
            }
        };
        _this.creatLayer = function (name, options) { // switchList
          if (util.isEmpty(options)) { // 添加专题图
            for (var i in _this.directorys) {
              var c = _this.directorys[i];
              if (util.isNotEmpty(c.name) || util.isNotEmpty(c.id)) {
                if ((c.name == name) || (c.id == name)) {
                    if(util.isNotEmpty(layerLists.get(name))){
                	return;
                    }
                  if (util.isNotEmpty(c)) {
                    if (util.isNotEmpty(c.baseMap)) { // 判断切片是否为空
                      if ((c.baseMap) instanceof Array) { // 循环资源目录
                        for (var v = 0; v < c.baseMap.length; v++) { // 循环添加切片
                          d = BNGisTiledMapServiceLayer(c.baseMap[v].url); // 创建切片
                          if (util.isEmpty(layerLists.get(c.id))) { // 判断地图上是否已经添加了改专题图
                            layerLists.put(c.name, d); // 添加到大集合中
                            layerLists.put(c.id, d); // 添加到大集合中
                            if (BNFloor == c.name) { // 判断当前打开的地图是否是当前的地图
                              d.show(); // 如果是当前打开的底图
                              // 当前添加的切片默认显示
                            } else {
                              d.hide(); // 当前添加的切片默认隐藏
                            }
                            _this.InnerMap.addLayer(d); // 添加到地图上
                            if (util.isEmpty(switchList.get(c.name))) { // 判断切换集合中是否有当前的专题图
                              switchList.put(c.name,d); // 没有的话添加到切片集合中
                              if (map.getLevel() >= 3) {
                                var html = "";
                                for (var i = 0; i < switchList.keys().length; i++) {
                                  /* if(i==0){ */
                                  if (switchList.keys()[i] == BNFloor) {
                                    html +=
                                      "<li style=\"list-style: none;cursor: pointer;height: 35px;    padding: 0 5px 0 5px;line-height: 40px;background:#3385ff;color:#fff;\" onclick='f12(\"" +
                                      switchList
                                      .keys()[i] + "\",this)'>" + switchList
                                      .keys()[i] + "</li>";
                                  } else {
                                    html += "<li style=\"list-style: none;cursor: pointer;height: 35px;    padding: 0 5px 0 5px;line-height: 40px;\" onclick='f12(\"" +
                                      switchList
                                      .keys()[i] + "\",this)'>" + switchList
                                      .keys()[i] + "</li>";
                                  }
                                  $("#panel-box").html(html);
                                }
                                $("#panel-box").show();
                              }else{
                                  $("#panel-box").hide();
                              }
                            } else {
                              if (switchList.get(c.name).type == "Feature Layer") {
                                switchList.remove(c.name);
                                switchList.put(c.name,d);
                              }
                            }
                          }
                          var s = Mys.get(c.name); // 拿到当前准备添加的数组
                          if (util.isEmpty(s)) { // 如果为空
                            Mys.put(c.name,new myMap());
                            s = Mys.get(c.name);
                            if(util.isEmpty(s.get(c.baseMap[v].id))){
                        	s.put(c.baseMap[v].id,d);
                            }
                            
                          } else {
                              if(util.isEmpty(s.get(c.baseMap[v].id))){
                          	s.put(c.baseMap[v].id,d);
                              }
                          }
                        }
                      } else {
                        d = BNGisTiledMapServiceLayer(c.baseMap.url); // 创建切片
                        if (util.isEmpty(layerLists.get(c.id))) { // 判断地图上是否已经添加了改专题图
                          layerLists.put(c.name,d); // 添加到大集合中
                          layerLists.put(c.id, d); // 添加到大集合中
                          if (BNFloor == c.name) { // 判断当前打开的地图是否是当前的地图
                            d.show(); // 如果是当前打开的底图
                            // 当前添加的切片默认显示
                          } else {
                            d.hide(); // 当前添加的切片默认隐藏
                          }
                          _this.InnerMap
                            .addLayer(d); // 添加到地图上
                          if (util.isEmpty(switchList.get(c.name))) { // 判断切换集合中是否有当前的专题图
                            switchList.put(c.name, d); // 没有的话添加到切片集合中
                            if (map.getLevel() >= 3) {
                              var html = "";
                              for (var i = 0; i < switchList
                                .keys().length; i++) {
                                /* if(i==0){ */
                                if (switchList
                                  .keys()[i] == BNFloor) {
                                  html +=
                                    "<li style=\"list-style: none;cursor: pointer;height: 35px;    padding: 0 5px 0 5px;line-height: 40px;background:#3385ff;color:#fff;\" onclick='f12(\"" +
                                    switchList
                                    .keys()[i] + "\",this)'>" + switchList
                                    .keys()[i] + "</li>";
                                } else {
                                  html += "<li style=\"list-style: none;cursor: pointer;height: 35px;    padding: 0 5px 0 5px;line-height: 40px;\" onclick='f12(\"" +
                                    switchList
                                    .keys()[i] + "\",this)'>" + switchList
                                    .keys()[i] + "</li>";
                                }
                                $("#panel-box").html(html);
                              }
                              $("#panel-box").show();
                            }else{
                                $("#panel-box").hide();
                            }
                          } else {
                            if (switchList.get(c.name).type == "Feature Layer") {
                              switchList.remove(c.name);
                              switchList.put(c.name,d);
                            }
                          }
                        }
                      }
                    }
                    if (util.isNotEmpty(c.baseElement)) {
                      for (var v = 0; v < c.baseElement.length; v++) {
                        d = BNGisFeatureLayers(c.baseElement[v].url);
                        var s = Mys.get(c.name); // 拿到当前准备添加的数组
                        if (util.isNotEmpty(s)) { // 判断当前添加的数组是否为空
                          if (BNFloor == c.name) {
                            d.show();
                          } else {
                            d.hide();
                          }
                          if (util.isNotEmpty(Mys2.get(c.baseElement[v].id))) {
                            Mys2.put(c.baseElement[v].id,d);
                            _this.InnerMap.addLayer(d);
                          }
                          layerLists.put(c.baseElement[v].name,d);
                          layerLists.put(c.baseElement[v].id,d);
                          s.put(c.baseElement[v].id,d);
                        } else {
                          if (BNFloor == c.name) {
                            d.show();
                          } else {
                            d.hide();
                          }
                          Mys2.put(c.baseElement[v].id,d);
                          Mys.put(c.name,new myMap());
                          _this.InnerMap.addLayer(d);
                          layerLists.put(c.baseElement[v].name,d);
                          layerLists.put(c.baseElement[v].id,d);
                          var s = Mys.get(c.name); // 拿到当前准备添加的数组
                          s
                            .put(
                              c.baseElement[v].id,
                              d);
                          if (util.isEmpty(switchList.get(c.name))) {
                            switchList
                              .put(
                                c.baseElement[v].id,
                                d);
                            if (map.getLevel() >= 3) {
                              var html = "";
                              for (var i = 0; i < switchList
                                .keys().length; i++) {
                                /* if(i==0){ */
                                if (switchList
                                  .keys()[i] == BNFloor) {
                                  html +=
                                    "<li style=\"list-style: none;cursor: pointer;height: 35px;    padding: 0 5px 0 5px;line-height: 40px;background:#3385ff;color:#fff;\" onclick='f12(\"" +
                                    switchList
                                    .keys()[i] + "\",this)'>" + switchList
                                    .keys()[i] + "</li>";
                                } else {
                                  html += "<li style=\"list-style: none;cursor: pointer;height: 35px;    padding: 0 5px 0 5px;line-height: 40px;\" onclick='f12(\"" +
                                    switchList
                                    .keys()[i] + "\",this)'>" + switchList
                                    .keys()[i] + "</li>";
                                }
                                $(
                                    "#panel-box")
                                  .html(
                                    html);
                              }
                              $("#panel-box")
                                .show();
                            }
                          }
                        }
                      }
                    }
                    if (util.isNotEmpty(c.childrens)) {
                      for (var l = 0; l < c.childrens.length; l++) {
                        addLayers(c.childrens[l]);
                      }
                    }
                  }
                }
              }
            }
          } else {
            if (util.isNotEmpty(layerLists.get(options.id))) {
              return;
            }
            if (util.isNotEmpty(name)) { // id或名称不为空
              var s = Mys.get(name); // 拿到当前准备添加的数组
              var c = null;
              if (util.isNotEmpty(s)) { // 判断当前添加的数组是否为空
                if (options.type == "要素") {
                  c = BNGisFeatureLayers(options.url);
                  if (BNFloor == name) {
                    c.show();
                  } else {
                    c.hide();
                  }
                  if (util.isNotEmpty(Mys2
                    .get(options.id))) {
                    Mys2.put(options.id, c);
                  }
                } else if (options.type == "切片") {
                  c = BNGisTiledMapServiceLayer(options.url);
                  if (BNFloor == name) {
                    c.show();
                  } else {
                    c.hide();
                  }
                  switchList.put(name, c);
                }
                _this.InnerMap.addLayer(c);
                layerLists.put(options.name, c);
                layerLists.put(options.id, c);
                s.put(options.id, c);
                // BNFloor
              } else { // 如果为空
                // 创建一个集合
                // 并添加到这个切换图层集合中
                // var
                // c=null;
                if (options.type == "要素") {
                  c = BNGisFeatureLayers(options.url);
                  if (BNFloor == name) {
                    c.show();
                  } else {
                    c.hide();
                  }
                  Mys2.put(options.id, c);
                  Mys.put(name, new myMap());
                } else {
                  c = BNGisTiledMapServiceLayer(options.url);
                  if (BNFloor == name) {
                    c.show();
                  } else {
                    c.hide();
                  }
                }
                _this.InnerMap.addLayer(c);
                layerLists.put(options.name, c);
                layerLists.put(options.id, c);
                var s = Mys.get(name); // 拿到当前准备添加的数组
                s.put(options.id, c);
                // if(options.type=="切片"){
                if (util.isEmpty(switchList.get(name))) {
                  switchList.put(name, c);
                  if (map.getLevel() >= 3) {
                    var html = "";
                    for (var i = 0; i < switchList
                      .keys().length; i++) {
                      /* if(i==0){ */
                      if (switchList.keys()[i] == BNFloor) {
                        html +=
                          "<li style=\"list-style: none;cursor: pointer;height: 35px;    padding: 0 5px 0 5px;line-height: 40px;background:#3385ff;color:#fff;\" onclick='f12(\"" +
                          switchList.keys()[i] + "\",this)'>" + switchList.keys()[i] + "</li>";
                      } else {
                        html += "<li style=\"list-style: none;cursor: pointer;height: 35px;    padding: 0 5px 0 5px;line-height: 40px;\" onclick='f12(\"" + switchList.keys()[
                          i] + "\",this)'>" + switchList.keys()[i] + "</li>";
                      }
                      $("#panel-box").html(html);
                    }
                    $("#panel-box").show();
                  }
                } else {
                  if (switchList.get(name).type == "Feature Layer" && options.type == "切片") {
                    switchList.remove(name)
                    switchList.put(name, c);
                  }
                }
              }
            } else { // 不是融合地图
              // 直接添加就行
              if (options.type == "要素") {
                var c = BNGisFeatureLayers(options.url);
                _this.InnerMap.addLayer(c);
                layerLists.put(options.name, c);
                layerLists.put(options.id, c);
              }
            }
          }
        }
        _this.createFeatureLayer = function (url, option) {
          if (util.isNotEmpty(option)) {
            return new esri.layers.FeatureLayer(url, option);
          } else {
            var FeatureLayerOption = {
              mode: 0,
              outFields: ["*"]
            };
            return new esri.layers.FeatureLayer(url,
              FeatureLayerOption);
          }
        };
        _this.createDynamicMapServiceLayer = function () {};
        _this.createTiledMapServiceLayer = function () {};
        _this.switchBottomMap = function (name) {
          for (var i = 0; i < BottomMap.size(); i++) {
            BottomMap.get(BottomMap.keys()[i]).hide();
          }
          BottomMap.get(name).show();
        }
        _this.creatScalebar = function () {
          var scalebar = new Scalebar({
            map: _this.InnerMap,
            attachTo: "bottom-left",
            scalebarUnit: "dual"
          });
          return scalebar;
        }
        _this.setLevel = function (level) {
          _this.InnerMap.setLevel(level);
        };
        _this.getLevel = function () {
          return _this.InnerMap.getLevel();
        };
        _this.creatNorthNeedle = function () {
          if (util.isEmpty($("#northNeedle").html())) {
            if (util.isEmpty(_this.spatialReference.wkt)) {
              $("body")
                .append(
                  "<div id=\"northNeedle\" style=\"position: absolute;top:0;right:4px;\"><img  src=\"../../api/img/zhibeizhen.png\"></div>");
            } else {
              if (util.isEmpty(_this.spatialReference.wkt
                .split("XY_Plane_Rotation"))) {
                $("body")
                  .append(
                    "<div id=\"northNeedle\" style=\"position: absolute;top:0;right:4px;\"><img  src=\"../../api/img/zhibeizhen.png\"></div>");
              } else {
                var sd = _this.spatialReference.wkt
                  .split("XY_Plane_Rotation")[1]
                  .split("]")[0].split(",")[1];
                if (util.isEmpty(sd)) {
                  $("body")
                    .append(
                      "<div id=\"northNeedle\" style=\"position: absolute;top:0;right:4px;\"><img  src=\"../../api/img/zhibeizhen.png\"></div>");
                } else {
                  if (sd > 0) {
                    $("body")
                      .append(
                        "<div id=\"northNeedle\" style=\"position: absolute;top:0;right:4px;\"><img style=\"transform: rotate(-" + parseFloat(sd) +
                        "deg);\"  src=\"../../api/img/zhibeizhen.png\"></div>");
                  } else {
                    $("body")
                      .append(
                        "<div id=\"northNeedle\" style=\"position: absolute;top:0;right:4px;\"><img style=\"transform: rotate(" + parseFloat(-sd) +
                        "deg);\"  src=\"../../api/img/zhibeizhen.png\"></div>");
                  }
                }
              }
            }
          } else {
            $("#northNeedle").show();
            // $("body").append("<div
            // id=\"northNeedle\"
            // style=\"position:
            // absolute;top:0;right:4px;\"><img
            // src=\"../../api/img/zhibeizhen.png\"></div>");
          }
        }
        _this.delNorthNeedle = function () {
          $("#northNeedle").remove();
        }
        _this.ctxMenuForMap = null;
        _this.creatMenu = function (Callback) {
          _this.ctxMenuForMap = new Menu({
            onOpen: Callback
          });
          return _this.ctxMenuForMap;
        };
        _this.addMenuChild = function (name, Callback) {
          _this.ctxMenuForMap.addChild(new MenuItem({
            label: name,
            onClick: Callback
          }));
        };
        _this.menuGraphic = null;
        _this.MenuInit = function (name) {
          _this.ctxMenuForMap.startup();
          if (util.isNotEmpty(name)) {
            if (util.isNotEmpty(name.spatialReference)) {
              _this.ctxMenuForMap.bindDomNode(name.getNode());
            } else {
              document.getElementById(mapOption.id).onmousedown = function (
                evt) {
                if (evt.graphic != undefined) {
                  _this.menuGraphic = evt.graphic;
                } else {
                  _this.menuGraphic = null;
                }
              }
              _this.getLayer(name).on(
                "mouse-over",
                function (evt) {
                  // _this.menuGraphic
                  // =
                  // evt.graphic;
                  _this.ctxMenuForMap
                    .bindDomNode(evt.graphic
                      .getDojoShape()
                      .getNode());
                });
              _this.getLayer(name).on(
                "mouse-out",
                function (evt) {
                  _this.ctxMenuForMap
                    .unBindDomNode(evt.graphic
                      .getDojoShape()
                      .getNode());
                });
              // _this.ctxMenuForMap.bindDomNode(_this.getLayer(name).getNode());
            }
          } else {
            _this.ctxMenuForMap
              .bindDomNode(_this.InnerMap.container);
          }
        }
        _this.setDefaultCursor = function (name) {
            if (util.isNotEmpty(name)) {
              $(".map .esriMapContainer .esriMapLayers").css(
                "cursor", name);
            } else {
              $(".map .esriMapContainer .esriMapLayers").css(
                "cursor");
            }
          }
          // 高亮要素或多个
        _this.highlight = function () {
          alert();
        };
        _this.creatHawkEye = function () {
          overviewMapDijit = new OverviewMap({
            map: _this.InnerMap,
            visible: true,
            attachTo: "bottom-right",
            color: " #D84E13",
            opacity: .40,
            border: "#ccc"
          })
          overviewMapDijit.startup();
          return overviewMapDijit
        };
        _this.removeHawkEye = function () {
            overviewMapDijit.destroy();
          }
          // 地图定位
        _this.location = function (graphic) {
          if (graphic instanceof Array) {
            var featureExtent = graphicsUtils
              .graphicsExtent(graphic);
            _this.InnerMap.setExtent(featureExtent);
          } else {
            _this.InnerMap.centerAt(graphic.geometry);
          }
        };
        _this.setExtent = function (Extent) {
          return _this.InnerMap.setExtent(Extent);
        }
        _this.getExtent = function () {
            return _this.InnerMap.extent;
          }
          // 地图单点定位
        _this.position = function () {};
        // 地图要素查询
        _this.mapQuery = function (name, option, HighlightFlag,
          locationFlag, Callback, ErrorCallback) {
          if (HighlightFlag) {
            mapQuerys(
              name,
              option,
              function (results) {
                if (util.isNotEmpty(option.Symbol)) { // 如果有传过来自定义的高亮
                  // 那么就用这个
                  for (var i = 0; i < results.length; i++) {
                    var graphic = results[i];
                    if (graphic.geometry.type == "point") {
                      if (util
                        .isNotEmpty(option.Symbol.point)) {
                        graphic
                          .setSymbol(option.Symbol.point);
                      } else {
                        graphic
                          .setSymbol(pointSymbol);
                      }
                    } else if (graphic.geometry.type == "polygon") {
                      if (util
                        .isNotEmpty(option.Symbol.polygon)) {
                        graphic
                          .setSymbol(option.Symbol.polygon);
                      } else {
                        graphic
                          .setSymbol(polygonSymbol);
                      }
                    } else if (graphic.geometry.type == "polyline") {
                      if (util
                        .isNotEmpty(option.Symbol.polyline)) {
                        graphic
                          .setSymbol(option.Symbol.polyline);
                      } else {
                        graphic
                          .setSymbol(firstSymbol);
                      }
                    }
                    _this.InnerMap.graphics
                      .add(graphic);
                  }
                  if (locationFlag) {
                    _this.location(results); // 定位
                  }
                } else { // 没有
                  // 就用自带的
                  for (var i = 0; i < results.length; i++) {
                    var graphic = results[i];
                    if (graphic.geometry.type == "point") {
                      graphic
                        .setSymbol(pointSymbol);
                    } else if (graphic.geometry.type == "polygon") {
                      graphic
                        .setSymbol(polygonSymbol);
                    } else if (graphic.geometry.type == "polyline") {
                      graphic
                        .setSymbol(firstSymbol);
                    }
                    _this.InnerMap.graphics
                      .add(graphic);
                  }
                  if (locationFlag) {
                    _this.location(results); // 定位
                  }
                }
                Callback(results);
              }, function (data) {
                ErrorCallback(data);
              });
          } else if (locationFlag) {
            mapQuerys(name, option, function (results) {
              _this.location(results); // 定位
              Callback(results);
            })
          } else {
            mapQuerys(name, option, Callback, ErrorCallback);
          }
        };
        // 地图放大
        _this.zoomIn = function (flag) {
          if (util.isEmpty(flag) || flag) {
            var b = _this.InnerMap.getMaxZoom();
            if (b == _this.InnerMap.getLevel()) {
              return
            } else {
              _this.InnerMap.setLevel(_this.InnerMap
                .getLevel() + 1);
            }
          } else {
            navToolbar.activate(Navigation.ZOOM_IN);
          }
        };
        // 地图缩小
        _this.zoomOut = function (flag) {
          if (util.isEmpty(flag) || flag) {
            var b = _this.InnerMap.getMaxZoom();
            if (b == 0) {
              return
            } else {
              _this.InnerMap.setLevel(_this.InnerMap
                .getLevel() - 1);
            }
          } else {
            navToolbar.activate(Navigation.ZOOM_OUT);
          }
        };
        // 地图平移
        _this.pan = function () {
          navToolbar.activate(Navigation.PAN);
        };
        // 清除
        _this.clear = function () {
          _this.InnerMap.graphics.clear();
          drawingTool.deactivate();
        };
        // 刷新
        _this.mapRefresh = function () {
          _this.InnerMap.resize();
          _this.InnerMap.reposition();
        };
        _this.graphic = function (geometry, Symbol) { // 样式
          return graphics(geometry, Symbol);
        };
        _this.addGraphic = function (options) { // 新增Graphic
          var g = _this.graphic(options.geometry, options.symbol);
          if (util.isNotEmpty(options.attributes)) {
            g.setAttributes(options.attributes);
          }
          _this.InnerMap.graphics.add(g);
          return g;
        };
        _this.creatGraphicsLayer = function (option) { // 创建临时图层
          return BNGraphicsLayer(option);
        };
        _this.addGraphicsLayer = function (graphicsLayer) {
          // layerLists.put();
          _this.InnerMap.addLayer(graphicsLayer);
        };
        _this.delGraphicsLayer = function (graphicsLayer) {
          if ((typeof (graphicsLayer)) == string) {
            var lay = BNMap.InnerMap._layers[graphicsLayer];
            _this.InnerMap.removeLayer(lay);
          } else {
            _this.InnerMap.removeLayer(graphicsLayer);
          }
        }
        _this.getGraphicsLayer = function (id) {
            _this.InnerMap._layers.demo[id];
          }
          /*
           * _this.addGraphic=function(geometry,Symbol,attributes){
           * var g=new graphic(geometry,Symbol);
           * if(util.isNotEmpty(attributes)){
           * g.setAttributes(attributes); } return
           * g;
           * _this.InnerMap.graphics.add(graphic); };
           */
        _this.startDraw = function (drawType, Callback) { // 点 线
          // 面
          // this.StopAction();
          drawingTool.onDrawEnd = null;
          drawingTool.on("draw-end", Callback);
          switch (drawType) {
          case "point":
            drawingTool.activate(Draw.POINT);
            break;
          case "polygon":
            drawingTool.activate(Draw.POLYGON);
            break;
          case "polyline":
            drawingTool.activate(Draw.POLYLINE);
            break;
          case "distance":
            drawingTool.activate(Draw.POLYLINE);
            break;
          case "area":
            drawingTool.activate(Draw.POLYGON);
            break;
          case "extent":
            drawingTool.activate(Draw.EXTENT);
            break;
          case "circle":
            drawingTool.activate(Draw.CIRCLE);
            break;
          default:
            drawingTool.activate(drawType);
            break;
          }
        };
        /*
         * _this.BNGisTiledMapServiceLayer=function(url){;
         * return
         * BNGisTiledMapServiceLayer(url); };
         *
         * _this.BNGisFeatureLayers=function(url){;
         * return BNGisFeatureLayers(url); };
         * _this.BNGisDynamicMapServiceLayer=function(url,option){
         * return
         * BNGisDynamicMapServiceLayer(url,option); };
         */
        _this.stopDraw = function () { // 关闭画图
          drawingTool.deactivate();
        };
        AddAreaLabel = function (geometries) { // 侧面积操作
          if (geometries[0].rings.length > 0) {
            geometryServices
              .labelPoints(
                geometries,
                function (labelPoints) { // callback
                  _this.InnerMap
                    .showZoomSlider();
                  esarray
                    .forEach(
                      labelPoints,
                      function (
                        labelPoint) {
                        var areasAndLengthParams = new AreasAndLengthsParameters();
                        areasAndLengthParams.lengthUnit = GeometryService.UNIT_METER;
                        areasAndLengthParams.areaUnit = GeometryService.UNIT_SQUARE_METERS;
                        areasAndLengthParams.polygons = geometries;
                        geometryServices
                          .areasAndLengths(
                            areasAndLengthParams)
                          .then(
                            function (
                              ee) {
                              var a = ee.areas[0];
                              var b = ee.lengths[0];
                              var textSymbol = bnSymbol
                                .textSymbol(
                                  "面积:" + number
                                  .format(a) + "平方米 周长:" + number
                                  .format(b) + "米",
                                  testFont,
                                  testColor);
                              var labelPointGraphic = _this
                                .graphic(
                                  labelPoint,
                                  textSymbol);
                              _this.InnerMap.graphics
                                .add(labelPointGraphic);
                            });
                      });
                });
          } else {
            // alert("Invalid
            // Polygon
            // -
            // must
            // have
            // at
            // least
            // 3
            // points");
          }
        }, _this.bindEvent = function (name, eventName,
          Callback) {
          if (util.isNotEmpty(name)) {
            _this.getLayer(name)
              .on(eventName, Callback);
          } else {
            _this.InnerMap.on(eventName, Callback);
          }
        }
        _this.measureAreaFunction = function (geometry) { // 测量
          var graphic = null;
          switch (geometry.type) {
          case "polyline":
            graphic = _this.graphic(geometry,
              testDistancesymbol);
            _this.InnerMap.graphics.add(graphic);
            AddDistanceLabel(geometry);
            break;
          case "polygon":
            graphic = _this.graphic(geometry, testAreasymbol);
            _this.InnerMap.graphics.add(graphic);
            geometryServices.simplify([geometry],
              AddAreaLabel);
            break;
          }
        }, AddDistanceLabel = function (geometry, Font, Color) {
          var lengthGeometry;
          var lengthParams = new LengthsParameters();
          lengthGeometry = geometry;
          lengthParams.polylines = [geometry];
          lengthParams.lengthUnit = GeometryService.UNIT_METER;
          lengthParams.geodesic = true;
          geometryServices.lengths(lengthParams,
            function lengthComplete(event) {
              var len = event.lengths[0];
              var text = measure
                .significantDigits(len, 4) + " " + _this.displayDistUnits;
              var g = GetPathLabel(text, lengthGeometry,
                0, Font, Color);
              _this.InnerMap.graphics.add(g);
            });
        }, GetPathLabel = function (text, polyline, pathIndex, Font,
          Color) {
          try {
            var sym = bnSymbol.textSymbol(text, testFont,
              testColor);
            var path;
            if (polyline.paths) {
              path = polyline.paths[pathIndex];
            } else {
              path = polyline.rings[pathIndex];
            }
            var idx = Math.floor(path.length / 2);
            var p1 = polyline.getPoint(pathIndex, idx - 1);
            var p2 = polyline.getPoint(pathIndex, idx);
            var point = measure.getMidPoint(p1, p2);
            var angle = measure.getAngle(p1, p2);
            try {
              sym.setAngle(angle);
            } catch (e) {
              // TODO: handle
              // exception
            }
            try {
              sym.setOffset(0, 2);
            } catch (e) {
              // TODO: handle
              // exception
            }
            var g = _this.graphic(point, sym);
            return g;
          } catch (err) {
            console.error("创建标注出错：", err);
          }
        };
        _this.createSpatialReference = function (json) {
          return new SpatialReference(json);
        };
        if (util.isNotEmpty(Callback)) {
          // _this.InnerMap.on("load",function(){
          Callback(this);
          // });
        }
      } else {
        if (util.isNotEmpty(Callback)) {
          Callback(_person());
        }
        return new _person();
      };
    }
    _person.prototype = {
      constructor: _person,
      drink: "water",
    };
    return _person;
  });