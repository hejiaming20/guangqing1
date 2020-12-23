<!--
 * @Author: your name
 * @Date: 2020-07-23 15:06:06
 * @LastEditTime: 2020-11-02 11:31:44
 * @LastEditors: Please set LastEditors
 * @Description: 备件仓库管理页面
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\spareHouse.vue
-->
<template>
  <div>
    <Table-easy 
      :table-data="tableData"
      :total="total"
      :table-height="'calc(100vh - 220px)'"
      :page-size="pageSize"
      :current-page="pageIndex"
      index-type="index"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <template slot="TableHead">
        <el-row>
          <el-col :span="20">
            <el-form
              ref="ruleForm"
              :model="searchInfo"
              label-width="80px">
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="备件名称"
                    prop="eq_name">
                    <el-input v-model="searchInfo.eq_name" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="备件编码"
                    prop="eq_code">
                    <el-input v-model="searchInfo.eq_code" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="开始时间"
                    prop="dbegin">
                    <!-- <el-input v-model="searchInfo.dbegin" /> -->
                    <el-date-picker
                      v-model="searchInfo.dbegin"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="选择日期时间"/>
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
                      placeholder="选择日期时间"/>
                      <!-- <el-input v-model="searchInfo.dend" /> -->
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
          <el-col
            :span="4">
            <div class="btn">
              <el-button
                size="mini"
                type="primary"
                @click="findSearch">查询</el-button>
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
          label="备件名称" 
          prop="eq_name"/>
        <el-table-column 
          label="备件编码" 
          prop="eq_code"/>
        <el-table-column 
          label="规格型号" 
          prop="sized"/>
        <el-table-column 
          label="产线" 
          prop="production_line"/>
        <el-table-column 
          label="出入库时间" 
          prop="createtime">
          <template slot-scope="scope">
            <span>{{ scope.row.createtime | formatTime }}</span>
          </template>
        </el-table-column>
        <el-table-column 
          label="存放地点" 
          prop="save_place"/>
        <el-table-column 
          label="入库状态" 
          prop="istatus_in">
          <template slot-scope="scope">
            <span>{{ scope.row.istatus_in | checkIstatus }}</span>
          </template>
        </el-table-column>
        <el-table-column 
          label="出库去向" 
          prop="istatus_out">
          <template slot-scope="scope">
            <span>{{ scope.row.istatus_out | checkIstatusOut }}</span>
          </template>
        </el-table-column>
        <el-table-column 
          label="入库数量" 
          prop="eq_in"/>
        <el-table-column
          prop="eq_out"
          label="出库数量"/>
        <el-table-column
          prop="if_import"
          label="是否为重要设备">
          <template slot-scope="scope">
            <span>{{ scope.row.if_import == 1 ? '是' : '否' }}</span>
          </template>
        </el-table-column>
      </template>
    </Table-easy>
    

  </div>
</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import { get, post, getDataConfig } from '@/lib/Util'
import moment from 'moment'
var that = ''
export default {
  components: {
    TableEasy
  },
  filters: {
    checkIstatus(val) {
      for (const item of that.stockInArray) {
        if (item.key == val) {
          console.log(val, item.key)
          console.log(item.value)
          return item.value
        }
      }
    },
    checkIstatusOut(val) {
      for (const item of that.stockOutArray) {
        if (item.key == val) {
          console.log(val, item.key)
          console.log(item.value)
          return item.value
        }
      }
    },
    formatTime(val) {
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      searchInfo: {},
      tableData: [],
      dialogVisible: false,
      pageIndex: 1,
      pageSize: 30,
      total: 0,
      stockInArray: [],
      stockOutArray: []
    }
  },
  created() {
    this.findAll()
    getDataConfig('stock_out').then(res => {
      console.log('打印出库去向', res)
      this.stockOutArray = res
    })
    getDataConfig('stock_in').then(res => {
      console.log('打印入库状态', res)
      this.stockInArray = res
    })
    that = this
  },
  methods: {
    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },
    async findAll() {
      let res = await post('/rollPartsHistory/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      })
      if (res.status == 2000) {
        this.tableData = res.data
        this.total = res.count
      } else {
        this.tableData = []
        this.total = 0
      }
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields()
      this.searchInfo = {}
      this.findSearch()
    }
  }
}
</script>

<style>
</style>
