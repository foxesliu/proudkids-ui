<template>
  <div class="main-box">
    <h3>学生状态页</h3>
    <div class="flex-box search-box">
      <div>渠道名称：{{channelName}}</div>
      <div class="flex-box search-input-box">
        <span>按照注册的时间搜索：</span>
        <div class="input">
          <template>
            <div class="block">
              <el-date-picker
                v-model="dateVal"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
                value-format='yyyy-MM-dd'
              ></el-date-picker>
            </div>
          </template>
        </div>
        <el-button type="primary" size="mini" @click="getDate()">Search</el-button>
      </div>
    </div>
    <div class="table-box">
      <template>
        <el-table
          :data="tableData1"
          border
          style="width: 100%;font-size:13px;"
          :header-cell-style="{background:'#f9fafc'}"
        >
          <el-table-column prop="className" label="数据类型" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.type == 0">新例子</span>
              <span v-else-if="scope.row.type == 1">旧例子</span>
              <span v-else-if="scope.row.type == 2">报废例子</span> 
              <span v-else-if="scope.row.type == 3">付费排课例子</span> 
              <span v-else-if="scope.row.type == 4">不续费例子</span> 
            </template>
          </el-table-column>
          <el-table-column prop="typeTotalBills" label="数量" align="center"></el-table-column>
          <el-table-column prop="percent" label="比例" align="center"></el-table-column>
        </el-table>
      </template>
    </div>
    <div class="table-box">
      <template>
        <el-table
          :data="tableData2"
          border
          :span-method="objectSpanMethod"
          style="width: 100%;font-size:13px;"
          :header-cell-style="{background:'#f9fafc'}"
        >
          <el-table-column prop="type" label="数据类型" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.type == 0">新例子</span>
              <span v-else-if="scope.row.type == 1">旧例子</span>
              <span v-else-if="scope.row.type == 2">报废例子</span> 
              <span v-else-if="scope.row.type == 3">付费排课例子</span> 
              <span v-else-if="scope.row.type == 4">不续费例子</span> 
            </template>
          </el-table-column>
          <el-table-column prop="currentStage" label="行动阶段" align="center">

          </el-table-column>
          <el-table-column prop="totalStat" label="数量" align="center"></el-table-column>
          <el-table-column prop="percent" label="比例" align="center"></el-table-column>
        </el-table>
      </template>
    </div> 
  </div>
</template>

<script>
import { getQueryChannelBillsCount } from '@/api/channel.js';

export default {
  data() {
    return {
      channelName:'',
      dateVal: "",
      selectDate:{
        startSelectDate:null,
        endSelectDate:null,
      },
      Number1:0,
      Number2:0,
      Number3:0,
      Number4:0,
      tableData1:[],
      tableData2:[
        {type: 0, currentStage: '----', totalStat: 0, percent: "0.0%"},
        {type: 1, currentStage: '----', totalStat: 0, percent: "0.0%"},
        {type: 1, currentStage: '无人接听', totalStat: 0, percent: "0.0%"},
        {type: 1, currentStage: '稍后联系', totalStat: 0, percent: "0.0%"},
        {type: 1, currentStage: '有意向', totalStat: 0, percent: "0.0%"},
        {type: 1, currentStage: '关机&停机', totalStat: 0, percent: "0.0%"},
        {type: 2, currentStage: '----', totalStat: 0, percent: "0.0%"},
        {type: 2, currentStage: '停机', totalStat: 0, percent: "0.0%"},
        {type: 2, currentStage: '直接拒绝', totalStat: 0, percent: "0.0%"},
        {type: 2, currentStage: '明确拒绝', totalStat: 0, percent: "0.0%"},
        {type: 2, currentStage: '八次未接', totalStat: 0, percent: "0.0%"},
        {type: 2, currentStage: '空号&错号', totalStat: 0, percent: "0.0%"},
        {type: 2, currentStage: '没有符合年龄的孩子', totalStat: 0, percent: "0.0%"},
        {type: 2, currentStage: '有拯救意向', totalStat: 0, percent: "0.0%"},
        {type: 3, currentStage: '----', totalStat: 0, percent: "0.0%"},
        {type: 3, currentStage: '周课', totalStat: 0, percent: "0.0%"},
        {type: 3, currentStage: '月课', totalStat: 0, percent: "0.0%"},
        {type: 3, currentStage: '学期', totalStat: 0, percent: "0.0%"},
        {type: 3, currentStage: '年费', totalStat: 0, percent: "0.0%"},
        {type: 4, currentStage: '----', totalStat: 0, percent: "0.0%"},
        {type: 4, currentStage: '周课', totalStat: 0, percent: "0.0%"},
        {type: 4, currentStage: '月课', totalStat: 0, percent: "0.0%"},
        {type: 4, currentStage: '学期', totalStat: 0, percent: "0.0%"},
        {type: 4, currentStage: '年费', totalStat: 0, percent: "0.0%"},
      ],
      channelId:'',
      
    };
  },
  created() {
    this.channelId = this.$route.query.channelId;
    this.channelName = this.$route.query.channelName;
    this.getList();
  },
  methods: {
    getDate(){
      if(this.dateVal){
        this.selectDate.endSelectDate = this.dateVal[1]
        this.selectDate.startSelectDate = this.dateVal[0]
        console.log(this.selectDate) 
      }else{
        this.selectDate.endSelectDate = null
        this.selectDate.startSelectDate = null
      }
      this.getList();
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex  === 1) {
            return {
              rowspan: 5,
              colspan: 1
            };
          } else if(rowIndex  === 6 ){
            return {
              rowspan: 8,
              colspan: 1
            };
          }else if(rowIndex  === 14 ){
            return {
              rowspan: 5,
              colspan: 1
            };
          }
          else if(rowIndex  === 19 ){
            return {
              rowspan: 5,
              colspan: 1
            };
          }
          else if(rowIndex  === 2 || rowIndex  === 3 || rowIndex  === 4 || rowIndex  === 5 ||rowIndex  === 7 ||rowIndex  === 8||rowIndex  === 9 ||rowIndex  === 10||rowIndex  === 11 ||rowIndex  === 12||rowIndex  === 13||rowIndex  === 15 ||rowIndex  === 16||rowIndex  === 17||rowIndex  === 18||rowIndex  === 20||rowIndex  === 21||rowIndex  === 22||rowIndex  === 23||rowIndex  === 24) {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
    getList(){
      for(var i=0;i<this.tableData2.length;i++){
            this.tableData2[i].totalStat = 0;
            this.tableData2[i].percent = '0.0%';
      }
      this.Number1 = 0;
      this.Number2 = 0;
      this.Number3 = 0;
      this.Number4 = 0;
      getQueryChannelBillsCount(this.channelId,this.selectDate).then((res) => {
        this.tableData1 = res.data.data.param1
        let listData = res.data.data.param2
        console.log(listData)
        for (var i=0;i<listData.length;i++){
          if(listData[i].type == 0){
            this.tableData2[0].totalStat = listData[i].totalStat;
            this.tableData2[0].percent = listData[i].percent;
          }
          if(listData[i].type == 1){
            if(listData[i].currentStage == 0){
              this.tableData2[2].totalStat = listData[i].totalStat;
              this.tableData2[2].percent = listData[i].percent;
            }else if(listData[i].currentStage == 1){
              this.tableData2[3].totalStat = listData[i].totalStat;
              this.tableData2[3].percent = listData[i].percent;
            }
            else if(listData[i].currentStage == 2){
              this.tableData2[4].totalStat = listData[i].totalStat;
              this.tableData2[4].percent = listData[i].percent;
            }
            else if(listData[i].currentStage == 3){
              this.tableData2[5].totalStat = listData[i].totalStat;
              this.tableData2[5].percent = listData[i].percent;
            }
            else{
              this.tableData2[1].totalStat += listData[i].totalStat;
              this.Number1 += Number(listData[i].percent.substring(0,3));
              this.tableData2[1].percent = this.Number1 + '%';
            }
          }
          if(listData[i].type == 2){
            if(listData[i].currentStage == 3){
              this.tableData2[7].totalStat = listData[i].totalStat;
              this.tableData2[7].percent = listData[i].percent;
            }else if(listData[i].currentStage == 4){
              this.tableData2[8].totalStat = listData[i].totalStat;
              this.tableData2[8].percent = listData[i].percent;
            }
            else if(listData[i].currentStage == 5){
              this.tableData2[9].totalStat = listData[i].totalStat;
              this.tableData2[9].percent = listData[i].percent;
            }
            else if(listData[i].currentStage == 6){
              this.tableData2[10].totalStat = listData[i].totalStat;
              this.tableData2[10].percent = listData[i].percent;
            }
            else if(listData[i].currentStage == 7){
              this.tableData2[11].totalStat = listData[i].totalStat;
              this.tableData2[11].percent = listData[i].percent;
            }
            else if(listData[i].currentStage == 8){
              this.tableData2[12].totalStat = listData[i].totalStat;
              this.tableData2[12].percent = listData[i].percent;
            }
            else if(listData[i].currentStage == 9){
              this.tableData2[13].totalStat = listData[i].totalStat;
              this.tableData2[13].percent = listData[i].percent;
            }
            else{
              this.tableData2[6].totalStat += listData[i].totalStat;
              this.Number2 += Number(listData[i].percent.substring(0,3));
              this.tableData2[6].percent = this.Number2 + '%';
            }
          }
          if(listData[i].type == 3){
            if(listData[i].currentStage == 10){
              this.tableData2[15].totalStat = listData[i].totalStat;
              this.tableData2[15].percent = listData[i].percent;
            }else if(listData[i].currentStage == 11){
              this.tableData2[16].totalStat = listData[i].totalStat;
              this.tableData2[16].percent = listData[i].percent;
            }
            else if(listData[i].currentStage == 12){
              this.tableData2[17].totalStat = listData[i].totalStat;
              this.tableData2[17].percent = listData[i].percent;
            }
            else if(listData[i].currentStage == 13){
              this.tableData2[18].totalStat = listData[i].totalStat;
              this.tableData2[18].percent = listData[i].percent;
            }
            else{
              this.tableData2[14].totalStat += listData[i].totalStat;
              this.Number3 += Number(listData[i].percent.substring(0,3));
              this.tableData2[14].percent = this.Number3 + '%';
              //this.tableData2[14].percent += Number(listData[i].percent.substring(0,3));
            }
          }
          if(listData[i].type == 4){
            if(listData[i].currentStage == 10){
              this.tableData2[20].totalStat = listData[i].totalStat;
              this.tableData2[20].percent = listData[i].percent;
            }else if(listData[i].currentStage == 11){
              this.tableData2[21].totalStat = listData[i].totalStat;
              this.tableData2[21].percent = listData[i].percent;
            }
            else if(listData[i].currentStage == 12){
              this.tableData2[22].totalStat = listData[i].totalStat;
              this.tableData2[22].percent = listData[i].percent;
            }
            else if(listData[i].currentStage == 13){
              this.tableData2[23].totalStat = listData[i].totalStat;
              this.tableData2[23].percent = listData[i].percent;
            }
            else{
              this.tableData2[19].totalStat += listData[i].totalStat;
              this.Number4 += Number(listData[i].percent.substring(0,3));
              this.tableData2[19].percent = this.Number4 + '%';
            }
          }
        }
      })
        .catch((res) => {
          console.log(res)
        })
    }
  },
};
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss">
.main-box {
  padding: 20px;
  h3 {
    margin: 0;
    margin-bottom: 20px;
    color: #666666;
     padding: 0 15px;
  }
  .search-box {
    justify-content: space-between;
    align-items: center;
    height: 55px;
    border: solid 1px #dcdfe6;
    background: #f9fafc;
    border-radius: 4px;
    padding: 0 15px;
    color: #666666;
    .search-input-box{
        align-items: center;
        .input{
             margin-right: 15px;
        }
    }
  }
  .table-box{
      margin-top: 20px;
      box-shadow: 0px 2px 35px 0px 
		rgba(88, 93, 107, 0.13);
        padding: 20px;
        border-radius: 10px;
  }
}
.flex-box {
  display: flex;
}
</style>