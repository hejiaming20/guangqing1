/*
 * @Author: your name
 * @Date: 2020-09-01 10:44:26
 * @LastEditTime: 2020-09-08 16:47:37
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\behavior\keyboard.js
 */
import eventBus from '@/utils/eventBus'
export default {
  getDefaultCfg() {
    return {
      backKeyCode: 8,
      deleteKeyCode: 46
    }
  },
  getEvents() {
    return {
      keyup: 'onKeyUp',
      keydown: 'onKeyDown'
    }
  },

  onKeyDown(e) {
    const code = e.keyCode || e.which
    switch (code) {
      case this.deleteKeyCode:
      case this.backKeyCode:
        // 此处需要注释否则修改文档的时候会把节点也删掉
        // eventBus.$emit('deleteItem')
        break
    }
  },
  onKeyUp() {
    this.keydown = false
  }
}
