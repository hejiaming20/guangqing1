import G6 from '@antv/g6/build/g6'
import { uniqueId } from '@/utils'
import Shape from '@antv/g/src/shapes'
const customNode = {
  init() {
    G6.registerNode('customNode', {
      draw(cfg, group) {
        let size = cfg.size
        if (!size) {
          size = [170, 34]
        }
        // 此处必须是NUMBER 不然bbox不正常
        const width = parseInt(size[0])
        const height = parseInt(size[1])
        const color = cfg.color
        // 此处必须有偏移 不然drag-node错位
        const offsetX = -width / 2
        const offsetY = -height / 2
        const mainId = 'rect' + uniqueId()

        // 此处修改不同样式

        let shape = null
        if (cfg.variable) {
          shape = group.addShape('rect', {
            attrs: {
              id: mainId,
              x: offsetX,
              y: offsetY,
              width: width,
              height: height,
              stroke: '#ced4d9',
              fill: '#fff', //此处必须有fill 不然不能触发事件
              radius: 10
            }
          })
        } else {
          shape = group.addShape('path', {
            attrs: {
              path: cfg.path,
              id: mainId,
              x: offsetX,
              y: offsetY,
              // width: width,
              // height: height,
              stroke: '#ced4d9',
              fill: '#fff', //此处必须有fill 不然不能触发事件
              radius: 4
            }
          })
        }

        if (cfg.label) {
          group.addShape('text', {
            attrs: {
              id: 'label' + uniqueId(),
              x: offsetX + width / 2,
              y: offsetY + height / 2,
              textAlign: 'center',
              textBaseline: 'middle',
              text: cfg.label,
              parent: mainId,
              fill: '#565758'
            },
            name: 'text-shape',
            // 设置 draggable 以允许响应鼠标的图拽事件
            draggable: true
          })
        }
        if (cfg.inPoints) {
          for (let i = 0; i < cfg.inPoints.length; i++) {
            let x,
              y = 0
            // //0为顶 1为底
            // if (cfg.inPoints[i][0] === 0.5) {
            //   x = 0
            // } else {
            //   x = width
            // }
            x = width * cfg.inPoints[i][0]
            y = height * cfg.inPoints[i][1]

            const id = 'circle' + uniqueId()
            group.addShape('circle', {
              attrs: {
                id: 'circle' + uniqueId(),
                parent: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 10,
                isInPointOut: true,
                fill: '#1890ff',
                opacity: 0
              }
            })
            group.addShape('circle', {
              attrs: {
                id: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 3,
                isInPoint: true,
                fill: '#fff',
                stroke: '#1890ff',
                opacity: 0
              }
            })
          }
        }
        if (cfg.outPoints) {
          for (let i = 0; i < cfg.outPoints.length; i++) {
            let x,
              y = 0
            //0为顶 1为底
            // if (cfg.outPoints[i][0] === 0) {
            //   y = 0
            //   x = width * cfg.outPoints[i][1]
            // } else if (cfg.outPoints[i][0] === 1) {
            //   y = height * cfg.outPoints[i][1]
            //   x = width
            // } else {
            //   y = height
            //   x = width * cfg.outPoints[i][1]
            // }

            x = width * cfg.outPoints[i][0]
            y = height * cfg.outPoints[i][1]

            const id = 'circle' + uniqueId()
            group.addShape('circle', {
              attrs: {
                id: 'circle' + uniqueId(),
                parent: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 10,
                isOutPointOut: true,
                fill: '#1890ff',
                opacity: 0, //默認0 需要時改成0.3
                varChat: cfg.varChat || null
              }
            })
            group.addShape('circle', {
              attrs: {
                id: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 3,
                isOutPoint: true,
                fill: '#fff',
                stroke: '#1890ff',
                opacity: 0,
                varChat: cfg.varChat || null
              }
            })
          }
        }
        return shape
      },
      //设置状态
      setState(name, value, item) {
        const group = item.getContainer()
        const shape = group.get('children')[0] // 顺序根据 draw 时确定

        const children = group.findAll(g => {
          return g._attrs.parent === shape._attrs.id
        })
        const circles = group.findAll(circle => {
          return circle._attrs.isInPoint || circle._attrs.isOutPoint
        })
        const selectStyles = () => {
          shape.attr('fill', '#f3f9ff')
          shape.attr('stroke', '#6ab7ff')
          shape.attr('cursor', 'move')
          children.forEach(child => {
            child.attr('cursor', 'move')
          })
          circles.forEach(circle => {
            circle.attr('opacity', 1)
          })
        }
        const unSelectStyles = () => {
          shape.attr('fill', '#fff')
          shape.attr('stroke', '#ced4d9')
          circles.forEach(circle => {
            circle.attr('opacity', 0)
          })
        }
        switch (name) {
          case 'selected':
          case 'hover':
            if (value) {
              selectStyles()
            } else {
              unSelectStyles()
            }
            break
        }
      }
    })
  }
}

export default customNode
