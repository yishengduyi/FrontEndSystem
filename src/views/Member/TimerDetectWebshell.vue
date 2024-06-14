<template>
  <div>
<!--    <el-row :gutter="20">-->
<!--      <el-col :span="4">-->
<!--        <el-card>-->
<!--          <el-input v-model="port" placeholder="请输入要监听的端口，默认端口为80" size="big"></el-input>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-card>-->
<!--          <el-button type="primary" @click="setTimerPort">修改端口</el-button>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="5">-->
<!--        <el-card>-->
<!--          <div class="block">-->
<!--            <span class="demonstration">预定监听时间</span>-->
<!--            <el-date-picker-->
<!--              v-model="timerInfo.dateTime.date"-->
<!--              type="daterange"-->
<!--              align="right"-->
<!--              unlink-panels = 'true'-->
<!--              range-separator="至"-->
<!--              start-placeholder="开始日期"-->
<!--              end-placeholder="结束日期"-->
<!--              format="yyyy 年 MM 月 dd 日"-->
<!--              value-format="yyyy_MM_dd_HH_mm_ss"-->
<!--              :default-time="['00:00:00', '23:59:59']"-->
<!--              :picker-options="pickerOptions">-->
<!--           </el-date-picker>-->
<!--         </div>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="4">-->
<!--        <el-card>-->
<!--          <el-time-picker-->
<!--            is-range-->
<!--            v-model="timerInfo.dateTime.time"-->
<!--            range-separator="至"-->
<!--            start-placeholder="开始时间"-->
<!--            end-placeholder="结束时间"-->
<!--            placeholder="选择时间范围"-->
<!--            value-format="HH_mm_ss">-->
<!--          </el-time-picker>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="3">-->
<!--        <el-card>-->
<!--          <el-button type="success" @click="saveToDb">手动保存数据到数据库</el-button>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--       <el-col :span="4">-->
<!--        <el-card>-->
<!--          <el-button type="primary">距离检测时间还有</el-button>-->
<!--          <count-down :startTime="startTime" :countFatherFlag="countFatherFlag" :timeOnChildFlag.sync="timeOnFatherFlag"/>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-row :gutter="20">-->
<!--      <el-col :span="4">-->
<!--        <el-card>-->
<!--          <el-input v-model="timerInfo.email" placeholder="请输入发送检测报告的邮箱，多个邮箱以英文分号相隔" size="big"></el-input>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-card>-->
<!--          <el-button type="primary" @click="setEmail">确认邮箱</el-button>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="5">-->
<!--        <el-card>-->
<!--          <div>-->
<!--            <span class="demonstration">选择保存方式</span>-->
<!--             <el-select v-model="timerInfo.saveType" placeholder="请选择">-->
<!--              <el-option-->
<!--                v-for="item in saveOptions"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="4">-->
<!--        <el-card>-->
<!--          <div>-->
<!--            <span class="demonstration">选择检测方式</span>-->
<!--             <el-select v-model="timerInfo.detectType" placeholder="请选择">-->
<!--              <el-option-->
<!--                v-for="item in detectOptions"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="3">-->
<!--        <el-card>-->
<!--          <el-button type="primary" @click="startTimer">开启定时</el-button>-->
<!--          <el-button type="danger" @click="stopTimer">取消定时</el-button>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="4">-->
<!--        <el-card>-->
<!--          <el-button type="primary">检测中,时间剩余</el-button>-->
<!--          <count-in :startTime="startTime" :endTime="endTime" :timeOnChildFlag.sync="timeOnFatherFlag" :timeOutChildFlag.sync="timeOutFatherFlag" :countChildFlag.sync="countFatherFlag"/>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-card>-->
<!--          <el-button type="primary" @click="getTimerData">获取检测结果</el-button>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-row :gutter="8">-->
<!--      <el-con>-->
<!--        <el-card>-->
<!--         <el-form class="searchbox">-->
<!--            <el-form-item label="搜索栏">-->
<!--              <el-col :span="22">-->
<!--                <el-input v-model="searchInfo" placeholder="请输入关键字搜索"></el-input>-->
<!--              </el-col>-->
<!--            </el-form-item>-->
<!--          </el-form>-->
<!--        </el-card>-->
<!--      </el-con>-->
<!--    </el-row>-->
    <el-tabs>
      <el-tab-pane label="DNS隐秘隧道">
        <el-table :data="DataFilter" stripe="true" highlight-current-row style="width: 100%" :cell-style="cellStyle">
<!--          <el-table-column type="index" width="100">-->
<!--          </el-table-column>-->
<!--          <el-table-column property="requestMethod" label="请求方法" width="100">-->
<!--          </el-table-column>-->
<!--          <el-table-column property="requestUri" label="GET参数">-->
<!--          </el-table-column>-->
<!--          <el-table-column property="postData" label="POST参数">-->
<!--          </el-table-column>-->
<!--          <el-table-column property="cookie" label="Cookie信息">-->
<!--          </el-table-column>-->
<!--          <el-table-column property="userAgent" label="用户代理">-->
<!--          </el-table-column>-->
<!--          <el-table-column property="acceptLang" label="接受语言">-->
<!--          </el-table-column>-->
<!--          <el-table-column property="ip_src" label="来源IP">-->
<!--          </el-table-column>-->
<!--          <el-table-column property="studymethod" label="检测方法">-->
<!--          </el-table-column>-->
<!--          <el-table-column  label="是否恶意">-->
<!--            <template slot-scope="scope">-->
<!--                  <span v-if="scope.row.ifAnomalous === '1'" style="color:white"><el-button type="danger">是</el-button></span>-->
<!--                  <span v-else><el-button type="success">否</el-button></span>-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column property="index" label="序号" width="100">
          </el-table-column>
          <el-table-column property="timestamp" label="时间戳" width="200">
          </el-table-column>
          <el-table-column property="srcMAC" label="源MAC" width="200">
          </el-table-column>
          <el-table-column property="srcIP" label="源IP" width="200">
          </el-table-column>
          <el-table-column property="destMAC" label="目的MAC" width="200">
          </el-table-column>
          <el-table-column property="destIP" label="目的IP" width="200">
          </el-table-column>
<!--          <el-table-column property="requestMethod" label="域名" width="500">-->
<!--          </el-table-column>-->
<!--          <el-table-column property="requestType" label="请求类型" width="200">-->
<!--          </el-table-column>-->
<!--          <el-table-column property="packetType" label="包类型" width="100">-->
<!--          </el-table-column>-->
<!--          <el-table-column property="TTL" label="TTL" width="100">-->
<!--          </el-table-column>-->
          <el-table-column label="是否DNS（DOH）隐秘隧道" width="250" align="center">
            <template slot-scope="scope">
          <span v-if="scope.row.isTunnel === '是'">
            <el-button type="danger" size="mini">是</el-button>
          </span>
              <span v-else>
            <el-button type="success" size="mini">否</el-button>
          </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <el-button size="mini">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handlerSizeChange"
          @current-change="handlerPageChange"
          :current-page="tablePage.pageNum"
          :page-sizes="pageSizes"
          :page-size="tablePage.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CountDown from './CountDown.vue'
import CountIn from './CountIn.vue'
export default {
  name: 'TimerDetectWebshell',
  data () {
    return {
      startTime: '',
      endTime: '',
      timeOnFatherFlag: false,
      timeOutFatherFlag: true,
      countFatherFlag: false,
      firstTimeFlag:true,
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        timerInfo :{
             email: '',
             dateTime: {
                        date: '',
                        time: ['12_00_00','18_30_00']
                      },
             saveType: '',
             detectType: ''
        },
        saveOptions: [{
          value: 'saveToDbFlag',
          label: '保存到数据库'
        }, {
          value: 'abandonFlag',
          label: '不保存'
        }],
        detectOptions: [{
          value: 'word2vexDetect',
          label: '快速检测'
        }, {
          value: 'bertDetect',
          label: '精确检测'
        }],

      tablePage:{
        pageNum: 1,    //第几页
        pageSize: 5,     //每页多少条
      },
      pageSizes: [1,2,3,5,8,10,12,14,20],
      viewData: [
        {
          requestMethod: '',
          requestUri: '',
          postData: '',
          cookie: '',
          userAgent: '',
          acceptLang: '',
          ip_src : '',
          studymethod: '',
          ifAnomalous: 1
        }
      ],
      total: 0,     //总信息数
      port: '',
      data: [],
      searchInfo: '',
      tableData: [

        {'index': 1, 'timestamp': '2024/3/18/14:11:11', 'srcMAC': 'DA:4F:95:A6:7A:E6', 'srcIP': '172.31.171.15', 'destMAC': '63:C8:51:69:D0:B0', 'destIP': '204.106.240.53', 'requestMethod': 'mysite.edu.bot.hackbiji.top', 'requestType': 'TXT', 'packetType': 'response', 'TTL': 0, 'isTunnel': '是'},
        {'index': 2, 'timestamp': '2024/3/18/14:12:12', 'srcMAC': '1B:AE:A2:99:AB:A5', 'srcIP': '172.31.171.32', 'destMAC': '44:71:98:4C:AB:F4', 'destIP': '203.126.118.38', 'requestMethod': 'demo.net.bot.hackbiji.top', 'requestType': 'MX', 'packetType': 'query', 'TTL': 5, 'isTunnel': '否'},
        {'index': 3, 'timestamp': '2024/3/18/14:13:13', 'srcMAC': '79:11:B3:AC:24:9C', 'srcIP': '172.31.171.123', 'destMAC': 'D1:DA:31:81:F9:AE', 'destIP': '210.118.170.15', 'requestMethod': 'example.com.bot.hackbiji.top', 'requestType': 'CNAME', 'packetType': 'query', 'TTL': 5, 'isTunnel': '否'},
        {'index': 4, 'timestamp': '2024/3/18/14:14:14', 'srcMAC': '85:72:37:C6:E7:07', 'srcIP': '172.31.171.90', 'destMAC': '67:8E:1A:13:D9:9E', 'destIP': '81.138.71.238', 'requestMethod': 'site.info.bot.hackbiji.top', 'requestType': 'AAAA', 'packetType': 'query', 'TTL': 4, 'isTunnel': '否'},
        {'index': 5, 'timestamp': '2024/3/18/14:15:15', 'srcMAC': '35:38:E3:EB:36:3C', 'srcIP': '172.31.171.24', 'destMAC': 'EC:9B:B4:47:A9:6D', 'destIP': '203.126.118.38', 'requestMethod': 'example.com.bot.hackbiji.top', 'requestType': 'A', 'packetType': 'response', 'TTL': 4, 'isTunnel': '否'},
        {'index': 6, 'timestamp': '2024/3/18/14:16:16', 'srcMAC': '5A:A1:77:54:A0:33', 'srcIP': '172.31.171.220', 'destMAC': 'D4:C3:ED:CC:39:78', 'destIP': '204.106.240.53', 'requestMethod': 'demo.net.bot.hackbiji.top', 'requestType': 'A', 'packetType': 'response', 'TTL': 11, 'isTunnel': '否'},
        {'index': 7, 'timestamp': '2024/3/18/14:17:17', 'srcMAC': '9F:65:6E:7A:AC:0B', 'srcIP': '172.31.171.46', 'destMAC': 'EB:6F:1A:8B:56:1A', 'destIP': '203.126.118.38', 'requestMethod': 'site.info.bot.hackbiji.top', 'requestType': 'TXT', 'packetType': 'response', 'TTL': 13, 'isTunnel': '否'},
        {'index': 8, 'timestamp': '2024/3/18/14:18:18', 'srcMAC': '05:57:FA:36:11:BB', 'srcIP': '172.31.171.187', 'destMAC': '4D:36:FB:4C:CC:4F', 'destIP': '203.126.118.38', 'requestMethod': 'demo.net.bot.hackbiji.top', 'requestType': 'AAAA', 'packetType': 'response', 'TTL': 13, 'isTunnel': '否'},
        {'index': 9, 'timestamp': '2024/3/18/14:19:19', 'srcMAC': '64:3E:62:2E:25:48', 'srcIP': '172.31.171.118', 'destMAC': 'C5:D7:A5:11:1B:34', 'destIP': '204.106.240.53', 'requestMethod': 'demo.net.bot.hackbiji.top', 'requestType': 'CNAME', 'packetType': 'query', 'TTL': 17, 'isTunnel': '否'},
        {'index': 10, 'timestamp': '2024/3/18/14:20:20', 'srcMAC': '90:C3:FE:B7:83:B4', 'srcIP': '172.31.171.89', 'destMAC': '4F:DF:91:0A:19:8A', 'destIP': '210.118.170.15', 'requestMethod': 'mysite.edu.bot.hackbiji.top', 'requestType': 'AAAA', 'packetType': 'response', 'TTL': 5, 'isTunnel': '否'},
        {'index': 11, 'timestamp': '2024/3/18/14:21:21', 'srcMAC': '63:AC:1D:59:68:31', 'srcIP': '172.31.171.27', 'destMAC': '20:1A:D2:B0:31:E8', 'destIP': '81.138.71.238', 'requestMethod': 'testsite.org.bot.hackbiji.top', 'requestType': 'A', 'packetType': 'query', 'TTL': 6, 'isTunnel': '否'},
        {'index': 12, 'timestamp': '2024/3/18/14:22:22', 'srcMAC': '60:10:26:92:99:B5', 'srcIP': '172.31.171.202', 'destMAC': '9A:C4:7C:CA:E2:29', 'destIP': '204.106.240.53', 'requestMethod': 'site.info.bot.hackbiji.top', 'requestType': 'CNAME', 'packetType': 'response', 'TTL': 16, 'isTunnel': '否'},
        {'index': 13, 'timestamp': '2024/3/18/14:23:23', 'srcMAC': 'BA:62:A4:28:5A:73', 'srcIP': '172.31.171.111', 'destMAC': '3C:1A:95:B5:24:55', 'destIP': '108.179.34.214', 'requestMethod': 'example.com.bot.hackbiji.top', 'requestType': 'MX', 'packetType': 'response', 'TTL': 20, 'isTunnel': '否'},
        {'index': 14, 'timestamp': '2024/3/18/14:24:24', 'srcMAC': '57:63:A2:CA:56:86', 'srcIP': '172.31.171.88', 'destMAC': '6A:15:51:E5:58:76', 'destIP': '210.118.170.15', 'requestMethod': 'demo.net.bot.hackbiji.top', 'requestType': 'MX', 'packetType': 'response', 'TTL': 8, 'isTunnel': '否'},
        {'index': 15, 'timestamp': '2024/3/18/14:25:25', 'srcMAC': 'CD:CE:4D:3E:76:6A', 'srcIP': '172.31.171.213', 'destMAC': 'FA:47:6E:FB:64:D4', 'destIP': '81.138.71.238', 'requestMethod': 'demo.net.bot.hackbiji.top', 'requestType': 'CNAME', 'packetType': 'query', 'TTL': 11, 'isTunnel': '否'},

      ]
    }
  },
  components: {
      CountDown,
      CountIn
  },
  computed: {
    //tableData为数组[]，且为表v-model绑定的参数名
   DataFilter() {
      var input = this.searchInfo;  //username为input中的v-model参数
      if (input) {
        let spl = input.trim().split(/[ ]+/);
        // console.log(spl)
        let tableDatafilter = [];
        if(spl.length==1){
          let tableDatafilter = this.tableData.filter((data) => {
            return Object.keys(data).some((key) => {
              return String(data[key]).toLowerCase().indexOf(spl[0].toLowerCase()) > -1;
            });
          });
          return this.getList(tableDatafilter, this.tablePage.pageNum, this.tablePage.pageSize);
        }
        else {
          for(var i=0;i<spl.length;i++){
            this.tableData.filter((data) => {
                return Object.keys(data).some((key) => {
                return String(data[key]).toLowerCase().indexOf(spl[i].toLowerCase()) > -1;
              });
            }).forEach((item) => {
              tableDatafilter.push(item)
            })
          }
          var Arr = [];
          tableDatafilter.forEach((elem)=>{
              if(tableDatafilter.indexOf(elem) !== tableDatafilter.lastIndexOf(elem) && Arr.indexOf(elem) === -1){
                  Arr.push(elem);
              }
          });
          return this.getList(Arr, this.tablePage.pageNum, this.tablePage.pageSize);
        }
      }
      else {
        return this.getList(this.tableData, this.tablePage.pageNum, this.tablePage.pageSize);
      }

    },
  },
  methods: {
     handlerPageChange: function(currentPage){
      this.tablePage.pageNum = currentPage
      this.viewData = this.getList(this.tableData, this.tablePage.pageNum, this.tablePage.pageSize)
    },
    handlerSizeChange: function(pageSize){
      this.tablePage.pageSize = pageSize
      this.viewData = this.getList(this.tableData, this.tablePage.pageNum, this.tablePage.pageSize)
    },
    getList: function(data, num, size) {  //data, num, size
      let list, start, end, isOnePageInclude, isLast
      this.total = data.length
      start = (num - 1) * size
      end = start + size
      list = data.slice(start, end)
      list.forEach((item, index) => {
        item.seq = index + start
      })
      return list
    },
    getTimerInfo :function() {
       this.endTime = ''
       let date = this.timerInfo['dateTime']['date']
       let time = this.timerInfo['dateTime']['time']
       // 获取日期时间的数字列表
       let startDateList = date[0].split('_')
       let endDateList = date[1].split('_')
       let startTimeList = time[0].split('_')
       let endTimeList = time[1].split('_')

       // 计算检测时长
       let rangeTimeStart = startDateList[0]+'/'+startDateList[1]+'/'+startDateList[2]+' '+startTimeList[0]+':'+startTimeList[1]+':'+startTimeList[2]
       let rangeTimeEnd= endDateList[0]+'/'+endDateList[1]+'/'+endDateList[2]+' '+endTimeList[0]+':'+endTimeList[1]+':'+endTimeList[2]

       console.log(rangeTimeStart)
       console.log(rangeTimeEnd)

       this.startTime = new Date(rangeTimeStart).getTime() / 1000 +  ' '
       this.endTime = new Date(rangeTimeEnd).getTime() / 1000 +  ' '
    },
    setTimerPort: function () {
       if(!this.port){
                this.$message({
                    message: '请输入监听端口',
                    type: 'warning'
                });
                return;
            };
      this.$http.post('setTimerPort',{timerPort:this.port})
        .then((repos) => {
          console.log(repos)
          this.$message({
            showClose: true,
            message: '设置端口成功',
            type: 'success'
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    setEmail: function () {
      this.$message({
              showClose: true,
              message: '设置邮箱成功',
              type: 'success'
            })
    },
    getTimerData: function () {
      this.$http.get('getTimerData')
        .then((repos) => {
          if (repos.data == {}) {
            console.log(repos.data)
            this.$message.error('当前无定时检测结果！')
          }
          else{
             this.$message({
              showClose: true,
              message: '成功获取检测结果',
              type: 'success'
            })
            console.log(repos.data)
            this.getTableData(repos)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    startTimer: function () {
      // 若检测完毕，则可以进行新的定时任务
      if ((this.timeOutFatherFlag == true) && (this.firstTimeFlag == false)) {
        this.countFatherFlag = true
      }
      // 若已开启定时或处于检测状态中，则禁止进行新的定时任务
      else if (this.timeOutFatherFlag == false) {
        this.$message.error('请先取消当前定时任务！')
        return 0
      }
      if (this.firstTimeFlag == true) {
        this.firstTimeFlag == false
        this.countFatherFlag = true
      }
      this.timeOnFatherFlag = false
      this.timeOutFatherFlag = false
      this.getTimerInfo()
      this.$message({
              showClose: true,
              message: '开启定时',
              type: 'success'
            })
          this.$http.post('startTimer',{timerInfo:this.timerInfo})
          .then((repos) => {
            console.log(repos)
            if (repos.data == 'set timer detect success') {
              this.$message({
              showClose: true,
              message: '请留意邮箱的检测结果',
              type: 'success'
            })
            }
        })
        .catch((error) => {
          console.log(error)
        });
    },
    stopTimer: function () {
      this.countFatherFlag = false
      this.timeOnFatherFlag = false
      this.timeOutFatherFlag = true
      this.$http.get('stopTimer')
        .then((repos) => {
          console.log(repos)
          if(repos.data == 'stop timer success'){
            this.$message({
              showClose: true,
              message: '已取消定时',
              type: 'success'
          })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
     saveToDb: function () {
      this.$http.get('saveToDbTimer')
        .then((repos) => {
          console.log(repos)
          this.$message({
            showClose: true,
            message: '保存数据成功',
            type: 'success'
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getTableData: function (rep) {
      let data = rep.data
      this.tableData = []
      data.forEach(item => {
        const tableData = {}
        tableData.requestMethod = item.requestMethod
        tableData.requestUri = item.requestUri
        tableData.postData = item.postData
        tableData.cookie = item.cookie
        tableData.userAgent = item.userAgent
        tableData.acceptLang = item.acceptLang
        tableData.ip_src = item.ip_src
        tableData.studymethod = item.studymethod
        tableData.ifAnomalous = item.ifAnomalous
        this.tableData.push(tableData)
      });
      this.handlerSizeChange(this.tablePage.pageSize);
    },
  },
  created () {
    this.getTimerData()
    // this.getTimerInfo()
  },
  watch: {
        tableData: { // 监控该变量
        handler(newVal) {
          this.tableData = newVal
        },
        deep: true // 必须设置
        },

        endTime: { // 监控该变量
        handler(newVal) {
          this.endTime = newVal
        },
        deep: true // 必须设置
        },
        timeOnFatherFlag: {
          handler(newVal){
            this.timeOnFatherFlag = newVal
          },
          deep: true
        },
        timeOutFatherFlag: {
          handler(newVal){
            this.timeOutFatherFlag = newVal
          },
          deep: true
        },
        countFatherFlag: {
          handler(newVal){
            this.countFatherFlag = newVal
          },
          deep: true
        }
  }
}
</script>

<style lang="" scoped>
  .searchbox{
    margin: 15px auto;
    border: none;
    padding: 0;
    border-radius: 0;
    box-shadow: 0 0 0 #000000;
  }
</style>

