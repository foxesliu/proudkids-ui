<template>
  <div class="user">
    <!--头部区域-->
    <div class="header mb18 pr20" v-if="sale_userDo_button">
      <el-button @click="edit_act" type="success" v-if="sale_act_button">{{$t('i18nView.user.actBtn')}}
      </el-button>
      <el-select v-model="value"
                 :placeholder="$t('i18nView.user.more')"
                 class="ml18" @change="getMore">
        <el-option v-for="item in options" :key="item.value"
                   :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!--table内容区域-->
    <div class="container">
      <el-table :key='tableKey' :data="tableData"
                v-loading="listLoading" element-loading-text="正在加载中"
                border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" :label="$t('i18nView.user.table.delievedCC')">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <span>{{scope.row.delievedCC }}</span>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">
                  {{scope.row.delievedCC | nameFilter}}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.user.table.delievedTime')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.delievedTime}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.user.table.phone')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.phone}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.user.table.chName')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('i18nView.user.table.enName')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.enName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('i18nView.user.table.grade')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.grade}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.user.table.createTime')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.createTime }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.user.table.originChannel')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.originChannel || '/'}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.user.table.ruserNo')" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.ruserNo || '/'}}
          </template>
        </el-table-column>
      </el-table>


      <el-table :key='tableKey' :data="tableData"
                element-loading-text="正在加载中" border fit style="width: 100%">
        <el-table-column align="center" :label="$t('i18nView.user.table.billType')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.billType || '/'}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.user.table.isStop')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.stop || '/'}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.user.table.stage')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.stage">{{scope.row.stage | stageFilter}}</span>
            <span v-else-if="!scope.row.stage">{{'/'}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.user.table.status')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.status">{{scope.row.status | statusFilter}}</span>
            <span v-else-if="!scope.row.status">{{'/'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('i18nView.user.table.lastLinkDate')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.lastLinkDate">{{scope.row.lastLinkDate}}</span>
            <span v-else>/</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('i18nView.user.table.actionCount')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.actionCount || '/'}}</span>
          </template>
        </el-table-column>

        <!--体验课-->
        <!--<el-table-column align="center" label="体验课时间" show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
        <!--<span>-->
        <!--{{scope.row.phone || '/'}}-->
        <!--</span>-->
        <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column align="center" label="安排体验课次数" show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
        <!--<span>-->
        <!--{{scope.row.phone || '/'}}-->
        <!--</span>-->
        <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column align="center" label="出席体验次数" show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
        <!--<span>-->
        <!--{{scope.row.phone || '/'}}-->
        <!--</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
      </el-table>

      <!--卡片-->
      <div class="block mt18">
        <span>{{$t('i18nView.user.classing_stayedClass')}}</span>
        <router-link :to="{path:'/detail/classing',query: {phone: ruserInfo.phone}}">
          <el-button>{{$t('i18nView.user.look')}}</el-button>
        </router-link>
      </div>

      <div class="block mt18">
        <span>{{$t('i18nView.user.actLog')}}</span>
        <router-link :to="{path:'/detail/actLog',query: {phone: ruserInfo.phone,type:exampleType}}">
          <el-button>{{$t('i18nView.user.look')}}</el-button>
        </router-link>
      </div>

      <div class="block mt18">
        <span>{{$t('i18nView.user.flowLog')}}</span>
        <router-link :to="{path:'/detail/flowLog',query: {phone: ruserInfo.phone}}">
          <el-button>{{$t('i18nView.user.look')}}</el-button>
        </router-link>
      </div>

      <div class="block mt18">
        <span>{{$t('i18nView.user.ordersLog')}}</span>
        <router-link :to="{path:'/detail/ordersLog',query: {phone: ruserInfo.phone}}">
          <el-button>{{$t('i18nView.user.look')}}</el-button>
        </router-link>
      </div>

      <!--<div class="block mt18">-->
      <!--<span>查看评价</span>-->
      <!--<router-link :to="{path:'/detail/evaluation',query: {phone: ruserInfo.phone}}">-->
      <!--<el-button>查看</el-button>-->
      <!--</router-link>-->
      <!--</div>-->
      <!--<block detailBlock="进行中&待过的班级" :toDetailList="listParams('/detail/classing',ruserInfo.phone)"></block>-->
    </div>
  </div>
</template>

<!--登录用户 cttl001-->
<!--http://localhost:9527/#/detail/user?phone=18612831114-->
<script type="text/ecmascript-6">
  import local from '@/views/i18n-demo/local'
  const viewName = 'i18nView'

  import Title from '@/views/sale/detail/components/title'
  import {mapGetters} from 'vuex'
  import {ruserDetail, ruserClassInfoList} from '@/api/detail' // 編輯學生
  export default {
    components: {
      'app-title': Title
    },
    data() {
      return {
        classListDataing: [],//进行中的班级
        itermType: null,
        listLoading: true,
        tableKey: 0,
        appTitle: '发生发空',
        ruserInfo: {phone: ''},
        sale_userDo_button: false,//操作详情按钮
        sale_act_button: false,//行动按钮
        tableData: [],
        userDate: '',
        options: [
          {value: 'edit', label: '编辑资料'},
          {value: 'payCourse', label: '购课'}
        ],
        value: ''
      }
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
      } else {
        this.$i18n.locale = 'zh'
        this.$store.dispatch('setLanguage', 'zh')
      }
      let {sale_userDo_button, sale_act_button} = this.permissions
      this.sale_userDo_button = sale_userDo_button
      this.sale_act_button = sale_act_button

      //初始化获取的参数
      this.ruserInfo.phone = this.$route.query.phone || this.detailPhone || sessionStorage.getItem('detailPhone');
      this.exampleType = this.$route.query.type || sessionStorage.getItem('exampleType');
      this.$store.commit('SET_DETAIL_PHONE', this.ruserInfo.phone)  //存储手机号
      this.$store.commit('SET_DETAIL_TYPE', this.exampleType)  //例子类型type
      sessionStorage.setItem('detailPhone', this.ruserInfo.phone)  //存储获取的手机
      this.getList();
    },

    computed: {
      ...mapGetters(['detailPhone', 'detailType', 'roleIds', 'permissions'])
    },
    methods: {
      isStop(){
        ruserClassInfoList(this.ruserInfo.phone, 0).then((res) => {//学生当前班级
          this.classListDataing = res.data.data
          console.log(res.data.data)
          this.itermType = this.classListDataing.some(item => {
            return item.itermType == 1
          })
          if (this.classListDataing.length) {
            this.options.push({value: 'refundCourse', label: '退课'})
            if (this.itermType) {//长期课
              if (this.roleIds[0] == 20) { //中教组员
                this.options = [{value: 'edit', label: '编辑资料'}, {value: 'payCourse', label: '购课',},
                  {value: 'continuedCourse', label: '续课'}, {value: 'presentCourse', label: '赠课'},
                  {value: 'refundCourse', label: '退课'}, {value: 'suspendClass', label: '停课'},
                  {value: 'joinchannel', label: '参与渠道'},]
                if (this.userDate.stop == '是') {
                  this.options.splice(1, 1);
                }
              } else if (this.roleIds[0] == 23) { //外教组员
                this.options = [{value: 'edit', label: 'edit'}, {value: 'payCourse', label: 'payCourse',},
                  {value: 'continuedCourse', label: 'continuedCourse'}, {
                    value: 'presentCourse',
                    label: 'presentCourse'
                  },
                  {value: 'refundCourse', label: 'refundCourse'}, {value: 'suspendClass', label: 'suspendClass'},
                  {value: 'joinchannel', label: 'joinchannel'},]
                if (this.userDate.stop == '是') {
                  this.options.splice(1, 1);
                }
              } else if (this.roleIds[0] == 24 || this.roleIds[0] == 25 || this.roleIds[0] == 32) { //外教
                this.options = [{value: 'edit', label: 'edit'}, {value: 'payCourse', label: 'payCourse',},
                  {value: 'continuedCourse', label: 'continuedCourse'}, {
                    value: 'presentCourse',
                    label: 'presentCourse'
                  },
                  {value: 'refundCourse', label: 'refundCourse'}, {value: 'joinchannel', label: 'joinchannel'}]
                if (this.this.userDate.stop == '是') {
                  this.options.splice(1, 1);
                }
              } else {
                this.options = [{value: 'edit', label: '编辑资料'}, {value: 'payCourse', label: '购课',},
                  {value: 'continuedCourse', label: '续课'}, {value: 'presentCourse', label: '赠课'},
                  {value: 'refundCourse', label: '退课'}, {value: 'joinchannel', label: '参与渠道'}]
                if (this.userDate.stop == '是') {
                  this.options.splice(1, 1);
                }
                console.log(this.userDate)
                console.log(this.options)
              }
            }
          }
        })

        console.log(this.options)

      },
      getMore(e) {  //获取更多
        this.$router.push({
          path: e, query: {phone: this.$route.query.phone, type: this.$route.query.type}
        })
      }
      ,
      getList() {
        ruserDetail(this.ruserInfo).then((res) => {  //学生详情
          this.userDate = res.data.data
          console.log(this.userDate)
          this.listLoading = false
          let arr = [];
          arr.push(res.data.data);
          this.tableData = arr;
          this.$store.commit('SET_DETAIL_INFO', this.tableData)
          sessionStorage.setItem('detailParams', JSON.stringify(this.tableData))  //存储详细信息
          this.isStop()
        })
      }
      ,
      edit_act() {
        this.$router.push({
          path: '/detail/act', query: {phone: this.$route.query.phone, type: this.$route.query.type}
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss">

  /*@import '../detail.scss';*/

  /*.user {
    @include detail-container();
    @include btn();
  }
  */

  /*.header {*/
    /*border-radius: 10px;*/
    /*display: flex;*/
    /*flex-direction: row;*/
    /*align-items: center;*/
    /*justify-content: flex-end;*/
    /*background: #fff;*/
    /*height: 77px;*/
    /*line-height: 100%;*/
  /*}*/

  /*.block {*/
    /*border-radius: 10px 10px 10px 10px;*/
    /*display: flex;*/
    /*flex-direction: row;*/
    /*align-items: center;*/
    /*justify-content: flex-start;*/
    /*background: #ffffff;*/
    /*height: 78px;*/
    /*line-height: 100%;*/
    /*color: #8e8e8e;*/
    /*font-weight: bold;*/
    /*span {*/
      /*display: inline-block;*/
      /*width: 460px;*/
      /*margin-left: 70px;*/
    /*}*/
  /*}*/

  /*.userCard:nth-of-type(2) {*/
    /*span {*/
      /*margin: 0 180px 0 68px;*/
    /*}*/
  /*}*/

  /*.el-table:nth-of-type(1) {*/
    /*border-radius: 10px 10px 0 0;*/
  /*}*/

  /*.el-table:nth-of-type(2) {*/
    /*border-radius: 0 0 10px 10px;*/
    /*margin-top: 18px;*/
  /*}*/

</style>
