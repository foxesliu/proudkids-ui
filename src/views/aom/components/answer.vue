<template>
  <div>
    <div class="answerlist">
      <div class="answer-box flex-box" v-if="questionType==5">
        <div class="answer-out">
          <div class="answer1 flex-box">
            <span class="flex-box">
              <img src="../../../assets/workDetail/answer.png" alt>
            </span>
            <div class="main-container-box">
              <div class="flex-box">
                <span class="icon-box">
                  <img src="../../../assets/workDetail/image.png" alt>
                </span>
                <span>请上传图片</span>
              </div>
            </div>
            <div class="btn-img flex-box">
              <img src="../../../assets/workDetail/carme.png" alt>
            </div>
          </div>
        </div>

        <div class="delete-box" @click="deleteQ(rank)" v-if="isHander">
          <img src="../../../assets/workDetail/delete.png" alt>
        </div>
      </div>
      <div class="answer-box flex-box" v-if="questionType==6">
        <div class="answer-out">
          <div class="answer1 flex-box">
            <span class="flex-box">
              <img src="../../../assets/workDetail/answer.png" alt>
            </span>
            <div class="main-container-box">
              <div class="flex-box">
                <span class="icon-box">
                  <img src="../../../assets/workDetail/videoicon1.png" alt>
                </span>
                <span>请上传视频</span>
              </div>
            </div>
            <div class="btn-img flex-box">
              <img src="../../../assets/workDetail/upload.png" alt>
            </div>
          </div>
        </div>

        <div class="delete-box" @click="deleteQ(rank)" v-if="isHander">
          <img src="../../../assets/workDetail/delete.png" alt>
        </div>
      </div>
      <div class="answer-box answer3" v-if="questionType==7">
        <div class="flex-box answer3-box">
          <div class="answer-out">
            <div class="answer1 flex-box">
              <span class="flex-box">
                <img src="../../../assets/workDetail/answer.png" alt>
              </span>
              <div class="main-container-box">
                <div class="flex-box" style="justify-content: space-between">
                  <span>请上传录音</span>
                  <div class="fllowRead flex-box">
                    <span>跟读文字：</span>
                    <div class="radioSelect" :class="{'ischeck' : isRadioSelect}">
                      <transition name="fade">
                        <span @click="radioSelect" :class="{'right' : isRadioSelect}"></span>
                      </transition>
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn-img flex-box">
                <img src="../../../assets/workDetail/mike.png" alt>
              </div>
            </div>
          </div>

          <div class="delete-box" @click="deleteQ(rank)" v-if="isHander">
            <img src="../../../assets/workDetail/delete.png" alt>
          </div>
        </div>
        <transition name="el-zoom-in-top">
          <div class="readT-box" v-show="isRadioSelect">
            <div class="border"></div>
            <div class="readTxt">
              <h3>请跟读一下内容</h3>
              <div>
                <span></span>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="textareaQ"
                  :disabled="!isHander"
                  @change="getText(rank)"
                ></el-input>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="answer-box flex-box" v-if="questionType==12">
        <div class="answer-out">
          <div class="answer1 flex-box">
            <span class="flex-box">
              <img src="../../../assets/workDetail/answer.png" alt>
            </span>
            <div class="main-container-box">
              <div class="flex-box">
                <!-- <span class="icon-box">
                  <img src="../../../assets/workDetail/videoicon1.png" alt>
                </span> -->
                <span>请用画板答题</span>
              </div>
            </div>
            <div class="btn-img flex-box">
              <img src="../../../assets/workDetail/pen.png" alt>
            </div>
          </div>
          <div class="canvors-box">
            <viewer>
            <img :src="textVal" alt v-if="textVal">
            </viewer>
          </div>
        </div>
        <div class="delete-box" @click="deleteQ(rank)" v-if="isHander">
          <img src="../../../assets/workDetail/delete.png" alt>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questionType: {},
    theUrl: {
      type: String
    },
    rank: {},
    textVal: {},
    isHander: {},
    isOpen: {}
  },
  data() {
    return {
      isRadioSelect: this.isOpen,
      textareaQ: ""
    };
  },
  created() {
    this.textareaQ = this.textVal;
    if (this.isOpen) {
      this.isRadioSelect = true;
    } else {
      this.isRadioSelect = false;
    }
  },
  methods: {
    getText(rank) {
      this.$parent.fQuestionList[rank].value = this.textareaQ;
      if (this.isRadioSelect) {
        this.$parent.fQuestionList[rank].open = true;
      } else {
        this.$parent.fQuestionList[rank].open = false;
      }
    },
    radioSelect() {
      if (this.isRadioSelect) {
        this.isRadioSelect = false;
        this.$emit("getCalled", this.isRadioSelect, this.rank);
        console.log(this.isRadioSelect);
      } else {
        this.isRadioSelect = true;
        this.$emit("getCalled", this.isRadioSelect, this.rank);
      }
      console.log(this.isOpen);
    },
    deleteQ(index) {
      this.$parent.fQuestionList.splice(index, 1);
      if (this.isOpen) {
        this.isRadioSelect = true;
      }
      console.log(this.$parent.fQuestionList);
      console.log(index);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../index.scss";

.answerlist {
  .answer-box {
    margin-top: 20px;
    align-items: center;
    .delete-box {
      margin-left: 22px;
      cursor: pointer;
    }
  }
  .canvors-box {
    width: 676px;
    margin: 0 auto;
    max-height: 475px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 475px;
      object-fit: cover;
    }
  }
  .answer-out {
    background: repeating-linear-gradient(
      -60deg,
      #91e224,
      #91e224 20px,
      #9ceb32 0,
      #9ceb32 40px
    );
    box-shadow: 0px 6px 0px 0px #77d10b;
    border-radius: 8px;
  }
  .answer1 {
    width: 692px;
    min-height: 79px;
    align-items: center;
    z-index: 1;
    > span {
      align-items: center;
      justify-content: center;
      width: 37px;
      height: 62px;
      background-color: #589506;
      box-shadow: inset 0px 1px 13px 0px #365d00;
      margin: 0 8px;
    }
    .main-container-box {
      width: 552px;
      height: 63px;
      > div {
        height: 63px;
        align-items: center;
        justify-content: flex-start;
        background: url("../../../assets/workDetail/bganswer.png") no-repeat;
        padding-left: 18px;
        .icon-box {
          width: 22px;
          height: 17px;
          margin-right: 5px;
        }
        span:nth-child(2) {
          font-size: 16px;
          color: #444444;
        }
      }
      .fllowRead {
        justify-content: center;
        align-items: center;
        margin-right: 16px;
        .radioSelect {
          width: 61px;
          height: 27px;
          background-color: #ffffff;
          box-shadow: inset 0px 1px 11px 0px rgba(0, 0, 0, 0.16);
          border-radius: 13.5px;
          position: relative;
          span {
            cursor: pointer;
            display: inline-block;
            width: 26px;
            height: 26px;
            background-color: #538c04;
            border-radius: 50%;
            position: absolute;
            top: 0;
            // left: 0;
            transition: all 1s ease;
          }
          .right {
            right: 0;
            transition: all 1s ease;
          }
        }
        .ischeck {
          background-color: #91e224;
          box-shadow: inset 0px 1px 11px 0px rgba(0, 0, 0, 0.16);
          border-radius: 13.5px;
        }
      }
    }
    .btn-img {
      width: 63px;
      height: 61px;
      margin-left: 13px;
      background-image: linear-gradient(0deg, #ceff7c 0%, #f8fff0 100%);
      box-shadow: 0px 3px 0px 0px #5ca900;
      border-radius: 52px;
      justify-content: center;
      align-items: center;
    }
  }
  .answer3 {
    // position: relative;
    .answer3-box {
      align-items: center;
      z-index: 2;
    }
    .readT-box {
      //   position: absolute;
      //   top: 68px;
      width: 668px;
      margin-top: 6px;
      margin-left: 13px;
      z-index: 999999;
      .border {
        height: 4px;
        background-color: #61ad05;
        box-shadow: inset 0px 1px 1px 0px #498600;
        border-radius: 8px;
      }
    }
    .readTxt {
      width: 660px;
      background-image: linear-gradient(
        180deg,
        #c1e600 0%,
        #fffa72 8%,
        #fff949 16%,
        #fff42a 100%
      );
      margin-top: -2px;
      margin-left: 4px;
      padding-right: 14px;
      padding-bottom: 15px;
      padding-top: 24px;
      h3 {
        width: 113px;
        height: 30px;
        background-color: #ff7a00;
        border-radius: 8px;
        color: #ffffff;
        font-size: 14px;
        font-weight: normal;
        text-align: center;
        line-height: 30px;
        margin: 0;
        margin: 0 0 0 20px;
      }
      > div {
        display: flex;
        justify-items: flex-start;
        align-items: flex-start;
        margin-left: 14px;
        margin-top: 7px;

        span {
          display: inline-block;
          margin-top: 4px;
          border: 9px solid #ff7a00;
          border-right: transparent;
          border-bottom: 9px solid transparent;
          border-top: 9px solid transparent;
        }
        .test-textarea {
          margin: 0;
          line-height: 23px;
          padding: 0 2px;
          font-size: 14px;
          width: 623px;
          font-family: PingFangSC-Regular;
          color: #444444;
          border: solid 1px #ff7a00;
          background-color: rgba(255, 122, 0, 0.16);
          border-left: solid 2px #ff7a00;
        }
      }
    }
  }
}
</style>