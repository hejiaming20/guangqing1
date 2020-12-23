<!--
 * @Author: lcx
 * @Date: 2020-08-28 14:15:22
 * @LastEditTime: 2020-10-31 11:19:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\inforConTrolSys\Bearmanagement\CS002.vue
-->
<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :page-size="pageSize"
      :current-page="pageIndex"
      :table-height="'calc(100vh - 220px)'"
      index-type="index"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <template slot="TableHead">
        <el-row :gutter="10">
          <el-col :span="20">
            <el-form
              ref="ruleForm"
              :inline="true"
              :model="searchInfo"
              label-width="70px">
              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input v-model="searchInfo.roll_no" />
              </el-form-item>
              <el-form-item
                label="产线"
                prop="production_line">
                <el-select
                  v-model="searchInfo.production_line"
                  placeholder="请选择">
                  <el-option
                    v-for="item in prolineArray"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="轧辊类型"
                prop="roll_type">
                <el-select
                  v-model="searchInfo.roll_typeid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in rollTypeArray"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="机架号"
                prop="frame_no">
                <el-select
                  v-model="searchInfo.frame_noid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in frameteamArray"
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
          prop="roll_no"
          align="center"
          label="辊号"/>
        <el-table-column
          prop="roll_type"
          align="center"
          label="轧辊类型"/>
        <el-table-column
          prop="frame_no"
          align="center"
          label="机架号"/>
        <el-table-column
          prop="install_location"
          align="center"
          label="安装位置"/>
        <el-table-column
          prop="up_location"
          align="center"
          label="上机位置"/>
        <el-table-column
          prop="os_no"
          align="center"
          label="OS侧座号"/>
        <el-table-column
          prop="ds_no"
          align="center"
          label="DS侧座号"/>
        <el-table-column
          label="操作"
          min-width="250"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleDelect(scope.row)">拆卸</el-button>
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
    </Table-easy>

    <!-- 添加/编辑弹窗 -->
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
            label="辊号"
            prop="roll_no">
            <el-input v-model="form.roll_no" />
          </el-form-item>
          <el-form-item
            label="轧辊类型"
            prop="roll_typeid">
            <el-select
              v-model="form.roll_typeid"
              placeholder="请选择"
              @change="handleRollTypeChange">
              <el-option
                v-for="item in rollTypeArray"
                :key="item.key"
                :label="item.value"
                :value="Number(item.key)"/>
            </el-select>
          </el-form-item>
          <el-form-item
            label="机架号"
            prop="frame_noid">
            <el-select
              v-model="form.frame_noid"
              placeholder="请选择"
              @change="handleFrameChange">
              <el-option
                v-for="item in frameteamArray"
                :key="item.key"
                :label="item.value"
                :value="Number(item.key)"/>
            </el-select>
          </el-form-item>
          <!-- <el-form-item
            label="安装位置"
            prop="install_location_id ">
            <el-select
              v-model="form.install_location_id"
              placeholder="请选择"
              @change="handleInstallChange">
              <el-option
                v-for="item in installlocationArray"
                :key="item.key"
                :label="item.value"
                :value="Number(item.key)"/>
            </el-select>
          </el-form-item>-->
          <el-form-item
            label="上机位置"
            prop="up_location_id">
            <el-select
              v-model="form.up_location_id"
              placeholder="请选择"
              @change="handleUpChange">
              <el-option
                v-for="item in uplocationArray"
                :key="item.key"
                :label="item.value"
                :value="Number(item.key)"/>
            </el-select>
          </el-form-item>
          <el-form-item
            label="OS侧座号"
            prop="os_no">
            <el-input v-model="form.os_no" />
          </el-form-item>
          <el-form-item
            label="DS侧座号"
            prop="ds_no">
            <el-input v-model="form.ds_no" />
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
  </div>
</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import { get, post, getDataConfig } from '@/lib/Util'
export default {
  name: 'CS002',
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
      prolineArray: [], // 产线
      rollTypeArray: [], // 轧辊类型
      frameteamArray: [], // 机架号
      installlocationArray: [], // 安装位置
      uplocationArray: [] // 上机位置
    }
  },
  mounted() {
    this.findAll()
    getDataConfig('proline').then(res => {
      this.prolineArray = res
    })
    getDataConfig('rolltype').then(res => {
      this.rollTypeArray = res
    })
    getDataConfig('frameteam').then(res => {
      this.frameteamArray = res
    })
    getDataConfig('installlocation').then(res => {
      this.installlocationArray = res
    })
    getDataConfig('uplocation').then(res => {
      this.uplocationArray = res
    })
  },
  methods: {
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
    handleSearchClick() {
      this.pageIndex = 1
      this.findAll()
    },
    handleRollTypeChange() {
      this.rollTypeArray.forEach(item => {
        if (item.key == this.form.roll_typeid) {
          this.form.roll_type = item.value
        }
      })
    },
    handleFrameChange() {
      this.frameteamArray.forEach(item => {
        if (item.key == this.form.frame_noid) {
          this.form.frame_no = item.value
        }
      })
    },
    handleInstallChange() {
      this.installlocationArray.forEach(item => {
        if (item.key == this.form.install_location_id) {
          this.form.install_location = item.value
        }
      })
    },
    handleUpChange() {
      this.uplocationArray.forEach(item => {
        if (item.key == this.form.up_location_id) {
          this.form.up_location = item.value
        }
      })
    },
    // 查询全部
    async findAll() {
      let res = await post('/chockDismounting/findByPage', {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        condition: this.searchInfo
      })
      this.tableData = res.data
      this.total = res.count
    },
    // 打开添加弹窗
    handleAddClick() {
      this.formInfodialogVisible = true
      this.formTitle = '添加轴承座拆装信息'
      this.form = {}
      this.formFlag = true
    },
    // 更改按钮
    handleEdit(val) {
      this.form = Object.assign({}, val)
      this.formInfodialogVisible = true
      this.formTitle = '编辑轴承座拆装信息'
      this.formFlag = false
    },
    // 添加/编辑弹窗
    async handleFormSave() {
      if (this.formFlag) {
        let res = await post('/chockDismounting/insert', {
          chockDismounting: this.form
        })
        if (res) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        }
      } else {
        let res = await post('/chockDismounting/update', {
          chockDismounting: this.form
        })
        if (res) {
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
        }
      }
      this.formInfodialogVisible = false
      this.form = {}
      this.findAll()
    },
    // 删除按钮
    handleDelectOut(val) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('/chockDismounting/deleteOne', { indocno: val.indocno }).then(
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
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 拆卸按钮
    handleDelect(val) {
      let data = Object.assign({}, val)
      data.os_no = ''
      data.ds_no = ''
      this.$confirm('是否拆卸轧辊?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('/chockDismounting/update', { chockDismounting: data }).then(
            res => {
              if (res) {
                this.$message({
                  type: 'success',
                  message: '拆卸成功'
                })
              }
              this.findAll()
            }
          )
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    // 重置按钮
    resetForm(formName) {
      this.searchInfo = {}
      // this.$refs[formName].resetFields()
      this.findAll()
    }
  }
}
</script>

<style scoped>
</style>
