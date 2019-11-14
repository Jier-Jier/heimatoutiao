<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <img src="../../assets/imgs/logo_index.png" alt />
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <!-- 手机号输入  👇 -->
        <el-form-item prop="mobile">
          <el-input v-model="ruleForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码输入  👇 -->
        <el-form-item prop="code">
          <el-input v-model="ruleForm.code" style="width:280px" placeholder="请输入验证码"></el-input>
          <el-button plain style="float:right">发送验证码</el-button>
        </el-form-item>

        <!-- 用户协议  👇 -->
        <el-form-item prop="checked">
          <el-checkbox v-model="ruleForm.checked">是否同意用户协议</el-checkbox>
        </el-form-item>
        <!-- 登录按钮  👇 -->
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // let validator = function (rule, value, callBack) {
    //   // rule当前规则
    //   // value当前表单项的值
    //   // callback 回调函数
    //   // 正常写法
    //   //   if (value) {
    //   //     // 正确 勾选了协议
    //   //     callBack() // 一切OK请继续
    //   //   } else {
    //   //     // 不对 没勾选协议
    //   //     callBack(new Error('您必须同意无条件被我们蒙骗'))
    //   //   }
    //   value ? callBack() : callBack(new Error('您必须同意无条件被我们蒙骗')) // 炫技模式
    // }
    return {
      ruleForm: {
        mobile: '',
        checked: '',
        code: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '输入正确手机号' }
        ],
        checked: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('您需要勾选用户协议'))
          }
        } }],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('登录成功！！！')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  background: url("../../assets/imgs/login_bg.jpg") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    // flex: 1;
    margin: 0 auto;
    width: 450px;
    height: 350px;
    background-color: #fff;
    .clearfix {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        // text-align: center;
        height: 45px;
      }
    }
  }
}
</style>
