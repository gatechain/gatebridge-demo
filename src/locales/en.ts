export  default  {
	'from': 'From',
	'to': 'To',
	'asset': 'Asset',
	'amount': 'Amount',
	'available':'Available',
	'receive1': 'You will receive',
	'receive2': 'on',
	'max': 'Max',
	'destination': 'Destination',
	'destinationDesc': function(t: string){
		return `This is the destination address of ${t} network`;
	},
	'fee': 'Service Fee',
	'feeDesc':  function(t: string){
		return `The fee use to send token to your destination address from the contract on ${t} network`;
	},
	'approve': 'Approve',
	'next': 'Next',
	'connect': 'Connect wallet',
	'bridgeDesc': 'Cross-chain BTC, BCH and other assets to GATECHAIN network, please go to',
	'address':'Address',
	'selectToken': 'Select token',
	'search': 'Search name or paste address',
	'supported1': 'this asset is not supported，',
	'supported2': 'to apply',
	'click': 'click here',
	'confirm': 'Confirm',
	'notExchanged': 'two chains that cannot be exchanged',
	'notMatch': 'the MetaMask trading network does not match the network you are currently connected to',
	'noOrders': 'No orders!',
	'network': 'Network',
	'errorAddress': 'the address cannot be empty or properly formatted'
}