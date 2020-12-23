<!--
 * @Author: 何
 * @Date: 2020-09-01
 * @LastEditTime: 2020-12-09 20:37:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\inforConTrolSys\rollUses\GD005.vue
-->
<template>
  <div>
    <el-row>
      <div class="layout-default-margin">
        <div class="c_table-title"><i class="iconfont icon-biaoti1"/> 未冷却</div>
        <Table-easy
          :table-data="tableData"
          :total="total"
          :table-height="402"
          :current-page="pageIndex"
          :page-size="pageSize"
          index-type="index"
          @handle-current-change="handleCurrentChange"
          @handle-size-change="handleSizeChange">
          <template slot="TableHead">
            <el-row>
              <el-col 
                :xl="20" 
                :sm="19">
                <div :style="searchFlag ? 'height: auto;' : 'height: 38px;overflow: hidden' ">
                  <el-form
                    ref="ruleForm"
                    :model="searchInfo"
                    :inline="true"
                    class="search-info">
                    <el-form-item
                      label="冷却开始时间"
                      label-width="100px"
                      prop="cool_starttime">
                      <el-date-picker
                        v-model="searchInfo.cool_starttime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="选择时间"
                        @focus="resetKeyboard"/>
                    </el-form-item>
                    <el-form-item
                      label="冷却结束时间"
                      label-width="100px"
                      prop="cool_endtime">
                      <el-date-picker
                        v-model="searchInfo.cool_endtime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="选择时间"
                        @focus="resetKeyboard"/>
                    </el-form-item>
                    <el-form-item
                      label="辊号"
                      label-width="40px"
                      prop="roll_no">
                      <el-input v-model="searchInfo.roll_no"/>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
              <el-col
                :xl="4" 
                :sm="5">
                <div class="btn">
                  <div class="search-ipad">
                    <i
                      :class="searchFlag ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
                      @click="searchChange"/>
                  </div>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="findAll()">查询
                  </el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="rese()">重置
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </template>
          <template slot="TableBody">
            <el-table-column
              prop="roll_no"
              width="90px"
              label="辊号"/>
            <el-table-column
              prop="roll_type"
              width="100px"
              label="轧辊类型"/>
            <!-- <el-table-column
              prop="offline_time"
              label="下线时间"/>
            <el-table-column
              label="冷却方式"
              prop="cool_type"/>-->
            <el-table-column
              prop="field1"
              label="冷却开始时间"/>
            <el-table-column
              prop="field2"
              label="冷却结束时间"/>
            <el-table-column
              label="操作"
              align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleWait(scope.row)">待上机</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleWork(scope.row)">磨削</el-button>
              </template>
            </el-table-column>
          </template>
        </Table-easy>
      </div>
    </el-row>
    <el-row>
      <div class="layout-default-margin">
        <div class="c_table-title"><i class="iconfont icon-biaoti1"/> 已冷却</div>
        <Table-easy
          :table-data="tableData1"
          :total="total1"
          :table-height="355"
          :current-page="pageIndex1"
          :page-size="pageSize1"
          index-type="index"
          @handle-current-change="handleCurrentChange1"
          @handle-size-change="handleSizeChange1">
          <template slot="TableHead">
            <el-row>
              <el-col 
                :xl="20" 
                :sm="19">
                <div :style="searchFlag1 ? 'height: auto;' : 'height: 38px;overflow: hidden' ">
                  <el-form
                    ref="ruleForm"
                    :inline="true"
                    :model="searchInfo1"
                    class="search-info">
                    <el-form-item
                      label="冷却开始时间"
                      label-width="100px"
                      prop="cool_starttime">
                      <el-date-picker
                        v-model="searchInfo1.cool_starttime"
                        :editable="false"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="选择时间"
                        @focus="resetKeyboard"/>
                    </el-form-item>
                    <el-form-item
                      label="冷却结束时间"
                      label-width="100px"
                      prop="cool_endtime">
                      <el-date-picker
                        v-model="searchInfo1.cool_endtime"
                        :editable="false"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="选择时间"
                        @focus="resetKeyboard"/>
                    </el-form-item>
                    <el-form-item
                      label="辊号"
                      label-width="40px"
                      prop="factory">
                      <el-input v-model="searchInfo1.roll_no"/>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
              <el-col
                :xl="4" 
                :sm="5">
                <div class="btn">
                  <div class="search-ipad">
                    <i
                      :class="searchFlag1 ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
                      @click="searchChange1"/>
                  </div>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="findAll_1()">查询
                  </el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="rese1()">重置
                  </el-button>
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
            <!-- <el-table-column
              prop="offline_time"
              label="下线时间"/>
            <el-table-column
              label="冷却方式"
              prop="cool_type"/>-->
            <el-table-column
              prop="field1"
              label="冷却开始时间"/>
            <el-table-column
              prop="field2"
              label="冷却结束时间"/>
          </template>
        </Table-easy>
      </div>
    </el-row>
    <!-- 添加 -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="添加"
      class="layout-dialog"
      width="60%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlign"
          label-width="100px">
          <el-row>
            <el-col :span="12">

              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input v-model="formLabelAlign.roll_no" />
              </el-form-item>
              <el-form-item
                label="生产厂家"
                prop="factory">
                <el-input v-model="formLabelAlign.factory" />
              </el-form-item>
              <el-form-item
                label="材质"
                prop="material">
                <el-input v-model="formLabelAlign.material" />
              </el-form-item>

              <el-form-item
                label="轧辊类型"
                prop="roll_type">
                <el-input v-model="formLabelAlign.roll_type" />
              </el-form-item>
              <el-form-item
                label="下线时间"
                prop="offline_time">
                <el-input v-model="formLabelAlign.offline_time" />
              </el-form-item>
              <el-form-item
                label="冷却方式"
                prop="cool_type">
                <el-input v-model="formLabelAlign.cool_type" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="冷却开始时间"
                prop="cool_starttime">
                <el-input v-model="formLabelAlign.cool_starttime" />
              </el-form-item>
              <el-form-item
                label="冷却结束时间"
                prop="cool_endtime">
                <el-input v-model="formLabelAlign.cool_endtime" />
              </el-form-item>
              <el-form-item
                label="操作人姓名"
                prop="operat_user">
                <el-input v-model="formLabelAlign.operat_user" />
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
    <!-- 编辑弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible1"
      title="编辑"
      class="layout-dialog"
      width="60%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlign1"
          label-width="100px">
          <el-row>
            <el-col :span="12">

              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input v-model="formLabelAlign1.roll_no" />
              </el-form-item>
              <el-form-item
                label="生产厂家"
                prop="factory">
                <el-input v-model="formLabelAlign1.factory" />
              </el-form-item>
              <el-form-item
                label="材质"
                prop="material">
                <el-input v-model="formLabelAlign1.material" />
              </el-form-item>

              <el-form-item
                label="轧辊类型"
                prop="roll_type">
                <el-input v-model="formLabelAlign1.roll_type" />
              </el-form-item>
              <el-form-item
                label="下线时间"
                prop="offline_time">
                <el-input v-model="formLabelAlign1.offline_time" />
              </el-form-item>
              <el-form-item
                label="冷却方式"
                prop="cool_type">
                <el-input v-model="formLabelAlign1.cool_type" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="冷却开始时间"
                prop="cool_starttime">
                <el-input v-model="formLabelAlign1.cool_starttime" />
              </el-form-item>
              <el-form-item
                label="冷却结束时间"
                prop="cool_endtime">
                <el-input v-model="formLabelAlign1.cool_endtime" />
              </el-form-item>
              <el-form-item
                label="操作人姓名"
                prop="operat_user">
                <el-input v-model="formLabelAlign1.operat_user" />
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
          @click="dialogVisible1 = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleEdit_save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import { get, post } from '@/lib/Util'
export default {
  components: {
    TableEasy
  },
  data() {
    return {
      tableData: [],
      total: 0,
      tableData1: [],
      total1: 0,
      pageIndex: 1,
      pageIndex1: 1,
      pageSize: 10,
      pageSize1: 10,
      searchInfo1: {
        ifinish: 1
      },
      options: [],
      searchInfo: {
        ifinish: 0
      },
      formLabelAlign: {
        ifinish: 0
      },
      formLabelAlign1: {},
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      searchFlag: false, // 在ipad显示
      searchFlag1: false
    }
  },
  mounted() {
    this.findAll()
    this.findAll_1()
  },
  methods: {
    // 用于控制收缩查询条件
    handleWait(data) {
      this.$confirm('状态将改为待上机, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('/rollCoolorder/updatestate', {
            indocno: data.indocno,
            ifinish: '1'
          })
          post('/rollInformation/updaterevoleve', {
            roll_no: data.roll_no,
            roll_revolve: '4'
          }).then(res => {
            if (res.status == 2000) {
              this.$message({
                type: 'success',
                message: '状态更改成功!'
              })
              this.findAll()
            } else {
              this.$message('状态更改失败')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消状态更改'
          })
        })
    },
    handleWork(data) {
      this.$confirm('状态将改为磨削, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('/rollCoolorder/updatestate', {
            indocno: data.indocno,
            ifinish: '1'
          })
          post('/rollInformation/updaterevoleve', {
            roll_no: data.roll_no,
            roll_revolve: '6'
          }).then(res => {
            if (res.status == 2000) {
              this.$message({
                type: 'success',
                message: '状态更改成功!'
              })
              this.findAll()
            } else {
              this.$message('状态更改失败')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消状态更改'
          })
        })
    },
    searchChange() {
      this.searchFlag = !this.searchFlag
    },
    searchChange1() {
      this.searchFlag1 = !this.searchFlag1
    },
    // 取消日期选择器移动端弹出软键盘
    resetKeyboard() {
      document.activeElement.blur()
    },
    rese() {
      this.searchInfo = {}
      this.findAll()
    },
    async findAll() {
      this.searchInfo.ifinish = 0
      let res = await post('rollCoolorder/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      })
      this.tableData = res.data
      this.total = res.count
    },
    //添加
    async handleSave() {
      let res = await post('rollCooling/insert', {
        rollCooling: this.formLabelAlign
      })
      this.dialogVisible = false
      this.findAll()
    },
    handleEdit(data) {
      this.dialogVisible1 = true
      this.formLabelAlign1 = data
    },
    async handleEdit_save() {
      let res = await post('rollCooling/update', {
        rollCooling: this.formLabelAlign1
      })
      this.dialogVisible1 = false
      this.findAll()
    },
    handleDelect(data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('rollCooling/deleteOne', { indocno: data.indocno }).then(res => {
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
    //分页之对应页
    handleCurrentChange1(val) {
      this.pageIndex1 = val
      this.findAll_1()
    },
    //分页之一页多少条
    handleSizeChange1(val) {
      this.pageSize1 = val
      this.findAll_1()
    },
    async findAll_1() {
      this.searchInfo1.ifinish = 1
      let res = await post('rollCoolorder/findByPage', {
        pageIndex: this.pageIndex1,
        pageSize: this.pageSize,
        condition: this.searchInfo1
      })
      console.log('查询全部', res)
      this.tableData1 = res.data
      this.total1 = res.count
    },
    rese1() {
      this.searchInfo1 = {}
      this.findAll_1()
    }
  }
}
</script>

<style>
</style>
