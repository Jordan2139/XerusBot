const Discord =  require('discord.js');

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":no_entry_sign: **Error:** You don't have the permission to do that!");
    message.delete();
    let statement = args.slice(0).join(' ');
    if (statement.length < 1) return message.reply('You must have something to announce!');
    const welbed = new Discord.MessageEmbed()
    .setColor("#7ADCF4")
    .setDescription(`${statement}`)
    .setTimestamp()
    .setAuthor(`Announcement from: ${message.member.displayName}`,`${message.author.avatarURL()}`)
    .setFooter(`Xerus Networks`, `${message.guild.iconURL()}`)
    message.channel.send(welbed)
    message.channel.send('<@&781120134227689513>')
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'announce',
  description: 'Make our announcments for us',
  usage: 'announce'
};