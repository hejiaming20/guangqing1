<!--
 * @Author: your name
 * @Date: 2020-07-23 09:57:34
 * @LastEditTime: 2020-11-29 14:00:07
 * @LastEditors: Please set LastEditors
 * @Description: 轧辊配对管理
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\am.vue
-->
<template>
  <div>
    <div class="layout-default-margin">
      <Table-easy
        :table-data="tableData"
        :page-size="pageSize"
        :table-height="350"
        :total="total"
        @handle-current-change="handleCurrentChange"
        @handle-size-change="handleSizeChange">
        <template slot="TableHead">
          <el-row>
            <el-col :span="21">
              <el-form
                ref="ruleForm"
                :inline="true"
                :model="searchInfo">
                <el-form-item
                  label="辊号"
                  prop="roll_no">
                  <el-input v-model="searchInfo.roll_no" />
                </el-form-item>
                <el-form-item
                  label="轧辊类型"
                  prop="roll_typeid">
                  <el-select
                    v-model="searchInfo.roll_typeid"
                    placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="供货商"
                  prop="factory">
                  <el-input v-model="searchInfo.factory"/>
                </el-form-item>
                <el-form-item
                  label="轧辊材质"
                  prop="material_id">
                  <el-select
                    v-model="searchInfo.material_id"
                    placeholder="请选择">
                    <el-option
                      v-for="item in option_2"
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
                    placeholder="请选择">
                    <el-option
                      v-for="item in option_1"
                      :key="item.key"
                      :label="item.value"
                      :value="Number(item.key)"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="轧辊库存状态"
                  prop="roll_state">
                  <el-select
                    v-model="searchInfo.roll_state"
                    placeholder="请选择">
                    <el-option
                      v-for="item in option_3"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"/>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="3">
              <div class="btn">
                <el-button
                  size="mini"
                  type="primary"
                  @click="findAll()">查询
                </el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="resetForm('ruleForm')">重置
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
            label="制造厂商"
            prop="factory"/>
          <el-table-column
            prop="roll_type"
            label="轧辊类型"/>
          <el-table-column
            prop="rollshape"
            label="辊形"/>
          <el-table-column
            prop="framerange"
            label="机架范围"/>
          <el-table-column
            label="轧辊材质"
            width="170px"
            prop="material"/>
          <el-table-column
            prop="roll_position"
            label="上机位置"/>
          <el-table-column
            prop="currentdiameter"
            label="当前辊径"/>
          <!-- <el-table-column
            prop="roll_state_value"
            label="轧辊状态"/>-->
          <el-table-column
            prop="uplinecount"
            label="上机次数"/>
          <el-table-column
            label="操作"
            min-width="150"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="goUp(scope.row)">上辊
              </el-button>
              <el-button
                size="mini"
                type="primary"
                @click="goDown(scope.row)">下辊
              </el-button>
            </template>
          </el-table-column>
        </template>
      </Table-easy>
    </div>

    <div class="layout-search layout-block layout-default-margin">
      <!-- 上辊 -->
      <el-form
        ref="ruleFormUU"
        :model="rollpairU"
        label-width="80px">
        <el-row>
          <el-col :span="1">
            <el-form-item
              label="上辊："/>
          </el-col>
          <el-col :span="5">
            <el-form-item
              label="辊号"
              prop="roll_no">
              <el-input v-model="rollpairU.roll_no"/>
            </el-form-item>

          </el-col>
          <el-col :span="6">
            <el-form-item
              label="轧辊类型"
              prop="roll_type">
              <el-input v-model="rollpairU.roll_type"/>
            </el-form-item>

          </el-col>
          <el-col :span="6">
            <el-form-item
              label="轧辊材质"
              prop="material">
              <el-input v-model="rollpairU.material"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="当前辊径"
              prop="currentdiameter">
              <el-input v-model="rollpairU.currentdiameter"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 下辊 -->
      <el-form
        ref="ruleFormDD"
        :model="rollpairD"
        label-width="80px">
        <el-row>
          <el-col :span="1">
            <el-form-item
              label="下辊："/>
          </el-col>
          <el-col :span="5">
            <el-form-item
              label="辊号"
              prop="roll_no">
              <el-input v-model="rollpairD.roll_no" />
            </el-form-item>

          </el-col>
          <el-col :span="6">
            <el-form-item
              label="轧辊类型"
              prop="roll_type">
              <el-input v-model="rollpairD.roll_type"/>
            </el-form-item>

          </el-col>
          <el-col :span="6">
            <el-form-item
              label="轧辊材质"
              prop="material">
              <el-input v-model="rollpairD.material"/>
            </el-form-item>

          </el-col>
          <el-col :span="6">

            <el-form-item
              label="当前辊径"
              prop="currentdiameter">
              <el-input v-model="rollpairD.currentdiameter"/>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="pair layout-one-input">
          <el-select
            v-model="fame_value"
            placeholder="请选择使用机组"
            clearable
            @change="jiziCtrl"
          >
            <el-option
              v-for="item in jizu"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
          <el-button
            v-show="jizuBtnSH"
            type="primary"
            size="small"
            @click="searchinfo()">配对
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="ROLLresetForm()">重置
          </el-button>
        </div>
      </el-form>
    </div>

    <div>
      <template >
        <div class="layout-search">
          <div class="layout-search-header">查询区</div>
          <div class="layout-search-body">
            <el-row>
              <el-col :span="21">
                <el-form
                  ref="ruleForm"
                  :inline="true"
                  :model="searchInfo5"
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
          </div>
        </div>
        <div>
          <el-table
            :data="tableData1"
            :height="353"
            :span-method="objectSpanMethod"
            :row-class-name="tableRowClassName"
            border >
            <el-table-column
              label="操作"
              min-width="120"
              align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="warning"
                  @click="handleBf(scope.row)">拆解
                </el-button>
                <el-button
                  size="mini"
                  type="warning"
                  @click="chioce_faname(scope.row)">机架更换
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="framerange"
              label="机架范围"/>
            <el-table-column
              label="制造厂商"
              prop="factory"/>
            <el-table-column
              label="机架"
              prop="frame_no"/>
            <el-table-column
              prop="neck_diameter"
              label="径差"/>
            <el-table-column
              prop="roll_type"
              label="轧辊类型"/>
            <el-table-column
              prop="rollshape"
              width="170px"
              label="辊形"/>
            <el-table-column
              prop="roll_no"
              label="辊号"/>
            <el-table-column
              label="轧辊材质"
              width="170px"
              prop="material"/>
            <el-table-column
              prop="roll_position"
              label="上机位置"/>
            <el-table-column
              prop="currentdiameter"
              label="当前辊径"/>
            <!-- <el-table-column
              prop="roll_state"
              label="轧辊状态"/>-->
            <el-table-column
              prop="uplinecount"
              label="上机次数"/>
          </el-table>
        </div>
        <div
          class="pagination-border">
          <el-pagination
            :current-page="1"
            :page-sizes="[10, 20, 30]"
            :page-size="pageSize_1"
            :total="total_1"
            background
            class="u-pagination"
            layout="total, prev, pager, next, jumper"
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"/>
        </div>
      </template>
    </div>
    <el-dialog
      :visible.sync="dialogVisibleChange"
      title="机组"
      class="layout-dialog"
      width="40%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlignChange"
          label-position="top"
          label-width="140px">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item
                label="机架选择"
                prop="frame_no">
                <el-select
                  v-model="formLabelAlignChange.frame_no"
                  placeholder="请选择"
                  clearable
                  @change="handlefameChange">
                  <el-option
                    v-for="item in jizu"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
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
import { get, post } from '@/lib/Util'

export default {
  components: {
    TableEasy
  },
  data() {
    return {
      dialogVisibleChange: false,
      formLabelAlignChange: {},
      options: [],
      jizu: [],
      kucun: [],
      searchInfo: {
        ipaired: '',
        roll_state: '3'
      },
      searchInfo5: {},
      tableData: [],
      dialogVisible: false,
      jizuBtnSH: false,
      checkAll: false,
      columnsArray: [],
      cities: [],
      option_1: [],
      option_2: [],
      option_3: [
        {
          key: '2',
          value: '待使用新辊'
        },
        {
          key: '3',
          value: '周转轧辊'
        }
      ],
      fame_value: '',
      total: 0,
      rollpairU: {},
      rollpairD: {},
      pageIndex: 1,
      pageSize: 10,
      pageSize_1: 10,
      tableData1: [],
      total1: 0,
      total_1: 0
    }
  },
  mounted() {
    this.findAll()
    this.findOption()
    this.findKucun()
    this.findjizu()
    this.find_data()
    post('/dictionary/findMapV1', { dicno: 'framefw' }).then(res => {
      this.option_1 = res.data //机架范围
    })
    post('/dictionary/findMapV1', { dicno: 'roll_material' }).then(res => {
      this.option_2 = res.data //材质
    })
    /*post('/dictionary/finddicno', { dicno: 'rollstate03,rollstate04' }).then(
      res => {
        this.option_3 = res.data //轧辊库存状态
        console.log(res.data)
      }
    )*/
  },
  methods: {
    chioce_faname(data) {
      this.formLabelAlignChange = data
      this.formLabelAlignChange.roll_no_up = data.roll_no
      console.log(this.formLabelAlignChange)
      this.dialogVisibleChange = true
    },

    handlefameChange() {
      this.jizu.forEach(item => {
        if (item.value == this.formLabelAlignChange.frame_no) {
          this.formLabelAlignChange.frame_no = item.value
          this.formLabelAlignChange.frame_noid = item.key
        }
      })
    },
    submitChange() {
      post('rollPaired/updateByRollNo', {
        RollPaired: this.formLabelAlignChange
      }).then(res => {
        if (res) {
          this.$message({
            message: '修改机架成功',
            type: 'success'
          })
          this.find_data()
        }
      })
      this.dialogVisibleChange = false
    },
    tableRowClassName({ row, rowIndex }) {
      if (
        rowIndex === 0 ||
        rowIndex === 1 ||
        (rowIndex === 4 || rowIndex === 5) ||
        (rowIndex === 8 || rowIndex === 9)
      ) {
        return 'warning-row'
      } else if (
        rowIndex === 2 ||
        rowIndex === 3 ||
        (rowIndex === 6 || rowIndex === 7) ||
        (rowIndex === 10 || rowIndex === 11)
      ) {
        return 'success-row'
      }
      return ''
    },
    //不使用组件合并单元格
    objectSpanMethod(row) {
      if (
        row.columnIndex === 0 ||
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
    //拆解按钮
    handleBf(data) {
      // var roll_no_up = data.roll_no
      /*post('rollPaired/remove', {
        roll_no_up: data.roll_no
      }).then(res => {
        this.find_data()
      })*/
      this.$confirm('此操作将拆解该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('rollPaired/remove', {
            roll_no_up: data.roll_no
          }).then(res => {
            console.log('删除', res)
            if (res) {
              this.$message({
                type: 'success',
                message: '拆解成功!'
              })
              this.find_data()
              this.findAll()
            }
          })
          this.find_data()
          this.findAll()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消拆解'
          })
        })
    },

    find_data() {
      post('/rollInformation/findPairedByPage', {
        pageIndex: this.pageIndex,
        // pageIndex: 1,
        pageSize: 5, //不要改
        condition: this.searchInfo5
      }).then(res => {
        this.tableData1 = res.data
        this.total_1 = res.count
      })
    },

    //分页之对应页
    handleCurrentChange1(val) {
      this.pageIndex = val
      this.find_data()
    },
    //分页之一页多少条
    handleSizeChange1(val) {
      this.pageSize = val
      this.find_data()
    },
    //合并单元格
    hand_as(row, column, rowIndex, columnIndex) {
      console.log(row, column, rowIndex, columnIndex)

      if (columnIndex === 1) {
        if (rowIndex % 2 === 0) {
          return [2, 1]
        } else {
          return [0, 0]
        }
      }
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
    // 重制
    // resetForm(formName) {
    //   this.$refs[formName].resetFields()
    // },
    // 配对Btn
    async searchinfo() {
      /* console.log(
        this.jizu.key,
        this.fame_value,
        this.rollpairU.frame_no,
        this.rollpairU.frame_noid
      )*/
      var fame_value_ID =
        this.fame_value == 'F1'
          ? '1'
          : this.fame_value == 'F2'
            ? '2'
            : this.fame_value == 'F3'
              ? '3'
              : this.fame_value == 'F4'
                ? '4'
                : this.fame_value == 'F5'
                  ? '5'
                  : this.fame_value == 'F6'
                    ? '6'
                    : this.fame_value == 'F7'
                      ? '7'
                      : this.fame_value == 'F8'
                        ? '15'
                        : this.fame_value == 'R1'
                          ? '8'
                          : this.fame_value == 'R2'
                            ? '9'
                            : ''
      //console.log(fame_value_ID)
      // var vaa = this.fame_value
      /* let res = await post('/rollPaired/insert', {
        rollPaired: {
          istate: null,
          idel: null,
          createtime: null,
          createname: null,
          createid: null,
          moditime: null,
          modiid: null,
          modiname: null,
          production_line: this.rollpairU.production_line, //后续添加----
          production_line_id: this.rollpairU.production_line_id,
          factory: this.rollpairU.factory,
          material: this.rollpairU.material,
          roll_typeid: this.rollpairU.roll_typeid,
          roll_type: this.rollpairU.roll_type,
          roll_type: this.rollpairU.roll_type, //----后续添加

          ilinkno_up: this.rollpairU.indocno,
          roll_no_up: this.rollpairU.roll_no,
          ilinkno_down: this.rollpairD.indocno,
          roll_no_down: this.rollpairD.roll_no,
          frame_noid: fame_value_ID,
          frame_no: this.fame_value
        }
      })*/
      this.$confirm('此操作将配对该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //径差
          post('/rackPairingRule/findByCondiction', {
            condition: { frame_no: this.fame_value }
          }).then(res => {
            /*var jingcha = Math.abs(
              this.rollpairU.currentdiameter - this.rollpairD.currentdiameter
            )*/

            var dia_min = res.data.minrollerradius
            var dia_max = res.data.rollerradius

            var jingcha =
              this.rollpairU.currentdiameter - this.rollpairD.currentdiameter

            if (dia_min !== null && dia_max !== null) {
              if (jingcha >= dia_min && jingcha <= dia_max) {
                /*this.$message({
                  type: 'success',
                  message: '报废成功!'
                })*/
                //厂家
                if (this.rollpairU.factory == this.rollpairD.factory) {
                  if (this.rollpairU.rollshape == this.rollpairD.rollshape) {
                    post('/rollPaired/insert', {
                      rollPaired: {
                        istate: null,
                        idel: null,
                        createtime: null,
                        createname: null,
                        createid: null,
                        moditime: null,
                        modiid: null,
                        modiname: null,
                        production_line: this.rollpairU.production_line, //后续添加----
                        production_line_id: this.rollpairU.production_line_id,
                        factory: this.rollpairU.factory,
                        material: this.rollpairU.material,
                        roll_typeid: this.rollpairU.roll_typeid,
                        roll_type: this.rollpairU.roll_type, //----后续添加

                        ilinkno_up: this.rollpairU.indocno,
                        roll_no_up: this.rollpairU.roll_no,
                        ilinkno_down: this.rollpairD.indocno,
                        roll_no_down: this.rollpairD.roll_no,
                        frame_noid: fame_value_ID,
                        frame_no: this.fame_value
                      }
                    }).then(res => {
                      if (res) {
                        this.$message({
                          type: 'success',
                          message: '配对成功!'
                        })
                        this.findAll()
                        this.find_data()
                      }
                    })
                    this.findAll()
                    this.find_data()
                  } else {
                    this.$message({
                      type: 'danger',
                      message: '辊形不一样!'
                    })
                  }
                } else {
                  this.$message({
                    type: 'danger',
                    message: '厂家不同!'
                  })
                }
              } else {
                this.$message({
                  type: 'danger',
                  message:
                    '径差' +
                    jingcha +
                    '不在辊径区间' +
                    dia_min +
                    '-----' +
                    dia_max
                })
              }
            } else {
              this.$message({
                type: 'danger',
                message: '请输入辊径最大最小区间'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消配对'
          })
        })

      // this.findAll()
    },
    // 选择机组
    jiziCtrl() {
      this.jizuBtnSH = true
    },
    //查询接口
    findAll() {
      this.searchInfo.ipaired = 0
      if (this.searchInfo.roll_state == '3') {
        this.searchInfo.roll_state_value = '周转轧辊'
      }
      post(rollInformation, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      }).then(res => {
        this.tableData = res.data
        this.total = res.count
      })
    },
    //轧辊类型-下拉框数据
    findOption() {
      post(rolltypelist, {
        dicno: 'rolltype'
      }).then(res => {
        this.options = res.data
      })
    },
    findjizu() {
      post(rolltypelist, {
        dicno: 'frameteam'
      }).then(res => {
        console.log('frameteam', res)
        this.jizu = res.data
      })
    },
    //轧辊类型-库存下拉
    findKucun() {
      post(kucunlist, {
        dicno: 'rollstate'
      }).then(res => {
        this.kucun = res.data
      })
    },
    // 上辊btn
    goUp(num) {
      this.rollpairU = num
      //如果为空，植入数据，如果有值 就和下辊判断，一致就移除下辊
      if (this.rollpairU.roll_no !== null) {
        if (this.rollpairD.roll_no === this.rollpairU.roll_no) {
          this.rollpairD = {}
        }
      }
    },
    // 下辊btn
    goDown(num) {
      this.rollpairD = num
      if (this.rollpairU.roll_no !== null) {
        if (this.rollpairU.roll_no === this.rollpairD.roll_no) {
          this.rollpairU = {}
        }
      }
    },
    resetForm(formName) {
      this.searchInfo = {
        roll_state: '3'
      }
      this.findAll()
    },
    resetForm1(formName) {
      this.$refs[formName].resetFields()
      this.searchInfo5 = {}
      this.find_data()
    },
    ROLLresetForm() {
      this.rollpairD = {}
      this.rollpairU = {}
    }
  }
}
</script>

<style>
.pair {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.el-table .warning-row {
  background: #253f80 !important;
}

.el-table .success-row {
  background: #1a367a !important;
}
.el-select-dropdown__wrap {
  max-height: 380px;
}
</style>
