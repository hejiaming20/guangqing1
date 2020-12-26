<!--
 * @Author: your name
 * @Date: 2020-07-23 09:57:34
 * @LastEditTime: 2020-11-29 14:44:48
 * @LastEditors: Please set LastEditors
 * @Description: 辅材仓库管理页面
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\am.vue
-->
<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :table-height="'calc(100vh - 575px)'"
      :total="total"
      :page-size="pageSize"
      :current-page="pageIndex"
      :row-class-name="setRowColor"
      index-type="index"
      @row-click="cellClick"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <template slot="TableHead">
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
                    label="辊号"
                    prop="roll_no">
                    <el-input v-model="searchInfo.roll_no" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="工作层"
                    prop="work_layer">
                    <el-input v-model="searchInfo.work_layer" />
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
                        v-for="item in option1"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="轧辊状态"
                    prop="roll_state">
                    <el-select
                      v-model="searchInfo.roll_state"
                      placeholder="请选择">
                      <el-option
                        v-for="item in option2"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"/>
                    </el-select>
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
          min-width="70px"
          label="辊号"
          align="center"/>
        <el-table-column
          min-width="90px"
          prop="roll_type"
          label="轧辊类型"
          align="center"/>
        <el-table-column
          prop="material"
          label="轧辊材质"
          min-width="90px"
          align="center"/>
        <el-table-column
          prop="frame_no"
          label="机架号"
          min-width="90px"
          align="center"/>
        <el-table-column
          prop="roll_state_value"
          label="轧辊状态"
          min-width="90px"
          align="center"/>
        <el-table-column
          prop="roll_special_value"
          label="特殊状态"
          min-width="90px"
          align="center"/>
      </template>
    </Table-easy>
    <!--//第二表-->
    <Table-easy
      :table-data="tableData1"
      :total="total1"
      :table-height="315"
      :table-head="false"
      :current-page="pageIndex1"
      :page-size="pageSize1"
      index-type="index"
      style="margin-top: 5px"
      @handle-current-change="handleCurrentChange1"
      @handle-size-change="handleSizeChange1"
    >
      <template slot="TableBody">
        <el-table-column
          prop="roll_no"
          label="辊号"
          min-width="85px"
          align="center"/>
        <el-table-column
          prop="frame_no"
          label="机架号"
          min-width="85px"
          align="center"/>


        <el-table-column
          prop="grind_endtime"
          label="磨削结束时间"
          min-width="155px"
          align="center"/>
        <el-table-column
          label="磨削开始时间"
          min-width="155px"
          prop="grind_starttime"
          align="center"/>








        <el-table-column
          prop="onlinetime"
          label="上机时间"
          min-width="155px"
          align="center"/>
        <el-table-column
          label="下机时间"
          min-width="155px"
          prop="offlinetime"
          align="center"/>
        <el-table-column
          prop="off_line_reason"
          align="center"
          min-width="150px"
          label="下线原因"/>
        <el-table-column
          prop="uplinecount"
          min-width="120px"
          align="center"
          label="累积上机次数"/>
        <el-table-column
          prop="rollkilometer"
          min-width="120px"
          align="center"
          label="轧制公里数"/>
        <el-table-column
          prop="rolltonnage"
          min-width="110px"
          align="center"
          label="轧制吨数"/>
        <el-table-column
          prop="lasttime_after_diameter"
          min-width="130px"
          align="center"
          label="上一次磨后直径"/>
        <el-table-column
          prop="before_diameter"
          align="center"
          min-width="100px"
          label="磨前直径"/>
        <el-table-column
          prop="after_diameter"
          align="center"
          min-width="100px"
          label="磨后直径"/>
        <el-table-column
          prop="online_wear"
          align="center"
          width="100px"
          label="在线磨损量"/>
        <el-table-column
          prop="count_weartimes"
          width="100px"
          align="center"
          label="磨削次数"/>
        <el-table-column
          prop="first_wear"
          width="100px"
          align="center"
          label="一次磨削量"/>
        <el-table-column
          prop="second_wear"
          width="100px"
          align="center"
          label="二次磨削量"/>
        <el-table-column
          label="磨削总量"
          align="center"
          prop="wear"
          width="95px"/>
        <el-table-column
          label="是否为超磨辊"
          prop="if_power"
          align="center"
          min-width="120px"/>
        <el-table-column
          prop="residual_thickness"
          width="130px"
          align="center"
          label="剩余工作层直径"/>
        <el-table-column
          prop="deviation"
          align="center"
          width="100px"
          label="辊形偏差"/>
        <el-table-column
          prop="taper"
          width="100px"
          align="center"
          label="锥度"/>
        <el-table-column
          prop="roundness"
          width="100px"
          align="center"
          label="圆度"/>
        <el-table-column
          prop="crack"
          width="100px"
          align="center"
          label="裂纹"/>
        <el-table-column
          prop="hidden_flaws"
          width="100px"
          align="center"
          label="暗伤"/>
        <el-table-column
          prop="qualifiednum"
          width="100px"
          align="center"
          label="合格点数"/>
        <el-table-column
          prop="wheel_dia_start"
          min-width="130px"
          align="center"
          label="砂轮开始直径"/>
        <el-table-column
          prop="wheel_dia_end"
          min-width="130px"
          align="center"
          label="砂轮结束直径"/>
      </template>
    </Table-easy>
    <!-- <el-row :gutter="10">
      <el-col :span="24">
        <div
          id="chartLeft"
          class="Echar-bg"
          style="margin-top: 10px;padding-bottom: 5px;height: 370px"/>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import { rollInformation, kucunlist, rolltypelist } from '@/api/pinClipBoard' //查询接口
import getDataConfig from '../../../lib/Util'
import Echarts from 'echarts'
import { get, post } from '@/lib/Util'
export default {
  components: {
    TableEasy
  },
  data() {
    return {
      names: '',
      form: '',
      formLabelAlign: {},
      formLabelAlign_1: {},
      seadata: {},
      tableData1: [],
      option1: [],
      option2: [],
      infoTableData: [],
      searchInfo: {
        roll_state: '3'
      },
      tableData: [],
      columnsArray: [],
      total1: 0,
      pageIndex: 1,
      pageSize: 10,
      pageIndex1: 1,
      pageSize1: 10,
      total: 0,
      isIndeterminate: true,
      rowIndex: '',
      echartTable: [
        {
          name: '第一次上机',
          children: [
            {
              name: '第二次上机',
              children: [
                {
                  name: '第三次上机',
                  children: [
                    {
                      name: '第四次上机',
                      children: [
                        {
                          name: '第五次上机'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  mounted() {
    post('/dictionary/findMapV1', { dicno: 'rollstate' }).then(res => {
      this.option2 = res.data //轧辊状态
      // this.searchInfo.material_id = this.option2[4].key
    })
    this.findOption()
    this.findAll()
    // this.echartOption()
  },
  methods: {
    echartOption() {
      var optionLeft = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            id: 0,
            name: 'tree1',
            data: this.echartTable,
            top: '10%',
            left: '3%',
            bottom: '80%',
            right: '8%',
            symbolSize: 30,
            edgeShape: 'polyline',
            initialTreeDepth: 5,
            lineStyle: {
              width: 25,
              color: '#7ed6e6'
            },
            label: {
              backgroundColor: '#333333',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              offset: [0, 100],
              position: 'bottom',
              verticalAlign: 'middle',
              align: 'center',
              textStyle: {
                color: '#eae8c5' //字体颜色
              },
              formatter: [
                '{a|上机时长}',
                '{a|下线原因}',
                '{a|累积上机次数}',
                '{a|轧制公里数}',
                '{a|轧制吨数}',
                '{a|在线磨损量}',
                '{a|磨削次数}',
                '{a|磨削总量}',
                '{a|剩余工作层直径}',
                '{a|辊形偏差}',
                '{a|合格点数}'
              ].join('\n'),

              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center'
                }
              }
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      }
      var myChart = Echarts.init(document.getElementById('chartLeft'), 'light') //将配置注入到html中定义的容器
      myChart.setOption(optionLeft)
      window.onresize = function() {
        myChart.resize()
      }
    },
    //轧辊类型-下拉框数据
    findOption() {
      post(rolltypelist, {
        dicno: 'rolltype'
      }).then(res => {
        this.option1 = res.data
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
    //分页之对应页
    handleCurrentChange1(val) {
      this.pageIndex1 = val
      this.findAll_1()
    },
    //分页之一页多少条
    handleSizeChange1(val) {
      this.pageSize1 = val
      this.findAll_1()
    },
    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },
    setRowColor({ row, rowIndex }) {
      if (row.roll_no == this.rowIndex) {
        return 'setTable-row-class-name'
      }
    },
    //查询接口
    findAll() {
      post('/rollInformation/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      }).then(res => {
        if (res.status == 2000) {
          this.tableData = res.data
          this.total = res.count
          this.cellClick(res.data[0])
        }
      })
    },
    findAll_1() {
      post('/rollWear/findByPage', {
        pageIndex: this.pageIndex1,
        pageSize: this.pageSize1,
        condition: this.seadata
      }).then(res => {
        res.data.forEach((val, index, arr) => {
          val.if_power = val.if_power == 1 ? '是' : '否'
        })
        this.tableData1 = res.data
        this.total1 = res.count
      })
    },
    // 轧辊基本信息表点击事件
    cellClick(val, column) {
      this.rowIndex = val.roll_no
      this.seadata = {
        roll_no: val.roll_no
      }
      this.pageIndex1 = 1
      this.findAll_1()
    },
    resetForm(formName) {
      this.searchInfo = {}
      this.findAll()
    }
  }
}
</script>

<style>
.column-search {
  margin-left: 20px;
}
.rollInfo {
  height: 28px;
  width: 100%;
  background-color: #253f80;
  padding-left: 0px;
  color: #eae8c5;
  line-height: 28px;
  font-size: 14px;
  font-weight: bold;
}
</style>
