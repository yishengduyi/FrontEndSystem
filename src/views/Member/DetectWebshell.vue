<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <el-input v-model="port" placeholder="请输入要监听的端口，默认端口为80" size="big"></el-input>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card>
          <el-button type="primary" @click="setCurrentPort">修改端口</el-button>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card>
          <el-button type="primary" @click="listen">开始监听</el-button>
          <el-button type="danger" @click="stoplisten">停止监听</el-button>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card>
          <el-button type="warning" @click="execWordVec">快速检测</el-button>
          <el-button type="warning" @click="execBert">精确检测</el-button>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card>
          <el-button type="success" @click="saveToDb">保存数据到数据库</el-button>
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
      <el-tab-pane label="访问数据">
        <el-table :data="DataFilter"  stripe="true" highlight-current-row style="width: 100%;background: #122a42;color:#6cb7c9" :cell-style="cellStyle">
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
  name: 'DetectWebshell',
  data () {
    return {
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
          ifAnomalous: 1
        }
      ],
      total: 0,     //总信息数
      port: '',
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
    setCurrentPort: function () {
       if(!this.port){
                this.$message({
                    message: '请输入监听端口',
                    type: 'warning'
                });
                return;
            };
      this.$http.post('setCurrentPort',{currentPort:this.port})
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
    getCurrentData: function () {
      this.$http.get('getCurrentData')
        .then((repos) => {
          console.log(repos)
          this.getTableData(repos)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    execWordVec: function () {
      this.$http.get('WordVeclearning')
        .then((repos) => {
          console.log(repos)
          this.getTableData(repos)
          this.$message({
            showClose: true,
            message: '学习完成',
            type: 'success'
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    execBert: function () {
      this.$http.get('Bertlearning')
        .then((repos) => {
          console.log(repos)
          this.getTableData(repos)
          this.$message({
            showClose: true,
            message: '学习完成',
            type: 'success'
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    listen: function () {
      this.$confirm('若是第一次监听数据，请点击确定。若不是，请确认已将数据保存到数据库。若已保存数据库，点击继续，否则请取消。', '保存数据提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get('listen')
          .then((repos) => {
            console.log(repos)
            if(repos.data == 'timer mode'){
               this.$message.error('当前处于定时期间，请等待定时结束或取消定时！');
            }
            else{
               this.$message({
                showClose: true,
                message: '开始监听',
                type: 'success'
            })
            }
        })
        .catch((error) => {
          console.log(error)
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消监听'
          });
        });
    },
    stoplisten: function () {
      this.$http.get('stoplisten')
        .then((repos) => {
          console.log(repos)
          this.getTableData(repos)
          this.$message({
            showClose: true,
            message: '监听完成',
            type: 'success'
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
     saveToDb: function () {
      this.$http.get('saveToDbCurrent')
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
    this.getCurrentData()
  }
}
</script>

<style >
  .el-table th{
            color: #6cb7c9; /* 字体颜色 */
            font-size: 16px;
            /* background-color: #122a42; */
            border: 0;
            height: 30px;
            line-height: 30px;
        }
  .el-table tr, .el-table td {
            color: #6cb7c9;
            font-size: 12px;
            background-color: #fff;
            border: 0;
            height: 30px;
            line-height: 30px;
        }
  .searchbox{
    margin: 15px auto;
    border: none;
    padding: 0;
    border-radius: 0;
    box-shadow: 0 0 0 #000000;
  }
</style>

