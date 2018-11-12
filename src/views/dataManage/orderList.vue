<template>
  <div class="oeder-page table-container">
    订单列表
    <el-table
      :data="tableData"
      @expand-change='expand'
      :expand-row-keys='expandRow'
      :row-key='row => row.index'
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用户名">
              <span>{{ props.row.user_name }}</span>
            </el-form-item>
            <el-form-item label="店铺名称">
              <span>{{ props.row.restaurant_name }}</span>
            </el-form-item>
            <el-form-item label="收货地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.restaurant_id }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.restaurant_address }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="订单 ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="总价格"
        prop="total_amount">
      </el-table-column>
      <el-table-column
        label="订单状态"
        prop="status">
      </el-table-column>
    </el-table>
    <el-pagination align='center' @size-change='handleSizeChange' @current-change='handleCurrentChange'
                   :current-page='currentPage'
                   :page-size='pageSize' :page-sizes='pageSizes' :total='total'
                   layout='total, sizes, prev, pager, next, jumper'></el-pagination>
  </div>
</template>

<script>
import {getOrderList, getOrderCount, getResturantDetail, getUserInfo, getAddressById} from '../../api/getData'

export default {
	name: 'orderList',
	data () {
		return {
			tableData: null,
			restaurant_id: null,
			total: null,
			currentPage: 1,
			offset: 0,
			pageSize: 10,
			pageSizes: [10, 20, 30, 40],
			expandRow: []
		}
	},
	created () {
		this.restaurant_id = this.$route.query.restaurant_id
		this.initData()
	},
	methods: {
		async initData () {
			try {
				const countData = await getOrderCount({restaurant_id: this.restaurant_id})
				if (countData.status == 1) {
					this.total = countData.count
				} else {
					throw new Error('获取数据失败')
				}
				this.getOrders()
			} catch (e) {
				console.log(e)
			}
		},
		async getOrders () {
			const orders = await getOrderList({offset: this.offset, limit: this.pageSize, restaurant_id: this.restaurant_id})
			this.tableData = []
			orders.forEach((item, index) => {
				const tableData = {}
				tableData.id = item.id
				tableData.total_amount = item.total_amount
				tableData.status = item.status_bar.title
				tableData.user_id = item.user_id
				tableData.restaurant_id = item.restaurant_id
				tableData.address_id = item.address_id
				tableData.index = index
				this.tableData.push(tableData)
			})
		},
		async expand (row, status) {
			if (status.length > 0) {
				const restaurant = await getResturantDetail(row.restaurant_id)
				const userInfo = await getUserInfo(row.user_id)
				const addressInfo = await getAddressById(row.address_id)

				/*
        * 回忆splice的三种用法： 插入， 删除， 修改
        * splice()方法通过删除现有元素和/或添加新元素来修改数组,并以数组返回原数组中被修改的内容
        * array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
        * start​指定修改的开始位置（从0计数）。如果超出了数组的长度，则从数组末尾开始添加内容；
        * 如果是负值，则表示从数组末位开始的第几位（从-1计数）；如果负数的绝对值大于数组的长度，
        * 则表示开始位置为第0位。
        * deleteCount 可选整数，表示要移除的数组元素的个数。
        * 如果 deleteCount 是 0或者负数，则不移除元素。这种情况下，至少应添加一个新元素。
        * 如果 deleteCount 大于start 之后的元素的总数，则从 start 后面的元素都将被删除（含第
        * start 位）。如果deleteCount被省略，则其相当于(arr.length - start)
        * item1, item2, ... 可选要添加进数组的元素,从start 位置开始。如果不指定，则 splice()
        * 将只删除数组元素。
        * */

				this.tableData.splice(row.index, 1, {
					...row, ...{
						restaurant_name: restaurant.name,
						restaurant_address: restaurant.address,
						address: addressInfo.address,
						user_name: userInfo.username
					}
				})
				this.$nextTick(() => {
					this.expandRow = [row.index]
				})
			} else {
				this.expandRow = []
			}
		},
		handleSizeChange (val) {
			this.pageSize = val
			this.getOrders()
		},
		handleCurrentChange (val) {
			this.currentPage = val
			this.offset = (val - 1) * this.pageSize
			this.getOrders()
		}
	}
}
</script>

<style lang='less'>
  .el-table__expanded-cell {
    width: 100%;
    background-color: #fbfdff;
    .demo-table-expand {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      label {
        width: 80px;
        color: #99bbe1;
      }
      .el-form-item {
        width: 50%;
        margin: 0;
        padding: 0;
      }
    }
  }

</style>
