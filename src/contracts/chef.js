const ChefContract = {
    address: {
        5: "0xCDF084aE63d5f074591651bb84B203e2190160AA"
    },
    abi: [{
        "inputs": [{
            "internalType": "contract IBenkeiToken",
            "name": "_benkei",
            "type": "address"
        }, {
            "internalType": "contract IUniswapPair",
            "name": "_benkeiLp",
            "type": "address"
        }, {
            "internalType": "contract IUniswapV2Router",
            "name": "_router",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_rewardPerBlock",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_startBlock",
            "type": "uint256"
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
            "indexed": true,
            "internalType": "uint256",
            "name": "pid",
            "type": "uint256"
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
            "indexed": true,
            "internalType": "uint256",
            "name": "pid",
            "type": "uint256"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "allocPoint",
            "type": "uint256"
        }, {
            "indexed": true,
            "internalType": "contract IERC20",
            "name": "lpToken",
            "type": "address"
        }],
        "name": "LogPoolAddition",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }],
        "name": "LogRewardPerBlock",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "uint256",
            "name": "pid",
            "type": "uint256"
        }, {
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
            "internalType": "uint256",
            "name": "pid",
            "type": "uint256"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "allocPoint",
            "type": "uint256"
        }],
        "name": "LogSetPool",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "uint256",
            "name": "pid",
            "type": "uint256"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "lastRewardBlock",
            "type": "uint256"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "lpSupply",
            "type": "uint256"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "accRewardPerShare",
            "type": "uint256"
        }],
        "name": "LogUpdatePool",
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
            "indexed": true,
            "internalType": "uint256",
            "name": "pid",
            "type": "uint256"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }],
        "name": "RewardPaid",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
        }, {
            "indexed": true,
            "internalType": "uint256",
            "name": "pid",
            "type": "uint256"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }],
        "name": "Withdraw",
        "type": "event"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_allocPoint",
            "type": "uint256"
        }, {
            "internalType": "contract IERC20",
            "name": "_lpToken",
            "type": "address"
        }, {
            "internalType": "bool",
            "name": "_withUpdate",
            "type": "bool"
        }],
        "name": "add",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
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
        "inputs": [],
        "name": "benkeiLp",
        "outputs": [{
            "internalType": "contract IUniswapPair",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_pid",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_account",
            "type": "address"
        }],
        "name": "claim",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "principal",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "ratio",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "n",
            "type": "uint256"
        }],
        "name": "compound",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "pure",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_amountTokenDesired",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_amountTokenMin",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_amountETHMin",
            "type": "uint256"
        }],
        "name": "compoundBig",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "compoundRatio",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "compoundSmol",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_pid",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_account",
            "type": "address"
        }],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "lastBlock",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "lockDurations",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "massUpdatePools",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "inputs": [{
            "internalType": "uint256",
            "name": "_pid",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "_user",
            "type": "address"
        }],
        "name": "pendingReward",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "poolInfo",
        "outputs": [{
            "internalType": "contract IERC20",
            "name": "lpToken",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "allocPoint",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "lastRewardBlock",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "accRewardPerShare",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "poolLength",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "int128",
            "name": "x",
            "type": "int128"
        }, {
            "internalType": "uint256",
            "name": "n",
            "type": "uint256"
        }],
        "name": "pow",
        "outputs": [{
            "internalType": "int128",
            "name": "r",
            "type": "int128"
        }],
        "stateMutability": "pure",
        "type": "function"
    }, {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "rewardPerBlock",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "router",
        "outputs": [{
            "internalType": "contract IUniswapV2Router",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_pid",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "_allocPoint",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "_withUpdate",
            "type": "bool"
        }],
        "name": "set",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_pid",
            "type": "uint256"
        }, {
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
        "name": "startBlock",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "totalAllocPoint",
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
            "internalType": "uint256",
            "name": "_pid",
            "type": "uint256"
        }],
        "name": "updatePool",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "_rewardPerBlock",
            "type": "uint256"
        }],
        "name": "updateRewardPerBlock",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }, {
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
            "name": "rewardDebt",
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
            "name": "_pid",
            "type": "uint256"
        }, {
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

export default ChefContract