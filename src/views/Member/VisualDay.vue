<template>
  <div>
    <link rel="stylesheet" href="../../assets/css/bootstrap.min.css">
    <section class="data_section">
      <header class="section_title">数据展示</header>
    </section>
    <div class="container-fluid chart-layout">
      <div class="row">
        <div class="col-md-6 chart-col">
          <div id="Pie-shell" class="chart"></div>
          <div id="Pie-get-post" class="chart"></div>
        </div>
        <div class="col-md-6 chart-col">
          <div id="Bar-shell" class="chart"></div>
          <div id="Bar-ip" class="chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

  export default{
    name: 'VisualDay',
    data(){
      return{
        // 当天流量数据
        attackTotalNumDay: 0,
        allDataNumDay: [{ value: 2, name: 'DNS隐秘隧道中TTL为0' }, // Represents 66.7%
          { value: 1, name: 'DNS隐秘隧道中TTL不为0' }], // Represents 33.3%],
        dataGetPostDay: [{ value: 144, name: 'DNS隐秘隧道中txt记录' }, // Represents 66.7%
          { value: 77, name: 'DNS隐秘隧道中非txt记录' }],
        dataBarDay: ["40","20","1200","1250"],
        dataBarXlabelDay : ["TTL为0是隐秘隧道","TTL为其他是隐秘隧道","TTL为0不是隐秘隧道","TTL为其他不是隐秘隧道"],

        // 当天攻击ip数据
        ipAttackNumDay_list : [120, 150, 180, 210],
        ipAttackName : ['193.198.77.26', '56.205.138.201', '108.9.60.33', '46.191.3.62'],

      }
    },
    beforeRouteEnter: (to, from, next)=>{
      console.log("进入统计页面");
      next(vm=>{
        // console.log(vm);
        vm.getDayData();
      });
      next();
    },
    methods:{
      // 流量总数饼状图
      drawPieDayAllData: function(){
          // 基于准备好的dom，初始化echarts实例
          var myChart = this.$echarts.init(document.getElementById('Pie-shell'));

         var pieSeriesData = [
          { value: 40, name: 'DNS隐秘隧道中TTL为0' }, // 40 entries
          { value: 20, name: 'DNS隐秘隧道中TTL不为0' } // 20 entries
        ];

        var total = pieSeriesData.reduce((acc, item) => acc + item.value, 0);


        // 指定图表的配置项和数据
          var option = {
              color: ['#6495ED','#B22222'],
              tooltip: {
                trigger: 'item',
                formatter: "{a} : {c} ({d}%)"
              },
              legend: {
                  orient: 'horizontal', // 布局方式，默认为水平布局，可选为：'horizontal' ¦ 'vertical'
                  // 水平安放位置，默认为左侧，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
                  x: 'left',
                  // 垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
                  y: 'bottom',
                textStyle: {
                  fontSize: 20, // Set the font size for the legend text
                  fontWeight :"bold"
                },
                  // 重写legend显示样式
                formatter: function(name) {
                  // Find the corresponding data entry
                  var dataItem = pieSeriesData.find(item => item.name === name);
                  var value = dataItem ? dataItem.value : 0;
                  // Calculate percentage
                  var percentage = (value / total * 100).toFixed(2);
                  // Return the formatted legend label
                  return `${name}: ${value}条 (${percentage}%)`;
                },
                data: pieSeriesData.map(item => item.name)

                },
              title: {
                    text: 'DNS隐秘隧道TTL为0相关性分析',
                    left: 'center',
                    textStyle: {
                        color: '#9AA8D4'
                    }
                },

              series: [
                {
                    name: 'anomalous',
                    type: 'pie',
                    radius: 80,
                    //  center: ['25%', '40%'],
                    data: this.allDataNumDay,

                    label: {
                      show: true,
                      formatter: function(res){
                        return res.data.category
                      },
                  },

                },
                {
                    name: 'normal',
                    type: 'pie',
                    radius: 80,
                    //  center: ['25%', '40%'],
                    data: this.allDataNumDay,
                    label: {
                      show: true,
                      formatter: function(res){
                        return res.data.category
                      },
                  },

                },

              ]
          };
          myChart.setOption(option);
      },
      // 恶意流量get、post饼状图
      drawPieDayGetPost: function(){
          // 基于准备好的dom，初始化echarts实例
          var myChart = this.$echarts.init(document.getElementById('Pie-get-post'));
          // 指定图表的配置项和数据
        // Updated data for the pie chart
        var pieSeriesData = [
          { value: 144, name: 'TXT记录' }, // 140 TXT records
          { value: 77, name: '非TXT记录' } // 55 non-TXT records
        ];
        var total = pieSeriesData.reduce((sum, item) => sum + item.value, 0);

        var option = {

              tooltip: {
                trigger: 'item',
                formatter: "{a} : {c} ({d}%)"
              },
              legend: {
                orient: 'horizontal', // Use 'horizontal' for a centered layout
                  // 水平安放位置，默认为左侧，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
                  x: 'left',
                  // 垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
                  y: 'bottom',
                textStyle: {
                  fontSize: 20, // Set the font size for the legend text
                  fontWeight :"bold"
                },
                formatter: function(name) {
                  var dataItem = pieSeriesData.find(item => item.name === name);
                  var value = dataItem ? dataItem.value : 0;
                  var percentage = (value / total * 100).toFixed(2);
                  return `${name} ${percentage}% (${value}条)`; // Adjusted format
                },
                data: pieSeriesData.map(item => item.name)
                },
              title: {
                    text: '检测DNS隐秘隧道与请求域名记录的关系',
                    left: 'center',
                    textStyle: {
                        color: '#9AA8D4'
                    }
                },

              series: [
                {
                    name: 'TXT记录',
                    type: 'pie',
                    radius: 80,
                    //  center: ['25%', '40%'],
                    data: this.dataGetPostDay,
                    label: {
                      show: true,
                      formatter: function(res){
                        return res.data.category
                      },
                  },

                },
                {
                    name: '非TXT记录',
                    type: 'pie',
                    radius: 80,
                    //  center: ['25%', '40%'],
                    data: this.dataGetPostDay,
                    label: {
                      show: true,
                      formatter: function(res){
                        return res.data.category
                      },
                  },

                },

              ]
          };
          myChart.setOption(option);
      },
      // 当天流量柱状图
      drawBarShellDayChart: function() {
        var myChart = this.$echarts.init(document.getElementById('Bar-shell'));

        // 指定图表的配置项和数据
        var option = {
          color: ['#3498db', '#2ecc71', '#9b59b6', '#f1c40f'],  // This line can be removed if we apply color directly in series
          title: {
            text: 'DNS隐秘隧道与TTL关系',
            left: 'center',
            textStyle: {
              color: '#9AA8D4',
              fontSize:"23"
            }
          },
          legend: {
            data: this.ipAttackName, // Make sure this is correctly passed
            textStyle: {
              fontSize: '12',
              color: '#fff'
            },
            right: "right",
            show: true
          },
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            show: true,
            feature: {
              magicType: { show: true, type: ['line', 'bar'] },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          grid: {
            left: '0%',
            right: '10%',
            top: '10%',
            bottom: '0%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: this.dataBarXlabelDay,
            axisLabel: {
              textStyle: {
                color: '#111',
                fontWeight: 'bold',// This will make the text bold

                fontSize: 14 // Increase the font size as needed

              }
            }
          }],
          yAxis: [{
            type: 'value',
            axisLabel: {
              textStyle: {
                color: "#111",
                fontWeight: 'bold',// This will make the text bold

                fontSize: 15// Increase the font size as needed
              }
            }
          }],
          series: [{
            name: 'Data Series',
            type: 'bar',
            data: [
              {value: this.dataBarDay[0], itemStyle: {color: '#3498db'}},
              {value: this.dataBarDay[1], itemStyle: {color: '#2ecc71'}},
              {value: this.dataBarDay[2], itemStyle: {color: '#9b59b6'}},
              {value: this.dataBarDay[3], itemStyle: {color: '#f1c40f'}}
            ],
            barWidth: '30%', // Optional: adjust width as needed
          }]
        };
        myChart.setOption(option);
      },

      // 当天攻击ip柱状图
      drawBarIpDayChart: function() {
        // Use the provided attack list
        var ipAttackNumDay_list = this.ipAttackNumDay_list;
        // Define colors for each bar
        var barColors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f'];

        // Map the attack list to include colors
        var coloredData = ipAttackNumDay_list.map(function(item, index) {
          return {
            value: item,
            // Assign a color to each bar
            itemStyle: {
              color: barColors[index % barColors.length]
            }
          };
        });

        // Initialize the echarts instance based on the prepared DOM
        var myChart = this.$echarts.init(document.getElementById('Bar-ip'));

        // Specify the chart configuration and data
        var option = {
          title: {
            text: 'DNS隐秘隧道目标IP的top4',
            left: 'center',
            textStyle: {
              color: '#9AA8D4',
              fontSize: 23
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            show: true,
            feature: {
              magicType: { show: true, type: ['line', 'bar'] },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          grid: {
            left: '3%', // Slightly adjust to ensure labels fit
            right: '4%',
            top: '12%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'value',
              axisLabel: {
                textStyle: {
                  color: '#111',
                  fontWeight: 'bold',
                  fontSize: 17
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'category',
              data: this.ipAttackName,
              axisLabel: {
                textStyle: {
                  color: '#111',
                  fontWeight: 'bold',
                  fontSize: 17
                }
              }
            }
          ],
          series: [
            {
              name: 'IP',
              type: 'bar',
              data: coloredData,
              barWidth: '60%', // Optional: Adjust bar width
            }
          ]
        };



          myChart.setOption(option);
      },
      getDayData: function () {

        this.$http.get('getDayData')
          .then((repos) => {
            console.log(repos)
            this.attackTotalNumDay = repos.data['attackTotalNumDay']
            this.allDataNumDay = repos.data['allDataNumDay']
            this.dataGetPostDay = repos.data['dataGetPostDay']
            this.dataBarDay = repos.data['dataBarDay']
            this.dataBarXlabelDay = repos.data['dataBarXlabelDay']
            this.ipAttackNumDay_list = repos.data['ipAttackNumDay_list']
            this.ipAttackName = repos.data['ipAttackName']

            console.log("Bar数据");
            console.log(this.dataBarDay);
          })
          .catch((error) => {
            console.log(error)
          })
      },



      // isToday: function(item){
      //   var time = new Date(item.uploadTime_absulote);
      //   if(time.getDate()==new Date().getDate()){
      //     this.currentDayCount += 1;
      //   }
      // },
      logTime: function(item){
        console.log(item.uploadTime_absulote);
      }
    },
    mounted () {
      this.drawPieDayAllData(),
      this.drawPieDayGetPost(),
      this.drawBarShellDayChart(),
      this.drawBarIpDayChart()
    },
    watch: {
        attackTotalNumDay: { // 监控该变量，重新赋值并刷新图表
        handler(newVal, oldVal) {
          this.attackTotalNumDay = newVal
        },
        deep: true // 必须设置
        },

        allDataNumDay: { // 监控该变量，重新赋值并刷新图表
        handler(newVal, oldVal) {
          this.allDataNumDay = newVal
          this.drawPieDayAllData()
        },
        deep: true // 必须设置
        },

        dataGetPostDay: { // 监控该变量，重新赋值并刷新图表
        handler(newVal, oldVal) {
          this.dataGetPostDay = newVal
          this.drawPieDayGetPost()
        },
        deep: true // 必须设置
        },

        dataBarDay: { // 监控该变量，重新赋值并刷新图表
        handler(newVal, oldVal) {
          this.dataBarDay = newVal
          this.drawBarShellDayChart()
        },
        deep: true // 必须设置
        },

        dataBarXlabelDay: { // 监控该变量，重新赋值并刷新图表
        handler(newVal, oldVal) {
          this.dataBarXlabelDay = newVal
          this.drawBarShellDayChart()
        },
        deep: true // 必须设置
        },

        ipAttackNumDay_list: { // 监控该变量，重新赋值并刷新图表
        handler(newVal, oldVal) {
          this.ipAttackNumDay_list = newVal
          this.drawBarIpDayChart()
        },
        deep: true // 必须设置
        },

        ipAttackName: { // 监控该变量，重新赋值并刷新图表
        handler(newVal, oldVal) {
          this.ipAttackName = newVal
          this.drawBarIpDayChart()
        },
        deep: true // 必须设置
        },

      }
  }



</script>

<style>
.section_title {
  text-align: center;
  font-size: 30px;
  margin-bottom: 10px;
  background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
  color: #1e384d;
  font-weight: 500;
}

.chart-layout .chart-col {
  padding: 15px;
}

.chart {
  height: 400px; /* You can adjust this as necessary */
  margin-bottom: 15px; /* Add some space between the charts */
}

/* Add responsive design for smaller screens */
@media (max-width: 991px) {
  .chart {
    height: 300px; /* Smaller height for smaller screens */
  }
}
</style>
