export  default  {
   'from': '从',
   'to': '到',
   'asset': '资产',
   'amount': '数量',
   'available':'可用余额',
   'receive1': '您将收到',
   'receive2': '在',
   'max': '最大',
   'destination': '接收地址',
   'destinationDesc': function(t: string){
      return `这是你在${t}网络的接收地址`;
   },
   'fee': '服务费',
   'feeDesc':  function(t: string){
      return `这是跨链过程所产生交易的矿工费在${t}网络`;
   },
   'approve': '授权',
   'next': '下一步',
   'connect': '链接钱包',
   'bridgeDesc': '跨链BTC、BCH等资产至GateChain网络，请前往',
   'address':'地址',
   'selectToken': '选择 token',
   'search': '搜索名称或者地址',
   'supported1': '不支持此资产，',
   'supported2': '添加',
   'click': '跳转',
   'confirm': '确定',
   'notExchanged': '当前网络无法兑换',
   'notMatch': '交易网络与您当前连接网络不一致'
}