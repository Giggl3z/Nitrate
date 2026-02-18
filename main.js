const request = require('request');
const chalk = require('chalk');
const Discord = require('discord.js');
const bot = new Discord.Client();
const title = require('console-title');
const fs = require('fs');
const notifier = require('node-notifier');

const CONFIG_PATH = './config.json';

function loadConfig() {
  const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
  return JSON.parse(raw);
}

function saveConfig(cfg) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2), 'utf-8');
}

let config = loadConfig();
let token = (config.token || '').trim();

if (!token) {
  console.error(chalk.red('Missing token in config.json. Add your token before starting.'));
  process.exit(1);
}

let count = 0;
let repeated = [];

console.log('Starting Nitrate...');

bot.on('ready', () => {
  console.log(`Logged in as: ${chalk.yellow(bot.user.tag)}\nID: ${chalk.bold(bot.user.id)}`);

  // NOTE: friends is unavailable in newer API states; guard it.
  const friendCount = bot.user && bot.user.friends ? bot.user.friends.size : 0;
  title(`${bot.user.tag} | ${bot.guilds.size} guilds | ${friendCount} friends`);

  if (config.presence !== true) return;

  try {
    const client = require('discord-rich-presence')('670031928178507786');
    client.updatePresence({
      state: 'Sniping nitro...',
      startTimestamp: Date.now(),
      largeImageKey: 'nitrate',
      smallImageKey: 'null',
      instance: true,
    });
  } catch (err) {
    console.log("Couldn't set your rich presence...");
  }
});

function reload() {
  config = loadConfig();
  token = (config.token || '').trim();
}

async function add(msg, args) {
  const id = String(args[0] || '').trim();
  if (!id) return msg.channel.send('Please provide an id.');

  const config1 = loadConfig();
  if (!Array.isArray(config1.blacklisted)) config1.blacklisted = [];

  if (!config1.blacklisted.includes(id)) {
    config1.blacklisted.push(id);
    saveConfig(config1);
    reload();
    msg.channel.send(`Added \`${id}\` to the blacklist!`);
  } else {
    msg.channel.send('That id is already in the blacklist!');
  }
}

async function remove(msg, args) {
  const id = String(args[0] || '').trim();
  if (!id) return msg.channel.send('Please provide an id.');

  const config1 = loadConfig();
  if (!Array.isArray(config1.blacklisted)) config1.blacklisted = [];

  if (config1.blacklisted.includes(id)) {
    config1.blacklisted = config1.blacklisted.filter((item) => item !== id);
    saveConfig(config1);
    reload();
    msg.channel.send(`Removed \`${id}\` from the blacklist!`);
  } else {
    msg.channel.send('This ID is not blacklisted');
  }
}

bot.on('message', (msg) => {
  if (config.selfbot !== true) return;
  if (!bot.user || msg.author.id !== bot.user.id) return;

  if (!msg.content.toLowerCase().startsWith('$blacklist')) return;

  const args = msg.content.split(' ').slice(1);
  if (!args[0] || !args[1]) {
    return msg.channel.send('Please use: `$blacklist add/remove guildid/userid/channelid`.');
  }

  const option = args[0].toLowerCase();
  const id = args[1];
  if (!['add', 'remove'].includes(option) || !/^\d+$/.test(id)) {
    return msg.channel.send('Please use: `$blacklist add/remove guildid/userid/channelid`.');
  }

  if (option === 'add') return add(msg, [id]);
  if (option === 'remove') return remove(msg, [id]);
});

function redeemCode(code, message, start) {
  request.post(
    {
      url: `https://discord.com/api/v9/entitlements/gift-codes/${code}/redeem`,
      headers: {
        Authorization: token,
      },
      time: true,
    },
    function (error, response, body) {
      let result;
      try {
        result = JSON.parse(body || '{}');
      } catch {
        result = { message: body || 'Unknown response' };
      }

      const responseTime = new Date() - start;
      const msg = result && result.message ? result.message : `HTTP ${response ? response.statusCode : '??'}`;
      console.log(`[${chalk.bgBlack('*')}] - ${msg} (${responseTime / 1000}s)`);

      try {
        notifier.notify({
          title: 'Nitrate',
          icon: 'nitro-png-2.png',
          appID: `${message.guild.name} | #${message.channel.name} | ${message.author.tag}`,
          message: msg,
          timeout: 0.1,
        });
      } catch {}
    }
  );
}

bot.on('message', (message) => {
  try {
    if (message.channel.type === 'dm' || message.channel.type === 'group') return;

    if (
      (config.blacklisted || []).includes(message.author.id) ||
      (message.guild && (config.blacklisted || []).includes(message.guild.id)) ||
      (config.blacklisted || []).includes(message.channel.id)
    )
      return;

    let code;

    if (message.content.includes('discord.gift') || message.content.includes('discordapp.com/gifts/') || message.content.includes('discord.com/gifts/')) {
      const start = new Date();
      console.log(
        `[${chalk.bgYellow('GIFT')}] - [${chalk.cyan(message.guild.name)}] [${'#' + chalk.yellow(message.channel.name)}] - ${chalk.magenta(
          message.author.tag
        )}: ${chalk.underline(message.content)}`
      );

      if (message.content.includes('discord.gift/')) {
        code = message.content.split('discord.gift/').pop();
      } else if (message.content.includes('discordapp.com/gifts/')) {
        code = message.content.split('discordapp.com/gifts/').pop();
      } else {
        code = message.content.split('discord.com/gifts/').pop();
      }

      code = code.replace(/\s+/g, ' ').split(' ')[0];

      if (!code) return;

      if (repeated.includes(code)) {
        console.log(`${code} - Already attempted.`);
      } else {
        redeemCode(code, message, start);
        repeated.push(code);
        if (repeated.length > 5000) repeated = repeated.slice(-1000);
      }

      count += 1;
      const friendCount = bot.user && bot.user.friends ? bot.user.friends.size : 0;
      const giftWord = count === 1 ? 'gift' : 'gifts';
      title(`${bot.user.tag} | ${bot.guilds.size} guilds | ${friendCount} friends | ${count} ${giftWord}`);
    }
  } catch (e) {
    console.log(e);
  }
});

bot.login(token).catch(function (error) {
  console.log(error.message);
});
