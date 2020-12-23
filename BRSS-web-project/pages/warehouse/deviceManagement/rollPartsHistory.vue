<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <template slot="TableHead">
        <el-row :gutter="10">
          <el-col :span="20">
            <el-form
              ref="ruleForm"
              :model="searchInfo"
              class="search-info"
              label-width="70px">
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="备件名称"
                    prop="eq_name">
                    <el-input
                      v-model="searchInfo.eq_name"
                      style="max-width: 170px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="备件编码"
                    prop="eq_code">
                    <el-input
                      v-model="searchInfo.eq_code"
                      style="max-width: 170px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="开始时间"
                    prop="dbegin">
                    <el-date-picker
                      v-model="searchInfo.dbegin"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="开始时间"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="结束时间"
                    prop="dend">
                    <el-date-picker
                      v-model="searchInfo.dend"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择结束时间"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
          <el-col :span="4">
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
              @click="addData">添加</el-button>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          prop="eq_name"
          label="备件名称"/>
        <el-table-column
          prop="eq_code"
          label="备件编码"/>

        <el-table-column
          prop="production_line"
          label="产线"/>
        <el-table-column
          prop="save_place"
          label="存放地点"/>
        <el-table-column
          prop="work_place"
          label="所辖作业区"
          min-width="100"/>
        <!--<el-table-column
          prop="eq_count"
          label="备件数量"/>-->
        <el-table-column
          prop="price_buy"
          label="购入单价"/>
        <el-table-column
          prop="price_repair"
          label="修复单价"/>
        <el-table-column
          prop="istatus_in"
          label="入库状态"/>
        <el-table-column
          prop="istatus_out"
          label="出库去向"/>
        <el-table-column
          prop="stock_state"
          label="库存状态"/>
        <!--<el-table-column
          prop="ilinkno_check"
          label="检测工单主键"/>-->
        <el-table-column
          prop="eq_in"
          label="入库数量"/>
        <el-table-column
          prop="eq_out"
          label="出库数量"/>
        <!--<el-table-column
          prop="if_import"
          label="是否为重要设备"
          min-width="150"/>-->
        <el-table-column
          prop="if_import"
          label="是否为重要设备"
          min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.if_import == 1 ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sized"
          label="规格型号"/>
        <el-table-column
          prop="createtime"
          label="时间"
          min-width="160"/>
        <el-table-column
          label="操作"
          min-width="200"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="handleEdit(scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </Table-easy>
    <!-- 添加/编辑弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="title"
      class="layout-dialog"
      width="85%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :rules="rules"
          :model="formLabelAlign"
          label-width="120px">
          <el-row>
            <el-col :span="6">
              <el-form-item
                label="备件名称"
                prop="eq_name">
                <el-input v-model="formLabelAlign.eq_name" />
              </el-form-item>
              <el-form-item
                label="备件编码"
                prop="eq_code">
                <el-input v-model="formLabelAlign.eq_code" />
              </el-form-item>
              <!-- <el-form-item
                label="产线id"
                prop="production_line_id">
                <el-input v-model="formLabelAlign.production_line_id" />
              </el-form-item>-->
              <el-form-item
                label="产线"
                prop="production_line">
                <el-input v-model="formLabelAlign.production_line" />
              </el-form-item>

              <el-form-item
                label="存放地点"
                prop="save_place">
                <el-input v-model="formLabelAlign.save_place" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="所辖作业区"
                prop="work_place">
                <el-input v-model="formLabelAlign.work_place" />
              </el-form-item>
              <!--  <el-form-item
                label="备件数量"
                prop="eq_count">
                <el-input v-model="formLabelAlign.eq_count" />
              </el-form-item>-->
              <el-form-item
                label="购入单价"
                prop="price_buy">
                <el-input v-model="formLabelAlign.price_buy" />
              </el-form-item>
              <el-form-item
                label="修复单价"
                prop="price_repair">
                <el-input v-model="formLabelAlign.price_repair" />
              </el-form-item>
              <el-form-item
                label="规格型号"
                prop="sized">
                <el-input v-model="formLabelAlign.sized" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="入库状态"
                prop="istatus_in">
                <el-input v-model="formLabelAlign.istatus_in" />
              </el-form-item>
              <el-form-item
                label="出库去向"
                prop="istatus_out">
                <el-input v-model="formLabelAlign.istatus_out" />
              </el-form-item>
              <el-form-item
                label="库存状态"
                prop="stock_state">
                <el-input v-model="formLabelAlign.stock_state" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="入库数量"
                prop="eq_in">
                <el-input v-model="formLabelAlign.eq_in" />
              </el-form-item>
              <el-form-item
                label="出库数量"
                prop="eq_out">
                <el-input v-model="formLabelAlign.eq_out" />
              </el-form-item>
              <el-form-item
                label="是否为重要设备"
                prop="if_import">
                <el-select
                  v-model="formLabelAlign.if_import"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
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
import { get, post } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
import moment from 'moment'
export default {
  components: { TableEasy },
  data() {
    return {
      searchInfo: {
        eq_name: '',
        eq_code: '',
        dend: '',
        dbegin: ''
      },
      options: [
        {
          value: 0,
          label: '否'
        },
        {
          value: 1,
          label: '是'
        }
      ],
      rules: {
        indocno: [{ required: true, message: '请输入主键', trigger: 'blur' }],
        ilinkno: [{ required: true, message: '请输入外键', trigger: 'blur' }],
        eq_name: [
          { required: true, message: '请输入备件名称', trigger: 'blur' }
        ],
        eq_code: [
          { required: true, message: '请输入备件编码', trigger: 'blur' }
        ],
        /* production_line_id: [
          { required: true, message: '请输入产线id', trigger: 'blur' }
        ],*/
        production_line: [
          { required: true, message: '请输入产线', trigger: 'blur' }
        ],
        save_place: [
          { required: true, message: '请输入存放地点', trigger: 'blur' }
        ],
        work_place: [
          { required: true, message: '请输入所辖作业区', trigger: 'blur' }
        ],
        /*eq_count: [
          { required: true, message: '请输入备件数量', trigger: 'blur' }
        ],*/
        price_buy: [
          { required: true, message: '请输入购入单价', trigger: 'blur' }
        ],
        price_repair: [
          { required: true, message: '请输入修复单价', trigger: 'blur' }
        ],
        istatus_in: [
          { required: true, message: '请输入入库状态', trigger: 'blur' }
        ],
        istatus_out: [
          { required: true, message: '请输入出库去向', trigger: 'blur' }
        ],
        stock_state: [
          { required: true, message: '请输入库存状态', trigger: 'blur' }
        ],
        /*ilinkno_check: [
          { required: true, message: '请输入检测工单主键', trigger: 'blur' }
        ],*/
        eq_in: [{ required: true, message: '请输入入库数量', trigger: 'blur' }],
        eq_out: [
          { required: true, message: '请输入出库数量', trigger: 'blur' }
        ],
        if_import: [
          { required: true, message: '请输入是否为重要设备', trigger: 'blur' }
        ],
        sized: [{ required: true, message: '请输入规格型号', trigger: 'blur' }],
        createtime: [
          { required: true, message: '请输入创建时间', trigger: 'blur' }
        ],
        createname: [
          { required: true, message: '请输入创建人姓名', trigger: 'blur' }
        ],
        createid: [
          { required: true, message: '请输入创建人ID', trigger: 'blur' }
        ],
        moditime: [
          { required: true, message: '请输入修改时间', trigger: 'blur' }
        ],
        modiid: [
          { required: true, message: '请输入修改人ID', trigger: 'blur' }
        ],
        modiname: [
          { required: true, message: '请输入修改人姓名', trigger: 'blur' }
        ],
        istate: [{ required: true, message: '请输入状态', trigger: 'blur' }],
        idel: [{ required: true, message: '请输入删除标识', trigger: 'blur' }]
      },
      formLabelAlign: {},
      tableData: [],
      total: 0,
      title: '',
      pageIndex: 1,
      pageSize: 30,
      dialogVisible: false
    }
  },
  mounted() {
    this.findAll()
  },
  methods: {
    async findAll() {
      let res = await post('rollPartsHistory/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      })
      /*  moment('2020-10-23T00:00:00.000+0000').format('YYYY-MM-DD HH:mm:ss')*/
      console.log('查询全部', res)

      res.data.forEach((val, index, arry) => {
        /*val.if_import = val.if_import == 1 ? '是' : '否'*/
        //时间转换
        val.createtime = moment(val.createtime).format('YYYY-MM-DD')
      })
      this.tableData = res.data
      this.total = res.count
    },
    addData() {
      this.title = '添加'
      this.dialogVisible = true
      this.formLabelAlign = {}
    },

    /**
     * description: 删除一行数据
     */
    handleDelete(data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('rollPartsHistory/deleteOne', { indocno: data.indocno }).then(
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
    /**
     * description: 修改数据按钮
     */
    handleEdit(data) {
      this.title = '修改'
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
      console.log('重置', formName)
      this.$refs[formName].resetFields()
      console.log('重置', this.$refs[formName])
    },
    /**
     * description: 添加数据函数
     */
    save(formName) {
      /* ;(this.formLabelAlign.if_import =
        this.formLabelAlign.if_import == '是' ? '1' : '0'),
        console.log(this.formLabelAlign.if_import)*/
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('this.formLabelAlign', this.formLabelAlign)
          post('rollPartsHistory/insert', {
            rollPartsHistory: this.formLabelAlign
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
      /*console.log(this.formLabelAlign.if_import)
      if (this.formLabelAlign.if_import) {
        this.formLabelAlign.if_import =
          this.formLabelAlign.if_import == '是' ? '1' : '0'
      }
      console.log(this.formLabelAlign.if_import)
*/
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 编辑
          post('rollPartsHistory/update', {
            rollPartsHistory: this.formLabelAlign
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

    //分页之一页多少条
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    },
    //分页之对应页
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    }
  }
}
</script>

<style>
</style>
