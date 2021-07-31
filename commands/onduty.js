const Discord = require('discord.js');
const settings = require('../settings.json');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  message.delete();
  let user = message.author;
  let muteRole = message.guild.roles.cache.find(r => r.name == "On Duty Staff");
  if (!message.member.roles.cache.find(r => r.name === "Staff")) return message.reply("❌**Error:** You aren't Staff!");
  if (message.member.roles.cache.find(r => r.name === "On Duty Staff")) return message.reply("❌**Error:** You are already on duty! Use `~offduty` to clock out!");
  const embed = new Discord.MessageEmbed()
    .setColor("#7ADCF4")
    .setTimestamp()
    .addField('Action:', 'Clocked **Onduty**')
    .addField('Staff Member:', `${message.author.username}#${message.author.discriminator} (${message.author.id})`)
    .setFooter(`Xerus Networks`, `${message.guild.iconURL()}`)

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply(':x: I do not have the correct permissions.').catch(console.error);
  let logchannel = message.guild.channels.cache.find(channel => channel.id === '785001708869648445');
  if  (!logchannel){
      message.channel.send(embed).then(msg => msg.delete({timeout:30000}));
    }else{
      message.channel.send(embed).then(msg => msg.delete({timeout:30000}));
      client.channels.cache.get(logchannel.id).send({embed});
    };
      message.guild.member(user).roles.add(muteRole)
      db.set(`onduty_${message.guild.id}_${user.id}`, Date.now())
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'onduty',
  description: 'Clocks on duty',
  usage: 'onduty'
};