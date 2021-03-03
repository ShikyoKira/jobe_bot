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

7. Install PM2 Product Process Manager (For server)
```
sudo npm i -g pm2
```

8. Edit index.js by adding your [public ip](http://www.whatismyip.com) and bot token generated from discord
```
vi index.js
```
```
const discord = require('discord.js');
const client = new discord.Client();
const { exec } = require('child_process');

const PUBLIC_IP = '<SERVER_PUBLIC_IP>';       <--- Replace this with your public ip
const DISCORD_TOKEN = '<BOT_TOKEN>';          <--- Replace this with your bot token 

function serverCtl(direction, msg) {
```

9. Press ESC and type `:wq!` to save and quit

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

