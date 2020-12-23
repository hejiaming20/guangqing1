<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :table-height="'calc(100vh - 195px)'"
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
              :model="condition"
              :inline="true"
              class="search-info"
              label-width="80px">
              <el-form-item
                label="部件名称"
                prop="sname">
                <el-input v-model="condition.sname" />
              </el-form-item>
              <el-form-item
                label="部件编号"
                prop="sno">
                <el-input v-model="condition.sno" />
              </el-form-item>
              <el-form-item
                label="部件类型"
                prop="itype">
                <el-select
                  v-model="condition.itype"
                  placeholder="请选择">
                  <el-option
                    v-for="(item, index) in typeArray"
                    :key="index"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col
            :span="4">
            <div class="btn">
              <el-button
                size="mini"
                type="primary"
                @click="findSearch">查询</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="remove('ruleForm')">重置</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="showAdd">新增</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          prop="sname"
          align="center"
          width="90px"
          label="部件名称"/>
        <el-table-column
          prop="sno"
          align="center"
          width="90px"
          label="部件编号"/>
        <el-table-column
          show-overflow-tooltip
          prop="stype"
          align="center"
          width="100px"
          label="部件类型"/>
        <!-- <el-table-column
          prop="production_line"
          align="center"
          width="70px"
          label="产线"/> -->
        <el-table-column
          show-overflow-tooltip

          prop="roll_type"
          width="130px"
          align="center"
          label="轧辊类型"/>
        <el-table-column
          prop="frame_no"
          align="center"
          width="80px"
          label="机架号"/>
        <!-- <el-table-column
          prop="install_location"
          align="center"
          width="90px"
          label="安装位置"/> -->
        <el-table-column
          prop="up_location"
          align="center"
          width="90px"
          label="上机位置"/>
        <el-table-column
          prop="days"
          width="130px"
          align="center"
          label="提前提醒天数"/>
        <el-table-column
          prop="cycle"
          align="center"
          width="70px"
          label="周期"/>
        <el-table-column
          show-overflow-tooltip
          prop="unit"
          align="center"
          width="90px"
          label="周期单位"/>
        <el-table-column
          show-overflow-tooltip
          prop="pre_time"
          width="150px"
          align="center"
          label="开始执行时间"/>
        <el-table-column
          show-overflow-tooltip
          prop="next_time"
          width="150px"
          align="center"
          label="下一次执行日期"/>
        <!-- <el-table-column
          prop="get_user"
          align="center"
          width="90px"
          label="接收人"/>
        <el-table-column
          prop="get_group"
          align="center"
          width="100px"
          label="接受组名称"/> -->
        <el-table-column
          prop="snote"
          align="center"
          label="备注"/>
        <el-table-column
          label="操作"
          width="150"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="handleEdit(scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelect(scope.row.indocno)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </Table-easy>

    <!-- 添加/编辑 -->
    <el-dialog
      :visible.sync="dialogAdd"
      :title="dialogName"
      class="layout-dialog"
      width="80%">
      <div class="layout-search">
        <el-row>
          <el-form
            ref="addForm"
            :rules="rules"
            :model="addData"
            label-width="120px">
            <el-row>
              <el-col :span="6">
                <el-form-item
                  label="部件名称"
                  prop="sname">
                  <el-input v-model="addData.sname" />
                </el-form-item>
                <el-form-item
                  label="轧辊类型"
                  prop="roll_typeid">
                  <el-select
                    v-model="addData.roll_typeid"
                    placeholder="请选择"
                    clearable
                    @change="handleRollTypeChange">
                    <el-option
                      v-for="item in rollTypeArray"
                      :key="item.key"
                      :label="item.value"
                      :value="Number(item.key)"/>
                  </el-select>
                  <!-- <el-input v-model="addData.roll_typeid" /> -->
                </el-form-item>
                <el-form-item
                  label="开始执行时间"
                  prop="pre_time">
                  <el-date-picker
                    v-model="addData.pre_time"
                    type="date"
                    value-format="yyyy-MM-dd"
                    clearable
                    placeholder="选择日期"/>
                    <!-- <el-input v-model="addData.pre_time" /> -->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="部件编号"
                  prop="sno">
                  <el-input v-model="addData.sno" />
                </el-form-item>
                <el-form-item
                  label="机架号"
                  prop="frame_noid">
                  <el-select
                    v-model="addData.frame_noid"
                    clearable
                    placeholder="请选择"
                    @change="handleFrameChange">
                    <el-option
                      v-for="item in frameArray"
                      :key="item.key"
                      :label="item.value"
                      :value="Number(item.key)"/>
                  </el-select>
                  <!-- <el-input v-model="addData.frame_no" /> -->
                </el-form-item>
                <!-- <el-form-item
                  label="提醒内容"
                  prop="news">
                  <el-input v-model="addData.news" />
                </el-form-item> -->
                <el-form-item
                  label="下一次执行时间"
                  prop="next_time">
                  <el-date-picker
                    v-model="addData.next_time"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"/>
                    <!-- <el-input v-model="addData.next_time" /> -->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="部件类型"
                  prop="itype">
                  <el-select
                    v-model="addData.itype"
                    clearable
                    placeholder="请选择"
                    @change="handleIChange">
                    <el-option
                      v-for="item in typeArray"
                      :key="item.key"
                      :label="item.value"
                      :value="Number(item.key)"/>
                  </el-select>
                  <!-- <el-input v-model="addData.itype" /> -->
                </el-form-item>
                <!-- <el-form-item
                  label="安装位置"
                  prop="install_location_id">
                  <el-select
                    v-model="addData.install_location_id"
                    clearable
                    placeholder="请选择"
                    @change="handleInstallChange">
                    <el-option
                      v-for="item in installArray"
                      :key="item.key"
                      :label="item.value"
                      :value="Number(item.key)"/>
                  </el-select>
                </el-form-item> -->
                <!-- <el-input v-model="addData.install_location_id" /> -->
                <el-form-item
                  label="周期"
                  prop="cycle">
                  <el-input v-model="addData.cycle" />
                </el-form-item>
                <el-form-item
                  label="提醒内容"
                  prop="flow_no ">
                  <el-select
                    v-model="addData.flow_no "
                    clearable
                    placeholder="请选择">
                    <el-option
                      v-for="item in people"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"/>
                  </el-select>
                  <!-- <el-input v-model="addData.get_userid" /> -->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <!-- <el-form-item
                  label="产线"
                  prop="production_line_id">
                  <el-select
                    v-model="addData.production_line_id"
                    clearable
                    placeholder="请选择"
                    @change="handleLineChange">
                    <el-option
                      v-for="item in lineArray"
                      :key="item.key"
                      :label="item.value"
                      :value="Number(item.key)"/>
                  </el-select>
                </el-form-item> -->
                <el-form-item
                  label="上机位置"
                  prop="up_location_id">
                  <el-select
                    v-model="addData.up_location_id"
                    clearable
                    placeholder="请选择"
                    @change="handleUpChange">
                    <el-option
                      v-for="item in upArray"
                      :key="item.key"
                      :label="item.value"
                      :value="Number(item.key)"/>
                  </el-select>
                  <!-- <el-input v-model="addData.up_location_id" /> -->
                </el-form-item>
                <el-form-item
                  label="周期单位"
                  prop="unit">
                  <el-select
                    v-model="addData.unit"
                    clearable
                    placeholder="请选择">
                    <el-option
                      v-for="item in unitArray"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"/>
                  </el-select>
                  <!-- <el-input v-model="addData.unit" /> -->
                </el-form-item>
                <el-form-item
                  label="提前提醒天数"
                  prop="days">
                  <el-input v-model="addData.days" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item
              label="备注"
              prop="chock_no">
              <el-input
                v-model="addData.snote"
                type="textarea"/>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          size="small"
          @click="dialogAdd= false">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="submit('addForm')">确 定</el-button>
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
      rules: {
        sname: [{ required: true, message: '请输入部件名称', trigger: 'blur' }],
        cycle: [{ required: true, message: '请输入周期', trigger: 'blur' }],
        sno: [{ required: true, message: '请输入部件编号', trigger: 'blur' }],

        next_time: [
          { required: true, message: '请选择下一次执行时间', trigger: 'blur' }
        ],
        days: [{ required: true, message: '请输入提醒天数', trigger: 'blur' }],
        pre_time: [
          { required: true, message: '请选择开始执行时间', trigger: 'blur' }
        ]
      },
      tableData: [], //主表
      addData: {}, //新增/编辑
      total: 0,
      pageIndex: 1,
      pageSize: 30,
      condition: {
        sname: '', //部件名称
        itype: '', //部件类型id
        stype: '', // 部件类型
        sno: '' //部件编号
      },
      dialogAdd: false,
      dialogName: '', //弹窗title
      typeArray: [], // 部件类型
      rollTypeArray: [], // 轧辊类型
      frameArray: [], // 机架号
      // installArray: [], // 安装位置
      // lineArray: [], // 产线
      upArray: [],
      unitArray: [],
      people: [],
      group: [],
      dialogFlag: false
    }
  },
  mounted() {
    this.findAll()
    getDataConfig('equip_type').then(res => {
      this.typeArray = res // 部件类型
    })
    getDataConfig('rolltype').then(res => {
      this.rollTypeArray = res // 轧辊类型
    })
    getDataConfig('frameteam').then(res => {
      this.frameArray = res // 机架号
    })
    getDataConfig('installlocation').then(res => {
      this.installArray = res // 安装位置
    })
    getDataConfig('proline').then(res => {
      this.lineArray = res // 产线
    })
    getDataConfig('uplocation').then(res => {
      this.upArray = res // 上级位置
    })
    getDataConfig('datetime').then(res => {
      this.unitArray = res // 周期单位
    })
    post('/cycleRemind/findMap', {}).then(res => {
      this.people = res.data
    })
    post('common/findMap', {
      tablename: 'roll_group',
      key: 'indocno',
      value: 'group_name'
    }).then(res => {
      this.group = res.data
    })
  },
  methods: {
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
    handleRollTypeChange() {
      this.rollTypeArray.forEach(item => {
        if (item.key == this.addData.roll_typeid) {
          this.addData.roll_type = item.value
        }
      })
    },
    handleFrameChange() {
      this.frameArray.forEach(item => {
        if (item.key == this.addData.frame_noid) {
          this.addData.frame_no = item.value
        }
      })
    },
    handleIChange() {
      this.typeArray.forEach(item => {
        if (item.key == this.addData.itype) {
          this.addData.stype = item.value
        }
      })
    },
    handleInstallChange() {
      this.installArray.forEach(item => {
        if (item.key == this.addData.install_location_id) {
          this.addData.install_location = item.value
        }
      })
    },
    /* handleUserChange() {
      this.people.forEach(item => {
        if (item.key == this.addData.get_userid) {
          this.addData.get_user = item.value
        }
      })
    },*/
    handleLineChange() {
      this.lineArray.forEach(item => {
        if (item.key == this.addData.production_line_id) {
          this.addData.production_line = item.value
        }
      })
    },
    handleUpChange() {
      this.upArray.forEach(item => {
        if (item.key == this.addData.up_location_id) {
          this.addData.up_location = item.value
        }
      })
    },
    handleGroupChange() {
      this.group.forEach(item => {
        if (item.key == this.addData.get_groupid) {
          this.addData.get_group = item.value
        }
      })
    },
    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },
    findAll() {
      post('/cycleRemind/findByPage', {
        pageIndex: this.pageIndex, //第几页
        pageSize: this.pageSize, //每页多少条
        condition: this.condition
      }).then(res => {
        res.data.forEach((val, index, arr) => {
          val.unit =
            val.unit == 1
              ? '年'
              : val.unit == 2
                ? '月'
                : val.unit == 3
                  ? '日'
                  : 'null'
        })
        this.tableData = res.data
        // console.log('============')
        // console.log(this.tableData.unit)
        this.total = res.count
        // console.log('res', res)
      })
    },
    //新增
    showAdd() {
      this.dialogName = '新增'
      this.addData = {
        sname: '',
        sno: '',
        itype: '',
        stype: '',
        up_location_id: '',
        up_location: '',
        roll_typeid: '',
        roll_type: '',
        frame_noid: '',
        frame_no: '',
        cycle: '',
        unit: '',
        pre_time: '',
        next_time: '',
        flow_no: '',
        days: ''
      }
      this.dialogAdd = true
      this.dialogFlag = true
    },
    // 添加、编辑确定按钮
    submit(formName) {
      if (this.dialogFlag) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let res = post('/cycleRemind/insert', {
              cycleRemind: this.addData
            }).then(res => {
              if (res.status == 2000) {
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
                this.findAll()
              } else {
                this.$message('添加失败')
              }
            })

            this.dialogAdd = false
          } else {
            alert('请按照要求输入')
          }
        })
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let res = post('/cycleRemind/update', {
              cycleRemind: this.addData
            }).then(res => {
              if (res.status == 2000) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.findAll()
              } else {
                this.$message('修改失败')
              }
            })
            this.dialogAdd = false
          } else {
            alert('请按照要求输入')
          }
        })
      }
    },
    //删除
    handleDelect(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('/cycleRemind/deleteOne', {
            indocno: row
          }).then(res => {
            if (res.status == 2000) {
              this.$message({
                type: 'success',
                message: '删除成功！'
              })
            } else {
              this.$message('删除失败！')
            }
            this.findAll()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑
    handleEdit(val) {
      this.dialogName = '编辑'
      this.dialogFlag = false
      this.addData = Object.assign(val)
      // console.log('val=============', val)
      this.dialogAdd = true
    },
    // 重置按钮
    remove(formName) {
      // this.$refs[formName].resetFields()
      this.condition = {}
      this.findSearch()
    }
  }
}
</script>

<style>
</style>
