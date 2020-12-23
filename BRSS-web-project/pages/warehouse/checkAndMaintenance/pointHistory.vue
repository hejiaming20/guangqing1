<!--
 * @Author:crm
 * @Date: 2020-07-23 16:19:58
 * @LastEditTime: 2020-09-04 15:19:54
 * @LastEditors: Please set LastEditors
 * @Description: 设备点检历史管理
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\pointHistory.vue
-->
<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :table-height="'calc(100vh - 220px)'"
      :page-size="pageSize"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <template slot="TableHead">
        <el-row>
          <el-col :span="19">
            <el-form
              ref="ruleForm"
              :model="searchCondition"
              class="search-info"
              label-width="80px">
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="检测人:"
                    prop="check_manager_condition">
                    <el-input v-model="searchCondition.check_manager_condition" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="检测开始时间:"
                    label-width="100px"
                    prop="check_date_start_condition"
                  >
                    <el-date-picker
                      v-model="searchCondition.check_date_start_condition"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="选择日期"/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="检测结束时间:"
                    label-width="100px"
                    prop="check_date_end_condition"
                  >
                    <el-date-picker
                      v-model="searchCondition.check_date_end_condition"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="选择日期"/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="检测类型:"
                    prop="check_type_condition">
                    <el-select
                      v-model="searchCondition.check_type_condition"
                      placeholder="请选择"
                      @change="handleSearch()">
                      <el-option
                        v-for="item in checkTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"/>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
          <el-col
            :span="4"
            :offset="1">
            <div class="btn">
              <el-button
                size="mini"
                type="primary"
                @click="handleSearch()">查询</el-button>
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
          label="检测时间"
          prop="checkCompleteTimeStr"/>
        <el-table-column
          label="检测类型">
          <template slot-scope="scope">
            <p>{{ scope.row.check_type | formatCheckType }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="检测人"
          prop="check_manager_name" />
        <el-table-column
          label="是否检查完成">
          <template slot-scope="scope">
            <p>{{ scope.row.check_complete_ornot | formatCheckIsComplete }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="故障信息"
          prop="broken_infomation" />
        <!--<el-table-column
          label="检修信息"
          prop="device_name" />暂时先不添加-->
        <el-table-column
          label="操作"
          min-width="150"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleClick(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </template>
    </Table-easy>
    <!-- 查看/修改设备 -->
    <el-dialog
      :visible.sync="checkDataVisible"
      class="layout-dialog"
      title="录入设备点检结果"
      width="35%">
      <div
        class="aaa"
        style="margin-bottom: 10px;width:95%;color: white">
        <p> &nbsp;&nbsp;检测人: {{ checkManagerName }}</p>
        <p> 检测时间: {{ checkDateStr }}</p>
        <p> 检测类型: {{ checkType }}</p>
      </div>
      <!-- &nbsp;
      <span> 检测人: {{ checkManagerName }}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span> 检测时间: {{ checkDateStr }}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span> 检测类型: {{ checkType }}</span>
      <br> <br> -->
      <el-tabs
        v-model="activeName"
        type="card">
        <el-tab-pane
          label="电气"
          name="first">
          <el-tree
            :data="data"
            :props="defaultProps"
            @node-click="handleNodeClick">
            <div
              slot-scope="{ node, data }"
              class="custom-tree-node aaa"
              style="width:90%">
              <p>{{ node.label }}</p>
              <div v-show="data.isflag">
                <el-radio
                  v-model="data.checkResult"
                  disabled
                  label="1">通过</el-radio>
                <el-radio
                  v-model="data.checkResult"
                  disabled
                  label="0">不通过</el-radio>
                <el-radio
                  v-model="data.checkResult"
                  disabled
                  label="2">以后再测</el-radio>
              </div>
            </div>
          </el-tree>
        </el-tab-pane>
        <el-tab-pane
          label="机械"
          name="second">
          <el-tree
            :data="dataMachine"
            :props="defaultProps"
            @node-click="handleNodeClick">
            <div
              slot-scope="{ node, data }"
              class="custom-tree-node aaa"
              style="width:90%">
              <p>{{ node.label }}</p>
              <div v-show="data.isflag">
                <el-radio
                  v-model="data.checkResult"
                  disabled
                  label="1">通过</el-radio>
                <el-radio
                  v-model="data.checkResult"
                  disabled
                  label="0">不通过</el-radio>
                <el-radio
                  v-model="data.checkResult"
                  disabled
                  label="2">以后再测</el-radio>
              </div>
            </div>
          </el-tree>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import {
  findCheckHistoryByPage,
  findModelItemsByModelId,
  findCheckScheduleByScheduleId
} from '@/api/warehouse.js'
import { get, post } from '@/lib/Util'
export default {
  components: {
    TableEasy
  },
  filters: {
    formatCheckType(val) {
      return val == 2 ? '年检' : val == 1 ? '停机检' : '日检'
    },
    formatCheckIsComplete(val) {
      return val == 0 ? '未完成' : val == 2 ? '已完成' : '未完成'
    }
  },
  data() {
    return {
      total: 0,
      pageIndex: 1,
      pageSize: 20,
      data: [],
      dataMachine: [],
      checkDateStr: '',
      checkType: '',
      checkManagerName: '',
      activeName: 'first',
      checkDataVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      searchInfo: {},
      tableData: [],
      options: [
        {
          label: '1',
          value: 1
        }
      ],
      checkTypeList: [
        {
          label: '日检',
          value: 0
        },
        {
          label: '停机检',
          value: 1
        },
        {
          label: '年检',
          value: 2
        }
      ],
      searchCondition: {
        check_manager_condition: '',
        check_type_condition: '',
        check_date_start_condition: '',
        check_date_end_condition: ''
      }
    }
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    handleNodeClick(data) {
      // console.log(data.name)
    },
    findAll() {},
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.handleSearch()
    },
    async handleSearch() {
      var res = await post(findCheckHistoryByPage, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchCondition
      })
      this.tableData = res.data
      this.total = res.count
    },
    async handleClick(val) {
      this.checkDataVisible = true
      var resSchedule = await post(findCheckScheduleByScheduleId, {
        indocno: val.check_schedule_id
      })
      var res = await post(
        findModelItemsByModelId + resSchedule.data.check_model_id,
        {}
      )
      this.data = res.data.checkDevicesElectricList
      this.dataMachine = res.data.checkDevicesMachineList
      this.checkDateStr = res.data.checkDateStr
      this.checkType = res.data.checkType
      this.checkManagerName = res.data.checkManagerName
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.handleSearch()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.handleSearch()
    }
  }
}
</script>

<style>
.dialoy-form .el-input {
  max-width: 217px;
}
.aaa {
  display: flex;
  justify-content: space-between;
}
.el-tabs__item {
  color: #ebeef5;
}
</style>
