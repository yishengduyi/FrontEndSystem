<!--<template>-->
<!--  <div class="loginbody">-->
<!--    &lt;!&ndash; <h1>登录页</h1> &ndash;&gt;-->
<!--    <el-form ref="form" :model="form" :rules="rules" class="login-box">-->
<!--      <h3 class="login-title">DNS隐秘隧道检测登录界面</h3>-->
<!--      <el-form-item  label="账号" prop="name" class="redItem">-->
<!--        <el-input type="text" placeholder="请输入账号" v-model="form.name" @keyup.enter.native="submitForm('form')"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item  label="密码" prop="password">-->
<!--        <el-input type="password" placeholder="请输入密码" v-model="form.password" @keyup.enter.native="submitForm('form')"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        &lt;!&ndash; onSubmit &ndash;&gt;-->
<!--        <div class="butt">-->
<!--        <el-button type="primary" @click="submitForm('form')">登录</el-button>-->
<!--        </div>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'Login',-->
<!--  data(){-->
<!--    return{-->
<!--      form: {-->
<!--        name: "",-->
<!--        password: '',-->
<!--      },-->
<!--      rules: {-->
<!--        name: [-->
<!--          { required: true, message: '请输入账号', trigger: 'blur' },-->
<!--        ],-->
<!--        password: [-->
<!--          { required: true, message: '请输入密码', trigger: 'blur' },-->
<!--        ]-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    submitForm(formName) {-->
<!--      this.$refs[formName].validate((valid) => {-->
<!--        if (valid) {-->
<!--          // 假设仅通过用户名进行验证，无需密码-->
<!--          this.$message({-->
<!--            message: '登录成功',-->
<!--            type: 'success'-->
<!--          });-->
<!--          sessionStorage.setItem('isLogin', 'true');-->
<!--          this.$store.dispatch("asyncUpdateUser", {name: this.form.name});-->
<!--          this.$router.push({name: 'DetectWebshell', params: {name: this.form.name}});-->
<!--          window.sessionStorage.setItem('account', this.form.name);-->
<!--          console.log(sessionStorage.getItem('account'));-->
<!--        } else {-->
<!--          this.$message({-->
<!--            message: '验证失败，请输入正确的用户名',-->
<!--            type: 'warning'-->
<!--          });-->
<!--          return false;-->
<!--        }-->
<!--      });-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<template>
  <div class="loginbody">
    <el-form ref="form" :model="form" :rules="rules" class="login-box">
      <h3 class="login-title">DNS隐秘隧道检测登录界面</h3>
      <el-form-item label="账号" prop="name" class="redItem">
        <el-input type="text" placeholder="请输入账号" v-model="form.name" @keyup.enter.native="submitForm('form')"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password" @keyup.enter.native="submitForm('form')"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="butt">
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        name: "",
        password: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const loginData = {
            username: this.form.name,
            password: this.form.password,
          };

          // 调试输出
          console.log("username=", loginData.username);
          console.log("password=", loginData.password);
          console.log("请求体:", loginData);

          axios.post('http://172.31.171.113:48888/api/v1/login/access-token', qs.stringify(loginData), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(response => {
              console.log("Response:", response);
              if (response.data.code === 200) {
                this.$message({
                  message: '登录成功',
                  type: 'success'
                });

                sessionStorage.setItem('isLogin', 'true');
                sessionStorage.setItem('account', this.form.name);
                sessionStorage.setItem('token', response.data.data.token);

                this.$store.dispatch("asyncUpdateUser", { name: this.form.name });

                this.$router.push({ name: 'DetectWebshell' });
              } else {
                this.$message({
                  message: '验证失败，请输入正确的用户名和密码',
                  type: 'warning'
                });
              }
            })
            .catch(error => {
              console.error(error);
              this.$message({
                message: '登录失败，请稍后再试',
                type: 'error'
              });
            });
        } else {
          this.$message({
            message: '验证失败，请输入正确的用户名和密码',
            type: 'warning'
          });
        }
      });
    }
  }
}
</script>

<style lang="" scoped>
.loginbody {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background-image: url("../assets/img/pexels-horst-joachims-282933937-19212199.jpg");
  background-size: 100% 100%;
  background-position: center;
  /* background-attachment:fixed; *
  /* overflow: auto; */
  background-repeat: no-repeat;
  position: fixed;
  line-height: 100%;
  padding-top: 150px;
  margin: -1px auto;
}
  .login-box{
    width: 350px;
    margin: 150px auto;
    border: 0;
    /* 1px solid #DCDFE6; */
    padding: 20px;
    border-radius: 0;
    box-shadow: 0 0 0 #000000;
  }
  .login-title{
    text-align: center;
    margin-bottom: 20px;
    line-height: 50px;
    font-size: 30px;
    font-weight: bolder;
    color: white;
    text-shadow: 2px 2px 4px #000000;
  }
  .butt {
  margin-top: 10px;
  text-align: center;
}

</style>
