<template>
      <div id="cesium" class="cesiumMod">
            <!-- 更改模式 -->
            <!-- <div class="titleChange" id="cesiumChangeMap">
                  <el-select v-model="selectValue" placeholder="3D" @change="selectChange">
                        <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                  </el-select>
            </div> -->
            <!-- cesium实例 -->
            <!-- <div id="cesiumContainer"></div> -->

            <div class="popupInfo" id="popupInfo" style="display: none;">
                  <span class="closeBtn" @click="closePopupInfo"></span>
                  <p v-show="highVal">有效波高:{{highVal}}</p>
                  <p>经度:{{lngVal}}</p>
                  <p>纬度:{{latVal}}</p>
            </div>
      </div>
</template>

<script>
import $ from 'jquery'
import cesiumDrawHandler from 'cesium-draw'
import 'cesium-draw/dist/theme/default.css'
import { mapGetters } from 'vuex'
export default {
      name: "cesium",
      components: {
            cesiumDrawHandler
      },
      data() {
            return {
                  viewer: null,
                  selectValue: '',
                  lngVal: "",
                  latVal: "",
                  highVal: '',
                  selectOptions: [
                        {
                              value: '1',
                              label: '2D'
                        },
                        {
                              value: '2',
                              label: '2.5D'
                        },
                        {
                              value: '3',
                              label: '3D'
                        },
                  ],
            };
      },
      created() {
            this.viewer = this.$store.getters.viewer;
      },
      computed: {
            ...mapGetters([
                  'mapUrl',
            ])
      },
      methods: {
            //初始化方法
            init: function (type) {
                  let that = this;
                  var viewerOption;
                  Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMzc2ZWEzNS01MTUxLTQ4MDctYjA2OC00ZGNlNjVmZmY3MjAiLCJpZCI6MTExNjAsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTgzMjg1MjV9.3F9fSAzbc4yZUOXvXpVhCQcgj49MVO4Cp0Oqrupj2b0";

                  if ($('#cesiumContainer')) {
                        $('#cesiumContainer').remove();
                  }
                  //cesium
                  let cesiumDiv = document.createElement('div')
                  cesiumDiv.setAttribute("id", "cesiumContainer");
                  document.getElementById('cesium').appendChild(cesiumDiv);


                  if (type == 6) {
                        //在线服务
                        viewerOption = {
                              geocoder: false, // 地理位置查询定位控件
                              homeButton: false, // 默认相机位置控件
                              timeline: false, // 时间滚动条控件
                              navigationHelpButton: false, // 默认的相机控制提示控件
                              fullscreenButton: false, // 全屏控件
                              scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
                              baseLayerPicker: false, // 底图切换控件
                              sceneMode: 3,//初始化场景 1 2d 3  3d
                              animation: false, // 控制场景动画的播放速度控件
                              selectionIndicator: false, // 是否显示选取指示器组件
                              infoBox: false,
                              fullscreenElement: 'cesiumContainer',
                              // terrainProvider: Cesium.createWorldTerrain({
                              //       requestWaterMask: true
                              // }),

                              // terrainProvider: new Cesium.CesiumTerrainProvider({
                              //       url: 'http://211.101.24.58:1951/irrlicht/services/samples/c3d_wenchang_terrain/C3DTerrainServer/data'
                              // }),
                              imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
                                    // url : 'data/worldimage/{z}/{x}/{y}.png',      //如果为本地相对路径，url为文件夹地址,
                                    url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'
                              })

                        };
                  } else {
                        viewerOption = {
                              geocoder: false, // 地理位置查询定位控件
                              homeButton: false, // 默认相机位置控件
                              timeline: false, // 时间滚动条控件
                              navigationHelpButton: false, // 默认的相机控制提示控件
                              fullscreenButton: false, // 全屏控件
                              scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
                              baseLayerPicker: false, // 底图切换控件
                              sceneMode: 3,//初始化场景 1 2d 3  3d
                              animation: false, // 控制场景动画的播放速度控件
                              infoBox: false,
                              selectionIndicator: false, // 是否显示选取指示器组件
                              // terrainProvider: Cesium.createWorldTerrain({
                              //       requestWaterMask: true
                              // }),
                              fullscreenElement: 'cesiumContainer',
                              // 初始化离线天地图
                              imageryProvider: new Cesium.SingleTileImageryProvider({
                                    url: that.mapUrl + '/img/0/0/0.png'
                              }),
                        };
                  }

                  var viewer = new Cesium.Viewer("cesiumContainer", viewerOption);

                  //加载离线天地图 
                  var layers = viewer.imageryLayers;
                  if (type == 1) {
                        //天地图影像
                        var gaode = layers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                              url: that.mapUrl + "/img/{z}/{x}/{y}.png",
                              fileExtension: "png",
                        }));
                        //加载离线天地图标注
                        var gaode1 = layers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                              url: that.mapUrl + "/mapi/{z}/{x}/{y}.png",
                              fileExtension: "png",
                        }));
                  }

                  if (type == 2) {
                        //天地图矢量
                        var gaode2 = layers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                              url: that.mapUrl + "/map/{z}/{x}/{y}.png",
                              fileExtension: "png",
                        }));
                        //加载离线天地图标注
                        var gaode3 = layers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                              url: that.mapUrl + "/mapi/{z}/{x}/{y}.png",
                              fileExtension: "png",
                        }));
                  }

                  if (type == 3) {
                        //天地图影像在线
                        var gaode2 = layers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                              url: 'http://t0.tianditu.com/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=57445bba1bdc28f0bb4963e08b29ea7e',
                              fileExtension: "png",
                        }));
                        //天地图影像在线 标注
                        var gaode3 = layers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                              url: 'http://t0.tianditu.com/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=57445bba1bdc28f0bb4963e08b29ea7e',
                              fileExtension: "png",
                        }));
                  }

                  if (type == 4) {
                        //天地图矢量在线
                        var gaode2 = layers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                              url: 'http://t0.tianditu.com/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=57445bba1bdc28f0bb4963e08b29ea7e',
                              fileExtension: "png",
                        }));
                        //天地图矢量在线标注
                        var gaode3 = layers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                              url: 'http://t0.tianditu.com/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=57445bba1bdc28f0bb4963e08b29ea7e',
                              fileExtension: "png",
                        }));
                  }

                  if (type == 5) {
                        // cesium本地服务
                        var gaode4 = layers.addImageryProvider(new Cesium.TileMapServiceImageryProvider({
                              url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
                        }));
                  }


                  //设置homebutton的位置
                  // Cesium.Camera.DEFAULT_VIEW_RECTANGLE =
                  //       Cesium.Rectangle.fromDegrees(110.15, 34.54, 110.25, 34.56);//Rectangle(west, south, east, north)
                  // 将位置定位到中国 通过给xyz的坐标控制在南海位置
                  //设置初始位置
                  // viewer.camera.setView({
                  //       destination: Cesium.Cartesian3.fromDegrees(110.20, 34.55, 3000000)
                  // });
                  viewer.camera.flyTo({
                        destination: this.$route.path=="/temperatureDiolag"?Cesium.Cartesian3.fromDegrees(121.423,32.43, 1223281):Cesium.Cartesian3.fromDegrees(114.84, 26.15, 12315773),
                        orientation: {
                              heading: Cesium.Math.toRadians(348.4202942851978),
                              pitch: Cesium.Math.toRadians(-89.74026687972041),
                              roll: Cesium.Math.toRadians(0)
                        },
                        complete: function callback() {
                        }
                  });
                  //cesium地球移动经纬度提示框取消
                  viewer.scene.camera.moveEnd.addEventListener(function () {
                        $("#popupInfo").hide();
                  })
                  //点击获取坐标
                  var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
                  handler.setInputAction(function (click) {
                        $(".cesium-viewer-infoBoxContainer").hide();
                        if (viewer._selectedEntity) {
                              setTimeout(function () {
                                    let val = $(".cesium-infoBox-iframe").contents().find(".cesium-infoBox-defaultTable td")[1];
                                    that.highVal = val ? Number(val.innerText).toFixed(2) : '';
                              }, 1000)
                        } else {
                              that.highVal = '';
                        }

                        // 获取位置
                        $("#popupInfo").show();
                        $("#popupInfo").css("top", click.position.y - 65);
                        $("#popupInfo").css("left", click.position.x - 44);
                        var position = viewer.scene.pickPosition(click.position); //单击位置


                        // //获取经纬度
                        var earthPosition = viewer.camera.pickEllipsoid(click.position, viewer.scene.globe.ellipsoid);
                        var cartographic = Cesium.Cartographic.fromCartesian(earthPosition, viewer.scene.globe.ellipsoid, new Cesium.Cartographic());
                        var lat = Cesium.Math.toDegrees(cartographic.latitude);
                        var lng = Cesium.Math.toDegrees(cartographic.longitude);
                        var height = cartographic.height;

                        that.lngVal = lng.toFixed(2);
                        that.latVal = lat.toFixed(2);
                        // console.log("[Lng=>" + lng + ",Lat=>" + lat + ",H=>" + height + "]");


                  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);


                  //去掉版权
                  viewer._cesiumWidget._creditContainer.style.display = "none";

                  that.mapData.viewer = viewer;
            },

            closePopupInfo() {
                  let that = this;
                  $("#popupInfo").hide();
            },
            //切换模式
            selectChange() {
                  let that = this;
                  switch (that.selectValue) {
                        case '1': that.mapData.viewer.scene.morphTo2D(1); break;//二维
                        case '2': that.mapData.viewer.scene.morphToColumbusView(1); break;//哥伦布视图
                        case '3': that.mapData.viewer.scene.morphTo3D(1); break;//三维
                  }
            },
      }
};
</script>

<style  lang="less">
#cesiumContainer {
      width: 100%;
      height: 100vh;
      margin: 0;
      padding: 0;
      overflow: hidden;
}

.tooltipdiv-inner {
      padding: 3px 8px;
}
/* 向左 */
.toolTip-left {
      position: absolute;
      width: 300px;
      min-height: 80px;
      border: 4px solid rgba(19, 159, 255, 1);
      border-radius: 20px;
      background-color: rgba(30, 49, 74, 0.6);
}
.toolTip-left:before {
      content: "";
      display: block;
      position: absolute;
      left: -20px;
      top: 50%;
      transform: translateY(-50%);
      border-top: 20px solid transparent;
      border-bottom: 20px solid transparent;
      border-right: 20px solid rgba(19, 159, 255, 1);
}

.titleChange {
      position: fixed;
      bottom: 0;
      right: 298px;
      z-index: 1009;
      width: 114px;
      height: 30px;
      background: rgba(29, 37, 42, 0.8);
      border-radius: 27px;
      overflow: hidden;
      span {
            position: absolute;
            top: 0;
            left: 0;
            display: inline-block;
            width: 40px;
            height: 20px;
            margin: 8px 0;
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            text-align: right;
            color: #ffffff;
            line-height: 20px;
            letter-spacing: 0px;
            z-index: 666;

            img {
                  margin: 12px 10px;
                  position: absolute;
                  top: -8px;
                  left: -5px;
                  width: 14px;
                  height: 15px;
            }
      }
      /deep/.el-select {
            position: absolute;
            top: 0;
            left: 0;
            // width: 70px;
            width: 114px;
            padding-left: 0;
            /deep/.el-input__inner {
                  outline: none;
                  border: none;
                  // background: #0b2537;
                  background: rgba(29, 37, 42, 0.8);
                  color: #ffffff;
                  height: 35px;
                  line-height: 35px;
                  text-align: center;
            }
      }
}
.titleChange {
      cursor: pointer;
}
.popupInfo {
      position: fixed;
      width: 108px;
      height: 52px;
      background: #151621;
      border: 1px solid #459dae;
      border-radius: 4px;
      .closeBtn {
            position: absolute;
            right: 3px;
            top: 4px;
            width: 4px;
            height: 4px;
            background: url("../../assets/image/icon/close.png") no-repeat;
            background-size: 100%;
      }
      .closeBtn:hover {
            cursor: pointer;
      }
      p {
            margin: 4px 8px;
            height: 12px;
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            text-align: right;
            color: #c1c2d0;
            line-height: 12px;
            letter-spacing: 0px;
            text-align: left;
            // overflow: hidden;
      }
}
.popupInfo::before {
      content: "";
      width: 0px;
      height: 0px;
      border-top: 10px solid #459dae;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      position: absolute;
      top: 52px;
      left: 38px;
}
.popupInfo::after {
      content: "";
      width: 0px;
      height: 0px;
      border-top: 10px solid #151621;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      position: absolute;
      top: 52px;
      left: 39px;
}
</style>
