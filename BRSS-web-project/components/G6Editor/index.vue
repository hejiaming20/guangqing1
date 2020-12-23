<!--
 * @Author: your name
 * @Date: 2020-09-08 16:44:12
 * @LastEditTime: 2020-10-21 10:52:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\components\G6Editor\index.vue
-->
<template>
  <div 
    id="mountNode" 
    :style="{width:width}">
    <div class="editor" >
      <toolbar 
        :flow-info="flowData" 
        @fatherMethod="fatherMethod"/>
      <div style="height: 42px;"/>
      <div class="bottom-container">
        <item-panel />
        <detail-panel :param-info="paramList"/>
        <page 
          :height="height" 
          :width="width" 
          :data="data" />
      </div>
    </div>
    <Flow />
  </div>
</template>

<script>
import Toolbar from '../Toolbar'
import ItemPanel from '../ItemPanel'
import DetailPanel from '../DetailPanel'
import Page from '../Page'
import Flow from '../Flow'
import Editor from '@/components/Base/Editor'
import command from '@/command'
export default {
  name: 'G6Editor',
  components: {
    Toolbar,
    ItemPanel,
    DetailPanel,
    Page,
    Flow
  },
  props: {
    height: {
      type: Number,
      default: document.documentElement.clientHeight - 42 - 20
    },
    width: {
      type: Number,
      default: document.documentElement.clientWidth
    },
    data: {
      type: Object,
      default: () => {}
    },
    work: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      editor: {},
      command: null,
      flowData: {},
      paramList: []
    }
  },
  watch: {
    work: {
      handler(newVal, oldVal) {
        this.flowData = newVal
        this.paramList = newVal.paramList
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.editor = new Editor()
      this.command = new command(this.editor)
    },
    fatherMethod() {
      this.$emit('fatherMethod')
    }
  }
}
</script>

<style scoped>
.editor {
  position: relative;
  width: 100%;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.bottom-container {
  position: relative;
}
</style>
