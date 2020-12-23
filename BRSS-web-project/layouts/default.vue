<template>
  <div class="brss-app">
    <el-container>
      <el-header class="brss-header">
        <!-- <div
          class="iem-logo"
          @click="backIndex">
          <i class="logo"/><span
            class="iem-title">GQMT</span>
        </div>-->
        <div
          class="iem-logo"
          @click="backIndex">
          <!-- <i class="logo"/> -->

          <img
            style="margin-left: 20px"
            class="logo"
            src="../assets/img/GQMTv2.1.png">
          <span
            class="iem-title">GQMT</span>
            <!-- <img
            class="logo"
            src="../assets/img/nercar_v2.png">-->
        </div>
        <div
          class="right-header"
          style="flex: 1">
          <el-row
            style="width:100%">
            <el-col
              :span="12">
              <el-row
                type="flex"
                justify="start"
                align="middle">
                <el-col :span="2">
                  <span class="l">
                    <i
                      class="el-icon-s-fold user-info-right"
                      @click="handleMenuChange"/>
                  </span>
                </el-col>
                <el-col>
                  <tasily-bread
                    :list="breadcrumblist"
                    @next-index="handleIndex"/>
                </el-col>
              </el-row>
            </el-col>
            <el-col
              :span="12">
              <span class="btn user-icon">
                <i
                  class="el-icon-s-fold ipad-menu-show header-icon"
                  @click.stop="handleMenuShow"/>
                <full-screen class="header-icon" />
                <i class="el-icon-user"/>
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <i
                      style=" color: white;"
                      class="el-icon-arrow-down el-icon--right"/>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item >
                      <el-button
                        type="text"
                        @click="open">修改密码</el-button></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <span style="margin: 0 5px">{{ sname }}欢迎登录</span>
                <i
                  class="el-icon-switch-button closeWEB"
                  @click="handleClose"/>
              </span>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <!--tat-->
      <div class="space-layout">
        <el-aside
          :width="isCollapse ? '60px' : '200px'"
          :class="[{ 'ipad-menu': ipadMenuShow}, 'left-aside' ]">
          <el-menu
            :collapse="isCollapse"
            default-active="this.$route.path"
            background-color="#152a61"
            active-text-color="#409eff"
            text-color="#eae8c5"
            router
            @select="handleMenuSelect" >
            <el-submenu
              v-for="item in navs"
              :key="item.indocno"
              :index="String(item.menu_url)">
              <template slot="title">
                <i :class="item.menu_icon"/>
                <span slot="title">{{ item.menu_name }}</span>
              </template>
              <div
                v-for="(itemChildren, indexs) in item.child"
                :key="indexs">
                <el-submenu
                  v-if="itemChildren.child.length != 0"
                  :index="String(itemChildren.menu_url)">
                  <template slot="title">{{ itemChildren.menu_name }}</template>
                  <el-menu-item
                    v-for="(childGrandson, indexss) in itemChildren.child"
                    :key="indexss"
                    :index="childGrandson.menu_url"
                    @click="handleclick">{{ childGrandson.menu_name }}</el-menu-item>
                </el-submenu>
                <el-menu-item
                  v-else
                  :index="String(itemChildren.menu_url)">{{ itemChildren.menu_name }}</el-menu-item>
              </div>
            </el-submenu>
          </el-menu>
        </el-aside>
        <div class="brss-main">
          <nuxt />
        </div>
      </div>
    </el-container>
    <!-- 修改密码 -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="密码修改"
      class="layout-dialog"
      width="20%">
      <div class="layout-search">
        <el-form
          ref="addForm"
          :model="formLabelAlign"
          label-position="top">
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item
                label="新密码"
                prop="pass_1">
                <el-input v-model="formLabelAlign.pass_1" />
              </el-form-item>
              <el-form-item
                label="确认密码"
                prop="pass_2">
                <el-input v-model="formLabelAlign.pass_2" />
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
          size="mini"
          @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserInfo,
  getPageButtonPower,
  getPagePower,
  pageButtonPowers
} from '@/lib/AdminURL'
import { get, post } from '@/lib/Util'
import fullScreen from '@/components/Fullscreen'
import tasilyBread from '@/components/tasilyBread'

export default {
  head() {
    return {
      title: '广青磨辊间',
      meta: [
        {
          name: 'keywords',
          content: '广青磨辊间'
        }
      ]
    }
  },
  components: {
    tasilyBread,
    fullScreen
  },
  data() {
    return {
      userId: '',
      formLabelAlign: {
        pass_1: '',
        pass_2: ''
      },
      dialogVisible: false,
      logoImg: require('../assets/img/logo_header.jpg'),
      testPP: '点击',
      testFilterText: '头部',
      pagePower: '',
      userInfo: '',
      pageButtonPower: '',
      subData: {},
      params: '',
      navFlag: true,
      isCollapse: false,
      navs: [],
      sname: '', // 用户名
      ipadMenuShow: false,
      breadcrumblist: []
    }
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem('userInfo'))
    this.navs = JSON.parse(localStorage.getItem('menus'))
    if (this.$route.path !== '/board') {
      if (!user) {
        this.$router.push({ path: '/login' })
      } else {
        this.sname = user.sname
      }
    }

    let bread = JSON.parse(sessionStorage.getItem('bread'))
    if (bread) {
      this.breadcrumblist = bread
    } else {
      this.breadcrumblist = []
    }
  },
  methods: {
    /* open() {
      this.$prompt('请输入邮箱', '修改密码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      })
        .then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },*/
    submit() {
      // value.replace(/[^\w\.\/]/gi, '')
      var reg = /^[0-9a-zA-Z]+$/
      if (
        !reg.test(this.formLabelAlign.pass_2) ||
        !reg.test(this.formLabelAlign.pass_1)
      ) {
        //不满足为数字或者字母
        this.formLabelAlign = {
          pass_1: '',
          pass_2: ''
        }
        this.$message({
          showClose: true,
          message: '密码只能为数字或字母，重新输入',
          type: 'error'
        })
      } else {
        //满足数字或字母
        if (
          this.formLabelAlign.pass_1 != '' &&
          this.formLabelAlign.pass_2 != '' &&
          this.formLabelAlign.pass_1 == this.formLabelAlign.pass_2
        ) {
          post('/sysUser/updatePassword', {
            userId: this.userId,
            password: this.formLabelAlign.pass_1
          }).then(res => {
            if (res) {
              this.dialogVisible = false
              this.$message({
                showClose: true,
                message: '密码成功修改',
                type: 'success'
              })
            }
          })
        } else {
          this.formLabelAlign = {
            pass_1: '',
            pass_2: ''
          }
          this.$message({
            showClose: true,
            message: '前后密码不一致，重新输入',
            type: 'error'
          })
        }
      }
    },
    open() {
      this.formLabelAlign = {
        pass_1: '',
        pass_2: ''
      }
      this.dialogVisible = true
      var roles = JSON.parse(localStorage.getItem('userInfo'))
      this.userId = roles.indocno
      console.log(this.userId, roles)
    },
    backIndex() {
      this.$router.push({ path: '/' })
    },
    //页面跳转
    pageG: function(pagename, ind) {
      this.$router.push({ path: pagename })
    },
    async getUserInfo() {
      this.userInfo = await post(getUserInfo, this.params)
    },
    async getPageButtonPower() {
      this.pageButtonPower = await post(getPageButtonPower, this.params)
      localStorage.setItem(
        'pageButtonPower',
        JSON.stringify(this.pageButtonPower)
      )
    },
    async getPagePower() {
      this.pagePower = await post(getPagePower, this.params)
      this.pagePower.result.length != 0
        ? (this.navFlag = true)
        : (this.navFlag = false)
    },
    getUrlInfo: vm => {
      if (vm.$route.query.userId == undefined) return
      vm.params = {
        userId: vm.$route.query.userId,
        loginName: vm.$route.query.loginName,
        p: vm.$route.query.p
      }
    },
    testClick: function() {
      this.$router.push({
        path: 'demo/demo'
      })
    },
    handleMenuChange() {
      this.isCollapse = !this.isCollapse
    },
    handleClose() {
      this.$confirm('是否关闭?', '关闭', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          localStorage.clear()
          sessionStorage.removeItem('bread')
          this.$router.push({ path: '/login' })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消关闭'
          })
        })
    },
    // ipad 右边侧菜单
    handleMenuShow() {
      this.ipadMenuShow = !this.ipadMenuShow
    },
    Listen() {
      document.removeEventListener('click', this.Listen)
      this.ipadMenuShow = !this.ipadMenuShow
    },
    handleclick() {
      document.addEventListener('click', this.Listen)
    },
    handleMenuSelect(index, indexPath) {
      var data = []
      for (let i = 0; i < indexPath.length; i++) {
        for (let j = 0; j < this.navs.length; j++) {
          if (this.navs[j].menu_url == indexPath[i]) {
            data.push(this.navs[j])
          } else {
            for (let n = 0; n < this.navs[j].child.length; n++) {
              if (this.navs[j].child[n].menu_url == indexPath[i]) {
                data.push(this.navs[j].child[n])
              } else {
                for (let s = 0; s < this.navs[j].child[n].child.length; s++) {
                  if (this.navs[j].child[n].child[s].menu_url == indexPath[i]) {
                    data.push(this.navs[j].child[n].child[s])
                  }
                }
              }
            }
          }
        }
      }
      this.breadcrumblist = data
      sessionStorage.setItem('bread', JSON.stringify(this.breadcrumblist))
    },
    handleIndex(val) {
      this.breadcrumblist = []
      sessionStorage.setItem('bread', JSON.stringify(this.breadcrumblist))
    }
  }
}
</script>

<style lang="less">
@import './../assets/css/baseStyle.less';
.brss-app {
  width: 100vw;
  height: 100vh;
  color: @layout-font-color;
  .el-container {
    height: 100vh;
  }
}
.header-icon {
  margin: 0 10px;
}
@media screen and (min-width: 1200px) {
  .brss-header {
    height: @layout-header-height !important;
    padding: 0 5px !important;
    box-sizing: border-box !important;
    background-color: @layout-header-background-color !important;
    box-shadow: 200px 5px 5px #00164f;
    z-index: 5px;
    display: flex;
    align-items: center;
    position: relative;
    .iem-logo {
      width: @layout-header-logo-width;
      height: @layout-header-logo-height;
      display: flex;
      cursor: pointer;
      margin-right: 20px;
      align-items: center;
      .logo {
        display: inline-block;
        width: 60px;
        height: @layout-header-logo-height;
        // background: url('../assets/img/header2x.png') no-repeat -595px 1px;
      }
      .iem-title {
        font-weight: 800;
        font-size: @layout-f-fint-size;
      }
    }
    .right-header {
      height: @layout-header-height !important;
      display: flex;
      align-items: center;
      height: 30px;
      line-height: 30px;
      .user-icon i {
        line-height: 30px;
      }
      .ipad-menu-show {
        display: none;
      }
    }
  }
  .left-aside {
    height: calc(100vh - @layout-header-height);
    background-color: #152a61;
    transition: all 1s;
  }
  .left-aside .el-menu {
    border-right: none;
    .el-submenu .el-submenu__title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .left-aside::-webkit-scrollbar,
  .brss-main::-webkit-scrollbar {
    display: none;
  }
  .brss-main {
    padding: 10px;
    height: auto;
    height: calc(100vh - @layout-header-height);
    overflow-y: scroll;
    width: 100%;
    box-sizing: border-box;
    background-color: @layout-f-background-color;
  }
  .search-ipad {
    display: none;
  }
}

@media screen and (max-width: 1200px) {
  .brss-header {
    height: @layout-header-height !important;
    padding: 0 5px !important;
    box-sizing: border-box !important;
    background-color: @layout-header-background-color !important;
    display: flex;
    .iem-logo {
      width: @layout-header-logo-width;
      height: @layout-header-logo-height;
      display: flex;
      margin-right: 20px;
      align-items: center;
      .logo {
        display: inline-block;
        width: 60px;
        height: @layout-header-logo-height;
        // background: url('../assets/img/header2x.png') no-repeat -595px 1px;
      }
      .iem-title {
        font-weight: 800;
        font-size: @layout-f-fint-size;
      }
    }
    .right-header {
      height: @layout-header-height !important;
      display: flex;
      align-items: center;
      height: 30px;
      line-height: 30px;
      .user-icon i {
        line-height: 30px;
      }
      .user-info-right {
        display: none;
      }
      .ipad-menu-show {
        display: block;
      }
      .ipad-menu-show i {
        font-size: 25px;
      }
    }
  }
  .left-aside {
    display: none;
  }
  .ipad-menu {
    display: block;
    position: fixed;
    right: 10px;
    top: 40px;
    z-index: 10;
    max-height: 400px;
    overflow-y: scroll;
    border-radius: 10px;
    -moz-box-shadow: 0px 1px 9px #152a61;
    -webkit-box-shadow: 0px 1px 9px #152a61;
    box-shadow: 0px 1px 9px #152a61;
  }
  .left-aside .el-menu {
    border-right: none;
    .el-submenu .el-submenu__title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .left-aside::-webkit-scrollbar,
  .brss-main::-webkit-scrollbar {
    display: none;
  }
  .brss-main {
    padding: 5px;
    height: auto;
    height: calc(100vh - @layout-header-height);
    overflow-y: scroll;
    width: 100%;
    box-sizing: border-box;
    background-color: @layout-f-background-color;
  }
  .search-ipad {
    display: block;
    height: 28px;
    line-height: 28px;
    margin-right: 20px;
  }
}

.closeWEB:hover {
  color: @layout-hover-text-color;
}
</style>
