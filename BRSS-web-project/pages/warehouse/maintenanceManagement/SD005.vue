<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :table-height="'calc(100vh - 220px)'"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <template slot="TableHead">
        <el-row :gutter="10">
          <el-col :span="20">
            <el-form
              ref="ruleForm"
              :inline="true"
              :model="searchInfo"
              label-width="80px">
              <el-form-item
                label="模块名称"
                prop="module_name">
                <el-input v-model="searchInfo.module_name" />
              </el-form-item>
              <el-form-item
                label="模块编码"
                prop="module_coding">
                <el-input v-model="searchInfo.module_coding" />
              </el-form-item>
              <el-form-item
                label="机架范围"
                prop="stand">
                <!-- <el-input v-model="searchInfo.stand_id" /> -->
                <el-select
                  v-model="searchInfo.stand"
                  placeholder="请选择">
                  <el-option
                    v-for="item in frameArray"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
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
                @click="open_tianjia">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          prop="module_name"
          label="模块名称"/>
        <el-table-column
          prop="module_coding"
          label="模块编码"/>
        <!--<el-table-column
          prop="field_max"
          label="上区间"/>
        <el-table-column
          prop="field_min"
          label="下区间"/>-->
        <el-table-column
          prop="field_max"
          label="上区间">
          <template slot-scope="scope">
            <span >{{ scope.row.field_max == 100001 ? '＋ ∞':(scope.row.field_max == 100000 ? '－ ∞':scope.row.field_max) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="field_min"
          label="下区间">
          <template slot-scope="scope">
            <span >{{ scope.row.field_min == 100001 ? '＋ ∞':(scope.row.field_min == 100000 ? '－ ∞':scope.row.field_min) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="field_name"
          label="字段名称"/>
        <el-table-column
          prop="stand"
          label="机架范围"/>
        <el-table-column
          prop="sort_order"
          label="备辊排列顺序"/>
        <el-table-column
          label="操作"
          min-width="300"
          align="center">
          <template slot-scope="scope">
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
    <!-- 添加弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="title"
      class="layout-dialog"
      width="75%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :rules="rules"
          :model="formLabelAlign"
          label-width="100px">
          <el-row >
            <el-col :span="6">
              <el-form-item
                label="模块名称"
                prop="module_name">
                <el-input v-model="formLabelAlign.module_name" />
              </el-form-item>
              <el-form-item
                label="模块编码"
                prop="module_coding">
                <el-input v-model="formLabelAlign.module_coding" />
            </el-form-item></el-col>
            <el-col :span="6">
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
            <el-col :span="6">
              <el-form-item
                label="机架范围"
                prop="stand_id">
                <!-- <el-input v-model="formLabelAlign.stand" /> -->
                <el-select
                  v-model="formLabelAlign.stand_id"
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
                label="字段名称"
                prop="field_name">
                <el-input v-model="formLabelAlign.field_name" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="备辊排列顺序"
                prop="sort_order">
                <el-input v-model="formLabelAlign.sort_order" />
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
  </div>
</template>

<script>
import { get, post, getDataConfig } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
export default {
  components: { TableEasy },
  data() {
    return {
      searchInfo: {
        indocno: '',
        module_name: '',
        module_coding: '',
        field_max: '',
        field_min: '',
        field_name: '',
        stand_id: '',
        stand: '',
        sort_order: ''
        /* createid: '',
        createname: '',
        createtime: '',
        modiid: '',
        modiname: '',
        moditime: '',
        idel: '',
        istate: '',
        snote: ''*/
      },
      rules: {
        module_name: [
          { required: true, message: '请输入模块名称', trigger: 'blur' }
        ],
        module_coding: [
          { required: true, message: '请输入模块编码', trigger: 'blur' }
        ]
      },
      formLabelAlign: {},
      tableData: [],
      total: 0,
      pageSize: 30,
      pageIndex: 1,
      dialogVisible: false,
      fieldTxtDisplay: false,
      title: '',
      restaurants: [],
      frameArray: []
    }
  },
  mounted() {
    this.findAll()
    this.restaurants = this.loadAll()
    getDataConfig('framefw').then(res => {
      this.frameArray = res
    })
  },
  methods: {
    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },
    async findAll() {
      let res = await post('rollPreparationStandard/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      })
      this.tableData = res.data
      console.log('res.data', res.data)
      this.total = res.count
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
    //打开添加弹窗
    open_tianjia() {
      this.title = '新增'
      this.dialogVisible = true
      this.formLabelAlign = {}
    },
    handleFrameChange() {
      this.frameArray.forEach(item => {
        if (item.key == this.formLabelAlign.stand_id) {
          this.formLabelAlign.stand = item.value
        }
      })
    },
    /**
     * description: 删除一行数据
     */
    handleDelect(data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('rollPreparationStandard/deleteOne', {
            indocno: data.indocno
          }).then(res => {
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
    /**
     * description: 修改数据按钮
     */
    handleEdit(data) {
      this.title = '编辑'
      this.formLabelAlign = {}
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
      this.formLabelAlign = data
      this.formLabelAlign.field_min = String(this.formLabelAlign.field_min)
      this.formLabelAlign.field_max = String(this.formLabelAlign.field_max)
      this.dialogVisible = true
    },
    /**
     * description: 弹窗确定按钮
     */
    handleSave() {
      var forms = 'addForm'
      if (this.formLabelAlign.indocno) {
        this.edit(forms)
      } else {
        this.formLabelAlign.roll_state = 1
        this.save(forms)
      }
    },
    /**
     * description: 重置按钮
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
          post('rollPreparationStandard/insert', {
            rollPreparationStandard: this.formLabelAlign
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '保存成功!'
              })
              this.$refs[formName].resetFields()
              this.findAll()
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
          post('rollPreparationStandard/update', {
            rollPreparationStandard: this.formLabelAlign
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.$refs[formName].resetFields()
              this.findAll()
            }
          })
          this.dialogVisible = false
        } else {
          alert('请按照要求输入')
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    }
  }
}
</script>

<style>
</style>
