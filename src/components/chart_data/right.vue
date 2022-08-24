
<template>
      <div class="right">
            <div class="right_top rightItem" id="right_top"> </div>
            <div class="right_center rightItem" id="right_center"> </div>
            <div class="right_bottom rightItem" id="right_bottom"> </div>
      </div>
</template>
<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
      name: "right",
      components: {
      },
      data() {
            return {
            };
      },
      created() { },
      mounted() { },
      methods: {
            init() {
                  let that = this;
                  let topChart = echarts.init(document.getElementById('right_top'), 'macarons')

                  topChart.setOption({
                        tooltip: {
                              trigger: 'axis',
                              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                              }
                        },
                        // legend: {
                        //       data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
                        // },
                        grid: {
                              left: '3%',
                              right: '4%',
                              bottom: '3%',
                              containLabel: true
                        },
                        xAxis: [
                              {
                                    type: 'category',
                                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                              }
                        ],
                        yAxis: [
                              {
                                    type: 'value'
                              }
                        ],
                        series: [
                              {
                                    name: '直接访问',
                                    type: 'bar',
                                    emphasis: {
                                          focus: 'series'
                                    },
                                    data: [320, 332, 301, 334, 390, 330, 320]
                              },
                              {
                                    name: '邮件营销',
                                    type: 'bar',
                                    stack: '广告',
                                    emphasis: {
                                          focus: 'series'
                                    },
                                    data: [120, 132, 101, 134, 90, 230, 210]
                              },
                              {
                                    name: '联盟广告',
                                    type: 'bar',
                                    stack: '广告',
                                    emphasis: {
                                          focus: 'series'
                                    },
                                    data: [220, 182, 191, 234, 290, 330, 310]
                              },
                              {
                                    name: '视频广告',
                                    type: 'bar',
                                    stack: '广告',
                                    emphasis: {
                                          focus: 'series'
                                    },
                                    data: [150, 232, 201, 154, 190, 330, 410]
                              },
                              {
                                    name: '搜索引擎',
                                    type: 'bar',
                                    data: [862, 1018, 964, 1026, 1679, 1600, 1570],
                                    emphasis: {
                                          focus: 'series'
                                    },
                                    markLine: {
                                          lineStyle: {
                                                type: 'dashed'
                                          },
                                          data: [
                                                [{ type: 'min' }, { type: 'max' }]
                                          ]
                                    }
                              },
                              {
                                    name: '百度',
                                    type: 'bar',
                                    barWidth: 5,
                                    stack: '搜索引擎',
                                    emphasis: {
                                          focus: 'series'
                                    },
                                    data: [620, 732, 701, 734, 1090, 1130, 1120]
                              },
                              {
                                    name: '谷歌',
                                    type: 'bar',
                                    stack: '搜索引擎',
                                    emphasis: {
                                          focus: 'series'
                                    },
                                    data: [120, 132, 101, 134, 290, 230, 220]
                              },
                              {
                                    name: '必应',
                                    type: 'bar',
                                    stack: '搜索引擎',
                                    emphasis: {
                                          focus: 'series'
                                    },
                                    data: [60, 72, 71, 74, 190, 130, 110]
                              },
                              {
                                    name: '其他',
                                    type: 'bar',
                                    stack: '搜索引擎',
                                    emphasis: {
                                          focus: 'series'
                                    },
                                    data: [62, 82, 91, 84, 109, 110, 120]
                              }
                        ]
                  })

                  let centerChart = echarts.init(document.getElementById('right_center'), 'macarons')

                  centerChart.setOption({
                        angleAxis: {
                        },
                        radiusAxis: {
                              type: 'category',
                              data: ['周一', '周二', '周三', '周四'],
                              z: 10
                        },
                        polar: {
                        },
                        series: [{
                              type: 'bar',
                              data: [1, 2, 3, 4],
                              coordinateSystem: 'polar',
                              name: 'A',
                              stack: 'a',
                              emphasis: {
                                    focus: 'series'
                              }
                        }, {
                              type: 'bar',
                              data: [2, 4, 6, 8],
                              coordinateSystem: 'polar',
                              name: 'B',
                              stack: 'a',
                              emphasis: {
                                    focus: 'series'
                              }
                        }, {
                              type: 'bar',
                              data: [1, 2, 3, 4],
                              coordinateSystem: 'polar',
                              name: 'C',
                              stack: 'a',
                              emphasis: {
                                    focus: 'series'
                              }
                        }],
                        // legend: {
                        //       show: true,
                        //       data: ['A', 'B', 'C']
                        // }
                  })

                  let bottomChart = echarts.init(document.getElementById('right_bottom'), 'macarons')

                  bottomChart.setOption({
                        // legend: {
                        //       top: 'bottom'
                        // },
                        // toolbox: {
                        //       show: true,
                        //       feature: {
                        //             mark: { show: true },
                        //             dataView: { show: true, readOnly: false },
                        //             restore: { show: true },
                        //             saveAsImage: { show: true }
                        //       }
                        // },
                        series: [
                              {
                                    name: '面积模式',
                                    type: 'pie',
                                    radius: [20, 100],
                                    center: ['50%', '50%'],
                                    roseType: 'area',
                                    itemStyle: {
                                          borderRadius: 8
                                    },
                                    data: [
                                          { value: 40, name: 'rose 1' },
                                          { value: 38, name: 'rose 2' },
                                          { value: 32, name: 'rose 3' },
                                          { value: 30, name: 'rose 4' },
                                          { value: 28, name: 'rose 5' },
                                          { value: 26, name: 'rose 6' },
                                          { value: 22, name: 'rose 7' },
                                          { value: 18, name: 'rose 8' }
                                    ]
                              }
                        ]
                  })
            }
      }
};
</script>