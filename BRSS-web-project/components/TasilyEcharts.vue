<template>
  <div
    :id="containerId"
    :style="{'width': '100%', 'min-width': _width ? _width : '400px', 'height': _height ? _height : '400px'}"
    class="chartContainer}"
    oncontextmenu="return false" />
</template>
<script>
import Echarts from 'echarts'
import UUID from 'uuid'
export default {
  props: {
    title: {
      type: Object,
      default: function() {
        return {}
      }
    },
    legend: {
      type: Object,
      default: function() {
        return {}
      }
    },
    dataset: {
      type: Object,
      default: function() {
        return {}
      }
    },
    grid: {
      type: Object,
      default: function() {
        return {
          left: '3%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        }
      }
    },
    xAxis: {
      type: Object,
      default: function() {
        return {}
      }
    },
    yAxis: {
      type: Array,
      default: function() {
        return []
      }
    },
    polar: {
      type: Object,
      default: function() {
        return {}
      }
    },
    radiusAxis: {
      type: Object,
      default: function() {
        return {}
      }
    },
    angleAxis: {
      type: Object,
      default: function() {
        return {}
      }
    },
    radar: {
      type: Object,
      default: function() {
        return {}
      }
    },
    dataZoom: {
      type: Array,
      default: function() {
        return []
      }
    },
    visualMap: {
      type: Object,
      default: function() {
        return {}
      }
    },
    tooltip: {
      type: Object,
      default: function() {
        return {}
      }
    },
    toolbox: {
      type: Object,
      default: function() {
        return {}
      }
    },
    brush: {
      type: Object,
      default: function() {
        return {}
      }
    },
    geo: {
      type: Object,
      default: function() {
        return {}
      }
    },
    parallel: {
      type: Object,
      default: function() {
        return {}
      }
    },
    parallelAxis: {
      type: Object,
      default: function() {
        return {}
      }
    },
    singleAxis: {
      type: Object,
      default: function() {
        return {}
      }
    },
    timeline: {
      type: Object,
      default: function() {
        return {}
      }
    },
    series: {
      type: Array,
      default: function() {
        return []
      }
    },
    color: {
      type: Array,
      default: function() {
        return []
      }
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    group: {
      type: String,
      default: ''
    },
    data: {
      type: [Array, Object],
      default: function() {
        return []
      }
    },
    graphic: {
      type: Array,
      default: function() {
        return []
      }
    },
    _width: {
      type: String,
      default: ''
    },
    _height: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      echart: {},
      containerId: UUID()
    }
  },
  //监听数据是否发生变化
  watch: {
    title: {
      handler(title) {
        this.echart.setOption({
          title
        })
      },
      deep: true
    },
    grid: {
      handler(grid, old) {
        this.$nextTick(() => {
          this.echart.setOption({
            grid
          })
        })
      },
      deep: true
    },
    xAxis: {
      handler(xAxis) {
        this.$nextTick(function() {
          this.echart.setOption({
            xAxis
          })
        })
      },
      deep: true
    },
    dataset: {
      handler(dataset) {
        this.$nextTick(function() {
          this.echart.setOption({
            dataset
          })
        })
      },
      deep: true
    },
    yAxis: {
      handler(yAxis) {
        this.$nextTick(function() {
          this.echart.setOption({
            yAxis
          })
        })
      },
      deep: true
    },
    polar: {
      handler(polar) {
        this.echart.setOption({
          polar
        })
      },
      deep: true
    },
    radiusAxis: {
      handler(radiusAxis) {
        this.echart.setOption({
          radiusAxis
        })
      },
      deep: true
    },
    angleAxis: {
      handler(angleAxis) {
        this.echart.setOption({
          angleAxis
        })
      },
      deep: true
    },
    radar: {
      handler(radar) {
        this.echart.setOption({
          radar
        })
      },
      deep: true
    },
    dataZoom: {
      handler(dataZoom) {
        this.echart.setOption({
          dataZoom
        })
      },
      deep: true
    },
    visualMap: {
      handler(visualMap) {
        this.echart.setOption({
          visualMap
        })
      },
      deep: true
    },
    tooltip: {
      handler(tooltip) {
        this.echart.setOption({
          tooltip
        })
      },
      deep: true
    },
    toolbox: {
      handler(toolbox) {
        this.$nextTick(function() {
          this.echart.setOption({
            toolbox
          })
        })
      },
      deep: true
    },
    brush: {
      handler(brush) {
        this.echart.setOption({
          brush
        })
      },
      deep: true
    },
    geo: {
      handler(geo) {
        this.echart.setOption({
          geo
        })
      },
      deep: true
    },
    parallel: {
      handler(parallel) {
        this.echart.setOption({
          parallel
        })
      },
      deep: true
    },
    parallelAxis: {
      handler(parallelAxis) {
        this.echart.setOption({
          parallelAxis
        })
      },
      deep: true
    },
    singleAxis: {
      handler(singleAxis) {
        this.echart.setOption({
          singleAxis
        })
      },
      deep: true
    },
    timeline: {
      handler(timeline) {
        this.echart.setOption({
          timeline
        })
      },
      deep: true
    },
    series: {
      handler(series) {
        this.echart.setOption({
          legend: this.legend,
          series
        })
      },
      deep: true
    },
    color: {
      handler(color) {
        this.echart.setOption({
          color
        })
      }
    },
    backgroundColor: {
      handler(backgroundColor) {
        this.echart.setOption({
          backgroundColor
        })
      }
    },
    group: {
      handler(group) {
        this.handlerConnect(group)
      }
    },
    graphic: {
      handler(graphic) {
        this.echart.setOption({
          graphic
        })
      },
      deep: true
    },
    _height: {
      handler(_height) {
        this.$nextTick(function() {
          this.echart.resize()
        })
      }
    },
    _width: {
      handler(_width) {
        this.$nextTick(function() {
          this.echart.resize()
        })
      }
    },
    data: {
      handler(data) {
        if (!data) return
        var series = []
        data.map((obj, idx) => {
          series.push({
            data: obj
          })
        })
        this.echart.setOption({
          series
        })
      }
    }
  },
  //组件创建完成时
  created() {
    let vm = this
    this.$nextTick(function() {
      this.echart = Echarts.init(
        document.getElementById(this.containerId),
        'light'
      )

      if (this.group) this.handlerConnect(this.group)

      this.echart.setOption(this.getDefaultOption())

      this.echart.on('click', function(params) {
        vm.$emit('chart-click-data', {
          data: params,
          id: vm.$el.id,
          echart: vm.echart
        })
      })
    })
  },
  methods: {
    handlerConnect(group) {
      if (group) {
        Echarts.connect(group)
      }
      this.echart.group = group
    },
    getDefaultOption() {
      var option = {
        title: this.title,
        legend: this.legend,
        tooltip: this.tooltip,
        toolbox: this.toolbox,
        grid: this.grid,
        xAxis: this.xAxis,
        yAxis: this.yAxis,
        /*yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          }
        ],*/
        useUTC: false,
        dataZoom: this.dataZoom,
        series: this.series,
        graphic: this.graphic
      }
      return option
    },
    sizeChange() {
      this.$nextTick(function() {
        this.echart.resize()
      })
    },
    clearEchart() {
      var vm = this
      vm.echart = Echarts.init(document.getElementById(vm.containerId))
      if (vm.group) vm.handlerConnect(vm.group)
      var series = vm.getDefaultOption().series
      var seriesLength = series.length
      for (var i = 0; i < seriesLength; i++) {
        series.shift()
      }
      vm.echart.setOption(vm.getDefaultOption())
      vm.echart.on('click', function(params) {
        vm.$emit('chart-click-data', {
          data: params,
          id: vm.$el.id,
          echart: vm.echart
        })
      })
    }
  }
}
</script>
