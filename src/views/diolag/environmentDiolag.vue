<template>
      <div id="environmentDiolag">
            <div v-show="showDiolag" class="allDiolag">
                  <el-aside class="diolagContAside" width="86px">
                        <div class="diolagCont">
                              <div class="diolagContItem" v-for="(item,index) in envirData.children" :key="index" @click="toTab(item)">
                                    <img src="../../assets/image/icons/fc.png" alt="" v-if="item.id ==1">
                                    <img src="../../assets/image/icons/hmwd.png" alt="" v-else-if="item.id ==2">
                                    <img src="../../assets/image/icons/hmfs.png" alt="" v-else-if="item.id ==8">
                                    <img src="../../assets/image/icons/dqshl.png" alt="" v-else-if="item.id ==6">
                                    <img src="../../assets/image/icons/yyshl.png" alt="" v-else-if="item.id ==5">
                                    <img src="../../assets/image/icons/yxbg.png" alt="" v-else>
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
      name: "environmentDiolag",//海洋环境
      components: {
            tabTimeSearch,
            closePage,
      },
      data() {
            return {
                  showTabSearch: false,
                  showDiolag: true,
                  envirData: dialogData.environmentDiolag,
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
@import "../../assets/css/environmentDiolag.less";
</style>
