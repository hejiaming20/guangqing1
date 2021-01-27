<!--
 * @Author: ming
 * @Date: 2020-08-17
 * @LastEditTime: 2020-11-28 10:59:44
 * @LastEditors: Please set LastEditors
 * @Description: 在役轴承座综合台账  未改完
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\inforConTrolSys/Bearmanagement/CS001
-->
<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :page-size="pageSize"
      :table-height="750"
      :current-page="pageIndex"
      :cell-class-name="setCellStyle"
      index-type="index"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <!-- 头页面 -->
      <template slot="TableHead">
        <el-row>
          <el-col :span="21">
            <el-form
              ref="ruleForm"
              :inline="true"
              :model="searchquery"
              class="search-info"
              label-width="60px">
              <!-- <el-form-item
                label="轴承座状态"
                label-width="90"
                prop="istatus">
                <el-select
                  v-model="searchquery.istatus"
                  placeholder="请选择">
                  <el-option
                    v-for="item in option3"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>-->
              <el-form-item
                label="轴承座号"
                label-width="80"
                prop="chock_no">
                <el-input v-model="searchquery.chock_no" />
              </el-form-item>
              <el-form-item
                label="密封件号"
                label-width="80"
                prop="bearing_no">
                <el-input v-model="searchquery.bearing_no" />
              </el-form-item>
              <!--<el-form-item
                label="轧辊类型"
                label-width="80"
                prop="roll_typeid">
                <el-select
                  v-model="searchquery.roll_typeid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in option2"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>-->
              <!--<el-form-item
                label="机架号"
                prop="frame_noid">
                <el-select
                  v-model="searchquery.frame_noid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in option"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>-->
            </el-form>
          </el-col>
          <el-col :span="3">
            <div class="btn">
              <el-button
                size="mini"
                type="primary"
                @click="find_data()">查询</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="resetForm('ruleForm')">重置</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="add_right()">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
      <!-- 页面 -->
      <template slot="TableBody">
        <el-table-column
          label="轴承座号"
          prop="chock_no" />
        <el-table-column
          label="密封件号"
          prop="bearing_no" />
        <el-table-column
          label="密封件名称"
          prop="bearing_name" />
        <el-table-column
          label="密封件种类"
          prop="seals_name" />
        <el-table-column
          width="170"
          label="开始时间"
          prop="usetime" />
        <el-table-column
          label="单次累计时间(d)"
          prop="single_times" />
        <el-table-column
          label="间隔时间(d)"
          prop="interval_times" />
        <el-table-column
          label="提醒处理次数"
          prop="reminder_times" />
        <el-table-column
          label="总累计时间(d)"
          prop="total_times" />
        <el-table-column
          label="报废提醒时间(d)"
          prop="discard_times" />
        <el-table-column
          label="报废时间"
          prop="discard_time" />
        <el-table-column
          label="操作"
          min-width="300"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click.stop="handleEdit_right(scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="warning"
              @click.stop="baofei_right(scope.row)">报废</el-button>
            <el-button
              size="mini"
              type="warning"
              @click.stop="baofei_right_off(scope.row)">取消报废</el-button>
            <el-button
              size="mini"
              type="warning"
              @click.stop="kong_right(scope.row)">单次提醒置空</el-button>
              <!-- <el-button
          size="mini"
          type="danger"
          @click.stop="handleDelete(scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
      </template>
    </Table-easy>
    <!-- 密封件添加修改 -->
    <el-dialog
      :visible.sync="dialogVisible_right"
      :title="title_right"
      class="layout-dialog"
      width="80%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlign_right"
          label-width="120px">
          <el-row>
            <el-col :span="8">
              <!--<el-form-item
                label="轴承座号"
                prop="chock_no">
                <el-input v-model="formLabelAlign_right.chock_no" />
              </el-form-item>-->
              <el-form-item
                label="密封件号"
                prop="bearing_no">
                <el-input v-model="formLabelAlign_right.bearing_no" />
              </el-form-item>
              <el-form-item
                label="密封件名称"
                prop="bearing_name">
                <el-input v-model="formLabelAlign_right.bearing_name" />
              </el-form-item>
              <el-form-item
                label="厂家"
                prop="install_location_id">
                <el-select
                  v-model="formLabelAlign_right.factory_name"
                  placeholder="请选择"
                  @change="istatus_change">
                  <el-option
                    v-for="item in option3"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="密封种类"
                prop="seals_name">
                <el-select
                  v-model="formLabelAlign_right.seals_name"
                  placeholder="请选择"
                  @change="mifengzhong_change">
                  <el-option
                    v-for="item in option6"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!-- <el-form-item
                label="上机位置"
                prop="up_location">
                <el-input v-model="formLabelAlign_left.up_location" />
              </el-form-item>-->
              <el-form-item
                label="间隔时间(d)"
                prop="interval_times">
                <el-input v-model="formLabelAlign_right.interval_times" />
              </el-form-item>
              <el-form-item
                label="报废提醒时间(d)"
                prop="discard_times">
                <el-input v-model="formLabelAlign_right.discard_times" />
              </el-form-item>
              <!-- <el-form-item
                label="密封件类型"
                prop="bearing_type">
                <el-input v-model="formLabelAlign_right.bearing_type" />
              </el-form-item>-->
              <el-form-item
                label="第一次投用时间"
                prop="usetime">
                <el-date-picker
                  v-model="formLabelAlign_right.usetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="投用时间"/>
              </el-form-item>
              <!-- <el-form-item
                label="报废时间"
                prop="scraptime">
                <el-date-picker
                  v-model="formLabelAlign_left.scraptime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="报废时间"/>
              </el-form-item>-->
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
          @click="dialogVisible_right = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleSave_right">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import TableEasy from '@/components/TasilyTableEasy'
import find_data from '@/api/warehouse.js'
import { get, post } from '@/lib/Util'
export default {
  components: {
    TableEasy
  },
  data() {
    return {
      checkPartList: [],
      checkTypeModels: [],
      tableData: [],
      total: 0,
      tableData1: [], //弹窗表左
      tableData2: [], //弹窗表右
      total1: 0,
      pageIndex: 1,
      pageSize: 10,
      searchchock_no: {},
      searchquery: {
        // chock_no: '', //轴承座号
        roll_no: '' //辊号
        /*   roll_typeid: '1', //轧辊类型id
            production_line_id: '1', //产线id 2250
            frame_noid: '1', //机架号id  F1
            frame_no: '', //机架号
            istatus: '1' //轴承座状态id  在使用*/
      },
      formLabelAlign: {
        /* roll_typeid: 1, //轧辊类型id  默认为1
            production_line_id: 1, //产线id
            frame_noid: 1, //机架号id
            install_location_id: 1, //安装位置id
            up_location_id: 1, //上机位置id*/
        // istatus: 1 //轴承座状态id
      },
      formLabelAlign1: {},
      checkRollType: [
        {
          label: '支撑辊',
          value: 'BUR'
        },
        {
          label: '中间辊',
          value: 'IMR'
        }
      ],
      option: [],
      option1: [],
      option2: [],
      option3: [],
      option4: [],
      option5: [],
      option6: [],
      dialogVisible: false,
      dialogVisible1: false,
      disUpdateVisible: false,
      dialogVisible_left: false,
      dialogVisible_right: false,
      formLabelAlign_left: {},
      formLabelAlign_right: {},
      disable: false,
      rowIndex: null,
      title_left: '',
      chioce_left: true,
      title_right: '',
      chioce_right: true,
      chock_no_1: ''
    }
  },
  mounted() {
    post('/dictionary/findMapV1', { dicno: 'frameteam' }).then(res => {
      this.option = res.data //机架（直接使用）
    })
    post('/dictionary/findMapV1', { dicno: 'mifeng_all' }).then(res => {
      this.option6 = res.data //密封件种类
    })
    post('/dictionary/findMapV1', { dicno: 'rolltype' }).then(res => {
      this.option2 = res.data //轧辊类型（直接使用）
    })
    post('/dictionary/findMapV1', { dicno: 'bearing_m' }).then(res => {
      this.option3 = res.data //密封件厂家（直接使用）
    })

    post('/dictionary/findMapV1', { dicno: 'installlocation' }).then(res => {
      this.option4 = res.data //安装位置（直接使用）
    })
    post('/dictionary/findMapV1', { dicno: 'uplocation' }).then(res => {
      this.option5 = res.data //上机位置座状态（直接使用）
    })

    this.findAll()
  },
  methods: {
    //单元格变红
    setCellStyle({ row, column }) {
      if (
        row.single_times > row.interval_times &&
        column.label == '单次累计时间(d)'
      ) {
        return 'setClassname'
      }
    },
    mifengzhong_change(vId) {
      let obj = {}
      obj = this.option6.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign_right.seals_name = item.value
          this.formLabelAlign_right.seals_type = item.key
        }
      })
    },
    istatus_change(vId) {
      let obj = {}
      obj = this.option3.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign.factory_name = item.value
          this.formLabelAlign.factory_id = item.key
        }
      })
    },

    frame_noid_change(vId) {
      let obj = {}
      obj = this.option.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.key == vId) {
          this.formLabelAlign.frame_no = item.value
          this.formLabelAlign.frame_noid = item.key
        }
      })
    },
    production_line_id_change(vId) {
      let obj = {}
      obj = this.option1.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.key == vId) {
          this.formLabelAlign.production_line = item.value
          this.formLabelAlign.production_line_id = item.key
        }
      })
    },
    roll_typeid_change(vId) {
      let obj = {}
      obj = this.option2.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.key == vId) {
          this.formLabelAlign.roll_type = item.value
          this.formLabelAlign.roll_typeid = item.key
        }
      })
    },

    install_location_id_change(vId) {
      let obj = {}
      obj = this.option4.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.key == vId) {
          this.formLabelAlign.install_location = item.value
          this.formLabelAlign.install_location_id = item.key
        }
      })
    },
    up_location_id_change(vId) {
      let obj = {}
      obj = this.option5.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.key == vId) {
          this.formLabelAlign.up_location = item.value
          this.formLabelAlign.up_location_id = item.key
        }
      })
    },

    //第二波
    istatus_change1(vId) {
      let obj = {}
      obj = this.option3.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign1.status = item.value
          this.formLabelAlign1.istatus = item.key
        }
      })
    },

    frame_noid_change1(vId) {
      let obj = {}
      obj = this.option.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign1.frame_no = item.value
          this.formLabelAlign1.frame_noid = item.key
        }
      })
    },
    production_line_id_change1(vId) {
      let obj = {}
      obj = this.option1.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign1.production_line = item.value
          console.log(this.formLabelAlign1.production_line)
          this.formLabelAlign1.production_line_id = item.key
        }
      })
    },
    roll_typeid_change1(vId) {
      let obj = {}
      obj = this.option2.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign1.roll_type = item.value
          this.formLabelAlign1.roll_typeid = item.key
        }
      })
    },
    install_location_id_change1(vId) {
      let obj = {}
      obj = this.option4.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign1.install_location = item.value
          this.formLabelAlign1.install_location_id = item.key
        }
      })
    },
    up_location_id_change1(vId) {
      let obj = {}
      obj = this.option5.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == vId) {
          this.formLabelAlign1.up_location = item.value
          this.formLabelAlign1.up_location_id = item.key
        }
      })
    },
    find_data() {
      this.pageIndex = 1
      this.findAll()
    },
    async findAll() {
      this.searchquery.bearing_type = 2 //2为密封件1为轴承，
      // console.log(this.searchquery.frame_no)
      let res = await post('baseBearing/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchquery
      })
      console.log('查询全部', res)
      this.tableData = res.data
      this.total = res.count
    },
    //子项左边
    add_left() {
      this.formLabelAlign_left = {}
      this.formLabelAlign_left.chock_no = this.chock_no_1
      this.dialogVisible_left = true
      this.chioce_left = true
      this.title_left = '添加'
    },
    handleEdit_left(data) {
      this.formLabelAlign_left = data
      this.dialogVisible_left = true
      this.chioce_left = false
      this.title_left = '修改'
    },
    handleSave_left() {
      this.dialogVisible_left = false
      this.formLabelAlign_left.bearing_type = 1
      if (this.chioce_left) {
        post('baseBearing/insert', {
          BaseBearing: this.formLabelAlign_left
        }).then(res => {
          // this.tableData1 = res
          this.findAll()
        })
      } else {
        post('baseBearing/update', {
          BaseBearing: this.formLabelAlign_left
        }).then(res => {
          this.findAll()
          // this.tableData1 = res
        })
      }
    },
    find_left() {
      post('baseBearing/findByPage', {
        pageIndex: 1,
        pageSize: 20,
        condition: {
          chock_no: this.chock_no_1,
          bearing_type: 1, //2为密封件1为轴承，
          ifdiscard: 0
        }
      }).then(res => {
        this.tableData1 = res.data
        this.total = res.count
      })
    },
    //子项右边
    add_right() {
      this.formLabelAlign_right = {
        single_times: 0, //单次提醒时间
        reminder_times: 0, //提醒处理次数
        total_times: 0, //总累计时间
        bearing_type: 2
      }
      this.formLabelAlign_right.chock_no = this.chock_no_1
      this.dialogVisible_right = true
      this.chioce_right = true
      this.title_right = '添加'
    },
    handleEdit_right(data) {
      this.formLabelAlign_right = data
      this.dialogVisible_right = true
      this.chioce_right = false
      this.title_right = '修改'
    },
    handleSave_right() {
      this.dialogVisible_right = false
      this.formLabelAlign_right.bearing_type = 2
      if (this.chioce_right) {
        post('baseBearing/insert', {
          BaseBearing: this.formLabelAlign_right
        }).then(res => {
          // this.tableData1 = res
          this.findAll()
        })
      } else {
        post('baseBearing/update', {
          BaseBearing: this.formLabelAlign_right
        }).then(res => {
          this.findAll()
          // this.tableData1 = res
        })
      }
    },
    baofei_right(data) {
      this.$confirm('此操作将报废该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('/baseBearing/updateDiscardTime', {
            indocno: data.indocno
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '报废成功!'
              })
              this.findAll()
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
    baofei_right_off(data) {
      this.$confirm('此操作将取消报废该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('baseChock/updateDiscardTimeCancel', {
            indocno: data.indocno
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '取消报废成功!'
              })
              this.findAll()
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
    kong_right(data) {
      this.$confirm('此操作将置空单次提醒该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('/baseBearing/updateSingleTimes', {
            indocno: data.indocno
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '报废成功!'
              })
              this.findAll()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消置空单次提醒'
          })
        })
    },
    find_right() {
      post('baseBearing/findByPage', {
        pageIndex: 1,
        pageSize: 20,
        condition: {
          chock_no: this.chock_no_1,
          bearing_type: 2, //2为密封件1为轴承
          ifdiscard: 0
        }
      }).then(res => {
        this.tableData2 = res.data
        this.total = res.count
      })
    },
    // 修改数据按钮
    handleEdit(data) {
      this.formLabelAlign1 = data
      this.dialogVisible1 = true
    },
    async handleEdit1(data) {
      console.log(this.formLabelAlign1)
      let res = await post('/baseChock/update', {
        baseChock: this.formLabelAlign1
      })
      this.dialogVisible1 = false
      this.findAll()
    },
    handleDelete(data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('/baseChock/deleteOne', { indocno: data.indocno }).then(res => {
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

    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    },
    /*dan击*/
    //主表关联查询子表承压件信息接口
    resetForm(formName) {
      this.searchquery = {}
      this.findAll()
      // this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
.main-title {
  margin-top: 10px;
  text-align: center;
  color: #eae8c5;
  padding: 3px 0;
  background-color: #253f80;
}
.setClassname {
  color: #d3ca1b !important;
  background-color: #8d0912 !important;
}
</style>
