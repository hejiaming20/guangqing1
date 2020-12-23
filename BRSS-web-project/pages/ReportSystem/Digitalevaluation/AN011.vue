<!--
 * @Author: your name
 * @Date: 2020-9-20
 * @LastEditTime: 2020-9-20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /BRSS-web-project/pages/
-->
<template>
  <div>
    <div
      v-loading="loading"
      element-loading-text="加载中,稍等"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <div class="layout-default-margin">
        <Table-easy
          :table-data="tableData"
          :total="total"
          :is-pagination-show="true"
          :table-foot="false"
          @handle-current-change="handleCurrentChange"
          @handle-size-change="handleSizeChange"
          @row-click="rowClick">
          <template slot="TableHead">
            <div class="layout-search">
              <el-row>
                <el-col :span="16">
                  <el-form
                    ref="ruleForm"
                    :model="searchInfo"
                    class="search-info"
                    label-width="100px">
                    <el-row>
                      <el-col :span="6">
                        <el-form-item
                          label="开始时间"
                          prop="dbegin">
                          <el-date-picker
                            v-model="searchInfo.dbegin"
                            value-format="yyyy-MM-dd HH"
                            type="datetime"
                            placeholder="开始时间"
                            @change="change1()"/>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item
                          label="结束时间"
                          prop="dend">
                          <el-date-picker
                            v-model="searchInfo.dend"
                            value-format="yyyy-MM-dd HH"
                            type="datetime"
                            placeholder="结束时间"
                            @change="change2()"/>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item
                          label="产线"
                          prop="production_line_id">
                          <el-select
                            v-model="searchInfo.production_line_id"
                            placeholder="请选择"
                            @change="change3()">
                            <el-option
                              v-for="item in option"
                              :key="item.key"
                              :label="item.value"
                              :value="item.key"
                            />
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-col>
                <el-col
                  :span="7"
                  :offset="1">
                  <div class="btn">
                    <el-button
                      type="primary"
                      size="mini"
                      @click="findAll()">查询
                    </el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="resetForm('ruleForm')">重置
                    </el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="hand_exe">导出全部
                    </el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
          </template>
          <template slot="TableBody">
            <el-table-column
              type="index"
              width="60"
              label="编号"/>
            <el-table-column
              prop="recordtime"
              min-width="180px"
              label="时间"/>
            <el-table-column
              prop="f1_scoreAll"
              label="F1机架得分">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f1_scoreAll).toFixed((2)) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="f2_scoreAll"
              label="F2机架得分">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f2_scoreAll).toFixed((2)) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="f3_scoreAll"
              label="F3机架得分">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f3_scoreAll).toFixed((2)) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="f4_scoreAll"
              label="F4机架得分">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f4_scoreAll).toFixed((2)) }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="f5_scoreAll"
              label="F5机架得分">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f5_scoreAll).toFixed((2)) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="f6_scoreAll"
              label="F6机架得分">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f6_scoreAll).toFixed((2)) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="f7_scoreAll"
              label="F7机架得分">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f7_scoreAll).toFixed((2)) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="r1_scoreAll"
              label="r1机架得分">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.r1_scoreAll).toFixed((2)) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="r2_scoreAll"
              label="r2机架得分">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.r2_scoreAll).toFixed((2)) }}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="导出"
              min-width="100"
              align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="hand_exe1(scope.row)">导出</el-button>
              </template>
            </el-table-column>

          </template>
        </Table-easy>
      </div>
      <div class="layout-default-margin">
        <Table-easy
          :table-data="tableData_1"
          :is-pagination-show="false"
          :table-foot="false"
          :table-head="false">
          <template slot="TableHead"/>
          <template slot="TableBody">
            <el-table-column
              type="index"
              width="60"
              label="编号"/>
            <el-table-column
              :show-overflow-tooltip="true"

              prop="xm"
              min-width="180px"
              label="项目"/>
            <el-table-column
              prop="unit"
              label="单位"/>
            <el-table-column
              prop="qz"
              label="权重"/>
            <el-table-column
              prop="f1"
              label="F1机架">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f1).toFixed((2)) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="f1_score"
              label="得分">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f1_score).toFixed((2)) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="f2"
              label="F2机架">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f2).toFixed((2)) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="f2_score"
              label="得分">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f2_score).toFixed((2)) }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="f3"
              label="F3机架">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f3).toFixed((2)) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="f3_score"
              label="得分">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f3_score).toFixed((2)) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="f4"
              label="F4机架">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f4).toFixed((2)) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="f4_score"
              label="得分">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f4_score).toFixed((2)) }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="f5"
              label="F5机架">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f5).toFixed((2)) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="f5_score"
              label="得分">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f5_score).toFixed((2)) }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="f6"
              label="F6机架">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f6).toFixed((2)) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="f6_score"
              label="得分">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f6_score).toFixed((2)) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="f7"
              label="F7机架">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f7).toFixed((2)) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="f7_score"
              label="得分">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.f7_score).toFixed((2)) }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="r1"
              label="r1机架">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.r1).toFixed((2)) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="r1_score"
              label="得分">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.r1_score).toFixed((2)) }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="r2"
              label="r2机架">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.r2).toFixed((2)) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="r2_score"
              label="得分">
              <template slot-scope="scope">
                <span>{{ Number(scope.row.r2_score).toFixed((2)) }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column
                label="操作"
                min-width="80"
                align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="detail(scope.row)">详情</el-button>
                &lt;!&ndash; <el-button
            size="mini"
            @click="dialogVisible = true">详情</el-button>&ndash;&gt;
                </template>
              </el-table-column>-->
          </template>
        </Table-easy>
      </div>
    </div>
  </div>

</template>

<script>
import { get, post, exportMethod } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
import { formatDate, lastDayFormat } from '@/lib/FormatTime'
import moment from 'moment'
import Echarts from 'echarts'
export default {
  components: { TableEasy },
  data() {
    return {
      recordtime: '',
      pageIndex: 1,
      pageSize: 10,
      searchInfo: {
        dbegin: '',
        dend: '',
        production_line_id: '2250'
        /* w_no: 3, //工作辊辊号
        b_no: 2 //支撑辊辊号*/
      },
      tableData: [],
      tableData_1: [],
      total: 0,
      var1: false,
      var2: false,
      var3: false,
      option: [],
      options: [],
      loading: false
    }
  },
  mounted() {
    this.searchInfo.dbegin = moment()
      .subtract(10, 'days')
      .format('YYYY-MM-DD HH')
    // value-format="yyyy-MM-dd HH:mm:ss"
    this.searchInfo.dend = moment().format('YYYY-MM-DD HH')
    post('/dictionary/findMapV1', { dicno: 'proline' }).then(res => {
      this.option = res.data
    })
    this.findAll()
  },
  methods: {
    change1() {
      this.var1 = true
      if (this.var1 && this.var2 && this.var3) {
        this.find_ss()
      }
    },
    change2() {
      this.var2 = true
      if (this.var1 && this.var2 && this.var3) {
        this.find_ss()
      }
    },
    change3() {
      this.var3 = true
      if (this.var1 && this.var2 && this.var3) {
        this.find_ss()
      }
    },

    v_change(val) {
      /* var t1 = val
      var t2 = new Date(t1).getTime() - 60 * 1000
      t2 = new Date(t2)
      this.searchInfo.dbegin = formatDate(t2, 'yyyy-MM-dd h:m:s')
      var t3 = new Date(t1).getTime() + 60 * 1000
      t3 = new Date(t3)
      this.searchInfo.dend = formatDate(t3, 'yyyy-MM-dd h:m:s')
      this.var1 = false
      this.var2 = false
      this.var3 = false*/
      // this.findAll()
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
    //时间选择器
    /* find_ss() {
      if (this.searchInfo.production_line_id == '1580') {
        this.searchInfo.production_line_id = '2'
      }
      /!*console.log(this.searchInfo1.dend)*!/
      post('/rollStiffness/findlist', {
        condition: this.searchInfo
      }).then(res => {
        this.options = res
        console.log(this.options)
      })
    },*/
    findAll() {
      if (this.searchInfo.production_line_id == '2250') {
        this.searchInfo.production_line_id = '1'
      }
      this.loading = true
      /*console.log(this.searchInfo1.dend)*/
      post('/rollStiffness/findtable', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      }).then(res => {
        this.tableData_1 = []
        if (res.data) {
          this.loading = false
          this.tableData = res.data.list_array
          console.log(this.tableData)
          this.total = res.count
          this.tableData_1 = []
          if (res.data.all_score) {
            // this.recordtime = res.data[0].recordtime //获取第一行recordtime  可能会用到导出第二个表格
            this.tableData_1 = res.data.all_score
          }
        }
      })
    },
    // 单击表格
    rowClick(val) {
      this.recordtime = val.recordtime
      for (var i = 0; this.tableData.length > i; i++) {
        if (this.recordtime == this.tableData[i].recordtime) {
          this.tableData_1 = this.tableData[i].data_array
          break
        } else {
          this.tableData_1 = []
        }
      }
    },
    async hand_exe() {
      let data = {
        method: 'get',
        url:
          // 'http://192.168.43.57:8778/api/rollStiffness/excel?dbegin=' +
          location.origin +
          '/api/rollStiffness/excel?dbegin=' +
          this.searchInfo.dbegin +
          '&dend=' +
          this.searchInfo.dend +
          '&production_line_id=' +
          this.searchInfo.production_line_id
      }
      await exportMethod(data)
      // get(
      //   'rollStiffness/excel?dbegin=' +
      //     this.searchInfo.dbegin +
      //     '&dend=' +
      //     this.searchInfo.dend +
      //     '&production_line_id=' +
      //     this.searchInfo.production_line_id
      // ).then(res => {
      //   exportMethod(res)
      // })
    },
    hand_exe1(val) {
      var ss = val
      //  this.recordtime = val.recordtime
      let data = {
        method: 'get',
        url:
          location.origin +
          '/api/rollStiffness/excelone?dbegin=' +
          // 'http://170.0.31.250:8778/api/rollStiffness/excel?dbegin=' +
          this.searchInfo.dbegin +
          '&dend=' +
          this.searchInfo.dend +
          '&production_line_id=' +
          this.searchInfo.production_line_id +
          '&recordtime=' +
          val.recordtime
      }
      console.log(data)
      exportMethod(data)
      // get(
      //   'rollStiffness/excel?dbegin=' +
      //     this.searchInfo.dbegin +
      //     '&dend=' +
      //     this.searchInfo.dend +
      //     '&production_line_id=' +
      //     this.searchInfo.production_line_id
      // ).then(res => {
      //   exportMethod(res)
      // })
    }
  }
}
</script>

<style scoped>
.body_box {
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  margin: 2px;
  top: 5px;
  background-color: #1a367a;
  padding: 5px 5px 5px 5px;
  border-radius: 8px;
}

.body_box .table_box table {
  width: 100%;
  font-size: 14px;
}

.body_box .table_box table thead {
  background-color: #1a367a;
  letter-spacing: 1px;
}

.body_box .table_box table thead tr {
  height: 60px;
}

.body_box .table_box table tr th {
  padding: 3px 5px;
  white-space: normal;
  word-break: break-all;
  text-align: center;
  color: #eae8c5;
  height: 60px;
  background: #253f80;
}

.body_box .table_box table tbody tr {
  cursor: pointer;
}

/*.body_box .table_box table tbody tr:hover {
    background-color: #1a367a !important;
  }*/

.body_box .table_box table tbody tr:nth-child(2n) {
  background-color: #253f80;
}

.body_box .table_box table tbody tr td {
  padding: 3px 5px;
  white-space: normal;
  word-break: break-all;
  /*  border: 1px solid #eae8c5;*/
  text-align: center;
  color: #eae8c5;
  height: 60px;
  /*强制不换行*/
  white-space: nowrap;
}

.body_box .table_box table tbody tr td a:hover {
  color: #d3ca1b;
}
</style>
