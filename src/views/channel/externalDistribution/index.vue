<template>
  <div class="app-container calendar-list-container">
    <el-table
      ref="singleTable"
      :data="tableData"
      border
      align="center"
      highlight-current-row
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        label="编号"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        property="userDeptInfo"
        label="销售大区"
        >
        <template slot-scope="scope">{{ scope.row.userDeptInfo | areaGroupIntercept(1) }}</template>
      </el-table-column>
      <el-table-column
        property="userDeptInfo"
        label="销售小组"
        >
        <template slot-scope="scope">{{ scope.row.userDeptInfo | areaGroupIntercept(2) }}</template>
      </el-table-column>
      <el-table-column
        property="userDeptInfo"
        label="销售CC">
        <template slot-scope="scope">{{ scope.row.userDeptInfo | areaGroupIntercept(3) }}</template>
      </el-table-column>
      <el-table-column
        property="num"
        label="分配例子数">
      </el-table-column>
      <el-table-column
        property="assignNum"
        label="分配个数">
        <template slot-scope="scope">
          <div v-if="!scope.row.show">
            <span style="display:inline-block;min-width: 60px;">{{ scope.row.assignNum }}</span>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </div>
          <div v-if="scope.row.show">
            <el-input
              v-model="scope.row.assignNum"
              size="mini"
              type="number"
              class="small-input">
            </el-input>
            <el-button
              size="mini"
              type="text"
              @click="handleSure(scope.$index, scope.row)">确定</el-button>
          </div>
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

</template>

<script>
  import ElRadioGroup from 'element-ui/packages/radio/src/radio-group'
  import ElOption from "element-ui/packages/select/src/option"
  import { externalCheck, externalUpdate } from '@/api/channel'
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input.vue";
  export default {
    components: {
      ElInput,
      ElRadioGroup,
      ElOption,
    },
    data() {
      return {
        loading: true,
        queryList:{
          pages:1,
          pageSize:10,
        },
        tableData: [],
        upData: {},
        currentRow: null,
        page: {
          currentPage1: 1,
          currentPage2: 5,
          currentPage3: 5,
          currentPage4: 1
        },
        total: 0,
      }
    },
    created () {
      this.getData();
    },
    methods: {
      handleEdit(index, row) {

        console.log(row)
        for(let i=0;i<this.tableData.length;i++){
          if(this.tableData[i].show){
            this.upData.userId = this.tableData[i].userId
            this.upData.assignNum = parseFloat(this.tableData[i].assignNum)
            this.$set(this.tableData[i],'show',false)
          }
        }
        this.$set(this.tableData[index],'show',true)

        if(this.currentRow && this.currentRow.userId != row.userId){
          this.upData.userId = this.currentRow.userId
          this.upData.assignNum = parseFloat(this.currentRow.assignNum)
          this.updateData()
          this.currentRow = row
        }else {
          this.currentRow = row
        }
      },
      handleSure(index, row) {
        console.log(index)
        console.log(row)
        this.$set(this.tableData[index],'show',false)
        this.upData.userId = row.userId
        this.upData.assignNum = parseFloat(row.assignNum)
        this.updateData();
        this.currentRow = null
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.queryList.pageSize = val
        this.getData()
      },
      handleCurrentChange(val) {
        this.queryList.pages = val
        this.getData()
      },
      getData() {
        externalCheck(this.queryList)
          .then(response =>{
            this.tableData = response.data.result.records
            this.total = response.data.result.total
            this.loading = false
            for(let i=0;i<this.tableData.length;i++){
              this.$set(this.tableData[i],'show',false)
            }
            console.log(this.tableData)
          })
      },
      updateData() {
        externalUpdate(this.upData)
          .then(response => {
            console.log(response.data)
            if(response.data.code==200){
              //this.getData()
              this.$message({
                message: response.data.msg,
                type: 'success'
              });

            }
          })
      }
    }
  }
</script>

<style>
  .small-input{
    width: 60px;
    margin-right:20px;
  }
  .el-input__inner{
    padding: 0 10px;
  }
  .el-table thead th{
    background-color: #f6f6f6;
  }
</style>
