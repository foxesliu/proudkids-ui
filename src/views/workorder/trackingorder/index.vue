<template>
    <div class="main-box">
        <div class="title-box">
            <h3>{{title}}</h3>
        </div>  
        <div class="table-box">           
            <div class="paylist-box">
                <span>支付核销</span>
                <div class="pay-flex">
                    <div class="pay-items">
                        <span>21个</span>
                    </div>
                    <div class="pay-items">
                        <span>21个</span>
                    </div>
                </div>
            </div>
        </div>       
    </div>
</template>

<script>
    import {ruserDetail} from '@/api/workorders.js'
    // import PageTitle from '../components/pagetitle.vue';
    export default {
        components: {
            // 'v-pagetitle': PageTitle
        },
        data() {
            return {
                toBeConfirmNum:'1',
                title:'在线生成的订单'
            }
        },
        created() {
            this.name = this.$route.query.name;
            this.userType = this.$route.query.userType;
            this.orderArea = this.$route.query.orderArea;
            
        },
        // mounted(){
        //     this.ruserDetailTe()
            
        // },
        methods: {
            gotopage(url, sTitle) {
                this.$router.push({path: url, query: {sTitle: sTitle}});
            },
            // ruserDetailTe(){
            //     ruserDetail(this.phone).then(res=>{
            //         console.log(res)
            //     })
            // },
            // gotoCourse(id) {
            //     this.$router.push({path: '/workorder/financemanage', query: {id: id}});
            // }
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import '../index.scss';

    .main-box{
        .title-box{
        font-size: 18px;
        color: $color-orange;
        height: 60px;
        
        border: 1px solid #ccc;
        padding-left: 20px;
        }
        
        .table-box{
            margin: 30px 20px;
            .paylist-box{
                width: 400px;
                height: 400px;
                background: #f6f6f6;
                span{
                    display: block;
                    height: 60px;
                    line-height: 60px;
                    font-size: 16px;
                    text-align: center;
                    font-weight: bold;
                }
            .pay-flex{
                display: flex;
                .pay-items{
                    width: 150px;
                    height: 150px;
                    background: #ffffff;
                   
                }
            }
        }
        //  background: #f6f6f6;
        //   li {
        //   width: 160px;
        //   height: 180px;
        //   border-radius: 10px;
          
        //   margin: 0 20px 20px 0;
        //   display: flex;
        //   align-items: center;
        //   flex-wrap: wrap;
        //   align-content: center;
        //   div {
           
        //     width: 100%;
        //     padding: 0 20px;
        //   }
        //   .i {
        //     font-style: normal;
        //     color: $color-orange;
        //     line-height: 100px;
        //     display: block;
        //     width: 110px;
        //     height: 110px;
        //     background: #ffffff;
        //     margin:  auto;
        //     margin-top: 10px;
        //     border:1px solid #ffffff;
        //     border-radius: 5px;
        //   }
        
      }
  }

</style>