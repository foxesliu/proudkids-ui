<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle :title="title"></v-pagetitle>

      <div class="item">
        <div class="h-40 font-bold font16 mt-10">班级人数：{{studentsList.length}}/4</div>
        <div class="pt-5 pb-15">
          <el-table :data="studentsList" border v-loading="listLoading" element-loading-text="正在加载中"
                    style="width: 100%">
            <el-table-column prop="ccName" align="center" label="CC">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <span>{{scope.row.ccDepartInfo}}{{scope.row.ccName}}</span>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{scope.row.ccName}}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="phone" label="ClassIn Account"></el-table-column>
            <el-table-column align="center" prop="name" label="Chinese Name"></el-table-column>
            <el-table-column align="center" label="Englist Name">
              <template slot-scope="scope">
                <span>{{scope.row.enName || '--------'}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="periods" label="Remain Lessons"></el-table-column>
            <el-table-column align="center" label="移除学生">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" v-if="scope.row.ccId==userId||roleId==27"
                           @click="_classDeleteStudent(scope.row.classId,scope.row.ruserId,scope.row.ccId)">移除
                </el-button>
                <span v-else>----------</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="Student Specs">
              <template slot-scope="scope">
                <span></span>
                <el-button size="mini" type="primary" v-if="scope.row.ccId==userId||roleId==27"
                           @click="gotoClassSituation(scope.row.classId,scope.row.ruserId,scope.row.id)">查看
                </el-button>
                <span v-else>----------</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="用户详情页">
              <template slot-scope="scope">
                <el-button size="mini" type="success" v-if="scope.row.ccId==userId||roleId==27"
                           @click="gotoUserDetail(scope.row.phone)">查看
                </el-button>
                <span v-else>----------</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="h-40 font-bold font16">班级属性（Class Profiles）</div>

      <div class="item o-hidden">
        <table class="table" cellspacing="0" cellpadding="0">
          <tr>
            <td>
              <div class="span pull-left">Course ID</div>
              <div class="span pull-left">
                <el-input class="pull-left width-150"
                          v-model="editNameValue" size="small"
                          :disabled="editNameIsShow!=true" @blur="editNameFunc"></el-input>
                <!--<el-button class="pull-left" @click="editNameIsShow=true"-->
                <!--style="margin-top:11px;margin-left:5px;" size="small"-->
                <!--icon="el-icon-edit"></el-button>-->
              </div>
            </td>
            <td>
              <div class="span pull-left">Created Time</div>
              <div class="span pull-left">{{detail.createTime | substring10}}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="span pull-left">Start Date</div>
              <div class="span pull-left">{{detail.startTime | substring10}}</div>
            </td>
            <td>
              <div class="span pull-left">End Date</div>
              <div class="span pull-left">{{detail.endTime | substring10}}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="span pull-left">Class Time</div>
              <div class="span pull-left">{{detail.classTime}}</div>
            </td>
            <td>
              <div class="span pull-left">School Time</div>
              <div class="span pull-left">
                <span class="mr-10 pull-left"
                      v-for="(c,index) in detail.teacherWeektime" :key="index">
                {{c.teacherType == '0' ? 'CT' : 'FT'}}[{{c.week | replaceWeek}}]

              </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="span pull-left">Package</div>
              <div class="span pull-left">{{detail.courseName}}</div>
            </td>
            <td>
              <div class="span pull-left">Course Name</div>
              <div class="span pull-left">
                <!--<el-select v-model="value" size="small" disabled placeholder="请选择">-->
                <!--<el-option v-for="item in options" size="mini"-->
                <!--:key="item.value" :label="item.label" :value="item.value">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <span class="mr-5">{{detail.classTypeName}}</span>
                <!--<el-button style="position:relative; top:-1px;"-->
                <!--@click="dialogVisible=true" size="small"-->
                <!--icon="el-icon-edit" circle></el-button>-->
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="span pull-left">Status</div>
              <div class="span pull-left">
                <span v-if="sttat == '正常'" style="color:green">normal</span>
                <span v-if="sttat == '已关闭'" style="color:red;">closed</span>
                <span v-if="sttat == '已结束'" style="color:#e6a23c;">finished</span>
              </div>
            </td>
            <td>
              <div class="span pull-left">Term Type</div>
              <div class="span pull-left" v-if="detail.itermType == '1'">long-term</div>
              <div class="span pull-left" v-if="detail.itermType == '2'">short-term</div>
              <div class="span pull-left" v-if="detail.itermType == '3'">free-trial</div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="span pull-left">Level</div>
              <div class="span pull-left">{{detail.grade}}</div>
            </td>
            <td>
              <div class="span pull-left">link</div>
              <div class="span pull-left">
                <a :href="detail.liveAddr" target="_blank">
                  <el-button size="mini" type="success">Click</el-button>
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="span pull-left">CT</div>
              <div class="span pull-left">
                <!--<el-button size="mini" style="margin:10px 20px 0 0;">123</el-button>-->
                <el-button v-if="detail.chineseTeacherName"
                           :title="detail.chineseTeacherRegionName+' - '+detail.chineseTeacherGroupName+' - '+detail.chineseTeacherName"
                           size="mini">{{detail.chineseTeacherName}}
                </el-button>
                <span v-else>--------</span>
              </div>
            </td>
            <td>
              <div class="span pull-left">FT</div>
              <div class="span pull-left">
                <el-button v-if="detail.foreignTeacherName"
                           :title="detail.foreignTeacherRegionName+' - '+detail.foreignTeacherGroupName+' - '+detail.foreignTeacherName"
                           size="mini">{{detail.foreignTeacherName}}
                </el-button>
                <span v-else>--------</span>
              </div>
              <!--<div class="pull-right">-->
              <!--<el-button size="mini" @click="classChangeTeacher()"-->
              <!--style="margin:14px 20px 0 0;" type="success">修改老师-->
              <!--</el-button>-->
              <!--</div>-->
            </td>
          </tr>
        </table>
        <div class="clearfix"></div>
      </div>

      <div class="item mt-20">
        <div class="h-40 font-bold font16 mt-10">曾经在这个班级呆过的学生（Students, who used be in this class）</div>
        <div class="pt-5 pb-15">
          <el-table :data="studentsList2" border style="width: 100%">
            <el-table-column prop="ccName" align="center" label="CC">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <span>{{scope.row.ccDepartInfo}}{{scope.row.ccName}}</span>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{scope.row.ccName}}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="phone" label="ClassIn Account"></el-table-column>
            <el-table-column align="center" prop="name" label="Chinese Name"></el-table-column>
            <el-table-column align="center" label="Englist Name">
              <template slot-scope="scope">
                <span>{{scope.row.enName || '--------'}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="periods" label="Finished"></el-table-column>
            <el-table-column align="center" label="Start-end" width="150">
              <template slot-scope="scope">
                {{scope.row.lessonStartDate|substring10}} <br>
                {{scope.row.lessonEndDate|substring10}}
              </template>
            </el-table-column>

            <el-table-column align="center" label="Student Specs">
              <template slot-scope="scope">
                <el-button size="mini" type="success" v-if="scope.row.ccId==userId||roleId==27"
                           @click="gotoClassSituation(scope.row.classId,scope.row.ruserId,scope.row.id)">查看
                </el-button>
                <span v-else>----------</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="用户详情页">
              <template slot-scope="scope">
                <el-button size="mini" type="success" v-if="scope.row.ccId==userId||roleId==27"
                           @click="gotoUserDetail(scope.row.phone)">查看
                </el-button>
                <span v-else>----------</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <el-dialog title="修改班级类型" :visible.sync="dialogVisible"
                 width="50%" :before-close="handleClose">
        <div>
          <div class="h-40">
            <div class="pull-left width-150">班级类型名称：</div>
            <div class="pull-left" v-if="editClass.classTypeId">
              <el-select v-model="classTypeIdaaa" class="width-200" placeholder="班级类型名称">
                <el-option v-for="item in classTypeList" :key="item.classTypeId" :label="item.name"
                           :value-key="item.name"
                           :value="item.classTypeId"></el-option>
              </el-select>
            </div>
          </div>
          <div class="h-40 mt-10">
            <div class="pull-left width-150">选择上课时间：</div>
            <div class="pull-left">
              <el-select v-model="editClass.classTime" class="width-300" placeholder="请选择">
                <el-option v-for="item in classTimes" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="h-40 mt-10">
            <div class="pull-left width-150">班级开始日期：</div>
            <div class="pull-left">
              <el-date-picker class="width-300" value-format="yyyy-MM-dd" v-model="editClass.startTime" type="date"
                              placeholder="选择日期">
              </el-date-picker>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editClassBtn">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<!--http://localhost:9527/#/aom/classmanage-detail?classId=154&name=进行中的长期班级-->
<script>
  import {
    getOneClass,
    editOneClass,
    getClassTypeItems,
    getStudentsByClassId,
    changeClassType,
    changeClassName,
    classDeleteStudent
  } from '@/api/aom.js';
  import {sfData, sfTools} from '@/views/aom/util.js';
  import PageTitle from '@/views/aom/components/pagetitle.vue';
  import {mapGetters} from 'vuex'

  export default {
    components: {
      'v-pagetitle': PageTitle
    },
    data() {
      return {
        listLoading: false,
        detail: {},
        editClass: {
          classTime: '',
          startTime: '',
        },
        classTypeList: [],
        classTypeId: '',
        classTypeName: '',
        studentsList: [],
        studentsList2: [],
        dialogVisible: false,
        editNameIsShow: false,
        editNameValue: '',
        sttat: '',
        classTypeIdaaa: '',
        options: [
          {value: '选项1', label: '黄金糕'},
          {value: '选项2', label: '双皮奶'},
          {value: '选项3', label: '蚵仔煎'},
          {value: '选项4', label: '龙须面'},
          {value: '选项5', label: '北京烤鸭'}
        ],
        value: '',
        courseName1: '',
      }
    },
    created() {
      this.roleId = this.roleIds[0]
      this.name = this.$route.query.name;
      this.classId = this.$route.query.classId;
      //console.log(this.name, this.classId);
      //this.title = `班级管理 > ${this.name} > 班级详情`;
      this.title = `班级管理 > 班级详情`;
      this._getOneClass();
      this.classTimes = sfData.classTimes;
      this._getClassTypeItems();
      this._getStudentsByClassId();
    },
    methods: {
      //编辑班级名称
      editNameFunc() {
        changeClassName(this.classId, this.editNameValue).then(() => {
          this.editNameIsShow = false;
          this._getOneClass();
        })
      },

      //班级学生列表查询
      async _getStudentsByClassId() {
        this.listLoading = true
        const result = await getStudentsByClassId(this.classId)
        if (result) {
          this.listLoading = false
          let d = result.data;
          this.studentsList = []
          this.studentsList2 = []
          for (let i = 0; i < d.length; i++) {
            if (d[i]['periods'] > 0) {
              this.studentsList.push(d[i]);
            } else if (d[i]['periods'] === 0) {
              this.studentsList2.push(d[i]);
            }
          }
        }

        // getStudentsByClassId(this.classId).then((res) => {
        //
        // })
      },

      //修改班级
      editClassBtn() {
        this.editClass.classId = parseInt(this.editClass.classId);
        var obj = {};
        for (let i in this.editClass) {
          obj[i] = this.editClass[i];
        }
        var cStartTime = (new Date(obj.startTime)).getTime();
        var timeStamp = (new Date(new Date().setHours(0, 0, 0, 0))).getTime();
        if (cStartTime < timeStamp) {
          this.$message({type: 'error', message: '必须选择今日或以后'});
          return false;
        }
        obj.classTypeId = this.classTypeIdaaa;
        if (obj.classTypeId === '') {
          this.$message({type: 'error', message: '请选择班级类型'});
          return false;
        }
        //return;
        changeClassType(obj).then((res) => {
          if (res) {
            this.$message({type: 'success', message: '编辑成功!'});
          }
          this.dialogVisible = false;
          this._getOneClass();
        });
      },

      //获取数据
      _getOneClass() {
        getOneClass(this.classId).then((res) => {
          this.detail = res.data;
          this.editClass.classTime = this.detail.classTime;
          this.editClass.classTypeId = this.detail.classTypeId;
          this.classTypeName = this.detail.classTypeName;
          //this.editClass.startTime = this.detail.startTime.substring(0, 10);
          this.editClass.startTime = sfTools.getDateFromTimestamp(new Date().getTime());
          this.editClass.classId = this.classId;
          this.editNameValue = this.detail.name;
          this.courseName1 = this.detail.courseName

          if (this.detail.status != 0) {
            this.sttat = '已关闭';
          } else {
            if ((new Date(this.detail.endTime)).getTime() < (new Date()).getTime()) {
              this.sttat = '已结束';
            } else {
              this.sttat = '正常';
            }
          }
        })
      },

      //班级移除学生
      async _classDeleteStudent(classId, ruserId, operatorId) {
        const result = await classDeleteStudent(classId, ruserId, operatorId)

        if (result) {
          this.$message({
            message: '恭喜你，移除班级成功',
            type: 'success'
          });
          this._getStudentsByClassId();
        }
      },

      //班级类型
      _getClassTypeItems() {
        getClassTypeItems({status: '0'}).then((res) => {
          this.classTypeList = res.data;
        })
      },

      //跳转“班级更换老师”页面
      classChangeTeacher() {
        this.$router.push({path: '/aom/class-change-teacher', query: {classId: this.classId}});
      },

      //跳转“单个学生更换老师”页面
      singleStudentChangeTeacher(ruserId, refId) {
        this.$router.push({
          path: '/aom/single-student-change-teacher',
          query: {ruserId: ruserId, classId: this.classId, refId: refId}
        });
      },

      //修改班级
      changeClass() {
        alert('修改班级');
      },
      handleClose(done) {
        this.dialogVisible = false;
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
      gotoClassSituation(classId, ruserId, refId) {  //学生上课情况
        this.$router.push({
          path: '/detail/ruserClassInfo',
          query: {name: this.name, classId: classId, ruserId: ruserId, refId: refId}
        });
      },
      gotoCourse() {
        this.$router.push({
          path: '/aom/classmanage-course',
          query: {name: this.courseName1, classId: this.classId}
        });
      },
      gotoUserDetail(phone) {  //用户详情页
        this.$router.push({path: '/detail/user', query: {phone: phone, type: 1}});
      },
      gotoDetail(id) {
        this.$router.push({path: '/aom/classtype-detail', query: {id: id}});
      },
      gotoSituation() {
        this.$router.push({path: '/aom/class-situation', query: {name: this.name, classId: this.classId}});
      },
      classTypeClick() {
        alert('classTypeClick')
      }
    },
    filters: {
      substring10: function (a) {
        if (a) {
          return a.substring(0, 10);
        }
      },
      replaceWeek: function (a) {
        return sfTools.replaceWeekEn(a);
      },
      statFilter: function (a) {
        if (a == '0') {
          return '进行中';
        } else if (a == '1') {
          return '停课';
        } else if (a == '2') {
          return '终止';
        }
      },
      ccNameFilter: function (a) {
        if (a) {
          return a.split('-')[0];
        }
      }
    },
    computed: {
      ...mapGetters(['userId', 'roleIds'])
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss">
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

      .addclass-box {
        height: auto;
        width: 100%;

        .item {
          margin-bottom: 20px;
          padding: 10px 20px;
          border: 1px solid #ebeef5;
          box-sizing: border-box;
        }
      }

      .table {
        width: 100%;
        border: 1px solid #eeeeee;
        border-collapse: collapse;
        font-size: 13px;

        tr {
          border: 1px solid #eeeeee;

          td {
            border: 1px solid #eeeeee;
            width: 25%;

            .span {
              display: inline-block;
              height: 55px;
              line-height: 55px;
            }

            .span:nth-child(1) {
              width: 36%;
              background: #f9fafc;
              text-align: right;
              padding-right: 20px;
            }

            .span:nth-child(2) {
              padding-left: 15px;
            }
          }
        }
      }
    }
  }
</style>
