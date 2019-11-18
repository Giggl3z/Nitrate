const request = require('request');
const chalk = require('chalk');
const Discord = require('discord.js');
const bot = new Discord.Client();

let prefix = ".";
let token = "NjQwMzUzMzkxMDgzNjUxMDcz.XcWsUQ.zPLTPXPJh-6nKVvT5pgKlAX11Es";
//Bot owner ID
let god = 640353391083651073;

bot.on("ready", () => {
    console.log("Ready");
});

// Welcomer
bot.on('guildMemberAdd', member => {
    console.log(`[${chalk.yellow("INFO")}] - [${chalk.cyan( member.guild.name)}] ${chalk.magenta(member.user.tag)}: joined.`);
    }
);

// Leave notif
bot.on('guildMemberRemove', member => {
    console.log(`[${chalk.bgRed("INFO")}] - [${chalk.cyan(member.guild.name)}] ${chalk.magenta(member.user.tag)} left.`);
    }
);

bot.on("messageDelete", (message) => {
    if (message.channel.type != 'dm')
    {
        console.log(`[${chalk.red("DELETE")}] - [${chalk.cyan(message.guild.name)}] [${chalk.yellow("#" + message.channel.name)}] - ${chalk.magenta(message.author.username)}: ${message.content}`);
    }
    else
    {
        console.log(`[${chalk.red("DELETE")}] - ${chalk.magenta(message.author.username)}: ${message.content}`);
    }
    });

bot.on("message", message => {
    let code;
    if (message.channel.type != 'dm')
    {
        if (message.content.includes("discord.gift") || message.content.includes("discordapp.com/gifts/"))
        {
            console.log(`[${chalk.bgYellow("GIFT")}] - [${chalk.cyan(message.guild.name)}] [${"#" + chalk.yellow(message.channel.name)}] - ${chalk.magenta(message.author.username)}: ${chalk.underline(message.content)}`);
            if (message.content.includes("discord.gift"))
            {
                code = message.content.split("discord.gift/").pop();
                var options = {
                    url: 'https://discordapp.com/api/v6/entitlements/gift-codes/' + code + '/redeem',
                    headers: {
                        'Authorization': token
                    }
                };

                function callback(error, response, body) {
                    var result = JSON.parse(body);
                    console.log(`[${chalk.bgBlack('INFO')}] - ${result.message}`);
                    
                }
                request.post(options, callback);

            }
            else if (message.content.includes("discordapp.com/gifts"))
            {
                code = message.content.split("discordapp.com/gifts/").pop();
                var options = {
                    url: 'https://discordapp.com/api/v6/entitlements/gift-codes/' + code + '/redeem',
                    headers: {
                        'Authorization': token
                    }
                };

                function callback(error, response, body) {
                    var result = JSON.parse(body);
                    console.log(`[${chalk.bgBlack('INFO')}] - ${result.message}`);

                }
                request.post(options, callback);
            }
        }

        else if (message.content.includes(`<@!${bot.user.id}>`) || message.content.includes(`<@${bot.user.id}>`) || message.content.includes(bot.user.tag))
        {
            console.log(`[${chalk.green("SEND")}] - [${chalk.cyan(message.guild.name)}] [${"#" + chalk.yellow(message.channel.name)}] - ${chalk.magenta(message.author.username)}: ${chalk.black.bgYellow(message.content)}`);
        }
        else
        {
            console.log(`[${chalk.green("SEND")}] - [${chalk.cyan(message.guild.name)}] [${"#" + chalk.yellow(message.channel.name)}] - ${chalk.magenta(message.author.username)}: ${chalk.underline(message.content)}`);
        }
    }
    else if (message.channel.type == 'dm')
    { 
        console.log(`[${chalk.inverse("DM")}] - ${chalk.magenta(message.author.username)}: ${chalk.underline(message.content)}`);
    }

});

bot.login(token);
