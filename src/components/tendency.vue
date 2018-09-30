<template>
  <div class="line1">
    <div id="line1" style="width: 90%; height: 450px;"></div>
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'

  //引入折线图
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/toolbox'
  import 'echarts/lib/component/markPoint'
  import 'echarts/lib/component/tooltip'

  export default {
    name: 'tendency',
    props: ['sevenDay', 'sevenDate'],
    mounted () {
      this.myChart = echarts.init(document.getElementById('line1'))
      this.initData()
    },
    methods: {
      initData () {
        const colors = ['#5793f3', '#675bba', '#d14a61']
        const options = {
          color: colors,
          //图标的标题与副标题
          title: {
            text: '走势图',
            subtext: '子标题'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['新注册用户', '新增订单', '新增管理员']
          },
          toolbox: {
            show: true,
            feature: {
              //区域缩放
              dataZoom: {
                yAxisIndex: 'none'
              },
              //数据视图
              dataView: {readOnly: false},
              //柱状图、折线图切换以及还原
              magicType: {type: ['bar', 'line']},
              restore: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.sevenDay
          }
        }
        this.myChart.setOption(options)
      }
    }
  }
</script>

<style scoped>

</style>
