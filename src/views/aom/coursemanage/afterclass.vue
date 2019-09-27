<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle title="复习材料"></v-pagetitle>
      <div class="beforeclass-container">
        <div class="audio-list o-hidden">
          <div class="li">
            <div class="pull-left" style="position:relative">
              <input class="i2" ref="audioFile" @change="audioFileUpload" type="file"
                     name="audioFile" style="position:absolute; left:0;top:0;opacity: 0;width:100%;height:100%;"/>
              <el-button type="success" @click="addOneAudio">添加文件</el-button>
            </div>
          </div>
          <div class="li" v-for="(item,index) in list">
            <div class="pull-left width50 t-hidden">{{item.name}}</div>
            <div class="pull-right width45 o-hidden">
              <!--<div class="pull-left ml-10">-->
                <!--&lt;!&ndash;<input class="i2" ref="audioFile" @change="audioFileUpload(index)" type="file" name="audioFile"/>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-button class="i3" type="success" size="mini">上传文件</el-button>&ndash;&gt;-->
              <!--</div>-->
              <div class="pull-left ml-10">
                <el-button class="i4" type="warning" size="mini" @click="deleteAudioFile(item.id)">删除</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const axios = require('axios');
  import PageTitle from '../components/pagetitle.vue';
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
  import {getToken} from '@/utils/auth'
  import {getLessonReview, uploadLessonReview, deleteLessonReview} from '../../../api/aom.js';

  export default {
    components: {
      ElButton,
      'v-pagetitle': PageTitle,
    },
    data(){
      return {
        maxSerialNum: 1,
        offsetLeft: 0,
        ossDomain: 'http://files.proudkids.cn',
        list: [],
        nameIsNumber: '',
        currentNumber: '',
        currentId: 0,
        remarks: '',
        repeatContent: '',
        flag: true,
        courseFiles: [],
        audioFiles: [],
        audioFilesIsUploading: -1
      }
    },
    created() {
      this.lessonId = this.$route.query.lessonId;
      this.courseId = this.$route.query.courseId;
      this.token = getToken();
      this._getLessonReview();
    },
    methods: {
      _getLessonReview(){
        getLessonReview(this.lessonId, 1, 100000).then((res) => {
          this.list = (res.data.records);
          console.log(this.list);
        })
      },
      audioFileUpload(){
        console.log(this.$refs.audioFile.files[0]);
        let formData = new FormData();
        formData.append('file', this.$refs.audioFile.files[0]);
        formData.append('lessonId', this.lessonId);
        formData.append('fileName', (this.$refs.audioFile.value).split('\\')[(this.$refs.audioFile.value).split('\\').length - 1]);
        console.log(formData);
        uploadLessonReview(formData).then((res) => {
          this._getLessonReview();
        })
//        upload(formData).then((res) => {
//          let f = res.data.data.fileUrl;
//          this.audioFiles[index]['name'] = f;
//          console.log(this.audioFiles);
//          //this.submit();
//        });
      },

      deleteAudioFile(id){
        this.$confirm('确定要删除吗?', '提示',
          {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
        ).then(() => {
          deleteLessonReview(id).then((res) => {
            if (res) {
              this._getLessonReview();
            }
          })
        });
      },

      _lessonPreviewPreviewList(lessonId, callback){
        lessonPreviewPreviewList(lessonId).then((res) => {
          this.list = res.data;
          console.log(this.list);
          callback && callback();
        })
      },

      togglePage(){
        console.log(this.list);
        for (let i = 0; i < (this.list).length; i++) {
          if ((this.list)[i]['id'] === this.currentId) {
            this.courseFiles = JSON.parse(this.list[i]['courseFiles']) || [];
            this.audioFiles = JSON.parse(this.list[i]['audioFiles']) || [];
            this.remarks = this.list[i].remarks;
            this.repeatContent = this.list[i].repeatContent;
            break;
          }
        }
        console.log(this.courseFiles);
        console.log(this.audioFiles);
        console.log(this.currentNumber, this.currentId);
      },

      addOneAudio(){
        this.list.push({name: ''});
      },

      _deleteLessonPreview(){
        this.$confirm('确定要删除吗?', '提示',
          {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
        ).then(() => {
          deleteLessonPreview(this.currentId).then((res) => {
            if (res.data.code === 0) {
              this._lessonPreviewPreviewList(this.lessonId);
            }
          });
        });
      },

      chooseThis(serialNum, id){
        this.currentNumber = serialNum;
        this.currentId = id;
        this.togglePage();
      },

      addBeforeClass(){
        addLessonPreview({
          lessonId: this.lessonId,
          serialNum: this.maxSerialNum
        }).then((res) => {
          if (res.data.data === true) {
            this.dialogVisible = false;
            this._lessonPreviewPreviewList(this.lessonId);
            this.nameIsNumber = '';
          }
        })
      },

      offsetLeftCut(){
        if (this.$refs.ul.clientWidth + this.offsetLeft > 105) {
          this.offsetLeft = this.offsetLeft - 104
        }
      },

      offsetLeftAdd(){
        if (this.offsetLeft < -1) {
          this.offsetLeft = this.offsetLeft + 104
        }
        console.log(this.offsetLeft);
      },

      handleRemove(file, files){
        this.courseFiles = files;
        this.submit();
      },

      handleExceed(files, fileList){
        this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },

      fileSuccessCallback(e){
        //let f = this.ossDomain + e.data.fileUrl;
        let f = e.data.fileUrl;
        console.log(f);
        this.courseFiles.push({name: f});
        console.log(this.courseFiles);
        this.submit();
      }

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../index.scss';

  .beforeclass-container {
    .list {
      display: flex;
      width: 100%;
      height: 132px;
      background: #e3e3e3;
      padding: 19px;
      .left, .right {
        width: 33px;
        height: 94px;
        line-height: 94px;
        text-align: center;
        background: white;
        font-size: 30px;
        color: #7a7a7a;
        cursor: pointer;
      }
      .mid {
        flex: 1;
        height: 94px;
        margin: 0 12px;
        position: relative;
        overflow: hidden;

        .ul {
          position: absolute;
          /*left: 0;*/
          top: 0;
          .li, .add {
            cursor: pointer;
            color: #7a7a7a;
            width: 94px;
            text-align: center;
            height: 94px;
            line-height: 94px;
            background: white;
            float: left;
            margin-right: 10px;
            font-size: 48px;
            &.active {
              background: #46b984;
              color: white;
            }
          }
        }
      }
    }
    .audio-list {
      border-top: 1px solid #e3e3e3;
      .li {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #e3e3e3;
        width: 100%;
        .pull-right {
          .pull-left {
            width: 100px;
            position: relative;
            .i1, .i2, .i3, .i4 {
              width: 100%;
            }
            .i2 {
              width: 100%;
              height: 100%;
              opacity: 0;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 999;
            }
          }
        }
      }
    }
  }
</style>
