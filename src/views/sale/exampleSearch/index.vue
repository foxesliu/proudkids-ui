<template>
  <div class="app-container calendar-list-container" style="padding-top:50px;">
    <el-row v-if="pageFirst">
      <el-col :span="8" :offset="8">
        <el-form ref="form" :model="form" label-width="0">
          <el-form-item prop="phone">
            <el-input
              placeholder="绑定手机号（批量）"
              v-model.trim="form.phone">
            </el-input>
          </el-form-item>

          <el-form-item prop="name">
            <el-input
              placeholder="中文名字"
              v-model.trim="form.name">
            </el-input>
          </el-form-item>

          <el-form-item prop="enname">
            <el-input
              placeholder="英文名字"
              v-model.trim="form.enname">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('form')" style="width: 100%">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row v-else="pageFirst">
      <el-button
        style="float: right;margin-bottom:20px;"
        @click="backFirst"
      >
        返回
      </el-button>
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="cctree"
          label="分配CC">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.cctree}}</p>
              <div slot="reference" class="name-wrapper" v-if="scope.row.cctree">
                <el-tag size="medium">
                  {{ scope.row.cctree | ccFilter }}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="绑定手机">
        </el-table-column>
        <el-table-column
          prop="cnName"
          label="中文名字">
        </el-table-column>
        <el-table-column
          prop="enName"
          label="英文名字">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="级别">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="注册时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="用户详情">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
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
    </el-row>
  </div>
</template>

<script>
  import {exaSearchCenter} from '@/api/sale'
  import {fetchTree} from '@/api/dept'
  import {getUserList} from '@/api/user'
  //import { fetchDeptTree } from '@/api/role'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  // import { parseTime } from '@/utils'
  import {mapGetters} from 'vuex'
  import {getRightDepth, getAllDepth, getAllId} from '@/utils/index';
  import ElRadioGroup from 'element-ui/packages/radio/src/radio-group'
  import ElOption from "element-ui/packages/select/src/option"
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";


  export default {

    components: {ElButton},
    data() {
      return {
        loading: true,
        form: {
          name: null,
          enname: null,
          phone: null,
          userId: null,
          pages: 1,
          pageSize: 10,
          roleId: null
        },
        tableData: [],
        page: {
          currentPage1: 1,
          currentPage2: 5,
          currentPage3: 5,
          currentPage4: 1
        },
        total: 0,
        userIds: '',
        queryList: {
          'deptIds': null
        },
        pageFirst: true,
        rules: {
          name: [
            {required: true, message: '请输入中文名字', trigger: 'blur'},
            {max: 20, message: '输入名字过长', trigger: 'blur'}
          ],
          enname: [
            {required: true, message: '请输入中文名字', trigger: 'blur'},
            {max: 20, message: '输入名字过长', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请填写正确手机号吗', trigger: 'blur'},
            {
              pattern: /^1[34578]\d{9}$/,
              message: '手机号格式不正确',
              trigger: 'blur'
            }
          ],

        }
      }
    },
    computed: {
      ...mapGetters([
        'userId',
        'depthTree',
        'deptId',
        'roles', 'roleIds'
      ])
    },
    filters: {
      ccFilter(val) {
        if (val) {
          let num1 = val.indexOf('(')
          let num2 = val.indexOf(')')
          return val.substring(num1 + 1, num2)
        } else {
          return '未分配'
        }
      }
    },
    created() {
      //this.form.userId = this.userId
      this.form.roleId = this.roleIds[0];
      //console.log(this.roleIds)
      this.getDepthTree();
    },
    methods: {
      handleSizeChange(val) {
        this.form.pageSize = val
        this.onSubmit();
      },
      handleCurrentChange(val) {
        this.form.pages = val
        this.onSubmit();
      },
      //表单验证
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            //alert('submit!');
            this.onSubmit(form)

          } else {
            return false;
          }
        });
      },
      onSubmit() {
        if (this.form.userId == '') {
          this.form.userId = null
        }

        if (this.form.phone == '') {
          this.form.phone = null
        }

        exaSearchCenter(this.form)
          .then(response => {
            if (!response.data.result) {
              this.$message(response.data.msg)
            } else {
              this.tableData = response.data.result.records
              this.total = response.data.result.total
              this.pageFirst = false
              this.loading = false
            }
          })
        //this.$router.push({path:'exampleDetailStatic'});//类似post传参
      },
      //初始获取部门树并保存vuex
      getDepthTree() {
        fetchTree(this.ruleForm)
          .then(response => {
            //存储部门树
            this.$store.commit('SET_DEPTH_TREE', response.data)
            //获取部门下所有的信息
            let allDepth = getAllDepth(this.depthTree, this.deptId)

            //提取部门下所有的id
            let idList = getAllId(allDepth.id, allDepth.children)
            this.queryList.deptIds = idList
            this.getUsers()
          })
      },
      //获取相应用户ids
      getUsers() {
        if (this.roles.some(v => v === 'SALE')) {
          this.form.userId = this.userId;
        } else {
          getUserList(this.queryList)
            .then(response => {
                let userIdObj = response.data
                for (let i = 0; i < userIdObj.length; i++) {
                  if (i == 0) {
                    this.userIds = userIdObj[i].userIds
                  } else {
                    this.userIds += ',' + userIdObj[i].userIds
                  }

                }
                this.form.userId = this.userIds
              }
            )
        }

      },
      //查看详情
      handleClick(arg) {
        sessionStorage.setItem('exampleType', arg.billType)
        this.$router.push({path: '/detail/user', query: {phone: arg.phone, type: arg.billType}});//类似post传参
      },
      backFirst() {
        this.pageFirst = true
      }
    }
  }
</script>

<style>

</style>
