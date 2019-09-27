import Vue from 'vue'

/**
 * 时间格式化
 */
Vue.filter('monent', function(value) {
    return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ").replace(/上午/g, '');
})
Vue.filter('stageFilter', function(value) {
    return value.replace(/10/g, "周课").replace(/11/g, '月课').replace(/12/g, "学期").replace(/13/g, '年课').replace(/0/g, "无人接听").replace(/1/g, "稍后联系").replace(/2/g, '有意向').replace(/3/g, "关机&停机").replace(/4/g, "直接拒绝").replace(/5/g, '明确拒绝').replace(/6/g, "八次未接").replace(/7/g, '空号&错号').replace(/8/g, "没有符合年龄的孩子").replace(/9/g, '有拯救意向');
})
Vue.filter('statusFilter', function(value) {
    return value.replace(/0/g, "重点跟进").replace(/1/g, "一般跟进").replace(/2/g, '无意向').replace(/3/g, "重点跟进续费").replace(/4/g, "一般意向续费").replace(/5/g, '无意向续费');
})

Vue.filter('nameFilter', function(val) {
    if (val.indexOf('(') != -1) {
        let num1 = val.indexOf('(')
        let num2 = val.indexOf(')')
        return val.substring(num1 + 1, num2)
    } else {
        return '机器分配'
    }
})

//数据类型过滤转中文
export function exampleFilter(val) {
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

/**
 * 参数 item
 * required true  必填项
 * maxLength  字符串的最大长度
 * min 和 max 必须同时给 min < max  type=number
 * type 手机号 mobile
 *      邮箱   email
 *      网址   url
 *      各种自定义类型   定义在 src/utils/validate 中    持续添加中.......
 * */

Vue.prototype.filter_rules = function(item) {
    let rules = [];
    if (item.required) {
        rules.push({ required: true, message: '该输入项为必填项!', trigger: 'blur' });
    }
    if (item.maxLength) {
        rules.push({ min: 1, max: item.maxLength, message: '最多输入' + item.maxLength + '个字符!', trigger: 'blur' })
    }
    if (item.min && item.max) {
        rules.push({ min: item.min, max: item.max, message: '字符长度在' + item.min + '至' + item.max + '之间!', trigger: 'blur' })
    }
    if (item.type) {
        let type = item.type;
        switch (type) {
            case 'email':
                rules.push({ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' });
                break;
            case 'qq':
                rules.push({ validator: isvalidateQQ, trigger: 'blur,change' });
                break;
            case 'mobile':
                rules.push({ validator: isvalidateMobile, trigger: 'blur,change' });
                break;
            case 'regexn':
                rules.push({ validator: isvalidateRegexn, trigger: 'blur,change' });
                break;
            case 'integer':
                rules.push({ validator: isvalidateInteger, trigger: 'blur,change' });
                break;
            default:
                rule.push({});
                break;
        }
    }
    return rules;
};