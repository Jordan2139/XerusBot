const chalk = require('chalk');
const Discord = require('discord.js');
module.exports = (client, message) => {
    console.log(chalk.bgGreen.black(`Online and ready to serve ${client.guilds.cache.size} servers.`));
};