<template>
      <div id="monitorDiolag">
            <div v-show="showDiolag" class="allDiolag">
                  <el-aside class="diolagContAside" width="86px">
                        <div class="diolagCont">
                              <div class="diolagContItem" v-for="(item,index) in monitorData.children" :key="index" @click="toTab(item)">
                                    <img src="../../assets/image/icons/yzwx.png" alt="" v-if="item.id == 's2'">
                                    <img src="../../assets/image/icons/hdjc.png" alt="" v-else-if="item.id == 's4'">
                                    <img src="../../assets/image/icons/cbwzjc.png" alt="" v-else-if="item.id == 'resource1'">
                                    <img src="../../assets/image/icons/bhsdjc.png" alt="" v-else-if="item.id == 'resource2'">
                                    <img src="../../assets/image/icons/jsyhjc.png" alt="" v-else-if="item.id == 'resource3'">
                                    <img src="../../assets/image/icons/haxbq.png" alt="" v-else-if="item.id == 'axbh'">
                                    <img src="../../assets/image/icons/hdzbbh.png" alt="" v-else-if="item.id == 'hdzy'">
                                    <img src="../../assets/image/icons/bhsdjc.png" alt="" v-else-if="item.id == 'hysy'">

                                    <img src="../../assets/image/icons/hadbhjc.png" alt="" v-else>
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
      name: "monitorDiolag",//海洋资源规划
      components: {
            tabTimeSearch,
            closePage
      },
      data() {
            return {
                  monitorData: dialogData.monitorDiolag,
                  showTabSearch: false,
                  showDiolag: true,
                  oldId: ''
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
@import "../../assets/css/monitorDiolag.less";
</style>
