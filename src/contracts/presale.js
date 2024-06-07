const CALPresaleContract = {
	address: {
		// 5: "0x38996d2a0f3b773764fd562a5909e380cbeac095",
		// 1: "0x318ceec1819e0d2a0eb922b3d510f923005fd2a9",
		56: '0x799de9896C3DC074F8b05F3B610178D06E1f90B0',
		97: '0x02e09ECFc5e3Aa7dA3F3b5bABBb363b2713e6211',
	},
	abi: [
		{
			inputs: [
				{
					internalType: 'address',
					name: 'usdt',
					type: 'address',
				},
				{
					internalType: 'address',
					name: 'token',
					type: 'address',
				},
			],
			stateMutability: 'nonpayable',
			type: 'constructor',
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'target',
					type: 'address',
				},
			],
			name: 'AddressEmptyCode',
			type: 'error',
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'account',
					type: 'address',
				},
			],
			name: 'AddressInsufficientBalance',
			type: 'error',
		},
		{
			inputs: [],
			name: 'FailedInnerCall',
			type: 'error',
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'token',
					type: 'address',
				},
			],
			name: 'SafeERC20FailedOperation',
			type: 'error',
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: false,
					internalType: 'uint256',
					name: 'bnbAmount',
					type: 'uint256',
				},
				{
					indexed: false,
					internalType: 'uint256',
					name: 'usdtAmount',
					type: 'uint256',
				},
				{
					indexed: false,
					internalType: 'uint256',
					name: 'price',
					type: 'uint256',
				},
				{
					indexed: false,
					internalType: 'uint256',
					name: 'rbccAmount',
					type: 'uint256',
				},
			],
			name: 'SoldRbcc',
			type: 'event',
		},
		{
			anonymous: false,
			inputs: [],
			name: 'StateChange',
			type: 'event',
		},
		{
			inputs: [],
			name: '_TotalClaimed',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [],
			name: '_claim',
			outputs: [
				{
					internalType: 'bool',
					name: '',
					type: 'bool',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: '_usdtAmount',
					type: 'uint256',
				},
			],
			name: 'buyTokensWithUSDT',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [],
			name: 'buyWithBNB',
			outputs: [],
			stateMutability: 'payable',
			type: 'function',
		},
		{
			inputs: [],
			name: 'claimRbcc',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'addr',
					type: 'address',
				},
			],
			name: 'getAddressBought',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'addr',
					type: 'address',
				},
			],
			name: 'getAddressInvestmentBNB',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'addr',
					type: 'address',
				},
			],
			name: 'getAddressInvestmentUSDT',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [],
			name: 'getBnbPrice',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [],
			name: 'getMaxPerWallet',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [],
			name: 'getMinPerWallet',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [],
			name: 'getRemainingTime',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [],
			name: 'getTotalBNB',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [],
			name: 'getTotalSold',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [],
			name: 'getTotalUSDT',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [],
			name: 'getTotalValue',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [],
			name: 'getpricePerToken',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: 'price',
					type: 'uint256',
				},
			],
			name: 'setBnbPrice',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: 'startTime',
					type: 'uint256',
				},
				{
					internalType: 'uint256',
					name: 'endTime',
					type: 'uint256',
				},
			],
			name: 'setTime',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [],
			name: 'withdrawBNB',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: '_amount',
					type: 'uint256',
				},
			],
			name: 'withdrawRemainingRBCC',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [],
			name: 'withdrawUSDT',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
	],
};

export default CALPresaleContract;
