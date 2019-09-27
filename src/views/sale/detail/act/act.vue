<template>
  <div class="act">
    <header-box :userInfo="userInfo"></header-box>
    <el-main>
      <el-row>
        <el-col :span="24">
          <el-form ref="form" :model="formData" :rules="rules" label-width="200px" size="mini">
            <el-form-item label="报废例子:" v-if="DUMPING_BILLS_FLAG">
              <el-checkbox v-model="formData.scrapped" @change="scrapped">报废例子</el-checkbox>
            </el-form-item>
            <!--<el-form-item label="报废例子:">-->
            <!--<el-checkbox v-model="formData.scrapped">报废例子</el-checkbox>-->
            <!--</el-form-item>-->
            <el-form-item label="行动阶段:" prop="stage">
              <el-select v-model="formData.stage" placeholder="请选择行动阶段">
                <el-option
                  v-for="item in stageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="行动状态:" prop="stat">
              <el-select v-model="formData.stat" placeholder="请选择行动状态">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="编辑行动:" prop="content">
              <el-input type="textarea" :rows="5" v-model="formData.content"></el-input>
            </el-form-item>

            <el-form-item label="下次联系时间:" prop="remindTime" :rules="[
             {required : remindFlag?true:false, message: '请选择日期', trigger: 'change'}
            ]">
              <el-date-picker v-model="formData.remindTime"
                              type="datetime"
                              @change="formateTime"
                              format="yyyy-MM-dd HH:mm:ss"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="选择日期"
                              :picker-options="pickerOptionsDate">
              </el-date-picker>

              <el-checkbox v-model="formData.remind" prop="remind" @change="noRemind">不提醒</el-checkbox>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="onSubmit">确定行动</el-button>
            </el-form-item>
          </el-form>

        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
  import header from '../components/header'
  import {mapGetters} from 'vuex'
  import {editAct} from '@/api/detail' // 編輯行動
  import {closeViewTags} from '@/utils/index';

  export default {
    components: {
      'header-box': header
    },
    data() {
      return {
        userInfo: {},
        sTime: '',
        DUMPING_BILLS_FLAG: true,
        remindFlag: false,
        formData: {
          scrapped: false,  //报废列子
          remind: true,   //是否提醒
          phone: '',
          stat: '',
          stage: '',
          content: '',
          remindTime: ''
        },
        rules: {
          stage: [
            {required: true, message: '请选择行动阶段', trigger: 'change'}
          ],
          stat: [
            {required: true, message: '请选择行动状态', trigger: 'change'}
          ],
          content: [
            {required: true, message: '请输入编辑行动内容', trigger: 'blur'}
          ],
//          remindTime: [
//            {required: this.remindFlag ? true : false, message: '请选择日期', trigger: 'change'}
//          ]
        },
        stageOptions: '',
        statusOptions: '',
        pickerOptionsDate: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        }
      }
    },
    computed: {
      ...mapGetters(['NEW_BILLS_STAGE', 'NEW_BILLS_STATUS', 'OLD_BILLS_STAGE', 'OLD_BILLS_STATUS', 'DUMPING_BILLS_STAGE', 'DUMPING_BILLS_STATUS',
        'PAY_BILLS_STAGE', 'PAY_BILLS_STATUS', 'NO_RENEWS_BILLS_STAGE', 'NO_RENEWS_BILLS_STATUS', 'detailType'])
    },
    created() {
      this.formData.phone = this.$route.query.phone || sessionStorage.getItem('detailPhone')  //存储手机
      this.type = sessionStorage.getItem('exampleType')
      console.log(this.type)
      this.getStageOptions(this.type)

      this.userInfo = JSON.parse(sessionStorage.getItem('detailParams'))[0]
    },

    methods: {
      onSubmit() { //提交表单
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.getList();
            this.$nextTick(function () {
              this.$refs.form.resetFields();
            })
          } else {
            return false;
          }
        });

      },
      getList() { //编辑行动
        editAct(this.formData).then((res) => {
          var that = this;
          this.$notify({
            title: '成功', message: '编辑行动成功', type: 'success', duration: 2000, onClose: function () {
              closeViewTags({'name': '行动', 'path': '/detail/act', 'title': '行动'}, that, '/detail')
              console.log(that)
            }
          });
        }).catch((res) => {
          console.log(res)
        })
      },
      formateTime(val) { //格式化时间
        this.formData.remindTime = val;
        if (val) {
          this.formData.remind = false
        }
      },
      noRemind() {  //不提醒
        console.log(this.remindFlag)
        this.remindFlag = !this.remindFlag
        if (this.formData.remind) {
          this.formData.remindTime = ''
          this.remindFlag = ''
        }

      },
      scrapped() {
        console.log(this.formData.scrapped)
        if (this.formData.scrapped) {
          this.stageOptions = this.DUMPING_BILLS_STAGE
          this.statusOptions = this.DUMPING_BILLS_STATUS
        } else {
          this.getStageOptions(this.type)
        }
      },
      getStageOptions(type) {
        //根据type值显示级别及状态及报废例子显示
        if (type == 0) {
          this.stageOptions = this.NEW_BILLS_STAGE
          this.statusOptions = this.NEW_BILLS_STATUS
        } else if (type == 1) {
          this.stageOptions = this.OLD_BILLS_STAGE
          this.statusOptions = this.OLD_BILLS_STATUS
        } else if (type == 2) {
          this.stageOptions = this.DUMPING_BILLS_STAGE
          this.statusOptions = this.DUMPING_BILLS_STATUS
          this.DUMPING_BILLS_FLAG = false;
        } else if (type == 3) {
          this.stageOptions = this.PAY_BILLS_STAGE
          this.statusOptions = this.PAY_BILLS_STATUS
          this.DUMPING_BILLS_FLAG = false;
        } else {
          this.stageOptions = this.NO_RENEWS_BILLS_STAGE
          this.statusOptions = this.NO_RENEWS_BILLS_STATUS
          this.DUMPING_BILLS_FLAG = false;
        }
      }
    }
  }
</script>

<style lang="scss">
  .act {
    width: 100%;
    height: 100%;
    padding: 18px 18px 0 18px;
    background: #fafafa;
    margin-bottom: 20px;
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
