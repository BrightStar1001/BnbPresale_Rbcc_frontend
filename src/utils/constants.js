import { formatEther, formatUnits } from 'viem';

export const changeColor = (key, value) => {
	document.documentElement.style.setProperty(key, value);
};

export const getFormattedUnits = (val, decimals = 0) => {
	let formatted = formatUnits(val, decimals);
	return parseNumber(formatted);
};

export const parseNumber = (n, digits = 10) => {
	if (isNaN(n)) return 0;
	return parseInt((n * 10 ** digits).toString()) / 10 ** digits;
};

export const getContractResult = (result, decimals = 18) => {
	if (result.status !== 'success') {
		console.log(result.error);
		return 0;
	}
	return getFormattedUnits(result.result, decimals);
};

export const getFormattedDisplayNumber = (val, decimals = 3) => {
	console.log('getFormattedDisplayNumber--', val);
	return Number(Number.parseFloat(val).toFixed(decimals));
};

export const getFormattedDisplayAddress = (add) => {
	if (!add || add.length < 42) return 'Invalid Address';
	return `${add.substring(0, 6)}...${add.substring(
		add.length - 4,
		add.length
	)}`;
};

export const getErrorMessage = (data) => {
	if (!data || !data.message) return 'Transaction Failed';
	const temp1 = data.message.split('\n\n');
	if (temp1.length === 0) return 'Transaction Failed';
	const temp2 = temp1[0].split(':\n');
	return temp2[temp2.length - 1];
};

export const calculateAPR = (principal, financeCharges, paymentPeriods) => {
	// let apr = (2 * paymentPeriods * financeCharges) / (principal * (paymentPeriods + 1));
	let apr = (2 * paymentPeriods * financeCharges) / (principal * (10 + 1));
	return apr;
};
