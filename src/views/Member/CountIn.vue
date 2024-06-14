<template>
	<span :startTime="startTime" :endTime="endTime" :timeOnChildFlag="timeOnFatherFlag"  :timeOutChildFlag=" timeOutChildFlag" :countChildFlag="countChildFlag">
		<slot>{{content}}</slot>
	</span>
</template>

<script>
	export default {
        name: 'CountIn',
		data(){
			return {
				content: '',
                time: '',
                timerId: 0,
			}
		},
		props:{//接收父组件的数据
			startTime:{type:String,default:''},
            endTime:{type:String,default:''},
            timeOnChildFlag:{type:Boolean,default:false},
            timeOutChildFlag:{type:Boolean,default:false},
            countChildFlag:{type:Boolean,default:true},
		},
		watch: {//监听时间的变化 
            startTime: {
                handler(newVal){
                    this.startTime = newVal
                    this.time = 0
                    // this.countdown()
                }
            },
            endTime: {
                handler(newVal){
                    this.endTime = newVal
                    this.time = 0
                    // this.countdown()
                }
            },
			content: {
                handler(newVal){
                    this.content = newVal
                }
            },
            timeOnChildFlag: {
                handler(newVal){
                    this.timeOnChildFlag = newVal
                    this.countdown()
                }
            },
            timeOutChildflag: {
                handler(newVal){
                    this.timeOutChildflag = newVal
                }
            },
            countChildFlag: {
                handler(newVal){
                    this.countChildFlag = newVal
                }
            },
            
		},
		mounted () {
			this.countdown()
		},
		methods: {
			countdown(){
                console.log('进入countin函数');
                console.log(this.timeOutChildFlag);
                console.log(this.countChildFlag);
                // let nowTime = new Date();
                // let startTime = new Date(this.startTime * 1000);
                if (this.countChildFlag == false) {
                    this.content =  '当前无检测任务'
                    console.log('取消定时');
                    console.log('关闭countin的时钟');
                    console.log(this.timerId)
                    clearInterval(this.timerId)
                    
                }
                else
                {
                    console.log('开启countin');
                    console.log(this.countChildFlag);
                    let self = this;
                    let startTime = new Date(self.startTime * 1000);
                    let endTime = new Date(self.endTime * 1000);
                    console.log(startTime);
                    console.log(endTime);
                    self.time = endTime.getTime() - startTime.getTime();
                    
                    let timer = setInterval(function(){ 
                        self.timerId = timer
                        console.log('查看时钟ID');
                        console.log(self.timerId)
                        console.log('查看时间差');
                        console.log(self.time)
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
                            clearInterval(timer);
                            self.content = '当前无检测任务';
                            self.timeOnChildFlag = false
                            self.timeOutChildFlag = true
                            self.countChildFlag = false
                            self.$emit('update:timeOnChildFlag',self.timeOnChildFlag)
                            self.$emit('update:timeOutChildFlag',self.timeOutChildFlag)
                            self.$emit('update:countChildFlag',self.countChildFlag)
                            self.$message({
                                showClose: true,
                                message: '检测完成,请点击获取检测结果',
                                type: 'success'
                            }) 
                        }
                    },1000);

                    }
                
			}
		}
	}
</script>
