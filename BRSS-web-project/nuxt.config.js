/*
 * @Author: your name
 * @Date: 2020-08-28 13:59:10
 * @LastEditTime: 2020-11-04 09:15:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\nuxt.config.js
 */
const pkg = require('./package')

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
      },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/icon/iconfont.css',
    '@/assets/css/publicStyle.less',
    '@/assets/css/reset.css',
    '@/assets/css/baseStyle.less',
    '@/assets/css/ipadStyle.less'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/directive',
    '@/plugins/api',
    '@/plugins/axios',
    '@/plugins/filters',
    '@/plugins/i18n',
    '@/plugins/pdf_ts',
    { src: '~/plugins/persistedstate.js', ssr: false },
    { src: '~/plugins/G6.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  server: {
    port: 8778, // default: 3000
    host: '0.0.0.0' // default: localhost,
  },
  /*
  ** Axios module configuration
  */
  env: {
    device: 'web'
  },
  axios: {
    baseURL: 'http://169.254.100.101:8080/system_roll/',
    // baseURL: 'http://170.0.41.202:8089/',
    // baseURL: 'http://170.0.41.202:8089/',
    timeout: 60000,
    retry: { retries: 3 },
    proxy: true
  },
  proxy: {
    '/api': {
      //target: 'http://170.0.41.202:8089/', //超
      // target: 'http://172.20.10.3:8089/', // 涛
      // target: 'http://170.0.41.202:8089/',
      // target: 'http://170.0.41.205:8080/system_roll/', // test 本地以太网ip，端口为tomcat
      //target: 'http://170.0.41.205:8089/', // test 本地后台
      //target: 'http://170.0.40.131:8080/system_roll/', //服务工匠
      //target: 'http://170.0.40.131:8090/',
      // target: 'http://170.0.31.213:8089/', //英
      // target: 'http://170.0.31.42:8089/',
      //target: 'http://169.254.100.242:8089/', // test 阳江本地后台
      target: 'http://169.254.100.101:8080/system_roll/', // test 阳江以太网ip，端口为tomcat
      pathRewrite: { '^/api': '' }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
