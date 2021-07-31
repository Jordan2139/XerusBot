const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require('./settings.json');
client.config = settings;
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

//loading messages
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    const props = require(`./commands/${f}`);
    log(`Command Loaded! ${props.help.name} ;)`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

const activities_list = [
  "Xerus Staff",
  "~onduty",
  "for modders"
  ]; 

client.on('ready', () => {
  setInterval(() => {
      const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); 
      client.user.setActivity(activities_list[index], {type: 'WATCHING'}); 
  }, 10000); 
});


//command reload
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if (message.channel.type === 'dm') return;
  let permlvl = 0;
  let mod_role = message.guild.roles.cache.find(r => r.name === settings.modrolename);
  if (mod_role && message.member.roles.cache.has(mod_role.id)) permlvl = 1;
  let admin_role = message.guild.roles.cache.find(r => r.name === settings.adminrolename);
  if (admin_role && message.member.roles.cache.has(admin_role.id)) permlvl = 2;
  let manager_role = message.guild.roles.cache.find(r => r.name === settings.managerrolename);
  if (manager_role && message.member.roles.cache.has(manager_role.id)) permlvl = 3;
  let overlord_role = message.guild.roles.cache.find(r => r.name === settings.overlordrolename)
  if (overlord_role && message.member.roles.cache.has(overlord_role.id)) permlvl = 4;
  if (message.author.id === settings.ownerid) permlvl = 5;
  return permlvl;
};

client.login(settings.token);