<template>
  <el-table :data="$store.state.aimedison.keywordShopAimedison"        v-if="$store.state.aimedison.keywordShopAimedison.length > 0"         style="width: 100%; padding-top: 0px;">
    <el-table-column      style="padding-right: 0px;     padding-left: 0px;"        label="키워드 목록"     min-width="150" >
      <template       style="padding-right: 0px;     padding-left: 0px;"       slot-scope="scope">
        {{ scope.row.value }}
      </template>
    </el-table-column>
    <!-- <el-table-column label="Price" width="195" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.price | toThousandFilter }}
      </template>
    </el-table-column> -->
    <el-table-column          width="75" align="center">


      <template slot-scope="{row}">

        <el-button     type="button"      @click="removeTargetKeyword(row.keywordId)"     style="background-color: skyblue;    color: black;    padding: 3px;" >삭제</el-button>
      

        <!-- <el-tag :type="row.status | statusFilter">
          {{ row.status }}
        </el-tag> -->
      </template>
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

    // this.fetchData()
  },

  mounted() {
   
    // console.log(document.querySelectorAll(".cell"))
    // for(let i = 0; document.querySelectorAll(".cell").length; i++) {
    //   document.querySelectorAll(".cell")[i].style.paddingLeft = "0px";
    //   document.querySelectorAll(".cell")[i].style.paddingRight = "0px";
    // }



  },


  methods: {
    removeTargetKeyword(eachId) {

      this.$store.commit("aimedison/removeKeywordShopAimedison", eachId);


      // this.postForm.appUseFor.appEventKeywordList = this.postForm.appUseFor.appEventKeywordList.filter((item) => item.keywordId !== eachId)
      // console.log(this.postForm.appUseFor.appEventKeywordList)


      console.log(document.querySelectorAll(".cell"))



      // setTimeout(() => {
      //   if(document.querySelectorAll(".cell")) {
      //     if(document.querySelectorAll(".cell").length > 0) {
      //       for(let i = 0; document.querySelectorAll(".cell").length; i++) {
      //         document.querySelectorAll(".cell")[i].style.paddingLeft = "0px";
      //         document.querySelectorAll(".cell")[i].style.paddingRight = "0px";
      //       }
      //     }
      //   }
      // }, 10);


      setTimeout(() => {
        console.log(window.document.querySelectorAll(".cell"))

        if(window.document.querySelectorAll(".cell")) {
          if(window.document.querySelectorAll(".cell").length > 0) {
            for(let i = 0; i > window.document.querySelectorAll(".cell").length; i++) {
              window.document.querySelectorAll(".cell")[i].style.paddingLeft = "0px";
              window.document.querySelectorAll(".cell")[i].style.paddingRight = "0px";
            }
          }
        }
      }, 3);


    },



    async findSuccessedChatHistory(userId) {
      console.log(userId)
      console.log(this.$store.state.aimedison.aimedisonKeywordUserList)
      let selectedUser = this.$store.state.aimedison.aimedisonKeywordUserList.filter((item) => item.memberId === userId)[0]

      // selectedUser.successHistoryList[selectedUser.successHistoryList.length - 1].trialIdForEvent
      // "/find/successedchathistory"

      this.$store.commit("aimedison/setCurrentSelectedUserId", userId);
      console.log(selectedUser)

      if(selectedUser.successHistoryList.length > 0) {
        let recentSuccessedChatHistory = await axios.post("/find/successedchathistory", {
          shopId: window.cafe24aimedisonkeywordappshopid,
          userId: userId,
          trialId: selectedUser.successHistoryList[selectedUser.successHistoryList.length - 1].trialIdForEvent
        })



        console.log(recentSuccessedChatHistory)
        console.log(recentSuccessedChatHistory.data)
        this.$store.commit("aimedison/setRecentScsdChatHistoryOfSlctdUser", recentSuccessedChatHistory.data);
      } else {
        this.$store.commit("aimedison/setRecentScsdChatHistoryOfSlctdUser", []);
      }




    },

    
    async findAllChatHistory(userId) {
      let recentSuccessedChatHistory = await axios.post("/find/allchathistory", {
        shopId: window.cafe24aimedisonkeywordappshopid,
        userId: userId,
      
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
