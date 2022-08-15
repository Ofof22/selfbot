const express = require('express');
const { Database } = require("nukleon")
const { Client } = require("discord.js-selfbot-v13");
const app = express();
const db = new Database("online.json")
const client = new Client({
  ws: {
    properties: {
      $browser: "Discord Android" 
    }
  }
})
//client

client.on('ready', async() => {
  console.log("YEAH");
  client.user.setStatus("online")
  setInterval(async()=>{
   const x = await db.fetch("x")
    if(x) client.user.setActivity("ONLINE")
    else client.user.setActivity("AFK")
  },1000)
})
client.on("messageCreate",async (message) =>{
    if(message.author.id === "984439714851479593") {
    if(message.content.startsWith("..?")) return
                await db.set("x","love")
   setTimeout(async()=>{
      const x = await db.fetch("x")
     if(x)  db.remove("x")
   },60000)
    
  }
  if(message.content === "time") {
    if(message.channel.type === "DM") {
      let time;
      let x = await db.fetch("time")
      if(x) time = await db.get("time")
      if(!time) time = 0
      const uptime = timeCon(time)
      const time2 = await db.get("time2")
      const uptime2 = timeCon(time2)
      message.reply({ content:`..? \nAfk kaldığım zaman : ${uptime}\nToplam afk kaldığın zaman ${uptime2}` })
    }
  }
})
client.on("ready",async()=>{
setInterval(async()=>{
  const x = await db.fetch("x")
    if(!x) {
      db.add("time",1)
      db.add("time2",1)
    } else {
       const x = await db.fetch("time")
      if(x) return db.remove("time")
    }
},60000)
})
function timeCon(seconds) {
 // let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  // 👇️ if seconds are greater than 30, round minutes up (optional)
  minutes = seconds >= 30 ? minutes + 1 : minutes;

  minutes = minutes % 60;

  // 👇️ If you don't want to roll hours over, e.g. 24 to 00
  // 👇️ comment (or remove) the line below
  // commenting next line gets you `24:00:00` instead of `00:00:00`
  // or `36:15:31` instead of `12:15:31`, etc.
  hours = hours % 24;

  return `${hours}:${minutes}:${seconds}`;
}
client.login ("")
app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});
