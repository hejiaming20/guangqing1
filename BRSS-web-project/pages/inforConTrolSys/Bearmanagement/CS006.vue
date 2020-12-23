<!--
 * @Author: ming
 * @Date: 2020-08-17
 * @LastEditTime: 2020-10-31 11:21:52
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\inforConTrolSys/Bearmanagement/CS006
-->

<template>
  <div>
    <div>
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
                :model="searchInfo"
                label-width="100px">
                <el-form-item
                  label="部件编号"
                  prop="spare_parts_no">
                  <el-input v-model="searchInfo.spare_parts_no" />
                </el-form-item>
                <el-form-item
                  label="部件类型"
                  prop="spare_parts_type_id">
                  <!--<el-input v-model="searchInfo.spare_parts_type_id" />-->
                  <el-select
                    v-model="searchInfo.spare_parts_type_id"
                    placeholder="请选择">
                    <el-option
                      v-for="item in sparePartsTypeArray"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="轴承座编号"
                  prop="chock_no">
                  <el-input v-model="searchInfo.chock_no" />
                </el-form-item>
                <!--<el-form-item
                  label="报废原因"
                  prop="chock_no">
                  <el-input v-model="searchInfo.chock_no" />
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
                  @click="addData(),dialogVisible = true">添加</el-button>
              </div>
            </el-col>
          </el-row>
        </template>
        <template slot="TableBody">
          <el-table-column
            prop="spare_parts_no"
            align="center"
            label="部件编号"/>
          <el-table-column
            prop="spare_parts_typ"
            align="center"
            label="部件类型"/>
          <el-table-column
            prop="chock_no"
            align="center"
            label="轴承座编号"/>
          <el-table-column
            prop="roll_no"
            align="center"
            label="辊号"/>
          <el-table-column
            prop="results"
            align="center"
            label="处理结果"/>
          <el-table-column
            prop="scrap_time"
            align="center"
            min-width="150px"
            label="处理时间"/>
          <el-table-column
            prop="scrap_reason"
            align="center"
            label="处理原因"/>
          <!--  <el-table-column
            prop="scrap_p"
            label="报废人员"/>-->
          <el-table-column
            prop="snote"
            align="center"
            label="备注"/>
          <el-table-column
            label="操作"
            min-width="200"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="warning"
                @click="handleEdit(scope.row)">修改</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </template>
      </Table-easy>
    </div>
    <!-- 添加弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="添加"
      class="layout-dialog"
      width="75%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :rules="rules"
          :model="formLabelAlign"
          label-width="120px">
          <el-row>
            <el-col :span="6">
              <el-form-item
                label="部件编号"
                prop="spare_parts_no"
                style="margin-bottom: 18px" >
                <el-input v-model="formLabelAlign.spare_parts_no" />
              </el-form-item>
              <!--     <el-form-item
                label="部件类型id"
                prop="spare_parts_type_id">
                <el-input v-model="formLabelAlign.spare_parts_type_id" />
              </el-form-item>-->
              <el-form-item
                label="部件类型"
                prop="spare_parts_type_id"
                style="margin-bottom: 18px" >
                <el-select
                  v-model="formLabelAlign.spare_parts_type_id"
                  placeholder="请选择"
                  @change="handPartsTypeChange">
                  <el-option
                    v-for="item in sparePartsTypeArray"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>

              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="轴承座编号"
                prop="chock_no"
                style="margin-bottom: 18px" >
                <el-input v-model="formLabelAlign.chock_no" />
              </el-form-item>
              <el-form-item
                label="辊号"
                prop="roll_no"
                style="margin-bottom: 18px" >
                <el-input v-model="formLabelAlign.roll_no" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="处理原因"
                prop="scrap_reason"
                style="margin-bottom: 18px" >
                <el-input v-model="formLabelAlign.scrap_reason" />
              </el-form-item>
              <el-form-item
                label="处理时间"
                prop="scrap_time"
                style="margin-bottom: 18px" >
                <!-- <el-input v-model="formLabelAlign.scrap_time" />-->
                <el-date-picker
                  v-model="formLabelAlign.scrap_time"
                  value-format="yyyy-MM-dd HH"
                  type="datetime"
                  placeholder="处理时间"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <!--<el-form-item
                label="报废人员"
                prop="scrap_p">
                <el-input v-model="formLabelAlign.scrap_p" />
              </el-form-item>-->
              <el-form-item
                label="处理结果"
                prop="results"
                style="margin-bottom: 18px" >
                <el-select
                  v-model="formLabelAlign.results"
                  placeholder="请选择">
                  <el-option
                    v-for="item in resultsArray"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>

            </el-col>
          </el-row>
          <el-form-item
            label="备注"
            prop="snote"
            style="width: 96%;">
            <el-input
              v-model="formLabelAlign.snote"
              type="textarea" />
          </el-form-item>
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

    <!-- 修改弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible1"
      title="修改"
      class="layout-dialog"
      width="80%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlign1"
          label-width="120px">
          <el-row>
            <el-col :span="6">
              <el-form-item
                label="部件编号"
                prop="spare_parts_no">
                <el-input v-model="formLabelAlign1.spare_parts_no" />
              </el-form-item>
              <el-form-item
                label="部件类型"
                prop="spare_parts_typ_id">
                <!-- <el-input v-model="formLabelAlign1.spare_parts_type" />-->
                <el-select
                  v-model="formLabelAlign1.spare_parts_type_id"
                  placeholder="请选择"
                  @change="handPartsTypeChange1">
                  <el-option
                    v-for="item in sparePartsTypeArray"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>

            </el-col>
            <el-col :span="6">
              <el-form-item
                label="轴承座编号"
                prop="chock_no">
                <el-input v-model="formLabelAlign1.chock_no" />
              </el-form-item>
              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input v-model="formLabelAlign1.roll_no" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="处理时间"
                prop="scrap_time">
                <!-- <el-input v-model="formLabelAlign1.scrap_time" />-->
                <el-date-picker
                  v-model="formLabelAlign1.scrap_time"
                  value-format="yyyy-MM-dd HH"
                  type="datetime"
                  placeholder="处理时间"/>
              </el-form-item>
              <el-form-item
                label="处理原因"
                prop="scrap_reason">
                <el-input v-model="formLabelAlign1.scrap_reason" />
              </el-form-item>
              <!--  <el-form-item
                label="报废人员"
                prop="scrap_p">
                <el-input v-model="formLabelAlign1.scrap_p" />
              </el-form-item>-->

            </el-col>
            <el-col :span="6">
              <el-form-item
                label="处理结果"
                prop="results">
                <!--   <el-input v-model="formLabelAlign1.scrap_reason" />-->
                <el-select
                  v-model="formLabelAlign1.results"
                  placeholder="请选择">
                  <el-option
                    v-for="item in resultsArray"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            label="备注"
            prop="snote"
            style="width: 95%;">
            <el-input
              v-model="formLabelAlign1.snote"
              type="textarea"/>
          </el-form-item>
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
import { get, post } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
export default {
  components: { TableEasy },
  data() {
    return {
      searchInfo: {},
      formLabelAlign: {
        spare_parts_no: '', //部件编号
        spare_parts_type_id: '', //部件类型id
        spare_parts_type: '', //部件类型
        chock_no: '', //轴承座编号
        roll_no: '', //辊号
        scrap_reason: '', //处理原因
        scrap_time: '', //处理时间
        scrap_p_id: '', //报废人员id
        scrap_p: '', //报废人员
        results: '', //处理结果（0 报废 1 修复）
        snote: '' //备注
      },
      formLabelAlign1: {},
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      dialogVisible: false,
      dialogVisible1: false,
      sparePartsTypeArray: [],
      resultsArray: [],
      scrapReasonArray: [],
      rules: {
        spare_parts_no: [
          { required: true, message: '请输入部件编号', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.findAll()
    this.findResults()
    post('/dictionary/findMapV1', { dicno: 'equip_type' }).then(res => {
      this.sparePartsTypeArray = res.data //部件类型
    })
  },
  methods: {
    async findAll() {
      let res = await post('/chockRepairScrap/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      })
      console.log('查询全部', res)
      res.data.forEach((val, index, arr) => {
        val.results = val.results == 1 ? '修复' : val.results == 2 ? '报废' : ''
      })
      this.tableData = res.data
      console.log(this.tableData)
      this.total = res.count
    },
    findResults() {
      post('/dictionary/findMapV1', {
        dicno: 'result'
      }).then(res => {
        this.resultsArray = res.data
        this.scrapReasonArray = res.data
        console.log(this.resultsArray)
      })
    },
    //添加
    addData() {
      this.formLabelAlign = {}
    },
    handPartsTypeChange() {
      this.sparePartsTypeArray.forEach(item => {
        if (item.key == this.formLabelAlign.spare_parts_type_id) {
          this.formLabelAlign.spare_parts_type = item.value
        }
      })
    },
    handPartsTypeChange1() {
      this.sparePartsTypeArray.forEach(item => {
        if (item.key == this.formLabelAlign.spare_parts_type_id) {
          this.formLabelAlign1.spare_parts_type = item.value
        }
      })
    },
    //添加
    handleSave(formName) {
      // this.formLabelAlign
      //  this.dialogVisible = false
      this.$refs[formName].validate(valid => {
        if (valid) {
          post('/chockRepairScrap/insert', {
            chockRepairScrap: this.formLabelAlign
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '保存成功!'
              })
              this.dialogVisible = false
              this.findAll()
            }
          })
        } else {
          alert('请按照要求输入')
        }
      })
    },

    // 修改数据按钮
    handleEdit(data) {
      this.dialogVisible1 = true
      this.formLabelAlign1 = data
    },
    async handleEdit_save() {
      let res = await post('/chockRepairScrap/update', {
        chockRepairScrap: this.formLabelAlign1
      }).then(res => {
        if (res) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.dialogVisible1 = false
          this.findAll()
        }
      })
    },
    handleDelete(data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('/chockRepairScrap/deleteOne', { indocno: data.indocno }).then(
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

    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    },

    /**
     * description: 重置按钮
     */
    resetForm(formName) {
      this.searchInfo = {}
      this.findAll()
      // console.log('重置', formName)
      // this.$refs[formName].resetFields()
      // console.log('重置', this.$refs[formName])
    },
    /**
     * description: 编辑数据函数
     */
    edit(formName) {
      // 编辑
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 编辑
          post('chockRepairScrap/update', {
            chockRepairScrap: this.formLabelAlign
          }).then(res => {
            if (res) {
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
