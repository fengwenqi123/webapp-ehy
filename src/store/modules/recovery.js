/* eslint-disable object-curly-spacing */

const recovery = {
  state: {
    recoveryInfo: null,
    recoveryCode: null
  },
  mutations: {
    setRecoveryInfo: (state, obj) => {
      state.recoveryInfo = obj
    },
    setrecoveryCode: (state, obj) => {
      state.recoveryCode = obj
    }
  }
}

export default recovery
