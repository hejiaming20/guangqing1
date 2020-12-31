<!--
 * @Author: your name
 * @Date: 2020-07-23 09:57:34
 * @LastEditTime: 2020-11-29 14:00:07
 * @LastEditors: Please set LastEditors
 * @Description: 轧辊配对拆解历史
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\am.vue
-->
<template>
  <div>
    <div class="layout-default-margin">
      <Table-easy
        :table-data="tableData"
        :page-size="pageSize"
        :table-height="350"
        :total="total"
        @handle-current-change="handleCurrentChange"
        @handle-size-change="handleSizeChange">
        <template slot="TableHead">
          <el-row>
            <el-col :span="21">
              <el-form
                ref="ruleForm"
                :inline="true"
                :model="searchInfo">
                <el-form-item
                  label="辊号"
                  prop="roll_no">
                  <el-input v-model="searchInfo.roll_no" />
                </el-form-item>
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
                <el-form-item
                  label="拆解或配对"
                  prop="operate_name">
                  <el-select
                    v-model="searchInfo.operate_name"
                    placeholder="请选择">
                    <el-option
                      v-for="item in option_1"
                      :key="item.key"
                      :label="item.value"
                      :value="item.value"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="开始时间"
                  prop="dbegin">
                  <el-date-picker
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
                    placeholder="结束时间"/>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="3">
              <div class="btn">
                <el-button
                  size="mini"
                  type="primary"
                  @click="findAll()">查询
                </el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="resetForm('ruleForm')">重置
                </el-button>
              </div>
            </el-col>
          </el-row>
        </template>
        <template slot="TableBody">
          <el-table-column
            prop="roll_no"
            label="辊号"/>
          <el-table-column
            label="制造厂商"
            prop="factory"/>
          <el-table-column
            prop="roll_type"
            label="轧辊类型"/>
          <el-table-column
            prop="rollshape"
            label="辊形"/>
          <el-table-column
            prop="framerange"
            label="机架范围"/>
          <el-table-column
            label="轧辊材质"
            prop="material"/>
          <el-table-column
            prop="roll_position"
            label="上机位置"/>
          <el-table-column
            prop="currentdiameter"
            label="当前辊径"/>
          <!-- <el-table-column
            prop="roll_state_value"
            label="轧辊状态"/>-->
          <el-table-column
            prop="uplinecount"
            label="上机次数"/>
            <!-- <el-table-column
            label="操作"
            min-width="150"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="goUp(scope.row)">上辊
              </el-button>
              <el-button
                size="mini"
                type="primary"
                @click="goDown(scope.row)">下辊
              </el-button>
            </template>
          </el-table-column>-->
        </template>
      </Table-easy>
    </div>
  </div>
</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import { rollInformation, kucunlist, rolltypelist } from '@/api/pinClipBoard' //查询接口
import { get, post } from '@/lib/Util'
import moment from 'moment'
export default {
  components: {
    TableEasy
  },
  data() {
    return {
      options: [],
      kucun: [],
      searchInfo: {
        roll_state: '3',
        dbegin: '',
        dend: ''
      },
      searchInfo5: {},
      tableData: [],
      dialogVisible: false,
      checkAll: false,
      columnsArray: [],
      cities: [],
      option_1: [
        { key: '配对', value: '配对' },
        { key: '解封', value: '解封' }
      ],
      option_2: [],
      option_3: [
        {
          key: '2',
          value: '待使用新辊'
        },
        {
          key: '3',
          value: '周转轧辊'
        }
      ],
      fame_value: '',
      total: 0,
      rollpairU: {},
      rollpairD: {},
      pageIndex: 1,
      pageSize: 10,
      pageSize_1: 10,
      tableData1: [],
      total1: 0,
      total_1: 0
    }
  },
  mounted() {
    this.searchInfo.dbegin = moment()
      .subtract(7, 'days')
      .format('YYYY-MM-DD HH:mm:ss')
    this.searchInfo.dend = moment().format('YYYY-MM-DD HH:mm:ss')
    this.findAll()
    this.findOption()
    this.findKucun()
    /* post('/dictionary/findMapV1', { dicno: 'framefw' }).then(res => {
      this.option_1 = res.data //机架范围
    })*/
    post('/dictionary/findMapV1', { dicno: 'roll_material' }).then(res => {
      this.option_2 = res.data //材质
    })
    /*post('/dictionary/finddicno', { dicno: 'rollstate03,rollstate04' }).then(
        res => {
          this.option_3 = res.data //轧辊库存状态
          console.log(res.data)
        }
      )*/
  },
  methods: {
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
    // 重制
    // resetForm(formName) {
    //   this.$refs[formName].resetFields()
    // },
    //查询接口
    findAll() {
      post('rollPairedHistory/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      }).then(res => {
        this.tableData = res.data
        this.total = res.count
      })
    },
    //轧辊类型-下拉框数据
    findOption() {
      post(rolltypelist, {
        dicno: 'rolltype'
      }).then(res => {
        this.options = res.data
      })
    },
    //轧辊类型-库存下拉
    findKucun() {
      post(kucunlist, {
        dicno: 'rollstate'
      }).then(res => {
        this.kucun = res.data
      })
    },
    resetForm(formName) {
      this.searchInfo = {
        roll_state: '3'
      }
      this.findAll()
    }
  }
}
</script>

<style>
.pair {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.el-table .warning-row {
  background: #253f80 !important;
}

.el-table .success-row {
  background: #1a367a !important;
}
</style>
