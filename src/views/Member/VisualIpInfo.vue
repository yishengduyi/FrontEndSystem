<template>
    <div>
        <el-row :gutter="20">
    <el-col :span="6">
        <el-card> 
          <el-form >
            <el-form-item label="输入显示IP">
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
            <span class="demonstration">选择显示日期</span>
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
            <span class="demonstration">选择显示类型</span>
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
          <el-button type="primary" @click="searchIpInfo">查询</el-button>
        </el-card>
      </el-col>
    </el-row>
     <div style="height:calc(100vh - 50px);">
        <RelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick" />
     </div>
   </div>
 </template>
 
 <script>
 import RelationGraph from 'relation-graph'
 export default {
   name: 'VisualIpInfo',
   components: { RelationGraph },
   data() {
     return {
         ipInfo:{},
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
       graphOptions: {
         allowSwitchLineShape: true,
         allowSwitchJunctionPoint: true,
         defaultJunctionPoint: 'border'
         // 这里可以参考"Graph 图谱"中的参数进行设置:http://relation-graph.com/#/docs/graph
       }
     }
   },
   mounted() {
     this.showSeeksGraph()
   },
   methods: {
     showSeeksGraph() {
       console.log('打印ipinfo')
       var __graph_json_data = this.ipInfo
       console.log(__graph_json_data);
       this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
         console.log('点击',seeksRGGraph)
         
       })
     },
     onNodeClick(nodeObject, $event) {
       console.log('onNodeClick:', nodeObject.data)
       this.$alert(nodeObject.data,'文件的绝对路径');
     },
     onLineClick(lineObject, $event) {
       console.log('onLineClick:', lineObject)
     },
     searchIpInfo: function(){
       if(!this.historyInfo.search_ip){
                this.$message({
                    message: '请输入显示IP',
                    type: 'warning'
                });
                return;
            };
        if(this.historyInfo.dateTime == []){
                this.$message({
                    message: '请输入显示日期',
                    type: 'warning'
                });
                return;
            };
        if(!this.historyInfo.shellType){
                this.$message({
                    message: '请输入显示类型',
                    type: 'warning'
                });
                return;
            };
      this.$http.post('searchIpInfo',{historyInfo:this.historyInfo})
        .then((repos) => {
          if (repos.data['searchStatus'] == 'fail') {
            this.$message.error('只允许显示一个IP')
          }
          else{
            this.$message({
            showClose: true,
            message: '查询成功',
            type: 'success'
          })
            this.ipInfo['rootId'] = repos.data['rootId']
            this.ipInfo['nodes'] = repos.data['nodes']
            this.ipInfo['links'] = repos.data['links']
            this.showSeeksGraph()
          }  
        })
        .catch((error) => {
          console.log(error)
        })
    },
   },
   watch: {
     ipInfo: { // 监控该变量，重新赋值并刷新图
        handler(newVal) {
          this.ipInfo = newVal
          // this.showSeeksGraph()
        },
        deep: true // 必须设置
        },
   }
 }
 </script>