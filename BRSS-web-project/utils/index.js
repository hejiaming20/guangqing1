/*
 * @Author: your name
 * @Date: 2020-09-01 10:44:27
 * @LastEditTime: 2020-09-08 16:49:50
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\utils\index.js
 */
import merge from 'lodash/merge'
import pick from 'lodash/pick'
import uniqueId from 'lodash/uniqueId'
import upperFirst from 'lodash/upperFirst'

const toQueryString = obj =>
  Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&')

const addListener = (target, eventName, handler) => {
  if (typeof handler === 'function') target.on(eventName, handler)
}

const getBox = (x, y, width, height) => {
  const x1 = x + width < x ? x + width : x
  const x2 = x + width > x ? x + width : x
  const y1 = y + height < y ? y + height : y
  const y2 = y + height > y ? y + height : y
  return {
    x1,
    x2,
    y1,
    y2
  }
}

export { merge, pick, toQueryString, uniqueId, upperFirst, addListener, getBox }
