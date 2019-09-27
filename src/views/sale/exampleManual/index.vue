<template>
  <div class="app-container calendar-list-container" v-loading="loading">
    <div class="manual-content">
      <el-row>
        <h3>手动添加例子</h3>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="中文名字" prop="name">
              <el-input v-model.trim="ruleForm.name" placeholder="请输入中文名字"></el-input>
            </el-form-item>
            <el-form-item label="英文名字" prop="enname">
              <el-input v-model.trim="ruleForm.enname" placeholder="请输入英文名字"></el-input>
            </el-form-item>
            <el-form-item label="绑定手机" prop="phone">
              <el-input v-model.trim="ruleForm.phone" placeholder="请输入绑定手机号"></el-input>
            </el-form-item>
            <el-form-item label="级别" prop="grade">
              <el-select v-model="ruleForm.grade" placeholder="请选择级别">
                <el-option
                  v-for="item in level"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="渠道" prop="channelId">
              <el-select v-model="channel" disabled placeholder="请选择渠道">
                <el-option
                  v-for="item in channels"
                  :key="item.channel_id"
                  :label="item.name"
                  :value="item.channel_id">
                </el-option>
              </el-select>
            </el-form-item>
            <!--<el-form-item label="绑定手机" prop="grade">
              <el-input v-model="ruleForm.addLevel" placeholder="请输入绑定手机号"></el-input>
            </el-form-item>-->
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>

            </el-form-item>
          </el-form>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
  import { deptRoleList, fetchDeptTree } from '@/api/role'
  import { exaManualAdd, getAllChannel } from '@/api/sale'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  // import { parseTime } from '@/utils'
  import { mapGetters } from 'vuex'
  import ElRadioGroup from 'element-ui/packages/radio/src/radio-group'
  import ElOption from "element-ui/packages/select/src/option"

  export default {
    components: {
      ElOption,
      ElRadioGroup
    },
    name: 'table_user',
    directives: {
      waves
    },
    data(){
      return {
        loading: false,
        ruleForm: {
          enname: null,
          name: null,
          phone: null,
          grade: null,
          /*userId: null,*/
          userPhone: null,
          systemUserName:null,
          systemUserId:null,
          channelName: null,
          channelId: null,
        },
        level: [],
        channels: [],
        channel: null,
        rules: {
          name: [
            { required: true, message: '请输入中文名字', trigger: 'blur'},
            { max: 20, message: '输入名字过长', trigger: 'blur'}
          ],
          enname: [
            { required: true, message: '请输入中文名字', trigger: 'blur'},
            { max: 20, message: '输入名字过长', trigger: 'blur'}
          ],
          phone: [
            { required: true, message: '请填写正确手机号吗', trigger: 'blur'},
            {
              pattern: /^1[12345789]\d{9}$/,
              message: '手机号格式不正确',
              trigger: 'blur'
            }
          ],
          grade: [
            { required: true, message: '请选择级别', trigger: 'change' }
          ],
          channel: [
            { required: true, message: '请选择渠道', trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([ 'userId', 'phone', 'grade','name' ])
    },
    created() {
      //console.log(this.grade)
      //this.ruleForm.userId = this.userId
      this.level = this.grade
      this.ruleForm.userPhone = this.phone
      //this.ruleForm.userId = this.userId
      this.ruleForm.systemUserId = this.userId
      this.ruleForm.systemUserName = this.name
      this.getAllChannels();
    },
    methods: {
      //获取所有渠道
      getAllChannels(){
        getAllChannel()
          .then(response => {
            console.log(response.data)
            this.channels = response.data.result
              //默认手动渠道
            for(var i=0;i<this.channels.length;i++){
              if(this.channels[i].name == '手动添加'){
                this.channel = this.channels[i].channel_id

              }
            }
          })
      },
      //表单验证
      submitForm(formName) {
        //数据汇总
        /*this.ruleForm.userId = this.channel.user_id
        this.ruleForm.channelName = this.channel.name*/
        this.ruleForm.channelId = this.channel
        for(var i=0;i<this.channels.length;i++){
          if(this.channels[i].channel_id == this.channel){
            //this.ruleForm.userId = this.channels[i].user_id
            this.ruleForm.channelName = this.channels[i].name
          }
        }


        this.$refs[formName].validate((valid) => {
          if (valid) {
            //alert('submit!');
            this.loading = true
            this.exaAdd(formName)

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      //手动添加例子
      exaAdd(formName) {
        console.log(this.ruleForm)
        exaManualAdd(this.ruleForm)
          .then(response => {
            console.log(response.data)
            let data = response.data.result
            if(data){
              this.getAllChannels();
              this.$message({
                message: response.data.msg,
                type: 'success'
              });

            }else{
              this.$message.error(response.data.msg);
            }
            this.$refs[formName].resetFields();
            this.channel = null
            /*resetForm(formName) {
              this.$refs[formName].resetFields();
            }*/
            this.loading = false
          })
      }
    }
  }

</script>
