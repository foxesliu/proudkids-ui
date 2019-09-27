<template>
  <div class="app-container calendar-list-container">
    <div class="search-top">
      <el-form
        :inline="true"
        :model="formInline"
        size="small"
        class="demo-form-inline"
      >
        <el-row>
          <el-col :span="22">
            <el-form-item v-if="this.listQuery.type != 5">
              <el-select
                @change="slectAssign()"
                style="width: 200px;"
                clearable
                v-model="timeData.assignDate"
                placeholder="分配时间"
              >
                <el-option label="由近到远" value="DESC"></el-option>
                <el-option label="由远到近" value="ASC"></el-option>

                <el-date-picker
                  v-model="timeData.assignDate"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  @change="getAssignDate"
                  :picker-options="pickerOptions2"
                >
                </el-date-picker>
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="
                listQuery.type == 1 ||
                  listQuery.type == 2 ||
                  listQuery.type == 3 ||
                  listQuery.type == 4
              "
            >
              <el-select
                @change="slectConnect()"
                style="width: 200px;"
                clearable
                v-model="timeData.connectDate"
                placeholder="最后联系时间"
              >
                <el-option label="由近到远" value="DESC"></el-option>
                <el-option label="由远到近" value="ASC"></el-option>
                <el-date-picker
                  v-model="timeData.connectDate"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  @change="getConnectDate"
                  :picker-options="pickerOptions2"
                >
                </el-date-picker>
              </el-select>
            </el-form-item>
            <el-form-item v-if="listQuery.type == 4">
              <el-select
                @change="slectOut()"
                style="width: 200px;"
                clearable
                v-model="listQuery.outofClassDate"
                placeholder="退出班级日"
              >
                <el-option label="由近到远" value="DESC"></el-option>
                <el-option label="由远到近" value="ASC"></el-option>
                <el-date-picker
                  v-model="timeData.outofClassDate"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  @change="getOutofClassDate"
                  :picker-options="pickerOptions2"
                >
                </el-date-picker>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-popover
                ref="popover4"
                placement="bottom"
                width="210"
                trigger="focus"
              >
                <el-table
                  empty-text="输入手机号，按回车添加！"
                  :data="formInline.phoneData"
                >
                  <el-table-column
                    width="120"
                    property="phone"
                    label="已添加打电话"
                  ></el-table-column>
                  <el-table-column width="60" property="id" label="操作">
                    <template slot-scope="scope">
                      <el-button
                        @click="deletePhone(scope.$index, formInline.phoneData)"
                        type="text"
                        size="small"
                        >删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-popover>
              <el-input
                v-popover:popover4
                style="width: 150px;"
                v-model="formInline.phone"
                :placeholder="listQuery.phone || '绑定手机号（批量）'"
                value=""
                @keyup.enter.native="addPhone($event)"
                clearable
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                style="width: 90px;"
                clearable
                v-model.trim="listQuery.name"
                placeholder="中文名字"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                style="width: 120px"
                clearable
                v-model.trim="listQuery.enname"
                placeholder="英文名字"
              ></el-input>
            </el-form-item>
            <el-form-item v-if="this.listQuery.type != 5">
              <el-select
                style="width: 80px;"
                v-model="listQuery.grade"
                clearable
                placeholder="级别"
              >
                <!--级别为空问题-->
                <!--<el-option label="不选择" value=""></el-option>-->
                <el-option label="0" value="0"></el-option>
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
                <el-option label="6" value="6"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="this.listQuery.type != 5">
              <el-select
                style="width: 120px"
                v-model="listQuery.receiveClass"
                clearable
                placeholder="安排体验课"
              >
                <!--级别为空问题-->
                <!--<el-option label="不选择" value=""></el-option>-->
                <el-option label="否" value="0"></el-option>
                <el-option label="是" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="
                listQuery.type == 1 ||
                  listQuery.type == 2 ||
                  listQuery.type == 3 ||
                  listQuery.type == 4
              "
            >
              <el-select
                style="width: 100px;"
                clearable
                v-model="listQuery.actionStage"
                placeholder="行动阶段"
                size="small"
              >
                <el-option
                  v-for="(item, index) in actionStages"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="
                listQuery.type == 1 ||
                  listQuery.type == 2 ||
                  listQuery.type == 3 ||
                  listQuery.type == 4
              "
            >
              <el-select
                style="width: 100px;"
                clearable
                v-model="listQuery.actionStat"
                placeholder="行动状态"
                size="small"
              >
                <el-option
                  v-for="(item, index) in actionStats"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item v-if="listQuery.type == 3">
              <el-select
                style="width: 120px;"
                @change="getPeriods()"
                clearable
                v-model="listQuery.spareTime"
                placeholder="剩余课时"
              >
                <el-option
                  v-for="arg in spareTime"
                  :value="arg.value"
                  :label="arg.label"
                  :key="arg.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="listQuery.type == 3">
              <el-select
                style="width: 130px;"
                v-model="listQuery.classType"
                clearable
                @change="getClassType()"
                placeholder="课程类型"
              >
                <el-option
                  v-for="(item, index) in courseTypes"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!--提醒联系条件-->
            <el-form-item v-if="listQuery.type == 5">
              <el-date-picker
                v-model="timePeriod"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions2"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-select
                style="width: 200px;"
                clearable
                filterable
                v-model="listQuery.channelName"
                placeholder="渠道"
              >
                <el-option
                  v-for="item in channelOptions"
                  :key="item.channel_id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="text-align: right">
            <el-form-item>
              <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="tableData1"
        tooltip-effect="dark"
        border
        :header-cell-style="{ background: '#f9fafc' }"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column fixed type="selection" align="center" width="50">
        </el-table-column>
        <el-table-column
          :label="this.listQuery.type == 5 ? '订单发起人' : '分配CC'"
          align="center"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="
                scope.row.userDeptInfo ||
                  scope.row.userTree ||
                  scope.row.userDeptUserInfoTree
              "
              placement="top"
            >
              <el-button size="mini">
                {{
                  scope.row.userDeptInfo ||
                    scope.row.userTree ||
                    scope.row.userDeptUserInfoTree | ccFilter
                }}
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          v-if="this.listQuery.type != 5"
          label="分配数据时间"
          align="center"
        >
          <template slot-scope="scope">
            <p style="margin:0">
              {{
                scope.row.currentAssignDate.substring(0, 10) ||
                  scope.row.createDate.substring(0, 10) ||
                  scope.row.currentAssignDate.substring(0, 10)
              }}
            </p>
            <p style="margin:0">
              {{
                scope.row.currentAssignDate.substring(11, 19) ||
                  scope.row.createDate.substring(11, 19) ||
                  scope.row.currentAssignDate.substring(11, 19)
              }}
            </p>
          </template>
        </el-table-column>

        <el-table-column
          prop="stuPhone"
          label="绑定手机号"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.stuPhone || scope.row.phone || scope.row.bindPhone
          }}</template>
        </el-table-column>
        <el-table-column
          prop="stuCnName"
          label="中文名字"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.stuCnName || scope.row.cnName
          }}</template>
        </el-table-column>
        <el-table-column
          prop="stuEnName"
          label="英文名字"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.stuEnName || scope.row.enName
          }}</template>
        </el-table-column>
        <el-table-column
          v-if="listQuery.type == 5"
          prop="remindDate"
          label="提醒时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          v-if="listQuery.type == 0"
          prop="ruserGrade"
          label="级别"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.ruserGrade || scope.row.stuGrade
          }}</template>
        </el-table-column>
        <el-table-column
          v-if="listQuery.type == 1"
          prop="ruserGrade"
          label="级别"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.ruserGrade || scope.row.stuGrade
          }}</template>
        </el-table-column>
        <el-table-column
          v-if="listQuery.type == 2"
          prop="ruserGrade"
          label="级别"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.ruserGrade || scope.row.stuGrade
          }}</template>
        </el-table-column>
        <el-table-column
          v-if="listQuery.type == 3"
          prop="ruserGrade"
          label="级别"
          align="center"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">{{ scope.row.ruserGrade || scope.row.stuGrade}}</template> -->
        </el-table-column>
        <el-table-column
          v-if="listQuery.type == 4"
          prop="ruserGrade"
          label="级别"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.ruserGrade || scope.row.stuGrade
          }}</template>
        </el-table-column>
        <el-table-column
          v-if="listQuery.type == 5"
          prop="ruserGrade"
          label="级别"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.ruserGrade || scope.row.stuGrade
          }}</template>
        </el-table-column>
        <el-table-column
          prop="channelOrigin"
          label="渠道"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <!-- <el-table-column
          v-if="listQuery.type==0 || listQuery.type==1 || listQuery.type==2"
          prop="stuCreateDate"
          label="注册时间"
          align="center"
          show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column
          v-if="
            listQuery.type == 1 ||
              listQuery.type == 2 ||
              listQuery.type == 3 ||
              listQuery.type == 4 ||
              listQuery.type == 5
          "
          prop="acStage"
          label="行动阶段"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <!--{{ scope.row.acStage | oldExamFilter(scope.row, listQuery.type, 0) || scope.row.stage }}-->
            <span>{{ String(scope.row.acStage) | stageFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="
            listQuery.type == 1 ||
              listQuery.type == 2 ||
              listQuery.type == 3 ||
              listQuery.type == 4 ||
              listQuery.type == 5
          "
          prop="acStat"
          label="行动状态"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <!--{{ scope.row.acStat | oldExamFilter(scope.row, listQuery.type, 1) || scope.row.status }}-->
            <span>{{ String(scope.row.acStat) | statusFilter }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          v-if="listQuery.type==5"
          prop="createDate"
          label="提交时间"
        >
        </el-table-column> -->
        <el-table-column
          v-if="listQuery.type != 0 && listQuery.type != 5"
          prop="latestRecordDate"
          label="最后联系时间"
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.latestRecordDate">
              <p style="margin:0">
                {{ scope.row.latestRecordDate.substring(0, 10) }}
              </p>
              <p style="margin:0">
                {{ scope.row.latestRecordDate.substring(11, 19) }}
              </p>
            </div>
            <div v-else>
              <p style="margin:0">
                {{ scope.row.lastRecordDate.substring(0, 10) }}
              </p>
              <p style="margin:0">
                {{ scope.row.lastRecordDate.substring(11, 19) }}
              </p>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          v-if="listQuery.type == 3"
          prop="periods"
          label="剩余课时"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          v-if="listQuery.type == 3"
          prop="classType"
          label="课程类型"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.classType | courseTypeFilter()
          }}</template>
        </el-table-column>

        <el-table-column
          v-if="listQuery.type == 4"
          prop="outofClass"
          label="退出班级日"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          v-if="
            listQuery.type == 0 || listQuery.type == 1 || listQuery.type == 2
          "
          prop="outofClass"
          label="安排体验课"
          align="center"
        >
          <template slot-scope="scope"
            ><span
              :style="{
                color: scope.row.receiveClass == false ? '#ff6f6f' : 'green'
              }"
              >{{ scope.row.receiveClass == false ? "否" : "是" }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          v-if="
            listQuery.type == 0 || listQuery.type == 1 || listQuery.type == 2
          "
          prop="outofClass"
          label="体验课日志"
          align="center"
        >
          <template slot-scope="scope">
            <el-popover placement="bottom" width="1227" trigger="click">
              <p style="margin:0 0 10px 0;font-size: 20px;">体验课行动日志</p>
              <el-table
                :data="gridData1"
                border
                :header-cell-style="{ background: '#f9fafc' }"
              >
                <el-table-column
                  property="originPoint"
                  label="体验课时间"
                  align="center"
                >
                  <!-- <template slot-scope="scope">
                    <p style="margin:0">{{ scope.row.createTime.substring(0,10)}}</p>
                    <p style="margin:0">{{ scope.row.createTime.substring(11,19)}}</p>
                  <span>
                    {{scope.row.createTime || '/'}}
                  </span>
                </template> -->
                </el-table-column>
                <el-table-column
                  property="tutorName"
                  label="安排老师"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  property="classTypeName"
                  label="班级类型"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>
                      {{ scope.row.classTypeName }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  property="className"
                  label="班级名称"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  property="originTime"
                  label="提交时间"
                  align="center"
                >
                  <template slot-scope="scope">
                    <p style="margin:0">
                      {{ scope.row.originTime.substring(0, 10) }}
                    </p>
                    <p style="margin:0">
                      {{ scope.row.originTime.substring(11, 19) }}
                    </p>
                    <!-- <span>
                      {{scope.row.createTime || '/'}}
                    </span> -->
                  </template>
                </el-table-column>
                <el-table-column property="" label="体验课状态" align="center">
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.type == 1"
                      :class="{
                        red: scope.row.ruserStatus == 0,
                        green: scope.row.ruserStatus == 1
                      }"
                      >{{ scope.row.ruserStatus | dealRuserStatus }}</span
                    >
                    <span v-else>未开始</span>
                  </template>
                </el-table-column>
                <el-table-column
                  property="address"
                  label="监控直播流"
                  align="center"
                >
                  <template slot-scope="scope">
                    <a :href="scope.row.monitorAddr" target="_blank">
                      <el-button size="mini" type="primary">查看</el-button>
                    </a>
                  </template>
                </el-table-column>
                <el-table-column
                  property="address"
                  label="班级详情"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="gotoDetail(scope.row.classId)"
                      >查看</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-button
                slot="reference"
                @click="ExperienceList(scope.row.stuPhone)"
                type="primary"
                size="mini"
                style="height:28px;width:65px;"
                >查看<i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          v-if="
            listQuery.type == 0 || listQuery.type == 1 || listQuery.type == 2
          "
          label="行动日志"
          align="center"
        >
          <template slot-scope="scope">
            <el-popover placement="bottom" width="1227" trigger="click">
              <p style="margin:0 0 10px 0;font-size: 20px;">行动日志</p>
              <el-table
                :data="gridData"
                border
                :header-cell-style="{ background: '#f9fafc' }"
              >
                <el-table-column
                  width="150"
                  property="operatorInfo"
                  label="操作人"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="JSON.parse(scope.row.operatorInfo).operator"
                      placement="top"
                    >
                      <el-button size="mini">
                        {{
                          JSON.parse(scope.row.operatorInfo).operator
                            | nameFilter
                        }}
                      </el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column
                  width="300"
                  property="date"
                  label="操作记录"
                  align="center"
                >
                  <template slot-scope="scope">
                    <p style="margin:0">
                      行动阶段<span
                        v-if="JSON.parse(scope.row.operatorInfo).billType"
                        >({{
                          JSON.parse(scope.row.operatorInfo).billType
                            | dataTypeFilter
                        }})</span
                      >
                    </p>
                    <span>
                      {{ scope.row.stage | stageFilter }}--行动状态{{
                        scope.row.stat | statusFilter
                      }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  width="600"
                  property="address"
                  label="行动日志"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>
                      {{ scope.row.content }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  width="150"
                  property="address"
                  label="操作时间"
                  align="center"
                >
                  <template slot-scope="scope">
                    <p style="margin:0">
                      {{ scope.row.createTime.substring(0, 10) }}
                    </p>
                    <p style="margin:0">
                      {{ scope.row.createTime.substring(11, 19) }}
                    </p>
                    <!-- <span>
                      {{scope.row.createTime || '/'}}
                    </span> -->
                  </template>
                </el-table-column>
              </el-table>
              <el-button
                slot="reference"
                @click="actionList(scope.row.stuPhone)"
                type="primary"
                size="mini"
                style="height:28px;width:65px;"
                >查看<i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户详情">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              size="mini"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage1"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <div
      style="margin-top: 20px"
      v-if="
        this.listQuery.type != 5 &&
          this.roles.filter(item => item === 'SALE').length < 1
      "
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row>
          <el-col :span="2">
            <el-form-item>
              <span>勾选流转给CC</span>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <depth-tree
              :message="parentMsg"
              :message1="listQuery.userId"
              :disableId="this.userId"
              v-on:listenToChildEvent="showMsgFromChild"
            >
            </depth-tree>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button type="primary" @click="circulation"
                >确认流转</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<style>
.el-form--inline .el-form-item {
  margin-right: 0;
}

.el-table__fixed,
.el-table__fixed-right {
  overflow-y: hidden;
}

.green {
  color: #67c23a;
}

.red {
  color: #ff5647;
}
</style>
<script>
import { mapGetters } from "vuex";
import { arrObjAdd } from "@/utils/index";
import { ruserAction } from "@/api/detail";
import { validatePhone } from "@/utils/validate";
import {
  exaCheckAll,
  exaCheckPay,
  exaCheckFree,
  checkClassType,
  exaFlow,
  checkREmindList,
  getAllChannel
} from "@/api/sale";
import DepthTree from "../../depthTree/index.vue";
import { queryExperienceList } from "@/api/sale.js";
import FilterForm from "../../experience/components/filterForm";

export default {
  components: {
    DepthTree,
    FilterForm
  },
  data() {
    return {
      type: "",
      status: "",
      searchArry: {
        createDate: "",
        assignDate: "",
        connectDate: "",
        phone: "",
        name: "",
        enname: "",
        grade: "",
        actionStage: "",
        actionStat: "",
        spareTime: "",
        classType: ""
      },
      actionListQuery: {
        page: 1,
        limit: 1000
      },
      experienceListQuery: {
        phone: "",
        page: 1,
        rows: 1000
      },
      loading: true,
      parentMsg: "55555555",
      gridData1: [],
      gridData: [],
      channelOptions:[],
      listQuery: {
        userId: null,
        type: null,
        isTrack: null,
        pages: 1,
        pageSize: 10,
        channelName:null,//渠道
        //新例子
        //          assignDate: null,
        assignDateSort: null, //分配日期开始时间
        assignDateSE: null,
        phone: null,
        name: null,
        enname: null,
        grade: null,
        receiveClass: null,
        createDateSort: null, //注册开始日期
        createDateSE: null,
        //旧例子
        actionStage: null,
        actionStat: null,
        //          connectDate: null,
        connectDateSort: null, //联系时间Start
        connectDateSE: null,
        //          punchDate: null,
        punchDateSort: null, //打卡时间Start
        punchDateSE: null,
        //付费
        courseType: null,
        enterClassTime: null,
        classTypeName: null,
        classTime: null,
        outofClassDateSort: null,
        outofClassDateSE: null,
        spareTime: null,
        sPeriods: null,
        ePeriods: null
      },
      listquery1: {
        billAndUserIdCollection: "",
        systemUserId: null,
        userId: null
      },
      timeData: {
        assignDate: null,
        createDate: null,
        connectDate: null //联系时间
      },
      //提醒例子需要参数
      listQuery2: {
        userId: null,
        pages: 1,
        pageSize: 10,
        phone: null,
        name: null,
        enname: null,
        startDate: null,
        endDate: null,
        nowDate: null
      },
      timePeriod: null,
      actionStages: [],
      actionStats: [],
      courseTypes: [
        {
          value: 1,
          label: "长期"
        },
        {
          value: 2,
          label: "短期"
        }
      ],
      //课程类型参数type
      courseTypeList: {
        type: null
      },
      formInline: {
        phone: "",
        phoneData: []
      },
      spareTime: [
        {
          value: "1-12",
          label: "1-12"
        },
        {
          value: "13-36",
          label: "13-36"
        },
        {
          value: "37-72",
          label: "37-72"
        },
        {
          value: "73-144",
          label: "73-144"
        },
        {
          value: "144+",
          label: "144+"
        }
      ],
      classTypeNames: [],
      classTimes: [
        {
          value: "0",
          label: "18:00-18:25"
        },
        {
          value: "1",
          label: "18:30-18:55"
        }
      ],

      page: {
        currentPage1: 1,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 1
      },
      total: 0,
      tableData1: [],
      multipleSelection: [],
      //提醒联系例子
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters([
      "NEW_BILLS_STAGE",
      "NEW_BILLS_STATUS",
      "OLD_BILLS_STAGE",
      "OLD_BILLS_STATUS",
      "DUMPING_BILLS_STAGE",
      "DUMPING_BILLS_STATUS",
      "PAY_BILLS_STAGE",
      "PAY_BILLS_STATUS",
      "NO_RENEWS_BILLS_STAGE",
      "NO_RENEWS_BILLS_STATUS",
      "userId",
      "roles",
      "schedulePoint"
    ]),
    assignDate() {
      return this.listQuery.assignDate;
    },
    createDate() {
      return this.listQuery.createDate;
    },
    connectDate() {
      return this.listQuery.connectDate;
    },
    punchDate() {
      return this.listQuery.punchDate;
    },

    enterClassTime() {
      return this.listQuery.enterClassTime;
    },
    outofClassDate() {
      return this.listQuery.outofClassDate;
    }
  },
  filters: {
    ccFilter(val) {
      let num1 = val.indexOf("(");
      let num2 = val.indexOf(")");
      return val.substring(num1 + 1, num2);
    },
    dealRuserStatus(val) {
      const config = {
        0: "未出席",
        1: "已出席"
      };
      return config[val];
    }
  },
  watch: {
    timePeriod(newValue, oldValue) {
      //新例子
      (this.listQuery.assignDate = null), (this.timePeriod = newValue);
    }
  },
  created() {
    this.classTimes = this.schedulePoint;
    //this.listQuery.userId = this.$store.getters.userId
    this.listQuery.userId = this.$route.query.userId;
    this.listquery1.systemUserId = this.$store.getters.userId;
    this.listQuery.type = this.$route.query.type;
    //console.log()
    this.listQuery.isTrack = this.$route.query.status;
    this.type = this.$route.query.type;
    this.status = this.$route.query.status;
    if (this.type == 1) {
      if (this.status == 1) {
        let searchArry11 = JSON.parse(sessionStorage.getItem("searchArry11"));
        if (searchArry11) {
          this.timeData.createDate = searchArry11.createDate || null;
          this.timeData.assignDate = searchArry11.assignDate || null;
          this.timeData.connectDate = searchArry11.connectDate || null;
          this.formInline.phone = searchArry11.phone || null;
          this.listQuery.name = searchArry11.name || null;
          this.listQuery.enname = searchArry11.enname || null;
          this.listQuery.grade = searchArry11.grade || null;
          this.listQuery.receiveClass = searchArry11.receiveClass || null;
          this.listQuery.actionStage = searchArry11.actionStage || null;
          this.listQuery.actionStat = searchArry11.actionStat || null;
        }
      }
      if (this.status == 0) {
        let searchArry10 = JSON.parse(sessionStorage.getItem("searchArry10"));
        if (searchArry10) {
          this.timeData.createDate = searchArry10.createDate || null;
          this.timeData.assignDate = searchArry10.assignDate || null;
          this.timeData.connectDate = searchArry10.connectDate || null;
          this.formInline.phone = searchArry10.phone || null;
          this.listQuery.name = searchArry10.name || null;
          this.listQuery.enname = searchArry10.enname || null;
          this.listQuery.grade = searchArry10.grade || null;
          this.listQuery.receiveClass = searchArry10.receiveClass || null;
          this.listQuery.actionStage = searchArry10.actionStage || null;
          this.listQuery.actionStat = searchArry10.actionStat || null;
        }
      }
    } else if (this.type == 0) {
      let searchArry00 = JSON.parse(sessionStorage.getItem("searchArry00"));
      if (searchArry00) {
        this.timeData.createDate = searchArry00.createDate || null;
        this.timeData.assignDate = searchArry00.assignDate || null;
        this.formInline.phone = searchArry00.phone || null;
        this.listQuery.name = searchArry00.name || null;
        this.listQuery.enname = searchArry00.enname || null;
        this.listQuery.grade = searchArry00.grade || null;
        this.listQuery.receiveClass = searchArry00.receiveClass || null;
      }
    } else if (this.type == 2) {
      if (this.status == 1) {
        let searchArry21 = JSON.parse(sessionStorage.getItem("searchArry21"));
        if (searchArry21) {
          this.timeData.createDate = searchArry21.createDate || null;
          this.timeData.assignDate = searchArry21.assignDate || null;
          this.timeData.connectDate = searchArry21.connectDate || null;
          this.formInline.phone = searchArry21.phone || null;
          this.listQuery.name = searchArry21.name || null;
          this.listQuery.enname = searchArry21.enname || null;
          this.listQuery.grade = searchArry21.grade || null;
          this.listQuery.receiveClass = searchArry21.receiveClass || null;
          this.listQuery.actionStage = searchArry21.actionStage || null;
          this.listQuery.actionStat = searchArry21.actionStat || null;
        }
      }
      if (this.status == 0) {
        let searchArry20 = JSON.parse(sessionStorage.getItem("searchArry20"));
        if (searchArry20) {
          this.timeData.createDate = searchArry20.createDate || null;
          this.timeData.assignDate = searchArry20.assignDate || null;
          this.timeData.connectDate = searchArry20.connectDate || null;
          this.formInline.phone = searchArry20.phone || null;
          this.listQuery.name = searchArry20.name || null;
          this.listQuery.enname = searchArry20.enname || null;
          this.listQuery.grade = searchArry20.grade || null;
          this.listQuery.receiveClass = searchArry20.receiveClass || null;
          this.listQuery.actionStage = searchArry20.actionStage || null;
          this.listQuery.actionStat = searchArry20.actionStat || null;
        }
      }
    }
    //根据type获取行动状态等
    if (this.listQuery.type == 0) {
      this.actionStages = this.NEW_BILLS_STAGE;
      this.actionStats = this.NEW_BILLS_STATUS;
    } else if (this.listQuery.type == 1) {
      this.actionStages = this.OLD_BILLS_STAGE;
      this.actionStats = this.OLD_BILLS_STATUS;
    } else if (this.listQuery.type == 2) {
      this.actionStages = this.DUMPING_BILLS_STAGE;
      this.actionStats = this.DUMPING_BILLS_STATUS;
    } else if (this.listQuery.type == 3) {
      this.actionStages = this.PAY_BILLS_STAGE;
      this.actionStats = this.PAY_BILLS_STATUS;
    } else {
      this.actionStages = this.NO_RENEWS_BILLS_STAGE;
      this.actionStats = this.NO_RENEWS_BILLS_STATUS;
    }

    if (this.listQuery.type == 0) {
      this.listQuery.createDateSort = "DESC";
    } else {
      this.listQuery.connectDateSort = "DESC";
    }
    this.getList();
    this.getClassType(); //初始化拉去全部课程类型名称
    this.getChannel()
  },

  methods: {
    /**
     * @description 获取所有的渠道
     */
    async getChannel() {
      const data = await getAllChannel();
      this.channelOptions = data.data.result;
    },
    gotoDetail(classId) {
      this.$router.push({
        path: "/sale/classmanageDetail",
        query: { classId, name: "体验课" }
      });
      // http://localhost:9527/#/aom/classmanage-detail?classId=498&name=%E8%BF%9B%E8%A1%8C%E4%B8%AD%E7%9A%84%E9%95%BF%E6%9C%9F%E7%8F%AD%E7%BA%A7
      // 进行中的长期班级
    },
    ExperienceList(phone) {
      this.experienceListQuery.phone = phone;
      queryExperienceList(this.experienceListQuery)
        .then(res => {
          this.gridData1 = res.data.records;
        })
        .catch(res => {
          // console.log(res);
        });
    },
    actionList(phone) {
      ruserAction(phone, this.actionListQuery)
        .then(res => {
          this.gridData = res.data.data.records;
        })
        .catch(res => {
          // console.log(res);
        });
    },
    getCreateDate() {
      //注册时间查询
      let { createDate } = this.timeData;
      if (createDate) {
        this.listQuery.createDateSE = createDate[0] + "@" + createDate[1];
      }
      this.listQuery.createDateSort = null;
      this.listQuery.assignDateSort = null;
      this.listQuery.assignDateSE = null;
      this.listQuery.connectDateSort = null;
      this.listQuery.connectDateSE = null;
      this.listQuery.outofClassDateSort = null;
      this.listQuery.outofClassDateSE = null;
      this.timeData.assignDate = null;
      this.timeData.connectDate = null;
      this.timeData.outofClassDate = null;
      this.getList();
    },
    getAssignDate() {
      //分配时间查询
      let { assignDate } = this.timeData;
      if (assignDate) {
        this.listQuery.assignDateSE = assignDate[0] + "@" + assignDate[1];
      }
      this.listQuery.createDateSort = null;
      this.listQuery.createDateSE = null;
      this.listQuery.assignDateSort = null;
      this.listQuery.connectDateSort = null;
      this.listQuery.connectDateSE = null;
      this.listQuery.outofClassDateSort = null;
      this.listQuery.outofClassDateSE = null;
      this.timeData.createDate = null;
      this.timeData.connectDate = null;
      this.timeData.outofClassDate = null;
      this.getList();
    },
    getConnectDate() {
      //最后联系时间查询
      let { connectDate } = this.timeData;
      if (connectDate) {
        this.listQuery.connectDateSE = connectDate[0] + "@" + connectDate[1];
      }
      this.listQuery.createDateSort = null;
      this.listQuery.createDateSE = null;
      this.listQuery.assignDateSort = null;
      this.listQuery.assignDateSE = null;
      this.listQuery.connectDateSort = null;
      this.listQuery.outofClassDateSort = null;
      this.listQuery.outofClassDateSE = null;
      this.timeData.assignDate = null;
      this.timeData.createDate = null;
      this.timeData.outofClassDate = null;
      this.getList();
    },
    getOutofClassDate() {
      //退出班级日查询
      let { outofClassDate } = this.timeData;
      if (outofClassDate) {
        this.listQuery.createDateSE =
          outofClassDate[0] + "@" + outofClassDate[1];
      }
      this.listQuery.createDateSort = null;
      this.listQuery.createDateSE = null;
      this.listQuery.assignDateSort = null;
      this.listQuery.assignDateSE = null;
      this.listQuery.connectDateSort = null;
      this.listQuery.connectDateSE = null;
      this.listQuery.outofClassDateSort = null;
      this.timeData.assignDate = null;
      this.timeData.connectDate = null;
      this.timeData.outofClassDate = null;
      this.getList();
    },
    //改变事件
    slectCreat() {
      let { createDate } = this.timeData;
      this.listQuery.createDateSort = createDate;
      this.listQuery.createDateSE = null;

      this.listQuery.assignDateSort = null;
      this.listQuery.assignDateSE = null;
      //        旧例子
      this.listQuery.connectDateSort = null;
      this.listQuery.connectDateSE = null;
      this.listQuery.punchDateSort = null;
      this.listQuery.punchDateSE = null;
      //        付费
      this.listQuery.enterClassTimeSort = null;
      this.listQuery.enterClassTimeSE = null;
      this.listQuery.outofClassDateSort = null;
      this.listQuery.outofClassDateSE = null;
      this.timeData.assignDate = null;
      this.timeData.connectDate = null;
      this.timeData.outofClassDate = null;
      this.getList();
    },
    slectAssign(val) {
      let { assignDate } = this.timeData;
      this.listQuery.assignDateSort = assignDate;
      this.listQuery.assignDateSE = null;

      this.listQuery.createDateSort = null;
      this.listQuery.createDateSE = null;
      //        旧例子
      this.listQuery.connectDateSort = null;
      this.listQuery.connectDateSE = null;
      this.listQuery.punchDateSort = null;
      this.listQuery.punchDateSE = null;
      //        付费
      this.listQuery.enterClassTimeSort = null;
      this.listQuery.enterClassTimeSE = null;
      this.listQuery.outofClassDateSort = null;
      this.listQuery.outofClassDateSE = null;
      this.timeData.createDate = null;
      this.timeData.connectDate = null;
      this.timeData.outofClassDate = null;

      this.getList();
    },
    slectConnect() {
      this.listQuery.connectDateE = null;

      let { connectDate } = this.timeData;
      this.listQuery.connectDateSort = connectDate;
      this.listQuery.connectDateSe = null;

      this.listQuery.createDateSort = null;
      this.listQuery.createDateSE = null;
      this.listQuery.assignDateSort = null;
      this.listQuery.assignDateSE = null;
      //        旧例子
      this.listQuery.punchDateSort = null;
      this.listQuery.punchDateSE = null;
      //        付费
      this.listQuery.enterClassTimeSort = null;
      this.listQuery.enterClassTimeSE = null;
      this.listQuery.outofClassDateSort = null;
      this.listQuery.outofClassDateSE = null;
      this.timeData.assignDate = null;
      this.timeData.createDate = null;
      this.timeData.outofClassDate = null;

      this.getList();
    },
    slectPunch() {
      this.listQuery.assignDate = null;
      this.listQuery.createDate = null;
      //旧例子
      this.listQuery.connectDate = null;
      //付费
      this.listQuery.enterClassTime = null;
      this.listQuery.outofClassDate = null;
    },
    slectEnter() {
      this.listQuery.assignDate = null;
      this.listQuery.createDate = null;
      //旧例子
      this.listQuery.connectDate = null;
      this.listQuery.punchDate = null;
      //付费
      this.listQuery.outofClassDate = null;
    },
    slectOut() {
      this.listQuery.outofClassDateE = null;

      let { outofClassDate } = this.timeData;
      this.listQuery.outofClassDateSort = outofClassDate;
      this.listQuery.outofClassDateSE = null;

      this.listQuery.createDateSort = null;
      this.listQuery.createDateSE = null;
      this.listQuery.assignDateSort = null;
      this.listQuery.assignDateSE = null;
      //        旧例子
      this.listQuery.connectDateSort = null;
      this.listQuery.connectDateSE = null;
      this.listQuery.punchDateSort = null;
      this.listQuery.punchDateSE = null;
      //        付费
      this.listQuery.enterClassTimeSort = null;
      this.listQuery.enterClassTimeSE = null;
      this.timeData.assignDate = null;
      this.timeData.createDate = null;
      this.timeData.connectDate = null;

      this.getList();
    },
    //列表查询
    getList() {
      //console.log(this.listQuery.type)
       if (!this.listQuery.channelName) {
        this.listQuery.channelName = null;
      }
      if (!this.listQuery.actionStage) {
        this.listQuery.actionStage = null;
      }
      if (!this.listQuery.actionStat) {
        this.listQuery.actionStat = null;
      }
      if (!this.listQuery.grade) {
        this.listQuery.grade = null;
      }
      if (!this.listQuery.receiveClass) {
        this.listQuery.receiveClass = null;
      }
      if (!this.listQuery.name) {
        this.listQuery.name = null;
      }
      if (!this.listQuery.enname) {
        this.listQuery.enname = null;
      }
      if (this.listQuery.type == 3) {
        //付费
        exaCheckPay(this.listQuery).then(response => {
          let data = response.data.result;
          this.total = data.total;
          this.tableData1 = data.records;
          this.loading = false;
          //this.initList()
        });
      } else if (this.listQuery.type == 4) {
        //不续费
        exaCheckFree(this.listQuery).then(response => {
          let data = response.data.result;
          this.total = data.total;
          this.tableData1 = data.records;
          this.loading = false;
          //this.initList()
        });
      } else if (this.listQuery.type == 5) {
        //提醒联系的例子
        this.listQuery2.userId = this.userId;
        this.listQuery2.pages = this.listQuery.pages;
        this.listQuery2.pageSize = this.listQuery.pageSize;
        this.listQuery2.phone = this.listQuery.phone;
        this.listQuery2.name = this.listQuery.name;
        this.listQuery2.enname = this.listQuery.enname;
        this.listQuery2.nowDate = this.$route.query.status;
        if (this.timePeriod) {
          this.listQuery2.startDate = this.timePeriod[0];
          this.listQuery2.endDate = this.timePeriod[1];
        }
        //console.log(this.timePeriod)
        /*this.listQuery2.startDate = this.listQuery.startDate
           this.listQuery2.endDate = this.listQuery.endDate*/
        checkREmindList(this.listQuery2).then(response => {
          //console.log(response.data)
          let data = response.data.result;
          this.total = data.total;
          this.tableData1 = data.records;
          this.loading = false;
          //this.initList()
        });
      } else {
        //新/旧/报废
        exaCheckAll(this.listQuery).then(response => {
          let data = response.data.result;
          this.total = data.total;
          this.tableData1 = data.records;
          this.loading = false;

          //              this.listQuery.createDateSort = null
          //this.initList()
        });
      }
    },

    //剩余课时
    getPeriods() {
      let arr = this.listQuery.spareTime.split("-");
      if (arr.length > 1) {
        this.listQuery.sPeriods = arr[0];
        this.listQuery.ePeriods = arr[1];
      } else {
        this.listQuery.sPeriods = 145;
        this.listQuery.ePeriods = -1;
      }
    },
    //根据课时类型查询类型名称
    getClassType() {
      this.courseTypeList.type = this.listQuery.classType;
      checkClassType(this.courseTypeList).then(response => {
        this.classTypeNames = response.data;
        this.listQuery.classTypeName = null;
      });
    },
    //选择例子
    handleSelectionChange(val) {
      this.multipleSelection = val;
      //
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (i == 0) {
          this.listquery1.billAndUserIdCollection =
            this.multipleSelection[i].flowBillId +
            "#" +
            this.multipleSelection[i].currentUserId +
            ",";
        } else {
          this.listquery1.billAndUserIdCollection +=
            this.multipleSelection[i].flowBillId +
            "#" +
            this.multipleSelection[i].currentUserId +
            ",";
        }
      }
    },
    //例子流转
    circulation() {
      if (this.listquery1.billAndUserIdCollection == "") {
        this.$message({
          message: "您还未选择需要流转的例子",
          type: "warning"
        });
      } else if (this.listquery1.userId.length > 1) {
        this.$message({
          message: "请选择被流转人员",
          type: "warning"
        });
      } else {
        exaFlow(this.listquery1).then(response => {
          this.$message({
            message: "例子流转成功！",
            type: "success"
          });
          this.getList();
        });
      }
    },
    onSearch() {
      if (this.type == 1) {
        if (this.status == 1) {
          this.searchArry.createDate = this.timeData.createDate;
          this.searchArry.assignDate = this.timeData.assignDate;
          this.searchArry.connectDate = this.timeData.connectDate;
          this.searchArry.phone = this.formInline.phone;
          this.searchArry.name = this.listQuery.name;
          this.searchArry.enname = this.listQuery.enname;
          this.searchArry.grade = this.listQuery.grade;
          this.searchArry.actionStage = this.listQuery.actionStage;
          this.searchArry.actionStat = this.listQuery.actionStat;
          this.searchArry.receiveClass = this.listQuery.receiveClass;
          sessionStorage.setItem(
            "searchArry11",
            JSON.stringify(this.searchArry)
          );
        }
        if (this.status == 0) {
          this.searchArry.createDate = this.timeData.createDate;
          this.searchArry.assignDate = this.timeData.assignDate;
          this.searchArry.connectDate = this.timeData.connectDate;
          this.searchArry.phone = this.formInline.phone;
          this.searchArry.name = this.listQuery.name;
          this.searchArry.enname = this.listQuery.enname;
          this.searchArry.grade = this.listQuery.grade;
          this.searchArry.actionStage = this.listQuery.actionStage;
          this.searchArry.actionStat = this.listQuery.actionStat;
          this.searchArry.receiveClass = this.listQuery.receiveClass;
          sessionStorage.setItem(
            "searchArry10",
            JSON.stringify(this.searchArry)
          );
        }
      } else if (this.type == 2) {
        if (this.status == 1) {
          this.searchArry.createDate = this.timeData.createDate;
          this.searchArry.assignDate = this.timeData.assignDate;
          this.searchArry.connectDate = this.timeData.connectDate;
          this.searchArry.phone = this.formInline.phone;
          this.searchArry.name = this.listQuery.name;
          this.searchArry.enname = this.listQuery.enname;
          this.searchArry.grade = this.listQuery.grade;
          this.searchArry.actionStage = this.listQuery.actionStage;
          this.searchArry.actionStat = this.listQuery.actionStat;
          this.searchArry.receiveClass = this.listQuery.receiveClass;
          sessionStorage.setItem(
            "searchArry21",
            JSON.stringify(this.searchArry)
          );
        }
        if (this.status == 0) {
          this.searchArry.createDate = this.timeData.createDate;
          this.searchArry.assignDate = this.timeData.assignDate;
          this.searchArry.connectDate = this.timeData.connectDate;
          this.searchArry.phone = this.formInline.phone;
          this.searchArry.name = this.listQuery.name;
          this.searchArry.enname = this.listQuery.enname;
          this.searchArry.grade = this.listQuery.grade;
          this.searchArry.actionStage = this.listQuery.actionStage;
          this.searchArry.actionStat = this.listQuery.actionStat;
          this.searchArry.receiveClass = this.listQuery.receiveClass;
          sessionStorage.setItem(
            "searchArry20",
            JSON.stringify(this.searchArry)
          );
        }
      } else if (this.type == 0) {
        if (this.status == 0) {
          this.searchArry.createDate = this.timeData.createDate;
          this.searchArry.assignDate = this.timeData.assignDate;
          this.searchArry.phone = this.formInline.phone;
          this.searchArry.name = this.listQuery.name;
          this.searchArry.enname = this.listQuery.enname;
          this.searchArry.grade = this.listQuery.grade;
          this.searchArry.receiveClass = this.listQuery.receiveClass;
          sessionStorage.setItem(
            "searchArry00",
            JSON.stringify(this.searchArry)
          );
        }
      }

      this.getList();
    },

    pickerOptions1() {
      // console.log("123");
    },

    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.listQuery2.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pages = val;
      this.listQuery2.pages = val;
      this.getList();
    },
    currentPage4() {
      // console.log("369s");
    },
    //查看详情
    handleClick(arg) {
      this.type = sessionStorage.setItem("exampleType", this.listQuery.type);
      let phone = arg.stuPhone || arg.bindPhone || arg.phone;
      this.$router.push({
        path: "/detail/user",
        query: { phone: phone, type: this.listQuery.type }
      }); //类似post传参
    },
    //添加电话
    addPhone(e) {
      if (validatePhone(this.formInline.phone)) {
        let data = Object.assign(
          {},
          JSON.parse(
            JSON.stringify({
              id: this.formInline.phoneData.length,
              phone: this.formInline.phone
            })
          )
        );
        //arrObjAdd(this.formInline.phoneData, data, 'phone');
        if (arrObjAdd(this.formInline.phoneData, data)) {
          this.$message.error("手机号码已存在！");
        } else {
          this.formInline.phoneData.push(data);
          this.formInline.phone = "";
        }
      } else {
        this.$message.error("手机号码格式不正确！");
      }
      this.phoneFormat(this.formInline.phoneData);
    },
    //删除电话
    deletePhone(index, rows) {
      rows.splice(index, 1);
      this.phoneFormat(this.formInline.phoneData);
    },

    //电话汇总
    phoneFormat(arr) {
      if (arr.length < 1) {
        this.listQuery.phone = null;
      } else {
        this.listQuery.phone = "";
        for (let i = 0; i < arr.length; i++) {
          if (i == 0) {
            this.listQuery.phone += arr[i].phone;
          } else {
            this.listQuery.phone += ",";
            this.listQuery.phone += arr[i].phone;
          }
        }
      }
    },
    //接受子组件
    showMsgFromChild(data) {
      this.listquery1.userId = data;
    },
    //搜索完成后初始化条件
    initList() {
      //新例子
      return new Promise((resolve, reject) => {
        this.listQuery.assignDate = null;
        this.listQuery.createDate = null;
        //旧例子
        this.listQuery.connectDate = null;
        this.listQuery.punchDate = null;
        //付费
        this.listQuery.enterClassTime = null;
        this.listQuery.outofClassDate = null;
        resolve();
      });
    }
  }
};
</script>
