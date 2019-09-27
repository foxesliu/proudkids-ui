<template>
  <div class="container-box">
    <div class="container">
      <div class="flex-box top-box">
        <div class="item" :class="isActive == 1 ? 'active' : ''" @click="getMaterialType(1)">图片</div>
        <div class="item" :class="isActive == 2 ? 'active' : ''" @click="getMaterialType(2)">音频</div>
        <div class="item" :class="isActive == 3 ? 'active' : ''" @click="getMaterialType(3)">视频</div>
      </div>
      <div class="flex-box bottom-box" v-if="isActive=='1'">
        <template>
          <div class="li flex-box" v-for="(item,index) in imgArry" :key="item.id" v-if="isCurrent">
            <div class="img-box">
              <viewer class="view">
                <img :src="item.path" alt="" @click="chooseM(item.path)">
              </viewer>
            </div>
          </div>
          <div class="li flex-box" v-for="(item,index) in imgArry" :key="index" v-if="!isCurrent">
            <div class="img-box">
              <viewer class="view">
                <img :src="item.path" alt="" @click="previewImg(item.path)">
              </viewer>
            </div>
          </div>

        </template>

      </div>
      <div class="flex-box bottom-box" v-if="isActive=='2'">
        <ul>
          <li class="flex-box" v-for="(item,index) in audioArry" :key="index">
            <div class="flex-box">
              <span class="icon flex-box">
                <img src="../../../../../assets/workDetail/mp3icon.png" alt="">
              </span>
              <span class="filename">{{item.name}}</span>
            </div>
            <!--<el-button type="danger" class="deleteBtn" size="mini" @click.stop="deleteM(item.id)">删除</el-button>-->
          </li>
        </ul>
      </div>
      <div class="flex-box bottom-box" v-if="isActive=='3'">
        <ul>
          <li class="flex-box" v-for="(item,index) in videoArry" :key="index">
            <div class="flex-box">
              <span class="icon flex-box">
                <img src="../../../../../assets/workDetail/videoicon.png" alt="">
              </span>
              <span class="filename">{{item.name}}</span>
            </div>
            <!--<el-button type="danger" class="deleteBtn" size="mini" @click.stop="deleteM(item.id)">删除</el-button>-->
          </li>
        </ul>
      </div>
    </div>

    <div class="cropper-container" v-if="isCropperShow">
      <div class="radio">
        <el-radio v-model="radio" label="1" border @change="crosswise">横向剪裁</el-radio>
        <el-radio v-model="radio" label="2" border @change="lengthway">纵向剪裁</el-radio>
      </div>
      <vueCropper
        class="vueCropper"
        ref="cropper2"
        :img="cropper.img "
        :outputSize="cropper.size"
        :outputType="cropper.outputType"
        :info="cropper.info"
        :canScale="cropper.canScale"
        :autoCrop="cropper.autoCrop"
        :autoCropWidth="cropper.autoCropWidth"
        :autoCropHeight="cropper.autoCropHeight"
        :fixed="cropper.fixed"
        :fixedNumber="cropper.fixedNumber"
      ></vueCropper>
      <div class="btn">
        <el-button type="danger" @click="cancel" size="medium">取消</el-button>
        <el-button @click="confirm()" type="primary" size="medium">确定</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import {getMaterialsByType, deleteMaterial} from "@/api/aom.js";
  import {modifyRuserLesson} from "@/api/teachers.js";
  import {dataURLtoBlob} from "@/utils/index.js";
  import {VueCropper} from 'vue-cropper'
  import axios from 'axios'
  import {getToken} from '@/utils/auth' // 验权


  export default {
    components: {
      VueCropper
    },
    data() {
      return {
        radio: '2',
        isCropperShow: false,
        model: false,
        modelSrc: '',
        crap: false,
        previews: {},
        form: {
          head: ''
        },
        cropper: {
          //img的路径自行修改
          img: 'http://cdn.xyxiao.cn/Landscape_3.jpg',
          info: true,
          size: 1,
          outputType: 'jpeg',
          canScale: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 520,
          autoCropHeight: 754,
          fixed: true,
          // 真实的输出宽高
          infoTrue: true,
          fixedNumber: [69, 100]
        },
        downImg: '#',


        getMaterialTypeObj: {
          courseId: '',
          lessonId: '',
          type: 1
        },
        isOpen: false,
        isSelect: null,
        questionList: [],
        imgArry: [],
        audioArry: [],
        videoArry: [],
        courseId: '',
        lessonId: '',
        isActive: 1,
        isUpload: false,
        files: [
          {
            name: "11",
            progress: 66
          }
        ],
        isCurrent: false
      };
    },
    created() {
      // this.getMaterialTypeObj.courseId = sessionStorage.getItem('courseId');
      // this.getMaterialTypeObj.lessonId = sessionStorage.getItem('lessonId');

      this.$route.path == '/detail/currentPage' ? this.isCurrent = false : this.isCurrent = true
      const {courseId, lessonId, ruserId} = this.$route.query
      this.getMaterialTypeObj.courseId = courseId
      this.getMaterialTypeObj.lessonId = lessonId
      this.getMaterialTypeObj.ruserId = ruserId

      this.getMaterialsData()
    },
    methods: {
      //横向剪裁
      crosswise() {
        this.cropper.fixedNumber = [4, 3]
        this.cropper.autoCropWidth = 400
        this.cropper.autoCropHeight = 300
      },
      //纵向剪裁
      lengthway() {
        this.cropper.fixedNumber = [69, 100]
        this.cropper.autoCropWidth = 150
        this.cropper.autoCropHeight = 216
      },
      //保存图片
      async modifyRuserLesson(data) {
        const config = {
          1: false,
          2: true
        }
        // sessionStorage.setItem('long', config[this.radio])
        this.$parent.reportPic = config[this.radio]
        const result = await modifyRuserLesson(data)
        this.$parent.getRuserStatistics(this.$route.query.id)
      },
      //上传
      upload(data, event) {
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
        axios.post('apps/file/upload', formData, config).then(async (res) => {
          const url = await `https://files.proudkids.cn${res.data.data.fileUrl}`
          this.$parent.screenshots = url
          const {id} = this.$route.query
          const config = {
            id,
            screenshots: {
              url,
              radio: this.radio
            }
          }
          config.screenshots = JSON.stringify(config.screenshots)
          this.modifyRuserLesson(config)
          this.$message({
            message: '恭喜你，图片剪裁成功',
            type: 'success'
          });
        })
      },
      //确定剪裁
      confirm() {
        this.$refs.cropper2.getCropData((data) => {
          this.modelSrc = data
          this.model = false;
          //裁剪后的图片显示
          this.cropper.img = this.modelSrc;
          this.isCropperShow = false
          this.$parent.selectFodder = false
          this.upload(data)

        })
      },
      //取消剪裁
      cancel() {
        this.isCropperShow = false
      },
      //选择素材
      chooseM(path, type = '') {
        this.cropper.img = path
        this.isCropperShow = true
      },
      previewImg() {

      },
      //删除素材
      deleteM(id) {
        deleteMaterial(id).then((res) => {
          let data = res.data.data
          if (this.getMaterialTypeObj.type == 1) {
            this.imgArry = data
          }
          if (this.getMaterialTypeObj.type == 2) {
            this.audioArry = data
          }
          if (this.getMaterialTypeObj.type == 3) {
            this.videoArry = data
          }
        }).catch((res) => {
          // console.log(res)
        })
      },
      getMaterialsData() {
        getMaterialsByType(this.getMaterialTypeObj).then((res) => {
          let data = res.data.data
          this.imgArry = data
        }).catch((res) => {
          // console.log(res)
        })
      },
      getMaterialType(param) {
        this.isActive = param;
        this.getMaterialTypeObj.type = param;
        getMaterialsByType(this.getMaterialTypeObj).then((res) => {
          let data = res.data.data
          if (this.getMaterialTypeObj.type == 1) {
            this.imgArry = data
            console.log(this.imgArry)
          }
          if (this.getMaterialTypeObj.type == 2) {
            this.audioArry = data
          }
          if (this.getMaterialTypeObj.type == 3) {
            this.videoArry = data
          }
        }).catch((res) => {
          // console.log(res)
        })
      }

    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../../aom/index.scss";

  ul,
  li {
    margin: 0;
    padding: 0;
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
          /*background-color: #449cfc;*/
          border-radius: 4px;
          margin-bottom: 9px;
          margin-right: 10px;
          margin-left: 10px;
          overflow: hidden;

          .view {
            width: 100%;
            height: 100%;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          img {
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

  }

  .cropper-container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 90;
    background-color: #ffffff;
    border-radius: 8px;
    border: solid 1px #dcdfe6;
    padding: 0 40px;
    display: flex;
    flex-direction: column;

    .radio {
      margin: 24px 0 14px 35px;
    }

    .vueCropper {
      width: 100%;
      height: 100%;
    }

    .btn {
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .position-box {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000000;
      z-index: 91;
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
  }
</style>
