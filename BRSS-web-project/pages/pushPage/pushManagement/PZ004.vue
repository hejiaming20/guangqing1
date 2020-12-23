<!--
 * @Author: lcx
 * @Date: 2020-09-08 16:38:40
 * @LastEditTime: 2020-10-31 13:55:18
 * @LastEditors: Please set LastEditors
 * @Description: 工作流配置
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\pushPage\pushManagement\PZ004.vue
-->
<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="5">
        <Table-easy
          :is-pagination-show="false"
          :table-data="tableData"
          :total="total"
          :table-head="false"
          :table-height="'calc(100vh - 70px)'"
          :page-size="pageSize"
          :current-page="pageIndex"
          index-type="index"
          @row-click="handleRowClick"
        >
          <template slot="TableBody">
            <el-table-column
              prop="flow_name"
              label="工作流名称"/>
            <el-table-column
              width="150px"
              label="操作"
              align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click.stop="handleDetail(scope.row)">发起</el-button>
                  <!-- <el-button
                  size="mini"
                  type="danger"
                  @click.stop="handleDelect(scope.row)">删除</el-button> -->
              </template>
            </el-table-column>
          </template>
        </Table-easy>
      </el-col>
      <el-col :span="19">
        <div class="G6-editer">
          <g6-editor 
            :data="editorInfo"
            :work="workInfo"
            mode="edit"
            @fatherMethod="fatherMethod"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import { get, post } from '@/lib/Util'
export default {
  components: {
    TableEasy
  },
  data() {
    return {
      tableData: [],
      total: 0,
      editorInfo: null,
      workInfo: null,
      pageIndex: 1,
      pageSize: 10
    }
  },
  created() {
    this.findAll()
  },
  methods: {
    async findAll() {
      let res = await post('workFlow/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: 9999,
        condition: {}
      })
      this.tableData = res.data
    },
    // 查看详情
    handleRowClick(data) {
      this.editorInfo = JSON.parse(data.flow_char)
      this.workInfo = data
    },
    // 删除一条数据
    async handleDelect(val) {
      let res = await post('workFlow/deleteOne', { indocno: val.indocno })
      if (res.status === 2000) {
        this.$message({
          message: '删除成功'
        })
        this.findAll()
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    },
    // 接受子组件传来的查询全部事件
    fatherMethod() {
      this.findAll()
      console.log('接受子组件的值')
    }
  }
}
</script>

<style lang="less">
@import '../../../assets/css/baseStyle.less';
.G6-editer {
  background: @layout-s-background-color;
  height: calc(100vh - @layout-header-height - 20px);
  overflow-x: hidden;
  overflow-y: scroll;
}
.G6-editer::-webkit-scrollbar {
  display: none;
}
</style>
