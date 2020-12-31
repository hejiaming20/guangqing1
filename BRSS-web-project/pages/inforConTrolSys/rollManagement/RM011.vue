<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :table-height="'calc(100vh - 610px)'"
      :current-page="pageIndex"
      :page-size= "10"
      :total="total"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <template slot="TableHead">
        <el-row>
          <el-col :span="21">
            <el-form
              ref="ruleForm"
              :inline="true"
              :model="searchInfo"
              class="search-info"
              label-width="70px">
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="设备类型"
                    prop="eq_typeid">
                    <el-select
                      v-model="searchInfo.eq_typeid"
                      allow-create
                      placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"/>
                    </el-select>
                  </el-form-item>
                  <!-- <el-form-item
                    label="事故原因"
                    prop="accident_reason">
                    <el-input
                      v-model.trim="searchInfo.accident_reason"/>
                  </el-form-item>-->
                  <el-form-item
                    label="事故原因"
                    prop="accident_reason">
                    <el-select
                      v-model="searchInfo.accident_reason"
                      allow-create
                      placeholder="请选择"
                      @change="handlereason">
                      <el-option
                        v-for="item in accidentReasonArray"
                        :key="item.key"
                        :label="item.value"
                        :value="item.value"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="事故类型"
                    prop="accident_typeid">
                    <el-select
                      v-model="searchInfo.accident_typeid"
                      allow-create
                      placeholder="请选择"
                      @change="handleTypeChange_liandong">
                      <el-option
                        v-for="item in accidentTypeArray"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="解决过程"
                    prop="solving_process">
                    <el-input
                      v-model.trim="searchInfo.solving_process"/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="事故开始时间"
                    label-width="90"
                    prop="dstart">
                    <div class="RM011-time">
                      <el-date-picker
                        v-model="searchInfo.dstart"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="开始时间"/>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="事故结束时间"
                    label-width="90"
                    prop="dend">
                    <div class="RM011-time">
                      <el-date-picker
                        v-model="searchInfo.dend"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="结束时间"/>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--   <el-row>
                &lt;!&ndash;  <el-form-item
                  label="事故分析"
                  prop="accident_analysis">
                  <el-input
                    v-model="searchInfo.accident_analysis"/>
                </el-form-item>&ndash;&gt;
              </el-row>-->
            </el-form>
          </el-col>
          <el-col :span="3">
            <div class="btn">
              <el-button
                size="mini"
                type="primary"
                @click="findSearch()">查询</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="resetForm('ruleForm')">重置</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="open_dialog()">事故录入</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          prop="eq_type"
          label="设备类型"/>
        <el-table-column
          prop="accident_type"
          label="事故类型"
          align="center"/>
        <el-table-column
          prop="accident_starttime"
          label="事故开始时间"
          width="155px"
          align="center"/>
        <el-table-column
          prop="accident_endtime"
          label="事故结束时间"
          width="155px"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.accident_endtime | formatTime }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="accident_type"
          label="事故分类"/> -->
        <el-table-column
          min-width="120px"
          prop="accident_processtime"
          label=" 事故处理时间"
          align="center"/>
        <el-table-column
          :show-overflow-tooltip="true"
          width="350px"
          prop="accident_reason"
          label="事故原因"
          align="center"/>
        <el-table-column
          prop="bz"
          label="班组"
          width="60"
          align="center"/>
        <el-table-column
          prop="duty_user"
          min-width="120px"
          label="当班责任人"
          align="center"/>
        <el-table-column
          prop="connection_user"
          min-width="120px"
          label="事故联络人"
          align="center"/>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="roll_no"
          min-width="120px"
          label="辊号"
          align="center"/>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="chock_no"
          min-width="120px"
          label="轴承座号"
          align="center"/>


        <el-table-column
          :show-overflow-tooltip="true"
          prop="grinding_time"
          label="磨削时间定位"
          width="150px"
          align="center"/>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="uplinetime"
          label="上机时间定位"
          width="160px"
          align="center"/>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="lowlinetime"
          label="下机时间定位"
          width="160px"
          align="center"/>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="pairedtime"
          label="装配时间定位"
          width="150px"
          align="center"/>
        <el-table-column
          label="操作"
          min-width="80"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="detail(scope.row)">详情</el-button>
              <!-- <el-button
              size="mini"
              type="danger"
              @click.stop="opendelete(scope.row)">删除
            </el-button> -->
          </template>
        </el-table-column>
      </template>
    </Table-easy>
    <!-- <el-row :gutter="10">
      <el-col :span="14">
        <div class="echartHeader">设备生产事故分析</div>

        <div
          id="chartLeft"
          class="Echar-bg"
          style="margin-top: 0px;padding-bottom: 5px;height: 305px"/>
      </el-col>
      <el-col :span="10">
        <div class="echartHeader">生产事故综合统计</div>

        <div
          id="chartRight"
          class="Echar-bg"
          style="margin-top: 0px;padding-bottom: 5px;height: 305px"/>
      </el-col>

    </el-row>-->
    <!-- 事故录入 -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="事故录入"
      class="layout-dialog"
      width="80%">
      <div class="layout-search">
        <el-form
          ref="sendForm"
          :model="searchInfo1"
          :rules="rules"
          label-width="80px">
          <el-row>
            <el-col :span="6">
              <!-- <el-form-item
                label="设备类型"
                label-width="110px"
                prop="eq_type">
                <el-select
                  v-model="searchInfo1.eq_typeid"
                  filterable
                  allow-create
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item> -->
              <el-form-item
                label="事故类型"
                label-width="110px"
                prop="accident_typeid">
                <el-select
                  v-model="searchInfo1.accident_typeid"
                  allow-create
                  placeholder="请选择"
                  @change="handleTypeChange">
                  <el-option
                    v-for="item in accidentTypeArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="事故原因"
                label-width="110px"
                prop="accident_reason">
                <el-select
                  v-model="searchInfo1.accident_reason"
                  allow-create
                  placeholder="请选择"
                  @change="handlereason_1">
                  <el-option
                    v-for="item in accidentReasonArray_add"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="班组"
                label-width="110px"
                prop="ibz">
                <el-select
                  v-model="searchInfo1.ibz"
                  allow-create
                  placeholder="请选择"
                  @change="handleBzChange">
                  <el-option
                    v-for="item in bzArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                v-show="searchInfo1.accident_typeid != 1"
                label="设备名称"
                label-width="110px"
                prop="eq_typeid">
                <el-select
                  v-model="searchInfo1.eq_typeid"
                  allow-create
                  placeholder="请选择"
                  @change="handleEqTypeChange"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
              <el-form-item
                v-show="searchInfo1.accident_typeid != 2 && searchInfo1.accident_typeid != 3"
                label="轧辊号"
                label-width="110px"
              >
                <el-input
                  v-model="searchInfo1.roll_no"
                  style="width:210px" />
              </el-form-item>
              <el-form-item
                v-show="searchInfo1.accident_typeid != 2 && searchInfo1.accident_typeid != 3"
                label="轴承座号"
                label-width="110px"
                prop="chock_no">
                <el-input
                  v-model="searchInfo1.chock_no"
                  style="width:210px" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="上机时间定位"
                label-width="110px"
                prop="uplinetime">
                <el-date-picker
                  v-model="searchInfo1.uplinetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="上机时间"/>
              </el-form-item>
              <el-form-item
                label="下机时间定位"
                label-width="110px"
                prop="lowlinetime">
                <el-date-picker
                  v-model="searchInfo1.lowlinetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="下机时间"/>
              </el-form-item>
              <el-form-item
                label="磨削时间定位"
                label-width="110px"
                prop="grinding_time">
                <el-date-picker
                  v-model="searchInfo1.grinding_time"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="磨削时间"/>
              </el-form-item>
              <el-form-item
                label="装配时间定位"
                label-width="110px"
                prop="pairedtime">
                <el-date-picker
                  v-model="searchInfo1.pairedtime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="装配时间"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="事故开始时间"
                label-width="110px"
                prop="dstart">
                <div class="RM011-time">
                  <el-date-picker
                    v-model="searchInfo.dstart"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="开始时间"/>
                </div>
              </el-form-item>
              <el-form-item
                label="事故结束时间"
                label-width="110px"
                prop="dend">
                <div class="RM011-time">
                  <el-date-picker
                    v-model="searchInfo.dend"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="结束时间"/>
                </div>
              </el-form-item>
              <el-form-item
                label="事故联络人"
                label-width="110px"
                prop="connection_user">
                <el-input
                  v-model="searchInfo1.connection_user"
                  style="width:210px"/>
              </el-form-item>
              <el-form-item
                label="当班责任人"
                label-width="110px"
                prop="duty_user">
                <el-input
                  v-model="searchInfo1.duty_user"
                  style="width:210px"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item
              label="事故分析"
              label-width="110px"
            >
              <el-input
                :rows="2"
                v-model="searchInfo1.accident_analysis"
                type="textarea"
                placeholder="请输入内容"/>
            </el-form-item>
          </el-row><el-row>
            <el-form-item
              label="解决过程"
              label-width="110px"
            >
              <el-input
                :rows="2"
                v-model="searchInfo1.solving_process"
                type="textarea"
                placeholder="解决过程"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col
              :span="2"
              :offset="6">
              <el-button
                size="mini"
                type="primary"
                @click="detail_hand()">确认提交</el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                size="mini"
                type="primary"
                @click="resetluru">取 消</el-button>
                <!--@click="resetForm('ruleForm')">取消</el-button>-->
            </el-col>
            <el-col :span="8">
              <el-upload
                :on-preview="handlePreview"
                :before-remove="beforeRemove"
                :on-remove="handleRemove"
                :limit="3"
                :file-list="fileList"
                :on-exceed="handleExceed"
                class="upload-demo"
                action="/productionAccidents/insert"
                multiple>
                <!--<el-button
                  size="mini"
                  type="primary">上传事故报告</el-button>
              </el-upload>-->
                <!-- <el-button
                size="mini"
                type="primary"
                @click="detail_111(scope.row)">上传事故报告</el-button> -->
            </el-upload></el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog
      :visible.sync="dialogVisible_watch"
      title="事故详情"
      class="layout-dialog"
      width="80%">
      <div class="layout-search">
        <el-form
          :model="searchInfoss"
          label-width="80px">
          <el-row>
            <el-col :span="6">

              <el-form-item
                label="事故类型"
                label-width="110px"
                prop="accident_type">
                <el-input
                  :disabled="true"
                  v-model="searchInfoss.accident_type"
                  style="width:210px" />
              </el-form-item>
              <el-form-item
                label="事故原因"
                label-width="110px"
                prop="accident_reason">
                <el-input
                  :disabled="true"
                  v-model="searchInfoss.accident_reason"
                  style="width:210px" />
              </el-form-item>
              <el-form-item
                label="班组"
                label-width="110px"
                prop="bz">
                <el-input
                  :disabled="true"
                  v-model="searchInfoss.bz"
                  style="width:210px" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="设备名称"
                label-width="110px"
                prop="eq_type">
                <el-input
                  :disabled="true"
                  v-model="searchInfoss.eq_type"
                  style="width:210px" />
              </el-form-item>
              <el-form-item
                label="轧辊号"
                label-width="110px">
                <el-input
                  :disabled="true"
                  v-model="searchInfoss.roll_no"
                  style="width:210px" />
              </el-form-item>

              <el-form-item
                label="轴承座号"
                label-width="110px"
                prop="chock_no">
                <el-input
                  :disabled="true"
                  v-model="searchInfoss.chock_no"
                  style="width:210px" />
              </el-form-item>

            </el-col>
            <el-col :span="6">
              <el-form-item
                label="上机时间定位"
                label-width="110px"
                prop="uplinetime">
                <el-input
                  :disabled="true"
                  v-model="searchInfoss.uplinetime"
                  style="width:210px" />
              </el-form-item>
              <el-form-item
                label="下机时间定位"
                label-width="110px"
                prop="lowlinetime">
                <el-input
                  :disabled="true"
                  v-model="searchInfoss.lowlinetime"
                  style="width:210px" />
              </el-form-item>
              <el-form-item
                label="磨削时间定位"
                label-width="110px"
                prop="grinding_time">
                <el-input
                  :disabled="true"
                  v-model="searchInfoss.grinding_time"
                  style="width:210px" />
              </el-form-item>


              <el-form-item
                label="装配时间定位"
                label-width="110px"
                prop="pairedtime">
                <el-input
                  :disabled="true"
                  v-model="searchInfoss.pairedtime"
                  style="width:210px" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="事故联络人"
                label-width="110px"
                prop="connection_user">
                <el-input
                  :disabled="true"
                  v-model="searchInfoss.connection_user"
                  style="width:210px" />
              </el-form-item>
              <el-form-item
                label="当班责任人"
                label-width="110px">
                <el-input
                  :disabled="true"
                  v-model="searchInfoss.duty_user"
                  style="width:210px"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item
              label="事故分析"
              label-width="110px">
              <el-input
                :disabled="true"
                :rows="2"
                v-model="searchInfoss.accident_analysis"
                type="textarea"
                placeholder="请输入内容"/>
            </el-form-item>
          </el-row><el-row>
            <el-form-item
              label="解决过程"
              label-width="110px">
              <el-input
                :disabled="true"
                :rows="2"
                v-model="searchInfoss.solving_process"
                type="textarea"
                placeholder="请输入内容"/>
            </el-form-item>
          </el-row>
          <!-- <el-row>
            <el-col
              :span="8"
              :offset="12">
              <el-button
                size="mini"
                type="primary"
                @click="detail_111(searchInfoss)">上传事故报告</el-button>
            </el-col>
          </el-row> -->
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="mini"
          type="primary"
          @click="dialogVisible_watch = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { rollInformation, kucunlist, rolltypelist } from '@/api/pinClipBoard' //查询接口
import { get, post } from '@/lib/Util'
import moment from 'moment'
import Echarts from 'echarts'
import TableEasy from '@/components/TasilyTableEasy'
export default {
  components: { TableEasy },
  filters: {
    formatTime(val) {
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      rules: {
        accident_typeid: [
          { required: true, message: '请选择事故类型', trigger: 'change' }
        ],
        accident_reason: [
          { required: true, message: '请选择事故原因', trigger: 'change' }
        ],
        ibz: [{ required: true, message: '请选择班组', trigger: 'change' }],
        dstart: [
          {
            type: 'date',
            required: true,
            message: '请选择开始时间',
            trigger: 'change'
          }
        ],
        dend: [
          {
            type: 'date',
            required: true,
            message: '请选择结束时间',
            trigger: 'change'
          }
        ]
      },
      fileList: [],
      myChart: {},
      options: [],
      accidentTypeArray: [],
      accidentReasonArray: [],
      accidentReasonArray_add: [],
      bzArray: [],
      searchInfo: {
        accident_reason: '',
        accident_reasonid: ''
      },
      searchInfo1: {
        accident_reason: '',
        accident_reasonid: ''
      },
      searchInfoss: {},
      pageIndex: 1,
      pageSize: 10,
      shigufenxi: {},
      accident_analysis_ta: '',
      formLabelAlign: {},
      tableData: [],
      total: 0,
      dialogVisible: false,
      dialogVisible_watch: false,
      title: '',
      bzdataFir: '',
      bzdataSec: '',
      bzdataThi: '',
      bzdataFou: '',
      optionRight: {
        // title: {
        //   text: '轧辊信息',
        //   left: 'center',
        //   textStyle: {
        //     color: '#eae8c5' //字体颜色
        //   }
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          textStyle: {
            color: '#eae8c5' //字体颜色
          },
          type: 'scroll',
          orient: 'vertical',
          left: 10,
          data: [
            '生产操作',
            '电气故障',
            '机械故障',
            '人为故障',
            '甲班',
            '乙班',
            '丙班',
            '丁班'
          ]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '2%',
          top: '15%',
          containLabel: true
        },
        series: [
          {
            top: 30,
            left: '15%',
            name: '班组',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '60%'],
            label: {
              position: 'inner'
            },
            labelLine: {
              show: false
            },
            data: [
              { value: '', name: '甲班' },
              { value: '', name: '乙班' },
              { value: '', name: '丙班' },
              { value: '', name: '丁班' }
            ]
          },
          {
            top: 30,
            left: '15%',
            name: '故障类型',
            type: 'pie',
            radius: ['70%', '95%'],
            label: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#333333',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center'
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 14,
                  lineHeight: 15
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [1, 2],
                  borderRadius: 2
                }
              }
            },
            data: [
              { value: '', name: '生产操作' },
              { value: '', name: '电气故障' },
              { value: '', name: '机械故障' },
              { value: '', name: '人为故障' }
            ]
          }
        ]
      },
      optionLeft: {
        color: ['#006699', '#4cabce', '#ff9a9a', '#e5323e'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          top: '5%',
          textStyle: {
            color: '#eae8c5' //字体颜色
          },
          data: ['生产', '电气', '机械', '人为']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '2%',
          top: '20%',
          containLabel: true
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            axisLine: {
              lineStyle: {
                color: '#eae8c5' //坐标线颜色
              }
            },
            type: 'category',
            axisTick: { show: false },
            data: ['1#磨床', '2#磨床', '3#磨床', '4#磨床', '5#磨床', '6#磨床']
          }
        ],
        yAxis: [
          {
            axisLine: {
              lineStyle: {
                color: '#eae8c5' //坐标线颜色
              }
            },
            type: 'value'
          }
        ],
        series: [
          {
            name: '生产',
            type: 'bar',
            barGap: 0,
            label: {
              show: true,
              rotate: 90,
              align: 'left',
              verticalAlign: 'middle',
              position: 'insideBottom',
              distance: 15
            },
            data: [320, 332, 301, 334, 444, 302]
          },
          {
            name: '电气',
            type: 'bar',
            label: {
              show: true,
              rotate: 90,
              align: 'left',
              verticalAlign: 'middle',
              position: 'insideBottom',
              distance: 15
            },
            data: [220, 182, 191, 234, 191, 234]
          },
          {
            name: '机械',
            type: 'bar',
            label: {
              show: true,
              rotate: 90,
              align: 'left',
              verticalAlign: 'middle',
              position: 'insideBottom',
              distance: 15
            },
            data: [150, 232, 201, 154, 201, 154]
          },
          {
            name: '人为',
            type: 'bar',
            label: {
              show: true,
              rotate: 90,
              align: 'left',
              verticalAlign: 'middle',
              position: 'insideBottom',
              distance: 15
            },
            data: [150, 232, 201, 154, 201, 154]
          }
        ]
      }
    }
  },
  mounted() {
    post('/dictionary/findMapV1', { dicno: 'eq_type' }).then(res => {
      this.options = res.data //设备类型
    })
    post('/dictionary/findMapV1', { dicno: 'acc_type' }).then(res => {
      this.accidentTypeArray = res.data //事故类型
    })
    /* post('/dictionary/findMapV1', { dicno: 'acc_reason' }).then(res => {
      this.accidentReasonArray = res.data //事故原因
    })*/
    post('/dictionary/findMapV1', { dicno: 'team' }).then(res => {
      this.bzArray = res.data //班组
    })
    this.findAll()
    // this.findLeftEchart()
    // this.findRightEchart()
    // this.echartOption()
  },
  methods: {
    findLeftEchart() {
      post('/productionAccidents/echartsMs', {}).then(res => {
        this.optionLeft.series[0].data[0] = res.data[0][1]
        this.optionLeft.series[0].data[1] = res.data[0][2]
        this.optionLeft.series[0].data[2] = res.data[0][3]
        this.optionLeft.series[0].data[3] = res.data[0][4]
        this.optionLeft.series[0].data[4] = res.data[0][5]
        this.optionLeft.series[0].data[5] = res.data[0][6]

        this.optionLeft.series[1].data[6] = res.data[1][1]
        this.optionLeft.series[1].data[0] = res.data[1][1]
        this.optionLeft.series[1].data[1] = res.data[1][2]
        this.optionLeft.series[1].data[2] = res.data[1][3]
        this.optionLeft.series[1].data[3] = res.data[1][4]
        this.optionLeft.series[1].data[4] = res.data[1][5]
        this.optionLeft.series[1].data[5] = res.data[1][6]

        this.optionLeft.series[2].data[6] = res.data[2][1]
        this.optionLeft.series[2].data[0] = res.data[2][1]
        this.optionLeft.series[2].data[1] = res.data[2][2]
        this.optionLeft.series[2].data[2] = res.data[2][3]
        this.optionLeft.series[2].data[3] = res.data[2][4]
        this.optionLeft.series[2].data[4] = res.data[2][5]
        this.optionLeft.series[2].data[5] = res.data[2][6]

        this.optionLeft.series[3].data[6] = res.data[3][1]
        this.optionLeft.series[3].data[0] = res.data[3][1]
        this.optionLeft.series[3].data[1] = res.data[3][2]
        this.optionLeft.series[3].data[2] = res.data[3][3]
        this.optionLeft.series[3].data[3] = res.data[3][4]
        this.optionLeft.series[3].data[4] = res.data[3][5]
        this.optionLeft.series[3].data[5] = res.data[3][6]
        this.optionLeft.series[3].data[6] = res.data[3][1]
        this.echartOption()
      })
    },
    findRightEchart() {
      post('/productionAccidents/echartsBing', {}).then(res => {
        // console.log(res.data.班组[1])
        this.optionRight.series[0].data[0].value = res.data.班组[1]
        this.optionRight.series[0].data[1].value = res.data.班组[2]
        this.optionRight.series[0].data[2].value = res.data.班组[3]
        this.optionRight.series[0].data[3].value = res.data.班组[4]
        // console.log(res.data.事故类型)
        this.optionRight.series[1].data[0].value = res.data.事故类型[1]
        this.optionRight.series[1].data[1].value = res.data.事故类型[2]
        this.optionRight.series[1].data[2].value = res.data.事故类型[3]
        this.optionRight.series[1].data[3].value = res.data.事故类型[4]
        this.echartOption()
      })
    },
    echartOption() {
      var myChart = Echarts.init(document.getElementById('chartRight'), 'light') //将配置注入到html中定义的容器
      var myChart1 = Echarts.init(document.getElementById('chartLeft'), 'light') //将配置注入到html中定义的容器
      myChart.setOption(this.optionRight)
      myChart1.setOption(this.optionLeft)
      window.onresize = function() {
        myChart.resize()
        myChart1.resize()
      }
    },
    /**
     * description: 查询全部数据
     */
    // 删除数据 别动！！！！！！！！！！！！！！！！！！！！！！
    // opendelete(data) {
    //   console.log('123')
    //   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       post('/productionAccidents/deleteOne', {
    //         indocno: data.indocno
    //       }).then(res => {
    //         console.log('删除', res)
    //         if (res) {
    //           this.$message({
    //             type: 'success',
    //             message: '删除成功!'
    //           })
    //           this.findAll()
    //         }
    //       })
    //       this.findAll()
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })
    // },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleEqTypeChange() {
      this.options.forEach(item => {
        if (item.key == this.searchInfo1.eq_typeid) {
          this.searchInfo1.eq_type = item.value
        }
      })
    },
    handlereason() {
      this.accidentReasonArray.forEach(item => {
        if (item.value == this.searchInfo.accident_reason) {
          this.searchInfo.accident_reasonid = item.key
        }
      })
    },
    // 事故原因选择框
    handlereason_1(val) {
      if (val) {
        this.$set(this.searchInfo1, this.searchInfo1.accident_reason, val)
      } else {
        this.$set(this.searchInfo1, this.searchInfo1.accident_reason, '')
      }

      this.accidentReasonArray_add.forEach(item => {
        if (item.value == this.searchInfo1.accident_reason) {
          this.searchInfo1.accident_reasonid = item.key
        }
      })
    },
    //查询联动
    handleTypeChange_liandong() {
      post('accidentObject/findDpd', {
        accident_type_id: this.searchInfo.accident_typeid
      }).then(res => {
        this.accidentReasonArray = res.data //事故原因
      })

      this.accidentTypeArray.forEach(item => {
        if (item.key == this.searchInfo.accident_typeid) {
          this.searchInfo1.accident_type = item.value
        }
      })
      this.searchInfo.accident_reason = ''
      this.searchInfo.accident_reasonid = ''
    },
    //添加项联动
    handleTypeChange() {
      this.searchInfo1.accident_reason = ''
      post('accidentObject/findDpd', {
        accident_type_id: this.searchInfo1.accident_typeid
      }).then(res => {
        this.accidentReasonArray_add = res.data //事故原因
      })

      this.accidentTypeArray.forEach(item => {
        if (item.key == this.searchInfo1.accident_typeid) {
          this.searchInfo1.accident_type = item.value
        }
      })
      this.isShow = false
      this.$nextTick(() => {
        this.isShow = true
      })
      this.searchInfo1.accident_reason = ''
      this.searchInfo1.accident_reasonid = ''
    },
    handleBzChange() {
      this.bzArray.forEach(item => {
        if (item.key == this.searchInfo1.ibz) {
          this.searchInfo1.bz = item.value
        }
      })
    },
    findSearch() {
      this.pageIndex = 1
      this.findAll()
    },
    async findAll() {
      let res = await post('/productionAccidents/findByPage', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      })
      this.tableData = res.data
      this.total = res.count
      this.pageIndex = 1
    },
    detail_hand() {
      this.$refs.sendForm.validate(valid => {
        if (valid) {
          post('/productionAccidents/insert', {
            productionAccidents: this.searchInfo1
          }).then(res => {
            if (res.status == 2000) {
              this.$message({
                type: 'success',
                message: '提交成功!'
              })
            } else {
              this.$message(res.msg)
            }
            this.findAll()
            this.dialogVisible = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetluru() {
      this.dialogVisible = false
      this.$refs.sendForm.resetFields()
      this.searchInfo1 = {}
    },
    resetForm(formName) {
      this.searchInfo = {}
      this.findSearch()
      // console.log('重置', formName)
      // this.$refs[formName].resetFields()
      // console.log('重置', this.$refs[formName])
    },
    open_dialog() {
      this.title = '事故录入'
      this.dialogVisible = true
      this.searchInfo1 = {}
    },
    //详情
    detail(val) {
      this.title = '事故详情'
      this.dialogVisible_watch = true
      this.searchInfoss = val
    },
    detail_111(val) {
      var test = val
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
    }
  }
}
</script>
<style scoped>
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
