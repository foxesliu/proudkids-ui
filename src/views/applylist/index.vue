<template>
    <div class="main-box">
        <!-- <div class="title-box">
            <h3>{{title1}}>{{title}}</h3>
        </div> -->
        <div class="search-box border-bottom">
            <span><el-input v-model="searchFirstName" placeholder="First Name" size="small" clearable ></el-input></span>
            
            <span><el-input v-model="searchLastName" placeholder="Last Name" size="small" clearable></el-input></span>
            <!-- <span><el-input v-model="searchIphone" placeholder="Phone" size="small" clearable></el-input></span>
            <span><el-input v-model="searchEmail" placeholder="Email" size="small" clearable></el-input></span>            -->
            <div class="search-btn" ><el-button type="danger" size="small"  @click="searchUser">查询</el-button></div>
            
                
                
        </div>  
        <div class="table-box">           
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column
                prop="createTime"
                label="Application time" align="center">
                </el-table-column>
                <el-table-column
                prop="firstName"
                label="First Name" align="center">
                    

                </el-table-column>

                <!-- <el-table-column
                prop="billSn"
                label="工单号" align="center">
                </el-table-column> -->
                <el-table-column
                prop="lastName"
                label="Last Name" align="center">

                </el-table-column>
                <!-- <el-table-column
                prop="gender"
                label="Gender" align="center">
                <template slot-scope="scope">
                        <span>
                            {{scope.row.gender == '0' ? 'Male' : 'Female' }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="character"
                label="Character" align="center">
                <template slot-scope="scope">
                        <span>
                            {{scope.row.character == '0' ? 'Full-Time' : 'Part-Time' }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="email"
                label="Email" align="center">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="Phone" align="center">
                </el-table-column>
                <el-table-column
                prop="education"
                label="Education" align="center">
                </el-table-column> -->
                
               
                <el-table-column               
                label="简历详情" align="center" >
                    <template slot-scope="scope">
                        <el-button @click="gotoPage(scope.$index)" type="primary" size="small">详情</el-button>
                    </template>
                </el-table-column>               
            </el-table>
            
        </div>
        <!-- 分页 -->
        <div class="pages-box">                
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="pageSize"
            :page-size="pageLimit"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total='totalnum'>
            </el-pagination>
        </div>       
    </div>
</template>

<script>
    import { applyList } from '@/api/applylist.js'
    import { mapGetters } from 'vuex'
    import local from '@/views/i18n-demo/local'
    const viewName = 'i18nView'
    
    export default {
        data(){
            return{
                searchIphone:null,
                searchFirstName:null,
                searchLastName:null,
                searchEmail:null,
                
                title1:'',
                title:'',
                //分页简历列表
                applyList:{
                    //userId:'41',
                    type:-1, //0 全职、 1 兼职
                    limit:null,
                    firstName:null,
                    lastName:null,
                    phone:null,
                    email:null,
                    pages:'1',
                    pageSize:'20',                 
                },
                //分页
                pageSize:[20, 50, 100],
                pageLimit:20,
                totalnum:null, //列表总数
                currentPage4: 1,
                toBeConfirmNum:'1',
                input: '',
                tableData: [
                    
                ],
                
                               
                    
                }
        },
        methods: {
            handleSizeChange(val) {
                this.applyList.limit =   String(val)
                
                this.searchUser()
                console.log(val);
            },
            handleCurrentChange(val) {
                this.applyList.pages =   String(val)
               
                this.searchUser()
                console.log(`当前页: ${val}`);
            },
            gotoPage(index) {
                console.log(index);
                sessionStorage.setItem('index',JSON.stringify(this.tableData[index])) 
                this.$router.push({
                    path: 'applydetail',
                    query: {data:this.tableData[index]}
                });
            },
            
            
           
            searchUser(){
                //检索学生
                //this.searchFirstName == '' ? this.searchFirstName = null :  this.searchFirstName = this.searchFirstName
                if(this.searchFirstName == ''){
                    this.searchFirstName = null
                }
                if(this.searchFirstName == ''){
                    this.searchFirstName = null
                }
                if(this.searchFirstName == ''){
                    this.searchFirstName = null
                }
                if(this.searchFirstName == ''){
                    this.searchFirstName = null
                }
                this.applyList.firstName = this.searchFirstName
                this.applyList.lastName = this.searchLastName
                this.applyList.phone = this.searchIphone
                this.applyList.email = this.searchEmail
                
                
                console.log(this.applyList)
                
                applyList(this.applyList)
                .then(res=>{
                    
                    //console.log(res.data.data)
                    this.totalnum =res.data.data.total
                    sessionStorage.setItem('detailParams', JSON.stringify(this.tableData))//存储详细信息 
                    let data = res.data.data.records
                    //console.log(data)
                    //console.log(data.reverse())
                    this.tableData = data
                    //console.log(this.tableData)
                                     
                })
                .catch(res=>{
                    console.log(res);
                })
            }

        },
        computed: {
        ...mapGetters(['grade', 'schedulePoint', 'roleIds', 'userId','regionId','detailPhone', 'detailType','permissions']),
        },
        created() { 
            if (!this.$i18n.getLocaleMessage('en')[viewName]) {
                this.$i18n.mergeLocaleMessage('en', local.en)
                this.$i18n.mergeLocaleMessage('zh', local.zh)
            }
            let [roleId] = this.roleIds;
            if (roleId == 23 || roleId == 24 || roleId == 25 || roleId == 32  || roleId == 27) {
                this.$i18n.locale = 'zh'
                this.$store.dispatch('setLanguage', 'zh')
                this.isEnglish = true;
            } else {
                this.$i18n.locale = 'en'
                this.$store.dispatch('setLanguage', 'en')
                this.isEnglish = true;
            }
            
            this.searchUser()
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index.scss';
  
  .main-box{
      color: #606266;
      .title-box{
        font-size: 18px;
        color: $color-orange;
        height: 60px;
        
        border: 1px solid #ccc;
        padding-left: 20px;
      }
      .search-box{
          height: 60px;
          margin: 20px;
          span{
              display: inline-block;
              width:180px;
              margin-right: 10px;
          }
          .block{
              display: inline-block;
          }
          p{
              display: inline;
          }
          .search-btn{
              float: right;
              margin-right: 5px;
          }
      }
      
      .table-box{
          margin:20px;
      }
      .pages-box{
          margin: 20px;
      }
  }

</style>