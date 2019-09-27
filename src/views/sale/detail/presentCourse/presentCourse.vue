<template>
  <div class="presentCourse">
    <header-box :userInfo="userInfo"></header-box>
    <el-main class="pt30">
      <el-row>
        <el-col :span="24">
          <el-form ref="form" :model="formData" :rules="rules" label-width="200px" size="mini">
            <el-form-item label="赠送课时:" prop="present">
              <el-row>
                <el-col :span="6">
                  <el-input type="text" v-model="formData.present" placeholder="课时"></el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="赠课理由:" prop="reason">
              <el-col :span="6">
                <el-select v-model="formData.reason" placeholder="请选择赠课理由">
                  <el-option
                    v-for="item in presentOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="备注:" prop="remark">
              <el-input type="textarea" :rows="5" v-model="formData.remark"></el-input>
            </el-form-item>

            <el-form-item size="large">
              <el-button type="primary" @click="onSubmit">确定提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {closeViewTags} from '@/utils/index';
  import {presentCourse} from '@/api/detail' // 赠课
  import header from '../components/header'

  export default {
    components: {
      'header-box': header
    },
    data() {
      return {
        userInfo: {},
        phone: '',
        formData: {
          present: '', //赠送课时
          remark: '', //备注描述
          reason: ''  //赠课理由
        },
        presentOptions: '',      //赠课理由
        rules: {
          present: [
            {required: true, message: '请输入赠课课时', trigger: 'blur'},
            {min: 1, max: 5, message: '输入课时过长', trigger: 'blur'},
            {
              pattern: /^[0-9]*$/,
              message: '输入课时格式不正确',
              trigger: 'blur'
            }
          ],
          reason: [
            {required: true, message: '请选择赠课理由', trigger: 'change'}
          ],
          remark: [
            {required: true, message: '请输入备注内容', trigger: 'blur'}
          ]
        },
      }
    },
    computed: {
      ...mapGetters(['present', 'schedulePoint'])

    },
    created() {
      this.presentOptions = this.present;  //赠课下拉

      this.userInfo = JSON.parse(sessionStorage.getItem('detailParams'))[0];  //获取用户信息

      const {phone} = this.userInfo;
      this.phone = phone;   //获取手机号
    },
    mounted() {
      console.log('present' + this.present)
    },
    methods: {
      onSubmit() { //提交表单
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.presentClass();
            this.$nextTick(function () {
              this.$refs.form.resetFields();
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      presentClass() {  //赠课
        presentCourse(this.phone, this.formData).then((res) => {
          var that = this;

          this.$notify({
            title: '成功', message: '赠课成功', type: 'success', duration: 2000, onClose: function () {
              closeViewTags({'name': '赠课', 'path': '/detail/presentCourse', 'title': '赠课'}, that, '/detail')
            }
          });
        }).catch((res) => {
          console.log(res)
        })

      },
      resetForm() {  //重置
        return this.formData = {
          present: '',
          remark: '',
          reason: ''
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../detail.scss';

  .presentCourse {
    @include detail-container();
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
  }
</style>
