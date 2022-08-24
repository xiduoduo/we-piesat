<template>
      <div class="sliderEl">
            <div class="silderMod">
                  <div class="playEnd">
                        <img class="carouselIcon" src="@/assets/image/icon/pause.png" @click="carouselClick" v-show="carouselFlag" />
                        <img class="carouselIcon" src="@/assets/image/icons/play.png" @click="carouselClick" v-show="!carouselFlag" />
                  </div>
                  <div class="scheduleMod">
                        <div class="scheduleModBg"></div>
                        <div class="scheduleItem">
                              <!-- :class="[silderStates[index]?'active':'unfinished']" -->
                              <p class="silderItem" v-for="(item,index) in silderData" :key="index">
                                    <span class="silderCont" :class="num-1==index?'dq':'qt'">{{item.createTime}}</span>
                              </p>
                        </div>
                  </div>
            </div>
      </div>
</template>
<script>
import { buildVector, removeCanvas } from "@/assets/js/leaflet/process"
import { mapGetters } from 'vuex'
export default {
      name: "sliderEl",  //轮播展示组件
      components: {
      },
      data() {
            return {
                  carouselFlag: false,
                  silderData: [],
                  silderStates: {},
                  wmsLayer: null,
                  timer: null,
                  num: 0,
            };
      },
      computed: {
            ...mapGetters([
                  'patternState',
                  "geoserverUrl"
            ])
      },
      created() {
            let that = this;
            that.num = 0;
      },
      methods: {
            // 轮播播放暂停
            carouselClick() {
                  let that = this;
                  that.carouselFlag = !that.carouselFlag;
                  that.num = 0;
                  //轮播前先清除页面所有图层
                  that.clearViewer();

                  if (that.carouselFlag) {
                        //先展示第一条数据
                        let layerses, silders = that.silderData[0];
                        if (silders.searchId == 'seas_2') {
                              layerses = 'provinceDeom:' + silders.fileName + '.shp';
                        } else {
                              layerses = 'provinceDeom:' + silders.fileName + '.tiff';
                        }
                        that.wmsLayer = that.mapData.viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
                              url: that.geoserverUrl + '/geoserver/provinceDemo/wms?',
                              layers: layerses,
                              parameters: {
                                    service: 'WMS',
                                    transparent: true, // 是否透明
                                    format: 'image/png', // 返回格式
                                    srs: 'EPSG:4326',  // 坐标系
                                    styles: ''
                              }
                        }));

                        that.silderStates[0] = true;
                        that.num++;


                        //定义计时器 轮播 从第二条开始
                        that.timer = setInterval(function () {
                              let wmsLayers = that.wmsLayer;
                              wmsLayers && that.mapData.viewer.imageryLayers.remove(wmsLayers);

                              if (that.num < that.silderData.length) {
                                    let layers = '', silder = that.silderData[that.num];

                                    if (silder.searchId == 'seas_2') {
                                          layers = 'provinceDeom:' + silder.fileName + '.shp';
                                    } else {
                                          layers = 'provinceDeom:' + silder.fileName + '.tiff';
                                    }

                                    that.wmsLayer = that.mapData.viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
                                          url: that.geoserverUrl + '/geoserver/provinceDemo/wms?',
                                          layers: layers,
                                          parameters: {
                                                service: 'WMS',
                                                transparent: true, // 是否透明
                                                format: 'image/png', // 返回格式
                                                srs: 'EPSG:4326',  // 坐标系
                                                styles: ''
                                          }
                                    }));

                                    that.$set(that.silderStates, that.num, true);
                              }

                              that.num++;

                              if (that.num > that.silderData.length) {
                                    that.clear();
                              }
                        }, 8000)

                  } else {
                        that.clear();
                  }
            },
            //暂停 结束 清除
            clear() {
                  let that = this;

                  that.silderData.forEach((e, i) => {
                        that.silderStates[i] = false;
                  })

                  that.carouselFlag = false;
                  that.timer && clearInterval(that.timer);
                  that.wmsLayer && that.mapData.viewer.imageryLayers.remove(that.wmsLayer);
            },
            clearViewer() {
                  let that = this;
                  if (that.patternState) {
                        that.mapData.overlyName && that.mapData.overlyName.forEach(e => {
                              that.mapData[e] && that.mapData[e].forEach(v => {
                                    that.mapData.viewer.imageryLayers.remove(v);
                              })
                        });
                        that.mapData.cageLayer.forEach(e => {
                              that.mapData.viewer.imageryLayers.remove(that.mapData[e]);
                        })
                        that.mapData.overlyName = [];
                  } else {
                        that.mapData.overlyName && that.mapData.overlyName.forEach(e => {
                              that.mapData[e] && that.mapData[e].forEach(v => {
                                    that.mapData.map.removeLayer(v);
                              })
                        });
                        that.mapData.cageLayer.forEach(e => {
                              that.mapData.map.removeLayer(that.mapData[e]);
                        })

                        // that.mapData.allLayerBase.forEach(e => {
                        //       that.mapData.map.removeLayer(e);
                        // })
                        // that.mapData.allLayerAddition.forEach(e => {
                        //       that.mapData.map.removeLayer(e);
                        // })

                        that.mapData.overlyName = [];
                        removeCanvas(that.mapData.map);
                  }
            },
      },
};
</script>
<style scoped lang="less">
.sliderEl {
      position: fixed;
      bottom: 40px;
      left: 0;
      width: 100%;
      .silderMod {
            width: 940px;
            height: 36px;
            margin: 0 auto;
            .playEnd {
                  float: left;
                  margin: 5px;
                  width: 30px;
                  height: 28px;
                  border-radius: 4px;
                  position: relative;
                  .carouselIcon {
                        position: absolute;
                        top: -12px;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        z-index: 999;
                  }
            }
            .scheduleMod {
                  float: left;
                  width: 884px;
                  .scheduleModBg {
                        width: 882px;
                        height: 10px;
                        background: #222b3d;
                        border: 1px solid rgba(118, 227, 226, 0.3);
                        border-radius: 27px;
                  }
                  .scheduleItem {
                        display: flex;
                        line-height: 30px;
                        height: 30px;
                        line-height: 30px;
                        .active {
                              border-top: greenyellow 8px solid;
                        }
                        .unfinished {
                              border-top: rgb(40, 15, 202) 8px solid;
                        }
                        .silderItem {
                              flex: 1;
                              margin: 0;
                              text-align: center;
                              .dq {
                                    color: red;
                              }
                              .silderCont {
                                    display: block;
                                    font-size: 12px;
                                    position: relative;
                                    height: 30px;
                                    font-size: 12px;
                                    font-family: PingFangSC, PingFangSC-Regular;
                                    font-weight: 400;
                                    text-align: center;
                                    color: #ffffff;
                                    line-height: 30px;
                                    letter-spacing: 1px;
                              }
                              // .silderCont::before {
                              //       display: block;
                              //       content: "";
                              //       width: 8px;
                              //       height: 8px;
                              //       border-radius: 50%;
                              //       background: #ffffff;
                              //       position: absolute;
                              //       top: -8px;
                              //       left: 49.5%;
                              // }
                        }
                  }
            }
      }
}
</style>