<template>
    <div>
        <div class="container-box">
            <p>班级人数：3/4</p>
            <div>
                <template >
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%;font-size:13px;"
                        :header-cell-style="{background:'#f9fafc'}"
                        >
                        <el-table-column
                        prop="date"
                        label="CC"
                        align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="ClassIn Account"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="Chinese Name"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="English Name"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="Remain Lessons"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="Student Specs               "
                        align="center">
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" style="width:75px">Details</el-button>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="用户详情页 "
                        align="center">
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" style="width:75px">查看</el-button>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="更换老师组合 "
                        align="center">
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" style="width:75px">转移</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <div class="check-box">
                <span>Class Information 班级上课情况</span>
                <el-button type="primary" size="mini" style="width:70px">Go</el-button>
            </div>
            <div class="check-box">
                <span>Couresware 课件</span>
                <el-button type="primary" size="mini" style="width:70px">Go</el-button>
            </div>
            <p>Class Profiles 班级属性</p>
            
            <table>
                <tr>
                    <td>
                        <span>Course ID</span>
                        <span>SUM-118</span>
                    </td>
                    <td>
                        <span>Created Time</span>
                        <span>2017-12-26</span>
                    </td>
                    <td>
                        <span>Start Date</span>
                        <span>2017-12-26</span>
                    </td>
                    <td>
                        <span>End Date</span>
                        <span>2017-12-26</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>Class Time</span>
                        <span>18:00--18:25</span>
                    </td>
                    <td>
                        <span>School Time</span>
                        <span>Monday[CT],Monday[CT],Monday[CT]</span>
                    </td>
                    <td>
                        <span>Package</span>
                        <span>Summer Promo Heat 2Lvl2</span>
                    </td>
                    <td>
                        <span>Course Name</span>
                        <span>C1-35F-2-L<el-button type="primary" size="mini" style="margin-left:30px">修改班级类型</el-button></span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>Status</span>
                        <span>Normal class</span>
                    </td>
                    <td>
                        <span>Term Type</span>
                        <span>short Term</span>
                    </td>
                    <td>
                        <span>Level</span>
                        <span>2</span>
                    </td>
                    <td>
                        <span>link</span>
                        <span><el-button type="primary" size="mini" style="width:70px">Clik</el-button></span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <span style="width:18%">CT</span>
                        <span>
                            <el-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top">
                                <el-button size="mini">上右</el-button>
                            </el-tooltip>
                        </span>
                        
                    </td>
                    <td colspan="2">
                        <span style="width:18%">FT</span>
                        <span>
                            <el-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top">
                                <el-button size="mini">上右</el-button>
                            </el-tooltip>
                            <el-button type="primary" size="mini" style="margin-left:30px">修改老师</el-button>
                        </span> 
                    </td>
                    
                </tr>
            </table>
            
            <p>Students,who used be in this class 曾经在这个班级里待过的学生：2</p>
            <div>
                <template>
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%;font-size:13px;"
                        :header-cell-style="{background:'#f9fafc'}"
                        >
                        <el-table-column
                        prop="date"
                        label="CC"
                        align="center"
                        fon
                        >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="ClassIn Account"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="Chinese Name"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="English Name"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="Finished"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="Start-End"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        
                        label="Student Specs "
                        align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" style="width:75px">Details</el-button>
                        </template>
                        </el-table-column>
                        <el-table-column
                        
                        label="用户详情页 "
                        align="center">
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" style="width:75px">查看</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
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
                }]
            }
        }
    }
</script>

<style lang="scss" scoped>
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
    .check-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #eeeeee;
        border-radius: 5px;
        margin-top: 20px;
        height: 60px;
        padding: 0 30px;
    }
    table{
        width: 100%; 
        border: 1px solid #eeeeee;
        border-collapse: collapse;
        font-size: 13px;
        tr{
            border: 1px solid #eeeeee;
            td{    
                border: 1px solid #eeeeee;         
                width: 25%; 
                span{
                    display: inline-block;
                    height: 55px; 
                    line-height: 55px;
                }
                span:nth-child(1){
                    width: 36%;
                    background: #f9fafc;
                    text-align: right;
                    padding-right: 20px;
                }
                span:nth-child(2){
                    padding-left: 15px;
                }
            }
        }
    }
}
</style>