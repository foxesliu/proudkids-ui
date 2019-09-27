<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle title="教务 > 班级管理 > 开设班级"></v-pagetitle>
      <div class="addclass-box">
        <div class="item o-hidden">
          <div class="h-60 o-hidden">
            <span class="h-60 display-inline-block" style="width:150px;">课程类型：</span>
            <el-select v-model="courseType" value-key="1" @change="changeCourseType()" placeholder="--课程类型--">
              <el-option label="长期课" value="1"></el-option>
              <el-option label="短期课" value="2"></el-option>
              <el-option label="体验课" value="3"></el-option>
              <el-option label="线下课" value="4"></el-option>
            </el-select>
          </div>
          <div class="h-60 o-hidden">
            <span class="h-60 display-inline-block" style="width:150px;">班级类型名称：</span>
            <el-select v-model="classTypeValue" placeholder="--班级类型名称--">
              <el-option v-for="item in classTypeList"
                         :key="item.classTypeId" :label="item.name"
                         :value="item.classTypeId"></el-option>
            </el-select>
          </div>
          <div class="h-60 o-hidden" v-if="courseType!=3||(courseType==3&&checkChineseTeacher)">
            <span class="pull-left display-block h-60" style="width:150px;">选择中教：</span>
            <div class="pull-left" style="padding-left:5px">
              <v-teacherchinese @childChooseTeacher="chooseChineseTeacher"></v-teacherchinese>
            </div>
            <div class="pull-left" style="padding-left:15px">
              <el-button type="success" @click="checkChineseTeacher=false" v-if="courseType==3">切换到外教</el-button>
            </div>
          </div>
          <div class="h-60 o-hidden" v-if="courseType!=3||(courseType==3&&!checkChineseTeacher)">
            <span class="pull-left display-block h-60" style="width:150px;">选择外教：</span>
            <div class="pull-left" style="padding-left:5px">
              <v-teacherforeign @childChooseTeacher="chooseForeignTeacher"></v-teacherforeign>
            </div>
            <div class="pull-left" style="padding-left:15px">
              <el-button type="success" v-if="courseType==3" @click="checkChineseTeacher=true">切换到中教</el-button>
            </div>
          </div>


          <div class="h-60 o-hidden" v-if="courseType==4">
            <span class="h-40 display-inline-block" style="width:150px;">中教上课时间：</span>
            <el-select v-model="ctClassTime" placeholder="--中教上课时间--">
              <el-option v-for="item in ctClassTimeList"
                         :key="item" :label="item"
                         :value="item"></el-option>
            </el-select>
          </div>


          <div class="h-60 o-hidden">
            <span class="h-40 display-inline-block" style="width:150px;">外教上课时间：</span>
            <el-select v-model="classTime" placeholder="--外教上课时间--">
              <el-option v-for="item in classTimeList"
                         :key="item" :label="item"
                         :value="item"></el-option>
            </el-select>
          </div>

          <div class="h-60 o-hidden">
            <span class="h-40 display-inline-block" style="width:150px;">班级开始日期：</span>
            <el-date-picker v-model="startTime" type="date" style="width:202px"
                            value-format="yyyy-MM-dd" placeholder="选择日期">
            </el-date-picker>
          </div>

          <div class="h-60 o-hidden">
            <span class="h-40 display-inline-block" style="width:150px;">班级名称：</span>
            <el-input v-model="name" style="width:202px;" placeholder="请输入名称"></el-input>
          </div>

          <div class="h-60 o-hidden">
            <span class="h-40 display-inline-block" style="width:150px;">&nbsp;</span>
            <el-button type="primary" class="width-200" @click="submit">确定</el-button>
          </div>
        </div>

        <!--<div class="item o-hidden">-->
        <!--<div class="h-30">生成的中教班级名称：001</div>-->
        <!--<div class="h-30">生成的外教班级名称：002</div>-->
        <!--</div>-->

      </div>
    </div>
  </div>
</template>

<script>
  import {getClassTypeItems, addNewClass, getTeachers} from '../../../api/aom.js';
  import {sfData} from '../util.js';
  import PageTitle from '../components/pagetitle.vue';
  import TeacherForeign from '../components/teacher_foreign.vue';
  import TeacherChinese from '../components/teacher_chinese.vue';

  export default {
    components: {
      'v-pagetitle': PageTitle,
      'v-teacherforeign': TeacherForeign,
      'v-teacherchinese': TeacherChinese
    },
    data() {
      return {
        courseType: '1',
        classTypeList: [],
        classTypeValue: '',
        classTimeList: [],
        classTime: '',
        ctClassTimeList: ['8:30-10:00', '10:10-11:40', '13:00-14:30', '14:40-16:10', '16:20-17:50', '18:00-19:30'],
        ctClassTime: '',
        startTime: '',
        itermType: '',
        endTime: '',
        name: '',
        checkChineseTeacher: true
      }
    },
    created() {
      this.title = `教务 > 班级管理 > 新增班级`;
      this._getClassTypeItems();
      this.classTimeList = sfData.classTimes;
    },
    methods: {
      chooseChineseTeacher(bumenId, daquId, teamId, teacherId){
        this.chineseTeacher = teacherId;
      },
      chooseForeignTeacher(bumenId, daquId, teamId, teacherId){
        this.foreignTeacher = teacherId;
      },
      changeCourseType(){
        //alert(this.courseType)
        this._getClassTypeItems()
        this.classTypeValue = ''
      },

      _getClassTypeItems() {
        //type = 1长期 2短期 3体验课 筛选一下
        getClassTypeItems({status: '0'}).then((res) => {
          var aList = res.data
          var list = []
          for (var i = 0; i < aList.length; i++) {
            if (aList[i].type == this.courseType) {
              list.push(aList[i])
            }
          }
          this.classTypeList = list;
          console.log(this.classTypeList);
        })
      },

      submit() {
        var obj = {
          startTime: this.startTime,
          classTime: this.classTime.toString(),
          status: this.courseType,
          classTypeId: this.classTypeValue,
          name: this.name,
        };
        if (obj.status == 4) {
          obj.ctClassTime = this.ctClassTime;
        }
        if (obj.status !== '3') {
          obj.chineseTeacherId = this.chineseTeacher;
          obj.foreignTeacherId = this.foreignTeacher;
        } else {
          if (this.checkChineseTeacher) {
            obj.chineseTeacherId = this.chineseTeacher;
          } else {
            obj.foreignTeacherId = this.foreignTeacher;
          }
        }
        console.log(obj);
        for (let i in obj) {
          if (!obj[i]) {
            this.$message({type: 'error', message: '请填写完整'});
            return false;
          }
        }
        //return
        var _this = this;
        addNewClass(obj).then((res) => {
          if (res.data) {
            this.$message({
              type: 'success', message: '新增班级成功!', onClose: function () {
                _this.$router.push({path: '/aom/classmanage'});
              }
            });
          }
        })
      },

      edit(id) {
        this.$router.push({path: '/aom/classtype-edit', query: {id: id}});
      },
      gotoDetail(id) {
        this.$router.push({path: '/aom/classtype-detail', query: {id: id}});
      }
    },
    mounted() {
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
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
        .item {
          margin-bottom: 20px;
          background: #fbfbfb;
          padding: 20px;
          border-radius: 10px;
          & > .pull-left, & > div > .pull-left {
            &:nth-child(1) {
              width: 130px;
            }
          }
        }
      }
    }
  }
</style>
