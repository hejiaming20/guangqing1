import eventBus from '@/utils/eventBus'
import { uniqueId } from '@/utils'
let startPoint = null
let startItem = null
let endPoint = {}
let activeItem = null
let curInPoint = null
let varChar = null
export default {
  getEvents() {
    return {
      mousemove: 'onMousemove',
      mouseup: 'onMouseup',
      'node:mouseover': 'onMouseover',
      'node:mouseleave': 'onMouseleave'
    }
  },
  onMouseup(e) {
    const item = e.item
    if (item && item.getType() === 'node') {
      const group = item.getContainer()
      if (e.target._attrs.isInPoint) {
        const children = group._cfg.children
        children.map(child => {
          if (
            child._attrs.isInPointOut &&
            child._attrs.parent === e.target._attrs.id
          ) {
            activeItem = child
          }
        })
        curInPoint = e.target
      } else if (e.target._attrs.isInPointOut) {
        activeItem = e.target
        const children = group._cfg.children
        children.map(child => {
          if (
            child._attrs.isInPoint &&
            child._attrs.id === e.target._attrs.parent
          ) {
            curInPoint = child
          }
        })
      }
      if (activeItem) {
        const endX = parseInt(curInPoint._attrs.x)
        const endY = parseInt(curInPoint._attrs.y)
        // endPoint = { x: endX, y: endY, p: curInPoint._attrs.pointId };
        endPoint = {
          x: endX,
          y: endY,
          key: curInPoint._attrs.pointId,
          value: curInPoint._attrs.value
        }
        if (this.edge) {
          this.graph.removeItem(this.edge)
          const model = {
            id: 'edge' + uniqueId(),
            source: startItem,
            target: item,
            sourceId: startItem._cfg.id,
            targetId: item._cfg.id,
            start: startPoint,
            end: endPoint,
            shape: 'customEdge',
            type: 'edge'
          }
          eventBus.$emit('addItem', model)
        }
      } else {
        if (this.edge) this.graph.removeItem(this.edge)
      }
    } else {
      if (this.edge) this.graph.removeItem(this.edge)
    }
    var vm = this

    this.graph.find('node', node => {
      const group = node.get('group')
      const children = group._cfg.children
      children.map(child => {
        if (child._attrs.isInPointOut) {
          child.attr('opacity', '0')
        }
        if (child._attrs.isInPoint) {
          child.attr('opacity', '0')
        }
        if (child._attrs.isOutPoint) {
          child.attr('opacity', '0')
          child.attr('fill', '#fff')
        }
      })

      if (item._cfg) {
        if (item._cfg.model.id != node._cfg.id) return
      } else {
        return
      }

      let inPointsObj = null
      if (node._cfg.model.inPoints) {
        inPointsObj = JSON.parse(JSON.stringify(node._cfg.model))
        for (const i of inPointsObj.inPoints) {
          if (startPoint.variable && endPoint.key === i[2].key) {
            i[2].value = startPoint.value
            endPoint.value = startPoint.value
          }
        }
      }
      this.graph.update(node, inPointsObj)
    })
    if (startItem) {
      this.graph.setItemState(startItem, 'hover', false)
    }

    this.graph.paint()
    startPoint = null
    startItem = null
    endPoint = {}
    activeItem = null
    curInPoint = null
    this.graph.setMode('default')
  },
  onMousemove(e) {
    const item = e.item
    if (!startPoint) {
      this.graph.find('node', node => {
        const group = node.get('group')
        const children = group._cfg.children
        children.map(child => {
          if (child._attrs.isInPointOut) {
            child.attr('opacity', '0.3')
          }
          if (child._attrs.isInPoint) {
            child.attr('opacity', '1')
          }
        })
      })
      const startX = parseInt(e.target._attrs.x)
      const startY = parseInt(e.target._attrs.y)
      // startPoint = { x: startX, y: startY, p: e.target._attrs.pointId };
      startPoint = {
        x: startX,
        y: startY,
        key: e.target._attrs.pointId,
        value: e.target._attrs.value,
        variable: e.target._attrs.variable,
        varChat: e.target._attrs.varChat
      }
      startItem = item
      this.edge = this.graph.addItem('edge', {
        source: item,
        target: item,
        start: startPoint,
        end: startPoint,
        shape: 'link-edge'
      })
    } else {
      const point = {
        x: e.x,
        y: e.y
      }
      if (this.edge) {
        // 增加边的过程中，移动时边跟着移动
        this.graph.updateItem(this.edge, {
          //  start: startPoint,
          target: point
        })
      }
    }
  },
  onMouseover(e) {
    const item = e.item
    if (item && item.getType() === 'node') {
      if (e.target._attrs.isInPointOut && !this.hasTran) {
        this.hasTran = true
        e.target.transform([['t', 0, 3], ['s', 1.2, 1.2]])
      }
      this.graph.paint()
    }
  },
  onMouseleave() {
    this.graph.find('node', node => {
      const group = node.get('group')
      const children = group._cfg.children
      children.map(child => {
        if (child._attrs.isInPointOut) {
          child.resetMatrix()
        }
      })
    })
    this.hasTran = false
    this.graph.paint()
  }
}
