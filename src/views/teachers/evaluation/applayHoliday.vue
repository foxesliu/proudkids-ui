<template>
  <div id="app">
    <div class="flex">
      <div>
        <span>{{$t('i18nView.applayHoliday.tips')}}</span>
        <input type="text" @click="openMultiByDrop($event)" v-model="calendar.display" readonly>
      </div>

    </div>
    <transition name="fade">
      <div class="calendar-dropdown" :style="{'left':calendar.left+500+'px','top':calendar.top+'px'}"
           v-if="calendar.show">
        <calendar :zero="calendar.zero"
                  :disabled="calendar.disabled"
                  :lunar="calendar.lunar"
                  :value="calendar.value"
                  :begin="calendar.begin"
                  :end="calendar.end"
                  :multi="calendar.multi"
                  @select="calendar.select"></calendar>
      </div>
    </transition>


    <div class="cont" v-for="time in list">
      <h3>{{time.weekName}}</h3>
      <ul>
        <li v-for="item in time.timeSoltInfo" @click="getParams(item,$event,time)">
          <template v-if="item.stat==0">
            <p class="noStatus">{{item.sTime|singleClassTimesToSA}} -{{item.eTime|singleClassTimesToSA}}</p>
            <p class="noStatus">{{$t('i18nView.applayHoliday.status')}}：{{item.status}}</p>
          </template>
          <template v-if="item.stat==1">
            <p :class="item.isAssignedClass?'assignedClass':'noAssignedClass'">{{item.sTime|singleClassTimesToSA}} -{{item.eTime|singleClassTimesToSA}}</p>
            <p :class="item.isAssignedClass?'assignedClass':'noAssignedClass'">{{$t('i18nView.applayHoliday.status')}}：{{item.status}}</p>
          </template>
          <div class="noChoosed">{{$t('i18nView.applayHoliday.choosed')}}</div>
        </li>
      </ul>
    </div>
    <div class="btn" v-if="btnFlag">
      <el-button @click="confirm">{{$t('i18nView.applayHoliday.confirm')}}</el-button>
    </div>


  </div>
</template>

<script>
  import local from '@/views/i18n-demo/local'

  const viewName = 'i18nView'
  import {mapGetters} from 'vuex'
  import calendar from './calendar.vue'
  import {tutorApplyHistory, tutorUptime} from '@/api/teachers'
  import {sfTools} from '../../aom/util.js';
  let isEnglishSanfeng = false;

  export default {
    name: 'app',
    components: {
      calendar
    },
    data() {
      return {
        teacherType: '',
        m: null,
        btnFlag: false,
        list7: [],
        list1: [],
        list2: [],
        list3: [],
        list4: [],
        list5: [],
        list6: [],
        list: [],
        arr: [],
        arr1: [],
        arr2: [],
        arr3: [],
        arr4: [],
        arr5: [],
        arr6: [],
        arr7: [],
        calendarDate: '',
        // 多选
        calendar: {
          display: "请选择日历",
          multi: true,
          show: false,
          zero: true,
          value: [], //默认日期
          disabled: [[2017, 12, 24], [2017, 12, 25]], //默认日期
          lunar: true, //显示农历
          range: true,
          begin: [2017, 2, 16], //可选开始日期
          end: [2029, 2, 16], //可选结束日期
          select: (value) => {
            let date = new Date(value[0]);
            let week = date.getDay()
            if (value) {
              if (week == 0) {
                this.calendar.begin = value[0]
                this.calendar.end = this.getEnd(date, 6)
              } else if (week == 6) {
              } else if (week == 5) {
                this.calendar.begin = this.getBegin(date, 5)
                this.calendar.end = this.getEnd(date, 6)
              } else if (week == 4) {
                this.calendar.begin = this.getBegin(date, 4)
                this.calendar.end = this.getEnd(date, 6)
              } else if (week == 3) {
                this.calendar.begin = this.getBegin(date, 3)
                this.calendar.end = this.getEnd(date, 6)
              } else if (week == 2) {
                this.calendar.begin = this.getBegin(date, 2)
                this.calendar.end = this.getEnd(date, 6)
              } else if (week == 1) {
                this.calendar.begin = this.getBegin(date, 1)
                this.calendar.end = this.getEnd(date, 6)
              } else {
                let date = new Date()
                this.calendar.begin.forEach((item, index) => {
                  this.calendar.begin[index] = this.formatDateTime(date).split('-')[index]
                })
                this.calendar.end = []
              }
            }

            let displayValue = []
            value.forEach(v => {
              displayValue.push(v[0] + "-" + (v[1]) + "-" + v[2])
            })
            this.calendarDate = displayValue
            this.calendarDate.sort((a, b) => {
              var a = new Date(a).getTime();
              var b = new Date(b).getTime();
              return a - b
            })
            this.list = []
            this.calendarDate.forEach(item => {
              let week = new Date(item).getDay()
//              this.list = []
              if (week == 0) {
                tutorUptime(7, this.userId).then(res => {
                  this.list7 = res.data
                  if (this.teacherType == '1') {
                    this.list7.weekName = 'Sunday'
                  } else {
                    this.list7.weekName = '周日'
                  }
                  this.changeStatus(this.list7)
                  this.list.push(this.list7)
                })
              } else if (week == 1) {
                tutorUptime(1, this.userId).then(res => {
                  this.list1 = res.data
                  if (this.teacherType == '1') {
                    this.list1.weekName = 'Monday'
                  } else {
                    this.list1.weekName = '周一'
                  }
                  this.changeStatus(this.list1)
                  this.list.push(this.list1)
                })
              } else if (week == 2) {
                tutorUptime(2, this.userId).then(res => {
                  this.list2 = res.data
                  if (this.teacherType == '1') {
                    this.list2.weekName = 'Tuesday'
                  } else {
                    this.list2.weekName = '周二'
                  }
                  this.list2.sortName = 2
                  this.changeStatus(this.list2)
                  this.list.push(this.list2)
                })
              } else if (week == 3) {
                tutorUptime(3, this.userId).then(res => {
                  this.list3 = res.data
                  if (this.teacherType == '1') {
                    this.list3.weekName = 'Wednesday'
                  } else {
                    this.list3.weekName = '周三'
                  }
                  this.list3.sortName = 3
                  this.changeStatus(this.list3)
                  this.list.push(this.list3)
                })
              } else if (week == 4) {
                tutorUptime(4, this.userId).then(res => {
                  this.list4 = res.data
                  if (this.teacherType == '1') {
                    this.list4.weekName = 'Thursday'
                  } else {
                    this.list4.weekName = '周四'
                  }
                  this.list4.sortName = 4
                  this.changeStatus(this.list4)
                  this.list.push(this.list4)
                })
              } else if (week == 5) {
                tutorUptime(5, this.userId).then(res => {
                  this.list5 = res.data
                  if (this.teacherType == '1') {
                    this.list5.weekName = 'Friday'
                  } else {
                    this.list5.weekName = '周五'
                  }
                  this.list5.sortName = 5
                  this.changeStatus(this.list5)
                  this.list.push(this.list5)
                })
              }
            })
            if (displayValue.length >= 7) {
              if (this.teacherType == '1') {
                this.$message('less than 7 days')
              } else {
                this.$message('不能超过7天')
              }
              return
            }
            this.calendar.display = displayValue.join(",");
            // this.calendar.show=false;
            this.calendar.value = value;
          }
        },
        formData: {
          createId: '',
          userId: '',
          timeSlot: '2018-07-03 18:00:00~2018-07-03 18:25:00,2018-07-03 19:00:00 ~ 2018-07-03 19:25:00',
          timezone: '8',
          expiryDate: '',
          stat: 0
        },
      }
    },
    computed: {
      ...mapGetters(['roleIds', 'userId'])
    },
    filters: {
      singleClassTimesToSA: function (a) {
        if (a) {
          if (isEnglishSanfeng) {
            return sfTools.singleClassTimesToSouthAfrica(a);
          } else {
            return a;
          }
        }
      },
    },
    created() {
      if (!this.$i18n.getLocaleMessage('en')[viewName]) {
        this.$i18n.mergeLocaleMessage('en', local.en)
        this.$i18n.mergeLocaleMessage('zh', local.zh)
      }
      let [roleId] = this.roleIds;

      if (roleId == 23 || roleId == 24 || roleId == 25 || roleId == 32) {
        this.$i18n.locale = 'en'
        this.$store.dispatch('setLanguage', 'en')
        this.teacherType = 1
        this.calendar.display = "Please select the calendar"
        isEnglishSanfeng = true;
      } else {
        this.$i18n.locale = 'zh'
        this.$store.dispatch('setLanguage', 'zh')
        this.teacherType = 0
      }
      this.m = new Map();
      this.formData.createId = this.userId
      this.formData.userId = this.userId
    },
    mounted() {
      let date = new Date();
      let value = this.parseTime(date.getTime()).substring(0, 10).replace(/-/g, ',').split(',')
      this.calendar.begin = value
    },
    updated() {
      if (this.list.length) {
        this.btnFlag = true
      }
      if (!this.calendar.begin.length) {
        this.btnFlag = false
      }
    },
    methods: {
      formatDateTime(timeStamp) {
        var date = new Date();
        date.setTime(timeStamp);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d + ' ';
      },
      getParams(item, e, time) {
        if (this.teacherType == '1') {
          if (item.stat == 0) {
            this.$message('This time is not available！')
            return
          }
          if (this.calendarDate.length == 0) {
            this.$message('Please choose the date')
            return
          }
        } else {
          if (item.stat == 0) {
            this.$message('该时间不可用！')
            return
          }
          if (this.calendarDate.length == 0) {
            this.$message('请选择日期')
            return
          }
        }

        if (e.currentTarget.className.indexOf("detail-selected") == -1) {
          e.currentTarget.className = "detail-selected"; //切换按钮样式
          e.currentTarget.childNodes[6].className = 'choosed'
          if (time.weekName == '周日' || time.weekName == 'Sunday') {
            this.arr7.push(item.postTime)
            this.arr7.sort((a, b) => {
              return a - b
            })
            Array.from(new Set(this.arr7))
          } else if (time.weekName == '周一' || time.weekName == 'Monday') {
            this.arr1.push(item.postTime)
            Array.from(new Set(this.arr1))
          } else if (time.weekName == '周二' || time.weekName == 'Tuesday') {
            this.arr2.push(item.postTime)
            Array.from(new Set(this.arr2))
          } else if (time.weekName == '周三' || time.weekName == 'Wednesday') {
            this.arr3.push(item.postTime)
            Array.from(new Set(this.arr3))
          } else if (time.weekName == '周四' || time.weekName == 'Thursday') {
            this.arr4.push(item.postTime)
            Array.from(new Set(this.arr4))
          } else if (time.weekName == '周五' || time.weekName == 'Friday') {
            this.arr5.push(item.postTime)
            Array.from(new Set(this.arr5))
          }
          //写逻辑
        } else {
          e.currentTarget.className = " ";//切换按钮样式
          e.currentTarget.childNodes[6].className = 'noChoosed'
          if (time.weekName == '周日' || time.weekName == 'Sunday') {
            this.arr7 = this.arr7.filter(function (val) {
              return val != item.postTime;
            });
            Array.from(new Set(this.arr7))
          } else if (time.weekName == '周一' || time.weekName == 'Monday') {
            this.arr1 = this.arr1.filter(function (val) {
              return val != item.postTime;
            });
            Array.from(new Set(this.arr1))
          } else if (time.weekName == '周二' || time.weekName == 'Tuesday') {
            this.arr2 = this.arr2.filter(function (val) {
              return val != item.postTime;
            });
            Array.from(new Set(this.arr2))
          } else if (time.weekName == '周三' || time.weekName == 'Wednesday') {
            this.arr3 = this.arr3.filter(function (val) {
              return val != item.postTime;
            });
            Array.from(new Set(this.arr3))
          } else if (time.weekName == '周四' || time.weekName == 'Thursday') {
            this.arr4 = this.arr4.filter(function (val) {
              return val != item.postTime;
            });
            Array.from(new Set(this.arr4))
          } else if (time.weekName == '周五' || time.weekName == 'Friday') {
            this.arr5 = this.arr5.filter(function (val) {
              return val != item.postTime;
            });
            Array.from(new Set(this.arr5))
          }
        }
      },
      getList() {
        let roleId = this.roleIds[0];
        if (roleId == 20 || roleId == 21 || roleId == 22 || roleId == 31) {//中教
          tutorUptime(7, this.userId).then(res => {
            this.list7 = res.data
            if (this.teacherType == '1') {
              this.list7.weekName = 'Sunday'
            } else {
              this.list7.weekName = '周日'
            }
            this.changeStatus(this.list7)
            this.list.push(this.list7)
          })
          tutorUptime(1, this.userId).then(res => {
            this.list1 = res.data
            if (this.teacherType == '1') {
              this.list1.weekName = 'Monday'
            } else {
              this.list1.weekName = '周一'
            }
            this.changeStatus(this.list1)
            this.list.push(this.list1)
          })
        } else if (roleId == 23 || roleId == 24 || roleId == 5 || roleId == 32) {
          tutorUptime(2, this.userId).then(res => {
            this.list2 = res.data
            if (this.teacherType == '1') {
              this.list2.weekName = 'Tuesday'
            } else {
              this.list2.weekName = '周二'
            }
            this.list2.sortName = 2
            this.changeStatus(this.list2)
            this.getSortList()
            this.list.push(this.list2)
          })
          tutorUptime(3, this.userId).then(res => {
            this.list3 = res.data
            if (this.teacherType == '1') {
              this.list3.weekName = 'Wednesday'
            } else {
              this.list3.weekName = '周三'
            }
            this.list3.sortName = 3
            this.changeStatus(this.list3)
            this.getSortList()
            this.list.push(this.list3)
          })
          tutorUptime(4, this.userId).then(res => {
            this.list4 = res.data
            if (this.teacherType == '1') {
              this.list4.weekName = 'Thursday'
            } else {
              this.list4.weekName = '周四'
            }
            this.list4.sortName = 4
            this.changeStatus(this.list4)
            this.getSortList()
            this.list.push(this.list4)
          })
          tutorUptime(5, this.userId).then(res => {
            this.list5 = res.data
            if (this.teacherType == '1') {
              this.list5.weekName = 'Friday'
            } else {
              this.list5.weekName = '周五'
            }
            this.list5.sortName = 5
            this.getSortList()
            this.changeStatus(this.list5)
            this.list.push(this.list5)

            setTimeout(() => {
              console.log(this.list)
              this.list = this.list.sort((a, b) => {
                return (a.sortName - b.sortName) > 0
              })
            }, 500)

          })
        }
      },
      changeStatus(list) {
        list.timeSoltInfo.forEach(item => {
          item.sTime = this.parseTime(item.startTime).substring(10, 16)
          item.eTime = this.parseTime(item.endTime).substring(10, 16)
          item.postTime = item.sTime + '~' + item.eTime
          if (this.teacherType == '1') {
            if (item.stat == 0) {  //stat 0 不可用
              item.status = 'Unavailable'
            } else {
              if (item.isAssignedClass) {
                item.status = 'haveClass'
              } else {
                item.status = 'UnscheduledClass'
              }
            }
          } else {
            if (item.stat == 0) {  //stat 0 不可用
              item.status = '不可用'
            } else {
              if (item.isAssignedClass) {
                item.status = '有课程'
              } else {
                item.status = '未安排课程'
              }
            }
          }
        })
        list.timeSoltInfo.sort((a, b) => {
          return a.startTime - b.startTime
        })
      },
      parseTime(time, cFormat) {
        if (arguments.length === 0) {
          return null
        }
        const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
        let date
        if (typeof time === 'object') {
          date = time
        } else {
          if (('' + time).length === 10) time = parseInt(time) * 1000
          date = new Date(time)
        }
        const formatObj = {
          y: date.getFullYear(),
          m: date.getMonth() + 1,
          d: date.getDate(),
          h: date.getHours(),
          i: date.getMinutes(),
          s: date.getSeconds(),
          a: date.getDay()
        }
        const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
          let value = formatObj[key]
          if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
          if (result.length > 0 && value < 10) {
            value = '0' + value
          }
          return value || 0
        })
        return time_str
      },
      formatDate(now) {
        var year = now.getYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        return "20" + year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
      },
      openByDrop(e) {
        this.calendar3.show = true;
        this.calendar3.left = e.target.offsetLeft + 19;
        this.calendar3.top = e.target.offsetTop + 70;
        e.stopPropagation();
        window.setTimeout(() => {
          document.addEventListener("click", (e) => {
            this.calendar3.show = false;
            document.removeEventListener("click", () => {
            }, false);
          }, false);
        }, 1000)
      },
      openByDialog() {
        this.calendar4.show = true;
      },
      closeByDialog() {
        this.calendar4.show = false;
      },
      openMultiByDrop(e) {
        this.calendar.show = true;
        this.calendar.left = e.target.offsetLeft + 19;
        this.calendar.top = e.target.offsetTop + 70;
        e.stopPropagation();
        window.setTimeout(() => {
          document.addEventListener("click", (e) => {
            this.calendar.show = false;
            document.removeEventListener("click", () => {
            }, false);
          }, false);
        }, 1000)
      },
      changeEvents() {
        this.calendar1.events = {
          '2017-7-20': '$' + (Math.random() * 1000 >> 0),
          '2017-7-21': '$' + (Math.random() * 1000 >> 0),
          '2017-7-22': '$' + (Math.random() * 1000 >> 0),
        }
      },
      getBegin(date, time) {
        return this.formatDateTime(date.setDate(date.getDate() - time)).split('-')
      },
      getEnd(date, time) {
        return this.formatDateTime(date.setDate(date.getDate() + time)).split('-')
      },
      postTutorApplyHistory() {
        tutorApplyHistory(this.formData).then(res => {


          if (this.teacherType == '1') {
            this.$message('Applay Success！')
          } else {
            this.$message('申请成功！')
          }
        })
      },
      getSortList(){
        setTimeout(() => {
          this.list = this.list.sort((a, b) => {
            return (a.sortName - b.sortName) > 0
          })
        }, 500)
      },
      confirm() { //提交
        let m = new Map()
        this.calendarDate.forEach(item => {
          let weekDay = new Date(item).getDay()
          if (weekDay == 1) {
            m.set(item, this.arr1)
          } else if (weekDay == 0) {
            m.set(item, this.arr7)
          } else if (weekDay == 2) {
            m.set(item, this.arr2)
          } else if (weekDay == 3) {
            m.set(item, this.arr3)
          } else if (weekDay == 4) {
            m.set(item, this.arr4)
          } else if (weekDay == 5) {
            m.set(item, this.arr5)
          }
        })

        m.forEach((item, key, mapObj) => {
          if (item == '') {
            m.delete(key)
            this.calendarDate = this.calendarDate.filter(item => {
              return item != key
            })
          }
        });
//        if (!values) {
//          this.$message('请选择请假时间段！')
//          return
//        }

        let values = m.get(this.calendarDate[this.calendarDate.length - 1]);
        let date = this.calendarDate[this.calendarDate.length - 1] + values[values.length - 1].substring(7, 13)
        this.formData.expiryDate = new Date(date).getTime()  //截止时间
        this.formData.timeSlot = JSON.stringify(m)
        this.postTutorApplyHistory()
        this.$router.push({
          path: 'tutorApplyHistoryList', query: {}
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../sale/detail/detail.scss';
  /*demo*/
  .flex {
    box-sizing: border-box;
    display: -webkit-box;
    -webkit-box-pack: start;
    -webkit-box-align: start;
    display: -webkit-flex;
    -webkit-justify-content: space-between;
    -webkit-align-items: top;
    display: flex;
    justify-content: space-between;
    align-items: top;
    flex-flow: row wrap;
    margin: 30px;
  }

  .flex > div {
    margin: 10px;
    padding: 20px;
    width: 50%;
    min-width: 300px;
    border: 1px solid #eee;
    border-radius: 2px;
    position: relative;
  }

  .flex > div > span {
    position: absolute;
    left: 0px;
    top: 0px;
    padding: 5px 10px;
    font-family: "PingFang SC", "Hiragino Sans GB", "STHeiti", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    font-size: 10px;
    border-radius: 0 0 2px 0;
    background: #ea6151;
    color: #fff;
  }

  .flex > div > input {
    box-sizing: border-box;
    width: 100%;
    margin-top: 20px;
    border-radius: 2px;
    border: 1px solid #dedede;
    padding: 10px;
    font-size: 16px;
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwpAZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6IGlmb250OyBzcmM6IHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuZW90PyNpZWZpeCIpIGZvcm1hdCgiZW1iZWRkZWQtb3BlbnR5cGUiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS53b2ZmIikgZm9ybWF0KCJ3b2ZmIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUudHRmIikgZm9ybWF0KCJ0cnVldHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LnN2ZyNpZm9udCIpIGZvcm1hdCgic3ZnIik7IH0KCl1dPjwvc3R5bGU+PC9kZWZzPjxnIGNsYXNzPSJ0cmFuc2Zvcm0tZ3JvdXAiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMC4wMTU2MjUsIDAuMDE1NjI1KSI+PHBhdGggZD0iTTcxMS4zMDYyIDI5MC42OTcyYzI0LjI4MjEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTU0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMjYgMC00My45ODggMTkuNzI4NC00My45ODggNDQuMDUzNXYyMDAuMTA0OTZDNjY3LjMxODMgMjcwLjk5MDMgNjg3LjAwMzYgMjkwLjY5NzIgNzExLjMwNjIgMjkwLjY5NzJ6TTYyMy40ODA4IDExMy40MjAzSDQwMC43NjQ5Mjh2NjYuNTEzOTJoMjIyLjcxNTkwNDAwMDAwMDAyVjExMy40MjAyODh6TTg4NC4wNTMgMTEzLjQyMDNoLTgyLjc3NDAxNnY2Ni4xNDUyOGg4NS45NDAyMjRjMjUuMjc4NSAwIDQ2LjYxMTUgMjEuMzc2IDQ2LjYxMTUgNDYuNjc3djE1My45Mjc2OEg5MC40Mzg2NTYwMDAwMDAwMXYtMTUzLjkyNzY4YzAtMjUuMyAyMS4zMzMtNDYuNjc3IDQ2LjYxMTUtNDYuNjc3aDg2LjUwMzQyNFYxMTMuNDIwMjg4aC04Mi42NDI5NDRjLTY0LjA4NiAwLTExNi41MDc2IDUyLjUwODctMTE2LjUwNzYgMTE2LjcwMzJ2Njc2LjgwMTUzNTk5OTk5OTljMCA2NC4xNzQxIDUwLjQ5MTQgMTE2LjY4MDcgMTE0LjU3NzQgMTE2LjY4MDdIODg0LjA1Mjk5MmM2NC4wNjI1IDAgMTE2LjUwNjYtNTIuNTA2NiAxMTYuNTA2Ni0xMTYuNjgwN1YyMzAuMTIzNTE5OTk5OTk5OThDMTAwMC41NTk2IDE2NS45MjkgOTQ4LjExNDQgMTEzLjQyMDMgODg0LjA1MyAxMTMuNDIwM3pNOTMzLjgyOTYgOTEwLjM1MTRjMCAyNS4zLTIxLjMzMyA0Ni42NzYtNDYuNjExNSA0Ni42NzZIMTM3LjA1MDExMTk5OTk5OTk4Yy0yNS4yNzg1IDAtNDYuNjExNS0yMS4zNzYtNDYuNjExNS00Ni42NzZWNDQ2LjQ0NTU2OEg5MzMuODI5NjMyVjkxMC4zNTEzNnpNMjY3LjEwODQgNjQ2LjE4MTljMzYuODc3MyAwIDY2Ljc1MjUtMjkuOTM5NyA2Ni43NTI1LTY2Ljg4MTUgMC0zNi45MjI0LTI5Ljg3NTItNjYuODYxMS02Ni43NTI1LTY2Ljg2MTEtMzYuODU0OCAwLTY2Ljc1MjUgMjkuOTM5Ny02Ni43NTI1IDY2Ljg2MTFDMjAwLjM1NTggNjE2LjI0MjIgMjMwLjI1MjUgNjQ2LjE4MTkgMjY3LjEwODQgNjQ2LjE4MTl6TTUxMS41NDg0IDY0Ni4xODE5YzM2Ljg1NTggMCA2Ni43NTI1LTI5LjkzOTcgNjYuNzUyNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTU3LTY2Ljg2MTEtNjYuNzUyNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzQ0NC43OTU5IDYxNi4yNDIyIDQ3NC42NzExIDY0Ni4xODE5IDUxMS41NDg0IDY0Ni4xODE5ek0yNjUuOTE2NCA4OTAuNzA5YzM2Ljg3NzMgMCA2Ni43NTE1LTI5LjkzOTcgNjYuNzUxNS02Ni44NjExIDAtMzYuOTQyOC0yOS44NzQyLTY2Ljg4MjYtNjYuNzUxNS02Ni44ODI2LTM2Ljg1NTggMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44ODI2QzE5OS4xNjM5IDg2MC43NjkzIDIyOS4wNTk2IDg5MC43MDkgMjY1LjkxNjQgODkwLjcwOXpNNTExLjU0ODQgODkwLjcwOWMzNi44NTU4IDAgNjYuNzUyNS0yOS45Mzk3IDY2Ljc1MjUtNjYuODYxMSAwLTM2Ljk0MjgtMjkuODk1Ny02Ni44ODI2LTY2Ljc1MjUtNjYuODgyNi0zNi44NzczIDAtNjYuNzUyNSAyOS45Mzk3LTY2Ljc1MjUgNjYuODgyNkM0NDQuNzk1OSA4NjAuNzY5MyA0NzQuNjcxMSA4OTAuNzA5IDUxMS41NDg0IDg5MC43MDl6TTc1NS42NDEzIDY0Ni4xODE5YzM2Ljg1NjggMCA2Ni43NTM1LTI5LjkzOTcgNjYuNzUzNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTY3LTY2Ljg2MTEtNjYuNzUzNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzY4OC44ODk5IDYxNi4yNDIyIDcxOC43NjQgNjQ2LjE4MTkgNzU1LjY0MTMgNjQ2LjE4MTl6TTMxMS43MDM2IDI5MC42OTcyYzI0LjI4MTEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTQ0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMTYgMC00My45ODkgMTkuNzI4NC00My45ODkgNDQuMDUzNXYyMDAuMTA0OTZDMjY3LjcxNDYgMjcwLjk5MDMgMjg3LjQwMiAyOTAuNjk3MiAzMTEuNzAzNiAyOTAuNjk3MnoiIGZpbGw9IiM1ZTdhODgiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==) no-repeat 8px 10px;
    padding-left: 36px;
    color: #666;
  }

  /*transition*/
  .fade-enter-active,
  .fade-leave-active {
    transition: all .5s ease-in-out;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: translateY(-10px);

  }

  /*下拉框*/
  .calendar-dropdown {
    z-index: 100 !important;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 2px;
  }

  .calendar-dropdown:before {
    position: absolute;
    left: 30px;
    top: -10px;
    content: "";
    border: 5px solid rgba(0, 0, 0, 0);
    border-bottom-color: #DEDEDE;
  }

  .calendar-dropdown:after {
    position: absolute;
    left: 30px;
    top: -9px;
    content: "";
    border: 5px solid rgba(0, 0, 0, 0);
    border-bottom-color: #fff;
  }

  /*弹出框*/
  .calendar-dialog {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .calendar-dialog-mask {
    background: rgba(255, 255, 255, .5);
    width: 100%;
    height: 100%;
  }

  .calendar-dialog-body {
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 2px;
  }

  .cont {
    margin: 30px;
    border: 1px solid #f6f6f6;
    border-radius: 10px;
    min-height: 150px;
    h3 {
      border-radius: 10px 10px 0 0;
      text-align: center;
      line-height: 50px;
      border: 1px solid #f0f0f0;
      border-bottom: none;
      background: #fff;
      color: #8e8e8e;
    }
    ul {
      border-radius: 0 0 10px 10px;
      overflow: hidden;
      li {
        position: relative;
        width: 25%;
        height: 150px;
        background: #fff;
        border: 1px solid #f0f0f0;
        text-align: center;
        float: left;
        p {
          height: 20px;
          line-height: 20px;
        }
        p:nth-child(1) {
          margin: 50px 0 10px 0;
        }
        .noChoosed {
          display: none;
        }
        .choosed {
          position: absolute;
          right: 0;
          top: 0;
          width: 100px;
          height: 40px;
          line-height: 40px;
          background: #e51c23;
          transition: 1s;
          color: #fff;
        }
      }
    }
  }

  .btn {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    @include btn();
    .el-button {
      width: 400px;
    }
  }

  .noStatus {
    color: #ec584e;
  }
  .assignedClass {
    color: #13ce66;
  }
  .noAssignedClass {
    color: #3a8ee6;
  }

  .detail-selected {
    background: #8bc34a !important;
    transition: 1s;
  }

  .list {
    background: pink
  }
</style>
