<template>
  <div class="evaluation">
    <div class="header">
      <el-row>
        <el-col :span="6" class="mt5">{{$t('i18nView.header.chName')}}：{{userInfo.name}}</el-col>
        <el-col :span="6" class="mt5">{{$t('i18nView.header.enName')}}：{{userInfo.enName}}</el-col>
        <el-col :span="6" class="mt5">{{$t('i18nView.header.phone')}}：{{userInfo.phone}}</el-col>
        <el-col :span="6" class="mt5">{{$t('i18nView.header.grade')}}：{{userInfo.grade}}</el-col>
      </el-row>
    </div>
    <div class="table-box clearfix pt30 pb30 pl30 pr30 bgf">
      <div class="left fl b">
        {{$t('i18nView.comment.comment')}}
      </div>
      <div class="right fr">
        <el-table :key='tableKey' :data="listData"
                  v-loading="listLoading"
                  element-loading-text="正在加载中" border fit
                  style="width: 100%">
          <el-table-column align="center" :label="$t('i18nView.comment.courseName')" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.courseName}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" :label="$t('i18nView.comment.lesson')" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.lessonName}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" :label="$t('i18nView.comment.date')" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.originTime}}</span>
            </template>
          </el-table-column>

        </el-table>

      </div>
    </div>
    <!--<div class="card">-->
    <!--<p>注意力：<span class="org">{{concentration.zh}}</span></p>-->
    <!--<p>Connection:{{concentration.en}}</p>-->
    <!--</div>-->

    <div class="card bgf pl30 pt30 pb30 clearfix">
      <div class="left fl">
        <p>注意力：<span class="org">{{concentration.zh}}</span></p>
        <p>Connection:{{concentration.en}}</p>
      </div>
      <div class="sel fr mt30 mr30">
        <el-form ref="form" :model="ruserLessonEvaluation" size="mini">
          <el-form-item label="" prop="concentration">
            <el-select v-model="ruserLessonEvaluation.concentration" placeholder="Select" value-key="en"
                       @change="getConcentrationOptions(ruserLessonEvaluation.concentration)">
              <el-option
                v-for="item in concentrationOptions"
                :key="item.en"
                :label="item.index"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="card bgf pl30 pt30 pb30 clearfix">
      <div class="left fl">
        <p>阅读流利度：<span class="org">{{fluency.zh}}</span></p>
        <p>Fluency：{{fluency.en}}</p>
      </div>

      <div class="sel fr mt30 mr30">
        <el-form ref="form" :model="ruserLessonEvaluation" size="mini">
          <el-form-item label="" prop="fluency">
            <template slot-scope="scope">
              <el-select v-model="ruserLessonEvaluation.fluency" value-key="en" placeholder="Select"
                         @change="getFluencyOptions(ruserLessonEvaluation.fluency)">
                <el-option
                  v-for="item in fluencyOptions"
                  :key="item.en"
                  :label="item.index"
                  :value="item"
                >
                </el-option>
              </el-select>
            </template>

          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="card bgf pl30 pt30 pb30 clearfix">
      <div class="left fl">
        <p>发音：<span class="org">{{pronunciation.zh}}</span></p>
        <p>Pronunciation：{{pronunciation.en}}</p>
      </div>

      <div class="sel fr mt30 mr30">
        <el-form ref="form" :model="ruserLessonEvaluation" size="mini">
          <el-form-item label="" prop="pronunciation">
            <el-select v-model="ruserLessonEvaluation.pronunciation" value-key="en" placeholder="Select"
                       @change="getPronunciationOptions(ruserLessonEvaluation.pronunciation)">
              <el-option
                v-for="item in pronunciationOptions"
                :key="item.en"
                :label="item.index"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

    </div>
    <div class="card bgf pl30 pt30 pb30 clearfix">
      <div class="left fl">
        <p>阅读理解力  ：<span class="org">{{reading.zh}}</span></p>
        <p>Reading comprehension ：{{reading.en}}</p>
      </div>

      <div class="sel fr mt30 mr30">
        <el-form ref="form" :model="ruserLessonEvaluation" size="mini">
          <el-form-item label="" prop="reading">
            <el-select v-model="ruserLessonEvaluation.reading" value-key="en" placeholder="Select"
                       @change="getReadingOPtions(ruserLessonEvaluation.reading)">
              <el-option
                v-for="item in readingOPtions"
                :key="item.en"
                :label="item.index"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

    </div>
    <div class="card bgf pl30 pt30 pb30 clearfix">
      <div class="left fl">
        <p>听力理解力：<span class="org">{{listening.zh}}</span></p>
        <p>Listening comprehension：{{listening.en}}</p>
      </div>

      <div class="sel fr mt30 mr30">
        <el-form ref="form" :model="ruserLessonEvaluation" size="mini">
          <el-form-item label="" prop="listening">
            <el-select v-model="ruserLessonEvaluation.listening" value-key="en" placeholder="Select"
                       @change="getListeningOPtions(ruserLessonEvaluation.listening)">
              <el-option
                v-for="item in listeningOPtions"
                :key="item.en"
                :label="item.index"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="card bgf pl30 pt30 pb30 clearfix">
      <div class="sel">
        <el-form ref="form" :model="ruserLessonEvaluation" size="mini">
          <el-form-item :label="$t('i18nView.comment.teacherComment')" prop="teacherComments">
            <el-input type="textarea" class="width-500" :rows="8" v-model="ruserLessonEvaluation.teacherComments"
                      :placeholder="teacherComments||$t('i18nView.comment.teacherComment')"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="btn">
      <el-button @click="onSubmit">{{$t('i18nView.comment.submit')}}</el-button>
    </div>
  </div>
</template>

<script>
  import header from '@/views/sale/detail/components/header'
  import {closeViewTags} from '@/utils/index';
  import {ruserLessonEvaluation, evaluationPage, editEvaluationPage, ruserDetail} from '@/api/detail' // 編輯學生
  import local from '@/views/i18n-demo/local'
  const viewName = 'i18nView'
  import {mapGetters} from 'vuex'

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
        id: '',
        phone: '',
        listData: [],
        concentrationOptions: [],  //注意力
        fluencyOptions: [],  //阅读流利
        pronunciationOptions: [], //发音
        readingOPtions: [], //阅读理解
        listeningOPtions: [],  //听力
        teacherCommentsOPtions: [],  //教师评语
        ruserLessonEvaluation: {
          concentration: "",  //注意力
          fluency: "",   //閲讀流利度
          pronunciation: "",  //發音
          reading: "",  //閲讀理解力
          listening: "",   //聽力理解力
          teacherComments: "",  //教師評語
          lessonId: '',
          ruserId: ''
        },
        formData: ''
      }
    },
    computed: {
      ...mapGetters(['detailPhone', 'detailType', 'roleIds', 'permissions'])
    },
    created() {
      console.log(this.formData)
      console.log(this.$route.query)
      if (this.$route.query.phone) {
        this.phone = this.$route.query.phone
        this.getRuserList()
      } else {
        this.userInfo = JSON.parse(sessionStorage.getItem('detailParams'))[0];
        this.phone = this.userInfo.phone;
        this.ruserLessonEvaluation.ruserId = this.userInfo.ruserId
      }
//      this.userInfo = JSON.parse(sessionStorage.getItem('detailParams'))[0];
//      const {phone} = this.userInfo
//      this.phone = phone
      this.id = this.$route.query.lessonId
      this.listData.push(this.$route.query);
      if (!this.$i18n.getLocaleMessage('en')[viewName]) {
        this.$i18n.mergeLocaleMessage('en', local.en)
        this.$i18n.mergeLocaleMessage('zh', local.zh)
      }
      let [roleId] = this.roleIds;

      if (roleId == 23 || roleId == 24 || roleId == 25 || roleId == 32) {
        this.$i18n.locale = 'en'
        this.$store.dispatch('setLanguage', 'en')
      } else {
        this.$i18n.locale = 'zh'
        this.$store.dispatch('setLanguage', 'zh')
      }

    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        ruserLessonEvaluation(this.phone, this.id).then((res) => {
          console.log(res.data)
          const {concentration, fluency, pronunciation, reading, listening, teacherComments} = res.data.data
          this.formData = res.data.data
          this.concentration = JSON.parse(concentration)
          this.fluency = JSON.parse(fluency)
          this.pronunciation = JSON.parse(pronunciation)
          this.reading = JSON.parse(reading)
          this.listening = JSON.parse(listening)
          this.teacherComments = teacherComments
          this.ruserLessonEvaluation.teacherComments = teacherComments
          console.log(this.concentration)
        }).catch((res) => {
          console.log(res)
        })
        evaluationPage(1).then(res => {
          this.concentrationOptions = res.data.records.map(item => {
            return JSON.parse(item.content)
          })
        })
        evaluationPage(2).then(res => {
          this.fluencyOptions = res.data.records.map(item => {
            return JSON.parse(item.content)
          })
        })
        evaluationPage(3).then(res => {
          this.pronunciationOptions = res.data.records.map(item => {
            return JSON.parse(item.content)
          })
        })
        evaluationPage(4).then(res => {
          this.readingOPtions = res.data.records.map(item => {
            return JSON.parse(item.content)
          })
        })
        evaluationPage(5).then(res => {
          this.listeningOPtions = res.data.records.map(item => {
            return JSON.parse(item.content)
          })
        })
        evaluationPage(6).then(res => {
          this.teacherCommentsOPtions = res.data.records.map(item => {
            return JSON.parse(item.content)
          })
        })
      },
      getConcentrationOptions(val){
        this.concentration = val;
      }, getFluencyOptions(val){
        this.fluency = val;
      }, getPronunciationOptions(val){
        this.pronunciation = val;
      }, getReadingOPtions(val){
        this.reading = val;
      }, getListeningOPtions(val){
        this.listening = val;
      },
      onSubmit() { //提交表单
        let {concentration, fluency, pronunciation, reading, listening, teacherComments} = this.formData
        if (this.ruserLessonEvaluation.concentration != '') {
          concentration = JSON.stringify(this.ruserLessonEvaluation.concentration)
        } else {
          concentration = this.formData.concentration
        }
        if (this.ruserLessonEvaluation.fluency != '') {
          fluency = JSON.stringify(this.ruserLessonEvaluation.fluency)
        } else {
          fluency = this.formData.fluency
        }
        if (this.ruserLessonEvaluation.pronunciation != '') {
          pronunciation = JSON.stringify(this.ruserLessonEvaluation.pronunciation)
        } else {
          pronunciation = this.formData.pronunciation
        }
        if (this.ruserLessonEvaluation.reading != '') {
          reading = JSON.stringify(this.ruserLessonEvaluation.reading)
        } else {
          reading = this.formData.reading
        }
        if (this.ruserLessonEvaluation.listening != '') {
          listening = JSON.stringify(this.ruserLessonEvaluation.listening)
        } else {
          listening = this.formData.listening
        }
        if (this.ruserLessonEvaluation.teacherComments != '') {
          teacherComments = this.ruserLessonEvaluation.teacherComments
        } else {
          teacherComments = this.formData.teacherComments
        }
        console.log(fluency)
        this.formData.concentration = concentration
        this.formData.fluency = fluency
        this.formData.pronunciation = pronunciation
        this.formData.reading = reading
        this.formData.listening = listening
        this.formData.teacherComments = teacherComments
        console.log(this.formData)
        editEvaluationPage(this.formData).then(res => {
          var that = this;
          this.resetForm()
          this.$notify({
            title: 'Success',  type: 'success', duration: 2000, onClose: function () {
              closeViewTags({
                'name': '修改评价',
                'path': '/teachers/editEvaluation',
                'title': '修改评价'
              }, that, '/chTeachManage/today')
            }
          });

          console.log(res.data)
        })
      },
      resetForm() {  //重置
        return this.ruserLessonEvaluation = {
          concentration: "",  //注意力
          fluency: "",   //阅读流利度
          pronunciation: "",  //發音
          reading: "",  //阅读理解力
          listening: "",   //听力理解力
          teacherComments: "",  //教师评语
          lessonId: '',
          ruserId: ''
        }
      },
      getRuserList() {
        ruserDetail({phone: this.phone}).then((res) => {  //学生详情
          this.userInfo = res.data.data
          this.ruserLessonEvaluation.ruserId = this.userInfo.ruserId
        })
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../sale/detail/detail.scss';

  .evaluation { //@include调用
    @include detail-container();
    @include btn();
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
      padding-left: 38px;
      margin-bottom: 18px;
    }
    .el-header {
      height: 78px;
      background: #fff;
      font-size: 18px;
      color: #8e8e8e;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border: 2px solid #f6f6f6;
      border-radius: 10px;
    }
    .el-main {
      border: 2px solid #f6f6f6;
      border-radius: 10px;
      height: 564px;
      background: #fff;
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
    .card {
      border: 1px solid #f6f6f6;
      border-radius: 10px;
      line-height: 42px;
      font-weight: bold;
      color: #707070;
      margin-bottom: 13px;
    }
    .btn {
      display: flex;
      justify-content: center;
    }
  }


</style>
