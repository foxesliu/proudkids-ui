<template>
  <div class="payedExample">
    <div class="header">
      <el-form :inline="true" :model="formInline" size="mini">
        <el-form-item>
          <el-select
            style="width: 120px;"
            v-model="listQuery.assignDate" placeholder="分配时间">
            <el-option label="由近到远" value="DESC"></el-option>
            <el-option label="由远到近" value="ASC"></el-option>
            <el-date-picker
              v-model="listQuery.assignDate"
              align="left"
              type="date"
              placeholder="选择具体日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-popover
            ref="popover4"
            placement="bottom"
            width="210"
            trigger="focus">
            <el-table
              empty-text="输入手机号，按回车添加！"
              :data="formInline.phoneData">
              <el-table-column width="120" property="phone" label="已添加打电话"></el-table-column>
              <el-table-column width="60" property="id" label="操作">
                <template slot-scope="scope">
                  <el-button @click="deletePhone(scope.$index, formInline.phoneData)" type="text" size="mini">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

          </el-popover>
          <el-input
            v-popover:popover4
            style="width: 150px;"
            v-model="formInline.phone"
            :placeholder="listQuery.phone || '绑定手机号（批量）'"
            value=""
            @keyup.enter.native="addPhone($event)"
            clearable>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-input
            style="width: 90px;"
            v-model.trim="listQuery.name" placeholder="中文名字"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input
            style="width: 120px"
            v-model.trim="listQuery.enname" placeholder="英文名字"></el-input>
        </el-form-item>

        <el-form-item>
          <el-select
            style="width: 80px;"
            v-model="listQuery.grade"
            placeholder="级别">
            <!--级别为空问题-->
            <el-option label="不选择" value=""></el-option>
            <el-option label="0" value="0"></el-option>
            <el-option label="1" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select
            style="width: 120px;"
            v-model="listQuery.createDate" placeholder="最后联系时间" size="mini">
            <el-option label="由近到远" value="DESC"></el-option>
            <el-option label="由远到近" value="ASC"></el-option>
            <el-date-picker
              v-model="listQuery.createDate"
              align="right"
              type="date"
              placeholder="选择具体日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select
            style="width: 120px;"
            v-model="listQuery.createDate" placeholder="上次打卡时间" size="mini">
            <el-option label="由近到远" value="DESC"></el-option>
            <el-option label="由远到近" value="ASC"></el-option>
            <el-date-picker
              v-model="listQuery.createDate"
              align="right"
              type="date"
              placeholder="选择具体日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select
            style="width: 100px;"
            v-model="listQuery.actionStage" placeholder="剩余课时" size="mini">
            <el-option
              v-for="(item,index) in actionStage"
              :key="index"
              :value="item.value"
              :label="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            style="width: 100px;"
            v-model="listQuery.actionStat" placeholder="课程类型" size="mini">
            <el-option
              v-for="(item,index) in actionStat"
              :key="index"
              :label="item.label"
              :value="item.value">

            </el-option>

          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select
            style="width: 130px;"
            v-model="listQuery.connectDate" placeholder="加入班级时间">
            <el-option label="由近到远" value="DESC"></el-option>
            <el-option label="由远到近" value="ASC"></el-option>
            <el-date-picker
              v-model="listQuery.connectDate"
              align="left"
              type="date"
              placeholder="选择具体日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select
            style="width: 130px;"
            v-model="listQuery.punchDate" placeholder="班级类型名称">
            <el-option label="由近到远" value="DESC"></el-option>
            <el-option label="由远到近" value="ASC"></el-option>
            <el-date-picker
              v-model="listQuery.punchDate"
              align="left"
              type="date"
              placeholder="选择具体日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="submit" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-table
        ref="multipleTable"
        :data="tableData1"
        tooltip-effect="dark"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          fixed
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="分配CC"
          width="110"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.userDeptInfo || scope.row.userTree || scope.row.userDeptUserInfoTree
            }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="this.listQuery.type!=5"
          label="分配数据时间"
          width="110"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.stuCreateDate || scope.row.createDate || scope.row.currentAssignDate
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="stuPhone"
          label="绑定手机号"
          width="110"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.stuPhone || scope.row.phone || scope.row.bindPhone }}</template>
        </el-table-column>
        <el-table-column
          prop="stuCnName"
          label="中文名字"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.stuCnName || scope.row.cnName }}</template>
        </el-table-column>
        <el-table-column
          prop="stuEnName"
          label="英文名字"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.stuEnName || scope.row.enName }}</template>
        </el-table-column>

        <!--<el-table-column-->
          <!--v-if="listQuery.type!=3&&listQuery.type!=5"-->
          <!--prop="channelOrigin"-->
          <!--label="渠道"-->
          <!--show-overflow-tooltip>-->
        <!--</el-table-column>-->
        <el-table-column
          v-if="listQuery.type!=5"
          prop="stuGrade || ruserGrade"
          label="级别"
          width="50"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.stuGrade || scope.row.ruserGrade }}</template>
        </el-table-column>

        <el-table-column
          v-if="listQuery.type!=5"
          prop="latestRecordDate"
          label="最后联系时间"
          width="110"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.latestRecordDate || scope.row.lastRecordDate }}</template>
        </el-table-column>

        <el-table-column
          v-if="listQuery.type!=5"
          prop="stuPunchDate"
          label="上次打卡时间"
          width="110"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.stuPunchDate || scope.row.ruserPunchDate }}</template>
        </el-table-column>

        <el-table-column
          v-if="listQuery.type!=5"
          prop="latestRecordDate"
          label="退出班级日"
          width="110"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.latestRecordDate || scope.row.lastRecordDate }}</template>
        </el-table-column>

        <el-table-column
          v-if="listQuery.type==3"
          prop="periods"
          label="剩余课时"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          v-if="listQuery.type==3"
          prop="joinClassDate"
          label="加入班级日"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          v-if="listQuery.type==3"
          prop="classType"
          label="报名课程"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.classType | courseTypeFilter() }}</template>
        </el-table-column>

        <el-table-column
          v-if="listQuery.type==3"
          prop="classTypeName"
          label="课程类型名称"
          width="110"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          v-if="listQuery.type==3"
          prop="classTime"
          label="上课时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          v-if="listQuery.type==3"
          prop="cnTeacherDeptInfoTree"
          label="中教老师"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          v-if="listQuery.type==3"
          prop="enTeacherDeptInfoTree"
          label="外教老师"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          v-if="listQuery.type==3"
          prop="classStartDate"
          label="班级开始日期"
          width="110"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          v-if="listQuery.type==3"
          prop="classEndDate"
          label="班级结束日期"
          width="110"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          v-if="listQuery.type==3"
          prop="classContent.desc"
          label="每周上课时间"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.classContent | weekClassArray() }}</template>
        </el-table-column>

        <!--<el-table-column-->
        <!--v-if="listQuery.type==4"-->
        <!--prop="stuPunchDate"-->
        <!--label="退出班级日"-->
        <!--show-overflow-tooltip>-->
        <!--</el-table-column>-->
        <el-table-column
          fixed="right"
          align="center"
          label="用户详情"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="mini">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage1"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>

      </div>
    </div>
    <div style="margin-top: 20px" v-if="this.listQuery.type != 5">

      <!--<el-form :inline="true" :model="formInline" class="demo-form-inline">-->
      <!--<el-row>-->
      <!--<el-col :span="2">-->
      <!--<el-form-item>-->
      <!--<span>勾选流转给CC</span>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="14">-->
      <!--<depth-tree :message="parentMsg" :message1="listQuery.userId" v-on:listenToChildEvent="showMsgFromChild">-->
      <!--</depth-tree>-->
      <!--</el-col>-->
      <!--<el-col :span="2">-->
      <!--<el-form-item>-->
      <!--<el-button type="primary" @click="circulation">确认流转</el-button>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--</el-form>-->
    </div>
  </div>
</template>

<script>
  //  import {mapGetters} from 'vuex'
  //  import { arrObjAdd } from '@/utils/index';
  //  import { validatePhone } from '@/utils/validate';
  //  import { exaCheckAll, exaCheckPay, exaCheckFree, checkClassType, exaFlow, checkREmindList } from '@/api/sale'
  //  import DepthTree from "../../depthTree/index.vue";
  export default {
//    components: {
//      DepthTree
//    },
    data() {
      return {
        parentMsg: '55555555',
        listQuery: {
          userId: null,
          type: null,
          isTrack: null,
          pages: 1,
          pageSize: 10,
          //新例子
          assignDate: null,
          phone: null,
          name: null,
          enname: null,
          grade: null,
          createDate: null,
          //旧例子
          actionStage: null,
          actionStat: null,
          connectDate: null,
          punchDate: null,
          //付费
          courseType: null,
          enterClassTime: null,
          classTypeName: null,
          classTime: null,
          outofClassDate: null,
          spareTime: null
        },
        listquery1: {
          "billAndUserIdCollection": "",
          "systemUserId": null,
          "userId": null
        },
        //提醒例子需要参数
        listQuery2: {
          userId: null,
          pages: 1,
          pageSize: 10,
          phone: null,
          name: null,
          enname: null,
          startDate: null,
          endDate: null,
          nowDate: null
        },
        timePeriod: null,
        actionStage: [],
        actionStat: [],
        courseType: [
          {
            value: 1,
            label: '长期'
          },
          {
            value: 2,
            label: '短期'
          },
          {
            value: null,
            label: '同时'
          }
        ],
        //课程类型参数type
        courseTypeList: {
          type: null
        },
        formInline: {
          phone: '',
          phoneData: [],
        },
        spareTime: [
          {
            value: '1-12',
            label: '1-12',
          },
          {
            value: '13-36',
            label: '13-36',
          },
          {
            value: '37-72',
            label: '37-72',
          },
          {
            value: '72-144',
            label: '72-144',
          },
          {
            value: '144+',
            label: '144+',
          }
        ],
        classTypeName: [],
        classTime: [
          {
            value: '0',
            label: '18:00-18:25'
          },
          {
            value: '1',
            label: '18:30-18:55'
          },
        ],

        page: {
          currentPage1: 1,
          currentPage2: 5,
          currentPage3: 5,
          currentPage4: 1
        },
        total: 0,
        tableData1: [],
        multipleSelection: [],
        //提醒联系例子
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    computed: {
//      ...mapGetters([ 'NEW_BILLS_STAGE', 'NEW_BILLS_STATUS','OLD_BILLS_STAGE', 'OLD_BILLS_STATUS', 'DUMPING_BILLS_STAGE', 'DUMPING_BILLS_STATUS',
//        'PAY_BILLS_STAGE', 'PAY_BILLS_STATUS', 'NO_RENEWS_BILLS_STAGE', 'NO_RENEWS_BILLS_STATUS','userId'])

    },
    beforeCreated() {

    },
    created() {

      //this.listQuery.userId = this.$store.getters.userId
      this.listQuery.userId = this.$route.query.userId
      this.listquery1.systemUserId = this.$store.getters.userId
      this.listQuery.type = this.$route.query.type
      //console.log()
      this.listQuery.isTrack = this.$route.query.status
      //根据type获取行动状态等
      if (this.listQuery.type == 0) {
        this.actionStage = this.NEW_BILLS_STAGE
        this.actionStat = this.NEW_BILLS_STATUS
      } else if (this.listQuery.type == 1) {
        this.actionStage = this.OLD_BILLS_STAGE
        this.actionStat = this.OLD_BILLS_STATUS
      } else if (this.listQuery.type == 2) {
        this.actionStage = this.DUMPING_BILLS_STAGE
        this.actionStat = this.DUMPING_BILLS_STATUS
      } else if (this.listQuery.type == 3) {
        this.actionStage = this.PAY_BILLS_STAGE
        this.actionStat = this.PAY_BILLS_STATUS
      } else {
        this.actionStage = this.NO_RENEWS_BILLS_STAGE
        this.actionStat = this.NO_RENEWS_BILLS_STATUS
      }
      console.log(this.actionStage)
//      this.getList()
//      this.getClassType() //初始化拉去全部课程类型名称
    },
    methods: {
      //列表查询
      getList() {
        //console.log(this.listQuery.type)
        if (this.listQuery.type == 3) {
          //付费
          exaCheckPay(this.listQuery)
            .then(response => {
              console.log(response.data)
              let data = response.data.result
              this.total = data.total
              this.tableData1 = data.records
            })
        } else if (this.listQuery.type == 4) {
          //不续费
          exaCheckFree(this.listQuery)
            .then(response => {
              console.log(response.data)
              let data = response.data.result
              this.total = data.total
              this.tableData1 = data.records
            })
        } else if (this.listQuery.type == 5) {
          //提醒联系的例子
          this.listQuery2.userId = this.userId
          this.listQuery2.pages = this.listQuery.pages
          this.listQuery2.pageSize = this.listQuery.pageSize
          this.listQuery2.phone = this.listQuery.phone
          this.listQuery2.name = this.listQuery.name
          this.listQuery2.enname = this.listQuery.enname
          this.listQuery2.nowDate = this.$route.query.status
          if (this.timePeriod) {
            this.listQuery2.startDate = this.timePeriod[0]
            this.listQuery2.endDate = this.timePeriod[1]
          }
          //console.log(this.timePeriod)
          /*this.listQuery2.startDate = this.listQuery.startDate
          this.listQuery2.endDate = this.listQuery.endDate*/
          console.log(this.listQuery2)
          checkREmindList(this.listQuery2)
            .then(response => {
              //console.log(response.data)
              let data = response.data.result
              this.total = data.total
              this.tableData1 = data.records
              console.log(this.tableData1)
            })
        } else {
          //新/旧/报废
//          exaCheckAll(this.listQuery)
//            .then(response => {
//              console.log(response.data)
//              let data = response.data.result
//              this.total = data.total
//              this.tableData1 = data.records
//            })
        }

      },
      //根据课时类型查询类型名称
      getClassType() {
        this.courseTypeList.type = this.listQuery.courseType
        checkClassType(this.courseTypeList)
          .then(response => {
            console.log(response.data)
            this.classTypeName = response.data
          })
      },
      //选择例子
      handleSelectionChange(val) {
        console.log(val)
        this.multipleSelection = val;
        //
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (i == 0) {
            this.listquery1.billAndUserIdCollection = this.multipleSelection[i].flowBillId + '#' + this.multipleSelection[i].currentUserId + ','
          } else {
            this.listquery1.billAndUserIdCollection += this.multipleSelection[i].flowBillId + '#' + this.multipleSelection[i].currentUserId + ','
          }
        }

      },
      //例子流转
      circulation() {
        exaFlow(this.listquery1)
          .then(response => {
            console.log(response.data)
          })
      },
      onSearch() {
        console.log(this.formInline)
        console.log(this.listQuery);
        console.log(typeof (this.listQuery.assignDate));
//        this.getList()
      },

      pickerOptions1() {
        console.log('123')
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      currentPage4() {
        console.log('369s')
      },
      //查看详情
      handleClick(arg) {

        let phone = arg.stuPhone || arg.bindPhone || arg.phone
        this.$router.push({path: '/detail/user', query: {phone: phone, type: this.listQuery.type}});//类似post传参
      },
      //添加电话
      addPhone(e) {
        if (validatePhone(this.formInline.phone)) {
          let data = Object.assign({}, JSON.parse(JSON.stringify({
            id: this.formInline.phoneData.length,
            phone: this.formInline.phone
          })));
          //arrObjAdd(this.formInline.phoneData, data, 'phone');
          if (arrObjAdd(this.formInline.phoneData, data)) {
            this.$message.error('手机号码已存在！');
          } else {
            this.formInline.phoneData.push(data)
            this.formInline.phone = '';
          }
          console.log(this.formInline.phoneData)
        } else {
          this.$message.error('手机号码格式不正确！');
        }
        this.phoneFormat(this.formInline.phoneData)

      },
      //删除电话
      deletePhone(index, rows) {
        rows.splice(index, 1);
        console.log(this.formInline.phoneData)
        this.phoneFormat(this.formInline.phoneData)
      },

      //电话汇总
      phoneFormat(arr) {
        if (arr.length < 1) {
          this.listQuery.phone = null
        } else {
          this.listQuery.phone = ''
          for (let i = 0; i < arr.length; i++) {
            if (i == 0) {
              this.listQuery.phone += arr[i].phone
            } else {
              this.listQuery.phone += ','
              this.listQuery.phone += arr[i].phone
            }
          }
        }
        console.log(this.listQuery.phone)
      },
      //接受子组件
      showMsgFromChild(data) {
        console.log(data)
        this.listquery1.userId = data
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  @import '../../sale/detail/detail.scss';

  .payedExample {
    @include detail-container();
    .header {
      display: flex;
      align-items: center;
      border: 2px solid #f6f6f6;
      background: #ffffff;
      border-radius: 10px;
      margin-bottom: 26px;
      padding: 10px 0 0 10px;
      .el-form-item{
        margin: 0 10px 10px 0;
      }
    }
  }
</style>
