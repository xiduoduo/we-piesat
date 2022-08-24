<template>
      <div class="curtain" @click="toPull">
            <!-- 拉帘 -->
            <img src="@/assets/image/icon/jl.png" alt="">
      </div>
</template>
<script>
import $ from 'jquery'
import * as L from 'leaflet'
import { mapGetters } from 'vuex'
import 'leaflet-side-by-side'
export default {
      name: "curtain",
      components: {
      },
      data() {
            return {}
      },
      computed: {
            ...mapGetters([
                  "geoserverUrl",
                  'curtainLayers',
                  'patternState',
                  'curtainState'
            ]),
      },
      methods: {
            toPull() {
                  let that = this;
                  var viewer = that.mapData.viewer;
                  //cesium
                  if (that.patternState) {
                        if (that.curtainState) {
                              $('#slider').remove();
                              that.mapData.earthAtNight && viewer.imageryLayers.remove(that.mapData.earthAtNight);
                              that.$store.dispatch('map/setCurtainState', false);
                              return
                        } else {
                              that.$store.dispatch('map/setCurtainState', true);
                              that.initCesium();
                        }

                  } else {
                        if (that.curtainState) {
                              that.mapData.earthAtNightLine.remove();
                              that.mapData.earthAtNight.remove();
                              that.$store.dispatch('map/setCurtainState', false);
                              return
                        } else {
                              that.$store.dispatch('map/setCurtainState', true);
                              that.initLeaflet();
                        }
                  }
            },
            initCesium() {
                  let that = this;
                  var viewer = that.mapData.viewer;
                  //slider
                  let sliderDiv = document.createElement('div')
                  sliderDiv.setAttribute("id", "slider");
                  document.getElementById('cesiumContainer').appendChild(sliderDiv);
                  //加载离线天地图 
                  //   var layers = that.mapData.viewer.imageryLayers;
                  //     that.mapData.earthAtNight = layers.addImageryProvider(
                  //           new Cesium.IonImageryProvider({ assetId: 3812 })
                  //     );
                  that.mapData.earthAtNight && viewer.imageryLayers.remove(that.mapData.earthAtNight);
                  if (that.curtainLayers) {
                        that.mapData.earthAtNight = viewer.imageryLayers.addImageryProvider(
                              new Cesium.WebMapServiceImageryProvider({
                                    url: that.geoserverUrl + "/geoserver/visual_space/wms?",
                                    // url: that.geoserverUrl + "/geoserver/wms?",
                                    layers: that.curtainLayers,
                                    parameters: {
                                          transparent: true, // 是否透明
                                          format: 'image/png', // 返回格式
                                          srs: 'EPSG:4326',  // 坐标系
                                          styles: ''
                                    }
                              })
                        );
                        that.mapData.earthAtNight.splitDirection = Cesium.ImagerySplitDirection.LEFT; // Only show to the left of the slider.
                  }

                  // Sync the position of the slider with the split position
                  var slider = document.getElementById("slider");
                  viewer.scene.imagerySplitPosition =
                        slider.offsetLeft / slider.parentElement.offsetWidth;

                  var handler = new Cesium.ScreenSpaceEventHandler(slider);

                  var moveActive = false;

                  function move(movement) {
                        if (!moveActive) {
                              return;
                        }

                        var relativeOffset = movement.endPosition.x;
                        var splitPosition =
                              (slider.offsetLeft + relativeOffset) /
                              slider.parentElement.offsetWidth;
                        slider.style.left = 100.0 * splitPosition + "%";
                        viewer.scene.imagerySplitPosition = splitPosition;
                  }

                  handler.setInputAction(function () {
                        moveActive = true;
                  }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
                  handler.setInputAction(function () {
                        moveActive = true;
                  }, Cesium.ScreenSpaceEventType.PINCH_START);

                  handler.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                  handler.setInputAction(move, Cesium.ScreenSpaceEventType.PINCH_MOVE);

                  handler.setInputAction(function () {
                        moveActive = false;
                  }, Cesium.ScreenSpaceEventType.LEFT_UP);
                  handler.setInputAction(function () {
                        moveActive = false;
                  }, Cesium.ScreenSpaceEventType.PINCH_END);
            },
            initLeaflet() {
                  let that = this;
                  that.mapData.earthAtNight && that.mapData.earthAtNight.remove() && that.mapData.earthAtNightLine.remove();

                  //创建瓦片图层
                  const createTileLayer = () => {
                        let tileLayer = L.tileLayer.wms(that.geoserverUrl + "/geoserver/visual_space/wms?", {
                              layers: that.curtainLayers, //需要加载的图层
                              format: 'image/png', //返回的数据格式
                              transparent: true,
                              crs: L.CRS.EPSG3857,
                              tileSize: 512,
                        });
                        tileLayer.addTo(that.mapData.map)
                        return tileLayer;
                  }

                  that.mapData.earthAtNight = createTileLayer();

                  that.mapData.earthAtNightLine = L.control.sideBySide(that.mapData.earthAtNight, that.mapData.map, {})
                  that.mapData.earthAtNightLine.addTo(that.mapData.map);
            }
      },
      watch: {
            curtainLayers(newVal, oldVal) {
                  let that = this;
                  if (that.patternState) {
                        that.initCesium();
                  } else {
                        that.initLeaflet();
                  }
            }
      }
}
</script>
<style scoped lang="less">
.curtain {
      position: absolute;
      top: 0;
      right: 40px;
      width: 40px;
      // width: 114px;
      height: 30px;
      line-height: 30px;
      // background: rgba(29, 37, 42, 0.9);
      border-radius: 27px;
      text-align: center;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      color: #ffffff;
      img {
            width: 28px;
            height: 28px;
            margin: 1px auto;
      }
}
.curtain {
      cursor: pointer;
}
</style>
