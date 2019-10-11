/* eslint-disable object-curly-spacing */

const gyt = {
  state: {
    selected_qyg: null,
    selected_mdg: null,
    selected_pier: null,
    selected_zxh: null,
    selected_goods: null,
    selected_zzd: null,
    shipName: '',
    boxInfos: [],
    userInfos: null
  },
  mutations: {
    setUserInfo: (state, obj) => {
      state.userInfos = obj
      state.shipName = obj.shipName
    },
    set_boxInfo: (state, obj) => {
      state.boxInfos.push(obj)
    },
    edit_boxInfo: (state, obj) => {
      state.boxInfos.splice(obj.index, 1, obj.value)
    },
    delete_boxInfo: (state, index) => {
      state.boxInfos.splice(index, 1)
    },
    set_zxh: (state, obj) => {
      state.selected_zxh = obj
    },
    set_zzd: (state, number) => {
      state.selected_zzd = number
      console.log(state.selected_zzd)
    },
    set_qyg: (state, obj) => {
      if (state.selected_qyg && JSON.stringify(state.selected_qyg) !== JSON.stringify(obj)) {
        state.selected_mdg = null
        state.selected_pier = null
        state.selected_goods = null
      }
      state.selected_qyg = obj
    },
    set_mdg: (state, obj) => {
      if (state.selected_mdg && JSON.stringify(state.selected_mdg) !== JSON.stringify(obj)) {
        state.selected_pier = null
        state.selected_goods = null
      }
      state.selected_mdg = obj
    },
    set_pier: (state, obj) => {
      if (state.selected_pier && JSON.stringify(state.selected_pier) !== JSON.stringify(obj)) {
        state.selected_goods = null
      }
      state.selected_pier = obj
    },
    set_goods: (state, obj) => {
      state.selected_goods = obj
    },
    // 清除
    clear_zxh: state => {
      state.selected_zxh = null
    },
    clear_zzd: state => {
      state.selected_zzd = null
    },
    clear_qyg: state => {
      state.selected_qyg = null
    },
    clear_mdg: state => {
      state.selected_mdg = null
    },
    clear_pier: state => {
      state.selected_pier = null
    },
    clear_goods: state => {
      state.selected_goods = null
    },
    clear_boxInfo: state => {
      state.boxInfos = []
    }
  },
  actions: {
    clearAll: ({commit}) => {
      commit('clear_zxh')
      commit('clear_zzd')
      commit('clear_qyg')
      commit('clear_mdg')
      commit('clear_pier')
      commit('clear_goods')
      commit('clear_boxInfo')
    }
  }
}

export default gyt
