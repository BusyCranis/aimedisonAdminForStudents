<template>
  <el-table :data="$store.state.aimedison.recentScsdChatHistoryOfSlctdUser" style="width: 100%; padding-top: 0px;">
    <el-table-column label="대화 내용" min-width="500"    style="text-overflow: clip;    word-break: normal;">
      <template slot-scope="scope"   >
        {{ scope.row.requestObjectByUserRequest | orderNoFilter }}   
  
          <br>

        {{ scope.row.answerObjectDetail.content.content | orderNoFilter }}

      </template>

      <!-- .answerObjectDetail.content.content -->

      <!-- <template slot-scope="scope">
        {{ scope.row.answerObjectDetail.content.content | orderNoFilter }}
      </template> -->



    </el-table-column>

    <el-table-column label="Status" width="100" align="center">


      <!-- <template slot-scope="{row}">
        <button    @click="findSuccessedChatHistory(row.memberId)">
          상세
        </button>
      </template> -->
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'
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
      console.log(this.$store.state.aimedison.aimedisonKeywordUserList)
      let selectedUser = this.$store.state.aimedison.aimedisonKeywordUserList.filter((item) => item.memberId === userId)[0]

      // selectedUser.successHistoryList[selectedUser.successHistoryList.length - 1].trialIdForEvent
      // "http://175.119.224.227:5003/find/successedchathistory"
      console.log(selectedUser)

      let recentSuccessedChatHistory = await axios.post("http://175.119.224.227:5003/find/successedchathistory", {
        shopId: "aimedison",
        userId: userId,
        trialId: selectedUser.successHistoryList[selectedUser.successHistoryList.length - 1].trialIdForEvent
      })



      console.log(recentSuccessedChatHistory)
      console.log(recentSuccessedChatHistory.data)


      this.$store.commit("aimedison/setRecentScsdChatHistoryOfSlctdUser", recentSuccessedChatHistory.data);







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
