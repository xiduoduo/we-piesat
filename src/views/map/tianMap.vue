

<template>
      <div id="oceanMap">
            <!-- 天地图 -->
            <div id="map" @click="clickMap"></div>
      </div>
</template> 
<script>
import * as L from 'leaflet'
import { mapGetters } from 'vuex'
export default {
      name: "tianMap",
      components: {  //引入模板
      },
      data() {
            return {
                  content: "", //显示经纬度信息
                  mapValue: '1',
                  imageSource: "",
                  imageUrl: "",
                  mapCenter: [76.27837743257827, 121.62741991765374],
                  mapType: '',
            };
      },
      computed: {
            ...mapGetters([
                  'mapUrl',
            ])
      },
      methods: {
            // 初始化地图
            initMap(type) {
                  let that = this;
                  //定义图层
                  that.mapData.map1 = new L.layerGroup();

                  //定义参数
                  let southWest = L.latLng(90, -90),
                        northEast = L.latLng(-90, 360),
                        bounds = L.latLngBounds(southWest, northEast);

                  that.mapData.map && that.mapData.map.remove();
                  //定义地图

                  that.mapData.map = L.map('map', {
                        // center: that.mapCenter,   //默认中心
                        center: [36.23, 137.29],   //默认中心
                        zoom: 3,
                        maxZoom: 16,
                        minZoom: 1,
                        // maxBounds: [bounds],//拖拽范围
                        doubleClickZoom: true,
                        zoomControl: false,
                        unloadInvisibleTiles: true,
                        attributionControl: false  // 移除右下角leaflet标识
                  });


                  // 设置天地图影像  默认为离线矢量墨卡托
                  that.setTileLayer(type);

                  //pm绘制方法
                  //pm:drawstart 开始第一个点的时候调用
                  //pm:drawend  禁止绘制时调用
                  //pm:create  创建完成时调用

                  that.drawInit();
                  that.mapData.map.on('pm:drawstart', ({ workingLayer }) => {
                        workingLayer.on('pm:vertexadded', e => {
                              // console.log(e);
                        });
                  });
                  // this.map.on("pm:drawend", e => {
                  //       console.log(e, "禁止绘制");
                  // }); 
                  that.mapData.map.on("pm:create", e => {
                        // console.log(e, "绘制完成时调用");
                        // console.log(e.layer._latlngs[0], "绘制坐标")

                        this.$store.dispatch('draw/updatedDrawCoordinate', e.layer._latlngs[0])

                        var layers = [], result = e.layer._latlngs[0];
                        for (let i = 0; i < result.length; i++) {
                              let layer = new L.marker([result[i].lat, result[i].lng]);
                              layers.push(layer);
                        }
                        var myGroup = L.layerGroup(layers);
                        that.mapData.map.addLayer(myGroup);

                        myGroup.clearLayers();

                        that.mapData.map.pm.toggleGlobalRemovalMode();//开启移除模式
                  });
            },
            //设置地图图层
            setTileLayer(url) {
                  let that = this;
                  that.removeCover(that.mapData.map1);

                  if (url == 'go1') {
                        // 高德地图
                        //初始化放大
                        that.mapData.map.setView([28.15, 134.52], 5);
                        that.mapData.map.options.maxZoom = 16;
                        that.mapData.map.options.minZoom = 3;
                        //在线  矢量
                        L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
                              { subdomains: "1234" }
                        ).addTo(that.mapData.map1);
                  }
                  else if (url == 'go2') {
                        // 高德地图
                        //初始化放大
                        that.mapData.map.setView([27.15, 134.52], 5);
                        that.mapData.map.options.maxZoom = 16;
                        that.mapData.map.options.minZoom = 3;
                        // 在线 影像
                        L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}',
                              { subdomains: "1234" }
                        ).addTo(that.mapData.map1);
                  }
                  else if (url == 'to1') {
                        that.mapData.map.setView([27.23, 117.29], 5);
                        // that.mapData.map.options.maxZoom = 10;
                        //离线矢量墨卡托  10层
                        L.tileLayer(that.mapUrl + "/map/{z}/{x}/{y}.png", {
                              subdomains: ["2", "3", "4", "5", "6", "7", "8"]
                        }).addTo(that.mapData.map1);

                        //名称
                        L.tileLayer(that.mapUrl + "/mapi/{z}/{x}/{y}.png", {
                              subdomains: ["2", "3", "4", "5", "6", "7", "8"]
                        }).addTo(that.mapData.map1);
                  }
                  else if (url == 'to2') {

                        that.mapData.map.setView([27.23, 117.29], 5);
                        // that.mapData.map.options.maxZoom = 10;
                        //离线影像墨卡托  10层
                        L.tileLayer(that.mapUrl + "/img/{z}/{x}/{y}.png", {
                              subdomains: ["2", "3", "4", "5", "6", "7", "8"]
                        }).addTo(that.mapData.map1);

                        //名称
                        L.tileLayer(that.mapUrl + "/mapi/{z}/{x}/{y}.png", {
                              subdomains: ["2", "3", "4", "5", "6", "7", "8"]
                        }).addTo(that.mapData.map1);
                  }
                  else if (url == 'to3') {
                        that.mapData.map.setView([27.23, 117.29], 5);

                        //天地图矢量在线
                        L.tileLayer("http://t0.tianditu.com/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=57445bba1bdc28f0bb4963e08b29ea7e",
                              { subdomains: ['2', '3', '4', '5', '6', '7', '8'] }
                        ).addTo(that.mapData.map1);

                        //天地图矢量在线标记
                        L.tileLayer("http://t0.tianditu.com/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=57445bba1bdc28f0bb4963e08b29ea7e",
                              { subdomains: ['2', '3', '4', '5', '6', '7', '8'] }
                        ).addTo(that.mapData.map1);
                  }
                  else if (url == 'to4') {
                        that.mapData.map.setView([27.23, 117.29], 5);

                        //天地图影像在线
                        L.tileLayer("http://t0.tianditu.com/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=57445bba1bdc28f0bb4963e08b29ea7e",
                              { subdomains: ['2', '3', '4', '5', '6', '7', '8'] }
                        ).addTo(that.mapData.map1);

                        //天地图影像在线标记
                        L.tileLayer("http://t0.tianditu.com/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=57445bba1bdc28f0bb4963e08b29ea7e",
                              { subdomains: ['2', '3', '4', '5', '6', '7', '8'] }
                        ).addTo(that.mapData.map1);
                  }
                  else if (url == 'to5') {
                        that.mapData.map.setView([27.23, 117.29], 5);

                        //天地图地形在线
                        L.tileLayer("http://t0.tianditu.com/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk=57445bba1bdc28f0bb4963e08b29ea7e",
                              { subdomains: ['2', '3', '4', '5', '6', '7', '8'] }
                        ).addTo(that.mapData.map1);

                        //天地图地形在线标记
                        L.tileLayer("http://t0.tianditu.com/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk=57445bba1bdc28f0bb4963e08b29ea7e",
                              { subdomains: ['2', '3', '4', '5', '6', '7', '8'] }
                        ).addTo(that.mapData.map1);
                  }


                  that.mapData.map1.addTo(that.mapData.map);
                  return that.mapData.map;
            },
            //移除图层
            removeCover(ele) {
                  let that = this;
                  ele.clearLayers();
            },
            //初始化地图绘制控件
            drawInit() {
                  let that = this;
                  that.mapData.map.pm.addControls({
                        position: "bottomleft",
                        drawPolygon: false, // 添加绘制多边形
                        drawMarker: false, //添加按钮以绘制标记
                        drawCircleMarker: false, //添加按钮以绘制圆形标记
                        drawPolyline: false, //添加按钮绘制线条
                        drawRectangle: false,	//添加按钮绘制矩形
                        drawCircle: false, //  添加按钮绘制圆圈
                        editMode: false, //  添加按钮编辑多边形
                        dragMode: false, //   添加按钮拖动多边形
                        cutPolygon: false, // 添加一个按钮以删除图层里面的部分内容
                        removalMode: true  // 清除图层
                  });
                  // 设置绘制后的线条颜色等
                  that.mapData.map.pm.setPathOptions({
                        color: "orange",
                        fillColor: "green",
                        fillOpacity: 0.4
                  });
                  that.mapData.map.pm.setLang('zh');
            },
            //多边形绘画
            drawPolygons() {
                  let that = this;
                  let points = []
                  let lines = new L.polyline([])
                  let tempLines = new L.polygon([])
                  that.mapData.map.on('click', onClick);    //点击地图
                  that.mapData.map.on('dblclick', onDoubleClick);//双击完成
                  that.mapData.map.on('mousemove', onMove)
                  function onClick(e) {

                        points.push([e.latlng.lat, e.latlng.lng])
                        lines.addLatLng(e.latlng)
                        that.mapData.map.addLayer(lines)
                        that.mapData.map.addLayer(L.circle(e.latlng, { color: '#ff0000', fillColor: 'ff0000', fillOpacity: 1 }))

                  }
                  function onMove(e) {
                        if (points.length > 0) {
                              let ls = [points[points.length - 1], [e.latlng.lat, e.latlng.lng]]
                              tempLines.setLatLngs(ls)
                              that.mapData.map.addLayer(tempLines)
                        }
                  }

                  function onDoubleClick(e) {
                        L.polygon([points]).addTo(that.mapData.map)
                        points = []
                        lines = new L.polyline([])
                  }
            },
            //点击地图
            clickMap(e) {
                  // console.log(e);
            },
      },
};
</script>
<style lang="less">
#oceanMap {
      overflow: hidden;
}
#topNavItem {
      overflow: hidden;
}
#map {
      padding: 0;
      margin: 0;
      height: 100vh;
      width: 100%;
      position: absolute;
      z-index: 100;
      top: 0;
      left: 0;
      .leaflet-right {
            display: none;
      }
}
.leaflet-control-container {
      display: none;
}
.my-div-icon {
      color: red;
      background: red;
      border-radius: 50%;
}
</style>