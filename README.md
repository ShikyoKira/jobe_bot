# jobe_bot
jobe the valheim-server manager

<br>

## Requirement(s)
- Node JS v14 or above

<br>

## Steps for linux

### Without Node JS installed

1. Updating the package repository 
```
sudo apt update
```

2. Install Node JS
```
sudo apt install nodejs
```

3. Install Node Package Manager
```
sudo apt install npm
``` 

<br>
<br>

### Normal Installation

4. Clone this repo
```
git clone https://github.com/ShikyoKira/jobe_bot.git
```

5. Go to jobe_bot directory
```
cd jobe_bot
```

6. Install Discord JS
```
npm install discord.js
```

7. Install FS
```
npm install fs
```

8. Install public-ip
```
npm install public-ip
```

9. Install PM2 Product Process Manager (For server). Skip this step if you have done it
```
sudo npm i -g pm2
```

10. Edit index.js by adding the bot token generated by discord
```
vi index.js
```
```
const discord = require('discord.js');
const client = new discord.Client();
const { exec } = require('child_process');
const publicIp = require('public-ip');
const fs = require('fs');

const DISCORD_TOKEN = '<BOT_TOKEN>';          <--- Replace this with your bot token 

function serverCtl(direction, msg) {
```

11. Press ESC and type `:wq!` to save and quit

<br>

## Operations

- To start the bot

```
pm2 start index.js
```

<br>

- To stop the bot

```
pm2 stop index.js
```

<br>

- To restart the bot

```
pm2 restart index.js
```

<br>

- To check the logs

```
pm2 logs
```


## Discord Commands

- To start the server
```
!valheim start
```

<br>

- To stop the server
```
!valheim stop
```

<br>

- To restart the server
```
!valheim restart
```

<br>

- To check server status
```
!valheim status
```

<br>

- To check player online status
```
!valheim players
```

<br>

- To check info
```
!help
```

<br>

- To ping the bot
```
!ping
```

