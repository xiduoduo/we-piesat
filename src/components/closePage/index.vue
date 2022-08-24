<template>
      <div class="showIcon showIconMargin">
            <img src="@/assets/image/icon/left.png" alt="" @click="closePage" v-if="showDiolag">
            <img src="@/assets/image/icon/right.png" alt="" @click="showPage" v-else>
      </div>
</template>
<script>
import $ from 'jquery'
export default {
      name: "closePage",//隐藏当前页面
      components: {
      },
      data() {
            return {
                  showDiolag: true
            }
      },
      methods: {
            //打开关闭页面
            showPage() {
                  let that = this;
                  that.showDiolag = true;
                  $(".showIcon").addClass("showIconMargin");
                  that.$parent.showDiolag = that.showDiolag;
            },
            closePage() {
                  let that = this;
                  that.showDiolag = false;
                  $(".showIcon").removeClass("showIconMargin");
                  that.$parent.showDiolag = that.showDiolag;
            },
      }
}
</script>
<style scoped lang="less">
.showIconMargin {
      margin-left: -24px;
}

.showIcon {
      float: left;
      height: 24px;

      img {
            width: 24px;
            height: 24px;
      }
}

.showIcon:hover {
      cursor: pointer;
      transform: scale(1.5, 1.5);
}
</style>