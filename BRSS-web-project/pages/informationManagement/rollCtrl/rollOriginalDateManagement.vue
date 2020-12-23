<template>
  <div>
    <Table-easy :table-data="tableData">
      <template slot="TableHead">
        <el-row>
          <el-col :span="16">
            <el-form
              ref="form"
              label-width="80px">
              <el-row>
                <el-col
                  :span="18"
                  class="leftside">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="辊号">
                        <el-input/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="轧辊类型:">
                        <el-select
                          placeholder="请选择">
                          <el-option
                            label="定期检修"
                            value="shanghai"/>
                          <el-option
                            label="当班处理"
                            value="beijing"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="轧辊材质:">
                        <el-input/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="制造厂商:">
                        <el-input/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="合同号:">
                        <el-input/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="机架号:">
                        <el-input/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="制造厂商:">
                        <el-input/>
                      </el-form-item>
                    </el-col>
                  </el-row>


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
                @click="findAll()">查询</el-button>
              <el-button
                size="mini"
                @click="resetForm('ruleForm')">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
      <template slot="TableBody">
        <el-table-column
          label="辊号"
          prop="name"/>
        <el-table-column label="制造厂商"/>
        <el-table-column label="轧辊材质"/>
        <el-table-column label="轧辊类型"/>
        <el-table-column label="机架号"/>
        <el-table-column label="轧辊位置"/>
        <el-table-column label="轧辊状态"/>
        <el-table-column label="合同号"/>
        <el-table-column label="订货年"/>
        <el-table-column label="结算类型"/>
        <el-table-column label="单价"/>
        <el-table-column label="账目情况"/>
        <el-table-column label="毫米单价"/>
        <el-table-column label="订货年"/>
        <el-table-column label="出厂制品号"/>
        <el-table-column label="到货日期"/>
        <el-table-column label="到货责任人"/>
        <el-table-column label="到货辊身硬度(min~max)"/>
        <el-table-column label="到货辊径硬度(min~max)"/>
        <el-table-column label="检测报告"/>
        <el-table-column label="检测是否合格"/>
        <el-table-column label="首次检测日期"/>
        <el-table-column label="报废直径"/>
        <el-table-column label="投用日期"/>
        <el-table-column label="报废日期"/>
        <el-table-column label="报废原因"/>
        <el-table-column label="报废责任人"/>
        <el-table-column label="理论直径"/>
        <el-table-column label="剩余直径"/>
        <el-table-column label="业务范围"/>
        <el-table-column
          label="操作"
          min-width="150"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="openDialoy(scope.row)">操作</el-button>
          </template>
        </el-table-column>
      </template>
    </Table-easy>
    <!-- 库存变动记录查看 -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="库存历史记录"
      width="90%">
      <Table-easy :table-data="tableData">
        <template slot="TableHead">
          <el-row>
            <el-col :span="16">
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
            <el-col
              :span="7"
              :offset="1">
              <div class="btn">
                <el-button
                  size="mini"
                  @click="findAll()">查询</el-button>
                <el-button
                  size="mini"
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
.search-info .el-form-item {
  margin: 0;
}
</style>
