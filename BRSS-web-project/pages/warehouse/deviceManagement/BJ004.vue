<!--
 * @Author: lcx
 * @Date: 2020-08-28 14:15:22
 * @LastEditTime: 2020-11-02 11:45:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\inforConTrolSys\Bearmanagement\CS002.vue
-->
<template>
  <div>
    <table-easy
      :table-data="tableData"
      :table-height="500"
      :page-size="pageSize"
      :total="total"
      class="layout-default-margin"
      @row-click="clickRow"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <template slot="TableHead">
        <el-row>
          <el-col :span="20">
            <el-form
              ref="ruleForm"
              :model="searchInfo"
              label-width="80px">
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="设备类型"
                    prop="eq_type">
                    <el-select
                      v-model="searchInfo.eq_type_id"
                      placeholder="请选择">
                      <el-option
                        v-for="item in options4"
                        :key="item.value"
                        :label="item.value"
                        :value="item.key"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="归类名称"
                    prop="eq_name">
                    <el-input v-model="searchInfo.eq_name" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="规格型号"
                    prop="sized">
                    <el-input v-model="searchInfo.sized" />
                  </el-form-item>
                </el-col>

              </el-row>
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
                @click="resetForm()">重置</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleAddClick">添加新设备</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          prop="eq_name"
          min-width="140px"
          label="归类名称"/>
        <el-table-column
          prop="eq_type"
          label="设备类型"/>
        <el-table-column
          prop="sized"
          show-overflow-tooltip
          label="规格型号"/>
        <el-table-column
          prop="picno"
          label="图号"/>
        <el-table-column
          prop="stock_count"
          label="库存数量"/>
        <el-table-column
          prop="parts_new"
          label="新备件数量"/>
        <el-table-column
          prop="parts_old"
          label="旧备件数量"/>
        <el-table-column
          prop="parts_scrap"
          label="报废件数量"/>
        <el-table-column
          prop="parts_repair"
          label="送修件数量"/>
        <el-table-column
          prop="parts_use"
          label="在机件数量"/>
        <el-table-column
          prop="if_import"
          min-width="90px"
          label="是否为重要设备">
          <template slot-scope="scope">
            <span>{{ scope.row.if_import == 1 ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="220px"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleIn(scope.row)">入库</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="handleChange(scope.row)"
            >修改</el-button>
            
            <el-button
              size="mini"
              type="danger"
              @click="handleDel(scope.row)">删除</el-button>
            
          </template>
        </el-table-column>
      </template>
    </table-easy>

    <el-table
      :data="tableChildData"
      style="width: 100%">
      <el-table-column
        prop="eq_name"
        label="备件名称"
        width="180"/>
      <el-table-column
        prop="eq_code"
        label="备件编码"
        width="180"/>
      <el-table-column
        prop="production_line"
        label="产线"
        width="180"/>
      <el-table-column
        prop="save_place"
        label="存放地点"
        width="180"/>
      <el-table-column
        prop="work_place"
        label="所辖作业区"
        width="180"/>
      <el-table-column
        prop="eq_count"
        label="备件数量"
        width="180"/>
      <el-table-column
        prop="price_buy"
        label="购入单价"
        width="180"/>
      <el-table-column
        prop="price_repair"
        label="修复单价"
        width="180"/>
      <!-- <el-table-column
          label="查看检测报告"
          width="180"/> -->
      <el-table-column
        label="操作"
        min-width="250"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleOut(scope.row)">出库</el-button>
          <el-button
            size="mini"
            type="warning"
            @click="handleChildEdit(scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleChildDel(scope.row)">删除</el-button>
          
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加弹窗 -->
    <el-dialog
      :visible.sync="dialogAdd"
      title="添加新设备"
      class="layout-dialog"
      width="30%">
      <div class="layout-search">
        <el-form
          ref="ruleForm1"
          :rules="rules1"
          :model="dialogAddForm"
          label-width="120px">
          <el-form-item
            label="归类名称"
            prop="eq_name">
            <el-input v-model="dialogAddForm.eq_name" />
          </el-form-item>
          <el-form-item
            label="设备类型"
            prop="eq_type">
            <el-select
              v-model="dialogAddForm.eq_type"
              placeholder="请选择"
              @change="handleEqTypeChange">
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.value"
                :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item
            label="规格型号"
            prop="sized">
            <el-input v-model="dialogAddForm.sized" />
          </el-form-item>
          <el-form-item
            label="图号"
            prop="picno">
            <el-input v-model="dialogAddForm.picno" />
          </el-form-item>
          <el-form-item
            label="是否是重要设备"
            prop="if_import">
            <template>
              <el-radio
                v-model="dialogAddForm.if_import"
                :label="1">是</el-radio>
              <el-radio
                v-model="dialogAddForm.if_import"
                :label="0">否</el-radio>
            </template>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          size="small"
          @click="dialogClose">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleAddBtn('ruleForm1')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改弹窗 -->
    <el-dialog
      :visible.sync="dialogChange"
      title="修改"
      class="layout-dialog"
      width="30%">
      <div class="layout-search">
        <el-form
          ref="ruleForm1"
          :rules="rules1"
          :model="dialogChangeForm"
          label-width="120px">
          <el-form-item
            label="归类名称"
            prop="eq_name">
            <el-input v-model="dialogChangeForm.eq_name" />
          </el-form-item>
          <el-form-item
            label="设备类型"
            prop="eq_type">
            <el-select
              v-model="dialogChangeForm.eq_type"
              placeholder="请选择"
              @change="handleEqTypeChange">
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.value"
                :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item
            label="规格型号"
            prop="sized">
            <el-input v-model="dialogChangeForm.sized" />
          </el-form-item>
          <el-form-item
            label="图号"
            prop="picno">
            <el-input v-model="dialogChangeForm.picno" />
          </el-form-item>
          <el-form-item
            label="是否是重要设备"
            prop="if_import"
          >
            <template>
              <el-radio
                v-model="dialogChangeForm.if_import"
                :label="1">是</el-radio>
              <el-radio
                v-model="dialogChangeForm.if_import"
                :label="0">否</el-radio>
            </template>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          size="small"
          @click="dialogClose">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleChangeBtn('ruleForm1')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 出库弹窗 -->
    <el-dialog
      :visible.sync="dialogOut"
      title="出库"
      class="layout-dialog"
      width="30%">
      <div class="layout-search">
        <el-form
          ref="ruleForm3"
          :rules="rules3"
          :model="dialogOutForm"
          label-width="120px">
          <el-form-item
            label="备件名称"
            prop="eq_name">
            <el-input
              v-model="dialogOutForm.eq_name"
              :disabled="true"/></el-form-item>
          <el-form-item

            label="备件编码"
            prop="eq_code">
            <!-- <el-select
              v-model="dialogOutForm.eq_code"
              placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select> -->
            <el-input
              v-model="dialogOutForm.eq_code"
              disabled/>
          </el-form-item>
          <el-form-item
            label="规格型号"
            prop="sized">
            <el-input
              v-model="dialogOutForm.frame_no"
              disabled/>
          </el-form-item>
          <el-form-item
            label="出库去向"
            prop="istatus_out">
            <el-select
              v-model="dialogOutForm.istatus_out"
              placeholder="请选择"
              @change="istatus_out_change1">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.value"
                :value="item.key"/>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="dialogshow"
            label="主机编码"
            prop="main_code">
            <el-input
              v-model="dialogOutForm.main_code"/>
          </el-form-item>
          <el-form-item
            v-if="dialogshow"
            label="主机名称"
            prop="main_name">
            <el-input
              v-model="dialogOutForm.main_name"/>
          </el-form-item>
          <el-form-item
            label="出库数量"
            prop="eq_out">
            <el-input
              v-model="dialogOutForm.eq_out"/>
          </el-form-item>
          <!-- <el-form-item
        label="是否为重要设备"
        prop="if_import">
        <el-input
          v-model="dialogOutForm.if_import"
          disabled/>
      </el-form-item>-->
          <el-form-item
            label="是否是重要设备"
            disabled
            prop="if_import">
            <template>
              <el-radio
                v-model="dialogOutForm.if_import"
                :label="1"
              >是</el-radio>
              <el-radio
                v-model="dialogOutForm.if_import"
                :label="0"
              >否</el-radio>
            </template>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          size="small"
          @click="dialogClose">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleOutBtn('ruleForm3')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 子表修改 -->
    <el-dialog
      :visible.sync="dialogChildChange"
      title="子表修改"
      class="layout-dialog"
      width="30%">
      <div class="layout-search">
        <el-form
          ref="ruleForm4"
          :rules="rules4"
          :model="dialogChildChangeForm"
          label-width="120px">
          <el-form-item
            :disabled="true"
            label="备件名称"
            prop="eq_name">
            <el-input v-model="dialogChildChangeForm.eq_name" />
          </el-form-item>
          <!-- <el-form-item
            label="备件编码"
            prop="eq_code">
            <el-select
              v-model="dialogChildChangeForm.eq_code"
              placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
            <el-input v-model="dialogChildChangeForm.eq_code" />
          </el-form-item> -->
          <!-- <el-form-item
            label="是否为重要设备"
            prop="if_import">
            <el-input
              v-model="dialogChildChangeForm.if_import"/>
          </el-form-item> -->
          <el-form-item
            label="规格型号"
            prop="sized">
            <el-input v-model="dialogChildChangeForm.sized" />
          </el-form-item>
          <el-form-item
            label="所辖作业区"
            prop="work_place">
            <el-select
              v-model="dialogChildChangeForm.work_place"
              placeholder="请选择">
              <el-option
                v-for="item in options5"
                :key="item.key"
                :label="item.value"
                :value="item.key"/>
            </el-select>
          </el-form-item>
          <el-form-item
            label="产线"
            prop="production_line">
            <el-select
              v-model="dialogChildChangeForm.production_line"
              placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.key"
                :label="item.value"
                :value="item.key"/>
            </el-select>
          </el-form-item>
          <el-form-item
            label="存放地点"
            prop="save_place">
            <el-input v-model="dialogChildChangeForm.save_place" />
          </el-form-item>
          <el-form-item
            label="购入单价"
            prop="price_buy">
            <el-input v-model="dialogChildChangeForm.price_buy" />
          </el-form-item>
          <el-form-item
            label="修复单价"
            prop="price_repair">
            <el-input v-model="dialogChildChangeForm.price_repair" />
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          size="small"
          @click="dialogClose">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleChildChangeBtn('ruleForm4')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 入库弹窗 -->
    <el-dialog
      :visible.sync="dialogIn"
      title="入库"
      class="layout-dialog"
      width="30%">
      <div class="layout-search">
        <el-form
          ref="ruleForm2"
          :rules="rules2"
          :model="dialogInForm"
          label-width="120px">
          <el-form-item
            label="备件名称"
            prop="eq_name">
            <el-input v-model="dialogInForm.eq_name" />
          </el-form-item>
          <el-form-item
            label="备件编码"
            prop="eq_code">
            <!-- <el-select
              v-model="dialogInForm.eq_code"
              placeholder="请选择">
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select> -->
            <el-input v-model="dialogInForm.eq_code" />
          </el-form-item>
          <el-form-item
            label="规格型号"
            prop="sized">
            <el-input v-model="dialogInForm.sized" />
          </el-form-item>
          <el-form-item
            label="所辖作业区"
            prop="work_place">
            <el-select
              v-model="dialogInForm.work_place"
              placeholder="请选择">
              <el-option
                v-for="item in options5"
                :key="item.key"
                :label="item.value"
                :value="item.key"/>
            </el-select>
          </el-form-item>
          <el-form-item
            label="入库状态"
            prop="istatus_in">
            <el-select
              v-model="dialogInForm.istatus_in"
              placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.key"
                :label="item.value"
                :value="item.key"/>
            </el-select>
          </el-form-item>
          <el-form-item
            label="入库数量"
            prop="eq_in">
            <el-input v-model="dialogInForm.eq_in" />
          </el-form-item>
          <el-form-item
            label="产线"
            prop="production_line">
            <el-select
              v-model="dialogInForm.production_line"
              placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.key"
                :label="item.value"
                :value="item.key"/>
            </el-select>
          </el-form-item>
          <el-form-item
            label="存放地点"
            prop="save_place">
            <el-input v-model="dialogInForm.save_place" />
          </el-form-item>
          <el-form-item
            label="购入单价"
            prop="price_buy">
            <el-input v-model="dialogInForm.price_buy" />
          </el-form-item>
          <el-form-item
            label="修复单价"
            prop="price_repair">
            <el-input v-model="dialogInForm.price_repair" />
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          size="small"
          @click="dialogClose">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleInBtn('ruleForm2')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import { get, post } from '@/lib/Util'
export default {
  name: 'CS002',
  components: {
    TableEasy
  },
  data() {
    return {
      tableData: [],
      tableChildData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      searchInfo: {}, // 查询条件
      dialogInForm: {},
      dialogOutForm: {}, //弹窗form
      dialogChildChangeForm: {}, //弹窗form
      dialogAddForm: {},
      dialogChangeForm: {},
      dialogAdd: false,
      dialogOut: false, //弹窗
      dialogIn: false,
      dialogChildChange: false,
      dialogChange: false,
      options: [], //下拉
      options2: [], //下拉
      options3: [], //下拉
      options4: [], //下拉
      options5: [], //下拉
      dialogshow: false,
      refest: '',
      if_import: '', //出库需要的属性
      ruleForm1: {
        eq_name: '',
        eq_type: '',
        if_import: ''
      },
      rules1: {
        eq_name: [
          { required: true, message: '请输入归类名称', trigger: 'blur' }
        ],
        eq_type: [
          { required: true, message: '请选择设备类型', trigger: 'change' }
        ],
        if_import: [
          { required: true, message: '请选择是否为重要设备', trigger: 'change' }
        ]
      },
      ruleForm2: {
        eq_name: '',
        eq_code: '',
        istatus_in: '',
        eq_in: '',
        production_line: ''
      },
      rules2: {
        eq_name: [
          { required: true, message: '请输入归类名称', trigger: 'blur' }
        ],
        eq_code: [
          { required: true, message: '请输入设备编码', trigger: 'change' }
        ],
        istatus_in: [
          { required: true, message: '请选择入库状态', trigger: 'change' }
        ],
        eq_in: [
          { required: true, message: '请选择入库数量', trigger: 'change' }
        ],
        production_line: [
          { required: true, message: '请选择产线', trigger: 'change' }
        ]
      },
      ruleForm3: {
        istatus_out: '',
        main_code: '',
        main_name: '',
        eq_out: ''
      },
      rules3: {
        istatus_out: [
          { required: true, message: '请选择出库去向', trigger: 'blur' }
        ],
        main_code: [
          { required: true, message: '请输入主机编码', trigger: 'change' }
        ],
        main_name: [
          { required: true, message: '请选择主机名称', trigger: 'change' }
        ],
        eq_out: [
          { required: true, message: '请选择出库数量', trigger: 'change' }
        ]
      },
      ruleForm4: {
        eq_name: '',
        production_line: ''
      },
      rules4: {
        eq_name: [
          { required: true, message: '请输入备件名称', trigger: 'blur' }
        ],
        production_line: [
          { required: true, message: '请输入产线', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.findAll()
    this.findSelectDataOps()
  },
  methods: {
    istatus_out_change1(vId) {
      let obj = {}
      obj = this.options3.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.key == vId) {
          this.dialogOutForm.istatus_out = item.key
        }
        if (vId == '3') {
          this.dialogshow = true
        } else {
          this.dialogshow = false
        }
      })
    },

    // 查询全部
    async findAll() {
      console.log('this.searchInfo', this.searchInfo)
      let res = await post('/rollParts/findByPage', {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        condition: this.searchInfo
      })
      this.tableData = res.data
      this.total = res.count
      if (res.data[0]) {
        this.clickRow(res.data[0])
      }
    },
    // 打开添加弹窗
    handleAddClick() {
      this.dialogAddForm = {
        if_import: 0
      }
      this.dialogAdd = true
    },
    // 出库
    handleOut(val) {
      this.dialogOutForm = {}
      this.dialogOutForm = val
      //如果出库去向为：上机
      if (val.istatus_out == '3') {
        this.dialogshow = true
      }

      this.dialogOutForm.if_import = val.if_import
      this.dialogOut = true
    },
    // 入库
    handleIn(val) {
      this.dialogInForm = {}
      this.dialogIn = true
      this.dialogInForm.ilinkno = val.indocno
      this.dialogInForm.if_import = val.if_import
      console.log('dialogInForm', this.dialogInForm)
    },
    // 主表修改
    handleChange(val) {
      console.log('主表修改Val', val)
      this.dialogChange = true
      this.dialogChangeForm = val
    },
    // 子表修改
    handleChildEdit(val) {
      console.log('子表修改Val', val)
      this.dialogChildChange = true
      this.dialogChildChangeForm = val
      console.log('修改Form', this.dialogChangeForm)
    },

    // 添加
    async handleAddBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          post('/rollParts/insert', {
            rollParts: this.dialogAddForm
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
            } else {
              this.$message.error('添加失败')
            }
            this.dialogAdd = false
            this.form = {}
            this.findAll()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 主表修改
    async handleChangeBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          post('/rollParts/update', {
            rollParts: this.dialogChangeForm
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            } else {
              this.$message.error('修改失败')
            }
            this.dialogChange = false
            this.form = {}
            this.findAll()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 子表修改
    async handleChildChangeBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          post('/rollPartsDetail/update', {
            rollPartsDetail: this.dialogChildChangeForm
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            } else {
              this.$message.error('修改失败')
            }
            this.dialogChildChange = false
            this.dialogChildChangeForm = {}
            this.findAll()
          })
        } else {
          console.log('填写不全')
          return false
        }
      })
    },
    // 入库
    async handleInBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          post('/rollPartsDetail/insert', {
            rollPartsDetail: this.dialogInForm
          }).then(res => {
            if (res) {
              this.findAll()
              this.$message({
                type: 'success',
                message: '入库成功'
              })
            } else {
              this.$message.error('修改失败')
            }
            this.dialogIn = false
            //入库提交后再去查询子表让其显示
            post('/rollPartsDetail/findByPage', {
              pageIndex: 1, //第几页
              pageSize: 20, //每页多少条
              condition: {
                ilinkno: this.refest
              }
            }).then(res => {
              this.tableChildData = res.data
            })
          })
        } else {
          console.log('填写不全')
          return false
        }
      })
      //this.tableChildData = []
    },
    //表单验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置按钮
    dialogClose() {
      this.dialogAdd = false
      this.dialogOut = false
      this.dialogIn = false
      this.dialogChange = false
      this.dialogChildChange = false
      this.dialogAddForm = {}
      this.dialogOutForm = {}
      this.dialogInForm = {}
      this.dialogChildChangeForm = {}
    },
    // 下拉框请求
    async findSelectDataOps() {
      let res = await post('/dictionary/findMapV1', {
        dicno: 'proline'
      })
      let res2 = await post('/dictionary/findMapV1', {
        dicno: 'stock_in'
      })
      let res3 = await post('/dictionary/findMapV1', {
        dicno: 'stock_out'
      })
      let res4 = await post('/dictionary/findMapV1', {
        dicno: 'eq_type'
      })
      let res5 = await post('/dictionary/findMapV1', {
        dicno: 'fac_area'
      })
      console.log('options', res2.data)
      this.options = res.data
      this.options2 = res2.data
      this.options3 = res3.data
      this.options4 = res4.data
      this.options5 = res5.data
    },
    //子表获取数据 点击
    async clickRow(row) {
      console.log('row', row)
      this.refest = row.indocno
      let res = await post('/rollPartsDetail/findByPage', {
        pageIndex: 1, //第几页
        pageSize: 20, //每页多少条
        condition: {
          ilinkno: row.indocno
        }
      })
      this.tableChildData = res.data
      this.dialogOutForm.ilinkno = row.indocno
      console.log('this.dialogOutForm', this.dialogOutForm.ilinkno)
      this.if_import = row.if_import
      console.log('带入子表', this.if_import)
    },
    // 出库
    async handleOutBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          post('/rollPartsDetail/out', {
            rollPartsDetail: this.dialogOutForm
          }).then(res => {
            if (res.msg == '出库完成') {
              this.$message({
                type: 'success',
                message: '出库完成'
              })
            } else {
              this.$message.error('出库失败')
            }
            this.dialogOut = false
            this.findAll()
            //刷新下面子表
            post('/rollPartsDetail/findByPage', {
              pageIndex: 1, //第几页
              pageSize: 20, //每页多少条
              condition: {
                ilinkno: this.refest
              }
            }).then(res => {
              this.tableChildData = res.data
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //主表删除
    handleDel(val) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('/rollParts/deleteOne', { indocno: val.indocno }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.findAll()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    //子表删除
    async handleChildDel(val) {
      console.log('子表删除Val', val)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log('子表删除Val', val)
          post('/rollPartsDetail/deleteOne', { indocno: val.indocno }).then(
            res => {
              if (res) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.tableChildData = []
                this.findAll()
              }
            }
          )
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleEqTypeChange() {
      this.options4.forEach(item => {
        if (item.value == this.dialogAddForm.eq_type) {
          this.dialogAddForm.eq_type_id = item.key
        }
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
    resetForm(formName) {
      this.searchInfo = {}
      this.findAll()
    }
  }
}
</script>

<style scoped>
.el-dialog .layout-search .el-form .el-form-item {
  margin-bottom: 29px;
}
</style>
