<template>
  <div class="onlineOrdersList">
    <div class="search-top">
      <el-form :inline="true" :model="formData" size="small" class="demo-form-inline">
        <el-row>
          <el-col :span="10">
            <el-form-item>
              <el-popover
                ref="popover4"
                placement="bottom"
                width="210"
                trigger="focus"
              >
                <el-table
                  empty-text="输入手机号，按回车添加！"
                  :data="formData.phoneData">
                  <el-table-column width="120" property="phone" label="已添加打电话"></el-table-column>
                  <el-table-column width="60" property="id" label="操作">
                    <template slot-scope="scope">
                      <el-button @click="deletePhone(scope.$index, formData.phoneData)" type="text" size="small">删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>

              </el-popover>
              <el-input
                class="mt20"
                v-popover:popover4
                style="width: 150px;"
                v-model="formData.phone"
                :placeholder="formData.phone || '绑定手机号（批量）'"
                value=""
                @keyup.enter.native="addPhone($event)"
                clearable>
              </el-input>

            </el-form-item>
            <el-form-item>
              <el-input
                style="width: 90px;"
                class="mt20"
                v-model.trim="listQuery.name" placeholder="中文名字"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                style="width: 120px"
                class="mt20"
                v-model.trim="listQuery.enname" placeholder="英文名字"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <div class="fr">
              <!--<span style="color: #4c4c4c;" class="fs16">按照上课时间搜索：</span>-->
              <el-date-picker
                v-model="datePickerTime"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd hh:mm:ss"
                @change="getChooseTime"
                :picker-options="pickerOptions2"
                size="small">
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span="2" style="text-align: right">
            <el-form-item>
              <el-button type="primary" @click="onSearch" class="mt20">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table :key='tableKey' :data="listData" v-loading="listLoading" element-loading-text="正在加载中" border fit
              style="width: 100%">
      <el-table-column align="center" label="订单发起人" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.courseName || '/'}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="中文名字" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.name || '/'}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="英文名字" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.enName || '/'}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="绑定手机" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.phone || '/'}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品名字" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.productName}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付金额" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{JSON.parse(scope.row.payInfo)[0].money}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="订单号" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.orderSn}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="支付平台" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{JSON.parse(scope.row.payInfo)[0].type}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="提交时间" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.submitTime}}</span>
        </template>
      </el-table-column>

    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.rows"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {validatePhone} from '@/utils/validate';
  import {arrObjAdd} from '@/utils/index';
  import {getOrderList} from '@/api/sale';

  export default {
    props: ['userInfo'],
    data() {
      return {
        tableKey: 0,
        total: null,
        listData: null,
        listLoading: false,
        formData: {
          phone: '',
          phoneData: [],
        },
        datePickerTime: null,

        listQuery: {
          page: 1,
          rows: 10,
          phones: [],
          startTime: null,
          endTime: null,
        },
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
    created() {
      this.getList()
    },
    methods: {
      onSearch() {
//        console.log(this.formData)
        console.log(this.listQuery)

        this.getList()

      },
      getChooseTime() {
        this.listQuery.startTime = this.datePickerTime[0]
        this.listQuery.endTime = this.datePickerTime[1]
        console.log(this.startTime)
      },
      //删除电话
      deletePhone(index, rows) {
        rows.splice(index, 1);
        console.log(this.formData.phoneData)
        this.phoneFormat(this.formData.phoneData)
      },
      //添加电话
      addPhone(e) {
        if (validatePhone(this.formData.phone)) {
          let data = Object.assign({}, JSON.parse(JSON.stringify({
            id: this.formData.phoneData.length,
            phone: this.formData.phone
          })));
          //arrObjAdd(this.formData.phoneData, data, 'phone');
          if (arrObjAdd(this.formData.phoneData, data)) {
            this.$message.error('手机号码已存在！');
          } else {
            this.formData.phoneData.push(data)
            this.formData.phone = '';
          }
          console.log(this.formData.phoneData)
        } else {
          this.$message.error('手机号码格式不正确！');
        }
        this.phoneFormat(this.formData.phoneData)

      },
      //电话汇总
      phoneFormat(arr) {
        if (arr.length < 1) {
          this.formData.phone = null
        } else {
          this.formData.phone = ''
          for (let i = 0; i < arr.length; i++) {
            if (i == 0) {
              this.formData.phone += arr[i].phone
            } else {
              this.formData.phone += ','
              this.formData.phone += arr[i].phone
            }
          }
        }
        this.listQuery.phones = this.formData.phone
      },
      handleSizeChange(val) {
        this.listQuery.rows = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      getList() {
        getOrderList(this.listQuery).then((res) => {
          this.listLoading = false
          this.total = res.data.data.total
          this.listData = res.data.data.records

          this.listData.forEach((item) => {

            item.totMoney=JSON.parse(item.payInfo).reduce(function (prev, cur) {  //总价格
              console.log(prev)
              console.log(cur.money)
              return parseInt(prev) + parseInt(cur.money);
            }, 0)
            console.log(item)

          })
//          this.listData.money = this.listData.forEach( (prev, cur)=> ){  //总价格
////            console.log(prev)
//            console.log(cur.payInfo)
//            return prev + parseInt(cur.money);
//          }, 0)

          console.log(this.listData.money)
          console.log(res.data.data)
        }).catch((res) => {
          console.log(res)
        })
      },
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../detail.scss';

  .onlineOrdersList {
  @include detail-container();
  @include btn();
  .search-top {
    height: 78px;
    line-height: 78px;
  }
  }

</style>

