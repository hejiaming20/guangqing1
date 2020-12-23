<!--
 * @Author: lcx
 * @Date: 2020-08-28 14:15:22
 * @LastEditTime: 2020-12-08 09:37:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\inforConTrolSys\Bearmanagement\CS002.vue
-->
<template>
  <div>
    <table-easy
      :table-data="tableData"
      :total="total"
      :table-height="'calc(100vh - 195px)'"
      :page-size="pageSize"
      :current-page="pageIndex"
      index-type="index">
      <template slot="TableHead">
        <el-row>
          <el-col :span="20">
            <el-form
              ref="ruleForm"
              :model="searchInfo"
              class="search-info"
              label-width="80px">
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="服务名称"
                    prop="service_name">
                    <el-input v-model="searchInfo.service_name" />
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
          prop="service_name"
          label="服务名称"/>
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
      width="80%">
      <div class="layout-search">
        <el-form
          ref="formInfo"
          :model="form"
          :rules="rules"
          label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="服务名称"
                prop="service_name">
                <el-input v-model="form.service_name" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="方法地址"
                prop="method_url">
                <el-input v-model="form.method_url" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="关联实体"
                prop="order_entity">
                <el-input v-model="form.order_entity" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table
        ref="leftMultipleTable"
        :data="leftTable"
        :height="330">
        <el-table-column 
          :index="formatterTableDataIndex" 
          type="index" 
          align="center"
          width="60"/>
        <el-table-column
          prop="order_name"
          label="工单名称"/>
        <el-table-column
          prop="order_no"
          label="工单编码"/>
        <el-table-column
          prop="roll_type"
          label="轧辊类型"/>
        <el-table-column
          prop="production_line"
          label="产线"/>
        <el-table-column
          prop="frame_no"
          label="机架"/>
        <el-table-column
          prop="material"
          label="材质"/>
        <el-table-column
          prop="factory"
          label="厂商"/>
        <el-table-column
          prop="framerange"
          label="机架范围"/>
        <el-table-column
          prop="install_location"
          label="安装位置"/>
        <el-table-column
          prop="up_location"
          label="上机位置"/>
        <el-table-column
          v-if="show"
          prop="production_line_id"
          label="产线id(隐藏)"/>
        <el-table-column
          v-if="show"
          prop="roll_typeid"
          label="轧辊类型(隐藏)"/>
        <el-table-column
          v-if="show"
          prop="frame_noid"
          label="轧辊类型(隐藏)"/>
      </el-table>
      <div class="pagination-border">
        <el-pagination
          :total="editInfo.total"
          small
          background
          class="u-pagination"
          align="center"
          layout="total, prev, pager, next"
          @current-change="handleCurrentEditChange"/>
      </div>

      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          size="small"
          @click="resetFormSave">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleFormSave('formInfo')">确 定</el-button>
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
      show: false,
      tableData: [],
      leftTable: [],
      rightTable: [],
      rightTotal: 0,
      leftMultipleSelection: [],
      rightMultipleSelection: [],
      total: 0,
      pageIndex: 1,
      pageSize: 30,
      searchInfo: {}, // 查询条件
      form: {},
      formFlag: true, // true 添加 false 编辑
      formTitle: '',
      formInfodialogVisible: false, // 弹窗
      rules: {
        service_name: [
          { required: true, message: '请输入服务名称', trigger: 'blur' }
        ],
        method_url: [
          { required: true, message: '请输入方法地址', trigger: 'blur' }
        ],
        order_entity: [
          { required: true, message: '请输入关联实体', trigger: 'blur' }
        ]
      },
      saveVar: [],
      editInfo: {
        id: '',
        total: 0,
        pageIndex: 1,
        pageSize: 30
      }
    }
  },
  mounted() {
    this.findAll()
  },
  methods: {
    handleSearchClick() {
      this.pageIndex = 1
      this.findAll()
    },
    // 查询全部
    async findAll() {
      let res = await post('/orderService/findByPage', {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        condition: this.searchInfo
      })
      if (res.status === 2000) {
        this.tableData = res.data
        this.total = res.count
      } else {
        this.tableData = []
        this.total = 0
      }
    },
    // 弹窗右侧查询事件
    dialogSearchClick() {
      this.findAll()
    },
    // 打开添加弹窗
    handleAddClick() {
      this.formInfodialogVisible = true
      this.form = {}
      // this.$refs.rightMultipleTable.clearSelection()
      // this.$refs.leftMultipleTable.clearSelection()
      this.formTitle = '添加工单服务'
      this.leftTable = []
      this.formFlag = true
    },
    // 修改按钮
    handleEdit(val) {
      this.form = Object.assign({}, val)
      this.editInfo.id = this.form.indocno
      this.findEditInfo()
      // this.leftTable = this.form.detail 修改参数
      this.formInfodialogVisible = true
      this.formTitle = '编辑工单服务'
      this.saveVar = []
      this.formFlag = false
    },
    // 查看子信息
    async findEditInfo() {
      let res = await post('orderServiceDetail/findByPage', {
        condition: { ilinkno: this.editInfo.id },
        pageIndex: this.editInfo.pageIndex,
        pageSize: this.editInfo.pageSize
      })
      console.log('打印字标信息', res.count)
      if (res.status == 2000) {
        this.leftTable = res.data
        this.editInfo.total = res.count
      } else {
        this.leftTable = []
      }
    },
    formatterTableDataIndex(index) {
      var pageIndex = 0
      if (this.editInfo.pageSize || this.editInfo.pageIndex) {
        var pageIndex =
          (this.editInfo.pageIndex - 1) * this.editInfo.pageSize + index + 1
      } else {
        pageIndex = index + 1
      }
      return pageIndex
    },
    handleCurrentEditChange(val) {
      this.editInfo.pageIndex = val
      this.findEditInfo()
    },
    // 保存添加/修改事件
    handleFormSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.onsubmit()
        } else {
          return false
        }
      })
    },
    async onsubmit() {
      console.log('打印this.leftMultipleSelection', this.saveVar)
      if (this.formFlag) {
        let res = await post('orderService/insert', {
          // order_id = this.indocno
          orderService: {
            service_name: this.form.service_name,
            method_url: this.form.method_url,
            order_entity: this.form.order_entity,
            detail: this.leftTable
          }
        })
        if (res.status === 2000) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.findAll()
        } else {
          this.$message('添加失败')
        }
      } else {
        let data = []
        data = data.concat(this.saveVar, this.leftTable)
        let res = await post('orderService/update', {
          orderService: {
            service_name: this.form.service_name,
            method_url: this.form.method_url,
            order_entity: this.form.order_entity,
            indocno: this.form.indocno,
            detail: data
          }
        })
        if (res.status === 2000) {
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
          this.findAll()
        } else {
          this.$message('编辑失败')
        }
      }
      this.formInfodialogVisible = false
      this.form = {}
    },
    // 删除按钮
    handleDelectOut(val) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('orderService/deleteOne', { indocno: val.indocno }).then(res => {
            if (res.status === 2000) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.findAll()
            } else {
              this.$message('删除失败')
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
      // this.$refs[formName].resetFields()
      this.handleSearchClick()
    },
    // 取消弹窗
    resetFormSave() {
      this.formInfodialogVisible = false
      this.form = {}
    },
    handleLeftSelectionChange(val) {
      this.leftMultipleSelection = val
      // this.form.order_id = val.frame_noid // 作废
    },
    handleRightSelectionChange(val) {
      this.rightMultipleSelection = val
    },
    // 添加按钮
    handleAddOrders() {
      this.rightMultipleSelection.map(v => {
        v.order_id = v.indocno
        delete v.indocno
      })
      this.leftTable = this.leftTable.concat(this.rightMultipleSelection)
      this.$refs.rightMultipleTable.clearSelection()
    }
  }
}
</script>

<style scoped>
</style>
