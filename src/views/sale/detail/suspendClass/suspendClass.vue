<template>
  <div class="stopClass">
    <header-box :userInfo="userInfo"></header-box>
    <el-main>
      <el-row>
        <el-col :span="24">
          <el-form ref="form" :model="formData" :rules="rules" label-width="200px" size="mini">
            <el-form-item label="剩余课时:">
              <el-row>
                <el-col :span="6">
                  <el-input v-model="restlength" placeholder="最大144" disabled></el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <!--<el-form-item label="选择停课课时:" prop="periods">-->
            <!--<el-row>-->
            <!--<el-col :span="6">-->
            <!--<el-input v-model="formData.periods" placeholder="停课课时"></el-input>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--</el-form-item>-->

            <el-form-item label="选择停课开始时间:" prop="startTime">
              <el-row>
                <el-col :span="6">
                  <el-date-picker
                    v-model="formData.startTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :picker-options="startPickerOptions">
                  </el-date-picker>
                </el-col>
              </el-row>

            </el-form-item>

            <el-form-item label="选择停课结束时间:" prop="endTime">
              <el-row>
                <el-col :span="6">
                  <el-date-picker
                    v-model="formData.endTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :picker-options="endPickerOptions">
                  </el-date-picker>
                </el-col>
              </el-row>

            </el-form-item>


            <el-form-item label="备注(Remarks):" :inline="true" prop="remark">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="formData.remark">
              </el-input>
            </el-form-item>

            <el-form-item size="large" class="submit" style="margin-left: 0">
              <el-button type="primary" @click="onSubmit" class="submit">确定行动</el-button>
            </el-form-item>

          </el-form>

        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
  import {closeViewTags} from '@/utils/index';
  import {parseTime} from '@/utils/index';
  import header from '@/views/sale/detail/components/header'
  import {mapGetters} from 'vuex'
  import {stopClassCourse} from '@/api/teachers'
  import {ruserClassInfoList} from '@/api/detail'

  export default {
    components: {
      'header-box': header
    },
    data() {
      return {
        userInfo: {},
        isCurrent: 0,//0默认当前班级 1所有班级
        restlength: '', //剩余课时
        phone: '',
        stopTime: '',
        formData: {
          periods: 0,  // 停课课时
          startTime: '', //停课开始时间（YYYYMMDD）
          endTime: '',//停课结束时间（YYYYMMDD）
          remark: ''  //描述备注
        },
        rules: {
          startTime: [
            {required: true, message: '请选择停课开始时间', trigger: 'change'}
          ],
          endTime: [
            {required: true, message: '请选择停课结束时间', trigger: 'change'}
          ],
          remark: [
            {required: true, message: '请选择停课结束时间', trigger: 'blur'}
          ]

        },
        startPickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        endPickerOptions: {
          disabledDate: (time) => {
            let beginDateVal = new Date(this.formData.startTime).getTime()
            if (beginDateVal) {
              return (time.getTime() <= beginDateVal)
            }
          }
        },
      }
    },
    computed: {
      ...mapGetters(['detailPhone', 'detailType', 'detailInfo', 'ruserInfo', 'courseName', 'schedulePoint']),
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('detailParams'))[0]; //获取用户信息
      const {phone, ruserId} = this.userInfo;
      this.phone = phone
      this.getList()
    },
    mounted() {
    },
    methods: {
      onSubmit() { //提交表单
        this.$refs.form.validate((valid) => {
          let startDateTime = new Date(this.formData.startTime).getTime();
          let endDateTime = new Date(this.formData.endTime).getTime();
          if ((endDateTime - startDateTime) < (24 * 60 * 60 * 1000)) {
            this.$message.error('停课结束时间要比停课开始时间大一天');
            return
          }
          if (valid) {
            this.formData.jsonStr = JSON.stringify(this.formData.jsonStr);
            this.stopClass();
            this.$nextTick(function () {
              this.$refs.form.resetFields();
            })
          } else {
            return false;
          }
        });

      },
      stopClass() {
        stopClassCourse(this.formData, this.phone).then((res) => {
          var that = this;
          this.$notify({
            title: '成功', message: '停课成功', type: 'success', duration: 2000, onClose: function () {
              closeViewTags({'name': '停课', 'path': '/detail/suspendClass', 'title': '停课'}, that, '/detail')
            }
          });
        })
      },
      getList() {
        //        isCurrent 默认0 当前班级 1 所有班级（带历史）
        ruserClassInfoList(this.phone, this.isCurrent).then((res) => {  //查询当前学生班级信息
          this.listData = res.data.data
          if (this.listData.length > 0) {
            this.restlength = this.listData[0].restlength
          }
        })
      },
    }
  }
</script>

<style lang="scss">
  @import '../../detail/detail.scss';

  .stopClass {
    @include detail-container();
    @include btn();

    .el-row {
      padding-left: 5px;
    }

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

    .el-main {
      margin-top: 20px;
      border: 2px solid #f6f6f6;
      border-radius: 10px;
      height: 564px;
      background: #fff;
    }

    .payOrder {
      .el-input {
        display: flex;
      }
    }

    .submit {
      display: flex;
      justify-content: center;
      margin-left: 0;

      button {
        margin-left: -200px;
      }
    }
  }
</style>
