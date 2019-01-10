// Import libraries we need.
// import { default as Web3 } from 'web3'
// import { default as contract } from 'truffle-contract'
var Web3 = require("web3")
var contract = require("truffle-contract")
// var JSON = require("JSON")
// Import our contract artifacts and turn them into usable abstractions.
// import C2CTestArtifact from '../../build/contracts/C2CTest.json'
var C2CTestArtifact = require('./../../build/contracts/C2CTest.json')
// C2CTest is our usable abstraction, which we'll use through the code below.

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
let web3
contract_address = "0x548f5fdb6cd0bbe788fc35b301c00f7b72db3635"

App = {
	web3Provider : null,	
	web3 : null,
	contract : {},
	start: function () {
		if (App.web3Provider == null){
	    	App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
	    }
	    // Bootstrap the MetaCoin abstraction for Use.
	    App.web3 = new Web3(App.web3Provider)
	    // App.web3.eth.getAccounts()
	    var MyContract = new App.web3.eth.Contract(C2CTestArtifact.abi , contract_address)
	    MyContract.setProvider(App.web3Provider)

	   	// console.log(MyContract)
	   	return MyContract
	 },
	 // return a promise // need to make func then(func)
	newAccount : function(password){
		App.start()
		return App.web3.eth.accounts.create(password)
	},
	orderMake :  function( buyer , seller , price , id , gas_num ,  func ){
		var instance = App.start()
		instance.methods.order_make(seller , id)
		.send({from : buyer , value : price , gas: gas_num , gas_limit : 300000})
		.on('transactionHash', func)
		.on("error" , console.log)
	},
	orderConfirm : function(buyer  , id , gas_num){
		var instance = App.start()
		
		instance.methods.order_confirm(id)
		.send({from : sender , gas : gas_num})
		.catch(console.log)
		.on("error" , console.log)
	},
	getOrderList : function(buyer , index , func){
		var instance = App.start()

		instance.methods.global_map(buyer , index)
		.call({from : buyer})
		.then(func)
		.catch(console.log)
	},
	getOrderLength : function(buyer , func){
		var instance = App.start()

		instance.methods.length(buyer)
		.call({from : buyer})
		.then(func)
		.catch(console.log)
	}


}

// console.log(App.newAccount("TEST").address)
// App.newAccount("test").then(console.log)\\\ // make newAccount



var sender = "0xcddec329f48c08d652c3f3ce6f1f184f1c77b579"
// var seller = "0x014eec7f4a1ccbc06855b93a6456aeb92857a6f5"
// var id = 3
// var value = 9000
// App.orderMake(sender , seller , value , id , 130000 , console.log)

// // console.log(C2CTest)
// while(App.transactionHash[0] == null){
// 	setTimeout(function(){ console.log("Hello"); }, 3000);
// }
// console.log(App.transactionHash[0])

App.getOrderList(sender , 0)