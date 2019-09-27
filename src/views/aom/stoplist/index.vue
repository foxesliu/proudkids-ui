<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle title="停课名单"></v-pagetitle>
      <div class="addclass-box">
        <div class="o-hidden pl-20 pr-20">
          <div class="pull-left">
            <div class="o-hidden">
              <span class="pull-left display-block h-40" style="width:100px;">选择中教：</span>
              <div class="pull-left">
                <v-teacherchinese @childChooseTeacher="chooseChineseTeacher"></v-teacherchinese>
              </div>
            </div>
          </div>
          <div class="pull-right">
            <el-button type="warning" @click="search">查询</el-button>
          </div>
        </div>

        <div class="course-container p-20">
          <div class="ul pt-20">
            <div class="li pull-left c-pointer" @click="gotopage('未开始',0,0)">
              <div class="div">
                <div class="t-center font18 lh-20 width100">未开始</div>
                <div class="i font20 t-center mt-10">{{count3}}个</div>
              </div>
            </div>

            <div class="li pull-left c-pointer" @click="gotopage('停课中',1,0)">
              <div class="div">
                <div class="t-center font18 lh-20 width100">停课中</div>
                <div class="i font20 t-center mt-10">{{count1}}个</div>
              </div>
            </div>

            <div class="li pull-left c-pointer" @click="gotopage('停课结束',2,0)">
              <div class="div">
                <div class="t-center font18 lh-20 width100">停课结束</div>
                <div class="i font20 t-center mt-10">{{count2}}个</div>
              </div>
            </div>

            <div class="li pull-left c-pointer" @click="gotopage('已恢复',undefined,1)">
              <div class="div">
                <div class="t-center font18 lh-20 width100">已恢复</div>
                <div class="i font20 t-center mt-10">{{count0}}个</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {getClassRuserSuspendCount} from '../../../api/aom.js';
  import PageTitle from '../components/pagetitle.vue';
  import TeacherChinese from '../components/teacher_chinese.vue';

  export default {
    components: {
      'v-pagetitle': PageTitle,
      'v-teacherchinese': TeacherChinese
    },
    data() {
      return {
        count0: 0,
        count1: 0,
        count2: 0,
        count3: 0,
        daquId: '',
        teamId: '',
        teacherId: ''
      }
    },
    created() {
      this._getClassRuserSuspendCount();
    },
    methods: {
      gotopage(a, b, c){
        this.$router.push({path: '/aom/stoplist-list', query: {name: a, stage: b, stat: c}});
      },
      chooseChineseTeacher(bumenId, daquId, teamId, teacherId){
        this.daquId = daquId;
        this.teamId = teamId;
        this.teacherId = teacherId;
      },
      search(){
        if (!(this.teacherId)) {
          this.$message({type: 'error', message: '请选择老师'});
        } else {
          this._getClassRuserSuspendCount();
        }
      },
      _getClassRuserSuspendCount() {
        var obj = {
          region: this.daquId || '',
          group: this.teamId || '',
          userId: this.teacherId || ''
        };
        getClassRuserSuspendCount(Object.assign({}, obj, {stage: undefined, stat: 1})).then((res) => {
          this.count0 = res.data;
        });
        getClassRuserSuspendCount(Object.assign({}, obj, {stage: 1, stat: 0})).then((res) => {
          this.count1 = res.data;
        });
        getClassRuserSuspendCount(Object.assign({}, obj, {stage: 2, stat: 0})).then((res) => {
          this.count2 = res.data;
        });
        getClassRuserSuspendCount(Object.assign({}, obj, {stage: 0, stat: undefined})).then((res) => {
          this.count3 = res.data;
        });
      }
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
      .addclass-box {
        height: auto;
        width: 100%;
        padding: 20px 0;
      }
    }
  }
</style>
