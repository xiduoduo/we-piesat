<template>
      <div class="splitScreen">
            <div class="viewMod">
                  <div v-for="(item,index) in screenDataView" :key="index" class="viewItem" :class="'map'+index" disabled='true'>
                        <p class="reminder">暂无数据</p>
                        <div :id="'map'+index" class="mapItem"></div>
                        <el-radio v-model="mapRadioModel" :label="'map'+index" class="mapRadio" @change="radioChange"></el-radio>
                        <div class="showInfo" v-show="mapRadioModel=='map'+index">
                              <p>当前屏幕编号：map{{index}}</p>
                              <p class="laeryNames" v-if="screenDataInfo[index] && screenDataInfo[index].dataName">{{screenDataInfo[index].dataName}}</p>
                        </div>
                        <div class="popupInfo" id="popupInfoItem" style="display: none;">
                              <span class="closeBtn" @click="closePopupInfo"></span>
                              <!-- <p>有效波高:{{highVal}}</p> -->
                              <p v-show="index == 0">经度:{{lngVal0}}</p>
                              <p v-show="index == 0">纬度:{{latVal0}}</p>
                              <p v-show="index == 1">经度:{{lngVal1}}</p>
                              <p v-show="index == 1">纬度:{{latVal1}}</p>
                              <p v-show="index == 2">经度:{{lngVal2}}</p>
                              <p v-show="index == 2">纬度:{{latVal2}}</p>
                              <p v-show="index == 3">经度:{{lngVal3}}</p>
                              <p v-show="index == 3">纬度:{{latVal3}}</p>
                        </div>
                  </div>
            </div>

      </div>
</template>
<script>
import * as L from 'leaflet'
import { mapGetters } from 'vuex'
export default {
      name: "splitScreen",
      components: {},
      data() {
            return {
                  screenDataView: [0, 1, 2, 3],
                  screenDataInfo: {},
                  mapRadioModel: 'map0',
                  viewTitle: '',
                  lngVal0: '',
                  latVal0: '',
                  lngVal1: '',
                  latVal1: '',
                  lngVal2: '',
                  latVal2: '',
                  lngVal3: '',
                  latVal3: '',
                  highVal: '',
            }
      },
      computed: {
            ...mapGetters([
                  'mapUrl',
                  'screenData',
            ])
      },
      methods: {
            //初始化模块地图
            initMap(data) {
                  let that = this;
                  that.$store.dispatch('map/setScreenData', {});
                  data.forEach(idName => {
                        if (idName > 3) {
                              return
                        }
                        //定义图层
                        let mapGroup = new L.layerGroup();

                        //定义地图
                        let mapId = 'map' + idName;
                        that.mapData.viewListInfo[mapId] && that.mapData.viewListInfo[mapId].remove();
                        let map = L.map(mapId, {
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
                        //点击事件
                        map.on('click', function (e) {
                              that.mapClickEvent(e, idName);
                        });
                        //移动
                        map.on('mousemove', function (e) {
                              that.mapMouseEvent(e);
                        });

                        // 设置天地图影像  离线影像墨卡托
                        map.setView([33.23, 117.29], 5);

                        //天地图影像在线
                        L.tileLayer(that.mapUrl + "/img/{z}/{x}/{y}.png",
                              { subdomains: ['2', '3', '4', '5', '6', '7', '8'] }
                        ).addTo(mapGroup);

                        //天地图影像在线标记
                        L.tileLayer(that.mapUrl + "/mapi/{z}/{x}/{y}.png",
                              { subdomains: ['2', '3', '4', '5', '6', '7', '8'] }
                        ).addTo(mapGroup);

                        mapGroup.addTo(map);

                        that.mapData.viewListInfo[mapId] = map;
                  })


            },
            //删除图层
            deleLayers(v, i) {
                  let that = this;
                  let layersName = that.mapRadioModel + '_' + v.layersIndex;
                  that.mapData[that.mapRadioModel].removeLayer(that.mapData.viewLayers[layersName]);

                  that.mapData.viewListInfo[that.mapRadioModel].splice(i, 1);

                  //   that.$set(that.$router.tableflag, v.layersIndex, false);
            },
            //移动
            mapMouseEvent(e) {
                  let that = this;
                  // console.log(e);
            },
            mapClickEvent(e, id) {
                  let that = this;
                  // console.log(e, id);
                  if (that.mapRadioModel == 'map' + id) {
                        if (id == '0') {
                              that.$(".map0 #popupInfoItem").show();
                              that.$(".map0 #popupInfoItem").css("top", e.containerPoint.y - 60);
                              that.$(".map0 #popupInfoItem").css("left", e.containerPoint.x - 44);
                              that.lngVal0 = e.latlng.lng.toFixed(2);
                              that.latVal0 = e.latlng.lat.toFixed(2);
                        }
                        else if (id == '1') {
                              that.$(".map1 #popupInfoItem").show();
                              that.$(".map1 #popupInfoItem").css("top", e.containerPoint.y - 60);
                              that.$(".map1 #popupInfoItem").css("left", e.containerPoint.x - 44);
                              that.lngVal1 = e.latlng.lng.toFixed(2);
                              that.latVal1 = e.latlng.lat.toFixed(2);
                        }
                        else if (id == '2') {
                              that.$(".map2 #popupInfoItem").show();
                              that.$(".map2 #popupInfoItem").css("top", e.containerPoint.y - 60);
                              that.$(".map2 #popupInfoItem").css("left", e.containerPoint.x - 44);
                              that.lngVal2 = e.latlng.lng.toFixed(2);
                              that.latVal2 = e.latlng.lat.toFixed(2);
                        }
                        else if (id == '3') {
                              that.$(".map3 #popupInfoItem").show();
                              that.$(".map3 #popupInfoItem").css("top", e.containerPoint.y - 60);
                              that.$(".map3 #popupInfoItem").css("left", e.containerPoint.x - 44);
                              that.lngVal3 = e.latlng.lng.toFixed(2);
                              that.latVal3 = e.latlng.lat.toFixed(2);
                        }
                  }
            },
            //关闭点击弹出框
            closePopupInfo() {
                  let that = this;
                  if (that.mapRadioModel == 'map0') {
                        that.$(".map0 #popupInfoItem").hide();
                  }
                  if (that.mapRadioModel == 'map1') {
                        that.$(".map1 #popupInfoItem").hide();
                  }
                  if (that.mapRadioModel == 'map2') {
                        that.$(".map2 #popupInfoItem").hide();
                  }
                  if (that.mapRadioModel == 'map3') {
                        that.$(".map3 #popupInfoItem").hide();
                  }

            },
            //选择地图框
            radioChange() {
                  let that = this;
                  that.$(".map0 #popupInfoItem").hide();
                  that.$(".map1 #popupInfoItem").hide();
                  that.$(".map2 #popupInfoItem").hide();
                  that.$(".map3 #popupInfoItem").hide();
            },
      },
      watch: {
            screenDataView(newVal, oldVal) {
                  let that = this;

                  newVal.forEach((e, i) => {
                        // that.initMap(i);
                  })
            },
            screenData(newVal, oldVal) {
                  let that = this;
                  that.screenDataInfo = newVal;
                  // console.log(newVal);
            },
      }
}
</script>
<style scoped lang="less">
.splitScreen {
      position: fixed;
      top: 60px;
      left: 0px;
      z-index: 998;
      width: 100%;
      height: calc(~"100% - 95px");
      .viewMod {
            position: relative;
            width: 100%;
            height: 100%;
            margin: 0 auto;
            overflow: hidden;
            border: 1px solid #f4f4f4;
            float: left;
            display: flex;

            flex-wrap: wrap;
            .viewItem {
                  width: 50%;
                  height: 50%;
                  position: relative;
                  background: rgba(221, 217, 217, 0.5);
                  .reminder {
                        text-align: center;
                        height: 40px;
                        line-height: 40px;
                        margin: 180px auto;
                        color: #ffffff;
                        letter-spacing: 12px;
                  }
                  .mapItem {
                        padding: 0;
                        margin: 0;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 999;
                        overflow: hidden;
                        padding: 1px;
                        .leaflet-right {
                              display: none;
                        }
                  }
                  .mapRadio {
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        z-index: 999;
                        /deep/.el-radio__inner {
                              width: 16px;
                              height: 16px;
                        }
                        /deep/.el-radio__label {
                              font-size: 18px;
                              color: #ffffff;
                        }
                  }
                  /deep/.is-checked {
                        /deep/.el-radio__label {
                              color: blue;
                        }
                  }
                  .leaflet-control-container {
                        display: none;
                  }
                  .showInfo {
                        width: 700px;
                        // height: 38px;
                        line-height: 20px;
                        padding: 5px;
                        background: #0b2537;
                        border: 1px solid #3e8da0;
                        position: absolute;
                        top: 10px;
                        left: 50px;
                        z-index: 999;
                        p {
                              // float: left;
                              margin: 0;
                              font-size: 12px;
                              font-family: PingFangSC, PingFangSC-Regular;
                              font-weight: 400;
                              text-align: left;
                              color: #ffffff;
                              letter-spacing: 1px;
                              // margin-left: 49px;
                        }
                        .laeryNames {
                              // width: 200px;
                              // text-align: left;

                              // width: 200px;
                              // line-height: 17px;
                              overflow: hidden;
                              // display: -webkit-box;
                              // -webkit-line-clamp: 4;
                              // -webkit-box-orient: vertical;
                              // text-overflow: ellipsis;
                        }
                  }
            }
      }
      .viewMod:before {
            content: "";
            width: 1px;
            height: 800px;
            background: #f4f4f4;
            position: absolute;
            top: 0;
            left: 50%;
      }
      .viewMod:after {
            content: "";
            width: 1320px;
            height: 1px;
            background: #f4f4f4;
            position: absolute;
            top: 50%;
            left: 0;
      }
      .infoList {
            margin-top: 500px;
            width: 220px;
            height: 300px;
            border: 1px solid #f4f4f4;
            float: left;
            display: block;
            .infoListTitle {
                  margin: 0;
                  color: #ffffff;
            }
            .listMod {
                  .listLayName {
                        margin: 0;
                        color: #ffffff;
                  }
                  .elAside {
                        height: 260px;
                  }
                  .layersItem {
                        margin: 0;
                        color: #ffffff;
                        width: 220px;
                        //溢出省略换行
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 5;
                        -webkit-box-orient: vertical;
                        i {
                              padding: 0 5px;
                        }
                        i:hover {
                              cursor: pointer;
                        }
                  }
            }
      }
      .popupInfo {
            position: absolute;
            width: 88px;
            height: 52px;
            background: #151621;
            border: 1px solid #459dae;
            border-radius: 4px;
            z-index: 999;
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
}
</style>
    