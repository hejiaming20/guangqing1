<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :page-size="pageSize"
      :current-page="pageIndex"
      :table-height="360"
      :cell-class-name="setCellStyle"
      index-type="index"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <template slot="TableHead">
        <el-row :gutter="10">
          <el-col :span="20">
            <el-form
              ref="ruleForm"
              :model="searchInfo"
              class="search-info"
              label-width="80px">
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="班组"
                    prop="sbz">
                    <!-- <el-input v-model="searchInfo.sbz" /> -->
                    <el-select
                      v-model="searchInfo.sbz"
                      clearable
                      placeholder="请选择">
                      <el-option
                        v-for="item in teamArr"
                        :key="item.key"
                        :label="item.value"
                        :value="item.value"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="磨床"
                    prop="machine_no">
                    <el-select
                      v-model="searchInfo.machine_no"
                      clearable
                      placeholder="请选择">
                      <el-option
                        v-for="item in machineArray"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="开始时间"
                    prop="grind_starttime">
                    <el-date-picker
                      ref="userTime"
                      v-model="searchInfo.grind_starttime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="开始时间"/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="结束时间"
                    prop="grind_endtime">
                    <el-date-picker
                      v-model="searchInfo.grind_endtime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="选择结束时间"/>
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
          width="100"
          label="辊号"/>
        <el-table-column
          prop="sbz"
          width="60"
          label="班组"/>
        <el-table-column
          prop="machine_no"
          width="70"
          label="磨床号"/>
        <el-table-column
          prop="frame_no"
          width="70"
          label="机架号"/>
        <el-table-column
          prop="grind_starttime"
          width="160"
          label="磨削开始时间"/>
        <el-table-column
          prop="grind_endtime"
          width="160"
          label="磨削结束时间"/>
        <el-table-column
          prop="off_line_reason"
          label="下线原因"/>
        <el-table-column
          prop="grind_score"
          width="110px"
          label="磨削精度评级"/>
        <el-table-column
          prop="first_wear"
          width="100"
          label="一次磨削量"/>
        <el-table-column
          prop="second_wear"
          width="100"
          label="二次磨削量"/>
        <el-table-column
          prop="wear"
          label="磨削量"/>
        <el-table-column
          prop="wheel_ratio"
          width="100px"
          label="砂轮磨削比"/>
        <el-table-column
          prop="taper"
          label="锥度"/>
        <el-table-column
          prop="deviation"
          label="辊形误差"/>
        <el-table-column
          prop="roundness"
          label="圆度"/>
        <el-table-column
          prop="crack"
          width="60"
          label="裂纹"/>
        <el-table-column
          prop="hidden_flaws"
          width="60"
          label="暗伤"/>
        <el-table-column
          prop="qualifiednum"
          label="合格点数"/>

      </template>
    </Table-easy>

    <!-- echarts -->
    <el-row :gutter="5">
      <!--左侧图-->
      <el-col :span="12">
        <el-row>
          <div
            class="layout-search"
            style="margin-top: 10px">
            <div class="layout-search-header jin-title">磨床磨削精度评级</div>
            <div class="layout-search-body">
              <el-row>
                <el-col :span="22">
                  <el-form
                    ref="ruleFormEchartsLight"
                    :inline="true"
                    :model="searchInfoEchartsLight"
                    class="search-info">
                    <el-form-item
                      label="磨床"
                      prop="machine_no">
                      <el-select
                        v-model="searchInfoEchartsLight.machine_no"
                        clearable
                        placeholder="请选择">
                        <el-option
                          v-for="item in machineArray"
                          :key="item.key"
                          :label="item.value"
                          :value="item.key"/>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="时间选择">
                      <el-date-picker
                        v-model="moxueTime"
                        type="datetimerange"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"/>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="2">
                  <div class="btn">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="findAllEchartsLight()">查询</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col
                  v-for="(item1,index1) in echartsArray"
                  :span="6"
                  :key="index1">
                  <div
                    class="layout-default-margin"
                    style="margin-bottom: 0px">
                    <tasily-echarts
                      :title="item1.title"
                      :legend="item1.pieLegend"
                      :series="item1.pieSeries"
                      :x-axis="item1.pieXaxis"
                      :toolbox="{show:false}"
                      :y-axis="item1.pieYaxis"
                      :tooltip="item1.tooltip"
                      _height="295px"
                      _width="200px"/>
                  </div>
                </el-col>
              </el-row>
              <div
                v-show="fly==1"
                class="tssss1"
                style="margin-top: -164px;position: absolute;margin-left: 85px"/>
              <div
                v-show="fly==2"
                class="tssss1"
                style="margin-top: -164px;position: absolute;margin-left: 294px"/>
              <div
                v-show="fly==3"
                class="tssss1"
                style="margin-top: -164px;position: absolute;margin-left: 500px"/>
              <div
                v-show="fly==4"
                class="tssss1"
                style="margin-top: -164px;position: absolute;margin-left: 705px;"/>
            </div>
          </div>
        </el-row>
      </el-col>
      <!--右侧图-->
      <el-col :span="12">
        <el-row>
          <div
            class="layout-search"
            style="margin-top: 10px">
            <div class="layout-search-header jin-title">最佳班组评选（正常下线轧辊平均磨削量）</div>
            <div class="layout-search-body">
              <el-row>
                <el-col :span="20">
                  <el-form
                    ref="ruleFormEchartsLight"
                    :model="searchInfoEchartsRight"
                    class="search-info">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item>
                          <el-date-picker
                            v-model="moxueTime_1"
                            type="datetimerange"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"/>
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
              <el-row >
                <el-col
                  v-for="(item,index) in echartsArrayRight"
                  :span="6"
                  :key="index">
                  <div>
                    <tasily-echarts
                      :title="item.title"
                      :legend="item.pieLegend"
                      :series="item.pieSeries"
                      :x-axis="item.pieXaxis"
                      :toolbox="{show:false}"
                      :y-axis="item.pieYaxis"
                      :tooltip="{show:false}"
                      _height="295px"
                      _width="200px"/>
                  </div>
                </el-col>

              </el-row>
            </div>
          </div>
        </el-row>
      </el-col>

      <!-- 立体图echarts模板 -->
      <el-col 
        v-if="false" 
        :span="12" >
        <div
          id="app1"
          class="Echar-bg"/>
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
  name: 'AN001',
  components: { TableEasy, tasilyEcharts },
  data() {
    return {
      src: require('assets/img/watch_1.png'),
      fly: '',
      moxueTime: ['1970-01-01 00:00:00', '1970-01-01 00:00:00'],
      moxueTime_1: ['1970-01-01 00:00:00', '1970-01-01 00:00:00'],
      pageIndex: 1,
      pageSize: 10,
      tableData: [],
      total: 0,
      options: [],
      searchInfo: {
        sbz: '',
        mochuang: '',
        grind_endtime: '',
        grind_starttime: ''
      },
      searchInfoEchartsLight: {
        machine_no: '',
        grind_starttime: '',
        grind_endtime: ''
      },
      searchInfoEchartsRight: {},
      echartsArray: [
        {
          title: {
            textStyle: {
              color: '#eae8c5'
            },
            text: '甲班',
            top: '230px',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          pieLegend: {
            textStyle: {
              color: '#eae8c5'
            }
          },
          pieSeries: [
            {
              name: '磨削精度评级',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
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
              labelLine: {
                show: false
              },
              data: [
                { value: 0, name: 'A' },
                { value: 0, name: 'B' },
                { value: 0, name: 'C' },
                { value: 0, name: 'D' }
              ]
            }
          ],
          pieXaxis: { show: false },
          pieYaxis: [{ show: false }]
        },
        {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          title: {
            text: '乙班',
            top: '230px',
            left: 'center',
            textStyle: {
              color: '#eae8c5'
            }
          },
          pieLegend: {
            textStyle: {
              color: '#eae8c5'
            }
          },
          pieSeries: [
            {
              name: '磨削精度评级',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
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
              labelLine: {
                show: false
              },
              data: [
                { value: 0, name: 'A' },
                { value: 0, name: 'B' },
                { value: 0, name: 'C' },
                { value: 0, name: 'D' }
              ]
            }
          ],
          pieXaxis: { show: false },
          pieYaxis: [{ show: false }]
        },
        {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          title: {
            textStyle: {
              color: '#eae8c5'
            },
            text: '丙班',
            top: '230px',
            left: 'center'
          },
          pieLegend: {
            textStyle: {
              color: '#eae8c5'
            }
          },
          pieSeries: [
            {
              name: '磨削精度评级',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
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
              labelLine: {
                show: false
              },
              data: [
                { value: 0, name: 'A' },
                { value: 0, name: 'B' },
                { value: 0, name: 'C' },
                { value: 0, name: 'D' }
              ]
            }
          ],
          pieXaxis: { show: false },
          pieYaxis: [{ show: false }]
        },
        {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          title: {
            textStyle: {
              color: '#eae8c5'
            },
            text: '丁班',
            top: '230px',
            left: 'center'
          },
          pieLegend: {
            textStyle: {
              color: '#eae8c5'
            }
          },
          pieSeries: [
            {
              name: '磨削精度评级',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
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
              labelLine: {
                show: false
              },
              data: [
                { value: 0, name: 'A' },
                { value: 0, name: 'B' },
                { value: 0, name: 'C' },
                { value: 0, name: 'D' }
              ]
            }
          ],
          pieXaxis: { show: false },
          pieYaxis: [{ show: false }]
        }
      ],

      echartsArrayRight: [
        {
          /* title: {
            textStyle: {
              color: '#eae8c5' //字体颜色
            },
            text: '3#磨床',
            x: '35%',
            y: '1%'
          },*/
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
              barWidth: 15,
              label: {
                show: false,
                position: 'center'
              },
              itemStyle: {
                normal: {
                  color: new Echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: 'rgba(0,244,255,1)' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgba(0,77,167,1)' // 100% 处的颜色
                      }
                    ],
                    false
                  ),
                  barBorderRadius: [30, 30, 0, 0],
                  label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: {
                      //数值样式
                      color: 'white',
                      fontSize: 12
                    }
                  }
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
          pieYaxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#eae8c5'
                }
              },
              //设置网格线颜色
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'gray'
                }
              }
            }
          ]
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
              barWidth: 15,
              itemStyle: {
                normal: {
                  color: new Echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: 'rgba(0,244,255,1)' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgba(0,77,167,1)' // 100% 处的颜色
                      }
                    ],
                    false
                  ),
                  barBorderRadius: [30, 30, 0, 0],
                  label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: {
                      //数值样式
                      color: 'white',
                      fontSize: 12
                    }
                  }
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
          pieYaxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#eae8c5'
                }
              },
              //设置网格线颜色
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'gray'
                }
              }
            }
          ]
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
              barWidth: 15,
              itemStyle: {
                normal: {
                  color: new Echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: 'rgba(0,244,255,1)' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgba(0,77,167,1)' // 100% 处的颜色
                      }
                    ],
                    false
                  ),
                  barBorderRadius: [30, 30, 0, 0],
                  label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: {
                      //数值样式
                      color: 'white',
                      fontSize: 12
                    }
                  }
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
          pieYaxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#eae8c5'
                }
              },
              //设置网格线颜色
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'gray'
                }
              }
            }
          ]
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
              barWidth: 15,
              itemStyle: {
                normal: {
                  color: new Echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: 'rgba(0,244,255,1)' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgba(0,77,167,1)' // 100% 处的颜色
                      }
                    ],
                    false
                  ),
                  barBorderRadius: [30, 30, 0, 0],
                  label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: {
                      //数值样式
                      color: 'white',
                      fontSize: 12
                    }
                  }
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
          pieYaxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#eae8c5'
                }
              },
              //设置网格线颜色
              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed',
                  color: 'rgba(135,140,147,0.8)'
                }
              }
            }
          ]
        }
      ],
      machineArray: [],
      teamArr: []
    }
  },
  created() {
    this.searchInfo.grind_starttime = moment()
      .subtract(30, 'days')
      .format('YYYY-MM-DD HH:mm:ss')
    this.searchInfo.grind_endtime = moment().format('YYYY-MM-DD HH:mm:ss')
    this.moxueTime_1[0] = moment()
      .subtract(30, 'days')
      .format('YYYY-MM-DD HH:mm:ss')
    this.moxueTime_1[1] = moment().format('YYYY-MM-DD HH:mm:ss')

    this.moxueTime[0] = moment()
      .subtract(30, 'days')
      .format('YYYY-MM-DD HH:mm:ss')
    this.moxueTime[1] = moment().format('YYYY-MM-DD HH:mm:ss')
  },
  mounted() {
    this.findOptions()
    this.findAll()
    this.findAllEchartsLight()
    this.findAllEchartsRight()

    // this.gongEcharts()  // 立体柱状图
  },
  methods: {
    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },
    findOptions() {
      getDataConfig('machine').then(res => {
        res.splice(6)
        this.machineArray = res
      })
      getDataConfig('team').then(res => {
        this.teamArr = res
      })
    },
    // 查询全部
    async findAll() {
      let res = await pythonPOST1('/python/RollEvaluateScore/', {
        pageIndex: this.pageIndex, //第几页
        pageSize: this.pageSize, //每页多少条
        sbz: this.searchInfo.sbz || '',
        machine_no: this.searchInfo.machine_no || '',
        grind_starttime: this.searchInfo.grind_starttime || '',
        grind_endtime: this.searchInfo.grind_endtime || ''
      })
      if (res.code == 200) {
        this.tableData = JSON.parse(res.data)
        this.total = res.rowtotal
      } else {
        this.tableData = []
        this.total = res.rowtotal
      }
    },
    // 磨削精度评级时间选择
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    },
    // 分页
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    },
    setCellStyle({ row, column }) {
      if (column.label == '磨削精度评级') {
        return 'setClassname'
      }
    },
    // 主表重置
    resetForm() {
      this.searchInfo = {
        sbz: '',
        mochuang: '',
        grind_endtime: '',
        grind_starttime: ''
      }
      this.searchInfo.grind_starttime = moment()
        .subtract(30, 'days')
        .format('YYYY-MM-DD HH:mm:ss')
      this.searchInfo.grind_endtime = moment().format('YYYY-MM-DD HH:mm:ss')
      this.findAll()
    },

    async findAllEchartsLight() {
      let res = await pythonPOST1('/python/RollEvaluateSbz/', {
        machine_no: this.searchInfoEchartsLight.machine_no
          ? Number(this.searchInfoEchartsLight.machine_no)
          : '',
        grind_starttime: this.moxueTime[0],
        grind_endtime: this.moxueTime[1]
      }).then(res => {
        let data = []
        if (res.code == 200) {
          res.data.forEach(item => {
            data.push(JSON.parse(item))
          })
          this.echartsArray[0].pieSeries[0].data = data[0]
          this.echartsArray[1].pieSeries[0].data = data[1]
          this.echartsArray[2].pieSeries[0].data = data[2]
          this.echartsArray[3].pieSeries[0].data = data[3]
          //获取哪个班组拿到红旗
          var t1 = data[0][0].value * 0.8 + data[0][1].value * 0.2
          var t2 = data[1][0].value * 0.8 + data[1][1].value * 0.2
          var t3 = data[2][0].value * 0.8 + data[2][1].value * 0.2
          var t4 = data[3][0].value * 0.8 + data[3][1].value * 0.2
          var arr = [t1, t2, t3, t4]
          var arr2 = [t1, t2, t3, t4]
          //冒泡排序由大到小
          var arrys = this.we_need(arr)
          setTimeout(() => {
            this.fly = ''
            for (let i = 0; arr2.length > 1; i++) {
              if (arr2[i] === arrys[0]) {
                this.fly = i + 1
                break
              }
            }
            //  console.log(this.fly)
          }, 1000)
        } else {
          this.echartsArray[0].pieSeries[0].data = []
          this.echartsArray[1].pieSeries[0].data = []
          this.echartsArray[2].pieSeries[0].data = []
          this.echartsArray[3].pieSeries[0].data = []
        }
      })
    },
    we_need(element) {
      for (var i = 0; i < element.length - 1; i++) {
        // console.log('i=' + element[i])
        for (var j = 0; j < element.length - i - 1; j++) {
          // console.log('j=' + element[j])
          // console.log('j+1=' + element[j + 1])
          if (element[j] < element[j + 1]) {
            //把小的数字放到后面
            var swap = element[j]
            element[j] = element[j + 1]
            element[j + 1] = swap
          }
        }
      }
      return element
    },

    findAllEchartsRight() {
      pythonPOST1('/python/RollEvaluateMachineNo/', {
        grind_starttime: this.moxueTime_1[0],
        grind_endtime: this.moxueTime_1[1]
      }).then(res => {
        let data = []
        if (res.code == 200) {
          res.data.forEach(item => {
            data.push(JSON.parse(item))
          })
          data[0].reverse() // 反转
          data[1].reverse() // 反转
          data[2].reverse() // 反转
          data[3].reverse() // 反转

          this.echartsArrayRight[0].pieSeries[0].data = [
            data[0][0].value.toFixed(2),
            data[0][1].value.toFixed(2),
            data[0][2].value.toFixed(2),
            data[0][3].value.toFixed(2)
          ]
          this.echartsArrayRight[1].pieSeries[0].data = [
            data[1][0].value.toFixed(2),
            data[1][1].value.toFixed(2),
            data[1][2].value.toFixed(2),
            data[1][3].value.toFixed(2)
          ]
          this.echartsArrayRight[2].pieSeries[0].data = [
            data[2][0].value.toFixed(2),
            data[2][1].value.toFixed(2),
            data[2][2].value.toFixed(2),
            data[2][3].value.toFixed(2)
          ]
          this.echartsArrayRight[3].pieSeries[0].data = [
            data[3][0].value.toFixed(2),
            data[3][1].value.toFixed(2),
            data[3][2].value.toFixed(2),
            data[3][3].value.toFixed(2)
          ]
        } else {
          this.echartsArrayRight[0].pieSeries[0].data = []
          this.echartsArrayRight[1].pieSeries[0].data = []
          this.echartsArrayRight[2].pieSeries[0].data = []
          this.echartsArrayRight[3].pieSeries[0].data = []
        }
      })
    },

    // 立体柱状图
    gongEcharts() {
      const data = [220, 182, 191, 234, 290, 330, 310]
      const sideData = data.map(item => item + 4.5)
      var optionRight = {
        backgroundColor: '#1A367A',
        tooltip: {
          trigger: 'axis',
          formatter: '{b} : {c}',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          //坐标轴
          axisLine: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          //坐标值标注
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          //坐标轴
          axisLine: {
            show: false
          },
          //坐标值标注
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          //分格线
          splitLine: {
            lineStyle: {
              color: '#4784e8'
            }
          }
        },
        series: [
          {
            name: 'a',
            tooltip: {
              show: true
            },
            type: 'bar',
            barWidth: 24.5,
            itemStyle: {
              normal: {
                color: new Echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: '#0B4EC3' // 0% 处的颜色
                    },
                    {
                      offset: 0.6,
                      color: '#138CEB' // 60% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#17AAFE' // 100% 处的颜色
                    }
                  ],
                  false
                ),
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: {
                    //数值样式
                    color: 'white',
                    fontSize: 12
                  }
                }
              }
            },
            data: data,
            barGap: 0
          },
          {
            type: 'bar',
            barWidth: 8,
            itemStyle: {
              normal: {
                color: new Echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: '#09337C' // 0% 处的颜色
                    },
                    {
                      offset: 0.6,
                      color: '#0761C0' // 60% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#0575DE' // 100% 处的颜色
                    }
                  ],
                  false
                )
              }
            },
            tooltip: {
              show: false
            },
            barGap: 0,
            data: sideData
          },
          {
            name: 'b',
            tooltip: {
              show: false
            },
            type: 'pictorialBar',
            itemStyle: {
              borderWidth: 1,
              borderColor: '#0571D5',
              color: '#1779E0'
            },
            symbol: 'path://M 0,0 l 120,0 l -30,60 l -120,0 z',
            symbolSize: ['30', '12'],
            symbolOffset: ['0', '-11'],
            //symbolRotate: -5,
            symbolPosition: 'end',
            data: data,
            z: 3
          }
        ]
      }
      var myChart1 = Echarts.init(document.getElementById('app1'), 'light') //将配置注入到html中定义的容器
      myChart1.setOption(optionRight)
      window.onresize = function() {
        myChart1.resize()
      }
    }
  }
}
</script>

<style lang="less">
.tssss1 {
  width: 40px;
  height: 40px;
  background: url('../../../assets/img/qqqq.png') no-repeat;
  background-size: 100% 75%;
  text-align: center;
  padding-top: 59px;
  cursor: pointer;
  color: #fcce1f;
  letter-spacing: 1px;
}
.setClassname {
  color: #fcce1f !important;
}
</style>
