<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle title="班级类型设置"></v-pagetitle>
      <div class="course-container">
        <div class="ul pt-20">
          <div class="li pull-left c-pointer" @click="gotopage('/aom/classtype-list','进行的长期班级类型',0,1)">
            <div class="div">
              <div class="t-center font18 lh-20 width100">进行的长期班级类型</div>
              <div class="i font20 t-center mt-10">{{ingLong}}个</div>
            </div>
          </div>
          <div class="li pull-left c-pointer" @click="gotopage('/aom/classtype-list','过期的长期班级类型',1,1)">
            <div class="div">
              <div class="t-center font18 lh-20 width100">过期的长期班级类型</div>
              <div class="i font20 t-center mt-10">{{edLong}}个</div>
            </div>
          </div>
          <div class="li pull-left c-pointer" @click="gotopage('/aom/classtype-list','进行的短期班级类型',0,2)">
            <div class="div">
              <div class="t-center font18 lh-20 width100">进行的短期班级类型</div>
              <div class="i font20 t-center mt-10">{{ingShort}}个</div>
            </div>
          </div>
          <div class="li pull-left c-pointer" @click="gotopage('/aom/classtype-list','过期的短期班级类型',1,2)">
            <div class="div">
              <div class="t-center font18 lh-20 width100">过期的短期班级类型</div>
              <div class="i font20 t-center mt-10">{{edShort}}个</div>
            </div>
          </div>
          <!--进行中的体验课-->
          <div class="li pull-left c-pointer" @click="gotopage('/aom/classtype-list','进行的体验课班级',0,3)">
            <div class="div">
              <div class="t-center font18 lh-20 width100">进行的体验课班级</div>
              <div class="i font20 t-center mt-10">{{experiencing}}个</div>
            </div>
          </div>
          <!--过期的体验课-->
          <div class="li pull-left c-pointer" @click="gotopage('/aom/classtype-list','过期的体验课班级',1,3)">
            <div class="div">
              <div class="t-center font18 lh-20 width100">过期的体验课班级</div>
              <div class="i font20 t-center mt-10">{{experienced}}个</div>
            </div>
          </div>


          <div class="li pull-left c-pointer" @click="gotopage('/aom/classtype-list','进行的体验课班级',0,4)">
            <div class="div">
              <div class="t-center font18 lh-20 width100">进行中的线下班级类型</div>
              <div class="i font20 t-center mt-10">{{b1}}个</div>
            </div>
          </div>

          <div class="li pull-left c-pointer" @click="gotopage('/aom/classtype-list','过期的体验课班级',1,4)">
            <div class="div">
              <div class="t-center font18 lh-20 width100">过期的线下班级类型</div>
              <div class="i font20 t-center mt-10">{{b2}}个</div>
            </div>
          </div>


          <div class="add pull-left c-pointer" @click="add('/aom/classmanage-add')">
            <div class="div">
              <div class="span pull-left">
                <i class="el-icon-plus font30 font-bold"></i>
              </div>
              <div class="p pull-left">新增班级类型</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getClassTypeCountByStatusType} from '../../../api/aom.js';
  import PageTitle from '../components/pagetitle.vue';

  export default {
    components: {
      'v-pagetitle': PageTitle
    },
    data() {
      return {
        ingLong: 0,
        ingShort: 0,
        edLong: 0,
        edShort: 0,
        experiencing: 0,
        experienced: 0,
        b1: 0,
        b2: 0
      }
    },
    created() {
      this._getClassTypeCountByStatusType();
    },
    methods: {
      //根据查询参数对班级类型进行检索
      _getClassTypeCountByStatusType() {
        getClassTypeCountByStatusType(0, 1).then((res) => {
          //status班级类型过期状态 0：未过期 1：已过期
          //type班级类型长短期 1：长期 2：短期 4：线下课
          this.ingLong = res.data;
        });
        getClassTypeCountByStatusType(1, 1).then((res) => {
          this.edLong = res.data;
        });
        getClassTypeCountByStatusType(0, 2).then((res) => {
          this.ingShort = res.data;
        });
        getClassTypeCountByStatusType(1, 2).then((res) => {
          this.edShort = res.data;
        });

        getClassTypeCountByStatusType(0, 3).then((res) => {
          this.experiencing = res.data;
        });
        getClassTypeCountByStatusType(1, 3).then((res) => {
          this.experienced = res.data;
        });
        getClassTypeCountByStatusType(0, 4).then((res) => {
          this.b1 = res.data;
        });
        getClassTypeCountByStatusType(1, 4).then((res) => {
          this.b2 = res.data;
        });

      },

      //页面跳转
      gotopage(url, name, status, type) {
        this.$router.push({
          path: url,
          query: {name: name, status: status, type: type}
        });
      },
      add() {
        this.$router.push({
          path: '/aom/classtype-add'
        });
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
  }

  .add {
    width: 50%;
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
