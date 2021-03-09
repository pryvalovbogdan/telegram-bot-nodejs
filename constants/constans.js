const token = '1560965662:AAExJkGoMuUMnzBgGuVgsRkEdqDWB-fb0q0';

const endpoints = [
	{ name: '/start', description: 'start to work with bot'},
	{ name: '/anagram word', description: 'put any word to get anagram of it'},
	{ name: '/helppizdyk', description: 'to see all commands'},
	{ name: '/porabodyashitb', description: 'work on debug'},
	{ name: '/endpizdesh', description: 'stop working'},
	{ name: '/inlinekeyboard', description: 'check inline'},
];

const telegramBotOptions = {
	polling: {
		interval: 300,
		autoStart: true,
		params: {
			timeout: 10,
		}
	}
};

module.exports = {
	token,
	endpoints,
	telegramBotOptions,
};
