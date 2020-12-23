<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :table-height="'calc(100vh - 195px)'"
      :page-size="pageSize"
      :current-page="pageIndex"
      index-type="index"
      @handle-size-change="handleSizeChange"
      @handle-current-change="handleCurrentChange">
      <template slot="TableHead">
        <el-row :gutter="10">
          <el-col :span="18">
            <el-form
              ref="ruleForm"
              :inline="true"
              :model="searchInfo"
              class="search-info"
              label-width="80px">
              <el-form-item
                label="工单名称"
                prop="order_name">
                <el-input v-model="searchInfo.order_name" />
              </el-form-item>
              <el-form-item
                label="工单编码"
                prop="order_no">
                <el-input v-model="searchInfo.order_no" />
              </el-form-item>
              <el-form-item
                label="轧辊类型"
                prop="roll_type">
                <el-select
                  v-model="searchInfo.roll_type"
                  placeholder="请选择">
                  <el-option
                    v-for="item in rollTypeArray"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6">
            <div class="btn">
              <el-button
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
                @click="handleClick('dialogForm')">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          :show-overflow-tooltip="true"
          prop="order_name"
          min-width="100px"
          label="工单名称"/>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="order_no"
          min-width="90px"
          label="工单编码"/>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="roll_type"
          min-width="90px"
          label="轧辊类型"/>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="production_line"
          min-width="50px"
          label="产线"/>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="material"
          min-width="60px"
          label="材质"/>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="frame_no"
          min-width="60px"
          label="机架号"/>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="factory"
          min-width="70px"
          label="生产商"/>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="framerange"
          min-width="60px"
          label="机架范围"/>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="install_location"
          label="安装位置"/>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="up_location"
          label="上机位置"/>
        <el-table-column
          label="操作"
          min-width="220"
          align="center">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini">启用</el-button>
            <el-button
              type="primary"
              size="mini">关闭</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleCopy(scope.row)">复制</el-button>
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

    <!-- 添加/编辑弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      class="layout-dialog"
      width="80%">
      <el-row :gutter="10">
        <el-col :span="6">
          <Table-easy
            :table-height="300"
            :table-data="dialogTable2"
            :is-pagination-show="false"
            class="pz002table">
            <template slot="TableHead">
              <el-row>
                <el-col :span="20">
                  <el-form
                    :model="dialogSearchInfo"
                    class="search-info"
                    label-width="80px">
                    <el-form-item
                      label="模块名称"
                      prop="modular_name">
                      <el-input v-model="dialogSearchInfo.modular_name" />
                    </el-form-item>
                    <el-form-item
                      label="轧辊类型"
                      prop="roll_typeid">
                      <el-select
                        v-model="dialogSearchInfo.roll_typeid"
                        placeholder="请选择">
                        <el-option
                          v-for="item in rollTypeArray"
                          :key="item.key"
                          :label="item.value"
                          :value="item.key"/>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label="模块编码"
                      prop="modular_no">
                      <el-input v-model="dialogSearchInfo.modular_no" />
                    </el-form-item>

                  </el-form>
                </el-col>
                <el-col :span="4">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="dialogSearchClick2">查询</el-button>
                </el-col>
              </el-row>
            </template>
            <template slot="TableBody">
              <el-table-column
                label="字段名称"
                prop="field_name"/>
              <el-table-column
                label="操作"
                align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleAddColumn2(scope.row)">添加</el-button>
                </template>
              </el-table-column>
            </template>
          </Table-easy>
        </el-col>

        <el-col :span="18">
          <div class="layout-search">
            <el-row>
              <el-col :span="21">
                <el-form
                  ref="dialogForm"
                  :model="dialogSearchInfo2"
                  :rules="dialogSearchInfo2Rules"
                  class="search-info"
                  label-width="80px">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item
                        label="工单名称"
                        prop="order_name">
                        <el-input 
                          v-model="dialogSearchInfo2.order_name" 
                          clearable />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="工单编码"
                        prop="order_no">
                        <el-input v-model="dialogSearchInfo2.order_no" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="轧辊类型"
                        prop="roll_type">
                        <el-select
                          v-model="dialogSearchInfo2.roll_type"
                          placeholder="请选择轧辊类型"
                          clearable
                          @change="rollTypeChange">
                          <el-option
                            v-for="item in rollTypeArray"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="产线"
                        prop="production_line">
                        <el-select
                          v-model="dialogSearchInfo2.production_line"
                          placeholder="请选择"
                          clearable
                          @change="production_line_change">
                          <el-option
                            v-for="item in productionLineArray"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        v-if="show"
                        label="产线id">
                        <el-input v-model="dialogSearchInfo2.production_line_id" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="轧辊材质"
                        prop="material_id">
                        <el-select
                          v-model="dialogSearchInfo2.material_id"
                          clearable
                          placeholder="请选择"
                          @change="handleMaterChange">
                          <el-option
                            v-for="item in materArray"
                            :key="item.key"
                            :label="item.value"
                            :value="Number(item.key)"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="生产商"
                        prop="factory_id">
                        <!-- <el-input v-model="dialogSearchInfo2.factory" /> -->
                        <el-select
                          v-model="dialogSearchInfo2.factory_id"
                          placeholder="请选择"
                          clearable
                          @change="handleFactoryChange">
                          <el-option
                            v-for="item in factoryArray"
                            :key="item.key"
                            :label="item.value"
                            :value="Number(item.key)"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="机架"
                        prop="frame_no">
                        <el-select
                          v-model="dialogSearchInfo2.frame_no"
                          placeholder="请选择"
                          clearable
                          @change="frame_no_change">
                          <el-option
                            v-for="item in frameNoArray"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        v-if="show"
                        label="机架id">
                        <el-input v-model="dialogSearchInfo2.frame_noid" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="机架范围"
                        prop="framerangeid">
                        <el-select
                          v-model="dialogSearchInfo2.framerangeid"
                          placeholder="请选择"
                          clearable
                          @change="handleFrameRangeChange">
                          <el-option
                            v-for="item in framefwArray"
                            :key="item.key"
                            :label="item.value"
                            :value="Number(item.key)"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="安装位置"
                        prop="install_location_id">
                        <el-select
                          v-model="dialogSearchInfo2.install_location_id"
                          clearable
                          placeholder="请选择"
                          @change="handleInstallChange">
                          <el-option
                            v-for="item in installArray"
                            :key="item.key"
                            :label="item.value"
                            :value="Number(item.key)"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="上机位置"
                        prop="up_location_id">
                        <el-select
                          v-model="dialogSearchInfo2.up_location_id"
                          placeholder="请选择"
                          clearable
                          @change="handleUpChange">
                          <el-option
                            v-for="item in upArray"
                            :key="item.key"
                            :label="item.value"
                            :value="Number(item.key)"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-col>
              <el-col :span="3">
                <div class="btn">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleAddColumn3()">添加</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <Table-easy
            :table-head="false"
            :table-data="dialogSearchInfo2.detail"
            :is-pagination-show="false"
            :load-info="loadingInfo"
            :table-height="300"
            class="rightTable">
            <template slot="TableBody">
              <el-table-column
                prop="field_name"
                label="字段名称">
                <template slot-scope="scope">
                  <el-input
                    v-show="scope.row.showFieldName"
                    v-model="scope.row.field_name" />
                  <span v-show="!scope.row.showFieldName">{{ scope.row.field_name }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="indexs"
                label="排序号">
                <template slot-scope="scope">
                  <el-input
                    :disabled="!scope.row.custom ? false : true"
                    v-model="scope.row.indexs" />
                </template>
              </el-table-column>
              <el-table-column
                prop="field_type"
                label="字段类型">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.field_type"
                    :disabled="!scope.row.custom ? false : true"
                    placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"/>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="dic_no"
                label="数据字典编码">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.dic_no"
                    :disabled="scope.row.field_type === '1' && !scope.row.custom ? false : true"/>
                </template>
              </el-table-column>
              <el-table-column
                prop="line"
                label="行">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.line"
                    :disabled="scope.row.field_type === '3' && !scope.row.custom ? false : true"/>
                </template>
              </el-table-column>
              <el-table-column
                prop="columns"
                label="列">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.columns"
                    :disabled="scope.row.field_type === '3' && !scope.row.custom ? false : true"/>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                min-width="80"
                align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="dialogHandleDelect(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </template>
          </Table-easy>
        </el-col>
      </el-row>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          @click="resetSave">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleSave('dialogForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get, post, getDataConfig } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
import { rolltypelist } from '@/api/pinClipBoard' //轧辊类型
export default {
  components: { TableEasy },
  data() {
    return {
      show: false,
      searchInfo: {
        indocno: '',
        sno: '',
        roll_typeid: '',
        roll_type: '',
        order_name: '',
        order_no: '',
        createtime: '',
        createname: '',
        createid: '',
        moditime: '',
        modiid: '',
        modiname: '',
        idel: '',
        snote: ''
      },
      input: '',
      formLabelAlign: {},
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 30,
      dialogVisible: false,
      dialogTable2: [
        {
          field_name: '辊号',
          custom: '1'
        },
        {
          field_name: '材质',
          custom: '1'
        },
        {
          field_name: '生产商',
          custom: '1'
        },
        {
          field_name: '轧辊类型',
          custom: '1'
        },
        {
          field_name: '机架号',
          custom: '1'
        },
        {
          field_name: '产线',
          custom: '1'
        }
      ],
      options: [],
      dialogSearchInfo: {},
      dialogSearchInfo2: {
        detail: [
          {
            field_name: '辊号',
            field_id: 'roll_no',
            custom: '1'
          },
          {
            field_name: '材质',
            field_id: 'material',
            custom: '1'
          },
          {
            field_name: '生产商',
            field_id: 'factory',
            custom: '1'
          },
          {
            field_name: '轧辊类型',
            field_id: 'roll_type',
            custom: '1'
          },
          {
            field_name: '机架号',
            field_id: 'frame_no',
            custom: '1'
          },
          {
            field_name: '产线',
            field_id: 'production_line',
            custom: '1'
          }
        ]
      },
      dialogSearchInfo2Rules: {
        order_name: [
          { required: true, message: '请输入工单名称', trigger: 'blur' }
        ],
        order_no: [
          { required: true, message: '请输入工单编码', trigger: 'blur' }
        ],
        roll_type: [
          { required: true, message: '请输入轧辊类型', trigger: 'blur' }
        ],
        production_line: [
          { required: true, message: '请输入产线', trigger: 'blur' }
        ],
        factory: [{ required: true, message: '请输入生产商', trigger: 'blur' }],
        material: [{ required: true, message: '请输入材质', trigger: 'blur' }],
        frame_no: [{ required: true, message: '请输入机架号', trigger: 'blur' }]
      },
      // 轧辊类型
      rollTypeArray: [],
      //产线
      productionLineArray: [],
      typeoptions: [],
      frameNoArray: [], //机架
      deleteArr: [], // 存放删除的数据
      n: 1, // 自增主键
      framefwArray: [],
      installArray: [],
      upArray: [],
      materArray: [],
      factoryArray: [],
      editInfo: {
        id: '',
        pageSize: 300,
        pageIndex: 1
      },
      loadingInfo: '暂无数据'
    }
  },
  created() {
    this.getDataDictionary()
    this.getFieldName()
  },
  mounted() {
    this.findAll()
    this.findOption()
    getDataConfig('framefw').then(res => {
      // console.log('机架范围', res)
      this.framefwArray = res
    })
    getDataConfig('installlocation').then(res => {
      // console.log('安装位置', res)
      this.installArray = res
    })
    getDataConfig('uplocation').then(res => {
      // console.log('上机位置', res)
      this.upArray = res
    })
    getDataConfig('roll_material').then(res => {
      // console.log('轧辊材质', res)
      this.materArray = res
    })
    getDataConfig('roll_factory').then(res => {
      // console.log('制造厂商', res)
      this.factoryArray = res
    })
  },
  methods: {
    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },
    // 机架范围下拉框
    handleFrameRangeChange() {
      this.framefwArray.forEach(item => {
        if (item.key == this.dialogSearchInfo2.framerangeid) {
          this.dialogSearchInfo2.framerange = item.value
        }
      })
    },
    // 安装位置下拉框
    handleInstallChange() {
      this.installArray.forEach(item => {
        if (item.key == this.dialogSearchInfo2.install_location_id) {
          this.dialogSearchInfo2.install_location = item.value
        }
      })
    },
    // 上机位置下拉框
    handleUpChange() {
      this.upArray.forEach(item => {
        if (item.key == this.dialogSearchInfo2.up_location_id) {
          this.dialogSearchInfo2.up_location = item.value
        }
      })
    },
    // 轧辊材质下拉框
    handleMaterChange() {
      this.materArray.forEach(item => {
        if (item.key == this.dialogSearchInfo2.material_id) {
          this.dialogSearchInfo2.material = item.value
        }
      })
    },
    // 制造厂商下拉框
    handleFactoryChange() {
      this.factoryArray.forEach(item => {
        if (item.key == this.dialogSearchInfo2.factory_id) {
          this.dialogSearchInfo2.factory = item.value
        }
      })
    },
    // 查询全部
    async findAll() {
      let res = await post('rollOrderconfig/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      })
      this.tableData = res.data
      this.total = res.count
    },
    //select-修改时传送参数
    production_line_change(vId) {
      let obj = {}
      obj = this.productionLineArray.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.key == vId) {
          this.dialogSearchInfo2.production_line = item.value
          this.dialogSearchInfo2.production_line_id = item.key
        }
      })
    },

    frame_no_change(vId) {
      let obj = {}
      obj = this.frameNoArray.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.key == vId) {
          this.dialogSearchInfo2.frame_no = item.value
          this.dialogSearchInfo2.frame_noid = item.key
        }
      })
    },
    rollTypeChange(vId) {
      let obj = {}
      obj = this.rollTypeArray.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.key == vId) {
          this.dialogSearchInfo2.roll_type = item.value
          this.dialogSearchInfo2.roll_typeid = item.key
        }
      })
    },
    // 打开弹窗按钮
    handleClick(formName) {
      // this.$refs[formName].resetFields()
      this.dialogSearchInfo = {}
      this.dialogSearchInfo2 = {}

      this.dialogSearchInfo2.detail = [
        {
          field_name: '辊号',
          field_id: 'roll_no',
          custom: '1'
        },
        {
          field_name: '材质',
          field_id: 'material',
          custom: '1'
        },
        {
          field_name: '生产商',
          field_id: 'factory',
          custom: '1'
        },
        {
          field_name: '轧辊类型',
          field_id: 'roll_type',
          custom: '1'
        },
        {
          field_name: '机架号',
          field_id: 'frame_no',
          custom: '1'
        },
        {
          field_name: '产线',
          field_id: 'production_line',
          custom: '1'
        }
      ]

      this.dialogVisible = true
    },
    /**
     * description: 删除一行数据
     */
    handleDelect(data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          post('rollOrderconfig/deleteOne', { indocno: data.indocno }).then(
            res => {
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
    handleEdit(data) {
      this.loadingInfo = '正在加载中……'
      this.dialogSearchInfo2 = JSON.parse(JSON.stringify(data))
      console.log('打印主表的值', data)
      this.editInfo.id = this.dialogSearchInfo2.sno
      this.findEditInfo()
      this.dialogVisible = true
    },
    // 查询子表信息
    async findEditInfo() {
      let res = await post('rollOrderconfigdetail/findByPage', {
        condition: { ilinkno: this.editInfo.id },
        pageIndex: this.editInfo.pageIndex,
        pageSize: this.editInfo.pageSize
      })
      console.log('打印字表信息', res)
      if (res.status == 2000) {
        this.dialogSearchInfo2.detail = res.data
      } else {
        this.dialogSearchInfo2.detail = [
          {
            field_name: '辊号',
            field_id: 'roll_no',
            custom: '1'
          },
          {
            field_name: '材质',
            field_id: 'material',
            custom: '1'
          },
          {
            field_name: '生产商',
            field_id: 'factory',
            custom: '1'
          },
          {
            field_name: '轧辊类型',
            field_id: 'roll_type',
            custom: '1'
          },
          {
            field_name: '机架号',
            field_id: 'frame_no',
            custom: '1'
          },
          {
            field_name: '产线',
            field_id: 'production_line',
            custom: '1'
          }
        ]
      }
      this.loadingInfo = '暂无数据'
    },
    // 复制按钮
    handleCopy(val) {
      var data = Object.assign({}, val)
      delete data.indocno
      data.detail.forEach(item => {
        delete item.indocno
      })
      this.dialogVisible = true
      this.dialogSearchInfo2 = data
    },
    resetSave() {
      this.dialogVisible = false
      this.deleteArr = []
      this.n = 1
      this.dialogSearchInfo2 = {}
    },
    /**
     * description: 弹窗确定按钮
     */
    handleSave(formName) {
      // this.submit()
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submit()
        } else {
          return false
        }
      })
    },
    submit() {
      let n = 0
      for (const item of this.dialogSearchInfo2.detail) {
        n++
        if (n > 4) {
          item.field_id = 'field' + item.indexs
        }
      }
      this.dialogSearchInfo2.detail = this.dialogSearchInfo2.detail.concat(
        this.deleteArr
      )
      if (this.dialogSearchInfo2.indocno) {
        post('rollOrderconfig/update', {
          rollOrderconfig: this.dialogSearchInfo2
        }).then(res => {
          if (res.status === 2000) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.findAll()
          } else {
            this.$message('修改失败')
          }
        })
      } else {
        post('rollOrderconfig/insert', {
          rollOrderconfig: this.dialogSearchInfo2
        }).then(res => {
          if (res.status === 2000) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
            this.findAll()
          } else {
            this.$message('保存失败')
          }
        })
      }

      this.deleteArr = []
      this.n = 1
      this.dialogVisible = false
      this.dialogSearchInfo2 = {}
      this.dialogSearchInfo2.detail = [
        {
          field_name: '辊号',
          field_id: 'roll_no',
          custom: '1'
        },
        {
          field_name: '材质',
          field_id: 'material',
          custom: '1'
        },
        {
          field_name: '生产商',
          field_id: 'factory',
          custom: '1'
        },
        {
          field_name: '轧辊类型',
          field_id: 'roll_type',
          custom: '1'
        },
        {
          field_name: '机架号',
          field_id: 'frame_no',
          custom: '1'
        },
        {
          field_name: '产线',
          field_id: 'production_line',
          custom: '1'
        }
      ]
    },
    /**
     * description: 重置按钮
     */
    resetForm(formName) {
      this.searchInfo = {}
      // this.$refs[formName].resetFields()
      this.findAll()
    },

    handleAddColumn2(val) {
      this.dialogSearchInfo2.detail.push({
        field_name: val.field_name,
        indexs: this.n
      })
      this.n++
    },
    handleAddColumn3() {
      this.dialogSearchInfo2.detail.push({ showFieldName: true })
    },
    /**
     * description: 数据字典类型
     */
    getDataDictionary() {
      post('dictionary/findMapV1', { dicno: 'fieldtype', level: 3 }).then(
        res => {
          this.options = res.data
        }
      )
    },
    /**
     * description: 弹窗左侧字段配置
     */
    getFieldName() {
      post('rollStandard/findByPage', {
        pageIndex: 1,
        pageSize: 100000,
        condition: this.dialogSearchInfo
      }).then(res => {
        for (const item of res.data) {
          item.iconfig = item.indocno
          item.indocno = ''
        }
        this.dialogTable2 = this.dialogTable2.concat(res.data)
      })
    },
    // 弹窗左边查询事件
    dialogSearchClick2() {
      this.dialogTable2 = [
        {
          field_name: '辊号'
        },
        {
          field_name: '材质'
        },
        {
          field_name: '生产商'
        },
        {
          field_name: '轧辊类型'
        },
        {
          field_name: '机架号'
        },
        {
          field_name: '产线'
        }
      ]
      this.getFieldName()
    },
    // 弹窗右边删除按钮
    dialogHandleDelect(val, item) {
      if (item.indocno) {
        item.idel = 0
        this.deleteArr.push(item)
        this.dialogSearchInfo2.detail.splice(val, 1)
      } else {
        this.dialogSearchInfo2.detail.splice(val, 1)
      }
      // deleteArr
    },
    // 分页
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    },
    //轧辊类型-下拉框数据
    //产线
    findOption() {
      post(rolltypelist, {
        dicno: 'rolltype'
      }).then(res => {
        this.rollTypeArray = res.data
      })
      post(rolltypelist, {
        dicno: 'proline'
      }).then(res => {
        this.productionLineArray = res.data
        console.log(this.productionLineArray)
      })
      post(rolltypelist, {
        dicno: 'frameteam'
      }).then(res => {
        this.frameNoArray = res.data
      })
    }
  }
}
</script>

<style>
.pz002table .u-table-main .el-table .el-table__body-wrapper::-webkit-scrollbar {
  display: none;
}
.rightTable .el-table__body-wrapper {
  overflow-y: scroll !important;
}
</style>
