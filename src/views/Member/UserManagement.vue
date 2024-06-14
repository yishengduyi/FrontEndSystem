<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="3">
        <el-card> 
          <el-button type="primary" @click="dialogAddUserVisible = true">添加用户</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-table :data="tableData" stripe="true">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="id" label="用户id"></el-table-column>
      <el-table-column prop="username" label="用户昵称"></el-table-column>
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
        <el-button @click="editUser(scope.row)" type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
    
    <!-- 添加用户表单 -->
  <el-dialog title="添加用户" :visible.sync="dialogAddUserVisible">
  <el-form :model="addUserForm">
    <el-form-item label="用户id" :label-width="formLabelWidth">
      <el-input v-model="addUserForm.id" autocomplete="off" placeholder="不可与已存在用户id重复"></el-input>
    </el-form-item>
    <el-form-item label="用户昵称" :label-width="formLabelWidth">
      <el-input v-model="addUserForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="账号" :label-width="formLabelWidth">
      <el-input v-model="addUserForm.account" autocomplete="off" placeholder="不可与已存在用户账号重复"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="addUserForm.password" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogAddUserVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </div>
</el-dialog>
<!-- 编辑用户表单 -->
  <el-dialog title="编辑用户" :visible.sync="dialogEditUserVisible">
  <el-form :model="editUserForm">
    <el-form-item label="用户id" :label-width="formLabelWidth">
      <el-input v-model="editUserForm.id" autocomplete="off" :disabled='true' placeholder="不可与已存在用户id重复"></el-input>
    </el-form-item>
    <el-form-item label="账号" :label-width="formLabelWidth">
      <el-input v-model="editUserForm.account" autocomplete="off" :disabled='true' placeholder="不可与已存在账号重复"></el-input>
    </el-form-item>
    <el-form-item label="用户昵称" :label-width="formLabelWidth">
      <el-input v-model="editUserForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="旧密码" :label-width="formLabelWidth">
      <el-input v-model="editUserForm.oldPassword" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="新密码" :label-width="formLabelWidth">
      <el-input v-model="editUserForm.newPassword" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogEditUserVisible = false">取 消</el-button>
    <el-button type="primary" @click="editSumit">确 定</el-button>
  </div>
</el-dialog>

  </div>
  

</template>

<script>
export default {
  name: 'UserManagement',
  data(){
    return {
      tableData:[
        {
          id: 0,
          username: '',
          account: ''
        }
      ],
      dialogAddUserVisible : false,
      dialogEditUserVisible : false,
      addUserForm :{
        id : '',
        username : '',
        account : '',
        password : ''
      },
      editUserForm :{
        id : '',
        username : '',
        account : '',
        oldPassword : '',
        newPassword : ''
      }
    }
  },
  methods:{
    getAccountData: function () {
      this.$http.get('/accountData')
        .then((repos) => {
          console.log(repos)
          let data = repos.data['data']
          this.tableData = []
          let id = 0
          for (let item of data){
            let tableData = {}
            id++
            tableData.id = id
            tableData.username = item['username']
            tableData.account = item['account']
            this.tableData.push(tableData)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addUser: function () {
      if(!this.addUserForm.id){
              this.$message({
                  message: '请输入用户id，不可与已存在的用户id重复',
                  type: 'warning'
              });
              return;
          };
      if(!this.addUserForm.username){
                this.$message({
                    message: '请输入用户昵称',
                    type: 'warning'
                });
                return;
            };
      if(!this.addUserForm.account){
                this.$message({
                    message: '请输入账号，不可与已存在的账号重复',
                    type: 'warning'
                });
                return;
            };
      if(!this.addUserForm.password){
                this.$message({
                    message: '请输入用户密码',
                    type: 'warning'
                });
                return;
            };
      this.dialogAddUserVisible = false
      this.$http.post('/addUser',{addUserInfo:this.addUserForm})
        .then((repos) => {
          console.log(repos)
          let data = repos.data
          if(data == 'add user success')
             {
            this.$message({
            showClose: true,
            message: '添加用户成功',
            type: 'success'
            })
            this.getAccountData()
          }else{
             this.$message.error('添加用户失败！')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    
    },
     deleteUser: function (row) {
      this.$http.post('/deleteUser',{account:row.account})
        .then((repos) => {
          console.log(repos)
          let data = repos.data
          if(data == 'delete user success')
          {
            this.$message({
            showClose: true,
            message: '已删除用户',
            type: 'success'
            })
            this.getAccountData()
          }else{
             this.$message.error('删除用户失败！')
          }
            
        })
        .catch((error) => {
          console.log(error)
        })
    },
     editUser: function (row) {
       this.dialogEditUserVisible = true
       this.editUserForm = Object.assign({}, row)
    },
     editSumit: function(){
       if(!this.editUserForm.id){
              this.$message({
                  message: '请输入用户id，不可与已存在的用户id重复',
                  type: 'warning'
              });
              return;
          };
      if(!this.editUserForm.username){
                this.$message({
                    message: '请输入用户昵称',
                    type: 'warning'
                });
                return;
            };
      if(!this.editUserForm.account){
                this.$message({
                    message: '请输入账号，不可与已存在的账号重复',
                    type: 'warning'
                });
                return;
            };
      if(!this.editUserForm.oldPassword){
                this.$message({
                    message: '请输入旧密码',
                    type: 'warning'
                });
                return;
            };
       if(!this.editUserForm.newPassword){
                this.$message({
                    message: '请输入新密码',
                    type: 'warning'
                });
                return;
            };
      this.dialogEditUserVisible = false
      this.$http.post('/editUser',{editUserInfo:this.editUserForm})
        .then((repos) => {
          console.log(repos)
          let data = repos.data
          if(data == 'edit user success')
            {
            this.$message({
            showClose: true,
            message: '修改用户信息成功',
            type: 'success'
            })
             this.getAccountData()
          }else{
             this.$message.error('修改用户信息失败！')
          }
        })
        .catch((error) => {
          console.log(error)
        })
     
     }
  },
  // created () {
  //   this.getAccountData()
  // },
  mounted () {
    this.getAccountData()
  }
}
</script>

<style scoped>
 .center {
   text-align: center;
 }
</style>