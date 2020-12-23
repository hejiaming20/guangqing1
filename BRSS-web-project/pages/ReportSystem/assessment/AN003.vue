<!--
 * @Author: your name
 * @Date: 2020-10-12 13:42:27
 * @LastEditTime: 2020-10-12 16:37:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \BRSS-web-project\pages\ReportSystem\assessment\AN003.vue
-->
<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="tablePagination.total"
      class="layout-default-margin"
      @handle-size-change="handleSizeChange"
      @handle-current-change="handleCurrentChange">
      <template slot="TableHead">
        <el-row :gutter="10">
          <el-col :span="20">
            <el-form
              ref="ruleForm"
              :model="searchInfo"
              class="search-info"
              label-width="80px">
              <el-row>
                <!-- <el-col :span="6">
                  <el-form-item
                    label="机架号"
                    prop="modular_name">
                    <el-input v-model="searchInfo.modular_name" />
                  </el-form-item>

                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="轧制类型"
                    prop="modular_no">
                    <el-input v-model="searchInfo.modular_no" />
                  </el-form-item>

                </el-col> -->
                <el-col :span="6">
                  <el-form-item
                    label="机架"
                    prop="dend">
                    <el-select
                      v-model="searchInfo.production_line_id"
                      placeholder="请选择">
                      <el-option
                        v-for="item in option"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="轧辊类型"
                    prop="production_line_id">
                    <el-select
                      v-model="searchInfo.production_line_id"
                      placeholder="请选择">
                      <el-option
                        v-for="item in option"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="开始时间"
                    prop="start">
                    <el-date-picker
                      v-model="searchInfo.start"
                      type="datetime"
                      placeholder="选择开始时间"/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="结束时间"
                    prop="start">
                    <el-date-picker
                      v-model="searchInfo.end"
                      type="datetime"
                      placeholder="选择结束时间"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
          <el-col :span="4">
            <div class="btn">
              <el-button
                size="mini"
                type="primary"
                @click="findAll()">查询</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="resetForm('ruleForm')">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          prop="modular_name"
          label="辊号"/>
        <el-table-column
          prop="modular_name"
          label="轧辊类型"/>
        <el-table-column
          prop="modular_name"
          label="机架"/>
        <el-table-column
          prop="modular_name"
          label="上机位置"/>
        <el-table-column
          prop="modular_name"
          label="上线日期"/>
        <el-table-column
          prop="modular_name"
          label="班组"/>
        <el-table-column
          prop="modular_name"
          label="操作人"/>
        <el-table-column
          prop="modular_name"
          width="120px"
          label="磨床号/车床"/>
        <el-table-column
          prop="modular_name"
          width="150px"
          label="新辊(锤头)硬度评级"/>
        <el-table-column
          prop="modular_name"
          width="120px"
          label="磨削精度评级"/>
        <el-table-column
          prop="modular_name"
          width="120px"
          label="车削精度评级"/>
        <el-table-column
          prop="modular_name"
          width="130px"
          label="在线氧化膜评级"/>
        <el-table-column
          prop="modular_name"
          width="120px"
          label="在线磨损评级"/>
        <el-table-column
          prop="modular_name"
          width="120px"
          label="下机表面评级"/>
        <el-table-column
          prop="modular_name"
          width="120px"
          label="轧机刚度评级"/>
        <el-table-column
          prop="modular_name"
          label="综合评级"/>
      </template>
    </Table-easy>

    <!-- echarts -->
    <!-- <div
      class="layout-search"
      style="margin-top: 10px">
      <div class="layout-search-header">查询区</div>
      <div class="layout-search-body">
        <el-row>
          <el-col :span="18">
            <el-form
              ref="ruleForml"
              :model="searchInfo"
              label-width="90px">
              <el-row>

                <el-col :span="6">
                  <el-form-item
                    label="开始时间"
                    prop="dbegin">
                    <el-date-picker
                      v-model="searchInfo.dbegin"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="开始时间"/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="结束时间"
                    prop="dend">
                    <el-date-picker
                      v-model="searchInfo.dend"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="结束时间"/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="机架"
                    prop="dend">
                    <el-select
                      v-model="searchInfo.production_line_id"
                      placeholder="请选择">
                      <el-option
                        v-for="item in option"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="轧辊类型"
                    prop="production_line_id">
                    <el-select
                      v-model="searchInfo.production_line_id"
                      placeholder="请选择">
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
            :span="6">
            <div class="btn">
              <el-button
                type="primary"
                size="mini"
                @click="findAll_1()">查询</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="resetForm('ruleForml')">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div> -->
    <el-row :gutter="5">
      <el-col 
        v-for="(item,index) in echartsArray" 
        :span="8" 
        :key="index">
        <div class="layout-block layout-default-margin">
          <tasily-echarts 
            :title="item.pieTitle"
            :legend="item.pieLegend"
            :series="item.pieSeries"
            :x-axis="item.pieXaxis" 
            :toolbox="{show:false}" 
            :y-axis="item.pieYaxis"
            :tooltip="{show:false}"
            _height="300px"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { get, post } from '@/lib/Util'
import TableEasy from '@/components/TasilyTableEasy'
import tasilyEcharts from '@/components/TasilyEcharts'
export default {
  name: 'AN003',
  components: { TableEasy, tasilyEcharts },
  data() {
    return {
      tableData: [],
      tablePagination: {
        total: 0
      },
      searchInfo: {},
      alegend: {},
      echartsArray: [
        {
          pieTitle: {
            textStyle: {
              color: '#eae8c5'
            },
            text: '新辊硬度评级',
            top: '270px',
            left: 'center'
          },
          pieLegend: {
            textStyle: {
              color: '#eae8c5'
            }
          },
          pieSeries: [
            {
              name: '新辊硬度评级',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 335, name: '例一' },
                { value: 310, name: '例二' },
                { value: 234, name: '例三' },
                { value: 135, name: '例四' },
                { value: 1548, name: '例五' }
              ]
            }
          ],
          pieXaxis: { show: false },
          pieYaxis: { show: false }
        },
        {
          pieTitle: {
            textStyle: {
              color: '#eae8c5'
            },
            text: '磨削精度评级',
            top: '270px',
            left: 'center'
          },
          pieLegend: {
            textStyle: {
              color: '#eae8c5'
            }
          },
          pieSeries: [
            {
              name: '磨削精度评级',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 335, name: '例一' },
                { value: 310, name: '例二' },
                { value: 234, name: '例三' },
                { value: 135, name: '例四' },
                { value: 1548, name: '例五' }
              ]
            }
          ],
          pieXaxis: { show: false },
          pieYaxis: { show: false }
        },
        {
          pieTitle: {
            textStyle: {
              color: '#eae8c5'
            },
            text: '氧化膜评级',
            top: '270px',
            left: 'center'
          },
          pieLegend: {
            textStyle: {
              color: '#eae8c5'
            }
          },
          pieSeries: [
            {
              name: '氧化膜评级',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 335, name: '例一' },
                { value: 310, name: '例二' },
                { value: 234, name: '例三' },
                { value: 135, name: '例四' },
                { value: 1548, name: '例五' }
              ]
            }
          ],
          pieXaxis: { show: false },
          pieYaxis: { show: false }
        },
        {
          pieTitle: {
            textStyle: {
              color: '#eae8c5'
            },
            text: '在线磨损评级',
            top: '270px',
            left: 'center'
          },
          pieLegend: {
            textStyle: {
              color: '#eae8c5'
            }
          },
          pieSeries: [
            {
              name: '在线磨损评级',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 335, name: '例一' },
                { value: 310, name: '例二' },
                { value: 234, name: '例三' },
                { value: 135, name: '例四' },
                { value: 1548, name: '例五' }
              ]
            }
          ],
          pieXaxis: { show: false },
          pieYaxis: { show: false }
        },
        {
          pieTitle: {
            textStyle: {
              color: '#eae8c5'
            },
            text: '刚度评级',
            top: '270px',
            left: 'center'
          },
          pieLegend: {
            textStyle: {
              color: '#eae8c5'
            }
          },
          pieSeries: [
            {
              name: '刚度评级',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 335, name: '例一' },
                { value: 310, name: '例二' },
                { value: 234, name: '例三' },
                { value: 135, name: '例四' },
                { value: 1548, name: '例五' }
              ]
            }
          ],
          pieXaxis: { show: false },
          pieYaxis: { show: false }
        },
        {
          pieTitle: {
            textStyle: {
              color: '#eae8c5'
            },
            text: '综合评级',
            top: '270px',
            left: 'center'
          },
          pieLegend: {
            textStyle: {
              color: '#eae8c5'
            }
          },
          pieSeries: [
            {
              name: '综合评级',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 335, name: '例一' },
                { value: 310, name: '例二' },
                { value: 234, name: '例三' },
                { value: 135, name: '例四' },
                { value: 1548, name: '例五' }
              ]
            }
          ],
          pieXaxis: { show: false },
          pieYaxis: { show: false }
        }
      ]
    }
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    findAll() {},
    resetForm() {}
  }
}
</script>

<style scoped>
</style>
