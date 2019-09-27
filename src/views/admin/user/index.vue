<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-cascader
        style="vertical-align: middle;margin-bottom:10px;"
        clearable
        change-on-select
        :options="treeDeptData1"
        v-model="selectedOptions"
        @change="handleChange">
      </el-cascader>
      <el-select v-model="selectedRole" placeholder="请选择角色" @change="changeRoles" clearable
                 style="vertical-align: middle;margin-bottom:10px;">
        <el-option
          v-for="item in allRoles"
          :key="item.roleId"
          :label="item.roleName"
          :value="item.roleId">
        </el-option>
      </el-select>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;"
                class="filter-item" placeholder="用户名"
                v-model="listQuery.username"
                clearable>
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;"
                class="filter-item" placeholder="请输入手机号"
                v-model="listQuery.phone"
                clearable>
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button v-if="sys_user_add" class="filter-item"
                 style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="edit">添加
      </el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading"
              element-loading-text="给我一点时间" border fit
              highlight-current-row style="width: 100%">

      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          <span>{{scope.row.userId}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          <span>
            <img v-if="scope.row.avatar" class="user-avatar" style="width: 20px; height: 20px; border-radius: 50%;"
                 :src="scope.row.avatar+'?imageView2/1/w/20/h/20'">
            {{scope.row.username}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="真实姓名">
        <template slot-scope="scope">
          <span>
            {{scope.row.name}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          <span>
            {{scope.row.phone}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属部门" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.deptName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="角色">
        <template slot-scope="scope">
          <span>{{scope.row.roleList[0].roleName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" class-name="status-col" label="状态">
        <template slot-scope="scope">
          <el-tag>{{scope.row.delFlag | statusFilter}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button v-if="sys_user_upd" size="small" type="success"
                     @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button v-if="sys_user_upd" size="small" type="warning"
                     @click="codeUpdate(scope.row)">重置密码
          </el-button>
          <el-button v-if="sys_user_del" size="small" type="danger"
                     @click="deletes(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogDeptVisible">
      <el-tree
        class="filter-tree"
        :data="treeDeptData"
        :default-checked-keys="checkedKeys"
        check-strictly
        node-key="id"
        highlight-current
        ref="deptTree"
        :props="defaultProps"
        @node-click="getNodeData"
        default-expand-all
      >
      </el-tree>
    </el-dialog>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="form.username" placeholder="请输用户名"></el-input>
        </el-form-item>

        <el-form-item label="真实姓名" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输用真实姓名（非必填）"></el-input>
        </el-form-item>

        <el-form-item label="国际区号" prop="gPhone">
          <!--<el-select v-model="editClass.classTime" class="width-300" placeholder="请选择">-->
          <!--<el-option v-for="item in classTimes" :key="item" :label="item" :value="item">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <el-select class="filter-item" v-model="form.phoneCode" placeholder="请选择">
            <el-option v-for="item in phone"
                       :key="item.id" :label="item.name"
                       :value="item.id"
                       :value-key="item.name"
                       :disabled="isDisabled[item.delFlag]">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model.trim="form.phone" placeholder="请输手机号"></el-input>
        </el-form-item>

        <el-form-item v-if="dialogStatus == 'create'" label="密码" placeholder="请输入密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="所属部门" prop="deptName">
          <el-input v-model="form.deptName" placeholder="选择部门" @focus="handleDept()" readonly></el-input>
          <input type="hidden" v-model="form.deptId"/>
        </el-form-item>

        <el-form-item label="角色" prop="role">
          <el-select class="filter-item" v-model="role" placeholder="请选择">
            <el-option v-for="item in rolesOptions" :key="item.roleId" :label="item.roleDesc" :value="item.roleId"
                       :disabled="isDisabled[item.delFlag]">
              <span style="float: left">{{ item.roleDesc }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.roleCode }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" v-if="dialogStatus == 'update' && sys_user_del " prop="delFlag">
          <el-select class="filter-item" v-model="form.delFlag" placeholder="请选择">
            <el-option v-for="item in statusOptions" :key="item" :label="item | statusFilter" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {fetchList, getObj, checkOldUser, addObj, putObj, delObj, resetPassword} from '@/api/user'
  import {roleList, deptRoleList, fetchDeptTree} from '@/api/role'
  import {getParentDepthId, circleTop} from '@/utils/index';
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import {mapGetters} from 'vuex'
  import {Message} from 'element-ui'
  import ElRadioGroup from 'element-ui/packages/radio/src/radio-group'
  import ElOption from "element-ui/packages/select/src/option"
  import DepthTre from "../depthTree2/index.vue";

  export default {
    components: {
      DepthTre
    },
    name: 'table_user',
    directives: {
      waves
    },
    data() {
      return {
        phone: [
          {name: '中国', id: 86},
          {name: '美国/加拿大', id: 1},
          {name: '波兰', id: 48},
          {name: '英国', id: 44},
          {name: '南非', id: 27}
        ],
        treeDeptData: [],
        treeDeptData1: [],
        checkedKeys: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20
        },
        role: undefined,
        form: {
          username: undefined,
          name: undefined,
          phone: undefined,
          password: undefined,
          delFlag: undefined,
          deptId: undefined,
          phoneCode: 86
        },
        rules: {
          username: [
            {
              required: true,
              message: '请输入账户',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
          ],
          phone: [
            {
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            },
//            {
//              //pattern: /^1[34578]\d{9}$/,
//              pattern: /^\d+$/,
//              message: '手机号格式不正确',
//              trigger: 'blur'
//            },
//            {
//              min: 11,
//              max: 11,
//              message: '手机号格式不正确',
//              trigger: 'blur'
//            }
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 20,
              message: '长度在 5 到 20 个字符',
              trigger: 'blur'
            }
          ],
          deptId: [
            {
              required: true,
              message: '请选择部门',
              trigger: 'blur'
            }
          ],
          role: [
            {
              required: true,
              message: '请选择角色',
              trigger: 'blur'
            }
          ]
        },
        statusOptions: ['0', '1'],
        rolesOptions1: [],
        rolesOptions2: [],
        rolesOptions: [],
        dialogFormVisible: false,
        dialogDeptVisible: false,
        userAdd: false,
        userUpd: false,
        userDel: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        isDisabled: {
          0: false,
          1: true
        },
        tableKey: 0,
        selectedOptions: [],
        allRoles: [],
        selectedRole: null
      }
    },
    computed: {
      ...mapGetters([
        'permissions'
      ])
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: '有效',
          1: '无效',
          9: '锁定'
        }
        return statusMap[status]
      }
    },
    created() {
      this.getAllRoles()
      this.getList()
      this.getDepthTree()
      this.sys_user_add = this.permissions['sys_user_add']
      this.sys_user_upd = this.permissions['sys_user_upd']
      this.sys_user_del = this.permissions['sys_user_del']
    },
    methods: {
      //初始化所有角色
      getAllRoles() {
        deptRoleList(0)
          .then(response => {
            this.allRoles = response.data
            console.log(this.allRoles)
          })
      },
      changeRoles() {
        console.log(this.selectedRole)
        this.listQuery.roleId = this.selectedRole
        this.getList();
      },
      getList() {
        this.listLoading = true
        this.listQuery.orderByField = '`user`.create_time'
        this.listQuery.isAsc = false
        fetchList(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      //获取部门树
      getDepthTree() {
        fetchDeptTree()
          .then(response => {
            this.treeDeptData = response.data

            var replace = function (oArr) {
              var nArr = oArr.map(function (obj) {
                var rObj = {};
                rObj.value = obj.id
                rObj.label = obj.name
                if (obj.children.length > 0) {
                  rObj.children = replace(obj.children)
                } else {
                  rObj.children = null
                }
                //rObj.children = obj.children
                return rObj
              })
              return nArr
            }
            this.treeDeptData1 = replace(this.treeDeptData)
            console.log(this.treeDeptData1)
          })
      },
      handleChange(value) {
        console.log(value);
        this.listQuery.deptId = value[value.length - 1]
        console.log(this.listQuery);
        this.getList();
      },
      //获取顶级部门
      getTopParent() {
        fetchDeptTree()
          .then(response => {
            this.treeDeptData = response.data
          })
        //根据点选部门树节点获取父级Id
        var depthParentId = getParentDepthId(this.treeDeptData, this.form.deptId)

        if (depthParentId) {
          //循环n个级别，获取顶级部门Id
          depthParentId = circleTop(this.treeDeptData, depthParentId)
          console.log(depthParentId)
          deptRoleList(depthParentId)
            .then(response => {
              //this.rolesOptions1 = response.data
              this.rolesOptions1 = response.data
              //this.role = undefined
              this.rolesOptions = Array.from(new Set([...this.rolesOptions1, ...this.rolesOptions2]))
            })
        } else {
          this.rolesOptions1 = []
          //this.role = undefined
          this.rolesOptions = Array.from(new Set([...this.rolesOptions1, ...this.rolesOptions2]))
        }
      },

      //根据点选部门拉去角色
      getNodeData(data) {
        this.dialogDeptVisible = false
        this.form.deptId = data.id
        this.form.deptName = data.name
        deptRoleList(data.id)
          .then(response => {
            //this.rolesOptions = response.data
            this.rolesOptions2 = response.data
            this.rolesOptions = Array.from(new Set([...this.rolesOptions1, ...this.rolesOptions2]))
          })
        //获取顶级部门
        this.getTopParent()
      },
      handleDept() {
        fetchDeptTree()
          .then(response => {
            //console.log(response.data)
            this.treeDeptData = response.data
            this.dialogDeptVisible = true
            this.role = undefined
          })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleCreate() {
        //this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      handleUpdate(row) {
        getObj(row.userId)
          .then(response => {
            this.form = response.data
            this.role = row.roleList[0].roleId
            //获取顶级部门
            this.getTopParent()

            this.dialogFormVisible = true
            this.dialogStatus = 'update'
            //根据用户部门角色首次拉取

            deptRoleList(response.data.deptId)
              .then(response => {
                //this.rolesOptions = response.data
                this.rolesOptions2 = response.data
                this.rolesOptions = Array.from(new Set([...this.rolesOptions1, ...this.rolesOptions2]))
              })

          })
      },
      //重置密码
      codeUpdate(row) {
        console.log(row);
        var datas = {};
        datas.username = row.username
        this.$confirm('您确定重置此用户的密码(123456), 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resetPassword(row.username)
            .then(response => {
              console.log(response.data)
              this.$message({
                type: 'success',
                message: '密码重置成功!'
              });
            })

        }).catch(() => {
          /*this.$message({
           type: 'info',
           message: '已取消删除'
           });*/
        });

      },
      create(formName) {
        const set = this.$refs
        console.log(set)
        this.form.role = this.role
        console.log(this.form)
        set[formName].validate(valid => {
          if (valid) {
            addObj(this.form)
              .then((res) => {
                this.dialogFormVisible = false
                this.getList()
                if (res.data.code == 0) {
                  this.$notify({
                    title: '成功',
                    message: '创建成功',
                    type: 'success',
                    duration: 2000
                  })
                }
              })
          } else {
            return false
          }
        })

      },
      message(text, type) {
        Message({
          message: text,
          type: type,
          duration: 1 * 3000
        })
      },
      cancel(formName) {
        this.dialogFormVisible = false
        this.$refs[formName].resetFields()
      },
      update(formName) {
        const set = this.$refs
        this.form.role = this.role
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            this.form.password = undefined
//            checkOldUser(this.form.phone)
//              .then(response => {
//                console.log(response.data)
//              })
            putObj(this.form).then(() => {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
            })
          } else {
            return false
          }
        })
      },
      deletes(row) {
        this.$confirm('此操作将永久删除该用户(用户名:' + row.username + '), 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delObj(row.userId).then(() => {
            this.getList()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          }).cache(() => {
            this.$notify({
              title: '失败',
              message: '删除失败',
              type: 'error',
              duration: 2000
            })
          })
        })
      },
      resetTemp() {
        this.form = {
          id: undefined,
          username: '',
          password: '',
          role: undefined
        }
      }
    }
  }
</script>
