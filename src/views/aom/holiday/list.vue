<template>
  <div class="aom-container">
    <div class="p-20">
      <div class="mb-10">
        <v-pagetitle :title="title"></v-pagetitle>
      </div>
      <div class="sf-holiday-list o-hidden">
        <div class="li border-bottom o-hidden pb-10 mb-10" v-for="item in list">
          <div class="pull-left width80">
            <div class="h-30 o-hidden">申请时间：{{item.createTime}}</div>
            <div class="h-30 o-hidden">申请人：{{item.applyer}}</div>
            <div class="o-hidden" style="line-height:20px; padding: 5px 0;" v-if="item.timeSlot">
              <span>请假时间：</span>
              <span v-for="t in item.timeSlot">
                {{t[0]}} <b style="font-weight: normal;" v-for="c in t[1]">{{c}} </b><br/>
              </span>
            </div>
            <div class="h-30 o-hidden">处理状态：{{item.stat | statFilter}}</div>
            <div class="h-30 o-hidden" v-if="item.approver">处理人：{{item.approver}}</div>
          </div>
          <div class="pull-right width15 t-right pt-30">
            <el-button type="success" size="mini" class="width100" v-if="stat=='0'"
                       @click="dispose(item.id)">处理
            </el-button>
          </div>
        </div>

        <div v-if="pagination.total>0" class="mt-15" style="margin-left:-10px;">
          <el-pagination background
                         layout="prev, pager, next"
                         :page-size="pagination.size"
                         :current-page.sync="pagination.page"
                         :total="pagination.total"
                         @current-change="currentChange">
          </el-pagination>
        </div>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
          <span>确定同意吗?</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="refuse">拒绝</el-button>
            <el-button type="primary" @click="agreement">同意</el-button>
          </span>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
  import {getTutorApplyHistory, tutorApplyHistory} from '../../../api/aom.js';
  import PageTitle from '../components/pagetitle.vue';

  export default {
    data() {
      return {
        pagination: {
          page: 1,
          size: 10,
          total: 0
        },
        list: [],
        dialogVisible: false,
        id: 0
      }
    },
    created() {
      this.name = this.$route.query.name;
      this.stat = this.$route.query.stat;
      this.isExpire = this.$route.query.isExpire;
      //console.log(this.name);
      //console.log(this.stat);
      //console.log(this.isExpire);
      this.title = `申请假期 > ${this.name}`;
      this._getTutorApplyHistory();
    },
    methods: {
      refuse(){
        tutorApplyHistory(this.id, 2).then((res) => {
          if (res) {
            this._getTutorApplyHistory();
            this.dialogVisible = false;
          }
        })
      },

      agreement(){
        tutorApplyHistory(this.id, 1).then((res) => {
          if (res) {
            this._getTutorApplyHistory();
            this.dialogVisible = false;
          }
        })
      },

      dispose(id){
        this.dialogVisible = true;
        this.id = id;
      },

      _getTutorApplyHistory(){
        getTutorApplyHistory({
          stat: this.stat,
          isExpire: this.isExpire,
          page: this.pagination.page,
          rows: this.pagination.size
        }).then((res) => {
          this.pagination.total = res.data.total;
          var lis = res.data.records;
          //this.list.push([]);
          console.log(lis);
          for (let i = 0; i < lis.length; i++) {
            lis[i]['timeSlot'] = JSON.parse(lis[i]['timeSlot']);
          }
          console.log(lis)
          this.list = lis;
        })
      },

      currentChange(val) {
        this.list = [];
        this.pagination.page = val;
        this._getTutorApplyHistory();
      }
    },
    filters: {
      statFilter(a){
        if (a !== null) {
          if (a === 0) {
            return '未处理';
          } else if (a === 1) {
            return '已同意';
          } else if (a === 2) {
            return '已拒绝';
          }
        }
      },
      timeSlotFilter(a){
        if (a !== null) {
          let c = '';
          let b = JSON.parse(a);
          for (let i = 0; i < b.length; i++) {
            c += b[i] + '； \n';
          }
          return c.substring(0, c.length - 2);
        }
      }
    },
    components: {
      'v-pagetitle': PageTitle
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../index.scss';
</style>
