<!--
 * @Author: your name
 * @Date: 2020-07-23 09:57:34
 * @LastEditTime: 2020-09-12 17:13:21
 * @LastEditors: Please set LastEditors
 * @Description: 辅材仓库管理页面
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\am.vue
-->
<template>
  <div>
    <Table-easy
      :table-data="tableData"
      :table-height="'calc(100vh - 210px)'">
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
                    label="物资名称"
                    prop="roll_mo">
                    <el-input v-model="searchInfo.roll_mo" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="物料编码"
                    prop="roll_mo">
                    <el-input v-model="searchInfo.roll_mo" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="使用方向"
                    prop="roll_mo">
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
        <el-table-column label="物资编码"/>
        <el-table-column label="物资名称"/>
        <el-table-column label="规格型号"/>
        <el-table-column label="物料编码"/>
        <el-table-column label="材质"/>
        <el-table-column label="计量单位"/>
        <el-table-column label="库存数量"/>
        <el-table-column label="使用方向"/>
        <el-table-column label="单价"/>
        <el-table-column label="总价"/>
        <el-table-column label="备注"/>
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
      title="库存历史记录"
      class="layout-dialog"
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
                      <el-input v-model="searchInfo.roll_mo" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      label="物资名称"
                      prop="roll_mo">
                      <el-input v-model="searchInfo.roll_mo" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      label="物料编码"
                      prop="roll_mo">
                      <el-input v-model="searchInfo.roll_mo" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      label="使用方向"
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
          <el-table-column label="物资编码"/>
          <el-table-column label="物资名称"/>
          <el-table-column label="规格型号"/>
          <el-table-column label="物料编码"/>
          <el-table-column label="材质"/>
          <el-table-column label="使用方向"/>
          <el-table-column label="库存变动单位"/>
          <el-table-column label="变动数量"/>
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
