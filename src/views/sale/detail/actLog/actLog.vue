<template>
  <div class="actLog">
    <el-header class="org">{{$t('i18nView.log.actLog')}}</el-header>
    <el-table :key='tableKey' :data="tableData" v-loading="listLoading" element-loading-text="正在加载中" border fit
              style="width: 100%">
      <el-table-column align="center" :label="$t('i18nView.log.operator')" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{JSON.parse(scope.row.operatorInfo).operator }}</span>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">
                {{JSON.parse(scope.row.operatorInfo).operator | nameFilter}}
              </el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('i18nView.log.records')" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{$t('i18nView.log.actStage')}}</span>
          <span
            v-if="JSON.parse(scope.row.operatorInfo).billType">({{JSON.parse(scope.row.operatorInfo).billType | dataTypeFilter}})</span>
          <span>
            {{scope.row.stage | stageFilter}}--{{$t('i18nView.log.actStatus')}}{{scope.row.stat | statusFilter}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('i18nView.log.actLog')" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.content}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('i18nView.log.createTime')" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.createTime || '/'}}
          </span>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import local from '@/views/i18n-demo/local'
  const viewName = 'i18nView'
  import {mapGetters} from 'vuex'
  import {ruserAction} from '@/api/detail' // 行动日志
  export default {
    data() {
      return {
        listLoading: true,
        tableKey: 0,
        listQuery: {
          page: 1,
          limit: 20
        },
        total: null,
        tableData: []
      }
    },
    computed: {
      ...mapGetters(['detailPhone', 'detailType', 'roleIds', 'permissions'])
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
      if (JSON.parse(sessionStorage.getItem('detailParams'))) {
        this.phone = JSON.parse(sessionStorage.getItem('detailParams'))[0].phone
        this.getList()
      } else {
        this.phone = this.$route.query.phone
        this.getList()
      }
    },
    methods: {
      getList() {
        ruserAction(this.phone, this.listQuery).then((res) => {
          this.listLoading = false
          this.total = res.data.data.total
          console.log(res.data.data.records)
          this.tableData = res.data.data.records
        }).catch((res) => {
          console.log(res)
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../detail.scss';

  .actLog { //@include调用
    @include detail-container();
    .el-header {
      font-size: 29px;
      font-weight: bold;
      width: 100%;
      text-align: center;
    }
  }

</style>
