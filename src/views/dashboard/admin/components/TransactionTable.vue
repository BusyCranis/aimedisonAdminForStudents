<template>
  <el-table :data="$store.state.aimedison.aimedisonKeywordUserList" style="width: 100%;padding-top: 15px;">
    <el-table-column label="사용자 아이디" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.memberId | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="195" align="center">
      <!-- <template slot-scope="scope">
        ¥{{ scope.row.price | toThousandFilter }}
      </template> -->
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">

      <button    @click="findSuccessedChatHistory(scope.row.memberId)">
        상세
      </button>
      


      <!-- <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">
          {{ row.status }}
        </el-tag>
      </template> -->
    </el-table-column>
  </el-table>
</template>

<script>
import { transactionList } from '@/api/remote-search'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    // console.log(window["aimedisonkeyworduserlist"]);

    this.fetchData()
  },
  methods: {

    async findSuccessedChatHistory(userId) {
      console.log(userId)

      



    },





    fetchData() {






      // transactionList().then(response => {
      //   this.list = response.data.items.slice(0, 8)
      //   console.log(response.data.items)
      //   console.log(this.list)
      // })
    }
  }
}
</script>
