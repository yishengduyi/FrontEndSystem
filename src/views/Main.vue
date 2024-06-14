<template>
  <div>
    <el-container>
      <el-aside width="200px"> 
        <el-menu 
          text-color="#fff" 
          background-color="#545c64" 
          active-text-color="#ffd04b" 
          router 
          :default-active="'/'"
          >
          <el-menu-item index="/detectWebshell">
            <i class="el-icon-star-on"></i>实时检测
          </el-menu-item>
          <el-menu-item index="/timerDetectWebshell">
            <i class="el-icon-alarm-clock"></i>定时检测
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
            <i class="el-icon-s-data"></i>
            <span>攻击数据可视化</span>
            </template>
              <el-menu-item index="/visualDay">当天数据</el-menu-item>
              <el-menu-item index="/visualWeek">过去一周数据</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
            <i class="el-icon-location"></i>
            <span>IP信息聚合展示</span>
            </template>
              <el-menu-item index="/visualMap">大屏地图</el-menu-item>
              <el-menu-item index="/visualIpInfo">关联图谱</el-menu-item>
          </el-submenu>
          <el-menu-item v-if="user=='admin12'" index="/searchHistory">
            <i class="el-icon-date"></i>查找历史数据
          </el-menu-item>
          <el-menu-item v-if="user=='admin12'" index="/userManagement">
            <i class="el-icon-user-solid"></i>用户管理
          </el-menu-item>
          <el-menu-item index="/changePwd">
            <i class="el-icon-message" ></i>修改密码
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 15px">
          <el-button class="logout" type="primary" @click="logout">退出登录</el-button>
          <span class="user">当前用户：{{user}}</span>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default{
    name: 'Main',
    data () {
      return {
        user: window.sessionStorage.getItem('account')
        // 不用user.user.name去获取name，会获得hello的初始值
      }
    },
    watch: {
      '$store.getters.getUser.name': function () {
        this.user = window.sessionStorage.getItem('account')
      }
    },
    methods:{
      logout: function () {
        sessionStorage.clear();
        // console.log('log out');
        this.$router.push('login');
      }
    }
  }
  
</script>

<style scoped>
  .el-menu{
      height: 100vh;
  
  }
  .el-header {
      /* background-color: #758db9;
      color: #333;
      line-height: 60px; */
      /* background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%); */
      /* background-image: linear-gradient(to left, #BDBBBE 0%, #9D9EA3 100%), radial-gradient(88% 271%, rgba(255, 255, 255, 0.25) 0%, rgba(254, 254, 254, 0.25) 1%, rgba(0, 0, 0, 0.25) 100%), radial-gradient(50% 100%, rgba(255, 255, 255, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%);
      background-blend-mode: normal, lighten, soft-light; */
      background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
      
    }
  .logout {
    position: relative;
    top: 10px;
  }
  .user {
    position: relative;
    top: 10px;
  }
  .el-aside {
    color: #333;
  }
</style>