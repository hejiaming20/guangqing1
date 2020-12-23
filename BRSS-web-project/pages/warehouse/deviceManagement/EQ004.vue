<!--
 * @Author: your name
 * @Date: 2020-10-26 10:11:46
 * @LastEditTime: 2020-10-27 15:55:31
 * @LastEditors: Please set LastEditors
 * @Description: 设备监控
 * @FilePath: \BRSS-web-project\pages\inforConTrolSys\rollUses\GD008.vue
-->
<template>
  <div>
    <el-row :gutter="5">
      <el-col 
        v-for="(val, indexs) in machine" 
        :span="12" 
        :key="indexs">
        <div class="emcs layout-block layout-default-margin">
          <div class="emcs-title">{{ val.title }}</div>
          <div>
            <el-row class="layout-default-margin">
              <el-col :span="19">
                <div class="machine-main">
                  <img 
                    ref="bgImg"
                    :src="baseImg"
                    class="machine-img" 
                    alt="磨床1" 
                    title="磨床1">
                  <img 
                    :src="roll" 
                    alt="轧辊" 
                    class="machine-roll">
                  <img 
                    :src="slide1" 
                    class="machine-slide1"
                    alt="滑块1">
                  <img 
                    :src="slide2" 
                    class="machine-slide2"
                    alt="滑块2">
                  <img 
                    :src="part" 
                    alt="零件" 
                    class="machine-part">
                </div>
              </el-col>
              <el-col :span="5">
                <div class="motor">
                  <div class="motor-title">主轴电机</div>
                  <ul>
                    <li 
                      v-for="(item, index) in val.motor" 
                      :key="index">
                      <span class="motor-name">{{ item.name }}:</span>
                      <span class="motor-value">{{ item.value }}</span>
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col 
                v-for="(item, index) in val.machineAge" 
                :key="index"
                :span="6">
                <div class="machine">
                  <span class="machineAgeName">{{ item.name }}</span>
                  <span>{{ item.value }}毫米</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseImg: require('@/assets/img/base.png'),
      slide1: require('@/assets/img/slide1.png'),
      slide2: require('@/assets/img/slide2.png'),
      roll: require('@/assets/img/roll.png'),
      part: require('@/assets/img/part.png'),
      machine: [
        {
          title: '1#磨床',
          motor: [
            { name: '电流', value: 1000 },
            { name: '扭矩', value: 1000 },
            { name: '转速', value: 1000 }
          ],
          machineAge: [
            {
              name: 'Z轴',
              value: 200
            },
            {
              name: 'X轴',
              value: 200
            },
            {
              name: 'U轴',
              value: 200
            },
            {
              name: 'E轴',
              value: 200
            },
            {
              name: 'Q轴',
              value: 200
            },
            {
              name: 'V轴',
              value: 200
            },
            {
              name: 'C轴',
              value: 200
            },
            {
              name: 'B轴',
              value: 200
            },
            {
              name: 'A1轴',
              value: 200
            },
            {
              name: 'Y轴',
              value: 200
            },
            {
              name: 'A轴',
              value: 200
            }
          ]
        }
      ]
    }
  },
  mounted() {
    console.log('绑定', this.$refs.bgImg)
  }
}
</script>

<style>
.emcs-title {
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  text-align: center;
}
.machine-main {
  width: 100%;
  height: 150px;
  position: relative;
}
.machine-img {
  top: 30px;
  position: absolute;
  width: 100%;
}
.machine-roll {
  top: 38px;
  left: 31%;
  width: 30%;
  position: absolute;
  z-index: 5;
}
.machine-slide1 {
  position: absolute;
  width: 15%;
  right: 45%;
  top: 40px;
  z-index: 7;
}
.machine-slide1:hover {
  -webkit-animation: round_animate 5s linear infinite;
  animation: round_animate 5s linear infinite;
}
.machine-slide2:hover {
  -webkit-animation: round_animate 5s linear infinite;
  animation: round_animate 5s linear infinite;
}
.machine-slide2 {
  position: absolute;
  width: 23%;
  right: 9%;
  top: 25px;
  z-index: 1;
}
.machine-part {
  position: absolute;
  width: 15%;
  right: 31%;
  top: 55px;
  z-index: 6;
}
.motor-title {
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  text-align: center;
}
.motor-name {
  width: 37px;
  display: inline-block;
}
.motor-value {
  font-size: 14px;
}
.machineAgeName {
  width: 40px;
  display: inline-block;
}

/* .machine-main:hover .machine-img {
  -webkit-animation: round_animate 5s linear 1;
  animation: round_animate 5s linear 1;
} */

@keyframes round_animate {
  to {
    right: 65%;
    transform: rotateY(-10deg);
  }
}

.machine {
  height: 25px;
  line-height: 25px;
}
.machine span:last-child {
  font-size: 14px;
}
</style>
