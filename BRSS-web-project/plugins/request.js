/*
 * @Author: lcx
 * @Date: 2020-11-11 14:46:06
 * @LastEditTime: 2020-12-07 20:55:15
 * @LastEditors: Please set LastEditors
 * @Description: 封装axios
 * @FilePath: \BRSS-web-project\plugins\request.js
 */
import axios from 'axios'

axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'

axios.defaults.headers.post['Content-Type'] = 'application/json'

let service = axios.create({
  baseURL: 'http://170.0.40.131:8090/',
  timeout: 10000,
  proxy: {
    host: '170.0.40.131',
    port: 8090
  }
})

let service1 = axios.create({
  baseURL: 'http://170.0.40.131:8091/',
  timeout: 10000,
  proxy: {
    host: '170.0.40.131',
    port: 8091
  }
})

let service2 = axios.create({
  baseURL: 'http://170.0.40.131:8092/',
  timeout: 10000,
  proxy: {
    host: '170.0.40.131',
    port: 8092
  }
})

export { service, service1, service2 }
