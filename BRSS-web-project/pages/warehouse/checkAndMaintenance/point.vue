<!--
 * @Author: your name
 * @Date: 2020-07-23 15:25:24
 * @LastEditTime: 2020-10-16 20:16:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\point.vue
-->
<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :total="total"
      :table-height="'calc(100vh - 210px)'"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange">
      <!-- 头页面 -->
      <template slot="TableHead">
        <el-row>
          <el-col :span="18">
            <el-form
              ref="ruleForm"
              :model="searchCondition"
              class="search-info"
              label-width="80px">
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="设备名称"
                    prop="device_name_condition">
                    <el-input v-model="searchCondition.device_name_condition" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="点检项名称"
                    label-width="100px"
                    prop="device_part_name_condition">
                    <el-input v-model="searchCondition.device_part_name_condition" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="点检周期"
                    prop="check_interval_unit_condition">
                    <el-select
                      v-model="searchCondition.check_interval_unit_condition"
                      placeholder="请选择"
                      @change="handleSearch()">
                      <el-option
                        v-for="item in checkTypeModels"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="设备类型"
                    prop="check_role_type_condition">
                    <el-select
                      v-model="searchCondition.check_role_type_condition"
                      placeholder="请选择"
                      @change="handleSearch()">
                      <el-option
                        v-for="item in checkRollType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
          <el-col :span="6">
            <div class="btn">
              <el-button
                size="mini"
                type="primary"
                @click="handleSearch()">查询</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="resetForm('ruleForm')">重置</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="diaInsertVisible = true">新增</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
      <!-- 页面 -->
      <template slot="TableBody">
        <el-table-column
          label="设备名称"
          prop="device_name" />
        <el-table-column
          label="点检部位"
          prop="device_part_name" />
        <el-table-column
          label="点检周期"
          prop="check_interval" />
        <el-table-column
          label="点检周期单位" >
          <template slot-scope="scope">
            <p>{{ scope.row.check_interval_unit | formatCheckUnit }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="点检内容"
          width="170px"
          show-overflow-tooltip
          prop="check_content" />
        <el-table-column
          label="点检状态" >
          <template slot-scope="scope">
            <p>{{ scope.row.check_state | formatCheckState }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="点检类型" >
          <template slot-scope="scope">
            <p>{{ scope.row.check_role_type | formatCheckRoleType }}</p>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="点检标准"
          prop="check_standard" />
        <el-table-column
          label="操作"
          min-width="150"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="handleEdit(scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>

    </Table-easy>
    <!-- 新增设备 -->
    <el-dialog
      :visible.sync="diaInsertVisible"
      title="新增点检项"
      class="layout-dialog"
      width="60%">
      <div class="layout-search">
        <el-form
          ref="submitForm"
          :model="newTableData"
          label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="设备名称:"
                label-width="100px"
                prop="roll_mo">
                <el-select
                  v-model="deviceIndocno"
                  placeholder="请选择"
                  @change="changeDeviceInsert(deviceIndocno)">
                  <el-option
                    v-for="item in deviceList"
                    :key="item.indocno"
                    :label="item.devicename"
                    :value="item.indocno"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="点检周期:"
                label-width="100px"
                prop="roll_mo">
                <el-input v-model="newTableData.check_interval" />
              </el-form-item>
              <el-form-item
                label="点检内容:"
                label-width="100px"
                prop="roll_mo">
                <el-input v-model="newTableData.check_content" />
              </el-form-item>
              <el-form-item
                label="点检状态:"
                label-width="100px"
                prop="roll_mo">
                <el-radio
                  v-model="newTableData.check_state"
                  :label="1">运行</el-radio>
                <el-radio
                  v-model="newTableData.check_state"
                  :label="0">停止</el-radio>
                  <!-- <el-input v-model="searchInfo.roll_mo" /> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="点检部位:"
                label-width="100px"
                prop="device_part_name">
                <!-- <el-input v-model="searchInfo.roll_mo" /> -->
                <el-select
                  v-model="newTableData.check_part_id"
                  placeholder="请选择"
                  @change="handleSelectChange(newTableData.check_part_id)">
                  <el-option
                    v-for="item in checkPartList"
                    :key="item.indocno"
                    :label="item.device_part_name"
                    :value="item.indocno"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="点检周期单位:"
                label-width="100px"
                prop="roll_mo">
                <el-select
                  v-model="newTableData.check_interval_unit"
                  placeholder="请选择">
                  <el-option
                    v-for="item in checkTypeModels"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="点检标准:"
                label-width="100px"
                prop="roll_mo">
                <el-input v-model="newTableData.check_standard" />
              </el-form-item>
              <el-form-item
                label="点检类型:"
                label-width="100px"
                prop="check_role_type">
                <el-radio
                  v-model="newTableData.check_role_type"
                  :label="0"
                  disabled>电气</el-radio>
                <el-radio
                  v-model="newTableData.check_role_type"
                  :label="1"
                  disabled>机械</el-radio>
                  <!-- <el-input v-model="searchInfo.roll_mo" /> -->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          size="small"
          @click="handleInsert()">提 交</el-button>
        <el-button
          type="primary"
          size="small"
          @click="cancelInsert()">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 修改窗口  查看/修改设备 -->
    <el-dialog
      :visible.sync="disUpdateVisible"
      class="layout-dialog"
      title="修改点检项"
      width="60%">
      <div class="layout-search">
        <el-form
          ref="submitForm"
          :model="searchInfo"
          class="dialoy-form"
          label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="设备名称:"
                label-width="100px"
                prop="device_name">
                <el-select
                  v-model="searchInfo.device_name"
                  placeholder="请选择"
                  @change="changeDeviceUpdate(searchInfo.device_name)">
                  <el-option
                    v-for="item in deviceList"
                    :key="item.indocno"
                    :label="item.devicename"
                    :value="item.indocno"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="点检周期:"
                label-width="100px"
                prop="check_interval">
                <el-input v-model="searchInfo.check_interval" />
              </el-form-item>
              <el-form-item
                label="点检内容:"
                label-width="100px"
                prop="check_interval">
                <el-input v-model="searchInfo.check_content" />
              </el-form-item>
              <el-form-item
                label="点检状态:"
                label-width="100px"
                prop="check_state">
                <el-radio
                  v-model="searchInfo.check_state"
                  :label="1">运行</el-radio>
                <el-radio
                  v-model="searchInfo.check_state"
                  :label="0">停止</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="点检部位:"
                label-width="100px"
                prop="device_part_name">
                <el-select
                  v-model="searchInfo.device_part_name"
                  placeholder="请选择">
                  <el-option
                    v-for="item in checkPartList"
                    :key="item.indocno"
                    :label="item.device_part_name"
                    :value="item.indocno"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="点检周期单位:"
                label-width="100px"
                prop="check_interval_unit">
                <el-select
                  v-model="searchInfo.check_interval_unit"
                  placeholder="请选择">
                  <el-option
                    v-for="item in checkTypeModels"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="点检标准:"
                label-width="100px"
                prop="check_standard">
                <el-input v-model="searchInfo.check_standard" />
              </el-form-item>
              <el-form-item
                label="点检类型:"
                label-width="100px"
                prop="check_role_type">
                <el-radio
                  v-model="searchInfo.check_role_type"
                  :label="0"
                  disabled>电气</el-radio>
                <el-radio
                  v-model="searchInfo.check_role_type"
                  :label="1"
                  disabled>机械</el-radio>
                  <!-- <el-input v-model="searchInfo.roll_mo" /> -->
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
          @click="handleUpdate()">提 交</el-button>
        <el-button
          size="small"
          type="primary"
          @click="cancelUpdate()">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'
import {
  getAllDeviceName,
  findCheckDictByPage,
  findCheckPartsByDeviceId,
  deleteCheckDict,
  insertCheckDict,
  updateCheckDict,
  findByIndocno
} from '@/api/warehouse.js'
import { get, post } from '@/lib/Util'
export default {
  components: {
    TableEasy
  },
  filters: {
    formatCheckUnit(val) {
      return val == 'Y' ? '年' : val == 'M' ? '月' : val == 'W' ? '周' : '日'
    },
    formatCheckState(val) {
      return val == 0 ? '停机' : '运行'
    },
    formatCheckRoleType(val) {
      return val == 0 ? '电气' : '机械'
    }
  },
  data() {
    return {
      number: '',
      total: 0,
      deviceIndocno: null,
      deviceId: 0,
      pageIndex: 1,
      pageSize: 30,
      searchInfo: {},
      newTableData: {},
      searchCondition: {
        device_name_condition: '',
        device_part_name_condition: '',
        check_interval_unit_condition: '',
        check_role_type_condition: ''
      },
      deviceList: [],
      checkPartList: [],
      tableData: [],
      checkRollType: [
        {
          label: '电气',
          value: 0
        },
        {
          label: '机械',
          value: 1
        }
      ],
      checkTypeModels: [
        {
          label: '日',
          value: 'D'
        },
        {
          label: '周',
          value: 'W'
        },
        {
          label: '月',
          value: 'M'
        },
        {
          label: '年',
          value: 'Y'
        }
      ],
      diaInsertVisible: false,
      disUpdateVisible: false
    }
  },
  mounted() {
    this.findAllDevices()
    this.handleSearch()
  },
  methods: {
    handleDelete(item) {
      var res = post(deleteCheckDict, {
        // 现在当前不支持 query的形式 用body代替
        indocno: item.indocno
      })
      this.handleSearch()
    },
    cancelUpdate() {
      this.searchInfo = {}
      this.disUpdateVisible = false
    },
    cancelInsert() {
      this.diaInsertVisible = false
      this.newTableData = {}
      this.deviceIndocno = null
    },
    async handleSelectChange(item) {
      // 根据id 查找对应的dict 中的点检类型 并同步显示在页面上
      var res = await post(findByIndocno, {
        // 现在当前不支持 query的形式 用body代替
        indocno: item
      })
      this.newTableData.check_role_type = res.data.check_type
      //给该点检部位的操作工类型赋值
      console.log(
        '该新增项目中的 点检类型为：' + this.newTableData.check_role_type
      )
      this.$forceUpdate()
    },
    async changeDeviceInsert(item) {
      var res = await post(findCheckPartsByDeviceId, {
        // 现在当前不支持 query的形式 用body代替
        indocno: item
      })
      this.checkPartList = res.data
      this.newTableData.check_part_id = this.checkPartList[0].indocno
      var res = await post(findByIndocno, {
        // 现在当前不支持 query的形式 用body代替
        indocno: this.newTableData.check_part_id
      })
      this.newTableData.check_role_type = res.data.check_type
      this.$forceUpdate()
    },
    async changeDeviceUpdate(item) {
      var res = await post(findCheckPartsByDeviceId, {
        // 现在当前不支持 query的形式 用body代替
        indocno: item
      })
      this.checkPartList = res.data
      this.searchInfo.device_part_name = this.checkPartList[0].indocno
      var res = await post(findByIndocno, {
        // 现在当前不支持 query的形式 用body代替
        indocno: this.searchInfo.device_part_name
      })
      this.searchInfo.check_role_type = res.data.check_type
      this.$forceUpdate()
    },
    async findAllDevices() {
      var res = await get(getAllDeviceName, {})
      this.deviceList = res
    },
    async handleSearch() {
      var res = await post(findCheckDictByPage, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        condition: this.searchCondition
      })
      this.tableData = res.data
      this.total = res.count
    },
    async handleUpdate() {
      if (Number(this.searchInfo.device_part_name)) {
        this.searchInfo.check_part_id = this.searchInfo.device_part_name
      } else {
        this.searchInfo.check_part_id = this.number
      }
      console.log(this.searchInfo.check_part_id)
      var res = await post(updateCheckDict, {
        rollDevicescheckdict: this.searchInfo
      }) // 更新完成提示
      this.disUpdateVisible = false
      this.handleSearch()
      this.searchInfo = {}
    },
    async handleInsert() {
      var res = await post(insertCheckDict, {
        rollDevicescheckdict: this.newTableData
      }) // 更新完成提示
      this.diaInsertVisible = false
      this.handleSearch()
      this.newTableData = {}
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.handleSearch()
    },
    handleEdit(val) {
      this.number = val.check_part_id
      // console.log(val)
      this.disUpdateVisible = true
      this.searchInfo = JSON.parse(JSON.stringify(val))
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.handleSearch()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.handleSearch()
    }
  }
}
</script>
