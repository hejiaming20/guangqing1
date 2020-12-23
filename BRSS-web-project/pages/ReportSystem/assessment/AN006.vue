<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :page-size="pageSize"
      :current-page="pageIndex"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
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
                label="设备名称"
                prop="eq_typeid">
                <el-select
                  v-model="searchInfo.eq_typeid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in eqOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="开始时间"
                prop="accident_starttime">
                <el-date-picker
                  v-model="searchInfo.accident_starttime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="开始时间"/>
              </el-form-item>
              <el-form-item
                label="结束时间"
                prop="accident_endtime">
                <el-date-picker
                  v-model="searchInfo.accident_endtime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择结束时间"/>
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
          prop="accident_data"
          label="日期"/>
        <el-table-column
          prop="eq_typeid"
          label="设备类型">
          <template slot-scope="scope">
            <span>{{ scope.row.eq_typeid | filtereq }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="accident_type"
          label="事故类型"/>
        <el-table-column
          prop="accident_starttime"
          width="160px"
          label="故障起始时间"/>
        <el-table-column
          prop="accident_endtime"
          width="160px"
          label="故障恢复时间"/>
        <el-table-column
          prop="delta_time"
          width="150px"
          label="故障影响生产时间(分)"/>
        <el-table-column
          prop="accident_reason"
          min-width="240px"
          show-overflow-tooltip
          label="事故原因"/>
        <el-table-column
          prop="bz"
          label="班组"/>
        <el-table-column
          prop="duty_user"
          label="当班负责人"/>
        <el-table-column
          prop="connection_user"
          label="事故联络人"/>
      </template>
    </Table-easy>
    <!-- echarts -->
    <el-row>
      <div
        class="layout-search"
        style="margin-top: 10px">
        <div class="layout-search-header jin-title">设备故障率影响评价</div>
        <div class="layout-search-body">
          <el-row>
            <el-col :span="20">
              <el-form
                :model="searchInfoEchartsLight"
                class="search-info"
                label-width="100px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      label="开始时间"
                      prop="accident_starttime">
                      <el-date-picker
                        v-model="searchInfoEchartsLight.accident_starttime"
                        :clearable="false"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="开始时间"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="结束时间"
                      prop="accident_endtime">
                      <el-date-picker
                        v-model="searchInfoEchartsLight.accident_endtime"
                        :clearable="false"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="结束时间"/>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
            <el-col :span="4">
              <div class="btn">
                <el-button
                  size="mini"
                  type="primary"
                  @click="findAllEchartsRight()">查询</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div
                id="echartsLeft"
                style="height: 300px;width: 100%;float: left;background: #1a367a;position: relative;"/>
              <div class="count-title">
                <p>{{ time }}：维修时长总计</p>
                <p>故障次数总数：{{ cishu }}</p>
              </div>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="5">
                <el-col :span="12">
                  <div
                    id="echartsRightOne"
                    style="height: 300px;width: 100%;float: left;background: #1a367a"/>
                  
                </el-col>
                <el-col :span="12">
                  <div
                    id="echartsRightTwo"
                    style="height: 300px;width: 100%;background: #1a367a"/>
                  
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-row>
  </div>

</template>

<script>
import { get, post, pythonPOST1, getDataConfig } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
import Echarts from 'echarts'
import tasilyEcharts from '@/components/TasilyEcharts'
import moment from 'moment'
let that
export default {
  name: 'AN006',
  components: { TableEasy, tasilyEcharts },
  filters: {
    filtereq(val) {
      for (const item of that.eqOptions) {
        if (item.key == val) {
          return item.value
        }
      }
    }
  },
  data() {
    return {
      time: 0,
      cishu: 0,
      pageIndex: 1,
      pageSize: 10,
      tableData: [],
      eqOptions: [],
      total: 0,
      options: [],
      searchInfo: {
        accident_starttime: '',
        accident_endtime: '',
        eq_typeid: ''
      },
      searchInfoEchartsLight: {
        accident_starttime: '',
        accident_endtime: ''
      },
      echartsArrayRight: [
        {
          pieLegend: {
            textStyle: {
              color: '#eae8c5'
            }
          },
          pieSeries: [
            {
              name: '3#磨床',
              type: 'category',
              data: [120, 200, 150, 80],
              type: 'bar',
              showBackground: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
              }
            }
          ],
          pieXaxis: {
            type: 'category',
            data: ['甲班', '乙班', '丙班', '丁班'],
            axisLine: {
              lineStyle: {
                color: '#eae8c5'
              }
            }
          },
          pieYaxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#eae8c5'
              }
            }
          }
        },
        {
          pieLegend: {
            textStyle: {
              color: '#eae8c5'
            }
          },
          pieSeries: [
            {
              name: '4#磨床',
              type: 'category',
              data: [120, 200, 150, 80],
              type: 'bar',
              showBackground: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
              }
            }
          ],
          pieXaxis: {
            type: 'category',
            data: ['甲班', '乙班', '丙班', '丁班'],
            axisLine: {
              lineStyle: {
                color: '#eae8c5'
              }
            }
          },
          pieYaxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#eae8c5'
              }
            }
          }
        },
        {
          pieLegend: {
            textStyle: {
              color: '#eae8c5'
            }
          },
          pieSeries: [
            {
              name: '5#磨床',
              type: 'category',
              data: [120, 200, 150, 80],
              type: 'bar',
              showBackground: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
              }
            }
          ],
          pieXaxis: {
            type: 'category',
            data: ['甲班', '乙班', '丙班', '丁班'],
            axisLine: {
              lineStyle: {
                color: '#eae8c5'
              }
            }
          },
          pieYaxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#eae8c5'
              }
            }
          }
        },
        {
          pieLegend: {
            textStyle: {
              color: '#eae8c5'
            }
          },
          pieSeries: [
            {
              name: '6#磨床',
              type: 'category',
              data: [120, 200, 150, 80],
              type: 'bar',
              showBackground: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
              }
            }
          ],
          pieXaxis: {
            type: 'category',
            data: ['甲班', '乙班', '丙班', '丁班'],
            axisLine: {
              lineStyle: {
                color: '#eae8c5'
              }
            }
          },
          pieYaxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#eae8c5'
              }
            }
          }
        }
      ]
    }
  },
  beforeCreate: function() {
    that = this
  },
  mounted() {
    this.searchInfo.accident_starttime = moment()
      .subtract(180, 'days')
      .format('YYYY-MM-DD HH:mm:ss')
    this.searchInfo.accident_endtime = moment().format('YYYY-MM-DD HH:mm:ss')
    // this.echarts_go()
    this.searchInfoEchartsLight.accident_starttime = moment()
      .subtract(180, 'days')
      .format('YYYY-MM-DD HH:mm:ss')
    this.searchInfoEchartsLight.accident_endtime = moment().format(
      'YYYY-MM-DD HH:mm:ss'
    )
    this.findAll()
    this.findOptions()
    this.findLeft()
  },
  methods: {
    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    },
    async findAll() {
      let res = await pythonPOST1('/python/machineEvaluateTable/', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        eq_typeid: this.searchInfo.eq_typeid,
        accident_starttime: this.searchInfo.accident_starttime,
        accident_endtime: this.searchInfo.accident_endtime
      })
      if (res.code == 200) {
        let data = JSON.parse(res.data)
        // console.log(data)
        this.tableData = data
        this.total = res.rowtotal
      }
    },
    resetForm() {
      this.searchInfo = {}
      this.findAll()
    },
    findAllEchartsRight() {
      this.findLeft()
    },
    async findLeft() {
      let res = await pythonPOST1(
        '/python/machineEvaluatePhoto/',
        this.searchInfoEchartsLight
      )
      if (res.code == 200) {
        let obj = {
          1: '1#磨床',
          2: '2#磨床',
          3: '3#磨床',
          4: '4#磨床',
          5: '5#磨床',
          6: '6#磨床'
        }
        let mocishu = []
        let motime = []
        for (let j = 0; j < res.data[0][0].length; j++) {
          if (j < 6) {
            mocishu.push({
              value: res.data[0][1][j],
              label: obj[res.data[0][0][j]]
            })
          }
          if (j == 6) {
            this.cishu = res.data[0][1][j]
          }
        }
        for (let a = 0; a < res.data[0][2].length; a++) {
          if (a < 6) {
            motime.push({
              value: res.data[0][3][a],
              label: obj[res.data[0][2][a]]
            })
          }
          if (a == 6) {
            this.time = res.data[0][3][a]
          }
        }
        let guzhangcishu = []
        let guzhangtime = []
        for (let i = 1; i < res.data.length; i++) {
          if (i <= 6) {
            guzhangcishu.push(JSON.parse(res.data[i]))
          } else {
            guzhangtime.push(JSON.parse(res.data[i]))
          }
        }
        console.log(mocishu, motime, guzhangcishu, guzhangtime)
        this.echarts_go(mocishu, motime, guzhangcishu, guzhangtime)
      }
    },
    echarts_go(mocishu, motime, guzhangcishu, guzhangtime) {
      var myChart1 = Echarts.init(
        document.getElementById('echartsLeft'),
        'light'
      ) //将配置注入到html中定义的容器
      var myChart2 = Echarts.init(
        document.getElementById('echartsRightOne'),
        'light'
      ) //将配置注入到html中定义的容器
      var myChart3 = Echarts.init(
        document.getElementById('echartsRightTwo'),
        'light'
      ) //将配置注入到html中定义的容器

      let data = {
        male: {
          name: '总维修时间(h)',
          data: motime
        },
        female: {
          name: '总故障次数',
          data: mocishu
        }
      }
      let yAxisData = new Set()
      let legendData = []
      _.forEach(data, d => {
        legendData.push(d.name)
        _.forEach(d.data, item => {
          yAxisData.add(item.label)
        })
      })

      let top = 30
      let bottom = 30

      yAxisData = [...yAxisData]

      var option = {
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          left: 'center',
          top: 2,
          itemWidth: 15,
          itemHeight: 11,
          itemGap: 20,
          borderRadius: 4,
          textStyle: {
            color: '#d9dce5',
            fontSize: 14
          },
          data: legendData
        },
        grid: [
          {
            left: '12%',
            width: '28%',
            containLabel: true,
            bottom
          },
          {
            left: '52%',
            width: '0%',
            bottom: bottom + 16
          },
          {
            right: '12%',
            width: '28%',
            containLabel: true,
            bottom
          }
        ].map(item =>
          _.merge(
            {
              top
            },
            item
          )
        ),
        xAxis: [
          {
            type: 'value',
            inverse: true,
            axisLabel: {
              show: true
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true
            }
          },
          {
            gridIndex: 1,
            show: true
          },
          {
            gridIndex: 2,
            type: 'value',
            axisLabel: {
              show: true
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true
            }
          }
        ].map(item =>
          _.merge(item, {
            axisLabel: {
              color: '#949AA8',
              margin: 0
            },
            splitLine: {
              lineStyle: {
                color: '#E0E0E0',
                type: 'dashed'
              }
            }
          })
        ),
        yAxis: [
          {
            position: 'right',
            axisLabel: {
              show: false
            },
            axisLine: {
              show: true
            }
          },
          {
            gridIndex: 1,
            position: 'center',
            axisLabel: {
              align: 'center',
              padding: [8, 0, 0, 0],
              fontSize: 12,
              color: `#d9dce5`
            },
            axisLine: {
              show: false
            }
          },
          {
            gridIndex: 2,
            position: 'left',
            axisLabel: {
              show: false
            },
            axisLine: {
              show: true
            }
          }
        ].map(item => {
          return _.merge(item, {
            type: 'category',
            inverse: false,
            axisLine: {
              lineStyle: {
                color: '#E0E0E0'
              }
            },
            axisTick: {
              show: false
            },
            data: yAxisData
          })
        }),
        series: [
          {
            name: _.get(data, 'male.name'),
            label: {
              position: 'left'
            },
            itemStyle: {
              color: '#01C5B2',
              barBorderRadius: [4, 0, 0, 4]
            },
            data: _.map(_.get(data, 'male.data'), d => d.value)
          },
          {
            xAxisIndex: 2,
            yAxisIndex: 2,
            name: _.get(data, 'female.name'),
            label: {
              position: 'right'
            },
            itemStyle: {
              color: 'gold',
              barBorderRadius: [0, 4, 4, 0]
            },
            data: _.map(_.get(data, 'female.data'), d => d.value)
          }
        ].map(item =>
          _.merge(item, {
            type: 'bar',
            barWidth: 20,
            label: {
              show: true,
              fontFamily: 'Rubik-Medium',
              fontSize: 14,
              distance: 10
            }
          })
        )
      }

      var option1 = {
        title: {
          text: '故障时长占比',
          top: '270px',
          left: 'center',
          textStyle: {
            color: '#eae8c5'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['电气故障', '机械故障', '人员故障'],
          textStyle: {
            color: '#eae8c5'
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '55%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              // position: 'center',
              formatter: '{b}{c}'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18'
              }
            },
            labelLine: {
              show: true
            },
            data: guzhangtime[2]
          }
        ]
      }
      var option2 = {
        title: {
          text: '故障次数占比',
          top: '270px',
          left: 'center',
          textStyle: {
            color: '#eae8c5'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          textStyle: {
            color: '#eae8c5'
          },
          data: ['电气故障', '机械故障', '人员故障']
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '55%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              formatter: '{b}{c}'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true
            },
            data: guzhangcishu[2]
          }
        ]
      }
      myChart1.setOption(option)
      myChart2.setOption(option1)
      myChart3.setOption(option2)

      myChart1.on('click', function(params) {
        if (params.seriesName == '总故障次数') {
          let data = guzhangcishu[params.dataIndex]
          option2.series[0].data = data
          myChart3.setOption(option2)
        }
        if (params.seriesName == '总维修时间(h)') {
          let data = guzhangtime[params.dataIndex]
          option1.series[0].data = data
          myChart2.setOption(option1)
        }
      })
    },
    findOptions() {
      getDataConfig('eq_type').then(res => {
        this.eqOptions = res
      })
    }
  }
}
</script>

<style scoped>
.count-title {
  position: absolute;
  bottom: 5px;
  display: flex;
  justify-content: space-between;
  width: 500px;
  left: 10%;
}
</style>
