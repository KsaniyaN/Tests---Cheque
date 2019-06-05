//----- converting an integer into words
function convertNumbersToWords(rawNumber) {
	let num = rawNumber;

	// word templates, English locale
	const upToTwenty = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ',
		'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ',
		'nineteen '];
	const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
	const thousandMillion = ['thousand', 'million', ''];
	let words = '';

	// make number into a predictable nine character string
	num = ('000000000' + num.toString())
	// extract characters from the end of the string
		.substr(-9)
		// split string into chunks of three numbers then reverse order of returned array
		.match(/.{3}/g);
	console.log(`num = ${num}`);

	//----- iterate through the chunks of num, build a string
	for (let i = 0; i < thousandMillion.length; i++) {
		let n = num[i],
			str = '';
		console.log(`n = num[${i}] ${n}`);

		//----- building a string
		// check if there are millions or thousands
		if (words !== '') {
			let bigNumberCurrentWord = thousandMillion[thousandMillion.length - 1 - i];
			str += ' ' + bigNumberCurrentWord + ', ' ;
		}
		// check if there are hundreds
		if (n[0] != 0) {
			let hundredsToNumber = Number(n[0]);
			str += (upToTwenty[hundredsToNumber] + 'hundred and ');
		}
		// going down to 2 digit numbers
		n = n.substr(1);
		if (n != 0) {
			let tensCurrentWord = tens[n[0]],
				digitsCurrentWord = upToTwenty[n[1]];

			str += tensCurrentWord + ' ' + digitsCurrentWord;
		}

		words += str;
	}

	return words;
}

//----- checking if there is a decimal part in amount,
// combining the whole part and the decimal
function numbersToWords(rawNumber) {
	// currency values
	const currency = ['dollars', 'cents'];

	let num = rawNumber.toString().split('.');
	let whole = convertNumbersToWords(num[0]);
	let words = '';

	if (num.length == 2) {
		let fraction = convertNumbersToWords(num[1]);
		words += whole + ' ' + currency[0] + ' and ' + fraction + ' ' + currency[1];
	} else {
		words += whole + currency[0];
	}

	// tidying up the spaces
	words = words.replace(/ +/g, ' ').replace(/ $/, '')
	// convert to capitals
		.toUpperCase();

	return words
}

