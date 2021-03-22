###使用说明

1. 直接引用
``` base
<script src="../dist/index.js"></script>
const gateBridge = new window.GateBridgeDemo.default({...params})
```
2. NPM package
```
package.json
"gatebridge-demo": "file:../.."


import Bridge from "gatebridge-demo";
const gateBridge = new Bridge({...params})
```

###params

```js
{
  assetApplyLink : 'http://xxxx', //用户增加token地址
  gateLink: 'http://xxxx', //gate.io地址
  chainRule: { // 跨链白名单
    '1->66': {
        tips: ''
    },
    '66->1': {
        tips:'Gate.io has supported asset exchange between different chains with lower service fees. Deposit your asset and withdraw what you want.'
    }
  },
  pairs: [
    {
        name: 'Ethereum',
        chainId: 1,
        symbol: 'ETH',
        logo:  '',
        bridgeAddress: '',
        handler: '0xcA306fc3c3b28d837bf65f026fE8bE1cd42c0f38',
        decimals: 18,
        assetList: [
            {
                symbol: "USDT",
                logo: '',
                name: "USDT",
                decimals: "10",
                address: '0x65B954882BDC6efEf3eF2027027d895201236671',
                balance: 0
            },
        ]
    },
    {
        name: 'Ethereum',
        chainId: 1,
        symbol: 'ETH',
        logo:  '',
        bridgeAddress: '',
        handler: '0xcA306fc3c3b28d837bf65f026fE8bE1cd42c0f38',
        decimals: 18,
        assetList: [
            {
                symbol: "USDT",
                logo: '',
                name: "USDT",
                decimals: "10",
                address: '0x65B954882BDC6efEf3eF2027027d895201236671',
                balance: 0
            },
        ]
     },
 ]
}
```

### 方法
```js
const gateBridge = new Bridge({...params});
// 渲染跨链ui
gateBridge.renderExchange(document.getElementById('#app'));
gateBridge.renderExchange(); //不传包裹容器渲染到body
// 渲染订单列表
gateBridge.renderHistory(document.getElementById('#app'));
gateBridge.renderHistory(); //不传包裹容器渲染到body
```
