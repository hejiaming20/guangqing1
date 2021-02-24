<!--每月成本核算-->
<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :page-size="pageSize"
      :current-page="pageIndex"
      :table-height="750"
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
          label="单价"/>
        <el-table-column
          prop="working_layer"
          label="工作层"/>

        <el-table-column
          prop="mmnumber"
          label="毫米数"/>
        <el-table-column
          prop="weight"
          label="重量"/>
        <el-table-column
          prop="money"
          label="金额"/>
          <!-- <el-table-column
          prop="consumption"
          label="吨钢消耗"/>
        <el-table-column
          prop="cost"
          label="吨钢成本"/>-->


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
        this.tableData.splice(0, 0, {
          material_no: '吨钢消耗（kg）',
          specifications_no: res.bean.consumption,
          // specifications_no: 100,
          roll_type: '吨钢成本',
          material: res.bean.cost
          //material: 200
        })
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
