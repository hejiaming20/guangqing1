<!--
 *
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
设备履历管理
-->

<template>
  <el-row :gutter="10">
    <el-col :span="5" >
      <div>
        <el-tree
          ref="vueTree"
          :data="data"
          :props="defaultProps"
          :default-expanded-keys="[-2,485]"
          :accordion="false"
          node-key="indocno"
          highlight-current
          class="cs016tree"
          @node-click="handleNodeClick"/>
      </div>
    </el-col>
    <el-col :span="19">
      <Table-easy
        :table-data="tableData"
        :total="total"
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
                :model="searchInfo"
                :inline="true"
                label-width="100px">
                <el-form-item
                  label="配件名称"
                  prop="equipment_name">
                  <el-input v-model.trim="searchInfo.equipment_name" />
                </el-form-item>
                <el-form-item
                  label="组件名称"
                  prop="equipment_parentname">
                  <el-input v-model.trim="searchInfo.equipment_parentname" />
                </el-form-item>
                <el-form-item
                  label="开始时间"
                  prop="dbegin">
                  <el-date-picker
                    v-model="searchInfo.dbegin"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="开始时间"/>
                </el-form-item>
                <el-form-item
                  label="结束时间"
                  prop="dend">
                  <el-date-picker
                    v-model="searchInfo.dend"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="结束时间"/>
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
                  @click="find_query()">查询</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="resetForm('ruleForm')">重置</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="open_add_1()">添加</el-button>
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
            prop="equipment_name"
            label="配件名称"/>
          <el-table-column
            prop="equipment_pparentname"
            label="设备名称"/>
          <el-table-column
            prop="equipment_parentname"
            show-overflow-tooltip
            label="组件名称"/>
          <el-table-column
            prop="operator_name"
            show-overflow-tooltip
            label="操作人"/>
          <el-table-column
            prop="usetime"
            show-overflow-tooltip
            label="开始时间"/>
          <el-table-column
            prop="interval_times"
            label="提醒时间"/>
          <el-table-column
            prop="total_times"
            label="累计时间"/>
          <el-table-column
            prop="discard_time"
            label="更换时间"/>
          <!-- <el-table-column
            prop="factory_name"
            label="厂家名称"/>-->
          <el-table-column
            prop="sgroup_name"
            label="班组"/>
          <el-table-column
            prop="sclass_name"
            label="班次"/>
          <el-table-column
            label="操作"
            width="150px"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="warning"
                @click="handleEdit(scope.row,true)">修改</el-button>
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
        :title="dialogTitle"
        class="layout-dialog"
        width="60%">
        <div class="layout-search">
          <el-form
            ref="addForm"
            :model="formLabelAlign"
            label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="配件名称"
                  prop="equipment_name">
                  <el-input v-model.trim="formLabelAlign.equipment_name" />
                </el-form-item>
                <el-form-item
                  label="开始时间"
                  prop="usetime">
                  <el-date-picker
                    v-model="formLabelAlign.usetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="开始时间"/>
                </el-form-item>
                <el-form-item
                  label="更换时间"
                  prop="discard_time">
                  <el-date-picker
                    v-model="formLabelAlign.discard_time"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="更换时间"/>
                </el-form-item>

                <!--  <el-form-item
                  label="产线"
                  prop="production_line">
                  <el-select
                    v-model="formLabelAlign.production_line"
                    placeholder="请选择"
                    @change="production_line_id_change">
                    <el-option
                      v-for="item in option1"
                      :key="item.key"
                      :label="item.value"
                      :value="item.value"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="轧辊类型"
                  prop="roll_type">
                  <el-select
                    v-model="formLabelAlign.roll_type"
                    placeholder="请选择"
                    @change="handleroll_typeChange">
                    <el-option
                      v-for="item in typeoptions"
                      :key="item.key"
                      :label="item.value"
                      :value="item.value"/>
                  </el-select>
                </el-form-item>-->
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="提醒时间"
                  prop="interval_times">
                  <el-input v-model="formLabelAlign.interval_times" />
                </el-form-item>
                <el-form-item
                  label="累计时间"
                  prop="total_times">
                  <el-input v-model="formLabelAlign.total_times" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="班组"
                  prop="sgroup">
                  <el-select
                    v-model="formLabelAlign.sgroup"
                    placeholder="请选择">
                    <el-option
                      v-for="item in option2"
                      :key="item.key"
                      :label="item.value"
                      :value="item.value"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="班"
                  prop="sclass">
                  <el-select
                    v-model="formLabelAlign.sclass"
                    placeholder="请选择">
                    <el-option
                      v-for="item in option3"
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
            size="mini"
            type="primary"
            @click="resetDialogForm('addForm')">取 消</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleSave('addForm')">确 定</el-button>
        </span>
      </el-dialog>

    </el-col>
  </el-row>






</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import { get, post, getDataConfig } from '@/lib/Util'
export default {
  name: 'CS016',
  components: {
    TableEasy
  },
  data() {
    return {
      light_1: 485,
      searchInfo: {},
      formLabelAlign: {},
      tableData: [{}],
      total: 0,
      dialogVisible: false,
      formFlag: true, // true 添加 false 编辑
      pageIndex: 1,
      pageSize: 30,
      treeData: [],
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 11,
              label: '二级 1-1',
              children: [
                {
                  id: 666,
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 21,
              label: '二级 2-1',
              children: [
                {
                  id: 211,
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              id: 22,
              label: '二级 2-2',
              children: [
                {
                  id: 221,
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        }
        /* {
          id: 3,
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }*/
      ],
      defaultProps: {
        children: 'detail',
        label: 'sname'
      },
      dialogTitle: '',
      typeoptions: [],
      kcoptions: [],
      option1: [],
      option2: [],
      option3: [],
      materialArray: [],
      factoryArray: [],
      crea_sname_id: '',
      crea_sname: '',
      send_id: '',
      send_sname: ''
    }
  },
  mounted() {
    post('/dictionary/findMapV1', { dicno: 'proline' }).then(res => {
      this.option1 = res.data //产线（直接使用）
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
    post('/dictionary/findMapV1', { dicno: 'team' }).then(res => {
      this.option2 = res.data //班组
    })
    post('/dictionary/findMapV1', { dicno: 'shift' }).then(res => {
      this.option3 = res.data //班组
    })
    //this.findAll()
    this.findAll_1()
    this.crea_sname_id = JSON.parse(localStorage.getItem('storeID'))
    this.crea_sname = JSON.parse(localStorage.getItem('storename'))
    console.log(this.crea_sname_id, this.crea_sname)
  },
  methods: {
    findAll_1() {
      this.send_id = ''
      this.send_sname = ''
      post('baseEquipment/findAllDictionary', {
        condition: {
          dicno: 'equipment'
        }
      }).then(res => {
        this.data = res.data
        for (var i = 0; res.data.length > i; i++) {
          if (res.data[i].detail) {
            for (var m = 0; res.data[i].detail.length > m; m++) {
              if (res.data[i].detail[m] && this.send_id == '') {
                for (var n = 0; res.data[i].detail[m].detail.length > n; n++) {
                  if (
                    res.data[i].detail[m].detail[n] &&
                    res.data[i].detail[m].detail[n].ilevel == 3
                  ) {
                    this.send_id = res.data[i].detail[m].detail[n].indocno
                    this.send_sname = res.data[i].detail[m].detail[n].sname
                    this.light_1 = res.data[i].detail[m].detail[n].indocno
                    this.find_query()
                    console.log('3')
                    break
                  }
                }
              } else if (this.send_id != '') {
                console.log('2')
                break
              } else {
                continue
              }
            }
          } else if (this.send_id != '') {
            console.log('1')
            break
          }
        }
        if (res.data) console.log(res.data)
        this.$nextTick(() => {
          this.$refs.vueTree.setCurrentKey(this.light_1)
        })
      })
    },
    //点击左边
    handleNodeClick(data) {
      if (data.ilevel == 3) {
        this.send_id = data.indocno
        this.send_sname = data.sname
        this.find_query()
      } else {
        this.send_id = ''
        this.send_sname = ''
        this.tableData = []
        this.total = 0
      }
    },
    find_query() {
      this.searchInfo.equipment_id = this.send_id
      this.searchInfo.sclass_name = this.send_sname
      post('baseEquipment/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      }).then(res => {
        this.tableData = res.data
        this.total = res.count
        console.log(res.data)
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
    handleMaterChange() {
      this.materialArray.forEach(item => {
        if (item.key == this.formLabelAlign.material_id) {
          this.formLabelAlign.material = item.value
        }
      })
    },
    //分页之对应页
    handleCurrentChange(val) {
      this.pageIndex = val
      this.find_query()
    },
    //分页之一页多少条
    handleSizeChange(val) {
      this.pageSize = val
      this.find_query()
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
          post('baseEquipment/deleteOne', { indocno: data.indocno }).then(
            res => {
              console.log('删除', res)
              if (res) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.find_query()
              }
            }
          )
          this.find_query()
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
      this.dialogVisible = true
      this.dialogTitle = '编辑'
      this.formLabelAlign = Object.assign({}, data)
      this.formFlag = false
    },

    //打开添加车床弹窗
    open_add_1() {
      this.dialogVisible = true
      this.dialogTitle = '新增'
      this.formLabelAlign = {}
      this.formFlag = true
    },

    async handleSave(formName) {
      this.formLabelAlign.equipment_id = this.send_id
      this.formLabelAlign.sclass_name = this.send_sname
      //登录人
      this.formLabelAlign.operator_id = this.crea_sname_id
      this.formLabelAlign.operator_name = this.crea_sname

      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.formFlag) {
            console.log(this.formLabelAlign)
            post('baseEquipment/insert', {
              BaseEquipment: this.formLabelAlign
            }).then(res => {
              this.dialogVisible = false
              this.find_query()
              if (res) {
                this.$refs[formName].resetFields()
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
              }
            })
          } else {
            post('baseEquipment/update', {
              BaseEquipment: this.formLabelAlign
            }).then(res => {
              this.dialogVisible = false
              this.find_query()
              if (res) {
                this.$refs[formName].resetFields()
                this.$message({
                  type: 'success',
                  message: '编辑成功'
                })
              }
            })
          }
        } else {
          return false
        }
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
      // this.findAll()
    }
  }
}
</script>

<style >
.cs016tree {
  height: calc(100vh - 70px);
  overflow: auto;
  padding: 20px 10px;
  box-sizing: border-box;
}
</style>
