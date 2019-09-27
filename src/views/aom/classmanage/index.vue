<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle title="常规课班级管理"></v-pagetitle>
      <div class="course-container222">
        <div class="ul pt-20">
          <div class="li pull-left c-pointer"
               @click="gotopage('/aom/classmanage-list','进行中的长期班级',0,0,1)">
            <div class="div">
              <div class="t-center font18 lh-20 width100"><span>进行中的长期班级</span></div>
              <div class="i font20 t-center">{{count1}}个</div>
            </div>
          </div>
          <div class="li pull-left c-pointer"
               @click="gotopage('/aom/classmanage-list','结束的长期班级',1,0,1)">
            <div class="div">
              <div class="t-center font18 lh-20 width100"><span>结束的长期班级</span></div>
              <div class="i font20 t-center">{{count2}}个</div>
            </div>
          </div>
          <div class="li pull-left c-pointer"
               @click="gotopage('/aom/classmanage-list','关闭的长期班级',null,1,1)">
            <div class="div">
              <div class="t-center font18 lh-20 width100"><span>关闭的长期班级</span></div>
              <div class="i font20 t-center">{{count3}}个</div>
            </div>
          </div>
          <div class="li pull-left c-pointer"
               @click="gotopage('/aom/classmanage-list','进行中的短期班级',0,0,2)">
            <div class="div">
              <div class="t-center font18 lh-20 width100"><span>进行中的短期班级</span></div>
              <div class="i font20 t-center">{{count4}}个</div>
            </div>
          </div>
          <div class="li pull-left c-pointer"
               @click="gotopage('/aom/classmanage-list','结束的短期班级',1,0,2)">
            <div class="div">
              <div class="t-center font18 lh-20 width100"><span>结束的短期班级</span></div>
              <div class="i font20 t-center">{{count5}}个</div>
            </div>
          </div>
          <div class="pull-left c-pointer li"
               @click="gotopage('/aom/classmanage-list','关闭的短期班级',null,1,2)">
            <div class="div">
              <div class="t-center font18 lh-20 width100"><span>关闭的短期班级</span></div>
              <div class="i font20 t-center">{{count6}}个</div>
            </div>
          </div>
          <div class="pull-left c-pointer li"
               @click="gotopage('/aom/classmanage-list','进行中的体验课班级',0,0,3)">
            <div class="div">
              <div class="t-center font18 lh-20 width100"><span>进行中的体验课班级</span></div>
              <div class="i font20 t-center">{{count7}}个</div>
            </div>
          </div>
          <div class="pull-left c-pointer li"
               @click="gotopage('/aom/classmanage-list','结束的体验课班级',1,0,3)">
            <div class="div">
              <div class="t-center font18 lh-20 width100"><span>结束的体验课班级</span></div>
              <div class="i font20 t-center">{{count8}}个</div>
            </div>
          </div>
          <div class="pull-left c-pointer li"
               @click="gotopage('/aom/classmanage-list','关闭的体验课班级',null,1,3)">
            <div class="div">
              <div class="t-center font18 lh-20 width100"><span>关闭的体验课班级</span></div>
              <div class="i font20 t-center">{{count9}}个</div>
            </div>
          </div>


          <div class="pull-left c-pointer li"
               @click="gotopage('/aom/classmanage-list','进行中的线下班级',0,0,4)">
            <div class="div">
              <div class="t-center font18 lh-20 width100"><span>进行中的线下班级</span></div>
              <div class="i font20 t-center">{{count10}}个</div>
            </div>
          </div>
          <div class="pull-left c-pointer li"
               @click="gotopage('/aom/classmanage-list','结束的线下班级',1,0,4)">
            <div class="div">
              <div class="t-center font18 lh-20 width100"><span>进行中的线下班级</span></div>
              <div class="i font20 t-center">{{count11}}个</div>
            </div>
          </div>
          <div class="pull-left c-pointer li"
               @click="gotopage('/aom/classmanage-list','关闭的线下班级',null,1,4)">
            <div class="div">
              <div class="t-center font18 lh-20 width100"><span>进行中的线下班级</span></div>
              <div class="i font20 t-center">{{count12}}个</div>
            </div>
          </div>


          <div class="add pull-left c-pointer" @click="gotopage('/aom/classmanage-add')">
            <div class="div">
              <div class="span pull-left">
                <i class="el-icon-plus font30 font-bold"></i>
              </div>
              <div class="p pull-left">新增班级</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getClassesCount} from '../../../api/aom.js';
  import PageTitle from '../components/pagetitle.vue';

  export default {
    components: {
      'v-pagetitle': PageTitle
    },
    data() {
      return {
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0,
        count6: 0,
        count7: 0,
        count8: 0,
        count9: 0,
        count10: 0,
        count11: 0,
        count12: 0,
        testData: '课程管理',
        dialogVisible: false,
        addClassName: '',
        array: [
          {}, {}, {}
        ]
      }
    },
    created() {
      this._getClassesCount();
    },
    methods: {
      _getClassesCount() {
        //stage => 班级级别 0：未过期 1：已过期
        //status => 班级状态 0：未关闭 1:已关闭
        //type => 班级类型 1：长期 2：短期 4：线下课
        getClassesCount({stage: 0, status: 0, type: 1}).then((res) => {  //进行中的长期
          this.count1 = res.data;
        });
        getClassesCount({stage: 1, status: 0, type: 1}).then((res) => {  //已结束的长期
          this.count2 = res.data;
        });
        getClassesCount({stage: null, status: 1, type: 1}).then((res) => {  //已关闭的长期
          this.count3 = res.data;
        });
        getClassesCount({stage: 0, status: 0, type: 2}).then((res) => {  //进行中的短期
          this.count4 = res.data;
        });
        getClassesCount({stage: 1, status: 0, type: 2}).then((res) => {  //已结束的短期
          this.count5 = res.data;
        });
        getClassesCount({stage: null, status: 1, type: 2}).then((res) => {  //已关闭的短期
          this.count6 = res.data;
        });
        getClassesCount({stage: 0, status: 0, type: 3}).then((res) => {
          this.count7 = res.data;
        });
        getClassesCount({stage: 1, status: 0, type: 3}).then((res) => {
          this.count8 = res.data;
        });
        getClassesCount({stage: null, status: 1, type: 3}).then((res) => {
          this.count9 = res.data;
        });

        getClassesCount({stage: 0, status: 0, type: 4}).then((res) => {
          this.count10= res.data;
        });
        getClassesCount({stage: 1, status: 0, type: 4}).then((res) => {
          this.count11 = res.data;
        });
        getClassesCount({stage: null, status: 1, type: 4}).then((res) => {
          this.count12 = res.data;
        });

      },
      gotopage(url, name, stage, status, type) {
        this.$router.push({path: url, query: {name: name, stage: stage, status: status, type: type}});
      }
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
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

  .course-container222 {
    .li {
      width: 33%;
      height: 90px;
      margin-bottom: 20px;
      &:nth-child(3n+1), &:nth-child(3n+2) {
        padding-right: 20px;
        span {
          &:before {
            background: #68c643;
          }
        }
      }
      &:nth-child(3n+2) {
        span {
          &:before {
            background: #fd805b;
          }
        }
      }
      &:nth-child(3n) {
        padding-right: 0;
        span {
          &:before {
            background: #b4b6b7;
          }
        }
      }
      .div {
        width: 100%;
        height: 90px;
        border-radius: 10px;
        background: white;
        border: 1px solid #ddd;
        & > div:nth-child(1) {
          background: #f6f7fb;
          height: 45px;
          line-height: 45px;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          span {
            display: inline-block;
            position: relative;
            &:before {
              width: 10px;
              height: 10px;
              display: inline-block;
              content: '';
              position: absolute;
              left: -15px;
              top: 18px;
              border-radius: 50%;
            }
          }
        }
        & > div:nth-child(2) {
          height: 45px;
          line-height: 45px;
        }
        &:hover {
          box-shadow: 0 0 10px #666;
        }
        .i {
          font-style: normal;
          width: 100%;
          display: block;
        }
      }
    }
    .add {
      width: 33%;
      padding-right: 20px;
      .div {
        width: 100%;
        height: 80px;
        border-radius: 10px;
        background: white;
        border: 1px solid #ddd;

        .span {
          width: 50px;
          text-align: center;
          height: 50px;
          line-height: 50px;
          margin: 15px 0 0 20px;
          background: #449cfd;
          color: white;
          border-radius: 5px;
          i {
            height: 50px;
            line-height: 50px;
          }
        }
        .p {
          height: 50px;
          line-height: 50px;
          margin: 15px 0 0 10px;
        }
      }
    }
  }
</style>
