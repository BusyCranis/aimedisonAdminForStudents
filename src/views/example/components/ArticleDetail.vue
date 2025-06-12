<template>
  <div class="createPost-container">
    <el-form ref="postForm"  :rules="rules" class="form-container">

      <!-- <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <CommentDropdown v-model="postForm.comment_disabled" />
        <PlatformDropdown v-model="postForm.platforms" />
        <SourceUrlDropdown v-model="postForm.source_uri" />
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          Publish
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">
          Draft
        </el-button>
      </sticky> -->

      <div class="createPost-main-container">
        <!-- <el-row>
          <Warning />

          <el-col :span="24">
            <el-form-item style="margin-bottom: 0px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                Title
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="60px" label="Author:" class="postInfo-container-item">
                    <el-select v-model="postForm.author" :remote-method="getRemoteUserList" filterable default-first-option remote placeholder="Search user">
                      <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item label-width="120px" label="Publish Time:" class="postInfo-container-item">
                    <el-date-picker v-model="displayTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Select date and time" />
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label-width="90px" label="Importance:" class="postInfo-container-item">
                    <el-rate
                      v-model="postForm.importance"
                      :max="3"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      :low-threshold="1"
                      :high-threshold="3"
                      style="display:inline-block"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row> -->

        <el-form-item style="margin-bottom: 0px;"    label-width="70px"    label="인사말:      ">
          <el-input v-model="postForm.greeting" :rows="1" type="textarea" class="article-textarea" autosize placeholder="Please enter the content" />
          <!-- <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span> -->
        </el-form-item>

        <el-form-item style="margin-bottom: 0px;"    label-width="100px"     label="이벤트 문장:">
          <el-input v-model="targetKeyword" :rows="1" type="textarea" class="article-textarea" autosize placeholder="Please enter the content" />
          <!-- <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span> -->

          <el-button   type="button"    @click="addTargetKeyword"    style="background-color: skyblue;    color: black;    padding: 5px;"  >추가</el-button>

        </el-form-item>

        <el-row :gutter="8">
          <el-col :xs="{span: 24}" :sm="{span: 18}" :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}" style="padding-left:50px;  padding-right:0px; margin-bottom:0px;">
            <TransactionTable />
          </el-col>
        </el-row>


        <!-- <div    v-for="item in postForm.appUseFor.appEventKeywordList"      >
          {{ item.value }}    
          <button     type="button"      @click="removeTargetKeyword(item.keywordId)">삭제</button>
        </div> -->



        <br>
        <br>
        <br>





        최대 도전 횟수:   <input type="number"    v-model="postForm.appUseFor.totalChanceKeywordChallenge"   />

        <br>

        도전별 대화 갯수:   <input type="number"    v-model="postForm.appUseFor.remainedTrialCount"   />

        <br>
        <br>
        <br>

        <el-form-item style="margin-bottom: 0px;" label-width="70px" label="챗봇 제목:">
          <el-input v-model="postForm.uiConfigOption.shopAppTitle" :rows="1" type="textarea" class="article-textarea" autosize placeholder="Please enter the content" />
          <!-- <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span> -->
        </el-form-item>

        
        <br>


        챗봇 색상     <span   style="line-height: 60px;"><br></span>

        헤더  <input  type="color"      v-model="postForm.uiConfigOption.shopAppColors.headerColor"   >   <span   style="line-height: 35px;"><br></span>

        본문  <input  type="color"      v-model="postForm.uiConfigOption.shopAppColors.mainSpaceColor" >   <span   style="line-height: 35px;"><br></span>

        메시지 입력창  <input  type="color"    v-model="postForm.uiConfigOption.shopAppColors.inputBoxColor" >   <span   style="line-height: 35px;"><br></span>

        사용자 메시지  <input  type="color"     v-model="postForm.uiConfigOption.shopAppColors.userMessageBoxColor"    >   <span   style="line-height: 35px;"><br></span>

        챗봇 메시지  <input  type="color"     v-model="postForm.uiConfigOption.shopAppColors.answerMessageBoxColor"    >   <span   style="line-height: 35px;"><br></span>



        <!-- <el-form-item prop="content" style="margin-bottom: 0px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </el-form-item> -->

        <!-- <el-form-item prop="image_uri" style="margin-bottom: 0px;">
          <Upload v-model="postForm.image_uri" />
        </el-form-item> -->
      </div>




      <br>  <br>




      <el-button    type="button"    id="submitchangebutton"     style="background-color: skyblue;    color: black;"   @click="submitChangedAppSettings">
        변경사항 적용
      </el-button>



    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import TransactionTable from './components/TransactionTable'
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { validURL } from '@/utils/validate'
import { fetchArticle } from '@/api/article'
import { searchUser } from '@/api/remote-search'
import Warning from './Warning'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'

const defaultForm = {
  // targetKeyword: "",
  chatbotTitle: "",




  exist: false,
  shopDescriptionByAdmin: "",
  greeting: "",
  numberOfRecentBuyRecord: 0,
  shopChatScenario: false,
  appUseFor: {
      appUseFor: "appforeventspec",
      appEventKeywordList: [
        
      ],
      remainedTrialCount: 0,
      totalChanceKeywordChallenge: 0
  },
  isAppInstalled: true,
  isAppDisplaying: true,
  uiConfigOption: {
      shopAppTitle: "",
      shopAppColors: {
          headerColor: "",
          mainSpaceColor: "",
          inputBoxColor: "",
          userMessageBoxColor: "",
          answerMessageBoxColor: ""
      }
  }



 
}

export default {
  name: 'ArticleDetail',
  components: { Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown, TransactionTable },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      targetKeyword: "",
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength() {
      // return this.postForm.content_short.length
    },
    // displayTime: {
    //   // set and get is useful when the data
    //   // returned by the back end api is different from the front end
    //   // back end return => "2013-06-25 06:59:25"
    //   // front end need timestamp => 1372114765000
    //   get() {
    //     return (+new Date(this.postForm.display_time))
    //   },
    //   set(val) {
    //     this.postForm.display_time = new Date(val)
    //   }
    // }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      // this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },

  async mounted() {

    await this.getKeywordAppInfo()

  },




  methods: {
    // await axios.post("/app/checkshopexist", {})

    async getKeywordAppInfo() {
      // console.log("getKeywordAppInfo...");
      let resFromKeywordAppServer = await axios.post("/app/checkshopexist", {
        shopId: window.cafe24aimedisonkeywordappshopid
      })



      console.log(resFromKeywordAppServer);
      console.log(resFromKeywordAppServer.data);
      this.postForm = resFromKeywordAppServer.data;


      this.$store.commit("aimedison/setKeywordShopAimedison", resFromKeywordAppServer.data.appUseFor.appEventKeywordList);
     

      this.postForm.uiConfigOption.shopAppColors.answerMessageBoxColor = this.convertRgbToHex(resFromKeywordAppServer.data.uiConfigOption.shopAppColors.answerMessageBoxColor);
      this.postForm.uiConfigOption.shopAppColors.headerColor = this.convertRgbToHex(resFromKeywordAppServer.data.uiConfigOption.shopAppColors.headerColor);
      this.postForm.uiConfigOption.shopAppColors.inputBoxColor = this.convertRgbToHex(resFromKeywordAppServer.data.uiConfigOption.shopAppColors.inputBoxColor);
      this.postForm.uiConfigOption.shopAppColors.mainSpaceColor = this.convertRgbToHex(resFromKeywordAppServer.data.uiConfigOption.shopAppColors.mainSpaceColor);
      this.postForm.uiConfigOption.shopAppColors.userMessageBoxColor = this.convertRgbToHex(resFromKeywordAppServer.data.uiConfigOption.shopAppColors.userMessageBoxColor);




      setTimeout(() => {
        console.log(window.document.querySelectorAll(".cell"))

        if(window.document.querySelectorAll(".cell")) {
          if(window.document.querySelectorAll(".cell").length > 0) {
            for(let i = 0; i < window.document.querySelectorAll(".cell").length; i++) {
              window.document.querySelectorAll(".cell")[i].style.paddingLeft = "0px";
              window.document.querySelectorAll(".cell")[i].style.paddingRight = "0px";
            }
          }
        }
      }, 5);


    },


    convertRgbToHex(rgbString) {
      const rgb = rgbString.match(/\d+/g).map(Number);

      // 각각 r, g, b를 16진수 2자리 문자열로 변환
      const hex = rgb.map(value =>
        value.toString(16).padStart(2, '0')
      ).join('');

      return `#${hex}`;
    },


    async submitChangedAppSettings() {
      this.postForm.appUseFor.appEventKeywordList = this.$store.state.aimedison.keywordShopAimedison;



      let hexadecimalHeaderCode = this.postForm.uiConfigOption.shopAppColors.headerColor;
      console.log(this.postForm.uiConfigOption.shopAppColors.headerColor);
    
      let headerRedFactor = parseInt(hexadecimalHeaderCode.slice(1, 3), 16);
      let headerGreenFactor = parseInt(hexadecimalHeaderCode.slice(3, 5), 16);
      let headerBlueFactor = parseInt(hexadecimalHeaderCode.slice(5, 7), 16);
      // chatbotHeaderColor = `rgb(${headerRedFactor}, ${headerGreenFactor}, ${headerBlueFactor})`;


      let hexadecimalwefweCode = this.postForm.uiConfigOption.shopAppColors.mainSpaceColor;
      console.log(this.postForm.uiConfigOption.shopAppColors.mainSpaceColor);
    
      let alwefweRedFactor = parseInt(hexadecimalwefweCode.slice(1, 3), 16);
      let alwefweGreenFactor = parseInt(hexadecimalwefweCode.slice(3, 5), 16);
      let alwefweBlueFactor = parseInt(hexadecimalwefweCode.slice(5, 7), 16);
      // chatbotalwefweColor = `rgb(${alwefweRedFactor}, ${alwefweGreenFactor}, ${alwefweBlueFactor})`;


      let wefwefewfwef = this.postForm.uiConfigOption.shopAppColors.inputBoxColor;
      console.log(this.postForm.uiConfigOption.shopAppColors.inputBoxColor);
    
      let wefwefewfwefRedFactor = parseInt(wefwefewfwef.slice(1, 3), 16);
      let wefwefewfwefGreenFactor = parseInt(wefwefewfwef.slice(3, 5), 16);
      let wefwefewfwefBlueFactor = parseInt(wefwefewfwef.slice(5, 7), 16);
      // chatbotHeaderColor = `rgb(${wefwefewfwefRedFactor}, ${wefwefewfwefGreenFactor}, ${wefwefewfwefBlueFactor})`;


      let mklmklmklmk = this.postForm.uiConfigOption.shopAppColors.userMessageBoxColor;
      console.log(this.postForm.uiConfigOption.shopAppColors.userMessageBoxColor);
    
      let mklmklmklmkRedFactor = parseInt(mklmklmklmk.slice(1, 3), 16);
      let mklmklmklmkGreenFactor = parseInt(mklmklmklmk.slice(3, 5), 16);
      let mklmklmklmkBlueFactor = parseInt(mklmklmklmk.slice(5, 7), 16);
      // chatbotHeaderColor = `rgb(${mklmklmklmkRedFactor}, ${mklmklmklmkGreenFactor}, ${mklmklmklmkBlueFactor})`;


      let aqaqaqaqwaqaqa = this.postForm.uiConfigOption.shopAppColors.answerMessageBoxColor;
      console.log(this.postForm.uiConfigOption.shopAppColors.answerMessageBoxColor);
    
      let aqaqaqaqwaqaqaRedFactor = parseInt(aqaqaqaqwaqaqa.slice(1, 3), 16);
      let aqaqaqaqwaqaqaGreenFactor = parseInt(aqaqaqaqwaqaqa.slice(3, 5), 16);
      let aqaqaqaqwaqaqaBlueFactor = parseInt(aqaqaqaqwaqaqa.slice(5, 7), 16);
      // chatbotHeaderColor = `rgb(${aqaqaqaqwaqaqaRedFactor}, ${aqaqaqaqwaqaqaGreenFactor}, ${aqaqaqaqwaqaqaBlueFactor})`;







      const keywordAppUiConfigOption = {
        shopAppTitle: this.postForm.uiConfigOption.shopAppTitle,
        shopAppColors: {
          headerColor: `rgb(${headerRedFactor}, ${headerGreenFactor}, ${headerBlueFactor})`,
          mainSpaceColor: `rgb(${alwefweRedFactor}, ${alwefweGreenFactor}, ${alwefweBlueFactor})`,
          inputBoxColor: `rgb(${wefwefewfwefRedFactor}, ${wefwefewfwefGreenFactor}, ${wefwefewfwefBlueFactor})`,
          userMessageBoxColor: `rgb(${mklmklmklmkRedFactor}, ${mklmklmklmkGreenFactor}, ${mklmklmklmkBlueFactor})`,
          answerMessageBoxColor: `rgb(${aqaqaqaqwaqaqaRedFactor}, ${aqaqaqaqwaqaqaGreenFactor}, ${aqaqaqaqwaqaqaBlueFactor})`
        }
      }


      console.log(this.postForm.appUseFor.appEventKeywordList);


      const keywordAppUseFor = {
        appUseFor: "appforeventspec",
        appEventKeywordList: this.postForm.appUseFor.appEventKeywordList,
        remainedTrialCount: this.postForm.appUseFor.remainedTrialCount,
        totalChanceKeywordChallenge: this.postForm.appUseFor.totalChanceKeywordChallenge
      }


      const confirmPrompt = "정말로 모든 변경 사항을 적용하시겠습니까?";



      if(this.useConfirmHandler(confirmPrompt) === true) {
        await axios.post("/app/changeeachshopconfig", {
          shopId: window.cafe24aimedisonkeywordappshopid,
          greeting: this.postForm.greeting,
          appUseFor: keywordAppUseFor,
          uiConfigOption: keywordAppUiConfigOption
        })
      }


    },



    addTargetKeyword() {
      this.$store.commit("aimedison/addKeywordShopAimedison", {
        value: this.targetKeyword,
        keywordId: "eventkeyword" + Date.now()
      });




     

      setTimeout(() => {
        console.log(window.document.querySelectorAll(".cell"))

        if(window.document.querySelectorAll(".cell")) {
          if(window.document.querySelectorAll(".cell").length > 0) {
            for(let i = 0; i < window.document.querySelectorAll(".cell").length; i++) {
              window.document.querySelectorAll(".cell")[i].style.paddingLeft = "0px";
              window.document.querySelectorAll(".cell")[i].style.paddingRight = "0px";
            }
          }
        }
      }, 5);

    },



    removeTargetKeyword(eachId) {
      // this.postForm.appUseFor.appEventKeywordList = this.postForm.appUseFor.appEventKeywordList.filter((item) => item.keywordId !== eachId)




      // console.log(this.postForm.appUseFor.appEventKeywordList)
      
    },



    useConfirmHandler(confirmMessage) {
      const resultByUser = window.confirm(confirmMessage);


      
      return resultByUser;

    },


    applyResponsiveStyle() {
      document.getElementById("submitchangebutton")
     

      if (window.innerWidth < 768) {
        document.getElementById("submitchangebutton").style.marginLeft = "100px";
      
      } else {
        document.getElementById("submitchangebutton").style.marginLeft = "300px";
      
      }
    },








    fetchData(id) {
      fetchArticle(id).then(response => {
        this.postForm = response.data

        // just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`
        this.postForm.content_short += `   Article Id:${this.postForm.id}`

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Edit Article'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    getRemoteUserList(query) {
      searchUser(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 0px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
