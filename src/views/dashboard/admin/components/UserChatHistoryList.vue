<template>
  <el-table
    :data="$store.state.aimedison.recentScsdChatHistoryOfSlctdUser"
    style="width: 100%; padding-top: 0px"
  >
    <el-table-column label="대화 내용" min-width="500">
      <template slot-scope="scope">
        사용자의 메시지: {{ scope.row.requestObjectByUserRequest }}

        <br />

        챗봇의 답변: {{ scope.row.answerObjectDetail.content.content }}
      </template>
    </el-table-column>

    <el-table-column label="" width="100" align="center"> </el-table-column>
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
    this.fetchData();
  },
  methods: {
    fetchData() {},
  },
};
</script>
