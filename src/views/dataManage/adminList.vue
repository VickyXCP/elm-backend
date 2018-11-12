<template>
  <div class="admin-page table-container">
    管理员列表
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="user_name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="注册日期">
      </el-table-column>
      <el-table-column
        prop="city"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="admin"
        label="权限">
      </el-table-column>
    </el-table>

    <el-pagination align='center' @current-change='handleCurrentChange' @size-change='handleSizeChange'
                   :current-page='currentPage' :page-sizes='pageSizes' :page-size='pageSize' :total='total'
                   layout='total, prev, next,pager, sizes, jumper'></el-pagination>
  </div>
</template>

<script>
import {adminCount, adminList} from '../../api/getData'

export default {
	name: 'adminList',
	data () {
		return {
			tableData: null,
			total: 0,
			offset: 0,
			currentPage: 1,
			pageSize: 10,
			pageSizes: [10, 20, 30, 40]
		}
	},
	created () {
		this.initData()
	},
	methods: {
		async initData () {
			try {
				const adminData = await adminCount();
				if (adminData.status == 1) {
					this.total = adminData.count
					this.getAdmins()
				} else {
					throw new Error('获取数据失败')
				}
			} catch (e) {
				console.log(e)
			}
		},
		async getAdmins () {
			try {
				const adminLists = await adminList({offset: this.offset, limit: this.pageSize})
				if (adminLists.status == 1) {
					this.tableData = adminLists.data
					console.log(this.tableData)
				} else {
					throw new Error('获取数据失败')
				}
			} catch (e) {
				console.log(e)
			}
		},
		handleCurrentChange (val) {
			this.currentPage = val
			this.offset = (val - 1) * this.pageSize
			this.getAdmins()
		},
		handleSizeChange (val) {
			this.pageSize = val
			this.getAdmins()
		}
	}
}
</script>

<style scoped>

</style>
