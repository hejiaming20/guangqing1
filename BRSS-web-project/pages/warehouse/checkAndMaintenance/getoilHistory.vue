<!--
 * @Author: your name
 * @Date: 2020-07-28 09:48:28
 * @LastEditTime: 2020-10-16 20:01:51
 * @LastEditors: Please set LastEditors
 * @Description: 设备给油脂历史查询
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\getoilHistory.vue
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
              class="search-info"
              label-width="80px">
              <el-row>
                <el-col :span="7">
                  <el-form-item
                    label="操作人:"
                    prop="roll_mo">
                    <el-input v-model="searchInfo.roll_mo" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item
                    label="操作时间:"
                    prop="roll_mo">
                    <el-date-picker
                      v-model="searchInfo.roll_mo"
                      type="date"
                      value-format="yyyy-MM-DD"
                      placeholder="选择日期"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
          <el-col :span="7">
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
          label="给油时间"
          prop="name"/>
        <el-table-column label="操作人"/>
        <el-table-column label="是否给油完成"/>
        <el-table-column label="备注"/>
        <el-table-column
          label="操作"
          min-width="150"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success">查看</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="handleEdit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </template>
    </Table-easy>

    <!-- 查看/修改设备给油脂记录 -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="设备给油脂记录查看"
      width="50%">

      <el-form
        ref="saveForm"
        :model="dialogData.formData"
        class="search-info"
        label-width="80px">
        <el-row>
          <el-col :span="5">
            <div class="local">操作人：li</div>
          </el-col>
          <el-col :span="5">
            <div class="local">操作时间：2001-01-01</div>
          </el-col>
        </el-row>
        <div class="you-find-one">
          <p>工作辊拆装机(已完成)</p>
          <div class="you-find-two">
            <p>小车(已完成)</p>
            <div class="you-find-three">
              <p>电机减速箱(已完成)</p>
              <p>导轮轴承(已完成)</p>
              <p>纵向缸耳轴(已完成)</p>
              <p>轮轴(已完成)</p>
            </div>
          </div>
        </div>
      </el-form>

      <span
        slot="footer"
        class="dialog-footer">
        <el-button 
          size="small"
          type="primary"
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
      dialogVisible: false,
      dialogData: {
        formData: {
          type: []
        }
      }
    }
  },
  methods: {
    findAll() {},
    resetForm() {},
    handleEdit(val) {
      console.log(val)
      this.dialogVisible = true
    }
  }
}
</script>

<style>
.you-find-one {
  font-size: 16px;
  margin-bottom: 20px;
}
.you-find-one p {
  margin-bottom: 5px;
}
.you-find-two {
  font-size: 14px;
  padding-left: 10px;
}
.you-find-three {
  font-size: 12px;
  padding-left: 10px;
}
</style>
