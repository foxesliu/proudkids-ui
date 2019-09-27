<template>
  <div class="refundCourse">
    <header-box :userInfo="userInfo"></header-box>
    <el-table :key='tableKey' :data="listData" v-loading="listLoading" element-loading-text="正在加载中" border fit
              style="width: 100%">
      <el-table-column align="center" label="课程类型" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.itermType | filterClassType}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="班级创建时间" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.createTime | filterTime}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="中教老师" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.chineseTeacherName}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="外教老师" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.foreignTeacherName}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="班级类型名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.classTypeName}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="上课时间" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.startTime | filterTime}} {{scope.row.classTime}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="班级开始日期" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.startTime | filterTime}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="班级结束日期" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.endTime | filterTime}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="每周上课时间" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.weekPointDesc}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="选择班级" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-radio :label="scope.row.classId" v-model="classId"
                    @change.native="chooseClassId(scope.$index,scope)">选择
          </el-radio>
        </template>
      </el-table-column>

    </el-table>
    <el-row>
      <el-col :span="24">
        <el-form
          :model="formData" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm mt20">
          <el-form-item label="剩余课时">
            <el-row>
              <el-col :span="6">
                <el-input placeholder="剩余课时" disabled="disabled" v-model="restlength"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="退课课时" prop="refund">
            <el-row>
              <el-col :span="6">
                <el-input v-model="formData.refund" placeholder="退课课时"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="退课理由" prop="remark">
            <el-input type="textarea" :rows="5" placeholder="退课理由" v-model="formData.remark"></el-input>
          </el-form-item>
          <el-form-item label="退款方式" prop="payInfo">
            <el-input type="textarea" :rows="5" placeholder="退款方式" v-model="formData.payInfo"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定提交</el-button>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {ruserClassInfoList, refundCourse} from '@/api/detail' // 查询学生的班级信息，退课
  import {closeViewTags} from '@/utils/index';
  import header from '../components/header'

  export default {
    components: {
      'header-box': header
    },
    data() {
      return {
        listLoading: false,
        listData: [],
        isCurrent: 0,//0默认当前班级 1所有班级
        tableKey: 0,
        userInfo: {},  //用户信息
        restlength: '', //剩余课时
        phone: '',
        classId: '',//班级id
        itermType: '',
        formData: {
          refund: '',//退课课时
          remark: '',//描述
          payInfo: '' //退款方式
        },
        rules: {
          refund: [
            {required: true, message: '请输入退课课时', trigger: 'blur'},
            {min: 1, max: 3, message: '输入课时过长', trigger: 'blur'},
            {
              pattern: /^[0-9]*$/,
              message: '输入课时格式不正确',
              trigger: 'blur'
            }
          ],
          remark: [
            {required: true, message: '请输入退课理由', trigger: 'blur'}
          ],
          payInfo: [
            {required: true, message: '请输入退款方式', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('detailParams'))[0]; //获取用户信息
      const {phone, ruserId} = this.userInfo;
      this.formData.ruserId = ruserId
      this.phone = phone
    },
    mounted() {
      this.getList()
    },
    filters: {
      filterTime(item) {
        if (item) {
          return item.substring(0, 10);
        }
      },
      filterClassType(val){
        const config={
          1:'长期课程',
          2:'短期课程',
          3:'体验课'
        }
        return config[val]
      }
    },
    methods: {
      chooseClassId(index, scope) {
        this.classId = scope.row.classId  //获取班级id
        this.itermType = scope.row.itermType  //获取itermType
        const {restlength} = this.listData[index]  //根据选中的班级获取剩余课时
        this.restlength = restlength
      },
      onSubmit() { //提交表单
        this.$refs.form.validate((valid) => {
          if (!this.classId) {
            this.$message.error('请选择班级');
            return
          }
          if (this.formData.refund > this.restlength) {
            this.$message.error('所填课时不能大于剩余课时');
            return
          }
          if (this.itermType == 3) {
            this.$message.error('体验课不能退课')
            return
          }
          if (valid) {
            this.refundClass();
            this.$nextTick(function () {
              this.$refs.form.resetFields();
            })
          } else {
            return false;
          }
        });
      },
      refundClass() {
        refundCourse(this.phone, this.classId, this.formData).then((res) => {
          this.listData = res.data.data
          var that = this;
          this.$notify({
            title: '成功', message: '退课成功', type: 'success', duration: 2000, onClose: function () {
              closeViewTags({'name': '退课', 'path': '/detail/refundCourse', 'title': '退课'}, that, '/detail')
            }
          });

        })
      },
      getList() {
//        isCurrent 默认0 当前班级 1 所有班级（带历史）
        ruserClassInfoList(this.phone, this.isCurrent).then((res) => {  //查询当前学生班级信息
          this.listData = res.data.data
          this.listLoading = false;
        })
      },
    },
  }
</script>

<style lang="scss">
  @import '../detail.scss';

  .refundCourse {
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
      margin-top: 20px;
      border: 2px solid #f6f6f6;
      border-radius: 10px;
      height: 564px;
      background: #fff;
    }
  }
</style>
