<template>
  <div class="aom-container">
    <div class="p-20">
      <div class="h-30 font25">新增内容</div>
      <div class="mt-15">
        <table class="width100 cms-table mb-20">
          <tbody>
          <tr>
            <td class="width-200">标题</td>
            <td>
              <el-input v-model="obj.title" class="width-500" placeholder="请输入标题"/>
            </td>
          </tr>
          <tr>
            <td class="width-200">所属频道</td>
            <td>
              <el-select class="width-500" v-model="obj.arctypeId" placeholder="请选择">
                <el-option v-for="item in options" :key="item.id"
                           :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="width-200">标签</td>
            <td>
              <el-input v-model="obj.tag" class="width-500" placeholder="请输入标签"/>
            </td>
          </tr>
          <tr>
            <td class="width-200">发布者</td>
            <td>
              <el-input v-model="obj.author" class="width-500" placeholder="请输入"/>
            </td>
          </tr>
          <tr>
            <td class="width-200">关键字</td>
            <td>
              <el-input v-model="obj.keywords" class="width-500" placeholder="请输入"/>
            </td>
          </tr>
          <tr>
            <td class="width-200">缩略图</td>
            <td>
              <div class="upimg-box" v-if="!obj.thumbnail">
                <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                <input type="file" ref="uploadImg" class="file" @change="uploadImg()"/>
              </div>
              <div class="showimg-box mt-10 mb-10" v-if="obj.thumbnail">
                <img :src="obj.thumbnail">
                <i class="el-icon-delete" @click="obj.thumbnail=''"></i>
              </div>
            </td>
          </tr>
          <tr>
            <td class="width-200">摘要</td>
            <td>
              <el-input v-model="obj.abstracts" type="textarea" class="mt-10 mb-10 width-500"
                        :rows=4 placeholder="请输入标签"></el-input>
            </td>
          </tr>
          <tr>
            <td class="width-200">初始浏览人数</td>
            <td>
              <el-input v-model="obj.views" class="width-500" placeholder="请输入标签"/>
            </td>
          </tr>

          <tr>
            <td class="width-200">序号</td>
            <td>
              <el-input v-model="obj.rank" class="width-500" placeholder="请输入标签"/>
            </td>
          </tr>
          <tr>
            <td class="width-200">标识属性</td>
            <td>
              <div class="pt-5 pb-5">
                <template v-for="(item,index) in flags">
                  <el-checkbox v-model="flags[index]['isSelect']">{{item.name}}</el-checkbox>
                </template>
              </div>
            </td>
          </tr>
          <tr>
            <td class="width-200">内容</td>
            <td>
              <div ref="editor" class="mt-10 mb-10"></div>
            </td>
          </tr>

          <tr>
            <td class="width-200">&nbsp;</td>
            <td>
              <el-button type="success" @click="add" class="width-200">提交</el-button>
            </td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import E from 'wangeditor';
  import {addCmsArticle, uploadLessonPreview, getCmsCate, getCmsFlag} from '../../../api/aom.js';

  export default {
    components: {},
    data() {
      return {
        obj: {
          title: '',
          tag: '',
          author: '',
          keywords: '',
          thumbnail: '',
          abstracts: '',
          views: 0,
          arctypeId: '',
          rank: 0,
          date: ''
        },
        options: [],
        flags: [],
        list: [],
        editorContent: ''
      }
    },
    created() {
      getCmsCate().then((res) => {
        this.options = res.data;
      });
      getCmsFlag().then((res) => {
        this.flags = res.data;
      })
    },
    mounted() {
      var editor = new E(this.$refs.editor);
      editor.customConfig.onchange = (html) => {
        this.editorContent = html;
      };
      //editor.customConfig.menus = ['bold', 'underline', 'justify'];
      editor.create();
    },
    methods: {
      uploadImg(){
        let formData = new FormData();
        formData.append('file', this.$refs.uploadImg.files[0]);
        console.log(formData);
        uploadLessonPreview(formData).then((res) => {
          this.obj.thumbnail = 'http://files.proudkids.cn' + res.data.data.fileUrl;
        });
      },
      add(){
        this.obj.flagIds = [];
        for (let i = 0; i < this.flags.length; i++) {
          if (this.flags[i].isSelect) {
            this.obj.flagIds.push(this.flags[i]['id'])
          }
        }
        this.obj.flagIds = this.obj.flagIds.join(',');
        this.obj.content = this.editorContent;
        console.log(this.obj);
        if (!this.obj.title || !this.obj.keywords || !this.obj.thumbnail || !this.obj.abstracts || !this.obj.arctypeId || !this.obj.content) {
          this.$message({type: 'info', message: '请填写完整'});
          return false;
        }
        //return;
        addCmsArticle(this.obj).then((res) => {
          if (res.data.data) {
            this.$message({type: 'success', message: '增加成功!'});
            this.$router.push({path: '/cms/article'});
          }
        });
      },
      getData(){
        this.list = [];
      }
    },
    filters: {}
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
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
    }
  }

  .cms-table {
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #e5e5e5;
    border-right: none;
    border-bottom: none;
    border-radius: 5px;
    tr {
      td {
        height: 60px;
        padding: 0 10px;
        border: 1px solid #e5e5e5;
        border-top: none;
        border-left: none;
        text-align: left;
        vertical-align: middle;
      }
    }
    .upimg-box {
      position: relative;
      .file {
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
      }
    }
    .showimg-box {
      position: relative;
      width: 100px;
      height: 100px;
      img {
        width: 100px;
        height: 100px;
      }
      .el-icon-delete {
        position: absolute;
        right: 5px;
        top: 5px;
        cursor: pointer;
      }
    }
  }
</style>
