<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :page-size="pageSize"
      :current-page="pageIndex"
      :table-height="'calc(100vh - 610px)'"
      :row-class-name="setRowColor"
      index-type="index"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <template slot="TableHead">
        <el-row>
          <el-col :span="20">
            <el-form
              ref="ruleForm"
              :inline="true"
              :model="searchInfo"
              label-width="100px">
              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input v-model="searchInfo.roll_no" />
              </el-form-item>
              <el-form-item
                label="机架范围"
                prop="framerangeid">
                <el-select
                  v-model="searchInfo.framerangeid"
                  placeholder="请选择">
                  <el-option
                    v-for="item in option_fanwei"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
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
              <el-form-item
                label="质量异议"
                prop="quality_id">
                <el-select
                  v-model="searchInfo.quality_id"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4">
            <div class="btn"> <el-button
              size="mini"
              type="primary"
              @click="findSearch()">查询</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="resetForm('ruleForm')">重置</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="addData()">添加</el-button></div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          prop="roll_no"
          label="辊号"/>
        <el-table-column
          prop="factory"
          label="制造厂商"/>
        <el-table-column
          prop="roll_type"
          label="轧辊类型"/>
        <el-table-column
          prop="framerange"
          label="机架范围"/>
        <el-table-column
          prop="material"
          label="轧辊材质"/>
        <el-table-column
          prop="contract_no"
          label="合同号"/>
        <!-- <el-table-column
          prop="quality"
          label="质量异议状态"/>
        <el-table-column
          prop="qualityreason"
          label="质量异议原因"/> -->
        <el-table-column
          label="操作"
          min-width="200"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click.stop="cellClick(scope.row, scope.$index)">查看详情
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleThis(scope.row)">处理</el-button>
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

    <!-- 历史查询 -->
    <Table-easy
      :table-data="ziTableInfo.tableData"
      :total="ziTableInfo.total"
      :table-head="false"
      :table-height="350"
      @handle-current-change="handleCurrentChange1"
      @handle-size-change="handleSizeChange1">
      <template slot="TableBody">
        <el-table-column
          prop="roll_no"
          label="辊号"/>
        <el-table-column
          prop="factory"
          label="制造厂商"/>
        <!-- <el-table-column
          prop="roll_type"
          label="轧辊类型"/>
        <el-table-column
          prop="framerange"
          label="机架范围"/> -->
        <el-table-column
          prop="material"
          label="轧辊材质"/>
        <el-table-column
          prop="contract_no"
          label="合同号"/>
        <el-table-column
          prop="quality"
          label="质量异议状态"/>
        <el-table-column
          prop="qualityreason"
          label="质量异议原因"/>
      </template>
    </Table-easy>

    <!-- 添加弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="title"
      class="layout-dialog"
      width="80%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :rules="rules"
          :model="formLabelAlign"
          label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input v-model="formLabelAlign.roll_no" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="质量异议"
                prop="quality_id">
                <el-select
                  v-model="formLabelAlign.quality_id"
                  placeholder="请选择"
                  @change="handlequalityChange1">
                  <el-option
                    v-for="item in options"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="质量异议原因"
                prop="qualityreason">
                <el-input v-model="formLabelAlign.qualityreason" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="制造厂商"
                prop="factory_id">
                <el-select
                  v-model="formLabelAlign.factory_id"
                  placeholder="请选择"
                  @change="handlefactoryChange1">
                  <el-option
                    v-for="item in option_1"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>

            </el-col>
            <el-col :span="8">
              <el-form-item
                label="合同号"
                prop="contract_no">
                <el-input v-model="formLabelAlign.contract_no" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="轧辊材质"
                prop="material_id">
                <el-select
                  v-model="formLabelAlign.material_id"
                  placeholder="请选择"
                  @change="handlematerialChange">
                  <el-option
                    v-for="item in option_2"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
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
          @click="resetForm('addForm'),dialogVisible = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleSave('addForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--进度条弹窗 -->
    <el-dialog
      :visible.sync="dialoghandlethis"
      class="layout-dialog"
      title="进度"
      width="30%">
      <div class="layout-search">
        <el-form
          ref="stepForm"
          :rules="rules"
          :model="formLabelAlign_1"
          label-width="120px">
          <el-form-item
            label="质量异议状态"
            prop="quality_id">
            <el-select
              v-model="formLabelAlign_1.quality_id"
              placeholder="请选择"
              @change="handlequalityChange">
              <el-option
                v-for="item in options"
                :key="item.key"
                :label="item.value"
                :value="item.key"/>
            </el-select>
          </el-form-item>
          <el-form-item
            label="质量异议原因"
            prop="qualityreason">
            <el-input v-model="formLabelAlign_1.qualityreason" />
          </el-form-item>
        </el-form>
      </div>

      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          @click="dialoghandlethis = false">取 消</el-button>

        <el-button
          size="small"
          type="primary"
          @click="handleSaveStep('stepForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get, post } from '@/lib/Util'
import { rollInformation, kucunlist, rolltypelist } from '@/api/pinClipBoard' //查询接口
import TableEasy from '@/components/TasilyTableEasy'
export default {
  components: { TableEasy },
  data() {
    return {
      searchInfo: {
        indocno: '',
        roll_no: '',
        factory: '',
        material: '',
        roll_typeid: '',
        roll_type: '',
        frame_noid: '',
        frame_no: '',
        roll_positionid: '',
        roll_position: '',
        roll_state: '',
        contract_no: '',
        arrivetime: '',
        body_length: '',
        body_diameter: '',
        shoulder_diameter: '',
        neck_diameter: '',
        flathead_length: '',
        scrap_diameter: '',
        fchecktime: '',
        fusetime: '',
        business_scope: '',
        assetsid: '',
        assets: '',
        assetsno: '',
        assetsnote: '',
        original: '',
        networth: '',
        inventory_stateid: '',
        inventory_state: '',
        lastgrindingtime: '',
        lastuplinetime: '',
        lastlowlinetime: '',
        lastgrindingdepth: '',
        grindingcount: '',
        grindingavg: '',
        uplinecount: '',
        rollkilometer: '',
        rolltonnagetotle: '',
        rolltonnagemm: '',
        currentdiameter: '',
        scrapdiameter: '',
        scrapreason: '',
        iaccident: '',
        operateid: '',
        operatename: '',
        operatetime: '',
        confirmationid: '',
        confirmationname: '',
        confirmationtime: '',
        residualdiameter: '',
        rollshapeid: '',
        rollshape: '',
        roundness: '',
        roughness: '',
        bodyhardness: '',
        neckhardness: '',
        shoulderhardness: '',
        inspectionresults: '',
        hssuplinecount: '',
        workoilcount: '',
        framerangeid: '',
        framerange: '',
        loomingposition: '',
        loomingcount: '',
        quality_id: '',
        quality: '',
        qualityreason: '',
        createid: '',
        createname: '',
        createtime: '',
        modiid: '',
        modiname: '',
        moditime: '',
        idel: '',
        istate: ''
      },
      options: [],
      option_1: [],
      option_2: [],
      option_fanwei: [],
      rules: {
        roll_no: [{ required: true, message: '请输入辊号', trigger: 'blur' }],
        qualityreason: [
          { required: true, message: '请输入质量异议原因', trigger: 'blur' }
        ]
      },
      formLabelAlign: {},
      formLabelAlign_1: {},
      tableData: [],
      total: 0,
      dialogVisible: false,
      dialoghandlethis: false,
      dialogVisibleChange: false,
      show_1: false,
      title: '',
      pageIndex: 1,
      pageSize: 10,
      ziTableInfo: {
        tableData: [],
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        key: ''
      },
      rowIndex: 0
    }
  },
  mounted() {
    this.findAll()
    post('/dictionary/findMapV1', { dicno: 'framefw' }).then(res => {
      this.option_fanwei = res.data //机架范围
    })
    post('/dictionary/findMapV1', { dicno: 'roll_factory' }).then(res => {
      this.option_1 = res.data //制造厂商
      post('/dictionary/findMapV1', { dicno: 'roll_material' }).then(res => {
        this.option_2 = res.data //材质
      })
    })
    post(rolltypelist, { dicno: 'zlyystate' }).then(res => {
      this.options = res.data
    })
  },
  methods: {
    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },
    handlematerialChange() {
      this.option_2.forEach(item => {
        if (item.key == this.formLabelAlign.material_id) {
          this.formLabelAlign.material = item.value
        }
      })
    },
    handlequalityChange1() {
      this.options.forEach(item => {
        if (item.key == this.formLabelAlign.quality_id) {
          this.formLabelAlign.quality = item.value
        }
      })
    },
    handlequalityChange() {
      this.options.forEach(item => {
        if (item.key == this.formLabelAlign_1.quality_id) {
          this.formLabelAlign_1.quality = item.value
        }
      })
    },
    handlefactoryChange1() {
      this.option_1.forEach(item => {
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
    //添加按钮
    addData() {
      //置空
      this.formLabelAlign = {}
      this.dialogVisible = true
      this.show_1 = true
      this.title = '添加'
    },
    //修改按钮
    handleEdit(data) {
      this.dialogVisible = true
      this.formLabelAlign = data
      this.show_1 = false
      this.title = '修改'
    },
    //添加修改
    handleSave(formName) {
      if (this.show_1) {
        this.formLabelAlign.roll_state = 7
        this.$refs[formName].validate(valid => {
          if (valid) {
            post('rollObjection/insert', {
              rollObjection: this.formLabelAlign
            }).then(res => {
              if (res) {
                this.dialogVisible = false
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
      } else {
        this.formLabelAlign.roll_state = 7
        this.$refs[formName].validate(valid => {
          if (valid) {
            // 编辑
            /*console.log(valid)*/
            post('rollObjection/update', {
              rollObjection: this.formLabelAlign
            }).then(res => {
              if (res) {
                this.dialogVisible = false
                this.$refs[formName].resetFields()
                this.findAll()
              }
            })
            this.dialogVisibleChange = false
          } else {
            alert('请按照要求输入')
          }
        })
      }
    },
    async findAll() {
      this.searchInfo.roll_state = 7
      let res = await post('rollInformation/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      })
      if (res.status == 2000) {
        this.tableData = res.data
        this.total = res.count
        this.cellClick(res.data[0], 0)
      } else {
        this.tableData = []
        this.total = 0
      }
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
          post('rollInformation/deleteOne', { indocno: data.indocno }).then(
            res => {
              console.log('删除', res)
              if (res) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.findAll()
              }
            }
          )
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

    /**
     * description: 修改数据按钮
     */
    handleThis(data) {
      this.dialoghandlethis = true
      this.formLabelAlign = data
    },
    /**
     * description: 重置按钮
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.findAll()
    },
    /**
     * description: 步骤
     */
    handleSaveStep(formName) {
      if (this.formLabelAlign_1.quality == 6) {
        this.formLabelAlign.quality_id = this.formLabelAlign_1.quality_id
        this.formLabelAlign.roll_state = this.formLabelAlign_1.quality_id
      } else {
        this.formLabelAlign.roll_special = this.formLabelAlign_1.quality_id
        this.formLabelAlign.quality_id = this.formLabelAlign_1.quality_id
      }

      this.$refs[formName].validate(valid => {
        if (valid) {
          post('rollInformation/update', {
            rollInformation: this.formLabelAlign
          }).then(res => {
            if (res.status == 2000) {
              this.$message({
                type: 'success',
                message: '保存成功!'
              })
              this.$refs[formName].resetFields()
              this.findAll()
            }
          })
          this.formLabelAlign.quality_id = this.formLabelAlign_1.quality_id
          this.formLabelAlign.quality = this.formLabelAlign_1.quality
          this.formLabelAlign.qualityreason = this.formLabelAlign_1.qualityreason
          // this.formLabelAlign = this.formLabelAlign_1
          post('rollObjection/insert', {
            rollObjection: this.formLabelAlign
          })
          // .then(res => {
          //   if (res.status == 2000) {
          //     this.$message({
          //       type: 'success',
          //       message: '保存成功!'
          //     })
          //   }
          // })
          this.dialoghandlethis = false
        } else {
          alert('请按照要求输入')
        }
      })
    },
    async findHistoryAll() {
      let res = await post('rollObjection/findByPage', {
        pageIndex: this.ziTableInfo.pageIndex,
        pageSize: this.ziTableInfo.pageSize,
        condition: { roll_no: this.ziTableInfo.key }
      })
      if (res.status == 2000) {
        this.ziTableInfo.tableData = res.data
      } else {
        this.ziTableInfo.tableData = []
      }
    },

    cellClick(val, index) {
      this.rowIndex = index
      this.pageIndex1 = 1
      this.ziTableInfo.key = val.roll_no
      this.findHistoryAll()
    },
    setRowColor({ row, rowIndex }) {
      if (rowIndex == this.rowIndex) {
        return 'setTable-row-class-name'
      }
    },
    //分页之对应页
    handleCurrentChange1(val) {
      this.ziTableInfo.pageIndex = val
      this.findHistoryAll()
    },
    //分页之一页多少条
    handleSizeChange1(val) {
      this.ziTableInfo.pageSize = val
      this.findHistoryAll()
    }
  }
}
</script>

<style>
</style>
