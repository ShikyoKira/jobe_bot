const discord = require('discord.js');
const client = new discord.Client();
const { exec } = require('child_process');
const publicIp = require('public-ip');
const fs = require('fs');
const rgx = /!valheim mods (add|remove) (.+)/
const modfile = 'mods.txt';

const DISCORD_TOKEN = '<BOT_TOKEN>';

function serverCtl(direction, msg) {
  console.log(`taking server ${direction}`);
  msg.react('⏳');
  exec(`sudo systemctl ${direction} valheimserver.service`, (err) => {
    if(err) {
      msg.reply(`There was an error: ${err}`);
      console.log(err)
      return;
    }

    msg.reply(`Server is now ${direction}`);
  });
}

function isServerActive(discord, msg) {
   exec("systemctl status valheimserver.service | egrep Active | sed 's/^[[:space:]]*//'", (err, stdout, stderr) => {
        if (err) {
            console.log(err);
        } else {
            let output = stdout;
            let stat = output.split(" ")[1];

            switch (stat) {
                case "active":
                    // these embeds could 100% be turned into a function but im good for now
                    const upEmbed = new discord.MessageEmbed()
                        .setColor("#3CB371")
                        .setTitle("Valheim Server Status")
                        .setDescription("Server is up!")
                        .attachFiles(['./serverUp.gif'])
                        .setImage("attachment://serverUp.gif");
                    msg.reply(upEmbed);
                    break;
                case "inactive":
                    const downEmbed = new discord.MessageEmbed()
                        .setColor("#FF4500")
                        .setTitle("Valheim Server Status")
                        .setDescription("Server is inactive - try restarting!");
                    msg.reply(downEmbed);
                    break;
                default:
                    const unknownEmbed = new discord.MessageEmbed()
                        .setColor("#FF4500")
                        .setTitle("Valheim Server Status")
                        .setDescription("Server is in an unknown or failed state");
                    msg.reply(unknownEmbed);
                    console.log(stat);
                    break;
            }
        }
    });
}

function sendInfo(msg)
{
   msg.reply('\ntype `!ping` to check if I\'m responsive or not'
	   + '\ntype `!valheim start` to start the server'
	   + '\ntype `!valheim stop` to stop the server'
	   + '\ntype `!valheim restart` to restart the server'
	   + '\ntype `!valheim status` to get server status'
   	   + '\ntype `!valheim players` to get online status for all players');
}

function showOnlinePlayers()
{
   var text = '\n__Player(s) Currently Online__'
            + '\n```diff';

   var files = fs.readdirSync('playerlist/online/');

   if (files.length == 0) {
       text += '\n+';
   }

   files.forEach(file => {
       text += `\n+ ${file}`;
   });
   text += '```';
   return text;
}

function showOfflinePlayers()
{
   var text = '\n__Player(s) Currently Offline__'
            + '\n```diff';
   var files = fs.readdirSync('playerlist/offline/');
   
   if (files.length == 0) {
       text += '\n-';
   }

   files.forEach(file => {
       text += `\n- ${file}`;
   });
   text += '```';
   return text;
}

function showPlayersStatus(msg)
{
   var textmsg = showOnlinePlayers();
   textmsg += showOfflinePlayers();
   msg.reply(textmsg);
}	

function addMod(mod, msg)
{
   fs.readFile(modfile, function (err, data) {
     if (err) return console.log(err);

     if (data.includes(`${mod}\n`)) {
        msg.reply('Mod already exist in mod list');
	return;
     }

     var result = `${data}${mod}\n`;
     fs.writeFile(modfile, result, function (err) {
	if (err) return console.log(err);
     });
   });
}

function removeMod(mod)
{
   fs.readFile(modfile, function (err, data) {
     if (err) return console.log(err);

     if (!data.includes(`${mod}\n`)) {
        msg.reply('Mod cannot be found in the mod list');
	return;
     }

     var modrgx = new RegExp(`${mod}\n`, 'g');
     var result = data.replace(modrgx, '');
     fs.writeFile(modfile, result, function (err) {
        if (err) return console.log(err);
     });
   });
}

function showMods(msg)
{
   fs.readFile(modfile, function (err, data) {
     if (err) return console.log(err);

     msg.reply(`\n\`\`\`\n${data}\n\`\`\``);
   });
}

client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`));

client.on('message', msg => {
  if(!msg.content.startsWith('!')) return;

  switch(msg.content) {

  case '!ping': 
    msg.reply(`Pong!\nLatency: ${Date.now() - msg.createdTimestamp}ms\nAPI latency: ${Math.round(client.ws.ping)}ms`);
    return;
  case '!valheim start': 
    serverCtl('start', msg);
    return;
  case '!valheim stop': 
    serverCtl('stop', msg);
    return;
  case '!valheim restart':
    serverCtl('restart', msg);
    return;
  case "!valheim status":
    isServerActive(discord, msg);
    return;
  case "!valheim ip":
    publicIp.v4().then((ip) => {
      msg.reply(ip);
    });
    return;
  case '!valheim players':
    showPlayersStatus(msg);
    return;
  case '!help':
    sendInfo(msg);
    return;
  case '!valheim mods':
    showMods(msg);
    return;
  }

  const match = msg.content.match(rgx);

  if (!match) return;

  if(match[1] === 'add') {
    addMod(match[2], msg);
  }
  else {
    removeMod(match[2], msg);
  }
});

client.login(DISCORD_TOKEN);
