<!--
 * @Author: your name
 * @Date: 2020-07-23 09:57:34
 * @LastEditTime: 2020-12-09 19:26:21
 * @LastEditors: Please set LastEditors
 * @Description: 辅材仓库管理页面
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\am.vue
-->
<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="24" >
        <Table-easy
          :table-data="tableData"
          :total ="total"
          :page-size="pageSize"
          :row-class-name="setRowColor"
          :current-page="pageIndex"
          index-type="index"
          @row-click="dbcick"
          @handle-current-change="handleCurrentChange"
          @handle-size-change="handleSizeChange">
          <template slot="TableHead">
            <el-row>
              <el-col :span="20">
                <el-form
                  ref="ruleForm"
                  :model="searchInfo"
                  class="search-info"
                  label-width="80px">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item
                        label="辊号"
                        prop="roll_no">
                        <el-input v-model="searchInfo.roll_no" />
                      </el-form-item>
                      <el-form-item
                        label="制造厂商"
                        prop="factory_id">
                        <el-select
                          v-model="searchInfo.factory_id"
                          placeholder="请选择">
                          <el-option
                            v-for="item in option_1"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
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
                        label="库存状态"
                        prop="roll_state">
                        <el-select
                          v-model="searchInfo.roll_state"
                          placeholder="请选择">
                          <el-option
                            v-for="item in rollstateArray"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
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
                            v-for="item in frameFwArray"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-col>
              <el-col :span="4">
                <div class="btn">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="findAll()">查询</el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="resetForm('ruleForm')">重置</el-button>
                </div>
              </el-col>
            </el-row>
          </template>
          <template slot="TableBody">
            <el-table-column
              prop="roll_no"
              width="120px"
              label="辊号"/>
            <el-table-column
              prop="roll_type"
              width="130px"
              label="轧辊类型"/>
            <!-- 添加-->
            <el-table-column
              prop="material"
              width="120"
              label="轧辊材质"/>
            <el-table-column
              prop="frame_no"
              width="80px"
              label="机架号"/>
            <el-table-column
              prop="roll_position"
              width="80px"
              label="轧辊位置"/>
            <el-table-column
              prop="obearing_chock"
              width="180px"
              label="OS侧"/>
            <el-table-column
              prop="dbearing_chock"
              width="180px"
              label="DS侧"/>
            <el-table-column
              label="操作"
              min-width="150"
              align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="warning"
                  @click.stop="hebing1(scope.row)">合并</el-button>
                <el-button
                  size="mini"
                  type="warning"
                  @click.stop="chaifen1(scope.row)">拆分</el-button>
              </template>
            </el-table-column>
            <!-- <el-table-column
              label="DS侧操作"
              min-width="150"
              align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="warning"
                  @click.stop="hebing2(scope.row)">合并</el-button>
                <el-button
                  size="mini"
                  type="warning"
                  @click.stop="chaifen2(scope.row)">拆分</el-button>
              </template>
            </el-table-column>-->
            <!--  <el-table-column
              prop="roll_revolve_value"
              width="80px"
              label="周转状态"/>-->
            <!-- <el-table-column
              v-for="(item, index) in arr"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              show-overflow-tooltip/>-->

          </template>
        </Table-easy>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="dialogVisible"
      title="OS合并"
      class="layout-dialog"
      width="60%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlign"
          label-position="top"
          label-width="140px">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input v-model="formLabelAlign.roll_no" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="OS轴承座选择"
                prop="chock_no">
                <el-select
                  v-model="formLabelAlign.chock_no"
                  placeholder="请选择"
                  @change="install_location_id_change">
                  <el-option
                    v-for="item in option20"
                    :key="item.indocno"
                    :label="item.chock_no"
                    :value="item.chock_no"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="DS轴承座选择"
                prop="chock_no">
                <el-select
                  v-model="formLabelAlign.chock_no1"
                  placeholder="请选择"
                  @change="install_location_id_change1">
                  <el-option
                    v-for="item in option21"
                    :key="item.indocno"
                    :label="item.chock_no"
                    :value="item.chock_no"/>
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
          @click="dialogVisible = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- ds-->
    <el-dialog
      :visible.sync="dialogVisible1"
      title="DS合并"
      class="layout-dialog"
      width="60%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlign1"
          label-position="top"
          label-width="140px">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input v-model="formLabelAlign1.roll_no" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="轴承座选择"
                prop="chock_no">
                <el-select
                  v-model="formLabelAlign1.chock_no"
                  placeholder="请选择"
                  @change="install_location_id_change1">
                  <el-option
                    v-for="item in option21"
                    :key="item.indocno"
                    :label="item.chock_no"
                    :value="item.chock_no"/>
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
          @click="dialogVisible1 = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="submit1">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import { rollInformation, kucunlist, rolltypelist } from '@/api/pinClipBoard' //查询接口
import Echarts from 'echarts'
import { get, post, getDataConfig } from '@/lib/Util'
export default {
  components: {
    TableEasy
  },
  data() {
    return {
      formLabelAlignChange: {},
      searchInfo: {},
      tableData: [],
      options: [],
      option_1: [],
      option_2: [],
      option20: [],
      option21: [],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisibleChange: false,
      checkAll: false,
      columnsArray: [],
      arr: [],
      collArray: [],
      isIndeterminate: true,
      total: 0,
      pageIndex: 1,
      pageSize: 30,
      formLabelAlign: {},
      formLabelAlign1: {},
      rollStateArray: [],
      rollRevolveArray: [],
      rollSpecialArray: [],
      rollMaterialArray: [],
      rollPositionArray: [],
      frameFwArray: [], // 机架范围
      frameNoArray: [], // 机架号
      machineArray: [],
      rollstateArray: [],
      flag: true,
      rowIndex: null,
      hebing_rollno: '',
      hebing_rollno1: '',
      all_need: {},
      all_need1: {}
    }
  },
  mounted() {
    this.findAll()
    this.findOption()
    post('/dictionary/findMapV1', { dicno: 'roll_factory' }).then(res => {
      this.option_1 = res.data //制造厂商
    })
    post('/dictionary/findMapV1', { dicno: 'roll_material' }).then(res => {
      this.option_2 = res.data //材质
    })
    getDataConfig('uplocation').then(res => {
      this.rollPositionArray = res // 上级位置
    })
    getDataConfig('roll_material').then(res => {
      this.rollMaterialArray = res // 部件类型
    })
    getDataConfig('rollstate').then(res => {
      this.rollStateArray = res // 部件类型
    })
    getDataConfig('rollrevolve').then(res => {
      this.rollRevolveArray = res // 部件类型
    })

    getDataConfig('rollspecial').then(res => {
      this.rollSpecialArray = res // 部件类型
    })

    getDataConfig('framefw').then(res => {
      this.frameFwArray = res
    })
    getDataConfig('frameteam').then(res => {
      this.frameNoArray = res
    })
    getDataConfig('machine').then(res => {
      this.machineArray = res
    })

    getDataConfig('rollstate').then(res => {
      this.rollstateArray = res
    })

    this.roles = JSON.parse(localStorage.getItem('storeID')) //  JSON.parse(localStorage.limits)
    // this.echartOption()
  },
  methods: {
    install_location_id_change(vId) {
      let obj = {}
      obj = this.option20.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.chock_no == vId) {
          this.all_need = item
          console.log(this.all_need)
          // this.formLabelAlign_left.chock_no = item.chock_no
          // this.formLabelAlign_left.indocno = item.indocno
        }
      })
    },
    install_location_id_change1(vId) {
      let obj = {}
      obj = this.option21.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.chock_no == vId) {
          this.all_need1 = item
          console.log(this.all_need1)
          // this.formLabelAlign_left.chock_no = item.chock_no
          // this.formLabelAlign_left.indocno = item.indocno
        }
      })
    },
    // 点击行信息，添加颜色标识
    setRowColor({ row, rowIndex }) {
      if (row.indocno == this.rowIndex) {
        return 'setTable-row-class-name'
      }
    },
    dbcick(val) {
      // this.chock_no_1 = val.chock_no
      this.rowIndex = val.indocno //点击变色需要
      // this.searchchock_no.chock_no = val.chock_no
      var searchchock_no1 = {
        main_code: val.chock_no
      }
      // this.find_left()
      // this.find_right()
      /*上线实绩表查询*/
      /* post('/basePressureParts/findByChock', {
        condition: this.searchchock_no
      }).then(res => {
        this.tableData1 = res
      })
      this.tableData2 = [{}]*/
      /* post('/rollPartsDetail/findByChock', {
        condition: searchchock_no1
      }).then(res => {
        this.tableData2 = res.data
      })*/
    },
    hebing1(data) {
      if (data.obearing_chock) {
        this.$message({
          message: '有轴承座号',
          type: 'success'
        })
      } else {
        this.formLabelAlign = data
        this.hebing_rollno = data.roll_no
        //测试 选择所有轴承座
        post('baseChock/findListByBaseChock', {
          BaseChock: {
            roll_no: data.roll_no,
            install_location_id: 1 //os为1  ds为2
          }
        }).then(res => {
          this.option20 = res.data
        })

        //测试 DS选择所有轴承座
        post('baseChock/findListByBaseChock', {
          BaseChock: {
            roll_no: data.roll_no,
            install_location_id: 2 //os为1  ds为2
          }
        }).then(res => {
          this.option21 = res.data
        })

        this.dialogVisible = true
      }
    },
    submit() {
      if (this.formLabelAlign) {
        // 提交合并
        this.all_need.roll_no = this.hebing_rollno //OS
        this.all_need1.roll_no = this.hebing_rollno //DS
        post('baseChock/update', {
          BaseChock: this.all_need
        }).then(res => {
          //DS
          post('baseChock/update', {
            BaseChock: this.all_need1
          }).then(res => {
            this.findAll()
          })

          if (res.status == 2000) {
            this.$message({
              message: '合并成功',
              type: 'success'
            })
            this.findAll()
            this.dialogVisible = false
          } else {
            this.$message({
              message: '编辑失败',
              type: 'error'
            })
          }
        })
        this.dialogVisible = false
      } else {
        alert('请按照要求输入')
      }
    },
    chaifen1(data) {
      if (data.obearing_chock) {
        this.$confirm('此操作将拆分该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            //OS
            post('baseChock/findByChockNo', {
              BaseChock: {
                chock_no: data.obearing_chock
              }
            }).then(res => {
              var all = res
              all.roll_no = ''
              //拆分
              post('baseChock/update', {
                BaseChock: all
              }).then(res => {
                //DS
                post('baseChock/findByChockNo', {
                  BaseChock: {
                    chock_no: data.dbearing_chock
                  }
                }).then(res => {
                  var all_1 = res
                  all_1.roll_no = ''
                  //拆分
                  post('baseChock/update', {
                    BaseChock: all_1
                  }).then(res => {
                    if (res) {
                      this.$message({
                        type: 'success',
                        message: '拆分成功!'
                      })
                      this.findAll()
                    }
                  })
                })
              })
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消报废'
            })
          })
      } else {
        this.$message({
          message: '轴承座为空',
          type: 'success'
        })
      }
    },

    //ds
    hebing2(data) {
      if (data.dbearing_chock) {
        this.$message({
          message: '有ds轴承座',
          type: 'success'
        })
      } else {
        this.formLabelAlign1 = data
        this.hebing_rollno1 = data.roll_no
        //测试 选择所有轴承座
        post('baseChock/findListByBaseChock', {
          BaseChock: {
            roll_no: data.roll_no,
            install_location_id: 2 //os为1  ds为2
          }
        }).then(res => {
          this.option21 = res.data
        })

        this.dialogVisible1 = true
      }
    },
    submit1() {
      if (this.formLabelAlign1) {
        // 提交合并
        this.all_need1.roll_no = this.hebing_rollno1
        post('baseChock/update', {
          BaseChock: this.all_need1
        }).then(res => {
          if (res.status == 2000) {
            this.$message({
              message: '合并成功',
              type: 'success'
            })
            this.findAll()
            this.dialogVisible = false
          } else {
            this.$message({
              message: '编辑失败',
              type: 'error'
            })
          }
        })
        this.dialogVisible1 = false
      } else {
        alert('请按照要求输入')
      }
    },
    chaifen2(data) {
      if (data.dbearing_chock) {
        this.$confirm('此操作将拆分该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            post('baseChock/findByChockNo', {
              BaseChock: {
                chock_no: data.dbearing_chock
              }
            }).then(res => {
              var all = res
              all.roll_no = ''
              //拆分
              post('baseChock/update', {
                BaseChock: all
              }).then(res => {
                if (res) {
                  this.$message({
                    type: 'success',
                    message: '拆分成功!'
                  })
                  this.findAll()
                }
              })
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消报废'
            })
          })
      } else {
        this.$message({
          message: 'ds轴承座为空',
          type: 'success'
        })
      }
    },

    handleFactoryChange() {
      this.option_1.forEach(item => {
        if (item.key == this.formLabelAlign.factory_id) {
          this.formLabelAlign.factory = item.value
        }
      })
    },
    handleRollPositionChange() {
      this.rollPositionArray.forEach(item => {
        if (item.key == this.formLabelAlign.roll_positionid) {
          this.formLabelAlign.roll_position = item.value
        }
      })
    },
    handleMaterChange() {
      this.rollMaterialArray.forEach(item => {
        if (item.key == this.formLabelAlign.material_id) {
          this.formLabelAlign.material = item.value
        }
      })
    },
    handleFrameScopeChange() {
      this.frameFwArray.forEach(item => {
        if (item.key == this.formLabelAlign.framerangeid) {
          this.formLabelAlign.framerange = item.value
        }
      })
    },
    handleFrameNoChange() {
      this.frameNoArray.forEach(item => {
        if (item.key == this.formLabelAlign.frame_noid) {
          this.formLabelAlign.frame_no = item.value
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

    //查询接口
    findAll() {
      post(rollInformation, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      }).then(res => {
        this.tableData = res.data
        this.total = res.count
      })
    },
    resetForm() {
      this.searchInfo = {}
      this.findAll()
    },
    handleEdit(val) {
      this.formLabelAlign = {}
      this.formLabelAlign = JSON.parse(JSON.stringify(val))
      this.dialogVisible = true
    },
    handleEditState(data) {
      this.formLabelAlignChange = data
      console.log(this.formLabelAlignChange)
      this.dialogVisibleChange = true
    },
    //全选Btn
    handleCheckAllChange() {
      if (this.checkAll == true) {
        this.checkAll = true
        for (const item of this.tableColumns) {
          item.checkFg = true
          this.arr.push(item)
        }
      } else {
        this.checkAll = false
        for (const item of this.tableColumns) {
          item.checkFg = false
          this.arr.splice(item)
        }
      }
    },
    //轧辊类型-下拉框数据
    findOption() {
      post(rolltypelist, {
        dicno: 'rolltype'
      }).then(res => {
        this.options = res.data
      })
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
.echartHeader {
  height: 30px;
  margin-top: 10px;
  margin-bottom: 1px;
  text-align: center;
  background-color: #253f80;
  color: #ffffff;
  font-weight: 900;
  font-size: 17px;
}
.right-box {
  /* height: calc(100vh - 435px);
    max-height: calc(100vh - 435px); */
  height: calc(100vh - 75px);
  max-height: calc(100vh - 75px);
  box-sizing: border-box;
  overflow-y: scroll;
}
.right-box::-webkit-scrollbar {
  display: block;
}
.right-box .el-checkbox {
  display: block;
}
.rm002table .el-table__body-wrapper {
  overflow: auto;
  height: 702px;
  /* height: 342px; */
}
</style>
