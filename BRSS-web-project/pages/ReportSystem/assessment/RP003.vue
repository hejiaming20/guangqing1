<!--设备稼动率报表-->
<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :page-size="pageSize"
      :current-page="pageIndex"
      :table-height="650"
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
              label-width="90px">
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="磨床号"
                    prop="machine_no">
                    <el-select
                      v-model="searchInfo.machine_no"
                      placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.key"
                        :label="item.value"
                        :value="Number(item.key)"/>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item
                    label="操作人名称"
                    prop="operator">
                    <el-input v-model="searchInfo.operator" />
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
                </el-col>
                <el-col :span="6">
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
          prop="machineno"
          width="150"
          label="磨床号"/>
        <el-table-column
          prop="grind_starttime"
          label="磨削开始时间"/>
        <el-table-column
          prop="operator"
          label="操作人"/>
        <el-table-column
          prop="fwnum"
          label="1-4工作辊"/>
        <el-table-column
          prop="gwnum"
          label="5-8工作辊"/>
        <el-table-column
          prop="rnum"
          label="支撑辊"/>
        <el-table-column
          prop="rwnum"
          label="粗轧支撑辊"/>
        <el-table-column
          prop="othernum"
          label="其他辊"/>
        <el-table-column
          prop="rates"
          label="嫁动率"/>
        <el-table-column
          prop="grinding_time"
          label="磨削时长(min)"/>
        <el-table-column
          prop="sclass"
          label="班"/>
        <el-table-column
          prop="sgroup"
          label="班组"/>

      </template>
    </Table-easy>
    <div
      class="layout-default-margin"
      style="margin-top: 20px">
      <table
        border="1"
        class="el-table "
      >
        <colgroup>
          <col
            span="19"
            class="u-table-span">
        </colgroup>
        <thead>
          <tr class="u-table-head">
            <th colspan="2">轧辊支数</th>
            <th colspan="2">磨辊总时间</th>
            <th colspan="2">设备稼动率</th>
            <th colspan="2">平均每支辊用时</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="color: red"> 最多 </td>
            <td> 最少 </td>
            <td style="color: red"> 最多 </td>
            <td> 最少 </td>
            <td style="color: red"> 最高 </td>
            <td> 最低 </td>
            <td style="color: red"> 最少 </td>
            <td> 最多 </td>
          </tr>
          <tr>
            <td> {{ maxtotalnum_1 }} </td>
            <td> {{ mintotalnum_1 }} </td>
            <td> {{ maxgrinding_timetotalnum_1 }} </td>
            <td> {{ mingrinding_timetotalnum_1 }} </td>
            <td> {{ maxrates_1 }} </td>
            <td> {{ minrates_1 }} </td>
            <td> {{ mintotalavgnum_1 }} </td>
            <td> {{ maxtotalavgnum_1 }} </td>
          </tr>
        </tbody>
      </table>
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
      searchInfo: {
        dbegin: '',
        dend: '',
        machine_no: '',
        operator: ''
      },
      searchInfoEchartsLight: {
        machine_no: '',
        grind_starttime: '',
        grind_endtime: ''
      },
      machineArray: [],
      maxtotalnum_1: '', //磨辊总支数 最多
      mintotalnum_1: '', //磨辊总支数 最少
      maxgrinding_timetotalnum_1: '', //磨辊总时间 最多
      mingrinding_timetotalnum_1: '', //磨辊总时间 最少
      maxrates_1: '', //设备稼动率 最多
      minrates_1: '', //设备稼动率 最少
      maxtotalavgnum_1: '', //平均每支辊用时 最多
      mintotalavgnum_1: '' //平均每支辊用时 最少
    }
  },
  created() {
    this.searchInfo.dbegin = moment()
      .subtract(4, 'days')
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
  },
  mounted() {
    this.findOptions()
    this.findAll()
  },
  methods: {
    async hand_exe() {
      let data = {
        method: 'get',
        url:
          // 'http://192.168.43.57:8778/api/rollStiffness/excel?dbegin=' +
          location.origin +
          '/api/rollGrindingBF/excelGrindingRate?dbegin=' +
          this.searchInfo.dbegin +
          '&dend=' +
          this.searchInfo.dend +
          '&machine_no=' +
          this.searchInfo.machine_no +
          '&operator=' +
          this.searchInfo.operator
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
      getDataConfig('machine').then(res => {
        this.options = res
      })
    },
    // 查询全部
    //查询接口
    findAll() {
      this.maxtotalnum_1 = '' //磨辊总支数 最多
      this.mintotalnum_1 = '' //磨辊总支数 最少
      this.maxgrinding_timetotalnum_1 = '' //磨辊总时间 最多
      this.mingrinding_timetotalnum_1 = '' //磨辊总时间 最少
      this.maxrates_1 = '' //设备稼动率 最多
      this.minrates_1 = '' //设备稼动率 最少
      this.maxtotalavgnum_1 = '' //平均每支辊用时 最多
      this.mintotalavgnum_1 = '' //平均每支辊用时 最少
      post('rollGrindingBF/findGrindingRateByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      }).then(res => {
        this.tableData = res.data
        console.log(res.data.length)
        // this.tableData.push({ roll_no: '辊径合计', body_diameter: res.number })

        this.maxtotalnum_1 = res.bean.maxtotalnum //磨辊总支数 最多
        this.mintotalnum_1 = res.bean.mintotalnum //磨辊总支数 最少
        this.maxgrinding_timetotalnum_1 = res.bean.maxgrinding_timetotalnum //磨辊总时间 最
        this.mingrinding_timetotalnum_1 = res.bean.mingrinding_timetotalnum //磨辊总时间 最
        this.maxrates_1 = res.bean.maxrates //设备稼动率 最多
        this.minrates_1 = res.bean.minrates //设备稼动率 最少
        this.maxtotalavgnum_1 = res.bean.maxtotalavgnum //平均每支辊用时 最多
        this.mintotalavgnum_1 = res.bean.mintotalavgnum //平均每支辊用时 最少

        this.tableData.push(
          {
            machineno: '合计',
            gwnum: res.bean.gwtotalnum, //5-8工作辊合计
            fwnum: res.bean.fwtotalnum, //1-4工作辊合计
            rnum: res.bean.rtotalnum, //支撑辊合计
            rwnum: res.bean.rwtotalnum, //粗轧工作辊合计
            othernum: res.bean.othertotalnum, //其他数合计
            grinding_time: res.bean.grinding_timetotalnum //磨削时长合计
          },
          {
            machineno: '平均',
            gwnum: res.bean.gwavgnum, //5-8工作辊平均
            fwnum: res.bean.fwavgnum, //1-4工作辊平均
            rnum: res.bean.ravgnum, //支撑辊平均
            rwnum: res.bean.rwavgnum, //粗轧工作辊平均
            othernum: res.bean.otheravgnum, //其他数平均
            grinding_time: res.bean.grinding_timeavgnum //平均每班磨削时长
          },
          {
            machineno: '平均每辊用时',
            grinding_time: (
              res.bean.grinding_timetotalnum / res.bean.totalnum
            ).toFixed(2) //平均每辊用时==磨削时长合计/磨削总数
          }
          /*{
            machineno: '磨削时长合计'
          },*/
        )
        this.total = res.count
      })
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
    }
  }
}
</script>

<style lang="less">
.anclass {
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
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
.u-table-head th {
  background-color: #001f6b;
  font-weight: normal;
  padding: 5px 0;
}
</style>
