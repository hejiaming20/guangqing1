<!--
 * @Author: your name
 * @Date: 2020-12-03 15:11:15
 * @LastEditTime: 2020-12-10 09:38:09
 * @LastEditors: Please set LastEditors
 * @Description: 冷却工单
 * @FilePath: \BRSS-web-project\pages\Lqs\index.vue
-->
<template>
  <div>
    <div 
      class="c_table-title layout-default-margin">
      <i 
        class="el-icon-arrow-left before-page" 
        @click="beforePage"/>
      <el-button 
        style="margin-left: 20px; padding: 5px 10px"
        size="mini" 
        type="primary" 
        @click="waterClick">&nbsp;&nbsp;&nbsp;&nbsp;水冷&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
      <el-button 
        size="mini" 
        style="padding: 5px 10px"
        type="warning" 
        @click="airClick">&nbsp;&nbsp;&nbsp;&nbsp;空冷&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
      <el-button 
        size="mini" 
        style="padding: 5px 10px"
        type="danger" 
        @click="handlewancheng">完成本次冷却工单</el-button>
    </div>
    <el-table 
      ref="multipleTable" 
      :data="tableData" 
      :row-class-name="setClassName"
      @row-click="handleChangeData">
      <el-table-column
        prop="roll_no"
        label="辊号"/>
      <el-table-column
        prop="frame_no"
        label="机架号"/>
      <el-table-column
        prop="framerange"
        label="机架范围"/>
      <el-table-column
        label="制造厂商"
        prop="factory"/>
      <el-table-column
        prop="roll_type"
        label="轧辊类型"/>
      <el-table-column
        label="轧辊材质"
        prop="material"/>
      <el-table-column
        prop="loomingposition"
        label="上机位置"/>
      <el-table-column
        prop="currentdiameter"
        label="当前辊径"/>
    </el-table>
    <!-- 水冷、空冷弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :title="title"
      class="layout-dialog ipad-dialog-width"
      width="20%">
      <div class="layout-search">
        <el-form 
          :model="form" 
          label-width="120px">
          <el-form-item 
            label="冷却开始时间" 
            prop="field1">
            <el-date-picker 
              v-model="form.field1" 
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
              @focus="resetKeyboard"/>
          </el-form-item>
          <el-form-item 
            label="冷却结束时间" 
            prop="field2">
            <el-date-picker 
              v-model="form.field2" 
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期"
              @focus="resetKeyboard"/>
          </el-form-item>
          <el-form-item 
            label="氧化膜等级" 
            prop="field3">
            <el-select 
              v-model="form.field3" 
              placeholder="请选择">
              <el-option
                v-for="item in yArr"
                :key="item.key"
                :label="item.value"
                :value="item.key"/>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span 
        slot="footer" 
        class="dialog-footer">
        <el-button 
          type="primary" 
          size="small" 
          @click="handleClose">取 消</el-button>
        <el-button 
          type="primary" 
          size="small"
          @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { post, getDataConfig } from '../../lib/Util'
import moment from 'moment'
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      form: {},
      title: '',
      multipleSelection: [], // 选中的数据集
      yArr: [],
      routerParams: ''
    }
  },
  created() {
    this.routerParams = this.$route.params.roll_no
    this.findAll()
    this.findOptions()
  },
  methods: {
    // 移除移动端软键盘事件（日期时间选择器）
    resetKeyboard() {
      document.activeElement.blur()
    },
    // 查看所有数据
    async findAll() {
      let res = await post('rollInformation/pushnewByPage', {
        roll_no: this.routerParams
      })
      if (res.status == 2000) {
        this.tableData = res.data
      } else {
        this.tableData = []
      }
    },
    // 查找配置
    findOptions() {
      getDataConfig('yhm').then(res => {
        this.yArr = res
      })
    },
    // 水冷
    waterClick() {
      this.title = '水冷'
      this.dialogVisible = true
      let data = 2.5 * 60 * 60 * 1000
      let time = new Date().valueOf()
      this.$set(this.form, 'field1', moment().format('YYYY-MM-DD HH:mm:ss'))
      this.$set(
        this.form,
        'field2',
        moment(time + data).format('YYYY-MM-DD HH:mm:ss')
      )
      // this.form.field2 = moment(time + data).format('YYYY-MM-DD HH:mm:ss')
    },
    // 空冷
    airClick() {
      this.title = '空冷'
      this.dialogVisible = true
      let data = 8 * 60 * 60 * 1000
      let time = new Date().valueOf()
      this.$set(this.form, 'field1', moment().format('YYYY-MM-DD HH:mm:ss'))
      this.$set(
        this.form,
        'field2',
        moment(time + data).format('YYYY-MM-DD HH:mm:ss')
      )
    },
    submitForm() {
      var str = ''
      for (const item of this.multipleSelection) {
        str = str + ',' + item.roll_no
        item = Object.assign(item, this.form)
      }
      this.saveData()

      if (this.title == '空冷') {
        this.saveKong(str)
      }

      this.dialogVisible = false
      this.form = {}
    },
    async saveKong(val) {
      let res = await post('rollInformation/updaterevoleveAll', {
        str_indocno: val,
        indocno: '4'
      })
      if (res.status != 2000) {
        this.$message('空冷提交失败')
      }
    },
    handleClose() {
      this.dialogVisible = false
      this.form = {}
    },
    async saveData() {
      let res = await post('rollCoolorder/insertList', {
        list: this.multipleSelection
      })
      if (res.status == 2000) {
        this.$message({
          type: 'success',
          message: res.msg
        })
        for (const item of this.multipleSelection) {
          this.routerParams = this.routerParams.replace(item.roll_no, '')
        }

        this.findAll()
      } else {
        this.$message(res.msg)
      }
    },
    beforePage() {
      this.$router.push({ path: '/' })
    },
    handlewancheng() {
      var data = localStorage.getItem('key')
      if (this.tableData.length != 0) {
        this.$message('轧辊未完成')
        return
      }
      this.$confirm('确认完成吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
        .then(() => {
          post('rollPushnew/updatefinish', { indocno: data }).then(res => {
            if (res.status == 2000) {
              this.$message({
                type: 'success',
                message: res.msg
              })
            }
            this.$router.push({ path: '/' })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    setClassName({ row, rowIndex }) {
      if (this.multipleSelection.indexOf(row) != -1) {
        return 'setTable-row-class-name'
      }
    },
    handleChangeData(row, column) {
      if (this.multipleSelection.indexOf(row) != -1) {
        this.multipleSelection.splice(this.multipleSelection.indexOf(row), 1)
      } else {
        this.multipleSelection.push(row)
      }
    }
  }
}
</script>

<style>
@media screen and (max-width: 1200px) {
  .ipad-dialog-width .el-dialog {
    width: 45% !important;
  }
}
.before-page {
  cursor: pointer;
}
</style>
