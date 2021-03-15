<!--每月成本核算-->
<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :page-size="pageSize"
      :current-page="pageIndex"
      :table-height="350"
      :cell-class-name="setCellStyle"
      :is-pagination-show="false"
      :table-foot="true"
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
                  <!-- <el-form-item
                    label="辊号"
                    prop="roll_no">
                    <el-input v-model="searchInfo.roll_no" />
                  </el-form-item>-->
                  <el-form-item
                    label="料号"
                    prop="material_noid">
                    <el-select
                      v-model="searchInfo.material_noid"
                      placeholder="请选择">
                      <el-option
                        v-for="item in option_fact"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="机架范围"
                    prop="framerangeid">
                    <el-select
                      v-model="searchInfo.framerangeid"
                      placeholder="请选择">
                      <el-option
                        v-for="item in frameFwArray"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="轧辊类型"
                    prop="roll_typeid">
                    <el-select
                      v-model="searchInfo.roll_typeid"
                      placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="轧辊材质"
                    prop="material_id">
                    <el-select
                      v-model="searchInfo.material_id"
                      placeholder="请选择">
                      <el-option
                        v-for="item in option_2"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="规格"
                    prop="specifications_noid">
                    <el-select
                      v-model="searchInfo.specifications_noid"
                      placeholder="请选择">
                      <el-option
                        v-for="item in option_gui"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="开始时间"
                    prop="dbegin">
                    <el-date-picker
                      ref="userTime"
                      v-model="searchInfo.dbegin"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="开始时间"/>
                  </el-form-item>
                  <el-form-item
                    label="结束时间"
                    prop="dend">
                    <el-date-picker
                      v-model="searchInfo.dend"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="选择结束时间"/>
                  </el-form-item>
                </el-col>
                <p style="color: #d9dce5;right: -70px;top: 49px;float: right;position: absolute;background-color: #16848d">
                  吨钢消耗(kg):{{ consumption_show }}
                </p>
                <p style="color: #d9dce5;right: -229px;top: 49px;float: right;position: absolute;background-color: #8d0912">
                  吨钢成本(元):{{ cost_show }}
                </p>
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
              <el-button
                type="primary"
                size="mini"
                @click="hand_exe">导出全部
              </el-button>
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          prop="material_no"
          width="150"
          label="料号"/>
        <el-table-column
          prop="specifications_no"
          label="规格"/>
        <el-table-column
          prop="roll_type"
          label="轧辊类型"/>
        <el-table-column
          prop="material"
          label="轧辊材质"/>
        <el-table-column
          prop="framerange"
          label="机架范围"/>
        <el-table-column
          prop="usetime"
          label="开始时间"/>
        <el-table-column
          prop="unit_price"
          label="单价(元)"/>
        <el-table-column
          prop="working_layer"
          label="工作层"/>

        <el-table-column
          prop="mmnumber"
          label="毫米数(mm)"/>


        <el-table-column
          prop="weight"
          label="重量(t)">
          <template slot-scope="scope">
            <span>{{ Number(scope.row.weight).toFixed(2)==NaN? 0:Number(scope.row.weight).toFixed(2) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="money"
          label="金额(元)">
          <template slot-scope="scope">
            <span>{{ Number(scope.row.money).toFixed(2)==NaN? 0:Number(scope.row.money).toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!--   <el-table-column
          prop="weight"
          label="重量(t)"/>
        <el-table-column
          prop="money"
          label="金额(元)"/>-->
        <!-- <el-table-column
          prop="consumption"
          label="吨钢消耗"/>
        <el-table-column
          prop="cost"
          label="吨钢成本"/>-->


      </template>
    </Table-easy>
    <div class="best-classTitle">
      吨钢消耗/成本
    </div>
    <div style="height: 360px; border: 3px solid #105b8d;margin-top: 10px;padding: 10px">
      <el-col :span="24">
        <div
          id="app2_1"
          style="width:100%;height: 350px;"/>
      </el-col>
    </div>
  </div>
</template>

<script>
import { get, post, pythonPOST1, getDataConfig, exportMethod } from '@/lib/Util'
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
      pageSize: 1000,
      tableData: [],
      total: 0,
      options: [],
      frameFwArray: [],
      option_fact: [],
      option_gui: [],
      option_2: [],
      searchInfo: {
        dbegin: '',
        dend: '',
        roll_typeid: '',
        framerangeid: '',
        specifications_noid: '',
        material_id: '',
        material_noid: ''
      },
      searchInfoEchartsLight: {
        machine_no: '',
        grind_starttime: '',
        grind_endtime: ''
      },
      consumption_show: '',
      cost_show: '',
      mon_need: [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12'
      ],
      find_two_1: [
        {
          label: '1月',
          consumption: 0,
          cost: 0
        },
        {
          label: '2月',
          consumption: 0,
          cost: 0
        },
        {
          label: '3月',
          consumption: 0,
          cost: 0
        },
        {
          label: '4月',
          consumption: 0,
          cost: 0
        },
        {
          label: '5月',
          consumption: 0,
          cost: 0
        },
        {
          label: '6月',
          consumption: 0,
          cost: 0
        },
        {
          label: '7月',
          consumption: 0,
          cost: 0
        },
        {
          label: '8月',
          consumption: 0,
          cost: 0
        },
        {
          label: '9月',
          consumption: 0,
          cost: 0
        },
        {
          label: '10月',
          consumption: 0,
          cost: 0
        },
        {
          label: '11月',
          consumption: 0,
          cost: 0
        },
        {
          label: '12月',
          consumption: 0,
          cost: 0
        }
      ]
    }
  },
  created() {
    this.searchInfo.dbegin = moment()
      .subtract(30, 'days')
      .format('YYYY-MM-DD HH:mm:ss')
    this.searchInfo.dend = moment().format('YYYY-MM-DD HH:mm:ss')
    this.moxueTime_1[0] = moment()
      .subtract(30, 'days')
      .format('YYYY-MM-DD HH:mm:ss')
    this.moxueTime_1[1] = moment().format('YYYY-MM-DD HH:mm:ss')

    this.moxueTime[0] = moment()
      .subtract(30, 'days')
      .format('YYYY-MM-DD HH:mm:ss')
    this.moxueTime[1] = moment().format('YYYY-MM-DD HH:mm:ss')

    this.enter_1()
  },
  mounted() {
    this.findOptions()
    this.findAll()
  },
  methods: {
    enter_1() {
      if (process.client) {
        document.onkeydown = e => {
          let _key = window.event.keyCode
          if (_key === 13) {
            this.findSearch()
          }
        }
      }
    },
    async hand_exe() {
      let data = {
        method: 'get',
        url:
          // 'http://192.168.43.57:8778/api/rollStiffness/excel?dbegin=' +
          location.origin +
          '/api/baseCostAccountingMain/excelBaseCostAccounting?dbegin=' +
          this.searchInfo.dbegin +
          '&dend=' +
          this.searchInfo.dend +
          '&material_noid=' +
          this.searchInfo.material_noid +
          '&specifications_noid=' +
          this.searchInfo.specifications_noid +
          '&roll_typeid=' +
          this.searchInfo.roll_typeid +
          '&material_id=' +
          this.searchInfo.material_id +
          '&framerangeid=' +
          this.searchInfo.framerangeid
      }
      await exportMethod(data)
      // get(
      //   'rollStiffness/excel?dbegin=' +
      //     this.searchInfo.dbegin +
      //     '&dend=' +
      //     this.searchInfo.dend +
      //     '&production_line_id=' +
      //     this.searchInfo.production_line_id
      // ).then(res => {
      //   exportMethod(res)
      // })
    },
    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },
    findOptions() {
      getDataConfig('roll_material').then(res => {
        this.option_2 = res
      })
      getDataConfig('rolltype').then(res => {
        this.options = res
      })
      getDataConfig('framefw').then(res => {
        this.frameFwArray = res
      })
      getDataConfig('material_no').then(res => {
        this.option_fact = res
      })
      getDataConfig('specifications_no').then(res => {
        this.option_gui = res
      })
    },
    // 查询全部
    //查询接口
    findAll() {
      post('baseCostAccountingMain/findBaseCostAccounting', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      }).then(res => {
        this.tableData = res.data
        this.consumption_show = res.bean.consumption.toFixed(2)
        this.cost_show = res.bean.cost.toFixed(2)
        /*  this.tableData.splice(0, 0, {
          material_no: '吨钢消耗（kg）',
          specifications_no: res.bean.consumption,
          // specifications_no: 100,
          roll_type: '吨钢成本',
          material: res.bean.cost
          //material: 200
        })*/
        //echart图
        this.guang_find_2()
        this.total = res.count
      })
    },
    guang_find_2() {
      this.repeat_1(0, 12)
      //this.find_two_1 = []
      find_two_1: [
        {
          label: '1月',
          consumption: 0,
          cost: 0
        },
        {
          label: '2月',
          consumption: 0,
          cost: 0
        },
        {
          label: '3月',
          consumption: 0,
          cost: 0
        },
        {
          label: '4月',
          consumption: 0,
          cost: 0
        },
        {
          label: '5月',
          consumption: 0,
          cost: 0
        },
        {
          label: '6月',
          consumption: 0,
          cost: 0
        },
        {
          label: '7月',
          consumption: 0,
          cost: 0
        },
        {
          label: '8月',
          consumption: 0,
          cost: 0
        },
        {
          label: '9月',
          consumption: 0,
          cost: 0
        },
        {
          label: '10月',
          consumption: 0,
          cost: 0
        },
        {
          label: '11月',
          consumption: 0,
          cost: 0
        },
        {
          label: '12月',
          consumption: 0,
          cost: 0
        }
      ]
    },
    repeat_1(num, length) {
      post('baseCostAccountingMain/findBaseCostAccountingABigScreen', {
        condition: { dbegin: this.mon_need[num] }
      }).then(res => {
        console.log(res.bean.cost)
        this.find_two_1[num].cost = res.bean.cost
        this.find_two_1[num].consumption = res.bean.consumption
        //debugger
        if (++num < length) {
          this.repeat_1(num, length)
        } else {
          this.echart_go_er(this.find_two_1)
        }
      })
      console.log(this.find_two_1)
    },
    //吨钢消耗/成本
    echart_go_er(datas) {
      var need_x1 = []
      var need_y2 = [] //吨钢
      var need_y3 = [] //毫米轧制量
      for (var i = 0; datas.length > i; i++) {
        need_x1.push(datas[i].label)
        need_y2.push(datas[i].consumption.toFixed(2))
        need_y3.push(datas[i].cost.toFixed(2))
      }
      //吨钢消耗/成本
      var option_1 = {
        //backgroundColor: '#031245',
        textStyle: {
          color: '#c0c3cd',
          fontSize: 14
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {
              backgroundColor: '#031245'
            },
            restore: {}
          },
          iconStyle: {
            borderColor: '#c0c3cd'
          }
        },
        legend: {
          top: 10,
          itemWidth: 8,
          itemHeight: 8,
          icon: 'circle',
          left: 'center',
          padding: 0,
          color: ['#208d3a', 'red'],
          data: ['吨钢消耗', '毫米轧制量'],
          textStyle: {
            color: ['#105b8d', '#208d3a'],
            fontSize: 14,
            padding: [2, 0, 0, 0]
          }
        },
        color: [
          '#63caff',
          '#49beff',
          '#03387a',
          '#03387a',
          '#03387a',
          '#6c93ee',
          '#a9abff',
          '#f7a23f',
          '#27bae7',
          '#ff6d9d',
          '#cb79ff',
          '#f95b5a',
          '#ccaf27',
          '#38b99c',
          '#93d0ff',
          '#bd74e0',
          '#fd77da',
          '#dea700'
        ],
        grid: {
          containLabel: true,
          left: 20,
          right: 20,
          bottom: 10,
          top: 40
        },
        xAxis: {
          nameTextStyle: {
            color: '#c0c3cd',
            padding: [0, 0, -10, 0],
            fontSize: 14
          },
          axisLabel: {
            rotate: 0,
            interval: 0, //横轴信息全部显示,
            color: '#c0c3cd',
            fontSize: 14,
            interval: 0
          },
          axisTick: {
            lineStyle: {
              color: '#384267',
              width: 1
            },
            show: true
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#384267',
              width: 1,
              type: 'dashed'
            },
            show: true
          },
          /*data: [
            '0点~2点',
            '3点~5点',
            '6点~8点',
            '0点~2点',
            '3点~5点',
            '6点~8点',
            '0点~2点',
            '3点~5点'
          ],*/
          data: need_x1,
          type: 'category'
        },
        yAxis: [
          {
            name: '吨钢消耗(kg)',
            nameTextStyle: {
              color: '#c0c3cd',
              padding: [0, 0, -10, 0],
              fontSize: 14
            },
            axisLabel: {
              color: '#63caff',
              fontSize: 14
            },
            axisTick: {
              lineStyle: {
                color: '#384267',
                width: 1
              },
              show: true
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#384267',
                type: 'dashed'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#384267',
                width: 1,
                type: 'dashed'
              },
              show: true
            }
          },
          {
            type: 'value',
            name: '吨钢成本(元)',
            color: '#d3ca1b',
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              fontSize: 14,
              color: '#d3ca1b'
            }
          }
        ],
        series: [
          {
            //data: [200, 85, 112, 275, 305, 415, 741, 405],
            name: '吨钢消耗',
            data: need_y2,
            yAxisIndex: 0,
            type: 'bar',
            barMaxWidth: 'auto',
            barWidth: 30,
            itemStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: 'linear',
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: '#0b9eff'
                  },
                  {
                    offset: 1,
                    color: '#63caff'
                  }
                ]
              }
            },
            label: {
              show: true,
              position: 'top',
              distance: 0,
              color: '#63caff'
            }
          },
          {
            name: '吨钢消耗',
            yAxisIndex: 0,
            data: [1, 1, 1, 1, 1, 1, 1, 1],
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbol: 'diamond',
            symbolOffset: [0, '50%'],
            symbolSize: [30, 15]
          },
          {
            name: '吨钢消耗',
            yAxisIndex: 0,
            // data: [200, 85, 112, 275, 305, 415, 741, 405],
            data: need_y2,
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbolPosition: 'end',
            symbol: 'diamond',
            symbolOffset: [0, '-50%'],
            symbolSize: [30, 12],
            zlevel: 2
          },
          {
            name: '吨钢消耗',
            yAxisIndex: 0,
            data: [1, 1, 1, 1, 1, 1, 1, 1],
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbol: 'diamond',
            symbolOffset: [0, '50%'],
            symbolSize: [30, 15],
            zlevel: -2
          },
          {
            name: '毫米轧制量',
            type: 'line',
            yAxisIndex: 1,
            data: need_y3,
            label: {
              show: true,
              position: 'top',
              distance: 20,
              color: '#d3ca1b'
            },
            /* itemStyle: { normal: { label: { show: true } } }*/
            itemStyle: {
              normal: {
                color: '#d3ca1b', //折线点的颜色
                lineStyle: {
                  color: '#d3ca1b' //折线的颜色
                }
              }
            }
          }
        ],
        tooltip: {
          trigger: 'axis',
          show: false
        }
      }
      var myChart2_1 = Echarts.init(
        document.getElementById('app2_1'),
        'default'
      ) //将配置注入到html中定义的容器
      myChart2_1.setOption(option_1)
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
        dbegin: '',
        dend: '',
        roll_typeid: '',
        framerangeid: '',
        specifications_noid: '',
        material_id: '',
        material_noid: ''
      }
      this.searchInfo.dbegin = moment()
        .subtract(30, 'days')
        .format('YYYY-MM-DD HH:mm:ss')
      this.searchInfo.dend = moment().format('YYYY-MM-DD HH:mm:ss')
      this.findAll()
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
