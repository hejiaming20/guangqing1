<template>
  <div>
    <div class="topHead">
      <p class="topHead-title">生产运行成本一键分析(周报)</p>
      <div 
        class="layout-one-input" 
        style="transform:translateX(10%)">
        <el-date-picker
          v-model="monthTime"
          :clearable="false"
          :default-time="['00:00:00', '23:59:59']"
          class="default-picker-border-color"
          type="daterange"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="handleMonth"/>
      </div>
    </div>
    <div class="month-report">
      <div class="month-echarts">
        <el-row :gutter="5">
          <el-col :span="12">
            <!-- 轧辊综合消耗趋势 -->
            <div class="layout-search layout-default-margin">
              <div class="m-echatrs-title">轧辊综合消耗趋势</div>
              <div>
                <tasily-echarts
                  :grid="rollfenxi.grid"
                  :legend="rollfenxi.legend"
                  :series="rollfenxi.series"
                  :x-axis="rollfenxi.xaxis" 
                  :toolbox="{show:false}" 
                  :y-axis="rollfenxi.yaxis"
                  :tooltip="rollfenxi.tooltip"
                  _height="240px"/>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <!-- 各轧辊类型综合消耗 -->
            <div class="layout-search layout-default-margin">
              <div class="m-echatrs-title">
                <span>各轧辊类型综合消耗</span>
              </div>
              <div>
                <tasily-echarts 
                  :grid="rollXiaohao.grid"
                  :legend="rollXiaohao.legend"
                  :series="rollXiaohao.series"
                  :x-axis="rollXiaohao.xaxis" 
                  :toolbox="{show:false}" 
                  :y-axis="rollXiaohao.yaxis"
                  :tooltip="rollXiaohao.tooltip"
                  _height="240px"/>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <!-- 正常下线精轧工作辊平均磨削量 -->
            <div class="layout-search layout-default-margin">
              <div class="m-echatrs-title">正常下线精轧工作辊平均磨削量</div>
              <div>
                <tasily-echarts 
                  :grid="jingAge.grid"
                  :legend="jingAge.legend"
                  :series="jingAge.series"
                  :x-axis="jingAge.xaxis" 
                  :toolbox="{show:false}" 
                  :y-axis="jingAge.yaxis"
                  :tooltip="jingAge.tooltip"
                  _height="240px"/>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <!-- 各轧辊下线原因综合消耗占比 -->
            <div class="layout-search layout-default-margin">
              <div class="m-echatrs-title">
                <span>各轧辊下线原因综合消耗</span>
              </div>
              <div>
                <tasily-echarts 
                  :grid="rollReasonDown.grid"
                  :legend="rollReasonDown.legend"
                  :series="rollReasonDown.series"
                  :x-axis="rollReasonDown.xaxis" 
                  :toolbox="{show:false}" 
                  :y-axis="rollReasonDown.yaxis"
                  :tooltip="rollReasonDown.tooltip"
                  _height="240px"/>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <!-- 磨床四班精轧工作辊正常下线轧辊平均磨削量 -->
            <div class="layout-search">
              <div class="m-echatrs-title">磨床四班精轧工作辊正常下线轧辊平均磨削量</div>
              <div>
                <tasily-echarts 
                  :grid="gaoRollDown.grid"
                  :legend="gaoRollDown.legend"
                  :series="gaoRollDown.series"
                  :x-axis="gaoRollDown.xaxis" 
                  :toolbox="{show:false}" 
                  :y-axis="gaoRollDown.yaxis"
                  :tooltip="gaoRollDown.tooltip"
                  _height="237px"/>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <!-- 磨床故障停机时间趋势图 -->
            <div class="layout-search">
              <div class="m-echatrs-title">磨床故障停机时间趋势图</div>
              <div>
                <tasily-echarts 
                  :grid="moTime.grid"
                  :legend="moTime.legend"
                  :series="moTime.series"
                  :x-axis="moTime.xaxis" 
                  :toolbox="{show:false}" 
                  :y-axis="moTime.yaxis"
                  :tooltip="moTime.tooltip"
                  _height="237px"/>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="report">
        <div class="layout-small-title report-title bottom-line">分析报告</div>
        <div class="report-main">
          <div class="report-main-info">
            <!-- <span>暂无报告</span> -->
            <iframe 
              src="http://170.0.40.131:8091/reportpdf/磨辊间分析报告.pdf" 
              width="100%"
              height="100%"
              frameborder="0"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Echarts from 'echarts'
import tasilyEcharts from '@/components/TasilyEcharts'
import { get, post, pythonPOST1, getDataConfig } from '@/lib/Util'
import moment from 'moment'
export default {
  name: 'Month',
  components: { tasilyEcharts },
  data() {
    return {
      value: '',
      monthTime: '',
      selectOptions: [
        {
          value: '',
          label: ''
        }
      ],
      rollfenxi: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#eae8c5'
          },
          icon: 'roundRect'
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },
        series: [
          {
            markLine: {
              label: {
                position: 'middle' //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
              },
              data: [
                {
                  yAxis: 0.048,
                  silent: false,
                  name: '目标值',
                  lineStyle: {
                    type: 'dashed',
                    color: '#b17063'
                  }
                }
              ]
            },
            name: '轧辊综合消耗',
            type: 'line',
            symbol: 'none',
            smooth: true,
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ],
        xaxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#CCCCCC'
            }
          },
          boundaryGap: false,
          data: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月'
          ]
        },
        yaxis: [
          {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: '#CCCCCC' // 设置纵轴颜色
              }
            },
            splitLine: { lineStyle: { color: ['#777777'] } },
            max: 0.2,
            splitNumber: 3
          }
        ]
      }, // 轧辊综合消耗趋势
      rollXiaohao: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#eae8c5'
          },
          icon: 'roundRect'
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },
        series: [
          {
            name: '各轧辊类型综合消耗',
            type: 'bar',
            barWidth: 15,
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ],
        xaxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#CCCCCC'
            }
          },
          data: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月'
          ]
        },
        yaxis: [
          {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: '#CCCCCC' // 设置纵轴颜色
              }
            },
            splitLine: { lineStyle: { color: ['#777777'] } },
            min: 0,
            max: 1,
            splitNumber: 5
          }
        ]
      }, // 各轧辊类型综合消耗占比
      jingAge: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#eae8c5'
          },
          icon: 'roundRect'
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },
        series: [
          {
            name: 'F1-F4精轧工作辊',
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: 'F5-F7精轧工作辊',
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ],
        xaxis: {
          type: 'time',
          axisLine: {
            lineStyle: {
              color: '#eae8c5'
            }
          },
          boundaryGap: false,
          data: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月'
          ]
        },
        yaxis: [
          {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: '#eae8c5' // 设置纵轴颜色
              }
            },
            splitLine: { lineStyle: { color: ['#777777'] } },
            splitNumber: 4
          }
        ]
      }, // 正常下线精轧工作辊平均磨削量
      rollReasonDown: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#eae8c5'
          },
          icon: 'roundRect'
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },
        series: [
          {
            name: '各轧辊下线原因综合消耗',
            type: 'bar',
            barWidth: 15,
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ],
        xaxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#CCCCCC' // 设置纵轴颜色
            }
          },
          interval: 0,
          splitLine: { lineStyle: { color: ['#777777'] } },
          splitNumber: 4
        },
        yaxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#CCCCCC'
              }
            },
            interval: 0,
            data: [
              '其他消耗',
              '事故辊磨削消耗',
              '正常下线磨削辊耗',
              '正常下线在线磨损辊耗'
            ].map(function(str) {
              if (str.length > 4) {
                return str.slice(0, 5) + '\n' + str.slice(5)
              } else {
                return str
              }
            })
          }
        ]
      }, // 各轧辊下线原因占比
      gaoRollDown: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#eae8c5'
          },
          icon: 'roundRect'
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },
        series: [
          {
            name: '目标值',
            type: 'line',
            symbol: 'none',
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ],
        xaxis: {
          type: 'time',
          axisLine: {
            show: false,
            lineStyle: {
              color: '#CCCCCC'
            }
          },
          boundaryGap: false,
          data: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月'
          ]
        },
        yaxis: [
          {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: '#CCCCCC' // 设置纵轴颜色
              }
            },
            splitLine: { lineStyle: { color: ['#777777'] } },
            splitNumber: 4
          }
        ]
      }, // 高速钢正常下线毫米轧制量
      moTime: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#eae8c5'
          },
          icon: 'roundRect'
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },
        series: [
          {
            name: '目标值',
            type: 'line',
            symbol: 'none',
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ],
        xaxis: {
          type: 'time',
          axisLine: {
            lineStyle: {
              color: '#CCCCCC'
            }
          },
          boundaryGap: false,
          data: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月'
          ]
        },
        yaxis: [
          {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: '#CCCCCC' // 设置纵轴颜色
              }
            },
            splitNumber: 4,
            splitLine: { lineStyle: { color: ['#777777'] } }
          }
        ]
      } // 磨床故障停机时间趋势图
    }
  },
  mounted() {
    this.monthTime = [
      moment()
        .subtract(7, 'days')
        .format('YYYY-MM-DD HH:mm:ss'),
      moment().format('YYYY-MM-DD HH:mm:ss')
    ]

    this.findmo()
    this.findKGT()
    this.findSeven()
    this.findFW()
    this.findfour()
    this.findHSS()
  },
  methods: {
    handleMonth() {
      this.findmo()
      this.findKGT()
      this.findSeven()
      this.findFW()
      this.findfour()
      this.findHSS()
    },
    // 磨床故障停机时间趋势图
    async findmo() {
      let year = this.monthTime[0].slice(0, 4)
      let res = await pythonPOST1('/python/RollReportWeekmachine/', {
        year
      })
      let info = ['1#磨床', '2#磨床', '3#磨床', '4#磨床', '5#磨床', '6#磨床']
      let arr = []
      if (res.code == 200) {
        let data = [] // 转换json
        for (const item of res.data) {
          data.push(JSON.parse(item))
        }

        for (let i = 0; i < data.length; i++) {
          let seriesData = []
          for (const item of data[i]) {
            seriesData.push([moment(item.name).valueOf(), item.value])
          }
          arr.push({
            name: info[i],
            type: 'line',
            symbol: 'none',
            data: seriesData
          })
        }
        this.moTime.series = arr
      }
    },
    // 轧辊综合消耗
    async findKGT() {
      let year = this.monthTime[0].slice(0, 4)
      let res = await pythonPOST1('/python/RollReportWeekkgT/', {
        year
      })
      if (res.code == 200) {
        // 轧辊综合消耗趋势
        this.rollfenxi.series[0].data = res.data[2]
        this.rollfenxi.xaxis.data = res.data[0].map(item => {
          let arr = item.split('~')
          let a = arr[0].slice(2)
          let b = arr[1].slice(2)
          return a + '\n' + b
        })
      }
    },
    // 各轧辊类型综合消耗
    async findSeven() {
      let res = await pythonPOST1('/python/RollReportWeekSeven/', {
        grind_starttime: this.monthTime[0],
        grind_endtime: this.monthTime[1]
      })
      if (res.code == 200) {
        this.rollXiaohao.xaxis.data = res.data[0].map(function(str) {
          if (str.length > 2) {
            return str.slice(0, 3) + '\n' + str.slice(3)
          } else {
            return str
          }
        })
        this.rollXiaohao.series[0].data = res.data[1]
      }
    },
    // 正常下线精轧工作辊平均磨削量
    async findFW() {
      let year = this.monthTime[0].slice(0, 4)
      let res = await pythonPOST1('/python/RollReportWeekFW17/', {
        year
      })
      if (res.code == 200) {
        console.log('数值', res.data)
        let arr1 = []
        let arr2 = []
        for (let i = 0; i < res.data[0].length; i++) {
          arr1.push([moment(res.data[0][i]).valueOf(), res.data[1][i]])
        }
        for (let i = 0; i < res.data[2].length; i++) {
          arr2.push([moment(res.data[2][i]).valueOf(), res.data[3][i]])
        }
        this.jingAge.series[0].data = arr1
        this.jingAge.series[1].data = arr2
      }
    },
    // 各轧辊下线原因综合消耗占比
    async findfour() {
      let res = await pythonPOST1('/python/RollReportWeekfour/', {
        grind_starttime: this.monthTime[0],
        grind_endtime: this.monthTime[1]
      })
      if (res.code == 200) {
        this.rollReasonDown.yaxis[0].data = res.data[0].map(function(str) {
          if (str.length > 4) {
            return str.slice(0, 5) + '\n' + str.slice(5)
          } else {
            return str
          }
        })
        this.rollReasonDown.series[0].data = res.data[1]
      }
    },
    // 磨床四班精轧工作辊正常下线轧辊平均磨削量
    async findHSS() {
      let year = this.monthTime[0].slice(0, 4)
      let res = await pythonPOST1('/python/RollReportWeeksbz/', {
        year
      })
      if (res.code == 200) {
        let data = [] // 转换json
        for (const item of res.data) {
          data.push(JSON.parse(item))
        }
        // 磨床四班精轧工作辊正常下线轧辊平均磨削量
        let arr = []
        let str = ['甲', '乙', '丙', '丁']
        for (let i = 0; i < data.length; i++) {
          let seriesData = []
          for (const item of data[i]) {
            seriesData.push([moment(item.name).valueOf(), item.value])
          }
          arr.push({
            name: str[i],
            type: 'line',
            symbol: 'none',
            data: seriesData
          })
        }
        console.log('输出', arr)

        this.gaoRollDown.series = arr
      }
    }
  }
}
</script>
<style >
.topHead {
  background-color: #253f80;
  width: 100%;
  height: 40px;
  color: #eae8c5;
  line-height: 40px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
}
.m-echatrs-title {
  display: flex;
  justify-content: space-between;
  background: -webkit-linear-gradient(
    left,
    #253f80 0%,
    #253f80 40%,
    #1a367a 60%,
    #253f80 80%,
    #253f80 100%
  );
  height: 28px;
  line-height: 28px;
  color: #faad00;
  font-size: 14px;
  padding-left: 15px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-right: 15px;
  box-sizing: border-box;
}
.month-report {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.month-echarts {
  width: calc(100% - 610px);
}
.report {
  width: 600px;
  height: 100%;
  background-color: #1a367a;
  border-radius: 5px;
}
.report-title {
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #253f80;
}
.report-main {
  width: 100%;
  height: calc(100vh - 150px);
  padding: 5px 10px;
  box-sizing: border-box;
}
.report-main-info {
  width: 100%;
  height: 100%;
  text-align: center;
  border: 1px #ffffff solid;
}
.default-picker-border-color input {
  border: #6699ff;
}
</style>
