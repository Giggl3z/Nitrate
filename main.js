const request = require('request');
const chalk = require('chalk');
const Discord = require('discord.js');
const bot = new Discord.Client();
const title = require('console-title');
const fs = require('fs');
const notifier = require('node-notifier');

let configfile = fs.readFileSync('config.json');
config = JSON.parse(configfile);
token = config.token

let count = 0;

// DO NOT TOUCH (DEV ONLY)
request.get({
    url: "https://raw.githubusercontent.com/Giggl3z/Nitrate/master/main.js"
}, function (error, response, body) {
    fs.readFile('main.js', function read(err, data) {
        if (err) throw err;
        // If file content is not equal as code from repo, replace file with new code.
        if (data != body) {
            fs.writeFile('main.js', body, (err) => {
                console.log("New update installed, restart to make changes.")
                if (err) throw err;
                process.exit(1);
            });
        }
        else {
            console.log("Starting Nitrate...")
        }
    })
});

bot.on("ready", () => {
    console.log(`Logged in as: ${chalk.yellow(bot.user.tag)}\nEmail: ${chalk.bold(bot.user.email)}\nID: ${chalk.bold(bot.user.id)}`);
    title(`${bot.user.tag} | ${bot.guilds.size} guilds | ${bot.user.friends.size} friends`);
});

let repeated = [];
bot.on("message", message => {
    let code;
    if (message.channel.type != 'dm' && message.channel.type != 'group') {
        // Nitro Looter
        if (message.content.includes("discord.gift") || message.content.includes("discordapp.com/gifts/")) {
            console.log(`[${chalk.bgYellow("GIFT")}] - [${chalk.cyan(message.guild.name)}] [${"#" + chalk.yellow(message.channel.name)}] - ${chalk.magenta(message.author.tag)}: ${chalk.underline(message.content)}`);
            // Testing if the message is a nitro gift link.
            if (message.content.includes("discord.gift")) {
                code = message.content.split("discord.gift/").pop();
                code = code.replace(/\s+/g," "); // Replaces all break lines with spaces in one line.
                code = code.split(' ')[0]; // Removes everything after the code.

                // Repeated code skip.
                if (repeated.includes(code)) {
                    console.log(`${code} - Already attempted`);
                }
                else {
                    request.post({
                        url: 'https://discordapp.com/api/v6/entitlements/gift-codes/' + code + '/redeem',
                        headers: {
                            'Authorization': token
                        },
                        time: true
                    }, function (error, response, body) {
                        var result = JSON.parse(body);
                        var responseTime = new Date() - message.createdTimestamp;
                        console.log(`[${chalk.bgBlack('*')}] - ${result.message} (${responseTime / 1000}s)`);
                        // Notification alerts.
                        notifier.notify({
                            title: 'Nitrate',
                            icon: 'nitro-png-2.png',
                            appID: `${message.guild.name} | #${message.channel.name} | ${message.author.tag}`,
                            message: result.message,
                            timeout: 0.1
                        });
                    });
                    repeated.push(code);
                }
            }
            // Otherwise, check if the message is another gift link variant.
            else if (message.content.includes("discordapp.com/gifts")){
                code = message.content.split("discordapp.com/gifts/").pop();
                code = code.replace(/\s+/g," "); // Replaces all break lines with spaces in one line.
                code = code.split(' ')[0]; // Removes everything after the code.
                
                if (repeated.includes(code)) {
                    console.log(`${code} - Already attempted.`);
                }
                else {
                    request.post({
                        url: 'https://discordapp.com/api/v6/entitlements/gift-codes/' + code + '/redeem',
                        headers: {
                            'Authorization': token
                        },
                        time: true
                    }, function (error, response, body) {
                        var result = JSON.parse(body);
                        var responseTime = new Date() - message.createdTimestamp;
                        console.log(`[${chalk.bgBlack('*')}] - ${result.message} (${responseTime / 1000}s)`);
                        // Notification alerts
                        notifier.notify({
                            title: 'Nitrate',
                            icon: 'nitro-png-2.png',
                            appID: `${message.guild.name} | #${message.channel.name} | ${message.author.tag}`,
                            message: result.message,
                            timeout: 0.1
                        });
                    });
                    repeated.push(code);
                }
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
