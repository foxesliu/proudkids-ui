<template>
  <div class="aom-teacher-components">
    <el-select v-model="bumenId" v-if="false" 
               placeholder="--CT-Zone--"
               class="width-150">
      <el-option v-for="item in bumenArray"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
      </el-option>
    </el-select>

    <el-select v-model="daquId"
               :placeholder="names[0]?names[0]:'--CT-Zone--'"
               @change="changeDaqu()"
               class="width-150 margin-right5"
               
              >
      <el-option v-for="item in daquArray"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
      </el-option>
    </el-select>

    <el-select v-model="teamId"
               :placeholder="names[1]?names[1]:'--Group--'"
               @change="changeTeam"
               class="width-150 margin-right5">
      <el-option v-for="item in teamArray"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
      </el-option>
    </el-select>

    <el-select v-model="teacherId"
               :placeholder="names[2]?names[2]:'--Teacher--'"
               @change="chooseTeacher"
               class="width-150">
      <el-option v-for="item in teacherArray"
                 :key="item.userId"
                 :label="item.username"
                 :value="item.userId">
      </el-option>
    </el-select>

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
        teacherId: '',
        names: [],  //传过来的name
        ids: []  //父组件传过来的id
      }
    },
    props: ['getDefault'],
    created() {
      getTeachersByDeptId(2).then((res) => {
        let a = [];
        a.push(res.data.data);
        this.bumenArray = a;
        this.daquArray = res.data.data.child;
        console.log(this.bumenArray);
        this.changeDaqu();
        this.bumenId = 2;
      });
      setTimeout(() => {
        console.log(this.$parent.$data.foreignTeacherInfoIds);
        console.log(this.$parent.$data);
        if (this.getDefault === 'true') {
          this.names = this.$parent.chineseTeacherInfoNames;
          this.ids = this.$parent.chineseTeacherInfoIds;
          //this.daquId = (this.ids)[0];
          //this.teamId = (this.ids)[1];
          //this.teacherId = (this.ids)[2];
          console.log(this.ids, this.names, this.daquId, this.teamId, this.teacherId);
          this.$emit('childChooseTeacher', this.bumenId, (this.ids)[0], (this.ids)[1], (this.ids)[2]);
        }
      }, 1000)
    },
    mounted(){

    },
    methods: {
      changeDaqu(){
        //alert(this.daquId);
        for (let i = 0; i < this.daquArray.length; i++) {
          if (this.daquId === this.daquArray[i]['id']) {
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
        let arr = [];
        for (let i = 0; i < this.teamArray.length; i++) {
          if (this.teamId === this.teamArray[i]['id']) {
            arr = this.teamArray[i]['users'];
            break;
          }
        }
        let tmpArr = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i]['roleId'] === 20) {
            tmpArr.push(arr[i]);
          }
        }
        this.teacherArray = tmpArr;
        console.log(this.teacherArray);
        this.teacherId = '';
        this.$emit('childChooseTeacher', this.bumenId, this.daquId, this.teamId, this.teacherId);
      },
      chooseTeacher(){
        //alert(this.teacherId);
        this.$emit('childChooseTeacher', this.bumenId, this.daquId, this.teamId, this.teacherId);
      },
      clear(){
        this.teamArray = [];
        this.teacherArray = [];
        this.daquId= '';
        this.teamId= '';
        this.teacherId= '';
        console.log('zizujian')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../index.scss';
  .margin-right5{
    margin-right: 5px;
  }
</style>
