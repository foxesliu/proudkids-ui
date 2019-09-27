<template>
    <div class="container-box">
        <p class="title">参与的渠道</p>
        <template>
            <el-table
                :data="tableData"
                border
                style="width: 100%;font-size:13px;"
                :header-cell-style="{background:'#f9fafc'}"
                >
                <el-table-column
                    prop="channelName"
                    label="参与渠道时间"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    prop="joinDate"
                    label="参与渠道"
                    align="center"
                    >
                    <template slot-scope="scope">
                            <span>{{scope.row.joinDate.substring(0,19)}}</span>
                        </template>
                </el-table-column>  
            </el-table>
        </template>
         <!-- 分页 -->
        <div class="pages-box">                
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
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
    import {getChannelsByRuserid, getInviteByRuserid} from '@/api/detail' // 編輯學生
    import {mapGetters} from 'vuex'
    export default {
        data(){
            return{
                ruserId:'',
                tableData:[],
                formDate:{
                    pagesSize:null,
                    pages:null,
                },
                //分页
                pageSize:[20, 50, 100],
                pageLimit:20,
                totalnum:null, //列表总数
                currentPage: 1,
            }
        },
        created() {
            this.getList()
        },
        computed: {
            },
        methods:{
            handleSizeChange(val) {
                this.formDate.pagesSize =   String(val)
                this.getList()
                console.log(val);
            },
            handleCurrentChange(val) {
                this.formDate.pages =   String(val) 
                this.getList()
                console.log(`当前页: ${val}`);
            },
            getList(){
               this.ruserId = this.$route.query.ruserId
                console.log(this.ruserId)
                getChannelsByRuserid(this.ruserId,this.formDate).then((res) => {
                    console.log(res.data)
                    this.tableData = res.data.data.records
                    this.totalnum=res.data.data.total
                }).catch((res=>{
                    console.log(res)
                }))
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .container-box{
        padding: 0 20px;
        .title{
            color: #666666;
            font-size: 24px;
        }
        .pages-box{
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
    }
</style>