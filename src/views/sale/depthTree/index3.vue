<template>
  <div class="linkage">
    <el-row>
      <el-col :span="8">
        <el-select
          v-model="area"
          placeholder="销售大区"
          :disabled="areaFlag"
          @change="getData">
          <el-option
            v-for="item in areaData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-select
          v-model="group"
          placeholder="销售组"
          :disabled="groupFlag"
          @change="getData">
          <el-option
            v-for="item in groupData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-select
          v-model="member"
          placeholder="销售成员"
          :disabled="memberFlag"
          @change="getData">
          <el-option
            v-for="item in memberData"
            :key="item.userId"
            :label="item.username"
            :value="item.userId">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getExperienceCount} from '@/api/sale'
  import {getTeachersByDeptId} from '@/api/teachers'

  export default {
    props: ['deptData'],
    data() {
      return {
        area: null,
        group: null,
        member: null,
        areaData: [],
        groupData: [],
        memberData: [],

        areaFlag: false,
        groupFlag: false,
        memberFlag: false,

        type: null,
        experienceList: null,
        roleId: null,
        deptUserId: null
      }
    },
    computed: {
      ...mapGetters(['roleIds', 'userId', 'depthTree'])
    },
    created() {
      this.type = this.$route.query.status
      this.experienceList = this.$route.query.experienceList

      this.roleId = this.roleIds[0]
      if (sessionStorage.getItem('deptUserId')) {
        this.deptUserId = sessionStorage.getItem('deptUserId')
      } else {
        this.deptUserId = this.userId
      }

      this.getList()
    },
    methods: {
      getData() {
        const noStart = { //未开始
          regionId: this.area,
          groupId: this.group,
          userId: this.member,
          type: 0
        }
        const ended = { //已结束
          regionId: this.area,
          groupId: this.group,
          userId: this.member,
          type: 1
        }
        const deptData = {
          regionId: this.area,
          groupId: this.group,
          ccId: this.member,
        }
        if (this.type == 0 || this.type == 1 || this.experienceList) { //体验课未开始&&已结束列表查询
          this.$emit('getDeptData', deptData)
        } else {
          this.getNoStart(noStart)//未开始num
          this.getEnded(ended)//已结束num
        }
      },
      async getNoStart(data = {}) {
        const noStart = await getExperienceCount(data)
        const params = {
          ...data,
          num: noStart.data
        }
        this.$emit('getNoStart', params)
      },
      async getEnded(data = {}) {
        const ended = await getExperienceCount(data)
        const params = {
          ...data,
          num: ended.data
        }
        this.$emit('getEnded', params)
      },
      async getList() {
        const result = await getTeachersByDeptId(1)  //获取销售部门数据
        if (result) {
          this.areaData = []
          this.groupData = []
          this.memberData = []
          if (result.data.data.child) {
            this.areaData = result.data.data.child
            this.initOPtions()
          }
          const noStart = { //未开始
            regionId: this.area,
            groupId: this.group,
            userId: this.member,
            type: 0
          }
          const ended = { //已结束
            regionId: this.area,
            groupId: this.group,
            userId: this.member,
            type: 1
          }
          const deptData = {
            regionId: this.area,
            groupId: this.group,
            ccId: this.deptUserId
          }
          if (this.type == 0 || this.type == 1 || this.experienceList) { //体验课未开始&&已结束
            this.$emit('getDeptData', deptData)
          } else {
            this.getNoStart(noStart)//未开始
            this.getEnded(ended)//已结束
          }
        }
      },
      initOPtions() {  //初始化

        this.areaData.forEach((grandparent) => {
          grandparent.users.forEach(item => {
            if (item.id == this.deptUserId) {
              this.areaFlag = true
              this.area = grandparent.id
            }
          })
          if (grandparent.id == this.deptUserId) {
            // console.log('大区' + grandparent.id)
          } else {
            grandparent.child && grandparent.child.forEach(parent => {
              if (parent.id == this.userId) {
                // console.log('组长' + parent.name)
              } else {
                parent.users.forEach((item) => {
                  if (item.userId == this.userId) {
                    if (this.roleId == 17) {
                      this.areaFlag = true
                      this.groupFlag = true
                      this.memberFlag = true
                    } else if (this.roleId == 18) {
                      this.areaFlag = true
                      this.groupFlag = true
                      this.memberFlag = false
                    }

                    if (item.roleId == 18) {
                      this.member = null
                    } else {
                      this.member = item.userId
                    }
                    this.group = parent.id
                    this.area = grandparent.id
                  }
                })
              }
            })
          }
        })
      },
    },
    watch: {
      area(newVal, oldVal) { //大区
        if (newVal && oldVal) {
          this.group = null
          this.member = null
        }
        let arr = this.areaData.filter((item) => {
          return item.id == newVal
        })
        this.groupData = arr[0].child
      },
      group(newVal, oldVal) {  //组
        if (newVal && oldVal) {
          this.member = null
        }
        let arr = this.groupData.filter((item) => {
          return item.id == newVal
        })
        if (arr.length) {
          if (arr[0].users) {
            this.memberData = arr[0].users.filter(item => {
              return item.roleId != 18
            })
          }
        }
      },
      member(newVal, oldVal) { //成员
        this.member = newVal
      },
    }
  }
</script>

<style scoped>

</style>
