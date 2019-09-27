<template>
  <div class="table">
    <el-table :data="dataSource" border style="width: 100%" v-if="!experience">
      <el-table-column align="center" prop="name" label="Class Name"></el-table-column>

      <el-table-column align="center" label="CT">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" v-if="scope.row.chineseTeacherName">
            <span>{{scope.row.chineseTeacherRegionName}} - {{scope.row.chineseTeacherGroupName}} - {{scope.row.chineseTeacherName}}</span>
            <div slot="reference" class="name-wrapper">
              <el-button size="mini">{{scope.row.chineseTeacherName}}</el-button>
            </div>
          </el-popover>
          <span v-else>------</span>
        </template>


      </el-table-column>

      <el-table-column align="center" label="FT">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" v-if="scope.row.foreignTeacherName">
            <span>{{scope.row.foreignTeacherRegionName}} - {{scope.row.foreignTeacherGroupName}} - {{scope.row.foreignTeacherName}}</span>
            <div slot="reference" class="name-wrapper">
              <el-button size="mini">{{scope.row.foreignTeacherName}}</el-button>
            </div>
          </el-popover>
          <span v-else>------</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Level" prop="grade"></el-table-column>

      <el-table-column align="center" prop="courseName" label="Course Name"></el-table-column>

      <el-table-column align="center" prop="classTime" label="Free Trial Date">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <p>{{scope.row.startTime | dealTime}}</p>
            <p>{{scope.row.classTime}}</p>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Students">
        <template slot-scope="scope">{{scope.row.currentNumber}}/4</template>
      </el-table-column>

      <el-table-column
        prop="outofClass"
        label="班级学员"
        align="center"
      >
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            width="800"
            trigger="click">
            <p style="margin:0 0 10px 0;font-size: 20px;font-weight: bold;">班级学员</p>
            <el-table :data="studentsList2" border :header-cell-style="{background:'#f9fafc'}" v-loading='classLoading'>
              <el-table-column
                label="归属CC"
                align="center"
              >
                <template slot-scope="scope">
                  <el-tooltip placement="top" class="item" effect="dark">
                    <div slot="content">
                      <span>{{scope.row.ccDepartInfo}}</span>
                      <span>{{scope.row.ccName}}</span>
                    </div>
                    <el-button size="mini">
                      <span>{{scope.row.ccName}}</span>
                    </el-button>
                  </el-tooltip>
                </template>
              </el-table-column>

              <el-table-column label="中文名字" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.name">{{scope.row.name}}</span>
                  <span v-else>---------</span>
                </template>
              </el-table-column>
              <el-table-column label="英文名字" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.enName">{{scope.row.name}}</span>
                  <span v-else>---------</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="outofClass"
                label="行动日志"
                align="center"
              >
                <template slot-scope="scope">

                  <el-popover
                    placement="bottom"
                    width="800"
                    trigger="click"
                  >
                    <p style="margin:0 0 10px 0;font-size: 20px;font-weight: bold;">
                      <span>行动日志</span>
                    </p>
                    <el-table :data="actionListData" border :header-cell-style="{background:'#f9fafc'}"
                              v-loading='actionLoading' style="z-index: 1000!important;">
                      <el-table-column
                        label="操作人"
                        align="center"
                      >
                        <template slot-scope="scope">
                          <el-tooltip class="item" effect="dark"
                                      :content="JSON.parse(scope.row.operatorInfo).operator" placement="top">
                            <el-button size="mini">
                              {{JSON.parse(scope.row.operatorInfo).operator | nameFilter}}
                            </el-button>
                          </el-tooltip>
                        </template>
                      </el-table-column>


                      <el-table-column label="操作记录" align="center">
                        <template slot-scope="scope">
                          <p style="margin:0">行动阶段<span v-if="JSON.parse(scope.row.operatorInfo).billType">({{JSON.parse(scope.row.operatorInfo).billType | dataTypeFilter}})</span>
                          </p>
                          <span>
                      {{scope.row.stage | stageFilter}}--行动状态{{scope.row.stat | statusFilter}}
                    </span>
                        </template>
                      </el-table-column>
                      <el-table-column label="行动日志" align="center">
                        <template slot-scope="scope">
                          <span>
                            {{scope.row.content}}
                          </span>
                        </template>
                      </el-table-column>

                      <el-table-column label="操作时间" align="center">
                        <template slot-scope="scope">
                          <p style="margin:0">{{ scope.row.createTime.substring(0,10)}}</p>
                          <p style="margin:0">{{ scope.row.createTime.substring(11,19)}}</p>
                          <!-- <span>
                            {{scope.row.createTime || '/'}}
                          </span> -->
                        </template>
                      </el-table-column>

                    </el-table>
                    <el-button slot="reference" @click="getActionList(scope.row.phone)" type="primary" size="mini"
                               style="height:28px;width:65px;">查看<i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button>
                  </el-popover>

                </template>
              </el-table-column>
            </el-table>
            <el-button slot="reference" @click="getClassDetail(scope.row.classId)" type="primary" size="mini"
                       style="height:28px;width:65px;">查看<i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Link">
        <template slot-scope="scope">
          <a :href="scope.row.liveAddr" target="_blank">
            <el-button size="mini" type="success">Click</el-button>
          </a>
        </template>
      </el-table-column>

      <!--<el-table-column align="center" prop="address" label="More">-->
      <!--<template slot-scope="scope">-->
      <!--<el-button size="mini" type="primary" @click="gotoDetail(scope.row.classId)">More</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="add(scope.row)" :disabled="addBtnFlag">加入</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table :data="dataSource" border style="width: 100%" v-if="experience">
      <el-table-column align="center" prop="ccName" label="发起人" v-if="!experienceList">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{scope.row.ccDepart}} {{scope.row.ccName}}</span>
            <div slot="reference" class="name-wrapper">
              <el-button size="mini">{{scope.row.ccName}}</el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="ccName" label="归属人" v-if="experienceList">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{scope.row.ccDepart}} {{scope.row.ccName}}</span>
            <div slot="reference" class="name-wrapper">
              <el-button size="mini">{{scope.row.ccName}}</el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="createTime" label="体验课时间">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <p>{{scope.row.originTime | dealTime}}</p>
            <p>{{scope.row.originPoint}}</p>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="ccName" label="安排老师">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{scope.row.tutorDepart}} {{scope.row.tutorName}}</span>
            <div slot="reference" class="name-wrapper">
              <el-button size="mini">{{scope.row.tutorName}}</el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column align="center" label="班级类型" prop="classTypeName"></el-table-column>

      <el-table-column align="center" prop="className" label="班级名称"></el-table-column>

      <el-table-column align="center" prop="stuName" label="中文名字"></el-table-column>

      <el-table-column align="center" prop="stuEnName" label="英文名字">
        <template slot-scope="scope">
          <span>{{scope.row.stuEnName || '--------'}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="phone" label="绑定手机号"></el-table-column>

      <el-table-column align="center" label="提交时间">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | dealTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="体验课状态" v-if="type==1">
        <template slot-scope="scope">
          <span :class="{red:scope.row.ruserStatus ==0,green:scope.row.ruserStatus ==1}">{{scope.row.ruserStatus | dealRuserStatus}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="体验课状态" v-if="type==0">
        <template slot-scope="scope">
          <span>未开始</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="体验课状态" v-if="experienceList">
        <template slot-scope="scope">
          <span v-if="experienceList&&scope.row.type == 1"
                :class="{red:scope.row.ruserStatus ==0,green:scope.row.ruserStatus ==1}">{{scope.row.ruserStatus | dealRuserStatus}}</span>
          <span v-else>未开始</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="监课直播流">
        <template slot-scope="scope">
          <a :href="scope.row.monitorAddr" target="_blank">
            <el-button size="mini" type="primary">查看</el-button>
          </a>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="address" label="班级详情">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="gotoDetail(scope.row.classId)">查看</el-button>
        </template>
      </el-table-column>

    </el-table>

  </div>


</template>

<script type="text/ecmascript-6">
  import {
    getOneClass,
    editOneClass,
    getClassTypeItems,
    getStudentsByClassId,
    changeClassType,
    changeClassName,
    classDeleteStudent
  } from '@/api/aom.js';
  import {ruserAction} from '@/api/detail';
  import {mapGetters} from 'vuex';

  export default {
    name: 'filterTable',
    props: ['dataSource', 'experience', 'addBtnFlag'],
    data() {
      return {
        total: null,
        experienceList: false,
        listQuery: {
          page: 1,
          rows: 10
        },
        actionListQuery: {
          page: 1,
          limit: 1000,
        },
        studentsList: [],
        studentsList2: [],
        actionListData: [],
        classLoading: false,
        actionLoading: false
      }
    },
    computed: {
      ...mapGetters(['userId'])
    },
    created() {
      this.type = this.$route.query.status
      this.experienceList = this.$route.query.experienceList
    },
    filters: {
      dealTime(time) {
        return time && time.toString().substring(0, 10)
      },
      dealRuserStatus(val) {
        const config = {
          0: '未出席',
          1: '已出席'
        }
        return config[val]
      }
    },
    methods: {
      async getClassStudentList(val) {
        this.classLoading = true
        const result = await getStudentsByClassId(val)
        if (result) {
          this.classLoading = false
          let d = result.data;
          this.studentsList = []
          this.studentsList2 = []
          for (let i = 0; i < d.length; i++) {
            if (d[i]['periods'] > 0) {
              this.studentsList2.push(d[i]);
            }
          }
        }
      },
      async actionList(val) {
        this.actionLoading = true
        const result = await ruserAction(val, this.actionListQuery)
        if (result) {
          console.log(this.actionListData)
          this.actionListData = result.data.data.records
          this.actionLoading = false
        }
      },
      add(data) { //加入班级
        const detailParams = JSON.parse(sessionStorage.getItem('detailParams'))
        const {ruserId} = detailParams[0]
        const {classId, startTime} = data
        const startDate = startTime.toString().substring(0, 10)
        const periodNum = 1

        this.$emit('postData', {
          operatorId: this.userId,
          classId,
          startDate,
          ruserId,
          periodNum
        })
      },
      gotoDetail(classId) {
        this.$router.push({path: '/sale/classmanageDetail', query: {classId, name: '体验课'}});
      },
      getClassDetail(val) {  //获取班级学生详情
        this.getClassStudentList(val)
      },
      getActionList(val) {  //获取行动日志
        this.actionList(val)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/less" scoped>
  .el-table {
    width: 100%;

    .green {
      color: #67c23a;
    }

    .red {
      color: #ff5647;
    }
  }

  .table {
    .messagePopper {
      z-index: 1000 !important;
      background: pink;
      color: red;
    }
  }

</style>
