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
          <span class="pull-left h-40">班级开始日期：</span>
          <el-date-picker v-model="startTime" class="width-300" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>

        <div class="item o-hidden">
          <span class="pull-left h-40">班级结束日期：</span>
          <el-date-picker v-model="endTime" class="width-300" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>

        <div class="item o-hidden">
          <div class="pull-left"><span class="pull-left h-40">非授课时间：</span></div>
          <div class="pull-left">
            <div class="mb-10" v-for="(item,index) in restConfigs" :key="index">
              <el-date-picker v-model="restConfigs[index]" type="daterange" class="width-400"
                              unlink-panels value-format="yyyy-MM-dd"
                              :disabled="restConfigIds[index]!=undefined"
                              @change="addRestConfigsBtn(index)"
                              range-separator="-"
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
              <el-option v-for="item in gradeList" :key="item.id" :value-key="item.str" :label="item.str"
                         :value="item.id"></el-option>
            </el-select>
          </div>
          <div class="o-hidden mt-10">
            <span class="pull-left h-40">选择课程：</span>
            <el-select v-model="courseId" class="width-300" placeholder="请选择">
              <el-option v-for="item in ingCourseList" :key="item.courseId" :label="item.name" :value-key="item.name"
                         :value="item.courseId"></el-option>
            </el-select>
          </div>
          <div class="o-hidden mt-10">
            <span class="pull-left h-40">课程类型：</span>
            <el-select class="width-300" placeholder="请选择" v-model="type11">
              <el-option v-for="c in classTypeArray" :key="c.id"
                         :value="c.id" :label="c.str" :value-key="c.str"></el-option>
            </el-select>
          </div>
          <div class="o-hidden mt-10">
            <span class="pull-left h-40">班级人数：</span>
            <el-select v-model="numbers" class="width-300" placeholder="请选择">
              <el-option v-for="item in numberss" :key="item.id" :label="item.str" :value-key="item.str"
                         :value="item.id"></el-option>
            </el-select>
          </div>
        </div>

        <div class="item t-center">
          <el-button type="primary" class="width-200" @click="submit">确定</el-button>
          <!--<el-button type="danger" @click="_deleteClassType">删除该班级</el-button>-->
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {
    getCourseListByStatus,
    editClassType,
    getOneClassType,
    getWeekTimeItems,
    deleteClassType,
    addClassTypeRestConfig,
    deleteClassTypeRestConfig
  } from '@/api/aom.js';
  import {sfTools, sfData} from '../util.js';
  import {test} from '../util.js';
  import PageTitle from '../components/pagetitle.vue';

  export default {
    components: {
      'v-pagetitle': PageTitle
    },
    data() {
      return {
        classTypeName: '',
        weekTimeItems: [],
        weektimeId: '',
        endTime: '',
        //restConfigs: [['2012-12-12','2012-12-15'], []],
        restConfigs: [],
        restConfigIds: [],
        gradeList: sfData.gradeList,
        grade: '',
        ingCourseList: [],
        courseId: '',
        classTypeArray: sfData.classTypeArray,
        classTypeId: '',
        numberss: [
          {id: 4, str: '1V4'},
        ],
        numbers: '',
        startTime: '',
        type11: ''
      }
    },
    created() {
      this.classTypeId = this.$route.query.classTypeId;
      this.stat = this.$route.query.stat;
      this.type = this.$route.query.type;
      //this.title = `班级类型设置 > ${this.stat == '1' ? '进行中' : '过期'}的班级类型 > 编辑班级类型`;
      this.title = `班级类型设置 > 编辑班级类型`;
      this._getOneClassType();
      this._getCourseListByStatus();
      this._getWeekTimeItems();
    },
    methods: {
      //删除班级类型
      _deleteClassType() {
        this.$confirm('确定要删除吗?', '提示',
          {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
        ).then(() => {
          deleteClassType(this.classTypeId).then((res) => {
            var _this = this;
            if (res.data) {
              this.$message({
                type: 'success', message: '删除成功!', onClose: function () {
                  _this.$router.push({
                    path: '/aom/classtype-list',
                    query: {name: _this.stat == '0' ? '进行中的班级类型' : '过期的班级类型', status: _this.stat}
                  });
                }
              });
            }
          });
        });
      },

      //每周上课时间
      _getWeekTimeItems() {
        getWeekTimeItems().then((res) => {
          this.weekTimeItems = res.data;
          console.log(this.weekTimeItems);
        });
      },

      //班级类型检索 obj => {classTypeId:0}
      _getOneClassType() {
        getOneClassType(this.classTypeId).then((res) => {
          this.info = res.data;
          console.log(this.info);
          this.endTime = sfTools.getDateFromTimestamp(this.info.endTime);
          this.startTime = sfTools.getDateFromTimestamp(this.info.startTime);
          this.grade = this.info.grade;
          this.classTypeName = this.info.name;
          this.courseId = this.info.courseId;
          this.weektimeId = this.info.weektimeId;
          this.numbers = this.info.numbers;
          this.type11 = this.info.type;
          var rest = this.info.restConfigs;
          var tmpArray = [];
          var tmpArrayId = [];
          for (var i = 0; i < rest.length; i++) {
            tmpArray.push([sfTools.getDateFromTimestamp(rest[i]['startRestTime']), sfTools.getDateFromTimestamp(rest[i]['endRestTime'])]);
            tmpArrayId.push(rest[i]['restConfigId']);
          }
          this.restConfigs = tmpArray;
          this.restConfigIds = tmpArrayId;
          console.log(this.restConfigs);
          console.log(this.restConfigIds);
        })
      },

      //获取课程列表
      _getCourseListByStatus() {
        getCourseListByStatus('0').then(res => {
          this.ingCourseList = res.data;
          console.log(JSON.stringify(this.ingCourseList));
        });
      },

      //添加一个“非授课时间”
      addTimeField() {
        this.restConfigs.push([]);
      },

      addRestConfigsBtn(index) {
        var time1 = (this.restConfigs[index][0]);
        var time2 = (this.restConfigs[index][1]);
        var obj = {
          classTypeId: this.classTypeId,
          startRestTime: sfTools.getDateFromTimestamp(time1),
          endRestTime: sfTools.getDateFromTimestamp(time2)
        };
        addClassTypeRestConfig(obj).then((res) => {
          this._getOneClassType();
        });
      },

      //删除一个“非授课时间”
      deleteTimeField(index) {
        deleteClassTypeRestConfig(this.restConfigIds[index]).then(() => {
          this._getOneClassType();
        });
      },

      submit() {
        let array = [];
        for (let i = 0; i < this.restConfigs.length; i++) {
          if (this.restConfigs[i][0]) {
            array.push({
              startRestTime: this.restConfigs[i][0],
              endRestTime: this.restConfigs[i][1]
            });
          } else {
            this.$message({type: 'error', message: '请选择时间!'});
            return false;
          }
        }
        let obj = {
          classTypeId: this.classTypeId,
          name: this.classTypeName,
          weektimeId: this.weektimeId,  //每周上课时间
          endTime: (new Date(this.endTime)).getTime(),
          startTime: (new Date(this.startTime)).getTime(),
          grade: this.grade,
          courseId: this.courseId,
          type: this.type11,
          numbers: this.numbers,
          weekTimeList: [{"teacherType": 0, "week": "string"}],
          stat: this.stat,  //进行中
          //restConfigs: array
        };
        console.log(obj);
        for (let i in obj) {
          if (!obj[i] && obj[i] !== 0) {
            this.$message({type: 'error', message: '请填写完整'});
            return false;
          }
        }
        editClassType(obj).then((res) => {
          let _this = this;
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '编辑成功!',
              onClose: function () {
                _this.$router.go(-1);
              }
            });
          } else {
            this.$message({type: 'error', message: res.msg});
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
