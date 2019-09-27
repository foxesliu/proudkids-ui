<template>
  <div class="aom-teacher-components" >
    <el-select v-model="bumenId" v-if="false"
               placeholder="--部门--"
               class="width-150">
      <el-option v-for="item in bumenArray"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
      </el-option>
    </el-select>

    <el-select v-model="daquId"
               :placeholder="names[0]?names[0]:'--FT-Zone--'"
               @change="changeDaqu()"
               class="width-150"
               :disabled = "daqu"
               size="small"
               >
      <el-option v-for="item in daquArray"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id"
                 size="small"
                 >
      </el-option>
    </el-select>
    <el-select v-model="teamId"
               :placeholder="names[1]?names[1]:'--Group--'"
               @change="changeTeam"
               class="width-150"
               :disabled = "team"
               size="small"
              >
      <el-option v-for="item in teamArray"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
      </el-option>
    </el-select>

    <el-select v-model="teacherId"
               :placeholder="names[2]?names[2]:'--Teacher--'"
               class="width-150"
               :disabled = "geren"
               size="small">
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
        geren:false,
        china:false,
        team:false,
        show:true,
        daqu:false,
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
    props: ['getDefault','chregion','roleId','tcherArry'],
    created() {
      if(this.roleId == 23){
        this.china = true
        this.show = false
        this.daqu = true
        this.team = true
         this.geren = true
        console.log(5555)
      }else if(this.roleId == 24){
        this.china = true
        this.show = false
        this.daqu = true
         this.team = true
      }else if(this.roleId == 32){
        this.china = true
        
        this.show = false
        this.daqu = false
        this.team = false
      }else if(this.roleId == 27){
        
       
        this.daqu = false
        this.team = false
      }
      getTeachersByDeptId(11).then((res) => {
        let a = [];
        a.push(res.data.data);
        this.bumenArray = a;
        this.daquArray = res.data.data.child;
        console.log(this.bumenArray);
        this.changeDaqu();
        this.bumenId = 11;
      });
      setTimeout(() => {
        if (this.getDefault === 'true') {
          this.names = this.$parent.foreignTeacherInfoNames;
          this.ids = this.$parent.foreignTeacherInfoIds;
          //this.daquId = (this.ids)[0];
          //this.teamId = (this.ids)[1];
          //this.teacherId = (this.ids)[2];
          console.log(this.ids, this.names, this.daquId, this.teamId, this.teacherId);
          
        }
      }, 1000)
    },
    updated(){
      console.log(this.tcherArry)
      if(this.roleId == 24){
        this.teacherArray = this.tcherArry
      }
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
          if (arr[i]['roleId'] === 23) {
            tmpArr.push(arr[i]);
          }
        }
        this.teacherArray = tmpArr;
        console.log(this.teacherArray);
        this.teacherId = '';
        
      },
      // chooseTeacher(){
      //   //alert(this.teacherId);
      //   this.$emit('childChooseTeacher', this.bumenId, this.daquId, this.teamId, this.teacherId);
      // }
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
  .aom-teacher-components{
  }
</style>
