<template>
  <div>
    <el-row
      :gutter="10"
      style="margin-bottom: 5px">
      <el-col :span="12">
        <div class="c_table-title">在线评价总分趋势</div>
        <div
          class="layout-search"
          style="padding: 10px 0">
          <el-row>
            <el-col :span="18">
              <el-form
                ref="ruleForml"
                :model="searchInfo"
                class="search-info"
                label-width="90px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="开始时间"
                      prop="dbegin">
                      <el-date-picker
                        v-model="searchInfo.dbegin"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="开始时间"/>
                    </el-form-item>
                    <el-form-item
                      label="产线"
                      prop="production_line_id">
                      <el-select
                        v-model="searchInfo.production_line_id"
                        placeholder="请选择">
                        <el-option
                          v-for="item in option"
                          :key="item.key"
                          :label="item.value"
                          :value="item.key"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="结束时间"
                      prop="dend">
                      <el-date-picker
                        v-model="searchInfo.dend"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="结束时间"/>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
            <el-col
              :span="6">
              <div class="btn">
                <el-button
                  type="primary"
                  size="mini"
                  @click="findAll_1()">查询</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="resetForm('ruleForml')">重置</el-button>
              </div>
            </el-col>
          </el-row>
          <div
            id="app"
            class="Echar-bg"/>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="c_table-title">在线评价指标趋势</div>
        <div
          class="layout-search"
          style="padding: 10px 0">
          <el-row>
            <el-col :span="18">
              <el-form
                ref="ruleFormr"
                :model="searchInfo1"
                class="search-info"
                label-width="90px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="机架"
                      prop="frame_no">
                      <el-select
                        v-model="searchInfo1.frame_no"
                        placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.key"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label="产线"
                      prop="production_line_id">
                      <el-select
                        v-model="searchInfo1.production_line_id"
                        placeholder="请选择">
                        <el-option
                          v-for="item in option"
                          :key="item.key"
                          :label="item.value"
                          :value="item.key"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="开始时间"
                      prop="dbegin">
                      <el-date-picker
                        v-model="searchInfo1.dbegin"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="开始时间"/>
                    </el-form-item>
                    <el-form-item
                      label="结束时间"
                      prop="dend">
                      <el-date-picker
                        v-model="searchInfo1.dend"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="结束时间"/>
                    </el-form-item>
                  </el-col>

                </el-row>
              </el-form>
            </el-col>
            <el-col
              :span="6">
              <div class="btn">
                <el-button
                  type="primary"
                  size="mini"
                  @click="findAll_2()">查询</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="resetForm('ruleFormr')">重置</el-button>
              </div>
            </el-col>
          </el-row>
          <div
            id="app1"
            class="Echar-bg"/>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <div class="c_table-title">在线评价各子项评分趋势</div>
        <div
          class="layout-search"
          style="padding: 10px 0">
          <el-row>
            <el-col :span="18">
              <el-form
                ref="ruleFormBL"
                :model="searchInfo2"
                class="search-info"
                label-width="90px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="机架"
                      prop="frame_no">
                      <el-select
                        v-model="searchInfo2.frame_no"
                        placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.key"
                          :label="item.value"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label="产线"
                      prop="production_line_id">
                      <el-select
                        v-model="searchInfo2.production_line_id"
                        placeholder="请选择">
                        <el-option
                          v-for="item in option"
                          :key="item.key"
                          :label="item.value"
                          :value="item.key"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="开始时间"
                      prop="dbegin">
                      <el-date-picker
                        v-model="searchInfo2.dbegin"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="开始时间"/>
                    </el-form-item>
                    <el-form-item
                      label="结束时间"
                      prop="dend">
                      <el-date-picker
                        v-model="searchInfo2.dend"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="结束时间"/>
                    </el-form-item>
                  </el-col>

                </el-row>
              </el-form>
            </el-col>
            <el-col
              :span="6">
              <div class="btn">
                <el-button
                  type="primary"
                  size="mini"
                  @click="findAll_3()">查询</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="resetForm('ruleFormBL')">重置</el-button>
              </div>
            </el-col>
          </el-row>
          <div
            id="app2"
            style="height: 330px;width: 100%;float: left;background: #1a367a"/>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="c_table-title">在线评价各子项影响评分占比</div>
        <div
          id="main"
          style="height: 416px;width: 100%;float: left;background: #1a367a"/>
        <div style="color: #eae8c5;position: absolute;left: 880px;top: 400px;float: left">
          最小为：{{ we_xs2 }}
          值为：{{ we_xs1 }}<br>
          第二小为：{{ we_xs4 }}
          值为：{{ we_xs3 }}
        </div>

      </el-col>

    </el-row>

  </div>
</template>

<script>
import { get, post, ReRDate } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
import Echarts from 'echarts'
import moment from 'moment'
export default {
  components: { TableEasy },
  data() {
    return {
      tt: 0,
      pageIndex: 1,
      pageSize: 10,
      searchInfo: {
        dbegin: '',
        dend: '',
        production_line_id: '2250'
      },
      searchInfo1: {
        dbegin: '',
        dend: '',
        frame_no: 'F1',
        production_line_id: '2250'
      },
      searchInfo2: {
        dbegin: '',
        dend: '',
        frame_no: 'F1',
        production_line_id: '2250'
      },
      tableData: [],
      total: 0,
      options: [],
      option_chan: [
        {
          value: '1',
          label: '2250'
        },
        {
          value: '2',
          label: '1580'
        }
      ],
      option: [],
      we_xs1: '',
      we_xs2: '',
      we_xs3: '',
      we_xs4: ''
    }
  },
  mounted() {
    this.searchInfo.dbegin = moment()
      .subtract(7, 'days')
      .format('YYYY-MM-DD HH:mm:ss')
    this.searchInfo.dend = moment().format('YYYY-MM-DD HH:mm:ss')
    this.searchInfo1.dbegin = moment()
      .subtract(7, 'days')
      .format('YYYY-MM-DD HH:mm:ss')
    this.searchInfo1.dend = moment().format('YYYY-MM-DD HH:mm:ss')
    this.searchInfo2.dbegin = moment()
      .subtract(7, 'days')
      .format('YYYY-MM-DD HH:mm:ss')
    this.searchInfo2.dend = moment().format('YYYY-MM-DD HH:mm:ss')
    this.findAll_1()
    this.findAll_2()
    this.findAll_3()
    post('/dictionary/findMapV1', { dicno: 'frameteam' }).then(res => {
      this.options = res.data
    })
    post('/dictionary/findMapV1', { dicno: 'proline' }).then(res => {
      this.option = res.data
    })
    console.log('事件', [
      moment()
        .subtract(29, 'days')
        .format('YYYY-MM-DD'),
      moment().format('YYYY-MM-DD')
    ])
    // this.echart_go()
  },
  methods: {
    //分页之对应页
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    },
    //分页之一页多少条
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    },
    findAll_1() {
      //左边表
      if (this.searchInfo.production_line_id == '2250') {
        this.searchInfo.production_line_id = '1'
      }
      post('/rollStiffness/findEchartsA', {
        condition: this.searchInfo
      }).then(res => {
        //console.log('查询全部', res)
        let data2 = res
        this.echart_go_1(res.data)
      })
    },
    findAll_2() {
      //you边表
      if (this.searchInfo1.production_line_id == '2250') {
        this.searchInfo1.production_line_id = '1'
      }
      post('/rollStiffnessMath/findEchartsC', {
        condition: this.searchInfo1
      }).then(res => {
        // console.log('nihao', res)
        let data1 = res
        this.echart_go_2(res.data)
      })
    },
    findAll_3() {
      //左边表
      if (this.searchInfo2.production_line_id == '2250') {
        this.searchInfo2.production_line_id = '1'
      }
      console.log(this.searchInfo.dbegin)
      post('/rollStiffness/findEchartsA', {
        condition: this.searchInfo2
      }).then(res => {
        //console.log('查询全部', res)
        let data2 = res
        this.echart_go_3(res.data)
      })
    },
    echart_go_1(datas) {
      var myChart = Echarts.init(document.getElementById('app'), 'light') //将配置注入到html中定义的容器
      myChart.clear()
      var legend_data1 = []
      var series = []
      var xstArray = []
      let selects = {}
      var option = {}
      for (var i = 0; datas.series.length > i; i++) {
        legend_data1.push(datas.series[i].name)
        if (i > 0) {
          selects[datas.series[i].name] = false
        }
        var data_1 = []
        var data_2 = []
        var name = datas.series[i].name
        for (var m = 0; datas.series[i].yst.length > m; m++) {
          data_1.push([datas.series[i].xst[m], datas.series[i].yst[m]])
        }
        // console.log('0000', datas.series[i].name)
        //  console.log('111111111111', data_1)
        data_2 = ReRDate(data_1)
        //console.log('22222222222222', data_2)
        series.push({
          //xAxisIndex: 0,
          //smooth: true,
          name: name,
          data: data_2,
          symbol: 'circle', //折点设定为实心点
          symbolSize: 5, //设定实心点的大小
          itemStyle: {
            normal: {
              // color: 'yellow',
              lineStyle: {
                //  color: '#1A367A'
              }
            }
          },
          type: 'line'
        })
      }

      option = {
        textStyle: {
          color: '#eae8c5' //字体颜色
        },
        // tooltip: { show: false },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            console.log(params)
            let times = '<br/>' + params[0].value[0]
            let str = ''
            params.forEach((item, idx) => {
              str += `${item.marker}${item.seriesName}: ${item.data[1]} `
              str += idx === params.length - 1 ? '' : '<br/>'
            })
            return [str, times]
          }
          /* formatter: function(aa) {
            console.log(aa)
            for (var i = 0; aa.length > i; i++) {
              return [aa[i].data[0], aa[i].data[1]]
            }
          }*/
        },
        /*  dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0]
          },
          {
            type: 'inside',
            yAxisIndex: [0]
          }
        ],*/
        // title: {
        //   textStyle: {
        //     color: '#eae8c5' //字体颜色
        //   },
        //   text: '在线评价总分趋势',
        //   top: '10',
        //   x: '36%'
        // },
        legend: {
          selected: selects,
          textStyle: {
            color: '#eae8c5' //字体颜色
          },
          data: legend_data1, // ['R1', 'R2', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7']
          type: 'scroll'
          // orient: 'vertical'
          // right: 10,
          // top: 20,
          // bottom: 20
        },
        xAxis: [
          {
            axisLabel: {
              rotate: 20,
              interval: 0, //横轴信息全部显示,
              formatter: function(value) {
                var t_date = new Date(value)
                return (
                  [
                    t_date.getFullYear(),
                    t_date.getMonth() + 1,
                    t_date.getDate()
                  ].join('-') +
                  ' ' +
                  [t_date.getHours(), t_date.getMinutes()].join(':')
                )
              }
            },
            //设置网格线颜色
            splitLine: {
              show: true,
              lineStyle: {
                color: '#6b6464',
                width: 1,
                type: 'solid'
              }
            },

            axisLine: {
              lineStyle: {
                color: '#eae8c5' //坐标线颜色
              }
            },
            type: 'time', //category  time  value
            name: '时间'
            //  min: datas.catalog[0],
            // max: datas.catalog[1]
            // data: ['时间1', '时间2', '时间3', '时间4', '时间5']
          }
        ],
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#eae8c5' //坐标线颜色
            }
          },
          //设置网格线颜色
          splitLine: {
            show: true,
            lineStyle: {
              color: '#6b6464',
              width: 1,
              type: 'solid'
            }
          },
          type: 'value',
          name: '分数'
        },
        grid: {
          right: '50px'
        },
        series: series
      }
      myChart.setOption(option)
      window.onresize = function() {
        myChart.resize()
      }
    },
    echart_go_2(datas) {
      var Map1 = []
      var Map2 = []
      var Map3 = []
      var Map4 = []
      var Mxx1 = []
      var Mxx2 = []
      var Mxx3 = []
      var Mxx4 = []
      for (var i = 0; datas.series.length > i; i++) {
        if (datas.series[i].name == '刚度保持率(%)') {
          Map1 = datas.series[i].yst
          Mxx1 = datas.series[i].xst
        }
        if (datas.series[i].name == 'OS侧刚度') {
          Map2 = datas.series[i].yst
          Mxx2 = datas.series[i].xst
        }
        if (datas.series[i].name == 'DS侧刚度') {
          Map3 = datas.series[i].yst
          Mxx3 = datas.series[i].xst
        }
        if (datas.series[i].name == '两侧刚度偏差(KN/mm)') {
          Map4 = datas.series[i].yst
          Mxx4 = datas.series[i].xst
        }
      }
      var our_data1 = []
      var our_data2 = []
      var our_data3 = []
      var our_data4 = []
      for (var i = 0; Map1.length > i; i++) {
        our_data1.push([Mxx1[i], Map1[i]]) //刚度保持率(%)
      }
      for (var i = 0; Map2.length > i; i++) {
        our_data2.push([Mxx2[i], Map2[i]]) //OS侧刚度
      }
      for (var i = 0; Map3.length > i; i++) {
        our_data3.push([Mxx3[i], Map3[i]]) //DS侧刚度
      }
      for (var i = 0; Map4.length > i; i++) {
        our_data4.push([Mxx4[i], Map4[i]]) //两侧刚度偏差(KN/mm)
      }
      function ReverseRankingDate(data) {
        for (var i = 0; i < data.length - 1; i++) {
          for (var j = 0; j < data.length - 1 - i; j++) {
            //  console.log(Date.parse(data[j][0]))
            if (Date.parse(data[j][0]) > Date.parse(data[j + 1][0])) {
              var temp = data[j]
              data[j] = data[j + 1]
              data[j + 1] = temp
            }
          }
        }
        return data
      }
      our_data1 = ReverseRankingDate(our_data1)
      our_data4 = ReverseRankingDate(our_data4)
      our_data2 = ReverseRankingDate(our_data2)
      our_data3 = ReverseRankingDate(our_data3)

      var myChart1 = Echarts.init(document.getElementById('app1'), 'light') //将配置注入到html中定义的容器
      var legend_data11 = [
        '刚度保持率(%)',
        '两侧刚度偏差(KN/mm)',
        'OS侧刚度',
        'DS侧刚度'
      ]
      var option = {
        textStyle: {
          color: '#eae8c5' //字体颜色
        },
        tooltip: {
          trigger: 'axis'
        }, //联动
        // title: {
        //   textStyle: {
        //     color: '#eae8c5' //字体颜色
        //   },
        //   text: '在线评价指标趋势',
        //   x: '35%',
        //   y: '1%'
        // },
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0]
          }
        ],

        legend: {
          textStyle: {
            color: '#eae8c5' //字体颜色
          },
          selected: {
            '两侧刚度偏差(KN/mm)': false,
            OS侧刚度: false,
            DS侧刚度: false
          },
          data: legend_data11,
          type: 'scroll',
          // orient: 'vertical',
          right: 200,
          top: 20,
          bottom: 20
        },
        xAxis: [
          {
            axisLine: {
              lineStyle: {
                color: '#eae8c5' //坐标线颜色
              }
            },
            //设置网格线颜色
            splitLine: {
              show: true,
              lineStyle: {
                color: '#6b6464',
                width: 1,
                type: 'solid'
              }
            },
            type: 'category', //category
            name: '时间'
            // data: ['时间1', '时间2', '时间3', '时间4', '时间5']
          }
        ],
        yAxis: [
          {
            axisLine: {
              lineStyle: {
                color: '#eae8c5' //坐标线颜色
              }
            },
            //设置网格线颜色
            splitLine: {
              show: true,
              lineStyle: {
                color: '#6b6464',
                width: 1,
                type: 'solid'
              }
            },
            type: 'value',
            name: '%'
          },
          {
            axisLine: {
              lineStyle: {
                color: '#eae8c5' //坐标线颜色
              }
            },
            //设置网格线颜色
            splitLine: {
              show: true,
              lineStyle: {
                color: '#6b6464',
                width: 1,
                type: 'solid'
              }
            },
            type: 'value',
            name: 'kN/mm'
          }
        ],
        series: [
          {
            yAxisIndex: 0,
            name: '刚度保持率(%)',
            data: our_data1,
            showSymbol: true,
            symbol: 'circle', //折点设定为实心点
            symbolSize: 5, //设定实心点的大小
            type: 'line'
          },
          {
            yAxisIndex: 1,
            name: '两侧刚度偏差(KN/mm)',
            data: our_data4,
            showSymbol: true,
            symbol: 'circle', //折点设定为实心点
            symbolSize: 5, //设定实心点的大小
            type: 'line'
          },
          {
            yAxisIndex: 1,
            name: 'OS侧刚度',
            data: our_data2,
            showSymbol: true,
            symbol: 'circle', //折点设定为实心点
            symbolSize: 5, //设定实心点的大小
            type: 'line'
          },
          {
            yAxisIndex: 1,
            name: 'DS侧刚度',
            data: our_data3,
            symbol: 'circle', //折点设定为实心点
            symbolSize: 5, //设定实心点的大小
            type: 'line'
          }
        ]
      }
      myChart1.setOption(option)
      window.addEventListener('resize', function() {
        myChart1.resize()
      })
    },
    echart_go_3(datas) {
      //倒数第二个

      var xdaata = []
      var ydata1 = []
      var ydata2 = []
      var ydata3 = []
      var ydata4 = []
      var ydata5 = []
      var ydata6 = []
      var ydata7 = []
      var ydata8 = []
      var ydata9 = []
      // datas.series[0].xst
      for (var i = 0; datas.series.length > i; i++) {
        if (datas.series[i].name == this.searchInfo2.frame_no) {
          xdaata.push(datas.series[i].xst)
          ydata1.push(datas.series[i].yst2) // datas.series[0].yst2
          ydata2.push(datas.series[i].yst3)
          ydata3.push(datas.series[i].yst4)
          ydata4.push(datas.series[i].yst5)
          ydata5.push(datas.series[i].yst6)
          ydata6.push(datas.series[i].yst7)
          ydata7.push(datas.series[i].yst8)
          ydata8.push(datas.series[i].yst9)
          ydata9.push(datas.series[i].yst10)
        }
      }

      var myChart2 = Echarts.init(document.getElementById('app2'), 'default') //将配置注入到html中定义的容器
      var option2 = {
        textStyle: {
          color: '#eae8c5' //字体颜色
        },
        // title: {
        //   textStyle: {
        //     color: '#eae8c5' //字体颜色
        //   },
        //   text: '在线评价各子项评分趋势\n ',
        //   // subtext: '纯属虚构',
        //   left: 'center'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '20px'
        },
        legend: {
          // orient: 'vertical', //注意
          // pagemode: true, //注意,自定义的字段，开启图例分页模式，只有orient: 'vertical'时才有效
          type: 'scroll', //翻页
          pageIconColor: '#208d3a', //翻页下一页的三角按钮颜色
          pageIconInactiveColor: '#8d0912', //翻页（即翻页到头时）
          top: 25,
          bottom: 30,
          textStyle: {
            color: '#eae8c5' //字体颜色
          },
          data: [
            '刚度保持率',
            '调平值',
            '两侧刚度偏差',
            '两侧位置偏差',
            'OS位置偏差',
            'DS位置偏差',
            '轧制力偏差',
            'OS辊缝偏差',
            'DS辊缝偏差'
          ]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#eae8c5' //坐标线颜色
            }
          },
          //设置网格线颜色
          splitLine: {
            show: true,
            lineStyle: {
              color: '#6b6464',
              width: 1,
              type: 'solid'
            }
          },
          type: 'value'
        },
        xAxis: {
          axisLine: {
            lineStyle: {
              color: '#eae8c5' //坐标线颜色
            }
          },
          //设置网格线颜色
          splitLine: {
            show: true,
            lineStyle: {
              color: '#6b6464',
              width: 1,
              type: 'solid'
            }
          },
          type: 'category',
          // data: xdaata
          data: datas.series[0].xst
        },
        series: [
          {
            name: '刚度保持率',
            type: 'bar',
            stack: '总量',
            showBackground: true,
            // barWidth: 60,
            barMaxwidth: 60,
            label: {
              show: true,
              position: 'inside'
            },
            // data: ydata1
            data: datas.series[0].yst2
          },
          {
            name: '调平值',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'inside'
            },
            // data: ydata2
            data: datas.series[0].yst3
          },
          {
            name: '两侧刚度偏差',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'inside'
            },
            // data: ydata3
            data: datas.series[0].yst4
          },
          {
            name: '两侧位置偏差',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'inside'
            },
            // data: ydata4
            data: datas.series[0].yst5
          },
          {
            name: 'OS位置偏差',
            type: 'bar',
            stack: '总量',

            label: {
              show: true,
              position: 'inside'
            },
            // data: ydata5
            data: datas.series[0].yst6
          },
          {
            name: 'DS位置偏差',
            type: 'bar',
            stack: '总量',

            label: {
              show: true,
              position: 'inside'
            },
            // data: ydata6
            data: datas.series[0].yst7
          },
          {
            name: '轧制力偏差',
            type: 'bar',
            stack: '总量',

            label: {
              show: true,
              position: 'inside'
            },
            // data: ydata7
            data: datas.series[0].yst8
          },
          {
            name: 'OS辊缝偏差',
            type: 'bar',
            stack: '总量',

            label: {
              show: true,
              position: 'inside'
            },
            // data: ydata8
            data: datas.series[0].yst9
          },
          {
            name: 'DS辊缝偏差',
            type: 'bar',
            stack: '总量',

            label: {
              show: true,
              position: 'inside'
            },
            // data: ydata9
            data: datas.series[0].yst10
          }
        ]
      }
      myChart2.setOption(option2)

      //初始化最后一个页面------------------------------------------------
      this.tt =
        Number(datas.series[0].yst2[0]) +
        Number(datas.series[0].yst3[0]) +
        Number(datas.series[0].yst4[0]) +
        Number(datas.series[0].yst5[0]) +
        Number(datas.series[0].yst6[0]) +
        Number(datas.series[0].yst7[0]) +
        Number(datas.series[0].yst8[0]) +
        Number(datas.series[0].yst9[0]) +
        Number(datas.series[0].yst10[0])
      //冒泡排序由小到大
      function sort(element) {
        for (var i = 0; i < element.length - 1; i++) {
          // console.log('i=' + element[i])
          for (var j = 0; j < element.length - i - 1; j++) {
            // console.log('j=' + element[j])
            // console.log('j+1=' + element[j + 1])
            if (element[j].value > element[j + 1].value) {
              //把大的数字放到后面
              var swap = element[j]
              element[j] = element[j + 1]
              element[j + 1] = swap
            }
          }
          // console.log(element)
        }
      }
      //var element = [3, 5, 1, 2, 7, 8, 4, 5, 3, 4]
      var data2 = [
        { value: ydata1[0][0], name: '刚度保持率' },
        { value: ydata2[0][0], name: '调平值' },
        { value: ydata3[0][0], name: '两侧刚度偏差' },
        { value: ydata4[0][0], name: '两侧位置偏差' },
        { value: ydata5[0][0], name: 'OS位置偏差' },
        { value: ydata6[0][0], name: 'DS位置偏差' },
        { value: ydata7[0][0], name: '轧制力偏差' },
        { value: ydata8[0][0], name: 'OS辊缝偏差' },
        { value: ydata9[0][0], name: 'DS辊缝偏差' }
      ]
      sort(data2)
      // console.log(data2)
      this.we_xs1 = data2[0].value
      this.we_xs2 = data2[0].name

      this.we_xs3 = data2[1].value
      this.we_xs4 = data2[1].name

      var myChart = Echarts.init(document.getElementById('main'), 'default')
      var option = {
        textStyle: {
          color: '#eae8c5' //字体颜色
        },
        title: {
          textStyle: {
            color: '#eae8c5' //字体颜色
          },
          text: '当前得分：' + this.tt + '分',
          // subtext: '纯属虚构',
          left: 'center',
          top: 20,
          bottom: 20
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          textStyle: {
            color: '#eae8c5' //字体颜色
          },
          orient: 'vertical',
          right: 30,
          top: 5,
          bottom: 20,
          data: [
            '刚度保持率',
            '调平值',
            '两侧刚度偏差',
            '两侧位置偏差',
            'OS位置偏差',
            'DS位置偏差',
            '轧制力偏差',
            'OS辊缝偏差',
            'DS辊缝偏差'
          ]
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: ydata1[0][0], name: '刚度保持率' },
              { value: ydata2[0][0], name: '调平值' },
              { value: ydata3[0][0], name: '两侧刚度偏差' },
              { value: ydata4[0][0], name: '两侧位置偏差' },
              { value: ydata5[0][0], name: 'OS位置偏差' },
              { value: ydata6[0][0], name: 'DS位置偏差' },
              { value: ydata7[0][0], name: '轧制力偏差' },
              { value: ydata8[0][0], name: 'OS辊缝偏差' },
              { value: ydata9[0][0], name: 'DS辊缝偏差' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              normal: {
                show: true,
                formatter: '{b} : {c} ({d}%)' //'{b} : {c} ({d}%)'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '15',
                  fontWeight: 'bold'
                }
              }
            }
          }
        ]
      }
      myChart.setOption(option)
      var self = this
      // 处理点击事件并----------------------------------------------
      myChart2.on('click', function(params) {
        var click_nu = params.dataIndex
        var data1 = [
          '刚度保持率',
          '调平值',
          '两侧刚度偏差',
          '两侧位置偏差',
          'OS位置偏差',
          'DS位置偏差',
          '轧制力偏差',
          'OS辊缝偏差',
          'DS辊缝偏差'
        ]
        var data2 = [
          { value: Number(datas.series[0].yst2[click_nu]), name: '刚度保持率' },
          { value: Number(datas.series[0].yst3[click_nu]), name: '调平值' },
          {
            value: Number(datas.series[0].yst4[click_nu]),
            name: '两侧刚度偏差'
          },
          {
            value: Number(datas.series[0].yst5[click_nu]),
            name: '两侧位置偏差'
          },
          { value: Number(datas.series[0].yst6[click_nu]), name: 'OS位置偏差' },
          { value: Number(datas.series[0].yst7[click_nu]), name: 'DS位置偏差' },
          { value: Number(datas.series[0].yst8[click_nu]), name: '轧制力偏差' },
          { value: Number(datas.series[0].yst9[click_nu]), name: 'OS辊缝偏差' },
          { value: Number(datas.series[0].yst10[click_nu]), name: 'DS辊缝偏差' }
        ]
        sort(data2)
        // console.log(data2)
        self.we_xs1 = data2[0].value
        self.we_xs2 = data2[0].name
        self.we_xs3 = data2[1].value
        self.we_xs4 = data2[1].name

        this.tt =
          Number(datas.series[0].yst2[click_nu]) +
          Number(datas.series[0].yst3[click_nu]) +
          Number(datas.series[0].yst4[click_nu]) +
          Number(datas.series[0].yst5[click_nu]) +
          Number(datas.series[0].yst6[click_nu]) +
          Number(datas.series[0].yst7[click_nu]) +
          Number(datas.series[0].yst8[click_nu]) +
          Number(datas.series[0].yst9[click_nu]) +
          Number(datas.series[0].yst10[click_nu])
        var myChart = Echarts.init(document.getElementById('main'), 'light')
        // 指定图表的配置项和数据
        var option = {
          title: {
            textStyle: {
              color: '#eae8c5' //字体颜色
            },
            text: '当前得分：' + this.tt + '分',
            //subtext: '纯属虚构',
            left: 'center',
            top: 20,
            bottom: 20
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            textStyle: {
              color: '#eae8c5' //字体颜色
            },
            orient: 'vertical',
            right: 30,
            top: 5,
            bottom: 20,
            data: data1
            /* data: ['子项1', '子项2', '子项3', '子项4', '子项5000']*/
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: data2,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              label: {
                normal: {
                  show: true,
                  formatter: '{b} : {c} ({d}%)' //'{b} : {c} ({d}%)'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '15',
                    fontWeight: 'bold'
                  }
                }
              }
            }
          ]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)

        /* window.open(
            'https://www.baidu.com/s?wd=' + encodeURIComponent(params.name)
          )*/
      })

      window.onresize = function() {
        myChart.resize()
        myChart2.resize() //若有多个图表变动，可多写
      }
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields()
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
    }
  }
}
</script>

<style scoped>
</style>
