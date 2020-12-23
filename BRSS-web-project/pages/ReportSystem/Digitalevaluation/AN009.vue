<template>
  <div>
    <div>
      <Table-easy
        :table-data="tableData"
        :total="total"
        :page-size="pageSize"
        :current-page="pageIndex"
        index-type="index"
        @handle-current-change="handleCurrentChange"
        @handle-size-change="handleSizeChange">
        <template slot="TableHead">
          <div class="layout-search">
            <el-row>
              <el-col :span="20">
                <el-form
                  ref="ruleForm"
                  :model="searchInfo"
                  class="search-info"
                  label-width="80px">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item
                        label="开始时间"
                        prop="dbegin">
                        <el-date-picker
                          v-model="searchInfo.dbegin"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="datetime"
                          placeholder="开始时间"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
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
                    <el-col :span="6">
                      <el-form-item
                        label="机架"
                        prop="frame_noid">
                        <el-select
                          v-model="searchInfo.frame_noid"
                          placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
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
                  </el-row>
                </el-form>
              </el-col>
              <el-col
                :span="4">
                <div class="btn">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="findSearch()">查询
                  </el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="resetFormTop('ruleForm')">重置
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </template>
        <template slot="TableBody">
          <el-table-column
            label="操作"
            min-width="80px"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="detail(scope.row)">详情</el-button>
                <!-- <el-button
                  size="mini"
                  type="primary"
                  @click="detail_1(scope.row)">修改</el-button> -->
                <!-- <el-button
                size="mini"
                @click="dialogVisible = true">详情</el-button>-->
            </template>
          </el-table-column>
          <!--  <el-table-column
            prop="roll_no"
            label="辊号"/>-->
          <el-table-column
            :show-overflow-tooltip="true"
            :formatter="dataFormat"
            prop="recordtime"
            min-width="160px"
            label="测试时间"/>
          <el-table-column
            prop="production_line"
            label="产线"/>
          <!--  <el-table-column
            prop="factory"
            label="供应商"/>
          <el-table-column
            prop="material"
            label="材质"/>
          <el-table-column
            prop="roll_typeid"
            min-width="100px"
            label="轧辊类型ID"/>
          <el-table-column
            prop="roll_type"
            min-width="100px"
            label="轧辊类型"/>
          <el-table-column
            prop="frame_noid"
            label="机架号ID"/>-->
          <el-table-column
            prop="frame_no"
            label="机架号"/>
          <el-table-column
            prop="w_no"
            min-width="150"
            label="工作辊辊号(上/下)"/>
          <el-table-column
            prop="bearingchock_no"
            min-width="180px"
            label="工作辊轴承座号"/>
          <el-table-column
            prop="b_no"
            min-width="120px"
            label="支撑辊辊号"/>
          <el-table-column
            prop="updownstep"
            min-width="130px"
            label="上/下阶梯垫位置"/>
          <el-table-column
            prop="itotal"
            label="总分"/>
          <el-table-column
            prop="retention"
            min-width="130px"
            label="刚度保持率(%)"/>
          <el-table-column
            prop="retention_score"
            min-width="130px"
            label="刚度保持率得分"/>
          <el-table-column
            prop="leveling"
            min-width="120px"
            label="调平值(mm)"/>
          <el-table-column
            prop="leveling_score"
            min-width="120px"
            label="调平值得分"/>
          <el-table-column
            prop="bothsides_stiffness"
            min-width="170px"
            label="两侧刚度偏差(KN/mm)"/>
          <el-table-column
            prop="bothsides_stiffness_score"
            min-width="150px"
            label="两侧刚度偏差得分"/>
          <el-table-column
            prop="bothposition_stiffness"
            min-width="150px"
            label="两侧位置偏差(mm)"/>
          <el-table-column
            prop="bothposition_stiffness_score"
            min-width="150px"
            label="两侧位置偏差得分"/>
          <el-table-column
            prop="osposition"
            min-width="140px"
            label="OS位置偏差(mm)"/>
          <el-table-column
            prop="osposition_score"
            min-width="150px"
            label="OS位置偏差得分"/>
          <el-table-column
            prop="dsposition"
            min-width="140px"
            label="DS位置偏差(mm)"/>
          <el-table-column
            prop="dsposition_score"
            min-width="150px"
            label="DS位置偏差得分"/>
          <el-table-column
            prop="rolling_force"
            min-width="150px"
            label="轧制力偏差(KN)"/>
          <el-table-column
            prop="rolling_force_score"
            min-width="150px"
            label="轧制力偏差得分"/>
          <el-table-column
            prop="osrollgap"
            min-width="140px"
            label="OS辊缝偏差(mm)"/>
          <el-table-column
            prop="osrollgap_score"
            min-width="140px"
            label="OS辊缝偏差得分"/>
          <el-table-column
            prop="dsrollgap"
            min-width="140px"
            label="DS辊缝偏差(mm)"/>
          <el-table-column
            prop="dsrollgap_score"
            min-width="140px"
            label="DS辊缝偏差得分"/>
          <el-table-column
            prop="evaluation"
            min-width="150px"
            label="轧机刚度评价"/>

        </template>
      </Table-easy>
    </div>
    <!-- 图表查询条件 -->
    <div
      class="layout-search"
      style="margin: 5px 0;padding-top: 10px; padding-right: 10px">
      <el-row>
        <el-col :span="20">
          <el-form
            ref="ruleFormBL"
            :inline="true"
            :model="searchInfo1"
            label-width="80px"
            class="search-info">
            <el-form-item
              label="机架"
              prop="frame_noid">
              <el-select
                v-model="searchInfo1.frame_noid"
                placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key" />
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
                  :value="item.key"/>
              </el-select>
            </el-form-item>

            <el-form-item
              label="开始时间"
              prop="dbegin">
              <el-date-picker
                v-model="searchInfo1.dbegin"
                :picker-options="pickOption"
                :clearable="false"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="开始时间"/>
            </el-form-item>
            <el-form-item
              label="结束时间"
              prop="dend">
              <el-date-picker
                v-model="searchInfo1.dend"
                :picker-options="pickOption"
                :clearable="false"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="结束时间"/>
            </el-form-item>

          </el-form>
        </el-col>
        <el-col :span="4">
          <div class="btn">
            <el-button
              type="primary"
              size="mini"
              @click="findEcharts()">查询</el-button>
              <!-- <el-button
                  type="primary"
                  size="mini"
                  @click="resetFormLeft('ruleFormBL')">重置</el-button> -->
          </div>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="5">
      <!--左1-->
      <el-col :span="12">
        <div class="layout-search">
          <div class="c_table-title">工作辊-支撑辊多变异图分析</div>
          <div
            id="app"
            class="Echar-bg"/>
        </div>
      </el-col>
      <!--右1-->
      <el-col :span="12">
        <div class="layout-search">
          <div class="c_table-title">工作辊-阶梯位多变异图分析</div>
          <div
            id="app1"
            class="Echar-bg"/>
        </div>
      </el-col>
    </el-row>

    <el-dialog
      :visible.sync="dialogVisible_watch"
      title="详情"
      class="layout-dialog"
      width="80%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlign"
          label-width="130px">
          <el-row>
            <el-col :span="6">
              <el-form-item
                label="机架号"
                prop="frame_no">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.frame_no" />
              </el-form-item>
              <el-form-item
                label="刚度保持率(%)"
                prop="retention">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.retention" />
              </el-form-item>
              <el-form-item
                :disabled="true"
                label="调平值(mm)"
                prop="leveling">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.leveling" />
              </el-form-item>
              <el-form-item
                label="两侧刚度偏差(KN/mm)"
                prop="bothsides_stiffness">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.bothsides_stiffness" />
              </el-form-item>
              <el-form-item
                label="两侧位置偏差(mm)"
                prop="bothposition_stiffness">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.bothposition_stiffness" />
              </el-form-item>
              <el-form-item
                label="OS位置偏差(mm)"
                prop="osposition">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.osposition" />
              </el-form-item>
              <el-form-item
                label="DS位置偏差(mm)"
                prop="dsposition">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.dsposition" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="轧制力偏差(KN)"
                prop="rolling_force">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.rolling_force" />
              </el-form-item>
              <el-form-item
                label="OS辊缝偏差(mm)"
                prop="osrollgap">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.osrollgap" />
              </el-form-item>
              <el-form-item
                label="DS辊缝偏差(mm)"
                prop="dsrollgap">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.dsrollgap" />
              </el-form-item>
              <el-form-item
                label="测试时间"
                prop="recordtime">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.recordtime" />
              </el-form-item>
              <el-form-item
                label="产线"
                prop="production_line">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.production_line" />
              </el-form-item>



              <el-form-item
                label="LC--OS侧刚度"
                prop="lcosstiffness">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.lcosstiffness" />
              </el-form-item>
              <el-form-item
                label="LC--DS侧刚度"
                prop="lcdsstiffness">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.lcdsstiffness" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="PT--OS侧刚度"
                prop="ptosstiffness">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.ptosstiffness" />
              </el-form-item>
              <el-form-item
                label="PT--DS侧刚度"
                prop="ptdsstiffness">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.ptdsstiffness" />
              </el-form-item>

              <el-form-item
                label="OS入口位置"
                prop="osenposition">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.osenposition" />
              </el-form-item>
              <el-form-item
                label="OS出口位置"
                prop="osexposition">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.osexposition" />
              </el-form-item>
              <el-form-item
                label="DS入口位置"
                prop="dsenposition">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.dsenposition" />
              </el-form-item>
              <el-form-item
                label="DS出口位置"
                prop="dsexposition">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.dsexposition" />
              </el-form-item>
            </el-col>
            <el-col :span="6">


              <el-form-item
                label="LC--OS侧轧制力"
                prop="lcosforce">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.lcosforce" />
              </el-form-item>
              <el-form-item
                label="LC--DS侧轧制力"
                prop="lcdsforce">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.lcdsforce" />
              </el-form-item>
              <el-form-item
                label="PT--OS侧轧制力"
                prop="ptosforce">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.ptosforce" />
              </el-form-item>
              <el-form-item
                label="PT--DS侧轧制力"
                prop="ptdsforce">
                <el-input
                  :disabled="true"
                  v-model="formLabelAlign.ptdsforce" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          @click="dialogVisible_watch = false">取 消</el-button>
          <!--<el-button
          type="primary"
          @click="handleSave">确 定</el-button>-->
      </span>
    </el-dialog>
    <!--修改-->
    <el-dialog
      :visible.sync="dialogVisible_watch_1"
      title="修改"
      class="layout-dialog"
      width="80%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlign_1"
          label-width="150px">
          <el-row>
            <el-col :span="6">
              <el-form-item
                label="上/下阶梯垫位置"
                prop="updownstep">
                <el-input
                  v-model="formLabelAlign_1.updownstep" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="工作辊辊号(上/下)"
                prop="w_no">
                <el-input
                  v-model="formLabelAlign_1.w_no" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="工作辊轴承座号(上OS-上DS/下OS-下DS)"
                prop="bearingchock_no">
                <el-input
                  v-model="formLabelAlign_1.bearingchock_no" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="支撑辊辊号"
                prop="b_no">
                <el-input
                  v-model="formLabelAlign_1.b_no" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          @click="dialogVisible_watch_1 = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get, post } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
import moment from 'moment'
import Echarts from 'echarts'
export default {
  components: { TableEasy },
  data() {
    return {
      pickOption: {
        disabledDate: function(time) {
          return time.getTime() > new Date().getTime()
        }
      },
      pageIndex: 1,
      pageSize: 10,
      searchInfo: {
        dbegin: '',
        dend: '',
        frame_noid: ''
      },
      tableData: [],
      total: 0,
      searchInfo1: {
        dbegin: '',
        dend: '',
        frame_noid: '',
        production_line_id: ''
      },
      options: [],
      option: [],
      dialogVisible_watch: false,
      dialogVisible_watch_1: false,
      formLabelAlign: {},
      formLabelAlign_1: {
        indocno: 1, //当前修改项的主键
        updownstep: '', //上/下阶梯垫位置
        w_no: '', //工作辊辊号(上/下)
        bearingchock_no: 1, //工作辊轴承座号(上OS-上DS/下OS-下DS)
        b_no: 1 //支撑辊辊号
      }
    }
  },
  mounted() {
    this.searchInfo.dbegin = moment()
      .subtract(29, 'days')
      .format('YYYY-MM-DD HH:mm:ss')
    // value-format="yyyy-MM-dd HH:mm:ss"
    this.searchInfo.dend = moment().format('YYYY-MM-DD HH:mm:ss')
    this.searchInfo1.dbegin = moment()
      .subtract(29, 'days')
      .format('YYYY-MM-DD HH:mm:ss')
    this.searchInfo1.dend = moment().format('YYYY-MM-DD HH:mm:ss')

    post('/dictionary/findMapV1', { dicno: 'frameteam' }).then(res => {
      this.options = res.data
    })
    post('/dictionary/findMapV1', { dicno: 'proline' }).then(res => {
      this.option = res.data
    })
    this.findAll()
    this.findAll_1()
    this.findAll_2()
  },
  methods: {
    // 时间格式化
    dataFormat: function(row, column) {
      let data = row[column.property]
      if (data === null) {
        return ''
      }
      let dt = new Date(data)
      return (
        dt.getFullYear() +
        '-' +
        (dt.getMonth() + 1) +
        '-' +
        dt.getDate() +
        ' ' +
        dt.getHours() +
        ':' +
        dt.getMinutes() +
        ':' +
        dt.getSeconds()
      )
    },
    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },
    findAll() {
      if (this.searchInfo.frame_noid == '机架3') {
        this.searchInfo.frame_noid = '3'
      }

      post('/rollStiffness/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      }).then(res => {
        this.tableData = res.data
        this.total = res.count
      })
    },
    findEcharts() {
      this.findAll_1()
      this.findAll_2()
    },
    async findAll_1() {
      //左边表
      let res = await post('/rollStiffness/findEchartsB', {
        condition: {
          dbegin: this.searchInfo1.dbegin,
          dend: this.searchInfo1.dend,
          frame_noid: this.searchInfo1.frame_noid,
          production_line_id: this.searchInfo1.production_line_id,
          project: 10,
          pic: 1
        }
      })
      this.echart_go_1(res.data)
    },
    findAll_2() {
      //右边表
      post('/rollStiffness/findEchartsB', {
        condition: {
          dbegin: this.searchInfo1.dbegin,
          dend: this.searchInfo1.dend,
          frame_noid: this.searchInfo1.frame_noid,
          production_line_id: this.searchInfo1.production_line_id,
          project: 10,
          pic: 2
        }
      }).then(res => {
        let data2 = res
        this.echart_go_2(res.data)
      })
    },
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
    resetFormTop(formName) {
      this.searchInfo = {}
      this.findAll()
    },

    echart_go_1(datas) {
      var myChart = Echarts.init(document.getElementById('app'), 'light') //将配置注入到html中定义的容器
      myChart.clear()
      var x_data = [] //x轴支撑辊
      x_data = datas.catalog

      var series = []
      var legend_data = []
      for (var i = 0; datas.series.length > i; i++) {
        var pian_data = 10 * i + '%'

        legend_data.push(datas.series[i].name)
        var name = datas.series[i].name
        var data = datas.series[i].data
        series.push({
          xAxisIndex: 0,
          name: name,
          data: data,
          symbol: 'circle', //折点设定为实心点
          symbolSize: 7, //设定实心点的大小
          symbolOffset: [pian_data, 0],
          itemStyle: {
            normal: {
              // color: 'yellow',
              lineStyle: {
                color: 'white'
              }
            }
          },
          type: 'scatter'
        })
      }

      //var myChart = Echarts.init(document.getElementById('app'), 'light') //将配置注入到html中定义的容器
      var option = {
        tooltip: {
          trigger: 'axis'
        }, //联动
        legend: {
          textStyle: {
            color: '#eae8c5' //字体颜色
          },
          data: legend_data, //对应工作辊
          type: 'scroll'
        },
        xAxis: [
          {
            axisLine: {
              lineStyle: {
                color: '#eae8c5' //坐标线颜色
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 30
            },
            type: 'category',
            name: '支撑辊',
            data: x_data //x轴x_data  ['支撑辊1', '支撑辊2', '支撑辊3']
          }
        ],
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#eae8c5' //坐标线颜色
            }
          },
          type: 'value',
          name: '工作辊'
        },
        series: series,
        grid: {
          left: 50
        }
      }
      myChart.setOption(option)
      window.onresize = function() {
        myChart.resize()
      }
    },
    echart_go_2(datas) {
      var x_data = [] //x轴号位
      x_data = datas.catalog

      var series = []
      var legend_data = []
      for (var i = 0; datas.series.length > i; i++) {
        legend_data.push(datas.series[i].name)
        var name = datas.series[i].name
        var data = datas.series[i].data
        series.push({
          xAxisIndex: 0,
          name: name,
          data: data,
          symbol: 'circle', //折点设定为实心点
          symbolSize: 500, //折线点的大小
          itemStyle: {
            normal: {
              // color: 'yellow',
              lineStyle: {
                color: 'white'
              }
            }
          },
          type: 'line'
        })
      }

      var myChart = Echarts.init(document.getElementById('app1'), 'light') //将配置注入到html中定义的容器
      var option = {
        tooltip: {
          trigger: 'axis'
        }, //联动
        legend: {
          textStyle: {
            color: '#eae8c5' //字体颜色
          },
          data: legend_data, //对应工作辊
          type: 'scroll'
        },
        xAxis: [
          {
            axisLine: {
              lineStyle: {
                color: '#eae8c5' //坐标线颜色
              }
            },
            type: 'category',
            name: '阶梯位',
            data: x_data //x轴x_data  ['支撑辊1', '支撑辊2', '支撑辊3']
          }
        ],
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#eae8c5' //坐标线颜色
            }
          },
          type: 'value',
          name: '工作辊'
        },
        series: series,
        grid: {
          left: 50
        }
      }
      myChart.setOption(option)
      window.onresize = function() {
        myChart.resize()
      }
    },
    //详情
    detail(val) {
      this.formLabelAlign = val
      this.dialogVisible_watch = true
    },
    //修改
    detail_1(val) {
      this.formLabelAlign_1 = val
      this.dialogVisible_watch_1 = true
    },
    async handleSave() {
      var res = await post('/rollStiffness/update', {
        rollStiffness: this.formLabelAlign_1
      }) // 更新完成提示
      this.dialogVisible_watch_1 = false
      this.findAll()
    }
  }
}
</script>
