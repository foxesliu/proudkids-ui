<template>
  <div class="message">
    <p class="title">预习和作业的消息提醒</p>
    <div class="tabs" v-loading="listLoading">
      <div class="tabs-change">
        <div @click="handleChange(0)"
             :class="tabsStatus===0?'active pull-left c-pointer':'pull-left c-pointer'">
          未读的提问和批注回复（{{unReadLength}}）
        </div>
        <div @click="handleChange(1)"
             :class="tabsStatus===1?'active pull-left c-pointer':'pull-left c-pointer'">
          全部的提问和批注内容回复（{{totalReadLength}}）
        </div>
      </div>
      <p v-if="!listData.length">暂无数据</p>
      <ul class="listData mt-20">
        <li v-for="item in listData" @click="view(item)">
          <div class="content">
            <i :class="{question:item.type==0,answer:item.type==1}">{{item.type==0?'提问':'批注'}}</i>
            <span>{{item.info}}</span>
          </div>
          <span>{{item.datatime}}</span>
        </li>
      </ul>
    </div>

    <div style="margin-top: 20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.pageIndex"
                     :page-sizes="[20,50,100]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {messageRemind, pwDetail} from '@/api/teachers.js';

  export default {
    data() {
      return {
        tabsStatus: 0,
        listData: [],
        listLoading: false,
        listQuery: {
          pageIndex: 1,
          pageSize: 20
        },
        unReadLength: '',
        totalReadLength: '',
        params: {},
        params1: {},
        params2: {},
        total: 0
      }
    },
    created() {
      this.getLength(this.query(0), 0)
      this.getLength(this.query(null), 1)
    },
    methods: {
      /**
       * @param {String} stat: 0表示未读的提问和批注数 1获取所有的提问和批注数
       * @description 用于调用列表接口时候传参
       */
      query(stat) {
        return {
          userId: this.userId,
          stat: stat,
          ...this.listQuery
        }
      },

      /**
       * @param {String} stat: 0表示未读的提问和批注数 1获取所有的提问和批注数
       * @description 获取提问和批注数数据长度
       */
      async getLength(data, stat) {
        this.listLoading = true
        const result = await messageRemind(data)
        this.listLoading = false
        if (stat == 0) {
          this.unReadLength = result.data.totalElements
          this.listData = result.data.content
          this.total = result.data.totalElements
        }
        if (stat == 1) {
          this.totalReadLength = result.data.totalElements
          this.total = result.data.totalElements
        }
      },
      /**
       * @description 获取提问和批注列表数据
       */
      async getMessageRemind(data) {
        this.listLoading = true
        const result = await messageRemind(data)
        if (result) {
          this.listLoading = false
        }
        this.total = result.data.totalElements
        this.listData = result.data.content
      },
      /**
       * @description 获取数据题当前页所需参数
       * @description engName 学生中文名字  engName学生英文名字
       * @description tabsStatus0  qaType2 readStat2 设置默认当前页
       */
      async getPwDetail(id) {
        const result = await pwDetail(id)
        const {ruserLessid, ruserId, lessSecId, courseId, lessonId, ruserVo: {enName, name}} = result.data

        sessionStorage.setItem('chName', name)
        sessionStorage.setItem('engName', enName)
        sessionStorage.setItem('tabsStatus', 0)
        sessionStorage.setItem('qaType', 2)
        sessionStorage.setItem('readStat', 2)
        this.$router.push({
          path: '/detail/currentPage',
          query: {id: ruserLessid, ruserId, lessSecId, courseId, lessonId}
        });
      },
      handleSizeChange(val) {
        let query;
        this.listQuery.pageSize = val
        this.tabsStatus == 0 ? query = this.query(0) : query = this.query(null)
        this.getMessageRemind({...query})
      },
      handleCurrentChange(val) {
        let query;
        this.listQuery.pageIndex = val
        this.tabsStatus == 0 ? query = this.query(0) : query = this.query(null)
        this.getMessageRemind({...query})
      },

      handleChange(tabsStatus) {
        let query;
        this.tabsStatus = tabsStatus
        this.tabsStatus == 0 ? query = this.query(0) : query = this.query(null)
        this.getMessageRemind(query)
      },
      view(item) {
        this.getPwDetail(item.ruserLessonQaId)
      }

    },
    computed: {
      ...mapGetters([
        "userId"
      ]),
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss">
  @import '../../aom/index.scss';

  .message {
    height: 100%;
    background: #fff;
    margin: 25px 15px 0 15px;

    .title {
      margin: 0;
      padding: 0;
      font-family: MicrosoftYaHeiUI;
      font-size: 24px;
      color: #666666;
    }

    .tabs {
      border: 1px solid #DCDFE6;
      color: #606266;
      margin: 15px 15px 0 0;
      border-radius: 8px;
      padding: 20px;

      .tabs-change {
        border-bottom: 1px solid #ccc;
        height: 40px;
        line-height: 40px;

        div {
          height: 40px;
          line-height: 40px;
          text-align: center;
          width: 320px;
          font-size: 20px;

          &.active {
            border-bottom: 2px solid #449cfd;
            color: #449cfc;
          }
        }
      }
    }

    .listData {
      margin: 0;
      padding: 0;

      li {
        height: 83px;
        background-color: #ffffff;
        border-radius: 10px;
        border: solid 1px #eaeaea;
        margin: 20px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;

        .content {
          width: 1000px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        i {
          display: inline-block;
          width: 59px;
          height: 49px;
          background-color: #69c242;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          font-style: normal;
          text-align: center;
          line-height: 49px;
          color: #ffffff;
          border-radius: 0 50% 50% 0;
          margin-right: 13px;
        }

        .answer {
          background: #69c242;
        }

        .question {
          background: #449cfc;
        }

        span {
          margin-right: 27px;
        }
      }
    }
  }

</style>
