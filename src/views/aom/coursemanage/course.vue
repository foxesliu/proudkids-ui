<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle title="课程管理"></v-pagetitle>
      <div class="course-container">
        <div class="ul pt-20">
          <div class="li pull-left c-pointer" @click="gotopage('/aom/coursemanage-ing')">
            <div class="div">
              <div class="t-center h-30 font18 t-hidden width100">进行中的课程</div>
              <i class="i font20 t-center h-30">{{ingCount}}个</i>
            </div>
          </div>
          <div class="li pull-left c-pointer" @click="gotopage('/aom/coursemanage-ed')">
            <div class="div">
              <div class="t-center h-30 font18 t-hidden width100">已关闭课程</div>
              <i class="i font20 t-center h-30">{{edCount}}个</i>
            </div>
          </div>
          <!--<li class="pull-left c-pointer" @click="dialogVisible=true">-->
          <!--<div class="t-center mb-10"><i class="el-icon-plus font30 color-orange font-bold"></i></div>-->
          <!--<div class="t-center font18">新增一套课件</div>-->
          <!--</li>-->
        </div>
      </div>
    </div>

    <!--<el-dialog title="增加课程" :visible.sync="dialogVisible" width="40%" @click="dialogVisible=false">-->
    <!--<el-input v-model="addClassName" placeholder="请输入增加课程的名称"></el-input>-->
    <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click="dialogVisible=false">取 消</el-button>-->
    <!--<el-button type="primary" @click="addClassNameBtn">确 定</el-button>-->
    <!--</span>-->
    <!--</el-dialog>-->

  </div>
</template>

<script>
  import PageTitle from '../components/pagetitle.vue';

  import {courseCount} from '@/api/aom.js';

  export default {
    components: {
      'v-pagetitle': PageTitle
    },
    data() {
      return {
        testData: '课程管理',
        ingCount: 0,
        edCount: 0,
        dialogVisible: false,
        addClassName: '',
        array: [
          {}, {}, {}
        ]
      }
    },
    created() {
      //进行中的课程
      courseCount('0').then(res => {
        this.ingCount = res.data;
      });

      //过期的课程
      courseCount('1').then(res => {
        this.edCount = res.data;
      });
    },
    methods: {
      gotopage(url) {
        this.$router.push({path: url});
      },

      //添加课程
      addClassNameBtn() {
        if (!this.addClassName) {
          // this.$message({message: '请填写课程标题', type: 'warning'});
          this.$message.error('请填写课程标题');
        }
        this.dialogVisible = false;
      }
    },
    mounted() {
//      var _this = this;
//      let li = this.$refs.li;
//      li.forEach(function (item, index) {
//        item.addEventListener('mouseover', () => {
//          // _this.$refs.li[index].className = 't';
//        })
//      })
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
    }
  }
</style>
