# elm-backend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

element-ui
echarts
less
less-loader
css-loader
time-formater

 
            yAxis: [
              {
                type: 'value',
                name: '用户',
                min: 0,
                max: 200,
                position: 'left',
                axisLine: {
                  lineStyle: {
                    color: '#999'
                  }
                },
                axisLabel: {
                  formatter: '{value}'
                }
              },
              {
                type: 'value',
                name: '用户',
                min: 0,
                max: 200,
                position: 'left',
                axisLine: {
                  lineStyle: {
                    color: '#999'
                  }
                },
                axisLabel: {
                  formatter: '{value}'
                }
              },
            ],
            series: [
              {
                name: '新注册用户',
                type: 'line',
                data:this.sevenDate[0],
                yAxisIndex: 1,
                markPoint: {
                  data: [
                    {type: 'max', name:'最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                }
              },
              {
                name:'新增订单',
                type:'line',
                data:this.sevenDate[1],
                yAxisIndex: 1,
                markPoint: {
                  data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                },
              },
              {
                name:'新增管理员',
                type:'line',
                data:this.sevenDate[2],
                yAxisIndex: 1,
                markPoint: {
                  data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                },
              }
            ]
          }
