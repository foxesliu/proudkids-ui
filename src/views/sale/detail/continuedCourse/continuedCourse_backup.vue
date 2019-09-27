<template>
  <div class="continuedCourse">
    <div class="header mb18 pr20">
      <el-row>
        <el-col :span="6">中文名字：{{userInfo.name}}</el-col>
        <el-col :span="6">英文名字：{{userInfo.enName}}</el-col>
        <el-col :span="6">绑定手机：{{userInfo.phone}}</el-col>
        <el-col :span="6">级别：{{userInfo.grade}}</el-col>
      </el-row>
    </div>
    <div class="container">
      <div class="container-header mb10 mt10 clearfix pl10 pr10">
        <h4 class="fl pt10">现有有课时的班级</h4>
        <!--<el-button class="fr">选择在线订单</el-button>-->
      </div>

      <el-table :key='tableKey' :data="listData"
                v-loading="listLoading" element-loading-text="正在加载中" border fit
                style="width: 100%">
        <el-table-column align="center" label="课程类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.itermType==1?'长期班级':'短期班级'}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="班级创建时间" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>{{scope.row.joinClassTime}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="中教老师" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>{{scope.row.chineseTeacherName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="外教老师" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>{{scope.row.foreignTeacherName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="班级类型名称" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>{{scope.row.classTypeName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="上课时间" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>{{scope.row.classTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="班级开始日期" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>{{scope.row.startTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="班级结束日期" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>{{scope.row.endTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="每周上课时间" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>{{scope.row.weekPointDesc}}</span>
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
          <el-form ref="form" :model="formData" :rules="rules" label-width="120px" size="mini"
                   class="mt20">
            <el-form-item label="购买课时:" prop="periods">
              <el-row>
                <el-col :span="6">
                  <el-input type="text" v-model="formData.periods"></el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="支付订单号:" class="orderList">
              <el-row v-for="(item,index) in orderList" :key="index">
                <el-col :span="8" class='mr10'>
                  <el-input type="input" v-model="item.orderSn" placeholder="订单号" prop="orderSn"></el-input>
                </el-col>
                <el-col :span="3" class='mr10'>
                  <el-select v-model="item.type" placeholder="支付平台">
                    <el-option
                      v-for="item in payTypeOPtions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="3" class='mr10'>
                  <el-input type="input" v-model="item.money" placeholder="输入价格"></el-input>
                </el-col>
                <!--<el-col :span="1">-->
                <!--<el-button type="button" class="btn" @click="delItem(item)">x</el-button>-->
                <!--</el-col>-->
                <!--<el-col :span="1">-->
                <!--<el-button type="button" class="btn" @click="addItem(index)">+</el-button>-->
                <!--</el-col>-->
                <el-col :span="6">
                  <el-button v-if="index+1!=orderList.length" type="danger" class="btn" style="margin-right: 2px"
                             @click="delItem(item)">x
                  </el-button>
                  <el-button v-if="index+1==orderList.length" type="danger" class="btn" @click="addItem(index)">+</el-button>
                  <el-button @click="checkPayOrder(item)">{{item.isvalidate ? '已校验' : '订单号校验'}}</el-button>
                </el-col>
                <!--<el-col :span="1" style="display: none">-->
                <!--<el-button type="button" class="btn" @click="getItem(index)"></el-button>-->
                <!--</el-col>-->
              </el-row>
            </el-form-item>

            <el-form-item label="备注:" :inline="true" prop="remark">
              <el-input type="textarea" :rows="8" v-model="formData.remark"></el-input>
            </el-form-item>

            <el-form-item size="large" class="submitBtn">
              <el-button @click="onSubmit()" type="success">确定提交</el-button>
            </el-form-item>

          </el-form>

        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {closeViewTags} from '@/utils/index';
  import {ruserClassInfoList, continuedCourse, checkOrder} from '@/api/detail' // 編輯行動,班级类型,每周上课时间,订单校验
  export default {
    data() {
      return {
        userInfo: {},
        orderListFlag: false,
        tableKey: 0,
        listLoading: false,
        isCurrent: 0,//0默认当前班级 1所有班级
        listData: [],
        phone: '',
        orderList: [{orderSn: '', type: '', money: '', isvalidate: false}],
        classId: '',
        formData: {
//          payInfo: "{\'orderSn\':1231231211,type:\'微信支付\',money:50000}",  // 手动支付拼接支付订单信息
          payInfo: {
            orderSn: '',
            type: '',
            money: ''
          },  // 手动支付拼接支付订单信息
          periods: '',//购买课时
          remark: '', //备注
        },
        obj: '',
        value1: '',
        value2: '',
        rules: {
          periods: [
            {required: true, message: '请输入课时', trigger: 'blur'},
            {min: 1, max: 5, message: '输入课时过长', trigger: 'blur'},
            {
              pattern: /^[0-9]*$/,
              message: '输入课时格式不正确',
              trigger: 'blur'
            }
          ],
          remark: [
            {required: true, message: '请填写备注内容', trigger: 'blur'},
          ]
        },
        payTypeOPtions: [
          {
            value: '微信',
            label: '微信'
          },
          {
            value: '支付宝',
            label: '支付宝'
          },
          {
            value: '网银',
            label: '网银'
          }
        ],
      }
    },
    computed: {},
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('detailParams'))[0];
      const {phone} = this.userInfo
      this.phone = phone
    },
    mounted() {
      this.getList()
    },
    methods: {
      onSubmit() { //提交表单
        if (!this.classId) {
          this.$message.error('请选择班级');
          return
        }
        this.listValidateFlag = this.orderList.every(item => { //所有订单号是否验证
          return item.isvalidate
        })
        this.formData.payInfo = JSON.stringify(this.orderList)  //支付订单
        this.orderList.forEach(item => {
          if (!this.listValidateFlag) {
            this.$message.error('您有未校验的订单号！');
            return false
          } else if (!item.orderSn) {
            this.$message.error('请输入订单号！');
            return false
          } else if (!item.type) {
            this.$message.error('请选择支付平台！');
            return false
          } else if (!item.money) {
            this.$message.error('请输入价格！');
            return false
          } else {
            this.orderListFlag = true
          }
        })
        this.$refs.form.validate((valid) => {  //提交表单
          if (valid) {
            if (this.orderListFlag) {
              this.payClass();
              this.$nextTick(function () {
                this.$refs.form.resetFields();
              })
            }
          } else {
            return false;
          }
        });
        console.log(this.payInfo)
      },
      chooseClassId(index, scope) {
        this.classId = scope.row.classId  //获取班级id
      },
      payClass() { //购买课程
        continuedCourse(this.phone, this.classId, this.formData).then((res) => {
          var that = this;
          this.$notify({
            title: '成功', message: '续课成功', type: 'success', duration: 2000, onClose: function () {
              closeViewTags({'name': '续课', 'path': '/detail/continuedCourse', 'title': '续课'}, that, '/detail')
            }
          });
        }).catch((res) => {
          console.log(res)
        })

      },
      getList() {
//        isCurrent 默认0 当前班级 1 所有班级（带历史）
        ruserClassInfoList(this.phone, this.isCurrent).then((res) => {  //查询当前学生班级信息
          this.listData = res.data.data
          this.listLoading = false;
          console.log(this.listData)
        })
      },
      checkPayOrder(item) {  //检查订单号
        checkOrder(item.orderSn).then((res) => {
          if (res.data.data == false) {
            item.isvalidate = true
            this.$notify({
              title: '成功',
              message: '订单号校验成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: '失败',
              message: '订单号校验失败',
              type: 'error',
              duration: 2000
            })
          }
        })
      },
      addItem() {  //增加订单
        this.orderList.push({orderSn: '', type: '', money: '', isvalidate: false})
      },
      delItem(item) { //删除订单
        var i = this.orderList.indexOf(item)
        this.orderList.splice(i, 1)
      }
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  @import '../detail.scss';

  .continuedCourse {
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
    .orderList {
      .el-row {
        margin-bottom: 10px;
      }
    }
    .submitBtn {
      display: flex;
      justify-content: center;
      .el-button {
        color: white;
        background-color: #15bc9a;
        border: 0;
      }

      .el-button:hover, .el-button:focus {
        background-color: #40c7ac;
      }
    }
  }
</style>
