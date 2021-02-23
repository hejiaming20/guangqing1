<!--整台磨床累计使用时间-->
<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :page-size="pageSize"
      :current-page="pageIndex"
      :table-height="750"
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
          prop="grinding_timetotalnum"
          label="磨削时长合计"/>
        <el-table-column
          prop="machineno"
          label="磨床号"/>
        <el-table-column
          prop="totalnum"
          label="总数"/>

      </template>
    </Table-easy>
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
      option_1: [],
      searchInfo: {
        dbegin: '',
        dend: '',
        wheelname: '',
        machine_no: ''
      },
      searchInfoEchartsLight: {
        machine_no: '',
        grind_starttime: '',
        grind_endtime: ''
      }
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
          '/api/rollGrindingBF/excelWheelAbrasion?dbegin=' +
          this.searchInfo.dbegin +
          '&dend=' +
          this.searchInfo.dend
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
      getDataConfig('bearing_s').then(res => {
        this.option_1 = res
      })
    },
    // 查询全部
    //查询接口
    findAll() {
      post('rollGrindingBF/findGrindingBFForTotalnum', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      }).then(res => {
        this.tableData = res.data
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
