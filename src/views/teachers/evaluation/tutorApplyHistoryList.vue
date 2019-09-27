<template>
  <div class="flowLog">
    <div class="historyList" v-for="item in tableData">
      <p>
        {{$t('i18nView.tutorApplyHistoryList.applayTime')}}：{{item.createTime}} ({{$t('i18nView.tutorApplyHistoryList.timeZone')}}：{{$t('i18nView.tutorApplyHistoryList.east')}}{{item.timezone}}{{$t('i18nView.tutorApplyHistoryList.zone')}})</p>
      <p>{{$t('i18nView.tutorApplyHistoryList.applyer')}}：{{item.applyer}}</p>
      <p>
        {{$t('i18nView.tutorApplyHistoryList.timeForLeave')}}：
        <span v-for="item in JSON.parse(item.timeSlot)" class="org">
          {{item[0]}} <i v-for="i in item[1]">{{i | classTimesToSA}}</i>；
        </span>
      </p>
      <p v-if="item.approver">
        {{$t('i18nView.tutorApplyHistoryList.approver')}}：<span class="org">{{item.approver}}</span>
      </p>
      <p>{{$t('i18nView.tutorApplyHistoryList.stat')}}：<span class="cred b">{{item.stat}}</span></p>
      <p v-if="item.approver">{{$t('i18nView.tutorApplyHistoryList.approver')}}：{{item.approver}}</p>
    </div>
    <div v-if="total==0" style="text-align: center;height: 50px;font-size: 20px;">
      {{$t('i18nView.tutorApplyHistoryList.noData')}}......
    </div>
    <div class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-rowss="[10,20,30,50]" :page-rows="listQuery.rows"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import local from '@/views/i18n-demo/local'
  const viewName = 'i18nView'
  import {mapGetters} from 'vuex'
  import {getTutorApplyHistory} from '@/api/teachers' // 流转日志
  import {sfTools} from '../../aom/util.js';
  let isEnglishSanfeng = false;
  export default {
    data() {
      return {
        teacherType: '',
        listLoading: true,
        listQuery: {
          userId: '',
          page: 1,
          rows: 10
        },
        total: null,
        tableKey: 0,
        tableData: null,
        timeSlot: null
      }
    },
    computed: {
      ...mapGetters(['userId', 'roleIds'])
    },
    created() {
      if (!this.$i18n.getLocaleMessage('en')[viewName]) {
        this.$i18n.mergeLocaleMessage('en', local.en)
        this.$i18n.mergeLocaleMessage('zh', local.zh)
      }
      let [roleId] = this.roleIds;

      if (roleId == 23 || roleId == 24 || roleId == 25 || roleId == 32) {
        this.$i18n.locale = 'en'
        this.$store.dispatch('setLanguage', 'en')
        this.teacherType = 1
        isEnglishSanfeng = true;
      } else {
        this.$i18n.locale = 'zh'
        this.$store.dispatch('setLanguage', 'zh')
        this.teacherType = 0
      }
      if (this.$route.query.teacherId) {
        this.listQuery.userId = this.$route.query.teacherId
      } else {
        this.listQuery.userId = this.userId;
      }

      this.getList()
    },
    filters: {
      classTimesToSA: function (a) {
        if (a) {
          if (isEnglishSanfeng) {
            return sfTools.classTimesToSouthAfrica(a);
          } else {
            return a;
          }
        }
      }
    },
    methods: {
      getList() {
        getTutorApplyHistory(this.listQuery).then(res => {
          res.data.records.forEach(item => {
            if (this.teacherType == '1') {
              if (item.stat == 0) {
                item.stat = 'Untreated'
              } else if (item.stat == 1) {
                item.stat = 'agreed'
              } else if (item.stat == 2) {
                item.stat = 'refused'
              }
            } else {
              if (item.stat == 0) {
                item.stat = '未处理'
              } else if (item.stat == 1) {
                item.stat = '已同意'
              } else if (item.stat == 2) {
                item.stat = '已拒绝'
              }
            }
          })
          this.total = res.data.total
          this.tableData = res.data.records
        })
      },
      handleSizeChange(val) {
        this.listQuery.rows = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../sale/detail/detail.scss';

  .flowLog { //@include调用
    @include detail-container();
    .red {
      color: #e12225;
    }
    .historyList {
      padding: 20px 0 25px 66px;
      margin-bottom: 20px;
      background: #fff;
      border-radius: 10px;
      border: 2px solid #f6f6f6;
      p {
        line-height: 40px;
      }
    }
  }

</style>
