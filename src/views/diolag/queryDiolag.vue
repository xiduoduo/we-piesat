<template>
      <div id="queryDiolag">
            <el-container class="elContainer" v-show="showDiolag">
                  <el-main style="padding:0px;">
                        <div class="queryTopTab">
                              <el-tabs v-model="topActiveName">
                                    <el-tab-pane label="查询条件" name="search">
                                          <div class="conditionCont queryContent">
                                                <div class="childTab">
                                                      <el-tabs v-model="activeName">
                                                            <el-tab-pane label="地图绘制" name="second">
                                                                  <el-tooltip class="item" effect="light" :content="countForm.tailorCoordinate" placement="top">
                                                                        <el-input placeholder="" v-model="countForm.tailorCoordinate" :disabled="true" class="tailorMap" />
                                                                  </el-tooltip>
                                                                  <button @click="drawRectangle" class="graphBtn"> 矩形</button>
                                                                  <button type="primary" plain @click="drawPolygon" class="graphBtn">多边形</button>
                                                            </el-tab-pane>

                                                            <el-tab-pane label="经纬度" name="third">
                                                                  <div>
                                                                        <el-input v-model="countForm.minLongitude" placeholder="最小经度" class="longLat" />
                                                                        <span style="margin:0 11px;color: #ffffff;">至</span>
                                                                        <el-input v-model="countForm.maxLongitude" placeholder="最大经度" class="longLat" />
                                                                  </div>
                                                                  <div style="margin-top:10px;">
                                                                        <el-input v-model="countForm.minLatitude" placeholder="最小纬度" class="longLat" />
                                                                        <span style="margin:0 11px;color: #ffffff;">至</span>
                                                                        <el-input v-model="countForm.maxLatitude" placeholder="最大纬度" class="longLat" />
                                                                  </div>
                                                                  <button class="loccatBtn" @click="loccatClick">空间定位</button>
                                                            </el-tab-pane>

                                                      </el-tabs>
                                                </div>

                                                <div class="acquisitionTime">
                                                      <el-form ref="timeRef" :model="queryForm" label-width="80px">
                                                            <el-form-item label="采集时间" class="cloudageMod">
                                                                  <el-date-picker v-model="queryForm.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd' format='yyyy-MM-dd' style="width: 300px;" />
                                                            </el-form-item>
                                                            <el-collapse v-model="activeNames">
                                                                  <el-collapse-item title="卫星载荷" name="1">
                                                                        <el-checkbox v-model="checkAllSate" class="checkAllMod" @change="allSateChange"></el-checkbox>
                                                                        <el-checkbox-group v-model="queryForm.satellite">
                                                                              <el-form-item :label="item.label" label-width="60px" v-for="(item,index) in allSateData" :key="index">
                                                                                    <el-checkbox v-for="items in item.childList" :label="items.label" :key="items.name">{{items.name}}</el-checkbox>
                                                                              </el-form-item>
                                                                        </el-checkbox-group>
                                                                  </el-collapse-item>
                                                            </el-collapse>
                                                            <div class="bottomBar">
                                                                  <el-form-item label="云量" class="cloudageMod" label-width="60px">
                                                                        <el-slider v-model="queryForm.cloudage" range show-stops :max="100" class="cloudageSlider" />
                                                                        <el-input v-model.number="queryForm.cloudage[0]" type="number" placeholder="" class="cloudInput" :disabled="true"></el-input>
                                                                        <el-input v-model.number="queryForm.cloudage[1]" type="number" placeholder="" class="cloudInput" :disabled="true"></el-input>
                                                                  </el-form-item>

                                                                  <div class="bottomNav">
                                                                        <span class="searchBtn" @click="searchClick">查询</span>
                                                                        <span class="testBtn" @click="testClick">重置</span>
                                                                  </div>
                                                            </div>
                                                      </el-form>
                                                </div>
                                          </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="查询结果" name="result1">
                                          <div class="resultCont queryContent">
                                                <div class="dataExplain">
                                                      查询结果共
                                                      <span>{{allTotal}}</span>
                                                      个，已选择
                                                      <span>{{selectSence}}</span>
                                                      个
                                                      <el-dropdown class="elDropdown" @command="handleCommand">
                                                            <p class="el-dropdown-link">
                                                                  产品生产
                                                                  <img src="../../assets/image/icon/tj.png" alt="" class="linkImg">
                                                            </p>
                                                            <el-dropdown-menu slot="dropdown">
                                                                  <el-dropdown-item command="1">防灾减灾</el-dropdown-item>
                                                                  <el-dropdown-item command="2">牧场监测</el-dropdown-item>
                                                                  <el-dropdown-item command="4">海岛变化</el-dropdown-item>
                                                                  <el-dropdown-item command="3">海岛植被变化</el-dropdown-item>
                                                            </el-dropdown-menu>
                                                      </el-dropdown>
                                                </div>
                                                <el-table ref="multipleTable" v-loading="listLoading" :data="tableData" :key="itemKey" tooltip-effect="dark" border @selection-change="handleSelectionChange" class="elTable">
                                                      <el-table-column type="selection" width="40">
                                                      </el-table-column>
                                                      <el-table-column label="操作" width="50" align="center">
                                                            <template slot-scope="{row,$index}">
                                                                  <img src="../../assets/image/icon/biyan.png" alt="" @click="openParticulars(row,$index)" v-show="!row.switch">
                                                                  <img src="../../assets/image/icon/眼睛@2x.png" alt="" @click="closeParticulars(row,$index)" v-show="row.switch">
                                                            </template>
                                                      </el-table-column>
                                                      <!-- <el-table-column prop="firstGrade" label="卫星" width="70" align="center">
                                                            <template slot-scope="scope">
                                                                  <el-tooltip class="dataNameClass" :content="scope.row.firstGrade" placement="top">
                                                                        <el-button>{{ scope.row.firstGrade }}</el-button>
                                                                  </el-tooltip>
                                                            </template>
                                                      </el-table-column> -->
                                                      <el-table-column prop="dataName" label="文件名" align="center">
                                                            <template slot-scope="scope">
                                                                  <el-tooltip class="dataNameClass" :content="scope.row.dataName" placement="top">
                                                                        <el-button @click="showDataInfo(scope.row)">{{ scope.row.dataName }}</el-button>
                                                                  </el-tooltip>
                                                            </template>
                                                      </el-table-column>
                                                </el-table>
                                                <el-pagination layout="prev, pager, next" :page-size="pagTotal" :total="allTotal" @prev-click='prevClick' @next-click='nextClick' @current-change='currentClick'>
                                                </el-pagination>
                                          </div>
                                    </el-tab-pane>
                              </el-tabs>
                        </div>

                  </el-main>
            </el-container>
            <!-- 显示隐藏按钮 -->
            <div class="showIcon showIconMargin">
                  <img src="@/assets/image/icon/left.png" alt="" @click="showPage" v-if="!showDiolag">
                  <img src="@/assets/image/icon/right.png" alt="" @click="closePage" v-else>
            </div>

            <!-- 查看文件详情 -->
            <el-dialog title="文件详情" class="showDataMod" :visible.sync="showDataInfoFlag" :before-close="showInfoClose" destroy-on-close>
                  <div class="modCont">
                        <p class="shoeDataTitle">
                              <span class="sonTitle">一级</span>
                              <span class="sonCont">{{dialogData.firstGrade}}</span>
                              <span class="sonTitle">二级</span>
                              <span class="sonCont">{{dialogData.secondGrade}}</span>
                        </p>
                        <p class="shoeDataTitle">
                              <span class="sonTitle">创建时间</span>
                              <span class="sonCont">{{dialogData.collectionTime}}</span>
                        </p>
                        <p class="shoeDataTitle">
                              <span class="sonTitle">WKT</span>
                              <span class="sonCont">{{dialogData.spatialRange}}</span>
                        </p>
                        <p class="shoeDataTitle">
                              <span class="sonWjTitle">文件名</span>
                              <span class="sonWjCont">{{dialogData.dataName}}</span>
                        </p>
                        <p class="shoeDataImg">
                              <span class="sluTitle">缩略图</span>
                              <img :src="dialogData.imageList[0].imgPath" alt="" @click="showBigImgClick" v-if="dialogData.imageList">
                        </p>
                  </div>
            </el-dialog>

            <!-- 查看大图 -->
            <el-dialog title="查看图片" :visible.sync="showBigImgFlag" :before-close="showBigImgClose" destroy-on-close class="bigImgMod">
                  <img :src="dialogData.imageList[0].imgPath" alt="" v-if="dialogData.imageList">
            </el-dialog>

            <!-- 输入提交名称 -->
            <el-dialog title="请输入名称:" :visible.sync="showName" class='showNameDialog'>
                  <el-input v-model="taskName" placeholder="请输入名称"></el-input>
                  <span slot="footer" class="dialog-footer">
                        <el-button @click="showName = false" class="cancelBtn">取 消</el-button>
                        <el-button type="primary" @click="creatData" class="cancelBtn" v-show="!lookResultFlag">确 定</el-button>
                        <el-button type="primary" @click="lookResult" v-show="lookResultFlag" class="cancelBtn">查看结果</el-button>

                  </span>
            </el-dialog>

            <!-- 输入提交名称 -->
            <el-dialog title="请输入名称:" :visible.sync="showResultName" class='showNameDialog'>
                  <el-input v-model="taskName" placeholder="请输入名称"></el-input>
                  <div v-show="showResult" class="resultList">
                        <p v-for="(item,index) in metadataArr" :key="index">
                              <span class="resultDataName">{{item.name}}</span>
                              <span class="looResult" @click="islandResult(item.id)">查看结果</span>
                        </p>
                  </div>
                  <div v-show="showResult" class="resultList">
                        <p>
                              <span class="resultDataName" v-show="taskType == 4">海岛变化</span>
                              <span class="resultDataName" v-show="taskType == 1">防灾减灾</span>
                              <span class="looResult" @click="verificationIslan">查看结果</span>
                        </p>
                  </div>
                  <span slot="footer" class="dialog-footer" v-show="!showResult">
                        <el-button @click="showResultName = false" class="cancelBtn">取 消</el-button>
                        <el-button type="primary" @click="creatData " class="cancelBtn" v-show="!lookResultFlag">确 定</el-button>
                        <el-button type="primary" @click="lookResult" v-show="lookResultFlag" class="cancelBtn">查看结果</el-button>
                  </span>
            </el-dialog>
      </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { allSateData } from "@/assets/data/sataOptions"
import { oceanMonitor, getFzjzFlowStatus, checkUnDataStatus, getFlowStatus } from "@/api/method";
import { clearViewer } from "@/assets/js/method"
 import * as L from 'leaflet'
export default {
      name: "satelliteQuery",//卫星数据查询
      components: {
      },
      data() {
            return {
                  itemKey: 1,
                  showDiolag: true,//页面显示隐藏
                  topActiveName: 'search',
                  tableData: [],
                  showPag: false,
                  listLoading: false,
                  activeNames: ['1'],
                  activeName: "second",
                  countForm: { //表单数据
                        tailorCoordinate: "",//地图绘制
                        minLongitude: "-180",
                        maxLongitude: "180",
                        minLatitude: "-90",
                        maxLatitude: "90",
                        jointLongit: ""
                  },
                  queryForm: { //查询条件表单
                        satellite: [],
                        cloudage: [0, 40],
                        time: ['', ''],
                        longitude: ''
                  },
                  queryTemporaryForm: { //查询上一页下一页数据
                        spatialRange: '',
                        beginTime: '',
                        endTime: '',
                        firstGrade: ''
                  },
                  allTotal: 0,//数据总条数
                  pagTotal: 30,//每页显示查询条数
                  selectSence: 0,//选择的条数
                  checkAllSate: false,//全选卫星状态
                  allSateData: allSateData,
                  allCheckSate: [],//全选卫星数据
                  allSelectData: [],//选择结果数据
                  metadataId: '',//算法类型id
                  showName: false,//输入名称弹出框
                  taskName: '',//提交名称
                  taskType: '',//生成数据类型
                  pushResultId: '',//提交任务文件id拼接
                  showDataInfoFlag: false,
                  showBigImgFlag: false,
                  showResultName: false,
                  lookResultFlag: false,
                  showResult: false,
                  metadataArr: [],
                  dialogData: {},
                  firstGradeArr: ['GF1', 'GF2', 'GF3', 'GF4', 'GF6', 'HY-1C', 'HY-1D'],
                  sfUrl: 'http://59.50.38.97:30800/dist/#/taskManage/TaskDetails/11996/',
            };
      },
      computed: {
            ...mapGetters([
                  'drawCoordinate',
                  'patternState',
                  "mapUrl"
            ])
      },
      mounted() {
            let that = this;
            that.allSateData.forEach(e => {
                  e.childList.forEach(v => {
                        that.allCheckSate.push(v.label)
                  })
            })
            clearViewer(that);
      },
      methods: {
            //查看图层
            openParticulars(row, index) {
                  let that = this;
                  that.$set(that.tableData[index], "switch", true);
                  that.itemKey = Math.random();

                  if (!row.imageList || row.imageList.length <= 0) {
                        return
                  }

                  let thisListData = row.imageList[0];
                  // let thisListData = {};

                  // thumbPath缩略图 imgPath 大图
                  // thisListData.spatialRange = 'polygon((128.004957 40.194005,128.346042 40.242724,128.427260 39.909024,128.087907 39.860308,128.004957 40.194005))'
                  let arr1 = thisListData.spatialRange.split('(');
                  let arr2 = arr1[arr1.length - 1].split(')');
                  let arr3 = arr2[0].split(',');
                  let min = arr3[0].split(' ');
                  let center = arr3[1].split(' ');
                  let max = arr3[3].split(' ');

                  //cesium
                  if (that.patternState) {
                        // that.patternState && that.mapData.viewer.camera.flyTo({
                        //       destination: Cesium.Cartesian3.fromDegrees(center[0], center[1], 438723),//经度、纬度、高度
                        //       orientation: {
                        //             heading: Cesium.Math.toRadians(348.4202942851978),//绕垂直于地心的轴旋转
                        //             pitch: Cesium.Math.toRadians(-89.74026687972041),//绕纬度线旋转
                        //             roll: Cesium.Math.toRadians(0)//绕经度线旋转
                        //       },
                        //       complete: function callback() {
                        //       }
                        // });
                        //画边框
                        let polyData = [], polyDataArr = [];
                        arr3.forEach(v => {
                              let splitArr = v.split(' ');
                              let newArr = [Number(splitArr[0]), Number(splitArr[1])];
                              polyDataArr.unshift(newArr);
                              polyData.push(Number(splitArr[0]))
                              polyData.push(Number(splitArr[1]))
                        })
                        //边框
                        if (that.firstGradeArr.indexOf(row.firstGrade) == -1) {
                              that.mapData.queryLocat[index] = that.mapData.viewer.entities.add({
                                    name: "Yellow plane outline",
                                    polygon: {
                                          hierarchy: Cesium.Cartesian3.fromDegreesArray(polyData),
                                          // hierarchy: Cesium.Cartesian3.fromDegreesArray([120.61596, 27.936,
                                          //       121.34135, 27.9355,
                                          //       121.34176, 27.342118,
                                          //       120.602136, 27.35442,
                                          //       120.61596, 27.936]),
                                          // material: Cesium.Color.RED.withAlpha(0.3),
                                          material: Cesium.Color.RED.withAlpha(0.3),
                                    }
                              });
                        } else {
                              //添加缩略图
                              that.mapData.queryLocat[index] = that.mapData.viewer.entities.add({
                                    name: "Yellow plane outline",
                                    polygon: {
                                          hierarchy: Cesium.Cartesian3.fromDegreesArray(polyData),
                                          // hierarchy: Cesium.Cartesian3.fromDegreesArray([120.61596, 27.936,
                                          //       121.34135, 27.9355,
                                          //       121.34176, 27.342118,
                                          //       120.602136, 27.35442,
                                          //       120.61596, 27.936]),
                                          // material: Cesium.Color.RED.withAlpha(0.3),
                                          material: thisListData.imgPath,
                                    }
                              });
                        }
                  }
                  // leaflet
                  else {
                        // that.mapData.map.setView([center[1], center[0]], 6);
                        //画边框
                        let polyData = []
                        arr3.forEach(v => {
                              let splitArr = v.split(' ');
                              let newArr = [Number(splitArr[1]), Number(splitArr[0])];
                              polyData.unshift(newArr);
                        })
                        let poly = L.polygon(polyData, {
                              color: 'red', fillColor: 'red',
                              weight: 2
                        });
                        that.mapData.queryLocat[index] = poly;
                        that.mapData.map.addLayer(that.mapData.queryLocat[index]);

                        // 三个点
                        //添加缩略图
                        if (that.firstGradeArr.indexOf(row.firstGrade) == -1) {
                              return
                        } else {
                              let point1 = L.latLng(Number(min[1]), Number(min[0])),
                                    point2 = L.latLng(Number(center[1]), Number(center[0])),
                                    point3 = L.latLng(Number(max[1]), Number(max[0]));

                              L.imageOverlay.rotated(thisListData.imgPath, point1, point2, point3, {
                                    opacity: 1,
                                    interactive: true,
                              }).addTo(that.mapData.resultImg[index]);
                              // function setOverlayOpacity(opacity) {
                              //       overlay.setOpacity(opacity);
                              // }
                              that.mapData.resultImg[index].addTo(that.mapData.map);
                        }
                  }

            },
            //关闭图层
            closeParticulars(row, index) {
                  let that = this;
                  that.$set(that.tableData[index], "switch", false);
                  that.itemKey = Math.random();
                  if (that.patternState) {
                        that.mapData.queryLocat[index] && that.mapData.viewer.entities.remove(that.mapData.queryLocat[index]);
                  } else {
                        that.mapData.queryLocat[index] && that.mapData.map.removeLayer(that.mapData.queryLocat[index]);
                        that.mapData.resultImg[index] && that.mapData.resultImg[index].clearLayers();
                  }
            },
            //提交选择算法
            handleCommand(type) {
                  let that = this;
                  if (that.allSelectData.length <= 0) {
                        that.$message({
                              message: '请选择提交数据!',
                              type: 'warning'
                        });
                  } else {
                        that.taskType = type;
                        that.taskName = "";
                        that.lookResultFlag = false;
                        that.showResult = false;
                        if (type == 1 || type == 4) {
                              that.showResultName = true;
                        }
                        if (type == 2 || type == 3) {
                              that.showName = true;
                        }
                        that.metadataArr = [];
                  }
            },
            //生成接口
            creatData() {
                  let that = this;

                  if (that.taskName == '') {
                        that.$message({
                              message: '请输入名称!',
                              type: 'warning'
                        });
                  } else {
                        that.metadataArr = [];
                        oceanMonitor(that.taskType, that.metadataId, that.taskName)
                              .then(res => {
                                    console.log(res);
                                    if (res.code == 200) {
                                          that.lookResultFlag = true;
                                          that.metadataArr = res.data.list;//查看结果列表

                                          if (that.taskType == 4 || that.taskType == 1) {
                                                that.verificatTaskId = res.data.taskId;//验证最终流程的id
                                          }
                                          that.$message({
                                                message: '提交成功!',
                                                type: 'success'
                                          });

                                    } else {
                                          that.lookResultFlag = false;
                                          that.$message({
                                                message: '任务名称重复!',
                                                type: 'warning'
                                          });
                                    }
                              })
                  }
            },
            //查看结果
            lookResult() {
                  // 数据产品类型 1海洋防灾减灾 2海洋牧场监测 3海岛植被变化 4海岛变化  taskType
                  let that = this;
                  let taskName = '';

                  that.taskType == 1 ? taskName = '防灾减灾' :
                        (that.taskType == 2 ? taskName = '牧场监测' :
                              (that.taskType == 3 ? taskName = '海岛植被变化' :
                                    taskName = '海岛变化'));

                  //海岛变化显示结果列表
                  if (that.taskType == 4 || that.taskType == 1) {
                        that.showResult = true;
                  } else {
                        that.metadataArr.forEach(e => {
                              let url = that.sfUrl + e.id + '/4/' + taskName;
                              window.open(url);
                        })
                  }
            },
            //查看结果验证
            islandResult(taskId) {
                  let that = this;
                  let taskName = '';

                  that.taskType == 1 ? taskName = '防灾减灾' :
                        (that.taskType == 2 ? taskName = '牧场监测' :
                              (that.taskType == 3 ? taskName = '海岛植被变化' :
                                    taskName = '海岛变化'));
                  //海岛变化 直接查看调度
                  if (that.taskType == 4) {
                        let url = that.sfUrl + taskId + '/4/' + taskName;
                        window.open(url);
                  }
                  //防灾减灾验证
                  else {
                        checkUnDataStatus({
                              metadataId: taskId,
                              taskId: that.verificatTaskId
                        }).then(res => {
                              if (res.code == 200) {
                                    that.metadataArr.forEach(item => {
                                          if (taskId == item.id) {
                                                item.flowIds = res.data.list[0].id;
                                          }
                                    })

                                    let url = that.sfUrl + res.data.list[0].id + '/4/' + taskName;
                                    window.open(url);

                              } else {
                                    that.$message({
                                          message: res.msg,
                                          type: 'warning'
                                    });
                              }
                        })
                  }
            },
            //验证海岛流程时候完成
            verificationIslan() {
                  let that = this;
                  let flowIds = '';
                  let taskName = '';

                  that.taskType == 1 ? taskName = '防灾减灾' :
                        (that.taskType == 2 ? taskName = '牧场监测' :
                              (that.taskType == 3 ? taskName = '海岛植被变化' :
                                    taskName = '海岛变化'));

                  if (that.verificatTaskId) {
                        // 海岛变化
                        if (that.taskType == 4) {
                              that.metadataArr.forEach(item => {
                                    flowIds += item.id + ',';
                              })
                              flowIds = flowIds.substring(0, flowIds.length - 1);
                              getFlowStatus({
                                    flowIds: flowIds,
                                    taskId: that.verificatTaskId
                              }).then(res => {
                                    console.log(res);
                                    if (res.data) {
                                          let url = that.sfUrl + res.data + '/4/' + taskName;
                                          window.open(url);
                                          that.verificatTaskId = null;
                                    } else {
                                          that.$message({
                                                message: '流程未完成，请稍后再试!',
                                                type: 'warning'
                                          });
                                    }
                              })
                        }
                        // 防灾减灾
                        else {
                              that.metadataArr.forEach(item => {
                                    flowIds += item.flowIds + ',';
                              })
                              flowIds = flowIds.substring(0, flowIds.length - 1);
                              getFzjzFlowStatus({
                                    flowIds: flowIds,
                                    taskId: that.verificatTaskId
                              }).then(res => {
                                    console.log(res);
                                    if (res.data) {
                                          let url = that.sfUrl + res.data + '/4/' + taskName;
                                          window.open(url);
                                          that.verificatTaskId = null;
                                    } else {
                                          that.$message({
                                                message: '流程未完成，请稍后再试!',
                                                type: 'warning'
                                          });
                                    }
                              })
                        }
                  } else {
                        that.$message({
                              message: '流程已提交!',
                              type: 'warning'
                        });
                  }

            },
            //查询数据方法
            queryFun(pageNum, pageSize, spatialRange, beginTime, endTime, firstGrade) {
                  let that = this;
                  that.listLoading = true;
                  clearViewer(that);
                  that.$api.listByTypes({
                        pageNum: pageNum,//页码
                        pageSize: pageSize,//数量
                        wkt: spatialRange ? 'polygon(' + spatialRange + ')' : '',
                        params: {
                              startTime: beginTime,	//起始时间
                              endTime: endTime	//结束时间
                        },
                        satName: firstGrade,
                  }).then(res => {
                        let roesData = res.rows;
                        console.log(res);
                        roesData.length > 0 ? that.showPag = true : that.showPag = false;
                        that.allTotal = res.total;

                        that.mapData.queryLocat = [];

                        roesData && roesData.forEach(function (i, v) {
                              i.switch = false;
                              that.mapData.resultImg.push(new L.layerGroup());
                              that.mapData.queryLocat.push(null)
                        })
                        that.tableData = roesData;

                        that.testClick();
                        that.listLoading = false;
                  }).catch(err => {
                        that.listLoading = false;
                        console.log(err);
                  })
            },
            //查询结果数据选择
            handleSelectionChange(val) {
                  let that = this;
                  that.metadataId = '';
                  that.selectSence = val.length;
                  // that.allSelectData = that.allSelectData.concat(val);
                  that.allSelectData = val;
                  that.allSelectData.forEach(item => {
                        that.metadataId += item.dataId + ',';
                  })
                  that.metadataId = that.metadataId.substring(0, that.metadataId.length - 1);
            },
            //查看查询详情信息
            showDataInfo(val) {
                  let that = this;
                  that.dialogData = val;
                  that.$("#showDataMod").fadeIn();
                  that.showDataInfoFlag = true;
            },
            //卫星全选
            allSateChange(val) {
                  let that = this;
                  if (val) {
                        that.queryForm.satellite = that.allCheckSate;
                  } else {
                        that.queryForm.satellite = [];
                  }
            },
            //绘制矩形
            drawRectangle() {
                  let that = this;
                  // cesium
                  if (that.patternState) {
                        that.jx();
                  }
                  //leaflet
                  else {
                        this.$store.dispatch('draw/updateDrawRectangle', true)
                        // that.updateDrawRectangle({ dFlag: true });
                        that.mapData.map.pm.setPathOptions({
                              color: 'orange',
                              opacity: 0.2
                              // fill: false,
                        });
                        that.mapData.map.pm.enableDraw("Rectangle", {
                              snappable: false,
                              templineStyle: {
                                    color: 'red',
                                    fill: false
                              },
                              snapDistance: 40,
                              hintlineStyle: {
                                    color: 'red',
                                    fill: false
                              }

                        });
                        that.mapData.map.pm.setLang('zh');
                  }

            },
            jx() {
                  let that = this;
                  that.countForm.tailorCoordinate = "";
                  var showPointArr = [];
                  var activeShapePoints = [];
                  var activeShape;
                  var floatingPoint;
                  var handler = new Cesium.ScreenSpaceEventHandler(that.mapData.viewer.canvas);

                  //双击鼠标左键清除默认事件
                  /*  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(function (event){
                        if (!this.handler) {
                            this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
                        }
                        this.viewer.entities.remove();
                        this.handler.destroy();
                        this.handler = null;
                    },Cesium.ScreenSpaceEventType.RIGHT_CLICK);*/
                  //绘制点
                  function createPoint(worldPosition) {
                        var point = that.mapData.viewer.entities.add({
                              position: worldPosition,
                              point: {
                                    color: Cesium.Color.WHITE,
                                    pixelSize: 5,
                                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                              }
                        });
                        return point;
                  }
                  //初始化为线
                  var drawingMode = 'line';
                  //绘制图形
                  function drawShape(positionData) {
                        let objId = Number((new Date()).getTime() + "" + Number(Math.random() * 1000).toFixed(0));
                        var shape;
                        if (drawingMode == 'line') {
                              shape = that.mapData.viewer.entities.add({
                                    polyline: {
                                          positions: positionData,
                                          clampToGround: true,
                                          width: 3,
                                          objId: objId,
                                    }
                              });
                        } else if (drawingMode == 'polygon') {
                              shape = that.mapData.viewer.entities.add({
                                    polygon: {
                                          hierarchy: positionData,
                                          material: new Cesium.ColorMaterialProperty(Cesium.Color.WHITE.withAlpha(0.7)),
                                          objId: objId,
                                    }
                              });
                        } else if (drawingMode == 'circle') {
                              //当positionData为数组时绘制最终图，如果为function则绘制动态图
                              var value = typeof positionData.getValue === 'function' ? positionData.getValue(0) : positionData;
                              //var start = activeShapePoints[0];
                              //var end = activeShapePoints[activeShapePoints.length - 1];
                              //var r = Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));
                              //r = r ? r : r + 1;
                              shape = that.mapData.viewer.entities.add({
                                    position: activeShapePoints[0],
                                    name: 'Blue translucent, rotated, and extruded ellipse with outline',
                                    type: 'Selection tool',
                                    objId: objId,
                                    ellipse: {
                                          semiMinorAxis: new Cesium.CallbackProperty(function () {
                                                //半径 两点间距离
                                                var r = Math.sqrt(Math.pow(value[0].x - value[value.length - 1].x, 2) + Math
                                                      .pow(value[0].y - value[value.length - 1].y, 2));
                                                return r ? r : r + 1;
                                          }, false),
                                          semiMajorAxis: new Cesium.CallbackProperty(function () {
                                                var r = Math.sqrt(Math.pow(value[0].x - value[value.length - 1].x, 2) + Math
                                                      .pow(value[0].y - value[value.length - 1].y, 2));
                                                return r ? r : r + 1;
                                          }, false),
                                          material: Cesium.Color.BLUE.withAlpha(0.5),
                                          outline: true
                                    }
                              });
                        } else if (drawingMode == 'rectangle') {
                              //当positionData为数组时绘制最终图，如果为function则绘制动态图
                              var arr = typeof positionData.getValue === 'function' ? positionData.getValue(0) : positionData;
                              shape = that.mapData.viewer.entities.add({
                                    name: 'Blue translucent, rotated, and extruded ellipse with outline',
                                    rectangle: {
                                          coordinates: new Cesium.CallbackProperty(function () {
                                                var obj = Cesium.Rectangle.fromCartesianArray(arr);
                                                //if(obj.west==obj.east){ obj.east+=0.000001};
                                                //if(obj.south==obj.north){obj.north+=0.000001};
                                                return obj;
                                          }, false),
                                          material: Cesium.Color.ORANGE.withAlpha(0.3),
                                          // fill: false,
                                          // material: {
                                          //       solidColor: {
                                          //             color: {
                                          //                   rgbaf: [1, 0, 0, 0.39],
                                          //             },
                                          //       },
                                          // },
                                          // height: 0, // disables ground clamping, needed for outlines
                                          // outline: true,
                                          // outlineColor: Cesium.Color.BLUE,
                                    },
                                    objId: objId,
                              });
                        }
                        return shape;
                  }
                  function getCatesian3FromPX(px) {
                        var cartesian;
                        var ray = that.mapData.viewer.camera.getPickRay(px);
                        if (!ray) return null;
                        cartesian = that.mapData.viewer.scene.globe.pick(ray, that.mapData.viewer.scene);
                        return cartesian;
                  }
                  //鼠标左键
                  handler.setInputAction(function (event) {
                        // We use `viewer.scene.pickPosition` here instead of `viewer.camera.pickEllipsoid` so that
                        // we get the correct point when mousing over terrain.
                        // scene.pickPosition只有在开启地形深度检测，且不使用默认地形时是准确的。
                        //var earthPosition = viewer.scene.pickPosition(event.position);

                        var earthPosition = getCatesian3FromPX(event.position);
                        //经纬度
                        var ellipsoid = that.mapData.viewer.scene.globe.ellipsoid;
                        var cartographic = ellipsoid.cartesianToCartographic(earthPosition);
                        var lat = Cesium.Math.toDegrees(cartographic.latitude);
                        var lng = Cesium.Math.toDegrees(cartographic.longitude);
                        // console.log("lat:" + lat + ",lng:" + lng)

                        that.countForm.tailorCoordinate += lat + " " + lng + " , ";


                        // `earthPosition` will be undefined if our mouse is not over the globe.
                        if (Cesium.defined(earthPosition)) {
                              if (activeShapePoints.length === 0) {
                                    floatingPoint = createPoint(earthPosition);
                                    activeShapePoints.push(earthPosition);
                                    var dynamicPositions = new Cesium.CallbackProperty(function () {
                                          if (drawingMode === 'polygon') {
                                                return new Cesium.PolygonHierarchy(activeShapePoints);
                                          }
                                          return activeShapePoints;
                                    }, false);
                                    activeShape = drawShape(dynamicPositions); //绘制动态图
                              }
                              activeShapePoints.push(earthPosition);
                              showPointArr.push(createPoint(earthPosition));
                              console.log('LEFT_CLICK' + activeShapePoints.length);
                              if (drawingMode == 'rectangle' && activeShapePoints.length > 2) {
                                    terminateShape();
                              }

                        }
                  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
                  //鼠标移动
                  handler.setInputAction(function (event) {
                        if (Cesium.defined(floatingPoint)) {
                              //var newPosition = viewer.scene.pickPosition(event.endPosition);
                              var newPosition = getCatesian3FromPX(event.endPosition);
                              if (Cesium.defined(newPosition)) {
                                    floatingPoint.position.setValue(newPosition);
                                    activeShapePoints.pop();
                                    activeShapePoints.push(newPosition);
                              }
                        }
                  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

                  // Redraw the shape so it's not dynamic and remove the dynamic shape.
                  function terminateShape() {
                        activeShapePoints.pop(); //去除最后一个动态点
                        that.countForm.tailorCoordinate ?
                              that.countForm.tailorCoordinate = "(" + that.countForm.tailorCoordinate.substring(0, that.countForm.tailorCoordinate.length - 2) + ")" : false;

                        if (activeShapePoints.length) {
                              drawShape(activeShapePoints); //绘制最终图
                        }
                        that.mapData.viewer.entities.remove(floatingPoint); //去除动态点图形（当前鼠标点）
                        that.mapData.viewer.entities.remove(activeShape); //去除动态图形
                        floatingPoint = undefined;
                        activeShape = undefined;
                        activeShapePoints = [];
                  }

                  handler.setInputAction(function (event) {
                        //terminateShape();
                        var pick = that.mapData.viewer.scene.pick(event.position);
                        if (Cesium.defined(pick) && pick.id) {
                              that.mapData.viewer.entities.remove(pick.id);
                              /*this.handler.destroy();
                              this.handler = null;*/
                        }
                        showPointArr.forEach(function (item, index) {
                              that.mapData.viewer.entities.remove(item);
                        })
                        showPointArr = [];
                        that.countForm.tailorCoordinate = '';
                        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)//移除事件
                  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

                  // var options = [{
                  //       text: 'Draw Lines',
                  //       onselect: function () {
                  //             terminateShape();
                  //             drawingMode = 'line';
                  //       }
                  // }, {
                  //       text: 'Draw Polygons',
                  //       onselect: function () {
                  //             terminateShape();
                  //             drawingMode = 'polygon';
                  //       }
                  // }, {
                  //       text: 'Draw Circle',
                  //       onselect: function () {
                  //             terminateShape();
                  //             drawingMode = 'circle';
                  //       }
                  // }, {
                  //       text: 'Draw Rectangle',
                  //       onselect: function () {
                  //             terminateShape();
                  //             drawingMode = 'rectangle';
                  //       }
                  // }];
                  terminateShape();
                  drawingMode = 'rectangle';//矩形
                  // Sandcastle.addToolbarMenu(options);
                  // Zoom in to an area with mountains
                  // that.mapData.viewer.camera.lookAt(Cesium.Cartesian3.fromDegrees(-122.2058, 46.1955, 1000.0), new Cesium.Cartesian3(5000.0,
                  //       5000.0, 5000.0));
                  // that.mapData.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
                  that.mapData.viewer.scene.globe.depthTestAgainstTerrain = true;//开启地形深度检测，如果鼠标指针和点不重合，这个选项设置为true试试。
            },
            //绘制多边形
            drawPolygon() {
                  let that = this;
                  if (that.patternState) {
                        that.jx();
                  }
                  else {
                        that.mapData.map.pm.setPathOptions({
                              color: 'orange',
                              opacity: 0.2
                              // fill: false,
                        });
                        that.mapData.map.pm.enableDraw("Polygon", {
                              snappable: false,
                        });
                        that.mapData.map.pm.setLang('zh');
                  }
            },
            //空间定位
            loccatClick() {
                  let that = this;

                  let data = [
                        [Number(that.countForm.minLatitude), Number(that.countForm.minLongitude)],//1
                        [Number(that.countForm.maxLatitude), Number(that.countForm.minLongitude)],//2
                        [Number(that.countForm.maxLatitude), Number(that.countForm.maxLongitude)],//3
                        [Number(that.countForm.minLatitude), Number(that.countForm.maxLongitude)],//4
                        [Number(that.countForm.minLatitude), Number(that.countForm.minLongitude)],//5
                  ]

                  let coordinate = '';
                  data.forEach(element => {
                        coordinate += element[1] + " " + element[0] + ",";
                  });
                  coordinate = coordinate.substring(0, coordinate.length - 1);

                  that.countForm.jointLongit = '(' + coordinate + ')';

                  let averageLong = (Number(that.countForm.minLongitude) + Number(that.countForm.maxLongitude)) / 2;//平均经度
                  let averageLat = (Number(that.countForm.minLatitude) + Number(that.countForm.maxLatitude)) / 2;//平均纬度
                  let centerArr = [averageLong, averageLat];

                  if (that.patternState) {
                        var redPlane = that.mapData.viewer.entities.add({
                              // name: "Red plane with black outline",
                              // position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
                              // plane: {
                              //       plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 0.0),
                              //       dimensions: new Cesium.Cartesian2(400000.0, 300000.0),
                              //       material: Cesium.Color.BLUE.withAlpha(0.5),
                              //       fill: true,
                              //       outline: true,
                              //       outlineColor: Cesium.Color.BLUE,

                              // },
                              name: "Purple polygon using rhumb lines with outline",
                              polygon: {
                                    hierarchy: Cesium.Cartesian3.fromDegreesArray([
                                          data[0][1],
                                          data[0][0],
                                          data[3][1],
                                          data[3][0],
                                          data[2][1],
                                          data[2][0],
                                          data[1][1],
                                          data[1][0],
                                    ]),
                                    extrudedHeight: 50000,
                                    material: Cesium.Color.PURPLE,
                                    outline: true,
                                    outlineColor: Cesium.Color.MAGENTA,
                                    arcType: Cesium.ArcType.RHUMB,
                              },
                        });

                        that.mapData.viewer.entities.removeAll();
                  }
                  else {
                        that.interLocat = L.polygon(data, {
                              color: '#000eff', fillColor: '#0000ed',
                              weight: 4
                        })

                        that.mapData.map.addLayer(that.interLocat)
                        // that.mapData.map.setView([averageLong, averageLat], 5);
                  }
            },
            //关闭
            showInfoClose() {
                  let that = this;
                  that.dialogData = {};
                  that.showDataInfoFlag = false;
                  that.$("#showDataMod").fadeOut();
            },
            //查看大图
            showBigImgClick() {
                  let that = this;
                  that.showBigImgFlag = true;
            },
            showBigImgClose() {
                  let that = this;
                  that.showBigImgFlag = false;
            },
            //查询条件汇总
            searchClick() {
                  let that = this;

                  let data = [
                        [Number(that.countForm.minLatitude), Number(that.countForm.minLongitude)],//1
                        [Number(that.countForm.maxLatitude), Number(that.countForm.minLongitude)],//2
                        [Number(that.countForm.maxLatitude), Number(that.countForm.maxLongitude)],//3
                        [Number(that.countForm.minLatitude), Number(that.countForm.maxLongitude)],//4
                        [Number(that.countForm.minLatitude), Number(that.countForm.minLongitude)],//5
                  ]

                  let coordinate = '';
                  data.forEach(element => {
                        coordinate += element[1] + " " + element[0] + ",";
                  });
                  coordinate = coordinate.substring(0, coordinate.length - 1);

                  that.countForm.jointLongit = '(' + coordinate + ')';

                  let group = new L.layerGroup();

                  // L.imageOverlay(url, [[45.7908, -124.369], [43.5431, -121.859]]).addTo(group);//经纬度
                  // group.addTo(that.mapData.map);


                  that.interLocat && that.mapData.map.removeLayer(that.interLocat);
                  //地图绘制
                  if (that.activeName == "second") {
                        if (that.countForm.tailorCoordinate) {
                              that.queryForm.longitude = that.countForm.tailorCoordinate;
                        } else {
                              that.queryForm.longitude = "";
                        }
                  } else {
                        that.queryForm.longitude = that.countForm.jointLongit;
                  }

                  let firstGrade = '';
                  that.queryForm.satellite.forEach(e => {
                        firstGrade += e + ',';
                  });
                  firstGrade = firstGrade.substring(0, firstGrade.length - 1);

                  //保存上一页下一页查询条件
                  that.queryTemporaryForm = {
                        spatialRange: that.queryForm.longitude,
                        beginTime: that.queryForm.time[0],
                        endTime: that.queryForm.time[1],
                        firstGrade: firstGrade
                  }

                  // 查询
                  that.queryFun(1, that.pagTotal, that.queryForm.longitude, that.queryForm.time[0], that.queryForm.time[1], firstGrade);

                  //跳转到查询结果页
                  that.topActiveName = 'result1'

                  //清除绘制图层
                  this.$store.dispatch('draw/updatedClearDraw', true)
            },
            //跳转查询
            currentClick(num) {
                  let that = this;
                  // 查询
                  that.queryFun(num, that.pagTotal, that.queryTemporaryForm.spatialRange, that.queryTemporaryForm.beginTime, that.queryTemporaryForm.endTime, that.queryTemporaryForm.firstGrade);
            },
            // 上一页
            prevClick(prevNum) {
                  let that = this;
                  // 查询
                  that.queryFun(prevNum, that.pagTotal, that.queryTemporaryForm.spatialRange, that.queryTemporaryForm.beginTime, that.queryTemporaryForm.endTime, that.queryTemporaryForm.firstGrade);
            },
            //下一页
            nextClick(nextNum) {
                  let that = this;
                  // 查询
                  that.queryFun(nextNum, that.pagTotal, that.queryTemporaryForm.spatialRange, that.queryTemporaryForm.beginTime, that.queryTemporaryForm.endTime, that.queryTemporaryForm.firstGrade);
            },
            //表单重置
            testClick() {
                  let that = this;
                  that.countForm = { //国家城市表单数据
                        tailorCoordinate: "",//地图绘制
                        minLongitude: "-180",
                        maxLongitude: "180",
                        minLatitude: "-90",
                        maxLatitude: "90",
                  };
                  that.queryForm = { //查询条件表单
                        satellite: [],
                        cloudage: [0, 40],
                        time: "",
                        longitude: ''
                  };
                  that.checkAllSate = false;
                  clearViewer(that);
            },
            //打开关闭页面
            showPage() {
                  let that = this;
                  that.showDiolag = true;
                  that.$(".showIcon").addClass("showIconMargin")
            },
            closePage() {
                  let that = this;
                  that.showDiolag = false;
                  that.$(".showIcon").removeClass("showIconMargin")
            },
      },
      watch: {
            drawCoordinate(newVal) {
                  let that = this, coordinate = "";
                  newVal && newVal.forEach(element => {
                        coordinate += element.lng + " " + element.lat + ",";
                  });
                  that.countForm.tailorCoordinate = '(' + coordinate + newVal[0].lng + " " + newVal[0].lat + ')';
            }
      }
};
</script>
<style scoped lang="less">
@import "../../assets/css/queryDiolag.less";
</style>
