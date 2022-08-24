<template>
      <div id="environmentDiolag" class="preventingDiolag">
            <div v-show="showDiolag" class="allDiolag">
                  <el-aside class="diolagContAside" width="86px">
                        <div class="diolagCont">
                              <div class="diolagContItem" v-for="(item,index) in preventing.children" :key="index" @click="toTab(item)">
                                    <img src="../../assets/image/icons/fzjz.png" alt="" v-if="item.id == 's1'">
                                    <img src="../../assets/image/icons/赤潮监测.png" alt="" v-else>
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
      name: "preventingDiolag",//防灾减灾
      components: {
            tabTimeSearch,
            closePage
      },
      data() {
            return {
                  showTabSearch: false,
                  showDiolag: true,
                  preventing: dialogData.preventing,
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
                  clearOthers(that,item);
                  that.oldId = item.id;
            },
      },
};
</script>
<style scoped lang="less">
@import "../../assets/css/environmentDiolag.less";
</style>
