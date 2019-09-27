<template>
  <div class="classManage">
    <div class="search_middle" v-if="isSearchShow">
      <div class="formData">
        <el-row :gutter="20" v-if="teacherType==1">
          <el-col :span="4">
            <span style="color: #707070;display: inline-block"
                  class="mt5">{{$t('i18nView.classManage.selectTitle')}}</span>
          </el-col>
          <el-col :span="6">
            <el-select v-model="formData.foreignTeacherRegionId"
                       placeholder="外教大区" size="small"
                       :disabled="foreignTeacherRegionFlag">
              <el-option
                v-for="item in foreignTeachersData.child"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="formData.foreignTeacherGroupId"
                       placeholder="外教组" size="small"
                       :disabled="foreignTeacherGroupFlag">
              <el-option
                v-for="item in foreignTeachersGroupData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="formData.foreignTeacherId"
                       placeholder="外教" size="small"
                       :disabled="foreignTeacherFlag">
              <el-option
                v-for="item in foreignTeachersMemberData"
                :key="item.userId"
                :label="item.username"
                :value="item.userId">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row :gutter="20" v-if="teacherType==0">
          <el-col :span="4">
            <span style="color: #707070;display: inline-block"
                  class="mt5">{{$t('i18nView.classManage.selectTitle')}}</span>
          </el-col>
          <el-col :span="6">
            <el-select v-model="formData.chineseTeacherRegionId"
                       placeholder="中教大区" size="small"
                       :disabled="chineseTeacherRegionFlag">
              <el-option
                v-for="item in chineseTeachersData.child"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="formData.chineseTeacherGroupId"
                       placeholder="中教组" size="small"
                       :disabled="chineseTeacherGroupFlag">
              <el-option
                v-for="item in chineseTeachersGroupData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="formData.chineseTeacherId"
                       placeholder="中教" size="small"
                       :disabled="chineseTeacherFlag">
              <el-option
                v-for="item in chineseTeachersMemberData"
                :key="item.userId"
                :label="item.username"
                :value="item.userId">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

      </div>
      <div class="btn mb30">
        <el-col :span="6">
          <el-button @click="searchClasses" size="small">{{$t('i18nView.searchBtnName')}}</el-button>
        </el-col>
      </div>
    </div>
    <div class="box">
      <div class="outer mr30" v-for="(item,index) in options" :key="index">
        <p class="fs14">{{item.label}}</p>
        <div class="inner" @click="goToChineseClassing(item.stage,item.status,item.itemType,formData.chineseTeacherId)"
             v-if="teacherType==0">
          <p>
            <span class="num org fs20">{{item['value']}}</span>
            <span class="fs14 org">{{$t('i18nView.classManage.numName')}}</span>
          </p>
        </div>

        <div class="inner" @click="goToForeignClassing(item.stage,item.status,item.itemType,formData.foreignTeacherId)"
             v-if="teacherType==1">
          <p>
            <span class="num org fs20">{{item['value']}}</span>
            <span class="fs14 org">{{$t('i18nView.classManage.numName')}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import local from '@/views/i18n-demo/local'

  const viewName = 'i18nView'

  import {mapGetters} from 'vuex'
  import Cookies from 'js-cookie'
  import {getTeachersByDeptId, getClassTypeItems, getWeekTimeItems, getClasses, getClassesCount} from '@/api/teachers'

  export default {
    data() {
      return {
        teacherId: null,
        deptId: null,
        teacherType: null,
        isSearchShow: true,
        chineseTeacherRegionFlag: false,
        chineseTeacherGroupFlag: false,
        chineseTeacherFlag: false,
        foreignTeacherRegionFlag: false,
        foreignTeacherGroupFlag: false,
        foreignTeacherFlag: false,
        chineseTeachersData: [],
        chineseTeachersGroupData: [],
        chineseTeachersMemberData: [],
        foreignTeachersData: [],
        foreignTeachersGroupData: [],
        foreignTeachersMemberData: [],
        formData: {
          chineseTeacherId: null,  //中教ID
          chineseTeacherName: null,  //中教姓名
          chineseTeacherGroupId: null,  //中教所在组ID
          chineseTeacherGroupName: null,  //中教所在组名称
          chineseTeacherRegionId: null,  //中教所在大区ID
          chineseTeacherRegionName: null,  //中教所在大区名称

          foreignTeacherId: null,  //外教ID
          foreignTeacherName: null,  //外教姓名
          foreignTeacherGroupId: null,  //外教所在组ID
          foreignTeacherGroupName: null,  //外教所在组名称
          foreignTeacherRegionId: null,  //外教所在大区ID
          foreignTeacherRegionName: null,  //外教所在大区名称
        },

        options: [{
          value: '',
          label: '进行中长期班级',
          stage: 0,
          status: 0,
          itemType: 1
        }, {
          value: '',
          label: '已结束长期班级',
          stage: 1,
          status: 0,
          itemType: 1
        }, {
          value: '',
          label: '已关闭长期班级',
          status: 1,
          itemType: 1
        }, {
          value: '',
          label: '进行中短期班级',
          stage: 0,
          status: 0,
          itemType: 2
        }, {
          value: '',
          label: '已结束短期班级',
          stage: 1,
          status: 0,
          itemType: 2
        }, {
          value: '',
          label: '已关闭短期班级',
          status: 1,
          itemType: 2
        },
        {
          value: '',
          label: '进行中体验课班级',
          stage: 0,
          status: 0,
          itemType: 3
        },
        {
          value: '',
          label: '已结束体验课班级',
          stage: 1,
          status: 0,
          itemType: 3
        },
        {
          value: '',
          label: '已关闭体验课班级',
          status: 1,
          itemType: 3
        }],
      }
    },
    computed: {
      ...mapGetters(['roleIds', 'userId'])
    },
    async created() {
      if (!this.$i18n.getLocaleMessage('en')[viewName]) {
        this.$i18n.mergeLocaleMessage('en', local.en)
        this.$i18n.mergeLocaleMessage('zh', local.zh)
      }

      let [roleId] = this.roleIds;
      this.teacherId = this.userId;
      if (roleId == 20 || roleId == 21 || roleId == 22 || roleId == 31) {
        this.teacherType = 0; //中教
        this.$i18n.locale = 'zh'
        this.$store.dispatch('setLanguage', 'zh')
        this.options = this.$i18n.messages.zh.i18nView.classManage.options
        if (roleId == 20) {
          this.isSearchShow = false
        }

        const result = await getTeachersByDeptId(2)  //获取中教
        if (result) {
          this.chineseTeachersData = result.data.data
          this.initChineseSelectOPtions();
          this.getNumber()
        }
      } else if (roleId == 23 || roleId == 24 || roleId == 25 || roleId == 32) {
        this.teacherType = 1; //外教
        this.$i18n.locale = 'en'
        this.$store.dispatch('setLanguage', 'en')
        this.options = this.$i18n.messages.en.i18nView.classManage.options
        if (roleId == 23) {
          this.isSearchShow = false
        }
        const result = await getTeachersByDeptId(11)  //获取外教
        if (result) {
          this.foreignTeachersData = result.data.data
          this.initForeignSelectOPtions();
          this.getNumber()
        }
      }
    },
    methods: {
      searchClasses() {  //查询
        let [roleId] = this.roleIds;
        // if (roleId == 21 || roleId == 22 || roleId == 31) { //中教查询
        //   if (this.formData.chineseTeacherGroupId) {
        //     this.deptId = this.formData.chineseTeacherGroupId
        //   } else if (this.formData.chineseTeacherRegionId) {
        //     this.deptId = this.formData.chineseTeacherRegionId
        //   }
        //   if (this.formData.chineseTeacherId) {
        //     this.teacherId = this.formData.chineseTeacherId
        //   }
        // }

        // if (roleId == 24 || roleId == 25 || roleId == 32) { //外教查询
        //   if (this.formData.foreignTeacherGroupId) {
        //     this.deptId = this.formData.foreignTeacherGroupId
        //   } else if (this.formData.foreignTeacherRegionId) {
        //     this.deptId = this.formData.foreignTeacherRegionId
        //   }
        //   if (this.formData.foreignTeacherId) {
        //     this.teacherId = this.formData.foreignTeacherId
        //   }
        // }

        this.getNumber() //个数查询
      },
      initChineseSelectOPtions() { //中教初始化
        this.chineseTeachersData.child.forEach((grandparent) => {
          grandparent.users.forEach(item => {
            if (item.userId == this.userId) {
              this.chineseTeacherRegionFlag = true
              this.formData.chineseTeacherRegionId = grandparent.id
            }
          })
          if (grandparent.id == this.userId) {
            // console.log('大区' + grandparent.id)
          } else {
            grandparent.child.forEach(parent => {
              if (parent.id == this.userId) {
                // console.log('组长' + parent.name)
              } else {
                parent.users.forEach((item) => {
                  if (item.userId == this.userId) {
                    if (item.roleId == 20) {
                      this.chineseTeacherRegionFlag = true
                      this.chineseTeacherGroupFlag = true
                      this.chineseTeacherFlag = true
                    } else if (item.roleId == 21) {
                      this.chineseTeacherRegionFlag = true
                      this.chineseTeacherGroupFlag = true
                    }
                    if (item.roleId == 21) {
                      this.formData.chineseTeacherId = null
                    } else {
                      this.formData.chineseTeacherId = item.userId
                    }
                    this.formData.chineseTeacherGroupId = parent.id
                    this.formData.chineseTeacherRegionId = grandparent.id
                  }
                })
              }
            })
          }
        })
      },
      initForeignSelectOPtions() { //外教初始化
        this.foreignTeachersData.child.forEach((grandparent) => {
          grandparent.users.forEach(item => {
            if (item.userId == this.userId) {
              this.foreignTeacherRegionFlag = true
              this.formData.foreignTeacherRegionId = grandparent.id
            }
          })
          if (grandparent.id == this.userId) {
            // console.log('大区' + grandparent.id)
          } else {
            grandparent.child.forEach(parent => {
              if (parent.id == this.userId) {
                // console.log('组长' + parent.name)
              } else {
                parent.users.forEach((item) => {
                  if (item.userId == this.userId) {
                    if (item.roleId == 23) {
                      this.foreignTeacherRegionFlag = true
                      this.foreignTeacherGroupFlag = true
                      this.foreignTeacherFlag = true
                    } else if (item.roleId == 24) {
                      this.foreignTeacherRegionFlag = true
                      this.foreignTeacherGroupFlag = true
                    }
                    if (item.roleId == 24) {
                      this.formData.foreignTeacherId = null
                    } else {
                      this.formData.foreignTeacherId = item.userId
                    }
                    this.formData.foreignTeacherGroupId = parent.id
                    this.formData.foreignTeacherRegionId = grandparent.id
                  }
                })
              }
            })
          }
        })
      },
      goToChineseClassing(stage = '', status, itemType, chineseTeacherId = '') { //中教
        if (!chineseTeacherId) {
          chineseTeacherId = ''
        }
        Cookies.set('stage', stage)
        Cookies.set('status', status)
        Cookies.set('itemType', itemType)
        Cookies.set('chineseTeacherId', chineseTeacherId)
        this.$router.push({
          path: 'classing', query: {
            stage: stage,
            status: status,
            itemType: itemType,
            chineseTeacherId: chineseTeacherId
          }
        })
      },
      goToForeignClassing(stage = '', status, itemType, foreignTeacherId = '') { //外教
        if (!foreignTeacherId) {
          foreignTeacherId = ''
        }
        Cookies.set('stage', stage)
        Cookies.set('status', status)
        Cookies.set('itemType', itemType)
        Cookies.set('foreignTeacherId', foreignTeacherId)
        this.$router.push({
          path: 'classing', query: {
            stage: stage,
            status: status,
            itemType: itemType,
            foreignTeacherId: foreignTeacherId
          }
        })
      },
      getNumber() {
        //stage =>班级级别 0：未过期 1：已过期
        //status =>班级状态 0：未关闭 1:已关闭
        //type =>班级类型长短期 1：长期 2：短期
        getClassesCount({
          stage: 0,
          status: 0,
          type: 1,
          ...this.formData
        }).then((res) => { //进行中长期班级
          this.options[0].value = res.data;
        });
        getClassesCount({
          stage: 1,
          status: 0,
          type: 1,
          ...this.formData
        }).then((res) => { //已结束长期班级
          this.options[1].value = res.data;
        });
        getClassesCount({
          status: 1,
          type: 1,
          ...this.formData
        }).then((res) => { //已关闭长期班级
          this.options[2].value = res.data;
        });
        getClassesCount({
          stage: 0,
          status: 0,
          type: 2,
          ...this.formData
        }).then((res) => { //进行中短期班级
          this.options[3].value = res.data;
        });
        getClassesCount({
          stage: 1,
          status: 0,
          type: 2,
          ...this.formData
        }).then((res) => { //已结束短期班级
          this.options[4].value = res.data;
        });
        getClassesCount({
          status: 1,
          type: 2,
          ...this.formData
        }).then((res) => { //已关闭短期班级
          this.options[5].value = res.data;
        });
        //体验课
        getClassesCount({
          stage: 0,
          status: 0,
          type: 3,
          ...this.formData
        }).then((res) => { //进行中体验课班级
          this.options[6].value = res.data;
        });
        getClassesCount({
          stage: 1,
          status: 0,
          type: 3,
          ...this.formData
        }).then((res) => { //已结束体验课班级
          this.options[7].value = res.data;
        });
        getClassesCount({
          status: 1,
          type: 3,
          ...this.formData
        }).then((res) => { //已关闭体验课班级
          this.options[8].value = res.data;
        });
      }
    },
    watch: {
      'formData.createTime': {
        handler(val, oldVal) {//          orderByField	createTime  asc  //由近到远  true
          if (val == 'true' || val == 'false') {
            this.formData.orderByField = 'createTime'
            this.formData.asc = val
          }
        },
        deep: true
      },
      'formData.chineseTeacherRegionId'(newVal, oldVal) {
        if (newVal && oldVal) {
          this.formData.chineseTeacherGroupId = ''
          this.formData.chineseTeacherId = ''
        }
        let arr = this.chineseTeachersData.child.filter((item) => {
          return item.id == newVal
        })
        this.chineseTeachersGroupData = arr[0].child
      }, 'formData.foreignTeacherRegionId'(newVal, oldVal) {
        if (newVal && oldVal) {
          this.formData.foreignTeacherGroupId = ''
          this.formData.foreignTeacherId = ''
        }
        let arr = this.foreignTeachersData.child.filter((item) => {
          return item.id == newVal
        })
        this.foreignTeachersGroupData = arr[0].child
      },
      'formData.chineseTeacherGroupId'(newVal, oldVal) {
        if (newVal && oldVal) {
          this.formData.chineseTeacherId = ''
        }
        let arr = this.chineseTeachersGroupData.filter((item) => {
          return item.id == newVal
        })
        if (arr.length) {
          if (arr[0].users) {
            this.chineseTeachersMemberData = arr[0].users.filter(item => {
              return item.roleId != 21
            })
          }
        }
      }, 'formData.foreignTeacherGroupId'(newVal, oldVal) {
        if (newVal && oldVal) {
          this.formData.foreignTeacherId = ''
        }
        let arr = this.foreignTeachersGroupData.filter((item) => {
          return item.id == newVal
        })
        if (arr.length) {
          if (arr[0].users) {
            this.foreignTeachersMemberData = arr[0].users.filter(item => {
              return item.roleId != 21
            })
          }
        }
      },
      'formData.chineseTeacherId'(newVal, oldVal) {
        this.formData.chineseTeacherId = newVal
      },
      'formData.foreignTeacherId'(newVal, oldVal) {
        this.formData.foreignTeacherId = newVal
      },
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../sale/detail/detail.scss';

  .classManage { //@include调用
    @include detail-container();
    @include btn();

    .search_middle {
      display: flex;
      align-items: center;
      background: #ffffff;
      border-radius: 10px;
      margin-bottom: 26px;
      padding: 24px 0 0 32px;

      .el-row:nth-of-type(1) {
        margin-bottom: 24px;
      }
    }

    .box {
      display: flex;
      flex-wrap: wrap;
    }

    .outer {
      width: 168px;
      height: 200px;
      background: #f6f6f6;
      border: 2px solid #f0f0f0;
      border-radius: 10px;
      margin-bottom: 10px;

      p {
        padding: 20px 0 17px 0;
        text-align: center;
        color: #606060;
      }

      .inner {
        width: 128px;
        height: 118px;
        background: #fff;
        border-radius: 7px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 17px;

        .num {
          font-size: 16px;
        }
      }
    }

    .inner:hover {
      box-shadow: 0 0 7px #dfdfdf;
      cursor: pointer;
    }
  }


</style>
