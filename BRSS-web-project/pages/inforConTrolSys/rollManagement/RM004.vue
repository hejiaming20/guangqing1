<!--
 * @Author: your name
 * @Date: 2020-07-23 09:57:34
 * @LastEditTime: 2020-11-29 15:07:25
 * @LastEditors: Please set LastEditors
 * @Description: 辅材仓库管理页面
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\am.vue

-->
<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :table-height="'calc(100vh - 685px)'"
      :page-size="pageSize"
      :current-page="pageIndex"
      :row-class-name="setRowColor"
      index-type="index"
      @row-click="cellClick"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <template slot="TableHead">
        <el-row>
          <el-col :span="20">
            <el-form
              ref="ruleForm"
              :inline="true"
              :model="searchInfo"
              label-width="80px">
              <el-form-item
                label="制造厂商"
                prop="factory">
                <el-select
                  v-model="searchInfo.factory"
                  placeholder="请选择">
                  <el-option
                    v-for="item in option1"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="合同号"
                prop="contract_no">
                <el-input v-model="searchInfo.contract_no"/>
              </el-form-item>
              <el-form-item
                label="订货年"
                prop="yeard">
                <el-input v-model="searchInfo.yeard"/>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4">
            <div class="btn">
              <el-button
                size="mini"
                type="primary"
                @click="findSearch">查询
              </el-button>
              <el-button
                size="mini"
                type="primary"
                @click="resetForm('ruleForm')">重置
              </el-button>
              <el-button
                size="mini"
                type="primary"
                @click="add()">添加</el-button>
                <!-- <el-button
                size="small"
                type="primary"
                @click="exports()">导出
              </el-button>-->
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          prop="yeard"
          label="订货年"/>
        <el-table-column
          prop="factory"
          label="供应商"/>
        <el-table-column
          prop="arrive_total"
          label="应到货数量"/>
        <el-table-column
          prop="real_total"
          label="实际到货数量"/>
        <el-table-column
          label="操作"
          min-width="100"
          align="center">
          <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              type="success"
              @click.stop="cellClick(scope.row, scope.$index)">查看详情
            </el-button> -->
            <el-button
              v-if="roles"
              size="mini"
              type="primary"
              @click="confirm(scope.row)">确认
            </el-button>
            <el-button
              size="mini"
              type="warning"
              @click.stop="edit(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click.stop="opendelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </template>
    </Table-easy>
    <!--//第二表-->
    <Table-easy
      :table-data="tableData1"
      :total="total1"
      :page-size="pageSize1"
      :current-page="pageIndex1"
      :table-height="350"
      :row-class-name="setRowColorDown"
      index-type="index"
      style="margin-top: 5px"
      @row-click="cellClickDown"
      @handle-current-change="handleCurrentChange1"
      @handle-size-change="handleSizeChange1">
      <template slot="TableHead">
        <el-row>
          <el-col :span="20">
            <el-form
              :inline="true"
              :model="searchInfo1"
              label-width="80px">
              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input v-model="searchInfo1.roll_no" />
              </el-form-item>
              <el-form-item
                label="制造厂商"
                prop="factory">
                <el-select
                  v-model="searchInfo1.factory"
                  placeholder="请选择">
                  <el-option
                    v-for="item in option1"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="轧辊类型"
                prop="roll_typeid">
                <el-select
                  v-model="searchInfo1.roll_typeid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in optionSec"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="轧辊材质"
                prop="material_id">
                <el-select
                  v-model="searchInfo1.material_id"
                  placeholder="请选择">
                  <el-option
                    v-for="item in rollMaterialArray"
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
                @click="findSearchDown">查询
              </el-button>
              <el-button
                size="mini"
                type="primary"
                @click="resetForm1()">重置
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
          prop="roll_type"
          label="轧辊类型"/>
        <el-table-column
          prop="arrivetime"
          label="到货日期"/>
        <el-table-column
          prop="order_year"
          label="订货年"/>
        <el-table-column
          prop="factory"
          label="供应商"/>
        <el-table-column
          prop="arrive_total"
          label="到货数量"/>
        <el-table-column
          label="操作"
          min-width="150"
          align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.roll_state==0? true:false"
              size="mini"
              type="primary"
              @click="buton_dataup(scope.row)">到货
            </el-button>
          </template>
        </el-table-column>
      </template>
    </Table-easy>
    <!-- 添加/编辑弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="names"
      class="layout-dialog"
      width="70%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlign"
          label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="订货年"
                prop="yeard">
                <el-input v-model="formLabelAlign.yeard" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="F1-F4工作辊"
                prop="f1_f4_fw">
                <el-input
                  v-model="formLabelAlign.f1_f4_fw"
                  type="number" />
              </el-form-item>
              <el-form-item
                label="F5-F7工作辊"
                prop="f5_f7_fw">
                <el-input
                  v-model="formLabelAlign.f5_f7_fw"
                  type="number" />
              </el-form-item>
              <el-form-item
                label="F1-F7支撑辊"
                prop="fb">
                <el-input
                  v-model="formLabelAlign.fb"
                  type="number" />
              </el-form-item>
              <el-form-item
                label="F7花纹辊"
                prop="f7hw">
                <el-input
                  v-model="formLabelAlign.f7hw"
                  type="number"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="精轧立辊"
                prop="f1e">
                <el-input
                  v-model="formLabelAlign.f1e"
                  type="number"/>
              </el-form-item>
              <el-form-item
                label="R1-R2工作辊"
                prop="rw">
                <el-input
                  v-model="formLabelAlign.rw"
                  type="number"/>
              </el-form-item>
              <el-form-item
                label="R1-R2支撑辊"
                prop="rb">
                <el-input
                  v-model="formLabelAlign.rb"
                  type="number"/>
              </el-form-item>
              <el-form-item
                label="粗轧立辊"
                prop="re">
                <el-input
                  v-model="formLabelAlign.re"
                  type="number"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="S1平整工作辊"
                prop="s1w">
                <el-input
                  v-model="formLabelAlign.s1w"
                  type="number"/>
              </el-form-item>
              <el-form-item
                label="S1平整支撑辊"
                prop="s1b">
                <el-input
                  v-model="formLabelAlign.s1b"
                  type="number"/>
              </el-form-item>
              <el-form-item
                label="锤头"
                prop="hm">
                <el-input
                  v-model="formLabelAlign.hm"
                  type="number"/>
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
    <!-- 点击到货弹窗 -->
    <el-dialog
      :visible.sync="open_dialogVisible"
      title="到货弹窗"
      class="layout-dialog"
      width="70%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlign_1"
          label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input
                  v-model="formLabelAlign_1.roll_no"
                  :disabled="false"/>
              </el-form-item>
              <el-form-item
                label="合同号"
                prop="contract_no">
                <el-input v-model="formLabelAlign_1.contract_no" />
              </el-form-item>
              <el-form-item
                label="供货商"
                prop="factory">
                <el-select
                  v-model="formLabelAlign_1.factory"
                  placeholder="请选择"
                  @change="factory_change">
                  <el-option
                    v-for="item in option1"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="到货日期"
                prop="arrivetime">
                <el-date-picker
                  v-model="formLabelAlign_1.arrivetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="到货日期"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="出厂制品号"
                prop="productno">
                <el-input v-model="formLabelAlign_1.productno" />
              </el-form-item>
              <el-form-item
                label="工作层"
                prop="work_layer">
                <el-input v-model="formLabelAlign_1.work_layer" />
              </el-form-item>
              <el-form-item
                label="结算类型"
                prop="settlement_type">
                <el-input v-model="formLabelAlign_1.settlement_type" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                type="text"
                onkeyup="value=value.replace(/[^\d^\.]/g,'')"
                label="单价"
                placeholder="请输入数字"
                prop="price">
                <el-input 
                  v-model="formLabelAlign_1.price"
                  placeholder="请输入数字"
                  onkeyup="value=value.replace(/[^\d^\.]/g,'')" />
              </el-form-item>
              <el-form-item
                type="text"
                label="毫米单价"
                prop="mmprice">
                <el-input 
                  v-model="formLabelAlign_1.mmprice"
                  placeholder="请输入数字"
                  onkeyup="value=value.replace(/[^\d^\.]/g,'')" />
              </el-form-item>
              <el-form-item
                type="text"
                label="原始直径"
                prop="theorydiameter">
                <el-input 
                  v-model="formLabelAlign_1.theorydiameter"
                  placeholder="请输入数字"
                  onkeyup="value=value.replace(/[^\d^\.]/g,'')" />
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
          @click="open_dialogVisible = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleSave_1111">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import { rollInformation, kucunlist, rolltypelist } from '@/api/pinClipBoard' //查询接口
import { get, post, getDataConfig } from '@/lib/Util'
import moment from 'moment'
export default {
  components: {
    TableEasy
  },
  data() {
    return {
      sea_data: {},
      names: '',
      form: '',
      searchInfo: {},
      searchInfo1: {},
      formLabelAlign: {},
      formLabelAlign_1: {},
      seadata: {},
      seadata_1: {},
      tableData: [{}],
      tableData1: [],
      dialogVisible: false,
      open_dialogVisible: false,
      total: 0,
      total1: 0,
      pageIndex: 1,
      pageSize: 10,
      pageIndex1: 1,
      pageSize1: 10,
      option: [],
      option1: [],
      option2: [],
      options: [],
      optionFir: [],
      optionSec: [],
      optionThi: [],
      roles: false,
      rowIndex: 0,
      rollMaterialArray: []
    }
  },
  mounted() {
    this.findAll()
    post('/dictionary/findMapV1', { dicno: 'frameteam' }).then(res => {
      this.options = res.data
    })
    getDataConfig('roll_material').then(res => {
      this.rollMaterialArray = res // 轧辊材质
    })
    //轧辊类型-下拉框数据
    post(rolltypelist, {
      dicno: 'rolltype'
    }).then(res => {
      this.optionSec = res.data
    })
    post('/dictionary/findMapV1', { dicno: 'proline' }).then(res => {
      this.option = res.data
    })
    post('/dictionary/findMapV1', { dicno: 'roll_factory' }).then(res => {
      this.option1 = res.data //供货商
    })
    post('/dictionary/findMapV1', { dicno: 'roll_material' }).then(res => {
      this.option2 = res.data //材质
    })
    var arry = localStorage.getItem('storeID') //  JSON.parse(localStorage.limits)
    var arry = JSON.parse(arry).split(',') //this.roles
    for (let i = 0; i < arry.length; i++) {
      if (arry[i] == '5') {
        this.roles = true
        console.log(this.roles)
        break
      }
    }
    /* var data_need = localStorage.getItem('userInfo') //sname  modiname
    console.log(data_need)*/
  },
  methods: {
    factory_change_jia1(vId_1) {
      let obj = {}
      obj = this.option1.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.key == vId_1) {
          this.formLabelAlign.factory = item.value
          this.formLabelAlign.factory_id = item.key
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
    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },
    findSearchDown() {
      this.pageIndex1 = 1
      this.findAll_2()
    },
    findAll() {
      post('/rollPlan/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      }).then(res => {
        if (res.status == 2000) {
          this.tableData = res.data
          this.total = res.count
          this.cellClick(res.data[0], 0)
        }
      })
    },
    add() {
      this.dialogVisible = true
      this.names = '添加'
      this.form = true
      this.formLabelAlign = {}
    },
    edit(val) {
      this.dialogVisible = true
      this.names = '修改'
      this.form = false
      this.formLabelAlign = val
    },
    handleSave() {
      if (this.form) {
        this.formLabelAlign.arrive_total = 0
        if (this.formLabelAlign.f1_f4_fw) {
          this.formLabelAlign.arrive_total += Number(
            this.formLabelAlign.f1_f4_fw
          )
        }
        if (this.formLabelAlign.f5_f7_fw) {
          this.formLabelAlign.arrive_total += Number(
            this.formLabelAlign.f5_f7_fw
          )
        }
        if (this.formLabelAlign.fb) {
          this.formLabelAlign.arrive_total += Number(this.formLabelAlign.fb)
        }
        if (this.formLabelAlign.f7hw) {
          this.formLabelAlign.arrive_total += Number(this.formLabelAlign.f7hw)
        }
        if (this.formLabelAlign.f1e) {
          this.formLabelAlign.arrive_total += Number(this.formLabelAlign.f1e)
        }
        if (this.formLabelAlign.rw) {
          this.formLabelAlign.arrive_total += Number(this.formLabelAlign.rw)
        }
        if (this.formLabelAlign.rb) {
          this.formLabelAlign.arrive_total += Number(this.formLabelAlign.rb)
        }
        if (this.formLabelAlign.re) {
          this.formLabelAlign.arrive_total += Number(this.formLabelAlign.re)
        }
        if (this.formLabelAlign.s1w) {
          this.formLabelAlign.arrive_total += Number(this.formLabelAlign.s1w)
        }
        if (this.formLabelAlign.s1b) {
          this.formLabelAlign.arrive_total += Number(this.formLabelAlign.s1b)
        }
        if (this.formLabelAlign.hm) {
          this.formLabelAlign.arrive_total += Number(this.formLabelAlign.hm)
        }
        /*this.formLabelAlign.arrive_total =
          Number(this.formLabelAlign.f1_f4_fw) +
          Number(this.formLabelAlign.f5_f7_fw) +
          Number(this.formLabelAlign.fb) +
          Number(this.formLabelAlign.f7hw) +
          Number(this.formLabelAlign.f1e) +
          Number(this.formLabelAlign.rw) +
          Number(this.formLabelAlign.rb) +
          Number(this.formLabelAlign.re) +
          Number(this.formLabelAlign.s1w) +
          Number(this.formLabelAlign.s1b) +
          Number(this.formLabelAlign.hm)*/
        console.log(this.formLabelAlign.arrive_total)
        // console.log(this.searchquery.frame_no)
        /* let res = post('/rollPlan/insert', {
          rollPlan: this.formLabelAlign
        })
        this.findAll()*/

        post('/rollPlan/insert', {
          rollPlan: this.formLabelAlign
        }).then(res => {
          this.findAll()
        })
      }
      if (this.form == false) {
        this.formLabelAlign.arrive_total = 0
        if (this.formLabelAlign.f1_f4_fw) {
          this.formLabelAlign.arrive_total += Number(
            this.formLabelAlign.f1_f4_fw
          )
        }
        if (this.formLabelAlign.f5_f7_fw) {
          this.formLabelAlign.arrive_total += Number(
            this.formLabelAlign.f5_f7_fw
          )
        }
        if (this.formLabelAlign.fb) {
          this.formLabelAlign.arrive_total += Number(this.formLabelAlign.fb)
        }
        if (this.formLabelAlign.f7hw) {
          this.formLabelAlign.arrive_total += Number(this.formLabelAlign.f7hw)
        }
        if (this.formLabelAlign.f1e) {
          this.formLabelAlign.arrive_total += Number(this.formLabelAlign.f1e)
        }
        if (this.formLabelAlign.rw) {
          this.formLabelAlign.arrive_total += Number(this.formLabelAlign.rw)
        }
        if (this.formLabelAlign.rb) {
          this.formLabelAlign.arrive_total += Number(this.formLabelAlign.rb)
        }
        if (this.formLabelAlign.re) {
          this.formLabelAlign.arrive_total += Number(this.formLabelAlign.re)
        }
        if (this.formLabelAlign.s1w) {
          this.formLabelAlign.arrive_total += Number(this.formLabelAlign.s1w)
        }
        if (this.formLabelAlign.s1b) {
          this.formLabelAlign.arrive_total += Number(this.formLabelAlign.s1b)
        }
        if (this.formLabelAlign.hm) {
          this.formLabelAlign.arrive_total += Number(this.formLabelAlign.hm)
        }
        console.log(this.formLabelAlign.arrive_total)
        // console.log(this.searchquery.frame_no)
        let res = post('/rollPlan/update', {
          rollPlan: this.formLabelAlign
        })
        this.findAll()
      }
      this.findAll()
      this.dialogVisible = false
    },
    //确认传入子表
    confirm(data) {
      if (data.if_create == 0) {
        this.$confirm('此操作将确认该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
          .then(() => {
            post('/rollPlan/commit', {
              rollPlan: data
            }).then(res => {
              //调用接口
              if (res.status == 2000) {
                post('/rollPlan/updateCreate', { indocno: data.indocno }).then(
                  res => {
                    this.findAll_1()
                    console.log(res)
                  }
                )
                this.$message({
                  type: 'success',
                  message: '确认成功!'
                })
                // this.findAll()
              } else if (res.status == 2002) {
                this.$message({
                  type: 'error',
                  message: '确认失败!'
                })
              }
            })
            //this.findAll()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      } else if (data.if_create == 1) {
        alert('该项已确认过')
        /*this.$message({
          type: 'success',
          message: '该项已经确认成功过!'
        })*/
      }
    },

    /**
     * description: 删除一行数据
     */
    opendelete(data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          post('/rollPlan/deleteOne', { indocno: data.indocno }).then(res => {
            console.log('删除', res)
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

    setRowColor({ row, rowIndex }) {
      if (row.yeard == this.rowIndex) {
        return 'setTable-row-class-name'
      }
    },
    cellClick(val, column) {
      this.rowIndex = val.yeard

      if (val) {
        this.sea_data = {
          yeard: val.yeard,
          factory: val.factory
        }
        this.seadata = {
          order_year: val.yeard
        }
      } else {
        this.seadata = {}
      }

      this.pageIndex1 = 1
      this.findAll_1()
    },
    cellClickDown(val, column) {
      this.rowIndex = val.roll_no
    },
    setRowColorDown({ row, rowIndex }) {
      if (row.roll_no == this.rowIndex) {
        return 'setTable-row-class-name'
      }
    },
    findAll_1() {
      post('/rollInformation/findByPage', {
        pageIndex: this.pageIndex1,
        pageSize: this.pageSize1,
        condition: this.seadata
      }).then(res => {
        this.tableData1 = res.data
        this.total1 = res.count
      })
    },
    findAll_2() {
      post('/rollInformation/findByPage', {
        pageIndex: this.pageIndex1,
        pageSize: this.pageSize1,
        condition: this.searchInfo1
      }).then(res => {
        this.tableData1 = res.data
        this.total1 = res.count
      })
    },
    //机架
    frame_no_change(vId) {
      let obj = {}
      obj = this.options.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.key == vId) {
          this.formLabelAlign_1.frame_no = item.value
          this.formLabelAlign_1.frame_noid = item.key
        }
      })
    },
    frame_no_change_1(vId_1) {
      let obj = {}
      obj = this.option.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.key == vId_1) {
          this.formLabelAlign_1.production_line = item.value
          this.formLabelAlign_1.production_line_id = item.key
        }
      })
    },

    factory_change(vId_1) {
      let obj = {}
      obj = this.option1.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.key == vId_1) {
          this.formLabelAlign_1.factory = item.value
          this.formLabelAlign_1.factory_id = item.key
        }
      })
    },
    material_change(vId_1) {
      let obj = {}
      obj = this.option2.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.key == vId_1) {
          this.formLabelAlign_1.material = item.value
          this.formLabelAlign_1.material_id = item.key
        }
      })
    },
    // 到货按钮弹窗
    open() {
      this.$alert('辊号已存在', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: '已取消到货操作'
          })
        }
      })
    },
    // buton_data(val, data) {
    //   post(rollInformation, {
    //     pageIndex: this.pageIndex,
    //     pageSize: this.pageSize,
    //     condition: {
    //       roll_no: val.roll_no
    //     }
    //   }).then(res => {
    //     if (res.data != 'null') {
    //       // this.buton_dataup()
    //       this.open()
    //       // this.open_dialogVisible = true
    //     } else {
    //       this.open_dialogVisible = true
    //     }
    //   })
    // },
    // 到货
    buton_dataup(data) {
      this.open_dialogVisible = true
      //弹窗显示数据
      this.formLabelAlign_1 = data
      // var t1 = new Date().getTime()
      // this.formLabelAlign_1.arrivetime = t1
      this.formLabelAlign_1.arrivetime = moment().format('YYYY-MM-DD HH:mm:ss')
      this.formLabelAlign_1.order_year = this.sea_data.yeard
      this.formLabelAlign_1.factory = this.sea_data.factory
      // this.seadata_1 = data
    },
    handleSave_1111() {
      post('/rollPlan/gethave', {
        rollInformation: this.formLabelAlign_1
      }).then(res => {
        this.findAll_1()
        this.findAll()
      })
      this.open_dialogVisible = false
    },
    //分页之对应页
    handleCurrentChange1(val) {
      this.pageIndex1 = val
      this.findAll_1()
    },
    //分页之一页多少条
    handleSizeChange1(val) {
      this.pageSize1 = val
      this.findAll_1()
    },
    resetForm(formName) {
      this.searchInfo = {}
      this.findAll()
    },
    resetForm1(formName) {
      this.searchInfo1 = {}
      this.findAll_2
    }
  }
}
</script>

<style>
.column-search {
  margin-left: 20px;
}
</style>
