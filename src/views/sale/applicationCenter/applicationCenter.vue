<template>
  <div class="applicationCenter" v-loading="listLoading" element-loading-text="给我一点时间">
    <centerHeader :tit="tit"></centerHeader>
    <search :tit="tit" :disableDeep="1" v-on:getSearchData="getSearchData"></search>
    <tree-table :data="data" :columns="columns" border/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import centerHeader from '@/components/center/header'
  import search from '@/components/center/search'
  import centerTable from '@/components/center/table'
  import treeTable from '@/components/center/TreeTable'
  import {queryInviteList} from '@/api/sale'

  export default {
    components: {
      centerHeader,
      centerTable,
      treeTable,
      search
    },
    data() {
      return {
        listLoading: false,
        tit: '邀请列表',
        list: [],
        result: [],
        userIdLists: '',
        columns: [
          {
            text: '邀请列表',
            value: 'ccName',
            width: 240
          },
          {
            text: '注册时间',
            value: 'createTime'
          },
          {
            text: '注册手机号',
            value: 'phone'
          },
          {
            text: '英文名字',
            value: 'ruserEnName'
          },
          {
            text: '中文名字',
            value: 'ruserName'
          },
          {
            text: '首次注册渠道',
            value: 'channelName'
          },
          {
            text: '邀请人',
            value: 'inviteRuserName'
          }
        ],
        data: []
      }
    },

    created() {
      this.userId = this.$store.getters.userId
      this.userIdLists = this.$store.getters.userId
    },
    computed: {
      ...mapGetters(['depthTree', 'permissions'])
    },

    methods: {
      getSearchData(data) {
        this.userIdLists = data.userIdLists
        this.channelName = data.channelName
        if (data.msg != 'clear') {
          this.getList()
        }

      },
      async getList() {
        this.listLoading = true
        let userIdLists = this.userIdLists
        let channelName = this.channelName
        const list = await queryInviteList({
          userIdLists,
          channelName
        })
        if (list) {
          this.listLoading = false
        }
        this.data = list.data.data
      }
    }
  }
</script>

<style lang="scss">
  .applicationCenter {
    width: 100%;
    height: 100%;
    padding: 18px 18px 0 18px;
    background: #fafafa;
    margin-bottom: 20px;
  }
</style>
