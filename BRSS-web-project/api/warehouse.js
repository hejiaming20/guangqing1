/*
 * @Author: wyc
 * @Date: 2020-08-01 11:27:57
 * @LastEditTime: 2020-09-04 15:06:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\api\warehouse.js
 */
export const getAllDeviceName = 'rollDevicescheck/findAll' //GET 获取所有点检设备列表
export const findCheckDictByPage = 'rollDevicescheckdict/findByPage' //PSOT 点检字典页面查询
export const findCheckPartsByDeviceId = 'rollDevicescheckpart/findByDeviceId' // rollDevicescheckpart/findByDeviceId?deviceId=2 GET 查找固定设备的所有点检部位
export const deleteCheckDict = 'rollDevicescheckdict/deleteOne' // rollDevicescheckdict/deleteOne POST 字典表删除（软删除）
export const insertCheckDict = 'rollDevicescheckdict/insert' // rollDevicescheckdict/insert POST 字典表新增
export const updateCheckDict = 'rollDevicescheckdict/update' // rollDevicescheckdict/update POST 字典表更新
export const findCheckHistoryByPage = 'rollDevicecheckhistory/findByPage' // rollDevicecheckhistory/findByPage POST 点检历史表查询
export const findTreeInfoByIndocno =
  'rollDevicecheckschedule/findTreeInfoByIndocno' // POST 根据scheduleId找到对应的树形模型数据
export const findByIndocno = 'rollDevicescheckpart/findByIndocno' // POST 根据id找到对应的dict 同步更新点检类型
export const findCheckScheduleByPage = 'rollDevicecheckschedule/findByPage' // 点检计划查看
export const updateCheckSchedule = 'rollDevicecheckschedule/update' // POST 点检计划页面修改
export const exportCheckTable = 'rollDevicecheckmodel/excel/' // POST 线下点检表导出
export const updateModelItemsByModelId = 'rollDevicecheckmodel/updateItems' // 根据modelId更新 线下点检工单
export const updateCheckResultByModelId =
  'rollDevicecheckmodel/updateCheckResult' // 根据modelId更新 点检结果
export const findCheckScheduleByScheduleId =
  'rollDevicecheckschedule/findDataByScheduleId' // 根据scheduleId 找到check_model_id
export const findModelItemsByModelId = 'rollDevicecheckmodel/findByModelId/' // 根据modelId 找到点检结果清单
