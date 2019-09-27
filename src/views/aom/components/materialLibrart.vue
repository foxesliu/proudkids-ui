<template>
  <div class="container-box">
    <div class="container">
      <div class="flex-box top-box">
        <div class="item" :class="isActive == 1 ? 'active' : ''" @click="getMaterialType(1)">图片</div>
        <div class="item" :class="isActive == 2 ? 'active' : ''" @click="getMaterialType(2)">音频</div>
        <div class="item" :class="isActive == 3 ? 'active' : ''" @click="getMaterialType(3)">视频</div>
      </div>
      <div class="flex-box bottom-box" v-if="isActive=='1'">
        <div class="li flex-box" v-for="(item,index) in imgArry" :key="index" @click="chooseM(item.path,item.type)" >
          <div class="img-box">
            <img  :src='item.path' alt="">
          </div>
          <el-button type="danger" class="deleteBtn" @click.stop="deleteM(item.id)">删除</el-button>
        </div>
      </div>
      <div class="flex-box bottom-box" v-if="isActive=='2'">
        <ul>
          <li class="flex-box" v-for="(item,index) in audioArry" :key="index" @click="chooseM(item.path,item.type,item)" >
            <div class="flex-box">
              <span class="icon flex-box">
                <img src="../../../assets/workDetail/mp3icon.png" alt="">
              </span>
              <span class="filename">{{item.name}}</span>
            </div>
            <el-button type="danger" class="deleteBtn" size="mini" @click.stop="deleteM(item.id)" >删除</el-button>
          </li>
        </ul>
      </div>
      <div class="flex-box bottom-box" v-if="isActive=='3'">
        <ul>
          <li class="flex-box" v-for="(item,index) in videoArry" :key="index" @click="chooseM(item.path,item.type)">
            <div class="flex-box">
              <span class="icon flex-box">
                <img src="../../../assets/workDetail/videoicon.png" alt="">
              </span>
              <span class="filename">{{item.name}}</span>
            </div>
            <el-button type="danger" class="deleteBtn" size="mini"  @click.stop="deleteM(item.id)">删除</el-button>
          </li>
        </ul>
      </div>
    </div>
    <div class="message-box" v-if="messageShow" @click.stop="messageShow = false">
      <img src="../../../assets/workDetail/message.png" alt="">
    </div>
  </div>
</template>

<script>
import { getMaterialsByType,deleteMaterial } from "../../../api/aom.js";
export default {
  props: {isDrawType:{}},
  
  data() {
    return {
      getMaterialTypeObj:{
        courseId:'',
        lessonId:'',
        type:1
      },
      isOpen:false,
      isSelect:null,
      questionList:[],
      imgArry:[],
      audioArry:[],
      videoArry:[],
      courseId:'',
      lessonId:'',
      isActive: 1,
      isUpload: false,
      messageShow:false,
      files: [
        {
          name: "11",
          progress: 66
        }
      ]
    };
  },
  created() {
    this.getMaterialTypeObj.courseId = sessionStorage.getItem('courseId');
    this.getMaterialTypeObj.lessonId = sessionStorage.getItem('lessonId');
    this.getMaterialsData();
    console.log(this.isDrawType)
  },
  methods: {
    chooseM(path,type){  //选择素材
    let isDrawType = false
     console.log(this.$parent.fQuestionList)
     if(type == 2){
       this.isOpen = true;
     }
     if(this.isDrawType){
       type = 12
       isDrawType = true
     }
    this.$parent.fQuestionList.push({
      value:path,
      type:type,
      rank:this.$parent.fQuestionList.length,
      isOpen:this.isOpen,
      isDrawType:isDrawType
    })
    this.$parent.fisDrawType= false;
    this.$parent.selectFodder = false;
    this.$parent.centerDialogVisible = false;
    console.log(this.$parent)
    },
    deleteM(id){ //删除素材
      deleteMaterial(id).then((res) => {
        let data = res.data.data
        if(this.getMaterialTypeObj.type == 1){
          this.imgArry = data
        }
        if(this.getMaterialTypeObj.type == 2){
          this.audioArry = data
        }
        if(this.getMaterialTypeObj.type == 3){
          this.videoArry = data
        }
        console.log(res)
      }).catch((res) => {
        console.log(res)
      })
    },
    getMaterialsData(){
      getMaterialsByType(this.getMaterialTypeObj).then((res) => {
        let data = res.data.data
        this.imgArry = data
        console.log(this.imgArry)
      }).catch((res) => {
        console.log(res)
      })
    },
    getMaterialType(param) {
      this.isActive = param;
      this.getMaterialTypeObj.type = param;
      console.log(this.isDrawType)
      if(this.isDrawType){
        if(param !=1){
          this.messageShow = true;
        }else{
          this.messageShow = false;
        }
      }else{
         
        getMaterialsByType(this.getMaterialTypeObj).then((res) => {
        let data = res.data.data
        console.log(data)
        if(this.getMaterialTypeObj.type == 1){
          this.imgArry = data
        }
        if(this.getMaterialTypeObj.type == 2){
          this.audioArry = data
        }
        if(this.getMaterialTypeObj.type == 3){
          this.videoArry = data
        }
      }).catch((res) => {
        console.log(res)
      })  
      }
      
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../index.scss";
ul,
li {
  margin: 0;
  padding: 0;
}
.container-box {
  // background: #000000;
  // width: 100%;
  position: relative;
}
.container {
  padding: 0px 15px 0 15px;
  width: 1200px;
  background-color: #ffffff;
  border-radius: 4px;
  min-height: 600px;
  .top-box {
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #d8d8d8;
    .item {
      width: 265px;
      height: 67px;
      font-size: 20px;
      line-height: 67px;
      text-align: center;
      cursor: pointer;
      margin-bottom: -1px;
    }
    .active {
      color: #449cfc;
      border-bottom: 2px solid #449cfc;
    }
  }
  .bottom-box {
    margin-top: 20px;
    margin-left: 10px;
    flex-wrap: wrap;
    height: 600px;
    overflow: auto;
    .li {
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 20px;
      cursor: pointer;
      .img-box {
        width: 205px;
        height: 205px;
        background-color: #449cfc;
        border-radius: 4px;
        margin-bottom: 9px;
        margin-right: 10px;
        margin-left: 10px;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  ul {
    height: 500px;
    overflow: auto;
    width: 100%;
    li {
      list-style: none;
      width: 100%;
      height: 46px;
      background-color: #efefef;
      border-radius: 4px;
      padding: 0 12px;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      cursor: pointer;

      > .flex-box {
        justify-content: flex-start;
        align-items: center;
      }
      .icon {
        margin-right: 10px;
        align-items: center;
        justify-content: center;
      }
      .progress {
      }
    }
  }
  .message-box{
    position:absolute;
    z-index: 9999;
    top: 50%;
    left: 50%;
    margin-left: -122px;
    margin-top: -152px;
    cursor: pointer;

  }
}
</style>