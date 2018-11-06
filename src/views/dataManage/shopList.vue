<template>
  <div class='shop-page'>
    商家列表
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="店铺名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="店铺介绍">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="评分">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="销量">
              <span>{{ props.row["recent_order_num"] }}</span>
            </el-form-item>
            <el-form-item label="分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="店铺名称"
        prop="name" align='center' width='120'>
      </el-table-column>
      <el-table-column
        label="店铺地址"
        prop="address" align='center'>
      </el-table-column>
      <el-table-column
        label="店铺介绍"
        prop="description" align='center'>
      </el-table-column>
      <el-table-column
        label="操作" width='240' align='center'>
        <template slot-scope='scope'>
          <el-button size='mini' @click='beforeEdit(scope)'>编辑</el-button>
          <el-button size='mini' type='success'>添加食品</el-button>
          <el-button size='mini' type='danger'>删除</el-button>
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

    <el-dialog title="修改店铺信息" :visible.sync="editForm.dialogFormVisible">
      <el-form :model="editForm">
        <el-form-item label="店铺名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="editForm.address" autocomplete="off"></el-input>
          <label>当前城市：{{editForm.city}}</label>
        </el-form-item>
        <el-form-item label="店铺介绍" :label-width="formLabelWidth">
          <el-input v-model="editForm.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="editForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类" :label-width="formLabelWidth">
          <el-select v-model="editForm.category" :value='editForm.category'>
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="店铺图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="editForm.imgUrl" :src="editForm.imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {baseUrl, baseImgPath} from '../../config/env'
import {
	cityGuess,
	getResturants,
	getResturantsCount,
	foodCategory,
	updateResturant,
	searchplace,
	deleteResturant
} from '../../api/getData'

export default {
	data () {
		return {
			baseImgPath,
			baseUrl,
			city: {},
			offset: 0,
			limit: 10,
			total: 0,
			currentPage: 1,
			pageSizes: [10, 20, 30, 40],
			tableData: null,
      categoryOptions: [],
			formLabelWidth: 120,
      editForm:{
				dialogFormVisible: false,
        name:'',
        address: '',
        city: '',
        description: '',
        phone: '',
        category: '',
        imgUrl: ''
      }
		}
	},
	created () {
		this.initData()
	},
	methods: {
		async initData () {
			try {
				this.city = await cityGuess()
				const countData = await getResturantsCount()
				if (countData.status === 1) {
					this.total = countData.count
				} else {
					throw new Error('获取数据失败')
				}
				this.getResturants()
			} catch (e) {
				console.log('获取数据失败', err)
			}
		},
		async getResturants () {
			const {latitude, longitude} = this.city
			const restaurants = await getResturants({latitude, longitude, offset: this.offset, limit: this.limit})
			this.tableData = null
			this.tableData = restaurants
			console.log(this.tableData)
		},
    async getCategory(){
			try{
				const categories = await foodCategory()
				console.log(categories)
        this.categoryOptions = []
        categories.forEach(item=>{
        	if (item.sub_categories.length) {
        		const addNew = {
        			value: item.name,
              label: item.name,
              children: []
            }
            item.sub_categories.forEach((subitem, index)=>{
            	if (index === 0){
            		console.log(subitem)
            		return false
              } else {
            		addNew.children.push({
                  value: subitem.name,
                  label: subitem.name
                })
              }
              this.categoryOptions.push(addNew)
            })
          } else {
		        this.categoryOptions.push(item.name)
	        }
        })
				console.log(this.categoryOptions)
			}catch (e) {
        console.log(e)
			}
    },
		beforeEdit(scope){
			console.log(scope)
      if (!this.categoryOptions.length){
      	this.getCategory()
      }
    },
		handleSizeChange(val){
			this.limit = val
      this.getResturants()
    },
		handleCurrentChange(val){
			this.currentPage = val
      this.offset = (val - 1)*this.limit
      this.getResturants()
    },
		beforeAvatarUpload(){},
		handleAvatarSuccess(){},

	}
}
</script>

<style lang='less'>
  @import "../../assets/css/mixin";

  .shop-page {
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
