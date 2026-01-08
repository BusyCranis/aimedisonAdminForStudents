<template>
  <el-table
    :data="$store.state.aimedison.aimedisonKeywordUserList"
    style="width: 100%; padding-top: 0px"
  >
    <el-table-column label="사용자 아이디" min-width="100">
      <template slot-scope="scope">
        {{ scope.row.memberId | orderNoFilter }}
      </template>
    </el-table-column>

    <el-table-column label="" width="150" align="center">
      <template slot-scope="{ row }">
        <el-button
          type="button"
          @click="findAllChatHistory(row.memberId)"
          style="background-color: skyblue; color: black; padding: 5px"
        >
          전체 조회
        </el-button>

        <el-button
          type="button"
          @click="findSuccessedChatHistory(row.memberId)"
          style="background-color: skyblue; color: black; padding: 5px"
        >
          성공한 기록만 조회
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";
import { transactionList } from "@/api/remote-search";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: "success",
        pending: "danger",
      };
      return statusMap[status];
    },
    orderNoFilter(str) {
      return str.substring(0, 30);
    },
  },
  data() {
    return {
      list: null,
    };
  },
  created() {
    // console.log(window["aimedisonkeyworduserlist"]);

    this.fetchData();
  },
  methods: {
    async findSuccessedChatHistory(userId) {
      console.log(userId);
      console.log(this.$store.state.aimedison.aimedisonKeywordUserList);
      let selectedUser =
        this.$store.state.aimedison.aimedisonKeywordUserList.filter(
          (item) => item.memberId === userId
        )[0];

      this.$store.commit("aimedison/setCurrentSelectedUserId", userId);
      console.log(selectedUser);

      if (selectedUser.successHistoryList.length > 0) {
        let recentSuccessedChatHistory = await axios.post(
          "http://175.119.224.227:5003/find/successedchathistory",
          {
            shopId: window.cafe24aimedisonkeywordappshopid,
            userId: userId,
            trialId:
              selectedUser.successHistoryList[
                selectedUser.successHistoryList.length - 1
              ].trialIdForEvent,
          }
        );

        console.log(recentSuccessedChatHistory);
        console.log(recentSuccessedChatHistory.data);
        this.$store.commit(
          "aimedison/setRecentScsdChatHistoryOfSlctdUser",
          recentSuccessedChatHistory.data
        );
      } else {
        this.$store.commit("aimedison/setRecentScsdChatHistoryOfSlctdUser", []);
      }
    },

    async findAllChatHistory(userId) {
      console.log(userId);
      this.$store.commit("aimedison/setCurrentSelectedUserId", userId);

      let recentSuccessedChatHistory = await axios.post(
        "http://175.119.224.227:5003/find/allchathistory",
        {
          shopId: window.cafe24aimedisonkeywordappshopid,
          userId: userId,
        }
      );

      console.log(recentSuccessedChatHistory);
      console.log(recentSuccessedChatHistory.data);
      this.$store.commit(
        "aimedison/setRecentScsdChatHistoryOfSlctdUser",
        recentSuccessedChatHistory.data
      );
    },

    fetchData() {},
  },
};
</script>
