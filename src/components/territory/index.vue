<template>
      <div class="territory">
            <div class="titleChange">
                  <el-select v-model="selectValue" placeholder="全球区域" @change="selectChange">
                        <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                  </el-select>
            </div>
      </div>
</template>
<script>
import $ from 'jquery'
import { location } from "@/assets/js/method"
export default {
      name: "territory",  //领域定位
      components: {
      },
      data() {
            return {
                  selectValue: "",
                  selectOptions: [
                        {
                              value: '1',
                              label: '东海海域'
                        },
                        {
                              value: '2',
                              label: '南海海域'
                        },
                        {
                              value: '3',
                              label: '渤海海域'
                        },
                        {
                              value: '4',
                              label: '北印度洋海域'
                        },
                  ],
            };
      },
      mounted() {
            let that = this;
            that.init();
      },
      methods: {
            init() {
                  let that = this;
                  $('.dwSpan').click(function (e) {
                        $(this).addClass('activeSpan').siblings().removeClass('activeSpan').addClass('noActiveSpan');
                  })
            },
            selectChange() {
                  let that = this;
                  that.locationTerritory(that.selectValue);
            },
            locationTerritory(type) {
                  let that = this;
                  if (type == 1) {//东海海域
                        location(that, {
                              coordinates: [29.65, 126.84],
                              magnificationC: '5766140',
                              magnificationL: '6'
                        })
                  }
                  else if (type == 2) {//南海海域
                        location(that, {
                              coordinates: [19.15, 117.84],
                              magnificationC: '4863794',
                              magnificationL: '6'
                        })
                  }
                  else if (type == 3) {//渤海海域
                        location(that, {
                              coordinates: [38.95, 123.84],
                              magnificationC: '3157080',
                              magnificationL: '6'
                        })
                  }
                  else if (type == 4) {//北印度海域
                        location(that, {
                              coordinates: [7.95, 102.84],
                              magnificationC: '7263656',
                              magnificationL: '5'
                        })
                  }
            }
      },
};
</script>
<style scoped lang='less'>
.territory {
      position: fixed;
      bottom: 0;
      right: 365px;
      z-index: 1009;
      overflow: hidden;
      border-radius: 27px;
      .territoryMod {
            text-align: center;
            margin: 0 auto;
            .dwSpan {
                  display: block;
                  width: 92px;
                  height: 36px;
                  line-height: 36px;
                  background: #0b2537;
                  border: 1px solid #459dae;
                  text-align: center;
                  margin: 16px 0;
                  font-size: 12px;
                  font-family: PingFangSC, PingFangSC-Medium;
                  font-weight: 500;
                  color: #ffffff;
                  letter-spacing: 0px;
            }
            span:hover {
                  cursor: pointer;
            }
            .noActiveSpan {
                  background: #0b2537;
            }
            .activeSpan {
                  background: rgba(18, 205, 230, 0.7);
            }
      }
      .titleChange {
            width: 145px;
            height: 30px;
            background: rgba(29, 37, 42, 0.8);
            border-radius: 27px;
            overflow: hidden;
            span {
                  position: absolute;
                  top: 0;
                  left: 0;
                  display: inline-block;
                  width: 40px;
                  height: 20px;
                  margin: 8px 0;
                  font-size: 14px;
                  font-family: PingFangSC, PingFangSC-Medium;
                  font-weight: 500;
                  text-align: right;
                  color: #ffffff;
                  line-height: 20px;
                  letter-spacing: 0px;
                  z-index: 666;

                  img {
                        margin: 12px 10px;
                        position: absolute;
                        top: -8px;
                        left: -5px;
                        width: 14px;
                        height: 15px;
                  }
            }
      }
      .titleChange {
            cursor: pointer;
      }
}
</style>