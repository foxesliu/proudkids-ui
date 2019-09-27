<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle title="评语管理"></v-pagetitle>
      <div class="course-container">
        <el-table :data="list" border style="width: 100%">
          <el-table-column label="中文名">
            <template slot-scope="scope">
              {{scope.row.name | chi}}
            </template>
          </el-table-column>
          <el-table-column label="英文名">
            <template slot-scope="scope">
              {{scope.row.name | eng}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="success"
                         @click="gotoDetail(scope.row.name,scope.row.id)">查看
              </el-button>
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
  import {getEvaluationList, getCourseListByStatus, setCourseStatus, addCourse, editCourse} from '@/api/aom.js';
  import {test} from '../util.js';
  import PageTitle from '../components/pagetitle.vue';

  export default {
    components: {
      'v-pagetitle': PageTitle
    },
    data() {
      return {
        list: [],
        ingCourseList: [],
        dialogVisible: false,
        addClassName: ''
      }
    },
    created() {
      this._getEvaluationList();
    },
    methods: {
      _getEvaluationList() {
        getEvaluationList().then((res) => {
          this.list = res.data;
          console.log(this.list);
        })
      },
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
        }).catch(() => {
          this.$message({type: 'info', message: '已取消删除'});
        });
      },

      //跳转课程下的课节列表页
      gotoDetail(name, id) {
        var n = JSON.parse(name).chiName;
        var e = JSON.parse(name).engName;
        this.$router.push({
          path: '/aom/evaluate-detail',
          query: {name: n, eName: e, id: id}
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
    filters: {
      chi: function (a) {
        if (a) {
          return JSON.parse(a).chiName;
        }
      },
      eng: function (a) {
        if (a) {
          return JSON.parse(a).engName;
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
