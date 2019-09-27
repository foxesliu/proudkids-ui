/**
 * Created by zhangsanfeng on 2018/03/19.
 */

export function test() {
  console.log('test');
}

export const sfTools = {
  getDateFromTimestamp: function (timestamp) {
    var date = new Date(timestamp);
    var y = date.getFullYear();
    var m = this.ddigit(date.getMonth() + 1);
    var d = this.ddigit(date.getDate());
    return y + '-' + m + '-' + d;
  },

  ddigit: function (a) {
    return a < 10 ? '0' + a : a;
  },

  replaceWeek: function (a) {
    switch (a) {
      case '1':
        return '周一';
        break;
      case '2':
        return '周二';
        break;
      case '3':
        return '周三';
        break;
      case '4':
        return '周四';
        break;
      case '5':
        return '周五';
        break;
      case '6':
        return '周六';
        break;
      case '7':
        return '周日';
        break;
    }
  },
  replaceWeekEn: function (a) {
    switch (a) {
      case '1':
        return 'Monday';
        break;
      case '2':
        return 'Tuesday';
        break;
      case '3':
        return 'Wednesday';
        break;
      case '4':
        return 'Thursday';
        break;
      case '5':
        return 'Friday';
        break;
      case '6':
        return 'Saturday';
        break;
      case '7':
        return 'Sunday';
        break;
    }
  },
  replaceTeacherType: function (a) {
    return a === 1 ? '外教' : '中教';
  },
  classTimesToSouthAfrica: function (a) {
    var array = [];
    array.push(a)
    for (let i = 0; i < sfData.classTimesEven.length; i++) {
      array.push(array[array.length - 1].replace(new RegExp(sfData.classTimesEven[i], 'img'), sfData.southAfricaClassTimesEven[i]))
    }
    return array[array.length - 1];
  },
  singleClassTimesToSouthAfrica: function (a) {
    var array = [];
    array.push(a)
    for (let i = 0; i < sfData.classTimesSingle.length; i++) {
      array.push(array[array.length - 1].replace(new RegExp(sfData.classTimesSingle[i], 'img'), sfData.southAfricaClassTimesSingle[i]))
    }
    return array[array.length - 1];
  },
  arrayRemoveValue: function (arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        arr.splice(i, 1);
        break;
      }
    }
  },
  setCookie: function (name, value, iDay, iPath) {
    var oDate = new Date();
    iDay = arguments[2] ? arguments[2] : 7;
    iPath = arguments[3] ? arguments[3] : "/";
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + "=" + encodeURI(value) + ";expires=" + oDate + ";path=" + iPath;
  },

  /**
   * 获取cookie
   * @param name
   * @returns {string}
   */
  getCookie: function (name) {
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split("=");
      if (arr2[0] == name) {
        return decodeURI(arr2[1]);
      }
    }
    return "";
  },
};

export const sfData = {
  classTimes: ['15:00-15:25', '15:30-15:55', '16:00-16:25', '16:30-16:55', '17:00-17:25', '17:30-17:55', '18:00-18:25', '18:30-18:55', '19:00-19:25', '19:30-19:55', '20:00-20:25', '20:30-20:55', '21:00-21:25'],
  classTimesEven: ['18:00-18:25', '18:30-18:55', '19:00-19:25', '19:30-19:55', '20:00-20:25', '20:30-20:55', '21:00-21:25', ' 18:00~ 18:25', ' 18:30~ 18:55', ' 19:00~ 19:25', ' 19:30~ 19:55', ' 20:00~ 20:25', ' 20:30~ 20:55', ' 21:00~ 21:25'],
  southAfricaClassTimesEven: ['12:00-12:25', '12:30-12:55', '13:00-13:25', '13:30-13:55', '14:00-14:25', '14:30-14:55', '15:00-15:25', ' 12:00~ 12:25', ' 12:30~ 12:55', ' 13:00~ 13:25', ' 13:30~ 13:55', ' 14:00~ 14:25', ' 14:30~ 14:55', ' 15:00~ 15:25'],
  classTimesSingle: ['18:00', '18:25', '18:30', '18:55', '19:00', '19:25', '19:30', '19:55', '20:00', '20:25', '20:30', '20:55', '21:00', '21:25'],
  southAfricaClassTimesSingle: ['12:00', '12:25', '12:30', '12:55', '13:00', '13:25', '13:30', '13:55', '14:00', '14:25', '14:30', '14:55', '15:00', '15:25'],
  gradeList: [
    {id: 0, str: '0'},
    {id: 1, str: '1'},
    {id: 2, str: '2'},
    {id: 3, str: '3'},
    {id: 4, str: '4'},
    {id: 5, str: '5'},
    {id: 6, str: '6'}
  ],
  classTypeArray: [{id: 1, str: '长期'}, {id: 2, str: '短期'}, {id: 3, str: '体验课'}, {id: 4, str: '线下课'}],
  // classTypeArray: [{id: 1, str: '长期'}, {id: 2, str: '短期'}],
};



