<template>
  <div class="aom-teacher-components">
    <span class="tip2">归属中教：</span>
    <el-select v-model="bumenId" v-if="false"
      placeholder="--部门--"
      class="width-200">
      <el-option v-for="item in bumenArray"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <span class="selectBox">
<el-select v-model="daquId"
  placeholder="--大区--"
  @change="changeDaqu()"
  class="width-200"
  size="small"
  clearable>
  <el-option v-for="item in daquArray"
    :key="item.id"
    :label="item.name"
    :value="item.id">
  </el-option>
</el-select>
    </span>
    <span class="selectBox">
      <el-select v-model="teamId"
               placeholder="--组别--"
               @change="changeTeam"
               class="width-200"
               size="small"
               clearable>
      <el-option v-for="item in teamArray"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
      </el-option>
    </el-select>
    </span>
    <span class="selectBox">
      <el-select v-model="teacherId"
               placeholder="--中教个人--"
               @change="chooseTeacher"
               class="width-200"
               size="small"
               clearable>
      <el-option v-for="item in teacherArray"
                 :key="item.userId"
                 :label="item.username"
                 :value="item.userId">
      </el-option>
    </el-select>
    </span>
    
    

    

    

  </div>
</template>

<script>
  import {getTeachersByDeptId} from '../../../api/aom.js';
  export default {
    data(){
      return {
        bumenArray: [],
        daquArray: [],
        teamArray: [],
        teacherArray: [],
        bumenId: '',
        daquId: '',
        teamId: '',
        teacherId: ''
      }
    },
    created() {
      getTeachersByDeptId(2).then((res) => {
        var a = [];
        a.push(res.data.data);
        this.bumenArray = a;
        this.daquArray = res.data.data.child;
        console.log(this.bumenArray);
        this.changeDaqu();
        this.bumenId = 2;
      });
    },
    methods: {
      changeDaqu(){
        //alert(this.daquId);
        for (let i = 0; i < this.daquArray.length; i++) {
          if (this.daquId == this.daquArray[i]['id']) {
            this.teamArray = this.daquArray[i]['child'];
            break;
          }
        }
        console.log(this.teamArray);
        this.teamId = '';
        this.teacherId = '';
        this.$emit('childChooseTeacher', this.bumenId, this.daquId, this.teamId, this.teacherId);
      },
      changeTeam(){
        //alert(this.teamId);
        for (let i = 0; i < this.teamArray.length; i++) {
          if (this.teamId == this.teamArray[i]['id']) {
            this.teacherArray = this.teamArray[i]['users'];
            break;
          }
        }
        console.log(this.teacherArray);
        this.teacherId = '';
        this.$emit('childChooseTeacher', this.bumenId, this.daquId, this.teamId, this.teacherId);
      },
      chooseTeacher(){
        //alert(this.teacherId);
        this.$emit('childChooseTeacher', this.bumenId, this.daquId, this.teamId, this.teacherId);
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../index.scss';
  .tip2{
    margin-left: 255px;
  }
  .selectBox{
    margin-right: 20px;

  }
</style>
