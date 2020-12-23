<!--
 * @Author: your name
 * @Date: 2020-07-23 09:57:34
 * @LastEditTime: 2020-12-07 17:29:15
 * @LastEditors: Please set LastEditors
 * @Description: 备辊历史清单
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\am.vue
-->
<template>
  <div>
    <el-row :gutter="5">
      <el-col 
        :xl="12"
        :lg="24" 
        :sm="24" 
        style="margin-bottom: 10px">
        <div class="c_table-title"><i class="iconfont icon-biaoti1"/>备辊操作历史记录</div>
        <Table-easy
          :table-data="tableData"
          :page-size="pageSize"
          :current-page="pageIndex"
          :total="total"
          :table-height="352"
          index-type="index"
          @handle-current-change="handleCurrentChange"
          @handle-size-change="handleSizeChange">
          <template slot="TableHead">
            <el-row>
              <el-col :span="20">
                <el-form
                  ref="ruleForm"
                  :model="searchInfo1"
                  :inline="true"
                  class="search-info"
                  label-width="80px">
                  <el-form-item
                    label="辊号"
                    prop="roll_no">
                    <el-input v-model="searchInfo1.roll_no" />
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="4">
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
              width="160"
              label="辊号"/>
            <el-table-column
              prop="roll_type"
              label="轧辊类型"/>
            <el-table-column
              label="机架"
              prop="frame_no"/>
            <el-table-column
              prop="reason"
              show-overflow-tooltip
              label="原因"/>
            <el-table-column
              prop="if_grind"
              label="是否重磨"/>
            <el-table-column
              width="160"
              prop="pretime"
              label="备辊时间"/>
          </template>
        </Table-easy>
      </el-col>
      <el-col 
        :xl="12" 
        :lg="24" 
        :sm="24">
        <div class="c_table-title"><i class="iconfont icon-biaoti1"/>备辊工单历史记录</div>
        <Table-easy
          :table-data="tableDatan_0"
          :page-size="pageSize1"
          :current-page="pageIndex1"
          :total="total_1"
          :table-height="352"
          index-type="index"
          @handle-current-change="handleCurrentChange1"
          @handle-size-change="handleSizeChange1">
          <template slot="TableHead">
            <el-row>
              <el-col :span="20">
                <el-form
                  ref="ruleForm"
                  :inline="true"
                  :model="searchInfo2"
                  class="search-info"
                  label-width="80px">
                  <el-form-item
                    label="辊号"
                    prop="roll_no">
                    <el-input v-model="searchInfo2.roll_no" />
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
                    @click="resetForm1('ruleForm')">重置
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </template>
          <template slot="TableBody">
            <el-table-column
              prop="roll_no"
              width="160"
              label="辊号"/>
            <el-table-column
              prop="roll_type"
              label="轧辊类型"/>
            <el-table-column
              label="机架"
              prop="frame_no"/>
            <el-table-column
              prop="reason"
              show-overflow-tooltip
              label="原因"/>
            <el-table-column
              prop="if_grind"
              label="是否重磨"/>
            <el-table-column
              prop="pretime"
              width="160"
              label="备辊时间"/>
          </template>
        </Table-easy>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import { rollInformation, kucunlist, rolltypelist } from '@/api/pinClipBoard' //查询接口
import { get, post } from '@/lib/Util'

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
      searchInfo1: {},
      searchInfo2: {},
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
    this.findAll()
    this.findAll_1()
  },
  methods: {
    findAll() {
      post('rollPrelistHistory/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo1
      }).then(res => {
        res.data.forEach((val, index, arr) => {
          val.if_grind = val.if_grind == 1 ? '是' : '否'
        })
        this.tableData = res.data
        this.total = res.count
      })
    },
    findAll_1() {
      post('rollPrelistHistoryR/findByPage', {
        pageIndex: this.pageIndex1,
        pageSize: this.pageSize1,
        condition: this.searchInfo2
      }).then(res => {
        res.data.forEach((val, index, arr) => {
          val.if_grind = val.if_grind == 1 ? '是' : '否'
        })
        this.tableDatan_0 = res.data
        this.total_1 = res.count
      })
    },
    resetForm(formName) {
      this.searchInfo1 = {}
      this.findAll()
    },
    resetForm1(formName) {
      this.searchInfo2 = {}
      this.findAll_1()
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
    openDialoy(val) {
      console.log(val)
      this.dialogVisible = true
    },

    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : []
      this.isIndeterminate = false
    }
  }
}
</script>

<style>
.column-search {
  margin-left: 20px;
}
</style>
