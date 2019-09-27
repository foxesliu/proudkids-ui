<template>
  <div class="mark" ref="mark" v-loading="loading">
    <div class="column" v-for="(column,columnIndex) in columnList">
      <div class="row" v-for="(row,rowIndex) in rowList" @click="getPosition($event,rowIndex,columnIndex)" v-if="stat">

      </div>
    </div>
    <div class="icon" v-for="(item,index) in markData.qaList" :style="{left:item.positionX,top:item.positionY}"
         :key="item.id">
      <div class="icon-circle">
        <div class="icon-pic">
          <img :src="item.avatarUrl" alt="">
        </div>
      </div>
    </div>

    <div class="icon" :style="{left:iconLeft,top:iconTop}" v-show="iconShow" ref="icon" v-if="stat">
      <div class="icon-circle">
        <div class="icon-pic">
          <img :src="avatar" alt="">
        </div>
      </div>

      <div class="replay">
        <span class="tip">选择一种方式回复</span>
        <ul>
          <li v-for="(item,index) in listData" @mouseenter="hover(index)" @mouseleave="leave" @click="detail(item)">
            <img :src="item.imgPath" alt="">
          </li>

        </ul>
      </div>
    </div>

    <div class="drawBtns operate">
      <span></span>
      <!--与其他批注一样，传seriNum字段-->
      <el-button class="btn" type="primary" @click="mark">{{content}}</el-button>
    </div>

    <div class="drawBtns addMaterial">
      <span></span>
      <el-button class="btn" type="primary" @click="addToMaterial">添加到素材库</el-button>
    </div>

    <div class="drawBtns drawing">
      <span></span>
      <!--掉POST /phRuserLessonAnswer-->
      <el-button class="btn" type="success" @click="draw">点击进入画板模式</el-button>
    </div>
    <replay v-model="material" type="danger" title="" content="成功添加到素材库" v-on:cancel="clickCancel()"></replay>
  </div>
</template>

<script>
  import axios from 'axios'
  import {getToken} from '@/utils/auth' // 验权
  import drawBtns from './drawBtns'
  import replay from './replay'
  import text from '../../../../../assets/mark/text.png'
  import text2 from '../../../../../assets/mark/text2.png'
  import brush from '../../../../../assets/mark/brush.png'
  import brush2 from '../../../../../assets/mark/brush2.png'
  import mike from '../../../../../assets/mark/mike.png'
  import mike2 from '../../../../../assets/mark/mike2.png'
  import pencil from '../../../../../assets/mark/pencil.png'
  import pencil2 from '../../../../../assets/mark/pencil2.png'
  import {mapGetters} from "vuex";
  import {getImgToBase64, dataURLtoBlob} from '@/utils/index'

  export default {
    props: ['markVal', 'markItem'],
    components: {
      drawBtns,
      replay
    },
    data() {
      return {
        url: '',
        material: false,
        stat: false,
        content: '点击进行批注',
        columnList: [],
        rowList: [],
        qaList: [],
        loading: false,
        arr: [
          {positionX: '', positionY: '', num: 1},
          {positionX: '', positionY: '', num: 59},
          {positionX: '', positionY: '', num: 38},
          {positionX: '', positionY: '', num: 234}
        ],
        listData: [
          {name: '留语音', stat: false, imgPath: mike, path: './correctRecord'},
          {name: '画张图', stat: false, imgPath: pencil, path: './draw'},
          {name: '原图上回复', stat: false, imgPath: brush, path: './draw'},
          {name: '留文字', stat: false, imgPath: text, path: './correctText'}
        ],
        markData: [],
        iconShow: false,
        iconLeft: '',
        iconTop: '',
        serialNum: ''
      }
    },
    created() {
      this.rowList.length = 15
      this.columnList.length = 24

      this.markData = this.markItem
      if (!this.markData) {
        return
      }

      this.detailData(this.markData)

    },
    mounted() {
      this.$refs.mark.style.backgroundImage = 'url(' + this.markVal + ')'
    },
    watch: {
      markVal(newVal, oldVal) {
        if (newVal != oldVal) {
          this.$refs.mark.style.backgroundImage = 'url(' + newVal + ')'
        }
      },
      markItem(newVal, oldVal) {
        if (newVal != oldVal) {
          this.markData = newVal
        }
        this.detailData(this.markData)
      }
    },
    computed: {
      ...mapGetters([
        "avatar"
      ])
    },
    methods: {
      //进入画板
      draw() {
        sessionStorage.setItem('serialNum', '')
        sessionStorage.setItem('qaType', this.markItem.type)
        sessionStorage.setItem('qaRuserId', this.$route.query.ruserId)
        sessionStorage.setItem('qaLessSecCid', this.markItem.id)
        sessionStorage.setItem('qaLessSecId', this.markItem.lessSecId)
        sessionStorage.setItem('qaRuserLessid', this.$route.query.id)
        this.$router.push({
          path: './draw',
          query: {
            src: this.markVal,
            key: Date.now(),
            answerDraw: 1
          }
        })
      },
      //添加到素材库
      addToMaterial() {
        this.loading = true
        this.upload(this.markVal)
      },
      //上传
      upload(imgSrc) {
        getImgToBase64(imgSrc, (data) => {
          const blob = dataURLtoBlob(data)
          //此处用于上传等操作
          const files = new File([blob], new Date().toISOString() + ".png", {type: "image/png"});
          const formData = new FormData();
          formData.append('file', files);
          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }
          config.headers['Authorization'] = 'Bearer ' + getToken()
          //文件上传
          const {courseId, lessonId, ruserId} = this.$route.query
          axios.post('/zuul/apps/ph/material/uploadMaterial?lessonId=' + lessonId + '&courseId=' + courseId + '&ruserId=' + ruserId, formData, config)
            .then(async (res) => {
              const result = await res.data
              this.loading = false
              this.$parent.addImgStat = true
            })
            .catch((error) => {
              this.$message({
                message: '加入素材库失败',
                type: 'warning'
              });
            });
        })
      },
      detailData(data) {
        data.qaList && data.qaList.forEach(item => {
          if (item.serialNum > 15) {
            item.positionY = Math.ceil(item.serialNum / 15) / 24 * 100 + '%'
            if (item.serialNum % 15 == 0) {
              item.positionX = 100 + '%'
            } else {
              item.positionX = ((item.serialNum % 15) / 15) * 100 + '%'
            }
          } else {
            item.positionY = 4 + '%'
            item.positionX = (item.serialNum / 15) * 100 + '%'
          }
          item.avatarUrl = item.originator && JSON.parse(item.originator).avatarUrl
        })
      },
      mark() {
        this.stat = !this.stat
        if (this.stat) {
          this.content = '退出当前网格'
        } else {
          this.content = '点击进行批注'
        }
      },
      //鼠标移上去状态
      hover(index) {
        const config = {
          0: mike2,
          1: pencil2,
          2: brush2,
          3: text2,
        }
        this.listData[index].imgPath = config[index]
      },
      //鼠标离开时的状态
      leave() {
        this.listData = [
          {name: '留语音', stat: false, imgPath: mike, path: './correctRecord'},
          {name: '画张图', stat: false, imgPath: pencil, path: './draw'},
          {name: '原图上回复', stat: false, imgPath: brush, path: './draw'},
          {name: '留文字', stat: false, imgPath: text, path: './correctText'}
        ]
      },
      postil() {
        // sessionStorage.setItem('currentQaId', item.qaId)
        // sessionStorage.setItem('qaLessSecId', item.lessSecId)
        // sessionStorage.setItem('qaType', item.type)
        // sessionStorage.setItem('qaRuserId', this.$route.query.ruserId)

        if (!this.iconShow) {
          this.$message({
            message: '请选择标记',
            type: 'warning'
          });
          return
        }
        this.material = true
      },
      getPosition(e, rowIndex, columnIndex) {
        if (columnIndex == 0) {
          this.serialNum = rowIndex + 1
        } else {
          this.serialNum = rowIndex + 1 + columnIndex * 15
        }

        this.iconShow = true
        this.iconTop = (((columnIndex + 1) / 24) * 100) + '%'
        this.iconLeft = (((rowIndex + 1) / 15) * 100) + '%'
      },
      detail(item) {
        sessionStorage.setItem('qaPic', this.markItem.value)
        sessionStorage.setItem('currentQaId', this.markItem.qaId)
        sessionStorage.setItem('qaType', this.markItem.type)
        sessionStorage.setItem('qaRuserId', this.$route.query.ruserId)
        sessionStorage.setItem('qaLessSecCid', this.markItem.id)
        sessionStorage.setItem('qaLessSecId', this.markItem.lessSecId)
        sessionStorage.setItem('qaSwiperId', this.markItem.lessSecId)
        sessionStorage.setItem('serialNum', this.serialNum)
        sessionStorage.setItem('isCurrentPage', 1)
        if (item.name == '原图上回复') {
          this.$router.push({
            path: `${item.path}`,
            query: {
              src: this.markVal,
              key: Date.now()
            }
          })
        } else {
          sessionStorage.setItem('originalDrawing', false)
          this.$router.push({
            path: `${item.path}`
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../common.scss';

  * {
    box-sizing: border-box;
  }

  .mark {
    position: relative;
    width: 750px;
    /*height: 1080px;*/
    background: url("../../../../../assets/img/huaban.png") no-repeat;
    background-size: 100% 100%;
    margin: 10px 15px 0 15px;


    .column {
      height: 50px;
    }

    .row {
      border: 1px solid #d8d8d8;
      width: 50px;
      height: 50px;
      float: left;
      cursor: pointer;
    }

    .icon {
      position: absolute;
      box-sizing: border-box;
      width: 100px;
      height: 84px;
      left: 0;
      top: 0;
      transform: translate(-75%, -75%);
      background: url("../../../../../assets/img/mark.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      z-index: 98;

      .icon-circle {
        width: 56px;
        height: 56px;
        border-radius: 100%;
        background: #fff;
        margin-left: 25px;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon-pic {
          width: 50px;
          height: 50px;
          border: 1px solid #fff200;
          border-radius: 100%;
          background: url("../../../../../assets/img/renwu.png") no-repeat center center;
          background-size: 100% 100%;

          img {
            width: 100%;
            height: 100%;
            border-radius: 100%;
          }
        }
      }

      .replay {
        position: absolute;
        left: 122px;
        top: 8px;
        width: 545px;
        height: 68px;
        background-color: #ffffff;
        box-shadow: 0px 2px 0px 0px #dadada;
        border-radius: 8px;
        border: solid 1px #e7e7e7;
        display: flex;

        .tip {
          width: 162px;
          height: 100%;
          background-color: #449cfc;
          border-radius: 8px 0 0 8px;
          border: solid 1px #449cfc;
          display: flex;
          align-items: center;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #ffffff;
          padding-left: 22px;
        }

        ul {
          display: flex;
          margin-left: 10px;
          padding-top: 4px;

          li {
            width: 82px;
            height: 59px;
            margin-right: 10px;
            cursor: pointer;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }

    .drawBtns {
      line-height: 37px;
      display: flex;
      align-items: center;

      span {
        width: 19px;
        height: 19px;
        background-color: #449cfc;
        border-radius: 100%;
        position: relative;
      }

      span:after {
        content: "";
        display: block;
        position: absolute;
        top: 8px;
        left: 11px;
        width: 116px;
        height: 3px;
        background-color: #449cfc;
        opacity: 0.23;
      }

      .btn {
        margin-left: 106px;
      }
    }

    .operate {
      position: absolute;
      left: 740px;
      top: 14.5%;
      margin-top: -20px;
    }

    .addMaterial {
      position: absolute;
      left: 740px;
      top: 31.1%;
    }

    .drawing {
      position: absolute;
      left: 740px;
      top: 42.6%;
    }
  }

</style>
