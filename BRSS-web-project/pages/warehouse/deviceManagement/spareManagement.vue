<!--
 * @Author: your name
 * @Date: 2020-07-23 15:06:06
 * @LastEditTime: 2020-09-18 10:21:17
 * @LastEditors: Please set LastEditors
 * @Description: 备件仓库管理页面
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\spareHouse.vue
-->
<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :table-height="'calc(100vh - 210px)'">
      <template slot="TableHead">
        <el-row>
          <el-col :span="16">
            <el-form
              ref="ruleForm"
              :model="searchInfo"
              label-width="80px">
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="磨辊间"
                    prop="roll_mo">
                    <!-- <el-input v-model="searchInfo.roll_mo" /> -->
                    <el-select
                      v-model="searchInfo.roll_mo"
                      placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="存放地点"
                    prop="roll_mo">
                    <!-- <el-input v-model="searchInfo.roll_mo" /> -->
                    <el-select
                      v-model="searchInfo.roll_mo"
                      placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="备件编码"
                    prop="roll_mo">
                    <el-input v-model="searchInfo.roll_mo" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="备件名称"
                    prop="roll_mo">
                    <el-input v-model="searchInfo.roll_mo" />
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
          label="磨辊间"
          prop="name"/>
        <el-table-column label="存放地点"/>
        <el-table-column label="备件编码"/>
        <el-table-column label="备件名称"/>
        <el-table-column label="图号"/>
        <el-table-column label="型号规格"/>
        <el-table-column label="费用归属"/>
        <el-table-column
          label="现库存数量"
          min-width="120"/>
        <el-table-column label="新备件"/>
        <el-table-column label="单价"/>
        <el-table-column label="总价"/>
        <el-table-column label="已修复件"/>
        <el-table-column label="修复单价"/>
        <el-table-column label="修复总价"/>
        <el-table-column 
          label="报废件数量"
          min-width="120"/>
        <el-table-column label="备注"/>
        <el-table-column label="主机名称"/>
        <el-table-column label="责任人"/>
        <el-table-column
          label="操作"
          min-width="150"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="openDialoy(scope.row)">库存变动记录查看</el-button>
          </template>
        </el-table-column>
      </template>
    </Table-easy>
    <!-- 库存变动记录查看 -->
    <el-dialog
      :visible.sync="dialogVisible"
      class="layout-dialog"
      title="库存历史记录"
      width="90%">
      <Table-easy :table-data="tableData">
        <template slot="TableHead">
          <el-row :gutter="10">
            <el-col :span="20">
              <el-form
                ref="ruleForm"
                :model="searchInfo"
                class="search-info"
                label-width="80px">
                <el-row>
                  <el-col :span="6">
                    <el-form-item
                      label="磨辊间"
                      prop="roll_mo">
                      <!-- <el-input v-model="searchInfo.roll_mo" /> -->
                      <el-select
                        v-model="searchInfo.roll_mo"
                        placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      label="存放地点"
                      prop="roll_mo">
                      <!-- <el-input v-model="searchInfo.roll_mo" /> -->
                      <el-select
                        v-model="searchInfo.roll_mo"
                        placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      label="备件编码"
                      prop="roll_mo">
                      <el-input v-model="searchInfo.roll_mo" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      label="备件名称"
                      prop="roll_mo">
                      <el-input v-model="searchInfo.roll_mo" />
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
            label="磨辊间"
            prop="name"/>
          <el-table-column label="存放地点"/>
          <el-table-column label="备件编码"/>
          <el-table-column label="备件名称"/>
          <el-table-column label="图号"/>
          <el-table-column label="型号规格"/>
          <el-table-column label="费用归属"/>
          <el-table-column
            label="现库存数量"
            min-width="120"/>
          <el-table-column label="新备件"/>
          <el-table-column label="单价"/>
          <el-table-column label="总价"/>
          <el-table-column label="已修复件"/>
          <el-table-column label="修复单价"/>
          <el-table-column label="修复总价"/>
          <el-table-column
            label="报废件数量"
            min-width="120px"/>
          <el-table-column label="责任人"/>
          <el-table-column label="主机名称"/>
          <el-table-column label="备注"/>
        </template>
      </Table-easy>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="dialogVisible = false">确 定</el-button>
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
      searchInfo: {},
      tableData: [{ name: 1 }],
      options: [
        {
          label: '1',
          value: 1
        }
      ],
      dialogVisible: false
    }
  },
  methods: {
    findAll() {},
    resetForm() {},
    openDialoy(val) {
      console.log(val)
      this.dialogVisible = true
    }
  }
}
</script>

<style>
</style>
