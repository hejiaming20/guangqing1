<!--
 * @Author: lcx
 * @Date: 2020-09-10 18:45:34
 * @LastEditTime: 2020-10-23 18:10:39
 * @LastEditors: Please set LastEditors
 * @Description: 刚度在线评价
 * @FilePath:
-->
<template>
  <div>
    <!--第一个表-->
    <div class="layout-default-margin">
      <Table-easy
        :table-data="tableData"
        :total="total"
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
                label-width="80px">
                <el-row>
                  <el-col :span="5">
                    <el-form-item
                      label="产线"
                      prop="factory">
                      <el-select
                        v-model="searchInfo.production_line_id"
                        placeholder="请选择产线">
                        <el-option
                          v-for="item in lineOptions"
                          :key="item.key"
                          :label="item.value"
                          :value="item.key"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item
                      label="机架号"
                      prop="factory">
                      <el-select
                        v-model="searchInfo.frame_noid"
                        placeholder="请选择机架号">
                        <el-option
                          v-for="item in frameOptions"
                          :key="item.key"
                          :label="item.value"
                          :value="item.key"/>
                      </el-select>
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
                  @click="findAll()">查询</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="resetForm('ruleForm')">重置</el-button>
                <el-button
                  v-show="false"
                  size="mini"
                  type="primary"
                  @click="new_add('ruleForm')">新增</el-button>
              </div>
            </el-col>
          </el-row>
        </template>
        <template slot="TableBody">
          <el-table-column
            prop="production_line"
            label="产线"/>
          <el-table-column
            prop="frame_no"
            label="机架号"/>
          <!-- <el-table-column
            label="轧辊类型"
            prop="roll_type"/> -->
          <el-table-column
            label="操作"
            min-width="60"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="handleClick(scope.row)">查看</el-button>
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

    <!--左右俩个表-->
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="layout-small-title-block">
          <el-row>
            <el-col :span="12"><p>项目信息</p></el-col>
            <el-col :span="12">
              <div class="btn">
                <el-button
                  v-show="false"
                  size="mini"
                  type="primary"
                  @click="handleAddProject()">添加</el-button>
                <el-button
                  v-show="false"
                  size="mini"
                  type="primary"
                  @click="handleSubmitProject()">保存</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <Table-easy
          v-if="ptable"
          :table-data="tableData_01"
          :table-head="false"
          :is-pagination-show="false"
          :table-foot="false"
          @row-click= "scoreRowCLick">
          <template slot="TableBody">
            <el-table-column
              :show-overflow-tooltip="true"
              prop="project_name"
              min-width="120px"
              label="项目名称">
              <template slot-scope="scope">
                <el-input 
                  v-show="scope.row.flag" 
                  v-model="scope.row.project_name"/>
                <span v-show="!scope.row.flag">{{ scope.row.project_name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="weight"
              label="权重">
              <template slot-scope="scope">
                <el-input 
                  v-show="scope.row.flag" 
                  v-model="scope.row.weight"/>
                <span v-show="!scope.row.flag">{{ scope.row.weight }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="standard"
              label="控制标准">
              <template slot-scope="scope">
                <el-input 
                  v-show="scope.row.flag" 
                  v-model="scope.row.standard"/>
                <span v-show="!scope.row.flag">{{ scope.row.standard }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="field_name"
              label="关联字段">
              <template slot-scope="scope">
                <el-input 
                  v-show="scope.row.flag" 
                  v-model="scope.row.field_name"/>
                <span v-show="!scope.row.flag">{{ scope.row.field_name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="100"
              align="center">
              <template slot-scope="scope">
                <span v-show="!scope.row.showPro">
                  <el-button
                    size="mini"
                    type="warning"
                    @click="handleEditProject(scope.row)">修改</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelectProject(scope.row)">删除</el-button>
                </span>
                <span v-if="scope.row.showPro">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEditSubmitProject(scope.row)">确认</el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleResetProject(scope.row)">取消</el-button>
                </span>
              </template>
            </el-table-column>
          </template>
        </Table-easy>
      </el-col>
      <el-col :span="12">
        <div class="layout-small-title-block">
          <el-row>
            <el-col :span="12"><p>得分信息</p></el-col>
            <el-col :span="12">
              <div class="btn">
                <el-button
                  v-show="false"
                  size="mini"
                  type="primary"
                  @click="handleAddScore()">添加</el-button>
                <el-button
                  v-show="false"
                  size="mini"
                  type="primary"
                  @click="handleSubmitScore()">保存</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <Table-easy
          v-if="stable"
          :table-data="tableData_02"
          :table-head="false"
          :is-pagination-show="false"
          :table-foot="false">
          <template slot="TableBody">
            <el-table-column
              prop="min"
              label="最小值">
              <template slot-scope="scope">
                <el-input 
                  v-show="scope.row.flag" 
                  v-model="scope.row.min"/>
                <span v-show="!scope.row.flag">{{ scope.row.min }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="max"
              label="最大值">
              <template slot-scope="scope">
                <el-input 
                  v-show="scope.row.flag" 
                  v-model="scope.row.max"/>
                <span v-show="!scope.row.flag">{{ scope.row.max }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="score"
              label="分值">
              <template slot-scope="scope">
                <el-input 
                  v-show="scope.row.flag" 
                  v-model="scope.row.score"/>
                <span v-show="!scope.row.flag">{{ scope.row.score }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="100"
              align="center">
              <template slot-scope="scope">
                <span v-show="!scope.row.showPro">
                  <el-button
                    size="mini"
                    type="warning"
                    @click="handleEditScore(scope.row)">修改</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelectScore(scope.row)">删除</el-button>
                </span>
                <span v-if="scope.row.showPro">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEditSubmitS(scope.row)">确认</el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleResetS(scope.row)">取消</el-button>
                </span>
              </template>
            </el-table-column>
          </template>
        </Table-easy>
      </el-col>
    </el-row>

    <!-- 编辑/添加 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="title"
      class="layout-dialog"
      width="30%">
      <div class="layout-search">
        <el-form 
          :model="dialogForm" 
          label-width="80px">
          <el-form-item label="产线">
            <el-select 
              v-model="dialogForm.production_line_id"
              placeholder="请选择产线">
              <el-option
                v-for="item in lineOptions"
                :key="item.key"
                :label="item.value"
                :value="item.key"/>
            </el-select>
          </el-form-item>
          <el-form-item label="机架">
            <el-select 
              v-model="dialogForm.frame_noid"
              placeholder="请选择机架">
              <el-option
                v-for="item in frameOptions"
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
          size="mini"
          @click="dialogVisible = false">取 消</el-button>
        <el-button 
          type="primary" 
          size="mini"
          @click="submit">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import { get, post } from '@/lib/Util'
import { type } from 'os'
export default {
  components: {
    TableEasy
  },
  data() {
    return {
      title: '',
      searchInfo: {},
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      options: [],
      tableData_01: [],
      tableData_02: [],
      proID: '',
      scoreID: '',
      pFlag: true,
      sFlag: true,
      ptable: true,
      stable: true,
      rowInfo: {},
      dialogVisible: false,
      dialogForm: {},
      lineOptions: [],
      frameOptions: []
    }
  },
  mounted() {
    this.findAll()
    this.getPlant()
    this.getFrame()
  },
  methods: {
    async getPlant() {
      let res = await post('dictionary/findMapV1', { dicno: 'proline' })
      this.lineOptions = res.data
      for (const item of this.lineOptions) {
        item.key = Number(item.key)
      }
    },
    async getFrame() {
      let res = await post('dictionary/findMapV1', { dicno: 'frameteam' })
      this.frameOptions = res.data
      for (const item of this.frameOptions) {
        item.key = Number(item.key)
      }
    },
    resetForm() {
      this.searchInfo = {}
      this.findAll()
    },
    // 查询所有数据
    async findAll() {
      let res = await post('stiffnessStandard/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      })
      if (res) {
        this.tableData = res.data
        this.total = res.count
      }
      if (this.tableData.length !== 0) {
        this.findAllProject(this.tableData[0].indocno)
        this.proID = this.tableData[0].indocno
      }
    },
    // 主表查看按钮
    handleClick(val) {
      this.proID = val.indocno
      this.findAllProject()
    },
    handleEdit(val) {
      this.title = '编辑'
      this.dialogForm = val
      this.dialogVisible = true
    },
    new_add() {
      this.title = '新增'
      this.dialogForm = {}
      this.dialogVisible = true
    },
    async submit() {
      for (const item of this.lineOptions) {
        if (item.key === this.dialogForm.production_line_id) {
          this.dialogForm.production_line = item.value
        }
      }
      for (const item of this.frameOptions) {
        if (item.key === this.dialogForm.frame_noid) {
          this.dialogForm.frame_no = item.value
        }
      }

      if (this.dialogForm.indocno) {
        let res = await post('stiffnessStandard/update', {
          stiffnessStandard: this.dialogForm
        })
        if (res) {
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
          this.findAll()
        }
      } else {
        let res = await post('stiffnessStandard/insert', {
          stiffnessStandard: this.dialogForm
        })
        if (res) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.findAll()
        }
      }
      this.dialogVisible = false
      this.dialogForm = {}
    },
    // 主表删除按钮
    handleDelete(data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('stiffnessStandard/deleteOne', { indocno: data.indocno }).then(
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
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    },
    // 查询字表项目
    async findAllProject(val) {
      let res = await post('stiffnessProject/findByIlinkno', {
        stiffnessProject: {
          ilinkno: this.proID || val
        }
      })

      this.tableData_01 = res.data
      if (res.data.length !== 0) {
        this.scoreRowCLick({ indocno: this.tableData_01[0].indocno })
      }
    },
    // 项目字表添加按钮
    handleAddProject() {
      if (this.proID && this.pFlag) {
        this.tableData_01.push({ flag: true })
      } else {
        this.$message({
          message: '请选择主表内容(每次只添加一条)'
        })
      }
      this.pFlag = false
    },
    // 项目字表确定按钮
    async handleSubmitProject() {
      if (this.pFlag) {
        return
      }
      this.pFlag = true
      let data = this.tableData_01[this.tableData_01.length - 1]
      let sendInfo = {
        ilinkno: this.proID,
        project_name: data.project_name, //项目名称
        weight: data.weight, //权重
        standard: data.standard, //控制标准
        field_name: data.field_name //关联字段名称
      }
      let res = await post('/stiffnessProject/insert', {
        stiffnessProject: sendInfo
      })
      if (res) {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.tableData_01[this.tableData_01.length - 1].flag = false
        this.findAllProject()
      } else {
        this.$message({
          message: '添加失败',
          type: 'success'
        })
      }
    },
    // 项目字表编辑按钮
    handleEditProject(val) {
      this.ptable = false
      this.rowInfo = val
      for (const item of this.tableData_01) {
        if (val.indocno === item.indocno) {
          item.flag = true
          item.showPro = true
        }
      }
      this.$nextTick(() => {
        this.ptable = true
      })
      this.rowInfo = {}
    },
    async handleEditSubmitProject(val) {
      let res = await post('stiffnessProject/update', { stiffnessProject: val })
      if (res) {
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
        for (const item of this.tableData_01) {
          if (val.indocno === item.indocno) {
            item.flag = false
            item.showPro = false
          }
        }
        this.findAllProject()
      }
    },
    // 项目编辑取消按钮
    handleResetProject(val) {
      this.ptable = false
      this.rowInfo = val
      for (const item of this.tableData_01) {
        if (val.indocno === item.indocno) {
          item.flag = false
          item.showPro = false
        }
      }
      this.$nextTick(() => {
        this.ptable = true
      })
      this.rowInfo = {}
    },
    // 项目字表删除按钮
    handleDelectProject(data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('stiffnessProject/deleteOne', { indocno: data.indocno }).then(
            res => {
              if (res) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.findAllProject()
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
    // 得分字段查询按钮
    async scoreRowCLick(data) {
      if (data) {
        this.scoreID = data.indocno
      }
      let res = await post('stiffnessScore/findByIlinkno', {
        stiffnessScore: { ilinkno: this.scoreID }
      })
      if (res.data) {
        this.tableData_02 = res.data
      }
    },
    // 得分字表添加按钮
    handleAddScore() {
      if (this.scoreID && this.sFlag) {
        this.tableData_02.push({ flag: true })
      } else {
        this.$message({
          message: '请选择对应的项目信息(每次只能添加一条)'
        })
      }
      this.sFlag = false
    },
    // 得分字表确定按钮
    async handleSubmitScore() {
      if (this.sFlag) {
        return
      }
      this.sFlag = true
      let data = this.tableData_02[this.tableData_02.length - 1]
      let sendInfo = {
        ilinkno: this.scoreID,
        min: data.min, //最小值
        max: data.max, //最大值
        score: data.score //得分
      }
      let res = await post('stiffnessScore/insert', {
        stiffnessScore: sendInfo
      })
      if (res) {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.tableData_02[this.tableData_02.length - 1].flag = false
        this.scoreRowCLick()
      } else {
        this.$message({
          message: '添加失败',
          type: 'success'
        })
      }
    },
    // 得分字表编辑
    handleEditScore(val) {
      this.stable = false
      this.rowInfo = val
      for (const item of this.tableData_02) {
        if (val.indocno === item.indocno) {
          item.flag = true
          item.showPro = true
        }
      }
      this.$nextTick(() => {
        this.stable = true
      })
      this.rowInfo = {}
    },
    // 得分字表删除
    handleDelectScore(val) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('stiffnessScore/deleteOne', { indocno: val.indocno }).then(
            res => {
              if (res) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.scoreRowCLick()
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
    async handleEditSubmitS(val) {
      let res = await post('stiffnessScore/update', { stiffnessScore: val })
      if (res) {
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
        for (const item of this.tableData_02) {
          if (val.indocno === item.indocno) {
            item.flag = false
            item.showPro = false
          }
        }
        this.scoreRowCLick()
      }
    },
    handleResetS(val) {
      this.stable = false
      this.rowInfo = val
      for (const item of this.tableData_02) {
        if (val.indocno === item.indocno) {
          item.flag = false
          item.showPro = false
        }
      }
      this.$nextTick(() => {
        this.stable = true
      })
      this.rowInfo = {}
    }
  }
}
</script>
