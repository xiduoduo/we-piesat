
<template>
      <div id="chartData">
            <p class="chartTitle">{{chartTitle}}</p>
            <!-- 左侧 -->
            <left ref="left"/>
            <!-- 右侧 -->
            <right ref="right"/>
            <!-- 底侧 -->
            <bottom ref="bottom"/>
            <img src="@/assets/image/icon/fullScreen.png" alt="" class="closeChart" @click="closeClick">
      </div>
</template>
<script>
import left from "./left"
import right from "./right"
import bottom from "./bottom"
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default {
      name: "chartData",
      components: {
            left,
            right,
            bottom
      },
      data() {
            return {
            };
      },
       computed: {
            ...mapGetters([
                  'chartTitle',
            ])
      },
      created() { },
      mounted() { },
      methods: {
            closeClick() {
                  let that = this;
                  $("#chartData").fadeOut(800, () => {
                  });
            }
      }
};
</script>
<style lang="less">
@import "../../assets/css/chartData.less";
</style>