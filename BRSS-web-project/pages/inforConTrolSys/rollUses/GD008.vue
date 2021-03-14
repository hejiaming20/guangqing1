<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :table-height="'calc(100vh - 210px)'"
      :page-size="pageSize"
      :current-page="pageIndex"
      index-type="index"
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
                label="辊号"
                prop="roll_no">
                <el-input v-model.trim="searchInfo.roll_no" />
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
                label="开始时间"
                prop="dbegin">
                <el-date-picker
                  v-model="searchInfo.dbegin"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="开始时间"/>
              </el-form-item>
              <el-form-item
                label="结束时间"
                prop="dend">
                <el-date-picker
                  v-model="searchInfo.dend"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="结束时间"/>
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
                @click="open_add_1()">添加(车床)</el-button>
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
          prop="roll_no"
          label="辊号"/>
        <el-table-column
          prop="roll_type"
          label="轧辊类型"/>
        <el-table-column
          prop="grind_starttime"
          show-overflow-tooltip
          label="车削开始时间"/>
        <el-table-column
          prop="grind_endtime"
          show-overflow-tooltip
          label="车削结束时间"/>
        <el-table-column
          prop="grindst"
          label="车削量"/>
        <!--<el-table-column
          prop="machine_no"
          label="车床号"/>-->
        <el-table-column
          prop="online_wear"
          label="在机磨损"/>
        <el-table-column
          prop=" lasttime_after_diameter"
          label="上机前直径"/>
        <el-table-column
          prop="before_diameter"
          label="车前直径"/>
        <el-table-column
          prop="after_diameter"
          label="车后直径"/>
        <el-table-column
          prop="diametermax"
          label="新辊直径"/>
        <el-table-column
          prop="diametermin"
          label="报废直径"/>

        <el-table-column
          prop="sclass"
          label="班"/>
        <el-table-column
          prop="sgroup"
          label="组"/>
        <el-table-column
          label="操作"
          width="200"
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
                label="辊号"
                prop="roll_no">
                <el-input v-model.trim="formLabelAlign.roll_no" />
              </el-form-item>
              <el-form-item
                label="产线"
                prop="production_line">
                <el-select
                  v-model="formLabelAlign.production_line"
                  placeholder="请选择"
                  @change="production_line_id_change">
                  <el-option
                    v-for="item in option1"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
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
              <el-form-item
                label="车削开始时间"
                prop="grind_starttime">
                <el-date-picker
                  v-model="formLabelAlign.grind_starttime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="开始时间"/>
              </el-form-item>
              <el-form-item
                label="车削结束时间"
                prop="grind_endtime">
                <el-date-picker
                  v-model="formLabelAlign.grind_endtime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="开始时间"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="车削量"
                prop="grindst">
                <el-input v-model="formLabelAlign.grindst" />
              </el-form-item>
              <!--<el-form-item
                label="车床号"
                prop="machine_no">
                <el-input v-model="formLabelAlign.machine_no" />
              </el-form-item>-->
              <el-form-item
                label="车前直径"
                prop="before_diameter">
                <el-input v-model="formLabelAlign.before_diameter" />
              </el-form-item>
              <el-form-item
                label="车后直径"
                prop="after_diameter">
                <el-input v-model="formLabelAlign.after_diameter" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="新辊直径"
                prop="diametermax">
                <el-input v-model="formLabelAlign.diametermax" />
              </el-form-item>
              <el-form-item
                label="报废直径"
                prop="diametermin">
                <el-input v-model="formLabelAlign.diametermin" />
              </el-form-item>
              <el-form-item
                label="班组"
                prop="sgroup">
                <el-select
                  v-model="formLabelAlign.sgroup"
                  placeholder="请选择">
                  <el-option
                    v-for="item in option2"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="班"
                prop="sclass">
                <el-select
                  v-model="formLabelAlign.sclass"
                  placeholder="请选择">
                  <el-option
                    v-for="item in option3"
                    :key="item.key"
                    :label="item.value"
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
          size="mini"
          type="primary"
          @click="resetDialogForm('addForm')">取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleSave('addForm')">确 定</el-button>
      </span>
    </el-dialog>
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
      option1: [],
      option2: [],
      option3: [],
      formLabelAlign: {},
      tableData: [{}],
      total: 0,
      dialogVisible: false,
      formFlag: true, // true 添加 false 编辑
      pageIndex: 1,
      pageSize: 30,
      dialogTitle: '',
      materialArray: [],
      factoryArray: []
    }
  },
  mounted() {
    this.findAll()
    post('/dictionary/findMapV1', { dicno: 'proline' }).then(res => {
      this.option1 = res.data //产线（直接使用）
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
    post('/dictionary/findMapV1', { dicno: 'team' }).then(res => {
      this.option2 = res.data //班组
    })
    post('/dictionary/findMapV1', { dicno: 'shift' }).then(res => {
      this.option3 = res.data //班组
    })
  },
  methods: {
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
    handleMaterChange() {
      this.materialArray.forEach(item => {
        if (item.key == this.formLabelAlign.material_id) {
          this.formLabelAlign.material = item.value
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
      let res = await post('/rollGrindingDouble/findByPage', {
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
          post('rollGrindingDouble/deleteOne', { indocno: data.indocno }).then(
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
            post('/rollGrindingDouble/insert', {
              rollGrindingDouble: this.formLabelAlign
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
            post('/rollGrindingDouble/update', {
              rollGrindingDouble: this.formLabelAlign
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
