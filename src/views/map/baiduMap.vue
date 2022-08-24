
<template>
      <div id="baiduMapLeaflet">
            <div ref="map" class="map" id="map"></div>
      </div>

</template>

<script>
 import * as L from 'leaflet'
export default {
      name: 'baiduMapLeaflet',
      data() {
            return {
                  content: ''
            }
      },
      mounted() {
      },
      methods: {
            initMap() {
                  let that = this;
                  that.mapData.map && that.mapData.map.remove();

                  that.mapData.map = L.map('map', {
                        crs: L.CRS.Baidu,
                        minZoom: 3,
                        maxZoom: 18,
                        attributionControl: false,
                        center: [28.15, 134.52],
                        zoom: 6
                  });
                  //在线  卫星影像
                  that.mapData.mapType == 'bo1' &&
                        L.tileLayer.baidu({ layer: 'img' }).addTo(that.mapData.map);
                  // 离线
                  that.mapData.mapType == 'bo2' &&
                        L.tileLayer.baidu({ layer: 'vecL' }).addTo(that.mapData.map);

                  //鼠标移动事件
                  that.mapData.map.on('mousemove', function (e) {
                        that.mousemoveMap(e);
                  });

                  that.mapData.map.on("pm:create", e => {
                        // console.log(e, "绘制完成时调用");
                        // console.log(e.layer._latlngs[0], "绘制坐标")
                        // console.log(e);
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


                  //控制地图底图工具栏
                  // L.control.layers({
                  //       "百度地图": L.tileLayer.baidu({ layer: 'vec' }).addTo(that.mapData.map),
                  //       "百度卫星": L.tileLayer.baidu({ layer: 'img' }),
                  //       "百度地图-大字体": L.tileLayer.baidu({ layer: 'vec', bigfont: true }),
                  //       "百度卫星-大字体": L.tileLayer.baidu({ layer: 'img', bigfont: true }),
                  //       "自定义样式-黑色地图": L.tileLayer.baidu({ layer: 'custom', customid: 'dark' }),
                  //       "自定义样式-蓝色地图": L.tileLayer.baidu({ layer: 'custom', customid: 'midnight' }) //自定义样式地图，customid可选值：dark,midnight,grayscale,hardedge,light,redalert,googlelite,grassgreen,pink,darkgreen,bluish
                  // }, {
                  //       "实时交通信息": L.tileLayer.baidu({ layer: 'time' })
                  // }, { position: "topright" }).addTo(that.mapData.map);

                  // test
                  // new L.marker([31.839177, 117.232039]).addTo(that.mapData.map);
            },
            //地图移动鼠标展示坐标
            mousemoveMap(e) {
                  let that = this,
                        lat = Number(e.latlng.lat).toFixed(5),
                        lng = Number(e.latlng.lng).toFixed(5);

                  that.content = '经度' + lng.toString() + "," + '纬度' + lat.toString();

                  // L.popup()
                  //       .setLatLng([lat, lng])
                  //       .setContent('<p>' + that.content + '</p>')
                  //       .openOn(that.mapData.map);

            },
      }
}
</script>

<style scoped lang="less">
#baiduMapLeaflet {
      width: 100%;
      height: calc(~"100vh - 30px");
      .map {
            width: 100%;
            height: 100%;
      }
      .contentMod {
            position: fixed;
            bottom: 50px;
            left: 36px;
            z-index: 999;
            height: 40px;
            font-size: 16px;
            min-width: 182px;
            line-height: 40px;
            padding: 0 5px;
            background: #151621;
            border: 1px solid #459dae;
            color: #ffffff;
      }
      /deep/.leaflet-top {
            display: none;
      }
}
</style>
