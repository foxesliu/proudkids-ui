<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle :title="title"></v-pagetitle>
      <div class="addclass-box">
        <div class="item o-hidden">
          <div class="top">
            <span class="pull-left h-40">课程名称：</span>
            <el-input v-model="courseName" disabled class="inline-input pull-left width-300"
                      placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="item o-hidden">
          <div class="top">
            <span class="pull-left h-40">课节名称：</span>
            <el-input v-model="lessonName" class="inline-input pull-left width-300" placeholder="请输入内容"></el-input>
          </div>
        </div>

        <!--<div>-->
        <!--<input ref="input111" type="file" v-on:change="jsReadFiles"/>-->
        <!--</div>-->

        <div class="item t-center">
          <el-button type="primary" class="width-200" @click="_addLesson">下一步</el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

  import {addLesson} from '../../../api/aom.js';
  import {test} from '../util.js';
  import PageTitle from '../components/pagetitle.vue';

  export default {
    components: {
      'v-pagetitle': PageTitle,
    },
    data() {
      return {
        courseName: '',
        lessonName: '',
        keySentences: '',
        keywords: '',
        objective: '',
        testData: '课程管理',
        input1: '课件名称',

        tableData: [
          {date: '第三节', name: '60节', address: '状态：进行中'},
          {date: '第三节', name: '60节', address: '状态：进行中'},
          {date: '第三节', name: '60节', address: '状态：进行中'},
          {date: '第三节', name: '60节', address: '状态：进行中'},
          {date: '第三节', name: '60节', address: '状态：进行中'}
        ]
      }
    },
    created() {
      this.courseId = this.$route.query.courseId;
      this.courseName = this.$route.query.courseName;
      this.isIng = this.$route.query.isIng;
      this.lessonName = this.$route.query.lessonName;
      this.title = '课程管理 > ' + this.isIng + ' > ' + this.courseName + ' > 增加一个课节';
    },
    methods: {
      _addLesson() {
        addLesson({
          courseId: this.courseId,
          name: this.lessonName
        }).then((res) => {
          if (res.data.data.lessonId) {
            this.$router.push({
              path: '/aom/coursemanage-lessonlist',
              query: {
//                lessonId: res.data.data.lessonId,
                isIng: this.isIng,
                courseName: this.courseName,
//                lessonName: this.lessonName,
                courseId: this.courseId
              }
            });
            //aom/coursemanage-lessonlist?isIng=进行中的课程&courseId=85&courseName=11111
//            this.$router.push({
//              path: '/aom/coursemanage-editlesson',
//              query: {
//                lessonId: res.data.data.lessonId,
//                isIng: this.isIng,
//                courseName: this.courseName,
//                lessonName: this.lessonName,
//                courseId: this.courseId
//              }
//            });
          }
        });
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      handleDelete() {
        console.log(123);
      },
//      jsReadFiles() {
//        console.log(this.$refs.input111.files[0])
//      }
    },
    mounted() {
    }
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
      .title {
        height: 40px;
        line-height: 40px;
        overflow: hidden;
      }
      .addclass-box {
        height: auto;
        width: 100%;
        padding: 20px 0;
        .item {
          margin-bottom: 20px;
          background: #fbfbfb;
          padding: 20px;
          border-radius: 10px;
          transition: all 0.3s;
          &:hover {
            box-shadow: 0 0 15px #ccc;
          }
        }

      }
    }
  }
</style>
