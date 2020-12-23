<!--
 * @Author: your name
 * @Date: 2020-09-08 16:44:12
 * @LastEditTime: 2020-09-14 11:15:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\components\ItemPanel\index.vue
-->
<template>
  <div class="itempannel">
    <div class="itempannel-title">功能区</div>
    <Item />
  </div>
</template>

<script>
import Item from './item'
import eventBus from '@/utils/eventBus'
export default {
  components: { Item },
  data() {
    return {
      page: null,
      command: null
    }
  },
  created() {
    this.bindEvent()
  },
  methods: {
    bindEvent() {
      eventBus.$on('afterAddPage', page => {
        this.page = page
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
  z-index: 10;
  background: #253f80;
  width: 200px;
  border-right: 1px solid #1a367a;
}
.itempannel-title {
  height: 32px;
  /* border-top: 1px solid #dce3e8;
  border-bottom: 1px solid #dce3e8; */
  background: #253f80;
  color: #eae8c5;
  line-height: 32px;
  padding-left: 12px;
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
