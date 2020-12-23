/*
 * @Author: your name
 * @Date: 2020-07-22 14:55:04
 * @LastEditTime: 2020-11-13 13:42:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\plugins\axios.js
 */

export default function({ $axios, store }) {
  // request拦截器
  $axios.onRequest(config => {
    // 将获取到token加入到请求头中
    if (store.state.userInfo !== '') {
      let token = {
        userId: store.state.userInfo.indocno,
        sname: encodeURI(store.state.userInfo.sname)
      }
      token = JSON.stringify(token)
      config.headers['loginToken'] = token
    } else {
      console.log('暂无')
    }
  })
}
