<template>
      <div id="temperatureDiolag">
            <div v-show="showDiolag" class="allDiolag">
                  <el-aside class="diolagContAside" width="86px">
                        <div class="diolagCont">
                              <div class="diolagContItem" v-for="(item,index) in temperData.children" :key="index" @click="toTab(item)">
                                    <img src="../../assets/image/icons/hdzbbh.png" alt="" v-if="item.id == 's3'">
                                    <img src="../../assets/image/icons/叶绿素浓度.png" alt="" v-else-if="item.id == 'zoology1'">
                                    <img src="../../assets/image/icons/赤潮监测.png" alt="" v-else-if="item.id == 'zoology2'">
                                    <img src="../../assets/image/icons/海水透明度.png" alt="" v-else-if="item.id == 'zoology3'">
                                    <img src="../../assets/image/icons/光漫衰减系数.png" alt="" v-else-if="item.id == 'zoology6'">
                                    <img src="../../assets/image/icons/溢油遥感监测.png" alt="" v-else-if="item.id == 'zoology4'">
                                    <img src="../../assets/image/icons/潮流监测.png" alt="" v-else-if="item.id == 'zoology8'">
                                    <img src="../../assets/image/icons/绿潮监测.png" alt="" v-else-if="item.id == 'zoology7'">
                                    <img src="../../assets/image/icons/潮流监测.png" alt="" v-else-if="item.id == 'htlc'">
                                    <img src="../../assets/image/icons/绿潮监测.png" alt="" v-else-if="item.id == 'htfk'">
                                    <img src="../../assets/image/icons/悬浮物浓度.png" alt="" v-else>
                                    <span>{{item.title}}</span>
                              </div>
                        </div>
                  </el-aside>
                  <tabTimeSearch ref="tabSearchRef" v-show="showTabSearch" />
            </div>
            <closePage ref="closePage" />
      </div>
</template>
<script>
import tabTimeSearch from "@/components/tabTimeSearch"
import { dialogData } from "@/assets/data/dialogData"
import { clearViewer, clearOthers, dialogInit } from "@/assets/js/method"
import closePage from "@/components/closePage"
export default {
      name: "temperatureDiolag",//海洋生态监测
      components: {
            tabTimeSearch,
            closePage
      },
      data() {
            return {
                  temperData: dialogData.temperatureDiolag,
                  showTabSearch: false,
                  showDiolag: true,
                  oldId: ""
            };
      },
      mounted() {
            let that = this;
            dialogInit();
            clearViewer(that);
      },
      methods: {
            toTab(item) {
                  let that = this;
                  that.$refs.tabSearchRef.getData(item);
                  that.oldId == item.id ? that.showTabSearch = !that.showTabSearch : that.showTabSearch = true;
                  clearOthers(that, item);
                  that.oldId = item.id;
            },
      },
};
</script>
<style scoped lang="less">
@import "../../assets/css/temperatureDiolag.less";
</style>
