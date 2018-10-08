<template>
  <div class="user-page">
    用户列表
    <el-table :data="tableData">
      <el-table-column type="index" width="200"></el-table-column>
      <el-table-column prop="registe_time" label="注册日期" ></el-table-column>
      <el-table-column prop="username" label="用户姓名"></el-table-column>
      <el-table-column prop="city"  label="注册地址"></el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change = 'handleCurrentPage' :current-page="currentPage" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import {getUserList, getUserCount} from '../../api/getData'

  export default {
    name: 'userList',
    data(){
      return{
        tableData: null,
        currentRow: null,
        offset: 0,
        limit: 20,
        currentPage: 1,
        total: 0,
      }
    },
    created(){
      this.initData()
    },
    methods:{
      async initData(){
        try{
          const countData = await getUserCount()
          const users = await getUserList()
          // console.log(countData)
          if (countData.status == 1){
            this.total = countData.count
          }else {
            throw new Error('获取数据失败')
          }
          this.getUsers()
        }catch (e) {
          throw new Error('获取数据失败', e)
        }
      },
      async getUsers(){
        this.tableData = null
        const users = await getUserList({
          offset: this.offset,
          limit: this.limit
        })
        this.tableData = users
        console.log(this.tableData)
      },
      handleSizeChange(){},
    }
  }
</script>

<style scoped>

</style>
