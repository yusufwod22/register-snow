const Discord = require('discord.js');

exports.run = async(client, message) => {

let embed = new Discord.MessageEmbed()
.setColor("#00ffe3")

.addField("**__Gecikme Sürem__**", `**${client.ws.ping}** ms Olarak Hesaplandı.`,true)

message.channel.send(embed)

}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ['p', 'ms'],
permLevel: 0
};

exports.help = {
name: 'ping',
description: 'Botun pingini gösterir',
usage: 'ping' 
};