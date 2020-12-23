<!--
 * @Author: ming
 * @Date: 2020-09-23
 * @LastEditTime: 2020-11-02 13:28:43
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\inforConTrolSys/Bearmanagement/CS005
-->
<template>
  <div>
    <div class="layout-default-margin">
      <Table-easy
        :table-data="tableData"
        :total="total"
        :table-height="'calc(100vh - 220px)'"
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
                :inline="true"
                :model="searchInfo">
                <el-form-item
                  label="轴承座号"
                  prop="chock_no">
                  <el-input v-model="searchInfo.chock_no" />
                </el-form-item>
                <el-form-item
                  label="部件名称"
                  prop="sname">
                  <el-input v-model="searchInfo.sname" />
                </el-form-item>
                <el-form-item
                  label="轧辊类型"
                  prop="roll_typeid">
                  <el-select
                    v-model="searchInfo.roll_typeid"
                    placeholder="请选择">
                    <el-option
                      v-for="item in option2"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="产线"
                  prop="production_line_id">
                  <el-select
                    v-model="searchInfo.production_line_id"
                    placeholder="请选择">
                    <el-option
                      v-for="item in option1"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="轴承座状态"
                  prop="istatus">
                  <el-select
                    v-model="searchInfo.istatus"
                    placeholder="请选择">
                    <el-option
                      v-for="item in option3"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"/>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="4">
              <div class="btn">
                <el-button
                  size="mini"
                  type="primary"
                  @click="findSearch">查询</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="resetForm('ruleForm')">重置</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="open_add">添加</el-button>
              </div>
            </el-col>
          </el-row>
        </template>
        <template slot="TableBody">
          <el-table-column
            prop="chock_no"
            min-width="90px"
            align="center"
            label="轴承座号"/>
          <el-table-column
            prop="sname"
            align="center"
            min-width="100px"
            label="部件名称"/>
          <el-table-column
            prop="roll_type"
            min-width="100px"
            align="center"
            label="轴承座类型"/>
          <el-table-column
            prop="install_location"
            min-width="100px"
            align="center"
            label="安装位置"/>
          <el-table-column
            prop="up_location"
            min-width="100px"
            align="center"
            label="上机位置"/>
          <el-table-column
            prop="number"
            min-width="150px"
            align="center"
            label="部件编号"/>
          <el-table-column
            prop="usetime"
            min-width="150px"
            align="center"
            label="投用时间"/>
          <el-table-column
            prop="lasttime"
            min-width="150px"
            align="center"
            label="剩余检测时间"/>
          <el-table-column
            prop="reports"
            min-width="100px"
            align="center"
            label="检测报告"/>
          <el-table-column
            prop="results"
            min-width="100px"
            align="center"
            label="检测结果"/>
          <el-table-column
            prop="status"
            min-width="120px"
            align="center"
            label="部件状态"/>
          <el-table-column
            label="操作"
            min-width="200"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="warning"
                @click="open_Edit(scope.row)">修改</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </template>
      </Table-easy>
    </div>
    <!-- 添加/编辑弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="form"
      class="layout-dialog"
      width="80%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :rules="rules"
          :model="formLabelAlign"
          label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="部件名称"
                prop="sname">
                <el-input v-model="formLabelAlign.sname" />
              </el-form-item>
              <el-form-item
                label="轧辊类型"
                prop="roll_type">
                <el-select
                  v-model="formLabelAlign.roll_type"
                  placeholder="请选择"
                  @change="roll_type_change">
                  <el-option
                    v-for="item in option2"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="产线"
                prop="production_line">
                <el-select
                  v-model="formLabelAlign.production_line"
                  placeholder="请选择"
                  @change="production_line_change">
                  <el-option
                    v-for="item in option1"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="机架号"
                prop="frame_no">
                <el-select
                  v-model="formLabelAlign.frame_no"
                  placeholder="请选择"
                  @change="frame_no_change">
                  <el-option
                    v-for="item in option"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="安装位置"
                prop="install_location">
                <el-select
                  v-model="formLabelAlign.install_location"
                  placeholder="请选择"
                  @change="install_location_change">
                  <el-option
                    v-for="item in option4"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="上机位置"
                prop="up_location">
                <el-select
                  v-model="formLabelAlign.up_location"
                  placeholder="请选择"
                  @change="up_location_change">
                  <el-option
                    v-for="item in option5"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="投用时间"
                prop="usetime">
                <el-date-picker
                  v-model="formLabelAlign.usetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="投用时间"/>
              </el-form-item>
              <el-form-item
                label="剩余换区时间"
                prop="lasttime">
                <el-input v-model="formLabelAlign.lasttime" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="轴承座号"
                prop="chock_no">
                <el-input v-model="formLabelAlign.chock_no" />
              </el-form-item>
              <el-form-item
                v-if="!choice"
                label="检测报告"
                prop="reports">
                <el-input v-model="formLabelAlign.reports" />
              </el-form-item>
              <el-form-item
                v-if="!choice"
                label="检测结果"
                prop="results">
                <el-input v-model="formLabelAlign.results" />
              </el-form-item>


              <el-form-item
                label="部件状态"
                prop="status">
                <el-select
                  v-model="formLabelAlign.status"
                  placeholder="请选择"
                  @change="status_change">
                  <el-option
                    v-for="item in option6"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item
                label="备注"
                prop="snote">
                <el-input
                  v-model="formLabelAlign.snote"
                  type="textarea"/>
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
          @click="handleSave('addForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <el-row>
      <el-col :span="12">
        <Table-easy
          :table-data="tableData1"
          :total="total"
          :table-foot="false"
          :table-head="false"
          :is-pagination-show="false"
          :table-height="400"
        >
          <template slot="TableBody">
            <el-table-column
              prop="sname"
              label="部件编号"/>
            <el-table-column
              prop="install_location"
              label="安装位置"/>

            <el-table-column
              prop="reports"
              label="检测报告"/>
            <el-table-column
              prop="results"
              label="检测结果"/>
            <el-table-column
              label="操作"
              min-width="100"
              align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit12(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </template>
        </Table-easy>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
import { get, post } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
export default {
  components: { TableEasy },
  data() {
    return {
      searchInfo: {
        /*    roll_typeid: '1', //轧辊类型id
        production_line_id: '1', //产线id
        istatus: '1' //部件状态id*/
      },
      rules: {
        indocno: [{ required: true, message: '请输入主键', trigger: 'blur' }],
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
        istate: [{ required: true, message: '请输入状态', trigger: 'blur' }],
        sname: [{ required: true, message: '请输入部件名称', trigger: 'blur' }],
        roll_typeid: [
          { required: true, message: '请输入轧辊类型id', trigger: 'blur' }
        ],
        roll_type: [
          { required: true, message: '请输入轧辊类型', trigger: 'blur' }
        ],
        production_line_id: [
          { required: true, message: '请输入产线id', trigger: 'blur' }
        ],
        production_line: [
          { required: true, message: '请输入产线', trigger: 'blur' }
        ],
        frame_noid: [
          { required: true, message: '请输入机架号id', trigger: 'blur' }
        ],
        frame_no: [
          { required: true, message: '请输入机架号', trigger: 'blur' }
        ],
        install_location_id: [
          { required: true, message: '请输入安装位置id', trigger: 'blur' }
        ],
        install_location: [
          { required: true, message: '请输入安装位置', trigger: 'blur' }
        ],
        up_location_id: [
          { required: true, message: '请输入上机位置id', trigger: 'blur' }
        ],
        up_location: [
          { required: true, message: '请输入上机位置', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入部件编号', trigger: 'blur' }
        ],
        usetime: [
          { required: true, message: '请输入投用时间', trigger: 'blur' }
        ],
        lasttime: [
          { required: true, message: '请输入剩余换区时间', trigger: 'blur' }
        ],
        reports: [
          { required: true, message: '请输入检测报告', trigger: 'blur' }
        ],
        results: [
          { required: true, message: '请输入检测结果', trigger: 'blur' }
        ],
        istatus: [
          { required: true, message: '请输入部件状态id', trigger: 'blur' }
        ],
        status: [{ required: true, message: '请输入部件状态', trigger: 'blur' }]
      },
      formLabelAlign: {
        /*   roll_typeid: 1, //轧辊类型id
        production_line_id: 1, //产线id
        frame_noid: 1, //机架号id
        install_location_id: 1, //安装位置id
        up_location_id: 1, //上机位置id
        istatus: 1 //部件状态id*/
      }, //添加
      formLabelAlign1: {}, //修改
      tableData: [],
      total: 0,
      tableData1: [],
      dialogVisible: false,
      dialogVisible1: false,
      option: [],
      option1: [],
      option2: [],
      option3: [],
      option4: [],
      option5: [],
      option6: [],
      pageIndex: 1,
      pageSize: 30,
      form: '',
      choice: false
    }
  },
  mounted() {
    post('/dictionary/findMapV1', { dicno: 'frameteam' }).then(res => {
      this.option = res.data //机架（直接使用）
    })
    post('/dictionary/findMapV1', { dicno: 'proline' }).then(res => {
      this.option1 = res.data //产线（直接使用）
    })
    post('/dictionary/findMapV1', { dicno: 'rolltype' }).then(res => {
      this.option2 = res.data //轧辊类型（直接使用）
    })
    post('/dictionary/findMapV1', { dicno: 'chockstatus' }).then(res => {
      this.option3 = res.data //轴承座状态（直接使用）
    })

    post('/dictionary/findMapV1', { dicno: 'installlocation' }).then(res => {
      this.option4 = res.data //安装位置（直接使用）
    })
    post('/dictionary/findMapV1', { dicno: 'uplocation' }).then(res => {
      this.option5 = res.data //上机位置座状态（直接使用）
    })
    post('/dictionary/findMapV1', { dicno: 'equip_status' }).then(res => {
      this.option6 = res.data //部件状态（直接使用）
    })
    this.findAll()
  },
  methods: {
    roll_type_change(vId) {
      let obj = {}
      obj = this.option2.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign.roll_type = item.value
          this.formLabelAlign.roll_typeid = item.key
        }
      })
    },
    production_line_change(vId) {
      let obj = {}
      obj = this.option1.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign.production_line = item.value
          console.log(this.formLabelAlign.production_line)
          this.formLabelAlign.production_line_id = item.key
        }
      })
    },
    frame_no_change(vId) {
      let obj = {}
      obj = this.option.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign.frame_no = item.value
          this.formLabelAlign.frame_noid = item.key
        }
      })
    },

    install_location_change(vId) {
      let obj = {}
      obj = this.option4.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign.install_location = item.value
          this.formLabelAlign.install_location_id = item.key
        }
      })
    },
    up_location_change(vId) {
      let obj = {}
      obj = this.option5.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign.up_location = item.value
          this.formLabelAlign.up_location_id = item.key
        }
      })
    },

    status_change(vId) {
      let obj = {}
      obj = this.option6.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign.status = item.value
          this.formLabelAlign.istatus = item.key
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
    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },

    async findAll() {
      let res = await post('/basePressureParts/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      })
      this.tableData = res.data
      this.total = res.count
    },

    open_add() {
      this.dialogVisible = true
      this.formLabelAlign = {}
      this.form = '添加'
      this.choice = true
    },
    open_Edit(data) {
      this.dialogVisible = true
      this.formLabelAlign = data
      this.form = '修改'
      this.choice = false
    },

    handleSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.choice) {
            post('/basePressureParts/insert', {
              basePressureParts: this.formLabelAlign
            }).then(res => {
              this.dialogVisible = false
              this.findAll()
            })
          } else {
            post('/basePressureParts/update', {
              basePressureParts: this.formLabelAlign
            }).then(res => {
              this.dialogVisible = false
              this.findAll()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    /* //添加
    async handleSave1() {
      // this.formLabelAlign
      //  this.dialogVisible = false
      let res = await post('/basePressureParts/insert', {
        basePressureParts: this.formLabelAlign
      })
      this.dialogVisible = false
      this.findAll()
    },
    // 修改数据按钮
    handleEdit(data) {
      this.dialogVisible1 = true
      this.formLabelAlign1 = data
    },
    async handleEdit_save() {
      let res = await post('/basePressureParts/update', {
        basePressureParts: this.formLabelAlign1
      })
      this.dialogVisible1 = false
      this.findAll()
    },*/
    handleDelete(data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('/basePressureParts/deleteOne', { indocno: data.indocno }).then(
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
     * description: 重置按钮
     */
    resetForm(formName) {
      this.searchInfo = {}
      // console.log('重置', formName)
      // this.$refs[formName].resetFields()
      // console.log('重置', this.$refs[formName])
      this.findAll()
    }
  }
}
</script>

<style>
</style>
