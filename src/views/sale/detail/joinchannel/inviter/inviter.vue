<template>
  <div class="app-container calendar-list-container">
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="正在加载中" border fit
              style="width: 100%">
      <el-table-column align="center" label="参与时间">
        <template slot-scope="scope">
          <span>{{scope.row.userId}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="数据类型">
        <template slot-scope="scope">
          <span>
            {{scope.row.username}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="绑定手机">
        <template slot-scope="scope">
          <span>
            {{scope.row.phone}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="中文名字">
        <template slot-scope="scope">
          <span>
            {{scope.row.phone}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="英文名字">
        <template slot-scope="scope">
          <span>
            {{scope.row.phone}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="级别">
        <template slot-scope="scope">
          <span>
            {{scope.row.phone}}
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
  import {viewInvitedSearch} from '@/api/detail' // 邀请查询
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        channel:'',
        phone:'',
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20
        },
        tableKey: 0
      }
    },
    computed: {
      ...mapGetters([
        'permissions'
      ])
    },
    created() {
      console.log(this.$route.query);
      this.listQuery.phone = this.$route.query.phone;
      this.listQuery.channel = this.$route.query.channel;
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        this.listQuery.phone = sessionStorage.getItem('detailPhone')
        this.listQuery.channel = 11
        viewInvitedSearch(this.listQuery).then(response => {
          this.list = response.data
          this.listLoading = false
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
    }
  }
</script>

<style>
  table {
    border-collapse: inherit;
  }
</style>
