const request = require('request');L
const chalk = require('chalk');
const Discord = require('discord.js');
const bot = new Discord.Client();
const title = require('console-title');
const notifier = require('node-notifier');
const open = require('open');

// Edit the token with yours (REQUIRED)
let token = "YOUR TOKEN";

let count = 0;

bot.on("ready", () => {
    console.log("Ready");
    title(`${bot.user.tag} | ${bot.guilds.size} guilds | ${bot.user.friends.size} friends`);
});

bot.on("message", message => {
    let code;
    if (message.channel.type != 'dm' && message.channel.type != 'group') {
        if (message.content.includes("discord.gift") || message.content.includes("discordapp.com/gifts/")) {
            console.log(`[${chalk.bgYellow("GIFT")}] - [${chalk.cyan(message.guild.name)}] [${"#" + chalk.yellow(message.channel.name)}] - ${chalk.magenta(message.author.username)}: ${chalk.underline(message.content)}`);
            if (message.content.includes("discord.gift")) {
                code = message.content.split("discord.gift/").pop();
                code = code.split(' ')[0];
                var options = {
                    url: 'https://discordapp.com/api/v6/entitlements/gift-codes/' + code + '/redeem',
                    headers: {
                        'Authorization': token
                    }
                };
                function callback(error, response, body) {
                    var result = JSON.parse(body);
                    console.log(`[${chalk.bgBlack('INFO')}] - ${result.message}`);
                    notifier.notify({
                        title: 'Nitro Redeemer',
                        icon: 'nitro-png-2.png',
                        appID: `${message.guild.name} | #${message.channel.name} | ${message.author.tag}`,
                        message: result.message,
                        timeout: 0.1,
                        wait: true
                      }, function () {
                          open(`discord://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
                      });
                }
                request.post(options, callback);
            }
            else if (message.content.includes("discordapp.com/gifts")){
                code = message.content.split("discordapp.com/gifts/").pop();
                code = code.split(' ')[0];
                var options = {
                    url: 'https://discordapp.com/api/v6/entitlements/gift-codes/' + code + '/redeem',
                    headers: {
                        'Authorization': token
                    }
                };
                function callback(error, response, body) {
                    var result = JSON.parse(body);
                    console.log(`[${chalk.bgBlack('INFO')}] - ${result.message}`);
                    notifier.notify({
                        title: 'Nitro Redeemer',
                        icon: 'nitro-png-2.png',
                        appID: `${message.guild.name} | #${message.channel.name} | ${message.author.tag}`,
                        message: result.message,
                        timeout: 0.1,
                        wait: true
                      }, function () {
                        open(`discord://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
                    });
                }
                request.post(options, callback);
            }
            count += 1;
            if (count == 1) {
                title(`${bot.user.tag} | ${bot.guilds.size} guilds | ${bot.user.friends.size} friends | ${count.toString()} gift`)
            }
            else if (count > 1) {
                title(`${bot.user.tag} | ${bot.guilds.size} guilds | ${bot.user.friends.size} friends | ${count.toString()} gifts`)
            }
        }
    }
});
bot.login(token);
