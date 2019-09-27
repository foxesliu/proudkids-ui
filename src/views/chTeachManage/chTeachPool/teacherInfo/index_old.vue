<template>
  <div class="app-container calendar-list-container">
    <el-row class="section-1">
      <el-col :span="8">
        <el-form class="teacher-info">
          <el-form-item :label="$t('i18nView.ehTeachPool.name')+':'">
            {{formData.name}}
          </el-form-item>
          <el-form-item :label="$t('i18nView.teacherInfo.classIn')+':'">
            {{formData.phone}}
          </el-form-item>
          <el-form-item :label="$t('i18nView.ehTeachPool.searchDaqu')+':'">
            {{formData.depts | areaFilter}}
          </el-form-item>
          <el-form-item :label="$t('i18nView.ehTeachPool.searchZubie')+':'">
            {{formData.depts | groupFilter}}
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showPdf"
                       icon="el-icon-download">{{$t('i18nView.teacherInfo.downloadPDF')}}
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="16">
        <el-row class="teacher-pics">
          <div class="img-div" v-for="(item, index) in imgs" :key="index">
            <img :src="item.url" alt="png">
            <el-button v-if="adu_teacher_adit"
                       class="choose-btn" type="default"
                       @click="toggleShow(index)"
                       size="mini">选择<i class="el-icon-setting el-icon--right"></i>
            </el-button>
          </div>
          <my-upload field="file"
                     @crop-upload-success="cropUploadSuccess"
                     v-model="show"
                     :width="214"
                     :height="300"
                     url="/admin/user/upload"
                     :headers="headers"
                     img-format="png">
          </my-upload>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="basic-set">
      <el-col :span="4">
        <div class="basic-list">
          <span>{{$t('i18nView.ehTeachPool.language')}}：</span><span>{{formData.language}}</span>&emsp;
          <el-switch
            v-if="adu_teacher_adit"
            style="display: inline-block"
            v-model="formData.language"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="英语"
            inactive-value="中文"
            @change="subData()">
          </el-switch>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="basic-list">
          <span>{{$t('i18nView.ehTeachPool.sex')}}：</span>
          <span v-show="formData.sex==true&&isEnglish==false">男</span>
          <span v-show="formData.sex==false&&isEnglish==false">女</span>
          <span v-show="formData.sex==true&&isEnglish==true">man</span>
          <span v-show="formData.sex==false&&isEnglish==true">women</span>
          <!--<span>性别：</span><span>{{formData.sex | sexFilter}}</span>-->
          <el-switch
            v-if="adu_teacher_adit"
            style="display: inline-block"
            v-model="formData.sex"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="subData()">
          </el-switch>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="basic-list">
          <span>{{$t('i18nView.ehTeachPool.property')}}：</span>
          <!--<span>{{formData.dutyType | dutyFilter}}</span>&emsp;-->
          <span v-show="formData.dutyType==0&&isEnglish==false">兼职</span>
          <span v-show="formData.dutyType==1&&isEnglish==false">全职</span>
          <span v-show="formData.dutyType==0&&isEnglish==true">Part Time</span>
          <span v-show="formData.dutyType==1&&isEnglish==true">Full Time</span>
          <el-switch
            v-if="adu_teacher_adit"
            style="display: inline-block"
            v-model="formData.dutyType"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="0"
            inactive-value="1"
            @change="subData()">
          </el-switch>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="basic-list">
          <span>{{$t('i18nView.ehTeachPool.pkTime')}}：</span>

          <span v-if="formData.pk >= 12">{{formData.pk | monthToYearFilter}}</span><span
          v-if="formData.pk >= 12">{{$t('i18nView.ehTeachPool.year')}}</span>{{formData.pk | monthToMonthFilter}}{{$t('i18nView.ehTeachPool.month')}}

        </div>
      </el-col>
      <el-col :span="4">
        <div class="basic-list border-r">
          <!--<span>教龄：</span><span>{{formData.teachAge}}</span>&emsp;<i class="el-icon-setting"></i>-->
          <span>{{$t('i18nView.ehTeachPool.serviceLength')}}：</span>
          <!-- <span>{{formData.teachAge ? formData.teachAge : 0}}{{$t('i18nView.ehTeachPool.month')}}</span>&emsp; -->
          <span v-if="formData.teachAge >= 12">{{formData.teachAge | monthToYearFilter}}</span>
          <span
            v-if="formData.teachAge >= 12">{{$t('i18nView.ehTeachPool.year')}}</span>{{formData.teachAge | monthToMonthFilter}}{{$t('i18nView.ehTeachPool.month')}}

          <el-popover v-if="adu_teacher_adit" placement="bottom"
                      title="修改初始教龄（单位/月）" width="200"
                      trigger="click" v-model="visible2">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item>
                <el-input style="display: inline-block" type="number" size="mini" max="300" min="0"
                          v-model="initMoth"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button style="display: inline-block" type="primary" size="mini" @click="changeInitAge()">修改
                </el-button>
              </el-form-item>
            </el-form>
            <el-button slot="reference" type="primary" size="mini"
                       icon="el-icon-setting" circle></el-button>
            <!--<i slot="reference" class="el-icon-setting"></i>-->
          </el-popover>
        </div>
      </el-col>
    </el-row>
    <el-row class="educations">
      <div>{{$t('i18nView.teacherInfo.xueli')}}：</div>
      <ul class="education">
        <li v-for="(item,index) in educationData"
            :key="index"
            @click="selectAducation(item,index)"
            :class="currentAducation == index ? 'active':''">
          {{item}}
        </li>
        <li class="last-degree" :class="currentAducation == -1 ? 'active':''"
            @click="otherDegree">
          <span>Other</span>
          <input v-model="currentDegree"
                 @change="otherDegree"
                 @keyup.enter="subData()"
                 :disabled="!adu_teacher_adit"/>
          <!--<el-input
            v-model="currentDegree">
          </el-input>-->
        </li>
      </ul>
    </el-row>
    <el-row style="margin-top:50px;">
      <div>{{$t('i18nView.teacherInfo.teacherIntro')}}：</div>

      <el-row class="detail-boxs" v-for="(item,index) in  detailData" :key="index">
        <el-col :span="20" class="detail-box">
          <div class="detail-1">
            <el-input v-if="item.cnShow"
                      v-model="item.cnText"
                      type="textarea" rows="4"
                      placeholder="中文" class="text-a">
            </el-input>
            <div v-if="!item.cnShow" @click="editCnText(item,index, 1)">
              <span>（中文）</span>
              {{item.cnText}}
            </div>
          </div>
          <div class="detail-1">
            <el-input v-if="item.enShow"
                      v-model="item.enText"
                      type="textarea"
                      rows="4" placeholder="English"
                      class="text-a">
            </el-input>
            <div v-if="!item.enShow" @click="editEnText(item,index, 1)">
              <span>（ENglish）</span>
              {{item.enText}}
            </div>
          </div>
        </el-col>
        <el-col :span="4" class="detail-box-2">
          <div class="pull-right" style="text-align:right">
            <el-button v-if="adu_teacher_adit"
                       class="text-btn"
                       type="primary" slot="append"
                       @click="saveDetail(item,index)">保存
            </el-button>
          </div>
        </el-col>
      </el-row>
      <div>{{$t('i18nView.teacherInfo.schoolName')}}：</div>
      <el-row class="detail-boxs" v-for="(item,index) in  detailData2" :key="index">
        <el-col :span="20" class="detail-box">
          <div class="detail-1">
            <el-input v-if="item.cnShow"
                      v-model="item.cnText" type="textarea"
                      rows="4" placeholder="中文" class="text-a">
            </el-input>
            <div v-if="!item.cnShow" @click="editCnText(item,index, 2)">
              <span>（中文）</span>
              {{item.cnText}}
            </div>
          </div>
          <div class="detail-1">
            <el-input v-if="item.enShow"
                      v-model="item.enText" type="textarea"
                      rows="4" placeholder="English"
                      class="text-a">
            </el-input>
            <div v-if="!item.enShow" @click="editEnText(item,index, 2)">
              <span>（ENglish）</span>
              {{item.enText}}
            </div>
          </div>
        </el-col>
        <el-col :span="4" class="detail-box-2">
          <div class="pull-right" style="text-align:right">
            <el-button v-if="adu_teacher_adit"
                       class="text-btn" type="primary"
                       slot="append"
                       @click="saveDetail(item,index)">保存
            </el-button>
          </div>
        </el-col>
      </el-row>
      <div>{{$t('i18nView.teacherInfo.jxll')}}：</div>
      <el-row class="detail-boxs" v-for="(item,index) in  detailData3" :key="index">
        <el-col :span="20" class="detail-box">
          <div class="detail-1">
            <el-input v-if="item.cnShow"
                      v-model="item.cnText" type="textarea"
                      rows="4" placeholder="中文" class="text-a">
            </el-input>
            <div v-if="!item.cnShow" @click="editCnText(item,index, 3)">
              <span>（中文）</span>
              {{item.cnText}}
            </div>
          </div>
          <div class="detail-1">
            <el-input v-if="item.enShow"
                      v-model="item.enText" type="textarea"
                      rows="4" placeholder="English"
                      class="text-a">
            </el-input>
            <div v-if="!item.enShow" @click="editEnText(item,index, 3)">
              <span>（ENglish）</span>
              {{item.enText}}
            </div>
          </div>
        </el-col>
        <el-col :span="4" class="detail-box-2">
          <div class="pull-right" style="text-align:right">
            <el-button v-if="adu_teacher_adit"
                       class="text-btn" type="primary"
                       slot="append"
                       @click="saveDetail(item,index)">保存
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-row>

    <div class="pdf-container" v-if="showPdfDownload">
      <div class="box">
        <div class="pdf-box" id="content" @click="showPdfDownload=false">
          <div class="top">
            <div><span>{{formData.name}}</span><i :class="formData.sex==true?'Male':'Female'"></i></div>
            <img src="./logo.png"/>
          </div>
          <div class="bottom">
            <div class="infor">
              <div class="p">
                <div><span>Language:</span><span class="color-oran ml-10">{{formData.language}}</span></div>
                <div class="ml-100"><span>Time in position:</span><span
                  class="color-oran ml-10"><span v-if="formData.teachAge >= 12">{{formData.teachAge | monthToYearFilter}}</span><span
                  v-if="formData.teachAge >= 12">{{$t('i18nView.ehTeachPool.year')}}</span> {{formData.teachAge | monthToMonthFilter}}{{$t('i18nView.ehTeachPool.month')}}</span>
                </div>
              </div>
              <div class="p">
                <div>
                  <span>School Name:</span>
                  <span class="color-oran ml-10">{{(JSON.parse(formData.school)).enText}}</span>
                </div>
              </div>
            </div>
            <div class="dl">
              <dl class="mb-20">
                <dt>Tutoring or Teaching Experience & Personaility</dt>
                <dd>
                  <div class="en">{{(JSON.parse(formData.introduction)).enText}}</div>
                  <div class="line"></div>
                  <div class="cn">{{(JSON.parse(formData.introduction)).cnText}}</div>
                </dd>
              </dl>
              <dl>
                <dt>What is your teaching philosophy？</dt>
                <dd>
                  <div class="en">{{(JSON.parse(formData.philosophy)).enText}}</div>
                  <div class="line"></div>
                  <div class="cn">{{(JSON.parse(formData.philosophy)).cnText}}</div>
                </dd>
              </dl>
            </div>

            <div class="imgs">
              <div v-for="(index,item) in imgs" :key="index"><img :src="item.url"/></div>
              <!--<div><img src="./pdf-topbg.gif"/></div>-->
              <!--<div></div>-->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="saveImg"></div>
  </div>
</template>

<script>
  //import { roleList, deptRoleList, fetchDeptTree } from '@/api/role'
  import myUpload from 'vue-image-crop-upload'
  import {getTeacherDetails, editTeacherDetails} from '@/api/aom';
  import {getToken} from '@/utils/auth'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  // import { parseTime } from '@/utils'
  import {mapGetters} from 'vuex'
  import ElInput from "../../../../../node_modules/element-ui/packages/input/src/input.vue";
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button.vue";
  import ElRow from "element-ui/packages/row/src/row";
  import local from '@/views/i18n-demo/local';
  const viewName = 'i18nView';

  export default {
    components: {
      ElRow,
      ElButton,
      ElInput,
      'my-upload': myUpload
    },
    name: 'table_user',
    directives: {waves},
    data() {
      return {
        showPdfDownload: false,
        loadedAMapJS: false,
        visible2: false,
        formInline: {
          userId: null,
          teacherType: null
        },
        avatar: null,
        show: false,
        headers: {
          Authorization: 'Bearer ' + getToken()
        },
        imgs: [{}, {}, {}],
        imgChooseNum: null,
        formData: {
          "createId": null,
          "createTime": null,
          "degree": null,
          "delFlag": null,
          "dutyType": null,
          "eeoUserId": null,
          "id": null,
          "introduction": null,
          "language": null,
          "philosophy": null,
          "pics": null,
          "school": null,
          "teachAge": null,
          "timezone": null,
          "updateTime": null,
          "userId": null
        },
        initMoth: null,
        language: ['英语', '中文'],
        educationData: ['Bachelors', 'Masters', 'Doctorate/PhD', 'TEFL/TESOL', 'CELTA', 'IELTS', 'BED/Teaching Certification'],
        currentAducation: null,
        currentDegree: undefined,
        detailData: [],
        detailData2: [],
        detailData3: [],
        TeaUserId: null,
        teacherType: null,
        adu_teacher_adit: false,
        isEnglish: false
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'userId',
        'deptId',
        'roles',
        'roleIds'
      ])
    },
    filters: {
      sexFilter(sex){
        const sexMap = {'true': '男', 'false': '女'};
        return sexMap[sex]
      },
      dutyFilter(dutyType){
        console.log(dutyType);
        const dutyMap = {
          0: '全职',
          1: '兼职'
        }
        return dutyMap[dutyType]
      },
      monthToYearFilter(month) {
        if (month < 12) {
          return 0
        } else {
          return (Math.floor(month / 12) )
        }

      },
      monthToMonthFilter(month) {
        return month % 12
      },
      areaFilter(depts) {
        console.log(depts);
        if (depts) {
          return depts.split('-')[1]
        } else {
          return null
        }

      },
      groupFilter(depts) {
        console.log(depts);
        if (depts) {
          return depts.split('-')[2];
        } else {
          return null
        }

      }
    },
    created() {
      /*this.sys_user_del = this.permissions['sys_user_del']*/
      this.TeaUserId = this.$route.query.userId;
      this.formData.userId = this.TeaUserId;
      this.teacherType = this.$route.query.teacherType;
      this.getData();
      this.adu_teacher_adit = this.permissions['adu_teacher_adit'];
      if (!this.$i18n.getLocaleMessage('en')[viewName]) {
        this.$i18n.mergeLocaleMessage('en', local.en)
        this.$i18n.mergeLocaleMessage('zh', local.zh)
      }
      let [roleId] = this.roleIds;
      if (roleId == 23 || roleId == 24 || roleId == 25 || roleId == 32) {
        this.$i18n.locale = 'en'
        this.$store.dispatch('setLanguage', 'en')
        this.isEnglish = true;
      } else {
        this.$i18n.locale = 'zh'
        this.$store.dispatch('setLanguage', 'zh');
        this.isEnglish = false;
      }

    },
    methods: {
      showPdf(){
        this.showPdfDownload = true;
        let _this = this;
        let html2can = document.getElementById('html2canvas');
        let jspdf = document.getElementById('jspdf');
        if (html2can === null) {
          html2can = document.createElement('script');
          html2can.type = 'text/javascript';
          html2can.src = '../../../../../static/html2canvas.js';
          html2can.id = 'html2can';
          jspdf = document.createElement('script');
          jspdf.type = 'text/javascript';
          jspdf.src = '../../../../../static/jspdf.debug.js';
          jspdf.id = 'jspdf';
          let s = document.getElementsByTagName('head')[0];
          s.appendChild(html2can);
          s.appendChild(jspdf);
        }
        setTimeout(() => {
          html2canvas(document.getElementById("content"), {useCORS: true}).then(function (canvas) {
            var imgData = canvas.toDataURL('image/jpeg');
            _this.download(imgData);
            _this.showPdfDownload = false;
            return;
            var doc = new jsPDF("p", "mm", "a4");
            doc.addImage(imgData, 'JPEG', 0, 0, 1000, 1415);
            doc.save('content.pdf');
          })
        }, 2000);
      },
      download(src) {
        var $a = document.createElement('a');
        $a.setAttribute("href", src);
        $a.setAttribute("download", this.formData.name);
        var evObj = document.createEvent('MouseEvents');
        evObj.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
        $a.dispatchEvent(evObj);
      },
      getData() {
        getTeacherDetails(this.TeaUserId, this.teacherType).then(response => {
          this.formData = response.data.result;
          console.log(this.formData);
          console.log(typeof JSON.parse(this.formData.pics));
          //属性数字=》文字
          if (typeof (this.formData.dutyType) == 'number') {
            this.formData.dutyType = this.formData.dutyType.toString()
          }
          //图片数据处理
          if (this.formData.pics) {
            this.imgs = JSON.parse(this.formData.pics)
          }

          console.log(this.imgs);
          //获取学位后处理数据
          console.log(this.formData.degree);
          if (this.formData.degree) {
            this.currentAducation = -1;
            for (let i = 0; i < this.educationData.length; i++) {
              if (this.formData.degree === this.educationData[i]) {
                console.log('666');
                this.currentAducation = i;
              }
            }
            console.log(this.currentAducation)
            this.currentDegree = (this.currentAducation == -1) ? this.formData.degree : undefined
          } else {
            this.currentAducation = null;
          }
          //简介描述数据处理
          if (this.formData.introduction) {
            this.detailData = [];
            this.detailData.push(JSON.parse(this.formData.introduction))
          }
          if (this.formData.school) {
            this.detailData2 = [];
            this.detailData2.push(JSON.parse(this.formData.school))
          }
          if (this.formData.philosophy) {
            this.detailData3 = [];
            this.detailData3.push(JSON.parse(this.formData.philosophy))
          }
        })
      },
      //修改初始教龄
      changeInitAge() {
        this.formData.teachAge = this.initMoth;
        this.subData();
        this.visible2 = false
      },
      selectAducation(item, index) {
          alert(item)
        if (this.adu_teacher_adit) {
          this.currentAducation = index;
          this.formData.degree = item;
          console.log(this.formData.degree);
          this.subData()
        } else {
          return
        }

      },
      otherDegree() {
        if (this.adu_teacher_adit) {
          this.currentAducation = -1;
          this.formData.degree = this.currentDegree;
          console.log(this.formData.degree)
        } else {
          return
        }

      },
      editCnText(arg, num, list) {
        if (this.adu_teacher_adit) {
          if (list === 1) {
            this.$set(this.detailData[num], 'cnShow', true);
          } else if (list === 2) {
            this.$set(this.detailData2[num], 'cnShow', true);
          } else {
            this.$set(this.detailData3[num], 'cnShow', true);
          }
        } else {
          return
        }
        console.log(this.detailData)
      },
      editEnText(arg, num, list) {
        if (this.adu_teacher_adit) {
          if (list === 1) {
            this.$set(this.detailData[num], 'enShow', true);
          } else if (list === 2) {
            this.$set(this.detailData2[num], 'enShow', true);
          } else {
            this.$set(this.detailData3[num], 'enShow', true);
          }

        } else {
          return
        }
        console.log(this.detailData)


      },
      toggleShow(index) {
        this.show = !this.show;
        console.log(index);
        this.imgChooseNum = index;
      },
      cropUploadSuccess(jsonData, field) {
        this.$set(this.imgs[this.imgChooseNum], 'url', jsonData.filename);
        this.formData.pics = JSON.stringify(this.imgs);
        ;
        //点击上传图片后
        this.subData();
        //this.$store.commit('SET_AVATAR', jsonData.filename)

      },
      saveDetail(item, index) {
        console.log(item);
        console.log(index);
        //this.detailData
        for (let i = 0; i < this.detailData.length; i++) {
          this.detailData[i].cnShow = false;
          this.detailData[i].enShow = false;
          this.detailData2[i].cnShow = false;
          this.detailData2[i].enShow = false;
          this.detailData3[i].cnShow = false;
          this.detailData3[i].enShow = false;
        }
        this.formData.introduction = JSON.stringify(this.detailData[0]);
        this.formData.school = JSON.stringify(this.detailData2[0]);
        this.formData.philosophy = JSON.stringify(this.detailData3[0]);
        this.subData()
      },
      subData() {
        this.formData.dutyType = parseInt(this.formData.dutyType);
        console.log(this.formData.dutyType);
        //上传之前，sex--true---1
        if (this.formData.sex) {
          this.formData.sex = 1;
        } else {
          this.formData.sex = 0;
        }
        //提交前指控
        if (this.initMoth) {
          this.formData.teachAge = this.initMoth;
        } else {
          this.formData.teachAge = null;
        }

        editTeacherDetails(this.formData)
          .then(response => {
            console.log(response.data);
            this.initMoth = null;
            this.formData.teachAge = null;
            this.$message.success('修改成功！');
            this.getData();
          })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../aom/index.scss';

  ul, li {
    padding: 0;
    margin: 0;
    list-style: none
  }

  .app-container {
    .section-1 {
      .teacher-info {
        .el-form-item {
          marign-bottom: 16px !important;
        }
      }
      .teacher-pics {
        text-align: right;
        .img-div {
          display: inline-block;
          width: 220px;
          height: 308px;
          margin-left: 40px;
          background-color: gray;
          overflow: hidden;
          position: relative;
          border: 1px solid #cccccc;
          border-radius: 6px;
          img {
            width: 100%;
            height: 100%;
          }
          .choose-btn {
            position: absolute;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, .4);
          }
        }
      }
    }
    .basic-set {
      margin-top: 50px;
      .basic-list {
        height: 40px;
        line-height: 40px;
        border-left: 4px solid #cccccc;
        text-align: center;
      }
      .border-r {
        border-right: 4px solid #cccccc;
      }
    }
    .educations {
      margin-top: 40px;
      .education {
        margin-top: 20px;
        li {
          display: inline-block;
          height: 40px;
          line-height: 40px;
          border: 1px solid #cccccc;
          padding: 0 20px;
          margin: 10px 10px;
          cursor: pointer;
        }
        .active {
          background: #85ce61;
          border-color: #85ce61;
          color: #ffffff;
        }
        .last-degree {
          inut {

          }
        }
      }
    }
    .detail-boxs {
      border: 1px solid #cccccc;
      border-radius: 6px;
      height: 200px;
      margin-bottom: 50px;
      margin-top: 20px;
      overflow: hidden;
      .detail-box {
        height: 200px;
        padding: 5px 10px;
        .detail-1 {
          height: 100px;
          line-height: 20px;
          overflow-y:auto;
          > div {
            cursor: pointer;
          }
          .el-textarea__inner, .text-a {
            outline: none;
            border: none;
          }
        }
      }
      .detail-box-2 {
        height: 100%;
        .text-btn {
          width: 200px;
          height: 200px;
        }
      }
    }

  }

  .pdf-container {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1999;
    .box {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      position: relative;
      .pdf-box {
        width: 1000px;
        height: 1543px;
        margin: 20px auto;
        background: #f3f3f3;
        overflow: hidden;
        font-size: 22px;
        .top {
          width: 1000px;
          height: 248px;
          background: url("pdf-topbg.gif") no-repeat;
          position: relative;
          padding: 140px 0 0 65px;
          box-shadow: 0 0 20px #666;
          img {
            position: absolute;
            right: 100px;
            top: 65px;
          }
          div {
            overflow: hidden;
            span {
              font-size: 70px;
              color: white;
              float: left;
            }
            i {
              display: block;
              width: 76px;
              height: 21px;
              float: left;
              margin-top: 40px;
              margin-left: 10px;
              &.man {
                background: url("man.png") no-repeat;
              }
              &.woman {
                background: url("woman.png") no-repeat;
              }
            }
          }
        }
        .bottom {
          width: 870px;
          margin-left: 65px;
          .infor {
            padding-top: 50px;
            margin-bottom: 30px;
            .p {
              overflow: hidden;
              height: 80px;
              line-height: 80px;
              div {
                float: left;
                .color-oran {
                  color: #ff5400;
                  font-weight: bolder;
                }
              }
            }

          }
          .dl {
            dl {
              dt {
                font-size: 22px;
                font-weight: bolder;
                border-left: 10px solid #ff6100;
                height: 25px;
                line-height: 25px;
                padding-left: 10px;
              }
              dd {
                width: 870px;
                height: 250px;
                background: white;
                margin: 0;
                margin-top: 20px;
                color: #626262;
                padding: 10px 20px;
                .en {
                  line-height: 26px;
                  max-height: 130px;
                  overflow: hidden;
                  font-size: 16px;
                }
                .line {
                  margin-top: 8px;
                  border-bottom: 1px solid #ccc;
                  margin-bottom: 8px;
                }
                .cn {
                  line-height: 28px;
                  font-size: 14px;
                  max-height: 84px;
                  overflow: hidden;
                }
              }
            }
          }
          .imgs {
            div {
              float: left;
              margin-right: 15px;
              width: 280px;
              height: 210px;
              background: white;
              &:last-child {
                margin-right: 0;
              }
              img {
                width: 280px;
                height: 373px;
              }
            }
          }
        }
      }
    }

  }
</style>
