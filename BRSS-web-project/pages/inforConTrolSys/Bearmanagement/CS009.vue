<template>
  <div>
    <template >
      <div class="c_table-title"><i class="iconfont icon-biaoti1"/> 给油工单</div>
      <div class="layout-search">
        <div class="layout-search-header">查询区</div>
        <div class="layout-search-body">
          <el-row>
            <el-col :span="20">
              <el-form
                ref="ruleForm1"
                :inline="true"
                :model="searchInfo">
                <el-form-item
                  label-width="60px"
                  label="辊号"
                  prop="roll_no">
                  <el-input v-model="searchInfo.roll_no" />
                </el-form-item>
                <el-form-item
                  label="产线"
                  prop="production_line_id">
                  <el-select
                    v-model="searchInfo.production_line_id"
                    placeholder="请选择">
                    <el-option
                      v-for="item in production_line_Array"
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
                  @click="resetForm('ruleForm1')">重置</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div style="margin-bottom: 10px">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class="layout-search-header">F1-F4</div>
            <Table-easy
              :table-data="tableData"
              :page-size="pageSize"
              :total="total"
              :current-page="pageIndex"
              :table-head="false"
              :span-method="spanMethod"
              table-height="400"
              index-type="index"
              @handle-current-change="handleCurrentChange"
              @handle-size-change="handleSizeChange">
              <template slot="TableBody">
                <el-table-column
                  label="操作"
                  min-width="150"
                  align="center">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="gaveOil('a',scope.row)">补油</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="roll_type"
                  align="center"
                  label="轧辊类型"/>
                <el-table-column
                  prop="framerange"
                  align="center"
                  label="机架范围"/>
                <el-table-column
                  prop="production_line"
                  align="center"
                  label="产线"/>
                <el-table-column
                  prop="roll_no"
                  align="center"
                  label="辊号"/>
                <el-table-column
                  prop="workoilcount"
                  min-width="120px"
                  align="center"
                  label="工作辊补油周期跟踪次数"/>
              </template>
            </Table-easy>
          </el-col>
          <el-col :span="12">
            <div class="layout-search-header">F5-F7</div>
            <Table-easy
              :table-data="tableData_two"
              :page-size="pageSize2"
              :total="total2"
              :span-method="spanMethod"
              :current-page="pageIndex2"
              :table-head="false"
              table-height="400"
              index-type="index"
              @handle-current-change="handleCurrentChange2"
              @handle-size-change="handleSizeChange2">
              <template slot="TableBody">
                <el-table-column
                  label="操作"
                  min-width="150"
                  align="center">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="gaveOil('b',scope.row)">补油</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="roll_type"
                  align="center"
                  label="轧辊类型"/>
                <el-table-column
                  prop="framerange"
                  align="center"
                  label="机架范围"/>
                <el-table-column
                  prop="production_line"
                  align="center"
                  label="产线"/>
                <el-table-column
                  prop="roll_no"
                  align="center"
                  label="辊号"/>
                <el-table-column
                  prop="workoilcount"
                  min-width="120px"
                  align="center"
                  label="工作辊补油周期跟踪次数"/>
              </template>
            </Table-easy>
          </el-col>
        </el-row>
      </div>
    </template>

    <!--<div class="layout-default-margin">
      <div class="c_table-title"><i class="iconfont icon-biaoti1"/> 给油工单</div>
      <Table-easy
        :table-data="tableData"
        :page-size="pageSize"
        :total="total"
        :current-page="pageIndex"
        table-height="400"
        index-type="index"
        @handle-current-change="handleCurrentChange"
        @handle-size-change="handleSizeChange">
        <template slot="TableHead">
          <el-row>
            <el-col :span="20">
              <el-form
                ref="ruleForm1"
                :inline="true"
                :model="searchInfo">
                <el-form-item
                  label-width="60px"
                  label="辊号"
                  prop="roll_no">
                  <el-input v-model="searchInfo.roll_no" />
                </el-form-item>
                <el-form-item
                  label="产线"
                  prop="production_line_id">
                  <el-select
                    v-model="searchInfo.production_line_id"
                    placeholder="请选择">
                    <el-option
                      v-for="item in production_line_Array"
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
                  @click="resetForm('ruleForm1')">重置</el-button>
              </div>
            </el-col>
          </el-row>
        </template>
        <template slot="TableBody">
          <el-table-column
            prop="production_line"
            align="center"
            label="产线"/>
          <el-table-column
            prop="roll_no"
            align="center"
            label="辊号"/>
          <el-table-column
            prop="roll_type"
            align="center"
            label="轧辊类型"/>
          <el-table-column
            prop="framerange"
            align="center"
            label="机架范围"/>
          <el-table-column
            prop="workoilcount"
            min-width="120px"
            align="center"
            label="工作辊补油周期跟踪次数"/>
          <el-table-column
            label="操作"
            min-width="150"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="gaveOil(scope.row)">补油</el-button>
            </template>
          </el-table-column>
        </template>
      </Table-easy>
    </div>
-->
    <!-- 补油历史查询 -->
    <div>
      <div class="c_table-title"><i class="iconfont icon-biaoti1"/> 给油历史查询</div>
      <Table-easy
        :table-data="tableData1"
        :page-size="oilInfo.pageSize"
        :total="oilInfo.total"
        :table-height="500"
        :current-page="pageIndex"
        index-type="index"
        @handle-current-change="handleCurrentChange1"
        @handle-size-change="handleSizeChange1">
        <template slot="TableHead">
          <el-row>
            <el-col :span="20">
              <el-form
                ref="ruleForm"
                :inline="true"
                :model="searchInfo1"
                label-width="100px">
                <el-form-item
                  label="辊号"
                  prop="roll_no">
                  <el-input v-model="searchInfo1.roll_no" />
                </el-form-item>
                <el-form-item
                  label="注油日期"
                  prop="dbegin">
                  <el-date-picker
                    v-model="searchInfo1.dbegin"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"/>
                </el-form-item>
                <el-form-item
                  label="注油日期"
                  prop="dend">
                  <el-date-picker
                    v-model="searchInfo1.dend"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"/>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="4">
              <div class="btn">
                <el-button
                  size="mini"
                  type="primary"
                  @click="findSearchHistory()">查询</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="resetFormHistory('ruleForm')">重置</el-button>
              </div>
            </el-col>
          </el-row>
        </template>
        <template slot="TableBody">
          <el-table-column
            prop="roll_no"
            label="辊号"/>
          <el-table-column
            prop="framerange"
            label="机架范围"/>
          <el-table-column
            prop="oil_time"
            label="补油时间"/>
          <el-table-column
            prop="sbz"
            label="班组"/>
          <el-table-column
            prop="odiname"
            label="操作人名称"/>
        </template>
      </Table-easy>
    </div>

    <!-- 轴承座补油 -->
    <el-dialog
      :visible.sync="insertOilVisable"
      title="轴承座补油"
      class="layout-dialog"
      width="20%">
      <div class="layout-search">
        <el-form
          ref="oilform"
          :model="insertOilInfo"
          label-width="80px">
          <el-form-item
            label="补油时间"
            prop="oil_time">
            <el-date-picker
              v-model="insertOilInfo.oil_time"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择时间"/>
          </el-form-item>
          <el-form-item
            label="班组"
            prop="ibz">
            <el-select
              v-model="insertOilInfo.ibz"
              @change="handleTearmChange">
              <el-option
                v-for="item in tearmOption"
                :key="item.key"
                :label="item.value"
                :value="Number(item.key)"/>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          @click="insertOilVisable = false">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="saveOil">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { get, post, getDataConfig } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
export default {
  components: { TableEasy },
  data() {
    return {
      searchInfo: {},
      searchInfo1: {},
      tableData: [],
      tableData_two: [],
      total: 0,
      total2: 0,
      tableData1: [],
      pageIndex: 1,
      pageSize: 10,
      pageIndex2: 1,
      pageSize2: 10,
      option2: [], // 轧辊类型

      oilInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      insertOilVisable: false,
      insertOilInfo: {},
      insertOilInfo_1: {},
      tearmOption: [],
      oilRules: {
        oil_time: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        ibz: [{ required: true, message: '请选择班组', trigger: 'blur' }]
      },
      production_line_Array: []
    }
  },
  mounted() {
    this.findOilData() // 查找补油数据
    this.findOilHistory()
    this.findOption() // 获取到所有下拉框的值
  },
  methods: {
    spanMethod(row) {
      //row:当前行
      //column:当前列
      //rowIndex:当前行号
      //columnIndex：当前列号
      if (
        row.columnIndex === 1 ||
        row.columnIndex === 2 ||
        row.columnIndex === 3 ||
        row.columnIndex === 4
      ) {
        if (row.rowIndex % 2 === 0) {
          return {
            rowspan: 2, // 需要合并的行数
            colspan: 1 // 需要合并的列数，设置为0，不显示该列
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    // 分组选择下拉框
    handleTearmChange() {
      this.tearmOption.forEach(item => {
        if (item.key == this.insertOilInfo.ibz) {
          this.insertOilInfo.sbz = item.value
        }
      })
    },

    // 轴承座补油事件
    gaveOil(chioce, val) {
      this.insertOilInfo = Object.assign({}, val)
      this.insertOilVisable = true

      if (chioce == 'a') {
        for (var i = 0; this.tableData.length > i; i++) {
          if (this.insertOilInfo.roll_no == this.tableData[i].roll_no) {
            this.insertOilInfo_1 = this.tableData[i + 1]
            break
          }
        }
      } else {
        for (var i = 0; this.tableData_two.length > i; i++) {
          if (this.insertOilInfo.roll_no == this.tableData_two[i].roll_no) {
            this.insertOilInfo_1 = this.tableData_two[i + 1]
            break
          }
        }
      }
    },
    saveOil() {
      this.insertOilVisable = false
      this.$refs.oilform.validate(valid => {
        if (valid) {
          this.insertOilInfo_1.sbz = this.insertOilInfo.sbz
          this.insertOilInfo_1.oil_time = this.insertOilInfo.oil_time
          this.insertOilInfo_1.ibz = this.insertOilInfo.ibz
          post('/chockOil/insert', {
            chockOil: this.insertOilInfo
          }).then(res => {
            if (res.status == 2000) {
              this.$message({
                type: 'success',
                message: '补油成功'
              })
              this.findOilHistory()
            } else {
              this.$message('补油2失败')
            }
          })
          post('/chockOil/insert', {
            chockOil: this.insertOilInfo_1
          }).then(res => {
            if (res.status == 2000) {
              this.$message({
                type: 'success',
                message: '补油2成功'
              })
              this.findOilHistory()
            } else {
              this.$message('补油失败')
            }
          })
        } else {
          return false
        }
      })
    },
    // 查找补油数据
    async findOilData() {
      let res = await post('/rollInformation/findByOil', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        pageIndex2: this.pageIndex2,
        pageSize2: this.pageSize2,
        condition: this.searchInfo
      })
      if (res.status == 2000) {
        this.tableData = res.data.F14
        this.tableData_two = res.data.F57
        this.total = res.data.F14count / 2
        this.total2 = res.data.F57count / 2
      } else {
        this.tableData = []
        this.total = 0
        this.tableData_two = []
        this.total2 = 0
      }
      console.log('给油记录==========', res)
    },
    // 查询补油历史
    async findOilHistory() {
      let res = await post('/chockOil/findByPage', {
        pageIndex: this.oilInfo.pageIndex,
        pageSize: this.oilInfo.pageSize,
        condition: this.searchInfo1
      })
      if (res.status == 2000) {
        this.tableData1 = res.data
        this.oilInfo.total = res.count
      } else {
        this.tableData1 = []
        this.oilInfo.total = 0
      }
    },

    // 给油工单分页
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findOilData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.findOilData()
    },
    // 给油工单分页
    handleCurrentChange2(val) {
      this.pageIndex2 = val
      this.findOilData()
    },
    handleSizeChange2(val) {
      this.pageSize2 = val
      this.findOilData()
    },

    // 补油历史分页
    handleCurrentChange1(val) {
      this.oilInfo.pageIndex = val
      this.findOilHistory()
    },
    handleSizeChange1(val) {
      this.oilInfo.pageSize = val
      this.findOilHistory()
    },

    /**
     * description: 给油工单重置按钮
     */
    resetForm(formName) {
      this.searchInfo = {}
      this.findSearch()
      // this.$refs[formName].resetFields()
      // this.findOilData()
    },
    findSearch() {
      this.pageIndex = 1
      this.pageIndex2 = 1
      this.findOilData()
    },
    // 补油历史重置
    resetFormHistory(formName) {
      this.searchInfo1 = {}
      this.findSearchHistory()
      // this.$refs[formName].resetFields()
      // this.findOilHistory()
    },

    findSearchHistory() {
      this.oilInfo.pageIndex = 1
      this.findOilHistory()
    },
    // 获取到所有下拉框的值
    findOption() {
      post('/dictionary/findMapV1', { dicno: 'rolltype' }).then(res => {
        this.option2 = res.data //轧辊类型（直接使用）
      })
      getDataConfig('proline').then(res => {
        this.production_line_Array = res
      })
      getDataConfig('team').then(res => {
        this.tearmOption = res
      })
    }
  }
}
</script>

<style>
</style>
