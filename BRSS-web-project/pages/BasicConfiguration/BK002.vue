<!--
 * @Author: CRM 账号
 * @Date: 2020-08-28 14:15:22
 * @LastEditTime: 2020-12-08 09:47:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\inforConTrolSys\Bearmanagement\CS002.vue
-->
<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="20">
        <table-easy
          :table-data="tableData"
          :page-size="pageSize"
          :table-height="'calc(100vh - 195px)'"
          :total="total"
          @row-click="handleRollClick"
          @handle-current-change="handleCurrentChange"
          @handle-size-change="handleSizeChange">
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
                    label="用户名"
                    prop="roll_no">
                    <el-input v-model="searchInfo.sname" />
                  </el-form-item>
                  <el-form-item
                    label="账号"
                    prop="production_line">
                    <el-input v-model="searchInfo.account" />
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
                    @click="resetForm">重置</el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleAddClick">添加</el-button>
                </div>
              </el-col>
            </el-row>
          </template>
          <template slot="TableBody">
            <el-table-column
              type="index"
              label="序号"/>
            <el-table-column
              prop="account"
              label="账号"/>
            <el-table-column
              prop="sname"
              label="用户名"/>
            <el-table-column
              prop="company"
              label="产线"/>
            <el-table-column
              prop="up_location"
              label="作业区"/>
            <el-table-column
              label="操作"
              min-width="250"
              align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="warning"
                  @click="handleEdit(scope.row)">修改</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click.stop="handleDelectOut(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </template>
        </table-easy>
      </el-col>
      <el-col :span="4">
        <div class="layout-block bk2-right">
          <div class="layout-small-title-block bottom-line">
            <span>{{ rowName }}</span>
            <span>——所拥有的角色</span>
          </div>
          <div
            v-for="item in showRole"
            :key="item.indocno"
            class="layout-small-title-block">{{ item.role_name }}</div>
        </div>
      </el-col>
    </el-row>


    <!-- 添加 -->
    <el-dialog
      :visible.sync="formInfodialogVisibleAdd"
      :title="formTitle"
      class="layout-dialog"
      width="30%">
      <div class="layout-search">
        <el-form
          ref="formInfo"
          :rules="rules"
          :model="addForm"
          label-width="80px">
          <el-form-item
            label="账户"
            prop="account">
            <el-input v-model="addForm.account" />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password">
            <el-input v-model="addForm.password" />
          </el-form-item>
          <el-form-item
            label="姓名"
            prop="sname">
            <el-input v-model="addForm.sname" />
          </el-form-item>
          <el-form-item
            label="性别"
            prop="sex">
            <template>
              <el-radio
                v-model="addForm.sex"
                :label="1">男</el-radio>
              <el-radio
                v-model="addForm.sex"
                :label="0">女</el-radio>
            </template>
          </el-form-item>
          <el-form-item
            prop="area"
            label="作业区">
            <el-select
              v-model="addForm.area"
              placeholder="请选择"
              @change="areaid_change1">
              <el-option
                v-for="item in areaOptions"
                :key="item.key"
                :label="item.value"
                :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="companyid"
            label="产线">
            <el-select
              v-model="addForm.companyid"
              placeholder="请选择"
              @change="handleProlineChange">
              <el-option
                v-for="item in prolineArray"
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
          type="primary"
          size="small"
          @click="resetAdd">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleFormAddSave">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog
      :visible.sync="formInfodialogVisible"
      :title="formTitle"
      :before-close="handleClose"
      class="layout-dialog"
      width="30%">
      <div class="layout-search">
        <el-form
          ref="editForm"
          :model="customForm"
          :rules="rules"
          label-width="80px">
          <el-form-item
            label="账户"
            prop="account">
            <el-input v-model="customForm.account" />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password">
            <el-input v-model="customForm.password" />
          </el-form-item>
          <el-form-item
            label="姓名"
            prop="sname">
            <el-input v-model="customForm.sname" />
          </el-form-item>
          <el-form-item
            prop="areaid"
            label="作业区">
            <el-select
              v-model="customForm.area"
              placeholder="请选择"
              @change="areaid_change2">
              <el-option
                v-for="item in areaOptions"
                :key="item.key"
                :label="item.value"
                :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="companyid"
            label="产线">
            <el-select
              v-model="customForm.companyid"
              placeholder="请选择"
              @change="handlecompChange">
              <el-option
                v-for="item in prolineArray"
                :key="item.key"
                :label="item.value"
                :value="item.key"/>
            </el-select>
          </el-form-item>
          <div v-show="changeDialog">
            <el-form-item
              label="角色">
              <template>
                <el-table
                  ref="multipleTable"
                  :data="accData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55"/>
                  <el-table-column
                    prop="role_name"
                    label="名称"
                    width="120"/>
                </el-table>
              </template>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          size="small"
          @click="handleClose"
        >取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleFormSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import { get, post } from '@/lib/Util'
export default {
  name: 'BK002',
  components: {
    TableEasy
  },
  data() {
    return {
      rules: {
        account: [
          { required: true, message: '请输入账户名称', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        sname: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        companyid: [
          { required: true, message: '请选择产线', trigger: 'change' }
        ]
      },
      tableData: [],
      areaOptions: [], //作业区
      aopVal: '',
      companyOptions: [], //厂区
      copVal: '',
      jschecked: '',
      total: 0,
      sex: '1',
      pageIndex: 1,
      pageSize: 30,
      searchInfo: {}, // 查询条件
      addForm: {},
      customForm: {
        indocno: []
      },
      formFlag: true, // true 添加 false 编辑
      formTitle: '',
      formInfodialogVisibleAdd: false, // 弹窗
      formInfodialogVisible: false, // 弹窗
      changeDialog: false, // 弹窗
      juese: [], //存放角色
      formindocno: '',
      multipleSelection: [], //表格选中
      str_indocno: '',
      accData: [], // 角色表格
      prolineArray: [],
      showRole: [],
      rowName: ''
    }
  },
  mounted() {
    this.findAll()
    this.findJs()
    this.findAcc()
    this.getOptions()
    post('/dictionary/findMapV1', { dicno: 'fac_area' }).then(res => {
      this.areaOptions = res.data //作业区
    })
  },
  methods: {
    areaid_change1(vId) {
      let obj = {}
      obj = this.areaOptions.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.addForm.area = item.value
          this.addForm.areaid = item.key
        }
      })
    },
    areaid_change2(vId) {
      let obj = {}
      obj = this.areaOptions.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.customForm.area = item.value
          this.customForm.areaid = item.key
        }
      })
    },
    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },
    // 查询全部
    async findAll() {
      let res = await post('/sysUser/findByPage', {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        condition: {
          sname: this.searchInfo.sname,
          account: this.searchInfo.account
        }
      })
      this.tableData = res.data
      this.handleRollClick(this.tableData[0])
      this.total = res.count
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    },
    // 选择产线
    handleProlineChange() {
      this.prolineArray.forEach(item => {
        if (item.key == this.addForm.companyid) {
          this.addForm.company = item.value
        }
      })
    },
    handlecompChange() {
      this.prolineArray.forEach(item => {
        if (item.key == this.customForm.companyid) {
          this.customForm.company = item.value
        }
      })
    },
    async getOptions() {
      let res = await post('/dictionary/findMapV1', { dicno: 'proline' })
      console.log('产线', res)
      this.prolineArray = res.data
    },
    // 查询角色
    async findJs() {
      let res = await post('/sysRole/findAll', {})
      this.juese = res
    },
    // 打开添加弹窗
    handleAddClick() {
      this.formInfodialogVisibleAdd = true
      this.formTitle = '人员添加'
      this.changeDialog = false
    },
    // :before-close="handleClose"
    handleClose() {
      this.addForm = {}
      this.formInfodialogVisible = false
    },

    // 修改按钮
    handleEdit(val) {
      this.formindocno = val.indocno
      this.customForm = Object.assign(val)
      this.formInfodialogVisible = true
      this.changeDialog = true
      this.getmore()
      this.formTitle = '人员修改'
    },
    // 取消事件
    resetDialog() {
      this.$refs.multipleTable.clearSelection()
      this.accData = []
      this.customForm = {}
      this.formInfodialogVisible = false
    },
    resetAdd() {
      this.formInfodialogVisibleAdd = false
    },
    //获取角色表格 秀
    // async getmore() {
    //   let res = await post('/sysUser/findByIndocno', {
    //     indocno: this.formindocno
    //   })
    //   console.log(' res.data', res.data)
    //   this.multipleSelection = res.data
    //   this.accData.forEach((item, index) => {
    //     res.data.sysRole.forEach(i => {
    //       if (item.indocno === i.indocno) {
    //         this.$refs.multipleTable.toggleRowSelection(item)
    //       }
    //     })
    //   })
    // },

    //获取角色表格 华
    async getmore() {
      let res = await post('/sysUser/findByIndocno', {
        indocno: this.formindocno
      })

      const selectedIndocnoList = []
      console.log(' res.data', res.data)
      res.data.sysRole.forEach((item, index) => {
        selectedIndocnoList.push(item.indocno)
      })

      console.log('获取角色表格', res.data.sysRole)
      const selectedDataArr = this.accData.filter(
        i => selectedIndocnoList.indexOf(i.indocno) !== -1
      )

      this.toggleSelection(selectedDataArr)
    },
    // 默认选中的复选框
    toggleSelection(rows) {
      this.$refs.multipleTable.clearSelection()
      if (rows) {
        rows.forEach(row => {
          console.log('row', this.$refs.multipleTable)
          this.$refs.multipleTable.toggleRowSelection(row, true)
        })
      } else {
        console.log('false')
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 添加
    handleFormAddSave() {
      this.$refs.formInfo.validate(valid => {
        if (valid) {
          post('/sysUser/insert', {
            sysUser: this.addForm
          }).then(res => {
            if (res.status == 2000) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
            } else {
              this.$message('添加失败')
            }
            this.formInfodialogVisibleAdd = false
            this.findAll()
          })
        } else {
          return false
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //修改确定按钮
    async handleFormSave() {
      this.str_indocno = ''
      this.$refs.editForm.validate(valid => {
        if (valid) {
          post('/sysUser/update', {
            sysUser: this.customForm
          }).then(res => {
            if (res.status == 2000) {
              this.$message({
                type: 'success',
                message: '编辑成功'
              })
              this.multipleSelection.forEach((item, index) => {
                this.str_indocno += ',' + item.indocno
              })

              post('/sysUser/insertRole', {
                indocno: this.formindocno,
                str_indocno: this.str_indocno
              })
            }
            this.formInfodialogVisible = false
            this.findAll()
          })
        } else {
          return false
        }
      })
    },
    handleRollClick(row) {
      this.rowName = row.sname
      console.log('row=====', row)
      this.showRole = []
      post('/sysUser/findByIndocno', {
        indocno: row.indocno
      }).then(res => {
        var data = []
        res.data.sysRole.forEach((item, index) => {
          data.push(item.indocno)
        })
        this.showRole = this.accData.filter(i => data.indexOf(i.indocno) !== -1)
        //下面为测试用
        var t = []
        this.accData.forEach(item => {
          t.push(item.indocno)
        })
        console.log('角色', t)
        console.log('ggaagga', data)
      })
    },
    // 查询表格(角色)
    async findAcc() {
      let res = await post('/sysRole/findByPage', {
        pageSize: 9999,
        pageIndex: this.pageIndex,
        condition: this.searchInfo
      })
      console.log('acc', res)
      this.accData = res.data
    },

    // 删除按钮
    handleDelectOut(val) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('/sysUser/deleteOne', { indocno: val.indocno }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.findAll()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 重置按钮
    resetForm() {
      this.searchInfo = {}
    }
  }
}
</script>

<style>
.bk2-right {
  height: calc(100vh - 70px);
  box-sizing: border-box;
}
</style>
