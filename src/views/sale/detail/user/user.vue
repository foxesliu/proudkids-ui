<template>
  <div class="p-20">
    <!--头部区域-->
    <div class="user-top-cin mb-20" v-if="sale_userDo_button">
      <div class="width100">
        <div class="pull-right">
          <el-button @click="edit_act" type="success" v-if="sale_act_button"
            >{{ $t("i18nView.user.actBtn") }}
          </el-button>
          <el-select
            v-model="value"
            :placeholder="$t('i18nView.user.more')"
            class="ml18"
            @change="getMore"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>

    <div class="user-linn mb-20">
      <table>
        <thead>
          <tr>
            <td>分配CC</td>
            <td>注册手机</td>
            <td>中文名字</td>
            <td>英文名字</td>
            <td>分配时间</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="tableData.length > 0">
            <td class="c-pointer" :title="tableData[0].delievedCC">
              <el-button size="mini">{{
                tableData[0].delievedCC | nameFilter
              }}</el-button>
            </td>
            <td>{{ tableData[0].phone }}</td>
            <td>{{ tableData[0].name }}</td>
            <td>{{ tableData[0].enName || "------" }}</td>
            <td>{{ tableData[0].createTime }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="user-linn mb-20">
      <table>
        <thead>
          <tr>
            <td>例子类型</td>
            <td>等级</td>
            <td>学号</td>
            <td>首次注册渠道</td>
            <td>注册时间</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="tableData.length > 0">
            <td>{{ tableData[0].billType }}</td>
            <td>{{ tableData[0].grade }}</td>
            <td>{{ tableData[0].ruserNo }}</td>
            <td>{{ tableData[0].originChannel }}</td>
            <td>{{ tableData[0].delievedTime }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="user-linn mb-20">
      <table>
        <thead>
          <tr>
            <td>是否停课</td>
            <td>行动阶段</td>
            <td>行动状态</td>
            <td>行动次数</td>
            <td>最后联系时间</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="tableData.length > 0">
            <td>{{ tableData[0].stop }}</td>
            <td>
              <span v-if="tableData[0].stage">{{
                tableData[0].stage | stageFilter
              }}</span>
              <span v-else-if="!tableData[0].stage">{{ "-" }}</span>
            </td>
            <!--<td>{{tableData[0].stage||'-'}}</td>-->
            <!--<td>{{tableData[0].status||'-'}}</td>-->
            <td>
              <span v-if="tableData[0].status">{{
                tableData[0].status | statusFilter
              }}</span>
              <span v-else-if="!tableData[0].status">{{ "-" }}</span>
            </td>
            <td>{{ tableData[0].actionCount }}</td>
            <td>{{ tableData[0].lastLinkDate || "-" }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="user-linn mb-20">
      <table>
        <thead>
          <tr>
            <td>当前&呆过的班级</td>
            <td>行动日志</td>
            <td>流转日志</td>
            <td>工单日志</td>
            <td>体验课</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="tableData.length > 0">
            <td>
              <router-link
                :to="{
                  path: '/detail/classing',
                  query: { phone: ruserInfo.phone }
                }"
              >
                <el-button size="mini" type="success">{{
                  $t("i18nView.user.look")
                }}</el-button>
              </router-link>
            </td>
            <td>
              <router-link
                :to="{
                  path: '/detail/actLog',
                  query: { phone: ruserInfo.phone, type: exampleType }
                }"
              >
                <el-button size="mini" type="success">{{
                  $t("i18nView.user.look")
                }}</el-button>
              </router-link>
            </td>
            <td>
              <router-link
                :to="{
                  path: '/detail/flowLog',
                  query: { phone: ruserInfo.phone }
                }"
              >
                <el-button size="mini" type="success">{{
                  $t("i18nView.user.look")
                }}</el-button>
              </router-link>
            </td>
            <td>
              <router-link
                :to="{
                  path: '/detail/ordersLog',
                  query: { phone: ruserInfo.phone }
                }"
              >
                <el-button size="mini" type="success">{{
                  $t("i18nView.user.look")
                }}</el-button>
              </router-link>
            </td>
            <td>
              <router-link
                :to="{
                  path: '/sale/experienceList',
                  query: { experienceList: true, phone: ruserInfo.phone }
                }"
                v-if="experienceBtn"
              >
                <el-button size="mini" type="success">{{
                  $t("i18nView.user.look")
                }}</el-button>
              </router-link>
              <span v-else>
                {{ "-" }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="user-linn mb-20">
      <table>
        <thead>
          <tr>
            <td>我邀请的人</td>
            <td>参与渠道</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <router-link
                :to="{ path: '/detail/invited', query: { ruserId: ruserId } }"
              >
                <el-button size="mini" type="success">{{
                  $t("i18nView.user.look")
                }}</el-button>
              </router-link>
            </td>
            <td>
              <router-link
                :to="{ path: '/detail/channel', query: { ruserId: ruserId } }"
              >
                <el-button size="mini" type="success">{{
                  $t("i18nView.user.look")
                }}</el-button>
              </router-link>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<!--登录用户 cttl001-->
<!--http://localhost:9527/#/detail/user?phone=18612831114-->
<script type="text/ecmascript-6">
import local from "@/views/i18n-demo/local";

const viewName = "i18nView";

import Title from "@/views/sale/detail/components/title";
import { mapGetters } from "vuex";
import {
  ruserDetail,
  ruserClassInfoList,
  getChannelsByRuserid,
  getInviteByRuserid
} from "@/api/detail"; // 編輯學生
export default {
  components: {
    "app-title": Title
  },
  data() {
    return {
      classListDataing: [], //进行中的班级
      itermType: null,
      listLoading: true,
      ruserInfo: { phone: "" },
      ruserId: "",
      sale_userDo_button: false, //操作详情按钮
      sale_act_button: false, //行动按钮
      experienceBtn: false,
      tableData: [],
      userData: "",
      options: [
        { value: "edit", label: "编辑资料" },
        { value: "payCourse", label: "购课" },
        { value: "addExperience", label: "选择体验课" }
      ],
      value: "",
      channels: [],
      invites: []
    };
  },

  created() {
    if (!this.$i18n.getLocaleMessage("en")[viewName]) {
      this.$i18n.mergeLocaleMessage("en", local.en);
      this.$i18n.mergeLocaleMessage("zh", local.zh);
    }
    let [roleId] = this.roleIds;
    if (roleId == 23 || roleId == 24 || roleId == 25 || roleId == 32) {
      this.$i18n.locale = "en";
      this.$store.dispatch("setLanguage", "en");
    } else {
      this.$i18n.locale = "zh";
      this.$store.dispatch("setLanguage", "zh");
    }

    if (
      roleId == 17 ||
      roleId == 18 ||
      roleId == 19 ||
      roleId == 30 ||
      roleId == 27
    ) {
      //是否显示体验课按钮
      this.experienceBtn = true;
    }
    let { sale_userDo_button, sale_act_button } = this.permissions;
    this.sale_userDo_button = sale_userDo_button;
    this.sale_act_button = sale_act_button;

    //初始化获取的参数
    this.ruserInfo.phone =
      this.$route.query.phone ||
      this.detailPhone ||
      sessionStorage.getItem("detailPhone");
    // this.exampleType =
    //   this.$route.query.type || sessionStorage.getItem("exampleType");
    this.$store.commit("SET_DETAIL_PHONE", this.ruserInfo.phone); //存储手机号
    this.$store.commit("SET_DETAIL_TYPE", this.exampleType); //例子类型type
    sessionStorage.setItem("detailPhone", this.ruserInfo.phone); //存储获取的手机
    this.getList();
  },

  computed: {
    ...mapGetters(["detailPhone", "detailType", "roleIds", "permissions"])
  },
  methods: {
    //获取更多
    getMore(e) {
      this.$router.push({
        path: e,
        query: { phone: this.$route.query.phone, type: this.$route.query.type }
      });
    },

    async getList() {
      //获取学生详情
      const result = await ruserDetail(this.ruserInfo);
      //学生详情
      const { billType, ruserId } = result.data.data;
      const config = {
        新例子: 0,
        旧例子: 1,
        报废例子: 2,
        付费排课例子: 3,
        不续费例子: 4
      };
      this.exampleType = config[billType];
      sessionStorage.setItem("exampleType", this.exampleType);
      this.ruserId = ruserId;
      this.listLoading = false;
      this.tableData = [result.data.data];
      this.$store.commit("SET_DETAIL_INFO", this.tableData);
      sessionStorage.setItem("detailParams", JSON.stringify(this.tableData)); //存储详细信息
      //获取班级信息
      const result1 = await ruserClassInfoList(this.ruserInfo.phone, 0);
      //学生当前班级
      this.classListDataing = result1.data.data;
      this.itermType = this.classListDataing.some(item => {
        return item.itermType == 1;
      });

      if (this.classListDataing.length) {
        this.options.push({ value: "refundCourse", label: "退课" });
        if (this.itermType) {
          //长期课
          if (this.roleIds[0] == 20) {
            //中教组员
            this.options = [
              { value: "edit", label: "编辑资料" },
              { value: "payCourse", label: "购课" },
              { value: "continuedCourse", label: "续课" },
              { value: "presentCourse", label: "赠课" },
              { value: "refundCourse", label: "退课" },
              { value: "suspendClass", label: "停课" },
              { value: "joinchannel", label: "参与渠道" }
            ];
            if (this.userData.stop == "是") {
              this.options.splice(1, 1);
            }
          } else if (this.roleIds[0] == 23) {
            //外教组员
            this.options = [
              { value: "edit", label: "edit" },
              { value: "payCourse", label: "payCourse" },
              { value: "continuedCourse", label: "continuedCourse" },
              {
                value: "presentCourse",
                label: "presentCourse"
              },
              { value: "refundCourse", label: "refundCourse" },
              { value: "suspendClass", label: "suspendClass" },
              { value: "joinchannel", label: "joinchannel" }
            ];
            if (this.userData.stop == "是") {
              this.options.splice(1, 1);
            }
          } else if (
            this.roleIds[0] == 24 ||
            this.roleIds[0] == 25 ||
            this.roleIds[0] == 32
          ) {
            //外教
            this.options = [
              { value: "edit", label: "edit" },
              { value: "payCourse", label: "payCourse" },
              { value: "continuedCourse", label: "continuedCourse" },
              {
                value: "presentCourse",
                label: "presentCourse"
              },
              { value: "refundCourse", label: "refundCourse" },
              { value: "joinchannel", label: "joinchannel" }
            ];
            if (this.this.userData.stop == "是") {
              this.options.splice(1, 1);
            }
          } else {
            this.options = [
              { value: "edit", label: "编辑资料" },
              { value: "payCourse", label: "购课" },
              { value: "continuedCourse", label: "续课" },
              { value: "presentCourse", label: "赠课" },
              { value: "refundCourse", label: "退课" },
              { value: "joinchannel", label: "参与渠道" }
            ];
            if (this.userData.stop == "是") {
              this.options.splice(1, 1);
            }
          }
        }
      }
    },
    edit_act() {
      this.$router.push({
        path: "/detail/act",
        query: { phone: this.$route.query.phone, type: this.$route.query.type }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss">
@import "../../../aom/index.scss";

.user-top-cin {
  height: 60px;
  background: #f9fafc;
  width: 100%;
  border: 1px solid #e1e3e9;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding-right: 20px;
  margin-left: auto;
}

.user-linn {
  table {
    border-left: 1px solid #e1e3e9;
    border-top: 1px solid #e1e3e9;
    margin: 0;
    padding: 0;
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;

    tr {
      width: 100%;
    }

    td {
      border-right: 1px solid #e1e3e9;
      border-bottom: 1px solid #e1e3e9;
      width: 20%;
      height: 50px;
      text-align: center;
    }

    thead {
      td {
        background: #f9fafc;
      }
    }
  }
}
</style>
