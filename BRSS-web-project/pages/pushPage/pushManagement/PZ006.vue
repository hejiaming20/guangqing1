<!--
 * @Author: your name
 * @Date: 2020-12-12 17:25:55
 * @LastEditTime: 2020-12-14 15:59:59
 * @LastEditors: Please set LastEditors
 * @Description: 智能推送看板
 * @FilePath: \BRSS-web-project\pages\pushPage\pushManagement\PZ006.vue
-->
<template>
  <div>
    <div class="layout-default-margin">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="layout-card">
            <div 
              slot="header" 
              class="clearfix">
              <span>模块使用率(%)</span>
            </div>
            <tasily-echarts 
              :title="leftEcharts.title"
              :legend="leftEcharts.legend"
              :series="leftEcharts.series"
              :x-axis="leftEcharts.xaxis" 
              :toolbox="{show:false}" 
              :y-axis="leftEcharts.yaxis"
              :tooltip="leftEcharts.tooltip"
              _height="240px"/>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="layout-card">
            <div class="p-btns">
              <div 
                v-for="(item, index) in btnArr"
                :key="index" 
                :class="tabindex == item.modular_no? 'p-btns-item quecolor' : 'p-btns-item'" 
                @click="handleClick(item.modular_no)">{{ item.modular_no_value }}</div>
            </div>
            <div 
              slot="header" 
              class="clearfix">
              <span>模块完成率(%)</span>
            </div>
            <tasily-echarts 
              :legend="middleEcharts.legend"
              :series="middleEcharts.series"
              :x-axis="middleEcharts.xaxis" 
              :toolbox="{show:false}" 
              :y-axis="middleEcharts.yaxis"
              :tooltip="middleEcharts.tooltip"
              _height="215px"/>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="layout-card">
            <div 
              slot="header" 
              class="clearfix">
              <span>各个模块完成率评比</span>
            </div>
            <tasily-echarts 
              :legend="rightEcharts.legend"
              :series="rightEcharts.series"
              :x-axis="rightEcharts.xaxis" 
              :grid="rightEcharts.grid"
              :toolbox="{show:false}" 
              :y-axis="rightEcharts.yaxis"
              :tooltip="rightEcharts.tooltip"
              _height="240px"/>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-card class="layout-card">
      <div 
        slot="header" 
        class="clearfix">
        <span>班组完成情况统计</span>
      </div>
      <div class="layout-one-input">
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
      <el-row :gutter="20">
        <el-col :span="12">
          <tasily-echarts 
            :legend="moPieEcharts.legend"
            :series="moPieEcharts.series"
            :grid="moPieEcharts.grid"
            :x-axis="moPieEcharts.xaxis" 
            :toolbox="{show:false}" 
            :y-axis="moPieEcharts.yaxis"
            :tooltip="moPieEcharts.tooltip"
            _height="215px"/>
        </el-col>
        <el-col :span="12">
          <tasily-echarts 
            :legend="moColumnEcharts.legend"
            :series="moColumnEcharts.series"
            :x-axis="moColumnEcharts.xaxis" 
            :toolbox="{show:false}" 
            :grid="moColumnEcharts.grid"
            :y-axis="moColumnEcharts.yaxis"
            :tooltip="moColumnEcharts.tooltip"
            _height="240px"/>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { post } from '@/lib/Util'
import tasilyEcharts from '@/components/TasilyEcharts'
import echarts from 'echarts'
import moment from 'moment'
export default {
  components: { tasilyEcharts },
  data() {
    return {
      leftEcharts: {
        title: {
          text: '模块使用率(%)',
          x: 'center',
          y: 'center',
          itemGap: 20,
          textStyle: {
            color: 'rgba(30,144,255,0.8)',
            fontFamily: '微软雅黑',
            fontSize: 20,
            fontWeight: 'bolder'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'pin',
          icon: 'circle',
          y: 0,
          x: 300,
          itemGap: 2,
          textStyle: {
            color: '#ffffff'
          },
          data: ['磨削', '备辊', '冷却', '磨削检测']
        },
        series: [
          {
            name: '1',
            type: 'pie',
            clockWise: false,
            radius: [100, 120],
            itemStyle: {
              normal: {
                label: { show: false },
                labelLine: { show: false }
              }
            },
            data: [
              {
                value: 382,
                name: '磨削'
              },
              {
                value: 902,
                name: 'invisible',
                itemStyle: {
                  normal: {
                    color: 'rgba(0,0,0,0)',
                    label: { show: false },
                    labelLine: { show: false }
                  },
                  emphasis: {
                    color: 'rgba(0,0,0,0)'
                  }
                }
              }
            ]
          },
          {
            name: '2',
            type: 'pie',
            clockWise: false,
            radius: [80, 100],
            itemStyle: {
              normal: {
                label: { show: false },
                labelLine: { show: false }
              }
            },
            data: [
              {
                value: 29,
                name: '备辊'
              },
              {
                value: 71,
                name: 'invisible',
                itemStyle: {
                  normal: {
                    color: 'rgba(0,0,0,0)',
                    label: { show: false },
                    labelLine: { show: false }
                  },
                  emphasis: {
                    color: 'rgba(0,0,0,0)'
                  }
                }
              }
            ]
          },
          {
            name: '3',
            type: 'pie',
            clockWise: false,
            radius: [60, 80],
            itemStyle: {
              normal: {
                label: { show: false },
                labelLine: { show: false }
              }
            },
            data: [
              {
                value: 3,
                name: '冷却'
              },
              {
                value: 97,
                name: 'invisible',
                itemStyle: {
                  normal: {
                    color: 'rgba(0,0,0,0)',
                    label: { show: false },
                    labelLine: { show: false }
                  },
                  emphasis: {
                    color: 'rgba(0,0,0,0)'
                  }
                }
              }
            ]
          },
          {
            name: '4',
            type: 'pie',
            clockWise: false,
            radius: [40, 60],
            itemStyle: {
              normal: {
                label: { show: false },
                labelLine: { show: false }
              }
            },
            data: [
              {
                value: 3,
                name: '磨削检测'
              },
              {
                value: 97,
                name: 'invisible',
                itemStyle: {
                  normal: {
                    color: 'rgba(0,0,0,0)',
                    label: { show: false },
                    labelLine: { show: false }
                  },
                  emphasis: {
                    color: 'rgba(0,0,0,0)'
                  }
                }
              }
            ]
          }
        ],
        xaxis: { show: false },
        yaxis: [
          {
            show: false
          }
        ]
      },
      rightEcharts: {
        title: {
          text: '模块使用率(%)',
          x: 'center',
          y: 'center',
          itemGap: 20,
          textStyle: {
            color: 'rgba(30,144,255,0.8)',
            fontFamily: '微软雅黑',
            fontSize: 20,
            fontWeight: 'bolder'
          }
        },
        grid: {
          top: 20,
          bottom: 20
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          orient: 'vertical',
          y: 15,
          x: 300,
          itemGap: 12,
          data: [],
          textStyle: {
            color: '#ffffff'
          }
        },
        series: [
          {
            // For shadow
            type: 'bar',
            itemStyle: {
              color: 'rgba(0,0,0,0.05)'
            },
            barWidth: 15,
            barGap: '-100%',
            barCategoryGap: '40%',
            data: [1],
            tooltip: { show: false },
            animation: false
          },
          {
            type: 'bar',
            barWidth: 15,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: [0.1]
          }
        ],
        xaxis: {
          type: 'category',
          data: ['磨削', '磨削检测', '备辊', '冷却'],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#999'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#eae8c5'
            }
          },
          axisTick: {
            show: false
          }
        },
        yaxis: [
          {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#999'
              }
            }
          }
        ]
      },
      middleEcharts: {
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          y: 20,
          textStyle: {
            color: '#ffffff'
          }
        },
        series: [
          {
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            label: {
              formatter: '{b}{d}%'
            },
            data: [{ value: 0, name: '完成' }, { value: 0, name: '未完成' }]
          }
        ],
        xaxis: { show: false },
        yaxis: [
          {
            show: false
          }
        ]
      },
      btnArr: [],
      tabindex: null,
      moPieEcharts: {
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        grid: {
          bottom: 5
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          y: 20,
          textStyle: {
            color: '#ffffff'
          }
        },
        series: [
          {
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            label: {
              formatter: '{b}{d}%'
            },
            data: [
              { value: 0, name: '甲' },
              { value: 0, name: '乙' },
              { value: 0, name: '丙' },
              { value: 0, name: '丁' }
            ]
          }
        ],
        xaxis: { show: false },
        yaxis: [
          {
            show: false
          }
        ]
      },
      moColumnEcharts: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          orient: 'vertical',
          y: 15,
          x: 300,
          itemGap: 12,
          data: [],
          textStyle: {
            color: '#ffffff'
          }
        },
        grid: {
          top: 20,
          bottom: 20
        },
        series: [
          {
            // For shadow
            type: 'bar',
            itemStyle: {
              color: 'rgba(0,0,0,0.05)'
            },
            barWidth: 15,
            barGap: '-100%',
            barCategoryGap: '40%',
            data: [1],
            tooltip: { show: false },
            animation: false
          },
          {
            type: 'bar',
            barWidth: 15,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: [0.1]
          }
        ],
        xaxis: {
          type: 'category',
          data: ['磨削', '磨削检测', '备辊', '冷却'],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#999'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#eae8c5'
            }
          },
          axisTick: {
            show: false
          }
        },
        yaxis: [
          {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#999'
              }
            }
          }
        ]
      },
      monthTime: []
    }
  },
  mounted() {
    this.monthTime = [
      moment()
        .subtract(7, 'days')
        .format('YYYY-MM-DD 00:00:00'),
      moment().format('YYYY-MM-DD 23:59:59')
    ]
    this.findModules()
    this.findLeftEcharts()
    this.findRightEcharts()
    this.findMopie()
    this.findMoColumn()
  },
  methods: {
    async findModules() {
      let res = await post('rollPushnew/findByModular')
      if (res.status == 2000) {
        this.btnArr = res.data
        this.handleClick(res.data[0].modular_no)
      }
    },
    async findLeftEcharts() {
      var compare = function(attribute) {
        return function(obj1, obj2) {
          var val1 = Number(obj1[attribute])
          var val2 = Number(obj2[attribute])
          if (val1 > val2) {
            return -1
          } else if (val1 > val2) {
            return -1
          } else {
            return 0
          }
        }
      }
      let res = await post('rollPushnew/findByModularPie')
      if (res.status == 2000) {
        let count = 0
        let legendArr = []
        let arr = []
        res.data = res.data.sort(compare('value'))

        for (const item of res.data) {
          legendArr.push(item.name + ' ' + item.value)
          count += Number(item.value)
          arr.push({
            name: item.name + ' ' + item.value,
            value: item.value
          })
        }
        this.leftEcharts.legend.data = legendArr

        this.leftEcharts.series[0].data[0] = arr[0]
        this.leftEcharts.series[0].data[1].value =
          count - Number(res.data[0].value)

        this.leftEcharts.series[1].data[0] = arr[1]
        this.leftEcharts.series[1].data[1].value =
          count - Number(res.data[1].value)

        this.leftEcharts.series[2].data[0] = arr[2]
        this.leftEcharts.series[2].data[1].value =
          count - Number(res.data[2].value)

        this.leftEcharts.series[3].data[0] = arr[3]
        this.leftEcharts.series[3].data[1].value =
          count - Number(res.data[3].value)
      }
    },
    async findRightEcharts() {
      let res = await post('rollPushnew/findByModularBar')
      if (res.status == 2000) {
        let y = []
        for (const item of res.data.y_list) {
          y.push(1)
        }
        this.rightEcharts.xaxis.data = res.data.x_list
        this.rightEcharts.series[1].data = res.data.y_list
        this.rightEcharts.series[0].data = y
      }
    },
    handleClick(val) {
      this.tabindex = val
      this.findClickmoudle(val)
    },
    async findClickmoudle(val) {
      let res = await post('rollPushnew/findByFinish', {
        modular_no: val
      })
      if (res.status == 2000) {
        this.middleEcharts.series[0].data = res.data
      }
      console.log(res)
    },
    async findMopie() {
      let res = await post('rollPushnew/findPieByBz', {
        start_time: this.monthTime[0],
        end_time: this.monthTime[1]
      })
      if (res.status == 2000) {
        this.moPieEcharts.series[0].data = res.data
      }
    },
    async findMoColumn() {
      let res = await post('rollPushnew/findBarByBz', {
        start_time: this.monthTime[0],
        end_time: this.monthTime[1]
      })
      if (res.status == 2000) {
        this.moColumnEcharts.xaxis.data = res.data.x_list
        this.moColumnEcharts.series[1].data = res.data.y_list
      }
    },
    handleMonth() {
      console.log(this.monthTime)
      this.findMopie()
      this.findMoColumn()
    }
  }
}
</script>

<style scoped>
</style>
