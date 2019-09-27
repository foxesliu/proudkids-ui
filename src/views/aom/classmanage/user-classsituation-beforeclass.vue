<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle :title="title"></v-pagetitle>
      <div class="uc-beforeclass">
        <div class="line">{{courseName}} - {{lessonName}}</div>
        <dl v-for="item in list">
          <dt>Page {{item.serialNum}}</dt>
          <dd>
            <div class="left">
              <img v-if="item.courseFiles[0]['type']==='img'" :src="ossDomain+item.courseFiles[0]['name']"/>
              <video v-if="item.courseFiles[0]['type']==='video'" webkit-playsinline x5-playsinline playsinline preload
                     controls :src="ossDomain+item.courseFiles[0]['name']">
                <!--https://files.proudkids.cn/video/en_poster.mp4-->
              </video>
            </div>

            <div class="right">
              <div class="li" v-for="iitem in item.audioFiles">
                <div class="pull-left">
                  <!--<img class="titlepic" src="http://files.proudkids.cn/proudkids-ems/20180807/617663569c5c4862a757a0b06e520a10.png"/>-->
                  <audio controls v-if="iitem.type==='video'"
                         :src="ossDomain+iitem.name"></audio>
                  <p v-if="iitem.type==='txt'">{{iitem.name}}</p>
                </div>
              </div>
              <div class="li">
                <div class="pull-right">
                  <!--<img class="titlepic" src="http://files.proudkids.cn/proudkids-ems/20180807/617663569c5c4862a757a0b06e520a10.png"/>-->
                  <audio controls :src="ossDomain+item.files"></audio>
                </div>
              </div>
            </div>
          </dd>
        </dl>
        <!--<dl>-->
        <!--<dt>Page 1</dt>-->
        <!--<dd>-->
        <!--<div class="left">-->
        <!--<video id="my-video" webkit-playsinline x5-playsinline playsinline preload controls-->
        <!--src="https://files.proudkids.cn/video/en_poster.mp4">-->
        <!--</video>-->
        <!--</div>-->
        <!--<div class="right">-->
        <!--<div class="li">-->
        <!--<div class="pull-left">-->
        <!--&lt;!&ndash;<img class="titlepic" src="http://files.proudkids.cn/proudkids-ems/20180807/617663569c5c4862a757a0b06e520a10.png"/>&ndash;&gt;-->
        <!--<audio controls-->
        <!--src="http://files.proudkids.cn/proudkids-ems/20180808/68889c29af164725bb876787e784a484.wav"></audio>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="li">-->
        <!--<div class="pull-left">-->
        <!--&lt;!&ndash;<img class="titlepic" src="http://files.proudkids.cn/proudkids-ems/20180807/617663569c5c4862a757a0b06e520a10.png"/>&ndash;&gt;-->
        <!--<p>-->
        <!--这是一些文字，很多很多的文字。这是一些文字，很多很多的文字。这是一些文字，很多很多的文字。这是一些文字，很多很多的文字。这是一些文字，很多很多的文字。这是一些文字，很多很多的文字。这是一些文字，很多很多的文字。</p>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="li">-->
        <!--<div class="pull-right">-->
        <!--<img class="titlepic"-->
        <!--src="http://files.proudkids.cn/proudkids-ems/20180807/617663569c5c4862a757a0b06e520a10.png"/>-->
        <!--<audio controls-->
        <!--src="http://files.proudkids.cn/proudkids-ems/20180808/68889c29af164725bb876787e784a484.wav"></audio>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</dd>-->
        <!--</dl>-->
      </div>
    </div>
  </div>
</template>

<script>
  import PageTitle from '../components/pagetitle.vue';
  import {previewHistory} from '../../../api/aom.js';

  export default {
    components: {
      'v-pagetitle': PageTitle
    },
    data() {
      return {
        list: [],
        ossDomain: 'http://files.proudkids.cn',
      }
    },
    created() {
      this.title = `教务 > 班级管理 > 班级详情 > 学生上课情况 > 预习材料`;
      this.lessonId = this.$route.query.lessonId;
      this.ruserId = this.$route.query.ruserId;
      this.lessonName = this.$route.query.lessonName;
      this.courseName = this.$route.query.courseName;
      previewHistory(this.ruserId, this.lessonId).then((res) => {
          this.list = res.data;
          //console.log(this.list);
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i]['courseFiles'] != null) {
              this.list[i]['courseFiles'] = JSON.parse(this.list[i]['courseFiles']);
              for (let j = 0; j < this.list[i]['courseFiles'].length; j++) {
                if (/\.mp4/.test(this.list[i]['courseFiles'][j].name)) {
                  this.list[i]['courseFiles'][j]['type'] = 'video';
                } else {
                  this.list[i]['courseFiles'][j]['type'] = 'img';
                }
              }
            } else {
              this.list[i]['courseFiles'] = [];
            }

            if (this.list[i]['audioFiles'] != null) {
              this.list[i]['audioFiles'] = JSON.parse(this.list[i]['audioFiles']);
              for (let j = 0; j < this.list[i]['audioFiles'].length; j++) {
                if (/\.wav/.test(this.list[i]['audioFiles'][j]['name']) || /\.mp3/.test(this.list[i]['audioFiles'][j]['name'])) {
                  this.list[i]['audioFiles'][j]['type'] = 'video';
                } else {
                  this.list[i]['audioFiles'][j]['type'] = 'txt';
                }
              }
            } else {
              this.list[i]['audioFiles'] = [];
            }

          }
          console.log(this.list);
        }
      )
    },
    methods: {},
    filters: {},
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../index.scss';

  .aom-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: white;

  .p-20 {
    width: 100%;
    height: 100%;
    overflow: hidden;

  .uc-beforeclass {

  .line {
    margin-top: 20px;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    background: #e3e3e3;
  }

  dl {

  dt {
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    background: #f9f9f9;
  }

  dd {
    list-style: none;
    margin: 10px 0 0 0;
    padding: 0;
    height: 400px;
    width: 100%;
    display: flex;

  .left {
    width: 500px;
    height: 400px;
    background: #f2f2f2;

  img, video {
    width: 100%;
    height: 400px;
  }

  }
  .right {
    flex: 1;
    height: 400px;
    border: 1px solid #f2f2f2;
    padding: 20px;
    overflow-y: auto;

  .li {
    overflow: hidden;
    margin-bottom: 20px;

  p {
    line-height: 25px;
    margin: 0;
  }

  .titlepic {
    width: 54px;
    height: 54px;
    border-radius: 50%;
  }

  }
  }
  }
  }
  }
  }
  }
</style>
