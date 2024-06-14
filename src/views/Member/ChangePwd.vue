<template>
  <div>
    <el-form label-width="80px" :model="form" ref="form">
      <el-form-item label="旧密码" prop="oldpwd">
        <el-input type="password" v-model="form.oldpwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpwd">
        <el-input type="password" v-model="form.newpwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default{
    name: "ChangePwd",
    data() {
      return {
        // labelPosition: 'right',
        form: {
          account: window.sessionStorage.getItem('account'),
          oldpwd: '',
          newpwd: '',
        }
      };
    },
    methods: {
      submitForm(formName) {
        console.log(this.account);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.postData();
          } else {
            return false;
          }
        });
      },
      postData: function(){
        this.$http.post('/changePwd', {userInfo:this.form})
        .then((repos)=>{
          console.log(repos);
          if(repos.data == 'update password success'){
            this.$message({
              showClose: true,
              message: '修改完成',
              type: 'success'
            })
          }
          else{
            this.$message({
              showClose: true,
              message: '旧密码不匹配',
              type: 'warning'
            })
          }
        })
        .catch((error)=>{
          console.log(error);
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>

</style>