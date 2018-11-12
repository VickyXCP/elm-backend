<template>
  <div class="login-page">
    <transition name="form-fade" mode="in-out">
      <section class="form-container" v-show="showLogin">
        <div class="title">
          elm后台管理系统
        </div>
        <el-form :model="loginForm" ref="loginForm" :rules="loginRules">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type='password' v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" style="width: 100%">登录</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
import {login, getAdminInfo} from '../api/getData'
import {mapState, mapActions} from 'vuex'
import {Message} from 'element-ui'

export default {
	name: 'login',
	data () {
		return {
			loginForm: {
				username: '',
				password: ''
			},
			loginRules: {
				username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
				password: [{required: true, message: '请输入密码', trigger: 'blur'}]
			},
			showLogin: false
		}
	},
	computed: {
		...mapState(['adminInfo'])
	},
	mounted () {
		this.showLogin = true
		if (this.adminInfo.id) {
			this.getAdminData()
		}
	},
	methods: {
		...mapActions(['getAdminData']),
		submitForm (formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					const res = login({user_name: this.loginForm.username, password: this.loginForm.password})
					// console.log(res)
					// console.log(res.__proto__)
					// console.log(res.[[PromiseValue]])
					// if (res.status == 1){
					if (res) {
						Message({
							type: 'success',
							message: '登录成功'
						})
						this.$router.push('/home')
					} else {
						Message({
							type: 'error',
							message: res.message
						})
					}
				} else {
					this.$notify.error({
						title: '错误',
						message: '请输入正确的用户民密码',
						offset: 100
					})
					return false
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
  @import "../assets/css/mixin";

  .login-page {
    width: 100%;
    height: 100%;
    background-color: #324057;
  }

  .title {
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
    font-size: 34px;
    color: #fff;
  }

  .form-container {
    .wh(320px, 160px);
    .ctp(320px, 210px);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    .submit_btn {
      width: 100%;
      font-size: 16px;
    }
  }

  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }

  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
</style>
