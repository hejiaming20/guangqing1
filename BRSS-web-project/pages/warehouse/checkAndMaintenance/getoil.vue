<!--
 * @Author: your name
 * @Date: 2020-07-27 15:56:47
 * @LastEditTime: 2020-10-16 20:19:26
 * @LastEditors: Please set LastEditors
 * @Description: 给油脂项管理
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\getoil.vue
-->
<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :table-height="'calc(100vh - 210px)'"
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
                <el-col :span="7">
                  <el-form-item
                    label="设备名称:"
                    prop="roll_mo">
                    <!-- <el-input v-model="searchInfo.roll_mo" /> -->
                    <el-select
                      v-model="searchInfo.roll_mo"
                      placeholder="请选择"
                      @change="findAll()">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item
                    label="装置名称:"
                    prop="roll_mo">
                    <!-- <el-input v-model="searchInfo.roll_mo" /> -->
                    <el-select
                      v-model="searchInfo.roll_mo"
                      placeholder="请选择"
                      @change="findAll()">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item
                    label="给油部位:"
                    prop="roll_mo">
                    <!-- <el-input v-model="searchInfo.roll_mo" /> -->
                    <el-select
                      v-model="searchInfo.roll_mo"
                      placeholder="请选择"
                      @change="findAll()">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"/>
                    </el-select>
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
              <el-button
                size="mini"
                type="primary"
                @click="diaInsertVisible = true">新增</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          label="设备名称"
          prop="name"/>
        <el-table-column
          label="装置名称"
          prop=""/>
        <el-table-column
          label="给油部位"
          prop=""/>
        <el-table-column
          label="油脂牌号"
          prop=""/>
        <el-table-column
          label="补充油量"
          prop=""/>
        <el-table-column
          label="更换油量"
          prop=""/>
        <el-table-column
          label="操作角色"
          prop=""/>
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
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </Table-easy>
    <!-- 新增给油项 -->
    <el-dialog
      :visible.sync="diaInsertVisible"
      title="新增给油项"
      class="layout-dialog"
      width="60%">
      <div class="layout-search">
        <el-form
          ref="saveForm"
          :model="dialogData.formData"
          class="search-info"
          label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="设备名称:"
                prop="">
                <el-select
                  v-model="dialogData.formData.roll_mo"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item label="给油部位:">
                <el-select
                  v-model="dialogData.formData.roll_mo"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="装置名称:">
                <el-select
                  v-model="dialogData.formData.roll_mo"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item label="油脂牌号:">
                <el-select
                  v-model="dialogData.formData.roll_mo"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="补充油量:">
                <el-input-number
                  v-model="dialogData.formData.roll_mo"
                  size="mini"/>
              </el-form-item>
              <el-form-item label="更换油量:">
                <el-input-number
                  v-model="dialogData.formData.roll_mo"
                  size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="补充单位:">
                <el-input v-model="dialogData.formData.roll_mo" />
              </el-form-item>
              <el-form-item label="更换单位:">
                <el-input v-model="dialogData.formData.roll_mo" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="补充周期:">
                <el-select
                  v-model="dialogData.formData.roll_mo"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item label="更换周期:">
                <el-select
                  v-model="dialogData.formData.roll_mo"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="分配角色:">
            <el-checkbox-group v-model="dialogData.formData.type">
              <el-checkbox
                label="点检员"
                name="type"/>
              <el-checkbox
                label="运行员"
                name="type"/>
              <el-checkbox
                label="操作员"
                name="type"/>
            </el-checkbox-group>
          </el-form-item>
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

    <!-- 修改给油项 -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="修改给油项"
      class="layout-dialog"
      width="60%">
      <div class="layout-search">
        <el-form
          ref="saveForm"
          :model="dialogData.formData"
          class="search-info"
          label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="设备名称:">
                <el-select
                  v-model="dialogData.formData.roll_mo"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item label="给油部位:">
                <el-select
                  v-model="dialogData.formData.roll_mo"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="装置名称:">
                <el-select
                  v-model="dialogData.formData.roll_mo"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item label="油脂牌号:">
                <el-select
                  v-model="dialogData.formData.roll_mo"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="补充油量:">
                <el-input-number
                  v-model="dialogData.formData.roll_mo"
                  size="mini"/>
              </el-form-item>
              <el-form-item label="更换油量:">
                <el-input-number
                  v-model="dialogData.formData.roll_mo"
                  size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="补充单位:">
                <el-input v-model="dialogData.formData.roll_mo" />
              </el-form-item>
              <el-form-item label="更换单位:">
                <el-input v-model="dialogData.formData.roll_mo" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="补充周期:">
                <el-select
                  v-model="dialogData.formData.roll_mo"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item label="更换周期:">
                <el-select
                  v-model="dialogData.formData.roll_mo"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="分配角色:">
            <el-checkbox-group v-model="dialogData.formData.type">
              <el-checkbox
                label="点检员"
                name="type"/>
              <el-checkbox
                label="运行员"
                name="type"/>
              <el-checkbox
                label="操作员"
                name="type"/>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>

      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          size="small"
          @click="handleUpdate()">提 交</el-button>
        <el-button
          type="primary"
          size="small"
          @click="cancelUpdate()">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TableEasy from '@/components/TasilyTableEasy'

export default {
  components: {
    TableEasy
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 30,
      searchInfo: {
        roll_mo: ''
      },
      newTableData: {},
      tableData: [{ name: 1 }],
      options: [
        {
          label: '1',
          value: 1
        }
      ],
      diaInsertVisible: false,
      dialogVisible: false,
      table: {
        roll_mo: ''
      },
      dialogData: {
        formData: {
          type: []
        }
      }
    }
  },
  mounted() {
    this.findAll()
  },
  methods: {
    // 查询按钮方法
    async findAll() {
      // var res = await post(findCheckDictByPage, {
      //   pageIndex: this.pageIndex,
      //   pageSize: this.pageSize,
      //   condition: this.searchCondition
      // })
      // this.tableData = res.data
      // this.total = res.count
    },
    // 重置按钮方法
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.findAll()
    },
    // 页面删除按钮方法
    handleDelete(item) {
      // var res = post(deleteCheckDict, {
      //   // 现在当前不支持 query的形式 用body代替
      //   indocno: item.indocno
      // })
      this.findAll()
    },
    // 页面修改按钮方法
    handleEdit(val) {
      console.log(val)
      this.dialogVisible = true
      // this.searchInfo = JSON.parse(JSON.stringify(val))
    },
    // 新增弹出框取消按钮方法
    cancelInsert() {
      this.diaInsertVisible = false
      // this.newTableData = {}
      // this.deviceIndocno = null
    },
    // 新增弹出框提交按钮方法
    async handleInsert() {
      // var res = await post(insertCheckDict, {
      //   rollDevicescheckdict: this.newTableData
      // }) // 更新完成提示
      this.diaInsertVisible = false
      // this.findAll()
      // this.newTableData = {}
    },
    // 修改弹出框提交按钮方法
    async handleUpdate() {
      // if (Number(this.searchInfo.device_part_name)) {
      //   this.searchInfo.check_part_id = this.searchInfo.device_part_name
      // } else {
      //   this.searchInfo.check_part_id = this.number
      // }
      // console.log(this.searchInfo.check_part_id)
      // var res = await post(updateCheckDict, {
      //   rollDevicescheckdict: this.searchInfo
      // }) // 更新完成提示
      this.dialogVisible = false
      this.findAll()
      // this.dialogData.formData = {}
    },
    // 修改弹出框取消按钮方法
    cancelUpdate() {
      // this.dialogData.formData = {}
      this.dialogVisible = false
    },
    // 页码改变方法
    handleCurrentChange(val) {
      this.pageIndex = val
      // this.findAll()
    },
    handleSizeChange(val) {
      this.pageSize = val
      // this.findAll()
    }
  }
}
</script>

<style>
</style>
