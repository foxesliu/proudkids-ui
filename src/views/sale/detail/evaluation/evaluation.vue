<template>
  <div class="evaluation">
    <header-box :userInfo="userInfo"></header-box>
    <div class="table-box clearfix pt30 pb30 pl30 pr30 bgf">
      <div class="left fl b">
        评价:
      </div>
      <div class="right fr">
        <el-table :key='tableKey' :data="listData" v-loading="listLoading" element-loading-text="正在加载中" border fit
                  style="width: 100%">
          <el-table-column align="center" label="课件名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.courseName}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="课节" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.lessonName}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="日期" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.originTime}}</span>
            </template>
          </el-table-column>

        </el-table>

      </div>
    </div>
    <div class="card">
      <p>注意力：<span class="org">{{concentration.zh}}</span></p>
      <p>Connection:{{concentration.en}}</p>
    </div>
    <div class="card">
      <p>阅读流利度：<span class="org">{{fluency.zh}}</span></p>
      <p>Fluency：{{fluency.en}}</p>
    </div>
    <div class="card">
      <p>发音：<span class="org">{{pronunciation.zh}}</span></p>
      <p>Pronunciation：{{pronunciation.en}}</p>
    </div>
    <div class="card">
      <p>阅读理解力  ：<span class="org">{{reading.zh}}</span></p>
      <p>Reading comprehension ：{{reading.en}}</p>
    </div>
    <div class="card">
      <p>听力理解力：<span class="org">{{listening.zh}}</span></p>
      <p>
        Listening comprehension：{{listening.en}}</p>
    </div>
    <div class="card">
        <span class="org">
        教师评语 （Teacher's Comments）
        </span>
      <el-input class="mt20" type="textarea" :rows="2" placeholder="评语" v-model="teacherComments"
                disabled="disabled"></el-input>
    </div>
  </div>
</template>

<script>
  import header from '../components/header'
  import {ruserLessonEvaluation, ruserDetail} from '@/api/detail' // 編輯學生
  export default {
    components: {
      'header-box': header
    },
    data() {
      return {
        userInfo: {},
        tableKey: 0,
        listLoading: false,
        tableData: [],
        concentration: '',
        fluency: '',
        pronunciation: '',
        reading: '',
        listening: '',
        teacherComments: '',
        userInfo: {},
        id: '',
        phone: '',
        listData: []
      }
    },
    created() {
      if (this.$route.query.phone) {
        this.phone = this.$route.query.phone
        this.getRuserList()
      } else {
        this.userInfo = JSON.parse(sessionStorage.getItem('detailParams'))[0];
        this.phone = this.userInfo.phone;
      }

//      this.userInfo = JSON.parse(sessionStorage.getItem('detailParams'))[0];
//      const {phone} = this.userInfo
//      this.phone = phone
      this.id = this.$route.query.lessonId
      this.listData.push(this.$route.query);

    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        ruserLessonEvaluation(this.phone, this.id).then((res) => {
          const {concentration, fluency, pronunciation, reading, listening, teacherComments} = res.data.data
          console.log(res.data)
          this.concentration = JSON.parse(concentration)
          this.fluency = JSON.parse(fluency)
          this.pronunciation = JSON.parse(pronunciation)
          this.reading = JSON.parse(reading)
          this.listening = JSON.parse(listening)
          this.teacherComments = teacherComments
          console.log(this.concentration)
        }).catch((res) => {
          console.log(res)
        })
      },
      getRuserList() {
        ruserDetail({phone: this.phone}).then((res) => {  //学生详情
          console.log(res.data.data)
          this.userInfo = res.data.data
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../detail.scss';

  .evaluation { //@include调用
    @include detail-container();
    .header {
      height: 78px;
      background: #fff;
      font-size: 18px;
      color: #8e8e8e;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border: 2px solid #f6f6f6;
      border-radius: 10px;
      padding-left: 78px;
    }
    .tit {
      @include contCenter();
    }
    .lesson-container {
      background: #fff;
      padding: 66px 0 66px 55px;
    }
    .card {
      background: #fff;
      margin: 18px 0;
      border-radius: 10px;
      padding: 19px 25px 19px 25px;
      p {
        line-height: 42px;
      }
    }
  }

  .block {
    border-radius: 10px 10px 10px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background: #ffffff;
    height: 78px;
    line-height: 100%;
    color: #8e8e8e;
    font-weight: bold;
    span {
      display: inline-block;
      width: 460px;
      margin-left: 70px;
    }
  }

  .userCard:nth-of-type(2) {
    span {
      margin: 0 180px 0 68px;
    }
  }

  .el-table:nth-of-type(1) {
    border-radius: 10px 10px 0 0;
  }

  .el-table:nth-of-type(2) {
    border-radius: 0 0 10px 10px;
    margin-top: 18px;
  }

  .table-box {
    border-radius: 10px;
    margin-bottom: 23px;
    .left {
      width: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #707070;
    }
    .right {
      width: 90%;
    }
  }

</style>
