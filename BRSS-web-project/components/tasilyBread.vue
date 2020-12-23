<!--
 * @Author: lcx
 * @Date: 2020-10-22 15:50:11
 * @LastEditTime: 2020-10-22 16:32:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \BRSS-web-project\components\tasilyBread.vue
-->
<template>
  <el-breadcrumb 
    separator="/" 
    class="layout-default-breakcrumb">
    <el-breadcrumb-item 
      :to="{ path: '/' }" 
    ><span @click="handleIndex">首页</span></el-breadcrumb-item>
    <el-breadcrumb-item 
      v-for="item in list" 
      :key="item.indocno">{{ item.menu_name }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {
    handleIndex() {
      this.$emit('next-index', this.list)
    }
  }
}
</script>

<style>
</style>
