/* eslint-disable object-curly-spacing */
import {setToken, setUser} from '@/utils/cache'

const user = {
  state: {
    token: null,
    userInfo: null
  },

  mutations: {
    setToken: (state, token) => {
      state.token = token
      setToken(token)
    },
    setUser: (state, userInfo) => {
      state.userInfo = userInfo
      setUser(userInfo)
    }
  }
}

export default user
