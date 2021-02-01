<!--
 * @Author: your name
 * @Date: 2020-11-04 08:59:20
 * @LastEditTime: 2020-12-15 16:40:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \BRSS-web-project\pages\Board\index.vue
-->
<template>
  <div class="board-main">
    <full-screen v-show="false"/>
    <div class="board-header">
      <div class="header-time">
        <span>{{ nowTime.time }}</span>
        <span style="margin: 0 10px">{{ nowTime.day }}</span>
        <span>{{ nowTime.date }}</span>
      </div>
      <div class="board-title">
        <div class="board-titleLeft">
          <div class="left-xie"/>
        </div>
        <div class="board-titleMiddle">
          <div class="logo-title">
            <img
              :src="logoImg"
              alt="logo">
            <p>马钢四钢轧智能磨辊间</p>
          </div>
        </div>
        <div class="board-titleRight">
          <div class="right-xie"/>
        </div>
      </div>
    </div>
    <div class="styleLine"/>
    <!-- 内容模块 -->
    <div class="board-box">
      <!-- 换辊车区域 -->
      <div class="roll-car">
        <!-- 轧辊信息 -->
        <div class="roll-car-plan">
          <div class="roll-car-plan-info">
            <p class="roll-car-plan-info-title">钢卷号</p>
            <p>0000000000</p>
            <p class="roll-car-plan-info-title">计划号</p>
            <p>0000000000</p>
            <p class="roll-car-plan-info-title">钢种</p>
            <p>0000000000</p>
            <p class="roll-car-plan-info-title">规格</p>
            <p>0000000000</p>
          </div>
          <div class="roll-carInfo-item1">
            <div>
              <p class="car-info-item-paramer car-paramer-title">R1支撑辊</p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span class="roll-carInfo-value">{{ R1.zhi1.roll_no }}</span><span>{{ R1.zhi2.roll_no }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span class="roll-carInfo-value">{{ R1.zhi1.bodyDia }}</span><span>{{ R1.zhi2.bodyDia }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span class="roll-carInfo-value">{{ R1.zhi1.bear_no }}</span><span>{{ R1.zhi2.bear_no }}</span></p>
            </div>
            <div>
              <p class="car-info-item-paramer car-paramer-title">R1工作辊</p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span class="roll-carInfo-value">{{ R1.work1.roll_no }}</span><span>{{ R1.work2.roll_no }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span class="roll-carInfo-value">{{ R1.work1.bodyDia }}</span><span>{{ R1.work2.bodyDia }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span class="roll-carInfo-value">{{ R1.work1.bear_no }}</span><span>{{ R1.work2.bear_no }}</span></p>
            </div>
          </div>
          <div class="roll-carInfo-item2">
            <div>
              <p class="car-info-item-paramer car-paramer-title">R2支撑辊</p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span class="roll-carInfo-value">{{ R2.zhi1.roll_no }}</span><span>{{ R2.zhi2.roll_no }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span class="roll-carInfo-value">{{ R2.zhi1.bodyDia }}</span><span>{{ R2.zhi2.bodyDia }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span class="roll-carInfo-value">{{ R2.zhi1.bear_no }}</span><span>{{ R2.zhi2.bear_no }}</span></p>
            </div>
            <div>
              <p class="car-info-item-paramer car-paramer-title">R2工作辊</p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span class="roll-carInfo-value">{{ R2.work1.roll_no }}</span><span>{{ R2.work2.roll_no }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span class="roll-carInfo-value">{{ R2.work1.bodyDia }}</span><span>{{ R2.work2.bodyDia }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span class="roll-carInfo-value">{{ R2.work1.bear_no }}</span><span>{{ R2.work2.bear_no }}</span></p>
            </div>
          </div>
          <div class="roll-carInfo-item3">
            <div>
              <p class="car-info-item-paramer car-paramer-title">F1支撑辊</p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span class="roll-carInfo-value">{{ Fwork13.roll_no }}</span><span>{{ Fwork14.roll_no }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span class="roll-carInfo-value">{{ Fwork13.roll_no }}</span><span>{{ Fwork14.roll_no }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span class="roll-carInfo-value">{{ Fwork13.roll_no }}</span><span>{{ Fwork14.roll_no }}</span></p>
            </div>
            <div>
              <p class="car-info-item-paramer car-paramer-title">F1工作辊</p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span class="roll-carInfo-value">{{ Fwork11.roll_no }}</span><span>{{ Fwork12.roll_no }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span class="roll-carInfo-value">{{ Fwork11.bodyDia }}</span><span>{{ Fwork12.bodyDia }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span class="roll-carInfo-value">{{ Fwork11.bear_no }}</span><span>{{ Fwork12.bear_no }}</span></p>
            </div>
          </div>
          <div class="roll-carInfo-item4">
            <div>
              <p class="car-info-item-paramer car-paramer-title">F2支撑辊</p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span class="roll-carInfo-value">{{ F2.zhi1.roll_no }}</span><span>{{ F2.zhi2.roll_no }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span class="roll-carInfo-value">{{ F2.zhi1.bodyDia }}</span><span>{{ F2.zhi2.bodyDia }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span class="roll-carInfo-value">{{ F2.zhi1.bear_no }}</span><span>{{ F2.zhi2.bear_no }}</span></p>
            </div>
            <div>
              <p class="car-info-item-paramer car-paramer-title">F2工作辊</p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span class="roll-carInfo-value">{{ F2.work1.roll_no }}</span><span>{{ F2.work2.roll_no }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span class="roll-carInfo-value">{{ F2.work1.bodyDia }}</span><span>{{ F2.work2.bodyDia }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span class="roll-carInfo-value">{{ F2.work1.bear_no }}</span><span>{{ F2.work2.bear_no }}</span></p>
            </div>
          </div>
          <div class="roll-carInfo-item5">
            <div>
              <p class="car-info-item-paramer car-paramer-title">F3支撑辊</p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span class="roll-carInfo-value">{{ F3.zhi1.roll_no }}</span><span>{{ F3.zhi2.roll_no }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span class="roll-carInfo-value">{{ F3.zhi1.bodyDia }}</span><span>{{ F3.zhi2.bodyDia }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span class="roll-carInfo-value">{{ F3.zhi1.bear_no }}</span><span>{{ F3.zhi2.bear_no }}</span></p>
            </div>
            <div>
              <p class="car-info-item-paramer car-paramer-title">F3工作辊</p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span class="roll-carInfo-value">{{ F3.work1.roll_no }}</span><span>{{ F3.work2.roll_no }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span class="roll-carInfo-value">{{ F3.work1.bodyDia }}</span><span>{{ F3.work2.bodyDia }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span class="roll-carInfo-value">{{ F3.work1.bear_no }}</span><span>{{ F3.work2.bear_no }}</span></p>
            </div>
          </div>
          <div class="roll-carInfo-item6">
            <div>
              <p class="car-info-item-paramer car-paramer-title">F4支撑辊</p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span class="roll-carInfo-value">{{ F4.zhi1.roll_no }}</span><span>{{ F4.zhi2.roll_no }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span class="roll-carInfo-value">{{ F4.zhi1.bodyDia }}</span><span>{{ F4.zhi2.bodyDia }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span class="roll-carInfo-value">{{ F4.zhi1.bear_no }}</span><span>{{ F4.zhi2.bear_no }}</span></p>
            </div>
            <div>
              <p class="car-info-item-paramer car-paramer-title">F4工作辊</p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span class="roll-carInfo-value">{{ F4.work1.roll_no }}</span><span>{{ F4.work2.roll_no }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span class="roll-carInfo-value">{{ F4.work1.bodyDia }}</span><span>{{ F4.work2.bodyDia }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span class="roll-carInfo-value">{{ F4.work1.bear_no }}</span><span>{{ F4.work2.bear_no }}</span></p>
            </div>
          </div>
          <div class="roll-carInfo-item7">
            <div>
              <p class="car-info-item-paramer car-paramer-title">F5支撑辊</p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span class="roll-carInfo-value">{{ F5.zhi1.roll_no }}</span><span>{{ F5.zhi2.roll_no }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span class="roll-carInfo-value">{{ F5.zhi1.bodyDia }}</span><span>{{ F5.zhi2.bodyDia }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span class="roll-carInfo-value">{{ F5.zhi1.bear_no }}</span><span>{{ F5.zhi2.bear_no }}</span></p>
            </div>
            <div>
              <p class="car-info-item-paramer car-paramer-title">F5工作辊</p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span class="roll-carInfo-value">{{ F5.work1.roll_no }}</span><span>{{ F5.work2.roll_no }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span class="roll-carInfo-value">{{ F5.work1.bodyDia }}</span><span>{{ F5.work2.bodyDia }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span class="roll-carInfo-value">{{ F5.work1.bear_no }}</span><span>{{ F5.work2.bear_no }}</span></p>
            </div>
          </div>
          <div class="roll-carInfo-item8">
            <div>
              <p class="car-info-item-paramer car-paramer-title">F6支撑辊</p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span class="roll-carInfo-value">{{ F6.zhi1.roll_no }}</span><span>{{ F6.zhi2.roll_no }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span class="roll-carInfo-value">{{ F6.zhi1.bodyDia }}</span><span>{{ F6.zhi2.bodyDia }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span class="roll-carInfo-value">{{ F6.zhi1.bear_no }}</span><span>{{ F6.zhi2.bear_no }}</span></p>
            </div>
            <div>
              <p class="car-info-item-paramer car-paramer-title">F6工作辊</p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span class="roll-carInfo-value">{{ F6.work1.roll_no }}</span><span>{{ F6.work2.roll_no }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span class="roll-carInfo-value">{{ F6.work1.bodyDia }}</span><span>{{ F6.work2.bodyDia }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span class="roll-carInfo-value">{{ F6.work1.bear_no }}</span><span>{{ F6.work2.bear_no }}</span></p>
            </div>
          </div>
          <div class="roll-carInfo-item9">
            <div>
              <p class="car-info-item-paramer car-paramer-title">F7支撑辊</p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span class="roll-carInfo-value">{{ F7.zhi1.roll_no }}</span><span>{{ F7.zhi2.roll_no }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span class="roll-carInfo-value">{{ F7.zhi1.bodyDia }}</span><span>{{ F7.zhi2.bodyDia }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span class="roll-carInfo-value">{{ F7.zhi1.bear_no }}</span><span>{{ F7.zhi2.bear_no }}</span></p>
            </div>
            <div>
              <p class="car-info-item-paramer car-paramer-title">F7工作辊</p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span class="roll-carInfo-value">{{ F7.work1.roll_no }}</span><span>{{ F7.work2.roll_no }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span class="roll-carInfo-value">{{ F7.work1.bodyDia }}</span><span>{{ F7.work2.bodyDia }}</span></p>
              <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span class="roll-carInfo-value">{{ F7.work1.bear_no }}</span><span>{{ F7.work2.bear_no }}</span></p>
            </div>
          </div>
        </div>
        <!-- 换辊小车 -->
        <div class="car"/>
        <div class="car-info">
          <div class="car-info-item car-info-item-margin1">
            <p class="car-info-item-paramer car-paramer-title">R1换辊车</p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span>{{ car.R1.roll_no }}</span></p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span>{{ car.R1.bodyDia }}</span></p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span>{{ car.R1.bear_no }}</span></p>
          </div>
          <div class="car-info-item car-info-item-margin2">
            <p class="car-info-item-paramer car-paramer-title">R2换辊车</p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span>{{ car.R2.roll_no }}</span></p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span>{{ car.R2.bodyDia }}</span></p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span>{{ car.R2.bear_no }}</span></p>
          </div>
          <div class="car-info-item car-info-item-margin3">
            <p class="car-info-item-paramer car-paramer-title">F1换辊车</p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span>{{ car.F1.roll_no }}</span></p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span>{{ car.F1.bodyDia }}</span></p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span>{{ car.F1.bear_no }}</span></p>
          </div>
          <div class="car-info-item car-info-item-margin4">
            <p class="car-info-item-paramer car-paramer-title">F2换辊车</p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span>{{ car.F2.roll_no }}</span></p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span>{{ car.F2.bodyDia }}</span></p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span>{{ car.F2.bear_no }}</span></p>
          </div>
          <div class="car-info-item car-info-item-margin5">
            <p class="car-info-item-paramer car-paramer-title">F3换辊车</p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span>{{ car.F3.roll_no }}</span></p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span>{{ car.F3.bodyDia }}</span></p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span>{{ car.F3.bear_no }}</span></p>
          </div>
          <div class="car-info-item car-info-item-margin6">
            <p class="car-info-item-paramer car-paramer-title">F4换辊车</p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span>{{ car.F4.roll_no }}</span></p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span>{{ car.F4.bodyDia }}</span></p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span>{{ car.F4.bear_no }}</span></p>
          </div>
          <div class="car-info-item car-info-item-margin7">
            <p class="car-info-item-paramer car-paramer-title">F5换辊车</p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span>{{ car.F5.roll_no }}</span></p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span>{{ car.F5.bodyDia }}</span></p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span>{{ car.F5.bear_no }}</span></p>
          </div>
          <div class="car-info-item car-info-item-margin8">
            <p class="car-info-item-paramer car-paramer-title">F6换辊车</p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span>{{ car.F6.roll_no }}</span></p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span>{{ car.F6.bodyDia }}</span></p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span>{{ car.F6.bear_no }}</span></p>
          </div>
          <div class="car-info-item car-info-item-margin9">
            <p class="car-info-item-paramer car-paramer-title">F7换辊车</p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊号</span><span>{{ car.F7.roll_no }}</span></p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">辊径</span><span>{{ car.F7.bodyDia }}</span></p>
            <p class="car-info-item-paramer"><span class="car-paramer-title-color">座号</span><span>{{ car.F7.bear_no }}</span></p>
          </div>
        </div>
      </div>
      <!-- 下一层模块 -->
      <div class="board-info">
        <el-row
          type="flex"
          justify="space-between">
          <el-col>
            <div class="board-left">
              <!-- 最佳班组 -->
              <div class="best-classInfo">
                <div class="best-classTitle">
                  最佳班组 / {{ mochuangDate }}
                </div>
                <div class="best-calssMain">
                  <div class="best-calssMain-item"><i>{{ mochuang3.name }}</i><p>3#磨床</p></div>
                  <div class="best-calssMain-item"><i>{{ mochuang4.name }}</i><p>4#磨床</p></div>
                  <div class="best-calssMain-item"><i>{{ mochuang5.name }}</i><p>5#磨床</p></div>
                  <div class="best-calssMain-item"><i>{{ mochuang6.name }}</i><p>6#磨床</p></div>
                </div>
              </div>
              <!-- 备辊信息 -->
              <div class="pinch-rollInfo">
                <div class="best-classTitle">
                  备辊信息
                </div>
                <div class="pinch-rollMain">
                  <el-row>
                    <el-col :span="6"><div id="app1"/></el-col>
                    <el-col :span="6"><div id="app2"/></el-col>
                    <el-col :span="6"><div id="app3"/></el-col>
                    <el-col :span="6"><div id="app4"/></el-col>
                  </el-row>
                  <div class="pinch-rollMain-item">
                    <div id="app5"/>
                    <div id="app6"/>
                    <div id="app7"/>
                  </div>
                </div>
              </div>
            </div>
            <!-- 轧辊库存数 -->
            <div
              id="echartBottom"
              class="mo-bed">
              <!-- <div class="best-classTitle">
                磨床信息
              </div> -->
              <!-- <div class="mo-bedMain">
                <el-row
                  type="flex"
                  align="middle">
                  <el-col
                    v-for="item in 6"
                    :span="4"
                    :key="item">
                    <div class="mo-bedItem">
                      <p class="mo-title">1#磨床</p>
                      <el-row>
                        <el-col :span="6"><span>主轴电机</span></el-col>
                        <el-col :span="6"><span>电流  0</span></el-col>
                        <el-col :span="6"><span>扭矩  0</span></el-col>
                        <el-col :span="6"><span>转速  0</span></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6"><span>Z轴  0</span></el-col>
                        <el-col :span="6"><span>X轴  0</span></el-col>
                        <el-col :span="6"><span>U轴  0</span></el-col>
                        <el-col :span="6"><span>C轴  00</span></el-col>
                        <el-col :span="6"><span>E轴  0</span></el-col>
                        <el-col :span="6"><span>Q轴  0</span></el-col>
                        <el-col :span="6"><span>V轴  0</span></el-col>
                        <el-col :span="6"><span>Y轴  0</span></el-col>
                        <el-col :span="6"><span>A轴  0</span></el-col>
                        <el-col :span="6"><span>R轴  0</span></el-col>
                        <el-col :span="6"><span>A1轴  0</span></el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
              </div> -->
            </div>
          </el-col>
          <el-col>
            <!-- 磨床信息 -->
            <div class="roll-nos">
              <div class="best-classTitle">
                磨床信息
              </div>
              <div class="roll-nosMain">
                <!--<el-row>
                  <el-col :span="12">
                    <div class="mo-item">
                      <p class="moitem-title">1#磨床  {{ mobed1.roll_no }}</p>
                      <div class="moitem-main">
                        <img
                          :src="baseImg"
                          class="bed-img"
                          alt="磨床1"
                          title="磨床1">
                        <img
                          :src="roll"
                          alt="轧辊"
                          class="mo-roll">
                        <img
                          :src="slide1"
                          :style="'left:' + mobed1.left + 'px'"
                          class="mo-slide1"
                          alt="滑块1">
                        <img
                          :src="slide2"
                          class="mo-slide2"
                          alt="滑块2">
                        <img
                          :src="part"
                          alt="零件"
                          class="mo-part">
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="mo-item">
                      <p class="moitem-title">2#磨床  {{ mobed2.roll_no }}</p>
                      <div class="moitem-main">
                        <img
                          :src="baseImg"
                          class="bed-img"
                          alt="磨床1"
                          title="磨床1">
                        <img
                          :src="roll"
                          alt="轧辊"
                          class="mo-roll">
                        <img
                          :src="slide1"
                          :style="'left:' + mobed2.left + 'px'"
                          class="mo-slide1"
                          alt="滑块1">
                        <img
                          :src="slide2"
                          class="mo-slide2"
                          alt="滑块2">
                        <img
                          :src="part"
                          alt="零件"
                          class="mo-part">
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="mo-item">
                      <p class="moitem-title">3#磨床  {{ mobed3.roll_no }}</p>
                      <div class="moitem-main">
                        <img
                          :src="baseImg"
                          class="bed-img"
                          alt="磨床1"
                          title="磨床1">
                        <img
                          :src="roll"
                          alt="轧辊"
                          class="mo-roll">
                        <img
                          :src="slide1"
                          :style="'left:' + mobed3.left + 'px'"
                          class="mo-slide1"
                          alt="滑块1">
                        <img
                          :src="slide2"
                          class="mo-slide2"
                          alt="滑块2">
                        <img
                          :src="part"
                          alt="零件"
                          class="mo-part">
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="mo-item">
                      <p class="moitem-title">4#磨床  {{ mobed4.roll_no }}</p>
                      <div class="moitem-main">
                        <img
                          :src="baseImg"
                          class="bed-img"
                          alt="磨床1"
                          title="磨床1">
                        <img
                          :src="roll"
                          alt="轧辊"
                          class="mo-roll">
                        <img
                          :src="slide1"
                          :style="'left:' + mobed4.left + 'px'"
                          class="mo-slide1"
                          alt="滑块1">
                        <img
                          :src="slide2"
                          class="mo-slide2"
                          alt="滑块2">
                        <img
                          :src="part"
                          alt="零件"
                          class="mo-part">
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="mo-item">
                      <p class="moitem-title">5#磨床  {{ mobed5.roll_no }}</p>
                      <div class="moitem-main">
                        <img
                          :src="baseImg"
                          class="bed-img"
                          alt="磨床1"
                          title="磨床1">
                        <img
                          :src="roll"
                          alt="轧辊"
                          class="mo-roll">
                        <img
                          :src="slide1"
                          :style="'left:' + mobed5.left + 'px'"
                          class="mo-slide1"
                          alt="滑块1">
                        <img
                          :src="slide2"
                          class="mo-slide2"
                          alt="滑块2">
                        <img
                          :src="part"
                          alt="零件"
                          class="mo-part">
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="mo-item">
                      <p class="moitem-title">6#磨床  {{ mobed6.roll_no }}</p>
                      <div class="moitem-main">
                        <img
                          :src="baseImg"
                          class="bed-img"
                          alt="磨床1"
                          title="磨床1">
                        <img
                          :src="roll"
                          alt="轧辊"
                          class="mo-roll">
                        <img
                          :src="slide1"
                          :style="'left:' + mobed6.left + 'px'"
                          class="mo-slide1"
                          alt="滑块1">
                        <img
                          :src="slide2"
                          class="mo-slide2"
                          alt="滑块2">
                        <img
                          :src="part"
                          alt="零件"
                          class="mo-part">
                      </div>
                    </div>
                  </el-col>
                </el-row>-->
                1
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import fullScreen from '@/components/Fullscreen'
import Echarts from 'echarts'
import { vRollStock } from '@/api/pinClipBoard' //查询接口
import TableEasy from '@/components/TasilyTableEasy'
import moment from 'moment'
import { get, post, pythonPOST1 } from '@/lib/Util'
export default {
  layout: 'staticPage',
  components: {
    fullScreen,
    TableEasy
  },
  head() {
    return {
      title: '马钢四钢轧智能磨辊间',
      meta: [
        {
          name: 'keywords',
          content: '马钢智能制造'
        }
      ]
    }
  },
  data() {
    return {
      baseImg: require('@/assets/img/base.png'),
      slide1: require('@/assets/img/slide1.png'),
      slide2: require('@/assets/img/slide2.png'),
      roll: require('@/assets/img/roll.png'),
      part: require('@/assets/img/part.png'),
      tableData: [
        { roll_no: 'F1-F4工作辊' },
        { roll_no: 'F1-F4支撑辊' },
        { roll_no: 'F5-F7工作辊' },
        { roll_no: 'F5-F7支撑辊' },
        { roll_no: 'R1工作辊' },
        { roll_no: 'R1支撑辊' },
        { roll_no: 'R2工作辊' },
        { roll_no: 'R2支撑辊' },
        { roll_no: '平整工作辊' },
        { roll_no: '平整支撑辊' },
        { roll_no: '大立辊' },
        { roll_no: '小立辊' },
        { roll_no: 'R锤头' },
        { roll_no: '花纹辊' }
      ],
      logoImg: require('../../assets/boardImage/logo.png'),
      nowTime: {
        time: '00:00:00',
        day: '1997年01月01日',
        date: '星期一'
      },
      Fwork11: {
        roll_no: '--',
        bodyDia: '--',
        bear_no: '--'
      },
      Fwork12: {
        roll_no: '--',
        bodyDia: '--',
        bear_no: '--'
      },
      Fwork13: {
        roll_no: '--',
        bodyDia: '--',
        bear_no: '--'
      },
      Fwork14: {
        roll_no: '--',
        bodyDia: '--',
        bear_no: '--'
      },
      F2: {
        work1: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        work2: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        zhi1: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        zhi2: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        }
      },
      F3: {
        work1: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        work2: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        zhi1: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        zhi2: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        }
      },
      F4: {
        work1: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        work2: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        zhi1: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        zhi2: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        }
      },
      F5: {
        work1: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        work2: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        zhi1: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        zhi2: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        }
      },
      F6: {
        work1: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        work2: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        zhi1: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        zhi2: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        }
      },
      F7: {
        work1: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        work2: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        zhi1: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        zhi2: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        }
      },
      R1: {
        work1: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        work2: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        zhi1: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        zhi2: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        }
      },
      R2: {
        work1: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        work2: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        zhi1: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        zhi2: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        }
      },
      car: {
        R1: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        R2: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        F1: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        F2: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        F3: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        F4: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        F5: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        F6: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        },
        F7: {
          roll_no: '--',
          bodyDia: '--',
          bear_no: '--'
        }
      },
      mochuang3: {},
      mochuang4: {},
      mochuang5: {},
      mochuang6: {},
      mochuangDate: '1997年1月',
      stockOption: {
        title: {
          text: '轧辊库存',
          left: 15,
          top: 10,
          textStyle: {
            color: '#00dcff' //字体颜色
          }
        },
        color: [
          '#447efd',
          '#1e83a4',
          '#a782e1',
          '#fff065',
          '#f29b62',
          '#db6169',
          '#00ccca'
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          top: 10,
          textStyle: {
            color: '#eae8c5' //字体颜色
          },
          data: [
            '在途轧辊',
            '未拆轧辊',
            '待使用轧辊',
            '周转轧辊',
            '修复轧辊',
            '停用辊'
            // '库存量'
          ]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '23%',
          containLabel: true
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#eae8c5' //坐标线颜色
              }
            },
            axisTick: { show: false },
            data: [
              'F1-F4工作辊',
              'F5-F7工作辊',
              'F1-F7支撑辊',
              '粗轧工作辊',
              '粗轧支撑辊',
              '平整工作辊',
              '平整支撑辊',
              '大立辊',
              '小立辊',
              '锤头'
            ]
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#eae8c5' //坐标线颜色
              }
            }
          }
        ],
        series: [
          {
            name: '在途轧辊',
            type: 'bar',
            barGap: 0,
            // label: {
            //   show: true,
            //   rotate: 90,
            //   align: 'left',
            //   verticalAlign: 'middle',
            //   position: 'insideBottom',
            //   distance: 15
            // },
            data: []
          },
          {
            name: '未拆轧辊',
            type: 'bar',
            // label: {
            //   show: true,
            //   rotate: 90,
            //   align: 'left',
            //   verticalAlign: 'middle',
            //   position: 'insideBottom',
            //   distance: 15
            // },
            data: []
          },
          {
            name: '待使用轧辊',
            type: 'bar',
            // label: {
            //   show: true,
            //   rotate: 90,
            //   align: 'left',
            //   verticalAlign: 'middle',
            //   position: 'insideBottom',
            //   distance: 15
            // },
            data: []
          },
          {
            name: '周转轧辊',
            type: 'bar',
            // label: {
            //   show: true,
            //   rotate: 90,
            //   align: 'left',
            //   verticalAlign: 'middle',
            //   position: 'insideBottom',
            //   distance: 15
            // },
            data: []
          },
          {
            name: '修复轧辊',
            type: 'bar',
            // label: {
            //   show: true,
            //   rotate: 90,
            //   align: 'left',
            //   verticalAlign: 'middle',
            //   position: 'insidebottom',
            //   distance: 15
            // },
            data: []
          },
          {
            name: '停用辊',
            type: 'bar',
            // label: {
            //   show: true,
            //   rotate: 90,
            //   align: 'left',
            //   verticalAlign: 'middle',
            //   position: 'insideBottom',
            //   distance: 15
            // },
            data: []
          }
          // {
          //   name: '报废辊',
          //   type: 'bar',
          //   // label: {
          //   //   show: true,
          //   //   rotate: 90,
          //   //   align: 'left',
          //   //   verticalAlign: 'middle',
          //   //   position: 'insidetop',
          //   //   distance: 15
          //   // },
          //   data: [
          //     560,
          //     562,
          //     561,
          //     564,
          //     560,
          //     560,
          //     560,
          //     560,
          //     560,
          //     560,
          //     560,
          //     565,
          //     563
          //   ]
          // },
          // {
          //   name: '库存量',
          //   type: 'bar',
          //   // label: {
          //   //   show: true,
          //   //   rotate: 90,
          //   //   align: 'left',
          //   //   verticalAlign: 'middle',
          //   //   position: 'insideBottom',
          //   //   distance: 15
          //   // },
          //   data: []
          // }
        ]
      },
      mobed1: {
        left: 111,
        roll_no: null,
        mwidth1: 0, // 第二个滑块
        speed1: 4
      },
      mobed2: {
        left: 111,
        roll_no: null,
        speed: 4, // sudu
        mwidth: 0,
        flag: true
      },
      mobed3: {
        left: 111,
        roll_no: null,
        speed: 1, // sudu
        mwidth: 0,
        flag: true
      },
      mobed4: {
        left: 111,
        roll_no: null,
        speed: 3, // sudu
        mwidth: 0,
        flag: true
      },
      mobed5: {
        left: 111,
        roll_no: null,
        speed: 5, // sudu
        mwidth: 0,
        flag: true
      },
      mobed6: {
        left: 111,
        roll_no: null,
        speed: 6, // sudu
        mwidth: 0,
        flag: true
      },
      speed: 2, // sudu
      mwidth: 0,
      flag: true
    }
  },
  created() {
    this.findRollStock()
  },
  mounted() {
    const timer = setInterval(() => {
      this.getNowTime()
      if (this.mwidth > 40) {
        this.flag = !this.flag
        this.mwidth = 0
      }
      if (this.mobed2.mwidth > 40) {
        this.mobed2.flag = !this.mobed2.flag
        this.mobed2.mwidth = 0
      }
      if (this.mobed3.mwidth > 40) {
        this.mobed3.flag = !this.mobed3.flag
        this.mobed3.mwidth = 0
      }
      if (this.mobed4.mwidth > 40) {
        this.mobed4.flag = !this.mobed4.flag
        this.mobed4.mwidth = 0
      }
      if (this.mobed5.mwidth > 40) {
        this.mobed5.flag = !this.mobed5.flag
        this.mobed5.mwidth = 0
      }
      if (this.mobed6.mwidth > 40) {
        this.mobed6.flag = !this.mobed6.flag
        this.mobed6.mwidth = 0
      }
      this.findmo1()
      this.setmoleft()
    }, 2000)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer)
    })

    this.findOnLineRollF1() // F1
    this.getTime()
    this.findOnLineRollF2() // F2
    this.findOnLineRollF3() // F3
    this.findOnLineRollF4() // F4
    this.findOnLineRollF5() // F5
    this.findOnLineRollF6() // F6
    this.findOnLineRollF7() // F7
    this.findOnLineRollR1() // R1
    this.findOnLineRollR2() // R2
    this.findRollBei() // 备辊信息
    this.findCar() // 换辊小车
    this.findCar2()
    this.findCar3()
    this.findCar4()
    this.findCar5()
    this.findCar6()
    this.findCar7()
    this.findCar8()
    this.findCar9()
    // this.echartStockOption() //轧辊库存
    this.findTearm() // 获得最佳班组信息
    this.findmo1()
    this.findmo2()
    this.findmo3()
    this.findmo4()
    this.findmo5()
    this.findmo6()
  },
  methods: {
    // 工作/支撑辊定时器
    getTime() {
      const timer = setInterval(() => {
        this.findOnLineRollF1()
      }, 5000)
      // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer)
      })
    },
    // 轧辊库存图表
    async echartStockOption() {
      var myChart = Echarts.init(
        document.getElementById('echartBottom'),
        'light'
      ) //将配置注入到html中定义的容器
      myChart.setOption(this.stockOption)
      window.onresize = function() {
        myChart.resize()
      }
    },
    findRollStock() {
      post(vRollStock, {
        pageIndex: 1,
        pageSize: 30,
        condition: ''
      }).then(res => {
        var data = []
        res.data.forEach(item => {
          data.push(item)
        })
        this.stockOption.series[0].data[0] = res.data[9].f1tof4_work_roll
        this.stockOption.series[0].data[1] = res.data[9].f5tof7_work_roll
        this.stockOption.series[0].data[2] =
          res.data[9].f1tof4_backup_roll + res.data[9].f1tof4_backup_roll
        this.stockOption.series[0].data[3] = res.data[9].r1_r2_work_roll
        this.stockOption.series[0].data[4] = res.data[9].r1_r2_backup_roll
        this.stockOption.series[0].data[5] = res.data[9].temper_mill_work_roll
        this.stockOption.series[0].data[6] = res.data[9].temper_mill_backup_roll
        this.stockOption.series[0].data[7] = res.data[9].r_vertical_roll
        this.stockOption.series[0].data[8] = res.data[9].f_vertical_roll
        this.stockOption.series[0].data[9] = res.data[9].hammer

        this.stockOption.series[1].data[0] = res.data[8].f1tof4_work_roll
        this.stockOption.series[1].data[1] = res.data[8].f5tof7_work_roll
        this.stockOption.series[1].data[2] =
          res.data[8].f1tof4_backup_roll + res.data[8].f1tof4_backup_roll
        this.stockOption.series[1].data[3] = res.data[8].r1_r2_work_roll
        this.stockOption.series[1].data[4] = res.data[8].r1_r2_backup_roll
        this.stockOption.series[1].data[5] = res.data[8].temper_mill_work_roll
        this.stockOption.series[1].data[6] = res.data[8].temper_mill_backup_roll
        this.stockOption.series[1].data[7] = res.data[8].r_vertical_roll
        this.stockOption.series[1].data[8] = res.data[8].f_vertical_roll
        this.stockOption.series[1].data[9] = res.data[8].hammer

        this.stockOption.series[2].data[0] = res.data[7].f1tof4_work_roll
        this.stockOption.series[2].data[1] = res.data[7].f5tof7_work_roll
        this.stockOption.series[2].data[2] =
          res.data[7].f1tof4_backup_roll + res.data[7].f1tof4_backup_roll
        this.stockOption.series[2].data[3] = res.data[7].r1_r2_work_roll
        this.stockOption.series[2].data[4] = res.data[7].r1_r2_backup_roll
        this.stockOption.series[2].data[5] = res.data[7].temper_mill_work_roll
        this.stockOption.series[2].data[6] = res.data[7].temper_mill_backup_roll
        this.stockOption.series[2].data[7] = res.data[7].r_vertical_roll
        this.stockOption.series[2].data[8] = res.data[7].f_vertical_roll
        this.stockOption.series[2].data[9] = res.data[7].hammer

        this.stockOption.series[3].data[0] = res.data[6].f1tof4_work_roll
        this.stockOption.series[3].data[1] = res.data[6].f5tof7_work_roll
        this.stockOption.series[3].data[2] =
          res.data[6].f1tof4_backup_roll + res.data[6].f1tof4_backup_roll

        this.stockOption.series[3].data[3] = res.data[6].r1_r2_work_roll
        this.stockOption.series[3].data[4] = res.data[6].r1_r2_backup_roll
        this.stockOption.series[3].data[5] = res.data[6].temper_mill_work_roll
        this.stockOption.series[3].data[6] = res.data[6].temper_mill_backup_roll
        this.stockOption.series[3].data[7] = res.data[6].r_vertical_roll
        this.stockOption.series[3].data[8] = res.data[6].f_vertical_roll
        this.stockOption.series[3].data[9] = res.data[6].hammer

        this.stockOption.series[4].data[0] = res.data[5].f1tof4_work_roll
        this.stockOption.series[4].data[1] = res.data[5].f5tof7_work_roll
        this.stockOption.series[4].data[2] =
          res.data[5].f1tof4_backup_roll + res.data[5].f1tof4_backup_roll

        this.stockOption.series[4].data[3] = res.data[5].r1_r2_work_roll
        this.stockOption.series[4].data[4] = res.data[5].r1_r2_backup_roll
        this.stockOption.series[4].data[5] = res.data[5].temper_mill_work_roll
        this.stockOption.series[4].data[6] = res.data[5].temper_mill_backup_roll
        this.stockOption.series[4].data[7] = res.data[5].r_vertical_roll
        this.stockOption.series[4].data[8] = res.data[5].f_vertical_roll
        this.stockOption.series[4].data[9] = res.data[5].hammer

        this.stockOption.series[5].data[0] = res.data[4].f1tof4_work_roll
        this.stockOption.series[5].data[1] = res.data[4].f5tof7_work_roll
        this.stockOption.series[5].data[2] =
          res.data[4].f1tof4_backup_roll + res.data[4].f1tof4_backup_roll
        this.stockOption.series[5].data[3] = res.data[4].r1_r2_work_roll
        this.stockOption.series[5].data[4] = res.data[4].r1_r2_backup_roll
        this.stockOption.series[5].data[5] = res.data[4].temper_mill_work_roll
        this.stockOption.series[5].data[6] = res.data[4].temper_mill_backup_roll
        this.stockOption.series[5].data[7] = res.data[4].r_vertical_roll
        this.stockOption.series[5].data[8] = res.data[4].f_vertical_roll
        this.stockOption.series[5].data[9] = res.data[4].hammer
        // this.stockOption.series[6].data[0] =
        //   res.data[12].f1tof4_work_roll - res.data[3].f1tof4_work_roll
        // this.stockOption.series[6].data[1] =
        //   res.data[12].f5tof7_work_roll - res.data[3].f5tof7_work_roll
        // this.stockOption.series[6].data[2] =
        //   res.data[12].f1tof4_backup_roll +
        //   res.data[12].f1tof4_backup_roll -
        //   res.data[3].f1tof4_backup_roll -
        //   res.data[3].f1tof4_backup_roll
        // this.stockOption.series[6].data[3] =
        //   res.data[12].r1_r2_work_roll - res.data[3].r1_r2_work_roll
        // this.stockOption.series[6].data[4] =
        //   res.data[12].r1_r2_backup_roll - res.data[3].r1_r2_backup_roll
        // this.stockOption.series[6].data[5] =
        //   res.data[12].temper_mill_work_roll - res.data[3].temper_mill_work_roll
        // this.stockOption.series[6].data[6] =
        //   res.data[12].temper_mill_backup_roll -
        //   res.data[3].temper_mill_backup_roll
        // this.stockOption.series[6].data[7] =
        //   res.data[12].r_vertical_roll - res.data[3].r_vertical_roll
        // this.stockOption.series[6].data[8] =
        //   res.data[12].f_vertical_roll - res.data[3].f_vertical_roll
        // this.stockOption.series[6].data[9] =
        //   res.data[12].hammer - res.data[3].hammer
        this.echartStockOption() //轧辊库存
      })
    },
    // 在机棍子
    // 工作辊1， 支撑辊2
    // 上辊1， 下辊2
    async findOnLineRollF1() {
      let res11 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 1,
        roll_typeid: 1,
        roll_positionid: 1
      })
      if (res11.status == 2000) {
        this.Fwork11.roll_no = res11.data[0].roll_no || '--'
        this.Fwork11.bodyDia = res11.data[0].currentdiameter || '--'
        this.Fwork11.bear_no = res11.data[0].dbearing_chock || '--'
      }
      let res12 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 1,
        roll_typeid: 1,
        roll_positionid: 2
      })
      if (res12.status == 2000) {
        this.Fwork12.roll_no = res12.data[0].roll_no || '--'
        this.Fwork12.bodyDia = res12.data[0].currentdiameter || '--'
        this.Fwork12.bear_no = res12.data[0].dbearing_chock || '--'
      }
      let res13 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 1,
        roll_typeid: 2,
        roll_positionid: 1
      })
      if (res13.status == 2000) {
        this.Fwork13.roll_no = res13.data[0].roll_no || '--'
        this.Fwork13.bodyDia = res13.data[0].currentdiameter || '--'
        this.Fwork13.bear_no = res13.data[0].dbearing_chock || '--'
      }
      let res14 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 1,
        roll_typeid: 2,
        roll_positionid: 2
      })
      if (res14.status == 2000) {
        this.Fwork14.roll_no = res14.data[0].roll_no || '--'
        this.Fwork14.bodyDia = res14.data[0].currentdiameter || '--'
        this.Fwork14.bear_no = res14.data[0].dbearing_chock || '--'
      }
    },
    async findOnLineRollF2() {
      let res11 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 2,
        roll_typeid: 1,
        roll_positionid: 1
      })
      if (res11.status == 2000) {
        this.F2.work1.roll_no = res11.data[0].roll_no || '--'
        this.F2.work1.bodyDia = res11.data[0].currentdiameter || '--'
        this.F2.work1.bear_no = res11.data[0].dbearing_chock || '--'
      }
      let res12 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 2,
        roll_typeid: 1,
        roll_positionid: 2
      })
      if (res12.status == 2000) {
        this.F2.work2.roll_no = res12.data[0].roll_no || '--'
        this.F2.work2.bodyDia = res12.data[0].currentdiameter || '--'
        this.F2.work2.bear_no = res12.data[0].dbearing_chock || '--'
      }
      let res13 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 1,
        roll_typeid: 2,
        roll_positionid: 1
      })
      if (res13.status == 2000) {
        this.F2.zhi1.roll_no = res13.data[0].roll_no || '--'
        this.F2.zhi1.bodyDia = res13.data[0].currentdiameter || '--'
        this.F2.zhi1.bear_no = res13.data[0].dbearing_chock || '--'
      }
      let res14 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 1,
        roll_typeid: 2,
        roll_positionid: 2
      })
      if (res14.status == 2000) {
        this.F2.zhi2.roll_no = res14.data[0].roll_no || '--'
        this.F2.zhi2.bodyDia = res14.data[0].currentdiameter || '--'
        this.F2.zhi2.bear_no = res14.data[0].dbearing_chock || '--'
      }
    },
    async findOnLineRollF3() {
      let res11 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 3,
        roll_typeid: 1,
        roll_positionid: 1
      })
      if (res11.status == 2000) {
        this.F3.work1.roll_no = res11.data[0].roll_no || '--'
        this.F3.work1.bodyDia = res11.data[0].currentdiameter || '--'
        this.F3.work1.bear_no = res11.data[0].dbearing_chock || '--'
      }
      let res12 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 3,
        roll_typeid: 1,
        roll_positionid: 2
      })
      if (res12.status == 2000) {
        this.F3.work2.roll_no = res12.data[0].roll_no || '--'
        this.F3.work2.bodyDia = res12.data[0].currentdiameter || '--'
        this.F3.work2.bear_no = res12.data[0].dbearing_chock || '--'
      }
      let res13 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 3,
        roll_typeid: 2,
        roll_positionid: 1
      })
      if (res13.status == 2000) {
        this.F3.zhi1.roll_no = res13.data[0].roll_no || '--'
        this.F3.zhi1.bodyDia = res13.data[0].currentdiameter || '--'
        this.F3.zhi1.bear_no = res13.data[0].dbearing_chock || '--'
      }
      let res14 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 3,
        roll_typeid: 2,
        roll_positionid: 2
      })
      if (res14.status == 2000) {
        this.F3.zhi2.roll_no = res14.data[0].roll_no || '--'
        this.F3.zhi2.bodyDia = res14.data[0].currentdiameter || '--'
        this.F3.zhi2.bear_no = res14.data[0].dbearing_chock || '--'
      }
    },
    async findOnLineRollF4() {
      let res11 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 4,
        roll_typeid: 1,
        roll_positionid: 1
      })
      if (res11.status == 2000) {
        this.F4.work1.roll_no = res11.data[0].roll_no || '--'
        this.F4.work1.bodyDia = res11.data[0].currentdiameter || '--'
        this.F4.work1.bear_no = res11.data[0].dbearing_chock || '--'
      }
      let res12 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 4,
        roll_typeid: 1,
        roll_positionid: 2
      })
      if (res12.status == 2000) {
        this.F4.work2.roll_no = res12.data[0].roll_no || '--'
        this.F4.work2.bodyDia = res12.data[0].currentdiameter || '--'
        this.F4.work2.bear_no = res12.data[0].dbearing_chock || '--'
      }
      let res13 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 4,
        roll_typeid: 2,
        roll_positionid: 1
      })
      if (res13.status == 2000) {
        this.F4.zhi1.roll_no = res13.data[0].roll_no || '--'
        this.F4.zhi1.bodyDia = res13.data[0].currentdiameter || '--'
        this.F4.zhi1.bear_no = res13.data[0].dbearing_chock || '--'
      }
      let res14 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 4,
        roll_typeid: 2,
        roll_positionid: 2
      })
      if (res14.status == 2000) {
        this.F4.zhi2.roll_no = res14.data[0].roll_no || '--'
        this.F4.zhi2.bodyDia = res14.data[0].currentdiameter || '--'
        this.F4.zhi2.bear_no = res14.data[0].dbearing_chock || '--'
      }
    },
    async findOnLineRollF5() {
      let res11 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 5,
        roll_typeid: 1,
        roll_positionid: 1
      })
      if (res11.status == 2000) {
        this.F5.work1.roll_no = res11.data[0].roll_no || '--'
        this.F5.work1.bodyDia = res11.data[0].currentdiameter || '--'
        this.F5.work1.bear_no = res11.data[0].dbearing_chock || '--'
      }
      let res12 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 5,
        roll_typeid: 1,
        roll_positionid: 2
      })
      if (res12.status == 2000) {
        this.F5.work2.roll_no = res12.data[0].roll_no || '--'
        this.F5.work2.bodyDia = res12.data[0].currentdiameter || '--'
        this.F5.work2.bear_no = res12.data[0].dbearing_chock || '--'
      }
      let res13 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 5,
        roll_typeid: 2,
        roll_positionid: 1
      })
      if (res13.status == 2000) {
        this.F5.zhi1.roll_no = res13.data[0].roll_no || '--'
        this.F5.zhi1.bodyDia = res13.data[0].currentdiameter || '--'
        this.F5.zhi1.bear_no = res13.data[0].dbearing_chock || '--'
      }
      let res14 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 5,
        roll_typeid: 2,
        roll_positionid: 2
      })
      if (res14.status == 2000) {
        this.F5.zhi2.roll_no = res14.data[0].roll_no || '--'
        this.F5.zhi2.bodyDia = res14.data[0].currentdiameter || '--'
        this.F5.zhi2.bear_no = res14.data[0].dbearing_chock || '--'
      }
    },
    async findOnLineRollF6() {
      let res11 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 6,
        roll_typeid: 1,
        roll_positionid: 1
      })
      if (res11.status == 2000) {
        this.F6.work1.roll_no = res11.data[0].roll_no || '--'
        this.F6.work1.bodyDia = res11.data[0].currentdiameter || '--'
        this.F6.work1.bear_no = res11.data[0].dbearing_chock || '--'
      }
      let res12 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 6,
        roll_typeid: 1,
        roll_positionid: 2
      })
      if (res12.status == 2000) {
        this.F6.work2.roll_no = res12.data[0].roll_no || '--'
        this.F6.work2.bodyDia = res12.data[0].currentdiameter || '--'
        this.F6.work2.bear_no = res12.data[0].dbearing_chock || '--'
      }
      let res13 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 6,
        roll_typeid: 2,
        roll_positionid: 1
      })
      if (res13.status == 2000) {
        this.F6.zhi1.roll_no = res13.data[0].roll_no || '--'
        this.F6.zhi1.bodyDia = res13.data[0].currentdiameter || '--'
        this.F6.zhi1.bear_no = res13.data[0].dbearing_chock || '--'
      }
      let res14 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 6,
        roll_typeid: 2,
        roll_positionid: 2
      })
      if (res14.status == 2000) {
        this.F6.zhi2.roll_no = res14.data[0].roll_no || '--'
        this.F6.zhi2.bodyDia = res14.data[0].currentdiameter || '--'
        this.F6.zhi2.bear_no = res14.data[0].dbearing_chock || '--'
      }
    },
    async findOnLineRollF7() {
      let res11 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 7,
        roll_typeid: 1,
        roll_positionid: 1
      })
      if (res11.status == 2000) {
        this.F7.work1.roll_no = res11.data[0].roll_no || '--'
        this.F7.work1.bodyDia = res11.data[0].currentdiameter || '--'
        this.F7.work1.bear_no = res11.data[0].dbearing_chock || '--'
      }
      let res12 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 7,
        roll_typeid: 1,
        roll_positionid: 2
      })
      if (res12.status == 2000) {
        this.F7.work2.roll_no = res12.data[0].roll_no || '--'
        this.F7.work2.bodyDia = res12.data[0].currentdiameter || '--'
        this.F7.work2.bear_no = res12.data[0].dbearing_chock || '--'
      }
      let res13 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 7,
        roll_typeid: 2,
        roll_positionid: 1
      })
      if (res13.status == 2000) {
        this.F7.zhi1.roll_no = res13.data[0].roll_no || '--'
        this.F7.zhi1.bodyDia = res13.data[0].currentdiameter || '--'
        this.F7.zhi1.bear_no = res13.data[0].dbearing_chock || '--'
      }
      let res14 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 7,
        roll_typeid: 2,
        roll_positionid: 2
      })
      if (res14.status == 2000) {
        this.F7.zhi2.roll_no = res14.data[0].roll_no || '--'
        this.F7.zhi2.bodyDia = res14.data[0].currentdiameter || '--'
        this.F7.zhi2.bear_no = res14.data[0].dbearing_chock || '--'
      }
    },
    async findOnLineRollR1() {
      let res11 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 8,
        roll_typeid: 1,
        roll_positionid: 1
      })
      if (res11.status == 2000) {
        this.R1.work1.roll_no = res11.data[0].roll_no || '--'
        this.R1.work1.bodyDia = res11.data[0].currentdiameter || '--'
        this.R1.work1.bear_no = res11.data[0].dbearing_chock || '--'
      }
      let res12 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 8,
        roll_typeid: 1,
        roll_positionid: 2
      })
      if (res12.status == 2000) {
        this.R1.work2.roll_no = res12.data[0].roll_no || '--'
        this.R1.work2.bodyDia = res12.data[0].currentdiameter || '--'
        this.R1.work2.bear_no = res12.data[0].dbearing_chock || '--'
      }
      let res13 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 8,
        roll_typeid: 2,
        roll_positionid: 1
      })
      if (res13.status == 2000) {
        this.R1.zhi1.roll_no = res13.data[0].roll_no || '--'
        this.R1.zhi1.bodyDia = res13.data[0].currentdiameter || '--'
        this.R1.zhi1.bear_no = res13.data[0].dbearing_chock || '--'
      }
      let res14 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 8,
        roll_typeid: 2,
        roll_positionid: 2
      })
      if (res14.status == 2000) {
        this.R1.zhi2.roll_no = res14.data[0].roll_no || '--'
        this.R1.zhi2.bodyDia = res14.data[0].currentdiameter || '--'
        this.R1.zhi2.bear_no = res14.data[0].dbearing_chock || '--'
      }
    },
    async findOnLineRollR2() {
      let res11 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 9,
        roll_typeid: 1,
        roll_positionid: 1
      })
      if (res11.status == 2000) {
        this.R2.work1.roll_no = res11.data[0].roll_no || '--'
        this.R2.work1.bodyDia = res11.data[0].currentdiameter || '--'
        this.R2.work1.bear_no = res11.data[0].dbearing_chock || '--'
      }
      let res12 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 9,
        roll_typeid: 1,
        roll_positionid: 2
      })
      if (res12.status == 2000) {
        this.R2.work2.roll_no = res12.data[0].roll_no || '--'
        this.R2.work2.bodyDia = res12.data[0].currentdiameter || '--'
        this.R2.work2.bear_no = res12.data[0].dbearing_chock || '--'
      }
      let res13 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 9,
        roll_typeid: 2,
        roll_positionid: 1
      })
      if (res13.status == 2000) {
        this.R2.zhi1.roll_no = res13.data[0].roll_no || '--'
        this.R2.zhi1.bodyDia = res13.data[0].currentdiameter || '--'
        this.R2.zhi1.bear_no = res13.data[0].dbearing_chock || '--'
      }
      let res14 = await post('rollInformation/findRevolve', {
        roll_revolve: '7',
        frame_noid: 9,
        roll_typeid: 2,
        roll_positionid: 2
      })
      if (res14.status == 2000) {
        this.R2.zhi2.roll_no = res14.data[0].roll_no || '--'
        this.R2.zhi2.bodyDia = res14.data[0].currentdiameter || '--'
        this.R2.zhi2.bear_no = res14.data[0].dbearing_chock || '--'
      }
    },
    // 换辊小车接口
    async findCar2() {
      let res2 = await post('rollInformation/findRevolve', {
        roll_revolve: '3',
        frame_noid: 2
      })
      if (res2.status == 2000) {
        this.car.F2.roll_no = res2.data[0].roll_no || ''
        this.car.F2.bodyDia = res2.data[0].currentdiameter || ''
        this.car.F2.bear_no = res2.data[0].dbearing_chock || ''
      }
    },
    async findCar3() {
      let res3 = await post('rollInformation/findRevolve', {
        roll_revolve: '3',
        frame_noid: 3
      })
      if (res3.status == 2000) {
        this.car.F3.roll_no = res3.data[0].roll_no || ''
        this.car.F3.bodyDia = res3.data[0].currentdiameter || ''
        this.car.F3.bear_no = res3.data[0].dbearing_chock || ''
      }
    },
    async findCar4() {
      let res4 = await post('rollInformation/findRevolve', {
        roll_revolve: '3',
        frame_noid: 4
      })
      if (res4.status == 2000) {
        this.car.F4.roll_no = res4.data[0].roll_no || ''
        this.car.F4.bodyDia = res4.data[0].currentdiameter || ''
        this.car.F4.bear_no = res4.data[0].dbearing_chock || ''
      }
    },
    async findCar5() {
      let res5 = await post('rollInformation/findRevolve', {
        roll_revolve: '3',
        frame_noid: 5
      })
      if (res5.status == 2000) {
        this.car.F5.roll_no = res5.data[0].roll_no || ''
        this.car.F5.bodyDia = res5.data[0].currentdiameter || ''
        this.car.F5.bear_no = res5.data[0].dbearing_chock || ''
      }
    },
    async findCar6() {
      let res6 = await post('rollInformation/findRevolve', {
        roll_revolve: '3',
        frame_noid: 6
      })
      if (res6.status == 2000) {
        this.car.F6.roll_no = res6.data[0].roll_no || ''
        this.car.F6.bodyDia = res6.data[0].currentdiameter || ''
        this.car.F6.bear_no = res6.data[0].dbearing_chock || ''
      }
    },
    async findCar7() {
      let res7 = await post('rollInformation/findRevolve', {
        roll_revolve: '3',
        frame_no: 7
      })
      if (res7.status == 2000) {
        this.car.F7.roll_no = res7.data[0].roll_no || ''
        this.car.F7.bodyDia = res7.data[0].currentdiameter || ''
        this.car.F7.bear_no = res7.data[0].dbearing_chock || ''
      }
    },
    async findCar8() {
      let res8 = await post('rollInformation/findRevolve', {
        roll_revolve: '3',
        frame_noid: 8
      })
      if (res8.status == 2000) {
        this.car.R1.roll_no = res8.data[0].roll_no || ''
        this.car.R1.bodyDia = res8.data[0].currentdiameter || ''
        this.car.R1.bear_no = res8.data[0].dbearing_chock || ''
      }
    },
    async findCar9() {
      let res9 = await post('rollInformation/findRevolve', {
        roll_revolve: '3',
        frame_noid: 9
      })
      if (res9.status == 2000) {
        this.car.R2.roll_no = res9.data[0].roll_no || ''
        this.car.R2.bodyDia = res9.data[0].currentdiameter || ''
        this.car.R2.bear_no = res9.data[0].dbearing_chock || ''
      }
    },
    async findCar() {
      let res1 = await post('rollInformation/findRevolve', {
        roll_revolve: '3',
        frame_noid: 1
      })
      if (res1.status == 2000) {
        this.car.F1.roll_no = res1.data[0].roll_no || ''
        this.car.F1.bodyDia = res1.data[0].currentdiameter || ''
        this.car.F1.bear_no = res1.data[0].dbearing_chock || ''
      }
    },
    // 备辊接口
    async findRollBei() {
      let res = await post('rollInformation/findSizeByType', {})
      if (res.status == 2000) {
        this.echart_go_2(res.data)
      }
    },
    getNowTime() {
      let time = {
        1: '周一',
        2: '周二',
        3: '周三',
        4: '周四',
        5: '周五',
        6: '周六',
        7: '周日'
      }
      this.nowTime.time = moment().format('HH:mm:ss')
      this.nowTime.day = moment().format('YYYY年MM月DD日')
      this.nowTime.date = time[moment().weekday()]
    },
    echart_go_2(val) {
      var myChart1 = Echarts.init(document.getElementById('app1'), 'light')
      var myChart2 = Echarts.init(document.getElementById('app2'), 'light')
      var myChart3 = Echarts.init(document.getElementById('app3'), 'light')
      var myChart4 = Echarts.init(document.getElementById('app4'), 'light')
      var myChart5 = Echarts.init(document.getElementById('app5'), 'light')
      var myChart6 = Echarts.init(document.getElementById('app6'), 'light')
      var myChart7 = Echarts.init(document.getElementById('app7'), 'light')
      //将配置注入到html中定义的容器
      let option0 = this.echartOpents(val[0])
      let option1 = this.echartOpents(val[1])
      let option2 = this.echartOpents(val[2])
      let option3 = this.echartOpents(val[3])
      let option4 = this.echartOpents(val[4])
      let option5 = this.echartOpents(val[5])
      let option6 = this.echartOpents(val[6])
      myChart1.setOption(option0)
      myChart2.setOption(option1)
      myChart3.setOption(option2)
      myChart4.setOption(option3)
      myChart5.setOption(option4)
      myChart6.setOption(option5)
      myChart7.setOption(option6)
      window.addEventListener('resize', function() {
        myChart1.resize()
      })
    },
    echartOpents(data) {
      var option = {
        textStyle: {
          color: '#eae8c5' //字体颜色
        },
        tooltip: {
          trigger: 'axis'
        }, //联动
        title: {
          textStyle: {
            color: '#eae8c5', //字体颜色
            fontSize: 10
          },
          text: data.roll_type,
          x: 10,
          y: 8
        },
        legend: {
          orient: 'vertical',
          right: 1,
          bottom: 1,
          textStyle: {
            color: '#ffffff',
            fontSize: 9
            // rich:
          },
          icon: 'circle',
          itemHeight: 5,
          data: ['待磨削', '在冷却', '在磨削', '在装配'],
          formatter: function(name) {
            let data = option.series[0].data
            let value = ''
            for (const item of data) {
              if (item.name == name) {
                value = item.value
              }
            }
            return name + ' ' + value
          }
        },
        series: [
          {
            type: 'pie',
            hoverOffset: 1,
            radius: ['40%', '60%'],
            center: [40, 60],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 10,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: data.dmx, name: '待磨削' },
              { value: data.zlq, name: '在冷却' },
              { value: data.zmx, name: '在磨削' },
              { value: data.zzp, name: '在装配' }
            ]
          }
        ]
      }
      return option
    },
    // 获得最佳班组
    async findTearm() {
      //重写排序方法
      var compare = function(attribute) {
        return function(obj1, obj2) {
          var val1 = obj1[attribute]
          var val2 = obj2[attribute]
          if (val1 < val2) {
            return -1
          } else if (val1 > val2) {
            return 1
          } else {
            return 0
          }
        }
      }
      this.mochuangDate = moment().format('YYYY年MM月')
      let res = await pythonPOST1('/python/RollEvaluateMachineNo/', {
        grind_starttime: moment()
          .startOf('month')
          .format('YYYY-MM-DD HH:mm:ss'),
        grind_endtime: moment()
          .startOf()
          .format('YYYY-MM-DD HH:mm:ss')
      })
      let data = []
      if (res.code == 200) {
        res.data.forEach(item => {
          data.push(JSON.parse(item))
        })
        this.mochuang3 = data[0].sort(compare('value'))[0]
        this.mochuang4 = data[1].sort(compare('value'))[0]
        this.mochuang5 = data[2].sort(compare('value'))[0]
        this.mochuang6 = data[3].sort(compare('value'))[0]
      }
    },
    setmoleft() {
      this.mwidth += this.speed
      this.mobed2.mwidth += this.mobed2.speed
      this.mobed3.mwidth += this.mobed3.speed
      this.mobed4.mwidth += this.mobed4.speed
      this.mobed5.mwidth += this.mobed5.speed
      this.mobed6.mwidth += this.mobed6.speed
      if (this.flag) {
        this.mobed1.left = 111 - this.mwidth
      } else {
        this.mobed1.left = 70 + this.mwidth
      }
      if (this.mobed2.flag) {
        this.mobed2.left = 111 - this.mobed2.mwidth
      } else {
        this.mobed2.left = 70 + this.mobed2.mwidth
      }
      if (this.mobed3.flag) {
        this.mobed3.left = 111 - this.mobed3.mwidth
      } else {
        this.mobed3.left = 70 + this.mobed3.mwidth
      }
      if (this.mobed4.flag) {
        this.mobed4.left = 111 - this.mobed4.mwidth
      } else {
        this.mobed4.left = 70 + this.mobed4.mwidth
      }
      if (this.mobed5.flag) {
        this.mobed5.left = 111 - this.mobed5.mwidth
      } else {
        this.mobed5.left = 70 + this.mobed5.mwidth
      }
      if (this.mobed6.flag) {
        this.mobed6.left = 111 - this.mobed6.mwidth
      } else {
        this.mobed6.left = 70 + this.mobed6.mwidth
      }
    },
    async findmo1() {
      let res = await post('rollInformation/findByMachine', {
        machine_id: '1'
      })
      if (res.status == 2000) {
        this.mobed1.roll_no = res.data[0].roll_no
      }
    },
    async findmo2() {
      let res = await post('rollInformation/findByMachine', {
        machine_id: '2'
      })
      if (res.status == 2000) {
        this.mobed2.roll_no = res.data[0].roll_no
      }
    },
    async findmo3() {
      let res = await post('rollInformation/findByMachine', {
        machine_id: '3'
      })
      if (res.status == 2000) {
        this.mobed3.roll_no = res.data[0].roll_no
      }
    },
    async findmo4() {
      let res = await post('rollInformation/findByMachine', {
        machine_id: '4'
      })
      if (res.status == 2000) {
        this.mobed4.roll_no = res.data[0].roll_no
      }
    },
    async findmo5() {
      let res = await post('rollInformation/findByMachine', {
        machine_id: '5'
      })
      if (res.status == 2000) {
        this.mobed5.roll_no = res.data[0].roll_no
      }
    },
    async findmo6() {
      let res = await post('rollInformation/findByMachine', {
        machine_id: '6'
      })
      if (res.status == 2000) {
        this.mobed6.roll_no = res.data[0].roll_no
      }
    }
  }
}
</script>

<style>
</style>
