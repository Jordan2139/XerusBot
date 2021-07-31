module.exports = async message => {
  if(message.channel.type === "dm") return;
  if(message.author.bot) return;

  let cd = new Set();
  let cdseconds = 5;
  
  let client = message.client;  
    let prefix = settings.prefix
  if (!message.content.startsWith(prefix)) return;  
    
    let command = message.content.split(' ')[0].slice(prefix.length);
    let params = message.content.split(' ').slice(1);
    let cmd;
    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
        console.log("Command: ~" + cmd.help.name)
        console.log("Guild: " + message.guild.name)
      cmd.run(client, message, params, perms);
      console.log("Command: -" + cmd.help.name)
      console.log("Guild: " + message.guild.name)
      if (message.author.id !== "353020749126041602"){
        if(cd.has(message.author.id)){
          message.delete();
          return message.reply("This command is for cd for 5 sec")
        }
      cd.add(message.author.id);
      }
    }
     
    setTimeout(() => {
      cd.delete(message.author.id)
    }, cdseconds * 1000)
};