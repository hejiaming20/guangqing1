<!--安全库存导出-->
<template>
  <div>
    <div style="color:greenyellow;margin-top: 5px;margin-bottom: 5px; padding-top: 4px;padding-bottom: 4px ; padding-left: 25px;width: 100%;background-color: #253F80;font-size: 14px;height:40px;overflow-y: auto ">
      说明：理论值=结存 - 季度消耗 - 安全库存+140
    </div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :table-height="400"
      :page-size="pageSize"
      :current-page="pageIndex"
      :is-pagination-show="false"
      index-type="index"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <template slot="TableHead">
        <el-row>
          <el-col :span="20">
            <el-form
              ref="ruleForm"
              :model="searchInfo"
              :inline="true"
              label-width="100px">
              <el-form-item
                label="轧辊材质"
                prop="material_id">
                <el-select
                  v-model="searchInfo.material_id"
                  clearable
                  placeholder="轧辊材质">
                  <el-option
                    v-for="item in materialArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="轧辊类型"
                prop="roll_typeid">
                <el-select
                  v-model="searchInfo.roll_typeid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in typeoptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="机架范围"
                prop="framerangeid">
                <el-select
                  v-model="searchInfo.framerangeid"
                  clearable
                  placeholder="请选择">
                  <el-option
                    v-for="item in frameFwArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="开始时间"
                prop="dbegin">
                <el-date-picker
                  ref="userTime"
                  v-model="searchInfo.dbegin"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="开始时间"/>
              </el-form-item>
              <!--<el-form-item
                label="磨床号"
                prop="inventory_stateid">
                <el-select
                  v-model="searchInfo.inventory_stateid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in kcoptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
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
                type="primary"
                size="mini"
                @click="hand_exe">导出全部
              </el-button>
              <!-- <el-button
            size="mini"
            type="primary"
            @click="open_add_1(true)">添加(磨床)</el-button>-->
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          prop="roll_type"
          label="轧辊类型"/>
        <el-table-column
          prop="material"
          label="材质"/>
        <el-table-column
          prop="framerange"
          label="机架范围"/>
        <el-table-column
          prop="d_inventory"
          label="季度消耗(mm)"/>
        <el-table-column
          prop="safe_inventory"
          label="安全库存(mm)"/>
        <el-table-column
          prop="s_inventory"
          label="结存(mm)"/>
        <el-table-column
          prop="purchasing_cycle"
          label="采购周期(月)"/>
        <el-table-column
          prop="effective_value"
          label="理论值mm"/>
      </template>
    </Table-easy>
  </div>
</template>

<script>
import { get, post, getDataConfig, exportMethod } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
import moment from 'moment'
export default {
  components: { TableEasy },
  data() {
    return {
      searchInfo: {
        framerangeid: '',
        material_id: '',
        roll_typeid: ''
      },
      rules: {
        roll_no: [{ required: true, message: '请输入辊号', trigger: 'blur' }],
        production_line: [
          { required: true, message: '请输入产线', trigger: 'change' }
        ],
        roll_type: [
          { required: true, message: '请输入轧辊类型', trigger: 'change' }
        ],
        grind_starttime: [
          {
            required: true,
            message: '车削开始时间',
            trigger: 'change'
          }
        ],
        grind_endtime: [
          { required: true, message: '车削结束时间', trigger: 'change' }
        ],
        before_diameter: [
          { required: true, message: '请输入车前直径（数字)', trigger: 'blur' }
        ],
        after_diameter: [
          { required: true, message: '请输入车后直径（数字)', trigger: 'blur' }
        ],
        /* sgroup: [{ required: true, message: '班组', trigger: 'blur' }],*/
        sclass: [{ required: true, message: '班', trigger: 'blur' }]
      },
      typeoptions: [],
      kcoptions: [],
      formLabelAlign: {},
      tableData: [{}],
      total: 0,
      dialogVisible: false,
      formFlag: true, // true 添加 false 编辑
      pageIndex: 1,
      pageSize: 100,
      dialogTitle: '',
      materialArray: [],
      factoryArray: [],
      frameFwArray: [],
      rowIndex: null,
      tableData_1: []
    }
  },
  mounted() {
    this.searchInfo.dbegin = moment()
      .subtract(30, 'days')
      .format('YYYY-MM-DD HH:mm:ss')
    this.findAll()
    getDataConfig('framefw').then(res => {
      this.frameFwArray = res
    })
    post('/dictionary/findMapV1', { dicno: 'rolltype', level: 3 }).then(res => {
      this.typeoptions = res.data
    })
    post('/dictionary/findMapV1', { dicno: 'rollstate', level: 3 }).then(
      res => {
        this.kcoptions = res.data
      }
    )
    getDataConfig('roll_material').then(res => {
      this.materialArray = res
    })
    post('/dictionary/findMapV1', { dicno: 'roll_factory' }).then(res => {
      this.factoryArray = res.data //制造厂商
    })
  },
  methods: {
    async hand_exe() {
      let data = {
        method: 'get',
        url:
          // 'http://192.168.43.57:8778/api/rollStiffness/excel?dbegin=' +
          location.origin +
          '/api/baseRollSafetyReminder/excelBaseRollSafetyReminder?dbegin=' +
          this.searchInfo.dbegin +
          '&roll_typeid=' +
          this.searchInfo.roll_typeid +
          '&material_id=' +
          this.searchInfo.material_id +
          '&framerangeid=' +
          this.searchInfo.framerangeid
      }
      await exportMethod(data)
      // get(
      //   'rollStiffness/excel?dbegin=' +
      //     this.searchInfo.dbegin +
      //     '&dend=' +
      //     this.searchInfo.dend +
      //     '&production_line_id=' +
      //     this.searchInfo.production_line_id
      // ).then(res => {
      //   exportMethod(res)
      // })
    },
    handleFrameScopeChange() {
      this.frameFwArray.forEach(item => {
        if (item.key == this.formLabelAlign.framerangeid) {
          this.formLabelAlign.framerange = item.value
        }
      })
    },
    handleMaterChange() {
      this.materialArray.forEach(item => {
        if (item.key == this.formLabelAlign.material_id) {
          this.formLabelAlign.material = item.value
        }
      })
    },
    production_line_id_change(vId) {
      let obj = {}
      obj = this.option1.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign.production_line = item.value
          this.formLabelAlign.production_line_id = item.key
        }
      })
    },
    handleroll_typeChange() {
      this.typeoptions.forEach(item => {
        if (item.value == this.formLabelAlign.roll_type) {
          this.formLabelAlign.roll_typeid = item.key
        }
      })
    },

    handleinventory_stateChange() {
      this.kcoptions.forEach(item => {
        if (item.value == this.formLabelAlign.inventory_state) {
          this.formLabelAlign.inventory_stateid = item.key
        }
      })
    },
    handleFactoryChange() {
      this.factoryArray.forEach(item => {
        if (item.key == this.formLabelAlign.factory_id) {
          this.formLabelAlign.factory = item.value
        }
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
    findAll() {
      post('/baseRollSafetyReminder/findBaseRollSafetyReminder', {
        pageIndex: 1,
        pageSize: 100,
        condition: this.searchInfo
      }).then(res => {
        this.tableData = res.data
        this.total = res.count
      })
    },
    resetDialogForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
    },

    /**
     * description: 重置按钮
     */
    resetForm(formName) {
      this.searchInfo = {}
      this.findAll()
    }
  }
}
</script>

<style>
</style>
