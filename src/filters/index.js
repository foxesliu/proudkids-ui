function pluralize(time, label) {
    if (time === 1) {
        return time + label
    }
    return time + label + 's'
}

export function timeAgo(time) {
    const between = Date.now() / 1000 - Number(time)
    if (between < 3600) {
        return pluralize(~~(between / 60), ' minute')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' hour')
    } else {
        return pluralize(~~(between / 86400), ' day')
    }
}

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }

    if ((time + '').length === 10) {
        time = +time * 1000
    }

    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        date = new Date(parseInt(time))
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
}

export function formatTime(time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) { // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
}

/* 数字 格式化*/
export function nFormatter(num, digits) {
    const si = [
        { value: 1E18, symbol: 'E' },
        { value: 1E15, symbol: 'P' },
        { value: 1E12, symbol: 'T' },
        { value: 1E9, symbol: 'G' },
        { value: 1E6, symbol: 'M' },
        { value: 1E3, symbol: 'k' }
    ]
    for (let i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
        }
    }
    return num.toString()
}

export function html2Text(val) {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
}

export function toThousandslsFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

//部门大区小组字符截取
export function areaGroupIntercept(val, num) {
    let arr = val.split("-");
    if (arr.length == 2) {
        arr.splice(1, 0, '-')
        arr.splice(2, 0, '-')
    } else if (arr.length == 3) {
        arr.splice(2, 0, '-')
    }
    return arr[num]
}

//每周上课时间数据处理
export function weekClassArray(val) {
    if (val) {
        return eval('(' + val + ')').desc.replace('-', '\<br\>')
    } else {
        return null
    }

}

//数据类型过滤转中文
export function dataTypeFilter(val) {
    let dataType = ''
    if (parseInt(val) == 0) {
        dataType = '新例子'
    } else if (parseInt(val) == 1) {
        dataType = '旧例子'
    } else if (parseInt(val) == 2) {
        dataType = '报废例子'
    } else if (parseInt(val) == 3) {
        dataType = '付费排课学生'
    } else if (parseInt(val) == 4) {
        dataType = '不续费学生'
    } else if (parseInt(val) == 5) {
        dataType = '提醒联系的例子'
    }
    return dataType
}

//老/报废/付费/不续费例子级别状态过滤中文
export function oldExamFilter(val, obj, type, flag) {
    /*console.log(obj)
    console.log(type)
    console.log(flag)*/
    let strs = ''
    if (flag == 0) {
        //级别
        if (type == 1) {
            //老用户
            if (obj.acStage == 0 || obj.currentStage == 0) {
                strs = '无人接听'
            } else if (obj.acStage == 1 || obj.currentStage == 1) {
                strs = '稍后联系'
            } else if (obj.acStage == 2 || obj.currentStage == 1) {
                strs = '有意向'
            } else {
                strs = '关机&停机'
            }
        } else if (type == 2) {
            //报废例子
            if (obj.acStage == 3 || obj.currentStage == 3) {
                strs = '停机'
            } else if (obj.acStage == 4 || obj.currentStage == 4) {
                strs = '直接拒绝'
            } else if (obj.acStage == 5 || obj.currentStage == 5) {
                strs = '明确拒绝'
            } else if (obj.acStage == 6 || obj.currentStage == 6) {
                strs = '八次未接'
            } else if (obj.acStage == 7 || obj.currentStage == 7) {
                strs = '空号&错号'
            } else if (obj.acStage == 8 || obj.currentStage == 8) {
                strs = '无适龄孩子'
            } else if (obj.acStage == 9 || obj.currentStage == 9) {
                strs = '有拯救意向'
            } else {

            }
        } else if (type == 3) {
            //付费例子
            if (obj.acStage == 10 || obj.currentStage == 10) {
                strs = '周课'
            } else if (obj.acStage == 11 || obj.currentStage == 11) {
                strs = '月课'
            } else if (obj.acStage == 12 || obj.currentStage == 12) {
                strs = '学期'
            } else {
                strs = '年费'
            }
        } else if (type == 4) {
            //不续费例子
            if (obj.acStage == 10 || obj.currentStage == 10) {
                strs = '月课'
            } else if (obj.acStage == 11 || obj.currentStage == 11) {
                strs = '周课'
            } else if (obj.acStage == 12 || obj.currentStage == 12) {
                strs = '学期'
            } else {
                strs = '年课'
            }
        } else {
            return
        }
    } else {
        //状态
        if (type == 1) {
            //老用户
            if (obj.acStat == 0 || obj.currentStatus == 0) {
                strs = '重点跟进'
            } else if (obj.acStat == 1 || obj.currentStatus == 1) {
                strs = '一般跟进'
            } else {
                strs = '无意向'
            }
        } else if (type == 2) {
            //报废例子
            if (obj.acStat == 0 || obj.currentStatus == 0) {
                strs = '重点跟进'
            } else if (obj.acStat == 1 || obj.currentStatus == 1) {
                strs = '一般跟进'
            } else {
                strs = '无意向'
            }
        } else if (type == 3) {
            //付费例子
            if (obj.acStat == 3 || obj.currentStatus == 3) {
                strs = '重点跟进续费'
            } else if (obj.acStat == 4 || obj.currentStatus == 4) {
                strs = '一般意向续费'
            } else {
                strs = '无意向续费'
            }
        } else if (type == 4) {
            //不续费例子
            if (obj.acStat == 3 || obj.currentStatus == 3) {
                strs = '重点跟进续费'
            } else if (obj.acStat == 4 || obj.currentStatus == 4) {
                strs = '一般意向续费'
            } else {
                strs = '无意向续费'
            }
        } else {
            //其他例子
        }
    }
    return strs
}

//报名课程类型转中文过滤
export function courseTypeFilter(val) {
    let courseType
    if (val == 1) {
        courseType = '长期'
    } else {
        courseType = '短期'
    }
    return courseType
}