<template>
  <div class="courseware">
    <div class="header">
      <!--课程名称：{{courseName}}-->
      {{$t('i18nView.courseware.courseName')}}
    </div>
    <div class="container">
      <el-table v-show="!fromPage" :data="list1" v-if="showAllCourse" border style="width: 100%;margin-bottom:20px;">
        <el-table-column prop="name.name" :label="$t('i18nView.courseware.name')" width="150"></el-table-column>
        <el-table-column :label="$t('i18nView.courseware.course')">
          <template slot-scope="scope">
            <div class="o-hidden">
              <div class="pull-left" style="max-width:70%">
                <p class="m-0 p-0">
                  <span>{{$t('i18nView.courseware.courseName')}}</span>
                  <span v-for="it in scope.row.coursewares" v-if="it.type=='0'">{{it.name}}<br/></span>
                </p>
                <p class="m-0 p-0">
                  <span>{{$t('i18nView.courseware.previewData')}}</span>
                  <span class="mr-20" v-for="it in scope.row.coursewares" v-if="it.type=='1'">{{it.name}}<br/></span>
                </p>
                <p class="m-0 p-0">
                  <span>{{$t('i18nView.courseware.reviewData')}}</span>
                  <span class="mr-20" v-for="it in scope.row.coursewares" v-if="it.type=='2'">{{it.name}}<br/></span>
                </p>
                <p class="m-0 p-0">
                  <span>{{$t('i18nView.courseware.readingBook')}}</span>
                  <span class="mr-20" v-for="it in scope.row.coursewares" v-if="it.type=='3'">{{it.name}}<br/></span>
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="day" :label="$t('i18nView.courseware.downloadZip')" width="200">
          <template slot-scope="scope">
            <a v-if="scope.row.coursewares"
               :href="'/aom/lesson/downloadZip/'+scope.row.lessonId"
               target="_blank">
              <el-button type="success" size="mini"><i class="el-icon-download"></i>
                {{$t('i18nView.courseware.downloadZip')}}
              </el-button>
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="day" :label="$t('i18nView.courseware.date')" width="200">
          <template slot-scope="scope">
            {{scope.row.day | timeSubString}}
          </template>
        </el-table-column>
      </el-table>

      <div v-if="!fromPage" style="margin:0 auto 20px auto; text-align: center">
        <!--<el-button type="warning" @click="changeShowAllCourse">{{!showAllCourse ? '显示全部' : '隐藏部分'}}-->
        <el-button type="warning" @click="changeShowAllCourse">Toggle</el-button>
      </div>

      <el-table v-if="!fromPage" :data="list2" border style="width: 100%">
        <el-table-column prop="name.name" :label="$t('i18nView.courseware.name')" width="150"></el-table-column>
        <el-table-column :label="$t('i18nView.courseware.course')">
          <template slot-scope="scope">
            <div class="o-hidden">
              <div class="pull-left" style="max-width:70%">
                <p class="m-0 p-0">
                  <span>{{$t('i18nView.courseware.courseName')}}</span>
                  <span v-for="it in scope.row.coursewares" v-if="it.type=='0'">{{it.name}}<br/></span>
                </p>
                <p class="m-0 p-0">
                  <span>{{$t('i18nView.courseware.previewData')}}</span>
                  <span class="mr-20" v-for="it in scope.row.coursewares" v-if="it.type=='1'">{{it.name}}<br/></span>
                </p>
                <p class="m-0 p-0">
                  <span>{{$t('i18nView.courseware.reviewData')}}</span>
                  <span class="mr-20" v-for="it in scope.row.coursewares" v-if="it.type=='2'">{{it.name}}<br/></span>
                </p>
                <p class="m-0 p-0">
                  <span>{{$t('i18nView.courseware.readingBook')}}</span>
                  <span class="mr-20" v-for="it in scope.row.coursewares" v-if="it.type=='3'">{{it.name}}<br/></span>
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="day" :label="$t('i18nView.courseware.downloadZip')" width="200">
          <template slot-scope="scope">
            <a v-if="scope.row.coursewares"
               :href="'/aom/lesson/downloadZip/'+scope.row.lessonId"
               target="_blank">
              <el-button type="success" size="mini"><i class="el-icon-download"></i>
                {{$t('i18nView.courseware.downloadZip')}}
              </el-button>
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="day" :label="$t('i18nView.courseware.date')" width="200">
          <template slot-scope="scope">
            {{scope.row.day | timeSubString}}
          </template>
        </el-table-column>
      </el-table>

      <el-table v-if="fromPage" :data="list" border style="width: 100%">
        <el-table-column prop="name" :label="$t('i18nView.courseware.name')" width="150"></el-table-column>
        <el-table-column :label="$t('i18nView.courseware.course')">
          <template slot-scope="scope">
            <div class="o-hidden">
              <div class="pull-left" style="max-width:70%">
                <p class="m-0 p-0">
                  <span>{{$t('i18nView.courseware.courseName')}}</span>
                  <span v-for="it in scope.row.courseWares" v-if="it.type=='0'">{{it.name}}<br/></span>
                </p>
                <p class="m-0 p-0">
                  <span>{{$t('i18nView.courseware.previewData')}}</span>
                  <span class="mr-20" v-for="it in scope.row.courseWares" v-if="it.type=='1'">{{it.name}}<br/></span>
                </p>
                <p class="m-0 p-0">
                  <span>{{$t('i18nView.courseware.reviewData')}}</span>
                  <span class="mr-20" v-for="it in scope.row.courseWares" v-if="it.type=='2'">{{it.name}}<br/></span>
                </p>
                <p class="m-0 p-0">
                  <span>{{$t('i18nView.courseware.readingBook')}}</span>
                  <span class="mr-20" v-for="it in scope.row.courseWares" v-if="it.type=='3'">{{it.name}}<br/></span>
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="day" :label="$t('i18nView.courseware.downloadZip')" width="200">
          <template slot-scope="scope">
            <a :href="'/aom/lesson/downloadZip/'+scope.row.lessonId"
               target="_blank">
              <el-button type="success" size="mini"><i class="el-icon-download"></i>
                {{$t('i18nView.courseware.downloadZip')}}
              </el-button>
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="day" :label="$t('i18nView.courseware.date')" width="200">
          <template slot-scope="scope">
            {{scope.row.updateTime | timeSubString}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import local from '@/views/i18n-demo/local'

  const viewName = 'i18nView'
  import {getCourseListByClassId} from '@/api/teachers';
  import {findLessonById} from '../../../api/aom.js';
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        userInfo: {},
        showAllCourse: false,
        list1: [],
        list2: [],
        list: []
      }
    },
    created() {
      if (!this.$i18n.getLocaleMessage('en')[viewName]) {
        this.$i18n.mergeLocaleMessage('en', local.en)
        this.$i18n.mergeLocaleMessage('zh', local.zh)
      }
      let [roleId] = this.roleIds;
      if (roleId == 20 || roleId == 21 || roleId == 22 || roleId == 31) {
        this.$i18n.locale = 'zh'
        this.$store.dispatch('setLanguage', 'zh')

      } else if (roleId == 23 || roleId == 24 || roleId == 25 || roleId == 32) {
        this.$i18n.locale = 'en'
        this.$store.dispatch('setLanguage', 'en')
      }
      this.classId = this.$route.query.classId || 1;
      this.name = this.$route.query.name;
      this.lessonId = this.$route.query.lessonId;
      this.fromPage = this.$route.query.fromPage;
      if (this.fromPage) {
        this._findLessonListByCourseId();
      } else {
        this.getCourseList();
      }
    },
    computed: {
      ...mapGetters(['grade', 'schedulePoint', 'roleIds', 'userId']),

    },
    methods: {
      _findLessonListByCourseId() {
        findLessonById(this.lessonId).then((res) => {
          this.list.push(res.data);
          console.log(this.list);
        })
      },
      changeShowAllCourse(){
        this.showAllCourse = !this.showAllCourse;
        this.getCourseList();
        console.log(this.showAllCourse)
      },
      getCourseList() {
        getCourseListByClassId(this.classId, 1, 1000000).then((res) => {
          var lis = res.data.records;
          console.log(lis);
          var listt1 = [];
          var listt2 = [];
          var todayTimestamp = (new Date(new Date().setHours(0, 0, 0, 0))).getTime();
          for (var i = 0; i < lis.length; i++) {
            console.log((new Date(new Date(lis[i]['day']))).getTime());
            if ((new Date(new Date(lis[i]['day']))).getTime() > todayTimestamp) {
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
      timeSubString: function (timestamp) {
        if (timestamp) {
          return timestamp.substring(0, 10);
        }

      },
      myDate: function (txData) {
        if (txData) {
          const days = ['日', '一', '二', '三', '四', '五', '六'];
          let dateT = txData ? new Date(txData) : new Date();
          return `星期${days[dateT.getDay()]}`;
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../sale/detail/detail.scss';

  .courseware {
    @include detail-container();
    @include btn();
    .header {
      height: 78px;
      background: #fff;
      font-size: 18px;
      color: #8e8e8e;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border: 2px solid #f6f6f6;
      border-radius: 10px;
      padding-left: 38px;
      margin-bottom: 18px;
    }
  }
</style>
