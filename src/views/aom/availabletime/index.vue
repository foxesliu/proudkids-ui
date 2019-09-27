<template>
  <div class="aom-container">
    <div class="p-20">
      <!-- <v-pagetitle :title="title"></v-pagetitle> -->
      <div class="addclass-box">
         <div class="flex-box top-flex-box">
              <div class="item1"><span :class="{selected:isselected}"  @click="tutorType=0;isselected=true">CT</span><b >/</b><span @click="tutorType=1;isselected=false" :class="{selected:!isselected}" >FT</span></div>
              <div class="flex-box item2">
                <div class="flex-box">
                  <v-teacherchinese ref="ct" @childChooseTeacher="chooseChineseTeacher" v-if="tutorType==0"></v-teacherchinese>
                  <v-teacherforeign ref="ft" @childChooseTeacher="chooseChineseTeacher" v-if="tutorType==1"></v-teacherforeign>
                  <div style="margin-left:10px;">
                    <template >
                      <div class="block">
                        <el-date-picker
                          v-model="dateValue"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="Select Date">
                        </el-date-picker>
                      </div>
                    </template>
                  </div>
                </div>
                <div>
                  <el-button type="danger" class="ml-10" style="width:90px;" @click="ctClear" v-if="tutorType==0">empty</el-button>
                  <el-button type="danger" class="ml-10" style="width:90px;" @click="ftClear"  v-if="tutorType==1">empty</el-button>

                  <el-button type="primary" class="ml-10" style="width:90px;" @click="_classAssignStatistics">search</el-button>
                </div>
              </div>
            </div>
        <!-- <div class="o-hidden border-bottom pb-10">

          <div class="o-hidden mb-10 pull-left" v-if="tutorType==1">

            <div class="o-hidden">
              <span class="pull-left display-block h-40" style="width:100px;">选择外教：</span>
              <div class="pull-left">
                <v-teacherforeign @childChooseTeacher="chooseForeignTeacher"></v-teacherforeign>
              </div>
              <div class="pull-left">
                <el-button type="default" class="ml-10" size="mini"
                           @click="tutorType=0">切换到中教
                </el-button>
              </div>
            </div>
          </div>
          <div class="pull-right width10">
            <el-button type="success" class="width100" @click="_classAssignStatistics">查询</el-button>
          </div>
        </div> -->
        <div class="mt-40 table-box">
          <div class="o-hidden flex-box week-flex-box">
            <!-- <div class="pull-left aom-week-list">
              <div @click="chooseWeek(7)" :class="obj.weekpoint==7?'span active':'span'">周日</div>
              <div @click="chooseWeek(1)" :class="obj.weekpoint==1?'span active':'span'">周一</div>
              <div @click="chooseWeek(2)" :class="obj.weekpoint==2?'span active':'span'">周二</div>
              <div @click="chooseWeek(3)" :class="obj.weekpoint==3?'span active':'span'">周三</div>
              <div @click="chooseWeek(4)" :class="obj.weekpoint==4?'span active':'span'">周四</div>
              <div @click="chooseWeek(5)" :class="obj.weekpoint==5?'span active':'span'">周五</div>
              <div @click="chooseWeek(6)" :class="obj.weekpoint==6?'span active':'span'">周六</div>
            </div> -->
            <ul class="flex-box week-box">
              <li @click="chooseWeek(7)" :class="obj.weekpoint==7?'li-active':''">Sun</li>
              <li @click="chooseWeek(1)" :class="obj.weekpoint==1?'li-active':''">Mon</li>
              <li @click="chooseWeek(2)" :class="obj.weekpoint==2?'li-active':''">Tues</li>
              <li @click="chooseWeek(3)" :class="obj.weekpoint==3?'li-active':''">Wed</li>
              <li @click="chooseWeek(4)" :class="obj.weekpoint==4?'li-active':''">Thur</li>
              <li @click="chooseWeek(5)" :class="obj.weekpoint==5?'li-active':''">Fri</li>
              <li @click="chooseWeek(6)" :class="obj.weekpoint==6?'li-active':''">Sat</li>
            </ul>
            <div>
              <el-button type="primary" style="width:90px" @click="download">Export<i
                class="el-icon-download el-icon--right"></i></el-button>
            </div>
          </div>
          <div class="o-hidden mt-20">
            <el-table :data="list" :header-cell-style="{background:'#f9fafc'}" border style="width: 100%" >
              <el-table-column label="Time Slot" align="center">
                <template slot-scope="scope">
                  {{scope.row.timeslot}}
                </template>
              </el-table-column>
              <el-table-column label="Unscheduled" align="center">
                <template slot-scope="scope">
                  <span class="display-block c-pointer"
                        @click="levelClick(obj.weekpoint,scope.row.timeslot,null)">{{scope.row.notAssignedNum || 0}}人</span>
                </template>
              </el-table-column>
              <el-table-column label="Level K" align="center">
                <template slot-scope="scope">
                  <span class="display-block c-pointer"
                        @click="levelClick(obj.weekpoint,scope.row.timeslot,0)">{{scope.row.levelKNum || 0}}人 / {{scope.row.levelKRate | rateFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column label="Level 1" align="center">
                <template slot-scope="scope">
                  <span class="display-block c-pointer"
                        @click="levelClick(obj.weekpoint,scope.row.timeslot,1)">{{scope.row.levelOneNum || 0}}人 / {{scope.row.levelOneRate | rateFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column label="Level 2" align="center">
                <template slot-scope="scope">
                  <span class="display-block c-pointer"
                        @click="levelClick(obj.weekpoint,scope.row.timeslot,2)">{{scope.row.levelTwoNum || 0}}人 / {{scope.row.levelTwoRate | rateFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column label="Level 3" align="center">
                <template slot-scope="scope">
                  <span class="display-block c-pointer"
                        @click="levelClick(obj.weekpoint,scope.row.timeslot,3)">{{scope.row.levelThreeNum || 0}}人 / {{scope.row.levelThreeRate | rateFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column label="Level 4" align="center">
                <template slot-scope="scope">
                  <span class="display-block c-pointer"
                        @click="levelClick(obj.weekpoint,scope.row.timeslot,4)">{{scope.row.levelFourNum || 0}}人 / {{scope.row.levelFourRate | rateFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column label="Level 5" align="center">
                <template slot-scope="scope">
                  <span class="display-block c-pointer"
                        @click="levelClick(obj.weekpoint,scope.row.timeslot,5)">{{scope.row.levelFiveNum || 0}}人 / {{scope.row.levelFiveRate | rateFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column label="Level 6" align="center">
                <template slot-scope="scope">
                  <span class="display-block c-pointer"
                        @click="levelClick(obj.weekpoint,scope.row.timeslot,6)">{{scope.row.levelSixNum || 0}}人 / {{scope.row.levelSixRate | rateFilter}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {classAssignStatistics} from '../../../api/aom.js';
  import {sfTools, sfData} from '../util.js';
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
        isselected:true,
        regionId: '',
        groupId: '',
        userId: '',
        dateValue: '',
        tutorType: 0,  //切换中外教选择条的显示 0=>中教; 1=>外教
        obj: {
          weekpoint: 7
        },
        list: []
      }
    },
    created() {
      this.title = `可用时间 班级查询`;
      this.classTimeArray = sfData.classTimes;
      this._classAssignStatistics();
    },
    methods: {
      ctClear(){
        this.dateValue=null;
         this.userId=null;
         this.regionId=null;
         this.regionId=null;
        this.$refs.ct.clear()
      },
      ftClear(){
         this.dateValue=null
         this.userId=null;
         this.regionId=null;
         this.regionId=null;
        this.$refs.ft.clear()
      },
      chooseChineseTeacher(bumenId, daquId, teamId, teacherId){
        this.chineseTeacherRegionId = daquId;
        this.chineseTeacherGroupId = teamId;
        this.chineseTeacherId = teacherId;
        console.log(this.chineseTeacherRegionId, this.chineseTeacherGroupId, this.chineseTeacherId);
        //this.obj.chineseTeacherName = '';
      },
      chooseForeignTeacher(bumenId, daquId, teamId, teacherId){
        this.foreignTeacherRegionId = daquId;
        this.foreignTeacherGroupId = teamId;
        this.foreignTeacherId = teacherId;
        console.log(this.foreignTeacherRegionId, this.foreignTeacherGroupId, this.foreignTeacherId);
        //this.foreignTeacherName = '';
      },
      download(){
        let a = `/aom/tutorUptime/classAssign/statistics/exportExcel?regionId=${this.regionId}&groupId=${this.groupId}&userId=${this.userId}&weekpoint=${this.obj.weekpoint}`;
        window.open(a, "_blank");
      },
      levelClick(a, b, c){
        if (this.tutorType === 1) {  //外教
          this.regionId = this.foreignTeacherRegionId;
          this.groupId = this.foreignTeacherGroupId;
          this.userId = this.foreignTeacherId;
        } else {
          this.regionId = this.chineseTeacherRegionId;
          this.groupId = this.chineseTeacherGroupId;
          this.userId = this.chineseTeacherId;
        }
        this.$router.push({
          path: '/aom/availabletime-detail',
          query: {
            weekpoint: a,
            timeslot: b,
            grade: c,
            regionId: this.regionId,
            groupId: this.groupId,
            userId: this.userId
          }
        });
      },
      chooseWeek(a){
        this.obj.weekpoint = a;
        this._classAssignStatistics();
      },
      chooseChineseTeacher(bumenId, daquId, teamId, teacherId){
        this.regionId = daquId;
        this.groupId = teamId;
        this.userId = teacherId;
      },
      chooseForeignTeacher(bumenId, daquId, teamId, teacherId){
        this.regionId = daquId;
        this.groupId = teamId;
        this.userId = teacherId;
      },
      _classAssignStatistics(){
        this.obj.regionId = this.regionId;
        this.obj.groupId = this.groupId;
        this.obj.userId = this.userId;
        let selectedDate =  this.dateValue
        console.log(this.dateValue)
        if(this.dateValue){
          this.obj.originTimeGe = this.dateValue
        }else{
          this.obj.originTimeGe=null
        }
        
        console.log(this.obj);
        classAssignStatistics(this.obj).then((res) => {
          this.list = res.data;
          console.log(this.list);
        });
      }

    },
    filters: {
      timestampToDate: function (timestamp) {
        return sfTools.getDateFromTimestamp(timestamp);
      },
      rateFilter: function (a) {
        if (a) {
          return (a * 100).toFixed(2) + '%';
        } else {
          return '0%';
        }
      }
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

  .aom-week-list {
    .span {
      float: left;
      width: 100px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #ccc;
      border-right: none;
      text-align: center;
      cursor: pointer;
      &.active, &:hover {
        background: #38c546;
        color: white;
      }
      &:last-child {
        border-right: 1px solid #ccc;
      }
    }
  }
  .top-flex-box{
    display: flex;
    .item1{
      width: 135px;
      height: 56px;
      line-height: 56px;
      color:#a1a1a1;
      font-size: 24px;
      b{
        font-weight: normal;
        cursor: pointer;
      }
      span{
        cursor: pointer;
      }
    }
    .item2{
      height: 56px;
      width: 100%;
      padding: 0 20px;
      margin-left: 20px;
      align-items: center;
      justify-content: space-between;
      background-color: #f9fafc;
      border: solid 1px #dcdfe6;
      border-radius: 4px;

    }
  }
  .table-box{

    box-shadow: 0px 2px 35px 0px
		rgba(88, 93, 107, 0.13);
    border-radius: 10px;
    border: solid 1px #ebeef5;
    padding:  0 20px 20px 20px;
    .week-flex-box{
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ebeef5;
      .week-box{
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
        li{
          width: 130px;
          height: 78px;
          line-height: 78px;
          font-size: 18px;
          color: #666666;
          text-align: center;
          cursor: pointer;
        }
        .li-active{

        }
        .li-active, li:hover{
          color: #449cfc;
          border-bottom: 2px solid #449cfc;
        }
      }
    }

  }
  .selected{
    font-size: 64px;
    color: #464646;
  }
</style>
