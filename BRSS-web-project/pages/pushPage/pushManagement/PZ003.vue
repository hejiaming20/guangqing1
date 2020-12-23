<!--
 * @Author: lcx
 * @Date: 2020-08-28 13:44:15
 * @LastEditTime: 2020-12-08 09:38:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\pushPage\pushManagement\PZ003.vue
-->
<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :table-height="'calc(100vh - 195px)'"
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
              :inline="true"
              class="search-info"
              label-width="80px">
              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input v-model="searchInfo.roll_no" />
              </el-form-item>
              <el-form-item
                label="生产厂家"
                prop="factory">
                <el-select
                  v-model="searchInfo.factory"
                  placeholder="请选择">
                  <el-option
                    v-for="item in factoryArray"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
                <!-- <el-input v-model="searchInfo.factory" /> -->
              </el-form-item>
              <el-form-item
                label="材质"
                prop="material">
                <!-- <el-input v-model="searchInfo.material" /> -->
                <el-select
                  v-model="searchInfo.material"
                  placeholder="请选择">
                  <el-option
                    v-for="item in materialArray"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="轧辊类型"
                prop="roll_type">
                <!-- <el-input v-model="searchInfo.roll_type" /> -->
                <el-select
                  v-model="searchInfo.roll_type"
                  placeholder="请选择">
                  <el-option
                    v-for="item in typeArray"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>

            </el-form>
          </el-col>
          <el-col :span="4">
            <el-button
              size="mini"
              type="primary"
              @click="findAll()">查询</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="resetForm('ruleForm')">重置</el-button>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          prop="roll_no"
          label="辊号"/>
        <el-table-column
          prop="factory"
          label="生产厂家"/>
        <el-table-column
          prop="material"
          label="材质"/>
        <el-table-column
          prop="roll_type"
          label="轧辊类型"/>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </template>
    </Table-easy>

    <!-- 添加/编辑弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      class="layout-dialog"
      width="80%">
      <div class="layout-search">
        <el-form
          :model="form"
          label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="轧辊编号">
                <el-input v-model="form.roll_no"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="生产厂家">
                <el-input v-model="form.factory"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="轧辊材质">
                <el-input v-model="form.material"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="轧辊类型">
                <el-input v-model="form.roll_type"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <el-table
        :data="detailData"
        border>
        <el-table-column
          label="项目"
          prop="order_text"/>
        <el-table-column
          label="协议（图纸）要求"
          prop="order_standard"/>
        <el-table-column
          label="实测数据"
          prop="order_measure"/>
        <el-table-column
          label="检测结果判定"
          prop="order_result">
          <template slot-scope="scope">
            <span>{{ scope.row.order_result === 1? '符合': '不符合' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          prop="order_unit"/>
      </el-table>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
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
      detailData: [],
      tableData: [],
      form: {},
      total: 0,
      pageIndex: 1,
      pageSize: 30,
      dialogVisible: false,
      factoryArray: [], // 生产厂商
      materialArray: [],
      typeArray: []
    }
  },
  mounted() {
    this.findAll()
    getDataConfig('roll_factory').then(res => {
      this.factoryArray = res
    })
    getDataConfig('roll_material').then(res => {
      this.materialArray = res
    })
    getDataConfig('rolltype').then(res => {
      console.log()
      this.typeArray = res
    })
  },
  methods: {
    async findAll() {
      let res = await post('rollDimensionorder/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      })
      this.tableData = res.data
      this.total = res.count
    },
    async handleDetail(val) {
      this.form = val
      let res = await post('rollDimensionorder/finddetail', {
        rollDimensionorder: val
      })
      this.detailData = res.data
      this.dialogVisible = true
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields()
      this.searchInfo = {}
      this.findAll()
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
