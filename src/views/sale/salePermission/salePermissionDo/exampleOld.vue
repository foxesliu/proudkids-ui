<template>
  <div class="app-container calendar-list-container">
    <div class="search-top">

      <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
        <el-row>
          <el-col :span="22">
            <el-form-item>
              <el-select
                style="width: 120px;"
                v-model="listQuery.assignDate" placeholder="分配时间">
                <el-option label="由近到远" value="DESC"></el-option>
                <el-option label="由远到近" value="ASC"></el-option>
                <!--<el-date-picker-->
                <!--v-model="listQuery.assignDate"-->
                <!--align="left"-->
                <!--type="date"-->
                <!--placeholder="选择具体日期"-->
                <!--value-format="yyyy-MM-dd"-->
                <!--:picker-options="pickerOptions1">-->
                <!--</el-date-picker>-->
                <el-date-picker
                  v-model="listQuery.assignDate"
                  type="datetimerange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00']">
                </el-date-picker>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-popover
                ref="popover4"
                placement="bottom"
                width="210"
                trigger="focus"
              >
                <el-table :data="formInline.phoneData">
                  <el-table-column width="120" property="phone" label="已添加打电话"></el-table-column>
                  <el-table-column width="60" property="id" label="操作">
                    <template slot-scope="scope">
                      <el-button @click="deletePhone(scope.$index, formInline.phoneData)" type="text" size="small">删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-popover>
              <el-input
                v-popover:popover4
                style="width: 150px;"
                v-model="formInline.phone"
                placeholder="手机号绑定（批量）"
                value=""
                @keyup.enter.native="addPhone($event)"
                clearable>
              </el-input>

            </el-form-item>
            <el-form-item>
              <el-input
                style="width: 90px;"
                v-model="listQuery.name" placeholder="中文名字"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                style="width: 120px"
                v-model="listQuery.enname" placeholder="英文名字"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select
                style="width: 80px;"
                v-model="listQuery.grade"
                placeholder="级别">
                <el-option label="不选择"></el-option>
                <el-option label="0" value="0"></el-option>
                <el-option label="1" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="listQuery.type==0 || listQuery.type==1 || listQuery.type==2">
              <el-select
                style="width: 120px;"
                v-model="listQuery.createDate" placeholder="注册时间" size="small">
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
            <!--<el-form-item v-if="listQuery.type==1 || listQuery.type==2">-->
            <!--<el-select-->
            <!--style="width: 100px;"-->
            <!--v-model="listQuery.actionStage" placeholder="行动阶段"  size="small">-->
            <!--<el-option label="未体验" value="0"></el-option>-->
            <!--<el-option label="已体验" value="1"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item v-if="listQuery.type==1 || listQuery.type==2">-->
            <!--<el-select-->
            <!--style="width: 100px;"-->
            <!--v-model="listQuery.actionStat" placeholder="行动状态"  size="small">-->
            <!--<el-option label="无意向" value="0"></el-option>-->
            <!--<el-option label="有意向" value="1"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->

            <el-form-item v-if="listQuery.type==1 || listQuery.type==2 || listQuery.type==3 || listQuery.type==4">
              <el-select
                style="width: 130px;"
                v-model="listQuery.connectDate" placeholder="最后联系时间">
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
            <el-form-item v-if="listQuery.type==1 || listQuery.type==2 || listQuery.type==3 || listQuery.type==4">
              <el-select
                style="width: 130px;"
                v-model="listQuery.punchDate" placeholder="上次打卡时间">
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
            <el-form-item v-if="listQuery.type==3">
              <el-select
                style="width: 120px;"
                @change="getPeriods()"
                v-model="formInline.spareTime" placeholder="剩余课时">
                <el-option
                  v-for="arg in spareTime"
                  :value="arg.value"
                  :label="arg.label"
                  :key="arg.value">
                </el-option>

              </el-select>
            </el-form-item>
            <el-form-item v-if="listQuery.type==3">
              <el-select
                style="width: 130px;"
                v-model="formInline.courseType" placeholder="课程类型">
                <el-option label="长期" value="far"></el-option>
                <el-option label="短期" value="close"></el-option>
                <el-option label="同时" value="同时"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="listQuery.type==3">
              <el-select
                style="width: 130px;"
                v-model="formInline.enterClassTime" placeholder="加入班级时间">
                <el-option label="由近到远" value="far"></el-option>
                <el-option label="由远到近" value="close"></el-option>
                <el-date-picker
                  v-model="formInline.enterClassTime"
                  align="left"
                  type="date"
                  placeholder="选择具体日期"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions1">
                </el-date-picker>
              </el-select>
            </el-form-item>
            <el-form-item v-if="listQuery.type==3">
              <el-select
                style="width: 130px;"
                v-model="formInline.classTypeName" placeholder="课程类型名称">
                <el-option
                  v-for="arg in classTypeName"
                  :value="arg.value"
                  :label="arg.label"
                  :key="arg.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="listQuery.type==3">
              <el-select
                style="width: 130px;"
                v-model="formInline.classTime" placeholder="上课时间">
                <el-option
                  v-for="arg in classTime"
                  :value="arg.value"
                  :label="arg.label"
                  :key="arg.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="listQuery.type==4">
              <el-select
                style="width: 130px;"
                v-model="formInline.outofClassDate" placeholder="退出班级日">
                <el-option label="由近到远" value="far"></el-option>
                <el-option label="由远到近" value="close"></el-option>
                <el-date-picker
                  v-model="formInline.outofClassDate"
                  align="left"
                  type="date"
                  placeholder="选择具体日期"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions1">
                </el-date-picker>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="text-align: right">
            <el-form-item>
              <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>


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
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="分配CC"
          width="200">
          <template slot-scope="scope">{{ scope.row.userDeptInfo }}</template>
        </el-table-column>
        <el-table-column
          prop="stuCreateDate"
          label="分配数据时间"
        >
        </el-table-column>
        <el-table-column
          prop="stuPhone"
          label="绑定手机号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="stuCnName"
          label="中文名字"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="stuEnName"
          label="英文名字"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="channelOrigin"
          label="渠道"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="stuGrade"
          label="级别"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="currentAssignDate"
          label="注册时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="acStage"
          label="行动阶段"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="acStat"
          label="行动状态"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="latestRecordDate"
          label="最后联系时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="stuPunchDate"
          label="上一次打卡时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="用户详情"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
        <!--<el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>-->

      </div>
    </div>
    <div style="margin-top: 20px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row>
          <el-col>

          </el-col>
        </el-row>
      </el-form>

      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <span>勾选流转给CC</span>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.region" placeholder="- 大区 -">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.region" placeholder="- 组别 -">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.region" placeholder="- CC个人 -">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">报废例子</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认流转</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style>
  .el-form--inline .el-form-item {
    margin-right: 0;
  }
</style>
<script>
  import ElFormItem from "../../../../../node_modules/element-ui/packages/form/src/form-item.vue";
  import {arrObjAdd} from '@/utils/index';
  import {validatePhone} from '@/utils/validate';
  import {exaCheckAll, exaCheckPay, exaCheckFree} from '@/api/sale'

  export default {
    components: {ElFormItem},
    data() {
      return {
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
//          createDate: null,
          createDateS: null,//注册开始时间
          createDateE: null,//注册结束时间
          //旧例子
          actionStage: null,
          actionStat: null,
          connectDate: null,
          punchDate: null,
          //付费

        },
        actionStage: [],
        actionStat: [],
        formInline: {
          getTime: null,
          phone: '',
          phoneData: [],
          user: null,
          userEn: null,
          stage: null,
          registerTime: null,
          lastTime: null,
          lastPunchTime: null,
          actSteps: '行动阶段',
          actStatus: '行动状态',
          spareTime: '',
          courseType: null,
          enterClassTime: null,
          classTypeName: null,
          classTime: null,
          outofClassDate: null
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
            value: '73-144',
            label: '73-144',
          },
          {
            value: '144+',
            label: '144+',
          }
        ],
        classTypeName: [
          {
            value: '0',
            label: '1C-35F-1-L'
          },
          {
            value: '0',
            label: '1C-35F-2-L'
          },
          {
            value: '0',
            label: '1C-35F-3-L'
          }
        ],
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
        tableData1: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },
    /*computed() {

    },*/
    beforeCreated() {

    },
    created() {
      console.log(this.$route.query.status);
      console.log(this.$route.query.type);
      console.log(this.$store.getters.userId);
      this.listQuery.userId = this.$store.getters.userId
      this.listQuery.type = this.$route.query.type
      this.listQuery.isTrack = this.$route.query.status
      //this.actionStage = this.$store.getters.NEW_BILLS
      console.log(this.$store.getters.NEW_BILLS)
      this.getList()
    },
    methods: {

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
        } else {
          //新/旧/报废
          exaCheckAll(this.listQuery)
            .then(response => {
              console.log(response.data)
              let data = response.data.result
              this.total = data.total
              this.tableData1 = data.records
            })
        }

      },
      //剩余课时
      getPeriods() {
        let arr = this.listQuery.spareTime.split('-')
        if (arr.length > 1) {
          this.listQuery.sPeriods = arr[0]
          this.listQuery.ePeriods = arr[1]
        } else {
          this.listQuery.sPeriods = 145
          this.listQuery.ePeriods = -1
        }
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      onSearch() {
        console.log(this.listQuery.assignDate);
        console.log(typeof (this.listQuery.assignDate));
        this.getList()
      },

      onSubmit() {

      },
      pickerOptions1() {
        console.log('123')
      },
      pickerOptions2() {
        console.log('369')
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
        //console.log(arg.stuPhone)
        let phone = arg.stuPhone
        this.$router.push({path: '/detail/user', query: {phone: phone, type: this.listQuery.type}});//类似post传参
      },
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
      deletePhone(index, rows) {
        rows.splice(index, 1);
        console.log(this.formInline.phoneData)
        this.phoneFormat(this.formInline.phoneData)
      },
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
      }
    }
  }
</script>
