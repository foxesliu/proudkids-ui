<template>
  <div class="aom-container">
    <div class="p-20">
      <div class="h-30">
        <div class="pull-left font25">频道管理</div>
        <div class="pull-right">
          <el-button type="primary"
                     @click="toAdd()"><i
            class="el-icon-plus"></i> 增加
          </el-button>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="mt-20">
        <el-table :data="list" border style="width: 100%">
          <el-table-column prop="name" label="名称" align="center"></el-table-column>
          <el-table-column label="排序" prop="rank" align="center"></el-table-column>
          <el-table-column label="是否显示" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.isDisplay" active-color="#13ce66"
                         disabled="disabled"
                         inactive-color="#ff4949"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="修改" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="toEdit(scope.row)" size="mini">修改</el-button>
            </template>
          </el-table-column>
          <el-table-column label="移除" align="center">
            <template slot-scope="scope">
              <el-button type="danger" @click="del(scope.row.id)" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog title="增加频道" :visible.sync="addDialogShow">
      <div>
        <div class="h-50 o-hidden">
          <div class="pull-left width30 t-right pr-20">名称：</div>
          <div class="pull-left">
            <el-input placeholder="请输入名称" v-model="addData.name"></el-input>
          </div>
        </div>
        <div class="h-50 o-hidden">
          <div class="pull-left width30 t-right pr-20">排序：</div>
          <div class="pull-left">
            <el-input type="number" v-model="addData.rank" placeholder="请输入"></el-input>
          </div>
        </div>
        <div class="h-50 o-hidden">
          <div class="pull-left width30 t-right pr-20">Title：</div>
          <div class="pull-left">
            <el-input placeholder="请输入Title" v-model="addData.title"></el-input>
          </div>
        </div>
        <div class="h-50 o-hidden">
          <div class="pull-left width30 t-right pr-20">Keywords：</div>
          <div class="pull-left">
            <el-input placeholder="请输入Keywords" v-model="addData.keywords"></el-input>
          </div>
        </div>
        <div class="h-50 o-hidden">
          <div class="pull-left width30 t-right pr-20">是否显示：</div>
          <div class="pull-left">
            <el-switch v-model="addData.isDisplay"
                       active-color="#13ce66"
                       inactive-color="#ff4949"></el-switch>
          </div>
        </div>
        <div class="o-hidden">
          <div class="pull-left width30 t-right pr-20">描述：</div>
          <div class="pull-left">
            <el-input v-model="addData.desc" type="textarea" style="width:400px;"
                      :rows=4 placeholder="请输入"></el-input>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogShow=false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改频道" :visible.sync="editDialogShow">
      <div>
        <div class="h-50 o-hidden">
          <div class="pull-left width30 t-right pr-20">名称：</div>
          <div class="pull-left">
            <el-input placeholder="请输入名称" v-model="editData.name"></el-input>
          </div>
        </div>
        <div class="h-50 o-hidden">
          <div class="pull-left width30 t-right pr-20">排序：</div>
          <div class="pull-left">
            <el-input type="number" v-model="editData.rank" placeholder="请输入"></el-input>
          </div>
        </div>
        <div class="h-50 o-hidden">
          <div class="pull-left width30 t-right pr-20">Title：</div>
          <div class="pull-left">
            <el-input placeholder="请输入Title" v-model="editData.title"></el-input>
          </div>
        </div>
        <div class="h-50 o-hidden">
          <div class="pull-left width30 t-right pr-20">Keywords：</div>
          <div class="pull-left">
            <el-input placeholder="请输入Keywords" v-model="editData.keywords"></el-input>
          </div>
        </div>
        <div class="h-50 o-hidden">
          <div class="pull-left width30 t-right pr-20">是否显示：</div>
          <div class="pull-left">
            <el-switch v-model="editData.isDisplay"
                       active-color="#13ce66"
                       inactive-color="#ff4949"></el-switch>
          </div>
        </div>
        <div class="o-hidden">
          <div class="pull-left width30 t-right pr-20">描述：</div>
          <div class="pull-left">
            <el-input v-model="editData.desc" type="textarea" style="width:400px;"
                      :rows=4 placeholder="请输入"></el-input>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogShow=false">取 消</el-button>
        <el-button type="primary" @click="edit()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
  import {getCmsCate, editCmsCate, addCmsCate, delCmsCate} from '../../../api/aom.js'

  export default {
    components: {},
    data() {
      return {
        addDialogShow: false,
        addData: {
          isDisplay: true,
          name: '',
          rank: 0,
          desc: '',
          title: '',
          keywords: ''
        },
        editDialogShow: false,
        editData: {
          isDisplay: true,
          name: '',
          desc: '',
          rank: 0,
          title: '',
          keywords: ''
        },
        list: []
      }
    },
    created() {
      this.getData();
    },
    methods: {
      add(){
        //console.log(this.addData);
        let obj = {
          isDisplay: this.addData.isDisplay ? '1' : '0',
          name: this.addData.name,
          rank: this.addData.rank,
          desc: this.addData.desc,
          title: this.addData.title,
          keywords: this.addData.keywords
        };
        addCmsCate(obj).then((res) => {
          if (res.data) {
            this.addDialogShow = false;
            this.getData();
          }
        })
      },
      edit(){
        //console.log(this.editData);
        let obj = {
          isDisplay: this.editData.isDisplay ? '1' : '0',
          name: this.editData.name,
          rank: this.editData.rank,
          desc: this.editData.desc,
          id: this.editData.id,
          title: this.editData.title,
          keywords: this.editData.keywords
        };
        //console.log(obj)
        editCmsCate(obj).then((res) => {
          if (res.data) {
            this.editDialogShow = false;
            this.getData();
          }
        })
      },
      toEdit(row){
        this.editData = row;
        this.editDialogShow = true;
      },
      toAdd(){
        this.addData = {isDisplay: true, name: '', rank: 0};
        this.addDialogShow = true;
      },
      del(id){
        this.$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delCmsCate(id).then((res) => {
            if (res.data) {
              this.$message({type: 'success', message: '删除成功!'});
              this.getData();
            }
          })
        }).catch(() => {
          this.$message({type: 'info', message: '已取消删除'});
        });
      },
      getData(){
        getCmsCate().then((res) => {
          this.list = (res.data);
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i]['isDisplay'] === '1') {
              this.list[i]['isDisplay'] = true;
            } else {
              this.list[i]['isDisplay'] = false;
            }
          }
          console.log(this.list)
        })
      }
    },
    filters: {}
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  @import '../../aom/index.scss';

  .aom-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: white;
    .p-20 {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
</style>
