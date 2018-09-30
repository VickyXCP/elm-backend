<template>
  <div class="chart-page" id="liquidfill-chart" style="width: 100%; height: 400px;">
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts-liquidfill/src/liquidFill'
  export default {
    name: 'chart1',
    data() {
      return {
        chartInstance: null,
        option:{
          series:[{
            type: "liquidFill",
            data: [0.6, 0.5, 0.4, 0.3]
          }]
        }
      }
    },
    mounted() {
      this.chart = echarts.init(document.getElementById('liquidfill-chart'))
      this.chart.setOption(this.option)
    }
  }
</script>

<style scoped>

</style>
