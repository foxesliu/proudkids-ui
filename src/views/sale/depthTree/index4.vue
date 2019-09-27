<template>
  <div class="linkage">
    <el-row>
      <el-col :span="8">
        <el-select
          v-model="area"
          placeholder="中教大区"
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
          placeholder="中教组"
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
          placeholder="中教"
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
        area: '',
        group: '',
        member: '',
        areaData: [],
        groupData: [],
        memberData: [],

        // selectedUserId

        areaFlag: false,
        groupFlag: false,
        memberFlag: false,
        roleId: null
      }
    },
    computed: {
      ...mapGetters(['roleIds', 'userId'])
    },
    created() {
      this.roleId = this.roleIds[0]
      this.getList()
    },
    methods: {
      /*
      * 修改大区 组员 成员
      * */
      getData() {
        const deptData = {
          regionId: this.area,
          groupId: this.group,
          tutorId: this.member
        }
        if (this.member) {
          sessionStorage.setItem('kpiUserId', this.member)
        }
        this.$emit('getDeptData', deptData)
      },
      async getList() {
        const result = await getTeachersByDeptId(2)
        if (result) {
          this.areaData = []
          this.groupData = []
          this.memberData = []
          if (result.data.data.child) {
            this.areaData = result.data.data.child
            this.initOPtions()
          }
          const deptData = {
            regionId: this.area,
            groupId: this.group,
            tutorId: this.member
          }
          this.$emit('getDeptData', deptData)
        }
      },
      initOPtions() {  //初始化
        this.areaData.forEach((grandparent) => {

          if (sessionStorage.getItem('kpiUserId')) {
            this.kpiUserId = sessionStorage.getItem('kpiUserId')
          } else {
            this.kpiUserId = this.userId
          }
          // console.log(this.kpiUserId)
          grandparent.users.forEach(item => {
            if (item.userId == this.kpiUserId) {
              this.areaFlag = true
              this.area = grandparent.id
            }
          })
          if (grandparent.id == this.kpiUserId) {
            // console.log('大区' + grandparent.id)
          } else {
            grandparent.child.forEach(parent => {
              if (parent.id == this.kpiUserId) {
                // console.log('组长' + parent.name)
              } else {
                parent.users.forEach((item) => {
                  if (item.userId == this.kpiUserId) {
                    if (this.roleId == 20) {
                      this.areaFlag = true
                      this.groupFlag = true
                      this.memberFlag = true
                    } else if (this.roleId == 21) {
                      this.areaFlag = true
                      this.groupFlag = true
                      this.memberFlag = false
                    }
                    if (this.roleId == 21) {
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
          this.group = ''
          this.member = ''
        }
        let arr = this.areaData.filter((item) => {
          return item.id == newVal
        })
        this.groupData = arr[0].child
      },
      group(newVal, oldVal) {  //组
        if (newVal && oldVal) {
          this.member = ''
        }
        let arr = this.groupData.filter((item) => {
          return item.id == newVal
        })
        if (arr.length) {
          if (arr[0].users) {
            this.memberData = arr[0].users.filter(item => {
              return item.roleId != 21
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
