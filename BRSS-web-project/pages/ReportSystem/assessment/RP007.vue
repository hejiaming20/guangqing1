<!--磨床排班查询和修改-->
<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :table-height="'calc(100vh - 410px)'"
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
                <!-- <el-button
                size="mini"
                type="primary"
                @click="open_tianjia">添加</el-button>-->
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">

        <!-- <el-table-column
          prop="accident_type_id"
          label="事故类型id"/> -->
        <el-table-column
          prop="j1"
          label="甲班1号磨床"/>
        <el-table-column
          prop="y1"
          label="乙班1号磨床"/>
        <el-table-column
          prop="b1"
          label="丙班1号磨床"/>

        <el-table-column
          prop="j2"
          label="甲班2号磨床"/>
        <el-table-column
          prop="y2"
          label="乙班2号磨床"/>
        <el-table-column
          prop="b2"
          label="丙班2号磨床"/>

        <el-table-column
          prop="j3"
          label="甲班3号磨床"/>
        <el-table-column
          prop="y3"
          label="乙班3号磨床"/>
        <el-table-column
          prop="b3"
          label="丙班3号磨床"/>

        <el-table-column
          prop="j4"
          label="甲班4号磨床"/>
        <el-table-column
          prop="y4"
          label="乙班4号磨床"/>
        <el-table-column
          prop="b4"
          label="丙班4号磨床"/>

        <el-table-column
          prop="j5"
          label="甲班5号磨床"/>
        <el-table-column
          prop="y5"
          label="乙班5号磨床"/>
        <el-table-column
          prop="b5"
          label="丙班5号磨床"/>
        <el-table-column
          label="操作"
          min-width="300"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)">修改</el-button>
              <!-- <el-button
              size="mini"
              type="danger"
              @click="handleDelect(scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
      </template>
    </Table-easy>
    <!-- 添加/编辑弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="提示"
      class="layout-dialog"
      width="90%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :rules="rules"
          :model="formLabelAlign"
          label-width="90px">
          <el-row>
            <el-col :span="5">
              <el-form-item
                label="甲班1号磨床"
                prop="j1">
                <el-input v-model="formLabelAlign.j1" />
              </el-form-item>
              <el-form-item
                label="乙班1号磨床"
                prop="y1">
                <el-input v-model="formLabelAlign.y1" />
              </el-form-item>
              <el-form-item
                label="丙班1号磨床"
                prop="b1">
                <el-input v-model="formLabelAlign.b1" />
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item
                label="甲班2号磨床"
                prop="j1">
                <el-input v-model="formLabelAlign.j2" />
              </el-form-item>
              <el-form-item
                label="乙班2号磨床"
                prop="y2">
                <el-input v-model="formLabelAlign.y2" />
              </el-form-item>
              <el-form-item
                label="丙班2号磨床"
                prop="b2">
                <el-input v-model="formLabelAlign.b2" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                label="甲班3号磨床"
                prop="j3">
                <el-input v-model="formLabelAlign.j3" />
              </el-form-item>
              <el-form-item
                label="乙班3号磨床"
                prop="y3">
                <el-input v-model="formLabelAlign.y3" />
              </el-form-item>
              <el-form-item
                label="丙班3号磨床"
                prop="b3">
                <el-input v-model="formLabelAlign.b3" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                label="甲班4号磨床"
                prop="j4">
                <el-input v-model="formLabelAlign.j4" />
              </el-form-item>
              <el-form-item
                label="乙班4号磨床"
                prop="y4">
                <el-input v-model="formLabelAlign.y4" />
              </el-form-item>
              <el-form-item
                label="丙班4号磨床"
                prop="b4">
                <el-input v-model="formLabelAlign.b4" />
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item
                label="甲班5号磨床"
                prop="j5">
                <el-input v-model="formLabelAlign.j5" />
              </el-form-item>
              <el-form-item
                label="乙班5号磨床"
                prop="y5">
                <el-input v-model="formLabelAlign.y5" />
              </el-form-item>
              <el-form-item
                label="丙班5号磨床"
                prop="b5">
                <el-input v-model="formLabelAlign.b5" />
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
import moment from 'moment'
export default {
  components: { TableEasy },
  data() {
    return {
      accidentTypeArray: [],
      searchInfo: {
        indocno: ''
      },
      rules: {
        indocno: [{ required: true, message: '请输入主键', trigger: 'blur' }],
        frame_noid: [
          { required: true, message: '请输入机架id', trigger: 'blur' }
        ],
        accident_type: [
          { required: true, message: '请输入事故类型', trigger: 'blur' }
        ],
        createtime: [{ required: true, message: '时间', trigger: 'blur' }],
        rollerradius: [{ required: true, message: '径差', trigger: 'blur' }],
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
      formLabelAlign: {
        rollerradius: 0
      },
      tableData: [],
      total: 0,
      pageSize: 30,
      pageIndex: 1,
      dialogVisible: false
    }
  },
  mounted() {
    this.findAll()
    post('/dictionary/findMapV1', { dicno: 'frameteam' }).then(res => {
      this.accidentTypeArray = res.data //事故类型  机架
    })
  },
  methods: {
    findAll() {
      this.tableData = []
      post('sysBz/findByIndocno', {
        indocno: 1000
      }).then(res => {
        this.tableData.push(res.data)
        this.total = res.count
      })
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
          post('/rackPairingRule/deleteOne', { indocno: data.indocno }).then(
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
      this.formLabelAlign.indocno = 1000
      this.edit(forms)
      //this.save(forms)
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
          this.formLabelAlign.createtime = moment().format(
            'YYYY-MM-DD HH:mm:ss'
          )

          post('/rackPairingRule/insert', {
            rackPairingRule: this.formLabelAlign
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
          post('sysBz/update', {
            SysBz: this.formLabelAlign
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
