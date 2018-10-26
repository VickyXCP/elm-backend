<template>
  <div class="chart-page" id="liquidfill-chart" style="width: 100%; height: 400px;">
  </div>
</template>

<script>
import 'echarts-liquidfill/src/liquidFill'
  import echarts from 'echarts/lib/echarts'
  export default {
    name: 'chart1',
    data() {
      return {
        chartInstance: null,
        option:{
          series:[{
            type: "liquidfill",
            data: [0.6, 0.5, 0.4, 0.3]
          }]
        }
      }
    },
    mounted() {
      this.chart = echarts.init(document.getElementById('liquidfill-chart'))
      // this.chart.setOption(this.option)
    }
  }
</script>

<style scoped>

</style>
