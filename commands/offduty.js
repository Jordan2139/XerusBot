const Discord = require('discord.js');
const settings = require('../settings.json');
const ms = require("parse-ms");
const db = require('quick.db');

exports.run = async (client, message, args) => {
  message.delete();
  let user = message.author;
  let muteRole = message.guild.roles.cache.find(r => r.name == "On Duty Staff");
  if (!message.member.roles.cache.find(r => r.name === "Staff")) return message.reply("❌**Error:** You aren't Staff!");
  if (!message.member.roles.cache.find(r => r.name === "On Duty Staff")) return message.reply("❌**Error:** You aren't on duty! Use `~onduty` to clock in!");
  let author = await db.fetch(`onduty_${message.guild.id}_${user.id}`)
  let time = ms(Date.now() - db.fetch(`onduty_${message.guild.id}_${user.id}`));
  console.log(time)
  const embed = new Discord.MessageEmbed()
    .setColor("#7ADCF4")
    .setTimestamp()
    .addField('Action:', 'Clocked **Offduty**')
    .addField('Staff Member:', `${message.author.username}#${message.author.discriminator} (${message.author.id})`)
    .setFooter(`Xerus Networks | Time Spent On Duty: ${time.hours}hrs ${time.minutes}mins`, `${message.guild.iconURL()}`)

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply(':x: I do not have the correct permissions.').catch(console.error);
  let logchannel = message.guild.channels.cache.find(channel => channel.id === '785001708869648445');
  if  (!logchannel){
      message.channel.send(embed).then(msg => msg.delete({timeout:30000}));
    }else{
      message.channel.send(embed).then(msg => msg.delete({timeout:30000}));
      client.channels.cache.get(logchannel.id).send({embed});
    };
      message.guild.member(user).roles.remove(muteRole)
      db.add(`totaltime_${message.guild.id}_${user.id}`, time)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'offduty',
  description: 'Clocks off duty',
  usage: 'offduty'
};