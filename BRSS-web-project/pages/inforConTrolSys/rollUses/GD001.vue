<template>
  <div>
    <!-- 第一个表aa -->
    <!-- <div class="layout-default-margin"> -->
    <Table-easy
      :table-data="tableData"
      :total="total"
      :page-size="pageSize"
      :current-page="pageIndex"
      :table-height="'calc(100vh - 185px)'"
      index-type="index"
      @handle-size-change="handleSizeChange"
      @handle-current-change="handleCurrentChange">
      <template slot="TableHead">
        <el-row>
          <el-col :span="20">
            <el-form
              ref="ruleForm"
              :model="searchInfo"
              :inline="true"
              class="search-info"
              label-width="80px">
              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input v-model="searchInfo.roll_no" />
              </el-form-item>
              <el-form-item
                label="机架号"
                prop="frame_noid">
                <el-select
                  v-model="searchInfo.frame_noid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in frameArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4">
            <div class="btn">
              <el-button
                type="primary"
                size="mini"
                @click="findSearch()">查询</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="resetForm('ruleForm')">重置</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="addData">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          prop="roll_no"
          width="120px"
          label="辊号"/>
        <el-table-column
          prop="roll_type"
          min-width="120px"
          label="轧辊类型"/>
        <el-table-column
          prop="frame_no"
          label="机架号"/>
        <el-table-column
          prop="roll_position"
          label="上机位置"/>
        <!-- <el-table-column
          prop="rollshape"
          min-width="120px"
          label="辊形"/>-->
        <el-table-column
          prop="uplinecount"
          min-width="80px"
          label="累积上线次数"/>
        <el-table-column
          prop="material"
          width="120px"
          label="材质"
          align="center"/>
        <!-- <el-table-column
          width="90px"
          prop="ds_chock_no"
          label="DS侧座号"
          align="center"/>
        <el-table-column
          prop="os_chock_no"
          width="90px"
          label="OS侧座号"
          align="center"/>-->
        <el-table-column
          prop="onlinetime"
          min-width="150px"
          label="上机时间"
          show-overflow-tooltip
          align="center"/>
        <el-table-column
          prop="offlinetime"
          width="170px"
          label="下机时间"
          show-overflow-tooltip
          align="center"/>
        <el-table-column
          prop="rollkilometer"
          label="轧制公里数"
          min-width="100px"
          align="center"/>
        <el-table-column
          prop="rolltonnage"
          label="轧制吨数"/>
        <el-table-column
          prop="roll_coil_num"
          label="轧制块数"/>
        <el-table-column
          prop="rolling_time"
          label="轧制时长(min)"/>
        <el-table-column
          prop="off_line_reason_value"
          show-overflow-tooltip
          label="下线原因"/>
      <!--  <el-table-column
          label="操作"
          min-width="217px"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleCopy(scope.row)">复制</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="handleEdit(scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelect(scope.row)">删除</el-button>
          </template>
        </el-table-column>-->
      </template>
    </Table-easy>

    <!-- 添加/编辑弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="title"
      class="layout-dialog"
      width="90%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlign"
          label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input v-model="formLabelAlign.roll_no" />
              </el-form-item>
              <el-form-item
                label="辊形"
                prop="rollshapeid">
                <el-select
                  v-model="formLabelAlign.rollshapeid"
                  placeholder="请选择"
                  @change="handleShapeChange">
                  <el-option
                    v-for="item in roll_shapeArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="累积上线次数"
                prop="uplinecount">
                <el-input v-model="formLabelAlign.uplinecount" />
              </el-form-item>
              <el-form-item
                label="下线原因"
                prop="off_line_reason_value">
                <el-select
                  v-model="formLabelAlign.off_line_reason_value"
                  placeholder="请选择"
                  @change="handleoffChange">
                  <el-option
                    v-for="item in option_off"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="轧辊类型"
                prop="roll_typeid">
                <el-select
                  v-model="formLabelAlign.roll_typeid"
                  placeholder="请选择"
                  @change="handleRollTypeChange">
                  <el-option
                    v-for="item in options"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="上机位置"
                prop="roll_positionid">
                <el-select
                  v-model="formLabelAlign.roll_positionid"
                  clearable
                  placeholder="请选择轧辊位置"
                  @change="handleRollPositionChange">
                  <el-option
                    v-for="item in rollPositionArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="轧辊材质"
                prop="material_id">
                <el-select
                  v-model="formLabelAlign.material_id"
                  placeholder="请选择"
                  @change="handlematerialChange">
                  <el-option
                    v-for="item in option_2"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="轧制公里数"
                prop="rollkilometer">
                <el-input v-model="formLabelAlign.rollkilometer" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="机架号"
                prop="frame_noid">
                <el-select
                  v-model="formLabelAlign.frame_noid"
                  placeholder="请选择"
                  @change="handleFrameChange">
                  <el-option
                    v-for="item in frameArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="轧制吨数"
                prop="rolltonnage">
                <el-input v-model="formLabelAlign.rolltonnage" />
              </el-form-item>
              <el-form-item
                label="DS侧座号"
                prop="ds_chock_no">
                <el-input v-model="formLabelAlign.ds_chock_no" />
              </el-form-item>
              <el-form-item
                label="OS侧座号"
                prop="os_chock_no">
                <el-input v-model="formLabelAlign.os_chock_no" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 存放时间 -->
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="上机时间"
                prop="onlinetime">
                <el-date-picker
                  v-model="formLabelAlign.onlinetime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="上机时间"
                  @focus="resetKeyboard"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="下机时间"
                prop="offlinetime">
                <el-date-picker
                  v-model="formLabelAlign.offlinetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="下机时间"
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
          @click="dialogVisible = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDataConfig, post } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
import { rolltypelist } from '@/api/pinClipBoard' //查询接口
import { formatDate, lastDayFormat } from '@/lib/FormatTime'
export default {
  components: { TableEasy },
  data() {
    return {
      options: [],
      option_off: [],
      option_2: [],
      tableData_01: [],
      total_01: 0,
      searchInfo2: {
        ilinkno: ''
      },
      searchInfo: {
        indocno: '',
        roll_no: '',
        roll_typeid: '',
        roll_type: '',
        frame_noid: '',
        frame_no: '',
        loomingposition: '',
        rollshapeid: '',
        rollshape: '',
        material: '',
        ds_chock_no: '',
        os_chock_no: '',
        onlinetime: '',
        offlinetime: '',
        rollkilometer: '',
        rolltonnage: '',
        off_line_reason: '',
        createname: '',
        createid: '',
        createtime: '',
        modiname: '',
        modiid: '',
        moditime: '',
        istate: '',
        idel: ''
      },
      rules: {
        indocno: [{ required: true, message: '请输入主键', trigger: 'blur' }],
        roll_no: [{ required: true, message: '请输入辊号', trigger: 'blur' }],
        roll_typeid: [
          { required: true, message: '请输入轧辊类型id', trigger: 'blur' }
        ],
        roll_type: [
          { required: true, message: '请输入轧辊类型', trigger: 'blur' }
        ],
        frame_noid: [
          { required: true, message: '请输入机架号id', trigger: 'blur' }
        ],
        frame_no: [
          { required: true, message: '请输入机架号', trigger: 'blur' }
        ],
        loomingposition: [
          { required: true, message: '请输入上机位置', trigger: 'blur' }
        ],
        rollshapeid: [
          { required: true, message: '请输入辊形id', trigger: 'blur' }
        ],
        rollshape: [{ required: true, message: '请输入辊形', trigger: 'blur' }],
        material: [{ required: true, message: '请输入材质', trigger: 'blur' }],
        ds_chock_no: [
          { required: true, message: '请输入DS侧座号', trigger: 'blur' }
        ],
        os_chock_no: [
          { required: true, message: '请输入OS侧座号', trigger: 'blur' }
        ],
        onlinetime: [
          { required: true, message: '请输入上机时间', trigger: 'blur' }
        ],
        offlinetime: [
          { required: true, message: '请输入下机时间', trigger: 'blur' }
        ],
        rollkilometer: [
          { required: true, message: '请输入轧制公里数', trigger: 'blur' }
        ],
        rolltonnage: [
          { required: true, message: '请输入轧制吨数', trigger: 'blur' }
        ],
        off_line_reason: [
          { required: true, message: '请输入下线原因', trigger: 'blur' }
        ]
        /*createname: [
          { required: true, message: '请输入创建人名称', trigger: 'blur' }
        ],
        createid: [
          { required: true, message: '请输入创建人id', trigger: 'blur' }
        ],
        createtime: [
          { required: true, message: '请输入创建时间', trigger: 'blur' }
        ],
        modiname: [
          { required: true, message: '请输入修改人名称', trigger: 'blur' }
        ],
        modiid: [
          { required: true, message: '请输入修改人id', trigger: 'blur' }
        ],
        moditime: [
          { required: true, message: '请输入修改时间', trigger: 'blur' }
        ],
        istate: [
          { required: true, message: '请输入数据状态', trigger: 'blur' }
        ],
        idel: [{ required: true, message: '请输入删除标识', trigger: 'blur' }]*/
      },
      formLabelAlign: {},
      tableData: [],
      total: 0,
      pageSize: 20,
      pageIndex: 1,
      dialogVisible: false,
      title: '',
      frameArray: [],
      rollPositionArray: [],
      roll_shapeArray: []
    }
  },
  mounted() {
    this.findAll()
    post(rolltypelist, { dicno: 'rolltype' }).then(res => {
      this.options = res.data
    })
    post(rolltypelist, { dicno: 'offline_reason' }).then(res => {
      this.option_off = res.data
    })
    post('/dictionary/findMapV1', { dicno: 'roll_material' }).then(res => {
      this.option_2 = res.data //材质
    })
    getDataConfig('frameteam').then(res => {
      this.frameArray = res
    })
    getDataConfig('uplocation').then(res => {
      this.rollPositionArray = res // 部件类型
    })
    getDataConfig('roll_shape_type').then(res => {
      this.roll_shapeArray = res
    })
  },
  methods: {
    // 移除移动端软键盘事件（日期时间选择器）
    resetKeyboard() {
      document.activeElement.blur()
    },
    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },
    handleoffChange() {
      if (this.formLabelAlign.off_line_reason_value == '正常下线') {
        this.formLabelAlign.off_line_reason = 2
      }
      if (this.formLabelAlign.off_line_reason_value == '事故下线') {
        this.formLabelAlign.off_line_reason = 1
      }
    },
    // 机架号选择
    handleFrameChange() {
      this.frameArray.forEach(item => {
        if (item.key == this.formLabelAlign.frame_noid) {
          this.formLabelAlign.frame_no = item.value
        }
      })
    },
    // 上机位置选择
    handleRollPositionChange() {
      this.rollPositionArray.forEach(item => {
        if (item.key == this.formLabelAlign.roll_positionid) {
          this.formLabelAlign.roll_position = item.value
        }
      })
    },
    handlematerialChange() {
      this.option_2.forEach(item => {
        if (item.key == this.formLabelAlign.material_id) {
          this.formLabelAlign.material = item.value
        }
      })
    },
    // 辊型
    handleShapeChange() {
      this.roll_shapeArray.forEach(item => {
        if (item.key == this.formLabelAlign.rollshapeid) {
          this.formLabelAlign.rollshape = item.value
        }
      })
    },

    handleRollTypeChange() {
      this.options.forEach(item => {
        if (item.key == this.formLabelAlign.roll_typeid) {
          this.formLabelAlign.roll_type = item.value
        }
      })
    },
    async findAll() {
      let res = await post('rollOnoffLine/findByPage', {
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
          post('rollOnoffLine/deleteOne', { indocno: data.indocno }).then(
            res => {
              console.log('删除', res)
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
    // 单击表格
    rowClick(val) {
      let indocno = val.indocno
      this.finddetailData(indocno)
    },
    // 子表加载
    finddetailData(val) {
      this.searchInfo2.ilinkno = val
      // 子表查询
      post('rollOnoffLineDetail/findByPage', {
        pageIndex: 1,
        pageSize: 10,
        condition: this.searchInfo2
      }).then(res => {
        this.tableData_01 = res.data
        this.total_01 = res.count
      })
    },
    addData() {
      this.title = '添加'
      this.formLabelAlign = {}
      this.dialogVisible = true
    },

    /**
     * description: 修改数据按钮
     */
    handleEdit(data) {
      this.title = '修改'
      this.dialogVisible = true
      this.formLabelAlign = Object.assign({}, data)
    },
    handleCopy(data) {
      this.title = '复制数据'
      this.dialogVisible = true
      this.formLabelAlign = Object.assign({}, data)
      delete this.formLabelAlign.indocno
    },
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
      this.$refs[formName].resetFields()
      this.findAll()
    },
    /**
     * description: 添加数据函数
     */
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          post('rollOnoffLine/insert', {
            rollOnoffLine: this.formLabelAlign
          }).then(res => {
            if (res.status == 2000) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.$refs[formName].resetFields()
              this.findAll()
            } else {
              this.$message('添加失败')
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
          post('rollOnoffLine/update', {
            rollOnoffLine: this.formLabelAlign
          }).then(res => {
            if (res.status == 2000) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.findAll()
            } else {
              this.$message('修改失败')
            }
          })
          this.dialogVisible = false
        } else {
          alert('请按照要求输入')
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    }
  }
}
</script>

<style>
</style>
