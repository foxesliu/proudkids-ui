<template>
  <div class="setavailabletime">
    <ul class="week">
      <li v-for="(item,index) in options" @click="changeStyle(item)" :key="index" v-if="flag"
        :class="{'active':index==ind}">
        {{item.label}}
      </li>
      <li v-for="(item,index) in options" @click="changeStyle(item)" :key="index" v-if="!flag"
          :class="{'active':index==ind}">
        {{item.label}}
      </li>
    </ul>
    <ul class="timeSchedule">
      <li v-for="item in list">
        {{item.timeSlot}}
        <!--<i class="el-icon-delete" @click="deleteTime(item)"></i>-->
      </li>
    </ul>

    <div>
      <el-form ref="form" :model="formData" label-width="200px" size="small" class="mt30">
        <el-form-item label="选择时间段:">
          <el-row>
            <el-col :span="6">
              <el-select v-model="formData.timeSlot" placeholder="选择时间段">
                <el-option
                  v-for="item in schedulePointOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-button @click="onSubmit">添加</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getClassesCount, availableTime, searchAvailableTime, deleteAvailableTime} from '@/api/teachers' // 編輯學生
  export default {
    data() {
      return {
        flag: true,  //中外教的切换 0中教 1外教
        teacherId: null,
        teacherType: null,
        list: [],
        ind: 0,
        options: [{
          value: '',
          label: '周日',
          id: 7,
          index: 0,
          checked: false,
          teacherType: 0
        }, {
          value: '',
          label: '周一',
          id: 1,
          index: 1,
          checked: false,
          teacherType: 0
        }, {
          value: '',
          label: '周二',
          id: 2,
          index: 2,
          checked: false,
          teacherType: 1
        }, {
          value: '',
          label: '周三',
          id: 3,
          index: 3,
          checked: false,
          teacherType: 1
        }, {
          value: '',
          label: '周四',
          id: 4,
          index: 4,
          checked: false,
          teacherType: 1
        }, {
          value: '',
          label: '周五',
          id: 5,
          index: 5,
          checked: false,
          teacherType: 1
        },
        {
          value: '',
          label: '周六',
          id: 6,
          index: 6,
          checked: false,
          teacherType: 1
        }],
        formData: {
          weekpoint: null,
          timeSlot: null,
          type: null,
          createId: null,
          stat: 0
        },
        listQuery: {
          page: 0,
          limit: 100,
          type: null,
          weekpoint: 7
        },
        timeSelested: []
      }
    },
    computed: {
      ...mapGetters(['roleIds', 'userId', 'schedulePoint', 'userId'])
    },
    created() {
      this.schedulePointOptions = this.schedulePoint; //上课时间
      if (this.$route.query.teacherType == 0) {//中教
        this.flag = false
        this.listQuery.weekpoint = 7
        this.ind = 0
      } else {
        this.flag = true
        this.listQuery.weekpoint = 2
        this.ind = 2
      }
      this.formData.type = this.$route.query.teacherType
      this.listQuery.type = this.$route.query.teacherType
      this.formData.createId = this.userId
      this.getList()
    },
    methods: {
      goToClassing(stage = '', status, itemType) {
        this.$router.push({
          path: 'classing', query: {
            stage: stage,
            status: status,
            itemType: itemType
          }
        })
      },
      changeStyle(item) {
        // if (this.$route.query.teacherType == 0) { //中教
        //   if (item.teacherType) {
        //     this.$message('抱歉，您不能设置外教可用时间！')
        //     return
        //   }
        // } else {
        //   if (!item.teacherType) {
        //     this.$message('抱歉，您不能设置中教可用时间！')
        //     return
        //   }
        // }
        this.ind = item.index
        this.formData.weekpoint = item.id
        this.listQuery.weekpoint = item.id
        this.getList()
      },
      onSubmit() {
        if (!this.formData.weekpoint) {
          this.formData.weekpoint = this.listQuery.weekpoint
        }
        if (!this.formData.timeSlot) {
          this.$message('请选择时间段！')
          return
        }
        availableTime(this.formData).then(res => {
          this.$message('添加成功！')
          this.formData.timeSlot = null
          this.getList()
        }).catch(res => {
          this.formData.timeSlot = null
        })
      },
      getList() {
        searchAvailableTime(this.listQuery).then(res => {
          this.list = res.data.records
          this.list.forEach(item => {
            item.timestamp = Date.parse('2018-6-13 ' + item.timeSlot.substring(0, 5));
          })
          this.list.sort((a, b) => {
            return a.timestamp - b.timestamp
          })
        })
      },
      deleteTime(item) {
        deleteAvailableTime(item.id).then(res => {
          this.$message('删除成功！')
          this.getList()
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../sale/detail/detail.scss';

  .setavailabletime { //@include调用
    @include detail-container();
    @include btn();
    div {
      text-align: center
    }
    .week {
      color: #fff;
      overflow: hidden;
      li {
        float: left;
        width: 150px;
        height: 80px;
        background: #ec584e;
        text-align: center;
        line-height: 80px;
        margin-right: 1px;
        cursor: pointer;
      }
    }
    .timeSchedule {
      overflow: hidden;
      li {
        float: left;
        width: 300px;
        height: 100px;
        background: #fff;
        text-align: center;
        line-height: 100px;
        border: 1px solid #f0f0f0;
        position: relative;
        i {
          position: absolute;
          right: 20px;
          top: 20px;
          cursor: pointer;
        }
      }
    }
    .active {
      background: #259b24 !important;
      transition: 1s;
    }
    .disabled {
      background: gray !important;
    }
  }


</style>
