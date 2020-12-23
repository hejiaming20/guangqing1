<template>
  <div class="PZ001">
    <Table-easy
      :table-data="tableData"
      :total="total"
      :table-height="'calc(100vh - 220px)'"
      :page-size="pageSize"
      :current-page="pageIndex"
      index-type="index"
      @handle-size-change="handleSizeChange"
      @handle-current-change="handleCurrentChange">
      <template slot="TableHead">
        <el-row :gutter="10">
          <el-col :span="20">
            <el-form
              ref="ruleForm"
              :model="searchInfo"
              class="search-info"
              label-width="80px">
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="模块名称"
                    prop="modular_name">
                    <el-input v-model="searchInfo.modular_name" />
                  </el-form-item>

                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="模块编码"
                    prop="modular_no">
                    <el-input v-model="searchInfo.modular_no" />
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
                @click="findSearch">查询</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="resetForm('ruleForm')">重置</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="addData">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          :show-overflow-tooltip="true"
          prop="modular_name"
          label="模块名称"/>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="modular_no"
          label="模块编码"/>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="field_type"
          label="字段类型">
          <template slot-scope="scope">
            <span>{{ scope.row.field_type | filterFieldType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="field_max"
          label="上区间">
          <template slot-scope="scope">
            <span >{{ scope.row.field_max == 100001 ? '＋ ∞':(scope.row.field_max == 100000 ? '－ ∞':scope.row.field_max) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="field_min"
          label="下区间">
          <template slot-scope="scope">
            <span >{{ scope.row.field_min == 100001 ? '＋ ∞':(scope.row.field_min == 100000 ? '－ ∞':scope.row.field_min) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="field_name"
          min-width="150px"
          label="标准名称"/>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="standard_type"
          label="标准类型">
          <template slot-scope="scope">
            <span>{{ scope.row.standard_type | filterstandardType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="100"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleCopy(scope.row)">复制</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="handleEdit(scope.row)">修改</el-button>

            <el-button
              size="mini"
              type="danger"
              @click="handleDelect(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </Table-easy>

    <!-- 添加/编辑弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="title"
      class="layout-dialog"
      width="80%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :rules="rules"
          :model="formLabelAlign"
          class="search-info"
          label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="模块名称"
                prop="modular_name">
                <el-input v-model="formLabelAlign.modular_name" />
              </el-form-item>
              <el-form-item
                label="单位"
                prop="">
                <el-input v-model="formLabelAlign.field_unit" />
              </el-form-item>
              <el-form-item
                label="字段类型"
                prop="">
                <template>
                  <el-radio
                    v-model="formLabelAlign.field_type"
                    label="1">区间</el-radio>
                  <el-radio
                    v-model="formLabelAlign.field_type"
                    label="0">布尔</el-radio>
                </template>
              </el-form-item>
              <el-form-item
                label="产线"
                prop="production_line">
                <el-select
                  v-model="formLabelAlign.production_line_id"
                  clearable
                  placeholder="请选择产线"
                  @change="handleProductionChange">
                  <el-option
                    v-for="item in productionArray"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="字段名称"
                prop="field_name">
                <el-input v-model="formLabelAlign.field_name" />
              </el-form-item>
              <el-form-item
                label="标准类型">
                <el-radio
                  v-model="formLabelAlign.standard_type"
                  :label="1">标准</el-radio>
                <el-radio
                  v-model="formLabelAlign.standard_type"
                  :label="0">其他</el-radio>
              </el-form-item>

              <el-form-item
                v-show="!fieldTxtDisplay"
                label="上区间"
                prop="">
                <el-autocomplete
                  v-model="formLabelAlign.field_max"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容">
                  <i
                    slot="suffix"
                    class="el-icon-edit el-input__icon"/>
                  <template slot-scope="{ item }">
                    <div class="name">{{ item.value }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
              <el-form-item
                v-show="fieldTxtDisplay"
                label="文字">
                <el-input
                  v-model="formLabelAlign.field_value"
                  placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="模块编码"
                prop="modular_no">
                <el-input v-model="formLabelAlign.modular_no" />
              </el-form-item>

              <el-form-item
                label="轧辊类型"
                prop="roll_typeid">
                <el-select
                  v-model="formLabelAlign.roll_typeid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <el-form-item
                v-show="!fieldTxtDisplay"
                label="下区间"
                prop="">
                <el-autocomplete
                  v-model="formLabelAlign.field_min"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容">
                  <i
                    slot="suffix"
                    class="el-icon-edit el-input__icon"/>
                  <template slot-scope="{ item }">
                    <div class="name">{{ item.value }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            label="备注"
            prop="snote">
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
          type="primary"
          size="small"
          @click="dialogVisible = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get, post } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
import { rolltypelist } from '@/api/pinClipBoard' //查询接口
export default {
  components: { TableEasy },
  filters: {
    filterFieldType(val) {
      if (val === '0' || val === 0) {
        return '布尔'
      } else if (val === '1' || val === 1) {
        return '其他'
      }
    },
    filterstandardType(val) {
      if (val === '0' || val === 0) {
        return '布尔'
      } else if (val === '1' || val === 1) {
        return '标准'
      }
    }
  },
  data() {
    return {
      options: [],
      restaurants: [],
      statetop: '',
      statedown: '',
      searchInfo: {
        modular_name: '',
        modular_no: ''
      },
      fieldTxtDisplay: false,
      radio: '',
      fieldradio: '',
      rules: {
        modular_name: [
          { required: true, message: '请输入模块名称', trigger: 'blur' }
        ],
        modular_no: [
          { required: true, message: '请输入模块编码', trigger: 'blur' }
        ],
        field_max: [
          { required: true, message: '请输入上区间', trigger: 'blur' }
        ],
        field_min: [
          { required: true, message: '请输入下区间', trigger: 'blur' }
        ],
        field_name: [
          { required: true, message: '请输入字段名称', trigger: 'blur' }
        ]
      },
      formLabelAlign: {
        modular_name: '',
        modular_no: ''
      },
      tableData: [],
      total: 0,
      dialogVisible: false,
      title: '',
      pageIndex: 1,
      pageSize: 30,
      productionArray: [] // 存放产线
    }
  },
  watch: {
    'formLabelAlign.field_type': {
      handler(newVal, oldVal) {
        if (newVal === '1') {
          this.fieldTxtDisplay = false
        } else if (newVal === '0') {
          this.fieldTxtDisplay = true
        }
        this.formLabelAlign.field_type = newVal
      }
    }
  },
  mounted() {
    this.findAll()
    this.findOption()
    this.restaurants = this.loadAll()
  },
  methods: {
    // 产线选择
    handleProductionChange() {
      this.productionArray.map(v => {
        if (v.key === this.formLabelAlign.production_line_id) {
          this.formLabelAlign.production_line = v.value
        }
      })
    },
    // 新增按钮
    addData() {
      this.title = '新增'
      this.dialogVisible = true
      this.formLabelAlign = {}
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    loadAll() {
      return [
        { value: '＋ ∞' },
        {
          value: '－ ∞'
        }
      ]
    },
    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },
    async findAll() {
      let res = await post('rollStandard/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      })
      this.tableData = res.data
      this.total = res.count
    },
    //轧辊类型-下拉框数据
    findOption() {
      post(rolltypelist, {
        dicno: 'rolltype'
      }).then(res => {
        this.options = res.data
      })
      post(rolltypelist, {
        dicno: 'proline'
      }).then(res => {
        this.productionArray = res.data
        this.productionArray.forEach(item => {
          item.key = Number(item.key)
        })
      }) // 产线下拉
    },
    /**
     * description: 删除一行数据
     */
    handleDelect(data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('rollStandard/deleteOne', { indocno: data.indocno }).then(
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
    /**
     * description: 修改数据按钮
     */
    handleEdit(data) {
      this.title = '编辑'
      this.formLabelAlign = {}
      this.dialogVisible = true
      if (data.field_max == '100001') {
        data.field_max = '＋ ∞'
      } else if (data.field_max == '100000') {
        data.field_max = '－ ∞'
      }
      if (data.field_min == '100000') {
        data.field_min = '－ ∞'
      } else if (data.field_min == '100001') {
        data.field_min = '＋ ∞'
      }
      this.formLabelAlign = JSON.parse(JSON.stringify(data))
      this.formLabelAlign.roll_typeid = String(this.formLabelAlign.roll_typeid)
      this.formLabelAlign.field_min = String(this.formLabelAlign.field_min)
      this.formLabelAlign.field_max = String(this.formLabelAlign.field_max)
    },
    // 复制按钮
    handleCopy(data) {
      this.title = '复制'
      this.formLabelAlign = {}
      this.dialogVisible = true
      if (data.field_max == '100001') {
        data.field_max = '＋ ∞'
      } else if (data.field_max == '100000') {
        data.field_max = '－ ∞'
      }
      if (data.field_min == '100000') {
        data.field_min = '－ ∞'
      } else if (data.field_min == '100001') {
        data.field_min = '＋ ∞'
      }
      this.formLabelAlign = JSON.parse(JSON.stringify(data))
      delete this.formLabelAlign.indocno
      this.formLabelAlign.roll_typeid = String(this.formLabelAlign.roll_typeid)
      this.formLabelAlign.field_min = String(this.formLabelAlign.field_min)
      this.formLabelAlign.field_max = String(this.formLabelAlign.field_max)
    },
    /**
     * description: 弹窗确定按钮
     */
    handleSave() {
      var forms = 'addForm'
      if (this.formLabelAlign.indocno) {
        this.edit(forms)
      } else {
        this.save(forms)
      }
      this.formLabelAlign = {}
    },
    /**
     * description: 重置按钮
     */
    resetForm(formName) {
      this.searchInfo = {}
      this.findSearch()
      // this.$refs[formName].resetFields()
    },
    /**
     * description: 添加数据函数
     */
    save(formName) {
      if (this.formLabelAlign.field_max == '＋ ∞') {
        this.formLabelAlign.field_max = '100001'
      } else if (this.formLabelAlign.field_max == '－ ∞') {
        this.formLabelAlign.field_max = '100000'
      }
      if (this.formLabelAlign.field_min == '＋ ∞') {
        this.formLabelAlign.field_min = '100001'
      } else if (this.formLabelAlign.field_min == '－ ∞') {
        this.formLabelAlign.field_min = '100000'
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          post('rollStandard/insert', {
            rollStandard: this.formLabelAlign
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '保存成功!'
              })
              this.$refs[formName].resetFields()
              this.findAll()
            } else {
              this.$message({
                type: 'success',
                message: '保存失败!'
              })
            }
          })
          this.dialogVisible = false
        } else {
          alert('请按照要求输入')
        }
      })
    },
    /**
     * description: 编辑数据函数
     */
    edit(formName) {
      // 编辑
      if (this.formLabelAlign.field_max == '＋ ∞') {
        this.formLabelAlign.field_max = '100001'
      } else if (this.formLabelAlign.field_max == '－ ∞') {
        this.formLabelAlign.field_max = '100000'
      }
      if (this.formLabelAlign.field_min == '－ ∞') {
        this.formLabelAlign.field_min = '100000'
      } else if (this.formLabelAlign.field_min == '＋ ∞') {
        this.formLabelAlign.field_min = '100001'
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 编辑
          post('rollStandard/update', {
            rollStandard: this.formLabelAlign
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
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    }
  }
}
</script>

<style scoped>
.PZ001 .el-dialog__wrapper .el-form-item {
  line-height: 75px;
  height: 75px;
  display: block;
}
/deep/ #el-autocomplete-2811-item-0 {
}
.el-autocomplete-suggestion li {
  font-size: 27px !important;
}
</style>
