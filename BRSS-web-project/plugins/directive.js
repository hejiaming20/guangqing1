import Vue from 'vue'
import uuid from 'uuid'
// import locale from 'element-ui/lib/locale/lang/en'
export default () => {
  // 注册一个全局自定义指令 `v-command`
  Vue.directive('command', {
    // 当被绑定的元素插入到 DOM 中时……
    update: function(el, binding) {
      console.log('update')
      // 聚焦元素
      console.log('command show control =========')
      var pbp = JSON.parse(localStorage.getItem('pageButtonPower') || {})
      let resources = pbp.result || []
      let compare = []
      resources.forEach((v, k) => {
        compare.push(v.resourceEname)
      })
      if (compare.indexOf(binding.value) == -1) {
        // el.style.display = 'none'
        el.remove()
      }
    }
  })

  Vue.directive('isrc', {
    // 当被绑定的元素插入到 DOM 中时……
    update: function(el, binding) {
      // 聚焦元素
      let url = $nuxt.$store.state.baseUrl + '/' + binding.value
      el.src = url
    }
  })

  // let page = 3
  function getDataPage(el) {
    console.log('prepare tag directive')
    var page = ''
    if (!el.childNodes || el.childNodes.length < 1) return el.dataset.page
    for (var i = 0; i < el.childNodes.length; i++) {
      var child = el.childNodes[i]
      if (child.childNodes && child.childNodes.length > 0) {
        var tmp = getDataPage(child)
        if (tmp && tmp.length > 1) {
          page = tmp
          break
        }
      } else {
        if (child.dataset && child.dataset.page) {
          page = child.dataset.page
          break
        }
      }
    }
    return page
  }

  Vue.directive('tag', {
    // 当被绑定的元素插入到 DOM 中时……
    bind: function(el, binding) {
      // 聚焦元素
      console.log(binding.arg + ': tag')
      // 指令所在的页面
      // var page = el.dataset.page
      var page = getDataPage(el)
      // 如果没传入页面，则视为无效的绑定
      if (!page) return
      // 是消息还是tag
      var type = binding.arg + 's'
      // 存储的当前页面的消息
      // pageItem 格式如下
      // pageItem = {tags:[{name: '', ts: 0}], msgs: [{name: '', ts: 0}]}
      var pageItem = JSON.parse(localStorage.getItem('hmi/' + page) || '{}')
      // tag名
      var tagName = binding.value
      // 如果该页面没有需要从后台取数的变量，那么直接更新
      if (!pageItem[type]) {
        if (!pageItem) pageItem = {}
        pageItem[type] = []
        var obj = {
          name: tagName,
          ts: 0
        }
        if (type == 'msgs') {
          obj.ticket = uuid().replace(new RegExp('-', 'g'), '')
          obj.id = tagName
          obj.reply = true
          obj.timeout = 0
        }
        pageItem[type][0] = obj
        localStorage.setItem('hmi/' + page, JSON.stringify(pageItem))
      } else {
        // 判断原有集合中是否已经包含变量名
        let exist = pageItem[type].some(o => {
          return o.name == tagName
        })
        // 如果已经包含了，不用加入任何信息
        if (exist) return
        // 如果没有包含，则将变量名加入列表
        else {
          var obj1 = {
            name: tagName,
            ts: 0
          }
          if (type == 'msgs') {
            obj.ticket = uuid().replace(new RegExp('-', 'g'), '')
            obj.id = tagName
            obj.reply = true
            obj.timeout = 0
          }
          pageItem[type].push(obj1)
        }
        // 更新当前页面的变量列表项
        localStorage.setItem('hmi/' + page, JSON.stringify(pageItem))
      }
    }
  })
}
