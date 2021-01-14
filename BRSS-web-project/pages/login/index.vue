<!--
 * @Author: CRM 登录
 * @Date: 2020-08-28 14:15:22
 * @LastEditTime: 2020-11-29 10:05:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\pages\inforConTrolSys\Bearmanagement\CS002.vue
-->
<template>
  <div class="main-content">
    <div
      v-loading="loading"
      v-if="flag"
      :element-loading-text="loadText"
      class="main-content"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    />
    <div
      v-if="!flag"
      class="layout-search loginSide">
      <div class="loginForm">
        <el-form
          ref="ruleForm"
          :rules="rules"
          :model="loginInfo"
          label-width="80px">
          <el-form-item
            label="用户名"
            prop="account">
            <el-input
              v-model="loginInfo.account"
              placeholder="请输入用户名"/>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password">
            <el-input
              v-model="loginInfo.password"
              placeholder="请输入密码"
              show-password/>
          </el-form-item>
        </el-form>
        <el-button
          class="btnLog"
          size="mini"
          type="primary"
          @click="login('ruleForm')">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import TableEasy from '@/components/TasilyTableEasy'
import { get, post } from '@/lib/Util'
export default {
  layout: 'logoLayout',
  components: {
    TableEasy
  },
  head() {
    return {
      title: '登录--广青磨辊间',
      meta: [
        {
          name: 'keywords',
          content: '广青磨辊间'
        }
      ]
    }
  },
  data() {
    return {
      loginInfo: {
        account: '',
        password: '' //123456
      }, // 登录信息
      rules: {
        account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loadText: '登录中',
      flag: true,
      loading: true
    }
  },
  beforeCreate() {
    this.flag = true
    this.loading = true
  },
  mounted() {
    if (this.$route.query.account) {
      if (this.$route.query.account !== '') {
        this.flag = true
        this.loading = true
        post('doLoginSingle', { account: this.$route.query.account }).then(
          res => {
            if (res.status === 2000) {
              this.saveMsg(res.data)
            } else {
              this.loadText = '账号有误'
              this.$message(res.msg + '，请联系磨辊间管理员')
            }
          }
        )
      }
    } else {
      this.flag = false
      this.loading = false
    }
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          post('doLoginAll', this.loginInfo).then(res => {
            console.log('登录信息====', res)
            if (res.status == 2000) {
              //获取系统数据为rm004所用
              var limits = res.data.roles
              localStorage.setItem('storeID', JSON.stringify(limits))
              this.$message({
                type: 'success',
                message: '登录成功!'
              })
              this.saveMsg(res.data)
            } else {
              this.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    saveMsg(res) {
      this.$store.commit('setUserInfo', res.user)
      localStorage.setItem('userInfo', JSON.stringify(res.user))
      localStorage.setItem('menus', JSON.stringify(res.menus))
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
.layout-search {
  background: none;
}
.login-tooltip {
  color: #eeeeee;
  position: absolute;
  top: 50px;
  left: 50%;
  font-size: 20px;
  z-index: 2005;
}
.loginSide {
  box-shadow: 0 2px 12px 0 rgb(42 41 225 / 69%);
  width: 577px;
  height: 294px;
  margin-top: 28px;
  background: #162d63;
  margin: 0 auto;
  position: relative;
  top: 130px;
}
.loginForm {
  width: 250px;
  margin: auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.btnLog {
  width: 180px;
  margin-left: 50px;
}
</style>
