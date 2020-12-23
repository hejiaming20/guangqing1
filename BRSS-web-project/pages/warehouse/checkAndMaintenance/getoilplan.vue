<!--
 * @Author: your name
 * @Date: 2020-07-31 16:18:41
 * @LastEditTime: 2020-10-16 20:07:07
 * @LastEditors: Please set LastEditors
 * @Description: 设备给油脂计划管理
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\warehouse\getoilplan.vue
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
                    <!-- <el-input v-model="searchInfo.roll_mo" /> -->
                    <el-date-picker
                      v-model="searchInfo.roll_mo"
                      type="date"
                      placeholder="选择日期"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
          <el-col
            :span="7">
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
          label="工单名称"
          prop="name"/>
        <el-table-column label="操作人"/>
        <el-table-column label="是否完成"/>
        <el-table-column label="备注"/>
        <el-table-column
          label="操作"
          min-width="150"
          align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini" >给油项目</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="IsGaveOil(scope.row)">是否给油</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleDataEntry(scope.row)">数据录入</el-button>
          </template>
        </el-table-column>
      </template>
    </Table-easy>

    <!-- 是否给油弹窗     -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="是否安排停机检"
      width="60%">
      <el-form
        ref="submitForm"
        :model="searchInfo"
        class="dialoy-form"
        label-width="80px">
        <el-form-item
          label="今日是否安排停机检:"
          label-width="150px"
          prop="roll_mo">
          <el-radio
            v-model="searchInfo.roll_mo"
            label="1">是</el-radio>
          <el-radio
            v-model="searchInfo.roll_mo"
            label="2">否</el-radio>
            <!-- <el-input v-model="searchInfo.roll_mo" /> -->
        </el-form-item>
        <el-form-item
          label="理由:"
          label-width="100px"
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
        <el-form-item
          label="备注说明:"
          label-width="100px"
          prop="roll_mo">
          <el-input
            v-model="searchInfo.roll_mo"
            :rows="2"
            type="textarea"/>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button 
          size="small"
          type="primary"
          @click="dialogVisible = false">确定并打印模板</el-button>
        <el-button 
          size="small"
          type="primary"
          @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 给油项目弹窗 -->
    <!-- 数据录入弹窗(设备给油脂工单) -->
    <el-dialog
      :visible.sync="dataEntryVisible"
      title="给油脂工单"
      width="60%">
      <el-form :model="dataEntryForm">
        <el-row>
          <el-col :span="5">
            <div class="local">操作人：{{ dataEntryForm.roll_mo }}</div>
          </el-col>
          <el-col :span="5">
            <div class="local">操作时间：{{ dataEntryForm.roll_mo }}</div>
          </el-col>
          <el-col :span="5"><el-button size="mini">增加给油脂项目</el-button></el-col>
        </el-row>
        <div class="you-find-one">
          <p>工作辊磨床</p>
          <div class="you-find-two">
            <p>辊颈机架</p>
            <div >
              <ul>
                <li>
                  <div class="space-layout">
                    <span>托架导轨</span>
                    <span>
                      <el-radio
                        v-model="dataEntryForm.radio"
                        label="1">已完成</el-radio>
                      <el-radio
                        v-model="dataEntryForm.radio"
                        label="2">未完成</el-radio>
                      <el-radio
                        v-model="dataEntryForm.radio"
                        label="3">本次不做</el-radio>
                    </span>
                  </div>
                </li>
              </ul>
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
          @click="dataEntryVisible = false">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="dataEntryVisible = false">确 定</el-button>
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
      },
      dataEntryVisible: false, // 数据录入的弹窗
      dataEntryForm: {}
    }
  },
  methods: {
    findAll() {},
    resetForm() {},
    handleEdit(val) {
      console.log(val)
      this.dialogVisible = true
    },
    // 是否给油事件
    IsGaveOil(val) {
      console.log(val)
      this.dialogVisible = true
    },
    handleDataEntry() {
      this.dataEntryVisible = true
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
