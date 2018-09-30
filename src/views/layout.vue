<template>
  <div class="fill-contain" style="border: 3px solid black">
    <el-row>
      <el-col :span="4" style=" background-color: #324057;border: 5px solid red;">
        <el-menu :default-active="defaultActive" router style="background-color: #324057">
          <el-menu-item index="home"><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i>数据管理</template>
            <el-menu-item index="userList">用户列表</el-menu-item>
            <el-menu-item index="shopList">商家列表</el-menu-item>
            <el-menu-item index="foodList">食品列表</el-menu-item>
            <el-menu-item index="orderList">订单列表</el-menu-item>
            <el-menu-item index="adminList">管理员列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
            <el-menu-item index="addShop">添加商铺</el-menu-item>
            <el-menu-item index="addGoods">添加商品</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-star-on"></i>图表</template>
            <el-menu-item index="userLocation">用户分布</el-menu-item>
            <el-menu-item index="chart1">chart1</el-menu-item>
            <el-menu-item index="chart2">chart2</el-menu-item>
            <el-menu-item index="chart3">chart3</el-menu-item>
            <el-menu-item index="chart4">chart4</el-menu-item>
            <el-menu-item index="chart5">chart5</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-edit"></i>编辑</template>
            <el-menu-item index="textEdit">文本编辑</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-setting"></i>设置</template>
            <el-menu-item index="adminSetting">管理员设置</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title"><i class="el-icon-warning"></i>说明</template>
            <el-menu-item index="explain">说明</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="min-height: 100%; background-color:#444;">
        <header>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item >
              <router-link :to="{path: ''}">首页</router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <el-dropdown @command="handleCommand" style="width: 50px; height: 50px;">
            <el-button type="primary" style="width: 100%">
              <img :src="baseImgPath + adminInfo.avatar" style="width: 100%"/>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="home">首页</el-dropdown-item>
              <el-dropdown-item command="signout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </header>
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {signout} from '../api/getData'
  import {baseImgPath} from '../config/env'
  import {mapState, mapActions} from 'vuex'

  import {Message} from 'element-ui'

  export default {
    name: 'home',
    data(){
      return {
        baseImgPath
      }
    },
    computed: {
      ...mapState(['adminInfo']),
      defaultActive () {
        return this.$route.path.replace('/', '')
      }
    },
    created(){
      if (!this.adminInfo.id){
        this.getAdminData()
      }
    },
    methods: {
      ...mapActions(['getAdminData']),
      async handleCommand(command) {
        // console.log(123)
        if (command == 'home'){
          this.$router.push('/home')
        } else if (command == 'signout'){
          const res = await signout()
          // console.log(res)
          if (res.status == 1){
            Message({
              type:'success',
              message: '退出成功'
            })
            this.$router.push('/')
          }else {
            Message({
              type:'error',
              message: res.message
            })
          }
        }
      }
    }
  }
</script>

<style lang="less">

</style>
