<template>
  <div class="home">
    <section class="home-data">
      <header>数据统计</header>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="data_list today_head"><span class="data_num head">当日数据：</span> </div>
        </el-col>
        <el-col :span="4">
          <div class="data_list"><span class="data_num ">{{userCount}}</span> 新增用户</div>
        </el-col>
        <el-col :span="4">
          <div class="data_list"><span class="data_num">{{orderCount}}</span> 新增订单</div>
        </el-col>
        <el-col :span="4">
          <div class="data_list"><span class="data_num">{{adminCount}}</span> 新增管理员</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="data_list all_head"><span class="data_num head">总数据：</span> </div>
        </el-col>
        <el-col :span="4">
          <div class="data_list"><span class="data_num ">{{allOrderCount}}</span> 注册用户</div>
        </el-col>
        <el-col :span="4">
          <div class="data_list"><span class="data_num">{{allOrderCount}}</span> 订单</div>
        </el-col>
        <el-col :span="4">
          <div class="data_list"><span class="data_num">{{allAdminCount}}</span> 管理员</div>
        </el-col>
      </el-row>
    </section>
    <tendency :sevenDate="sevenDate" :sevenDay="sevenDay" style="margin-top: 30px"></tendency>
  </div>
</template>

<script>
  import tendency from '../components/tendency'
  import dtime from 'time-formater'
  import {userCount, orderCount, getUserCount, getOrderCount, adminDayCount, adminCount} from '../api/getData'
  import Message from 'element-ui'

  export default {
    data(){
      return {
        userCount:null,
        orderCount:null,
        adminCount: null,
        allUserCount: null,
        allOrderCount: null,
        allAdminCount: null,
        sevenDay:[],
        sevenDate: []
      }
    },
    components:{
      tendency
    },
    mounted(){
      this.initData()
      for (let i=6; i>-1; i--){
        const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
        this.sevenDay.push(date)
      }
      // console.log(this.sevenDay)
      this.getSevenData()
    },
    methods:{
      async initData(){
        var date = new Date()
        const today = dtime(date).format('YYYY-MM-DD')
        // console.log(today)
        Promise.all([userCount(today), orderCount(today), adminDayCount(today), getOrderCount(), getUserCount(),adminCount()]).then(res=>{
          // console.log(res)
          this.userCount = res[0].count;
          this.orderCount = res[1].count;
          this.adminCount = res[2].count;
          this.allUserCount = res[3].count;
          this.allOrderCount = res[4].count;
          this.allAdminCount = res[5].count;
        }).catch(err=>{
          Message({
            message: err
          })
        })
      },
      async getSevenData(){
        const apiArr = [[],[],[]]
        this.sevenDay.forEach(item=>{
          apiArr[0].push(userCount(item))
          apiArr[1].push(orderCount(item))
          apiArr[2].push(adminDayCount(item))
        })
        const promiseArr = [...apiArr[0],...apiArr[1], ...apiArr[2]]
        // console.log(promiseArr)
        Promise.all(promiseArr).then(res=>{
          const resArr = [[],[],[]]
          res.forEach((item,index)=>{
            if (item.status == 1){
              resArr[Math.floor(index/7)].push(item.count)
            }
          })
          // console.log(resArr)
          this.sevenDate = resArr
        }).catch(err=>{
          Message({
            message: err
          })
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .home-data{
    width: 100%;
    text-align: center;
    header{
      font-size: 28px;
      font-weight: bold;
      padding: 20px 0 30px 0;

    }
    .el-row{
      width: 100%;
      padding-left: 50px;
    }
    .data_list{
      margin-bottom: 10px;
      padding: 5px 0;
      background-color: #e5e9f2;
      border-radius: 5px;
      color: #667ab0;
      .data_num.head{
        color: #eee;
      }
      .data_num{
        font-size: 24px;
        font-weight: bold;
        color: #444;
      }
    }
    .data_list.today_head{
      font-size: 24px;
      background-color: #ff9800;
    }
    .data_list.all_head{
      font-size: 24px;
      background-color: #20a0ff;
    }
  }
</style>
