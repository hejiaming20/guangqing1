import Vue from 'vue'
Vue.filter('testFilter', (data, p1, p2) => {
  return data + 'filter'
})
