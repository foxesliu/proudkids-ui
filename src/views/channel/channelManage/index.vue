<template>
  <div class="app-container calendar-list-container">
    <div style="text-align: right;margin-bottom:20px;">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加
      </el-button>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
              highlight-current-row style="width: 100%">

      <el-table-column label="渠道名称">
        <template slot-scope="scope">
          <span>{{scope.row.channelName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户角色">
        <template slot-scope="scope">
          <span>{{scope.row.roleName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="info"
                     @click="handleUpdate(scope.row)">账户信息
          </el-button>
          <el-button size="mini" type="success"
                     @click="handleDetail(scope.row)">详情
          </el-button>

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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="渠道名称" prop="channelName">
          <el-input v-model="form.channelName" :disabled="this.dialogStatus == 'check'" placeholder="请输入渠道名称"></el-input>
        </el-form-item>
        <el-form-item label="登录用户名" prop="userName">
          <el-input v-model="form.userName" :disabled="this.dialogStatus == 'check'" placeholder="请输入登录用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input v-model="form.passWord" :disabled="true" placeholder="默认密码（123456）"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="passWord">
          <el-input v-model="form.accessUrl" placeholder="网址"></el-input>
        </el-form-item>
        <el-form-item label="channelId" prop="channelId" v-if="this.dialogStatus == 'check'">
          <el-input v-model="form.channelId" :disabled="true" placeholder="请输入渠道码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="this.dialogStatus == 'add'" @click="cancel('form')">取 消</el-button>
        <el-button v-if="this.dialogStatus == 'check'" @click="cancel1('form')">关 闭</el-button>
        <el-button v-if="this.dialogStatus == 'add'" type="primary" @click="create('form')">确 定</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  //import { fetchList } from '@/api/role'
  import { channelStatistics, channelAdd } from '@/api/channel'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  export default {
    name: 'table_role',
    directives: {
      waves
    },
    data() {
      return {
        listLoading:true,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          check: '账户信息',
          add: '添加渠道'
        },
        list:[
          {
            roleName: '测试'
          }
        ],
        form: {

        },
        rules: {
          channelName: [
            { required: true, message: '请输入渠道名称', trigger: 'blur'},
            { max: 20, message: '输入名字过长', trigger: 'blur'}
          ],
          userName: [
            { required: true, message: '请输入登录用户名', trigger: 'blur'},
            { max: 20, message: '输入名字过长', trigger: 'blur'}
          ],
        },
        listQuery: {
          type: null,
          userId: null,
          channelId: 0,
          pages:1,
          pageSize:10,
        },
        /*queryList: {
          channelName: null,
          userName: null,
          roleid:null,
          userId:null
        }*/
        page: {
          currentPage1: 1,
          currentPage2: 5,
          currentPage3: 5,
          currentPage4: 1
        },
        total: 0,
      }
    },
    computed: {
      ...mapGetters(['roles','userId'])
    },
    created() {
      console.log(this.roles)
      console.log(this.userId)
      //初始化判断角色
      //stringObject.indexOf(searchvalue,fromindex)
      if(this.roles.indexOf('CHANNEL_USER') >= 0){
        this.listQuery.type = 2
      }else {
        this.listQuery.type = 1
      }
      this.listQuery.userId = this.userId

      this.checkAllChannel()
    },
    methods:{
      checkAllChannel() {
        channelStatistics(this.listQuery)
          .then(response => {
            console.log(response.data)
            this.list = response.data.result.records
            this.total = response.data.result.total
            //var data = response.data.result
            //console.log(data)
            //数据处理
            this.listLoading = false
            /*for(var i=0;i<data.length;i++){
              var obj={new:0,unpay:0,pay:0}
              var typeArray = data[i].billsTypeCollection.split(',')
              //console.log(typeArray)
              var countArray = data[i].billsCountCollection.split(',')
              //console.log(countArray)
              obj.name = data[i].channelName
              obj.channelId = data[i].channelId
              for(var j=0;j<typeArray.length;j++){
                if(typeArray[j]==0){
                  obj.new = countArray[j]
                }else if(typeArray[j]==1){
                  obj.unpay += parseInt(countArray[j])
                }else if(typeArray[j]==3){
                  obj.pay = countArray[j]
                }else if(typeArray[j]==4){
                  obj.unpay += parseInt(countArray[j])
                }
              }
              //向数组中添加对象
              this.list.push(obj)
            }*/
          })
      },
      handleCreate() {
        this.dialogFormVisible = true
        this.dialogStatus = 'add'
        this.form = {}
        this.form.userId = this.userId
      },
      handleUpdate(obj) {
        this.dialogFormVisible = true
        this.dialogStatus = 'check'
        this.form = obj
      },
      handleDetail(obj){
        console.log(obj)
        this.$router.push({path:'statistics',query:{channelId:obj.channelId}});
      },
      cancel() {
        this.dialogFormVisible = false
      },
      cancel1() {
        this.dialogFormVisible = false
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.listQuery.pageSize = val

        this.checkAllChannel();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.listQuery.pages = val

        this.checkAllChannel();
      },
      create(formName) {
        //验证
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //alert('submit!');
            this.form.roleid = 34
            this.form.deptId = 12
            console.log(this.form)
            channelAdd(this.form)
              .then(response =>{
                console.log(response.data)
                if(response.data.code == 200){
                  this.$message({
                    message: '渠道添加成功！',
                    type: 'success'
                  });
                  this.dialogFormVisible = false
                  this.checkAllChannel()
                }else{
                  this.$message({
                    message: response.data.msg,
                    type: 'warn'
                  });
                }
              })

          } else {
            console.log('error submit!!');
            return false;
          }
        });

      }
    }
  }
</script>

<style>

</style>
