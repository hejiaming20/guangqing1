/*
* @Description: 表格工具
* @version: 1.0
* @Company: nercar
* @Author: LiChunXiu
* @Date: 2019-12-13 17:44:36
* @LastEditors: OBKorol
* @LastEditTime: 2019-12-13 17:44:36
*/

<template>
  <div>
    <div class="p-search">
      <el-row
        v-if="tableHead">
        <div class="layout-search">
          <div class="layout-search-header">查询条件</div>
          <div class="layout-search-body">
            <slot name="TableHead"/>
          </div>
        </div>
      </el-row>
    </div>
    <div class="u-table-main">
      <el-table
        ref="tasilyTable"
        :data="tableData"
        :row-class-name="rowClassName"
        :span-method="spanMethod"
        :cell-style="colorTable"
        :cell-class-name="cellClassName"
        :height="tableHeight"
        :stripe="tableStripe"
        :empty-text="loadInfo"
        border
        @selection-change="handleSelectionChange"
        @row-click="rowClick"
        @expand-change="expandChange"
        @cell-dblclick="cellDblclick"
        @cell-click="cellClick">
        <template slot="empty">
          <i
            class="iconfont icon-zanwushuju2"
            style="font-size: 50px;color:#409eff;"/>
          <p style="color:#409eff;">暂无数据</p>
        </template>
        <el-table-column
          v-if="indexType === 'index'"
          :index="formatterTableDataIndex"
          :type="indexType"
          label="序号"
          align="center"
          width="60" />
        <slot name="TableBody"/>
      </el-table>
    </div>
    <div>
      <div
        v-if="tableFoot"
        class="pagination-border">
        <slot name="TableFoot"/>
      </div>
      <div
        v-show="IsPaginationShow"
        class="pagination-border">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="pageSizeList"
          :page-size="pageSize"
          :total="total"
          :pager-count="5"
          class="u-pagination"
          align="center"
          layout="total, sizes, prev, pager, next, jumper"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>

<script>
import { type } from 'os'
export default {
  props: {
    // 表格数据格式
    tableData: {
      type: Array,
      default: () => []
    },
    // 是否显示分页，默认显示
    IsPaginationShow: {
      type: Boolean,
      default: true
    },
    // 是否显示组件头部，默认显示
    tableHead: {
      type: Boolean,
      default: true
    },
    // 是否显示组件底部，默认显示
    tableFoot: {
      type: Boolean,
      default: false
    },
    // 数据的总条数，用于分页
    total: {
      type: Number,
      default: 0
    },
    // 分页，每页的数据项数
    pageSizeList: {
      type: Array,
      default: function() {
        return [10, 20, 30]
      }
    },
    rowClassName: {
      type: Function,
      default: () => {}
    },
    cellClassName: {
      type: Function,
      default: () => {}
    },
    spanMethod: {
      type: Function,
      default: () => {}
    },
    tableHeight: {
      type: [String, Number],
      default: null
    },
    pageSize: {
      type: Number,
      default: 30
    },
    currentPage: {
      type: Number,
      default: 1
    },
    tableStripe: {
      type: Boolean,
      default: true
    },
    loadInfo: {
      type: String,
      default: '暂无数据'
    },
    indexType: {
      type: String,
      default: 'none'
    }
  },
  data() {
    return {}
  },
  methods: {
    formatterTableDataIndex(index) {
      var pageIndex = 0
      if (this.pageSize || this.currentPage) {
        var pageIndex = (this.currentPage - 1) * this.pageSize + index + 1
      } else {
        pageIndex = index + 1
      }
      return pageIndex
    },
    /**
     * @author: wangHongFei
     * @description: 行单击事件
     */
    rowClick(data, column) {
      this.$emit('row-click', data, column)
    },
    /**
     * @author: wangHongFei
     * @description: 单元格双击
     */
    cellDblclick(row, cloumn) {
      this.$emit('cell-dblclick', row, cloumn)
    },
    /**
     * @author: wangHongFei
     * @description: 单元格单击
     */
    cellClick(row, cloumn) {
      this.$emit('cell-click', row, cloumn)
    },
    // /**
    //  * @author: wangHongFei
    //  * @description: 合并单元格
    //  */
    // spanMethod({ row, column, rowIndex, columnIndex }) {
    //   this.$emit('span-method', { row, column, rowIndex, columnIndex })
    // },

    /**
     * @author:
     * @description: 颜色选择
     */
    //rowIndex是第几行，columnIndex是第几列   //color_table
    colorTable({ row, column, rowIndex, columnIndex }) {
      this.$emit('color-table', { row, column, rowIndex, columnIndex })
    },

    /**
     * @author: wangHongFei
     * @description: 展开行事件
     */
    expandChange(row, expandedRows) {
      this.$emit('expand-change', row, expandedRows)
    },
    /**
     * @author: wangHongFei
     * @description: 每页条数的改变
     */
    handleSizeChange(val) {
      this.$emit('handle-size-change', val)
    },
    /**
     * @author: wangHongFei
     * @description: 切换页码
     */
    handleCurrentChange(val) {
      this.$emit('handle-current-change', val)
    },
    handleSelectionChange(val) {
      this.$emit('handle-selection-change', val)
    },
    clearTableSelect() {
      this.$refs.tasilyTable.clearSelection()
    },
    gettable(val) {
      this.$refs.tasilyTable.toggleRowSelection(val)
    }
  }
}
</script>
