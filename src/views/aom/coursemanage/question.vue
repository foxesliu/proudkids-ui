<template>
  <div class="container">
    <div class="flex-box top-box">
      <div class="lessonName">课节：{{ courseName }}</div>
      <div class="flex-box Qnum-box">
        <span>题目页数:</span>
        <div class="qNum-box">
          <span class="qNum">{{list.length}}</span>
          <button @click="addQuestionPage" class="addBtn" :disabled='isHaveQ'>+</button>
        </div>
      </div>
      <el-button type="primary"  @click="upDate()" v-if="isOnline">确认上线</el-button>
      <el-button type="info" disabled @click="upDate()" v-if="!isOnline">已上线</el-button>

    </div>
    <div class="numQ flex-box" v-if="isHaveQ">
      <div class="title">题目页数</div>
      <div class="input-box">
        <input v-model="pages" type="number" min="1" max="99" maxlength="2">
        <p style="margin-top:10px">最多99题</p>
      </div>
      <el-button type="primary" style="width:140px" @click="addByPageNumber">确认</el-button>
    </div>
    <div v-if="!isHaveQ">
      <div class="flex-box second-box container-box">
        <div class="list flex-box">
          <span>答题本页的人数</span>
          <span>{{allperson}} 人</span>
        </div>
        <div class="list flex-box">
          <span>答题正确率</span>
          <span>{{rightF}} %</span>
        </div>
        <div class="list flex-box">
          <span>答题半对半错率</span>
          <span>{{halfF}} %</span>
        </div>
        <div class="list flex-box">
          <span>答题错误率</span>
          <span>{{falesF}} %</span>
        </div>
      </div>
      <div class="pages-box third-box container-box flex-box">
        <el-button icon="el-icon-arrow-left" class="prev" @click="offsetLeftCut"></el-button>
        <div class="mid" ref="mid">
          <div class="pages ul" ref="ul" :style="{left:offsetLeft+'px'}">
            <button v-for="(items,index) in list" :key="index" @click="chooesPage(items,index)" :class="{active : isActive == index}" :disabled='isChooesType'>{{index+1}}</button>
          </div>
        </div>
        <el-button icon="el-icon-arrow-right" class="next" @click="offsetLeftAdd"></el-button>
      </div>
      <div class="position-box">
        <div class="flex-box fourth-box container-box">
          <div class="left">
            <span>{{isActive+1}}</span>
            <span>/</span>
            <span>{{list.length}}</span>
          </div>
          <div class="mid">
            <span>题型：</span>
            <!-- <el-button type="primary" size="mini" style="width:110px">视频题</el-button> -->
            <el-button type="primary" size="mini" style="width:110px"  v-if="questionType == -1">未选择题型</el-button>
            <el-button type="primary" size="mini" style="width:110px"  v-else-if="questionType == 0">画图题</el-button>
            <el-button type="primary" size="mini" style="width:110px"  v-else-if="questionType == 1">语音题</el-button>
            <el-button type="primary" size="mini" style="width:110px"  v-else-if="questionType == 2">拍照题</el-button>
            <el-button type="primary" size="mini" style="width:110px"  v-else-if="questionType == 3">视频题</el-button>
          </div>
          <div class="item-right">
            <el-button type="danger" style="width:140px" :disabled='isChooesType' @click="deletePage">删除该页</el-button>
            <el-button type="primary" style="width:140px" :disabled='isChooesType' @click="chooesTypeOfQ">切换到编辑模式</el-button>
          </div>
        </div>
        <div class="typeOfQ flex-box" v-if="isChooesType">
          <div class="title1">
            <p>选择本题的模式</p>
            <p v-show="isSwitch">切换题型将会丢失当前题型编辑进度</p>
          </div>
          
          <template>
            <el-radio-group v-model="radio" @change="getRadio">
              <el-radio :label="0" border style="margin-right:10px;">画图题</el-radio>
              <el-radio :label="1" border style="margin-right:10px;">语音题</el-radio>
              <el-radio :label="2" border style="margin-right:10px;">拍照题</el-radio>
              <el-radio :label="3" border>视频题</el-radio>
            </el-radio-group>
          </template>
          <div>
            <el-button type="danger" style="width:140px" @click="noChoose()">取消</el-button>
            <el-button :type="radio == -1 ? 'info' : 'primary'" v-if="!isSwitch"  :disabled='radio == -1' style="width:140px" @click="chooseLessonType()">进入</el-button>
            <el-button  type = 'primary' v-if="isSwitch" style="width:140px" @click="chooseLessonType()">切换</el-button>
          </div>
        </div>
      </div>
      <div class="container-box fifth-box">
        <div v-for="(item, index) in fQuestionList" :key="item.rank">
        <Question
          :theUrl="item.value"
          :theControlList="item.controlList"
          :questionAudioType="true"
          :questionType="item.type"
          :rank="index"
          :isPaint="item.isPaint"
          ref="Question"
          :isHander="false"
        />
        <Answer ref="answers"  :questionType="item.type" :rank="index" :textVal="item.value" :isHander="false" :isOpen="item.open"></Answer>
      </div> 
      </div>
    </div>
  </div>
</template>

<script>
import { addByPageNum,getLessonSectionByPamas,addItem,questionDdtail,upDateLesson,upDateLessonType,deleteLessonPage } from "../../../api/aom.js";
import Question from "../components/question";
import Answer from "../components/answer";
export default {

    components: { Question, Answer },

  data() {
    return {
      fQuestionList:[],
      isHander:false,
      lessSecId:'',
      courseName:'',
      questionType:'',
      isChooesType:false,
      isSwitch:false,
      isActive:0,
      allperson:'',
      rightF:'',
      halfF:'',
      falesF:'',
      isOnline:true,
      isHaveQ:false,
      isPaint:false,
      pages: "",
      choosePage:1,
      radio: -1,
      chooesPageType:'',
      offsetLeft: 0,
      input5: 5,
      input:'',
      pageNum:{
        pageNum:'',
        lessonId:'',
        courseId:'',
        mold:'',
      },
      LessonType:{
        lessSecId:'',
        type:'',
      },
      pamas:{
        lessonId:'',
        mold:'',
      },

      list: [
        
      ]
    };
  },
  created() {
    this.courseName = this.$route.query.courseName
    this.pageNum.lessonId = this.$route.query.lessonId;
    this.pageNum.courseId = this.$route.query.courseId;
    this.pageNum.mold = this.$route.query.mold;
    this.pamas.lessonId = this.$route.query.lessonId;
    this.pamas.mold = this.$route.query.mold;
    sessionStorage.setItem('lessonId',this.pageNum.lessonId);
    sessionStorage.setItem('courseId',this.pageNum.courseId);
    // console.log(this.pageNum)
    
    this.isActive = Number(sessionStorage.getItem('page'))

    this.getLessonSection(this.isActive)
    
  },
  destroyed() {
    sessionStorage.removeItem('page')
  },
  methods: {
     _questionDdtail(){
      questionDdtail(this.lessSecId).then((res) => {
        let data = res.data.data
        for(var i=0;i<data.length;i++){
          data[i].type = Number(data[i].type)
        }
        this.fQuestionList = data.details
        if(this.questionType == 0){
          for(var i=0;i<this.fQuestionList.length;i++){
          if(this.fQuestionList[i].type == 1){
            this.fQuestionList[i].isPaint=true
          }else{
            this.fQuestionList[i].isPaint=false
          }
        }
      console.log(this.fQuestionList)
    }
        console.log(res)
      }).catch((res) => {
        console.log(res)
      })
    },
    deletePage(){ //删除题目详情内容
      console.log(this.isActive)
      if(this.list.length==this.isActive+1){
        this.isActive = this.isActive-1
      }
      this.isActive = 0;
      deleteLessonPage(this.LessonType.lessSecId).then((res) => {
        this.getLessonSection(0);
        // console.log(res)
      }).catch((res) => {
        // console.log(res)
      })
    },
    getRadio(){
      console.log(this.chooesPageType)
      if(this.chooesPageType != this.radio && this.chooesPageType != -1){
        this.isSwitch = true;
      }else{
        this.isSwitch = false;
      }
      console.log(this.radio)
    },
    upDate(){ //上线
      upDateLesson({
        lessonId:this.pageNum.lessonId,
        mold:this.pageNum.mold
      }).then((res) =>{
        this.isOnline = false;
        // console.log(res)
      }).catch((res) =>{
        // console.log(res)
      })
    },
    chooseLessonType(){ //切换/选择题目类型
    console.log(this.radio)
      this.LessonType.type = this.radio
      upDateLessonType(this.LessonType).then((res) =>{
        let data = res.data.data
        this.questionType = data.type
        this.noChoose()
        this.$router.push({
        path: "/aom/coursemanage-edit",
        query: {
          courseId: this.pageNum.courseId,
          lessonId: this.pageNum.lessonId,
          type:data.type,
          page:this.choosePage
        }
      });
        // console.log(res)
      }).catch((res) =>{
        // console.log(res)
      })
    },
    selectedQuestionDetail(lessSecId){ //选择题目详细类容
      questionDdtail(lessSecId).then((res) =>{
        let data = res.data.data
        // console.log(res)
        this.allperson = data.ap;
        this.rightF = data.rf;
        this.halfF = data.hf;
        this.falesF = data.wf;
      }).catch((res) =>{
        // console.log(res)
      })
    },
    chooesTypeOfQ(){ //控制选择题目类型弹框
      this.isChooesType = true;
    },
    noChoose(){
      this.isChooesType = false;
      // this.radio = -1;
    },
    chooesPage(item,index){
      this.fQuestionList=[];
      this.isActive = index;
      this.choosePage = index +1;
      console.log(this.choosePage)
      this.LessonType.lessSecId = item.id
      sessionStorage.setItem('lessSecId',item.id)
      this.questionType = Number(item.type)
      this.radio = Number(item.type)
      this.chooesPageType = Number(item.type)
      this.selectedQuestionDetail(item.id)
      this.lessSecId = item.id
      this._questionDdtail()
    },
    addQuestionPage(){//添加页数
      this.pageNum.pageNum = null;
      addItem(this.pageNum).then((res) =>{
        let data = res.data.data
        this.list.push(data)
        // console.log(data)
      }).catch((res) =>{
        // console.log(res)
      })
    },

    offsetLeftCut() {//左切换
      if (
        this.$refs.ul.clientWidth > this.$refs.mid.clientWidth &&
        this.offsetLeft != 0
      ) {
        this.offsetLeft = this.offsetLeft + 66;
      }
    },
    offsetLeftAdd() {//右切换
      console.log(this.$refs.ul.clientWidth);
      console.log(this.$refs.mid.clientWidth);
      if (
        this.$refs.ul.clientWidth > this.$refs.mid.clientWidth &&
        this.offsetLeft + this.$refs.ul.clientWidth > this.$refs.mid.clientWidth
      ) {
        this.offsetLeft = this.offsetLeft - 66;
      }
      console.log(this.offsetLeft);
    },
    addByPageNumber(){//根据number添加也数
      this.pageNum.pageNum = this.pages
      addByPageNum(this.pageNum).then((res) =>{
        this.isHaveQ = false;
        this.getLessonSection(this.isActive)
        // console.log(res.data.data)
      }).catch((res) =>{
        // console.log(res)
      })
    },
    getLessonSection(index){//题目列表和统计数据
      getLessonSectionByPamas(this.pamas).then((res) =>{
        let data = res.data.data  
        // console.log(data)
        if(data.stat == 1){
          this.isOnline = false;
        }
        sessionStorage.setItem('pageNumber',data.pn)
        if(data.ret == '1'){
          this.isHaveQ = true;
        }
        if(data.ret == '0'){
          this.list = res.data.data.list
          this.LessonType.lessSecId = this.list[index].id
          sessionStorage.setItem('lessSecId',this.list[index].id)
          this.radio = Number(this.list[index].type)
          this.questionType = Number(this.list[index].type)
          this.chooesPageType = Number(this.list[index].type)
          this.lessSecId = this.list[index].id
          this._questionDdtail()
        }
        this.selectedQuestionDetail(this.list[index].id)
        // console.log(res.data.data)
        
      }).catch((res) =>{
        // if(res.code == 1){
        //   this.isHaveQ = true;
        // }
        console.log(res)
      })
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../index.scss";
ul,
li,p {
  margin: 0;
  padding: 0;
}
.container {
  padding: 20px 15px;
  .top-box {
    height: 66px;
    justify-content: space-between;
    align-items: center;
    background-color: #f9fafc;
    border-radius: 8px;
    padding: 0 15px;
    border: solid 1px #dcdfe6;
    .lessonName {
      font-size: 20px;
      color: #666666;
      font-weight: bold;
    }
    .Qnum-box {
      flex: 1;
      justify-content: flex-end;
      align-items: center;
      margin-right: 185px;
      > span {
        font-size: 14px;
        color: #666666;
      }
      .qNum-box {
        height: 38px;
        border-radius: 4px;
        border: solid 1px #dcdfe6;
        overflow: hidden;
        margin-left: 20px;
      }
      .qNum {
        display: inline-block;
        width: 74px;

        text-align: center;
      }
      .addBtn {
        width: 36px;
        background-color: #eff4fc;
        border: none;
        border-radius: 0;
        border-left: solid 1px #dcdfe6;
        text-align: center;
        height: 100%;
        cursor: pointer;
      }
    }
  }
  .numQ {
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 449px;
    height: 323px;
    margin: 0 auto;
    margin-top: 192px;
    background-color: #ffffff;
    box-shadow: 0px 2px 35px 0px rgba(88, 93, 107, 0.11);
    border-radius: 8px;
    border: solid 1px #dcdfe6;
    color: #666666;
    .title {
      font-size: 28px;
    }
    .input-box {
      margin-top: 25px;
      input{
        width: 164px;
	      height: 38px;
        border-radius: 4px;
        border: solid 1px #dcdfe6;
        text-align: center;
      }
      >P{
        font-size: 14px;
        color: #d6d6d6;
        text-align: center;
      }
    }
  }
  .second-box {
    height: 66px;
    .list {
      font-size: 14px;
      color: #606266;
      align-items: center;
      margin-right: 30px;
      span {
        display: inline-block;
      }
      span:nth-child(2) {
        width: 75px;
        line-height: 38px;
        text-align: center;
        background-color: #ffffff;
        border-radius: 4px;
        border: solid 1px #dcdfe6;
        margin-left: 8px;
      }
    }
  }
  .third-box {
    justify-content: space-between;
    align-items: center;
    height: 88px;
    .prev,
    .next {
      width: 55px;
      height: 46px;
    }
    .prev {
      margin-right: 10px;
    }
    .next {
      justify-items: flex-end;
      margin-left: 10px;
    }
    .mid {
      flex: 1;
      position: relative;
      height: 46px;
      overflow: hidden;
    }
    .pages {
      position: absolute;
      /*left: 0;*/
      top: 0;
      height: 46px;

      white-space: nowrap;
      > button {
        display: inline-block;
        border:none;
        padding:0;
        width: 46px;
        height: 46px;
        background-color: #449cfc;
        font-size: 24px;
        color: #ffffff;
        margin: 0 10px;
        text-align: center;
        line-height: 46px;
        cursor: pointer;
        outline:none;
      }
      .active{
        background-color: #3eb982;
        color: #ffffff;
      }
    }
  }
  .fourth-box {
    justify-content: space-between;
    align-items: center;
    height: 66px;
    color: #666666;
    padding-right: 0;
    .left {
      width: 127px;
      height: 100%;
      border-right: solid 1px #dcdfe6;
      text-align: center;
      line-height: 66px;
      span {
        font-size: 36px;
      }
      span:nth-child(2) {
        font-weight: 300;
      }
      span:nth-child(3) {
        font-size: 14px;
      }
    }
    .mid {
      flex: 1;
      line-height: 66px;
      height: 100%;
      padding-left: 20px;
      background-color: #ffffff;
      position: relative;
    }
    .item-right {
      padding-right: 15px;
      line-height: 66px;
      height: 100%;
      background-color: #ffffff;
      border-radius: 8px;
    }
  }
  .position-box {
    position: relative;
    .typeOfQ {
      color: #666666;
      width: 648px;
      height: 314px;
      position: absolute;
      top: 73px;
      left: 50%;
      margin-left: -324px;
      background: #ffffff;
      border: solid 1px #dcdfe6;
      box-shadow: 0px 2px 35px 0px rgba(88, 93, 107, 0.11);
      border-radius: 8px;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      z-index: 9999;
      .title1 {
        p{
          text-align: center;
        }
        p:nth-child(1){
          font-size: 28px;
        }
        p:nth-child(2){
          margin-top: 15px;
          font-size: 14px;
          color: #ff5a4e;
        }
      }
    }
  }
  .fifth-box {
    min-height: 600px;
    background-color: #ffffff;
    padding-bottom: 20px;
  }
}
.container-box {
  margin-top: 20px;
  align-items: center;
  background-color: #f9fafc;
  border-radius: 8px;
  padding: 0 15px;
  border: solid 1px #dcdfe6;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type="number"]{
    -moz-appearance: textfield;
}
</style>