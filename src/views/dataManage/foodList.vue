<template>
  <div class="food-page">
    食品列表
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="食品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="餐馆名称">
              <span>{{ props.row.restaurant_name }}</span>
            </el-form-item>
            <el-form-item label="食品ID">
              <span>{{ props.row.item_id }}</span>
            </el-form-item>
            <el-form-item label="餐馆ID">
              <span>{{ props.row.restaurant_id }}</span>
            </el-form-item>
            <el-form-item label="食品介绍">
              <span>{{ props.row.decsription }}</span>
            </el-form-item>
            <el-form-item label="餐馆地址">
              <span>{{ props.row.restaurant_address }}</span>
            </el-form-item>
            <el-form-item label="食品评分">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="食品分类">
              <span>{{ props.row.category_name }}</span>
            </el-form-item>
            <el-form-item label="月销量">
              <span>{{ props.row.month_sales }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="食品名称"
        prop="name" align='center' width='120'>
      </el-table-column>
      <el-table-column
        label="食品介绍"
        prop="description" align='center'>
      </el-table-column>
      <el-table-column
        label="评分"
        prop="rating" align='center'>
      </el-table-column>
      <el-table-column
        label="操作" width='240' align='center'>
        <template slot-scope='scope'>
          <el-button size='mini' @click='beforeEdit(scope)'>编辑</el-button>
          <el-button size='mini' type='danger' @click='onDelete(scope.row.id)'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background align='center' style='margin-top: 20px'
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {baseUrl, baseImgPath} from '../../config/env'
import {
	getFoods,
	getFoodsCount,
	getMenu,
	updateFood,
	deleteFood,
	getResturantDetail,
	getMenuById
} from '../../api/getData'

export default {
	name: 'foodList',
	data () {
		return {
			restaurant_id: '',
			tableData: null,
			total: 0,
			offset: 0,
			limit: 10,
			currentPage: 1,
			pageSizes: [10, 20, 30, 40]
		}
	},
	created () {
		this.restaurant_id = this.$route.query.restaurant_id
		this.initData()
	},
	methods: {
		async initData () {
			try {
				const res = await getFoodsCount()
				if (res.status == 1) {
					this.total = res.count
				} else {
					throw new Error('获取数据失败')
				}
				this.getFoods()
			} catch (e) {
				console.log(e)
			}
		},
		async getFoods () {
			try {
				const resData = await getFoods({offset: this.offset, limit: this.limit, restaurant_id: this.restaurant_id})
				this.tableData = resData
        console.log(this.tableData)
			} catch (e) {
				console.log(e)
			}
		},
		handleSizeChange (val) {
			this.limit = val
			this.getFoods()
		},
		handleCurrentChange (val) {
			this.currentPage = val
			this.offset = (val - 1) * this.limit
			this.getFoods()
		},
	}
}
</script>

<style lang='less'>
  @import "../../assets/css/mixin";

  .food-page {
    margin: 20px;
    box-sizing: border-box;
  }

  .el-table {
    border: 1px solid #ccc;
    th {
      background-color: #eef1f6;
      color: #666;
    }
  }

  .el-table__expanded-cell {
    width: 100%;
    background-color: #fbfdff;
    .demo-table-expand label {
      width: 80px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin: 0;
      width: 50%;
    }
  }
</style>
