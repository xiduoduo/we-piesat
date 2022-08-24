
<template>
      <div class="left">
            <div class="left_top leftItem" id="left_top"> </div>
            <div class="left_center leftItem" id="left_center"> </div>
            <div class="left_bottom leftItem" id="left_bottom"> </div>
      </div>
</template>
<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
      name: "left",
      components: {
      },
      data() {
            return {
            };
      },
      created() { },
      mounted() {
      },
      methods: {
            init() {
                  let that = this;
                  let topChart = echarts.init(document.getElementById('left_top'), 'macarons')

                  topChart.setOption({
                        series: [
                              {
                                    name: '访问来源',
                                    type: 'pie',    // 设置图表类型为饼图
                                    radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                                    data: [          // 数据数组，name 为数据项名称，value 为数据项值
                                          { value: 235, name: '视频广告' },
                                          { value: 274, name: '联盟广告' },
                                          { value: 310, name: '邮件营销' },
                                          { value: 335, name: '直接访问' },
                                          { value: 400, name: '搜索引擎' }
                                    ]
                              }
                        ]
                  })

                  let centerChart = echarts.init(document.getElementById('left_center'), 'macarons')

                  centerChart.setOption({
                        title: {
                              text: '浏览器占比变化',
                              // subtext: '纯属虚构',
                              top: 10,
                              left: 10
                        },
                        tooltip: {
                              trigger: 'item'
                        },
                        legend: {
                              type: 'scroll',
                              bottom: 10,
                              data: (function () {
                                    var list = [];
                                    for (var i = 1; i <= 28; i++) {
                                          list.push(i + 2000 + '');
                                    }
                                    return list;
                              })()
                        },
                        visualMap: {
                              top: 'middle',
                              right: 10,
                              color: ['red', 'yellow'],
                              calculable: true
                        },
                        radar: {
                              indicator: [
                                    { text: 'IE8-', max: 400 },
                                    { text: 'IE9+', max: 400 },
                                    { text: 'Safari', max: 400 },
                                    { text: 'Firefox', max: 400 },
                                    { text: 'Chrome', max: 400 }
                              ]
                        },
                        series: (function () {
                              var series = [];
                              for (var i = 1; i <= 28; i++) {
                                    series.push({
                                          name: '浏览器（数据纯属虚构）',
                                          type: 'radar',
                                          symbol: 'none',
                                          lineStyle: {
                                                width: 1
                                          },
                                          emphasis: {
                                                areaStyle: {
                                                      color: 'rgba(0,250,0,0.3)'
                                                }
                                          },
                                          data: [{
                                                value: [
                                                      (40 - i) * 10,
                                                      (38 - i) * 4 + 60,
                                                      i * 5 + 10,
                                                      i * 9,
                                                      i * i / 2
                                                ],
                                                name: i + 2000 + ''
                                          }]
                                    });
                              }
                              return series;
                        })()
                  })

                  let bottomChart = echarts.init(document.getElementById('left_bottom'), 'macarons')

                  bottomChart.setOption({
                        title: {
                              text: '漏斗图',
                              // subtext: '纯属虚构'
                        },
                        tooltip: {
                              trigger: 'item',
                              formatter: "{a} <br/>{b} : {c}%"
                        },
                        // toolbox: {
                        //       feature: {
                        //             dataView: { readOnly: false },
                        //             restore: {},
                        //             saveAsImage: {}
                        //       }
                        // },
                        // legend: {
                        //       data: ['展现', '点击', '访问', '咨询', '订单']
                        // },
                        series: [
                              {
                                    name: '预期',
                                    type: 'funnel',
                                    top: '40%',
                                    left: '10%',
                                    width: '80%',
                                    label: {
                                          formatter: '{b}预期'
                                    },
                                    labelLine: {
                                          show: false
                                    },
                                    itemStyle: {
                                          opacity: 0.7
                                    },
                                    emphasis: {
                                          label: {
                                                position: 'inside',
                                                formatter: '{b}预期: {c}%'
                                          }
                                    },
                                    data: [
                                          { value: 60, name: '访问' },
                                          { value: 40, name: '咨询' },
                                          { value: 20, name: '订单' },
                                          { value: 80, name: '点击' },
                                          { value: 100, name: '展现' }
                                    ]
                              },
                              {
                                    name: '实际',
                                    type: 'funnel',
                                    top: '40%',
                                    left: '10%',
                                    width: '80%',
                                    maxSize: '80%',
                                    label: {
                                          position: 'inside',
                                          formatter: '{c}%',
                                          color: '#fff'
                                    },
                                    itemStyle: {
                                          opacity: 0.5,
                                          borderColor: '#fff',
                                          borderWidth: 2
                                    },
                                    emphasis: {
                                          label: {
                                                position: 'inside',
                                                formatter: '{b}实际: {c}%'
                                          }
                                    },
                                    data: [
                                          { value: 30, name: '访问' },
                                          { value: 10, name: '咨询' },
                                          { value: 5, name: '订单' },
                                          { value: 50, name: '点击' },
                                          { value: 80, name: '展现' }
                                    ],
                                    // Ensure outer shape will not be over inner shape when hover.
                                    z: 100
                              }
                        ]
                  })
            }
      }
};
</script>