<!--
菜单名称：轧辊库存管理  等级：3   链接: /inforConTrolSys/rollManagement/RM003  上级菜单:轧辊管理
备注：该画面加载过长，先屏蔽
 * @Author: your name
 * @Date: 2020-07-23 09:57:34
 * @LastEditTime: 2020-11-07 09:32:24
 * @LastEditors: Please set LastEditors
 * @Description: 辅材仓库管理页面
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\am.vue
-->
<template>
  <div>
    <el-row>
      <el-col :span="24" >
        <Table-easy
          :table-data="tableData"
          :table-head="false"
          :is-pagination-show="false"
          @handle-current-change="handleCurrentChange"
          @handle-size-change="handleSizeChange">
          <template slot="TableBody">
            <el-table-column
              label="库存状态"
              prop="s_roll_state"/>
            <el-table-column
              prop="f1tof4_work_roll"
              min-width="120px"
              label="F1-F4工作辊"/>
            <el-table-column
              label="F1-F4支撑辊"
              min-width="120px"
              prop="f1tof4_backup_roll"/>
            <el-table-column
              label="F5-F7工作辊"
              min-width="120px"
              prop="f5tof7_work_roll"/>
            <el-table-column
              prop="f5tof7_backup_roll"
              min-width="120px"
              label="F5-F7支撑辊"/>
            <el-table-column
              prop="r1_r2_work_roll"
              label="粗轧工作辊"/>
            <el-table-column
              prop="r1_r2_backup_roll"
              label="粗轧支撑辊"/>
            <el-table-column
              label="平整工作辊"
              min-width="120px"
              prop="temper_mill_work_roll"/>
            <el-table-column
              min-width="120px"
              label="平整支撑辊"
              prop="temper_mill_backup_roll"/>
            <el-table-column
              label="精轧立辊"
              prop="f_vertical_roll"/>
            <el-table-column
              label="粗轧立辊"
              prop="r_vertical_roll"/>
            <el-table-column
              label="锤头"
              prop="hammer"/>
          </template>
        </Table-easy>
      </el-col>
    </el-row>
    <div class="layout-default-margin"/>
    <el-row :gutter="20">
      <!-- <el-col :span="12" /> -->
      <el-col :span="24" >
        <!-- <Table-easy
          :table-data="tableDataS"
          :table-head="false"
          :is-pagination-show="false"
          @handle-current-change="handleCurrentChange1"
          @handle-size-change="handleSizeChange1">
          <template slot="TableBody">
            <el-table-column
              label="制造厂商"
              prop="factory"/>
            <el-table-column
              prop="on_the_way"
              label="在途轧辊"/>
            <el-table-column
              prop="not_disassembly"
              min-width="120px"
              label="未使用新辊"/>
            <el-table-column
              label="周转轧辊"
              prop="turnover"/>
            <el-table-column
              label="修复轧辊"
              prop="repaired"/>
            <el-table-column
              prop="discontinuation"
              label="停用辊"/>
            <el-table-column
              prop="scrap"
              label="报废辊"/>
          </template>
        </Table-easy> -->
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="echartHeader">轧辊库存信息</div>
        <div
          id="chartHere"
          class="Echar-bg"
          style="margin-top: 0px;padding-top: 20px;padding-bottom: 5px;height: 450px"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import { vRollStock, vRollStockFactory } from '@/api/pinClipBoard' //查询接口
import Echarts from 'echarts'
import { get, post } from '@/lib/Util'
export default {
  components: {
    TableEasy
  },
  data() {
    return {
      tableData: [],
      tableDataS: [],
      pageIndex: 1,
      pageSize: 30,
      pageIndex1: 1,
      pageSize1: 30
    }
  },
  mounted() {
    this.findAll()
    this.findSAll()
    this.echartOption()
  },
  methods: {
    // 散点图
    echartOption() {
      var optionHere = {
        // title: {
        //   text: '轧辊库存信息',
        //   left: 'center',
        //   textStyle: {
        //     color: '#eae8c5' //字体颜色
        //   }
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          type: 'scroll', //翻页
          top: 25,
          textStyle: {
            color: '#eae8c5' //字体颜色
          },
          data: [
            'DAVY',
            'WHAMCO',
            '邢台',
            '马钢联合电钢',
            '共昌',
            '日立',
            'ESW',
            '太钢',
            'AKERS',
            'IREL',
            '鞍钢',
            'VILLARES',
            '陕压',
            '江苏润耐特',
            '江苏永昌',
            '江阴润源'
          ]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          axisLine: {
            lineStyle: {
              color: '#eae8c5' //坐标线颜色
            }
          },
          type: 'value'
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#eae8c5' //坐标线颜色
            }
          },
          type: 'category',
          data: [
            '在途轧辊',
            '未使用新辊',
            '周转轧辊',
            '修复轧辊',
            '停用辊',
            '报废辊'
          ]
        },
        series: [
          {
            name: 'DAVY',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [320, 302, 301, 334, 390, 330]
          },
          {
            name: 'WHAMCO',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [120, 132, 101, 134, 90, 230]
          },
          {
            name: '邢台',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [220, 182, 191, 234, 290, 330]
          },
          {
            name: '马钢联合电钢',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [150, 212, 201, 154, 190, 330]
          },
          {
            name: '共昌',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [820, 832, 901, 934, 1290, 1330]
          },
          {
            name: '日立',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [820, 832, 901, 934, 1290, 1330]
          },
          {
            name: 'ESW',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [820, 832, 901, 934, 1290, 1330]
          },
          {
            name: '太钢',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [820, 832, 901, 934, 1290, 1330]
          },
          {
            name: 'AKERS',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [820, 832, 901, 934, 1290, 1330]
          },
          {
            name: 'IREL',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [820, 832, 901, 934, 1290, 1330]
          },
          {
            name: '鞍钢',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [820, 832, 901, 934, 1290, 1330]
          },
          {
            name: 'VILLARES',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [820, 832, 901, 934, 1290, 1330]
          },
          {
            name: '陕压',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [820, 832, 901, 934, 1290, 1330]
          },
          {
            name: '江苏润耐特',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [820, 832, 901, 934, 1290, 1330]
          },
          {
            name: '江苏永昌',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [820, 832, 901, 934, 1290, 1330]
          },
          {
            name: '江阴润源',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [820, 832, 901, 934, 1290, 1330]
          }
        ]
      }
      var myChart = Echarts.init(document.getElementById('chartHere'), 'light') //将配置注入到html中定义的容器
      myChart.setOption(optionHere)
      window.onresize = function() {
        myChart.resize()
      }
    },
    //大表查询接口
    findAll() {
      post(vRollStock, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: ''
      }).then(res => {
        var arry1 = []
        for (var i = 0; res.data.length > i; i++) {
          if (res.data[i].s_roll_state == '待使用新辊') {
            arry1.push(res.data[i])
            res.data.splice(i, 1)
          }
        }
        for (var i = 0; res.data.length > i; i++) {
          if (res.data[i].s_roll_state == '未拆轧辊') {
            res.data[i].s_roll_state = '新辊'
            res.data[i].f1tof4_work_roll =
              res.data[i].f1tof4_work_roll + arry1[0].f1tof4_work_roll

            res.data[i].f1tof4_backup_roll =
              res.data[i].f1tof4_backup_roll + arry1[0].f1tof4_backup_roll

            res.data[i].f5tof7_work_roll =
              res.data[i].f5tof7_work_roll + arry1[0].f5tof7_work_roll

            res.data[i].f5tof7_backup_roll =
              res.data[i].f5tof7_backup_roll + arry1[0].f5tof7_backup_roll

            res.data[i].r1_r2_work_roll =
              res.data[i].r1_r2_work_roll + arry1[0].r1_r2_work_roll

            res.data[i].r1_r2_backup_roll =
              res.data[i].r1_r2_backup_roll + arry1[0].r1_r2_backup_roll

            res.data[i].temper_mill_work_roll =
              res.data[i].temper_mill_work_roll + arry1[0].temper_mill_work_roll

            res.data[i].temper_mill_backup_roll =
              res.data[i].temper_mill_backup_roll +
              arry1[0].temper_mill_backup_roll

            res.data[i].f_vertical_roll =
              res.data[i].f_vertical_roll + arry1[0].f_vertical_roll

            res.data[i].r_vertical_roll =
              res.data[i].r_vertical_roll + arry1[0].r_vertical_roll

            res.data[i].hammer = res.data[i].hammer + arry1[0].hammer
          }
        }
        this.tableData = res.data
        this.total = res.count
      })
    },

    //小表查询接口S
    findSAll() {
      post(vRollStockFactory, {
        pageIndex: this.pageIndex1,
        pageSize: this.pageSize1,

        condition: ''
      }).then(res => {
        this.echartData = res
        this.echartOption(res.data)
      })
    },
    //分页之对应页
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findAll()
    },
    //分页之一页多少条
    handleSizeChange(val) {
      this.pageSize = val
      this.findAll()
    },
    //分页之对应页
    handleCurrentChange1(val) {
      this.pageIndex1 = val
      this.findSAll()
    },
    //分页之一页多少条
    handleSizeChange1(val) {
      this.pageSize1 = val
      this.findSAll()
    }
  }
}
</script>

<style>
.column-search {
  margin-left: 20px;
}
.echartHeader {
  height: 30px;
  margin-top: 10px;
  margin-bottom: 1px;
  text-align: center;
  background-color: #253f80;
  color: #ffffff;
  font-weight: 900;
  font-size: 17px;
}
</style>
