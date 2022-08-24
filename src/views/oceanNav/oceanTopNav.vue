
<template>
      <div id="oceanTopNav">
            <div class="topNavImg" @click="toIndex">
                  <img :src="sysImage" class="navTitleImg">
            </div>
            <div class="topNavItemBar">
                  <div class="itemTab" v-for="item,index in menuArr" :key="index">
                        <router-link :to="item.path" class="topNavItem">
                              <img src="../../assets/image/icons/hynbf.png" class="topNavItemIcon2" v-show="item.meta.icon == 'hynbf'">
                              <img src="../../assets/image/icons/hyms.png" class="topNavItemIcon2" v-show="item.meta.icon == 'hyms'">
                              <img src="../../assets/image/icons/hygc.png" class="topNavItemIcon2" v-show="item.meta.icon == 'hygc'">
                              <img src="../../assets/image/icons/fzjztb.png" class="topNavItemIcon2" v-show="item.meta.icon == 'fzjztb'">
                              <img src="../../assets/image/icons/dz.png" class="topNavItemIcon2" v-show="item.meta.icon == 'dz'">
                              <img src="../../assets/image/icons/cp.png" class="topNavItemIcon2" v-show="item.meta.icon == 'cp'">
                              <span class="topNavItemTitle">{{item.meta.title}}</span>
                        </router-link>
                  </div>
            </div>

            <!-- <el-dropdown class="switchPlatform">
                  <el-button type="primary">
                        <img src="../../assets/image/icons/dl.png" class="switchPlatformImg">
                        <span class="switchPlatformTag">登录</span>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人信息</el-dropdown-item>
                        <el-dropdown-item>后台管理</el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
            </el-dropdown> -->

            <router-view />
      </div>
</template>
<script>
import { clearViewer } from "../../assets/js/method"
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default {
      name: "oceanTopNav",
      components: {
      },
      data() {
            return {
                  menuArr: []
            };
      },
      computed: {
            ...mapGetters([
                  'patternState',
                  'systematicName',
                  'sysImage'
            ])
      },
      created() {
            let that = this;
            that.menuArr = that.$router.options.routes[0].children;
      },
      mounted() { },
      methods: {
            toIndex() {
                  this.$router.push("/");
                  clearViewer(this);
            },
            chartToShow() {
                  let that = this;
                  $("#chartData").fadeIn(800, () => {
                        this.$store.dispatch('chart/setChartTitle', '图表展示')
                        that.$parent.$refs.chartData.$refs.left.init();
                        that.$parent.$refs.chartData.$refs.right.init();
                        that.$parent.$refs.chartData.$refs.bottom.init();
                  });
            },
      }
};
</script>
<style lang="less" scoped>
/* css样式 scoped ：只对当前页面生效*/
@import "../../assets/css/oceanTopNav.less";
</style>