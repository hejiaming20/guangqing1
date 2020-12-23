export default {
  getInstance(onMessageHandler, onOpen) {
    console.log('=================================***')
    var ws = window.tsWebSocket
    if ('WebSocket' in window) {
      if (!ws) {
        if (!localStorage.getItem('user')) {
          return null
        }
        let webSocketServer = JSON.parse(localStorage.getItem('user'))
          .webSocketServer
        console.log('localStorage=======：', webSocketServer)
        // .webSocketServer
        ws = new window.WebSocket('ws://' + webSocketServer + '/websocket')
        window.tsWebSocket = ws
      }
      if (onMessageHandler) ws.onmessage = onMessageHandler
      ws.onerror = this.onerror
      ws.onopen = onOpen || this.onopen
      ws.onbeforeunload = this.onbeforeunload
      ws.onclose = this.onclose
      return ws
    } else return null
  },
  onerror(error) {
    console.log(error)
  },

  onclose() {
    console.log('close')
  },

  onbeforeunload() {
    if (window.tsWebSocket) window.tsWebSocket.close()
  },

  onopen() {
    console.log('ws is open')
    window.tsWebSocket.send('{command: "register", id: "1_web"}')
  },

  closeWebSocket() {
    if (window.tsWebSocket) {
      window.tsWebSocket.close()
      window.tsWebSocket = null
    }
  }
}
