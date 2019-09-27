<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle title="预习材料"></v-pagetitle>
      <div class="beforeclass-container">
        <div class="list">
          <div class="left" @click="offsetLeftAdd"><</div>
          <div class="mid" ref="mid">
            <div class="ul" ref="ul" :style="{left:offsetLeft+'px'}">
              <!--<div class="add" @click="_addBeforeClass">+</div>-->
              <div class="add" @click="addCourse">+</div>
              <div class="add one-import">
                <input type="file" @change="_excelImport" ref="excelImport"/>
                <img src="../images/add.jpg"/>
              </div>
              <div v-if="list.length>0"
                   :class="currentNumber==i.serialNum?'active li t-hidden':'li t-hidden'"
                   @click="chooseThis(i.serialNum,i.id)"
                   v-for="i in list">{{i.serialNum}}
              </div>
              <div v-if="list.length>6" class="add" @click="addCourse">+</div>
            </div>
          </div>
          <div class="right" @click="offsetLeftCut">></div>
        </div>
        <div class="h-40 mt-20">
          <div class="pull-left">
            <span class="font35 mr-10">Page {{currentNumber}}</span>
            <el-button size="mini" v-if="isEditing===false"
                       type="success" @click="isEditing=true">切换到编辑
            </el-button>
            <el-button size="mini" v-if="isEditing===true"
                       @click="isEditing=false">切换到预览
            </el-button>
          </div>
          <div class="pull-right">
            <el-button type="warning" size="mini" @click="_deleteLessonPreview">删除该页</el-button>
          </div>
        </div>
        <div class="clearfix"></div>
        <div>
          <el-upload class="upload-demo"
                     action="/zuul/aom/lessonPreview/upload"
                     :headers="{'Authorization':'Bearer '+token}"
                     :on-remove="handleRemove"
                     :limit="1"
                     :disabled="!isEditing"
                     :on-exceed="handleExceed"
                     :on-success="fileSuccessCallback"
                     :file-list="courseFiles2">
            <el-button size="small" :disabled="!isEditing" class="mt-20" type="primary">点击上传</el-button>
          </el-upload>
        </div>
        <!--<div class="mt-20 mb-10">添加备注文字</div>-->
        <!--<div>-->
        <!--<el-input type="textarea" :rows="5" :disabled="!isEditing" placeholder="请输入内容" v-model="remarks"></el-input>-->
        <!--</div>-->
        <div class="mt-20 mb-20">
          <span>语音预习</span>
          <el-switch v-model="flag" :disabled="!isEditing" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </div>
        <div class="audio-list o-hidden">
          <div class="li" v-for="(item,index) in audioFiles">
            <div class="pull-left width50 t-hidden">{{item.fileName?item.fileName:item.name}}
            </div>
            <div class="pull-right width45 o-hidden">
              <!--<div class="pull-left ml-10" v-if="audioFilesIsUploading!=index">-->
              <!--&lt;!&ndash;<button @click="startRecording()">录音</button>&ndash;&gt;-->
              <!--<el-button class="i1" type="primary" size="mini" @click="startRecording(index)">录音</el-button>-->
              <!--</div>-->
              <!--<div class="pull-left ml-10" v-if="audioFilesIsUploading==index">-->
              <!--<el-button class="i1" type="success" size="mini" @click="stopRecording(index)">停止</el-button>-->
              <!--</div>-->
              <div class="pull-left ml-10">
                <input class="i2" v-if="isEditing" ref="audioFile" @change="audioFileUpload(index)" type="file"
                       name="audioFile"/>
                <el-button class="i3" :disabled="!isEditing" type="danger" size="mini">直接上传文件</el-button>
              </div>
              <div class="pull-left ml-10">
                <el-button class="i4" :disabled="!isEditing" type="warning" size="mini" @click="deleteAudioFile(index)">
                  删除
                </el-button>
              </div>
            </div>
          </div>

          <div class="li">
            <div class="pull-left">
              <el-button type="success" :disabled="!isEditing" @click="addOneAudio">添加文件</el-button>
            </div>
          </div>
        </div>
        <div class="mt-20 mb-10">输入重复跟读文字</div>
        <div>
          <el-input type="textarea" :disabled="!isEditing" :rows="5" placeholder="请输入内容"
                    v-model="repeatContent"></el-input>
        </div>
        <div class="t-center mt-20 mb-20">
          <el-button class="width-200" :disabled="!isEditing" @click="submit(true)" type="success">保存</el-button>
        </div>
      </div>
    </div>

    <el-dialog title="添加输入框" :visible.sync="showAddBox">
      <div>
        <el-input type="number" v-model="maxSerialNum" placeholder="请输入数字"/>
        <el-button class="mt-20 width100" type="success" @click="addBeforeClass">确定添加</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  const axios = require('axios');
  import PageTitle from '../components/pagetitle.vue';
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input";
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
  import {getToken} from '@/utils/auth'
  import {
    lessonPreviewPreviewList,  //获取课节下面的page列表
    addLessonPreview,  //lesson下面预习资料新增后保存
    deleteLessonPreview,
    //getOneLessonPreview,  //预习资料单个page查询
    editLessonPreview,
    uploadLessonPreview,
    excelImport
  } from '../../../api/aom.js';

  //  let recorder1 = document.getElementById('recorder1');
  //  if (recorder1 === null) {
  //    recorder1 = document.createElement('script');
  //    recorder1.type = 'text/javascript';
  //    recorder1.src = '../../../../../static/recorder.js';
  //    recorder1.id = 'recorder';
  //    let s = document.getElementsByTagName('head')[0];
  //    s.appendChild(recorder1);
  //  }
  //
  //  function __log(e, data) {
  //    console.log("\n" + e + " " + (data || ''));
  //  }
  //
  //  var audio_context;
  //  var recorder;
  //
  //  function startUserMedia(stream) {
  //    var input = audio_context.createMediaStreamSource(stream);
  //    __log('Media stream created.');
  //    recorder = new Recorder(input);
  //  }
  //
  //  window.onload = function init() {
  //    try {
  //      // webkit shim
  //      window.AudioContext = window.AudioContext || window.webkitAudioContext;
  //      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
  //      window.URL = window.URL || window.webkitURL;
  //      audio_context = new AudioContext;
  //      console.log('Audio context set up.');
  //      console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
  //    } catch (e) {
  //      alert('No web audio support in this browser!');
  //    }
  //    navigator.getUserMedia({audio: true}, startUserMedia, function (e) {
  //      __log('No live audio input: ' + e);
  //    });
  //  };

  export default {
    components: {
      ElInput,
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
        courseFiles2: [],
        audioFiles: [],
        audioFilesIsUploading: -1,
        showAddBox: false,
        isEditing: false
      }
    },

    created() {
      this.lessonId = this.$route.query.lessonId;
      this.courseId = this.$route.query.courseId;
      this.token = getToken();
      //console.log(this.token, this.lessonId, this.courseId);
      this._lessonPreviewPreviewList(this.lessonId, () => {
        if (this.list.length > 0) {
          this.currentNumber = this.list[0]['serialNum'];
          this.currentId = this.list[0]['id'];
          this.maxSerialNum = Number(this.list[this.list.length - 1]['serialNum']) + 1;
          this.togglePage();
        }
      });
    },

    methods: {
      _excelImport(){
        //alert('一键导入');
        console.log(this.$refs.excelImport.files[0]);
        let formData = new FormData();
        formData.append('file', this.$refs.excelImport.files[0]);
        formData.append('lessonId', this.lessonId);
        excelImport(formData).then((res) => {
          if (res.data.data === true) {
            this.$message({type: 'success', message: '一键导入成功'});
            this._lessonPreviewPreviewList(this.lessonId, () => {
              if (this.list.length > 0) {
                this.currentNumber = this.list[0]['serialNum'];
                this.currentId = this.list[0]['id'];
                this.maxSerialNum = Number(this.list[this.list.length - 1]['serialNum']) + 1;
                this.togglePage();
              }
            });
          } else {
            this.$message.warning('导入失败');
          }
        })
      },

      startRecording(index) {
        recorder && recorder.record();
        this.audioFilesIsUploading = index;
        console.log(this.audioFilesIsUploading);
        __log('Recording...');
      },

      stopRecording(index) {
        this.audioFilesIsUploading = -1;
        console.log(this.audioFilesIsUploading);
        var _this = this;
        recorder && recorder.stop();
        console.log('Stopped recording.');
        recorder && recorder.exportWAV(function (blob) {
          var files = new File([blob], new Date().toISOString() + ".wav", {type: "audio/wav"});
          var fd = new FormData();
          fd.append('file', files);
          var xhr = new XMLHttpRequest();
          xhr.open("POST", '/aom/lessonPreview/upload');
          var t = getToken('Admin-Token');
          xhr.setRequestHeader('Authorization', 'Bearer ' + t);
          xhr.onreadystatechange = function (eee) {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                //console.log(eee)
                var t = JSON.parse(xhr.response).data.fileUrl;
                _this.audioFiles[index]['name'] = t;
                _this.submit();
                console.log(_this.audioFiles);
                //fnSucc(oAjax.responseText);
              } else {
                alert('录音失败');
              }
            }
          };
          xhr.send(fd);
        });
        recorder.clear();
      },

      audioFileUpload(index){
        if (!this.isEditing) {
          return false;
        }
        console.log(this.$refs.audioFile[index].files[0]);
        let formData = new FormData();
        formData.append('file', this.$refs.audioFile[index].files[0]);
        console.log(formData);
        uploadLessonPreview(formData).then((res) => {
          let f = res.data.data.fileUrl;
          let n = res.data.data.fileName;
          this.audioFiles[index]['name'] = f;
          this.audioFiles[index]['fileName'] = n;
          console.log(this.audioFiles);
          this.submit();
        });
      },

      deleteAudioFile(index){
        this.audioFiles.splice(index, 1);
        console.log(this.audioFiles);
        this.submit();
      },

      _lessonPreviewPreviewList(lessonId, callback, callback2){
        lessonPreviewPreviewList(lessonId).then((res) => {
          this.list = res.data;
          console.log(this.list);
          if (this.list.length) {
            this.maxSerialNum = Number(this.list[this.list.length - 1]['serialNum']) + 1;
            this.togglePage(true);
            callback && callback();
            callback2 && callback2();
          } else {
            this.maxSerialNum = 1;
          }
        })
      },

      chooseThis(serialNum, id){
        if (this.isEditing === true) {
//          this.$confirm('尚未保存信息，您需要保存吗?', '提示',
//            {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
//          ).then(() => {
//            this.submit();
//            this.currentNumber = serialNum;
//            this.currentId = id;
//            this.togglePage();
//          });
          this.$message.warning('当前页面未保存');
        } else {
          this.currentNumber = serialNum;
          this.currentId = id;
          this.togglePage();
        }
      },

      togglePage(isToggle){
        console.log(this.list);
        this.courseFiles2 = [];
        for (let i = 0; i < (this.list).length; i++) {
          if ((this.list)[i]['id'] === this.currentId) {
            this.courseFiles = JSON.parse(this.list[i]['courseFiles']) || [];
            this.audioFiles = JSON.parse(this.list[i]['audioFiles']) || [];
            for (var j = 0; j < this.courseFiles.length; j++) {
              if (this.courseFiles[j]['fileName']) {
                this.courseFiles2.push({name: this.courseFiles[j]['fileName']});
              } else {
                this.courseFiles2.push({name: this.courseFiles[j]['name']});
              }
            }
            this.remarks = this.list[i].remarks;
            this.repeatContent = this.list[i].repeatContent;
            this.flag = this.list[i]['isAudioMode'] === 1 ? true : false;
            break;
          }
        }
        //alert('切换数据');
        if (isToggle) {
          this.isEditing = true;
        } else {
          this.isEditing = false;
        }
        console.log(this.courseFiles);
        console.log(this.courseFiles2);
        console.log(this.audioFiles);
        console.log(this.currentNumber, this.currentId);
        //alert(this.flag);
      },

      addCourse(){
        if (this.isEditing === true) {
          this.$message.warning('当前页面未保存');
        } else {
          this.showAddBox = true;
        }
      },

      submit(isClick){
        var obj = {
          id: this.currentId,
          lessonId: this.lessonId,
          serialNum: this.currentNumber,
          courseFiles: JSON.stringify(this.courseFiles),
          audioFiles: JSON.stringify(this.audioFiles),
          isAudioMode: this.flag === true ? 1 : 0,  //true1 false0
          remarks: this.remarks,
          repeatContent: this.repeatContent
        };
        console.log(obj);
        //return;
        editLessonPreview(obj).then((res) => {
          if (res.data.data === true) {
            this._lessonPreviewPreviewList(this.lessonId, () => {
              this.$message({type: 'success', message: '编辑成功'});
              this.togglePage();
              if (isClick) {
                this.isEditing = false;
              } else {
                this.isEditing = true;
              }
            });
          }
        });
      },

      _addBeforeClass(){
        this.$confirm('确定要添加吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.addBeforeClass();
        }).catch(() => {
          this.$message({type: 'info', message: '已取消删除'});
        });
      },

      addOneAudio(){
        this.audioFiles.push({name: ''});
      },

      _deleteLessonPreview(){
        this.$confirm('确定要删除吗?', '提示',
          {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
        ).then(() => {
          deleteLessonPreview(this.currentId).then((res) => {
            if (res.data.code === 0) {
              this._lessonPreviewPreviewList(this.lessonId, '', () => {
                if (this.list.length) {
                  this.currentNumber = this.list[0]['serialNum'];
                  this.currentId = this.list[0]['id'];
                  console.log(this.currentNumber + '----' + this.currentId);
                  this.togglePage();
                }
              });
            }
          });
        });
      },

      addBeforeClass(){
        addLessonPreview({
          lessonId: this.lessonId,
          serialNum: this.maxSerialNum,
          isAudioMode: 1
        }).then((res) => {
          if (res.data.data === true) {
            this.dialogVisible = false;
            this._lessonPreviewPreviewList(this.lessonId, '', () => {
              this.nameIsNumber = '';
              this.showAddBox = false;
              console.log(this.list);
              this.currentNumber = this.list[this.list.length - 1]['serialNum'];
              this.currentId = this.list[this.list.length - 1]['id'];
              //console.log(this.currentNumber + '----' + this.currentId);
              this.togglePage();
            });
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
        this.courseFiles.push({name: f, fileName: e.data.fileName});
        console.log(this.courseFiles);
        this.submit();
      }

    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
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
            position: relative;
            &.active {
              background: #46b984;
              color: white;
            }
            &.one-import {
              input {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
              }
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
