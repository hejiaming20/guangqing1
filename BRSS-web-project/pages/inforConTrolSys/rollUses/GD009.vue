<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :page-size="pageSize"
      :table-height="'calc(100vh - 190px)'"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <template slot="TableHead">
        <div :class="searchFlag ? 'GD-search' : 'GD9-search-ipad' ">
          <el-form
            ref="ruleForm"
            :inline="true"
            :model="searchInfo"
            class="search-info">
            <div class="space-layout">
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
                    v-for="item in option"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="磨床号"
                prop="machine_no">
                <el-input v-model="searchInfo.machine_no" />
              </el-form-item>
              <div class="btn">
                <div class="search-ipad">
                  <i
                    :class="searchFlag ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
                    @click="searchChange"/>
                </div>
                <el-button
                  size="mini"
                  type="primary"
                  class="gd9-btn"
                  @click="findSearch()">查询</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  class="gd9-btn"
                  @click="resetForm('ruleForm')">重置</el-button>
              </div>
            </div>
            <div class="space-layout">
              <el-form-item
                label="磨削开始时间"
                label-width="100px"
                prop="dbegin">
                <el-date-picker
                  v-model="searchInfo.dbegin"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="开始时间"
                  @focus="resetKeyboard"/>
              </el-form-item>    
              <el-form-item
                label="磨削结束时间"
                label-width="100px"
                prop="dend">
                <el-date-picker
                  v-model="searchInfo.dend"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="结束时间"
                  @focus="resetKeyboard"/>
              </el-form-item>    
              <el-form-item
                label="状态"
                prop="istate">
                <el-select
                  v-model="searchInfo.istate"
                  placeholder="请选择">
                  <el-option
                    v-for="item in istate_option"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </template>
      <template slot="TableBody">
        <el-table-column
          label="操作"
          width="230px"
          align="center">
          <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              type="primary"
              @click="handlejian(scope.row)">待检测</el-button>-->
            <el-button
              size="mini"
              type="primary"
              @click="handleon(scope.row)">{{ btnName1 }}</el-button>
            <!-- <el-button
              v-if="scope.row.istate!=0"
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)">确认接收</el-button>-->
            <el-button
              size="mini"
              type="danger"
              @click="handleRegrind(scope.row)">{{ btnName2 }}</el-button>
            <el-button
              v-if="scope.row.istate == 0"
              size="mini"
              type="primary"
              @click="handlexiugai(scope.row)">修改</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="roll_no"
          width="90px"
          align="center"
          label="辊号"/>
        <el-table-column
          prop="roll_type"
          width="100px"
          show-overflow-tooltip
          label="轧辊类型"/>
        <el-table-column
          prop="sbz"
          width="50px"
          label="班组"/>
        <el-table-column
          width="160px"
          prop="grind_starttime"
          label="磨削开始时间"/>
        <el-table-column
          width="160px"
          prop="grind_endtime"
          label="磨削结束时间"/>
        <el-table-column
          prop="machine_no"
          width="70px"
          label="磨床号"/>
        <el-table-column
          prop="before_diameter"
          width="80px"
          label="磨前直径"/>
        <el-table-column
          prop="after_diameter"
          width="90px"
          label="磨后直径"/>
        <el-table-column
          prop=""
          label="磨削量">
          <template slot-scope="scope">
            <span>{{ scope.row.before_diameter==0||scope.row.after_diameter==0?0: (scope.row.before_diameter-scope.row.after_diameter).toFixed(3) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="deviation"
          width="90px"
          label="辊形偏差"/>
        <el-table-column
          prop="diametermax"
          width="90px"
          label="最大直径"/>
        <el-table-column
          prop="diametermin"
          width="90px"
          label="最小直径"/>
        <el-table-column
          prop="taper"
          width="70px"
          label="锥度"/>
        <el-table-column
          prop="roundness"
          width="60px"
          label="圆度"/>
        <el-table-column
          prop="crack"
          width="60px"
          label="裂纹"/>
        <el-table-column
          prop="hidden_flaws"
          width="60px"
          label="暗伤"/>
        <el-table-column
          prop="qualifiednum"
          width="80px"
          label="合格点数"/>
        <el-table-column
          prop=""
          width="120px"
          label="超声波检测结果"/>
        <el-table-column
          width="120px"
          prop=""
          label="硬度结合层结果"/>
      </template>
    </Table-easy>
    <!-- 待上机 -->
    <el-dialog
      :visible.sync="dialogVisibleChange"
      title="待上机"
      class="layout-dialog gd9-dialog"
      width="50%">
      <Table-easy
        ref="gdTable"
        :table-data="onlineData"
        :table-head="false"
        :total="onlineTotal"
        :page-size="pageSize1"
        :row-class-name="setRowColor"
        table-height="353px"
        @row-click="handleChangeData"
        @handle-current-change="handleCurrentChange1"
        @handle-size-change="handleSizeChange1">
        <template slot="TableBody">
          <el-table-column
            label="辊号"
            width="90px"
            prop="roll_nb"/>
          <el-table-column
            label="磨床号"
            width="80px"
            prop="grinder_no"/>
          <el-table-column
            label="起始时间"
            prop="start_date_time">
            <template slot-scope="scope">
              <span>{{ scope.row.start_date_time | filterDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="辊径"
            prop="present_diam_mid"/>
        </template>
      </Table-easy>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          @click="dialogVisibleChange = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="sendOnline">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 填写不合格原因 -->
    <el-dialog
      :visible.sync="reasonDialog"
      title="不合格原因"
      class="layout-dialog gd9-dialog"
      width="20%">
      <div class="layout-one-input">
        <el-select 
          v-model="reasonForm.snote" 
          placeholder="请选择不合格原因">
          <el-option
            v-for="item in options"
            :key="item.key"
            :label="item.value"
            :value="item.value"/>
        </el-select>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          @click="reasonDialog = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="savebuhege">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改按钮 -->
    <el-dialog
      :visible.sync="editDialog"
      title="修改"
      class="layout-dialog gd9-dialog"
      width="80%">
      <div class="layout-search">
        <el-form 
          ref="form" 
          :model="editForm" 
          label-width="100px">
          <el-row>
            <el-col 
              :xl="6" 
              :sm="12">
              <el-form-item label="辊号">
                <el-input v-model="editForm.roll_no"/>
              </el-form-item>
              <el-form-item label="生产厂家">
                <!-- <el-input v-model="editForm.factory_id"/> -->
                <el-select
                  v-model="editForm.factory_id"
                  placeholder="请选择">
                  <el-option
                    v-for="item in factoryArr"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item label="材质">
                <!-- <el-input v-model="editForm.material_id"/> -->
                <el-select
                  v-model="editForm.material_id"
                  placeholder="请选择">
                  <el-option
                    v-for="item in caizhi"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item label="轧辊类型">
                <!-- <el-input v-model="editForm.roll_typeid"/> -->
                <el-select
                  v-model="editForm.roll_typeid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in option"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item label="暗伤">
                <el-input v-model="editForm.hidden_flaws"/>
              </el-form-item>
             
            </el-col>
            <el-col 
              :xl="6" 
              :sm="12">
              <el-form-item label="机架号">
                <!-- <el-input v-model="editForm.frame_noid"/> -->
                <el-select
                  v-model="editForm.frame_noid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in frameArr"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item label="合格点数">
                <el-input v-model="editForm.qualifiednum"/>
              </el-form-item>
              <el-form-item label="锥度">
                <el-input v-model="editForm.taper"/>
              </el-form-item>
              <el-form-item label="圆度">
                <el-input v-model="editForm.roundness"/>
              </el-form-item>
              <el-form-item label="裂纹">
                <el-input v-model="editForm.crack"/>
              </el-form-item>
            </el-col>
            <el-col 
              :xl="6" 
              :sm="12">
              <el-form-item label="磨前直径">
                <el-input v-model="editForm.before_diameter"/>
              </el-form-item>
              <el-form-item label="磨后直径">
                <el-input v-model="editForm.after_diameter"/>
              </el-form-item>
              <el-form-item label="辊形偏差">
                <el-input v-model="editForm.deviation"/>
              </el-form-item>
              <el-form-item label="最大直径">
                <el-input v-model="editForm.diametermax"/>
              </el-form-item>
              <el-form-item label="产线">
                <!-- <el-input v-model="editForm.production_line"/> -->
                <el-select
                  v-model="editForm.production_line"
                  placeholder="请选择">
                  <el-option
                    v-for="item in proArr"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col 
              :xl="6" 
              :sm="12">
              <el-form-item label="最小直径">
                <el-input v-model="editForm.diametermin"/>
              </el-form-item>
             
              <el-form-item label="不合格原因">
                <!-- <el-input v-model="editForm.snote"/> -->
                <el-select
                  v-model="editForm.snote"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item label="磨削开始时间">
                <!-- <el-input v-model="editForm.grind_starttime"/> -->
                <el-date-picker
                  v-model="editForm.grind_starttime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="开始时间"
                  @focus="resetKeyboard"/>
              </el-form-item>
              <el-form-item label="磨削结束时间">
                <!-- <el-input v-model="editForm.grind_endtime"/> -->
                <el-date-picker
                  v-model="editForm.grind_endtime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="结束时间"
                  @focus="resetKeyboard"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          @click="editDialog = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="xiugai">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get, post, getDataConfig } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
import Echarts from 'echarts'
import moment from 'moment'
import { formatDate, lastDayFormat } from '@/lib/FormatTime'
export default {
  components: { TableEasy },
  filters: {
    filterDate(val) {
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      searchFlag: false,
      searchInfo: {
        istate: '未备辊',
        dbegin: '',
        dend: ''
      },
      searchin: {
        grinder: 1,
        initial_date_time: ''
      },
      formLabelAlign: {},
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 30,
      dialogVisible: false,
      option: [],
      istate_option: [
        {
          value: '已确认',
          key: '0'
        },
        {
          value: '未确认',
          key: '1'
        },
        {
          value: '重磨',
          key: '2'
        }
      ],
      dialogVisibleChange: false,
      formLabel: {},
      onlineData: [],
      onlineTotal: 0,
      pageSize1: 10,
      pageIndex1: 1,
      rowIndex: [],
      btnName1: '待上机',
      btnName2: '重磨',
      options: [], // 不合格原因
      reasonDialog: false,
      snote: '',
      reasonForm: {},
      editDialog: false,
      editForm: {},
      factoryArr: [],
      frameArr: [],
      moarr: [],
      proArr: [],
      teamArr: [],
      shiftArr: [],
      caizhi: []
    }
  },
  mounted() {
    this.findOptions()
    this.searchInfo.dbegin = moment()
      .subtract(1, 'days')
      .format('YYYY-MM-DD HH:mm:ss')
    this.searchInfo.dend = moment().format('YYYY-MM-DD HH:mm:ss')

    let gid = JSON.parse(localStorage.getItem('userInfo')).indocno

    let idarr = [42, 43, 44, 45, 46, 47]

    if (idarr.indexOf(gid) != -1) {
      this.searchInfo.istate = '1'
    } else {
      this.searchInfo.istate = '0'
    }

    if (this.searchInfo.istate == '1') {
      this.btnName1 = '合格'
      this.btnName2 = '不合格'
    }
    if (this.searchInfo.istate == '0') {
      this.btnName1 = '待上机'
      this.btnName2 = '重磨'
    }
    if (gid == 42) {
      this.searchInfo.machine_no = 1
    }
    if (gid == 43) {
      this.searchInfo.machine_no = 2
    }
    if (gid == 44) {
      this.searchInfo.machine_no = 3
    }
    if (gid == 45) {
      this.searchInfo.machine_no = 4
    }
    if (gid == 46) {
      this.searchInfo.machine_no = 5
    }
    if (gid == 47) {
      this.searchInfo.machine_no = 6
    }
    this.findAll()
  },
  methods: {
    handlexiugai(data) {
      this.editDialog = true
      this.editForm = Object.assign({}, data)
    },
    async xiugai() {
      let res = await post('rollGrindingAnnex/update', {
        rollGrindingAnnex: this.editForm
      })
      if (res.status == 2000) {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.findAll()
      } else {
        this.$message('修改失败')
      }
      this.editDialog = false
    },
    findOptions() {
      post('/dictionary/findMapV1', { dicno: 'rolltype' }).then(res => {
        this.option = res.data //轧辊类型（直接使用）
      })
      post('/dictionary/findMapV1', { dicno: 'grind_result' }).then(res => {
        this.options = res.data //不合格原因
      })
      getDataConfig('roll_factory').then(res => {
        this.factoryArr = res
      })
      getDataConfig('frameteam').then(res => {
        this.frameArr = res
      })
      getDataConfig('machine').then(res => {
        this.moarr = res
      })
      getDataConfig('proline').then(res => {
        this.proArr = res
      })
      getDataConfig('team').then(res => {
        this.teamArr = res
      })
      getDataConfig('shift').then(res => {
        this.shiftArr = res
      })
      getDataConfig('roll_material').then(res => {
        this.caizhi = res
      })
    },
    savebuhege() {
      this.reasonDialog = false
      this.sendReason()
      this.sendnote()
    },
    async sendReason() {
      this.reasonForm.roll_revolve = '6'
      this.reasonForm.istate = '2'
      let res = await post('rollGrindingAnnex/update', {
        rollGrindingAnnex: this.reasonForm
      })
      if (res.status == 2000) {
        this.$message({
          type: 'success',
          message: res.msg
        })
        this.findAll()
      } else {
        this.$message(res.msg)
      }
    },
    sendnote() {
      post('rollInformation/updaterevoleve', {
        roll_no: this.reasonForm.roll_no,
        roll_revolve: '6'
      }).then(res => {
        if (res.status != 2000) {
          this.$message(res.msg)
        }
      })
    },
    setRowColor({ row, rowIndex }) {
      if (this.rowIndex.indexOf(row) != -1) {
        return 'setTable-row-class-name'
      }
    },
    handleChangeData(row) {
      if (this.rowIndex.length > 0) {
        if (this.rowIndex.indexOf(row) != -1) {
          this.rowIndex.splice(this.rowIndex.indexOf(row), 1)
        } else {
          this.$message('只可以选择一条数据')
        }
      } else {
        this.rowIndex.push(row)
      }
    },
    // 用于控制收缩查询条件
    searchChange() {
      this.searchFlag = !this.searchFlag
    },
    // 取消日期选择器移动端弹出软键盘
    resetKeyboard() {
      document.activeElement.blur()
    },
    // 重磨按钮
    handleRegrind(data) {
      if (this.searchInfo.istate == '1') {
        this.reasonForm.snote = null
        this.reasonDialog = true
        this.reasonForm = Object.assign({}, data)
      } else {
        this.$confirm('此操作将改变轧辊状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            post('rollInformation/updaterevoleve', {
              roll_no: data.roll_no,
              roll_revolve: '6'
            }).then(res => {
              if (res.status != 2000) {
                this.$message(res.msg)
              }
            })
            data.roll_revolve = '6' // 超哥说要重磨+不合格值都为6，之前为4
            data.istate = '2'
            post('rollGrindingAnnex/update', {
              rollGrindingAnnex: data
            }).then(res => {
              if (res.status == 2000) {
                this.$message({
                  type: 'success',
                  message: '重磨成功!'
                })
                this.findAll()
              } else {
                this.$message(res.msg)
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      }
    },
    handleEdit(data) {
      this.$confirm('此操作将确认该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('rollInformation/updaterevoleve', {
            roll_no: data.roll_no,
            roll_revolve: '4'
          }).then(res => {
            if (res.status !== 2000) {
              this.$message(res.msg)
            }
          })
          data.roll_revolve = '4'
          data.istate = '0'
          post('rollGrindingAnnex/update', {
            rollGrindingAnnex: data
          }).then(res => {
            if (res.status == 2000) {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this.findAll()
            } else {
              this.$message(res.msg)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },

    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },

    findAll() {
      post('rollGrindingAnnex/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      }).then(res => {
        if (this.searchInfo.istate == '1') {
          this.btnName1 = '合格'
          this.btnName2 = '不合格'
        }
        if (this.searchInfo.istate == '0') {
          this.btnName1 = '待上机'
          this.btnName2 = '重磨'
        }
        this.tableData = res.data
        this.total = res.count
      })
    },
    /**
     * description: 删除一行数据
     */
    handleDelect(data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('rollGrinding/deleteOne', { indocno: data.indocno }).then(
            res => {
              if (res) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.findAll()
              }
            }
          )
          this.findAll()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    /**
     * description: 修改数据按钮
     */
    /**
     * description: 弹窗确定按钮
     */
    handleSave() {
      var forms = 'addForm'
      if (this.formLabelAlign.indocno) {
        this.edit(forms)
      } else {
        this.formLabelAlign.roll_state = 1
        this.save(forms)
      }
    },
    /**
     * description: 重置按钮
     */
    resetForm(formName) {
      this.searchInfo = {
        istate: '1',
        dbegin: '',
        dend: ''
      }
      this.searchInfo.dbegin = moment()
        .subtract(50, 'days')
        .format('YYYY-MM-DD HH:mm:ss')
      this.searchInfo.dend = moment().format('YYYY-MM-DD HH:mm:ss')
      this.findAll()
    },
    /**
     * description: 添加数据函数
     */
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          post('rollGrinding/insert', {
            rollGrinding: this.formLabelAlign
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '保存成功!'
              })
              this.$refs[formName].resetFields()
              this.findAll()
            }
          })
          this.dialogVisible = false
        } else {
          alert('请按照要求输入')
        }
      })
    },
    /**
     * description: 编辑数据函数
     */
    edit(formName) {
      // 编辑
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 编辑
          post('rollGrinding/update', {
            rollGrinding: this.formLabelAlign
          }).then(res => {
            if (res) {
              this.findAll()
            }
          })
          this.dialogVisible = false
        } else {
          alert('请按照要求输入')
        }
      })
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    },
    handlejian(val) {
      this.$confirm('确定待检测?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('/rollGrindingAnnex/updateState', {
            indocno: val.indocno,
            rollGrindingAnnex: val
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this.findAll()
            } else {
              this.$message(this.msg)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    handleon(val) {
      this.dialogVisibleChange = true
      this.formLabel = val
      this.rowIndex = []
      this.findOnlineInfo()
    },
    async findOnlineInfo(val) {
      let res = await post('/historyRollGround/findByPageNew', {
        pageIndex: this.pageIndex1, //第几页
        pageSize: this.pageSize1, //每页多少条
        condition: {
          roll_nb: this.formLabel.roll_no
        }
      })
      if (res.status == 2000) {
        this.onlineData = res.data
        this.onlineTotal = res.count
      } else {
        this.onlineData = []
        this.onlineTotal = 0
      }
    },
    sendOnline() {
      this.$confirm('确定待上机?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('/rollGrindingAnnex/updateA', {
            indocno: this.formLabel.indocno,
            historyRollGround: { indocno: this.rowIndex[0].indocno }
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this.dialogVisibleChange = false
              this.findAll()
            } else {
              this.$message(this.msg)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    handleCurrentChange1(val) {
      this.pageIndex1 = val
      this.rowIndex = []
      this.findOnlineInfo()
    },
    handleSizeChange1(val) {
      this.pageSize1 = val
      this.rowIndex = []
      this.findOnlineInfo()
    }
  }
}
</script>

<style>
@media screen and (max-width: 1200px) {
  .GD9-search-ipad {
    height: 38px;
    overflow: hidden;
  }
  .gd9-dialog .el-dialog {
    width: 80% !important;
  }
  .el-dialog >>> .el-table__header-wrapper .el-table__header .el-checkbox {
    display: none;
  }
  .gd9-btn {
    width: 54px;
    height: 30px;
  }
}
@media screen and (min-width: 1200px) {
  .GD9-search-ipad {
    height: 88px;
    overflow: hidden;
  }
  .gd9-btn {
    width: 54px;
    height: 30px;
  }
}
.GD-search {
  height: auto;
}
</style>
