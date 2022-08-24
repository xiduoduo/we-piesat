
author：tiantf
time：20200908
remarks：管理平台主页

<template>
      <div id="WorldMap" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">

            <!-- 标题栏 -->
            <oceanTopNav ref="oceanTopNav" />

            <div v-if="!showCesium">

                  <!-- 天地图 -->
                  <tianMap v-if="!showBMap" ref="tianMap" />

                  <!-- 百度地图 -->
                  <baiduMap v-if="showBMap" ref="baiduMap" />

                  <!-- 更改地图 -->
                  <div class="titleChange">
                        <el-select v-model="mapValue" placeholder="地图切换" @change="handleCommand">
                              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                              </el-option>
                        </el-select>
                  </div>
            </div>

            <!-- cesium -->
            <div v-if="showCesium">
                  <cesium ref="cesium" />
                  <!-- 更改地图 -->
                  <div class="cesiumChange">
                        <el-select v-model="cesiumValue" placeholder="地图切换" @change="handleCesium">
                              <el-option v-for="item in cesiumOptions" :key="item.value" :label="item.label" :value="item.value">
                              </el-option>
                        </el-select>
                  </div>
            </div>

            <!--底部显示信息-->
            <bottomNav ref="bottomNav" />

            <!-- 切换cesium和leaflet -->
            <div class="changePattern">
                  <el-switch style="display: block" v-model="pattern" @change='patternCahnge' active-color="#13ce66" inactive-color="#0e8ef0" active-text="三维" inactive-text="二维">
                  </el-switch>
            </div>

            <span @click="splitScreenClick" class="searcgBtn" v-show="showScreen">
                  <span>分屏展示</span>
            </span>
            <!--分屏-->
            <splitScreen ref="splitScreen" id="splitScreen" v-show="screenShow" />

            <!-- //图表展示 -->
            <chartData style="display: none;" ref="chartData" />
      </div>
</template>
<script>
import oceanTopNav from "./oceanNav/oceanTopNav"
import tianMap from "./map/tianMap"
import baiduMap from "./map/baiduMap"
import cesium from "./map/cesiumMap"
import bottomNav from "./oceanNav/bottomNav"
import splitScreen from '@/components/splitScreen'
import chartData from "@/components/chart_data/chartData"
import $ from 'jquery'
export default {
      name: "oceanIndex",  //组件名称
      components: {  //引入模板
            tianMap,
            oceanTopNav,
            baiduMap,
            cesium,
            bottomNav,
            splitScreen,
            chartData,
      },
      data() {
            return {
                  //   定义数据
                  mapValue: 'to2',
                  options: [
                        { label: '百度地图在线', value: 'bo1' },
                        // { label: '百度地图离线', value: 'bo2' },

                        { label: '高德地图在线矢量', value: 'go1' },
                        { label: '高德地图在线影像', value: 'go2' },

                        { label: '天地图离线矢量', value: 'to1' },
                        { label: '天地图离线影像', value: 'to2' },
                        { label: '天地图在线矢量', value: 'to3' },
                        { label: '天地图在线影像', value: 'to4' },
                        { label: '天地图在线地形', value: 'to5' },
                  ],
                  cesiumValue: '1',
                  cesiumOptions: [
                        { label: '天地图离线影像', value: '1' },
                        { label: '天地图离线矢量', value: '2' },
                        { label: '天地图在线影像', value: '3' },
                        { label: '天地图在线矢量', value: '4' },
                        // { label: '高德地图', value: '3' },
                        // { label: '高德地图矢量', value: '4' },
                        { label: 'cesium本地服务', value: '5' },
                        { label: '在线服务', value: '6' },

                  ],
                  showBMap: true,//展示百度地图
                  loading: true,//页面加载
                  showCesium: true,//展示cesium
                  screenShow: false,//展示分屏组件
                  showScreen: true,//展示分屏按钮

                  pattern: true,//默认为leaflet    可以切换cesium
            };
      },
      mounted() {
            let that = this;
            //默认展示
            that.patternCahnge(that.pattern);

            setTimeout(function () {
                  that.loading = false;
            }, 2000);
      },
      methods: {
            //切换地图
            handleCommand(type) {
                  let that = this;
                  that.loading = true;
                  that.$store.dispatch('map/setBaseMap', type);
                  that.mapData.mapType = type;
                  if (type == 'to1' || type == 'to2' || type == 'to3' || type == 'to4' || type == 'to5' || type == 'go1' || type == 'go2') {
                        that.showBMap = false;

                        setTimeout(function () {
                              that.$refs.tianMap && that.$refs.tianMap.initMap(type);
                        }, 1000);

                  } else if (type == 'bo1' || type == 'bo2') {
                        that.showBMap = true;
                        setTimeout(function () {
                              that.$refs.baiduMap && that.$refs.baiduMap.initMap();
                        }, 1000);
                  }

                  setTimeout(function () {
                        that.loading = false;
                        that.$refs.bottomNav.initTianAddEvent();
                  }, 2000);
            },
            //cesium切换底图
            handleCesium(type) {
                  let that = this;
                  that.loading = true;
                  that.$store.dispatch('map/setBaseMap', type);
                  setTimeout(function () {
                        that.$refs.cesium.init(type);
                        that.loading = false;
                  }, 1500);
            },
            //切换cesium和leaflet组件
            patternCahnge(state) {
                  let that = this;
                  that.loading = true;
                  that.showCesium = false;
                  that.$store.dispatch('map/setPatternState', state);
                  if (state) {
                        that.showCesium = true;
                        that.handleCesium(that.cesiumValue)
                        setTimeout(function () {
                              that.$refs.bottomNav.initCesiumAddEvent();
                        }, 2000);
                  } else {
                        that.handleCommand(that.mapValue);
                  }
                  setTimeout(function () {
                        that.loading = false;
                  }, 2000);
            },
            //分屏
            splitScreenClick() {
                  let that = this;
                  that.screenShow = !that.screenShow;
                  that.mapData.screenShow = that.screenShow;

                  if (that.screenShow) {
                        $("#splitScreen").fadeIn(800, () => {
                              that.$refs.splitScreen.initMap([0, 1, 2, 3]);
                        });
                  } else {
                        $("#splitScreen").fadeOut(800, () => {
                        });
                  }
            },
      },
};
</script>
<style lang="less" scoped>
@import "../assets/css/oceanIndex.less";
</style>