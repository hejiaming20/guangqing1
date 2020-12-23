<template>
  <div class="variable">
    <div class="variable-title">变量区</div>
    <ul>
      <li 
        v-for="(item,index) in list" 
        :key="index" 
        :data-shape="item.shape" 
        :data-type="item.type" 
        :data-size="item.size"
        class="getItem" 
        draggable 
        @dragstart="handleDragstart" 
        @dragend="handleDragEnd($event,item)">
        <span 
          :style="{background:'url('+item.image+')'}" 
          class="pannel-type-icon"/>
        {{ item.name }}
      </li>
    </ul>
		
  </div>
</template>

<script>
import eventBus from '@/utils/eventBus'
import okSvg from '@/assets/icons/ok.svg'
import bgImg from '@/assets/bg.jpg'
export default {
  data() {
    return {
      page: null,
      command: null,
      offsetX: 0,
      offsetY: 0,
      list: [
        {
          name: 'FET',
          label: 'FET',
          size: '70*25',
          type: 'node',
          // flag: true, // 判断一开始隐藏锚点数值
          variable: 'variable',
          x: 0,
          y: 0,
          varChat: true,
          shape: 'customNode',
          color: '#ced4d9',
          outPoints: [
            [
              1,
              0.5,
              {
                key: 'param1',
                value: 'FET',
                variable: true
              }
            ]
          ]
        }
      ],
      isTrue: true
    }
  },
  created() {
    this.bindEvent()
    eventBus.$on('msg', e => {
      this.isTrue = e
    })
  },
  methods: {
    handleDragstart(e) {
      this.offsetX = e.offsetX
      this.offsetY = e.offsetY
    },

    _deepClone(source) {
      let target
      if (typeof source === 'object') {
        target = Array.isArray(source) ? [] : {}
        for (let key in source) {
          if (source.hasOwnProperty(key)) {
            if (typeof source[key] !== 'object') {
              target[key] = source[key]
            } else {
              target[key] = this._deepClone(source[key])
            }
          }
        }
      } else {
        target = source
      }
      return target
    },
    handleDragEnd(e, item) {
      let data = this._deepClone(item)
      data.offsetX = this.offsetX
      data.offsetY = this.offsetY
      if (this.page) {
        const graph = this.page.graph
        // const size = e.target.dataset.size.split("*");
        const xy = graph.getPointByClient(e.x, e.y)
        data.x = xy.x
        data.y = xy.y
        if (this.isTrue) {
          data.outPoints[0][2].value = '[' + 222 + ']'
        }
        data.size = item.size.split('*')
        data.type = 'node'
        this.command.executeCommand('add', [data])
      }
      data = {}
    },
    bindEvent() {
      eventBus.$on('afterAddPage', page => {
        this.page = page
        this.command = page.command
      })
    }
  }
}
</script>

<style scoped>
.variable {
  padding: 0 10px;
  box-sizing: border-box;
}

.variable-title {
  height: 20px;
  line-height: 20px;
}

.variable .el-tree {
  background: #f7f9fb !important;
}

.itempannel {
  height: 100%;
  position: absolute;
  left: 0px;
  z-index: 2;
  background: #f7f9fb;
  width: 200px;
  padding-top: 8px;
  border-right: 1px solid #e6e9ed;
}

.itempannel ul {
  padding: 0px;
  padding-left: 16px;
}

.itempannel li {
  color: rgba(0, 0, 0, 0.65);
  border-radius: 4px;
  width: 160px;
  height: 28px;
  line-height: 26px;
  padding-left: 8px;
  border: 1px solid rgba(0, 0, 0, 0);
  list-style-type: none;
}

.itempannel li:hover {
  background: white;
  border: 1px solid #ced4d9;
  cursor: move;
}

.itempannel .pannel-type-icon {
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
}
</style>

<style>
</style>
