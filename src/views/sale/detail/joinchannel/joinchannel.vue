<template>
  <div class="joinchannel">
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="正在加载中" border fit
              style="width: 100%">
      <el-table-column align="center" label="渠道名称">
        <template slot-scope="scope">
          <span>{{scope.row.channelName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="邀请的非付费老例子">
        <template slot-scope="scope">
          <span>
            {{scope.row.username}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="邀请的新例子">
        <template slot-scope="scope">
          <span>
            {{scope.row.phone}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="查看邀请人" show-overflow-tooltip>
        <template slot-scope="scope">
          <!--<span>查看</span>-->
          <el-button size="small" type="success" @click="detailInviter(scope.$index,scope.row)">查看</el-button>
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

  import {joinChannel} from '@/api/detail' // 参加渠道

  export default {
    data() {
      return {
        total: null,
        list:[],
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20
        },
        rules: {
          username: [
            {
              required: true,
              message: '请输入账户',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
          ],
          phone: [
            {
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            },
            {
              pattern: /^1[34578]\d{9}$/,
              message: '手机号格式不正确',
              trigger: 'blur'
            },
            {
              min: 11,
              max: 11,
              message: '手机号格式不正确',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 20,
              message: '长度在 5 到 20 个字符',
              trigger: 'blur'
            }
          ],
          deptId: [
            {
              required: true,
              message: '请选择部门',
              trigger: 'blur'
            }
          ],
          role: [
            {
              required: true,
              message: '请选择角色',
              trigger: 'blur'
            }
          ]
        },
        tableKey: 0
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        this.listQuery.phone = sessionStorage.getItem('detailPhone')
        joinChannel(this.listQuery).then(response => {
          this.list = response.data
          this.listLoading = false
        })
      },
      detailInviter(index, item) {
        // 需要拿到当前phone 和 channel参数  活动类型 打卡 微信等
        this.$router.push({path: '/detail/inviter', query: {index: index, phone: item.phone,channel:item.channel}});
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
