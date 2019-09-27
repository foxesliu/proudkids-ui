<template>
  <div class="aom-container">
    <div class="p-20">
      <div class="addclass-box">
        <div class="topcourseName">
          课节名称：<span>{{lessonName}}</span>         
        </div>
        <div class="main-coneten">
          <div class="flex-box btn-box">
            <p>本节课件：</p>
            <div class="flex-box">
              <el-upload
                v-if="type==0"
                class="upload-demo"
                action="/zuul/aom/lesson/courseware/upload"
                :show-file-list="false"
                :data="{lessonId:lessonId,type:0}"
                :on-preview="handlePreview"
                :headers="{'Authorization':'Bearer '+token}"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="_getLessonById"
                :limit="10"
                :on-exceed="handleExceed"
                :file-list="fileList">
                 <el-button size="mini" type="danger" style="width:90px">上传</el-button>
              </el-upload>
              <el-upload
                v-if="type==1"
                class="upload-demo"
                action="/zuul/aom/lesson/courseware/bathUpload"
                :show-file-list="false"
                :data="{lessonId:lessonId,type:1}"
                :on-preview="handlePreview"
                :headers="{'Authorization':'Bearer '+token}"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="_getLessonById"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                 <el-button size="mini" type="primary" style="width:90px">上传</el-button>
              </el-upload>
              <a
              :href="'/aom/lesson/downloadZip/'+lessonId+'?type='+type"
              target="_blank" >
                  <el-button size="mini" type="success" style="width:90px;margin-left:10px">下载</el-button>
              </a>  
              
            </div>
          </div>
          <div>
            <el-table
              :data="list"
              border
              style="width:100%"
              :header-cell-style="{background:'#f9fafc'}"
            >
              <el-table-column prop="uid" label="上传时间" align="center">
                <template slot-scope="scope">
                  {{scope.row.createTime}}
                </template>
              </el-table-column>
              <el-table-column label="课件名称" align="center" prop="name">
            
              </el-table-column>

              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" style="width:90px" @click="handleChange(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getLessonById,
  coursewareUpload,
  editLesson,
  courseDelete,
  getLessonByIdType
} from "../../../api/aom.js";
import {parseTime} from '@/utils/index';
import PageTitle from "../components/pagetitle.vue";
import {getToken} from '@/utils/auth'
export default {
  components: {
    "v-pagetitle": PageTitle
  },
  data() {
    return {

      info: {},
      keywords: "",
      keySentences: "",
      objective: "",
      list:[],
      updateTime:'',
      type:'',
      fileList:[],
      token:'',
    };
  },
  computed: {},
  created() {
    this.isIng = this.$route.query.isIng;
    this.type = this.$route.query.type
    this.courseName = this.$route.query.courseName;
    this.courseId = this.$route.query.courseId;
    this.lessonName = this.$route.query.lessonName;
    this.lessonId = this.$route.query.lessonId;
    this.token = getToken();
    console.log(this.type);
    console.log(this.lessonId);
    
    this._getLessonById();
  },
  methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
    //根据LessonID获取lesson信息
    _getLessonById() {
      getLessonByIdType(this.lessonId,this.type).then(res => {
        
        console.log(res.data);
        this.list = res.data
      });
    },

    //编辑Lesson
    _editLesson() {
      var obj = {
        lessonId: this.lessonId,
        keySentences: this.info.keySentences,
        keywords: this.info.keywords,
        name: this.lessonName,
        objective: this.info.objective
      };
      editLesson(this.lessonId, obj).then(res => {
        var _this = this;
        if (res.data) {
          this.$message({
            type: "success",
            message: "更新成功!",
          });
        }
      });
    },

    //课件删除
    handleChange(id) {
      courseDelete(id).then(res => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this._getLessonById();
      });
    },

    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    }
  },
  mounted() {},
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../index.scss";

.aom-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: white;
  .p-20 {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .title {
      height: 40px;
      line-height: 40px;
      overflow: hidden;
    }
    .addclass-box {
      height: auto;
      width: 100%;
      padding: 20px 0;
      .item {
        margin-bottom: 20px;
        background: #fbfbfb;
        padding: 20px;
        border-radius: 10px;
        &.item-flex {
          display: flex;
          .left {
            width: 100px;
          }
          .right {
            flex: 1;
          }
        }
      }
    }
  }
}
.topcourseName{
	height: 78px;
	background-color: #f9fafc;
	border-radius: 4px;
	border: solid 1px #ebeef5;
  line-height: 78px;
  padding-left: 24px;
  color: #616161;
  font-size: 16px;
  span{
    display: inline-block;
    width: 192px;
    height: 40px;
    background-color: #f9fafc;
    border-radius: 4px;
    border: solid 1px #dcdfe6;
    line-height: 40px;
    text-align: center;
    color: #616161;
  }
}
.main-coneten{
  margin-top: 20px;
  .btn-box{
    align-items: center;
    justify-content: space-between;
  }
}

</style>
