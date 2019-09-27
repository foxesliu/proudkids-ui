<template>
  <div class="aom-container">
    <p  class="title">Package: {{name}}</p>
    <div>
      <template>
          <el-collapse-transition>
          <div v-show="show3">
            <div class="transition-box">
              <template>
                <el-table
                    :data="list1"
                    border
                    style="width: 100%;font-size:13px;border-bottom:none"
                    :header-cell-style="{background:'#f9fafc'}"

                    >
                    <el-table-column
                        prop="Instructor"
                        label="Instructor"
                        align="center"
                        >
                        <template slot-scope="scope">
                        {{scope.row.teacherType == 1 ? 'FT' : 'CT'}}
                      </template>
                    </el-table-column>
                    <el-table-column
                        prop="name.name"
                        label="Course"
                        align="center"
                        >
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="Pre-Class Courseware"
                        align="center"
                        >
                      <template slot-scope="scope">
                          <a v-if="scope.row.coursewares"
                            :href="'/aom/lesson/downloadZip/'+scope.row.lessonId +'?type=1'"
                            target="_blank">
                          <el-button type="primary" size="mini"><i class="el-icon-download"></i> Download</el-button>
                        </a>
                      </template>
                    </el-table-column>
                    <el-table-column
                        prop="courseName"
                        label="Courseware "
                        align="center"
                        >
                      <template slot-scope="scope">
                        <a v-if="scope.row.coursewares"
                            :href="'/aom/lesson/downloadZip/'+scope.row.lessonId+'?type=0'"
                            target="_blank">
                          <el-button type="primary" size="mini"><i class="el-icon-download"></i> Download</el-button>
                        </a>
                      </template>

                    </el-table-column>
                    <el-table-column
                        prop="courseName"
                        label="Date "
                        align="center"
                        >
                      <template slot-scope="scope">
                          <span>{{scope.row.day | timestampToDate}}</span>
                        </template>
                    </el-table-column>
                </el-table>
              </template>
            </div>
          </div>
        </el-collapse-transition>

      </template>
    </div>
    <div class="mb-20 t-center" :class="show3==true?'bt-none':''">
       <el-button type="success" size="mini" style="width:90px" @click="show3 = !show3" >{{show3 ==true ?'Hide':'All'}}<i class="el-icon--right" :class="show3==true?'el-icon-caret-top':'el-icon-caret-bottom'"></i></el-button>
    </div>
    <div>
      <template>
        <el-table
            :data="list2"
            border
            style="width: 100%;font-size:13px;"
            :header-cell-style="{background:'#f9fafc'}"
            >
            <el-table-column
                prop="Instructor"
                label="Instructor"
                align="center"
                >
                <template slot-scope="scope">
                {{scope.row.teacherType == 1 ? 'FT' : 'CT'}}
              </template>
            </el-table-column>
            <el-table-column
                prop="name.name"
                label="Course"
                align="center"
                >
            </el-table-column>
            <el-table-column
                prop=""
                label="Pre-Class Courseware"
                align="center"
                >
              <template slot-scope="scope">
                  <a v-if="scope.row.coursewares"
                    :href="'/aom/lesson/downloadZip/'+scope.row.lessonId+'?type=1'"
                    target="_blank">
                  <el-button type="primary" size="mini"><i class="el-icon-download"></i> Download</el-button>
                </a>
              </template>
            </el-table-column>
            <el-table-column
                prop="courseName"
                label="Courseware "
                align="center"
                >
              <template slot-scope="scope">
                <a v-if="scope.row.coursewares"
                    :href="'/aom/lesson/downloadZip/'+scope.row.lessonId+'?type=0'"
                    target="_blank">
                  <el-button type="primary" size="mini"><i class="el-icon-download"></i> Download</el-button>
                </a>
              </template>

            </el-table-column>
            <el-table-column
                prop="courseName"
                label="Date "
                align="center"
                >
              <template slot-scope="scope">
                  <span>{{scope.row.day | timestampToDate}}</span>
                </template>
            </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
  import {getLessonSByClassTypeId, downloadLessonZip, getCourseListByClassId} from '../../../../api/aom.js';
  import PageTitle from '../../../aom/components/pagetitle.vue';
  import {sfTools} from '../../../aom/util.js';
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
  export default {
    components: {
      'v-pagetitle': PageTitle
    },
    data() {
      return {
        showAllCourse: false,
        list1: [],
        list2: [],
        tableData:[],
        show3: false,
        show:'',
      }
    },

    created() {
      this.classId = this.$route.query.classId || 1;
      this.name = this.$route.query.name;
      console.log(this.name)
      this.title = `班级类型设置 > ${this.name} > 查看课件`;
      this._getCourseListByClassId();
      //alert((new Date(new Date('2018-07-03 00:00:00'))).getTime());
    },
    methods: {
      changeShowAllCourse(){
        this.showAllCourse = !this.showAllCourse;
        this._getCourseListByClassId();
        console.log(this.showAllCourse)
      },
      _getCourseListByClassId() {
        getCourseListByClassId(this.classId, 1, 1000000).then((res) => {
          var lis = res.data.records;
          var listt1 = [];
          var listt2 = [];
          var todayTimestamp = (new Date(new Date().setHours(0, 0, 0, 0))).getTime();
          for (var i = 0; i < lis.length; i++) {
            console.log((new Date(new Date(lis[i]['day']))).getTime());
            if ((new Date(new Date(lis[i]['day']))).getTime()+24*60*60*1000 > todayTimestamp) {
              listt2.push(lis[i]);
            } else {
              listt1.push(lis[i]);
            }
          }
          this.list1 = listt1;
          this.list2 = listt2;
        })
      }
    },
    filters: {
      timestampToDate: function (timestamp) {
        return sfTools.getDateFromTimestamp(timestamp);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../../aom/index.scss';

  .aom-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: white;
    padding: 20px;
    .title{
      margin-bottom: 24px;
    }
    .t-center{
      height: 60px;
	    border: solid 1px #ebeef5;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
    .bt-none{
      border-top: none;
    }
  }
</style>
