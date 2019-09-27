<template>
  <div class="aom-container">
    <div class="">
      <div class="title flex-box">
        <div class="left">
          课程名称：{{111}}
        </div>
        <div class="right" v-if="!from">
          <el-button type="primary" @click="gotoAddPage"><i class="el-icon-plus"></i> 增加一个课节</el-button>
        </div>
      </div>

      <div class="course-container">
        <el-table :data="list" border style="width:100%"  :header-cell-style="{background:'#f9fafc'}">
          <el-table-column prop="name" label="课节名称" align="center">
            <template slot-scope="scope">
              <input class="courseName" type="text" v-model="scope.row.name" @focus="editCourseName(scope.$index)" :disabled="isInput">
              <el-button size="mini" :type="index==scope.$index?'primary':'info'"  :disabled="index==scope.$index?false:true" @click="edit(scope.row)">修改</el-button>
              <!-- <el-button size="mini" type="primary" v-if="isClick">修改</el-button> -->
            </template>
          </el-table-column>
          <el-table-column label="Pre-Class Courseware" align="center">
             <template slot-scope="scope">
              <el-button size="mini" type="warning" @click="gotoEditPage(scope.row.lessonId,scope.row.name,1)" style="width:90px">修改
              </el-button>
            </template>
          </el-table-column>
         
          <el-table-column label="Courseware" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger"  style="width:90px" @click="gotoEditPage(scope.row.lessonId,scope.row.name,0)">修改
              </el-button>
            </template>
          </el-table-column>
           <el-table-column label="预习材料" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="gotoBeforeclass(scope.row)" style="width:90px">进入
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="预习精美文字" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="gotoBeforeclass(scope.row)" style="width:90px">进入
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="作业材料" align="center" v-if="!from">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" 
                @click="gotoAfterclass(scope.row)" style="width:90px">进入
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="作业精美文字" align="center" v-if="!from">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" 
                @click="gotoAfterclass(scope.row)" style="width:90px">进入
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { findByCourseId, findLessonById,editLesson } from "../../../api/aom.js";
import PageTitle from "../components/pagetitle.vue";

export default {
  components: {
    "v-pagetitle": PageTitle
  },
  data() {
    return {
      list: [
          {
              date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }
      ],
      isClick:false,
      inputValue:'',
      index:-1,
      lessonId:'',
      lessonName:'',
      isInput:false,
    };
  },
  created() {
    this.isIng = this.$route.query.isIng;
    this.courseId = this.$route.query.courseId;
    this.courseName = this.$route.query.courseName;
    this.lessonId = this.$route.query.lessonId;
    this.from = this.$route.query.from;
    this.title = "课程管理 > " + this.isIng + " > " + this.courseName;
    if (!!this.lessonId) {
      this._findLessonListByCourseId2();
    } else {
      this._findLessonListByCourseId();
    }
  },
  methods: {
    edit(index){
      this.lessonId = index.lessonId
      this.lessonName =index.name
      this._editLesson()
      console.log(index)
    },
    editCourseName(index) {  //编辑课节名称
      this.index = index;
      // this.isInput=true;
    },
    //编辑Lesson
      _editLesson() {
        var obj = {
          "lessonId": this.lessonId,
          "name": this.lessonName,
        };
        editLesson(this.lessonId, obj).then((res) => {
          this.isInput=false;
          this.index=-1;
          var _this = this;
          if (res.data) {
            this.$message({
              type: 'success',
              message: '更新成功!'
            });
          }
        });
      },
    //获取lesson列表
    _findLessonListByCourseId() {
      findByCourseId(this.courseId).then(res => {
        this.list = res.data;
        console.log(this.list);
        for (var i = 0; i < this.list.length; i++) {
          this.list[i].fileList0 = [];
          this.list[i].fileList1 = [];
          this.list[i].fileList2 = [];
          this.list[i].fileList3 = [];
          for (var k = 0; k < this.list[i]["courseWares"].length; k++) {
            if (this.list[i]["courseWares"][k]["type"] == 0) {
              this.list[i].fileList0.push(this.list[i]["courseWares"][k]);
            } else if (this.list[i]["courseWares"][k]["type"] == 1) {
              this.list[i].fileList1.push(this.list[i]["courseWares"][k]);
            } else if (this.list[i]["courseWares"][k]["type"] == 2) {
              this.list[i].fileList2.push(this.list[i]["courseWares"][k]);
            } else if (this.list[i]["courseWares"][k]["type"] == 3) {
              this.list[i].fileList3.push(this.list[i]["courseWares"][k]);
            }
          }
        }
        console.log(this.list);
      });
    },
    _findLessonListByCourseId2() {
      findLessonById(this.lessonId).then(res => {
        this.list.push(res.data);
        console.log(this.list);
        for (var i = 0; i < this.list.length; i++) {
          this.list[i].fileList0 = [];
          this.list[i].fileList1 = [];
          this.list[i].fileList2 = [];
          this.list[i].fileList3 = [];
          for (var k = 0; k < this.list[i]["courseWares"].length; k++) {
            if (this.list[i]["courseWares"][k]["type"] == 0) {
              this.list[i].fileList0.push(this.list[i]["courseWares"][k]);
            } else if (this.list[i]["courseWares"][k]["type"] == 1) {
              this.list[i].fileList1.push(this.list[i]["courseWares"][k]);
            } else if (this.list[i]["courseWares"][k]["type"] == 2) {
              this.list[i].fileList2.push(this.list[i]["courseWares"][k]);
            } else if (this.list[i]["courseWares"][k]["type"] == 3) {
              this.list[i].fileList3.push(this.list[i]["courseWares"][k]);
            }
          }
        }
        console.log(this.list);
      });
    },

    //点击修改
    gotoEditPage(lessonId, lessonName,type) {
      this.$router.push({
        path: "/aom/coursemanage-editlesson",
        query: {
          isIng: this.isIng,
          courseId: this.courseId,
          courseName: this.courseName,
          lessonId: lessonId,
          lessonName: lessonName,
          type:type,
        }
      });
    },

    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleDelete() {
      console.log(123);
    },

    gotoAddPage() {
      this.$router.push({
        path: "/aom/coursemanage-addlesson",
        query: {
          courseId: this.courseId,
          isIng: this.isIng,
          courseName: this.courseName
        }
      });
    },

    gotoBeforeclass(row) {
      console.log(row);
      this.$router.push({
        path: "/aom/coursemanage-beforeclass",
        query: { courseId: row.courseId, lessonId: row.lessonId }
      });
    },

    gotoAfterclass(row) {
      console.log(row);
      this.$router.push({
        path: "/aom/coursemanage-afterclass",
        query: { courseId: row.courseId, lessonId: row.lessonId }
      });
    }
  },
  mounted() {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../index.scss";

.aom-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: white;
    padding: 10px 15px;

    .title {
        justify-content: space-between;
        align-items: center;
        .left{
            font-size: 20px;
            color: #666666;
            margin: 20px 0;
        }


    }
    .course-container {
      span {
        display: block;
      }
      .el-table .warning-row {
        background: oldlace;
      }
      .el-table .success-row {
        background: #f0f9eb;

      }
    }
  
}
.courseName{
    display:inline-block;
    width:120px;
    line-height:28px;
    border:solid 1px #dcdfe6;
    border-radius: 4px;
    text-align: center;
    outline: none;
    color: #606266;
}
</style>
