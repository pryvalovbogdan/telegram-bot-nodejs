const TelegramBot = require('node-telegram-bot-api');
const { debug, getAnagram } = require('./helpers/helpers');
const { token, endpoints, telegramBotOptions, links } = require('./constants/constans');
const fs = require('fs');

const bot = new TelegramBot(token, telegramBotOptions);

bot.onText(/\/start/, msg => {
  const { id } = msg.chat;
  const html = `
    <strong>Zdravstvyi pizduk ${msg.from.first_name}</strong>
    <strong>Commands: </strong>
    ${endpoints.map(item => `
      <b>${item.name}</b><b> - ${item.description}</b>`)}
    `;

  bot.sendAnimation(id, links.start, {
    caption: html,
    duration: 0,
    parse_mode: 'HTML',
  });
});

bot.onText(/\/anagram (.+)/, (msg, data) => {
  const { id } = msg.chat;
  const anagrams = getAnagram(data[1]);
  const html = `
    <strong>Anagrams from webster dictionary: </strong>
      ${anagrams.length ? anagrams.map(item => `<b>${item}</b> `) : 'There is no matching'}
    <strong>/helppizdyk</strong>
    `;

  bot.sendAnimation(id, links.anagram, {
    caption: html,
    duration: 0,
    parse_mode: 'HTML',
  });
});

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

  bot.sendPhoto(id, fs.readFileSync(__dirname + '/assets/robot.jpg'), {
    caption: `Poka rodnoy ${msg.from.username}`
  });
});

bot.onText(/\/porabodyashitb/, msg => {
  const { id } = msg.chat;

  bot.sendAnimation(id, links.porabodyashitb, {
    caption: `Zavarivay 4ayek mi na4inaem /helppizdyk`,
    duration: 0,
  });
});

bot.onText(/\/areyouhere/, msg => {
  const { id } = msg.chat;
  bot.sendMessage(id, 'Are you Pizduk...', {
    reply_markup: {
      keyboard: [
        [{
          text: 'Where are you?',
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
  bot.sendMessage(query.message.chat.id, debug(query));
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
    case 'Edit' :
      bot.editMessageText(`${text} edited`, {
        chat_id: chat.id,
        message_id,
      });
      break;
    default:
      break;
  }

  bot.answerCallbackQuery(query.id, `${query.data}`);
});

bot.on('message', (msg) => {
  const { id } = msg.chat;

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

bot.on('polling_error', (error) => {
  console.log(error.code);  // => 'EFATAL'
});