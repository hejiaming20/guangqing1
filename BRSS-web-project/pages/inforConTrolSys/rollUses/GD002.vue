<template>
  <div>
    <!-- 磨削优先级管理 -->
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
    </div>
    <div class="layout-small-title-block">
      <span>{{ name_id }}#磨床状态 <el-switch
        v-model="value1"
        :active-value="1"
        :inactive-value="0"
        :disabled="machine_no? false: true"
        active-color="#409EFF"
        inactive-color="#F56C6C"
        @change="moChange()"/></span>
    </div>
    <Table-easy
      :table-data="tableData_all"
      :total="total1"
      :table-stripe="false"
      :is-pagination-show="false"
      :table-foot="false"
      :table-head="false"
      :row-class-name="setRowColor"
      :table-height="'calc(100vh - 150px)'">
      <template slot="TableBody">
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)">磨削
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleReset(scope.row)">取消
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="roll_no"
          label="辊号"
          align="center"/>
        <el-table-column
          prop="slevel"
          label="优先级"
          align="center"/>
        <el-table-column
          prop="body_diameter"
          label="辊径"
          align="center"/>
      </template>
    </Table-easy>
    
    <!-- 编辑弹窗 -->
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
    <!-- 取消弹窗 -->
    <el-dialog
      :visible.sync="resetDialogVisible"
      class="layout-dialog"
      title="取消内容"
      width="30%">
      <div class="layout-search">
        <el-form
          ref="resetSF"
          :model="resetSendForm">
          <el-form-item 
            :rules="[
              { required: true, message: '请输入取消原因', trigger: 'blur' }
            ]" 
            label="取消原因"
            prop="back_reason">
            <el-input 
              v-model="resetSendForm.back_reason" 
              type="textarea"/>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="mini"
          type="primary"
          @click="resetDialogVisible = false">取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleResetSubmit()">确 定</el-button>
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
                size="small"
                type="primary"
                @click="detail_hand()">确认提交</el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                size="small"
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
import { get, post } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
export default {
  components: { TableEasy },
  data() {
    return {
      value1: 1,
      value2: true,
      value3: true,
      value4: true,
      value5: true,
      value6: true,
      tableData1: [],
      tableData_all: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      tableData6: [],
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
      dialogVisible: false,
      roles: '',
      name_id: '',
      machine_no: '',
      resetDialogVisible: false, // 取消弹窗
      resetSendForm: {}, // 存放取消原因
      updataDialogVisible: false, //事故录入取消弹窗
      searchInfo: {}, //事故录入表单
      accidentTypeArray: [], //事故类型
      accidentReasonArray: [], //事故原因
      bzArray: [], //班组
      options: [],
      eqTypeArray: [], //设备类型
      fileList: [], //上传文件
      pulse: false,
      rules: {
        accident_typeid: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        accident_reasonid: [
          { required: true, message: '请选择事故原因', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    post('/dictionary/findMapV1', { dicno: 'machine' }).then(res => {
      this.option = res.data
    })
    post('/dictionary/findMapV1', { dicno: 'eq_type' }).then(res => {
      this.options = res.data //设备类型
    })
    post('/dictionary/findMapV1', { dicno: 'acc_type' }).then(res => {
      this.accidentTypeArray = res.data //事故类型
    })
    post('/dictionary/findMapV1', { dicno: 'acc_reason' }).then(res => {
      this.accidentReasonArray = res.data //事故原因
    })
    post('/dictionary/findMapV1', { dicno: 'team' }).then(res => {
      this.bzArray = res.data //班组
    })
    this.roles = localStorage.getItem('storeID') //  JSON.parse(localStorage.limits)

    if (this.roles.indexOf('20') != -1) {
      this.name_id = '1号'
      this.machine_no = 1
    }
    if (this.roles.indexOf('15') != -1) {
      this.name_id = '2号'
      this.machine_no = 2
    }
    if (this.roles.indexOf('16') != -1) {
      this.name_id = '3号'
      this.machine_no = 3
    }
    if (this.roles.indexOf('17') != -1) {
      this.name_id = '4号'
      this.machine_no = 4
    }
    if (this.roles.indexOf('18') != -1) {
      this.name_id = '5号'
      this.machine_no = 5
    }
    if (this.roles.indexOf('19') != -1) {
      this.name_id = '6号'
      this.machine_no = 6
    }
    this.findAll()

    if (this.machine_no) {
      this.findmoState()
    }
  },
  methods: {
    moChange() {
      if (this.machine_no) {
        if (this.value1 == 0) {
          this.updataDialogVisible = true
        } else {
          this.updataMoState(this.machine_no, this.value1)
        }
      }
    },
    // 查看磨床状态
    async findmoState() {
      let res = await post('rollMachine/findstate', {
        indocno: this.machine_no
      })
      if (res.status == 2000) {
        this.value3 = res.data
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
            this.updataMoState(this.machine_no, this.value1)
          })
        } else {
          return false
        }
      })
    },
    resetshigu() {
      this.updataDialogVisible = false
      this.$refs.shiguForm.resetFields()
      this.findmoState()
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
    // 取消按钮
    handleReset(val) {
      console.log(val.roll_revolve)
      if (val.roll_revolve !== 1) {
        return
      } else {
        this.resetSendForm = Object.assign({}, val)
        this.resetDialogVisible = true
      }
    },

    // 发送取消原因
    async handleResetSubmit() {
      this.$refs.resetSF.validate(valid => {
        if (valid) {
          post('rollPushnew/cancel', {
            back_reason: this.resetSendForm.back_reason,
            rollPushnew: {
              roll_no: this.resetSendForm.roll_no,
              machine_no: this.resetSendForm.machine_id
            }
          }).then(res => {
            if (res.status == 2000) {
              this.$message(res.msg)
              this.findAll()
            } else {
              this.$message(res.msg)
            }
            this.resetDialogVisible = false
            this.$refs.resetSF.resetFields()
          })
        } else {
          return false
        }
      })
    },

    // 刷新
    refresh() {
      this.pulse = true
      setTimeout(() => {
        this.pulse = false
      }, 1000)
      if (this.machine_no) {
        this.moChange()
      }
      this.findAll()
    },
    setRowColor({ row, rowIndex }) {
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
    findAll() {
      this.tableData_all = []
      if (this.roles.indexOf('20') != -1) {
        this.name_id = '1号'
        this.machine_no = 1
        post('rollInformation/findMachine', {
          pageIndex: 1,
          pageSize: 10000000,
          condition: {
            roll_revolve: '1,6',
            machine_id: 1
          }
        }).then(res => {
          this.tableData_all = res.data
        })
      }
      if (this.roles.indexOf('15') != -1) {
        this.name_id = '2号'
        this.machine_no = 2
        post('rollInformation/findMachine', {
          pageIndex: 1,
          pageSize: 10000000,
          condition: {
            roll_revolve: '1,6',
            machine_id: 2
          }
        }).then(res => {
          this.tableData_all = res.data
        })
      }
      if (this.roles.indexOf('16') != -1) {
        this.name_id = '3号'
        this.machine_no = 3
        post('rollInformation/findMachine', {
          pageIndex: 1,
          pageSize: 10000000,
          condition: {
            roll_revolve: '1,6',
            machine_id: 3
          }
        }).then(res => {
          this.tableData_all = res.data
        })
      }
      if (this.roles.indexOf('17') != -1) {
        this.name_id = '4号'
        this.machine_no = 4
        post('rollInformation/findMachine', {
          pageIndex: 1,
          pageSize: 10000000,
          condition: {
            roll_revolve: '1,6',
            machine_id: 4
          }
        }).then(res => {
          this.tableData_all = res.data
        })
      }
      if (this.roles.indexOf('18') != -1) {
        this.name_id = '5号'
        this.machine_no = 5
        post('rollInformation/findMachine', {
          pageIndex: 1,
          pageSize: 10000000,
          condition: {
            roll_revolve: '1,6',
            machine_id: 5
          }
        }).then(res => {
          this.tableData_all = res.data
        })
      }
      if (this.roles.indexOf('19') != -1) {
        this.name_id = '6号'
        this.machine_no = 6
        post('rollInformation/findMachine', {
          pageIndex: 1,
          pageSize: 10000000,
          condition: {
            roll_revolve: '1,6',
            machine_id: 6
          }
        }).then(res => {
          this.tableData_all = res.data
        })
      }
    },

    handleEdit(data) {
      // roll_revolve 为周转状态 1为在磨削，6为待磨削
      if (data.roll_revolve == 1) {
        return
      }
      // for (const item of this.tableData_all) {
      //   if (item.roll_revolve == 1) {
      //     return
      //   }
      // }
      this.$confirm('磨削后将无法修改, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('rollInformation/updaterevoleve', {
            roll_no: data.roll_no,
            roll_revolve: 1
          }).then(res => {
            if (res.status == 2000) {
              post('workFlow/startFlow', {
                flow_no: '2020102420034522mx' + this.machine_no,
                type: 'mx',
                list: [
                  {
                    roll_no: data.roll_no,
                    production_line_id: data.production_line_id,
                    roll_typeid: data.roll_typeid,
                    frame_noid: data.frame_noid,
                    material_id: data.material_id,
                    factory_id: data.factory_id,
                    production_line: data.production_line,
                    roll_type: data.roll_type,
                    frame_no: data.frame_no,
                    material: data.material,
                    factory: data.factory,
                    machine_no: this.machine_no
                  }
                ]
              }).then(res => {
                if (res.status == 2000) {
                  this.$message({
                    type: 'success',
                    message: '发起成功'
                  })
                  this.findAll()
                } else {
                  this.$message('发起失败')
                }
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消磨削'
          })
        })
    },

    handleSave() {
      this.dialogVisible = false
      post('rollInformation/update', {
        rollInformation: this.formLabelAlign
      }).then(res => {
        if (res) {
          this.findAll()
        }
      })
    }
  }
}
</script>

<style>
.el-table .warning-row {
  background-color: #e6a23c !important;
}
</style>
