<!--
 * @Author: lcx + java duan
 * @Date: 2020-07-23 09:57:34
 * @LastEditTime: 2020-11-11 14:41:54
 * @LastEditors: Please set LastEditors
 * @Description: 辅材仓库管理页面
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\am.vue
-->
<template>
  <div>
    <div class="layout-default-margin">
      <Table-easy
        :table-data="tableData"
        :page-size="pageSize"
        :total="total"
        table-height="calc(100vh - 230px)"
        @handle-current-change="handleCurrentChange"
        @handle-size-change="handleSizeChange">
        <template slot="TableHead">
          <el-row :gutter="10">
            <el-col :span="20">
              <el-form
                ref="ruleForm"
                :model="searchInfo"
                :inline="true"
                label-width="80px">
                <el-form-item
                  label="机架范围"
                  prop="framerangeid">
                  <el-select
                    v-model="searchInfo.framerangeid"
                    placeholder="请选择">
                    <el-option
                      v-for="item in frameArray"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="轧辊类型"
                  prop="roll_typeid">
                  <el-select
                    v-model="searchInfo.roll_typeid"
                    placeholder="请选择">
                    <el-option
                      v-for="item in options"
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
                      v-for="item in lineArray"
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
                  @click="handleAdd">新增</el-button>
              </div>
            </el-col>
          </el-row>
        </template>
        <template slot="TableBody">
          <el-table-column
            prop="production_line"
            label="产线"/>
          <el-table-column
            prop="chock_no"
            label="轴承座号"/>
          <el-table-column
            prop="roll_type"
            label="轧辊类型"/>
          <el-table-column
            prop="framerange"
            label="机架范围"/>
          <el-table-column
            prop="lockreason"
            label="封锁原因"/>
          <el-table-column
            prop="locktime"
            label="封锁时间"/>
          <el-table-column
            prop="operatename"
            label="操作人员"/>
          <el-table-column
            label="操作"
            min-width="240px"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="open_1(scope.row)">处理</el-button>
              <el-button
                size="mini"
                type="warning"
                @click="qulity(scope.row)">质量异议</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleBf(scope.row)">报废</el-button>
            </template>
          </el-table-column>
        </template>
      </Table-easy>
    </div>

    <!--新增数据-->
    <el-dialog
      :visible.sync="diaInsertVisible1"
      title="新增辊数据"
      class="layout-dialog"
      width="60%">
      <div class="layout-search">
        <el-form
          ref="submitForm"
          :model="sendForm"
          :rules="rules"
          class="dialoy-form"
          label-width="90px">
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="轴承座号:"
                prop="chock_no">
                <el-input v-model="sendForm.chock_no" />
              </el-form-item>
              <el-form-item
                label="机架范围"
                prop="framerangeid">
                <el-select
                  v-model="sendForm.framerangeid"
                  placeholder="请选择"
                  @change="handleFrameChange">
                  <el-option
                    v-for="item in frameArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="轧辊类型"
                prop="roll_typeid">
                <el-select
                  v-model="sendForm.roll_typeid"
                  placeholder="请选择"
                  @change="handleRollStateChange">
                  <el-option
                    v-for="item in options"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="操作时间:"
                prop="operatetime">
                <el-date-picker
                  v-model="sendForm.operatetime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="产线"
                prop="production_line_id">
                <el-select
                  v-model="sendForm.production_line_id"
                  placeholder="请选择"
                  @change="handleProductionLineChange">
                  <el-option
                    v-for="item in lineArray"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="封锁时间:"
                prop="locktime">
                <el-date-picker
                  v-model="sendForm.locktime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"/>
              </el-form-item>
              <el-form-item
                label="操作人:"
                prop="operatename">
                <el-input v-model="sendForm.operatename" />
              </el-form-item>
              <el-form-item
                v-show="false"
                label="操作人id:"
                prop="operateid">
                <el-input v-model="sendForm.operateid" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            label="封锁原因:"
            prop="lockreason">
            <el-input 
              v-model="sendForm.lockreason" 
              type="textarea" />
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="mini"
          type="primary"
          @click="handleSubmit">提 交</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleReset('submitForm')">取 消</el-button>
      </span>
    </el-dialog>
    
    <!--处理弹窗-->
    <el-dialog
      :visible.sync="dialogs"
      title="处理方法"
      class="layout-dialog"
      width="30%">
      <div
        class="layout-search"
        style="text-align: center">
        <el-button
          size="mini"
          type="primary"
          @click="unlock(searchInfo_data)">解锁</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="flawDetection(searchInfo_data)">送外修复</el-button>
          <!-- <el-button
          size="mini"
          type="primary"
          @click="openSeat(searchInfo_data)">开座</el-button>
        <el-button
          size="small"
          type="primary"
          @click="unOpenSeat(searchInfo_data)">不开座</el-button> -->
      </div>
    </el-dialog>
  </div>

</template>

<script>
import moment from 'moment'
import TableEasy from '@/components/TasilyTableEasy'
import { rollInformation, rolltypelist } from '@/api/pinClipBoard' //查询接口 rollInformation,
import { get, post, getDataConfig } from '@/lib/Util'

export default {
  components: {
    TableEasy
  },
  data() {
    return {
      searchInfo: {},
      ro: {},
      tableData: [],
      lineArray: [], // 产线下拉框数据
      sendForm: {}, // 添加表单
      tableDatan_0: [],
      tableDatan_click: [],
      options: [],
      rules: {
        chock_no: [
          { required: true, message: '请输入轴承座号', trigger: 'blur' }
        ],
        framerangeid: [
          { required: true, message: '请输入机架范围', trigger: 'change' }
        ],
        roll_typeid: [
          { required: true, message: '请输入轧辊类型', trigger: 'change' }
        ],
        production_line_id: [
          { required: true, message: '请输入产线', trigger: 'change' }
        ]
      },
      dialogVisible: false,
      diaInsertVisible1: false,
      diaInsertVisible2: false,
      isIndeterminate: true,
      dialogs: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      total_1: 0,
      totalB: 0,
      leftPageIndex: 1,
      leftPageSize: 10,
      rightPageIndex: 1,
      rightPageSize: 10,
      frameArray: [] // 机架范围
    }
  },
  mounted() {
    this.findAll() // 查询全部数据
    this.findOption() // 查询配置
  },
  methods: {
    open_1(data) {
      this.dialogs = true
      this.searchInfo_data = data
    },
    //.送外修复
    flawDetection(data) {
      this.$confirm('要送外修复该行, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // data.roll_state = 0
          data.iblockade = 1
          data.unlocktime = moment().format('YYYY-MM-DD HH:mm:ss')
          data.operatetime = moment().format('YYYY-MM-DD HH:mm:ss')
          post('/chockAccident/repair', { chockAccident: data }).then(res => {
            if (res.status == 2000) {
              this.$message({
                type: 'success',
                message: '成功!'
              })
              this.dialogs = false
              this.findAll()
            } else {
              this.$message('失败')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    //开座
    openSeat(data) {
      this.$confirm('要开座该行, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          data.roll_state = 0
          post('/rollAccident/pair', { rollAccident: data }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '成功!'
              })
              this.dialogs = false
              this.findAll()
              //this.findAll_1()
            }
          })
          // this.findAll1()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    //不开座
    unOpenSeat(data) {
      this.$confirm('要不开座该行, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          data.roll_state = 0
          post('/rollAccident/gr', { rollAccident: data }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '成功!'
              })
              this.dialogs = false
              this.findAll()
              //this.findAll_1()
            }
          })
          // this.findAll1()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    //质量异议
    qulity(data) {
      this.$confirm('要质量异议该行, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          data.iblockade = 1
          data.unlocktime = moment().format('YYYY-MM-DD HH:mm:ss')
          data.operatetime = moment().format('YYYY-MM-DD HH:mm:ss')
          post('/chockAccident/mass', { chockAccident: data }).then(res => {
            if (res.status == 2000) {
              this.$message({
                type: 'success',
                message: '成功!'
              })
              this.findAll()
            } else {
              this.$message('失败')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    //解锁
    async unlock(data) {
      this.$confirm('要解锁该行, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // data.iblockade = 1
          data.iblockade = 1
          data.unlocktime = moment().format('YYYY-MM-DD HH:mm:ss')
          data.operatetime = moment().format('YYYY-MM-DD HH:mm:ss')
          post('/chockAccident/unlock', { chockAccident: data }).then(res => {
            if (res.status == 2000) {
              this.$message({
                type: 'success',
                message: '解锁成功!'
              })
              this.findAll()
            } else {
              this.$message('失败')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解锁'
          })
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
    //查询接口
    async findAll() {
      this.searchInfo.iblockade = 0
      let res = await post('/chockAccident/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
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
    // 新增事故轴承座
    handleAdd() {
      this.diaInsertVisible1 = true
      this.sendForm = {}
    },

    handleReset(formName) {
      this.$refs[formName].resetFields()
      this.diaInsertVisible1 = false
    },

    handleFrameChange() {
      this.frameArray.forEach(item => {
        if (item.key == this.sendForm.framerangeid) {
          this.sendForm.framerange = item.value
        }
      })
    },
    handleRollStateChange() {
      this.options.forEach(item => {
        if (item.key == this.sendForm.roll_typeid) {
          this.sendForm.roll_type = item.value
        }
      })
    },
    handleProductionLineChange() {
      this.lineArray.forEach(item => {
        if (item.key == this.sendForm.production_line_id) {
          this.sendForm.production_line = item.value
        }
      })
    },

    handleSubmit() {
      this.$refs.submitForm.validate(valid => {
        if (valid) {
          this.sendForm.iblockade = 0
          post('/chockAccident/insert', {
            chockAccident: this.sendForm
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
          this.diaInsertVisible1 = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    //报废：第1个表某行报废，放到第二个表格
    handleBf(data) {
      this.$confirm('要报废该行, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          data.iblockade = 1
          data.unlocktime = moment().format('YYYY-MM-DD HH:mm:ss')
          data.operatetime = moment().format('YYYY-MM-DD HH:mm:ss')
          post('/chockAccident/scrap', { chockAccident: data }).then(res => {
            if (res.status == 2000) {
              this.$message({
                type: 'success',
                message: '报废成功!'
              })
              this.findAll()
            } else {
              this.$message('报废失败')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消报废'
          })
        })
    },
    formatterTableDataIndex(index) {
      var pageIndex = (this.pageIndex - 1) * this.pageSize + index + 1
      return pageIndex
    },
    //-下拉框数据
    findOption() {
      post(rolltypelist, {
        dicno: 'rolltype'
      }).then(res => {
        this.options = res.data
      })
      getDataConfig('proline').then(res => {
        this.lineArray = res
      })
      getDataConfig('framefw').then(res => {
        this.frameArray = res
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.findAll()
    },
    openDialoy(val) {
      this.dialogVisible = true
    },

    //增加
    async handleInsert() {
      var res = await post('/rollAccident/insert', {
        rollAccident: this.searchInfo_1
      }) // 更新完成提示
      this.diaInsertVisible1 = false
      this.findAll()
    },
    //修改
    change(val) {
      this.diaInsertVisible2 = true
      this.xiugai = val
    },
    //修改确定
    async handlechange() {
      var res = await post('rollAccident/update', {
        rollAccident: this.xiugai
      }) // 更新完成提示
      this.diaInsertVisible2 = false
      this.findAll()
    },
    //修改取消
    handlechange_false() {
      this.diaInsertVisible2 = false
      this.findAll()
    },

    //删除
    deel_1(data) {
      this.$confirm('要删除该行, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          data.indocno = 1
          post('/rollAccident/deleteOne', { indocno: data.indocno }).then(
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
          // this.findAll1()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style>
.main-title {
  text-align: center;
  color: #eae8c5;
  padding: 3px 0;
  background-color: #253f80;
}
</style>
