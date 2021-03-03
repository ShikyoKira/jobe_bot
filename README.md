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

