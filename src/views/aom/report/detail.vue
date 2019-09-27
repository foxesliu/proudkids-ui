<template>
  <div class="aom-container">
    <div class="p-20 add-report-container">
      <div class="box" style="padding-bottom:20px;">
        <div class="pull-left">
          <el-input v-model="className" placeholder="Search Clsss"/>
        </div>
        <div class="pull-right">
          <el-button @click="reset">Reset</el-button>
          <el-button type="success" @click="searchClass">Search</el-button>
        </div>
        <div class="clearfix"></div>
      </div>

      <div v-if="!isSearch">
        <div class="title-line mt-20">Today's</div>
        <div class="box">
          <ul>
            <li v-for="(item,index) in classes" :class="classIndex==index?'active':''" @click="chooseClass(index)">
              {{item.className}}
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <div class="title-line mt-20">Student name</div>
        <div class="box">
          <ul>
            <li v-for="(item,index) in students" :class="studentIndex==index?'active':''" @click="chooseStudent(index)">
              {{item.ruserEnName}}
            </li>
            <li @click="chooseStudent(-1)" :class="studentIndex==-1?'active':''">ALL</li>
          </ul>
          <div class="clearfix"></div>
        </div>
      </div>

      <div v-if="isSearch">
        <div v-if="classesSearch.length==0" class="h-50 lh-50 t-center">暂无数据</div>
        <div v-if="classesSearch.length">
          <div class="title-line mt-20">Search Results</div>
          <div class="box">
            <ul>
              <li v-for="(item,index) in classesSearch" :class="classIndexSearch==index?'active':''"
                  @click="chooseClassSearch(index,item.classId)">
                {{item.name}}
              </li>
            </ul>
            <div class="clearfix"></div>
          </div>
          <div class="title-line mt-20">Student name</div>
          <div class="box">
            <ul>
              <li v-for="(item,index) in studentsSearch" v-if="item.periods>0"
                  :class="studentIndexSearch==index?'active':''"
                  @click="chooseStudentSearch(index)">
                {{item.enName}}
              </li>
              <li @click="chooseStudentSearch(-1)"
                  :class="studentIndexSearch==-1?'active':''">ALL
              </li>
            </ul>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>

      <div>
        <div class="title-line mt-20">Type of issues</div>
        <div class="box">
          <ul>
            <li v-for="(item,index) in issues" :class="issueIndex==index?'active':''" @click="chooseIssue(index)">
              {{item}}
            </li>
          </ul>
          <el-input placeholder="notes" v-model="issueText" @focus="issueIndex=-1" class="mb-15"></el-input>
          <div class="clearfix"></div>
        </div>
      </div>
      <div class="mt-20 mb-20 t-center">
        <el-button type="primary" class="width-200" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {addFeedback, classLessonDetailToday, getClasses, getStudentsByClassId} from '../../../api/aom.js';
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        classIndex: 0,
        classes: [],
        studentIndex: 0,
        students: [],
        issueIndex: 0,
        issues: [
          'Students ask for leave early.',
          'Student did not attend.',
          'The teacher did not attend.',
          'Students can not hear the teacher speak.',
          'The teacher can not hear the students speaking.',
          'The teacher can not see the students.',
          'Students can not see the teacher.',
          'Teacher equipment problem.',
          'Ambient noise is high.',
          'Students are noisy in class.',
          'Students drop out of classroom.',
          'Custom problem types.'
        ],
        issueText: '',
        className: '',
        isSearch: false,
        classesSearch: [],
        classIndexSearch: 0,
        studentsSearch: [],
        studentIndexSearch: 0
      }
    },
    computed: {
      ...mapGetters(['userId', 'roleIds'])
    },
    created() {
      this._classLessonDetailToday();
      console.log(this.roleIds[0])
    },
    methods: {
      searchClass(){
        this.isSearch = true;
        var obj = {page: 1, rows: 10000, name: this.className};
        console.log(obj);
        getClasses(obj).then((res) => {
          this.classesSearch = res.data.records;
          this.classIndexSearch = 0;
          console.log(this.classesSearch);
          if (this.classesSearch.length) {
            this._getStudentsByClassId(this.classesSearch[0]['classId']);
          }
        })
      },
      _getStudentsByClassId(classId){
        getStudentsByClassId(classId).then((res) => {
          this.studentsSearch = res.data;
        })
      },
      chooseClassSearch(index, classId){
        console.log(index, classId);
        this.classIndexSearch = index;
        this._getStudentsByClassId(classId);
      },
      chooseStudentSearch(index){
        this.studentIndexSearch = index;
      },
      reset(){
        this.isSearch = false;
        this.className = '';
        this._classLessonDetailToday();
      },
      submit(){
        console.log(this.issueIndex);
        let obj = {
          userId: this.userId,
          roleId: this.roleIds[0],
          classId: this.classes[this.classIndex]['classId']
        };
        obj.stuName = this.studentIndex === -1 ? 'ALL' : this.students[this.studentIndex]['ruserEnName'];

        if (this.isSearch) {
          obj.classId = this.classesSearch[this.classIndexSearch]['classId'];
          obj.stuName = this.studentIndexSearch === -1 ? 'ALL' : this.studentsSearch[this.studentIndexSearch]['enName'];
        }
        if (this.issueIndex === -1) {
          obj.issue = this.issueText;
          if (!this.issueText) {
            alert('Please write.');
            return;
          }
        } else {
          obj.issue = this.issues[this.issueIndex];
        }
        console.log(obj);
        //return;
        addFeedback(obj).then((res) => {
          if (res.data.code === 0) {
            this.$router.push({path: '/message/feedback'});
          }
        })
      },
      chooseClass(index){
        this.classIndex = index;
        this.studentIndex = 0;
        this.students = this.classes[index]['studentList'];
      },
      chooseStudent(index){
        this.studentIndex = index;
      },

      chooseIssue(index){
        this.issueIndex = index;
      },
      _classLessonDetailToday(){
        var start = new Date();
        //var start = new Date('2018-11-14');  //1536508800
        start.setHours(0);
        start.setMinutes(0);
        start.setSeconds(0);
        start.setMilliseconds(0);
        var todayStartTime = Date.parse(start) / 1000;
        classLessonDetailToday(todayStartTime).then((res) => {
          this.classes = res.data.records;
          //console.log(this.classes);
          this.classIndex = 0;
          this.students = this.classes[0]['studentList'];
        })
      }
    },
    filters: {},
    components: {}
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss">
  @import '../index.scss';

  .add-report-container {
    .title-line {
      height: 50px;
      line-height: 50px;
      font-size: 30px;
    }
    .box {
      width: 100%;
      height: auto;
      /*min-height: 200px;*/
      box-shadow: 0 0 10px #ccc;
      border-radius: 8px;
      padding: 20px 20px 5px 20px;
      margin-top: 10px;
      ul {
        padding: 0;
        margin: 0;
        li {
          float: left;
          height: 30px;
          line-height: 28px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-right: 20px;
          margin-bottom: 15px;
          padding: 0 20px 0 25px;
          position: relative;
          cursor: pointer;
          &:before {
            display: block;
            width: 10px;
            height: 10px;
            border: 1px solid #ccc;
            border-radius: 50%;
            content: '';
            position: absolute;
            left: 10px;
            top: 9px;
          }
          &.active {
            border: 1px solid #409EFF;
            color: #409eff;
            &:before {
              border: 1px solid #409EFF;
            }
          }
        }
      }
    }
  }
</style>
