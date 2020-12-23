import { post } from '@/lib/Util'

var id = 0

export function stopGetData() {
  console.log('stop get data invoke ...')
  clearInterval(id)
}
/**
 * getHmiData - description
 *
 * @param  {string} page       所属页面唯一标识符
 * @param  {Function} resultFunc 成功时的回调
 * @param  {Function} errorFunc  错误时的回调
 * @param  {number} f          查询频率，默认是1000ms
 * @return {type}            description
 */
export async function getHmiData(page, resultFunc, errorFunc, f) {
  clearInterval(id)
  let tags = getVariablesByPage(page)
  var resultData = {}
  id = setInterval(async () => {
    const result = await post('/webservice/getHmiData.hmi', tags)
    // const { result, err } = await post('/webservice/getHmiData.hmi', tags)
    // console.log('getHmiData', result)
    // 异常处理
    if (result.code > 0) errorFunc(result.extraMsg)
    else {
      // 更新查询到的数据到tags
      fixResult(tags, result.data, page)
      // 把array转成object
      getResultValue(tags, resultData)
      // 回调
      resultFunc(resultData)
      // resultFunc(tags)
    }
  }, f || 10000)
}

/**
 * getVariablesByPage - 获取当前页面的查询命令 {tags:[], msgs:[]}
 *
 * @param  {type} page description
 * @return {type}      description
 */
function getVariablesByPage(page) {
  return JSON.parse(localStorage.getItem('hmi/' + page) || '{}')
}

/**
 * getTagsByPage - 获取当前页面的标签查询命令
 *
 * @param  {type} page description
 * @return {type}      description
 */
function getTagsByPage(page) {
  return JSON.parse(localStorage.getItem('hmi/' + page) || '{}').tags || []
}

/**
 * getMsgsByPage - 获取当前页面的消息查询命令
 *
 * @param  {type} page description
 * @return {type}      description
 */
function getMsgsByPage(page) {
  return JSON.parse(localStorage.getItem('hmi/' + page) || '{}').msgs || []
}

/**
 * getMsgByPage - 获取当前页面的某条消息
 *
 * @param  {string} page 当前页面
 * @param  {string} msgId 消息Id
 * @return {type}      description
 */
function getMsgByPage(page, msgId) {
  const msgs = getMsgsByPage(page)
  if (!msgs || msgs.length < 1) return null
  return msgs.filter(msg => {
    return msg.id == msgId
  })
}

/**
 * fixResult - 变量结果
 *
 * @param  {object} tags   请求的变量集合{tags: [], msgs: []}
 * @param  {object} result  返回的数据集合{tagList: [], msgList: []}
 * @param  {string} page   所属页面唯一标识符
 * @return {null}        description
 */
function fixResult(tags, result, page) {
  let tagsTmp = result.tagList
  let msgsTmp = result.msgList
  updateList(tags, tagsTmp, 'tags')
  updateList(tags, msgsTmp, 'msgs')
}

/**
 * updateList - 更新变量名
 *
 * @param  {object} olds {tags:[], msgs:[]}
 * @param  {array} news [{name: '', ts: 0, value: 1000, dataList}]
 * @param  {string} type "tags" || "msgs"
 * @return {null}      description
 */
function updateList(olds, news, type) {
  if (!news || news.length < 1) return
  news.map(o => {
    let exist = olds[type].some((t, index) => {
      if ((t.id || t.name) == (o.id || o.name)) {
        // 更新变量
        olds[type].splice(index, 1, o)
        // 跳出循环
        return true
      }
    })
    if (!exist) olds[type].push(o)
  })
}

/**
 * getResultValue - 把array转成object
 *
 * @param  {type} tagsInfo description
 * @param  {type} tagsData description
 * @return {type}          description
 */
export function getResultValue(tagsInfo, tagsData) {
  if (tagsInfo.tags) convertArrayToObject(tagsInfo.tags, tagsData)
  if (tagsInfo.msgs) convertArrayToObject(tagsInfo.msgs, tagsData)
}

function convertArrayToObject(array, object) {
  array.some(o => {
    console.log('detail info')
    if (o.dataList) object[o.name || o.id] = o.dataList
    else object[o.name || o.id] = o.value
  })
}

/**
 * sendMessage - 发送消息到服务器
 *
 * @param  {type} page 当前页面唯一标识
 * @param  {type} data [{id: '', data: [{}]}]
 * @return {type}      description
 */
export async function sendMessage(page, data) {
  // 获取当前页面的tags变量和msgs变量
  if (!data || data.length < 1) return
  var reqData = []
  data.forEach(d1 => {
    // 查找到消息体
    let msgs = getMsgByPage(page, d1.id)
    if (msgs && msgs.length > 0) {
      var msg = msgs[0]
      msg.data = d1.data //更新 msg的请求数据
      reqData.push(msg)
    }
  })
  const result = await post('/webservice/sendMessage.hmi', { msgList: reqData })
  console.log('send message result', result)
}

/**
 * sendMessage - 发送消息到服务器
 *
 * @param  {type} page 当前页面唯一标识
 * @param  {type} data [{id: '', data: [{}]}]
 * @return {type}      description
 */
export async function sendTag(data) {
  // 获取当前页面的tags变量和msgs变量
  if (!data || data.length < 1) return
  const result = await post('/webservice/sendTag.hmi', { tagList: data })
  console.log('send message result', result)
}
