<template>
  <div class="container-box">
    <div class="container">
      <div class="flex-box top-box">
        <p class="title">上传素材</p>
        <div class="mid flex-box">
          <file-upload
            ref="upload"
            v-model="files"
            :post-action="url"
            @input-file ="inputFile"
            :multiple="true"
            :timeout="1800 * 1000"
            :size="1024 * 1024 * 50"
            :headers="{'Authorization':'Bearer '+token}"
          >
            <div class="flex-box btn-box">
              <div class="btn" @click.prevent="upLoad">
                <img src="../../../assets/workDetail/updatafile.png" alt>
              </div>
            </div>
          </file-upload>
        </div>
        <span class="right-item">添加素材</span>
      </div>
      <ul>
        <li v-for="(file,index) in files" :key="index" class="flex-box li">
          <div class="flex-box">
            <span class="icon flex-box" v-if="file.type == 'video/mp4'">
              <img src="../../../assets/workDetail/videoicon.png" alt>
            </span>
            <span class="icon flex-box" v-else-if="file.type == 'audio/mp3'">
              <img src="../../../assets/workDetail/mp3icon.png" alt>
            </span>
            <span class="icon flex-box" v-else>
              <img src="../../../assets/workDetail/imgicon.png" alt>
            </span>
            <span class="filename">{{file.name}}</span>
          </div>
          <div class="flex-box">
            <div class="progress">
              <div v-if="file.progress == 100"></div>
              <div v-if="!file.success" class="hui">
                <div class="bule" :style="{width: file.progress + '%'}"></div>
              </div>
              <div v-if="file.progress == 0" class="hui"></div>
            </div>
            <span v-if="file.success||file.progress == 100">上传完成</span>
            <!-- <span v-if="file.error">上传失败</span> -->
            <span
              v-if="file.progress != 100 && file.progress != 0"
              class="percent"
            >{{file.progress}}%</span>
            <span v-if="file.progress == 0" class="percent">排队中</span>
          </div>
        </li>
      </ul>
      <div class="btm-btn">
          <el-button
          type="primary"
          v-show="!$refs.upload || !$refs.upload.active"
          @click.prevent="$refs.upload.active = true"
        >开始上传</el-button>
        <el-button
          type="primary"
          v-show="$refs.upload && $refs.upload.active"
          @click.prevent="$refs.upload.active = false"
        >停止上传</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {getToken} from '@/utils/auth';
// import { saveMaterial } from "../../../api/aom.js";

export default {
  props: {},
  data() {
    return {
      courseId:'',
      lessonId:'',
      type:'',
      url:'',
      token:'',
      isUpload: false,
      files: [
        
      ],
      status:''
    };
  },
  created() {

    this.token = getToken();
    this.courseId = sessionStorage.getItem('courseId');
    this.lessonId = sessionStorage.getItem('lessonId');
    this.url = '/zuul/apps/ph/material/uploadMaterial?lessonId=' + this.lessonId + '&courseId=' + this.courseId

  },
  watch: {
    // type:{
    //   deep: true,
    //   handler(oldV,newV){
    //     this.type = oldV;
    //     this.url = '/zuul/apps/ph/material/uploadMaterial?lessonId=' + this.lessonId + '&courseId=' + this.courseId +'&type='+ this.type

    //     console.log('type:'+oldV,newV)
    //     console.log(this.url)
    //   }
    // }
  },
  methods: {
    // saveMaterials(){
    //   console.log(JSON.stringify(this.tvs1))
    //   let formData = JSON.stringify(this.tvs1)
    //   saveMaterial({
    //     lessonId:this.lessonId,
    //     courseId:this.courseId,
    //   },this.tvs).then((res) => {
    //     console.log(res)
    //   }).catch((res) => {
    //     console.log(res)
    //   })
    // },
    upLoad() {
      this.isUpload = true;
      console.log(111111);
    },
    inputFile(newFile, oldFile) {
      console.log(newFile);
      if(newFile.size>1024*1024*50){
        this.$message({
          message: '上传文件不能大于50M',
          type: 'warning'
        });
      }
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // 获得相应数据
        let data = newFile.response.data
        console.log(data)
        console.log("response", newFile.response);
        if (newFile.xhr) {
          //  获得响应状态码
          this.status = newFile.xhr.status
          console.log("status", newFile.xhr.status);
        }
        if (newFile.progress !== oldFile.progress) {
          console.log("progress", newFile.progress, newFile);
        }
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
}
.container {
  padding: 15px 15px 0 15px;
  width: 1200px;
  background-color: #ffffff;
  border-radius: 4px;
  min-height: 600px;
  .top-box {
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d8d8d8;
    .mid {
      flex: 1;
      display: flex-box;
      justify-content: flex-end;
    }
    .right-item {
      font-size: 20px;
      color: #666666;
    }
  }
  .title {
    margin: 0;
    line-height: 3;
    font-size: 20px;
    font-weight: bold;
  }
  ul {
    margin-top: 20px;
    height: 500px;
    overflow: auto;
    li {
      list-style: none;
      width: 100%;
      height: 46px;
      background-color: #efefef;
      border-radius: 4px;
      padding: 0 12px;
      justify-content: space-between;
      margin-bottom: 10px;
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
  .btm-btn{
    width: 100%;
    height: 74px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #f2f2f2;
  }
}
.hui {
  width: 415px;
  height: 2px;
  background-color: #d8d8d8;
  border-radius: 8px;
  margin-right: 7px;
  .bule {
    height: 2px;
    background-color: #449cfc;
    border-radius: 8px;
  }
}
.percent {
  display: inline-block;
  font-size: 14px;
  width: 42px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #666666;
}
.btn-box {
  font-size: 20px;
  color: #666666;
  align-items: center;
  .btn {
    width: 37px;
    height: 37px;
    margin-left: 10px;
    border-radius: 4px;
    border: solid 1px #dcdfe6;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-right: 8px;
  }
}
</style>
