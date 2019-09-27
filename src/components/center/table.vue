<template>
  <el-table
    :data="list"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      fixed="left"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData4)"
          type="text"
          size="small">
          +
        </el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="ccName"
      label="cc"
      width="180">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="注册时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="注册手机号">
    </el-table-column>
    <el-table-column
      prop="ruserEnName"
      label="英文名字">
    </el-table-column>
    <el-table-column
      prop="ruserName"
      label="中文名字">
    </el-table-column>
    <el-table-column
      prop="channelName"
      label="首次注册渠道">
    </el-table-column>
    <el-table-column
      prop="ruserName"
      label="邀请人">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData4)"
          type="text"
          size="small">
          详情
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props:['list'],
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    },
    data() {
      return {
        // ccName: "wangliwei"
        // channelName: "千聊"
        // createTime: "2018-11-10 22:47:06.0"
        // haveChild: true
        // phone: "13566939309"
        // ruserEnName: "Devin"
        // ruserId: 294703
        // ruserName: "Devin"
        tableData2: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    }
  }
</script>


<style lang="scss">
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
