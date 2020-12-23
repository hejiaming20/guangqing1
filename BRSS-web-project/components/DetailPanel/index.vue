<template>
  <div class="detailpannel">
    <div>
      <div 
        v-if="status=='node-selected'" 
        id="node_detailpannel" 
        class="pannel">
        <div class="pannel-title">模型详情</div>
        <div class="block-container layout-search layout-one-input">
          <el-row :gutter="5">
            <el-col :span="8"><span style="color: #eae8c5">步骤名称</span></el-col>
            <el-col :span="16">
              <el-input 
                v-model="node.label" 
                :disabled="!node.flag" />
            </el-col>
          </el-row>
          <!-- 步骤节点的内容 -->
          <div 
            v-show="node.flag" 
            class="layout-default-margin">
            <el-form 
              ref="form" 
              :model="form" 
              label-width="100px">
              <p class="right-title">基础配置</p>
              <el-form-item label="推送消息设置">
                <el-input v-model="form.smessage"/>
              </el-form-item>
              <el-form-item label="关联业务">
                <el-select 
                  v-model="form.order_id" 
                  placeholder="请选择相关联的工单"
                  @change="orderChange">
                  <el-option 
                    v-for="(item, index) in common"
                    :key="index"
                    :label="item.value" 
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <el-form-item label="跳转地址URL">
                <!-- <el-input v-model="form.iurl"/> -->
                <el-select 
                  v-model="form.iurl" 
                  placeholder="请选择跳转地址"
                  @change="urlChange">
                  <el-option 
                    v-for="(item, index) in dictionary"
                    :key="index"
                    :label="item.value" 
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <p class="right-title">权限配置</p>
              <el-form-item label="权限类型">
                <el-radio 
                  v-model="form.iuserorgroup" 
                  label="1">人员</el-radio>
                <el-radio 
                  v-model="form.iuserorgroup" 
                  label="0">组</el-radio>
                <div v-show="form.iuserorgroup === '1'">
                  <el-select 
                    v-model="user" 
                    placeholder="请选择人员"
                    @change="handleUserChange"
                  >
                    <el-option 
                      v-for="(item, index) in people"
                      :key="index"
                      :label="item.value" 
                      :value="item.key"/>
                  </el-select>
                </div>
                <div v-show="form.iuserorgroup === '0'">
                  <el-select 
                    v-model="ugroup"
                    placeholder="请选择组" 
                    @change="handleUgroupChange">
                    <el-option 
                      v-for="(item, index) in group"
                      :key="index"
                      :label="item.value" 
                      :value="item.key"/>
                  </el-select>
                </div>
              </el-form-item>
              <p class="right-title">定时配置</p>
              <el-form-item label="是否定时:">
                <el-radio 
                  v-model="form.ischeduled" 
                  label="1">是</el-radio>
                <el-radio 
                  v-model="form.ischeduled" 
                  label="0">否</el-radio>
              </el-form-item>
              <div v-show="form.ischeduled === '1'">
                <el-form-item label="定时开始时间">
                  <el-date-picker 
                    v-model="form.scheduled_starttime" 
                    type="datetime" 
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"/>
                </el-form-item>
                <el-form-item label="定时周期时长">
                  <el-input-number 
                    v-model="form.scheduled_time" 
                    step-strictly
                    size="small"/>
                </el-form-item>
                <el-form-item label="时长单位">
                  <el-select 
                    v-model="form.scheduled_unit" 
                    placeholder="请选择时长单位">
                    <el-option 
                      v-for="(item, index) in timeArray"
                      :key="index"
                      :label="item.value" 
                      :value="item.key"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="提前提醒天数(天)">
                  <el-input-number 
                    v-model="form.moveup_time"
                    step-strictly 
                    size="small"/>
                </el-form-item>
              </div>
              <el-form-item label="事件号">
                <el-input v-model="form.event_no"/>
              </el-form-item>
            </el-form>
            <div class="space-layout">
              <p class="right-title">参数列表</p>
              <p 
                class="layout-small-title" 
                @click="handleAddUpdateList">添加参数</p>
            </div>
            <el-table 
              :data="updateList"
              class="custom-table layout-default-margin" 
              border>
              <el-table-column 
                label="表名" 
                min-width="120"
                prop="table_name">
                <template slot-scope="scope">
                  <el-select 
                    v-model="scope.row.table_name" 
                    placeholder="请选择表名">
                    <el-option 
                      v-for="(item, index) in tableOption"
                      :key="index"
                      :label="item.value" 
                      :value="item.key"/>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column 
                label="字段名" 
                min-width="120"
                prop="field_name">
                <template slot-scope="scope">
                  <el-select 
                    v-model="scope.row.field_no" 
                    placeholder="请选择参数">
                    <el-option 
                      v-for="(item, index) in paramOption"
                      :key="index"
                      :label="item.value" 
                      :value="item.key"/>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column 
                label="更新后的值" 
                prop="defaultValue"
                min-width="120">
                <template slot-scope="scope">
                  <el-cascader 
                    v-model="scope.row.defaultValue"
                    :options="updateListArray" 
                    :props="jilian"
                    :show-all-levels="false" 
                    @change="handleUpdateChange(scope.row.defaultValue, scope.row)"/>
                </template>
              </el-table-column>
              <!-- <el-table-column 
                prop="update_value" 
                min-width="120"/> -->
              <el-table-column 
                label="操作">
                <template slot-scope="scope">
                  <el-button 
                    size="mini" 
                    type="danger" 
                    @click="handleDelectUpdataList(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 逻辑判断节点的内容 -->
          <div 
            v-show="!node.flag" 
            class="layout-default-margin">
            <el-table 
              :data="logicallist" 
              border>
              <el-table-column 
                label="下一步骤名称" 
                width="120px"
                prop="nextnodename"/>
              <el-table-column 
                label="是否自定义算法" 
                width="160px"
                prop="icustom">
                <template slot-scope="scope">
                  <!-- <el-input v-model="scope.row.icustom"/> -->
                  <el-select 
                    v-model="scope.row.icustom" 
                    placeholder="是否自定义算法">
                    <el-option
                      :value="1" 
                      label="是"/>
                    <el-option
                      :value="0" 
                      label="否"/>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column 
                label="算法下拉" 
                width="160px"
                prop="customkey">
                <template slot-scope="scope">
                  <el-select 
                    v-model="scope.row.customkey" 
                    placeholder="请选择相关联的工单">
                    <el-option 
                      v-for="(item, index) in config"
                      :key="index"
                      :label="item.value" 
                      :value="item.key"/>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column 
                label="逻辑操作符" 
                width="160px"
                prop="ilogical">
                <template slot-scope="scope">
                  <el-select 
                    v-model="scope.row.ilogical" 
                    placeholder="请选择运算符">
                    <el-option
                      :value="0" 
                      label="="/>
                    <el-option
                      :value="1" 
                      label=">"/>
                    <el-option
                      :value="2" 
                      label="<"/>
                    <el-option
                      :value="3" 
                      label=">="/>
                    <el-option
                      :value="4" 
                      label="<="/>
                    <el-option
                      :value="5" 
                      label="&&"/>
                    <el-option
                      :value="6" 
                      label="||"/>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column 
                label="逻辑操作对比值" 
                width="120px"
                prop="icontrast">
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.icontrast"/>
                </template>
              </el-table-column>
              <el-table-column 
                label="对比字段" 
                width="160px"
                prop="sfield">
                <template slot-scope="scope">
                  <el-select 
                    v-model="scope.row.ifield"
                    placeholder="请选择参数">
                    <el-option 
                      v-for="(item, index) in paramOption"
                      :key="index"
                      :label="item.value" 
                      :value="item.key"/>
                  </el-select>
                </template>
              </el-table-column>
              <!-- <el-table-column 
                label="下一步ID" 
                width="160px"
                prop="nextnodeid"/> -->
            </el-table>
          </div>
          <el-button 
            type="primary" 
            size="mini"
            @click="submitForm('form')">保存配置</el-button>
          <el-button 
            size="mini" 
            type="primary" 
            @click="resetForm('form')">重置配置</el-button>
        </div>
      </div>

      <div 
        v-if="status==='canvas-selected'" 
        id="canvas_detailpannel" 
        class="pannel">
        <div class="pannel-title">画布</div>
        <div class="block-container">
          <el-table 
            :data="paramList"
            class="layout-default-margin" 
            border>
            <el-table-column 
              label="参数名称"
              prop="field_name">
              <template slot-scope="scope">
                <!-- <el-input v-model="scope.row.field_name"/> -->
                <div class="layout-one-input">
                  <el-select 
                    v-model="scope.row.field_no" 
                    placeholder="请选择参数"
                  >
                    <el-option 
                      v-for="(item, index) in paramOption"
                      :key="index"
                      :label="item.value" 
                      :value="item.key"/>
                  </el-select>
                </div>
              </template>
            </el-table-column>
            <el-table-column 
              width="80"
              label="操作">
              <template slot-scope="scope">
                <span>
                  <el-button 
                    size="mini" 
                    type="danger"
                    @click="handlelogicDel(scope.$index)">删除</el-button>
                </span>  
              </template>  
            </el-table-column>
          </el-table>
          <div>
            <el-button 
              size="mini" 
              type="primary"
              @click="handleParamAdd">添加</el-button>
            <el-button 
              size="mini" 
              type="primary"
              @click="handleParamSave">保存</el-button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import eventBus from '@/utils/eventBus'
import Grid from '@antv/g6/build/grid'
import { get, post, getDataConfig } from '@/lib/Util'
export default {
  props: {
    paramInfo: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      status: 'canvas-selected',
      showGrid: false,
      page: {},
      graph: {},
      item: {},
      node: {},
      newModel: {},
      grid: null,
      form: {
        order_id: ''
      },
      updateList: [], // 更新字段
      logicallist: [], // 逻辑判断的值
      radio: '', // 权限类型
      write: '', // 是否会签
      timer: '',
      common: [], // 关联接口
      dictionary: [], //跳转地址接口
      people: [], //人员选择接口
      group: [], //组选择接口
      config: [], //自定义配置下拉接口
      timeArray: [], //时间
      user: '', // 选人
      ugroup: '', //选组
      paramList: [], // 参数列表
      paramOption: [],
      nodeId: '', // nodeid用于判断俩次是否是同一个节点
      tableOption: [],
      updateListArray: [],
      jilian: {
        value: 'key',
        label: 'value',
        children: 'children'
      }
    }
  },
  watch: {
    'form.ischeduled': {
      handler(newVal, oldVal) {
        if (newVal === '0') {
          this.form.scheduled_starttime = ''
          this.form.scheduled_time = ''
          this.form.scheduled_unit = ''
          this.form.moveup_time = ''
        }
      }
    },
    paramInfo: {
      handler(newVal, oldVal) {
        console.log('新知paramInfo', newVal)
        if (newVal) {
          this.paramList = newVal
          console.log('paramList', this.paramList)
        } else {
          this.form = {}
        }
      }
    }
  },
  created() {
    this.bindEvent()
    this.findAll()
    eventBus.$on('clearParamlist', info => {
      this.paramList = info
    })
  },
  mounted() {
    post('/dictionary/findCascader', { dicno: 'tableparam' }).then(res => {
      this.updateListArray = res.data
    })
  },
  methods: {
    // 更新后的值
    handleUpdateChange(val, row) {
      console.log(val)
      row.update_value = val[val.length - 1]
    },
    // 人员选择
    handleUserChange() {
      this.people.map(item => {
        if (item.key === this.user) {
          this.form.ugname = item.value
          this.form.ugid = this.user
        }
      })
    },
    // 分组选择
    handleUgroupChange() {
      this.group.map(item => {
        if (item.key === this.ugroup) {
          this.form.ugname = item.value
          this.form.ugid = this.ugroup
        }
      })
    },
    findAll() {
      // 关联业务
      post('common/findMap', {
        tablename: 'order_service',
        key: 'indocno',
        value: 'service_name'
      }).then(res => {
        this.common = res.data
      })
      post('dictionary/findMapV1', { dicno: 'tourl' }).then(res => {
        this.dictionary = res.data
      })
      post('common/findMap', {
        tablename: 'sys_user',
        key: 'indocno',
        value: 'sname'
      }).then(res => {
        this.people = res.data
      })
      post('common/findMap', {
        tablename: 'sys_role',
        key: 'indocno',
        value: 'role_name'
      }).then(res => {
        this.group = res.data
      })
      post('dictionary/findMapV1', { dicno: 'math' }).then(res => {
        this.config = res.data
      })
      post('dictionary/findMapV1', { dicno: 'datetime' }).then(res => {
        this.timeArray = res.data
      })
      // 参数名称     dico 变成  flow_param
      post('dictionary/findMapV1', { dicno: 'flow_param' }).then(res => {
        this.paramOption = res.data
      })
      // 表名下拉  findMapV1     dico 变成  tablename
      post('dictionary/findMapV1', { dicno: 'tablename' }).then(res => {
        this.tableOption = res.data
      })
    },
    bindEvent() {
      let self = this
      eventBus.$on('afterAddPage', page => {
        self.page = page
        self.graph = self.page.graph
        eventBus.$on('nodeselectchange', item => {
          if (item.select === true && item.target.getType() === 'node') {
            if (item.target.getModel().id !== this.nodeId) {
              self.form = {}
              self.updateList = []
              self.logicallist = []
              self.user = ''
              self.ugroup = ''
            }
            self.status = 'node-selected'
            self.item = item.target
            self.node = item.target.getModel()
            self.newModel = JSON.parse(JSON.stringify(self.node))
            console.log('节点信息', self.newModel)
            this.nodeId = self.newModel.id
            let edges = self.graph.getEdges()
            let logicArray = [] // 存放逻辑节点的所有值
            let saveData = []
            if (!self.node.flag) {
              if (!self.node.ruleform) {
                console.log('逻辑判断没有值')
                self.ruleform = {}

                for (const item of edges) {
                  if (item._cfg.source._cfg.id === self.node.id) {
                    self.logicallist.push({
                      nextnodeid: item._cfg.target._cfg.id,
                      nextnodename: item._cfg.target._cfg.model.label
                    })
                  }
                }
              } else {
                console.log('逻辑判断有值')
                self.logicallist = self.newModel.ruleform.logicallist
                // let data = self.newModel.ruleform.logicallist
                for (const item of edges) {
                  if (item._cfg.source._cfg.id === self.node.id) {
                    logicArray.push({
                      nextnodeid: item._cfg.target._cfg.id,
                      nextnodename: item._cfg.target._cfg.model.label
                    })
                  }
                }
                console.log('线条', logicArray)
                for (let i = 0; i < self.logicallist.length; i++) {
                  for (let n = 0; n < logicArray.length; n++) {
                    if (
                      self.logicallist[i].nextnodeid ===
                      logicArray[n].nextnodeid
                    ) {
                      self.logicallist[i].nextnodename =
                        logicArray[n].nextnodename
                      logicArray.splice(n, 1)
                    }
                  }
                }
                self.logicallist = self.logicallist.concat(logicArray)
                self.form.logicallist = self.logicallist
                self.newModel.ruleform = self.form
                console.log('form', self.form)
                self.graph.update(self.item, self.newModel)
                console.log('新知', self.logicallist)
              }
            } else {
              if (self.node.ruleform) {
                self.form = self.node.ruleform
                if (self.node.ruleform.iuserorgroup == 1) {
                  self.user = self.node.ruleform.ugid || ''
                }
                if (self.node.ruleform.iuserorgroup == 0) {
                  self.ugroup = self.node.ruleform.ugid || ''
                }

                self.updateList = self.node.ruleform.updateList
              }
            }
          } else {
            self.status = 'canvas-selected'
            self.item = null
            self.node = null
            self.form = {}
            self.updateList = []
            self.logicallist = []
          }
        })
      })
    },
    changeGridState(value) {
      if (value) {
        this.grid = new Grid()
        this.graph.addPlugin(this.grid)
      } else {
        this.graph.removePlugin(this.grid)
      }
    },
    // 重置form表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.form = {}
    },
    // 订单选择
    orderChange() {
      this.common.find(item => {
        if (this.form.order_id === item.key) {
          this.form.order_name = item.value
        }
      })
    },
    // url 选择
    urlChange() {
      this.dictionary.find(item => {
        if (this.form.iurl === item.key) {
          this.form.surl = item.value
        }
      })
    },
    // 给更新表格添加一行
    handleAddUpdateList() {
      this.updateList.push({})
    },
    // 更新表格删除一行
    handleDelectUpdataList(index) {
      this.updateList.splice(index, 1)
    },
    // 添加按钮
    submitForm() {
      for (const item of this.updateList) {
        for (const val of this.paramOption)
          if (item.field_no === val.key) {
            item.field_name = val.value
          }
      }
      if (this.logicallist.length !== 0) {
        for (const item of this.logicallist) {
          for (const val of this.paramOption)
            if (item.ifield === val.key) {
              item.sfield = val.value
            }
        }
        for (const item of this.logicallist) {
          for (const val of this.config)
            if (item.customkey === val.key) {
              item.customvalue = val.value
            }
        }
      }
      this.form.updateList = this.updateList
      this.form.logicallist = this.logicallist
      this.newModel.ruleform = this.form
      this.newModel.label = this.node.label
      console.log('form', this.form)

      this.graph.update(this.item, this.newModel)
    },
    handleParamAdd() {
      this.paramList.push({})
    },
    handleParamSave() {
      for (const item of this.paramList) {
        for (const val of this.paramOption)
          if (item.field_no === val.key) {
            item.field_name = val.value
          }
      }
      eventBus.$emit('paramList', this.paramList)
    },
    handlelogicDel(val) {
      this.paramList.splice(val, 1)
    }
  }
}
</script>

<style scoped>
.detailpannel {
  height: 100%;
  position: absolute;
  right: 0px;
  z-index: 5;
  background: #253f80;
  width: 40%;
  border-left: 1px solid #253f80;
}

.detailpannel .block-container {
  padding: 16px 8px;
  /* height: calc(100vh - 120px); */
  overflow-y: scroll;
  color: #eae8c5;
}
.block-container .el-checkbox {
  color: #eae8c5;
}
.block-container .el-col {
  height: 28px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.block-container::-webkit-scrollbar {
  display: none;
}
.pannel-title {
  height: 32px;
  background: #253f80;
  color: #eae8c5;
  line-height: 28px;
  padding-left: 12px;
}

.right-title {
  color: #eae8c5;
  margin: 3px 0;
}
</style>
