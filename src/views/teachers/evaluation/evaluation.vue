<template>
  <div class="presentCourse">
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
        <el-table :key='tableKey' :data="listData" v-loading="listLoading" element-loading-text="正在加载中" border fit
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
    <div class="card bgf pl30 pt30 pb30 clearfix">
      <div class="left fl">
        <p>注意力：{{formData.concentration.zh}}</p>
        <p>Concentration: {{formData.concentration.en}}</p>
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
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="card bgf pl30 pt30 pb30 clearfix">
      <div class="left fl">
        <p>阅读流利度：{{formData.fluency.zh}}</p>
        <p>Fluency: {{formData.fluency.en}}</p>
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
                  :value="item">
                </el-option>
              </el-select>
            </template>

          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="card bgf pl30 pt30 pb30 clearfix">
      <div class="left fl">
        <p>发音：{{formData.pronunciation.zh}}</p>
        <p>Pronunciation: {{formData.pronunciation.en}}</p>
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
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="card bgf pl30 pt30 pb30 clearfix">
      <div class="left fl">
        <p>阅读理解力：{{formData.reading.zh}}</p>
        <p>Reading: {{formData.reading.en}}</p>
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
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="card bgf pl30 pt30 pb30 clearfix">
      <div class="left fl">
        <p>听力理解力：{{formData.listening.zh}}</p>
        <p>Listening: {{formData.listening.en}}</p>
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
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="card bgf pl30 pt30 pb30 pr30">
      <div class="sel">
        <el-form ref="form" :model="ruserLessonEvaluation" size="mini">
          <el-form-item :label="$t('i18nView.comment.teacherComment')" prop="teacherComments">
            <el-input type="textarea"
                      class="width-500" :rows="8" v-model="ruserLessonEvaluation.teacherComments"
                      :placeholder="$t('i18nView.comment.teacherComment')"></el-input>
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
  import {mapGetters} from 'vuex'
  import {closeViewTags} from '@/utils/index';
  import {evaluationPage, ruserEvaluation, ruserDetail} from '@/api/detail' // 添加评价
  import header from '@/views/sale/detail/components/header'
  import local from '@/views/i18n-demo/local'
  const viewName = 'i18nView'

  export default {
    components: {
      'header-box': header
    },
    data() {
      return {
        userInfo: {},
        phone: '',
        tableKey: 0,
        listData: [],
        listLoading: false,
        formData: {
          concentration: '',
          fluency: '',
          pronunciation: '',
          reading: '',
          listening: '',
          teacherComments: '',
        },
        rules: {
          concentration: [
            {required: true, message: '请选择班注意力', trigger: 'change'}
          ],
          fluency: [
            {required: true, message: '请选择阅读流利度', trigger: 'change'}
          ],
          pronunciation: [
            {required: true, message: '请选择发音', trigger: 'change'}
          ],
          reading: [
            {required: true, message: '请选择阅读理解', trigger: 'change'}
          ],
          listening: [
            {required: true, message: '请选择听力', trigger: 'change'}
          ], teacherComments: [
            {required: true, message: '请填写教师评语', trigger: 'blur'}
          ],
        },
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
          ruserId: '',
          id:''
        },
        content: ''
      }
    },
    computed: {
      ...mapGetters(['courseName', 'schedulePoint','detailPhone', 'detailType', 'roleIds', 'permissions'])
    },

    created() {
      console.log()
      console.log(this.$route.query)
      if (this.$route.query.phone) {
        this.phone = this.$route.query.phone
        this.getRuserList()
      } else {
        this.userInfo = JSON.parse(sessionStorage.getItem('detailParams'))[0];
        this.phone = this.userInfo.phone;
        this.ruserLessonEvaluation.ruserId = this.userInfo.ruserId
      }

//      const {ruserId} = this.userInfo;
//      console.log(this.userInfo)
//      this.ruserLessonEvaluation.ruserId = ruserId;   //获取ruserId

      this.ruserLessonEvaluation.lessonId = this.$route.query.lessonId;
      this.ruserLessonEvaluation.id = this.$route.query.id;
      this.listData.push(this.$route.query);
      console.log(this.$route.query)
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
      onSubmit() { //提交表单   
        console.log(this.$refs.form.validate)
        this.$refs.form.validate((valid) => {  //提交表单
          console.log(valid)
          if (valid) {
            this.addEvaluation();
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },

//      promise(){
//        return new Promise((resolve, reject) => {
//          resolve('start');
//        });
//      },
      getList() {
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
//        this.promise()
//          .then(data => {
//            this.params.type_id=1  //注意力   concentration
//            evaluationPage(this.params).then((res) => {
//              console.log(res.data)
//              this.concentrationOptions=res.data.records.map(item=>{
//
//                return JSON.parse(item.content)
//              })
//            })
//            return Promise.resolve(1); // p1
//          })
//          .then(data => {
//            this.params.type_id=2  //阅读流利度  fluency
//            evaluationPage(this.params).then((res) => {
//              this.fluencyOptions=res.data.records.map(item=>{
//                return JSON.parse(item.content)
//              })
//            })
//            console.log('result of p1: ', data);
//            return Promise.resolve(2); // p2
//          })
//          .then(data => {
//            this.params.type_id=3  //发音 Pronunciation
//            evaluationPage(this.params).then((res) => {
//              this.pronunciationOptions=res.data.records.map(item=>{
//                return JSON.parse(item.content)
//              })
//            })
//            return Promise.resolve(3); // p3
//          })
//          .then(data => {
//            this.params.type_id=4  //阅读理解力 Reading comprehension
//            evaluationPage(this.params).then((res) => {
//              this.readingOPtions=res.data.records.map(item=>{
//                return JSON.parse(item.content)
//              })
//            })
//            return Promise.resolve(4); // p4
//          })
//          .then(data => {
//            this.params.type_id=5   //听力理解力  Listening comprehension
//            evaluationPage(this.params).then((res) => {
//              this.listeningOPtions=res.data.records.map(item=>{
//                return JSON.parse(item.content)
//              })
//            })
//            return Promise.resolve(5);
//          }).then(data => {
//          this.params.type_id=6   //教师评语 Teacher's Comments
//          evaluationPage(this.params).then((res) => {
//            this.teacherCommentsOPtions=res.data.records.map(item=>{
//              return JSON.parse(item.content)
//            })
//          })
//          return Promise.resolve(6);
//        })
      },
      addEvaluation() {
        
        if(this.ruserLessonEvaluation.concentration == "" 
        || this.ruserLessonEvaluation.fluency == ""
        || this.ruserLessonEvaluation.pronunciation == ""
        || this.ruserLessonEvaluation.reading == ""
        || this.ruserLessonEvaluation.listening == ""
        || this.ruserLessonEvaluation.teacherComments == ""){
          this.$notify({
            title: 'Defeated',  type: 'error', duration: 2000
          });
        }else{
          this.ruserLessonEvaluation.concentration = JSON.stringify(this.ruserLessonEvaluation.concentration)
          this.ruserLessonEvaluation.fluency = JSON.stringify(this.ruserLessonEvaluation.fluency)
          this.ruserLessonEvaluation.pronunciation = JSON.stringify(this.ruserLessonEvaluation.pronunciation)
          this.ruserLessonEvaluation.reading = JSON.stringify(this.ruserLessonEvaluation.reading)
          this.ruserLessonEvaluation.listening = JSON.stringify(this.ruserLessonEvaluation.listening)
          this.ruserLessonEvaluation.teacherComments = this.ruserLessonEvaluation.teacherComments
          this.ruserLessonEvaluation.id = this.ruserLessonEvaluation.id
        ruserEvaluation(this.ruserLessonEvaluation).then(res => {
          var that = this;
          this.resetForm()
          this.$notify({
            title: 'Success',  type: 'success', duration: 2000, onClose: function () {
              closeViewTags({'name': '评价', 'path': '/teachers/evaluation', 'title': '评价'}, that, '/chTeachManage/today')
            }
          });
        })
        .catch(res =>{
          var that = this;
          this.resetForm()
          console.log(res)
        })
        }
        console.log(this.ruserLessonEvaluation)
        
      },
      resetForm() {  //重置
        return this.ruserLessonEvaluation = {
          concentration: "",  //注意力
          fluency: "",   //阅读流利度
          pronunciation: "",  //發音
          reading: "",  //阅读理解力
          listening: "",   //听力理解力
          teacherComments: "",  //教师评语
          lessonId: 0,
          ruserId: 0
        }
      },
      getConcentrationOptions(val) {
        this.formData.concentration = val;
      }, getFluencyOptions(val) {
        this.formData.fluency = val;
      }, getPronunciationOptions(val) {
        this.formData.pronunciation = val;
      }, getReadingOPtions(val) {
        this.formData.reading = val;
      }, getListeningOPtions(val) {
        this.formData.listening = val;
      },
      getRuserList() {
        ruserDetail({phone: this.phone}).then((res) => {  //学生详情
          console.log(res.data.data)
          this.userInfo = res.data.data
          this.ruserLessonEvaluation.ruserId = this.userInfo.ruserId
        })
      },
    }
  }
</script>

<style lang="scss">
  @import '../../sale/detail/detail.scss';

  .presentCourse {
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
