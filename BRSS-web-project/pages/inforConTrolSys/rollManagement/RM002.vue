<!--
 * @Author: your name
 * @Date: 2020-07-23 09:57:34
 * @LastEditTime: 2020-12-09 19:26:21
 * @LastEditors: Please set LastEditors
 * @Description: 辅材仓库管理页面
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\am.vue
-->
<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="20" >
        <Table-easy
          :table-data="tableData"
          :total ="total"
          :page-size="pageSize"
          :current-page="pageIndex"
          class="rm002table"
          index-type="index"
          @handle-current-change="handleCurrentChange"
          @handle-size-change="handleSizeChange">
          <template slot="TableHead">
            <el-row>
              <el-col :span="20">
                <el-form
                  ref="ruleForm"
                  :model="searchInfo"
                  class="search-info"
                  label-width="80px">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item
                        label="辊号"
                        prop="roll_no">
                        <el-input v-model="searchInfo.roll_no" />
                      </el-form-item>
                      <el-form-item
                        label="制造厂商"
                        prop="factory_id">
                        <el-select
                          v-model="searchInfo.factory_id"
                          placeholder="请选择">
                          <el-option
                            v-for="item in option_1"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="轧辊类型"
                        prop="roll_typeid">
                        <el-select
                          v-model="searchInfo.roll_typeid"
                          placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="合同号"
                        prop="contract_no">
                        <el-input v-model="searchInfo.contract_no" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="轧辊材质"
                        prop="material_id">
                        <el-select
                          v-model="searchInfo.material_id"
                          placeholder="请选择">
                          <el-option
                            v-for="item in option_2"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="机架范围"
                        prop="framerangeid">
                        <el-select
                          v-model="searchInfo.framerangeid"
                          placeholder="请选择">
                          <el-option
                            v-for="item in frameFwArray"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="库存状态"
                        prop="roll_state">
                        <el-select
                          v-model="searchInfo.roll_state"
                          placeholder="请选择">
                          <el-option
                            v-for="item in rollstateArray"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"/>
                        </el-select>
                      </el-form-item>
                    <!--  <el-form-item
                        label="周转状态"
                        prop="roll_revolve">
                        <el-select
                          v-model="searchInfo.roll_revolve"
                          clearable
                          placeholder="请选择周转状态">
                          <el-option
                            v-for="item in rollRevolveArray"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"/>
                        </el-select>
                      </el-form-item>-->
                    </el-col>
                  </el-row>
                </el-form>
              </el-col>
              <el-col :span="4">
                <div class="btn">
                  <el-button
                    type="primary"
                    size="mini"
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
              prop="roll_no"
              width="120px"
              label="辊号"/>
            <el-table-column
              prop="roll_type"
              width="130px"
              label="轧辊类型"/>
            <!-- 添加-->
            <el-table-column
              prop="material"
              width="120"
              label="轧辊材质"/>
            <el-table-column
              prop="frame_no"
              width="80px"
              label="机架号"/>
            <el-table-column
              prop="currentdiameter"
              width="100px"
              label="当前辊径"/>
            <el-table-column
              prop="roll_state_value"
              width="100px"
              label="库存状态"/>
            <!--  <el-table-column
              prop="roll_revolve_value"
              width="80px"
              label="周转状态"/>-->
            <el-table-column
              v-for="(item, index) in arr"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              show-overflow-tooltip/>
            <el-table-column
              prop="lastgrindingtime"
              width="160px"
              label="最新一次磨削时间"/>
            <el-table-column
              prop="lastlowlinetime"
              width="160px"
              label="最新一次下线时间"/>
            <el-table-column
              label="操作"
              width="190"
              align="center">
              <template slot-scope="scope">
                <!-- <el-button
                  v-if="roles.search('21') != -1"
                  size="mini"
                  type="primary"
                  @click="handleEditState(scope.row)">状态修改
                </el-button>-->
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEditState(scope.row)">状态修改
                </el-button>
                <el-button
                  size="mini"
                  type="warning"
                  @click="handleEdit(scope.row)">修改
                </el-button>
              </template>
            </el-table-column>

          </template>
        </Table-easy>
      </el-col>
      <el-col :span="4">
        <!-- 检索区 -->
        <div class="right-box layout-block">
          <el-checkbox
            v-model="checkAll"
            @change="handleCheckAllChange">全选
          </el-checkbox>
          <div style="margin: 15px 0;"/>
          <el-checkbox
            v-for="(columns, index) in tableColumns"
            v-model="columns.checkFg"
            :key="index"
            @change="checkboxChange(columns,'1')">{{ columns.label }}
          </el-checkbox>
        </div>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="5">
      <el-col :span="12">
        <div class="echartHeader">磨削数据统计</div>
        <div
          id="chartLeft"
          class="Echar-bg"
          style="margin-top: 0px;padding-bottom: 5px;height: 330px"/>
      </el-col>
      <el-col :span="12">
        <div class="echartHeader">轧制数据分布</div>
        <div
          id="chartRight"
          class="Echar-bg"
          style="margin-top: 0px;padding-bottom: 5px;height: 330px"/>
      </el-col>
    </el-row> -->
    <!-- 库存变动记录查看 -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="库存历史记录"
      class="layout-dialog"
      width="60%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlign"
          label-position="top"
          label-width="140px">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item
                label="辊号"
                prop="roll_no">
                <el-input v-model="formLabelAlign.roll_no" />
              </el-form-item>
              <el-form-item
                label="制造厂商"
                prop="factory_id">
                <el-select
                  v-model="formLabelAlign.factory_id"
                  placeholder="请选择"
                  clearable
                  @change="handleFactoryChange">
                  <el-option
                    v-for="item in option_1"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="轧辊位置"
                prop="roll_positionid">
                <el-select
                  v-model="formLabelAlign.roll_positionid"
                  clearable
                  placeholder="请选择轧辊位置"
                  @change="handleRollPositionChange">
                  <el-option
                    v-for="item in rollPositionArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="合同号"
                prop="contract_no">
                <el-input v-model="formLabelAlign.contract_no" />
              </el-form-item>
              <el-form-item
                label="轧辊材质"
                prop="material_id">
                <el-select
                  v-model="formLabelAlign.material_id"
                  clearable
                  placeholder="请选择轧辊材质"
                  @change="handleMaterChange">
                  <el-option
                    v-for="item in rollMaterialArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="机架范围"
                prop="framerangeid">
                <el-select
                  v-model="formLabelAlign.framerangeid"
                  clearable
                  placeholder="请选择"
                  @change="handleFrameScopeChange">
                  <el-option
                    v-for="item in frameFwArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="机架号"
                prop="frame_noid">
                <el-select
                  v-model="formLabelAlign.frame_noid"
                  clearable
                  placeholder="请选择"
                  @change="handleFrameNoChange">
                  <el-option
                    v-for="item in frameNoArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="磨床"
                prop="machine_id">
                <el-select
                  v-model="formLabelAlign.machine_id"
                  clearable
                  placeholder="请选择">
                  <el-option
                    v-for="item in machineArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="最新一次磨削时间"
                prop="lastgrindingtime">
                <!-- <el-input v-model="formLabelAlign.lastgrindingtime" /> -->
                <el-date-picker
                  v-model="formLabelAlign.lastgrindingtime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  clearable
                  type="datetime"
                  placeholder="选择日期"/>
              </el-form-item>
              <el-form-item
                label="最新一次上线时间"
                prop="lastuplinetime">
                <!-- <el-input v-model="formLabelAlign.lastuplinetime" /> -->
                <el-date-picker
                  v-model="formLabelAlign.lastuplinetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  clearable
                  type="datetime"
                  placeholder="选择日期"/>
              </el-form-item>
              <el-form-item
                label="最新一次下线时间"
                prop="lastlowlinetime">
                <el-date-picker
                  v-model="formLabelAlign.lastlowlinetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  clearable
                  type="datetime"
                  placeholder="选择日期"/>
                  <!-- <el-input v-model="formLabelAlign.lastlowlinetime" /> -->
              </el-form-item>
              <el-form-item
                label="最新一次磨削量"
                prop="lastgrindingdepth">
                <el-input v-model="formLabelAlign.lastgrindingdepth" />
              </el-form-item>
              <el-form-item
                label="辊身硬度"
                prop="bodyhardness">
                <el-input v-model="formLabelAlign.bodyhardness" />
              </el-form-item>
              <el-form-item
                label="辊颈硬度"
                prop="neckhardness">
                <el-input v-model="formLabelAlign.neckhardness" />
              </el-form-item>
              <el-form-item
                label="辊肩硬度"
                prop="shoulderhardness">
                <el-input v-model="formLabelAlign.shoulderhardness" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="累积磨削次数"
                prop="grindingcount">
                <el-input v-model="formLabelAlign.grindingcount" />
              </el-form-item>
              <el-form-item
                label="平均磨削量"
                prop="grindingavg">
                <el-input v-model="formLabelAlign.grindingavg" />
              </el-form-item>
              <el-form-item
                label="累积上线次数"
                prop="uplinecount">
                <el-input v-model="formLabelAlign.uplinecount" />
              </el-form-item>
              <el-form-item
                label="累积轧制公里数"
                prop="rollkilometer">
                <el-input v-model="formLabelAlign.rollkilometer" />
              </el-form-item>
              <el-form-item
                label="探伤结果"
                prop="inspectionresults">
                <el-input v-model="formLabelAlign.inspectionresults" />
              </el-form-item>
              <el-form-item
                label="高速钢轧辊上线周期跟踪次数"
                prop="uplinecount">
                <el-input v-model="formLabelAlign.uplinecount" />
              </el-form-item>
              <el-form-item
                label="工作辊补油周期跟踪次数"
                prop="workoilcount">
                <el-input v-model="formLabelAlign.workoilcount" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="累计轧制吨位数"
                prop="rolltonnagetotle">
                <el-input v-model="formLabelAlign.rolltonnagetotle" />
              </el-form-item>
              <el-form-item
                label="每毫米轧制吨位"
                prop="rolltonnagemm">
                <el-input v-model="formLabelAlign.rolltonnagemm" />
              </el-form-item>
              <el-form-item
                label="当前辊径"
                prop="currentdiameter">
                <el-input v-model="formLabelAlign.currentdiameter" />
              </el-form-item>
              <el-form-item
                label="剩余可用直径"
                prop="residualdiameter">
                <el-input v-model="formLabelAlign.residualdiameter" />
              </el-form-item>
              <el-form-item
                label="辊形"
                prop="rollshape">
                <el-input v-model="formLabelAlign.rollshape" />
              </el-form-item>
              <el-form-item
                label="圆度"
                prop="roundness">
                <el-input v-model="formLabelAlign.roundness" />
              </el-form-item>
              <el-form-item
                label="粗糙度"
                prop="roughness">
                <el-input v-model="formLabelAlign.roughness" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          @click="dialogVisible = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 状态修改 -->
    <el-dialog
      :visible.sync="dialogVisibleChange"
      title="状态修改"
      class="layout-dialog"
      width="40%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlignChange"
          label-position="top"
          label-width="140px">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item
                label="轧辊状态"
                prop="roll_state">
                <el-select
                  v-model="formLabelAlignChange.roll_state"
                  clearable
                  placeholder="请选择轧辊状态">
                  <el-option
                    v-for="item in rollStateArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="高速钢轧辊上线周期跟踪次数"
                prop="uplinecount">
                <el-input-number
                  v-model="formLabelAlignChange.uplinecount"
                  size="medium"
                  controls-position="right" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!-- <el-form-item
                label="周转状态"
                prop="roll_revolve">
                <el-select
                  v-model="formLabelAlignChange.roll_revolve"
                  clearable
                  placeholder="请选择周转状态">
                  <el-option
                    v-for="item in rollRevolveArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>-->
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="特殊状态"
                prop="roll_special">
                <el-select
                  v-model="formLabelAlignChange.roll_special"
                  clearable
                  placeholder="请选择特殊状态">
                  <el-option
                    v-for="item in rollSpecialArray"
                    :key="item.key"
                    :label="item.value"
                    :value="Number(item.key)"/>
                </el-select>
              </el-form-item>

            </el-col>

          </el-row>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          @click="dialogVisibleChange = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="submitChange">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import { rollInformation, kucunlist, rolltypelist } from '@/api/pinClipBoard' //查询接口
import Echarts from 'echarts'
import { get, post, getDataConfig } from '@/lib/Util'
export default {
  components: {
    TableEasy
  },
  data() {
    return {
      formLabelAlignChange: {},
      searchInfo: {},
      tableData: [],
      options: [],
      option_1: [],
      option_2: [],
      dialogVisible: false,
      dialogVisibleChange: false,
      checkAll: false,
      columnsArray: [],
      arr: [],
      collArray: [],
      tableColumns: [
        {
          label: '制造厂商',
          prop: 'factory',
          width: '80px',
          checkFg: true
        },
        {
          label: '轧辊位置',
          prop: 'roll_position',
          width: '80px',
          checkFg: true
        },
        // {
        //   label: '轧辊状态',
        //   prop: 'roll_state',
        //   checkFg: false
        // },
        {
          label: '机架范围',
          prop: 'framerange',
          width: '80px',
          checkFg: false
        },
        {
          label: '磨床号',
          prop: 'machine_id',
          width: '80px',
          checkFg: false
        },
        {
          label: '合同号',
          prop: 'contract_no',
          width: '150px',
          checkFg: false
        },
        {
          label: '最新一次上线时间',
          prop: 'lastuplinetime',
          width: '150px',
          checkFg: false
        },
        {
          label: '最新一次磨削量',
          prop: 'lastgrindingdepth',
          width: '140px',
          checkFg: false
        },
        {
          label: '累积磨削次数',
          prop: 'grindingcount',
          width: '120px',
          checkFg: false
        },
        {
          label: '平均磨削量',
          prop: 'grindingavg',
          width: '100px',
          checkFg: false
        },
        {
          label: '累积上线次数',
          prop: 'uplinecount',
          width: '120px',
          checkFg: false
        },
        {
          label: '累积轧制公里数',
          prop: 'rollkilometer',
          width: '120px',
          checkFg: false
        },
        {
          label: '累计轧制吨位数',
          prop: 'rolltonnagetotle',
          width: '120px',
          checkFg: false
        },
        {
          label: '每毫米轧制吨位',
          prop: 'rolltonnagemm',
          width: '120px',
          checkFg: false
        },
        {
          label: '剩余可用直径',
          prop: 'residualdiameter',
          width: '120px',
          checkFg: false
        },
        {
          label: '辊形',
          prop: 'rollshape',
          width: '80px',
          checkFg: false
        },
        {
          label: '圆度',
          prop: 'roundness',
          width: '80px',
          checkFg: false
        },
        {
          label: '粗糙度',
          prop: 'roughness',
          width: '80px',
          checkFg: false
        },
        {
          label: '辊身硬度',
          prop: 'bodyhardness',
          width: '80px',
          checkFg: false
        },
        {
          label: '辊颈硬度',
          prop: 'neckhardness',
          width: '80px',
          checkFg: false
        },
        {
          label: '辊肩硬度',
          prop: 'shoulderhardness',
          width: '80px',
          checkFg: false
        },
        {
          label: '探伤结果',
          prop: 'inspectionresults',
          width: '80px',
          checkFg: false
        },
        {
          label: '高速钢轧辊上线周期跟踪次数',
          prop: 'uplinecount',
          width: '130px',
          checkFg: false
        },
        {
          label: '工作辊补油周期跟踪次数',
          prop: 'workoilcount',
          width: '130px',
          checkFg: false
        }
      ],
      isIndeterminate: true,
      total: 0,
      pageIndex: 1,
      pageSize: 30,
      formLabelAlign: {},
      rollStateArray: [],
      rollRevolveArray: [],
      rollSpecialArray: [],
      rollMaterialArray: [],
      rollPositionArray: [],
      frameFwArray: [], // 机架范围
      frameNoArray: [], // 机架号
      machineArray: [],
      rollstateArray: [],
      flag: true
    }
  },
  mounted() {
    this.findAll()
    this.findOption()
    post('/dictionary/findMapV1', { dicno: 'roll_factory' }).then(res => {
      this.option_1 = res.data //制造厂商
    })
    post('/dictionary/findMapV1', { dicno: 'roll_material' }).then(res => {
      this.option_2 = res.data //材质
    })
    getDataConfig('uplocation').then(res => {
      this.rollPositionArray = res // 上级位置
    })
    getDataConfig('roll_material').then(res => {
      this.rollMaterialArray = res // 部件类型
    })
    getDataConfig('rollstate').then(res => {
      this.rollStateArray = res // 部件类型
    })
    getDataConfig('rollrevolve').then(res => {
      this.rollRevolveArray = res // 部件类型
    })

    getDataConfig('rollspecial').then(res => {
      this.rollSpecialArray = res // 部件类型
    })

    getDataConfig('framefw').then(res => {
      this.frameFwArray = res
    })
    getDataConfig('frameteam').then(res => {
      this.frameNoArray = res
    })
    getDataConfig('machine').then(res => {
      this.machineArray = res
    })

    getDataConfig('rollstate').then(res => {
      this.rollstateArray = res
    })

    this.checkboxChange(this.tableColumns, '2')

    this.roles = JSON.parse(localStorage.getItem('storeID')) //  JSON.parse(localStorage.limits)
    // this.echartOption()
  },
  methods: {
    // 散点图
    echartOption() {
      var optionLeft = {
        // title: {
        //   text: '磨削数据统计',
        //   left: 'center',
        //   textStyle: {
        //     color: '#eae8c5' //字体颜色
        //   }
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          top: 20,
          textStyle: {
            color: '#eae8c5' //字体颜色
          },
          data: ['累积磨削次数', '平均磨削量']
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#eae8c5' //坐标线颜色
              }
            },
            data: [
              '高铬锻钢(FS)',
              '高铬铸钢(CS)',
              '高铬铸铁(CI)',
              '无限冷硬(ICDP)',
              '合金半钢(SS)',
              '合金铸钢(EC)',
              '高速钢(HSS)',
              '高铬钢(CR)',
              '半高速钢(SHSS)'
            ],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            axisLine: {
              lineStyle: {
                color: '#eae8c5' //坐标线颜色
              }
            },
            type: 'value',
            name: '磨削次数',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} '
            }
          },
          {
            axisLine: {
              lineStyle: {
                color: '#eae8c5' //坐标线颜色
              }
            },
            type: 'value',
            name: '磨削量',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} '
            }
          }
        ],
        series: [
          {
            name: '累积磨削次数',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7]
          },
          {
            name: '平均磨削量',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0]
          }
        ]
      }
      var optionRight = {
        // title: {
        //   text: '轧制数据分布',
        //   left: 'center',
        //   textStyle: {
        //     color: '#eae8c5' //字体颜色
        //   }
        // },
        legend: {
          top: 20,
          type: 'scroll',
          textStyle: {
            color: '#eae8c5' //字体颜色
          },
          data: [
            '高铬锻钢(FS)',
            '高铬铸钢(CS)',
            '高铬铸铁(CI)',
            '无限冷硬(ICDP)',
            '合金半钢(SS)',
            '合金铸钢(EC)',
            '高速钢(HSS)',
            '高铬钢(CR)',
            '半高速钢(SHSS)'
          ]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          name: '累积轧制吨钢数',
          nameLocation: 'center',
          axisLine: {
            lineStyle: {
              color: '#eae8c5' //坐标线颜色
            }
          },
          type: 'value',
          boundaryGap: false
        },
        yAxis: {
          name: '累积轧制公里数',
          nameLocation: 'center',
          axisLine: {
            lineStyle: {
              color: '#eae8c5' //坐标线颜色
            }
          },
          type: 'value'
        },
        series: [
          {
            name: '高铬锻钢(FS)',
            symbolSize: 5,
            data: [
              [10.0, 8.04],
              [8.0, 6.95],
              [13.0, 7.58],
              [9.0, 8.81],
              [11.0, 8.33],
              [14.0, 9.96],
              [6.0, 7.24],
              [4.0, 4.26],
              [12.0, 10.84],
              [7.0, 4.82],
              [5.0, 5.68]
            ],
            type: 'scatter'
          },
          {
            name: '高铬铸钢(CS)',
            symbolSize: 5,
            data: [
              [20.0, 8.04],
              [8.0, 6.95],
              [23.0, 7.58],
              [3.0, 8.81],
              [21.0, 8.33],
              [24.0, 9.96],
              [8.0, 7.24],
              [8.0, 4.26],
              [22.0, 10.84],
              [8.0, 4.82],
              [12.0, 5.68]
            ],
            type: 'scatter'
          },
          {
            name: '高铬铸铁(CI)',
            symbolSize: 5,
            data: [
              [20.0, 8.04],
              [8.0, 6.95],
              [23.0, 7.58],
              [3.0, 8.81],
              [21.0, 8.33],
              [24.0, 9.96],
              [8.0, 7.24],
              [8.0, 4.26],
              [22.0, 10.84],
              [8.0, 4.82],
              [12.0, 5.68]
            ],
            type: 'scatter'
          },
          {
            name: '无限冷硬(ICDP)',
            symbolSize: 5,
            data: [
              [20.0, 8.04],
              [8.0, 6.95],
              [23.0, 7.58],
              [3.0, 8.81],
              [21.0, 8.33],
              [24.0, 9.96],
              [8.0, 7.24],
              [8.0, 4.26],
              [22.0, 10.84],
              [8.0, 4.82],
              [12.0, 5.68]
            ],
            type: 'scatter'
          },
          {
            name: '合金半钢(SS)',
            symbolSize: 5,
            data: [
              [20.0, 8.04],
              [8.0, 6.95],
              [23.0, 7.58],
              [3.0, 8.81],
              [21.0, 8.33],
              [24.0, 9.96],
              [8.0, 7.24],
              [8.0, 4.26],
              [22.0, 10.84],
              [8.0, 4.82],
              [12.0, 5.68]
            ],
            type: 'scatter'
          },
          {
            name: '合金铸钢(EC)',
            symbolSize: 5,
            data: [
              [20.0, 8.04],
              [8.0, 6.95],
              [23.0, 7.58],
              [3.0, 8.81],
              [21.0, 8.33],
              [24.0, 9.96],
              [8.0, 7.24],
              [8.0, 4.26],
              [22.0, 10.84],
              [8.0, 4.82],
              [12.0, 5.68]
            ],
            type: 'scatter'
          },
          {
            name: '合金铸钢(EC)',
            symbolSize: 5,
            data: [
              [20.0, 8.04],
              [8.0, 6.95],
              [23.0, 7.58],
              [3.0, 8.81],
              [21.0, 8.33],
              [24.0, 9.96],
              [8.0, 7.24],
              [8.0, 4.26],
              [22.0, 10.84],
              [8.0, 4.82],
              [12.0, 5.68]
            ],
            type: 'scatter'
          },
          {
            name: '高速钢(HSS)',
            symbolSize: 5,
            data: [
              [20.0, 8.04],
              [8.0, 6.95],
              [23.0, 7.58],
              [3.0, 8.81],
              [21.0, 8.33],
              [24.0, 9.96],
              [8.0, 7.24],
              [8.0, 4.26],
              [22.0, 10.84],
              [8.0, 4.82],
              [12.0, 5.68]
            ],
            type: 'scatter'
          },
          {
            name: '高铬钢(CR)',
            symbolSize: 5,
            data: [
              [20.0, 8.04],
              [8.0, 6.95],
              [23.0, 7.58],
              [3.0, 8.81],
              [21.0, 8.33],
              [24.0, 9.96],
              [8.0, 7.24],
              [8.0, 4.26],
              [22.0, 10.84],
              [8.0, 4.82],
              [12.0, 5.68]
            ],
            type: 'scatter'
          },
          {
            name: '半高速钢(SHSS)',
            symbolSize: 5,
            data: [
              [20.0, 8.04],
              [8.0, 6.95],
              [23.0, 7.58],
              [3.0, 8.81],
              [21.0, 8.33],
              [24.0, 9.96],
              [8.0, 7.24],
              [8.0, 4.26],
              [22.0, 10.84],
              [8.0, 4.82],
              [12.0, 5.68]
            ],
            type: 'scatter'
          }
        ]
      }
      var myChart = Echarts.init(document.getElementById('chartLeft'), 'light') //将配置注入到html中定义的容器
      var myChart1 = Echarts.init(
        document.getElementById('chartRight'),
        'light'
      ) //将配置注入到html中定义的容器
      myChart.setOption(optionLeft)
      myChart1.setOption(optionRight)
      window.onresize = function() {
        myChart.resize()
        myChart1.resize()
      }
    },
    handleFactoryChange() {
      this.option_1.forEach(item => {
        if (item.key == this.formLabelAlign.factory_id) {
          this.formLabelAlign.factory = item.value
        }
      })
    },
    handleRollPositionChange() {
      this.rollPositionArray.forEach(item => {
        if (item.key == this.formLabelAlign.roll_positionid) {
          this.formLabelAlign.roll_position = item.value
        }
      })
    },
    handleMaterChange() {
      this.rollMaterialArray.forEach(item => {
        if (item.key == this.formLabelAlign.material_id) {
          this.formLabelAlign.material = item.value
        }
      })
    },
    handleFrameScopeChange() {
      this.frameFwArray.forEach(item => {
        if (item.key == this.formLabelAlign.framerangeid) {
          this.formLabelAlign.framerange = item.value
        }
      })
    },
    handleFrameNoChange() {
      this.frameNoArray.forEach(item => {
        if (item.key == this.formLabelAlign.frame_noid) {
          this.formLabelAlign.frame_no = item.value
        }
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

    //筛选条件
    checkboxChange(item, num) {
      this.$nextTick(() => {
        this.flag = false
      })
      this.flag = true
      if (num == 1) {
        if (item.checkFg == true) {
          this.arr.push(item)
        } else {
          this.arr.forEach((val, index) => {
            if (val.label === item.label) {
              this.arr.splice(index, 1)
            }
          })
        }
      } else if (num == 2) {
        item.forEach((val, index, arr) => {
          if (val.checkFg) {
            this.arr.push(val)
          }
        })
      }
    },
    //查询接口
    findAll() {
      post(rollInformation, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchInfo
      }).then(res => {
        this.tableData = res.data
        this.total = res.count
      })
    },
    resetForm() {
      this.searchInfo = {}
      this.findAll()
    },
    handleEdit(val) {
      this.formLabelAlign = {}
      this.formLabelAlign = JSON.parse(JSON.stringify(val))
      this.dialogVisible = true
    },
    handleEditState(data) {
      this.formLabelAlignChange = data
      console.log(this.formLabelAlignChange)
      this.dialogVisibleChange = true
    },
    //全选Btn
    handleCheckAllChange() {
      if (this.checkAll == true) {
        this.checkAll = true
        for (const item of this.tableColumns) {
          item.checkFg = true
          this.arr.push(item)
        }
      } else {
        this.checkAll = false
        for (const item of this.tableColumns) {
          item.checkFg = false
          this.arr.splice(item)
        }
      }
    },
    //轧辊类型-下拉框数据
    findOption() {
      post(rolltypelist, {
        dicno: 'rolltype'
      }).then(res => {
        this.options = res.data
      })
    },

    submit() {
      if (this.formLabelAlign) {
        // 编辑
        post('rollInformation/update', {
          rollInformation: this.formLabelAlign
        }).then(res => {
          if (res.status == 2000) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.findAll()
          } else {
            this.$message({
              message: '编辑失败',
              type: 'error'
            })
          }
        })
        this.dialogVisible = false
      } else {
        alert('请按照要求输入')
      }
    },
    submitChange() {
      if (this.formLabelAlignChange) {
        post('rollInformation/update', {
          rollInformation: this.formLabelAlignChange
        }).then(res => {
          if (res) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.findAll()
          }
        })
        this.dialogVisibleChange = false
      } else {
        alert('请按照要求输入')
      }
    }
  }
}
</script>

<style>
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
.right-box {
  /* height: calc(100vh - 435px);
  max-height: calc(100vh - 435px); */
  height: calc(100vh - 75px);
  max-height: calc(100vh - 75px);
  box-sizing: border-box;
  overflow-y: scroll;
}
.right-box::-webkit-scrollbar {
  display: block;
}
.right-box .el-checkbox {
  display: block;
}
.rm002table .el-table__body-wrapper {
  overflow: auto;
  height: 702px;
  /* height: 342px; */
}
</style>
