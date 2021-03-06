const TelegramBot = require('node-telegram-bot-api');
console.log('Bot have been started');
const token = '1662367182:AAHUwIfdJTSqChGj4ijupXSL9XrEbOkfNms';
const debug = require('./helpers');
const bot = new TelegramBot(token, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10,
    }
  },
});

bot.onText(/\/start/, msg => {
  const { id } = msg.chat;

  bot.sendMessage(id, `Zdravstvyi pizduk ${msg.from.first_name} https://i.pinimg.com/originals/e1/10/fd/e110fde3397a6562f298bbb523720145.gif`);
});
const endpoints = [ { name: '/start', description: 'start to work with bot'},
  { name: '/helppizdyk', description: 'to see all commands'},
  { name: '/porabodyashitb', description: 'work on debug'},
  { name: '/endpizdesh', description: 'stop working'},
  { name: '/checkpizduk', description: 'are you pizduk'},
  { name: '/inlinekeyboard', description: 'check inline'},
];

bot.onText(/\/helppizdyk/, msg => {
  const { id } = msg.chat;

  const html = `
    <strong>Commands: </strong>
    ${endpoints.map(item => `
      <b>${item.name}</b><b> - ${item.description}</b>`)}
    `;
  bot.sendMessage(id, html, {
    parse_mode: 'HTML'
  });
});

bot.onText(/\/endpizdesh/, msg => {
  const { id } = msg.chat;

  bot.sendMessage(id, `Poka rodnoy ${msg.from.username} https://media0.giphy.com/media/UU2VKeTNOgFFoYiAIp/giphy.gif`);
});

bot.onText(/\/porabodyashitb/, msg => {
  const { id } = msg.chat;

  bot.sendMessage(id, 'Zavarivay 4ayek mi na4inaem, https://media1.giphy.com/media/xTiTnpZBALuuuwyzw4/giphy.gif', {
    disable_notification: true,
  });
});

bot.onText(/\/checkpizduk/, msg => {
  const { id } = msg.chat;
  bot.sendMessage(id, 'Are you Pizduk...', {
    reply_markup: {
      keyboard: [
        [{
          text: 'Gde pizduk?',
          request_location: true,
        }],
        ['yes', 'no'],
        ['Pizduk'],
      ],
      one_time_keyboard: true,
    }
  })
});

bot.onText(/\/inlinekeyboard/, msg => {
  const { id } = msg.chat;
  bot.sendMessage(id, 'Are you Pizduk...', {
    reply_markup: {
      inline_keyboard: [
        [{
          text: 'Google',
          url: 'https://www.google.ru/',
        }],
        [
          {
            text: 'Reply',
            callback_data: 'Reply',
          },
          {
            text: 'Forward',
            callback_data: 'Forward',
          },
          {
            text: 'Edit',
            callback_data: 'Edit',
          }
        ]
      ],
      one_time_keyboard: true,
    }
  })
});

bot.on('callback_query', query => {
  // bot.sendMessage(query.message.chat.id, debug(query));
  const  { chat, message_id, text } = query.message;

  switch(query.data) {
    case 'Forward' :
      bot.forwardMessage(chat.id, chat.id, message_id);
      break;
    case 'Reply' :
      bot.sendMessage(chat.id, 'some answer', {
        reply_to_message_id: message_id
      });
      break;
    default:
      break;
  }

  bot.answerCallbackQuery(query.id, `${query.data}`);
});

bot.on('message', (msg) => {
  const { id } = msg.chat;
  // console.log('msg', msg);
  switch (msg.text) {
    case 'no':
      bot.sendMessage(id, 'close keyboard', {
        reply_markup: {
          remove_keyboard: true,
        }
      });
      break;
    case 'yes':
      bot.sendMessage(id, 'close keyboard', {
        reply_markup: {
          force_reply: true,
        }
      });
      break;
    default:
      break;
  }
});
