<template>
  <div class="payClass">
    <header-box :userInfo="userInfo"></header-box>
    <el-main class="pt30">
      <el-row class="pt30">
        <el-col :span="24">
          <el-form ref="form" :model="formData" :rules="rules" label-width="200px" size="mini">
            <el-form-item label="课程类型:" prop="courseName">
              <el-select v-model="formData.courseName" placeholder="请选择课程类型"
                         @change="selectCourseType(formData.courseName)">
                <el-option v-for="item in courseNameOptions"
                           :key="item.value" :label="item.label"
                           :value="item.value">{{item.label}}
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="班级类型:" prop="classType">
              <el-select v-model="classType" value-key="name"
                         placeholder="请选择班级类型" @change="getClassType">
                <el-option v-for="item in classTypeOptions"
                           :key="item.classTypeId" :label="item.name" :value="item">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="上课时间:" prop="schedulePoint">
              <el-select v-model="formData.schedulePoint" placeholder="请选择上课时间">
                <el-option v-for="item in schedulePointOptions"
                           :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="每周上课时间:" prop="jsonStr">
              <el-select v-model="formData.jsonStr" value-key="desc" placeholder="请选择">
                <el-option v-for="item in jsonData"
                           :key="item.id" :label="item.desc" :value="item">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="购买课时:" prop="periods">
              <el-row>
                <el-col :span="6">
                  <el-input type="text" v-model="formData.periods"></el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <!--<el-form-item label="支付订单号:" class="orderList">-->
            <!--<el-row v-for="(item,index) in orderList" :key="index">-->
            <!--<el-col :span="6" class='mr10'>-->
            <!--<el-input type="input" v-model="item.orderSn"-->
            <!--placeholder="订单号" prop="orderSn"></el-input>-->
            <!--</el-col>-->
            <!--<el-col :span="3" class='mr10'>-->
            <!--<el-select v-model="item.type" placeholder="支付平台">-->
            <!--<el-option v-for="item in payTypeOPtions"-->
            <!--:key="item.value" :label="item.label" :value="item.value">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--</el-col>-->
            <!--<el-col :span="3" class='mr10'>-->
            <!--<el-input type="input" v-model="item.money" placeholder="输入价格"></el-input>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
            <!--<el-button v-if="index+1!=orderList.length"-->
            <!--type="danger" class="btn" style="margin-right: 2px"-->
            <!--@click="delItem(item)">x-->
            <!--</el-button>-->
            <!--<el-button v-if="index+1==orderList.length"-->
            <!--type="danger" class="btn" @click="addItem(index)">+-->
            <!--</el-button>-->
            <!--<el-button @click="checkPayOrder(item)">{{item.isvalidate ? '已校验' : '订单号校验'}}</el-button>-->
            <!--</el-col>-->
            <!--<el-col :span="1" style="display: none">-->
            <!--<el-button type="button" class="btn" @click="getItem(index)"></el-button>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--</el-form-item>-->

            <div class="check-order-container">
              <div class="title">订单号校验</div>
              <div class="tab mt-10">
                <div class="pull-left c-pointer"
                     :class="showHandOrOnline?'active':''"
                     @click="showHandOrOnline=true">手工订单校验
                </div>
                <div class="pull-left c-pointer"
                     :class="!showHandOrOnline?'active':''"
                     @click="showHandOrOnline=false">在线订单校验
                </div>
              </div>
              <div class="clearfix"></div>
              <div class="con">
                <div class="con1" v-if="showHandOrOnline">
                  <el-button class="mt-20 mb-15 width-150" type="success" @click="addOneHandList">添加</el-button>
                  <div class="ul mb-20">
                    <div class="li" v-for="(item,index) in handList">
                      <div class="left">
                        <el-input :disabled="handList[index].isvalidate==true" v-model="handList[index].orderSn"
                                  class="width-250" placeholder="输入订单号"></el-input>
                        <el-select :disabled="handList[index].isvalidate==true" class="width-120"
                                   v-model="handList[index].type">
                          <el-option value="微信" label="微信"></el-option>
                          <el-option value="支付宝" label="支付宝"></el-option>
                          <el-option value="网银" label="网银"></el-option>
                        </el-select>
                        <el-input :disabled="handList[index].isvalidate==true"
                                  type="number" v-model="handList[index].money"
                                  class="width-120"
                                  placeholder="输入金额"></el-input>
                      </div>
                      <div class="right">
                        <el-button :disabled="handList[index].isvalidate==true" type="primary"
                                   @click="checkOrder(index)">订单号校验
                        </el-button>
                        <el-button type="danger" @click="remove(index)">删除</el-button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="con2" v-if="!showHandOrOnline">
                  <div class="ul mb-10 mt-20">
                    <div class="li">
                      <div class="left">
                        <el-input ref="orderNumber" class="width-250" placeholder="输入订单号"></el-input>
                        <el-select ref="orderType" v-model="aaa" class="width-120">
                          <el-option value="微信" label="微信"></el-option>
                          <el-option value="支付宝" label="支付宝"></el-option>
                          <el-option value="网银" label="网银"></el-option>
                        </el-select>
                        <el-input type="number" ref="orderMoney" class="width-120" placeholder="输入金额"></el-input>
                      </div>
                      <div class="right">
                        <el-button type="primary" @click="onlineCheckOrder">订单号校验</el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="clearfix"></div>

            <el-form-item label="备注:" :inline="true" prop="remark" class="org">
              <el-input type="textarea" :rows="5" v-model="formData.remark"></el-input>
            </el-form-item>

            <el-form-item size="large" class="submitBtn">
              <el-button type="success" @click="onSubmit">确定提交</el-button>
            </el-form-item>

          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
  import onlineHeader from '../components/onlineHeader'
  import {mapGetters} from 'vuex'
  import {closeViewTags} from '@/utils/index';
  import {editAct, getclassType, getWeektimeItems, payClass, checkOrder, ruserOrdersAvailable} from '@/api/detail' // 編輯行動,班级类型,每周上课时间,订单校验
  export default {
    components: {
      'header-box': onlineHeader
    },
    data() {
      return {
        aaa: '',
        showHandOrOnline: true,
        handList: [{orderSn: null, type: null, money: null, isvalidate: false}],
        classType: null,
        userInfo: {},
        orderListFlag: false,
        DUMPING_BILLS_FLAG: true,
        listValidateFlag: '',//所有订单号是否验证
        orderList: [{orderSn: '', type: '', money: '', isvalidate: false}],
        sizeForm: {
          scrapped: false,  //报废例子
          remind: false,   //是否提醒
          phone: '',
          stat: '',
        },
        jsonData: '',
        formData: {
          classType: '', //班级类型
          courseName: '', //课程类型
          jsonStr: '', //每周上课时间
          money: '',
          orderId: '',  //在线支付
          orderSn: '',  //在线支付
          payAddr: '',
//          payInfo: "{\'orderSn\':12312312,type:\'微信支付\',money:3500}",  // 手动支付拼接支付订单信息
          payInfo: {
            orderSn: '',
            type: '',
            money: ''
          },  // 手动支付拼接支付订单信息
          periods: '',//购买课时
          remark: '', //备注
          ruserId: '',
          schedulePoint: '',//上课时间段
//          status: ''//不需要传
        },
        rules: {
          classType: [
            {required: true, message: '请选择班级类型', trigger: 'change'}
          ],
          courseName: [
            {required: true, message: '请选择课程类型', trigger: 'change'}
          ],
          jsonStr: [
            {required: true, message: '请选择每周上课时间', trigger: 'change'}
          ],
          remark: [
            {required: true, message: '请填写备注内容', trigger: 'blur'}
          ],
          periods: [
            {required: true, message: '请输入购买课时', trigger: 'blur'},
            {min: 1, max: 3, message: '输入课时过长', trigger: 'blur'},
            {
              pattern: /^[0-9]*$/,
              message: '输入课时格式不正确',
              trigger: 'blur'
            }
          ],
          schedulePoint: [
            {required: true, message: '请选择上课时间段', trigger: 'change'}
          ],
          orderSn: [
            {required: true, message: '请输入购买课时', trigger: 'change'}
          ]
        },

        classTypeParams: {
          status: '',
          type: ''
//          status: 0,  //班级类型过期状态 0：未过期/进行中 1：已过期
//          type: 1  //班级类型长短期 1：长期 2：短期
        },
        classTypeOptions: [],
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
        jsonStrOptions: '',      //每周上周时间
        courseNameOptions: '',   //长期/短期课程
        schedulePointOptions: '', //上课时间
      }

    },
    computed: {
      ...mapGetters(['detailPhone', 'detailType', 'detailInfo', 'ruserInfo', 'courseName', 'schedulePoint'])
    },
    created() {
      this.courseNameOptions = this.courseName;  //长期短期
      this.schedulePointOptions = this.schedulePoint; //上课时间
      this.userInfo = JSON.parse(sessionStorage.getItem('detailParams'))[0];
      this.formData.ruserId = this.userInfo.ruserId;
//      this.formData.payInfo = JSON.stringify(this.formData.payInfo)
    },
    mounted() {
      this.getOptions();
    },
    methods: {
      onlineCheckOrder(){
        console.log(this.$refs.orderNumber.currentValue);
        console.log(this.$refs.orderType.value);
        console.log(this.$refs.orderMoney.currentValue);
        let obj = {
          type: 0,
          orderNo: this.$refs.orderNumber.currentValue,
          ruserId: this.userInfo.ruserId,
          fee: this.$refs.orderMoney.currentValue
        };
        console.log(obj);
        let flag = true;
        if (!obj.orderNo || !obj.fee || !this.$refs.orderType.value) {
          flag = false;
        }
        console.log(flag);
        if (flag) {
          ruserOrdersAvailable(obj).then((res) => {
            if (res.code == 0) {
              console.log(this.handList);
              this.$notify({
                title: '成功',
                message: '订单号校验成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$message.error('订单号校验失败！');
            }
          })
        } else {
          this.$message.error('请填写完整！');
        }
      },
      checkOrder(index){
        //payInfo: "[{"orderSn":"sdf","type":"微信","money":"sdf","isvalidate":true}]"
        //console.log(this.$refs.orderNumber[index].currentValue);
        //console.log(this.$refs.orderType[index].value);
        //console.log(this.$refs.orderMoney[index].currentValue);
        let obj = {
          type: 1,
          orderNo: this.handList[index].orderSn,
          ruserId: this.userInfo.ruserId,
          fee: this.handList[index].money
        };
        console.log(obj);
        let flag = true;
        for (let i in obj) {
          if (!obj[i]) {
            flag = false;
            break;
          }
        }
        console.log(flag);
        if (flag) {
          ruserOrdersAvailable(obj).then((res) => {
            if (res.data) {
              this.handList[index].isvalidate = true;
              console.log(this.handList);
              this.$notify({
                title: '成功',
                message: '订单号校验成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$message.error('订单号校验失败！');
            }
          })
        } else {
          this.$message.error('订单号校验失败！');
        }
      },
      remove(index){
        this.handList.splice(index, 1);
        console.log(this.handList);
      },
      addOneHandList(){
        this.handList.push({orderSn: null, type: null, money: null, isvalidate: false});
      },
      onSubmit() { //提交表单
        this.formData.payInfo = this.handList;
        console.log(this.formData);
        //return;
        this.listValidateFlag = this.orderList.every(item => { //所有订单号是否验证
          return item.isvalidate
        })
//        this.orderList.forEach(item => {
//          if (!this.listValidateFlag) {
//            this.$message.error('您有未校验的订单号！');
//            return false
//          } else
//              if (!item.orderSn) {
//            this.$message.error('请输入订单号！');
//            return false
//          } else if (!item.type) {
//            this.$message.error('请选择支付平台！');
//            return false
//          } else if (!item.money) {
//            this.$message.error('请输入价格！');
//            return false
//          } else {
//            this.orderListFlag = true
//          }
//        })
        this.orderListFlag = true;
        for (let i = 0; i < this.handList.length; i++) {
          if (!this.handList[i].isvalidate) {
            this.orderListFlag = false;
            break;
          }
        }
        if (!this.orderListFlag) {
          this.$message.error('您有未校验的订单号！');
          return false;
        }
        this.formData.money = this.orderList.reduce(function (prev, cur) {  //总价格
          return prev + parseInt(cur.money);
        }, 0)

        this.$refs.form.validate((valid) => {  //提交表单
          if (valid) {
            if (this.orderListFlag) {
              this.formData.jsonStr = JSON.stringify(this.formData.jsonStr)  //每周上课
              this.formData.payInfo = JSON.stringify(this.orderList)  //支付订单
              this.payClass();
              this.$nextTick(function () {
                //this.$refs.form.resetFields();
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      payClass() { //购买课程
        if (this.formData.courseName == 1) {
          this.formData.courseName = '长期课程'
        } else {
          this.formData.courseName = '短期课程'
        }
        this.formData.jsonStr = JSON.stringify(this.handList);
        console.log(this.formData)
        payClass(this.formData, this.classTypeId).then((res) => {
          var that = this;
          this.$notify({
            title: '成功', message: '购课成功', type: 'success', duration: 2000, onClose: function () {
              closeViewTags({'name': '购课', 'path': '/detail/payCourse', 'title': '购课'}, that, '/detail')
            }
          });
        }).catch((res) => {
          console.log(res)
        })

      },

      getClassType(item) {
        console.log(item);
        this.classTypeId = item.classTypeId;
        this.formData.classType = item.name;
        if (!this.formData.courseName) {
          this.$message({type: 'error', message: '请先选择课程类型!'});
          return false;
        }
      },
      getOptions() {
        getWeektimeItems().then((res) => {  //获取每周上课时间
          this.jsonStrOptions = res.data;
          this.jsonData = this.jsonStrOptions.map((item) => {
            return JSON.parse(item.jsonStr)
          })
        })
      },
      selectCourseType(value) {
        this.classTypeParams.type = value;  //选中的课程类型
        this.classTypeParams.status = 0;  //选中的课程类型
        getclassType(this.classTypeParams).then((res) => {  //获取班级类型名称
          this.classTypeOptions = res.data;
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
        });
        console.log(this.listValidateFlag)
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
  @import '../../../aom/index.scss';

  .payClass {
    .check-order-container {
      width: 80%;
      margin: 0 10%;
      min-height: 100px;
      height: auto;
      .title {
        font-size: 18px;
      }
      .tab {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eef1f7;
        .pull-left {
          width: 150px;
          text-align: center;
          &.active {
            color: #409EFF;
            border-bottom: 1px solid #409EFF;
          }
        }
      }
      .con {
        .ul {
          .li {
            width: 100%;
            height: 50px;
            display: flex;
            .left {
              flex: 1;
            }
            .right {
              width: 200px;
              text-align: right;
            }
          }
        }
      }
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
