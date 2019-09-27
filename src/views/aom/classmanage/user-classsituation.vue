<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle :title="title"></v-pagetitle>

      <div class="caheige">
        <div class="pull-left width50">
          <span>Chinese Name:</span>
          <b>{{ruserInfo.name}}</b>
        </div>
        <div class="pull-left width50">
          <span>English Name:</span>
          <b>{{ruserInfo.enName}}</b>
        </div>
      </div>

      <div class="addclass-box">

        <!--<div class="h-60 font18 border-bottom">当前操作学生</div>-->
        <!--<div class="h-60">-->
        <!--<span class="mr-50">中文名：{{ruserInfo.name}}</span>-->
        <!--<span class="mr-50">英文名：{{ruserInfo.enName}}</span>-->
        <!--<span class="mr-50">绑定手机：{{ruserInfo.phone}}</span>-->
        <!--<span class="mr-50">级别：{{ruserInfo.grade}}</span>-->
        <!--</div>-->

        <div class="clearfix"></div>
        <div class="item">
          <div class="class-situation-lineg">
            <div @click="classIngOrEd=true;"
                 :class="classIngOrEd===true?'active pull-left c-pointer':'pull-left c-pointer'">
              待上课程（{{availableLessonsList.length}}）
            </div>
            <div @click="classIngOrEd=false;"
                 :class="classIngOrEd===false?'active pull-left c-pointer':'pull-left c-pointer'">
              已上课程（{{noAvailableLessonsList.length}}）
            </div>
          </div>

          <div class="mt-10" v-if="classIngOrEd==true">
            <!--待上课程-->
            <el-table :data="availableLessonsList" border style="width: 100%">
              <el-table-column prop="lessonName" label="Course"></el-table-column>
              <!--<el-table-column prop="lessonName" label="课节"></el-table-column>-->
              <el-table-column label="Date">
                <template slot-scope="scope">{{scope.row.originTime | timestampToDate}}</template>
              </el-table-column>
              <!--<el-table-column label="学生出勤"><template slot-scope="scope">待上课</template></el-table-column>-->
              <!--<el-table-column label="评语"><template slot-scope="scope">未评价</template></el-table-column>-->
              <!--<el-table-column label="预习材料">-->
                <!--<template slot-scope="scope">-->
                  <!--&lt;!&ndash;isPerviews=0 未预习 isPerviews=1 已预习 isPerviews=2 预习了部分&ndash;&gt;-->
                  <!--<el-button v-if="scope.row.isPerview!==0" type="success" size="mini" @click="gotoBeforeclass(scope)">-->
                    <!--进入-->
                  <!--</el-button>-->
                  <!--<el-button v-if="scope.row.isPerview===0" size="mini">未预习</el-button>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column label="Link">
                <template slot-scope="scope">
                  <a :href="scope.row.monitorAddr" target="_blank">
                    <el-button size="mini" type="primary">Click</el-button>
                  </a>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="mt-10" v-if="classIngOrEd==false">
            <!--已上课程-->
            <el-table :data="noAvailableLessonsList" border style="width: 100%">
              <el-table-column prop="lessonName" label="Course"></el-table-column>
              <!--<el-table-column prop="lessonName" label="课节"></el-table-column>-->
              <el-table-column label="Date">
                <template slot-scope="scope">{{scope.row.originTime | timestampToDate}}</template>
              </el-table-column>
              <!--<el-table-column label="学生评价">-->
                <!--<template slot-scope="scope">五颗星-->
                  <!--&lt;!&ndash;<span v-if="scope.row.eval=='0'">未评价</span>&ndash;&gt;-->
                  <!--&lt;!&ndash;<span v-if="scope.row.eval=='1'">{{scope.row.lessonStars}}星</span>&ndash;&gt;-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column label="Attendance">
                <template slot-scope="scope">{{scope.row.ruserStatus == '1' ? 'Attended' : 'Absent'}}</template>
              </el-table-column>
              <!--<el-table-column label="评语">-->
              <!--<template slot-scope="scope">未评价</template>-->
              <!--</el-table-column>-->
              <el-table-column label="SS Progress">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.evaluateId" size="mini" @click="gotoEvaluation(scope.row)">Click
                  </el-button>
                  <span v-if="!scope.row.evaluateId">Not yet</span>
                </template>
              </el-table-column>
              <!--<el-table-column label="预习材料">-->
                <!--<template slot-scope="scope">-->
                  <!--&lt;!&ndash;isPerviews=0 未预习 &ndash;&gt;-->
                  <!--&lt;!&ndash;isPerviews=1 已预习 &ndash;&gt;-->
                  <!--&lt;!&ndash;isPerviews=2 预习了部分&ndash;&gt;-->
                  <!--<el-button v-if="scope.row.isPerview!==0" type="success" size="mini" @click="gotoBeforeclass(scope)">-->
                    <!--进入-->
                  <!--</el-button>-->
                  <!--<el-button v-if="scope.row.isPerview===0" size="mini">未预习</el-button>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column label="Link">
                <template slot-scope="scope">
                  <a :href="scope.row.monitorAddr" target="_blank">
                    <el-button size="mini" type="primary">查看</el-button>
                  </a>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
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
        classIngOrEd: true,  //待上课程和已上课程的切换
        ruserInfo: {},
        availableLessonsList: [],  //待上课
        noAvailableLessonsList: []

      }
    },
    created() {
      this.name = this.$route.query.name;
      this.classId = this.$route.query.classId;
      this.ruserId = this.$route.query.ruserId;
      this.refId = this.$route.query.refId;
      this.title = `教务 > 班级管理 > 班级详情 > 学生上课情况`;
      //this.title = `教务 > 班级管理 > ${this.name} > 班级详情 > 学生上课情况`;
      this._getAvailableLessons();
      this._getOneStudentInfoByClassIdRuserId();
    },
    methods: {
      _getOneStudentInfoByClassIdRuserId(){
        getOneStudentInfoByClassIdRuserId(this.classId, this.ruserId).then((res) => {
          this.ruserInfo = res.data;
        })
      },
      _getAvailableLessons(){
        getAvailableLessons(this.ruserId, this.classId, '0').then((res) => {
          this.availableLessonsList = res.data.records;
          console.log(this.availableLessonsList);
        });
        getAvailableLessons(this.ruserId, this.classId, '1').then((res) => {
          this.noAvailableLessonsList = res.data.records;
          console.log(this.noAvailableLessonsList);
        });
      },
      getData() {
        alert('getData');
      },
      handleClick() {
        alert('button click');
      },
      edit(id) {
        this.$router.push({path: '/aom/classtype-edit', query: {id: id}});
      },
      gotoDetail(id) {
        this.$router.push({path: '/aom/classtype-detail', query: {id: id}});
      },
      classTypeClick() {
        alert('classTypeClick')
      },
      supervision(id) {  //监课链接
        this.$router.push({path: '/aom/classtype-detail', query: {id: id}});
      },
      gotoBeforeclass(row){
        console.log(row.row);
        //return;//lessonId ruserId
        this.$router.push({
          path: '/aom/classmanage-user-classsituation-beforeclass', query: {
            lessonId: row.row.lessonId,
            ruserId: row.row.ruserId,
            lessonName: row.row.lessonName,
            courseName: row.row.courseName
          }
        });
      },
      gotoEvaluation(row){
        console.log(row);
        this.$router.push({
          path: '/aom/classmanage-user-classsituation-evaluation', query: {
            cnName: this.ruserInfo.name,
            enName: this.ruserInfo.enName,
            phone: this.ruserInfo.phone,
            grade: this.ruserInfo.grade,
            courseName: row.courseName,
            lessonName: row.lessonName,
            originTime: row.originTime.substring(0, 10),
            evaluateId: row.evaluateId
          }
        });
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

<style rel="stylesheet/scss" type="text/scss" lang="scss">
  @import '../index.scss';

  .aom-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: white;
    .p-20 {
      .caheige {
        margin-top: 20px;
        height: 60px;
        line-height: 60px;
        border: 1px solid #e4e4e4;
        width: 100%;
        .pull-left {
          span, b {
            font-weight: normal;
            padding: 0 10px;
            display: inline-block;
            text-align: right;
          }
          span {
            background: #f6f7fb;
            width: 40%;
          }
        }
      }
      .class-situation-lineg {
        border-bottom: 1px solid #ccc;
        height: 40px;
        line-height: 40px;
        div {
          height: 40px;
          line-height: 40px;
          text-align: center;
          width: 180px;
          &.active {
            border-bottom: 2px solid #449cfd;
          }
        }
      }
      width: 100%;
      height: 100%;
      overflow: hidden;
      .addclass-box {
        height: auto;
        width: 100%;
        padding: 20px 0;
        .item {
          margin-bottom: 20px;
          background: #fbfbfb;
          padding: 20px;
          border-radius: 10px;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
