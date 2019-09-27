<template>
  <div class="arealink">
    <el-select
      v-model="area"
      :placeholder="areaName"
      :disabled="areaFlag"
      @change="changeArea"
      style="vertical-align: middle;"
      clearable
    >
      <el-option
        v-for="item in areaData"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
    <el-select
      v-model="group"
      :placeholder="groupName"
      :disabled="groupFlag"
      @change="changeGroup"
      style="vertical-align: middle;"
      clearable
    >
      <el-option
        v-for="item in groupData"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
    <el-select
      v-model="member"
      :placeholder="memberName"
      :disabled="memberFlag"
      @change="changeMember"
      style="vertical-align: middle;"
      clearable
    >
      <el-option
        v-for="item in memberData"
        :key="item.userId"
        :label="item.username"
        :value="item.userId"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getTeachersByDeptId } from "@/api/teachers";
export default {
  props: {
    //   部门id
    deptId: {
      type: Number,
      required: true
    },
    // 角色id
    roleId: {
      type: Number,
      required: true
    },
    // 用户id
    userId: {
      type: Number,
      required: true
    },
    // 大区
    areaName: {
      type: String,
      required: true
    },
    // 组长
    groupName: {
      type: String,
      required: true
    },
    //成员
    memberName: {
      type: String,
      required: true
    },
    //禁用组员id
    disabledMemberId: {
      type: Number,
      required: true
    },
    //禁用组长id
    disabledGroupId: {
      type: Number,
      required: true
    },
    //禁用大区id
    disabledAreaId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      area: "",
      group: "",
      member: "",
      areaData: [],
      groupAllData: [], //所有的组长
      memberAllData: [], //所有的组员
      groupData: [], //过滤后的组长
      memberData: [], //过滤后的组员
      areaFlag: false,
      groupFlag: false,
      memberFlag: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /**
     * @description 获取所有的大区/组长/成员列表数据
     * @description groupAllData 所有的组长 memberAllData 所有的组员
     * @description groupData 过滤后的组长 memberData 过滤后的组员
     * @param {Number} id: 部门id
     */
    async getList() {
      const result = await getTeachersByDeptId(this.deptId);

      if (result.data.data.child) {
        //所有大区
        this.areaData = result.data.data.child;
        this.areaData.map(item => {
          //所有组长
          this.groupAllData.push(...item.child);
        });
        this.groupAllData.map(item => {
          //所有成员
          this.memberAllData.push(...item.users);
        });
        //初始化处理部门数据
        this.initData(
          this.areaData,
          this.roleId,
          this.disabledMemberId,
          this.disabledGroupId,
          this.disabledAreaId
        );
      }
    },

    /**
     * @description 初始化获取部门数据处理
     */
    initData(
      listData,
      roleId,
      disabledMemberId,
      disabledGroupId,
      disabledAreaId
    ) {
      //组员
      listData.forEach(area => {
        //禁用大区
        area.users.forEach(item => {
          if (item.userId == this.userId) {
            this.areaFlag = true;
            this.area = area.id;
          }
        });
        area.child.forEach(group => {
          //成员都禁用
          if (roleId == disabledMemberId) {
            this.areaFlag = true;
            this.groupFlag = true;
            this.memberFlag = true;
          }
          if (group.id == this.useId) {
            this.area = area.id;
            this.group = group.id;
          }
          group.users.forEach(member => {
            //组长禁用成员及组长
            if (roleId == disabledGroupId) {
              this.areaFlag = true;
              this.groupFlag = true;
              this.memberFlag = false;
            }
            if (member.userId == this.userId) {
              if (roleId == disabledMemberId) {
                //组员
                this.area = area.id;
                this.group = group.id;
                this.member = member.userId;
              } else if (roleId == disabledGroupId) {
                //组长
                this.area = area.id;
                this.group = group.id;
              } else if (roleId == disabledAreaId) {
                //大区经理
                this.area = area.id;
              } else {
                //其他情况
              }
            }
          });
        });
        this.$emit("handleParent");
      });
    },
    /**
     * @description 清空组长及成员
     */
    changeArea() {
      this.group = null;
      this.member = null;
    },
    /**
     * @description 清空成员
     */
    changeGroup() {
      this.member = null;
    },
    changeMember() {}
  },
  watch: {
    deptId(newVal, oldVal) {
      if (newVal) {
        this.deptId = newVal;
      }
    },
    area(newVal, oldVal) {
      //大区
      this.groupData = this.groupAllData.filter(item => {
        return item.parentId == newVal;
      });
    },
    group(newVal, oldVal) {
      //组长
      this.memberAllData = this.groupAllData.filter(item => {
        return item.id == newVal;
      });
      this.memberData =
        this.memberAllData.length && this.memberAllData[0].users;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.arealink{
  display: flex;
  flex: 1;
}
</style>


