<!--
 * @Author: CRM 角色
 * @Date: 2020-08-28 14:15:22
 * @LastEditTime: 2020-12-08 09:42:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\inforConTrolSys\Bearmanagement\CS002.vue
-->
<template>
  <div>
    <table-easy
      :table-data="tableData"
      :table-height="'calc(100vh - 195px)'"
      :page-size="pageSize"
      :total="total"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <template slot="TableHead">
        <el-row>
          <el-col :span="20">
            <el-form
              ref="ruleForm"
              :inline="true"
              :model="searchInfo"
              class="search-info"
              label-width="80px">
              <el-form-item
                label="角色名称"
                prop="roll_no">
                <el-input v-model="searchInfo.role_name" />
              </el-form-item>
              <el-form-item
                label="角色编号"
                prop="production_line">
                <el-input v-model="searchInfo.role_code" />
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4">
            <div class="btn">
              <el-button
                size="mini"
                type="primary"
                @click="handleSearchClick">查询</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="resetForm('ruleForm')">重置</el-button>
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
          prop="role_name"
          label="角色名称"/>
        <el-table-column
          prop="role_code"
          label="角色编码"/>
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
              @click="handleDelectOut(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </table-easy>

    <!-- 添加/编辑弹窗 -->
    <el-dialog
      :visible.sync="formInfodialogVisible"
      :title="formTitle"
      class="layout-dialog"
      width="45%">
      <div class="layout-search">
        <el-form
          ref="formInfo"
          :model="form"
          :rules="rules"
          label-width="80px">
          <el-form-item
            label="名称"
            prop="role_name">
            <el-input v-model="form.role_name" />
          </el-form-item>
          <el-form-item
            label="编码"
            prop="role_code">
            <el-input v-model="form.role_code" />
          </el-form-item>
          <div v-if="isChange">
            <template>
              <el-table
                ref="multipleTable"
                :data="accData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  align="center"
                  width="55"/>
                <el-table-column
                  prop="menu_name"
                  align="center"
                  label="名称"
                  width="120"/>
                <el-table-column
                  prop="sparent"
                  label="上级菜单"
                  align="center"
                  show-overflow-tooltip/>
                <el-table-column
                  label="菜单等级"
                  align="center"
                >
                  <template slot-scope="scope">
                    {{ scope.row.menu_level }}
                    级
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="menu_home_menu"
                  label="快捷菜单"
                  width="100">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.always_menu"/>
                  </template>
                </el-table-column>
              </el-table>
          </template></div>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          size="small"
          @click="formInfodialogVisible = false">取 消</el-button>
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
  name: 'CS002',
  components: {
    TableEasy
  },
  data() {
    return {
      tableData: [],
      rules: {
        role_name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        role_code: [{ required: true, message: '请角色编码', trigger: 'blur' }]
      },
      accData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 30,
      searchInfo: {}, // 查询条件
      form: {},
      formFlag: true, // true 添加 false 编辑
      formTitle: '',
      formInfodialogVisible: false, // 弹窗
      isChange: true,
      multipleSelection: [], //表格选中
      str_indocno: '',
      str_always: '',
      formindocno: 0,
      selectedIndocnoList: []
    }
  },
  mounted() {
    this.findAll()
    this.findAcc()
  },
  methods: {
    handleSearchClick() {
      this.pageIndex = 1
      this.findAll()
    },
    // 查询全部
    async findAll() {
      let res = await post('/sysRole/findByPage', {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
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
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    },
    // 查询所有菜单
    async findAcc() {
      let res = await post('/sysMenu/findByPage', {
        pageSize: 9999,
        pageIndex: 1,
        condition: {}
      })
      this.accData = res.data
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // 打开添加弹窗
    handleAddClick() {
      this.formInfodialogVisible = true
      this.formTitle = '添加人员信息'
      this.form = {}
      this.formFlag = true
      this.isChange = false
    },
    // 更改按钮
    handleEdit(val) {
      this.form = {}
      this.isChange = true
      this.form = JSON.parse(JSON.stringify(val))
      this.formindocno = val.indocno
      this.formInfodialogVisible = true
      this.formTitle = '编辑人员信息'
      this.formFlag = false
      this.getmore()
    },
    //获取角色表格
    async getmore() {
      let res = await post('/sysRole/findByIndocno', {
        indocno: this.formindocno
      })
      /*
      因为null  初始化为false
      * */
      this.accData.forEach((item, index) => {
        item.always_menu = false
      })
      console.log(this.accData)
      const selectedIndocnoList = []
      res.data.sysMenu.forEach((item, index) => {
        selectedIndocnoList.push(item.indocno)
        //
        this.accData.forEach((item1, index1) => {
          if (item1.indocno == item.indocno) {
            if (item.always_menu == 0) {
              item1.always_menu = false
            } else if (item.always_menu == 1) {
              item1.always_menu = true
            }
          }
        })
      })
      const selectedDataArr = this.accData.filter(
        i => selectedIndocnoList.indexOf(i.indocno) !== -1
      )
      this.toggleSelection(selectedDataArr)
    },
    // 添加/编辑弹窗
    async handleFormSave() {
      this.str_always = ''
      this.$refs.formInfo.validate(valid => {
        if (valid) {
          if (this.formFlag) {
            post('/sysRole/insert', {
              sysRole: this.form
            }).then(res => {
              if (res.status == 2000) {
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
                this.findAll()
              } else {
                this.$message('添加失败')
              }
            })
          } else {
            post('/sysRole/update', {
              sysRole: this.form
            }).then(res => {
              if (res.status == 2000) {
                this.$message({
                  type: 'success',
                  message: '编辑成功'
                })
                this.multipleSelection.forEach((item, index) => {
                  this.str_indocno += ',' + item.indocno
                  item.always_menu == true
                    ? (item.always_menu = 1)
                    : (item.always_menu = 0)
                  this.str_always += ',' + item.always_menu
                })
                post('/sysRole/insertMenu', {
                  indocno: this.formindocno,
                  str_indocno: this.str_indocno,
                  str_always: this.str_always
                })
                this.findAll()
              } else {
                this.$message('编辑失败')
              }
            })
          }
          this.formInfodialogVisible = false
          this.form = {}
        } else {
          return false
        }
      })
    },
    // 默认选中的复选框
    toggleSelection(rows) {
      this.$refs.multipleTable.clearSelection()
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, true)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 删除按钮
    handleDelectOut(val) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('/sysRole/deleteOne', { indocno: val.indocno }).then(res => {
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
    resetForm(formName) {
      this.searchInfo = {}
    }
  }
}
</script>

<style scoped>
</style>
