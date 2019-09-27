const detail = {
  state: {
    name: '',
    detailPhone: '',
    detailType: '',
    detailInfo: {},
    ruserInfo: {},
    swiperItem: {},
    readStat: 2,
    qaType: 2,
    qaFlag:'',
    courseName: [ //课程类型
      {
        value: '1',
        label: '长期课程'
      },
      {
        value: '2',
        label: '短期课程'
      }
    ],
    //部门树存储
    depthTree: [],

    //级别
    grade: [{
      value: 0,
      label: '0'
    },
      {
        value: 1,
        label: '1'
      },
      {
        value: 2,
        label: '2'
      },
      {
        value: 3,
        label: '3'
      },
      {
        value: 4,
        label: '4'
      },
      {
        value: 5,
        label: '5'
      },
      {
        value: 6,
        label: '6'
      }
    ],
    present: [ //赠课理由
      {
        value: '转介绍',
        label: '转介绍'
      }
    ],
    schedulePoint: [ //上课时间
      {
        value: '15:00-15:25',
        label: '15:00-15:25',
        labelSA: '9:00-9:25'
      },
      {
        value: '15:30-15:55',
        label: '15:30-15:55',
        labelSA: '9:30-9:55'
      },
      {
        value: '16:00-16:25',
        label: '16:00-16:25',
        labelSA: '10:00-10:25'
      },
      {
        value: '16:30-16:55',
        label: '16:30-16:55',
        labelSA: '10:30-10:55'
      },
      {
        value: '17:00-17:25',
        label: '17:00-17:25',
        labelSA: '11:00-11:25'
      },
      {
        value: '17:30-17:55',
        label: '17:30-17:55',
        labelSA: '11:30-11:55'
      },
      {
        value: '18:00-18:25',
        label: '18:00-18:25',
        labelSA: '12:00-12:25'
      },
      {
        value: '18:30-18:55',
        label: '18:30-18:55',
        labelSA: '12:30-12:55'
      },
      {
        value: '19:00-19:25',
        label: '19:00-19:25',
        labelSA: '13:00-13:25'
      }, {
        value: '19:30-19:55',
        label: '19:30-19:55',
        labelSA: '13:30-13:55'
      }, {
        value: '20:00-20:25',
        label: '20:00-20:25',
        labelSA: '14:00-14:25'
      }, {
        value: '20:30-20:55',
        label: '20:30-20:55',
        labelSA: '14:30-14:55'
      }, {
        value: '21:00-21:25',
        label: '21:00-21:25',
        labelSA: '15:00-15:25'
      }
    ],
    NEW_BILLS: {
      type: 0,
      name: '新例子',
      stage: [{
        value: '0',
        label: '无人接听'
      }, {
        value: '1',
        label: '稍后联系'
      }, {
        value: '2',
        label: '有意向'
      }, {
        value: '3',
        label: '关机&停机'
      }],
      status: [{
        value: '0',
        label: '重点跟进'
      }, {
        value: '1',
        label: '一般跟进'
      }, {
        value: '2',
        label: '无意向'
      }]
    }, //新例子

    OLD_BILLS: { //旧例子
      type: 1,
      name: '旧例子',
      stage: [{
        value: '0',
        label: '无人接听'
      }, {
        value: '1',
        label: '稍后联系'
      }, {
        value: '2',
        label: '有意向'
      }, {
        value: '3',
        label: '关机&停机'
      }],
      status: [{
        value: '0',
        label: '重点跟进'
      }, {
        value: '1',
        label: '一般跟进'
      }, {
        value: '2',
        label: '无意向'
      }]
    },
    DUMPING_BILLS: { //报废例子
      type: 2,
      name: '报废例子',
      stage: [{
        value: '4',
        label: '直接拒绝'
      }, {
        value: '5',
        label: '明确拒绝'
      }, {
        value: '6',
        label: '八次未接'
      }, {
        value: '3',
        label: '停机'
      }, {
        value: '7',
        label: '空号&错号'
      }, {
        value: '8',
        label: '没有符合年龄的孩子'
      }, {
        value: '9',
        label: '有拯救意向'
      }],
      status: [{
        value: '0',
        label: '重点跟进'
      }, {
        value: '1',
        label: '一般跟进'
      }, {
        value: '2',
        label: '无意向'
      }]
    },
    PAY_BILLS: { //付费例子
      type: 3,
      name: '付费例子',
      stage: [{
        value: '10',
        label: '周课'
      }, {
        value: '11',
        label: '月课'
      }, {
        value: '12',
        label: '学期'
      }, {
        value: '13',
        label: '年课'
      }],
      status: [{
        value: '3',
        label: '重点跟进续费'
      }, {
        value: '4',
        label: '一般意向续费'
      }, {
        value: '5',
        label: '无意向续费'
      }]
    },
    NO_RENEWS_BILLS: { //不续费例子
      type: 4,
      name: '不续费例子',
      stage: [{
        value: '10',
        label: '周课'
      }, {
        value: '11',
        label: '月课'
      }, {
        value: '12',
        label: '学期'
      }, {
        value: '13',
        label: '年课'
      }],
      status: [{
        value: '3',
        label: '重点跟进续费'
      }, {
        value: '4',
        label: '一般意向续费'
      }, {
        value: '5',
        label: '无意向续费'
      }]
    }
  },
  getters: {
    NEW_BILLS_STAGE: state => state.OLD_BILLS.stage,
    NEW_BILLS_STATUS: state => state.OLD_BILLS.status,
    OLD_BILLS_STAGE: state => state.OLD_BILLS.stage,
    OLD_BILLS_STATUS: state => state.OLD_BILLS.status,
    DUMPING_BILLS_STAGE: state => state.DUMPING_BILLS.stage,
    DUMPING_BILLS_STATUS: state => state.DUMPING_BILLS.status,
    PAY_BILLS_STAGE: state => state.PAY_BILLS.stage,
    PAY_BILLS_STATUS: state => state.PAY_BILLS.status,
    NO_RENEWS_BILLS_STAGE: state => state.NO_RENEWS_BILLS.stage,
    NO_RENEWS_BILLS_STATUS: state => state.NO_RENEWS_BILLS.status,
    courseName: state => state.courseName,
    grade: state => state.grade,
    depthTree: state => state.depthTree,
    schedulePoint: state => state.schedulePoint,
    present: state => state.present,
    detailPhone: state => state.detailPhone,
    detailType: state => state.detailType,
    detailInfo: state => state.detailInfo,
    ruserInfo: state => state.ruserInfo,
    qaType: state => state.qaType,
    qaFlag: state => state.qaFlag,
    readStat: state => state.readStat,
    swiperItem: state => state.swiperItem
  },
  mutations: {
    SET_TEACHERUSERID: (state, teacherUserId) => {
      state.teacherUserId = teacherUserId
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_REFRESH_TOKEN: (state, rfToken) => {
      state.refresh_token = rfToken
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_QATYPE: (state, qaType) => {
      state.qaType = qaType
    },
    SET_READSTAT: (state, readStat) => {
      state.readStat = readStat
    },
    SET_QAFLAG: (state, qaFlag) => {
      state.qaFlag = qaFlag
    },
    SET_SWIPERITEM: (state, swiperItem) => {
      state.swiperItem = swiperItem
    },
    /*SET_ID: (state, userId) => {
     state.userId = userId
     },*/
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_DEPTH_TREE: (state, depthTree) => {
      state.depthTree = depthTree
    },
    //详情手机号
    SET_DETAIL_PHONE: (state, phone) => {
      state.detailPhone = phone
    },
    //详情type
    SET_DETAIL_TYPE: (state, type) => {
      state.detailType = type
    },
    SET_DETAIL_INFO: (state, info) => {
      state.detailInfo = info
    },
    SET_DETAIL_RUSERINFO: (state, info) => {
      state.ruserInfo = info
    },
  },

  actions: {
    SETSWIPERITEM: ({commit}, payload) => {
      commit('SET_SWIPERITEM', payload)
    }
  }
}

export default detail
