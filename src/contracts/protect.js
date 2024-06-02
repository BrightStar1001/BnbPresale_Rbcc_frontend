const ProtectContract = {
    address: {
        5: "0xd6eede3d305636d8139df31ccc146c0e1bbb9b8d"
    },
    abi: [{
        "inputs": [{
            "internalType": "contract IBenkeiToken",
            "name": "_benkei",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_lockDuration",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "_depositsEnabled",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }],
        "name": "Deposit",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "internalType": "bool",
            "name": "enabled",
            "type": "bool"
        }],
        "name": "LogSetDepositsEnabled",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "internalType": "uint256",
            "name": "lockDuration",
            "type": "uint256"
        }],
        "name": "LogSetLockDuration",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
        }],
        "name": "OwnershipTransferred",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }],
        "name": "Withdraw",
        "type": "event"
    }, {
        "inputs": [],
        "name": "Robocopcoin",
        "outputs": [{
            "internalType": "contract IBenkeiToken",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
        }],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "depositsEnabled",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "lockDuration",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "bool",
            "name": "_enabled",
            "type": "bool"
        }],
        "name": "setDepositsEnabled",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_lockDuration",
            "type": "uint256"
        }],
        "name": "setLockDuration",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "totalStaked",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
        }],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "name": "userInfo",
        "outputs": [{
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "lockEndedTimestamp",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
        }],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }]
}

export default ProtectContract