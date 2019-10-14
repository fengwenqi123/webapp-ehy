/* eslint-disable object-curly-spacing */

const recovery = {
  state: {
    recoveryInfo: null,
    recoveryCode: null,
    eshipName: null
  },
  mutations: {
    setRecoveryInfo: (state, obj) => {
      state.recoveryInfo = obj
    },
    setrecoveryCode: (state, obj) => {
      state.recoveryCode = obj
    },
    seteshipName: (state, shipName) => {
      state.eshipName = shipName
    }
  }
}

export default recovery
