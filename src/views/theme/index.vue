<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header">
        <a class="link-type link-title" target="_blank" >
          앱 설치 관리
        </a>
      </div>
      <div class="box-item">
        <!-- <span class="field-label">Change Theme : </span> -->

        <!-- <el-button type="primary">
          Primary
        </el-button>
        <el-button type="success">
          Success
        </el-button> -->

        <el-button type="primary"      v-if="isAppInstalledFromServer === false"     @click="requestInsertScriptInService">
          설치
        </el-button>
        <el-button type="primary"      v-else-if="isAppInstalledFromServer === true && isAppDisplayingFromServer === false"      @click="SetReInstallAppService">
          재설치
        </el-button>
        <el-button type="primary"       v-else-if="isAppDisplayingFromServer === true"      @click="deactivateAppService">
          설치 해제
        </el-button>


        <!-- <el-switch v-model="theme" /> -->
        <aside style="margin-top:15px;">
          이 앱에 대한 설명
        </aside>
      </div>
    </el-card>




    <!-- <div class="block">
      <el-button type="primary">
        Primary
      </el-button>
      <el-button type="success">
        Success
      </el-button>
      <el-button type="info">
        Info
      </el-button>
      <el-button type="warning">
        Warning
      </el-button>
      <el-button type="danger">
        Danger
      </el-button>
    </div>

    <div class="block">
      <el-button type="primary" icon="el-icon-edit" />
      <el-button type="primary" icon="el-icon-share" />
      <el-button type="primary" icon="el-icon-delete" />
      <el-button type="primary" icon="el-icon-search">
        Search
      </el-button>
      <el-button type="primary">
        Upload
        <i class="el-icon-upload el-icon-right" />
      </el-button>
    </div>

    <div class="block">
      <el-tag v-for="tag in tags" :key="tag.type" :type="tag.type" class="tag-item">
        {{ tag.name }}
      </el-tag>
    </div>

    <div class="block">
      <el-radio-group v-model="radio">
        <el-radio :label="3">
          Option A
        </el-radio>
        <el-radio :label="6">
          Option B
        </el-radio>
        <el-radio :label="9">
          Option C
        </el-radio>
      </el-radio-group>
    </div>

    <div class="block">
      <el-slider v-model="slideValue" />
    </div> -->





  </div>
</template>

<script>
import axios from 'axios'
import { toggleClass } from '@/utils'
import '@/assets/custom-theme/index.css' // the theme changed version element-ui css

export default {
  name: 'Theme',
  data() {
    return {
      theme: false,
      tags: [
        { name: 'Tag One', type: '' },
        { name: 'Tag Two', type: 'info' },
        { name: 'Tag Three', type: 'success' },
        { name: 'Tag Four', type: 'warning' },
        { name: 'Tag Five', type: 'danger' }
      ],
      slideValue: 50,
      radio: 3,

      isAppInstalledFromServer: true,
      isAppDisplayingFromServer: true,






    }
  },
  watch: {
    theme() {
      toggleClass(document.body, 'custom-theme')
    }
  },



  async mounted() {
    await this.bringKeywordAppInstallStatus()



  },



  methods: {

    async bringKeywordAppInstallStatus() {
      let resFromKeywordAppServer = await axios.post("/app/checkshopexist", {
        shopId: window.cafe24aimedisonkeywordappshopid
      })





      // console.log(resFromKeywordAppServer);
      console.log(resFromKeywordAppServer.data);
      console.log(resFromKeywordAppServer.data.isAppInstalled);
      console.log(resFromKeywordAppServer.data.isAppDisplaying);

      this.isAppInstalledFromServer = resFromKeywordAppServer.data.isAppInstalled;
      this.isAppDisplayingFromServer = resFromKeywordAppServer.data.isAppDisplaying;


    },

    async requestInsertScriptInService() {
      const confirmPrompt = "정말로 이 앱을 설치하시겠습니까?";



      if(this.useConfirmHandler(confirmPrompt) === true) {
        let responseFromAppScript = await axios.post("/app/insertscript", {
          urlSearchKey: window.cafe24aimedisonkeywordappshopid
        });
        


        
        // console.log(responseFromAppScript);
        console.log(responseFromAppScript.data);

        window.location.href = "";

      }

    },


    async deactivateAppService() {
      const confirmPrompt = "정말로 이 앱의 설치를 해제하시겠습니까?";


      
      if(this.useConfirmHandler(confirmPrompt) === true) {
        let resultFromDeact = await axios.post("/app/deactivate", {
          shopId: window.cafe24aimedisonkeywordappshopid
        });
        


        console.log(resultFromDeact);

        window.location.href = "";

      }

    },

    async SetReInstallAppService() {
      const confirmPrompt = "정말로 이 앱을 재설치하시겠습니까?";

      
      
      if(this.useConfirmHandler(confirmPrompt) === true) {
        let resultFromDeact = await axios.post("/app/reinstallapp", {
          shopId: window.cafe24aimedisonkeywordappshopid
        });
        

        
        console.log(resultFromDeact);

        window.location.href = "";

      }

    },






    useConfirmHandler(confirmMessage) {
      const resultByUser = window.confirm(confirmMessage);


      
      return resultByUser;

    },












  },



}
</script>

<style scoped>
.field-label{
  vertical-align: middle;
}
.box-card {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
}

.block {
  padding: 30px 24px;
}

.tag-item {
  margin-right: 15px;
}
</style>
