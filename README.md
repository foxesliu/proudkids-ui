proudkids-ui
管理系统1.1.2开始开发  张三丰 2018-11-23   此注释保留，直至1.1.2版正式线
/**                            _ooOoo_
 *                            o8888888o
 *                            88" . "88
 *                            (| -_- |)
 *                            O\  =  /O
 *                         ____/`---'\____
 *                       .'  \\|     |//  `.
 *                      /  \\|||  :  |||//  \
 *                     /  _||||| -:- |||||-  \
 *                     |   | \\\  -  /// |   |
 *                     | \_|  ''\---/''  |   |
 *                     \  .-\__  `-`  ___/-. /
 *                   ___`. .'  /--.--\  `. . __
 *                ."" '<  `.___\_<|>_/___.'  >'"".
 *               | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *               \  \ `-.   \_ __\ /__ _/   .-` /  /
 *          ======`-.____`-.___\_____/___.-`____.-'======
 *                             `=---='
 *          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                     佛祖保佑        永无BUG
 *      写字楼里写字间，写字间里程序员；程序人员写程序，又拿程序换酒钱。
 *      酒醒只在网上坐，酒醉还来网下眠；酒醉酒醒日复日，网上网下年复年。
 *      但愿老死电脑间，不愿鞠躬老板前；奔驰宝马贵者趣，公交自行程序员。
 *      别人笑我忒疯癫，我笑自己命太贱；不见满街漂亮妹，哪个归得程序员？
*/

不区分角色，按模块如下：
1、班级上课情况（老张）
2、学生上课情况（老张）
3、进行中班级（老张）
4、查看课件（文文）
5、替课名单（文文）
6、补课名单（文文）
7、单个可用时间、可用时间（文文）
8、班级情况（老张）
9、今天要上的课（文文）
10、个人详情页（老张）
11、某个课程-课程包管理（文文）

不区分角色，按模块如下（后台）：
1、班级上课情况（柱子）
2、学生上课情况（柱子）
3、进行中班级（柱子）
4、查看课件（柱子）
5、替课名单（柱子）
6、补课名单（柱子）
7、单个可用时间、可用时间（勇）
8、班级情况（柱子）
9、今天要上的课（柱子）
10、个人详情页（勇）
11、某个课程-课程包管理（柱子）


翻译使用方法
import local from '@/views/i18n-demo/local'
const viewName = 'i18nView'
import {mapGetters} from 'vuex'
created生命周期
if (!this.$i18n.getLocaleMessage('en')[viewName]) {
  this.$i18n.mergeLocaleMessage('en', local.en)
  this.$i18n.mergeLocaleMessage('zh', local.zh)
}
let [roleId] = this.roleIds;
if (roleId == 23 || roleId == 24 || roleId == 25 || roleId == 32) {
  this.$i18n.locale = 'en'
  this.$store.dispatch('setLanguage', 'en')
} else {
  this.$i18n.locale = 'zh'
  this.$store.dispatch('setLanguage', 'zh')
}

computed: {
  ...mapGetters(['detailPhone', 'detailType', 'roleIds', 'permissions'])
},


<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
<script type="text/ecmascript-6">


超级管理员 zhang
教务部门 aom-dev mazhihua zhangsf-aom
中教总经理 中教总经理
中教组长 zhongjiaotl01
中教组员 Lexie Guo
外教总经理 外教总经理
外教大区经理 Brad
外教组长 ftteamleader
外教 tutor-dev
销售 liuxiaojing
