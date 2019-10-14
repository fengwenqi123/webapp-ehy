const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  expInfo: state => state.expDetails.expInfo,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  selected_qyg: state => state.gyt.selected_qyg,
  selected_mdg: state => state.gyt.selected_mdg,
  selected_pier: state => state.gyt.selected_pier,
  selected_zxh: state => state.gyt.selected_zxh,
  selected_goods: state => state.gyt.selected_goods,
  selected_zzd: state => state.gyt.selected_zzd,
  shipName: state => state.gyt.shipName,
  boxInfos: state => state.gyt.boxInfos,
  userInfos: state => state.gyt.userInfos,
  recoveryInfo: state => state.recovery.recoveryInfo,
  recoveryCode: state => state.recovery.recoveryCode,
  eshipName: state => state.recovery.eshipName
}
export default getters
