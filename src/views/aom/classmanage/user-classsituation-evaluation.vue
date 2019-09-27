<template>
  <div class="aom-container">
    <div class="p-20">
      <div class="evalua-info">
        <span class="mr-20">中文名字：{{propss.cnName}}</span>
        <span class="mr-20">英文名字：{{propss.enName}}</span>
        <span class="mr-20">绑定手机：{{propss.phone}}</span>
        <span class="mr-20">等级：{{propss.grade}}</span>
      </div>
      <div class="evalua-info mt-20">
        <span class="mr-20">课件名称：{{propss.courseName}}</span>
        <span class="mr-20">课节：{{propss.lessonName}}</span>
        <span class="mr-20">日期：{{propss.originTime}}</span>
      </div>
      <div class="evalua-info mt-20" v-if="dataObj.length">
        <p>注意力：<span class="color-orange">{{(JSON.parse(dataObj[0].concentration)).zh}}</span></p>
        <p>Connection：<span class="color-orange">{{(JSON.parse(dataObj[0].concentration)).en}}</span></p>
      </div>
      <div class="evalua-info mt-20" v-if="dataObj.length">
        <p>阅读流利度：<span class="color-orange">{{(JSON.parse(dataObj[0].fluency)).zh}}</span></p>
        <p>Fluency：<span class="color-orange">{{(JSON.parse(dataObj[0].fluency)).en}}</span></p>
      </div>
      <div class="evalua-info mt-20" v-if="dataObj.length">
        <p>发音：<span class="color-orange">{{(JSON.parse(dataObj[0].pronunciation)).zh}}</span></p>
        <p>Pronunciation：<span class="color-orange">{{(JSON.parse(dataObj[0].pronunciation)).en}}</span></p>
      </div>
      <div class="evalua-info mt-20" v-if="dataObj.length">
        <p>阅读理解力：<span class="color-orange">{{(JSON.parse(dataObj[0].reading)).zh}}</span></p>
        <p>Reading comprehension：<span class="color-orange">{{(JSON.parse(dataObj[0].reading)).en}}</span></p>
      </div>
      <div class="evalua-info mt-20" v-if="dataObj.length">
        <p>听力理解力：<span class="color-orange">{{(JSON.parse(dataObj[0].listening)).zh}}</span></p>
        <p>Listening comprehension：<span class="color-orange">{{(JSON.parse(dataObj[0].listening)).en}}</span></p>
      </div>
      <div class="evalua-info mt-20" v-if="dataObj.length">
        <p class="color-orange">教师评语 （Teacher's Comments）</p>
        <p>{{(dataObj[0].teacherComments)}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {getAvailableLessons, getOneStudentInfoByClassIdRuserId, ruserEvaluation} from '../../../api/aom.js';
  import {sfTools} from '../util.js';
  import PageTitle from '../components/pagetitle.vue';

  export default {
    components: {
      'v-pagetitle': PageTitle
    },
    data() {
      return {
        propss: {},
        dataObj: []
      }
    },
    created() {
      this.propss.cnName = this.$route.query.cnName;
      this.propss.enName = this.$route.query.enName;
      this.propss.phone = this.$route.query.phone;
      this.propss.grade = this.$route.query.grade;
      this.propss.courseName = this.$route.query.courseName;
      this.propss.lessonName = this.$route.query.lessonName;
      this.propss.originTime = this.$route.query.originTime;
      this.propss.evaluateId = this.$route.query.evaluateId;
      console.log(this.propss);
      this._ruserEvaluation(this.propss.evaluateId);
    },
    methods: {
      _ruserEvaluation(eid){
        ruserEvaluation(eid).then((res) => {
          this.dataObj.push(res.data);
          console.log(this.dataObj);
        })
      }
    },
    filters: {
      timestampToDate: function (timestamp) {
        return sfTools.getDateFromTimestamp(timestamp);
      },
      getDescByJson: function (json) {
        return JSON.parse(json).desc;
      }
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../aom/index.scss';

  .aom-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: white;
    .p-20 {
      width: 100%;
      height: 100%;
      overflow: hidden;
      .evalua-info {
        box-shadow: 0 0 10px #ccc;
        line-height: 50px;
        padding: 10px 20px;
        p {
          line-height: 20px;
        }
      }
    }
  }
</style>
