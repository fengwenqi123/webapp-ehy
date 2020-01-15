/* eslint-disable object-curly-spacing */

const mall = {
  state: {
    goods: null,
    price: null,
    address: null,
    mallShipName: null,
    integral: null
  },
  mutations: {
    setGoods: (state, goods) => {
      state.goods = goods
    },
    setPrice: (state, price) => {
      state.price = price
    },
    setAddress: (state, address) => {
      state.address = address
    },
    setMallShipName: (state, mallShipName) => {
      state.mallShipName = mallShipName
    },
    setIntegral: (state, integral) => {
      state.integral = integral
    }
  }
}

export default mall
