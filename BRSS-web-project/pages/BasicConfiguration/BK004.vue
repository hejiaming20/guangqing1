<!--
 * @Author: CRM 菜单管理
 * @Date: 2020-08-28 14:15:22
 * @LastEditTime: 2020-12-08 09:46:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\inforConTrolSys\Bearmanagement\CS002.vue
-->
<template>
  <div>
    <table-easy
      :table-data="tableData"
      :table-height="'calc(100vh - 195px)'"
      :total="total"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <template slot="TableHead">
        <el-row>
          <el-col :span="16">
            <el-form
              ref="ruleForm"
              :model="searchInfo"
              :inline="true"
              class="search-info"
              label-width="80px">
              <el-form-item
                label="菜单名称"
                prop="menu_name">
                <el-input v-model="searchInfo.menu_name" />
              </el-form-item>
              <el-form-item
                label="菜单等级"
                prop="menu_level">
                <el-input v-model="searchInfo.menu_level" />
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8">
            <div class="btn">
              <el-button
                size="mini"
                type="primary"
                @click="findSearch()">查询</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="resetForm()">重置</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleAddClick">添加一级菜单</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          :index="formatterTableDataIndex"
          type="index"
          align="center"
          label="序号"/>
        <el-table-column
          prop="menu_name"
          label="菜单名称"/>
        <el-table-column
          prop="menu_level"
          width="70px"
          label="等级"/>
        <el-table-column
          prop="menu_url"
          label="链接"/>
        <el-table-column
          prop="sparent"
          label="上级菜单"/>
        <el-table-column
          label="操作"
          min-width="140px"
          align="center">
          <template slot-scope="scope">
            <template v-show="notThree">
              <el-button
                v-show="scope.row.menu_level !== 3"
                size="mini"
                type="primary"
                @click="handleAddChild(scope.row)">添加下级菜单</el-button>
            </template>
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

    <!-- 添加 -->
    <el-dialog
      :visible.sync="formInfodialogVisible"
      :title="formTitle"
      class="layout-dialog"
      width="30%">
      <div class="layout-search">
        <el-form
          ref="formInfo"
          :model="form"
          label-width="80px">
          <el-form-item
            label="菜单名称"
            prop="roll_no">
            <el-input v-model="form.menu_name" />
          </el-form-item>
          <el-form-item
            label="菜单图标"
            prop="roll_type">
            <el-input v-model="form.menu_icon" />
          </el-form-item>
          <el-form-item
            label="菜单链接"
            prop="roll_type">
            <el-input v-model="form.menu_url" />
          </el-form-item>
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
    <!-- 修改 -->
    <el-dialog
      :visible.sync="dialogChage"
      :title="formTitle"
      class="layout-dialog"
      width="30%">
      <div class="layout-search">
        <el-form
          ref="formInfo"
          :model="form"
          label-width="80px">
          <el-form-item
            label="菜单名称"
            prop="roll_no">
            <el-input v-model="form.menu_name" />
          </el-form-item>
          <el-form-item
            label="菜单图标"
            prop="roll_type">
            <el-input v-model="form.menu_icon" />
          </el-form-item>
          <el-form-item
            label="菜单链接"
            prop="roll_type">
            <el-input v-model="form.menu_url" />
          </el-form-item>
          <el-form-item
            label="上一级"
            prop="sparent">
            <el-input 
              v-model="form.sparent" 
              :disabled="true"/>
          </el-form-item>
          <el-form-item
            label="菜单等级"
            prop="roll_type">
            <el-input 
              v-model="form.menu_level"
              :disabled="true" />
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          size="small"
          @click="dialogChage = false">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleFormSave">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增下一级 -->
    <el-dialog
      :visible.sync="dialogAddChild"
      :title="formTitle"
      class="layout-dialog"
      width="30%">
      <div class="layout-search">
        <el-form
          ref="formInfo"
          :model="form"
          label-width="80px">
          <el-form-item
            label="菜单名称"
            prop="roll_no">
            <el-input v-model="form.menu_name" />
          </el-form-item>
          <el-form-item
            label="上级菜单"
            prop="roll_no">
            <el-input 
              v-model="form.sparent" 
              :disabled="true"/>
            <el-form/>
        </el-form-item></el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          size="small"
          @click="dialogClose">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleFormChild">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import TableEasy from '@/components/TasilyTableEasy'
import { get, post } from '@/lib/Util'
export default {
  name: 'BK004',
  components: {
    TableEasy
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 30,
      searchInfo: {}, // 查询条件
      form: {},
      formFlag: true, // true 添加 false 编辑
      formTitle: '',
      formInfodialogVisible: false, // 弹窗
      dialogAddChild: false, // 弹窗
      dialogChage: false, // 弹窗
      isntThree: false
    }
  },
  mounted() {
    this.findAll()
  },
  methods: {
    formatterTableDataIndex(index) {
      var pageIndex = 0
      if (this.pageSize || this.pageIndex) {
        var pageIndex = (this.pageIndex - 1) * this.pageSize + index + 1
      } else {
        pageIndex = index + 1
      }
      return pageIndex
    },
    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },
    // 查询全部
    async findAll() {
      let res = await post('/sysMenu/findByPage', {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        condition: this.searchInfo
      })
      console.log('tableData', res)
      this.tableData = res.data
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
    // 打开添加弹窗
    handleAddClick() {
      this.formInfodialogVisible = true
      this.formTitle = '添加一级菜单'
      this.form = {}
      this.formFlag = true
    },
    // 修改按钮
    handleEdit(val) {
      this.form = JSON.parse(JSON.stringify(val))
      this.dialogChage = true
      this.formTitle = '修改菜单'
      this.formFlag = false
    },
    // 新增下级
    handleAddChild(val) {
      console.log(val)
      // return
      this.form = {}
      this.form.iparent = val.indocno
      this.form.sparent = val.menu_name
      this.form.menu_level = val.menu_level + 1
      this.dialogAddChild = true
      this.formTitle = '添加下级菜单'
    },
    // 添加下一级
    //  问题---------------------- 按下回车后刷新页面
    handleFormChild() {
      post('/sysMenu/insert', {
        sysMenu: this.form
      }).then(res => {
        this.dialogAddChild = false
        this.form = {}
        this.findAll()
        if (res) {
          this.$message({
            type: 'success',
            message: '添加下一级成功'
          })
        }
      })
    },
    async handleFormSave() {
      if (this.formFlag) {
        this.form.menu_level = 1
        this.form.iparent = 0
        let res = await post('/sysMenu/insert', {
          sysMenu: this.form
        })
        if (res) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        }
      } else {
        let res = await post('/sysMenu/update', {
          sysMenu: this.form
        })
        if (res) {
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
        }
      }
      this.formInfodialogVisible = false // 弹窗
      this.dialogAddChild = false // 弹窗
      this.dialogChage = false // 弹窗
      this.form = {}
      this.findAll()
    },
    // 删除按钮
    handleDelectOut(val) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('/sysMenu/deleteOne', { indocno: val.indocno }).then(res => {
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
    dialogClose() {
      this.formInfodialogVisible = false // 弹窗
      this.dialogAddChild = false // 弹窗
      this.dialogChage = false // 弹窗
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
