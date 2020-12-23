<!--
 * @Author: your name
 * @Date: 2020-11-23 11:07:10
 * @LastEditTime: 2020-11-27 15:26:35
 * @LastEditors: Please set LastEditors
 * @Description: 磨削优先级评价（精轧）
 * @FilePath: \BRSS-web-project\pages\inforConTrolSys\rollUses\GD010.vue
-->
<template>
  <div>
    <!-- 精轧主操磨削管理 -->
    <div 
      class="c_table-title" 
      style="border-bottom: 1px solid #001f6b">
      <i class="iconfont icon-biaoti1"/>
      <span>磨床信息</span>
      <!-- 刷新-->
      <el-tooltip 
        content="刷新" 
        effect="dark" 
        placement="top" 
        class="function-item">
        <i 
          :class=" pulse ? 'el-icon-refresh icon-rotate' : 'el-icon-refresh' " 
          @click="refresh()"
        />
      </el-tooltip>
      <div
        style="float:right">
        <el-button
          size="mini"
          type="primary"
          @click="advice()"
        >
          磨削推荐
        </el-button>
      </div>
    </div>
    <el-row :gutter="5">
      <el-col
        :xl="12"
        :lg="12"
        class="layout-default-margin">
        <div class="layout-small-title-block"><span>3#磨床状态 <el-switch
          v-model="value3"
          :active-value="1"
          :inactive-value="0"
          active-color="#409EFF"
          inactive-color="#F56C6C"
          @change="moChange3()"/></span>
        </div>
        <Table-easy
          :table-data="tableData3"
          :total="total3"
          :table-stripe="false"
          :is-pagination-show="false"
          :table-foot="false"
          :row-class-name="setRowColor3"
          :table-head="false"
          table-height="400">
          <template slot="TableBody">
            <el-table-column
              prop="roll_no"
              label="辊号"
              align="center"/>
            <el-table-column
              prop="ilevel"
              label="优先级"
              align="center"/>
            <el-table-column
              prop="body_diameter"
              label="辊径"
              align="center"/>
            <el-table-column
              label="操作"
              min-width="150"
              align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.row)">操作
                </el-button>
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-top"
                  @click="handleremove_up(scope.row,0,scope.$index)"/>
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-bottom"
                  @click="handleremove_down(scope.row,0,scope.$index)"/>
              </template>
            </el-table-column>
          </template>
        </Table-easy>
      </el-col>
      <el-col
        :xl="12"
        :lg="12"
        class="layout-default-margin">
        <div class="layout-small-title-block"><span>4#磨床状态
          <el-switch
            v-model="value4"
            :active-value="1"
            :inactive-value="0"
            active-color="#409EFF"
            inactive-color="#F56C6C"
            @change="moChange4()"/>
        </span>
        </div>
        <Table-easy
          :table-data="tableData4"
          :total="total4"
          :table-stripe="false"
          :row-class-name="setRowColor4"
          :is-pagination-show="false"
          :table-foot="false"
          :table-head="false"
          table-height="400">
          <template slot="TableBody">
            <el-table-column
              prop="roll_no"
              label="辊号"
              align="center"/>
            <el-table-column
              prop="ilevel"
              label="优先级"
              align="center"/>
            <el-table-column
              prop="body_diameter"
              label="辊径"
              align="center"/>
            <el-table-column
              label="操作"
              min-width="150"
              align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.row)">操作
                </el-button>
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-top"
                  @click="handleremove_up(scope.row,1,scope.$index)"/>
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-bottom"
                  @click="handleremove_down(scope.row,1,scope.$index)"/>
              </template>
            </el-table-column>
          </template>
        </Table-easy>
      </el-col>
      <el-col
        :xl="12"
        :lg="12"
        class="layout-default-margin">
        <div class="layout-small-title-block"><span>5#磨床状态 <el-switch
          v-model="value5"
          :active-value="1"
          :inactive-value="0"
          active-color="#409EFF"
          inactive-color="#F56C6C"
          @change="moChange5()"/></span>
        </div>
        <Table-easy
          :table-data="tableData5"
          :total="total5"
          :table-stripe="false"
          :is-pagination-show="false"
          :row-class-name="setRowColor5"
          :table-foot="false"
          :table-head="false"
          table-height="400">
          <template slot="TableBody">
            <el-table-column
              prop="roll_no"
              label="辊号"
              align="center"/>
            <el-table-column
              prop="ilevel"
              label="优先级"
              align="center"/>
            <el-table-column
              prop="body_diameter"
              label="辊径"
              align="center"/>
            <el-table-column
              label="操作"
              min-width="150"
              align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.row)">操作
                </el-button>
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-top"
                  @click="handleremove_up(scope.row,2,scope.$index)"/>
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-bottom"
                  @click="handleremove_down(scope.row,2,scope.$index)"/>
              </template>
            </el-table-column>
          </template>
        </Table-easy>
      </el-col>
      <el-col
        :xl="12"
        :lg="12"
        class="layout-default-margin">
        <div class="layout-small-title-block"><span>6#磨床状态 <el-switch
          v-model="value6"
          :active-value="1"
          :inactive-value="0"
          active-color="#409EFF"
          inactive-color="#F56C6C"
          @change="moChange6()"/></span>
        </div>
        <Table-easy
          :table-data="tableData6"
          :total="total6"
          :table-stripe="false"
          :is-pagination-show="false"
          :row-class-name="setRowColor6"
          :table-foot="false"
          :table-head="false"
          table-height="400">
          <template slot="TableBody">
            <el-table-column
              prop="roll_no"
              label="辊号"
              align="center"/>
            <el-table-column
              prop="ilevel"
              label="优先级"
              align="center"/>
            <el-table-column
              prop="body_diameter"
              label="辊径"
              align="center"/>
            <el-table-column
              label="操作"
              min-width="150"
              align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.row)">操作
                </el-button>
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-top"
                  @click="handleremove_up(scope.row,3,scope.$index)"/>
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-bottom"
                  @click="handleremove_down(scope.row,3,scope.$index)"/>
              </template>
            </el-table-column>
          </template>

        </Table-easy>
      </el-col>
    </el-row>

    <!--弹窗编辑-->
    <el-dialog
      :visible.sync="dialogVisible"
      class="layout-dialog"
      title="进度"
      width="30%">
      <div class="layout-search">
        <el-form
          ref="stepForm"
          :model="formLabelAlign"
          label-width="120px">
          <el-form-item
            label="磨床"
            prop="need">
            <el-select
              v-model="formLabelAlign.need"
              placeholder="请选择"
              @change="matchine_change">
              <el-option
                v-for="item in option"
                :key="item.key"
                :label="item.value"
                :value="item.key"/>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="mini"
          type="primary"
          @click="dialogVisible = false">取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleSave()">确 定</el-button>
      </span>
    </el-dialog>
    <!--移动-->
    <el-dialog
      :visible.sync="dialogVisible1"
      class="layout-dialog"
      title="移动"
      width="30%">
      <div class="layout-search">
        <el-form
          ref="stepForm"
          :model="formLabelAlign1"
          label-width="120px">
          <el-form-item
            label="移动到该辊号"
            prop="">
            <el-select
              v-model="formLabelAlign1.roll_noll"
              placeholder="请选择"
              @change="remove_change">
              <el-option
                v-for="item in roll_num"
                :key="item.key"
                :label="item.value"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="mini"
          type="primary"
          @click="dialogVisible1 = false">取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleSave_remove()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 事故录入 -->
    <el-dialog
      :visible.sync="updataDialogVisible"
      :before-close="resetshigu"
      title="事故录入"
      class="layout-dialog"
      width="80%">
      <div class="layout-search">
        <el-form
          ref="shiguForm"
          :model="searchInfo"
          :rules="rules"
          label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item
                label="事故类型"
                label-width="110px"
                prop="accident_typeid">
                <el-select
                  v-model="searchInfo.accident_typeid"
                  allow-create
                  placeholder="请选择"
                  @change="handleTypeChange">
                  <el-option
                    v-for="item in accidentTypeArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="事故原因"
                label-width="110px"
                prop="accident_reasonid">
                <el-select
                  v-model="searchInfo.accident_reasonid"
                  allow-create
                  placeholder="请选择"
                  @change="handleReasonChange">
                  <el-option
                    v-for="item in accidentReasonArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="班组"
                label-width="110px"
                prop="ibz"
              >
                <el-select
                  v-model="searchInfo.ibz"
                  allow-create
                  placeholder="请选择"
                  @change="handleBzChange">
                  <el-option
                    v-for="item in bzArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="当班责任人"
                label-width="110px"
                prop="duty_user">
                <el-input
                  v-model="searchInfo.duty_user"
                  style="width:210px"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                v-show="searchInfo.accident_typeid != 1"
                label="设备名称"
                label-width="110px"
                prop="eq_typeid">
                <el-select
                  v-model="searchInfo.eq_typeid"
                  allow-create
                  placeholder="请选择"
                  @change="handleEqTypeChange"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <el-form-item
                v-show="searchInfo.accident_typeid != 2 && searchInfo.accident_typeid != 3"
                label="轧辊号"
                label-width="110px"
              >
                <el-input
                  v-model="searchInfo.roll_no"
                  style="width:210px" />
              </el-form-item>
              <el-form-item
                v-show="searchInfo.accident_typeid != 2 && searchInfo.accident_typeid != 3"
                label="轴承座号"
                label-width="110px"
                prop="chock_no">
                <el-input
                  v-model="searchInfo.chock_no"
                  style="width:210px" />
              </el-form-item>
              <el-form-item
                label="事故联络人"
                label-width="110px"
                prop="connection_user">
                <el-input
                  v-model="searchInfo.connection_user"
                  style="width:210px"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="上机时间定位"
                label-width="110px"
                prop="uplinetime">
                <el-date-picker
                  v-model="searchInfo.uplinetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="上机时间"/>
              </el-form-item>
              <el-form-item
                label="下机时间定位"
                label-width="110px"
                prop="lowlinetime">
                <el-date-picker
                  v-model="searchInfo.lowlinetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="下机时间"/>
              </el-form-item>
              <el-form-item
                label="磨削时间定位"
                label-width="110px"
                prop="grinding_time">
                <el-date-picker
                  v-model="searchInfo.grinding_time"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="磨削时间"/>
              </el-form-item>
              
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="事故开始时间"
                label-width="110px"
                prop="dstart">
                <div class="RM011-time">
                  <el-date-picker
                    v-model="searchInfo.dstart"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="开始时间"/>
                </div>
              </el-form-item>
              <el-form-item
                label="事故结束时间"
                label-width="110px"
                prop="dend">
                <div class="RM011-time">
                  <el-date-picker
                    v-model="searchInfo.dend"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="结束时间"/>
                </div>
              </el-form-item>
              <el-form-item
                label="装配时间定位"
                label-width="110px"
                prop="pairedtime">
                <el-date-picker
                  v-model="searchInfo.pairedtime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="装配时间"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item
              label="事故分析"
              label-width="110px"
            >
              <el-input
                :rows="2"
                v-model="searchInfo.accident_analysis"
                type="textarea"
                placeholder="请输入内容"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="解决过程"
              label-width="110px"
            >
              <el-input
                :rows="2"
                v-model="searchInfo.solving_process"
                type="textarea"
                placeholder="解决过程"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col
              :span="2"
              :offset="6">
              <el-button
                size="mini"
                type="primary"
                @click="detail_hand()">确认提交</el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                size="mini"
                type="primary"
                @click="resetshigu">取 消</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { get, pythonPOST2, post } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
export default {
  components: { TableEasy },
  data() {
    return {
      rules: {
        accident_typeid: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        accident_reasonid: [
          { required: true, message: '请选择事故原因', trigger: 'change' }
        ]
      },
      value1: 1,
      value2: 1,
      value3: 1,
      value4: 1,
      value5: 1,
      value6: 1,
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      tableData6: [],
      table: [],
      total1: 0,
      total2: 0,
      total3: 0,
      total4: 0,
      total5: 0,
      total6: 0,
      option: [],
      total: 0,
      search_roll_no: {},
      tableData_01: [],
      total_01: '',
      formLabelAlign: {},
      formLabelAlign1: {},
      dialogVisible: false,
      dialogVisible1: false,
      roll_num: [],
      roll_1: '',
      ilevel_1: '',
      roll_2: '',
      ilevel_2: '',
      pulse: false,
      updataDialogVisible: false,
      searchInfo: {},
      accidentTypeArray: [],
      options: [],
      accidentReasonArray: [],
      bzArray: []
    }
  },
  mounted() {
    post('/dictionary/findMapV1', { dicno: 'machine' }).then(res => {
      this.option = res.data
    })
    post('/dictionary/findMapV1', { dicno: 'acc_type' }).then(res => {
      this.accidentTypeArray = res.data //事故类型
    })
    post('/dictionary/findMapV1', { dicno: 'acc_reason' }).then(res => {
      this.accidentReasonArray = res.data //事故原因
    })
    post('/dictionary/findMapV1', { dicno: 'eq_type' }).then(res => {
      this.options = res.data //设备类型
    })
    post('/dictionary/findMapV1', { dicno: 'team' }).then(res => {
      this.bzArray = res.data //班组
    })
    this.findAll()

    this.findmoState3()
    this.findmoState4()
    this.findmoState5()
    this.findmoState6()
  },
  methods: {
    // 磨削推荐
    async advice() {
      let res = await pythonPOST2('/python/RollGrindingPriority/')
      this.findAll()
    },
    moChange3() {
      if (this.value3 == 0) {
        this.updataDialogVisible = true
      } else {
        this.updataMoState(3, this.value3)
      }
    },
    moChange4() {
      if (this.value4 == 0) {
        this.updataDialogVisible = true
      } else {
        this.updataMoState(4, this.value4)
      }
    },
    moChange5() {
      if (this.value5 == 0) {
        this.updataDialogVisible = true
      } else {
        this.updataMoState(5, this.value5)
      }
    },
    moChange6() {
      if (this.value6 == 0) {
        this.updataDialogVisible = true
      } else {
        this.updataMoState(6, this.value6)
      }
    },
    // 查看磨床状态
    async findmoState3() {
      let res = await post('rollMachine/findstate', { indocno: 3 })
      if (res.status == 2000) {
        this.value3 = res.data
      }
    },
    async findmoState4() {
      let res = await post('rollMachine/findstate', { indocno: 4 })
      if (res.status == 2000) {
        this.value4 = res.data
      }
    },
    async findmoState5() {
      let res = await post('rollMachine/findstate', { indocno: 5 })
      if (res.status == 2000) {
        this.value5 = res.data
      }
    },
    async findmoState6() {
      let res = await post('rollMachine/findstate', { indocno: 6 })
      if (res.status == 2000) {
        this.value6 = res.data
      }
    },
    // 事故录入
    detail_hand() {
      this.$refs.shiguForm.validate(valid => {
        if (valid) {
          post('/productionAccidents/insert', {
            productionAccidents: this.searchInfo
          }).then(res => {
            if (res.status == 2000) {
              this.$message({
                type: 'success',
                message: '提交成功!'
              })
              this.updataDialogVisible = false
            }
            this.updataMoState(3, this.value3)
            this.updataMoState(4, this.value4)
            this.updataMoState(5, this.value5)
            this.updataMoState(6, this.value6)
          })
        } else {
          return false
        }
      })
    },
    resetshigu() {
      this.updataDialogVisible = false
      this.findmoState3()
      this.findmoState4()
      this.findmoState5()
      this.findmoState6()
    },
    handleTypeChange() {
      this.accidentTypeArray.forEach(item => {
        if (item.key == this.searchInfo.accident_typeid) {
          this.searchInfo.accident_type = item.value
        }
      })
    },
    handleReasonChange() {
      this.accidentReasonArray.forEach(item => {
        if (item.key == this.searchInfo.accident_reasonid) {
          this.searchInfo.accident_reason = item.value
        }
      })
    },
    handleEqTypeChange() {
      this.options.forEach(item => {
        if (item.key == this.searchInfo.eq_typeid) {
          this.searchInfo.eq_type = item.value
        }
      })
    },
    handleBzChange() {
      this.bzArray.forEach(item => {
        if (item.key == this.searchInfo.ibz) {
          this.searchInfo.bz = item.value
        }
      })
    },
    // 修改磨床状态
    async updataMoState(indocno, machine_state) {
      let res = await post('rollMachine/updateState', {
        indocno: indocno,
        machine_state: machine_state
      })
      if (res.status != 2000) {
        this.$message('操作失败')
      }
    },
    // 刷新
    refresh() {
      this.pulse = true
      setTimeout(() => {
        this.pulse = false
      }, 1000)
      this.findAll()
      this.findmoState3()
      this.findmoState4()
      this.findmoState5()
      this.findmoState6()
    },
    setRowColor1({ row, rowIndex }) {
      if (row.roll_revolve === 1) {
        return 'warning-row'
      }
    },
    setRowColor2({ row, rowIndex }) {
      if (row.roll_revolve === 1) {
        return 'warning-row'
      }
    },
    setRowColor3({ row, rowIndex }) {
      if (row.roll_revolve === 1) {
        return 'warning-row'
      }
    },
    setRowColor4({ row, rowIndex }) {
      if (row.roll_revolve === 1) {
        return 'warning-row'
      }
    },
    setRowColor5({ row, rowIndex }) {
      if (row.roll_revolve === 1) {
        return 'warning-row'
      }
    },
    setRowColor6({ row, rowIndex }) {
      if (row.roll_revolve === 1) {
        return 'warning-row'
      }
    },
    matchine_change(vId_1) {
      let obj = {}
      obj = this.option.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.key == vId_1) {
          this.formLabelAlign.machine_id = item.key
        }
      })
    },
    remove_change(vId_1) {
      let obj = {}
      obj = this.roll_num.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId_1) {
          this.formLabelAlign1.ilevel_1 = item.key
        }
      })
    },
    /* findAll() {
      this.tableData1 = []
      this.tableData2 = []
      this.tableData3 = []
      this.tableData4 = []
      this.tableData5 = []
      this.tableData6 = []
      this.table = []
      for (let i = 0; 6 > i; i++) {
        post('rollInformation/findMachine', {
          pageIndex: 1,
          pageSize: 10000000,
          condition: {
            roll_revolve: '1,6',
            machine_id: 1 + i
          }
        }).then(res => {
          this.table.push(res.data)
        })
      }

      setTimeout(() => {
        console.log(this.table[0])
        this.tableData1 = this.table[0]
        this.tableData2 = this.table[1]
        this.tableData3 = this.table[2]
        this.tableData4 = this.table[3]
        this.tableData5 = this.table[4]
        this.tableData6 = this.table[5]
      }, 500)
    },*/
    findAll() {
      this.table = []
      this.tableData1 = []
      this.tableData2 = []
      this.tableData3 = []
      this.tableData4 = []
      this.tableData5 = []
      this.tableData6 = []
      this.resect(0, 6)
    },
    resect(num, length) {
      post('rollInformation/findMachine', {
        pageIndex: 1,
        pageSize: 10000000,
        condition: {
          roll_revolve: '1,6',
          machine_id: 1 + num
        }
      }).then(res => {
        this.table.push(res.data)
        if (++num < length) {
          this.resect(num, length)
        } else {
          this.tableData1 = this.table[0]
          this.tableData2 = this.table[1]
          this.tableData3 = this.table[2]
          this.tableData4 = this.table[3]
          this.tableData5 = this.table[4]
          this.tableData6 = this.table[5]
        }
      })
    },
    handleEdit(data) {
      this.dialogVisible = true
      this.formLabelAlign = data
      /* if (data.machine_id == 1) {
        this.formLabelAlign.need = '1号磨床'
        this.formLabelAlign.machine_id = 1
      }*/
    },
    handleSave() {
      this.dialogVisible = false
      post('rollInformation/update', {
        rollInformation: this.formLabelAlign
      }).then(res => {
        this.findAll()
      })
    },
    handleremove(row, num) {
      this.roll_1 = row.roll_no
      this.ilevel_1 = row.ilevel
      this.roll_2 = ''
      this.ilevel_2 = ''
      console.log(row.roll_no)
      this.roll_num = []
      this.table[num].forEach(item => {
        this.roll_num.push({ key: item.ilevel, value: item.roll_no })
      })
      console.log('aa', this.roll_num)
      for (let i = 0; this.roll_num.length > i; i++) {
        if (this.roll_num[i].roll_no == this.roll_1) {
          this.roll_2 = this.roll_num[i - 1].roll_no
          this.ilevel_2 = this.roll_num[i - 1].ilevel
          post('rollInformation/changelevel', {
            a_roll: this.roll_1,
            a_level: this.ilevel_1,
            b_roll: this.roll_2,
            b_level: this.ilevel_2
          }).then(res => {
            this.findAll()
          })
        }
      }

      this.dialogVisible1 = true
    },
    handleremove_up(row, num, index) {
      if (index != 0) {
        this.roll_2 = ''
        this.ilevel_2 = ''
        this.roll_1 = row.roll_no
        this.ilevel_1 = row.ilevel
        console.log(row.roll_no)
        this.roll_num = []
        this.table[num].forEach(item => {
          this.roll_num.push({ ilevel: item.ilevel, roll_no: item.roll_no })
        })
        console.log('aa', this.roll_num)

        this.roll_2 = this.roll_num[index - 1].roll_no
        this.ilevel_2 = this.roll_num[index - 1].ilevel
        post('rollInformation/changelevel', {
          a_roll: this.roll_1,
          a_level: this.ilevel_1,
          b_roll: this.roll_2,
          b_level: this.ilevel_2
        }).then(res => {
          this.findAll()
        })
      } else {
        alert('已到达顶端')
      }
    },
    handleremove_down(row, num, index) {
      this.roll_2 = ''
      this.ilevel_2 = ''
      this.roll_1 = row.roll_no
      this.ilevel_1 = row.ilevel
      console.log(row.roll_no)
      this.roll_num = []
      this.table[num].forEach(item => {
        this.roll_num.push({ ilevel: item.ilevel, roll_no: item.roll_no })
      })
      this.roll_2 = this.roll_num[index + 1].roll_no
      this.ilevel_2 = this.roll_num[index + 1].ilevel
      post('rollInformation/changelevel', {
        a_roll: this.roll_2,
        a_level: this.ilevel_2,
        b_roll: this.roll_1,
        b_level: this.ilevel_1
      }).then(res => {
        this.findAll()
      })
    }
  }
}
</script>

<style>
.refresh {
  float: right;
  padding-bottom: 5px;
  /* height: 10px;*/
}
.el-table .warning-row {
  background-color: #e6a23c !important;
}
.asa {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  line-height: 23px;
  padding-right: 10px;
}
.asa :hover {
  background-color: #8d4038;
  height: 20px;
  /*width: 25px;
  height: 25px;*/
}
</style>
