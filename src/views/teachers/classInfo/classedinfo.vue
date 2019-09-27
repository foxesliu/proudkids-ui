<template>
    <div class= "container-box">
        <p>Class Name:</p>
        <div class="content-box">
            <div class="top-btn">
                <span :class="{clickColor:STactive}" @click="start()">Start Soon(1)</span>
                <span :class="{clickColor:OVactive}" @click="over()">Already Over(2)</span>
            </div>
            <template>
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%;font-size:13px;"
                    :header-cell-style="{background:'#f9fafc'}"
                    >
                    <el-table-column
                        prop="date"
                        label="Course"
                        align="center"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="Date"
                        align="center"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="Attendance"
                        align="center"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="Sub-Teacher"
                        align="center"
                        >
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top">
                                <el-button size="mini">上右</el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="Make up"
                        align="center"
                        >
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" style="width:75px">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="Link"
                        align="center"
                        >
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" style="width:75px">查看</el-button>
                        </template>
                    </el-table-column> 
                </el-table>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                }],
                STactive:true,
                OVactive:false,
            }
        },
        methods:{
            start(){
                this.STactive = true;
                this.OVactive = false;
            },
            over(){
                this.STactive = false;
                this.OVactive = true;
            }
        }
    }
</script>

<style  lang="scss" scoped>
.container-box{
    margin: 0 20px;
    color: #606266;
    font-size: 13px;
    padding-bottom: 50px;
    p{
        color: #656565;
        font-size: 18px;
        font-weight: bold;
        margin-top: 30px;
        margin-bottom: 20px;
    }
    .content-box{
        background: #ffffff;
        border: 1px solid #eeeeee;
        border-radius: 6px;
        padding: 0 25px;
        .top-btn{
            height: 50px;
            line-height: 48px;
            margin-bottom: 15px;
            border-bottom: 1px solid #eeeeee;
            span{
                display: inline-block;
                width: 150px;
                text-align: center;
                font-weight: bold;       
                cursor: pointer;
                outline: none;     
                -webkit-user-select:none;
                -moz-user-select:none;
                -ms-user-select:none;
                user-select:none;  
            }      
        }
    }    
}
.clickColor{
    color: #449cfc;
    border-bottom: 2px solid #449cfc;
}
</style>