<template>
	<span :startTime="startTime" :countFatherFlag="countFatherFlag" :timeOnChildFlag="timeOnChildFlag">
		<slot>{{content}}</slot>
	</span>
</template>

<script>
	export default {
        name: 'CountDown',
		data(){
			return {
				content: '',
                time: '',
                timerId: 0,
			}
		},
		props:{//接收父组件的数据
			startTime:{type:String,default:''},
            countFatherFlag:{type:String,default:false},
            timeOnChildFlag:{type:String,default:false}
		},
		watch: {//监听时间的变化 
            startTime: {
                handler(newVal){
                    this.startTime = newVal
                    this.time = 0
                    // this.countdown()
                }
            },
             countFatherFlag: {
                handler(newVal){
                    this.countFatherFlag = newVal
                    this.countdown()
                }
            },
			content: {
                handler(newVal){
                    this.content = newVal
                }
            },
            timeOnChildflag: {
               handler(newVal){
                    this.timeOnChildflag = newVal
                }
            }
            
		},
		mounted () {
			this.countdown()
		},
		methods: {
			countdown(){
                if (this.countFatherFlag == false) {
                    this.content =  '当前无定时任务'
                    console.log('取消定时');
                    console.log('关闭之前的时钟');
                    console.log(this.timerId)
                    clearInterval(this.timerId)
                    
                }
                else{
                    console.log('开启定时');
                    console.log('调用countdown');
                    console.log(this.countFatherFlag);
                    let self = this;
                    let nowTime = new Date();
                    let startTime = new Date(self.startTime * 1000);
                    console.log(nowTime);
                    console.log(startTime);
                    self.time = startTime.getTime() - nowTime.getTime();
                    
                    let timer = setInterval(function(){ 
                        self.timerId = timer
                        console.log('查看时钟ID');
                        console.log(self.timerId)
                        if(self.time>0){
                            console.log('查看timer');
                            console.log(timer);
                            console.log(self.time);
                            let day = Math.floor(self.time/86400000);
                            let hour=Math.floor((self.time/3600000)%24);
                            let min=Math.floor((self.time/60000)%60);
                            let sec=Math.floor((self.time/1000)%60);
                            hour = hour < 10 ? "0" + hour : hour;
                            min = min < 10 ? "0" + min : min;
                            sec = sec < 10 ? "0" + sec : sec;
                            let format = '';
                            if(day > 0){
                                format = `${day}天${hour}小时${min}分${sec}秒`;
                            }
                            if(day <= 0 && hour > 0 ){
                                format = `${hour}小时${min}分${sec}秒`;
                            }
                            if(day <= 0 && hour <= 0){
                                format =`${min}分${sec}秒`;
                            }
                            self.content = format;
                            self.time = self.time - 1000;
                            
                        }else{
                            self.$message({
                                showClose: true,
                                message: '开始检测',
                                type: 'success'
                            }) 
                            clearInterval(timer);
                            self.content = '当前无定时任务';
                            self.timeOnChildFlag = true
                            self.$emit('update:timeOnChildFlag',self.timeOnChildFlag)
                        }
                    },1000);

                    }
                
			}
		}
	}
</script>
