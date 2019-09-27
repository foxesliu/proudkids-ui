<template>
    
    <div class="main-box">
        <div class="name-box">
            <span class="name">{{firstName}}</span>
            <span class="name">{{lastName}}</span>
            <!-- <span class="sex">
                <img src="../../../static/man.png" alt="" v-if="gender = 0">
                <img src="../../../static/female.png" alt="" v-if="gender = 1">
                {{gender == 0 ? 'Male' : 'Female'}}
            </span> -->
        </div>
        <div class="info-box">
            <ul>
                <li>
                    <span class="title">Gender</span>
                    <span class="titval">{{gender == 0 ? 'Male' : 'Female'}}</span>
                </li>
                <li>
                    <span class="title">Character</span>
                    <span class="titval">{{userInfo.phone == 1 ? 'Full Time' : 'Part Time'}}</span>
                </li>
                <li>
                    <span class="title">Phone Number</span>
                    <span class="titval">{{userInfo.phone}}</span>
                </li>
                <li>
                    <span class="title">E-mall</span><span class="titval">{{userInfo.email}}</span>
                </li>
                <li>
                    <span class="title">Location </span><span class="titval">{{userInfo.addr}}</span>
                </li>
                <li>
                    <span class="title">Education</span><span class="titval">{{userInfo.education ? userInfo.education : '&nbsp;' }}</span>
                </li>
                <li>
                    <span class="title">School Name</span><span class="titval">{{userInfo.schoolName ? userInfo.schoolName : '&nbsp;'}}</span>
                </li>
                <li>
                    <span class="title">Video demo</span><span class="titval">{{userInfo.videoLink}}</span>
                </li>
            </ul>
        </div>
        <div class="info-txt">
            <h3>Tutoring or Teaching Experience & Personaility</h3>
            <p>{{userInfo.ep}}{{userInfo.philosophy}}</p>
        </div>
        <div class="info-txt">
            <h3>What is your teaching philosophy？</h3>
            <!-- <p>A friend of mine named Paul received an automobile from his brother as Christmas present. On Christmas eve, when Paul came out of his office, a street urchin was walking around the shining new car, admiring it.Paul looked at the boy in astonishment, then inpulsivly he added, "Would you like to take a ride in my car?" was walking around the shining new car, admiring it.Paul looked at the boy in astonishment, then inpulsivly he added, "Would you like to take a ride in my car?"</p> -->
            <p>{{userInfo.philosophy}}</p>
        </div>
        <div class="resume-box">
            <span class="title sptitle">RESUME(required)</span>
            <span class="titval spval">{{userInfo.resume}}</span>
            <a :href="userInfo.resume" download="resume"><el-button type="success" size="small" class="resume-btn" >Download</el-button></a>
        </div>
        <div class="imgs-box">
            <div class="img-item">
                <img :src='userInfo.potoes.pc1' alt="" >
                 <a :href="userInfo.potoes.pc1" download="pc1"><el-button type="success" size="small" class="resume-btn" >Download</el-button></a>
            </div>
            <div class="img-item">
                <img :src='userInfo.potoes.pc2' alt="" >
                 <a :href="userInfo.potoes.pc2" download="pc2"><el-button type="success" size="small" class="resume-btn" >Download</el-button></a>
            </div>
            <div class="img-item">
                <img :src='userInfo.potoes.pc3' alt="" >
                 <a :href="userInfo.potoes.pc3" download="pc3"><el-button type="success" size="small" class="resume-btn" >Download</el-button></a>
            </div>
        </div> 
              
    </div>
</template>

<script>
    
    import { mapGetters } from 'vuex';
    //import { formatDate } from '@/utils/index.js'
    //import { buyBills } from "@/api/workorders.js";
    export default {
        data(){
            return{
                firstName:'',
                lastName:'',
                gender:'',
                schoolName:'',
                userInfo:{},
                Education:'',
              }
            },
        methods: {
            download(){
                this.download
            }
        },
        computed: {
        ...mapGetters(['userId'])
        },
        created(){
            
            this.userInfo = JSON.parse(sessionStorage.getItem('index'));
            console.log(this.userInfo);
            this.firstName = this.userInfo.firstName
            this.lastName = this.userInfo.lastName
            this.gender = this.userInfo.gender  
            this.schoolName = this.userInfo.schoolName
            this.userInfo.potoes = JSON.parse(this.userInfo.photographs)
        },
        
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index.scss';
  
    .main-box{
        padding: 20px;
        padding-bottom: 50px;
        .name-box{
            margin-bottom: 44px;
            span{
                display: inline-block;
                margin-right: 5px;
            }
            .name{
            
                height: 43px;
                font-family: ArialMT;
                font-size: 56px;
                color: #343434;
            }
            .sex{           
                height: 10px;
                font-family: VarelaRound-Regular;
                font-size: 10px;
                line-height: 18px;
                color: #ff5fb9;
                padding-left: 5px;
                img{
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                }
            }  
        }
        .info-box{
            
            border-radius: 10px;         
            ul{ 
                padding:0;
                margin:0;
                li{
                    height: 78px;
                    border-bottom: 1px solid #ebeef5;
                }
                .title{
                text-align: right;
                display: inline-block;
                padding-right: 21px;
                width: 208px;
                height: 77px;
                line-height: 77px;
                color: #3b3b3b;
                font-size: 22px;
                font-family: ArialMT;
                background-color: #f1f3f7;
	            
                
                }
                .titval{
                    display: inline-block;
                   
                    height: 77px;
                    line-height: 77px;
                    padding-left: 38px;
                    color: #555555;
                    font-size: 22px;
                    font-family: Arial-BoldMT;
                }
                .sptitle{
                    width: 258px;
                }
                .spval{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 14px;
                }
            }
        }
        .info-txt{
            margin-top: 20px;
            background: #f9f9f9;
            padding-left: 39px;
            padding-top: 34px;
            padding-bottom: 21px;
            margin-bottom: 20px;
            h3{
                margin: 0;
                font-family: ArialMT;
                font-size: 24px;
                letter-spacing: 0px;
                color: #3b3b3b;
                
            }
            p{  
                margin-top: 20px;
                font-family: ArialMT;
                font-size: 15px;
                color: #2e2e2e;
            }
        }
        .imgs-box{
            background: #f9f9f9;
            margin-top: 20px;
            display: flex;
            justify-content: space-around;
            padding-top: 20px;
            padding-bottom: 20px;
            .img-item{
                display: flex;
                flex-direction: column;
                align-items: center;
                img{
                    width: 482px;
                    height: 360px;
                }
                button{
                 margin-top: 20px;
                width: 100px;
                }
                
            }
        }
        .resume-box{
             border-bottom: 1px solid #ebeef5;
                height: 90px;
            .title{
                float: left;
                text-align: right;
                display: inline-block;
                padding-right: 21px;
                width: 208px;
                height: 90px;
                line-height: 90px;
                color: #3b3b3b;
                font-size: 22px;
                font-family: ArialMT;
                background-color: #f1f3f7;
	            
                
                }
            .titval{
                display: inline-block;
                
                height: 90px;
                line-height: 90px;
                padding-left: 38px;
                color: #555555;
                font-size: 22px;
                font-family: Arial-BoldMT;
            }
            .sptitle{
                width: 258px;
            }
            .spval{
                float: left;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 14px;
            }
            .resume-btn{
                
                float: right;
                margin-top: 30px;
                margin-right: 35px;
            }

        }
         
    }

</style>