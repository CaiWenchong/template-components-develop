// 10进制数子转62进制字符串
function decimalToBase62(number, bit = 6) {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let code = '';
	while (number > 0) {
		const remainder = number % 62;
		code = alphabet[remainder] + code;
		number = Math.floor(number / 62);
	}
	return code.padStart(bit, '0');
}
// 62进制字符串反转10进制数字
function base62ToDecimal(code) {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let number = 0;
	for (let i = 0; i < code.length; i++) {
		const char = code[i];
		const digit = alphabet.indexOf(char);
		number = number * 62 + digit;
	}
	return number;
}

export default {
	decimalToBase62,
	base62ToDecimal
}