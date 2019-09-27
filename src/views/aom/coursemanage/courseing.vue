<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle title="课程管理 > 进行中的课程"></v-pagetitle>
      <div class="title mt-20 o-hidden">
        <div class="pull-right">
          <el-button type="primary" @click="dialogVisible=true"><i class="el-icon-plus"></i> 新增一个课程</el-button>
        </div>
      </div>
      <div class="course-container">
        <el-table :data="ingCourseList" border style="width: 100%">
          <el-table-column prop="name" label="课程"></el-table-column>
          <el-table-column label="课节数">
            <template slot-scope="scope">
              {{scope.row.lessonNum}}节
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              {{scope.row.status == '0' ? '进行中' : '已过期'}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="success"
                         @click="gotoDetail('进行中的课程',scope.row.courseId,scope.row.name)">查看
              </el-button>
              <el-button size="mini" type="danger" @click="_editCourse(scope.row.courseId)">关闭</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog title="增加课程" :visible.sync="dialogVisible" width="40%" @click="dialogVisible=false">
      <el-input v-model="addClassName" placeholder="请输入增加课程的名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="_addCourse">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getCourseListByStatus, setCourseStatus, addCourse, editCourse} from '@/api/aom.js';
  import {test} from '../util.js';
  import PageTitle from '../components/pagetitle.vue';

  export default {
    components: {
      'v-pagetitle': PageTitle
    },
    data() {
      return {
        ingCourseList: [],
        dialogVisible: false,
        addClassName: ''
      }
    },
    created() {
      this._getCourseListByStatus();
    },
    methods: {
      //新增课程
      _addCourse() {
        addCourse({name: this.addClassName}).then((res) => {
          this._getCourseListByStatus();
          this.dialogVisible = false;
          this.addClassName = '';
        })
      },

      //关闭课程
      _editCourse(courseId) {
        this.$confirm('确定要关闭吗?', '提示',
          {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
        ).then(() => {
          editCourse({courseId: courseId, status: 1}).then((res) => {
            this.$message({type: 'success', message: '课程关闭成功!'});
            this._getCourseListByStatus();
          });
        });
      },

      //获取课程列表
      _getCourseListByStatus() {
        getCourseListByStatus('0').then(res => {
          console.log(res);
          this.ingCourseList = res.data;
          console.log(this.ingCourseList);
        });
      },

      //跳转课程下的课节列表页
      gotoDetail(isIng, courseId, courseName) {
        this.$router.push({
          path: '/aom/coursemanage-lessonlist',
          query: {isIng: isIng, courseId: courseId, courseName: courseName}
        });
      },

      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
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
      .course-container {
        span {
          display: block;
        }
        padding-top: 20px;
        .el-table .warning-row {
          background: oldlace;
        }
        .el-table .success-row {
          background: #f0f9eb;
        }
      }
    }
  }
</style>
