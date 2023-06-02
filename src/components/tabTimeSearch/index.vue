
author：tiantf
time：20200908
remarks：时间选择查询组件

<template>
      <div class="tabTimeSearch">
            <div class="searchCont">
                  <div class="environmentTitle">
                        <img src="../../assets/image/icons/wd.png" alt="" class="temImg">
                        <span class="temperatureSpan">{{searchTitle}}</span>
                  </div>
                  <div class="formMod">
                        <el-form ref="searchForm" :rules="rules" :model="searchForm" label-width="80px">
                              <el-form-item label="起始时间:" prop="starTime" class="starTimeMod">
                                    <!-- value-format='yyyy-MM-dd HH:mm:ss' format='yyyy-MM-dd HH:mm:ss' -->
                                    <el-date-picker v-model="searchForm.starTime" type="date" value-format='yyyy-MM-dd 00:00:00' format='yyyy-MM-dd' placeholder="选择日期" />
                              </el-form-item>
                              <el-form-item label="结束时间:" prop="endTime" class="endTimeMod">
                                    <el-date-picker v-model="searchForm.endTime" type="date" value-format='yyyy-MM-dd 23:59:59' format='yyyy-MM-dd' placeholder="选择日期" />
                              </el-form-item>

                              <el-form-item label="成果名称" prop="resultName" class="starTimeMod" v-if="searchId == 's1' ||searchId == 's2' ||searchId == 's3' ||searchId == 's4' ">
                                    <el-input v-model="searchForm.resultName" placeholder="请输入名称"></el-input>
                              </el-form-item>

                              <div class="selectSate" v-else>
                                    <p class="selectSateTitle">选择卫星:</p>
                                    <p class="selectSateCont">
                                          <el-cascader v-model="searchForm.satellite" :options="sataOptions" clearable></el-cascader>
                                    </p>
                              </div>
                              <div class="searchMod">
                                    <span @click="onSearch()" class="searcgBtn">查询</span>
                                    <!-- <el-button @click="resetForm('searchForm')" class="btn">重置</el-button> -->
                              </div>
                        </el-form>
                  </div>

            </div>
            <div class="listMod">
                  <div class="environmentTitle">
                        <img src="../../assets/image/icons/bd.png" alt="" class="temImg">
                        <span class="temperatureSpan">文件列表</span>
                  </div>
                  <div class="listCont">
                        <div class="dataExplain">
                              查询结果共<span> {{allResultSence}} </span>个
                        </div>
                        <!-- default-expand-all row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}"-->
                        <el-table v-loading="listLoading" :data="listData" border class="elTable" :key="itemKey" @selection-change="handleSelectionChange">
                              <!-- <el-table-column type="selection" width="40">
                              </el-table-column> -->
                              <el-table-column prop="dataName" label="文件名" width="240" align="center">
                                    <template slot-scope="{row}">
                                          <el-tooltip class="dataNameClass" :content="row.dataName" placement="top">
                                                <span>{{ row.dataName }}</span>
                                          </el-tooltip>
                                    </template>
                              </el-table-column>
                              <el-table-column prop="type" label="操作" align="center" width="70">
                                    <template slot-scope="scope">
                                          <img class="lookImg1" src="../../assets/image/icon/biyan.png" alt="" @click="openParticulars(scope.row,scope.$index)" v-show="!scope.row.isShow">
                                          <img class="lookImg2" src="../../assets/image/icon/眼睛@2x.png" alt="" @click="closeParticulars(scope.row,scope.$index)" v-show="scope.row.isShow">
                                    </template>
                              </el-table-column>
                        </el-table>
                        <el-pagination layout="prev, pager, next" :current-page.sync='currentPage' :page-size="pageSize" :total="allResultSence" @prev-click='prevClick' @next-click='nextClick' @current-change='currentClick'>
                        </el-pagination>
                  </div>
            </div>
            <!-- 进度条 轮播-->
            <sliderEl ref="sliderEl" v-show="carouselShow" />

            <!-- 色带 -->
            <div v-bind:class="changeRibbonClass" class="ribbon" v-show="showRibbon">
                  <ul class="ribbonList">
                        <li v-for="(v,i) in ribbonList" :key="i">{{v}}</li>
                  </ul>
            </div>
            <imgView ref="imgView" />
            <!-- 展示类别选择 -->
            <showType v-show="showTypeShow" ref="showType" />
      </div>
</template>
<script>
import $ from 'jquery'
import sliderEl from '../sliderEl'
import showType from '../showType'
import imgView from '../imgView'
import { sataOptions } from "@/assets/data/sataOptions"
// import { setWindy, removeWindy } from '../../assets/js/wind/setWindy'
import { buildVector, removeCanvas } from "@/assets/js/leaflet/process"
import { mapGetters } from 'vuex'
import { getVisualList } from "@/api/method";
import { changeRibbonClass, setRibbonList, addWind, addLayersL, addLayersC, closeImgage, location, addImage } from "@/assets/js/method";
import { setDataList } from "@/assets/js/dataList"
export default {
      name: "tabTimeSearch",  //组件名称
      components: {  //引入模板
            sliderEl,
            showType,
            imgView
      },
      data() {
            return {
                  viewer: null,
                  searchTitle: '',
                  searchId: null,
                  itemKey: 1,
                  //查询表单数据
                  searchForm: {
                        starTime: '',
                        endTime: '',
                        satellite: [],
                        resultName: '',
                  },
                  //卫星数据
                  sataOptions: sataOptions,
                  rules: {},
                  listData: [],
                  listLoading: false,
                  coverageName: '',//图层名称
                  ribbonList: [],//色带数据
                  carouselShow: false,//轮播
                  allResultSence: 0,//查询结果共

                  showRibbon: false,//色带
                  showTypeShow: false,
                  showType: "showType1",//showType1  方向杆  showType2  流线 showType3  箭头
                  showTypeView: null,
                  thisRowData: {},
                  pageNum: 1,
                  pageSize: 20,
            };
      },
      //计算属性
      computed: {
            ...mapGetters([
                  'patternState',
                  "mapUrl",
                  "geoserverUrl",
                  'screenData',
                  'curtainState'
            ]),
            changeRibbonClass() {
                  let that = this;
                  if (changeRibbonClass(that.searchId).showRibbon) {
                        that.showRibbon = true;
                        return changeRibbonClass(that.searchId).name;
                  } else {
                        that.showRibbon = false;
                        return
                  }
            },
            currentPage: {
                  get() {
                        return this.pageNum
                  },
                  set(val) {
                        val == 1 ? this.pageNum = this.pageNum : this.pageNum = val;
                  }
            },
      },
      methods: {
            //子组件加载父组件调用方法
            getData(i) {
                  let that = this;
                  that.resetForm();
                  that.searchTitle = i.title;
                  that.searchId = i.id;
                  that.mapData.searchId = i.id;
                  that.coverageName = i.name;

                  //存储当前图层名称
                  that.mapData.overlyName.indexOf(i.name) == -1 && that.mapData.overlyName.push(i.name);
                  that.mapData[that.coverageName] = [];

                  // 切换色带
                  that.ribbonList = setRibbonList(i);
                  //自定义数据
                  that.listData = setDataList(i.id);
                  that.allResultSence = that.listData.length;
            },
            //查看图层
            openParticulars(row, index) {
                  console.log(22,row,index)
                  let that = this;
                  that.$set(that.listData[index], "isShow", true);
                  // that.itemKey = Math.random();
                  that.thisRowData = row;
                  //某些数据定位到展示位置
                  if (row.adr) {
                        location(that, row.adr);
                  }
                  //显示切换按钮
                  if (that.searchId == '1') {
                        that.showTypeShow = true;
                  } else {
                        that.showTypeShow = false;
                  }

                  //专题图展示
                  if (row.showImg) {
                        that.$refs.imgView.init(row.imgType, row.filePath, row, index);
                        return
                  }

                  //demo风场流线数据展示
                  if (row.showWind && !that.mapData.screenShow) {
                        that.$refs.showType.initType(4);
                        addWind(that, row.windUrl, row.particlesType);
                  }

                  //本地图片叠加地图
                  if (row.imgPath) {
                        addImage(that, row.imgPath, row.locat);
                        return
                  }
                  //没有图层 不显示
                  if (!row.layerMap) {
                        return
                  }
                  //分屏开启 显示分屏
                  if (that.mapData.screenShow) {
                        // 在分屏视图对应位置添加图层
                        let viewMap = that.$parent.$parent.$parent.$refs.splitScreen.mapRadioModel;
                        let wmsLayer = addLayersL(that, row.layerMap["1"],row);

                        let layersName = viewMap + '_' + index;
                        //有的先清除
                        that.mapData.viewLayers[layersName] && that.mapData.viewListInfo[viewMap].removeLayer(that.mapData.viewLayers[layersName]);
                        that.mapData.viewLayers[layersName] = wmsLayer;
                        that.mapData.screenData[index] = row;
                        that.$store.dispatch('map/setScreenData', that.mapData.screenData);
                        that.mapData.viewListInfo[viewMap].addLayer(that.mapData.viewLayers[layersName]);
                  }
                  //leaflet方式
                  else if (!that.patternState) {
                        if (that.curtainState) { //拉帘
                              that.$store.dispatch('map/setCurtainLayers', row.layerMap["1"]);
                              return
                        }
                        //加载底图  type 1 底图  2 箭头  3 方向杆   4 流线
                        //layerMap  1 底图  2 箭头  3 方向杆  4 风场流线
                        //  leaftlet加载wms  默认加载底图

                        that.mapData[that.coverageName][index] = addLayersL(that, row.layerMap["1"],row);
                        that.mapData.map.addLayer(that.mapData[that.coverageName][index]);

                        if (row.layerMap && row.layerMap["3"]) {
                              //  cesium加载wms  默认加载底图  有方向杆 默认加上
                              that.mapData.cageLayer.push(row.dataName);
                              that.mapData[row.dataName] = addLayersL(that, row.layerMap["3"],row);
                              that.mapData.map.addLayer(that.mapData[row.dataName]);

                              that.$refs.showType.initType(3);
                              that.showedTypeLayer = true;
                        } else if (row.layerMap && row.layerMap["2"]) {
                              //  cesium加载wms  默认加载底图  没有有方向杆 有箭头 默认加上
                              that.mapData.cageLayer.push(row.dataName);
                              that.mapData[row.dataName] = addLayersL(that, row.layerMap["2"],row);
                              that.mapData.map.addLayer(that.mapData[row.dataName]);

                              that.$refs.showType.initType(2);
                              that.showedTypeLayer = true;
                        } else {
                              that.$refs.showType.clearType();
                              that.showedTypeLayer = false;
                        }
                  }
                  //cesium方式
                  else if (that.patternState) {
                        if (that.curtainState) { //拉帘
                              that.$store.dispatch('map/setCurtainLayers', row.layerMap["1"]);
                              return
                        }
                        //加载底图  type 1 底图  2 箭头  3 方向杆   4 流线
                        //layerMap  1 底图  2 箭头  3 方向杆  4 风场流线
                        //  cesium加载wms  默认加载底图

                        that.mapData[that.coverageName][index] = addLayersC(that, row.layerMap["1"], row);

                        if (row.layerMap && row.layerMap["3"]) {
                              //  cesium加载wms  默认加载底图  有方向杆 默认加上
                              that.mapData.cageLayer.push(row.dataName);
                              that.mapData[row.dataName] = addLayersC(that, row.layerMap["3"], row)

                              that.$refs.showType.initType(3);
                              that.showedTypeLayer = true;
                        } else if (row.layerMap && row.layerMap["2"]) {
                              //  cesium加载wms  默认加载底图  没有有方向杆 有箭头 默认加上
                              that.mapData.cageLayer.push(row.dataName);
                              that.mapData[row.dataName] = addLayersC(that, row.layerMap["2"], row)

                              that.$refs.showType.initType(2);
                              that.showedTypeLayer = true;
                        } else {
                              that.$refs.showType.clearType();
                              that.showedTypeLayer = false;
                        }
                  }
            },
            //类型切换
            showTypeChange(type) {
                  let that = this;
                  //cesium
                  if (that.patternState) {
                        that.mapData[that.thisRowData.dataName] && that.mapData.viewer.imageryLayers.remove(that.mapData[that.thisRowData.dataName]);
                        that.mapData.viewer.scene.primitives.removeAll();
                        if ((type == 3 || type == 2) && that.thisRowData.layerMap && that.thisRowData.layerMap[type]) {
                              that.mapData[that.thisRowData.dataName] = addLayersC(that, that.thisRowData.layerMap[type])
                              that.showedTypeLayer = true;
                              // } else if (type == 4 && that.thisRowData.layerMap&& that.thisRowData.layerMap[type]) {
                        } else if (type == 4) {
                              addWind(that, that.thisRowData.windUrl);

                              that.showedTypeLayer = true;
                        } else {
                              that.$refs.showType.clearType();
                              that.showedTypeLayer = false;
                        }
                  }
                  //leaflet
                  else {
                        that.mapData[that.thisRowData.dataName] && that.mapData.map.removeLayer(that.mapData[that.thisRowData.dataName]);
                        removeCanvas(that.mapData.map);
                        if ((type == 3 || type == 2) && that.thisRowData.layerMap[type]) {
                              that.mapData[that.thisRowData.dataName] = addLayersL(that, that.thisRowData.layerMap[type]);

                              that.mapData.map.addLayer(that.mapData[that.thisRowData.dataName]);
                              that.showedTypeLayer = true;
                              // } else if (type == 4 && that.thisRowData.layerMap[type]) {
                        } else if (type == 4) {
                              let thisJson = that.mapUrl + '/json/MUL_OPER_OWV_L4A_FU_06H_20210222T18_dps_250_20_owv.json';
                              that.$api.getJson(thisJson).then(data => {
                                    buildVector(that, '', data);
                              })
                              that.showedTypeLayer = true;
                        } else {
                              that.$refs.showType.clearType();
                              that.showedTypeLayer = false;
                        }
                  }
            },
            //关闭图层
            closeParticulars(row, index) {
                  let that = this;
                  that.$set(that.listData[index], "isShow", false);
                  // that.itemKey = Math.random();

                  that.showTypeShow = false;
                  that.showTypeView && that.mapData.viewer.imageryLayers.remove(that.showTypeView);
                  that.$refs.imgView.dialogVisible = false;

                  closeImgage(that);

                  if (that.mapData.screenShow) {
                        let viewMap = that.$parent.$parent.$parent.$refs.splitScreen.mapRadioModel;
                        let layersName = viewMap + '_' + index;
                        //有的先清除
                        that.mapData.viewLayers[layersName] && that.mapData.viewListInfo[viewMap].removeLayer(that.mapData.viewLayers[layersName]);
                  }
                  else if (that.patternState) {
                        if (that.curtainState) { //拉帘
                              that.mapData.earthAtNight && that.mapData.viewer.imageryLayers.remove(that.mapData.earthAtNight);
                              return
                        }
                        that.mapData.viewer.scene.primitives.removeAll();
                        $("#datGui").remove();
                        that.mapData.viewer.imageryLayers.remove(that.mapData[that.coverageName][index]);
                        row.dataName && that.mapData[row.dataName] && that.mapData.viewer.imageryLayers.remove(that.mapData[row.dataName]);

                        that.mapData.cageLayer = that.mapData.cageLayer.filter(e => {
                              return e != row.dataName;
                        })
                  } else {
                        if (that.curtainState) { //拉帘
                              that.mapData.earthAtNight && that.mapData.earthAtNight.remove() && that.mapData.earthAtNightLine.remove();
                              return
                        }
                        removeCanvas(that.mapData.map);
                        that.mapData[that.coverageName] && that.mapData[that.coverageName][index] && that.mapData.map.removeLayer(that.mapData[that.coverageName][index]);
                        row.dataName && that.mapData[row.dataName] && that.mapData.map.removeLayer(that.mapData[row.dataName]);
                        that.mapData.cageLayer = that.mapData.cageLayer.filter(e => {
                              return e != row.dataName;
                        })
                  }
            },
            // 查询
            onSearch() {
                  let that = this;

                  that.listData = [];
                  that.mapData[that.coverageName] = [];
                  that.listLoading = true;
                  let arr1 = ["1", "2", "3", "4", "5", "6"];

                  if (arr1.indexOf(that.searchId) != -1) {
                        that.$api.listSeach({
                              pageSize: that.pageSize,	//每页数量
                              pageNum: that.pageNum,		//第几页
                              satName: that.searchForm.satellite[0],	//卫星名称
                              sensorName: that.searchForm.satellite[1],//载荷名称
                              elementType: that.searchId,	//数据要素 1:风场 2:海温 3：海面高度  4：有效波高   5：液水含量  6：云水含量
                              params: {
                                    startTime: that.searchForm.starTime,	//起始时间
                                    endTime: that.searchForm.endTime	//结束时间
                              },
                              // wkt: that.searchForm.area ? 'polygon(' + that.searchForm.area + ')' : '',
                        }).then(res => {
                              console.log(res);
                              that.listData = res.rows || [];
                              that.listData.forEach(e => {
                                    e.isShow = false;
                              })

                              that.allResultSence == res.total ? false : that.allResultSence = res.total;
                              that.listLoading = false;

                        }).catch(err => {
                              console.log(err);
                              that.allResultSence = 0;
                              that.listLoading = false;

                        })
                  } else if (that.searchId == 's1' || that.searchId == 's2' || that.searchId == 's3' || that.searchId == 's4') {
                        let type = that.searchId.substring(1, 2, 1);
                        getVisualList({
                              type: type,
                              taskName: that.searchForm.resultName,
                              fileName: '',//文件名称
                              startTime: that.searchForm.starTime,
                              endTime: that.searchForm.endTime
                        }).then(res => {
                              console.log(res);
                              that.listData = res.data || [];
                              that.listData.forEach(e => {
                                    e.isShow = false;
                              })

                              that.allResultSence == res.total ? false : that.allResultSence = res.total;
                              that.listLoading = false;

                        }).catch(err => {
                              console.log(err);
                              that.allResultSence = 0;
                              that.listLoading = false;
                        })
                  } else {
                        that.listData = [];
                        that.allResultSence = 0;
                        that.listLoading = false;
                  }
            },
            //分屏添加显示数据
            setScreenData() {
                  let that = this;
                  //头部添加
                  let rowData = {
                        viewTitle: that.searchTitle,
                        showMap: true
                  };
                  that.$parent.$parent.$parent.$refs.splitScreen.screenData.unshift(rowData);
                  // 尾部删除
                  that.$parent.$parent.$parent.$refs.splitScreen.screenData.pop();
            },
            // 选择数据变换事件  显示轮播
            handleSelectionChange(val) {
                  let that = this;
                  let silderStates = {};
                  let valData = [];
                  val.forEach((e, i) => {
                        e.children ? e.children.forEach(v => {
                              valData.push(v);
                        }) : valData.push(e);
                  })
                  valData.forEach((e, i) => {
                        silderStates[i] = false;
                  })

                  that.$refs.sliderEl.silderStates = silderStates;

                  //根据时间排序
                  that.$refs.sliderEl.silderData = valData.sort(function (a, b) {
                        return Date.parse(a.createTime.replace(/-/g, "/")) - Date.parse(b.createTime.replace(/-/g, "/"));
                  });;
                  valData.length > 0 ? that.carouselShow = true : that.carouselShow = false;
            },
            //获取时间
            initSatellite() {
                  let that = this;
                  let date = new Date();
                  let year = date.getFullYear();
                  let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                  let last = day / 1 - 1;
                  let today = year + '-' + month + '-' + day + " " + "23:59:59",
                        lastDay = year + '-' + month + '-' + day + " " + "00:00:00";
                  that.searchForm.starTime = lastDay;
                  that.searchForm.endTime = today;
            },
            // 上一页
            prevClick(prevNum) {
                  let that = this;
                  // 查询
                  that.pageNum = prevNum;
                  that.onSearch();
            },
            //下一页
            nextClick(nextNum) {
                  let that = this;
                  // 查询
                  that.pageNum = nextNum;
                  that.onSearch();
            },
            //跳转查询
            currentClick(num) {
                  let that = this;
                  // 查询
                  that.pageNum = num;
                  that.onSearch();
            },
            //重置
            resetForm() {
                  let that = this;
                  that.searchForm = {
                        starTime: '',
                        endTime: '',
                        satellite: [],
                        resultName: '',
                  }
                  that.pageNum = 1;
                  that.initSatellite();
                  that.listData = [];
            }
      },
      watch: {
            patternState(newVal) {
                  let that = this;
                  // that.onSearch();
            },
      }
};
</script>
<style lang="less" scoped>
/* css样式 scoped ：只对当前页面生效*/
@import "../../assets/css/tabTimeSearch.less";
</style>
