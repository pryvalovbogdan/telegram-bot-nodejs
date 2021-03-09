const dictionary = require('websters-english-dictionary');
const debug = obj => JSON.stringify(obj, null, 4);

const factorial = num => {
	if (num === 0) return 1;

	return num * factorial(num - 1);
};

const getAnagram = word => {
	console.log('word', word);
	if (!word || word.includes(' ') || word.length > 8) {
		return ['no spaces, length of word less 8 symbols and more than 3'];
	}

	const words = Object.keys(dictionary.dictionary());

	const wordsSameLength = words.filter(item =>
		item.length <= word.length && item.length >= 3 && !item.includes('-'));

	const anagramCases = factorial(word.length);
	const res = [];

	let tempWord = word.split('');

	for (let i = 0; i < anagramCases; i++ ) {
		for (let j = 0; j < word.length; j++) {
			for (let l = 1; l < word.length + 1; l++) {
				const temp = tempWord[j];
				tempWord[j] = tempWord[l];
				tempWord[l] = temp;

				const someWord = tempWord.filter(el => el != null).join('');

				if (!res.includes(someWord)) {
					res.push(someWord)
				}
			}
		}
	}

	const count = word.length - 3;
	const temp2 = [...res];

	for (let e = 0; e <= count; e++) {
		for (let k = 0; k < res.length; k++) {
			if (temp2[k] && !res.includes(temp2[k].slice(0, temp2[k].length - e))) {
				res.push(temp2[k].slice(0, temp2[k].length - e))
			}
		}
	}

	const finalRes = [];
	wordsSameLength.forEach(item => res.forEach(some => {
		if (item === some && item !== word) {
			finalRes.push(item)
		}
	}));

	return finalRes;
};

module.exports = {
	debug,
	getAnagram,
};
