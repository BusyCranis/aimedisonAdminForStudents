// import Cookies from 'js-cookie'

const state = {

  aimedisonKeywordUserList: [],

  recentScsdChatHistoryOfSlctdUser: [],

  currentSelectedUserId: "",

  keywordShopAimedison: [],


}

const mutations = {

  setAimedisonKeywordUserList: (state, payload) => {
    state.aimedisonKeywordUserList = payload
  },

  setRecentScsdChatHistoryOfSlctdUser: (state, payload) => {
    state.recentScsdChatHistoryOfSlctdUser = payload
  },

  setCurrentSelectedUserId: (state, payload) => {
    state.currentSelectedUserId = payload
  },



  setKeywordShopAimedison: (state, payload) => {
    state.keywordShopAimedison = payload
  },


  addKeywordShopAimedison: (state, payload) => {
    state.keywordShopAimedison.push(payload);
  },


  changeKeywordShopAimedison: (state, payload) => {
    state.keywordShopAimedison = state.keywordShopAimedison.filter(item => item.keywordId !== payload);
  },

  removeKeywordShopAimedison: (state, payload) => {
    state.keywordShopAimedison = state.keywordShopAimedison.filter(item => item.keywordId !== payload);
  },



}

const actions = {
//   toggleSideBar({ commit }) {
//     commit('TOGGLE_SIDEBAR')
//   },
//   closeSideBar({ commit }, { withoutAnimation }) {
//     commit('CLOSE_SIDEBAR', withoutAnimation)
//   },
//   toggleDevice({ commit }, device) {
//     commit('TOGGLE_DEVICE', device)
//   },
//   setSize({ commit }, size) {
//     commit('SET_SIZE', size)
//   }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
