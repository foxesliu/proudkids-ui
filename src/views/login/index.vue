﻿<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm"
             :rules="loginRules" ref="loginForm"
             label-position="left"
             label-width="0px"
             class="card-box login-form">
      <h3 class="title">Proud Kids - CE</h3>
      <el-tabs v-model="activeName">
        <el-tab-pane name="first">
          <el-form-item prop="username">
            <span class="svg-container svg-container_login">
              <svg-icon icon-class="user"/>
            </span>
            <el-input name="username" type="text" v-if="isEnglish==false"
                      v-model="loginForm.username"
                      autoComplete="on"
                      placeholder="用户名"/>
            <el-input name="username" type="text" v-if="isEnglish==true"
                      v-model="loginForm.username"
                      autoComplete="on"
                      placeholder="User ID"/>
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password"></svg-icon>
            </span>
            <el-input name="password" :type="pwdType" v-if="isEnglish==false"
                      @keyup.enter.native="handleLogin"
                      v-model="loginForm.password"
                      autoComplete="on"
                      placeholder="密码"></el-input>
            <el-input name="password" :type="pwdType" v-if="isEnglish==true"
                      @keyup.enter.native="handleLogin"
                      v-model="loginForm.password"
                      autoComplete="on"
                      placeholder="Password"></el-input>
            <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye"/></span>
          </el-form-item>

          <input name="randomStr" type="hidden" v-model="loginForm.randomStr"/>
          <el-form-item>
            <el-col :span="2">
              <span class="svg-container">
                <svg-icon icon-class="code"/>
              </span>
            </el-col>
            <el-col :span="11">
              <el-input name="code" type="text" v-if="isEnglish==false"
                        v-model="loginForm.code"
                        autoComplete="on" placeholder="验证码"/>
              <el-input name="code" type="text" v-if="isEnglish==true"
                        v-model="loginForm.code"
                        autoComplete="on" placeholder="Code"/>
            </el-col>
            <el-col :span="10" align="right" style="height: 48px">
              <img class="freshCode" :src="src" @click="refreshCode"/>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="width:100%;" v-if="isEnglish==false"
                       :loading="loading"
                       @click.native.prevent="handleLogin">登录
            </el-button>
            <el-button type="primary" style="width:100%;" v-if="isEnglish==true"
                       :loading="loading"
                       @click.native.prevent="handleLogin">Login
            </el-button>
          </el-form-item>
        </el-tab-pane>
        <!--<el-tab-pane label="短信登录" name="second">-->
        <!--<el-form-item prop="mobile">-->
        <!--<span class="svg-container svg-container_login">-->
        <!--<svg-icon icon-class="mobile"/>-->
        <!--</span>-->
        <!--<el-input name="mobile" type="text"-->
        <!--v-model="loginForm.mobile"-->
        <!--autoComplete="on"-->
        <!--placeholder="手机号"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
        <!--<el-col :span="2">-->
        <!--<span class="svg-container">-->
        <!--<svg-icon icon-class="code"/>-->
        <!--</span>-->
        <!--</el-col>-->
        <!--<el-col :span="11">-->
        <!--<el-input name="smsCode" type="text" v-model="loginForm.smsCode" autoComplete="on" placeholder="验证码"/>-->
        <!--</el-col>-->
        <!--<el-col :span="10" align="right">-->
        <!--<a @click="getMobileCode">{{text}}</a>-->
        <!--</el-col>-->
        <!--</el-form-item>-->

        <!--<el-form-item>-->
        <!--<el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleMobileLogin">-->
        <!--登录-->
        <!--</el-button>-->
        <!--</el-form-item>-->
        <!--</el-tab-pane>-->
        <!--<el-tab-pane label="社交登录" name="three">-->
        <!--<el-row>-->
        <!--<el-col :span="8">-->
        <!--<el-card :body-style="{ padding: '0px' }">-->
        <!--<svg-icon icon-class="qq"></svg-icon>-->
        <!--<div style="padding: 14px;">-->
        <!--<a href="http://dsb.frps.shop/social/qq">QQ登录</a>-->
        <!--</div>-->
        <!--</el-card>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <!--</el-tab-pane>-->
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
  // import { isvalidUsername } from '@/utils/validate'
  import request from '@/utils/request'
  import ElRow from "element-ui/packages/row/src/row";
  import {sfTools} from '../aom/util.js';

  export default {
    components: {ElRow},
    name: 'login',
    data() {
      const validatePass = (rule, value, callback) => {
        if (!value || value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      return {
        time: 60,
        timeFlag: false,
        activeName: 'first',
        src: '',
        loginForm: {
          username: null,
          password: null,
          code: '',
          randomStr: Math.ceil(Math.random() * 100000) + '_' + Date.now(),
          mobile: null,
          smsCode: ''
        },
        loginRules: {
          username: [{required: true, trigger: 'blur'}],
          password: [{required: true, trigger: 'blur', validator: validatePass}],
          code: [{required: true, trigger: 'blur'}],
        },
        loading: false,
        pwdType: 'password',
        isEnglish: false
      }
    },
    methods: {
      refreshCode: function () {
        this.loginForm.randomStr = Math.ceil(Math.random() * 100000) + Date.now()
        this.src = '/admin/code/' + this.loginForm.randomStr
      },
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({path: '/'})
            }).catch(() => {
              this.loading = false
              this.refreshCode()
            })
          } else {
            console.log('想搞事情？？')
            return false
          }
        })
      },
      handleMobileLogin() {
        this.loading = true
        if (!this.loginForm.smsCode || this.loginForm.smsCode.length !== 4) {
          this.$message.error('验证码不合法')
        }
        this.$store.dispatch('MobileLogin', this.loginForm).then(() => {
          this.loading = false
          this.$router.push({path: '/'})
        }).catch(() => {
          this.loading = false
        })
      },
      getMobileCode: function () {
        if (!this.loginForm.mobile) {
          this.$message.error('请输入手机号码')
        } else if (!(/^1[34578]\d{9}$/.test(this.loginForm.mobile))) {
          this.$message.error('手机号格式不正确')
        } else {
          request({
            url: '/admin/smsCode/' + this.loginForm.mobile,
            method: 'get'
          }).then(response => {
            if (response.data) {
              this.timer()
              this.$message.success('验证码发送成功')
            } else {
              this.$message.error('验证码发送失败')
            }
          })
        }
      },
      timer: function () {
        if (this.time > 0) {
          this.timeFlag = true
          this.time--
          setTimeout(this.timer, 1000)
        } else {
          this.timeFlag = false
        }
      }
    },
    computed: {
      text: function () {
        if (this.timeFlag === false) {
          return '获取验证码'
        } else {
          return this.time > 0 ? this.time + 's' : '重新获取'
        }
      }
    },
    created() {
      var str = '1223343sd18:30-18:5518:30-18:5518:30-18:5519:00-19:25, 19:30-19:5519:30-19:5519:30-19:5519:30-19:5519:30-19:55, 20:00-20:25fs111dfgwernsdfn,az13..sf';
      console.log(sfTools.classTimesToSouthAfrica(str));
      this.src = '/admin/code/' + this.loginForm.randomStr
      var params = this.$route.query
      var access_token = params.access_token
      var refresh_token = params.refresh_token
      console.log(access_token)
      console.log(refresh_token)
      if (access_token !== undefined && refresh_token !== undefined) {
        console.log('执行到1')
        this.$store.dispatch('SocialLogin', params).then(() => {
          console.log('执行到2')
          this.loading = false
          this.$router.push({path: '/'})
        }).catch(() => {
          this.loading = false
        })
      }
      if (navigator.language.toLowerCase() === 'zh-cn') {
        this.isEnglish = false;
      } else {
        this.isEnglish = true;
      }
      console.log(this.isEnglish)
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss">
  @import "src/styles/mixin.scss";

  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    @include relative;
    height: 100vh;
    .el-tabs__item {
      color: #fff;
    }
    .el-tabs__item.is-active {
      color: #409EFF;
    }
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 0 5px 0 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      line-height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }

  .right {
    height: 48px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .freshCode {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
</style>
