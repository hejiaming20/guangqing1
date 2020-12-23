<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :table-height="'calc(100vh - 210px)'"
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
                <el-col :span="8">
                  <!-- <el-form-item
                    label="事故类型id"
                    prop="accident_type_id">
                    <el-input v-model="searchInfo.accident_type_id" />
                  </el-form-item> -->
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="事故类型"
                    prop="accident_type_id">
                    <el-select
                      v-model="searchInfo.accident_type_id"
                      allow-create
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in accidentTypeArray"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="事故原因"
                    prop="accident_reason">
                    <el-input v-model="searchInfo.accident_reason" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
          <el-col :span="4">
            <div class="btn">
              <el-button
                size="mini"
                type="primary"
                @click="findAll()">查询</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="resetForm('ruleForm')">重置</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="open_tianjia">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">

        <!-- <el-table-column
          prop="accident_type_id"
          label="事故类型id"/> -->
        <el-table-column
          prop="accident_type"
          label="事故类型"/>
        <el-table-column
          prop="accident_reason"
          label="事故原因"/>

        <el-table-column
          label="操作"
          min-width="300"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelect(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </Table-easy>
    <!-- 添加/编辑弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="提示"
      class="layout-dialog"
      width="20%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :rules="rules"
          :model="formLabelAlign"
          label-width="80px">
          <el-row>
            <el-col :span="6">
              <!-- <el-form-item
                label="事故类型id"
                prop="accident_type_id">
                <el-input v-model="formLabelAlign.accident_type_id" />
              </el-form-item> -->
              <el-form-item
                label="事故类型"
                prop="accident_type_id">
                <el-select
                  v-model="formLabelAlign.accident_type_id"
                  allow-create
                  placeholder="请选择"
                  @change="handleTypeChange"
                >
                  <el-option
                    v-for="item in accidentTypeArray"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="事故原因"
                prop="accident_reason">
                <el-input v-model="formLabelAlign.accident_reason" />
              </el-form-item>

            </el-col>
          </el-row>
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
          @click="handleSave">确 定</el-button>
      </span>
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
      accidentTypeArray: [],
      searchInfo: {
        indocno: '',
        accident_type_id: '',
        accident_type: '',
        accident_reason: '',
        createid: '',
        createname: '',
        createtime: '',
        modiid: '',
        modiname: '',
        moditime: '',
        idel: '',
        istate: ''
      },
      rules: {
        indocno: [{ required: true, message: '请输入主键', trigger: 'blur' }],
        accident_type_id: [
          { required: true, message: '请输入事故类型id', trigger: 'blur' }
        ],
        accident_type: [
          { required: true, message: '请输入事故类型', trigger: 'blur' }
        ],
        accident_reason: [
          { required: true, message: '请输入事故原因', trigger: 'blur' }
        ],
        createid: [
          { required: true, message: '请输入创建人id', trigger: 'blur' }
        ],
        createname: [
          { required: true, message: '请输入创建人姓名', trigger: 'blur' }
        ],
        createtime: [
          { required: true, message: '请输入创建时间', trigger: 'blur' }
        ],
        modiid: [
          { required: true, message: '请输入修改人id', trigger: 'blur' }
        ],
        modiname: [
          { required: true, message: '请输入修改人姓名', trigger: 'blur' }
        ],
        moditime: [
          { required: true, message: '请输入修改时间', trigger: 'blur' }
        ],
        idel: [{ required: true, message: '请输入删除标识', trigger: 'blur' }],
        istate: [{ required: true, message: '请输入状态', trigger: 'blur' }]
      },
      formLabelAlign: {},
      tableData: [],
      total: 0,
      pageSize: 30,
      pageIndex: 1,
      dialogVisible: false
    }
  },
  mounted() {
    this.findAll()
    post('/dictionary/findMapV1', { dicno: 'acc_type' }).then(res => {
      this.accidentTypeArray = res.data //事故类型
    })
  },
  methods: {
    handleTypeChange() {
      this.accidentTypeArray.forEach(item => {
        if (item.key == this.formLabelAlign.accident_type_id) {
          this.formLabelAlign.accident_type = item.value
          this.formLabelAlign.accident_type_id = item.key
        }
      })
    },
    async findAll() {
      let res = await post('accidentObject/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      })
      this.tableData = res.data
      this.total = res.count
    },

    //打开添加弹窗
    open_tianjia() {
      this.dialogVisible = true
      this.formLabelAlign = {}
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
          post('accidentObject/deleteOne', { indocno: data.indocno }).then(
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
    handleEdit(data) {
      this.dialogVisible = true
      this.formLabelAlign = data
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
    },
    /**
     * description: 添加数据函数
     */
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          post('accidentObject/insert', {
            accidentObject: this.formLabelAlign
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 编辑
          post('accidentObject/update', {
            accidentObject: this.formLabelAlign
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '修改成功!'
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
    // handleAccidentChange() {
    //   this.accidentTypeArray.forEach(item => {
    //     if (item.key == this.searchInfo.accident_type_id) {
    //       this.searchInfo.accident_type = item.value
    //     }
    //   })
    // },
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
