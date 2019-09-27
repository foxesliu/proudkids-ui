<template>
    <div class="main-box">
        <div class="title-box">
            <h3>{{title}}</h3>
        </div>  
        <div class="table-box">           
            <ul>
                <li class="pull-left c-pointer" v-for="(item,index) in newNum" :key="index" @click="gotopage(item) ">
                    <div class="t-center h-30 font18 t-hidden" v-if="item.stat==3">待审核</div>
                    <div class="t-center h-30 font18 t-hidden" v-if="item.stat==2">流程中</div>
                    <div class="t-center h-30 font18 t-hidden" v-if="item.stat==-1">未通过</div>                    
                    <div class="t-center h-30 font18 t-hidden" v-if="item.stat==1">已通过</div>
                    <div class="t-center h-30 font18 t-hidden" v-if="item.stat==-2">异常工单</div>                    
                    <i class="i font20 t-center h-30">{{item.num}}个</i>
                </li>
                <!-- <li class="pull-left c-pointer" @click="gotopage('/workorder/billList')">
                    <div class="t-center h-30 font18 t-hidden">流程中</div>
                    <i class="i font20 t-center h-30">{{nums[1].num}}个</i>
                </li>
                <li class="pull-left c-pointer" @click="gotopage('/workorder/confirm')">
                    <div class="t-center h-30 font18 t-hidden">未通过</div>
                    <i class="i font20 t-center h-30">{{nums[2].num}}个</i>
                </li>
                <li class="pull-left c-pointer" @click="gotopage('/workorder/confirm')">
                    <div class="t-center h-30 font18 t-hidden">已通过</div>
                    <i class="i font20 t-center h-30">{{nums[3].num}}个</i> -->
                <!-- </li>          -->
            </ul>
        </div>       
    </div>
</template>

<script>
    import { ListNums } from "@/api/workorders.js";
    import { mapGetters } from 'vuex'
    //import {buyBills} from '@/api/workorders.js'
    // import PageTitle from '../components/pagetitle.vue';
    export default {
        components: {
            // 'v-pagetitle': PageTitle
        },
        data() {
            return {
                nums:[],
                // userId:'41',
                //billType:'2',
                newNum:[],
                page:'1',
                limit:'10',
                title:'赠课工单',
                type:'1',  //0 退课，1 赠课，2 购课，3 停课，4 续课
                title1:'',
               
            }
        },
        computed: {
        ...mapGetters(['userId'])
        },
        created() {
            console.log(this.userId)
            this.name = this.$route.query.name;
            this.userType = this.$route.query.userType;
            this.orderArea = this.$route.query.orderArea;

            
            ListNums(this.userId, this.type)
            .then(res => {
            
                console.log(res.data.data);
                this.nums =res.data.data
                console.log(this.nums[0])
                this.sort()
            })
            .catch(res => {
                console.log(res);
            });
           
            
            
        },
        
        methods: {
            sort(arr){
                
                
                for(var i=0;i<this.nums.length;i++){
                    
                    if(this.nums[i].stat == 3){
                        //this.newNum[0] = this.nums[i]
                        this.$set(this.newNum,0, this.nums[i]);
                    }
                    if(this.nums[i].stat == 2){
                        this.$set(this.newNum,1, this.nums[i]);
                    }
                    if(this.nums[i].stat == -1){
                        this.$set(this.newNum,2, this.nums[i]);

                    }
                    if(this.nums[i].stat == 1){
                        this.$set(this.newNum,3, this.nums[i]);

                    }
                    if(this.nums[i].stat == -2){
                        this.$set(this.newNum,4, this.nums[i]);
                    }
                    
                    
            
                }
            },
            gotopage(item) {
                if(item.stat == 3){
                    
                    this.$router.push({path: '/workorder/freecomfirmlist',query:{stat:item.stat,billType:this.type}})
                }
                 if(item.stat == 2){
                    
                    this.$router.push({path: '/workorder/freebills',query:{stat:item.stat,title:this.title,type:this.type}})
                }
                 if(item.stat == -1){
                    this.$router.push({path: '/workorder/freebills',query:{stat:item.stat,title:this.title,type:this.type}})
                }
                if(item.stat == 1){
                    this.$router.push({path: '/workorder/freebills',query:{stat:item.stat,title:this.title,type:this.type}})
                }
                if(item.stat == -2){
                    this.$router.push({path: '/workorder/freebills',query:{stat:item.stat,title:this.title,type:this.type}})
                }               
            }, 
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../index.scss';
  
  .main-box{
      color: #606266;
      .title-box{
        font-size: 18px;
        color: $color-orange;
        height: 60px;
        
        border: 1px solid #ccc;
        padding-left: 20px;
      }
      
      .table-box{
          
          li {
          width: 160px;
          height: 180px;
          border-radius: 10px;
          background: #f6f6f6;
          margin: 0 20px 20px 0;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          align-content: center;
          div {
           
            width: 100%;
            padding: 0 20px;
          }
          .i {
            font-style: normal;
            color: $color-orange;
            line-height: 100px;
            display: block;
            width: 110px;
            height: 110px;
            background: #ffffff;
            margin:  auto;
            margin-top: 10px;
            border:1px solid #ffffff;
            border-radius: 5px;
          }
        }
      }
  }

</style>