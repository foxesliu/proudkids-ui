<template>
  <div class="experience" v-loading="listLoading">
    <ExperienceHeader :tit="tit"></ExperienceHeader>
    <FilterForm
      v-bind:showDeptTree="showDeptTree"
      :chooseExperienceClass="chooseExperienceClass"
      :classTypeList="classTypeList"
      @getSearchList="getSearchList"
    ></FilterForm>
    <FilterTable
      :experience="experience"
      :dataSource="dataSource"
      :addBtnFlag="addBtnFlag"
      @postData="postData"
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
  import ExperienceHeader from '@/components/center/header.vue'
  import FilterForm from './components/filterForm'
  import FilterTable from "./components/table";
  import {getClasses, getClassTypeItems, joinClass} from '@/api/aom.js';
  import {mapGetters} from 'vuex'

  export default {
    name: 'experience',
    components: {
      ExperienceHeader,
      FilterForm,
      FilterTable
    },
    data() {
      return {
        addBtnFlag:false,
        listLoading: false,
        showDeptTree: false,
        experience: false,
        chooseExperienceClass: true,
        dataSource: [],
        classTypeList: [],
        tit: '选择体验课',
        total: 0,
        listQuery: {
          page: 1,
          rows: 10
        },
        params:{
          stage: 0,
          itemType: 3,
          page: 1,
          rows: 10
        }
      }
    },
    created() {
      this.getList()
    },
    computed: {
      ...mapGetters(['depthTree', 'permissions', 'userId'])
    },
    methods: {
      async getList(data = {}) {
        const obj = {
          stage: 0,
          itemType: 3,
          status:0,
          asc:true,
          orderByField:'startTime',
          ...this.listQuery,
          ...data
        }
        this.listLoading = true
        const result = await getClasses(obj)
        const classTypeList = await getClassTypeItems()
        if (result && classTypeList) {
          this.listLoading = false
        }
        this.dataSource = result.data.records
        this.total = result.data.total
        this.classTypeList = classTypeList.data
      },
      async joinClass(data = {}) {
        const result = joinClass(data)
        this.addBtnFlag=true
        if (result) {
          this.$message({
            message: '恭喜你，加入班级成功',
            type: 'success'
          });

          // this.getList()
          // this.$nextTick(()=>{
          //   this.getList()
          // })

          setTimeout(()=>{
            this.addBtnFlag=false
            this.getList()
          },500)
        }
      },
      postData(data) {
        this.joinClass(data)
      },
      getSearchList(data) {
        this.params = {
          stage: 0,
          itemType: 3,
          status:0,
          asc:true,
          orderByField:'startTime',
          ...data,
          ...this.listQuery
        }
        this.getList(this.params)
      },
      handleSizeChange(val) {
        this.params.rows = val
        this.getList(this.params)
      },
      handleCurrentChange(val) {
        this.params.page = val
        this.getList(this.params)
      }
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
