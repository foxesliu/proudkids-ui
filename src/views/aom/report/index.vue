<template>
  <div class="report-container">
    <div class="p-20">
      <div class="o-hidden">
        <div class="pull-left font30">Feedback Report</div>
        <div class="pull-right">
          <router-link to="/message/feedback-add">
            <el-button type="primary" class="width-200">Add Feedback</el-button>
          </router-link>
        </div>
      </div>
      <div class="pull-right mt-20">
        <el-date-picker class="width-200"
                        v-model="chooseDate11"
                        value-format="yyyy-MM-dd"
                        type="date"
                        @change="change"
                        placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="clearfix"></div>
      <div class="tab">
        <div @click="tabFun(null)" :class="tabIndex==null?'pull-left active':'pull-left'">All</div>
        <div @click="tabFun(1)" :class="tabIndex==1?'pull-left active':'pull-left'">Processed</div>
        <div @click="tabFun(0)" :class="tabIndex==0?'pull-left active':'pull-left'">Untreated</div>
      </div>
      <div class="clearfix"></div>
      <div class="ul">
        <ul>
          <li v-for="(item,index) in list">
            <div class="div">
              <div class="left font12" v-if="item.status==1">{{item.createTime}}<br><br>{{item.updateTime}}</div>
              <div class="left font12" v-if="item.status!=1">{{item.createTime}}</div>
              <div class="right">
                <div class="top">
                  <div class="width20 pull-left t-hidden">Reporter：{{item.reporter}}</div>
                  <div class="width20 pull-left t-hidden">Class #：{{item.clazz}}</div>
                  <div class="width20 pull-left t-hidden">Student name：{{item.stuName}}</div>
                  <div class="width20 pull-left t-hidden" :title="item.pending">Pending：{{item.pending}}</div>
                  <div class="width20 pull-left t-hidden" :title="item.processor">Processor：{{item.processor}}</div>
                </div>
                <div class="clearfix"></div>
                <div class="o-hidden line line1">
                  <div class="pull-left font12 width10">Issue:</div>
                  <div class="pull-left font12 width90">
                    <div class="span">{{item.issue}}</div>
                  </div>
                </div>
                <div class="clearfix"></div>
                <div class="o-hidden line line2" v-if="item.status==1">
                  <div class="pull-left font12 width10">Status:</div>
                  <div class="pull-left width90">
                    <div class="span">
                      <span class="font12">Processed</span>
                      <input ref="input" class="font12" disabled :value="item.processContent"/>
                    </div>
                  </div>
                </div>
                <div class="o-hidden line line2" v-if="item.status!=1">
                  <div class="pull-left font12 width10">Status:</div>
                  <div class="pull-left width90">
                    <div class="span" style="background:#ff2e2f;">
                      <span class="font12">Untreated</span>
                      <input ref="input" class="font12" placeholder="The teacher can not hear the students speaking."/>
                    </div>
                    <div class="b" @click="_editFeedback(item,index)">
                      <i class="el-icon-check color-white c-pointer"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>

        </ul>
        <div v-if="list.length==0" class="h-50 lh-50 t-center">暂无数据</div>

        <div v-if="list.length>0" class="mt-20 mb-20 t-center">
          <el-pagination background
                         layout="prev,pager,next,sizes"
                         :page-size="query.rows"
                         :page-sizes="[10,20,30,50]"
                         :current-page.sync="query.page"
                         :total="total"
                         @size-change="handleSizeChange"
                         @current-change="currentChange">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getFeedbacks, editFeedback} from '../../../api/aom.js';
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        tabIndex: null,
        chooseDate11: '',
        list: [],
        query: {
          page: 1,
          rows: 10,
          userId: null,
          status: null,  //处理状态 0未处理 1已处理
          createTime: null
        },
        total: 0,
      }
    },

    computed: {
      ...mapGetters(['userId'])
    },

    created() {
      this._getFeedbacks();
    },

    methods: {
      _getFeedbacks(){
        getFeedbacks(this.query).then((res) => {
          //console.log(res.data);
          this.total = res.data.total;
          this.list = res.data.records;
          console.log(this.list);
        })
      },
      _editFeedback(item, index){
        //console.log(item);
        //console.log(this.$refs.input[index].value);
        //return;
        var obj = {
          id: item.id,
          status: 1,
          pendingUserId: item.pendingUserId,
          reporterUserId: item.reporterUserId,
          processContent: this.$refs.input[index].value,
          processorUserId: this.userId
        };
        console.log(obj);
        if (!obj.processContent) {
          alert('Please write.');
          return;
        }
        //return;
        editFeedback(obj).then((res) => {
          console.log(res);
          this.$refs.input[index].value = null;
          this._getFeedbacks();
        })
      },
      currentChange(val) {
        this.query.page = val;
        console.log(this.query);
        this._getFeedbacks();
      },
      handleSizeChange(e){
        this.query.rows = e;
        console.log(this.query);
        this._getFeedbacks();
      },
      untreated(id){
        alert(id)
      },
      tabFun(a){
        this.query.page = 1;
        this.query.status = a;
        this.tabIndex = a;
        this._getFeedbacks();
      },
      change(ee){
        this.chooseDate11 = ee;
        this.query.createTime = ee;
        this._getFeedbacks();
      },
    },
    filters: {},
    components: {}
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  @import '../index.scss';

  .report-container {
    .p-20 {
      .tab {
        height: 50px;
        width: 100%;
        border-bottom: 1px solid #ebeef5;
        margin-top: 20px;
        & > * {
          width: 200px;
          text-align: center;
          height: 50px;
          line-height: 50px;
          cursor: pointer;
          &.active {
            border-bottom: 3px solid #449cfc;
            color: #449cfc;
          }
        }
      }
      .ul {
        ul {
          margin: 0;
          padding: 0;
          li {
            list-style: none;
            width: 100%;
            height: 150px;
            border-radius: 4px;
            border: solid 1px #ebeef5;
            margin-top: 15px;
            display: flex;
            .div {
              display: flex;
              width: 100%;
              height: 100%;
            }
            .left {
              width: 105px;
              background: #f9f9f9;
              text-align: center;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .right {
              flex: 1;
              .top {
                .pull-left {
                  height: 45px;
                  line-height: 45px;
                  text-align: center;
                  border-right: 1px solid #ebeef5;
                  border-bottom: 1px solid #ebeef5;
                  font-size: 13px;
                  padding: 0 10px;
                  &:last-child {
                    border-right: none;
                  }
                }
              }
              .line {
                height: 45px;
                line-height: 35px;
                padding: 0 10px;
                .span {
                  display: inline-block;
                  background: #f0f0f0;
                  width: 100%;
                  height: 30px;
                  line-height: 30px;
                  border-radius: 4px;
                  padding: 0 10px;
                }
                .width90 {
                  display: flex;
                  .span {
                    flex: 1;
                  }
                  .b {
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    background: #0d9cfd;
                    margin-left: 10px;
                    text-align: center;
                    border-radius: 4px;
                  }
                }
                &.line1 {
                  margin-top: 15px;
                }
                &.line2 {
                  .span {
                    padding: 0 2px 0 10px;
                    background: #69c242;
                    color: white;
                    display: flex;
                    span {
                      width: 100px;
                    }
                    input {
                      flex: 1;
                      height: 28px;
                      line-height: 28px;
                      margin-top: 1px;
                      border: 0;
                      border-radius: 4px;
                      padding: 0 10px;
                      outline: none;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
