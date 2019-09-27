<template>
  <div class="edit">
    <div class="container">
      <el-row>
        <el-col :span="12">
          <el-form :model="formData" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
            <el-form-item label="学号:">
              <span>{{formData.ruserNo}}</span>
            </el-form-item>
            <el-form-item label="中文名字:" prop="name">
              <el-row>
                <el-col :span="16">
                  <el-input type="text" v-model="formData.name" :disabled="nameDisabled"></el-input>
                </el-col>

                <el-col :span="6" :push="2">
                  <el-button @click="changeName">修改</el-button>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="英文名字:" prop="enName">
              <el-row>
                <el-col :span="16">
                  <el-input type="text" v-model="formData.enName" :disabled="enNameDisabled"></el-input>
                </el-col>
                <el-col :span="6" :push="2">
                  <el-button @click="changeenName">修改</el-button>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="绑定手机:" prop="phone">
              <el-row>
                <el-col :span="16">
                  <el-input type="text" v-model="formData.phone" :disabled="phoneDisabled"></el-input>
                </el-col>
                <el-col :span="6" :push="2">
                  <!--<el-button @click="changePhone">修改</el-button>-->
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="级别:">
              <el-select v-model="formData.grade" placeholder="级别">
                <el-option
                  v-for="item in grade"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="渠道:">
              <span>{{formData.ccPhone}}&nbsp;&nbsp;&nbsp;&nbsp;{{formData.originChannel}}</span>
            </el-form-item>
            <el-form-item size="large">
              <el-button @click="onSubmit">确定修改</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>


</template>

<script>
  import local from '@/views/i18n-demo/local'
  const viewName = 'i18nView'
  import {mapGetters} from 'vuex'
  import {editRuser} from '@/api/detail' // 編輯學生
  import {closeViewTags} from '@/utils/index';

  export default {
    data() {
      return {
        nameDisabled: true,
        enNameDisabled: true,
        phoneDisabled: true,
        formData: {
          createTime: '',
          enName: '',
          grade: '',
          name: '',
          originChannel: '',
          punchDate: '',
          ruserId: '',
          ruserNo: '',
          updateTime: '',
          phone: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入中文名字', trigger: 'blur'},
            {min: 1, max: 32, message: '输入中文名字过长', trigger: 'blur'}
          ],
          enName: [
            {required: true, message: '请输入英文名字', trigger: 'blur'},
            {min: 1, max: 24, message: '输入英文名字过长', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入绑定手机号', trigger: 'blur'},
            {min: 1, max: 11, message: '输入手机号过长', trigger: 'blur'},
            {
              pattern: /^1[0123456789]\d{9}$/,
              message: '手机号格式不正确',
              trigger: 'blur'
            }
          ]
        },
      }
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
      } else {
        this.$i18n.locale = 'zh'
        this.$store.dispatch('setLanguage', 'zh')
      }
      this.formData = JSON.parse(sessionStorage.getItem('detailParams'))[0]
    },
    computed: {
      ...mapGetters(['detailPhone', 'detailType', 'detailInfo', 'grade','roleIds'])
    },
    methods: {
      onSubmit() {
        this.$store.commit('SET_DETAIL_PHONE', this.formData.phone)  //存储手机号
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.edit();
          } else {
            return false;
          }
        });
      },
      edit() {
        editRuser(this.formData).then(res => {
          var that = this;
          this.$notify({
            title: '成功', message: '编辑资料成功', type: 'success', duration: 2000, onClose: function () {
              closeViewTags({'name': '编辑', 'path': '/detail/edit', 'title': '编辑'}, that, '/detail')
            }
          });
        })
      },
      changeName() {
        this.nameDisabled = false
      },
      changeName() {
        this.nameDisabled = false
      },
      changeenName() {
        this.enNameDisabled = false
      },
      changePhone() {
        this.phoneDisabled = false
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../detail.scss';

  .edit {
    @include detail-container();
    @include btn();
    .container {
      height: 607px;
      border-radius: 10px;
      background: #fff;
      border: 2px solid #f6f6f6;
      padding: 77px 0 0 63px;
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
      margin-top: 20px;
      border: 2px solid #f6f6f6;
      border-radius: 10px;
      height: 564px;
      background: #fff;
    }
  }
</style>
