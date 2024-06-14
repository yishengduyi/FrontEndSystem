import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Main from '../views/Main'
import NotFound from '../views/NotFound'
import VisualWeek from '../views/Member/VisualWeek'
import VisualDay from '../views/Member/VisualDay'
import VisualMap from '../views/Member/VisualMap'
import VisualIpInfo from '../views/Member/VisualIpInfo'
import UserManagement from '../views/Member/UserManagement'
import DetectWebshell from '../views/Member/DetectWebshell'
import TimerDetectWebshell from '../views/Member/TimerDetectWebshell'
import ChangePwd from '../views/Member/ChangePwd'
import SearchHistory from '../views/Member/SearchHistory'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
            // 登录页
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            // 主页
            path: "/main",
            // path: '/main/:name',
            name: 'Main',
            component: Main,
            children: [{
                    // 实时检测
                    path: '/detectWebshell',
                    name: 'DetectWebshell',
                    component: DetectWebshell
                },
                {
                    // 定时检测
                    path: '/timerDetectWebshell',
                    name: 'TimerDetectWebshell',
                    component: TimerDetectWebshell
                },
                {
                    // 修改密码
                    path: '/changePwd',
                    name: 'ChangePwd',
                    component: ChangePwd
                },
                {
                    // 一周可视化
                    path: '/visualWeek',
                    name: 'VisualWeek',
                    component: VisualWeek,
                },
                {
                    // 当天可视化
                    path: '/visualDay',
                    name: 'VisualDay',
                    component: VisualDay,
                },
                {
                    // IP大屏展示
                    path: '/visualMap',
                    name: 'VisualMap',
                    component: VisualMap,
                },
                {
                    // IP关联图谱
                    path: '/visualIpInfo',
                    name: 'VisualIpInfo',
                    component: VisualIpInfo,
                },
                {
                    // 查找历史数据
                    path: '/searchHistory',
                    name: 'SearchHistory',
                    component: SearchHistory,
                },
                {
                    //用户管理
                    path: '/userManagement',
                    name: 'UserManagement',
                    component: UserManagement
                },
            ],
        },
        {
            // 重定向
            path: '/goMain',
            // path: '/goMain/:name',
            redirect: '/main'
                // redirect: '/main/:name'
        },
        {
            // 404
            path: '*',
            component: NotFound,
        },
    ]
})