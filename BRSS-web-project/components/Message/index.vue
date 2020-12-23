<template>
  <div 
    ref="message" 
    class="message-box">
    <span>{{ information }}</span>
  </div>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  data() {
    return {
      information: ''
    }
  },
  created() {
    this.bindEvent()
  },
  methods: {
    init() {},
    bindEvent() {
      eventBus.$on('mouseover', e => {
        const info = this.$refs.message
        let widthX = Math.floor(e.item._cfg.model.size[0] / 2) + 210
        let heightY = Math.floor(e.item._cfg.model.size[1] / 2)
        info.style.top = e.item._cfg.model.y + heightY + 'px'
        info.style.left = e.item._cfg.model.x + widthX + 'px'
        info.style.display = 'block'
        this.information = e.item._cfg.model.label
      })
      eventBus.$on('mouseleave', () => {
        const info = this.$refs.message
        info.style.display = 'none'
      })
    }
  }
}
</script>

<style>
.message-box {
  position: absolute;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 5px 10px;
  min-width: 30px;
  margin: 5px 0;
  z-index: 1;
  display: none;
}
.message-box span {
  font-size: 5px;
}
</style>
