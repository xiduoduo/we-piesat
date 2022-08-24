<template>
      <div class="bottomNav">
            <span class="navItem">经度：{{lngNum}}</span>
            <span class="navItem">纬度：{{latNum}}</span>
            <span class="navItem" v-show="showLeaflet">层级数：{{currentMagnitude}}</span>
            <span class="navItem" v-show="!showLeaflet">视角海拔高度：{{currentMagnitude}}米</span>
            <!-- <span class="navItem">面积：{{area}}</span> -->

            <!-- 显示标注 -->
            <!-- <div class="label_model" v-show="showLeaflet">
                  <el-switch v-model="lableValue" active-color="#13ce66" inactive-color="#065186" @change="switchChange" />
                  <span>标注</span>
            </div> -->
            <!-- //定位按钮 -->
            <territory ref="territory" />

            <div @click="chartToShow" class="chartModel">
                  <!-- 图表展示 -->
                  <img src="@/assets/image/icon/fullScreen.png" alt="" class="closeChart">
            </div>

            <curtain />
      </div>
</template>
<script>
import $ from 'jquery'
import territory from '@/components/territory'
import curtain from '@/components/curtain'
import * as L from 'leaflet'
export default {
      name: "bottomNav",
      components: {
            territory,
            curtain
      },
      data() {
            return {
                  currentMagnitude: 0,
                  lngNum: 0,
                  latNum: 0,
                  area: '',
                  lableValue: false,
                  showLeaflet: false,
            }
      },
      methods: {
            //天地图监听
            initTianAddEvent() {
                  let that = this;
                  that.currentMagnitude = 5;
                  that.showLeaflet = true;
                  setTimeout(function () {
                        //鼠标移动事件
                        that.mapData.map.on('mousemove', function (e) {
                              that.mousemoveMap(e);
                        });
                        //放大或者缩小事件
                        that.mapData.map.on("zoomend", e => {
                              that.zoomendMap(e);
                        })
                  }, 1000)
            },
            //天地图移动鼠标展示坐标
            mousemoveMap(e) {
                  let that = this,
                        lat = Number(e.latlng.lat).toFixed(5),
                        lng = Number(e.latlng.lng).toFixed(5);

                  that.lngNum = lng;
                  that.latNum = lat;
                  // that.content = '经度' + lng.toString() + "," + '纬度' + lat.toString();

            },
            //天地图缩放级别
            zoomendMap(e) {
                  let that = this;
                  let targetLevel = e.target._zoom, data = [];      //获取当前zoom级别
                  let params = {
                        "selectTime": data,
                        "maxLon": that.mapData.map.getBounds()._northEast.lng,
                        "minLon": that.mapData.map.getBounds()._southWest.lng,
                        "maxLat": that.mapData.map.getBounds()._northEast.lat,
                        "minLat": that.mapData.map.getBounds()._southWest.lat,
                        "dataType": ""     //1为10公里，2为50公里，3为100公里
                  }
                  that.currentMagnitude = targetLevel;
                  // console.log(targetLevel, params);
            },
            // cesium
            initCesiumAddEvent() {
                  let that = this;
                  that.showLeaflet = false;
                  //缩放高度
                  // that.mapData.viewer.scene.camera.moveEnd.addEventListener(function () {
                  //       console.log( that.mapData.viewer.camera.getMagnitude());
                  //       that.currentMagnitude = that.mapData.viewer.camera.getMagnitude().toFixed(0);
                  // })

                  //得到当前三维场景
                  var scene = that.mapData.viewer.scene;
                  //得到当前三维场景的椭球体
                  var ellipsoid = that.mapData.viewer.scene.globe.ellipsoid;
                  var entity = that.mapData.viewer.entities.add({
                        label: {
                              show: false
                        }
                  });
                  var longitudeString = null;
                  var latitudeString = null;
                  var height = null;
                  var cartesian = null;

                  var handler = new Cesium.ScreenSpaceEventHandler(that.mapData.viewer.scene.canvas);
                  // handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)//移除事件
                  handler.setInputAction(function (movement) {
                        //通过指定的椭球或者地图对应的坐标系，将鼠标的二维坐标转换为对应椭球体三维坐标
                        cartesian = that.mapData.viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
                        if (cartesian) {
                              //将笛卡尔坐标转换为地理坐标
                              var cartographic = ellipsoid.cartesianToCartographic(cartesian);
                              //将弧度转为度的十进制度表示
                              longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
                              latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
                              //获取相机高度
                              height = Math.ceil(that.mapData.viewer.camera.positionCartographic.height);
                              that.currentMagnitude = height.toFixed(0);
                              //   entity.position = cartesian;
                              //   entity.label.show = true;
                              //   entity.label.text = '(' + longitudeString + ', ' + latitudeString + "," + height + ')';

                              that.lngNum = longitudeString.toFixed(4);;
                              that.latNum = latitudeString.toFixed(4);;
                        } else {
                              entity.label.show = false;
                        }

                  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                  //MOUSE_MOVE 移动 LEFT_CLICK  点击
            },
            //leaflet标注展示
            switchChange(state) {
                  let that = this;
                  if (state) {
                        that.mapData.mapLable = L.tileLayer(that.mapData.mapUrl + "/mapi/{z}/{x}/{y}.png", {
                              subdomains: ["2", "3", "4", "5", "6", "7", "8"]
                        })
                        that.mapData.mapLable.addTo(that.mapData.map);
                  } else {
                        that.mapData.map.removeLayer(that.mapData.mapLable);
                  }
            },
            chartToShow() {
                  let that = this;
                  if ($("#chartData").css("display") == "none") {
                        $("#chartData").fadeIn(800, () => {
                              this.$store.dispatch('chart/setChartTitle', '图表展示')
                              that.$parent.$refs.chartData.$refs.left.init();
                              that.$parent.$refs.chartData.$refs.right.init();
                              that.$parent.$refs.chartData.$refs.bottom.init();
                        });
                  } else {
                        $("#chartData").fadeOut(800, () => {
                        });
                  }
            }
      },
}
</script>
<style scoped lang="less">
@import "../../assets/css/bottomNav.less";
</style>
    