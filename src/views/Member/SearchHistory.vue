<template>
  <div>
    <el-row :gutter="20">
    <el-col :span="6">
        <el-card> 
          <el-form >
            <el-form-item label="输入查询IP">
              <el-col :span="15">
                <el-input v-model="historyInfo.search_ip" width="100%" placeholder="请输入IP"></el-input>
              </el-col>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card> 
          <div class="block">
            <span class="demonstration">选择查询日期</span>
            <el-date-picker
              v-model="historyInfo.dateTime"
              type="daterange"
              align="right"
              unlink-panels = 'true'
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy_MM_dd_HH_mm_ss"
              :default-time="['00:00:00', '23:59:59']"
              :picker-options="pickerOptions">
           </el-date-picker>
         </div>
        </el-card>
      </el-col>
       <el-col :span="4">
        <el-card> 
          <div>
            <span class="demonstration">选择查询类型</span>
             <el-select v-model="historyInfo.shellType" placeholder="请选择">
              <el-option
                v-for="item in shellOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-card>
      </el-col>
     <el-col :span="2">
        <el-card> 
          <el-button type="primary" @click="searchHistory">查询</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-con>   
        <el-card> 
          <el-form class="searchbox">
            <el-form-item label="搜索栏">
              <el-col :span="22">
                <el-input v-model="searchInfo" placeholder="请输入关键字搜索"></el-input>
              </el-col>
            </el-form-item>
          </el-form>
        </el-card>
      </el-con>
    </el-row>
    <el-tabs>
      <el-tab-pane label="查询历史数据">
        <el-table :data="DataFilter" stripe="true" highlight-current-row style="width: 100%" :cell-style="cellStyle">
          <el-table-column type="index" width="100">
          </el-table-column>
          <el-table-column property="requestMethod" label="请求方法" width="100">
          </el-table-column>
          <el-table-column property="requestUri" label="GET参数">
          </el-table-column>
          <el-table-column property="postData" label="POST参数">
          </el-table-column>
          <el-table-column property="cookie" label="Cookie信息">
          </el-table-column>
          <el-table-column property="userAgent" label="用户代理">
          </el-table-column>
          <el-table-column property="acceptLang" label="接受语言">
          </el-table-column>
          <el-table-column property="ip_src" label="来源IP">
          </el-table-column>
          <el-table-column property="studymethod" label="检测方法">
          </el-table-column>
          <el-table-column property="timeStamp" label="时间">
          </el-table-column>
           <el-table-column  label="是否恶意">
            <template slot-scope="scope">
                  <span v-if="scope.row.ifAnomalous === '1'" style="color:white"><el-button type="danger">是</el-button></span>
                  <span v-else><el-button type="success">否</el-button></span>
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
export default {
  name: 'SearchHistory',
  data () {
    return {
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
        shellOptions: [{
          value: 'anomalous',
          label: '恶意类型'
        }, {
          value: 'normal',
          label: '正常类型'
        }],
        historyInfo :{
             search_ip: '',
             dateTime: '',
             shellType: '',
        },

      tablePage:{
        pageNum: 1,    //第几页
        pageSize: 5,     //每页多少条
      },
      pageSizes: [1,2,3,5,20],
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
          timeStamp: '',
          ifAnomalous: 1
        }
      ],
      total: 0,     //总信息数
      data: [],
      searchInfo: '',
      tableData: [
        {
          requestMethod: '',
          requestUri: '',
          postData: '',
          cookie: '',
          userAgent: '',
          acceptLang: '',
          ip_src: '',
          studymethod: '',
          timeStamp: '',
          ifAnomalous: 1
        }
      ]
    }
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
    searchHistory: function(){
        if(this.historyInfo.dateTime == []){
                this.$message({
                    message: '请输入查询日期',
                    type: 'warning'
                });
                return;
            };
        if(!this.historyInfo.shellType){
                this.$message({
                    message: '请输入查询类型',
                    type: 'warning'
                });
                return;
            };
      this.$http.post('searchHistory',{historyInfo:this.historyInfo})
        .then((repos) => {
          console.log(repos)
          this.$message({
            showClose: true,
            message: '查询成功',
            type: 'success'
          })
          let data = repos.data
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
          tableData.timeStamp = item.dateTime
          tableData.studymethod = item.studymethod
          tableData.ifAnomalous = item.ifAnomalous
          this.tableData.push(tableData)
      });
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getLatestHisory: function(){
         this.$http.get('/getLatestHistory')
        .then((repos) => {
          console.log('获取历史数据')
          console.log(repos)
          let data = repos.data
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
            tableData.timeStamp = item.dateTime
            tableData.studymethod = item.studymethod
            tableData.ifAnomalous = item.ifAnomalous
            this.tableData.push(tableData)
      });
        })
        .catch((error) => {
          console.log(error)
        })
    },
    
    handlerPageChange: function(currentPage){
      this.tablePage.pageNum = currentPage
      // console.log("你好")
      this.viewData = this.getList(this.tableData, this.tablePage.pageNum, this.tablePage.pageSize)
    },
    handlerSizeChange: function(pageSize){
      this.tablePage.pageSize = pageSize
      // console.log("你好")
      // console.log(this.tablePage.pageSize)
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
   
  },
  mounted() {
      this.getLatestHisory()
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
