<template>
      <div id="applicationDiolag">
            <el-aside class="diolagContAside" width="86px">
                  <div class="diolagCont">
                        <div class="diolagContItem" v-for="(item,index) in applicationData.children" :key="index" @click="toShow(item)">
                              <img src="../../assets/image/icons/hkszjc.png" alt="" v-if="item.id == 'customization1'">
                              <img src="../../assets/image/icons/hsl.png" alt="" v-else-if="item.id == 'customization2'">
                              <img src="../../assets/image/icons/haxbq.png" alt="" v-else-if="item.id == 'customization3'">
                              <img src="../../assets/image/icons/wth.png" alt="" v-else-if="item.id == 'customization4'">
                              <img src="../../assets/image/icons/wzjc.png" alt="" v-else-if="item.id == 'customization5'">
                              <img src="../../assets/image/icons/jhyz.png" alt="" v-else-if="item.id == 'customization6'">
                              <img src="../../assets/image/icons/zqygjc.png" alt="" v-else>
                              <span>{{item.title}}</span>
                        </div>
                  </div>
            </el-aside>
            <imgView ref="imgView" />
      </div>
</template>
<script>
import { clearViewer, dialogInit } from "@/assets/js/method"
import { dialogData } from "@/assets/data/dialogData"
import imgView from "@/components/imgView"
export default {
      name: "applicationDiolag",//可定制服务
      components: {
            imgView
      },
      data() {
            return {
                  showDiolag: true,
                  applicationData: dialogData.applicationDiolag,
            };
      },
      mounted() {
            let that = this;
            dialogInit();
            clearViewer(that);
      },
      methods: {
            toShow(item) {
                  let that = this;
                  that.$refs.imgView.init(item.imgType, item.imgData);
            },
      },
};
</script>
<style scoped lang="less">
@import "../../assets/css/applicationDiolag.less";
</style>
