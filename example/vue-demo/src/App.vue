<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import Bridge from "gatebridge-demo";

export default {
  name: 'App',
  created () {
    Vue.prototype.$bridge = new Bridge({
      assetApplyLink: 'https://www.gateio.pro',
      gateLink: 'https://www.gateio.pro',
      chainRule: { // 跨链白名单
        '5->1337': {
          tips: '',
          destChainId: 78
        },
        '1337->5': {
          tips:'Gate.io has supported asset exchange between different chains with lower service fees. Deposit your asset and withdraw what you want.',
          destChainId: 5
        }
      },
      pairs: [
        {
          name: 'Ethereum',
          chainId: 5,
          symbol: 'ETH',
          logo:  '',
          bridgeAddress: '0x219e350a5b58612BF968aa1F5aFF1e52856d687a',
          handler: '0x8922A6e52c35982cA598c4d1a725eE3775127ABa',
          decimals: 18,
          assetList: [
            {
              symbol: "WENUS",
              name: "wenus",
              logo: '',
              decimals: "18",
              address: '0xaFF4481D10270F50f203E0763e2597776068CBc5'
            },
          ]
        },
        {
          name: 'GateChain',
          chainId: 1337,
          symbol: 'GT',
          logo:  '',
          decimals: 18,
          bridgeAddress: '0x830C57Bc09f137eF2cFC7c3797aA62FDA071c94A',
          handler: '0x417306de14Bf393DF5d747ee555F8D4d2C3c3D83',
          assetList: [
            {
              symbol: "WENUS",
              name: "wenus",
              logo: '',
              decimals: "18",
              address: '0x2d2490D29DBBCC0751033A76fE7906D63140Ce2d'
            },
          ]
        },
      ]
    });
  }
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
</style>
