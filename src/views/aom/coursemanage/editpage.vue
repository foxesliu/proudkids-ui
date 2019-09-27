<template>
  <div class="container">
    <div>
      <div class="flex-box fourth-box container-box">
        <div class="left">
          <span>{{page}}</span>
          <span>/</span>
          <span>{{pageNumber}}</span>
        </div>
        <div class="mid">
          <span>题型：</span>
          <!-- <el-button type="primary" size="mini" style="width:110px">视频题</el-button> -->
          <el-button type="primary" size="mini" style="width:110px" v-if="questionType == -1">未选择题型</el-button>
          <el-button
            type="primary"
            size="mini"
            style="width:110px"
            v-else-if="questionType == 0"
          >画图题</el-button>
          <el-button
            type="primary"
            size="mini"
            style="width:110px"
            v-else-if="questionType == 1"
          >语音题</el-button>
          <el-button
            type="primary"
            size="mini"
            style="width:110px"
            v-else-if="questionType == 2"
          >拍照题</el-button>
          <el-button type="primary" style="width:110px" v-else-if="questionType == 3">视频题</el-button>
        </div>
        <div class="item-right">
          <el-button type="danger" style="width:140px" @click="goBack()">取消</el-button>
          <el-button type="primary" style="width:140px" @click="_editLessonId()">确认提交</el-button>
        </div>
      </div>
    </div>
    <div class="questiones">
      <div class="top-box flex-box">
        <span>题目详情</span>
        <div class="flex-box upfile">
          <span>添加素材</span>
          <div class="btn" @click="upLoad">
            <img src="../../../assets/workDetail/updatafile.png" alt>
          </div>
        </div>
      </div>
      <div class="flex-box add-box">
        <div class="item1">
          <span>添加:</span>
          <el-button type="primary" @click="isselectFodder">在素材库选择素材</el-button>
          <el-button type="primary" @click="answerWay(0,false)" v-if="questionType!=0">添加文字</el-button>
        </div>
        <div class="item2" v-if="questionType!=0">
          <el-button type="success" @click="answerWay(6,false)">视频作答</el-button>
          <el-button type="success" @click="answerWay(5,false)">拍照作答</el-button>
          <el-button type="success" @click="answerWay(7,true)">音频作答</el-button>
          <el-button type="success" @click="centerDialogVisible = true">画板作答</el-button>
        </div>
        <el-button type="success" @click="clearQ()">清空</el-button>
      </div>

      <!-- <Question :questionType="1"></Question>
      <Question :questionType="2"></Question>-->
      <div v-for="(item, key) in fQuestionList" :key="item.rank">
        <Question
          :theUrl="item.value"
          :theControlList="item.controlList"
          :questionAudioType="true"
          :questionType="item.type"
          :isPaint="isPaint"
          :rank="key"
          :isHander="true"
          ref="Question"
        />
        <Answer
          ref="answers"
          @getCalled="getCalled"
          :questionType="item.type"
          :rank="key"
          :textVal="item.value"
          :isHander="true"
          :isOpen="item.open"
        ></Answer>
      </div>
    </div>
    <div v-if="isUpLoad" class="position-box">
      <div class="img-box">
        <img src="../../../assets/workDetail/positionQuit.png" alt @click="upLoad">
        <Upload></Upload>
      </div>
    </div>
    <div v-if="selectFodder" class="position-box">
      <div class="img-box">
        <img src="../../../assets/workDetail/positionQuit.png" alt @click="isselectFodder">
        <materiaLib ref="materiaLib" :isDrawType="fisDrawType"></materiaLib>
      </div>
    </div>
    <el-dialog title="画板类型" :visible.sync="centerDialogVisible" width="25%" center style="margin-top:20vh">
      <div style="margin-top: 10px" class="flex-box">
        <el-radio v-model="radio2" label="1" border size="medium" style='width:100px'>空画板</el-radio>
        <el-radio v-model="radio2" label="2" border size="medium"  style='margin-left:84px;'>素材库</el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false" style='width:140px;height:37px' type="danger">取 消</el-button>
        <el-button type="primary" @click="drawWay(12,radio2)" style='margin-left:43px;width:140px;height:37px'>切 换</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Question from "../components/question";
import Answer from "../components/answer";
import Upload from "../components/upLoad";
import materiaLib from "../components/materialLibrart";
import {
  getMaterialsByType,
  editLessonId,
  questionDdtail
} from "../../../api/aom.js";

export default {
  components: { Question, Answer, Upload, materiaLib },
  data() {
    return {
      isHander: false,
      lessSecId: null,
      selectFodder: false,
      isUpLoad: false,
      files: [],
      inputTxt: "",
      page: null,
      pageNumber: "",
      questionType: "1",
      fileList: [],
      isPaly: true,
      fQuestionList: [],
      isPaint: false,
      centerDialogVisible: false,
      fisDrawType:false,
      radio2:'1',
      materiaParam: {
        lessonId: "",
        courseId: "",
        ruserId: "",
        type: 2
      },
      audios: [
        {
          url: "./static/music.mp3",
          controlList: "onlyOnePlaying"
        },
        {
          url: "./static/music.mp3",
          controlList: "onlyOnePlaying"
        },
        {
          url: "./static/music.mp3",
          controlList: "onlyOnePlaying"
        }
      ]
    };
  },
  created() {
    this.questionType = this.$route.query.type;
    this.pageNumber = sessionStorage.getItem("pageNumber");
    this.page = Number(this.$route.query.page);
    this.lessSecId = sessionStorage.getItem("lessSecId");
    sessionStorage.setItem("page", this.page - 1);
    if (this.questionType == 0) {
      this.isPaint = true;
      console.log(this.isPaint);
    }
    this._questionDdtail();
  },
  destroyed() {
    // sessionStorage.removeItem('page')
  },
  methods: {
    // getMateriaData(){
    //   getMaterialsByType(this.materiaParam).then((res) => {
    //     console.log(res)
    //   }).catch((res) => {
    //     console.log(res)
    //   })
    // },
    getCalled(a, rank) {
      this.isOpen = a;
      this.fQuestionList[rank].open = a;

      console.log(this.fQuestionList);
    },
    goBack() {
      this.$router.back(-1);
    },
    _questionDdtail() {
      questionDdtail(this.lessSecId)
        .then(res => {
          let data = res.data.data;
          for (var i = 0; i < data.length; i++) {
            data[i].type = Number(data[i].type);
          }
          this.fQuestionList = data.details;
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    },
    _editLessonId() {
      let listLenght = this.fQuestionList.length;
      if (this.questionType == 0) {
        if (listLenght > 2) {
          this.$message({
            message: "画图题最多只能有一个音频和图片",
            type: "warning"
          });
        }
        if (listLenght == 2) {
          if (
            this.fQuestionList[0].type == 3 ||
            this.fQuestionList[1].type == 3
          ) {
            this.$message({
              message: "画图题不能有视频",
              type: "warning"
            });
          } else if (
            this.fQuestionList[0].type == 1 &&
            this.fQuestionList[1].type == 1
          ) {
            this.$message({
              message: "只能有一张图",
              type: "warning"
            });
          } else if (
            this.fQuestionList[0].type == 2 &&
            this.fQuestionList[1].type == 2
          ) {
            this.$message({
              message: "必须有图片",
              type: "warning"
            });
          } else {
            editLessonId(this.lessSecId, this.fQuestionList)
              .then(res => {
                this.$router.back(-1);
              })
              .catch(res => {
                console.log(res);
              });
          }
        }
        if (listLenght == 1) {
          if (this.fQuestionList[0].type == 1) {
            editLessonId(this.lessSecId, this.fQuestionList)
              .then(res => {
                this.$router.back(-1);
              })
              .catch(res => {
                console.log(res);
              });
          } else {
            this.$message({
              message: "画图题必须有图片",
              type: "warning"
            });
          }
        }
      } else {
        editLessonId(this.lessSecId, this.fQuestionList)
          .then(res => {
            this.$router.back(-1);
          })
          .catch(res => {
            console.log(res);
          });
      }
    },
    clearQ() {
      this.fQuestionList = [];
    },
    centerDialogVisible(){
      this.centerDialogVisible = true;
    },
    answerWay(type, isOpen) {
      this.fQuestionList.push({
        value: "",
        type: type,
        rank: this.fQuestionList.length,
        isOpen: isOpen,
        isDrawType:false,
      });
      console.log(this.$refs.Question);
      console.log(this.fQuestionList);
    },
    drawWay(qType,drawType) {
      console.log(drawType)
      this.isDrawType = true;
      if(drawType == 1){
        this.fQuestionList.push({
        value: "",
        type: qType,
        rank: this.fQuestionList.length,
        isOpen: false,
        isDrawType:true,
      });
      this.centerDialogVisible = false;
      }else{
        // this.fQuestionList.push({
        //   value: "",
        //   type: qType,
        //   rank: this.fQuestionList.length,
        //   isOpen: false,
        //   isDrawType:true,
        // });
        this.selectFodder = true;
        this.fisDrawType = true;
      }
     
    },

    upLoad() {
      if (this.isUpLoad) {
        this.isUpLoad = false;
      } else {
        this.isUpLoad = true;
      }
    },
    isselectFodder() {
      // this.getMateriaData()
      this.fisDrawType = false;
      let listLenght = this.fQuestionList.length;
      if (this.questionType == 0) {
        if (listLenght > 1) {
          this.$message({
            message: "画图题最多只能有一个音频和图片",
            type: "warning"
          });
        } else {
          if (this.selectFodder) {
            //console.log(this.$refs.materiaLib)
            // this.fQuestionList = this.$refs.materiaLib.questionList
            //console.log(this.fQuestionList)
            this.selectFodder = false;
          } else {
            this.selectFodder = true;
          }
        }
      } else {
        if (this.selectFodder) {
          console.log(this.$refs.materiaLib);
          // this.fQuestionList = this.$refs.materiaLib.questionList
          console.log(this.fQuestionList);
          this.selectFodder = false;
        } else {
          console.log(this.$refs.abc);
          this.selectFodder = true;
        }
      }
    },

    getParams() {},
    remove(file) {
      this.$refs.upload.remove(file);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../index.scss";
.flex-box{
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  padding: 20px 15px;
  position: relative;
  min-height: 1000px;
}
.fourth-box {
  justify-content: space-between;
  align-items: center;
  height: 66px;
  color: #666666;
  padding-right: 0;
  border-radius: 8px;
  border: solid 1px #dcdfe6;
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
.questiones {
  padding: 5px 18px 15px 18px;
  border-radius: 8px;
  border: solid 1px #dcdfe6;
  margin-top: 20px;
  .top-box {
    justify-content: space-between;
    border-bottom: solid 1px #dcdfe6;
    > span {
      font-size: 20px;
      line-height: 55px;
    }
    .upfile {
      align-items: center;
      .btn {
        width: 43px;
        height: 43px;
        margin-left: 10px;
        border-radius: 4px;
        border: solid 1px #dcdfe6;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
  .add-box {
    height: 66px;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    background-color: #f9fafc;
    border-radius: 4px;
    border: solid 1px #dcdfe6;
    padding: 0 18px;
    .item1 {
      span {
        margin-right: 10px;
      }
    }
    .item2 {
      flex: 1;
      margin-left: 60px;
    }
  }
}
.position-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  z-index: 999999;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 150px;
  align-items: center;

  .img-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      align-self: flex-end;
      margin-bottom: 10px;
      margin-right: 8px;
      cursor: pointer;
    }
  }
}
</style>
