<template>
  <div class="toolbar">
    <i
      :class="undoList.length>0?'':'disable'"
      class="command iconfont icon-chexiao"
      title="撤销"
      @click="handleUndo"
    />
    <i
      :class="redoList.length>0?'':'disable'"
      class="command iconfont icon-zhongzuo"
      title="重做"
      @click="handleRedo"
    />
    <span class="separator"/>
    <i
      :class="selectedItem?'':'disable'"
      data-command="delete"
      class="command iconfont icon-shanchu"
      title="删除"
      @click="handleDelete"
    />
    <span class="separator"/>
    <i
      data-command="zoomIn"
      class="command iconfont icon-fangda"
      title="放大"
      @click="handleZoomIn"
    />
    <i
      data-command="zoomOut"
      class="command iconfont icon-suoxiao"
      title="缩小"
      @click="handleZoomOut"
    />
    <i
      data-command="autoZoom"
      class="command iconfont icon-shiying"
      title="适应画布"
      @click="handleAutoZoom"
    />
    <i
      data-command="resetZoom"
      class="command iconfont icon-shijichicun"
      title="实际尺寸"
      @click="handleResetZoom"
    />
    <span class="separator"/>
    <div class="inputClass layout-one-input">
      <p class="label-input">工作流名称</p>
      <el-input 
        v-model="form.flow_name" 
        placeholder="请输入工作流名称" 
        class="name-input"/>
    </div>
    <div class="inputClass layout-one-input">
      <p class="label-input">分类</p>
      <el-select 
        v-model="form.flow_typeid" 
        placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.key"
          :label="item.value"
          :value="item.key"/>
      </el-select>
    </div>
    <el-button 
      type="primary" 
      size="mini"
      @click="consoleData">保存数据</el-button>
    <el-button 
      type="primary" 
      size="mini"
      @click="clearData">清空画布</el-button>
  </div>
</template>

<script>
import eventBus from '@/utils/eventBus'
import { get, post } from '@/lib/Util'
import Util from '@antv/g6/src/util'
import { uniqueId, getBox } from '@/utils'
export default {
  props: {
    flowInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      page: {},
      graph: {},
      redoList: [],
      undoList: [],
      editor: null,
      command: null,
      selectedItem: null,
      multiSelect: false,
      addGroup: false,
      isTrue: true,
      form: {
        detail: [],
        paramList: [],
        noid_array: [], // 存放删除的nodeid
        flow_name: '',
        flow_char: '',
        flow_type: '', // 分类值
        flow_typeid: '' // 分类id
      },
      options: [] // 工作流分类选择
    }
  },
  watch: {
    selectedItem(val) {
      if (val && val.length > 1) {
        this.addGroup = true
      } else {
        this.addGroup = false
      }
    },
    flowInfo(newVal, oldVal) {
      if (newVal.createid) {
        this.form = newVal
        this.form.noid_array = []
      } else {
        // this.form = {}
        this.form = {
          detail: [],
          paramList: [],
          noid_array: [],
          flow_name: '',
          flow_char: '',
          flow_type: '', // 分类值
          flow_typeid: '' // 分类id
        }
      }
    },
    'form.flow_typeid': {
      handler(newVal, oldVal) {
        if (typeof newVal === 'number') {
          this.options.map(item => {
            if (String(newVal) === item.key) {
              this.form.flow_typeid = String(newVal)
              this.form.flow_type = item.value
            }
          })
        } else {
          this.options.map(item => {
            if (newVal === item.key) {
              this.form.flow_type = item.value
              this.form.flow_typeid = newVal
            }
          })
        }
      }
    }
  },
  created() {
    this.init()
    this.bindEvent()
    this.findAll()
    eventBus.$on('paramList', info => {
      this.form.paramList = info
      this.form.noid_array = []
    })
  },
  methods: {
    findAll() {
      // 查询参数
      post('dictionary/findMapV1', { dicno: 'flow_type' }).then(res => {
        this.options = res.data
      })
    },
    init() {
      const { editor, command } = this.$parent
      this.editor = editor
      this.command = command
    },
    bindEvent() {
      let self = this
      eventBus.$on('afterAddPage', page => {
        self.page = page
        self.graph = self.page.graph
      })
      eventBus.$on('add', data => {
        this.redoList = data.redoList
        this.undoList = data.undoList
      })
      eventBus.$on('update', data => {
        this.redoList = data.redoList
        this.undoList = data.undoList
      })
      eventBus.$on('delete', data => {
        this.redoList = data.redoList
        this.undoList = data.undoList
      })
      eventBus.$on('updateItem', item => {
        this.command.executeCommand('update', [item])
      })
      eventBus.$on('addItem', item => {
        this.command.executeCommand('add', [item])
      })
      eventBus.$on('nodeselectchange', () => {
        this.selectedItem = this.graph.findAllByState('node', 'selected')
        this.selectedItem = this.selectedItem.concat(
          ...this.graph.findAllByState('edge', 'selected')
        )
      })
      eventBus.$on('deleteItem', () => {
        this.handleDelete()
      })
      eventBus.$on('muliteSelectEnd', () => {
        this.multiSelect = false
        this.selectedItem = this.graph.findAllByState('node', 'selected')
      })
    },
    handleUndo() {
      if (this.undoList.length > 0) this.command.undo()
    },
    handleRedo() {
      if (this.redoList.length > 0) this.command.redo()
    },
    // 删除的同时保存删除的id
    handleDelete() {
      if (this.selectedItem) {
        this.form.noid_array.push(this.selectedItem[0]._cfg.id)
        if (this.selectedItem.length > 0) {
          this.command.executeCommand('delete', this.selectedItem)
          this.selectedItem = null
        }
      }
    },
    getFormatPadding() {
      return Util.formatPadding(this.graph.get('fitViewPadding'))
    },
    getViewCenter() {
      const padding = this.getFormatPadding()
      const graph = this.graph
      const width = this.graph.get('width')
      const height = graph.get('height')
      return {
        x: (width - padding[2] - padding[3]) / 2 + padding[3],
        y: (height - padding[0] - padding[2]) / 2 + padding[0]
      }
    },
    handleZoomIn() {
      const currentZoom = this.graph.getZoom()
      this.graph.zoomTo(currentZoom + 0.5, this.getViewCenter())
    },
    handleZoomOut() {
      const currentZoom = this.graph.getZoom()
      this.graph.zoomTo(currentZoom - 0.5, this.getViewCenter())
    },
    handleToBack() {
      if (this.selectedItem && this.selectedItem.length > 0) {
        this.selectedItem.forEach(item => {
          item.toBack()
          this.graph.paint()
        })
      }
    },
    handleToFront() {
      if (this.selectedItem && this.selectedItem.length > 0) {
        this.selectedItem.forEach(item => {
          if (item.getType() === 'edge') {
            // const nodeGroup = this.graph.get("nodeGroup");
            // const edgeGroup = item.get("group");
            // nodeGroup.toFront();
            // edgeGroup.toFront()
          } else {
            item.toFront()
          }

          this.graph.paint()
        })
      }
    },
    handleAutoZoom() {
      this.graph.fitView(20)
    },
    handleResetZoom() {
      this.graph.zoomTo(1, this.getViewCenter())
    },
    handleMuiltSelect() {
      this.multiSelect = true
      this.graph.setMode('mulitSelect')
    },
    getPosition(items) {
      const boxList = []
      items.forEach(item => {
        const box = item.getBBox()
        boxList.push(getBox(box.x, box.y, box.width, box.height))
      })
      let minX1, minY1, MaxX2, MaxY2
      boxList.forEach(box => {
        if (typeof minX1 == 'undefined') {
          minX1 = box.x1
        }
        if (typeof minY1 == 'undefined') {
          minY1 = box.y1
        }
        if (typeof MaxX2 == 'undefined') {
          MaxX2 = box.x2
        }
        if (typeof MaxY2 == 'undefined') {
          MaxY2 = box.y2
        }
        if (minX1 > box.x1) {
          minX1 = box.x1
        }
        if (minY1 > box.y1) {
          minY1 = box.y1
        }
        if (MaxX2 < box.x2) {
          MaxX2 = box.x2
        }
        if (MaxY2 < box.y2) {
          MaxY2 = box.y2
        }
      })
      const width = MaxX2 - minX1,
        height = MaxY2 - minY1,
        x = minX1 + width / 2,
        y = minY1 + height / 2,
        id = 'team' + uniqueId()
      const model = {
        id: id,
        width,
        height,
        x,
        y,
        shape: 'teamNode'
      }
      this.command.executeCommand('add', model)
      // const item = this.graph.findById(id);
      // item.get("group").toBack();
      // const edgeGroup = this.graph.get("edgeGroup");
      // edgeGroup.toFront();
      // this.graph.paint();
    },

    consoleData() {
      if (!this.form.flow_name) {
        this.$message('请填写工作流名称')
        return
      }
      let data = this.graph.save()
      let nodes = [] // 存放node节点
      let formItem = {}

      this.form.flow_char = JSON.stringify(this.graph.save()) // 前端UIjson

      for (let item of data.nodes) {
        let beforeID = ''
        if (item.ruleform) {
          formItem = {
            nodename: item.label,
            nodeid: item.id,
            step_type: item.step_type,
            order_name: item.ruleform.order_name
              ? item.ruleform.order_name
              : null,
            order_id: item.ruleform.order_id || null,
            smessage: item.ruleform.smessage || null,
            iurl: item.ruleform.iurl || null,
            surl: item.ruleform.surl || null,
            iuserorgroup: item.ruleform.iuserorgroup || null,
            ugname: item.ruleform.ugname || null,
            ugid: item.ruleform.ugid || null,
            event_no: item.ruleform.event_no || null,
            ischeduled: item.ruleform.ischeduled || null,
            scheduled_starttime: item.ruleform.scheduled_starttime || null,
            scheduled_time: item.ruleform.scheduled_time || null,
            scheduled_unit: item.ruleform.scheduled_unit || null,
            moveup_time: item.ruleform.moveup_time || null,
            updateList: item.ruleform.updateList || [],
            logicallist: item.ruleform.logicallist || []
          }
        } else {
          formItem = {
            nodename: item.label,
            nodeid: item.id,
            step_type: item.step_type
          }
        }

        for (let edgeItem of data.edges) {
          if (item.id === edgeItem.sourceId) {
            formItem.nextnodeid = edgeItem.targetId
          } else if (item.id === edgeItem.targetId) {
            beforeID = beforeID + ',' + edgeItem.sourceId
          }
        }
        formItem.befornodeid = beforeID.substring(1)
        nodes.push(formItem)
        formItem = {}
      }

      this.form.detail = nodes

      console.log('保存工作流数据', this.form)

      this.saveData(this.form)
    },
    async saveData(data) {
      if (data.indocno) {
        let res = await post('workFlow/update', { workFlow: data })
        if (res.status === 2000) {
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
          this.$emit('fatherMethod')
        } else {
          this.$message({
            type: 'warning',
            message: '编辑失败'
          })
        }
      } else {
        let res = await post('workFlow/insert', { workFlow: data })
        if (res.status === 2000) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.$emit('fatherMethod')
        } else {
          this.$message({
            type: 'warning',
            message: '添加失败'
          })
        }
      }
    },
    clearData() {
      // this.graph.clear()
      eventBus.$emit('clearNodeInfo', 'info')
      this.form = {
        detail: [],
        paramList: [],
        noid_array: [],
        flow_name: '',
        flow_char: '',
        flow_type: '', // 分类值
        flow_typeid: '' // 分类id
      }
      eventBus.$emit('clearParamlist', this.form.paramList)
    }
  }
}
</script>


<style scoped>
.toolbar {
  box-sizing: border-box;
  padding: 8px 0px;
  width: 100%;
  border: 1px solid #1a367a;
  height: 42px;
  z-index: 3;
  background-color: #1a367a;
  color: #eae8c5;
  box-shadow: 0px 8px 12px 0px rgba(0, 52, 107, 0.04);
  position: absolute;
}
.toolbar .command:nth-of-type(1) {
  margin-left: 24px;
}
.toolbar .command {
  box-sizing: border-box;
  width: 27px;
  height: 27px;
  line-height: 27px;
  margin: 0px 6px;
  border-radius: 2px;
  padding-left: 4px;
  display: inline-block;
  border: 1px solid rgba(2, 2, 2, 0);
}
.toolbar .command:hover {
  cursor: pointer;
  border: 1px solid #409eff;
}
.toolbar .disable {
  color: #eae8c5;
}
.toolbar .separator {
  margin: 4px;
  border-left: 1px solid #253f80;
}
.inputClass {
  display: inline;
  width: 200px;
}
.label-input {
  display: inherit;
  font-size: 14px;
}
.name-input {
  display: inherit;
}
</style>
<style>
.name-input .el-input__inner {
  width: 150px !important;
}
</style>
