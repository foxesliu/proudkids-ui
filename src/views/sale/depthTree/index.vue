<template>
  <el-row>
    <el-col :span="8">
      <el-select
        :disabled="disableDeep>0"
        v-model="area"
        placeholder="销售大区"
        filterable>
        <el-option
          v-for="(item,index) in areaOptions"
          :key="index"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="8">
      <el-select
        :disabled="disableDeep>1"
        v-model="group"
        placeholder="销售组"
        filterable>
        <el-option
          v-for="(item,index) in groupOptions"
          :key="index"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="8">
      <el-select
        :disabled="disableDeep>2"
        v-model="member"
        placeholder="销售组员"
        filterable>
        <el-option
          v-for="(item,index) in memberOptions"
          :key="index"
          :label="item.name"
          :value="item.userIds"
          :disabled="item.userIds === disableId">
          <span style="float: left">{{ item.name }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.roleName }}</span>
        </el-option>
      </el-select>
      <!--<el-button @click="ressss">充电的的</el-button>-->
    </el-col>
  </el-row>

</template>
<script>

  import waves from '@/directive/waves/index.js' // 水波纹指令
  // import { parseTime } from '@/utils'
  import {mapGetters} from 'vuex'
  import {fetchTree} from '@/api/dept'
  import {getUserList} from '@/api/user'
  import ElRadioGroup from 'element-ui/packages/radio/src/radio-group'
  import ElOption from "element-ui/packages/select/src/option"
  import {getRightDepth, getAllDepth, getAllId} from '@/utils/index';

  export default {
    props: ["message1", "disableId"],
    components: {
      ElOption,
      ElRadioGroup
    },
    name: 'depthTree',
    data() {
      return {
        depthId1: null,
        areaOptions: [],
        groupOptions: [],
        memberOptions: [],
        disableDeep: 0,
        firstOrNot: true,
        area: [],
        group: [],
        member: [],
        members: [],
        queryList: {
          deptIds: null
        }
      }
    },
    computed: {
      ...mapGetters([
        'depthTree',
        'deptId',
        'roles',
        'userId'
      ]),

    },
    watch: {
      //切换大区
      area: function (val) {
        this.depthId1 = val
        if (this.depthId1) {
          this.getDepthDetail()
        }
        for (let i = 0; i < this.areaOptions.length; i++) {
          if (this.areaOptions[i].id == val) {
            this.groupOptions = this.areaOptions[i].children;
            //是否首次切换
            //console.log(this.firstOrNot)
            if (this.firstOrNot) {
              this.group = null
            }
            //
            this.member = null
            return
          }
        }
      },
      //切换小组
      group: function (val) {
        console.log(val)
        this.depthId1 = val
        if (this.depthId1) {
          this.getDepthDetail()
        }
        this.member = null
        if (this.disableDeep == 3) {
          this.member = this.userId
        }

      },
      //切换组员
      member: function (val) {
        this.members = val
        console.log(val)
        this.sendToParent()

      }
    },
    created() {
      this.getDepthTree();
      //console.log(this.deptId)

    },
    methods: {
      ressss() {
        window.reload()
      },
      empty() {
        switch (this.disableDeep) {
          case 0:
            this.area = null
            this.group = null
            this.member = null
            break;
          case 1:
            this.group = null
            this.member = null
            break;
          case 2:
            this.member = null
            break;
          default:
            console.log('')
        }
      },
      //初始获取部门树并保存vuex
      getDepthTree() {
        fetchTree(this.ruleForm)
          .then(response => {
            //存储部门树
            console.log(response.data)
            this.$store.commit('SET_DEPTH_TREE', response.data)
            //获取大区列表
            this.areaOptions = this.depthTree[0].children
            console.log(this.depthTree[0].children)
            this.getDepthDetail();
            //禁用上级部门
            var deep = getRightDepth(this.depthTree, this.deptId)
            console.log(deep)
            let allDepth = getAllDepth(this.depthTree, this.depthId1)
            if (deep == 1) {
              this.area = allDepth.id

            } else if (deep == 2) {
              this.area = allDepth.parentId
              //拉去区下小组信息
              this.group = allDepth.id
              //console.log(this.group)
              //判断组员组长
              if (this.roles[0] == 'SALE') {
                this.member = this.userId
                console.log(this.member)
                deep = 3

              }

            }
            this.disableDeep = deep
            this.firstOrNot = false
          })
        //this.firstOrNot = !this.firstOrNot
      },
      getDepthDetail() {
        this.depthId1 = this.depthId1 ? this.depthId1 : this.deptId
        //获取部门深度
        //let deep = getRightDepth(this.depthTree,this.depthId1)
        //获取部门下所有的信息
        let allDepth = getAllDepth(this.depthTree, this.depthId1)
        //提取部门下所有的id
        let idList = getAllId(allDepth.id, allDepth.children)
        this.queryList.deptIds = idList
        this.getUsers()
      },


      //获取相应用户ids
      getUsers() {
        //console.log(this.queryList)
        getUserList(this.queryList)
          .then(response => {

              this.memberOptions = response.data

              this.members = [];
              if (this.member) {
                this.members.push(this.member)
                this.members = this.members.join("")
              } else {
                for (let i = 0; i < this.memberOptions.length; i++) {
                  this.members.push(this.memberOptions[i].userIds)
                }
                this.members = this.members.join(",")
                this.$emit("listenToChildEvent", this.members)

              }

            }
          )
      },
      //向父组件传值
      sendToParent: function () {
        this.$emit("listenToChildEvent", this.members)
      }
    }
  }
</script>
