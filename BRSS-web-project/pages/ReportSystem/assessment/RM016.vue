<!--
 * @Author: your name
 * @Date: 2020-07-23 09:57:34
 * @LastEditTime: 2020-11-12 16:59:29
 * @LastEditors: Please set LastEditors
 * @Description: 报废历史记录查询
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\am.vue
-->
<template>
  <div>
    <div class="c_table-title"><i class="iconfont icon-biaoti1"/> 报废历史记录</div>
    <Table-easy
      :table-data="tableDatan_0"
      :page-size="pageSize1"
      :total="total_1"
      :table-height="750"
      @handle-current-change="handleCurrentChange1"
      @handle-size-change="handleSizeChange1">
      <template slot="TableHead">
        <el-row>
          <el-col :span="20">
            <el-form
              ref="ruleForm"
              :inline="true"
              :model="searchInfo2"
              label-width="80px">
              <el-form-item
                label="辊号"
                width="140px"
                prop="roll_no">
                <el-input v-model="searchInfo2.roll_no" />
              </el-form-item>
              <el-form-item
                label="轧辊类型"
                width="100px"
                prop="roll_no">
                <el-select
                  v-model="searchInfo2.roll_typeid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in optionsS"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="机架范围"
                prop="framerangeid">
                <el-select
                  v-model="searchInfo2.framerangeid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in option_fanwei"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="开始时间"
                prop="dbegin">
                <el-date-picker
                  v-model="searchInfo2.dbegin"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="开始时间"/>
              </el-form-item>
              <el-form-item
                label="结束时间"
                prop="dend">
                <el-date-picker
                  v-model="searchInfo2.dend"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="结束时间"/>
              </el-form-item>

            </el-form>
          </el-col>
          <el-col :span="4">
            <div class="btn">
              <el-button
                size="mini"
                type="primary"
                @click="findAll_1()">查询
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
          width="130"
          label="辊号"/>
        <el-table-column
          prop="roll_type"
          width="110"
          label="轧辊类型"/>
        <el-table-column
          prop="factory"
          label="制造厂商"/>
        <el-table-column
          label="轧辊材质"
          width="150"
          prop="material"/>
        <el-table-column
          prop="frame_no"
          label="机架号"/>
        <!--  <el-table-column
          prop="loomingposition"
          label="上机位置"/>-->
        <!--  <el-table-column
          prop="roll_diameter"
          label="当前辊径"/>-->
        <!-- <el-table-column
          prop="scrap_diameter"
          label="报废直径"/>-->
        <el-table-column
          prop="firstuplinetime"
          width="170px"
          label="第一次上线时间"/>
        <el-table-column
          prop="lastlowlinetime"
          width="170px"
          label="最后一次下线时间"/>
        <el-table-column
          prop="grindingcount"
          width="120px"
          label="累计磨削次数"/>
        <el-table-column
          prop="rollkilometer"
          width="120px"
          label="累积轧制公里数"/>

        <el-table-column
          prop="currentdiameter"
          label="报废直径"/>
        <!-- <el-table-column
          prop="iaccident"
          min-width="100px"
          label="事故辊标记"/>-->

        <el-table-column
          prop="material_no"
          label="料号"/>
        <el-table-column
          prop="specifications_no"
          label="规格"/>
        <el-table-column
          prop="scrapreason"
          label="报废原因"/>
        <!-- <el-table-column
          prop="scrapreason"
          label="处理结果"/>-->
        <el-table-column
          prop="modiname"
          width="110"
          label="操作人员"/>
        <el-table-column
          prop="operate_time"
          width="170"
          label="操作时间"/>
          <!-- <el-table-column
        prop="confirmationperson"
        label="确认人员"/>
      <el-table-column
        prop="confirmationtime"
        label="确认时间"/>-->
          <!-- <el-table-column
        label="操作"
        min-width="150"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleBf2(scope.row)">取消报废
          </el-button>
        </template>
      </el-table-column>-->
      </template>
    </Table-easy>

    <el-dialog
      :visible.sync="dialogVisible"
      class="layout-dialog"
      width="60%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlign"
          label-position="top">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input v-model="formLabelAlign.roll_no" />
              </el-form-item>
              <el-form-item
                label="报废直径"
                prop="scrap_diameter">
                <el-input v-model="formLabelAlign.currentdiameter" />
              </el-form-item>
              <el-form-item
                label="报废原因"
                label-width="110px">
                <el-input
                  :rows="2"
                  v-model="formLabelAlign.scrapreason"
                  type="textarea"
                  placeholder="请输入内容"/>
              </el-form-item>
              <el-form-item
                label="处理结果"
                label-width="110px">
                <el-input
                  :rows="2"
                  v-model="formLabelAlign.scrapreason"
                  type="textarea"
                  placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          size="small"
          @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="submit">确 定</el-button>
      </span>
    </el-dialog>



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
      pageIndex: 1,
      pageSize: 10,
      pageIndex1: 1,
      pageSize1: 10,
      formLabelAlign: {},
      searchInfo1: {
        roll_state: -1
      },
      searchInfo2: {
        roll_state: 6,
        dbegin: '',
        dend: ''
      },
      tableData: [],
      tableDatan_0: [],
      tableDatan: [],
      options: [],
      optionsS: [], //第二个表
      option_fanwei: [],
      dialogVisible: false,
      checkAll: false,
      columnsArray: [],
      cities: [],
      isIndeterminate: true,
      total: 0,
      total_1: 0
    }
  },
  mounted() {
    this.searchInfo2.dbegin = moment()
      .subtract(7, 'days')
      .format('YYYY-MM-DD HH:mm:ss')
    this.searchInfo2.dend = moment().format('YYYY-MM-DD HH:mm:ss')
    this.findAll_1()
    this.findOption()
    post('/dictionary/findMapV1', { dicno: 'framefw' }).then(res => {
      this.option_fanwei = res.data //机架范围
    })
  },
  methods: {
    open_edit_1(val) {
      this.formLabelAlign = val
      this.dialogVisible = true
    },
    submit() {
      // 编辑
      post('rollInformation/update', {
        rollInformation: this.formLabelAlign
      }).then(res => {
        if (res) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.findAll()
        }
      })
      this.dialogVisible = false
    },
    findAll_1() {
      console.log(this.searchInfo2.roll_state)
      post('rollInformation/findHistoryByPage', {
        pageIndex: this.pageIndex1,
        pageSize: this.pageSize1,
        condition: this.searchInfo2
      }).then(res => {
        this.tableDatan_0 = res.data
        this.total_1 = res.count
      })
    },
    //轧辊类型-下拉框数据
    findOption() {
      post(rolltypelist, {
        dicno: 'rolltype'
      }).then(res => {
        this.options = res.data
        this.optionsS = res.data //第二个表
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    //颜色变化
    color_table(row) {
      console.log('单元格变色', row)
      if (row.row.roll_no === 'GDC09272' && row.columnIndex === 0) {
        return {
          background: 'red'
        }
      }
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
    openDialoy(val) {
      console.log(val)
      this.dialogVisible = true
    },

    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      console.log('val', value)
    }
  }
}
</script>

<style>
.column-search {
  margin-left: 20px;
}
</style>
