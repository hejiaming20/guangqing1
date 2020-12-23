<template>
  <div class="functionArea">
    <el-row 
      :gutter="10" 
      type="flex" 
      align="middle">
      <el-col 
        v-for="(item,index) in areaArray" 
        :span="12" 
        :key="index">
        <div 
          v-for="(val, indexs) in item" 
          :key="indexs" 
          :title="val.title" 
          :class="val.class" 
          :data-shape="val.shape" 
          :data-type="val.type" 
          :data-size="val.size" 
          draggable 
          @dragstart="handleDragstart" 
          @dragend="handleDragEnd($event,val)">
          {{ val.name }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  data() {
    return {
      page: null,
      command: null,
      offsetX: 0,
      offsetY: 0,
      areaArray: [
        [
          {
            class: 'rhombus shape',
            size: '120*60',
            label: '逻辑判断',
            title: '判断节点',
            step_type: 0,
            flag: false,
            path: [
              ['M', 0, 0 - 60 / 2], // 上部顶点
              ['L', 120 / 2, 0], // 右侧顶点
              ['L', 0, 60 / 2], // 下部顶点
              ['L', -120 / 2, 0], // 左侧顶点
              ['Z'] // 封闭
            ],
            type: 'node',
            x: 0,
            y: 0,
            shape: 'customNode',
            color: '#1890ff',
            inPoints: [[0.5, 0]],
            outPoints: [[0, 0.5], [0.5, 1], [1, 0.5]]
          },
          {
            class: 'rectangle shape',
            name: '步骤',
            step_type: 1,
            title: '普通节点',
            path: [['M', -75, -25], ['H', 75], ['V', 25], ['H', -75], ['Z']],
            flag: true,
            label: '步骤',
            size: '150*50',
            type: 'node',
            x: 0,
            y: 0,
            shape: 'customNode',
            color: '#1890ff',
            inPoints: [
              [0, 0.2],
              [0, 0.8],
              [0.2, 0],
              [0.8, 0],
              [1, 0.2],
              [1, 0.8]
              // [0, 0.5, { key: 'param1', value: 0, variable: false }]
            ],
            outPoints: [
              [0.5, 0],
              [0.5, 1],
              [0.2, 1],
              [0.8, 1],
              [1, 0.5],
              [0, 0.5]
            ]
          }
        ]
      ]
    }
  },
  created() {
    this.bindEvent()
  },
  methods: {
    handleDragstart(e) {
      this.offsetX = e.offsetX
      this.offsetY = e.offsetY
    },
    handleDragEnd(e, item) {
      let data = {}
      Object.assign(data, item)
      data.offsetX = this.offsetX
      data.offsetY = this.offsetY
      if (this.page) {
        const graph = this.page.graph
        const xy = graph.getPointByClient(e.x, e.y)
        data.x = xy.x
        data.y = xy.y
        data.size = item.size.split('*')
        data.type = 'node'
        this.command.executeCommand('add', [data])
      }
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
.functionArea {
  padding: 5px;
}
.rhombus {
  width: 70px;
  height: 70px;
  transform: rotateZ(45deg) skew(-15deg, -15deg);
  border: 1px solid #ced4d9;
  text-align: center;
  line-height: 40px;
  margin-left: 50px;
  margin-top: 10px;
}
.rhombus::after {
  content: '逻辑判断';
  transform: rotateZ(-45deg);
  display: inline-block;
  height: 70px;
  line-height: 70px;
  color: #eae8c5;
}
.rectangle {
  width: 120px;
  height: 50px;
  border: 1px solid #ced4d9;
  text-align: center;
  line-height: 50px;
  margin-top: 20px;
  margin-left: 30px;
  color: #eae8c5;
}
.circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #ced4d9;
  text-align: center;
  line-height: 50px;
}
.ellipse {
  width: 60px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ced4d9;
  text-align: center;
  line-height: 30px;
  margin-left: 10px;
  margin-top: 20px;
}
.shape {
  margin-bottom: 10px;
}
</style>

{
<!-- name: '椭圆',
title: '普通节点',
path: [
	['M', 0, 60 / 2],
	['A', 60, 30, 0, 0, 0, 60, 0],
	['M', 0, 60 / 2],
	['A',60, 30, 0, 1, 1, 60, 0]
],
class: 'ellipse shape',
customShape: 'ellipse',
label: '椭圆',
size: '120*60',
type: 'node',
x: 0,
y: 0,
shape: 'customNode',
color: '#1890ff',
inPoints: [
  [0.5, 0.5, { key: 'param1', value: 0, variable: false }]
],
outPoints: [
	[0.5, 0.5, { key: 'param1', value: 10, variable: true }],
	[0, 0.5, { key: 'param2', value: 0, variable: false }],
  [1, 0.5, { key: 'param3', value: 10, variable: true }]
]  
} -->

<!-- {
class: 'circle shape',
name: '圆形',
title: '开始节点',
path: [
	['M', -30,0],
	['a', 30, 30, 0, 1, 1, 0, 1],
	['Z']
],
label: '圆形',
size: '60*60',
type: 'node',
x: 0,
y: 0,
shape: 'customNode',
color: '#1890ff',
inPoints: [
  [0.5, 0.5, { key: 'param1', value: 0, variable: false }]
],
outPoints: [
	[0.5, 0.5, { key: 'param1', value: 10, variable: true }],
	[0, 0.5, { key: 'param2', value: 0, variable: false }],
  [1, 0.5, { key: 'param3', value: 10, variable: true }]
]  
} -->
