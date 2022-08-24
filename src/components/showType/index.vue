<template>
      <div class="showTypeMod">
            <!-- 方向杆 -->
            <p class="typeItem typeItemChecked" id="showType1">
                  <el-tooltip class="item" effect="dark" content="方向杆" placement="left">
                        <img src="../../assets/image/icons/fxg.png" alt="" class="typeItemFimg ">
                  </el-tooltip>
            </p>
            <!-- 箭头 -->
            <p class="typeItem" id="showType3">
                  <el-tooltip class="item" effect="dark" content="箭头" placement="left">
                        <img src="../../assets/image/icons/jt.png" alt="" class="typeItemJimg">
                  </el-tooltip>
            </p>
            <!-- 流线 -->
            <p class="typeItem" id="showType2">
                  <el-tooltip class="item" effect="dark" content="流线" placement="left">
                        <img src="../../assets/image/icons/lx.png" alt="" class="typeItemLimg">
                  </el-tooltip>
            </p>
      </div>
</template>
<script>
import $ from 'jquery'
export default {
      name: "showType",
      components: {
      },
      data() {
            return {
                  thisType: null,
            };
      },
      mounted() {
            let that = this;
            that.init();
      },
      methods: {
            init() {
                  let that = this;
                  //showType1  方向杆  showType2  流线 showType3  箭头
                  //layerMap  1 底图  2 箭头  3 方向杆  4 风场流线

                  $('.typeItem').click(function (e) {
                        $(this).addClass('typeItemChecked').siblings().removeClass('typeItemChecked');
                        let showType = $(this)[0].id == "showType1" ? 3 : $(this)[0].id == "showType3" ? 2 : $(this)[0].id == "showType2" ? 4 : '';
                        if (that.thisType == showType) {
                              if (that.$parent.showedTypeLayer) {
                                    //再次点击当前选中按钮  关闭图层
                                    that.$parent.showTypeChange(0);
                                    that.thisType = null;
                              } else {
                                    that.clearType();
                              }
                        } else {
                              that.thisType = showType;
                              that.$parent.showTypeChange(showType);
                        }
                  })
            },
            //选中方向杆
            initType(type) {
                  let that = this;
                  // console.log(type);
                  switch (type) {
                        case 4:
                              $('#showType2').addClass('typeItemChecked').siblings().removeClass('typeItemChecked');
                              break;
                        case 3:
                              $('#showType1').addClass('typeItemChecked').siblings().removeClass('typeItemChecked');
                              break;
                        case 2:
                              $('#showType3').addClass('typeItemChecked').siblings().removeClass('typeItemChecked');
                              break;
                  }

            },
            //清除所有选中
            clearType() {
                  let that = this;
                  $('.typeItem').addClass('typeItemChecked').siblings().removeClass('typeItemChecked');
            },
      },
};
</script>
<style scoped lang='less'>
@import "../../assets/css/showType.less";
</style>