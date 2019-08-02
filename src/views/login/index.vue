<template>
  <div class="container">
    <el-card class="my-card">
      <!-- 登录的logo -->
      <img src="../../../public/images/logo_index.png" />
      <!-- form 表单组件 -->
      <!-- 绑定rules 校验规则 -->
      <el-form :model="login" :rules="loginRules" status-icon ref="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="login.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="login.code" placeholder="请输入验证码" style="width:260px;margin-right:7px"></el-input>
          <el-button>获取验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="loginUse">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 自定义校验
    const checkModile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}/.test(value)) callback(new Error('手机格式不正确'))
      callback()
    }
    return {
      login: {
        mobile: '17635072901',
        code: '246810'
      },
      // 校验规则对象
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkModile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击登录 开启验证
    loginUse () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.login).then(({ data }) => {
            // console.log(data)
            this.$router.push('/')
          }).catch(() => {
            this.$message.error('手机号或验证码错误')
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("../../../public/images/login_bg.jpg") no-repeat center /
    cover;
  .my-card {
    width: 420px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto 30px;
    }
  }
}
</style>
