<template>
  <div class="aom-container">
    <div class="p-20">
      <div class="h-30 ">
        <div class="pull-left font25">内容管理</div>
        <div class="pull-right">
          <el-button type="danger" @click="_generate()" class="width-100">一键生成</el-button>
          <el-button type="primary" @click="add()" class="width-100"><i class="el-icon-plus"></i> 增加</el-button>
        </div>
      </div>
      <div class="h-30 mt-15">
        <div class="pull-left">
          <el-date-picker v-model="obj.date" type="daterange" value-format="yyyy-MM-dd"
                          range-separator="-" start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
          <el-select v-model="obj.arctypeId" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id"
                       :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="pull-right">
          <el-button @click="reset()" class="width-100">重置</el-button>
          <el-button class="width-100" type="success" @click="getData()">查询</el-button>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="mt-20">
        <el-table :data="list" border style="width: 100%">
          <el-table-column label="ID" prop="id" align="center"></el-table-column>
          <el-table-column label="名称" align="center">
            <template slot-scope="scope">
              <a :href="scope.row.path" target="_blank">{{scope.row.title}}</a>
            </template>
          </el-table-column>
          <el-table-column label="缩略图" align="center">
            <template slot-scope="scope">
              <a :href="scope.row.path" target="_blank"><img :src="scope.row.thumbnail" style="max-height:50px;"/></a>
            </template>
          </el-table-column>
          <el-table-column prop="arctypeName" label="所属频道" align="center"></el-table-column>
          <el-table-column prop="flagIds" label="标识属性" align="center">
            <template slot-scope="scope">
              <!--<el-button size="mini" class="mr-10" v-for="c in scope.row.flagNames">{{c}}</el-button>-->
              <span v-for="c in scope.row.flagNames">{{c}}、</span>
            </template>
          </el-table-column>
          <el-table-column prop="keywords" label="关键词" align="center"></el-table-column>
          <el-table-column prop="author" label="发布者" align="center"></el-table-column>
          <el-table-column prop="views" label="浏览数" align="center"></el-table-column>
          <el-table-column prop="createTime" label="发布时间" align="center"></el-table-column>

          <el-table-column label="修改" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="edit(scope.row.id)" size="mini">修改</el-button>
            </template>
          </el-table-column>
          <el-table-column label="移除" align="center">
            <template slot-scope="scope">
              <el-button type="danger" @click="del(scope.row.id)" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="mt-10">
        <el-pagination background
                       layout="prev,pager,next,sizes"
                       :page-size="obj.rows"
                       :page-sizes="[10,20,30,50]"
                       :current-page.sync="obj.page"
                       :total="total"
                       @size-change="handleSizeChange"
                       @current-change="currentChange">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {getCmsArticle, delOneCmsArticle, generate, getCmsCate} from '../../../api/aom.js';
  export default {
    components: {},
    data() {
      return {
        obj: {
          date: '',
          arctypeId: '',
          page: 1,
          rows: 10
        },
        options: [
          {value: '选项1', label: '黄金糕'},
          {value: '选项2', label: '双皮奶'},
          {value: '选项3', label: '蚵仔煎'},
          {value: '选项4', label: '龙须面'},
          {value: '选项5', label: '北京烤鸭'}
        ],
        list: [],
        total: 0
      }
    },
    created() {
      getCmsCate().then((res) => {
        this.options = res.data;
      });
      this.getData();
    },
    methods: {
      _generate(){
        generate().then((res) => {
          if (res.data.code === 0) {
            this.$message({type: 'success', message: '生成成功!'});
          }
        })
      },
      search(){
        console.log(this.obj)
      },
      reset(){
        this.obj.date = '';
        this.obj.arctypeId = '';
        this.getData();
      },
      add(){
        this.$router.push({path: '/cms/article-add'});
      },
      edit(id){
        this.$router.push({path: '/cms/article-edit', query: {id: id}});
      },
      editDialogToShow(){
        this.editDialogShow = true;
      },
      del(id){
        this.$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delOneCmsArticle(id).then((res) => {
            if (res.data) {
              this.$message({type: 'success', message: '删除成功!'});
              this.getData();
            }
          })
        }).catch(() => {
          this.$message({type: 'info', message: '已取消删除'});
        });
      },
      getData(){
        if (this.obj.date.length) {
          this.obj.creatTimeGe = this.obj.date[0];
          this.obj.creatTimeLe = this.obj.date[1];
        } else {
          this.obj.creatTimeGe = '';
          this.obj.creatTimeLe = '';
        }
        console.log(this.obj)
        getCmsArticle(this.obj).then((res) => {
          this.list = res.data.records;
          this.total = res.data.total;
          console.log(this.list);
        })
      },
      currentChange(val) {
        this.list = [];
        this.obj.page = val;
        console.log(this.obj);
        this.getData();
      },
      handleSizeChange(e){
        this.obj.rows = e;
        console.log(this.obj);
        this.getData();
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
</style>
