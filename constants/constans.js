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

const links = {
	start: 'https://i.pinimg.com/originals/e1/10/fd/e110fde3397a6562f298bbb523720145.gif',
	porabodyashitb: 'https://media1.tenor.com/images/a37427a9b3ef5d3d121c9092be96543a/tenor.gif?itemid=5606830',
	anagram: 'https://media1.giphy.com/media/xTiTnpZBALuuuwyzw4/giphy.gif',
};

module.exports = {
	token,
	endpoints,
	telegramBotOptions,
	links,
};
