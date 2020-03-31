//启动webim

import websdk from 'easemob-websdk'

// init DOMParser / document for strophe and sdk
let WebIM = window.WebIM || {}

WebIM.conn = new websdk.connection({
  isHttpDNS: WebIM.config.isHttpDNS,
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: WebIM.config.https,
  url: WebIM.config.xmppURL,
  isAutoLogin: false,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  isStropheLog: WebIM.config.isStropheLog,
  delivery: WebIM.config.delivery,
  appKey: WebIM.config.appkey
})

export default WebIM
