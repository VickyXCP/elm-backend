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
          <el-button size='mini' type='success' @click='onAddFood'>添加食品</el-button>
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

    <el-dialog title="修改店铺信息" :visible.sync="dialogFormVisible">
      <el-form :model="editForm">
        <el-form-item label="店铺名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-autocomplete
            v-model="editForm.address"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
          <!--<el-input v-model="editForm.address" autocomplete="off"></el-input>-->
          <label>当前城市：{{editForm.city}}</label>
        </el-form-item>
        <el-form-item label="店铺介绍" :label-width="formLabelWidth">
          <el-input v-model="editForm.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="editForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类" :label-width="formLabelWidth">
          <el-cascader
            expand-trigger="hover"
            :options="categoryOptions"
            v-model="editForm.category"
            change-on-select>
          </el-cascader>
        </el-form-item>
        <el-form-item label="店铺图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :action="baseUrl + '/v1/addimg/shop'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="editForm.image_path" :src="baseImgPath + editForm.image_path" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onEdit">确 定</el-button>
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
			formLabelWidth: '120',
			dialogFormVisible: false,
			editForm: {
				name: '',
				address: '',
				city: '',
				description: '',
				phone: '',
				category: '',
				image_path: '',
        id: ''
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
		},
		async getCategory () {
			try {
				const categories = await foodCategory()
				this.categoryOptions = []
				categories.forEach(item => {
					if (item.sub_categories.length) {
						const addNew = {
							value: item.name,
							label: item.name,
							children: []
						}
						item.sub_categories.forEach((subitem, index) => {
							if (index == 0) {
								return false
							} else {
								addNew.children.push({
									value: subitem.name,
									label: subitem.name
								})
							}
						})
						this.categoryOptions.push(addNew)
					} else {
						this.categoryOptions.push(item.name)
					}
				})
			} catch (e) {
				console.log(e)
			}
		},
		beforeEdit (scope) {
			this.dialogFormVisible = true
			this.editForm.name = scope.row.name
			this.editForm.address = scope.row.address
			this.editForm.city = this.city.name
			this.editForm.description = scope.row.description
			this.editForm.phone = scope.row.phone
			this.editForm.category = scope.row.category.split('/')
			this.editForm.image_path = scope.row.image_path
      this.editForm.id = scope.row.id
			if (!this.categoryOptions.length) {
				this.getCategory()
			}
		},
		async onEdit () {
			this.dialogFormVisible = false
      const res = await updateResturant(this.editForm)
      console.log(res)
		},
    async onDelete(id){
			const res = await deleteResturant({restaurant_id:id})
      console.log(res)
    },
    onAddFood(){
      this.$router.push('/addGoods')
    },
    async querySearchAsync(queryString, cb){
			if (queryString){
				try{
					const cityList = await searchplace(this.city.id, queryString)
          if (cityList instanceof Array) {
          	cityList.map(item=>{
          		item.value = item.address
              return item
            })
            cb(cityList)
          }
        }catch (e) {
          console.log(e)
				}
      }
    },
		handleSizeChange (val) {
			this.limit = val
			this.getResturants()
		},
		handleCurrentChange (val) {
			this.currentPage = val
			this.offset = (val - 1) * this.limit
			this.getResturants()
		},
		beforeAvatarUpload (file) {
			const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png')
			const isLt2M = file.size / 1024 / 1024 < 2
      if (!isRightType){
      	this.$message.error('上传图片的格式不正确！')
      }
      if (!isLt2M){
      	this.$message.error('上传图片的大小不能超过2MB！')
      }
      return isRightType&&isLt2M
		},
		handleAvatarSuccess (res) {
      if (res.status ===1){
      	this.editForm.image_path = res.image_path
      } else {
      	this.$message('上传图片失败！')
      }
		},
		handleSelect(value){
			const address = value.address
      this.editForm.address = address
    }
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
