const Discord = require('discord.js');

const bot = new Discord.Client();
var query = require('samp-query')
const token = 'TOKEN';  // ODY2ODM2OTc3MzI3MTQ0OTcw.YPYW2A.dQw41ac6H8_F-B4JSZSWKyr9i8o
const PREFIX = '*'; // Prefix stavite po zelji
var options = {
    host: '5.9.8.124', // Vas IP npr. Arizona 
    port: 18647 // PORT
}

bot.on("ready", () => {
    bot.guilds.cache.forEach((guild) => { 
         let defaultChannel = "";
         guild.channels.cache.forEach((channel) => {
               if(channel.type == "text" && defaultChannel == "") {
               if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                   defaultChannel = channel;
               }
               }
         })
         setInterval (function () 
         {
            query (options, (error, response) => {
            let embed = new Discord.MessageEmbed()
            .setTitle(`${options.host}:${options.port} (${response.rules.version})`)
            .setURL('https://ultimate-rpg.com/')
            .setColor('#2ecc71')
            .addField('Hostname', response.hostname)
            .addField('Gamemode', response.gamemode)
            .addField('Web', response.rules.weburl)
            .addField('Online Players', `${response.online}/${response.maxplayers}`, true)
            .addField('Hosted Tab', ':white_check_mark:', true)
            .setFooter('Made by Momenzi#6717', 'https://www.sa-mp.com/samp_logo.png')
            bot.channels.cache.get(`806687491838312469`).send(embed) // STAVITE ID PO ZELJI
            if (error) {
                console.error(error)
            }
        })
        }, 10 * 360000); // 360000
   })
})
 
bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
    switch (args[0]){
        case 'samp': // PRIMJER: *samp izbacuje poruku
        query (options, (error, response) => {
            if (error) {
                console.error(error)
            }
            else {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${options.host}:${options.port} (${response.rules.version})`)
                .setURL('https://ultimate-rpg.com/')
                .setColor('#2ecc71')
                .addField('Hostname', response.hostname)
                .addField('Gamemode', response.gamemode)
                .addField('Web', response.rules.weburl)
                .addField('Hosted Tab', ':white_check_mark:', true)
                .addField('Online Players', `${response.online}/${response.maxplayers}`, true)
                .setFooter('Live data from SAMP server', 'https://www.sa-mp.com/samp_logo.png')
                message.channel.send({embed});
            }
        })        
        break;
    }
});
bot.login(token);
