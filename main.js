const request = require('request');
const chalk = require('chalk');
const Discord = require('discord.js');
const bot = new Discord.Client();
const title = require('console-title');
const fs = require('fs');

let token = fs.readFileSync('config.json');
token = JSON.parse(token);
token = token.token

let count = 0;

request.get({
    url: "https://raw.githubusercontent.com/Giggl3z/Discord-Nitro-Redeemer/master/main.js"
}, function (error, response, body) {
    fs.readFile('main.js', function read(err, data) {
        if (err) throw err;
        if (data != body) {
            fs.writeFile('main.js', body, (err) => {
                console.log("New update installed, restart to make changes.")
                if (err) throw err;
                process.exit(1);
            });
        }
        else {
            console.log("Starting...")
        }
    })
});

bot.on("ready", () => {
    console.log("Ready!");
    title(`${bot.user.tag} | ${bot.guilds.size} guilds | ${bot.user.friends.size} friends`);
});

bot.on("message", message => {
    let code;
    if (message.channel.type != 'dm' && message.channel.type != 'group') {
        if (message.content.includes("discord.gift") || message.content.includes("discordapp.com/gifts/")) {
            console.log(`[${chalk.bgYellow("GIFT")}] - [${chalk.cyan(message.guild.name)}] [${"#" + chalk.yellow(message.channel.name)}] - ${chalk.magenta(message.author.tag)}: ${chalk.underline(message.content)}`);
            if (message.content.includes("discord.gift")) {
                code = message.content.split("discord.gift/").pop();
                code = code.replace(/\s+/g," ");
                code = code.split(' ')[0];

                request.post({
                    url: 'https://discordapp.com/api/v6/entitlements/gift-codes/' + code + '/redeem',
                    headers: {
                        'Authorization': token
                    },
                    time: true
                }, function (error, response, body) {
                    var result = JSON.parse(body);
                    console.log(`[${chalk.bgBlack('*')}] - ${result.message} (${response.elapsedTime}ms)`);
                });
            }
            else if (message.content.includes("discordapp.com/gifts")){
                code = message.content.split("discordapp.com/gifts/").pop();
                code = code.replace(/\s+/g," ");
                code = code.split(' ')[0];
                
                request.post({
                    url: 'https://discordapp.com/api/v6/entitlements/gift-codes/' + code + '/redeem',
                    headers: {
                        'Authorization': token
                    },
                    time: true
                }, function (error, response, body) {
                    var result = JSON.parse(body);
                    console.log(`[${chalk.bgBlack('*')}] - ${result.message} (${response.elapsedTime}ms)`);
                });
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
bot.login(token).catch(function (error) {
    console.log(error.message);
});