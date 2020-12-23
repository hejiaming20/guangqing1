<!--
 * @Author: your name
 * @Date: 2020-10-12 13:42:27
 * @LastEditTime: 2020-12-14 17:47:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \BRSS-web-project\pages\ReportSystem\assessment\AN003.vue
-->
<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :current-page="tablePagination.pageIndex"
      :total="tablePagination.total"
      :page-size="tablePagination.pageSize"
      :row-class-name="setRowColor"
      :cell-class-name="setCellStyle"
      table-height="385px"
      class="layout-default-margin"
      @row-click="handleChangeData"
      @handle-size-change="handleSizeChange"
      @handle-current-change="handleCurrentChange">
      <template slot="TableHead">
        <el-row :gutter="10">
          <el-col :span="20">
            <el-form
              ref="ruleForm"
              :model="searchInfo"
              :inline="true"
              class="search-info"
              label-width="80px">
              <el-form-item
                label="机架号"
                prop="frame_no">
                <!-- <el-input v-model="searchInfo.frame_no" /> -->
                <el-select
                  v-model="searchInfo.frame_no"
                  clearable
                  placeholder="请选择">
                  <el-option
                    v-for="item in jijiaArr"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="轧制类型"
                prop="roll_type">
                <!-- <el-input v-model="searchInfo.roll_type" /> -->
                <el-select
                  v-model="searchInfo.roll_type"
                  clearable
                  placeholder="请选择">
                  <el-option
                    v-for="item in rollTypeArr"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="轧辊位置"
                prop="roll_position">
                <el-select
                  v-model="searchInfo.roll_position"
                  clearable
                  placeholder="请选择">
                  <el-option
                    v-for="item in rollPositionArray"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="上线时间"
                prop="onlinetime">
                <el-date-picker
                  v-model="searchInfo.onlinetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="选择上线时间"/>
              </el-form-item>
              <el-form-item
                label="下线时间"
                prop="offlinetime">
                <el-date-picker
                  v-model="searchInfo.offlinetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="选择下线时间"/>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4">
            <div class="btn">
              <el-button
                size="mini"
                type="primary"
                @click="findSearch()">查询</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="resetForm('ruleForm')">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          prop="roll_no"
          width="90px"
          label="辊号"/>
        <el-table-column
          prop="frame_no"
          width="60px"
          label="机架"/>
        <el-table-column
          prop="roll_type"
          width="100px"
          label="轧辊类型"/>
        <el-table-column
          prop="roll_position"
          width="80px"
          label="上机位置"/>
        <el-table-column
          prop="onlinetime"
          show-overflow-tooltip
          width="160px"
          label="上线日期"/>
        <el-table-column
          prop="offlinetime"
          show-overflow-tooltip
          width="160px"
          label="下线日期"/>
        <el-table-column
          prop="wear_score"
          width="80px"
          label="在线磨损评级"/>
        <el-table-column label="相对磨损a(μm)">
          <el-table-column
            prop="wear_a_os"
            width="60px"
            label="OS侧"/>
          <el-table-column
            prop="wear_a_ds"
            width="60px"
            label="DS侧"/>
        </el-table-column>

        <el-table-column label="猫耳朵磨损b(μm)">
          <el-table-column
            prop="wear_b_os"
            width="70px"
            label="OS侧"/>
          <el-table-column
            prop="wear_b_ds"
            width="70px"
            label="DS侧"/>
        </el-table-column>

        <el-table-column label="凸凹点磨损c(μm)">
          <el-table-column
            prop="wear_c_os"
            width="70px"
            label="OS侧"/>
          <el-table-column
            prop="wear_c_ds"
            width="70px"
            label="DS侧"/>
        </el-table-column>
        
        <el-table-column 
          label="轧制公里数(KM)" 
          width="90px"
          show-overflow-tooltip
          prop="rollkilometer"/>
        <el-table-column 
          label="轧制吨位(t)" 
          width="90px"
          show-overflow-tooltip
          prop="rolltonnage"/>
        <el-table-column 
          label="在线磨损量轧制量(t/mn)" 
          show-overflow-tooltip
          prop="online_ton_wear"/>
        <el-table-column 
          label="上机次数" 
          width="50px"
          prop="uplinecount"/>
        <el-table-column 
          label="辊形"
          width="120px"
          show-overflow-tooltip
          prop="rollshape"/>
        <el-table-column 
          label="下线原因" 
          prop="off_line_reason"/>
      </template>
    </Table-easy>

    <!-- echarts -->
    <el-row :gutter="5">  
      <el-col :span="8">
        <div class="layout-search">
          <div class="layout-search-header jin-title">轧辊在线磨损辊形图形化展示</div>
          <div 
            id="testecharts" 
            style="height: 320px; width: 100%">
            <!-- <tasily-echarts 
              ref="testEchart"
              :title="{show:false}"
              :legend="pieLegendA"
              :series="pieSeriesA"
              :x-axis="pieXaxisA" 
              :toolbox="{show:false}" 
              :y-axis="pieYaxisA"
              :data-zoom="dataZoom"
              :tooltip="tooltip"
              _height="300px"/> -->
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="layout-search">
          <div 
            class="layout-search-header jin-title">支撑辊服役周期内工作辊在线磨损关键指标趋势分析</div>
          <el-row>
            <el-col :span="12">
              <tasily-echarts 
                :title="{show:false}"
                :legend="zhia.pieLegendB"
                :series="zhia.pieSeriesB"
                :x-axis="zhia.pieXaxisB" 
                :toolbox="{show:false}" 
                :data-zoom="zhia.dataZoom"
                :y-axis="zhia.pieYaxisB"
                :tooltip="zhia.tooltip"
                _height="320px"/>
            </el-col>
            <el-col :span="12">
              <tasily-echarts 
                :title="{show:false}"
                :legend="zhib.pieLegendB"
                :series="zhib.pieSeriesB"
                :x-axis="zhib.pieXaxisB" 
                :toolbox="{show:false}" 
                :y-axis="zhib.pieYaxisB"
                :data-zoom="zhib.dataZoom"
                :tooltip="zhib.tooltip"
                _height="320px"/>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { get, post, pythonPOST1, getDataConfig } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
import tasilyEcharts from '@/components/TasilyEcharts'
import moment from 'moment'
import Echarts from 'echarts'
export default {
  name: 'AN003',
  components: { TableEasy, tasilyEcharts },
  data() {
    return {
      options: '',
      tableData: [],
      tablePagination: {
        total: 0,
        pageSize: 10,
        pageIndex: 1
      },
      searchInfo: {
        frame_no: '',
        roll_type: '',
        roll_position: '',
        onlinetime: '',
        offlinetime: ''
      },
      pieLegendA: {
        textStyle: {
          color: '#ffffff' //字体颜色
        },
        icon: 'circle',
        top: 20
      },
      tooltip: {
        trigger: 'axis'
      },
      pieSeriesA: [],
      testSeries: [],
      pieXaxisA: {
        type: 'value',
        axisLabel: {
          textStyle: {
            color: '#fff' //这里用参数代替了
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
            color: '#FFF'
          }
        },
        min: 0,
        max: 0
      },
      pieYaxisA: [
        {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#fff' //这里用参数代替了
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
              color: '#FFF'
            }
          }
        }
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0]
        }
      ],

      jijiaArr: [],
      rollPositionArray: [],
      rollTypeArr: [],
      zhia: {
        pieLegendB: {
          textStyle: {
            color: '#ffffff' //字体颜色
          },
          icon: 'circle',
          data: ['OS侧相对磨损量', 'DS侧相对磨损量'],
          top: 20
        },
        pieSeriesB: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            name: 'OS侧相对磨损量',
            smooth: true,
            symbol: 'none'
          },
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            name: 'DS侧相对磨损量',
            smooth: true,
            symbol: 'none'
          }
        ],
        pieXaxisB: {
          type: 'category',
          data: [],
          axisLabel: {
            textStyle: {
              color: '#fff' //这里用参数代替了
            }
          },
          axisLine: {
            lineStyle: {
              color: '#FFF'
            }
          }
        },
        pieYaxisB: [
          {
            type: 'value',
            name: '(μm)',
            axisLabel: {
              textStyle: {
                color: '#fff' //这里用参数代替了
              }
            },
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
                color: '#FFF'
              }
            }
          }
        ],
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0]
          }
        ]
      },
      zhib: {
        pieLegendB: {
          textStyle: {
            color: '#ffffff' //字体颜色
          },
          icon: 'circle',
          data: ['OS侧猫耳朵磨损量', 'DS侧猫耳朵磨损量'],
          top: 20
        },
        pieSeriesB: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            name: 'OS侧猫耳朵磨损量',
            smooth: true,
            symbol: 'none'
          },
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            name: 'DS侧猫耳朵磨损量',
            smooth: true,
            symbol: 'none'
          }
        ],
        pieXaxisB: {
          type: 'category',
          data: [],
          axisLabel: {
            textStyle: {
              color: '#fff' //这里用参数代替了
            }
          },
          axisLine: {
            lineStyle: {
              color: '#FFF'
            }
          }
        },
        pieYaxisB: [
          {
            name: '(μm)',
            type: 'value',
            axisLabel: {
              textStyle: {
                color: '#fff' //这里用参数代替了
              }
            },
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
                color: '#FFF'
              }
            }
          }
        ],
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0]
          }
        ]
      },
      rowIndex: []
    }
  },
  mounted() {
    // this.$set(this.searchInfo, 'onlinetime', )
    this.testOptions()
  },
  methods: {
    findSearch() {
      this.tablePagination.pageIndex = 1
      this.findAll()
    },
    async findAll() {
      let res = await pythonPOST1('/python/RollWearScore/', {
        pageIndex: this.tablePagination.pageIndex,
        pageSize: this.tablePagination.pageSize,
        frame_no: this.searchInfo.frame_no || '',
        roll_type: this.searchInfo.roll_type || '',
        roll_position: this.searchInfo.roll_position || '',
        onlinetime: this.searchInfo.onlinetime,
        offlinetime: this.searchInfo.offlinetime
      })
      if (res.code == 200) {
        this.tableData = JSON.parse(res.data)
        this.tablePagination.total = res.rowtotal

        this.rowIndex = []
        this.pieLegendA.data = []

        this.testSeries = []
        this.handleChangeData(this.tableData[0])
      } else {
        this.tableData = []
        this.rowIndex = []
        this.tablePagination.total = 0
        this.testSeries = []
      }
    },
    async testOptions() {
      let res = await post('/dictionary/findMapV1', { dicno: 'uplocation' })
      this.rollPositionArray = res.data
      this.rollPositionArray.map(o => {
        if (o.value == 'TOP') {
          this.searchInfo.roll_position = 'TOP'
        }
      })
      let res1 = await post('/dictionary/findMapV1', { dicno: 'frameteam' })
      this.jijiaArr = res1.data
      this.jijiaArr.map(o => {
        if (o.value == 'F7') {
          this.searchInfo.frame_no = 'F7'
        }
      })
      let res2 = await post('/dictionary/findMapV1', { dicno: 'rolltype' })
      this.rollTypeArr = res2.data
      this.rollTypeArr.map(o => {
        if (o.value == '精轧工作辊') {
          this.searchInfo.roll_type = '精轧工作辊'
        }
      })
      this.searchInfo.onlinetime = moment()
        .subtract(30, 'days')
        .format('YYYY-MM-DD HH:mm:ss')
      this.searchInfo.offlinetime = moment().format('YYYY-MM-DD HH:mm:ss')
      this.findAll()
      this.findZhiOptions()
    },
    findOptions() {
      getDataConfig('frameteam').then(res => {
        this.jijiaArr = res
        this.jijiaArr.map(o => {
          if (o.value == 'F6') {
            this.searchInfo.frame_no = Number(o.key)
            // this.findAll()
          }
        })
      })
      getDataConfig('rolltype').then(res => {
        this.rollTypeArr = res
        this.rollTypeArr.map(o => {
          if (o.value == '精轧工作辊') {
            this.searchInfo.roll_type = Number(o.key)
            // this.findAll()
          }
        })
      })
      getDataConfig('uplocation').then(res => {
        this.rollPositionArray = res // 上级位置
        this.rollPositionArray.map(o => {
          if (o.value == 'TOP') {
            this.searchInfo.roll_position = Number(o.key)
            // this.findAll()
          }
        })
      })
    },
    resetForm() {
      this.searchInfo = {
        frame_no: '',
        roll_type: '',
        roll_position: '',
        onlinetime: '',
        offlinetime: ''
      }
      this.rollPositionArray.map(o => {
        if (o.value == 'TOP') {
          this.searchInfo.roll_position = 'TOP'
        }
      })
      this.jijiaArr.map(o => {
        if (o.value == 'F7') {
          this.searchInfo.frame_no = 'F7'
        }
      })
      this.rollTypeArr.map(o => {
        if (o.value == '精轧工作辊') {
          this.searchInfo.roll_type = '精轧工作辊'
        }
      })
      this.searchInfo.onlinetime = moment()
        .subtract(30, 'days')
        .format('YYYY-MM-DD HH:mm:ss')
      this.searchInfo.offlinetime = moment().format('YYYY-MM-DD HH:mm:ss')
      this.findAll()
    },
    /**
     * @param val: 加载时默认第一条数据的值
     * @description: 点击行，显示echarts
     */
    handleChangeData(val) {
      if (val && this.rowIndex.indexOf(val) == -1) {
        // this.rowIndex.forEach(res => {
        //   if (
        //     val.frame_no != res.frame_no ||
        //     val.roll_type != res.roll_type ||
        //     val.roll_position != res.roll_position
        //   ) {
        //     console.log('frame_no', val.frame_no, res.frame_no)
        //     console.log('roll_type', val.roll_type, res.roll_type)
        //     console.log('roll_position', val.roll_position, res.roll_position)
        //     this.$message('请选择相同的机架号/轧辊类型/轧辊位置')
        //     return
        //   }
        // })
        this.rowIndex.push(val)
        this.getEcharts(val)
      } else {
        this.rowIndex.splice(this.rowIndex.indexOf(val), 1)
        this.getEcharts(val)
      }
    },
    getEcharts(val) {
      let arr = []

      this.pieLegendA.data = []

      for (const item of this.rowIndex) {
        let targetData = [] // 目标值
        let data = [] // 磨损值
        for (let i = 0; i < item.list_target_x.length; i++) {
          targetData.push([item.list_target_x[i], item.float_target_y[i]])
        }
        for (let y = 0; y < item.list_wear_x.length; y++) {
          data.push([item.list_wear_x[y], item.float_wear_y[y]])
        }
        this.pieLegendA.data.push(
          item.roll_no + '目标辊形',
          item.roll_no + '磨损辊形'
        )
        arr.push(
          {
            data: targetData,
            type: 'line',
            smooth: true,
            symbol: 'none',
            name: item.roll_no + '目标辊形'
          },
          {
            data: data,
            type: 'line',
            smooth: true,
            symbol: 'none',
            name: item.roll_no + '磨损辊形'
          }
        )
      }

      this.testSeries = arr

      var myChart = Echarts.init(
        document.getElementById('testecharts'),
        'light'
      )

      var option = {
        textStyle: {
          color: '#ffffff' //字体颜色
        },
        tooltip: {
          trigger: 'axis'
        }, //联动
        legend: {
          textStyle: {
            color: '#ffffff' //字体颜色
          },
          icon: 'circle',
          data: this.pieLegendA.data,
          top: 25,
          type: 'scroll',
          animation: true
        },
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0]
          }
        ],

        xAxis: {
          axisLine: {
            lineStyle: {
              color: '#ffffff' //坐标线颜色
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ffffff' //坐标轴字体颜色
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
          min: 0,
          max: 2550,
          name: '轧辊辊身长度(mm)',
          nameLocation: 'end',
          nameTextStyle: {
            padding: [0, 0, -200, -100] // 四个数字分别为上右下左与原位置距离
          }
        },

        grid: {
          bottom: 40
        },

        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#ffffff' //坐标线颜色
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ffffff' //坐标轴字体颜色
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
          name: '轧辊半径差(mm)',
          nameRotate: 90,
          nameGap: 25,
          nameLocation: 'center'
        },
        series: this.testSeries
      }
      myChart.setOption(option, true)
      // myChart.setOption(option,true)
    },

    async findZhiOptions() {
      let res = await pythonPOST1('/python/RollWearScoreLine/', {
        frame_no: this.searchInfo.frame_no || '',
        roll_type: this.searchInfo.roll_type || '',
        roll_position: this.searchInfo.roll_position || '',
        onlinetime: this.searchInfo.onlinetime,
        offlinetime: this.searchInfo.offlinetime
      })
      let x = []
      let aos = []
      let ads = []
      let bos = []
      let bds = []
      let data = []
      if (res.code == 200) {
        data = JSON.parse(res.data)
        x = Array.from(data, o => o.onlinetime)
        aos = Array.from(data, o => o.wear_a_os)
        ads = Array.from(data, o => o.wear_a_ds)
        bos = Array.from(data, o => o.wear_b_os)
        bds = Array.from(data, o => o.wear_b_ds)

        this.zhia.pieXaxisB.data = x.map(function(str) {
          return str.replace(' ', '\n')
        })
        this.zhia.pieSeriesB[0].data = aos
        this.zhia.pieSeriesB[1].data = ads

        this.zhib.pieXaxisB.data = x.map(function(str) {
          return str.replace(' ', '\n')
        })
        this.zhib.pieSeriesB[0].data = bos
        this.zhib.pieSeriesB[1].data = bds
      }
    },
    setRowColor({ row, rowIndex }) {
      if (this.rowIndex.indexOf(row) != -1) {
        return 'setTable-row-class-name'
      }
    },
    setCellStyle({ row, column }) {
      if (
        column.label == '在线磨损评级' ||
        column.label == 'OS侧' ||
        column.label == 'DS侧'
      ) {
        return 'setClassname'
      }
    },
    handleSizeChange(val) {
      this.tablePagination.pageSize = val
      this.findAll()
    },
    handleCurrentChange(val) {
      this.tablePagination.pageIndex = val
      this.findAll()
    }
  }
}
</script>

<style>
.pushList {
  height: 100%;
}
.pushHead {
  height: 28px;
  width: 100%;
  background-color: #253f80;
  padding-left: 15px;
  color: #eae8c5;
  line-height: 28px;
  font-size: 14px;
  font-weight: bold;
}
.pushBody {
  height: 410px;
  width: 100%;
  background-color: #1a367a;
}
.setClassname {
  color: #fcce1f !important;
}
</style>
