<template>
      <div v-show="dialogVisible" class="imgView" id="viewDiv">
            <div class="closeBtn" @click="closeImg">
                  <img src="@/assets/image/icon/close2.png" alt="">
            </div>
            <!-- 图片查看 -->
            <div class="showDialog" id="showDialog1" v-show="type== 1">
                  <embed v-if="lbtSrc.indexOf('.pdf') >= 0"  type="application/pdf" :src="lbtSrc" style="width:100%" class="dialogImg">
                  <img v-else :src="lbtSrc" class="dialogImg" />
            </div>
            <div class="showDialog" id="showDialog2" v-show="type== 2">
                  <img :src="lbtSrc" class="dialogImg2" />
            </div>
            <div id="box" v-show="type== 3">
                  <div id="left">
                        <img :src="lbtSrc1" alt="" class="dialogImgs" id="leftImg">
                  </div>
                  <div id="right">
                        <img :src="lbtSrc2" alt="" class="dialogImgs" id="rightImg">
                  </div>
                  <div id="tag"></div>
            </div>
            <div class="elCar" v-show="type== 4">
                  <swiper ref="mySwiper" :options="swiperOptions">
                        <swiper-slide v-for="item,index in imgList" :key="index">
                              <img src="https://img2.baidu.com/it/u=1321474136,1680913473&fm=26&fmt=auto&gp=0.jpg" alt="">
                        </swiper-slide>
                        <!-- //分页器 -->
                        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
                        <!-- //下一项 -->
                        <div class="swiper-button-next"></div>
                        <!-- //上一项 -->
                        <div class="swiper-button-prev"></div>
                  </swiper>
            </div>
      </div>
</template>
<script>
import $ from 'jquery'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import { pullCurtain } from "@/assets/js/pullCurtain";
export default {
      name: "imgView",  //照片查看
      components: {
            swiper,
            swiperSlide,
      },
      data() {
            return {
                  dialogVisible: false,
                  type: null,
                  lbtSrc: '',
                  lbtSrc1: '',
                  lbtSrc2: '',
                  thisRow: null,
                  thisIndex: null,
                  imgList: [],
                  swiperOptions: {
                        slidesPerView: 1,
                        //分页器
                        pagination: {
                              el: '.swiper-pagination',
                              type: "bullets"
                        },
                        // 轮播图的方向，也可以是vertical方向horizontal
                        direction: 'horizontal',
                        // //轮播方式
                        effect: "fade",
                        loop: true,
                        //自动播放
                        autoplay: {
                              delay: 3000,
                              // stopOnLastSlide: false,
                              disableOnInteraction: true,
                        },
                        // 播放的速度
                        speed: 1000,
                  },
            }
      },
      computed: {
            swiper() {
                  return this.$refs.mySwiper.swiper
            }
      },
      mounted() {
            let that = this;
            $('#viewDiv').click((e) => {
                  console.log(3);
                  if ($(e.target).is('#viewDiv') || $(e.target).is('#showDialog1') || $(e.target).is('#showDialog2')) {
                        that.closeImg();
                  } else {
                        return
                  }
            })
      },
      methods: {
            //类型 1 横图  2 竖图  3 对比图
            init(type, src, row, index) {
                  let that = this;
                  that.dialogVisible = true;
                  that.thisRow = row;
                  that.thisIndex = index;
                  that.type = type;
                  if (type == 3) {
                        that.lbtSrc1 = src[1];
                        that.lbtSrc2 = src[2];
                        pullCurtain();
                  } else if (type == 4) {
                        that.imgList = src;
                        that.swiper.slideTo(0, 0, false);
                        that.swiper.autoplay.start();
                  }
                  else {
                        that.lbtSrc = src[1];
                  }
            },
            closeImg() {
                  let that = this;
                  that.dialogVisible = false;
                  that.lbtSrc = '';
                  that.lbtSrc1 = '';
                  that.lbtSrc2 = '';
                  that.$parent && that.$parent.closeParticulars && that.$parent.closeParticulars(that.thisRow, that.thisIndex);
            }
      }
}
</script>
<style lang="less" scoped>
.imgView {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      width: 100%;
      height: 100vh;
      background: rgba(16, 26, 41, 0.6);
      user-select: none;
      overflow: hidden;
      .showDialog {
            width: 70%;
            height: 90vh;
            margin: 5vh 15%;
            overflow: hidden;
            position: relative;
            .dialogImg {
                  display: block;
                  margin: 0 auto;
                  width: auto;
                  height: calc(100vh - 150px);
            }

            .dialogImg2 {
                  display: block;
                  margin: 0 auto;
                  width: 90%;
                  height: auto;
                  position: relative;
                  top: 50%;
                  /*偏移*/
                  transform: translateY(-50%);
            }

            // div {
            //       float: left;
            //       width: 50%;
            //       height: calc(100vh - 150px);

            //
            // }
      }
      #box {
            width: 70%;
            height: 90vh;
            margin: 5vh 15%;
            overflow: hidden;
            position: relative;
            #left {
                  width: 100%;
                  height: 100%;
                  overflow: hidden;
                  position: absolute;
                  top: 0;
                  left: 0;
                  z-index: 88;
            }

            #right {
                  width: 100%;
                  height: 100%;
                  overflow: hidden;
                  position: absolute;
                  top: 0;
                  left: 0;
            }

            .dialogImgs {
                  display: block;
                  margin: 0 auto;
                  width: 70vw;
                  height: auto;
            }

            #tag {
                  width: 30px;
                  height: 30px;
                  background-color: rgb(58, 245, 104);
                  border-radius: 50%;
                  position: absolute;
                  top: 45%;
                  left: calc(50% - 15px);
                  z-index: 99;
                  background-image: url("../../assets/image/icon/左右.png");
                  background-repeat: no-repeat;
                  background-size: 100% 100%;
            }

            #tag:hover {
                  cursor: pointer;
            }
      }
      .closeBtn {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
            background: rgb(52, 233, 67);
            border-radius: 50%;
            overflow: hidden;
            z-index: 999;
            img {
                  width: 50%;
                  height: 50%;
                  margin: 25%;
            }
      }
      .closeBtn:hover {
            cursor: pointer;
      }
      .elCar {
            width: 100%;
            height: 100vh;
            .swiper-container {
                  width: 100%;
                  height: 100%;
                  .swiper-slide {
                        img {
                              display: block;
                              margin: 0 auto;
                              position: relative;
                              top: 50%;
                              transform: translateY(-50%);
                        }
                  }
            }
      }
}
</style>
