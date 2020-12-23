<!--
 * @Author: your name
 * @Date: 2020-09-08 16:44:12
 * @LastEditTime: 2020-10-14 14:24:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\components\Page\index.vue
-->
<template>
  <div class="page">
    <div 
      :id="pageId" 
      class="graph-container" 
      style="position: relative;"/>
  </div>
</template>


<script>
import G6 from '@antv/g6/build/g6'
import eventBus from '@/utils/eventBus'
import { initBehavors } from '@/behavior'
export default {
  props: {
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      pageId: 'graph-container',
      graph: null
    }
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        this.data = newVal
        this.readData()
      }
    }
  },
  created() {
    initBehavors()
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
      eventBus.$on('clearNodeInfo', info => {
        this.graph.clear()
      })
    })
  },
  methods: {
    init() {
      const height = this.height - 42
      const width = this.width - 400

      this.graph = new G6.Graph({
        container: 'graph-container',
        height: height,
        width: width,
        modes: {
          // 支持的 behavior
          default: [
            'drag-canvas',
            'zoom-canvas',
            'hover-node',
            'select-node',
            'hover-edge',
            'keyboard',
            'customer-events',
            'add-menu'
          ],
          mulitSelect: ['mulit-select'],
          addEdge: ['add-edge'],
          moveNode: ['drag-item']
        }
      })
      const { editor, command } = this.$parent
      editor.emit('afterAddPage', { graph: this.graph, command })

      this.readData()
    },
    readData() {
      let data = this.data
      if (data) {
        this.graph.read(data)
      }
    }
  }
}
</script>

<style scoped>
.page {
  margin-left: 200px;
  margin-right: 200px;
}
</style>
