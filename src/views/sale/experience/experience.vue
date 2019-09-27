<template>
  <div class="experience" v-loading="listLoading">
    <ExperienceHeader :tit="tit"></ExperienceHeader>
    <FilterForm
      v-bind:showDeptTree="showDeptTree"
      :chooseExperienceClass="chooseExperienceClass"
      @getSearchList="getSearchList"
      @getDeptData="getDeptData"
    ></FilterForm>
    <FilterTable
      :experience="experience"
      :dataSource="dataSource"
    ></FilterTable>
    <div style="margin-top: 20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import FilterTable from "./components/table";
  import FilterForm from './components/filterForm'
  import ExperienceHeader from '@/components/center/header.vue'

  import {queryExperienceList} from '@/api/sale.js';
  import {getClasses, getClassTypeItems, joinClass} from '@/api/aom.js';

  export default {
    name: 'experience',
    components: {
      ExperienceHeader,
      FilterForm,
      FilterTable
    },
    data() {
      return {
        show: true,
        experience: true,
        listLoading: true,
        showDeptTree: true,
        chooseExperienceClass: false,
        deptData: {},
        timer: null,
        type: null,
        total: 0,
        listQuery: {
          page: 1,
          rows: 10,
          orderByField:'origin_time'
        },
        tit: '未开始',
        // userId: null,
        dataSource: [],
      }
    },
    created() {
      this.type = this.$route.query.status
      this.phone = this.$route.query.phone
      switch (this.type) {
        case 0:
          this.tit = '未开始'
          break
        case 1:
          this.tit = '已结束'
          break
        default:
          this.tit = '体验课'
          break
      }

      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        let params
        //0未开始&&1已结束
        if(this.type==0){
          params = {
            asc:true,
            type: this.type,
            ...this.listQuery,
            ...this.deptData
          }
        }else if(this.type == 1){
          params = {
            asc:false,
            type: this.type,
            ...this.listQuery,
            ...this.deptData
          }
        }else if(this.phone){
          params = {
            asc:true,
            ...this.listQuery,
            phone: this.phone
          }
        }else{
          params = {
            asc:true,
            ...this.listQuery,
            ...this.deptData
          }
        }

        this.getList(params)
      }, 1000)

    },
    computed: {
      ...mapGetters(['depthTree', 'permissions', 'userId'])
    },
    methods: {
      async getList(data = {}) {
        if (data.ccId == 'null') {
          data.ccId = null
        }
        this.listLoading = true
        const result = await queryExperienceList(data)
        if (result) {
          this.listLoading = false
        }
        this.dataSource = result.data.records
        this.total = result.data.total
      },
      getDeptData(data) {
        this.deptData = data
        console.log(data)
      },
      getSearchList(data) {
        let params

        if(this.type==0){
          params = {
            ...data,
            asc:true,
            type: this.type,
            ...this.listQuery,
            ...this.deptData
          }
        }else if(this.type == 1){
          params = {
            ...data,
            asc:false,
            type: this.type,
            ...this.listQuery,
            ...this.deptData
          }
        }else{
          params = {
            ...data,
            asc:true,
            ...this.listQuery,
            ...this.deptData
          }
        }
        this.getList(params)
      },
      handleSizeChange(val) {
        this.listQuery.rows = val
        let params

        if(this.type==0){
          params = {
            type: this.type,
            asc:true,
            ...this.listQuery,
            ...this.deptData
          }
        }else if(this.type == 1){
          params = {
            type: this.type,
            asc:false,
            ...this.listQuery,
            ...this.deptData
          }
        }else{
          params = {
            asc:true,
            ...this.listQuery,
            ...this.deptData
          }
        }
        this.getList(params)
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        let params
        if(this.type==0){
          params = {
            asc:true,
            type: this.type,
            ...this.listQuery,
            ...this.deptData
          }
        }else if(this.type == 1){
          params = {
            asc:false,
            type: this.type,
            ...this.listQuery,
            ...this.deptData
          }
        }else{
          params = {
            asc:true,
            ...this.listQuery,
            ...this.deptData
          }
        }
        this.getList(params)
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .experience {
    width: 100%;
    height: 100%;
    padding: 18px 18px 0 18px;
    background: #fafafa;
    margin-bottom: 20px;
  }

</style>
