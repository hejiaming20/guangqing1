<!--
 * @Author: your name
 * @Date: 2020-12-03 17:42:58
 * @LastEditTime: 2020-12-16 11:29:16
 * @LastEditors: Please set LastEditors
 * @Description: 自定义名称 轧辊清单看板
 * @FilePath: \BRSS-web-project\pages\inforConTrolSys\rollManagement\RM013.vue
-->
<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :page-size="pageSize"
      :total="total"
      :span-method="handleRow"
      table-height="calc(100vh - 220px)"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <template slot="TableHead">
        <el-row>
          <el-col :span="21">
            <el-form
              ref="ruleForm"
              :inline="true"
              :model="searchInfo5"
              class="search-info"
              label-width="80px">
              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input v-model="searchInfo5.roll_no" />
              </el-form-item>
              <el-form-item
                label="轧辊类型"
                prop="roll_typeid">
                <el-select
                  v-model="searchInfo5.roll_typeid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="轧辊材质"
                prop="material">
                <el-select
                  v-model="searchInfo5.material"
                  placeholder="请选择">
                  <el-option
                    v-for="item in option_2"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="机架号"
                prop="frame_noid">
                <el-select
                  v-model="searchInfo5.frame_noid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in jijiaArr"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="3">
            <div class="btn">
              <el-button
                size="mini"
                type="primary"
                @click="find_data()">查询
              </el-button>
              <el-button
                size="mini"
                type="primary"
                @click="resetForm1('ruleForm')">重置
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
          prop="currentdiameter" 
          label="辊径"/>
        <el-table-column
          prop="frame_no"
          label="机架号"/>
        <!-- <el-table-column
          label="制造厂商"
          prop="factory"/>
        <el-table-column
          prop="roll_type"
          label="轧辊类型"/>
        <el-table-column
          label="轧辊材质"
          prop="material"/>
        <el-table-column
          prop="roll_position"
          label="上机位置"/>
        <el-table-column
          prop="currentdiameter"
          label="当前辊径"/> -->
        <el-table-column
          prop="roll_revolve_value"
          label="轧辊周转状态"/>
        <el-table-column
          prop="uplinecount"
          label="上机次数"/>
        <el-table-column
          prop="workoilcount"
          label="补油次数"/>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditState(scope.row)">状态修改
            </el-button>
          </template>
        </el-table-column>
      </template>
    </Table-easy>
    <!-- 状态修改 -->
    <el-dialog
      :visible.sync="dialogVisibleChange"
      title="状态修改"
      class="layout-dialog"
      width="20%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlignChange"
          label-position="left"
          label-width="100px">
          <el-form-item
            label="周转状态"
            prop="roll_revolve">
            <el-select
              v-model="formLabelAlignChange.roll_revolve"
              clearable
              placeholder="请选择周转状态">
              <el-option
                v-for="item in rollRevolveArray"
                :key="item.key"
                :label="item.value"
                :value="Number(item.key)"/>
            </el-select>
          </el-form-item>
          <el-form-item
            label="上机次数"
            prop="uplinecount">
            <el-input
              v-model="formLabelAlignChange.uplinecount"/>
          </el-form-item>
          <el-form-item
            label="辊径"
            prop="currentdiameter">
            <el-input
              v-model="formLabelAlignChange.currentdiameter"/>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          @click="dialogVisibleChange = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="submitChange">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import { rollInformation, kucunlist, rolltypelist } from '@/api/pinClipBoard' //查询接口
import { get, post, getDataConfig } from '@/lib/Util'
export default {
  components: {
    TableEasy
  },
  data() {
    return {
      uplinecount: '',
      tableData: [],
      searchInfo5: {},
      pageSize: 10,
      total: 0,
      pageIndex: 1,
      options: [],
      option_2: [],
      dialogVisibleChange: false,
      rollRevolveArray: [],
      formLabelAlignChange: {
        currentdiameter: ''
      },
      jijiaArr: [],
      user: ''
    }
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem('userInfo'))
    this.user = user.indocno
    this.findOptions()
  },
  methods: {
    handleRow(row) {
      console.log(row)
      if (row.columnIndex === 2) {
        if (row.rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
      // if (row.columnIndex === 2) {
      //   return {
      //     rowspan: 2,
      //     colspan: 1
      //   }
      // }
    },
    findOptions() {
      getDataConfig('frameteam').then(res => {
        this.jijiaArr = res // 机架范围
      })
      getDataConfig('rollrevolve').then(res => {
        this.rollRevolveArray = res // 部件类型
      })
      post(rolltypelist, {
        dicno: 'rolltype'
      }).then(res => {
        this.options = res.data
        if (this.user == 48) {
          this.options.map(o => {
            if (o.value == '精轧工作辊') {
              this.searchInfo5.roll_typeid = o.key
            }
          })
        }
        if (this.user == 55) {
          this.options.map(o => {
            if (o.value == '粗轧工作辊') {
              this.searchInfo5.roll_typeid = o.key
            }
          })
        }
        this.findAll()
      })
      post('/dictionary/findMapV1', { dicno: 'roll_material' }).then(res => {
        this.option_2 = res.data //材质
      })
    },
    // 重置事件
    resetForm1() {
      this.searchInfo5 = {}
      this.findAll()
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    },
    find_data() {
      this.pageIndex = 1
      this.findAll()
    },
    findAll() {
      post('/rollInformation/findPairedByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo5
      }).then(res => {
        this.tableData = res.data
        this.total = res.count
      })
    },
    handleEditState(data) {
      this.formLabelAlignChange = data
      this.dialogVisibleChange = true
    },
    submitChange() {
      if (this.formLabelAlignChange) {
        post('rollInformation/update', {
          rollInformation: this.formLabelAlignChange
        }).then(res => {
          if (res) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.findAll()
          }
        })
        this.dialogVisibleChange = false
      } else {
        alert('请按照要求输入')
      }
    }
  }
}
</script>

<style>
</style>
