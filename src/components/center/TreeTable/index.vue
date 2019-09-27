<template>
  <el-table :data="formatData" :row-style="showRow" v-bind="$attrs" v-loading="listLoading"
            element-loading-text="给我一点时间">
    <el-table-column v-if="columns.length===0" width="150">
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"/>
          <i v-else class="el-icon-minus"/>
        </span>
        <!--{{ scope.$index }}-->
      </template>
    </el-table-column>
    <el-table-column v-for="(column, index) in columns" v-else :key="column.value" :label="column.text"
                     :width="column.width">
      <template slot-scope="scope">
        <!-- Todo -->
        <!-- eslint-disable-next-line vue/no-confusing-v-for-v-if -->
        <span v-for="space in scope.row._level" v-if="index === 0" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"/>
          <i v-else class="el-icon-minus"/>
        </span>
        <span v-if="column.value=='createTime'">
          {{ scope.row[column.value] | filterTime}}
        </span>
        <span v-else>
          {{ scope.row[column.value]}}
        </span>
      </template>
    </el-table-column>
    <el-table-column
      label="详情"
      align="center"
      width="180">
      <template slot-scope="scope">
        <el-button type="primary" @click="detail(scope.row)">详情</el-button>
      </template>
    </el-table-column>
    <slot/>
  </el-table>
</template>

<script>

  import {queryInviteBills, queryInviteList} from '@/api/sale'
  import treeToArray from './eval'

  export default {
    name: 'TreeTable',
    props: {
      /* eslint-disable */
      data: {
        type: [Array, Object],
        required: true
      },
      columns: {
        type: Array,
        default: () => []
      },
      evalFunc: Function,
      evalArgs: Array,
      expandAll: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        listLoading: false,
        index: '',
        listData: [],
        timer: null
      }
    },
    computed: {
      // 格式化数据源
      formatData: function () {
        let tmp
        if (!Array.isArray(this.data)) {
          tmp = [this.data]
        } else {
          tmp = this.data
        }
        const func = this.evalFunc || treeToArray
        const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
        return func.apply(null, args)
      }
    },
    filters: {
      filterTime: (value) => {
        return value && value.toString().substring(0, 19)
      }
    },
    methods: {
      detail(scope) {
        this.$router.push({path: '/detail/user', query: {phone: scope.phone, type: scope.type}});
      },
      showRow: function (row) {
        const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
        row.row._show = show
        return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
      },
      // 图标显示
      iconShow(index, record) {
        return (index === 0 && record.haveChild)
      },
      // 切换下级是否展开
      toggleExpanded: function (trIndex) {
        //函数节流优化
        if (this.timer) {
          clearTimeout(this.timer)
        }
        const channelName = sessionStorage.getItem('channelName')
        this.index = trIndex
        const record = this.formatData[trIndex]
        this.listLoading = true
        queryInviteBills(record.ruserId, channelName).then((res) => {
          this.listLoading = false
          record.children = res.data.data
        })
        this.timer = setTimeout(() => {
          record._expanded = !record._expanded
        }, 100)
      }
    }
  }
</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-webkit-keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
  $color-blue: #2196F3;
  $space-width: 18px;
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;

    &::before {
      content: ""
    }
  }

  .processContainer {
    width: 100%;
    height: 100%;
  }

  table td {
    line-height: 26px;
  }

  .tree-ctrl {
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
  }
</style>
