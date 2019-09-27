<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle :title="title"></v-pagetitle>
      <div class="addclass-box">
        <div class="item o-hidden">
          <span class="pull-left h-40">班级类型名称：</span>
          <el-input v-model="classTypeName" class="inline-input pull-left width-300" placeholder="请输入内容"></el-input>
        </div>

        <div class="item o-hidden">
          <div class="pull-left"><span class="pull-left h-40">每周上课时间：</span></div>
          <div class="pull-left">
            <div v-show="weekTimeItems.length>0">
              <el-select v-model="weektimeId" class="width-300" placeholder="请选择">
                <el-option v-for="item in weekTimeItems" :key="item.id"
                           :label="(item.jsonStr)|getDescByJson"
                           :value="item.id"></el-option>
              </el-select>
            </div>
          </div>
        </div>

        <div class="item o-hidden">
          <span class="pull-left h-40">班级开始时间：</span>
          <el-date-picker v-model="startTime" value-format="yyyy/MM/dd" class="width-300" type="date"
                          placeholder="选择日期">
          </el-date-picker>
        </div>

        <div class="item o-hidden">
          <span class="pull-left h-40">班级结束日期：</span>
          <el-date-picker v-model="endTime" value-format="yyyy/MM/dd" class="width-300" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>

        <div class="item o-hidden">
          <div class="pull-left"><span class="pull-left h-40">非授课时间：</span></div>
          <div class="pull-left">
            <div class="mb-10" v-for="(item,index) in restConfigs" :key="index">
              <el-date-picker v-model="restConfigs[index]" type="daterange" align="right" class="width-400"
                              unlink-panels range-separator="-"
                              start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
              <el-button type="primary" class="ml-10" @click="deleteTimeField(index)"><i
                class="el-icon-delete el-icon--right"></i> 删除时间段
              </el-button>
            </div>
            <div>
              <el-button type="success" class="pull-left" @click="addTimeField"><i
                class="el-icon-plus el-icon--right"></i> 增加时间段
              </el-button>
            </div>
          </div>
        </div>

        <div class="item o-hidden">
          <div class="o-hidden">
            <span class="pull-left h-40">级别：</span>
            <el-select v-model="grade" class="width-300" placeholder="请选择">
              <el-option v-for="item in gradeList" :key="item.id" :label="item.str" :value="item.id"></el-option>
            </el-select>
          </div>
          <div class="o-hidden mt-10">
            <span class="pull-left h-40">选择课程：</span>
            <el-select v-model="courseId" class="width-300" placeholder="请选择">
              <el-option v-for="item in ingCourseList" :key="item.courseId" :label="item.name"
                         :value="item.courseId"></el-option>
            </el-select>
          </div>
          <div class="o-hidden mt-10">
            <span class="pull-left h-40">课程类型：</span>
            <el-select v-model="classTypeId" class="width-300" placeholder="请选择">
              <el-option v-for="item in classTypeArray" :key="item.id" :label="item.str"
                         :value="item.id"></el-option>
            </el-select>
          </div>
          <div class="o-hidden mt-10">
            <span class="pull-left h-40">班级人数：</span>
            <el-select v-model="numbers" class="width-300" placeholder="请选择">
              <el-option v-for="item in numberss" :key="item.id" :label="item.str"
                         :value="item.id"></el-option>
            </el-select>
          </div>
        </div>

        <div class="item t-center">
          <el-button type="primary" class="width-200" @click="submit">确定</el-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {getCourseListByStatus, addClassType, getWeekTimeItems} from '@/api/aom.js';
  import {test} from '../util.js';
  import PageTitle from '../components/pagetitle.vue';
  import {sfTools, sfData} from '../util.js';
  import {mapGetters} from 'vuex'

  export default {
    components: {
      'v-pagetitle': PageTitle
    },
    data() {
      return {
        classTypeName: '',
        weekTimeItems: [],
        weektimeId: '',
        startTime: '',
        endTime: '',
        restConfigs: [],
        gradeList: sfData.gradeList,
        grade: '',
        ingCourseList: [],
        courseId: '',
        classTypeArray: sfData.classTypeArray,
        classTypeId: '',
        numberss: [
          {id: 4, str: '1V4'},
        ],
        numbers: ''
      }
    },
    created() {
      this.title = `班级类型设置 > 新增班级类型`;
      this._getCourseListByStatus();
      this._getWeekTimeItems();
    },
    methods: {
      //每周上课时间
      _getWeekTimeItems() {
        getWeekTimeItems().then((res) => {
          this.weekTimeItems = res.data;
          console.log(this.weekTimeItems);
        });
      },

      //获取课程列表
      _getCourseListByStatus() {
        getCourseListByStatus('0').then(res => {
          this.ingCourseList = res.data;
          console.log(this.ingCourseList);
        });
      },

      //添加一个“非授课时间”
      addTimeField() {
        this.restConfigs.push([]);
      },

      //删除一个“非授课时间”
      deleteTimeField(index) {
        if (this.restConfigs.length <= 0) {
          this.$message.error('你丫留一个呀');
        } else {
          this.restConfigs.splice(index, 1);
        }
      },

      submit() {
        var array = [];
        for (var i = 0; i < this.restConfigs.length; i++) {
          if (this.restConfigs[i][0]) {
            array.push({
              startRestTime: (new Date(this.restConfigs[i][0])).getTime(),
              endRestTime: (new Date(this.restConfigs[i][1])).getTime()
            });
          } else {
            this.$message({type: 'error', message: '请选择时间!'});
            return false;
          }
        }
        var obj = {
          name: this.classTypeName,
          weektimeId: this.weektimeId,  //每周上课时间
          startTime: (new Date(this.startTime)).getTime(),
          endTime: (new Date(this.endTime)).getTime(),
          grade: this.grade,
          courseId: this.courseId,
          type: this.classTypeId || 1,
          numbers: this.numbers,
          weekTimeList: [{"teacherType": 0, "week": "string"}],
          stat: 1,  //进行中
          restConfigs: array,
          creatorId: this.userId,
        };
        console.log(obj);
        for (var i in obj) {
          if (!obj[i] && obj[i] != '0') {
            this.$message({type: 'error', message: '请填写完整'});
            return false;
          }
        }
        addClassType(obj).then((res) => {
          var _this = this;
          if (res.data) {
            this.$message({
              type: 'success',
              message: '添加成功!',
              onClose: function () {
                _this.$router.push({
                  path: '/aom/classtype-list',
                  query: {name: '进行的班级类型', status: 0}
                });
              }
            });
          }
        });
      }
    },
    filters: {
      getDescByJson: function (json) {
        return JSON.parse(json).desc;
      }
    },
    computed: {
      ...mapGetters(['userId'])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../index.scss';

  .el-date-editor .el-range-separator {
    padding: 0 !important;
  }

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
