<template>
  <div>
    <el-row :gutter="5">
      <div style="color:greenyellow;margin-top: 5px;margin-bottom: 5px; padding-top: 4px;padding-bottom: 4px ; padding-left: 25px;width: 100%;background-color: #253F80;font-size: 14px;height:40px;overflow-y: auto ">
        说明：径差=上辊-下辊 （此为轧辊配对辅助页面，为正说明上辊大，配对时配对径差小于该页面设置的径差就可以配对）
      </div>

      <!--<el-col :span="12">
        <div class="layout-search-header">规则2</div>
        <div style="color:greenyellow;margin-top: 5px;margin-bottom: 5px; padding-top: 4px; ;padding-bottom: 4px ; padding-left: 25px;width: 100%;background-color: #253F80;font-size: 14px;;height:40px;overflow-y: auto ">
          <div
            v-for="(rowVal, rowIndex) in zhans2"
            :key="rowIndex"> {{ rowIndex+1+ '  备辊:  '+rowVal.value+'的范围为:  '+rowVal.value1_2+'&#45;&#45;'+rowVal.value1_1 }}     </div>
          <div v-show="zhans2.length == 0">暂无数据</div>
        </div>
      </el-col>-->
    </el-row>
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
                <el-col :span="8">
                  <el-form-item
                    label="机架号"
                    prop="frame_noid">
                    <el-select
                      v-model="searchInfo.frame_noid"
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
              <!--  <el-col :span="8">
                  <el-form-item
                    label="事故原因"
                    prop="accident_reason">
                    <el-input v-model="searchInfo.accident_reason" />
                  </el-form-item>
                </el-col>-->
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
          prop="frame_no"
          label="机架"/>
        <el-table-column
          prop="rollerradius"
          label="径差(mm)"/>
        <el-table-column
          prop="createtime"
          label="时间"/>

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
    <div>
      上辊减去下辊为正说明上辊大


    </div>
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
                label="机架"
                prop="frame_noid">
                <el-select
                  v-model="formLabelAlign.frame_no"
                  allow-create
                  placeholder="请选择"
                  @change="handleTypeChange"
                >
                  <el-option
                    v-for="item in accidentTypeArray"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>

              <el-form-item
                label="径差(mm)"
                prop="rollerradius">
                <el-input v-model="formLabelAlign.rollerradius" />
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
    handleTypeChange() {
      this.accidentTypeArray.forEach(item => {
        if (item.value == this.formLabelAlign.frame_no) {
          this.formLabelAlign.frame_no = item.value
          this.formLabelAlign.frame_noid = item.key
        }
      })
    },
    async findAll() {
      let res = await post('/rackPairingRule/findByPage', {
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
      if (this.formLabelAlign.indocno) {
        this.formLabelAlign.ifeffective = 0 //有效为0
        this.edit(forms)
      } else {
        this.formLabelAlign.ifeffective = 0 //有效为0
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
          post('/rackPairingRule/update', {
            rackPairingRule: this.formLabelAlign
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
