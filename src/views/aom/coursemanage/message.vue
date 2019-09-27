<template>
  <div class="container">
    <div class="top-box flex-box">
      <div class="title flex-box">
        <span class="courseName">课程名称：</span>
        <span>{{courseName}}</span>
      </div>
      <div class="title flex-box">
        <span style="border-left: solid 1px #dcdfe6;">课节名称：</span>
        <span>{{lessonName}}</span>
      </div>
    </div>
    <div class="main-box">
      <div class="flex-box ">
        <span>精美文字：</span>
        <el-button type="primary" @click="saveText">提交保存</el-button>
      </div>
      <div class="txt-box">
        <el-input type="textarea"  placeholder="请输入内容" v-model="textarea" :autosize="{ minRows: 4, maxRows: 10}" style="background:#f7f7f7"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
 import {getText,saveText} from '@/api/aom'
export default {
    data() {
        return {
            textarea: '',
            lessonId:'',
            mold:'',
            id:null,
            courseId:'',
            mode:'',
            courseName:'',
            lessonName:''
        }
    },
    methods: {
        _getText () {
            var obj = {
                courseId:this.courseId,
                lessonId: this.lessonId,
                mode: this.mode
            };
            getText(obj).then((res) => {
                let data = res.data.data
                this.textarea = data.content
                this.id = data.id
                console.log(res)
            }).catch((res) => {
                console.log(res)
            })
        },

        saveText() {
            var obj = {
                content: this.textarea,
                id:this.id,
                courseId: this.courseId,
                lessonId: this.lessonId,
                mode: this.mode
            };

            saveText(obj).then((res)=>{
                this.$router.back(-1)
                console.log(res);
            });
        }
    },
    created(){
        this.lessonId = this.$route.query.lessonId;
        this.courseName = this.$route.query.courseName;
        this.lessonName = this.$route.query.lessonName;
        this.mode = this.$route.query.mold;
        this.courseId = this.$route.query.courseId;
        console.log(this.mode)
        this._getText()
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../index.scss";
.container{
    padding: 15px;
}
.top-box{
   
    height: 66px;
	background-color: #ffffff;
	border-radius: 8px;
	border: solid 1px #dcdfe6;
    justify-content: space-evenly;
    .title{
        width: 50%;
        line-height: 66px;
        justify-content: space-evenly;
        span{
            text-align: center;
            width: 50%;
        }
        span:nth-child(1){
            background-color: #f9fafc;
	        
            border-right: solid 1px #dcdfe6;
        }
        .courseName{
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
        }
    }
}
.main-box{
    border-radius: 8px;
    padding: 15px 10px;
    margin-top: 20px;
	border: solid 1px #dcdfe6;
    background-color: #ffffff;
    >div:nth-child(1){
        justify-content: space-between;
        align-items: center;
    }
    .txt-box{
        margin-top: 10px;
        textarea,.el-textarea__inner{
            background-color: #f7f7f7;
        }
    }
}
</style>