<!--安全库存-->
<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :table-height="400"
      :page-size="pageSize"
      :current-page="pageIndex"
      :is-pagination-show="false"
      :row-class-name="setRowColor"
      index-type="index"
      @cell-click="cellClick"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <template slot="TableHead">
        <el-row>
          <el-col :span="20">
            <el-form
              ref="ruleForm"
              :model="searchInfo"
              :inline="true"
              label-width="100px">
              <el-form-item
                label="轧辊材质"
                prop="material_id">
                <el-select
                  v-model="searchInfo.material_id"
                  clearable
                  placeholder="轧辊材质">
                  <el-option
                    v-for="item in materialArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="轧辊类型"
                prop="roll_typeid">
                <el-select
                  v-model="searchInfo.roll_typeid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in typeoptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="机架范围"
                prop="framerangeid">
                <el-select
                  v-model="searchInfo.framerangeid"
                  clearable
                  placeholder="请选择">
                  <el-option
                    v-for="item in frameFwArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <!--<el-form-item
                label="磨床号"
                prop="inventory_stateid">
                <el-select
                  v-model="searchInfo.inventory_stateid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in kcoptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>-->
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
                @click="open_add_1()">添加</el-button>
                <!-- <el-button
              size="mini"
              type="primary"
              @click="open_add_1(true)">添加(磨床)</el-button>-->
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          prop="roll_type"
          label="轧辊类型"/>
        <el-table-column
          prop="material"
          label="材质"/>
        <el-table-column
          prop="framerange"
          label="机架范围"/>
        <el-table-column
          prop="safe_inventory"
          label="安全库存"/>
        <el-table-column
          prop="purchasing_cycle"
          label="采购周期"/>
        <el-table-column
          prop="d_inventory"
          label="结存"/>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="handleEdit(scope.row,true)">修改</el-button>
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
      :title="dialogTitle"
      class="layout-dialog"
      width="60%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :rules="rules"
          :model="formLabelAlign"
          label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="安全库存"
                prop="safe_inventory">
                <el-input v-model.trim="formLabelAlign.safe_inventory" />
              </el-form-item>
              <el-form-item
                label="轧辊类型"
                prop="roll_type">
                <el-select
                  v-model="formLabelAlign.roll_type"
                  placeholder="请选择"
                  @change="handleroll_typeChange">
                  <el-option
                    v-for="item in typeoptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="采购周期"
                prop="purchasing_cycle">
                <el-input v-model.trim="formLabelAlign.purchasing_cycle" />
              </el-form-item>
              <el-form-item
                label="轧辊材质"
                prop="material_id">
                <el-select
                  v-model="formLabelAlign.material_id"
                  clearable
                  placeholder="请选择轧辊材质"
                  @change="handleMaterChange">
                  <el-option
                    v-for="item in materialArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="结存"
                prop="d_inventory">
                <el-input v-model.trim="formLabelAlign.d_inventory" />
              </el-form-item>
              <el-form-item
                label="机架范围"
                prop="framerangeid">
                <el-select
                  v-model="formLabelAlign.framerangeid"
                  clearable
                  placeholder="请选择"
                  @change="handleFrameScopeChange">
                  <el-option
                    v-for="item in frameFwArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
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
          size="mini"
          type="primary"
          @click="resetDialogForm('addForm')">取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleSave('addForm')">确 定</el-button>
      </span>
    </el-dialog>
    <Table-easy
      :table-data="tableData_1"
      :total="total"
      :table-height="300"
      :page-size="pageSize"
      :current-page="pageIndex"
      :is-pagination-show="false"
      :table-head="false"
      style="margin-top: 10px"
      index-type="index"
      table-foot="false">
      <template slot="TableBody">
        <el-table-column
          prop="roll_type"
          label="轧辊类型"/>
        <el-table-column
          prop="material"
          label="材质"/>
        <el-table-column
          prop="framerange"
          label="机架范围"/>
        <el-table-column
          prop="safe_inventory"
          label="安全库存"/>
        <el-table-column
          prop="purchasing_cycle"
          label="采购周期"/>
        <el-table-column
          prop="d_inventory"
          label="结存"/>
      </template>
    </Table-easy>
  </div>
</template>

<script>
import { get, post, getDataConfig } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
export default {
  components: { TableEasy },
  data() {
    return {
      searchInfo: {},
      rules: {
        roll_no: [{ required: true, message: '请输入辊号', trigger: 'blur' }],
        production_line: [
          { required: true, message: '请输入产线', trigger: 'change' }
        ],
        roll_type: [
          { required: true, message: '请输入轧辊类型', trigger: 'change' }
        ],
        grind_starttime: [
          {
            required: true,
            message: '车削开始时间',
            trigger: 'change'
          }
        ],
        grind_endtime: [
          { required: true, message: '车削结束时间', trigger: 'change' }
        ],
        before_diameter: [
          { required: true, message: '请输入车前直径（数字)', trigger: 'blur' }
        ],
        after_diameter: [
          { required: true, message: '请输入车后直径（数字)', trigger: 'blur' }
        ],
        /* sgroup: [{ required: true, message: '班组', trigger: 'blur' }],*/
        sclass: [{ required: true, message: '班', trigger: 'blur' }]
      },
      typeoptions: [],
      kcoptions: [],
      formLabelAlign: {},
      tableData: [{}],
      total: 0,
      dialogVisible: false,
      formFlag: true, // true 添加 false 编辑
      pageIndex: 1,
      pageSize: 100,
      dialogTitle: '',
      materialArray: [],
      factoryArray: [],
      frameFwArray: [],
      rowIndex: null,
      tableData_1: []
    }
  },
  mounted() {
    this.findAll()
    getDataConfig('framefw').then(res => {
      this.frameFwArray = res
    })
    post('/dictionary/findMapV1', { dicno: 'rolltype', level: 3 }).then(res => {
      this.typeoptions = res.data
    })
    post('/dictionary/findMapV1', { dicno: 'rollstate', level: 3 }).then(
      res => {
        this.kcoptions = res.data
      }
    )
    getDataConfig('roll_material').then(res => {
      this.materialArray = res
    })
    post('/dictionary/findMapV1', { dicno: 'roll_factory' }).then(res => {
      this.factoryArray = res.data //制造厂商
    })
  },
  methods: {
    cellClick(val) {
      this.rowIndex = val.indocno

      post('/baseRollSafetyReminder/findBaseRollSafetyReminder', {
        pageIndex: 1,
        pageSize: 100,
        condition: val
      }).then(res => {
        this.tableData_1 = res.data
      })
    },
    // 点击行信息，添加颜色标识
    setRowColor({ row, rowIndex }) {
      if (row.indocno == this.rowIndex) {
        return 'setTable-row-class-name'
      }
    },
    handleFrameScopeChange() {
      this.frameFwArray.forEach(item => {
        if (item.key == this.formLabelAlign.framerangeid) {
          this.formLabelAlign.framerange = item.value
        }
      })
    },
    handleMaterChange() {
      this.materialArray.forEach(item => {
        if (item.key == this.formLabelAlign.material_id) {
          this.formLabelAlign.material = item.value
        }
      })
    },
    production_line_id_change(vId) {
      let obj = {}
      obj = this.option1.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign.production_line = item.value
          this.formLabelAlign.production_line_id = item.key
        }
      })
    },
    handleroll_typeChange() {
      this.typeoptions.forEach(item => {
        if (item.value == this.formLabelAlign.roll_type) {
          this.formLabelAlign.roll_typeid = item.key
        }
      })
    },

    handleinventory_stateChange() {
      this.kcoptions.forEach(item => {
        if (item.value == this.formLabelAlign.inventory_state) {
          this.formLabelAlign.inventory_stateid = item.key
        }
      })
    },
    handleFactoryChange() {
      this.factoryArray.forEach(item => {
        if (item.key == this.formLabelAlign.factory_id) {
          this.formLabelAlign.factory = item.value
        }
      })
    },
    //分页之对应页
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    },
    //分页之一页多少条
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    },
    async findAll() {
      let res = await post('baseRollSafetyReminder/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      })
      this.tableData = res.data
      this.total = res.count
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
          post('baseRollSafetyReminder/deleteOne', {
            indocno: data.indocno
          }).then(res => {
            console.log('删除', res)
            if (res) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.findAll()
            }
          })
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
      this.dialogTitle = '编辑'
      this.formLabelAlign = Object.assign({}, data)
      this.formFlag = false
    },

    //打开添加车床弹窗
    open_add_1() {
      this.dialogVisible = true
      this.dialogTitle = '新增'
      this.formLabelAlign = {}
      this.formFlag = true
    },

    async handleSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.formFlag) {
            console.log(this.formLabelAlign)
            post('/baseRollSafetyReminder/insert', {
              BaseRollSafetyReminder: this.formLabelAlign
            }).then(res => {
              this.dialogVisible = false
              this.findAll()
              if (res) {
                this.$refs[formName].resetFields()
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
              }
            })
          } else {
            post('/baseRollSafetyReminder/update', {
              BaseRollSafetyReminder: this.formLabelAlign
            }).then(res => {
              this.dialogVisible = false
              this.findAll()
              if (res) {
                this.$refs[formName].resetFields()
                this.$message({
                  type: 'success',
                  message: '编辑成功'
                })
              }
            })
          }
        } else {
          return false
        }
      })
    },

    resetDialogForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
    },

    /**
     * description: 重置按钮
     */
    resetForm(formName) {
      this.searchInfo = {}
      this.findAll()
    },
    /**
     * description: 添加数据函数
     */
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          post('rollInformation/insert', {
            rollInformation: this.formLabelAlign
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
          post('rollInformation/update', {
            rollInformation: this.formLabelAlign
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
    }
  }
}
</script>

<style>
</style>
