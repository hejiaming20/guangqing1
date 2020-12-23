<!--
 * @Author: wyc
 * @Date: 2020-07-27 09:47:30
 * @LastEditTime: 2020-09-08 16:18:58
 * @LastEditors: Please set LastEditors
 * @Description: 点检计划管理
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\pointPlan.vue
-->

<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :table-height="'calc(100vh - 220px)'"
      :page-size="pageSize"
      :total="total"
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
                    label="检测人"
                    prop="check_manager_condition">
                    <el-input v-model="searchCondition.check_manager_condition" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="点检类型"
                    prop="check_type_condition">
                    <el-select
                      v-model="searchCondition.check_type_condition"
                      placeholder="请选择"
                      @change="handleSearch()">
                      <el-option
                        v-for="item in checkRollType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="8">
                  <el-form-item
                    label="查询时间"
                    label-width="100px"
                    prop="roll_mo">
                    <el-input v-model="searchInfo.roll_mo" />
                    <el-date-picker
                      v-model="searchCondition.check_datarange_condition"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"/>
                  </el-form-item>
                </el-col> -->
                <el-col :span="6">
                  <el-form-item
                    label="计划开始时间"
                    label-width="100px"
                    prop="check_date_start_condition">
                    <el-date-picker
                      v-model="searchCondition.check_date_start_condition"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="选择日期"/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="计划结束时间"
                    label-width="100px"
                    prop="check_date_end_condition">
                    <el-date-picker
                      v-model="searchCondition.check_date_end_condition"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="选择日期"/>
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
          label="点检名称"
          prop="check_name"/>
        <el-table-column
          label="检测人"
          prop="check_manager_name"/>
        <el-table-column
          label="检测类型"
          prop="check_type">
          <template slot-scope="scope">
            <p>{{ scope.row.check_type | formatCheckType }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="是否完成"
          prop="check_complete_ornot">
          <template slot-scope="scope">
            <p>{{ scope.row.check_complete_ornot | formatCheckComplete }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          prop="check_comments"/>
        <el-table-column
          label="操作"
          min-width="220"
          align="center">
          <template slot-scope="scope">
            <el-button
              :disabled="isNotToday"
              size="mini"
              type="primary"
              @click="handleOpen(scope.row)">点检项目</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleChange(scope.row)">是否点检</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleEnter(scope.row)">数据录入</el-button>
              <!-- <el-button
            size="mini">故障检修</el-button> -->
          </template>
        </el-table-column>
      </template>
    </Table-easy>
    <!-- 是否安排日常点检/是否安排停机点检 -->
    <el-dialog
      :visible.sync="updateStatusVisible"
      :title="titleName"
      class="layout-dialog"
      width="60%">
      <div class="layout-search">
        <el-form
          ref="submitForm"
          :model="updateStateInfo"
          class="dialoy-form"
          label-width="80px">
          <el-form-item
            label="安排点检："
            label-width="100px"
            prop="check_complete_ornot"
          >
            <el-radio
              v-model="updateStateInfo.check_complete_ornot"
              label="1"
              @change="needCheckChange(updateStateInfo.check_complete_ornot)">是</el-radio>
            <el-radio
              v-model="updateStateInfo.check_complete_ornot"
              label="0"
              @change="needCheckChange(updateStateInfo.check_complete_ornot)">否</el-radio>
          </el-form-item>
          <el-form-item
            label="理由："
            label-width="100px"
            prop="check_incomplete_reason">
            <el-select
              v-model="updateStateInfo.check_incomplete_reason"
              :disabled = "needCheckOrnot"
              filterable
              allow-create
              default-first-option
              placeholder="请选择">
              <el-option
                v-for="item in resonList"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item
            label="备注说明："
            label-width="100px"
            prop="check_comments">
            <el-input
              :disabled = "needCheckOrnot"
              v-model="updateStateInfo.check_comments"
              :rows="2"
              type="textarea"/>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          @click="handleExportExcel()">{{ confirmButton }}</el-button>
        <el-button
          size="small"
          type="primary"
          @click="cancelUpdateState()">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="enterDataVisible"
      title="录入设备点检结果"
      class="layout-dialog"
      width="30%">
      <div style="color: #eae8c5">
        <div
          class="aaa"
          style="margin-bottom: 10px;width:95%">
          <p> &nbsp;&nbsp;检测人: {{ checkManagerName }}</p>
          <p> 检测时间: {{ checkDateStr }}</p>
          <p> 检测类型: {{ checkType }}</p>
        </div>
        <el-tabs
          v-model="activeName"
          type="card">
          <el-tab-pane
            label="电气"
            name="first">
            <el-tree
              :data="datastr"
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
                    label="1">通过</el-radio>
                  <el-radio
                    v-model="data.checkResult"
                    label="0">不通过</el-radio>
                  <el-radio
                    v-model="data.checkResult"
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
                    label="1">通过</el-radio>
                  <el-radio
                    v-model="data.checkResult"
                    label="0">不通过</el-radio>
                  <el-radio
                    v-model="data.checkResult"
                    label="2">以后再测</el-radio>
                </div>
              </div>
            </el-tree>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          @click="handleCommit()">确 定</el-button>
        <el-button
          size="small"
          type="primary"
          @click="cancelCommit()">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 点检选择穿梭框 -->
    <el-dialog
      :visible.sync="dayVisible1"
      class="layout-dialog"
      width="60%">
      <div>
        <tree-transfer
          :from_data="fromData"
          :to_data="toData"
          :title="title"
          :default-props="{label:'name'}"
          :mode="mode"
          height="540px"
          transfer-open-node
          high-light
          filter
          @addBtn="add"
          @removeBtn="remove"/>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          @click="handleTransfer()">确 定</el-button>
        <el-button
          size="small"
          type="primary"
          @click="cancelTransfer()">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import {
  findTreeInfoByIndocno,
  findCheckScheduleByPage,
  updateCheckSchedule,
  exportCheckTable,
  findModelItemsByModelId,
  updateModelItemsByModelId
} from '@/api/warehouse.js'
import treeTransfer from 'el-tree-transfer' // 引入
import { get, post, exportMethod } from '@/lib/Util'
export default {
  components: {
    TableEasy,
    treeTransfer
  },
  filters: {
    formatCheckType(val) {
      return val == 0 ? '日检' : val == 1 ? '停机检' : '年检'
    },
    formatCheckComplete(val) {
      return val == 2 ? '已完成' : '未完成'
    }
  },
  data() {
    return {
      isNotToday: false,
      activeName: 'first',
      checkDateStr: '',
      checkType: '',
      checkManagerName: '',
      radio: '1',
      datastr: [],
      dataMachine: [],
      dataCommit: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      confirmButton: '确定',
      needCheckOrnot: false, // 是否需要点检 如果需要 就禁用 不需要 就放开
      titleName: '',
      title: ['默认点检模板', '点检项仓库'],
      mode: 'transfer', // transfer addressList
      checkRollType: [
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
      total: 0,
      pageIndex: 1,
      pageSize: 20,
      fromData: [],
      toData: [],
      dateTime: '',
      tableData: [],
      updateStateInfo: {},
      searchCondition: {
        check_manager_condition: '',
        check_type_condition: '',
        check_date_start_condition: '',
        check_date_end_condition: ''
      },
      dialogVisible: false,
      resonList: [
        {
          value: '理由1',
          label: '理由1'
        },
        {
          value: '理由2',
          label: '理由2'
        },
        {
          value: '理由3',
          label: '理由3'
        }
      ],
      dayVisible1: false,
      updateStatusVisible: false,
      enterDataVisible: false,
      check_model_id: null
    }
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    handleNodeClick(data) {
      // console.log(data.name)
    },
    async handleEnter(val) {
      var res = await post(findModelItemsByModelId + val.check_model_id, {})
      this.datastr = res.data.checkDevicesElectricList
      this.dataMachine = res.data.checkDevicesMachineList
      this.checkDateStr = res.data.checkDateStr
      this.checkType = res.data.checkType
      this.checkManagerName = res.data.checkManagerName
      this.check_model_id = val.check_model_id
      this.enterDataVisible = true
    },
    async handleCommit() {
      // 是否需要对未选择的点检结果做处理 当前都当作以后再测处理
      this.dataCommit = this.datastr.concat(this.dataMachine)
      var res = await post(updateModelItemsByModelId, {
        indocno: this.check_model_id,
        defaultList: this.dataCommit
      })
      this.enterDataVisible = false
    },
    cancelCommit() {
      this.enterDataVisible = false
      this.handleSearch()
    },
    async handleTransfer() {
      var res = await post(updateModelItemsByModelId, {
        indocno: this.check_model_id,
        defaultList: this.fromData
      })
      this.dayVisible1 = false
    },
    cancelTransfer() {
      this.fromData = []
      this.toData = []
      this.dayVisible1 = false
      this.handleSearch()
    },
    // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
    async handleExportExcel() {
      console.log('====', this.updateStateInfo.check_complete_ornot)
      // 导出代码
      if (this.updateStateInfo.check_complete_ornot === '1') {
        let data = {
          method: 'get',
          url:
            location.origin + '/api/' + exportCheckTable + this.check_model_id
        }
        await exportMethod(data)
      }
      var res = await post(updateCheckSchedule, {
        rollDevicecheckschedule: this.updateStateInfo
      })
      this.updateStatusVisible = false
      this.handleSearch()
      this.updateStateInfo = {}
    },
    needCheckChange(val) {
      if (val === '1') {
        this.needCheckOrnot = true
        this.confirmButton = '确认并导出点检表'
        this.updateStateInfo.check_incomplete_reason = null
        this.updateStateInfo.check_comments = null
      } else {
        this.needCheckOrnot = false
        this.confirmButton = '确认'
      }
    },
    async handleSearch() {
      var res = await post(findCheckScheduleByPage, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchCondition
      })
      this.tableData = res.data
      this.total = res.count
    },
    // 监听穿梭框组件添加
    add(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的        {keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      this.fromData = fromData
      this.toData = toData
      this.obj = obj
    },
    // 监听穿梭框组件移除
    remove(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      this.fromData = fromData
      this.toData = toData
      this.obj = obj
    },
    /**
     * description: 点检项目1
     */
    async handleOpen(val) {
      this.dayVisible1 = true
      this.check_model_id = val.check_model_id
      var res = await post(findTreeInfoByIndocno, {
        indocno: val.indocno
      })
      this.fromData = res.data.defaultList
      this.toData = res.data.remainList
    },
    cancelUpdate() {
      this.disUpdateVisible = false
      this.handleSearch()
    },
    /**
     * description: 是否点检
     */
    handleChange(val) {
      let checkStr =
        val.check_type == 0 ? '日检' : val.check_type == 1 ? '停机检' : '年检'
      this.titleName = '是否安排今日' + checkStr + '检:	'
      this.check_model_id = val.check_model_id
      this.updateStatusVisible = true
      this.updateStateInfo = val
      this.updateStateInfo.check_complete_ornot = val.check_complete_ornot.toString()
      this.needCheckChange(this.updateStateInfo.check_complete_ornot)
      this.$forceUpdate()
    },
    cancelUpdateState() {
      this.updateStatusVisible = false
      this.handleSearch()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.handleSearch()
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
.aaa {
  display: flex;
  justify-content: space-between;
  color: #eae8c5;
}
.transfer-title {
  background-color: #1a367a !important;
}
.transfer-title span {
  color: #ebeef5;
}
.el-tabs__item {
  color: #ebeef5;
}
.el-radio__label {
  color: #ebeef5;
}
</style>
