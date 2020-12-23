<!--
 * @Author: your name
 * @Date: 2020-09-08 16:44:12
 * @LastEditTime: 2020-09-08 16:48:25
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\components\Flow\index.vue
-->
<template>
  <div />
</template>

<script>
import customNode from './customNode'
import customEdge from './customEdge'
import teamNode from './teamNode'
export default {
  name: 'Flow',
  data() {
    return {
      page: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      customNode.init()
      customEdge.init()
      teamNode.init()
    }
  }
}
</script>
