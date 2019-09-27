<template>
  <div class="aom-container">
    <div class="p-20">
      <div>
        <v-pagetitle title="申请假期"></v-pagetitle>
      </div>
      <div class="holiday-list">
        <div class="ul">
          <div class="li">
            <div class="left h-60">待处理</div>
            <div class="right h-60 text-underline c-pointer"
                 @click="gotopage('待处理',0,undefined)">{{count1}}条
            </div>
          </div>
          <div class="li">
            <div class="left h-60">未过期</div>
            <div class="right h-60 text-underline c-pointer"
                 @click="gotopage('未过期',1,0)">{{count2}}条
            </div>
          </div>
          <div class="li">
            <div class="left h-60">已结束</div>
            <div class="right h-60 text-underline c-pointer"
                 @click="gotopage('已结束',1,1)">{{count3}}条
            </div>
          </div>
          <div class="li">
            <div class="left h-60">已拒绝</div>
            <div class="right h-60 text-underline c-pointer"
                 @click="gotopage('已拒绝',2,undefined)">{{count4}}条
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getTutorApplyHistoryCount} from '../../../api/aom.js';
  import PageTitle from '../components/pagetitle.vue';

  export default {
    data() {
      return {
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0
      }
    },
    created() {
      this._getTutorApplyHistoryCount();
    },
    methods: {
      _getTutorApplyHistoryCount(){
        getTutorApplyHistoryCount({stat: 0}).then((res) => {
          this.count1 = res.data;
        });
        getTutorApplyHistoryCount({stat: 1, isExpire: 0}).then((res) => {
          this.count2 = res.data;
        });
        getTutorApplyHistoryCount({stat: 1, isExpire: 1}).then((res) => {
          this.count3 = res.data;
        });
        getTutorApplyHistoryCount({stat: 2}).then((res) => {
          this.count4 = res.data;
        });
      },
      gotopage(a, b, c){
        this.$router.push({path: '/aom/holiday-list', query: {name: a, stat: b, isExpire: c}});
      }
    },
    components: {
      'v-pagetitle': PageTitle
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
      .holiday-list {
        .li {
          width: 100%;
          display: flex;
          border-bottom: 1px solid #ccc;
          .left {
            width: 200px;
            text-indent: 20px;
          }
          .right {
            flex: 1;
          }
        }
      }
    }
  }
</style>
