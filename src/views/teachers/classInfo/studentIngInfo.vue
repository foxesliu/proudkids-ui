<template>
    <div class= "container-box">
        <div class="name-box">
            <div>
                <span>Chinese name</span>
                <span>English name</span>
            </div>
            <div>
                <span>Chinese name</span>
                <span>English name</span>
            </div>
        </div>
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
                        label="预习材料"
                        align="center"
                        >
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" style="width:75px">进入</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="Sub-Teacher"
                        align="center"
                        >
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" style="width:75px">Link</el-button>
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
    .name-box{
        display: flex;
        height: 50px;
        margin: 25px 0;
        border: 1px solid #eeeeee;
        border-radius: 6px;
        align-items: center;
        div{
            width: 50%;
            font-size: 0;
            span{
                display: inline-block;
                font-weight: bold;
                line-height: 48px;
                font-size: 13px;
            }
            span:nth-child(1){
                background: #f9fafc;
                width: 25%;
                text-align: right;
                padding-right: 20px;
            }
            span:nth-child(2){          
                padding-left: 20px;
            }
        }
    }
    .content-box{
        background: #ffffff;
        border: 1px solid #eeeeee;
        border-radius: 6px;
        padding: 0 25px 20px 25px;
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