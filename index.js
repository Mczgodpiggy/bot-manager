require('dotenv').config()
const dapi = require("./discord-api.js")
require("./webhook.js")
const Discord = require("discord.js")
require("discord-reply")
const client = new Discord.Client()
const db = require("quick.db")
const prefix = require("discord-prefix")
const disbut = require("discord-buttons")
disbut(client)
const fetch = require("node-fetch")
const ecommands = require('./ehelp');
const ccommands = require("./chelp")
var defaultPrefix = 'd.';
const disbotlist = require("disbotlist");
const dbl = new disbotlist(process.env.DISBOTTOKEN, client);
const { AutoPoster } = require('topgg-autoposter')

const ap = AutoPoster(process.env.Topggtoken, client)

ap.on('posted', () => {
  console.log('Posted stats to Top.gg!')
})

client.on("ready", () => {
  console.log(client.user.tag)
  console.log("is ready")
  
  
  client.api.applications(client.user.id).commands.post({
    data: {
      name: "stats",
      description: "stats command",
    }
  });
  let i = 0
    let t = {
    "0": `Managing bots in ${client.guilds.cache.size} servers!`,
    "1": `Users: ${client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)}`,
    "2": `Support server: dsc.gg/dragonhunter-org`,
    "3": `Mention me for my prefix`,
    "4": `d.help for help`,
    "5": "Made with โฅ by ๐ฏ๐ฝ๐ฌ๐ฒ๐บ๐น๐ณ๐๐น๐ฟ๐ฐ๐ฝโขยฎ-๐ช๐ ๐ท๐ค๐ฌ๐ก๐ญ๐ฆ๐ค๐ค๐ถแดฐแตแต#4992"
  }
  function myLoop() {         
    setTimeout(function() {   
      let status = t[i]
        client.user.setActivity(status, { type: 'PLAYING' })
        i++;                    
        if (i < 6) {           
          myLoop();              
        } else if (i == 6) {
          i = 0
          myLoop()
        }                    
      }, 60000)
    }
    myLoop()
})


client.on("message", async message => {
  
  if (message.author.bot) return;
  if (!db.has(`language_${message.author.id}`)) {
    db.set(`language_${message.author.id}`, "english")
  }
  const botapproverroleid = db.get(`approverroleid_${message.guild.id}`)
  const botlogcid = db.get(`botlogcid_${message.guild.id}`)
  let privateprefix = prefix.getPrefix(message.author.id)
  let guildPrefix = prefix.getPrefix(message.guild.id)
  if (!privateprefix) privateprefix = guildPrefix
  if (!guildPrefix) guildPrefix = defaultPrefix;

  let args = message.content.slice(guildPrefix.length || privateprefix.length).split(' ');
  
  if (message.content.startsWith(guildPrefix + "setprivateprefix") || message.content.startsWith(privateprefix + "setprivateprefix") || message.content.startsWith(guildPrefix + "setpprefix") || message.content.startsWith(privateprefix + "setpprefix")) {
    const language = db.get(`language_${message.author.id}`)
    if (language === "english") {
    let newprefix = args.slice(1, 2).join("")
    if (!newprefix || newprefix.includes("1") || newprefix.includes("2") || newprefix.includes("3") || newprefix.includes("4") || newprefix.includes("5") || newprefix.includes("6") || newprefix.includes("7") || newprefix.includes("8") || newprefix.includes("9") || newprefix.includes("0") || newprefix.includes("9") || newprefix.includes("@here") || newprefix.includes("@everyone")) return message.lineReply("please give a prefix in text")
    prefix.setPrefix(newprefix, message.author.id)
    await message.lineReply("done now the private prefix for you is " + "`" + newprefix + "`")
    } else if (language === "chinese") {
    let newprefix = args.slice(1, 2).join("")
    if (!newprefix || newprefix.includes("1") || newprefix.includes("2") || newprefix.includes("3") || newprefix.includes("4") || newprefix.includes("5") || newprefix.includes("6") || newprefix.includes("7") || newprefix.includes("8") || newprefix.includes("9") || newprefix.includes("0") || newprefix.includes("9") || newprefix.includes("@here") || newprefix.includes("@everyone")) return message.lineReply("่ซ็ตฆไบไธๅๅ่ผ")
    prefix.setPrefix(newprefix, message.author.id)
    await message.lineReply("ไฝ ็ๆฐ็ง็จๅ่ผๆฏ" + "`" + newprefix + "`")
    }
  } else if (message.content.startsWith(guildPrefix + "setprefix") || message.content.startsWith(privateprefix + "setprefix")) {
    const language = db.get(`language_${message.author.id}`)
    if (language === "english") {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply('you don\'t have admin perm to use this command');
    let newprefix = args.slice(1, 2).join("")
    if (!newprefix || newprefix.includes("1") || newprefix.includes("2") || newprefix.includes("3") || newprefix.includes("4") || newprefix.includes("5") || newprefix.includes("6") || newprefix.includes("7") || newprefix.includes("8") || newprefix.includes("9") || newprefix.includes("0") || newprefix.includes("@here") || newprefix.includes("@everyone")) return message.lineReply("please give a prefix in text")
    prefix.setPrefix(newprefix, message.guild.id)
    await message.lineReply("done now prefix for this guild is " + "`" + newprefix + "`")
    } else if (language === "chinese") {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply('ไฝ ้่ฆ`็ฎก็่`ๅฑค็ด็ๆฌ้ๆ่ฝ็จ้ๅๆไปค');
    let newprefix = args.slice(1, 2).join("")
    if (!newprefix || newprefix.includes("1") || newprefix.includes("2") || newprefix.includes("3") || newprefix.includes("4") || newprefix.includes("5") || newprefix.includes("6") || newprefix.includes("7") || newprefix.includes("8") || newprefix.includes("9") || newprefix.includes("0") || newprefix.includes("@here") || newprefix.includes("@everyone")) return message.lineReply("่ซ็ตฆไบไธๅๅ่ผ")
    prefix.setPrefix(newprefix, message.guild.id)
    await message.lineReply("้ๅไผบๆๅจ็ๆฐๅ่ผๆฏ" + "`" + newprefix + "`")
    }
  } else if (message.content.startsWith(guildPrefix + "addbot") || message.content.startsWith(privateprefix + "addbot")) {
    const language = db.get(`language_${message.author.id}`)
    if (language === "english") {
      if (!db.has(`botrole_${message.guild.id}`)) return message.lineReply("Please use d.setup to setup the bot")
    const botid = args.slice(1, 2).join("")
    if (db.has(`newbot${botid}_${message.guild.id}`)) return message.lineReply("that bot is already in queue try again if your bot is approved/rejected")
    const prefix = args.slice(2, 3).join("")
    if (!botid || isNaN(botid)) return message.lineReply("please give a bot ID")
    if (!prefix) return message.lineReply("please give a prefix")
    
    await fetch(`https://discord.com/api/v6/users/${botid}`, {
      headers: {
				authorization: `Bot ${process.env.TOKEN}`,
			},
    })
      .then(res => res.json())
      .then(data => {
        const channel = client.channels.cache.find(c => c.id === botlogcid)
        if (!channel) return console.log("no such channel")
        const botembed = new Discord.MessageEmbed()
          .setTitle("new bot request")
          .addField("bot id", `${data.id}`)
          .addField("name", `${data.username}`)
          .addField("discriminator", `${data.discriminator}`)
          .setThumbnail(`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`)
          .addField("bot owner", message.author.tag)
          .addField("prefix", `${prefix}`)
          .addField("invite", `[invite here](https://discord.com/api/oauth2/authorize?client_id=${bot.id}&permissions=8&scope=bot%20applications.commands)`)
        message.lineReply("your bot has been submited to the queue please wait till other staffs review it")
        channel.send(`<@&${botapproverroleid}>`, { embed: botembed }
        ).then((msg) => msg.react("<a:check:850724870282674189>"))
        db.set(`newbot${botid}_${message.guild.id}`, message.author.id)
      }).catch(err => {
        console.log(err)
        message.lineReply(`I got some errors doing that the error is ${err}`)
        })
    } else if (language === "chinese") {
      if (!db.has(`botrole_${message.guild.id}`)) return message.lineReply("่ซ็จd.setupๅฎๆ่จญๅฎๆต็จ")
    const botid = args.slice(1, 2).join("")
    if (db.has(`newbot${botid}_${message.guild.id}`)) return message.lineReply("้ฃๅๆฉๅจไบบไปๅจๆฉๅจไบบๆธๅฎ่ฃก๏ผ่ซ็ญๅฐ้ฃๅๆฉๅจไบบ่ขซๆฅๆถ/ๆ็ต")
    const prefix = args.slice(2, 3).join("")
    if (!botid || isNaN(botid)) return message.lineReply("่ซ็ตฆไบไธๅๆฉๅจไบบID")
    if (!prefix) return message.lineReply("่ซ็ตฆไบไธๅๅ่ผ")
    
    await fetch(`https://discord.com/api/v6/users/${botid}`, {
      headers: {
				authorization: `Bot ${process.env.TOKEN}`,
			},
    })
      .then(res => res.json())
      .then(data => {
        const channel = client.channels.cache.find(c => c.id === botlogcid)
        if (!channel) return console.log("no such channel")
        const botembed = new Discord.MessageEmbed()
          .setTitle("new bot request")
          .addField("bot id", `${data.id}`)
          .addField("name", `${data.username}`)
          .addField("discriminator", `${data.discriminator}`)
          .setThumbnail(`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`)
          .addField("bot owner", message.author.tag)
          .addField("prefix", `${prefix}`)
          .addField("invite", `[invite here](https://discord.com/api/oauth2/authorize?client_id=${botid}&permissions=0&scope=bot%20applications.commands)`)
        message.lineReply("ไฝ ็ๆฉๅจไบบๅทฒ่ขซๅ ๅฅๆฉๅจไบบๆธๅฎ&ๆฅ่ช")
        channel.send(`<@&${botapproverroleid}>`, { embed: botembed }
        ).then((msg) => msg.react("<a:check:850724870282674189>"))
        db.set(`newbot${botid}_${message.guild.id}`, message.author.id)
      }).catch(err => {
        console.log(err)
        message.lineReply(`ๆๅจ่็ๆธๆๆ็ผ็ไบ้ฏ่ชค\nๆฌ่ซ่ฆ่ซ`)
        })
    }
  } else if (message.content.startsWith(guildPrefix + "reject") || message.content.startsWith(privateprefix + "reject")) {
    const language = db.get(`language_${message.author.id}`)
    if (language === "english") {
      if (!db.has(`botrole_${message.guild.id}`)) return message.lineReply("Please use d.setup to setup the bot")
    const norole = new Discord.MessageEmbed()
      .setTitle("Missing roles")
      .setDescription(`You need <@&${botapproverroleid}> role to approve/reject bots`)
      .setColor("FF0F00")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setFooter("Missing roles", message.author.displayAvatarURL())
    if (!message.member.roles.cache.find(r => r.id === `${botapproverroleid}`)) return message.lineReply(norole)
    const botid = args.slice(1, 2).join("")
    if (!botid || isNaN(botid)) return message.lineReply("please give a bot ID")
    const reason = args.slice(2).join(" ")
    if (!reason) return message.lineReply("please give a reason to reject the bot")
    const ownerid = db.get(`newbot${botid}_${message.guild.id}`)
    if (!ownerid) return message.lineReply("that's not a queued bot")
    await fetch(`https://discord.com/api/v6/users/${botid}`, {
      headers: {
				authorization: `Bot ${process.env.TOKEN}`,
			},
    })
      .then(res => res.json())
      .then(data => {
        const user = client.users.cache.find(u => u.id === `${db.get(`newbot${botid}_${message.guild.id}`)}`)
        const userid = db.get(`newbot${botid}_${message.guild.id}`)
        const userlang = db.get(`language_${userid}`)
        const channel = client.channels.cache.find(c => c.id === botlogcid)
        if (!channel) return console.log("no such channel")
        db.delete(`newbot${botid}_${message.guild.id}`)
        const botembed = new Discord.MessageEmbed()
          .setTitle("bot rejected")
          .addField("bot id", `${data.id}`)
          .addField("name", `${data.username}`)
          .addField("discriminator", `${data.discriminator}`)
          .addField("bot approver", message.author.tag)
          .addField("reason", reason)
          .setThumbnail(`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`)
          .addField("bot owner", `<@${ownerid}>`)
        message.lineReply("rejected " + `${data.username}#${data.discriminator}`)
        channel.send(`<@${ownerid}> your bot got rejected`, { embed: botembed })
        db.delete(`newbot${botid}_${message.guild.id}`)
        if (userlang === "chinese") {
          user.send(`ไฝ ็ๆฉๅจไบบ${data.username}#${data.discriminator}่ขซๆฉๅจไบบ็ฎก็่${message.author.tag}ๆ็ตไบ\nๅ ็บ${reason}`)
        } else if (userlang === "english") {
          user.send(`your bot ${data.username}#${data.discriminator} was rejected by approver ${message.author.tag}\nbecause of the reason ${reason}`)
        }
      }).catch(err => {
        console.log(err)
        message.lineReply(`I got some errors doing that the error is ${err}`)
        db.delete(`newbot${botid}_${message.guild.id}`)
        })
    } else if (language === "chinese") {
      if (!db.has(`botrole_${message.guild.id}`)) return message.lineReply("่ซ็จd.setupๅฎๆ่จญๅฎๆต็จ")
    const norole = new Discord.MessageEmbed()
      .setTitle("ไฝ ๆฒๆไฝฟ็จ้ๅๆไปคๆ้็่บซๅ็ต")
      .setDescription(`ไฝ ้่ฆ<@&${botapproverroleid}> ๆ่ฝๆฅๆถ/ๆ็ตๆฉๅจไบบ`)
      .setColor("FF0F00")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setFooter("ไฝ ๆฒๆไฝฟ็จ้ๅๆไปคๆ้็่บซๅ็ต", message.author.displayAvatarURL())
    if (!message.member.roles.cache.find(r => r.id === `${botapproverroleid}`)) return message.lineReply(norole)
    const botid = args.slice(1, 2).join("")
    if (!botid || isNaN(botid)) return message.lineReply("่ซ็ตฆไธๅๆญฃ็ขบ็ๆฉๅจไบบID")
    const reason = args.slice(2).join(" ")
    if (!reason) return message.lineReply("่ซ็ตฆไบๆ็ต็็็ฑ")
    const ownerid = db.get(`newbot${botid}_${message.guild.id}`)
    if (!ownerid) return message.lineReply("้ฃๅๆฉๅจไบบไธๅจๆฉๅจไบบๆธๅฎ่ฃก")
    await fetch(`https://discord.com/api/v6/users/${botid}`, {
      headers: {
				authorization: `Bot ${process.env.TOKEN}`,
			},
    })
      .then(res => res.json())
      .then(data => {
        const user = client.users.cache.find(u => u.id === `${db.get(`newbot${botid}_${message.guild.id}`)}`)
        const userid = db.get(`newbot${botid}_${message.guild.id}`)
        const userlang = db.get(`language_${userid}`)
        const channel = client.channels.cache.find(c => c.id === botlogcid)
        if (!channel) return console.log("no such channel")
        db.delete(`newbot${botid}_${message.guild.id}`)
        const botembed = new Discord.MessageEmbed()
          .setTitle("bot rejected")
          .addField("bot id", `${data.id}`)
          .addField("name", `${data.username}`)
          .addField("discriminator", `${data.discriminator}`)
          .addField("bot approver", message.author.tag)
          .addField("reason", reason)
          .setThumbnail(`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`)
          .addField("bot owner", `<@${ownerid}>`)
        message.lineReply("ๆ็ตไบ" + `${data.username}#${data.discriminator}`)
        channel.send(`<@${ownerid}> your bot got rejected`, { embed: botembed })
        db.delete(`newbot${botid}_${message.guild.id}`)
        if (userlang === "chinese") {
          user.send(`ไฝ ็ๆฉๅจไบบ${data.username}#${data.discriminator}่ขซๆฉๅจไบบ็ฎก็่${message.author.tag}ๆ็ตไบ\nๅ ็บ${reason}`)
        } else if (userlang === "english") {
          user.send(`your bot ${data.username}#${data.discriminator} was rejected by approver ${message.author.tag}\nbecause of the reason ${reason}`)
        }
      }).catch(err => {
        console.log(err)
        message.lineReply(`ๆๅจ่็ๆธๆๆ็ผ็ไบ้ฏ่ชค\nๆฌ่ซ่ฆ่ซ`)
        db.delete(`newbot${botid}_${message.guild.id}`)
        })
    }
  } else if (message.content.startsWith(guildPrefix + "approve") || message.content.startsWith(privateprefix + "approve")) {
    const language = db.get(`language_${message.author.id}`)
    if (language === "english") {
      if (!db.has(`botrole_${message.guild.id}`)) return message.lineReply("Please use d.setup to setup the bot")
      const norole = new Discord.MessageEmbed()
      .setTitle("Missing roles")
      .setDescription(`You need <@&${botapproverroleid}> role to approve/reject bots`)
      .setColor("FF0F00")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setFooter("Missing roles", message.author.displayAvatarURL())
    if (!message.member.roles.cache.find(r => r.id === `${botapproverroleid}`)) return message.lineReply(norole)
    const botid = args.slice(1, 2).join("")
    if (!botid || isNaN(botid)) return message.lineReply("please give a bot ID")
    const ownerid = db.get(`newbot${botid}_${message.guild.id}`)
    if (!ownerid) return message.lineReply("that's not a queued bot")
    await fetch(`https://discord.com/api/v6/users/${botid}`, {
      headers: {
				authorization: `Bot ${process.env.TOKEN}`,
			},
    })
      .then(res => res.json())
      .then(async data => {
        const user = client.users.cache.find(u => u.id === `${db.get(`newbot${botid}_${message.guild.id}`)}`)
        const userid = db.get(`newbot${botid}_${message.guild.id}`)
        const userlang = db.get(`language_${userid}`)
        const channel = client.channels.cache.find(c => c.id === botlogcid)
        if (!channel) return console.log("no such channel")
        db.delete(`newbot${botid}_${message.guild.id}`)
        const botembed = new Discord.MessageEmbed()
          .setTitle("bot approved")
          .addField("bot id", `${data.id}`)
          .addField("name", `${data.username}`)
          .addField("discriminator", `${data.discriminator}`)
          .addField("bot approver", message.author.tag)
          .setThumbnail(`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`)
          .addField("bot owner", `<@${ownerid}>`)
        message.lineReply("approved " + `${data.username}${data.discriminator}`)
        const botuser = message.guild.members.cache.find(u => u.id === botid)
        const botrole = message.guild.roles.cache.find(r => r.id === db.get(`botrole_${message.guild.id}`))
        const developeruser = message.guild.members.cache.find(u => u.id === ownerid)
        const botdeveloperrole = message.guild.roles.cache.find(r => r.id === db.get(`developerrole_${message.guild.id}`))
        botuser.roles.add(botrole)
        await developeruser.roles.add(botdeveloperrole).catch(err => {
          message.author.send(`i got some errors doing that error is ${err}`)
        })
        channel.send(`<@${ownerid}> your bot got approved`, { embed: botembed })
        if (userlang === "chinese") {
          user.send(`ไฝ ็ๆฉๅจไบบ${data.username}#${data.discriminator}่ขซๆฉๅจไบบ็ฎก็่${message.author.tag}ๆฅๆถไบ`)
        } else if (userlang === "english") {
          user.send(`your bot ${data.username}#${data.discriminator} was approved by approver ${message.author.tag}`)
        }
      }).catch(err => {
        console.log(err)
        message.lineReply(`I got some errors doing that the error is ${err}`)
        db.delete(`newbot${botid}_${message.guild.id}`)
        })
    } else if (language === "chinese") {
      if (!db.has(`botrole_${message.guild.id}`)) return message.lineReply("่ซ็จd.setupๅฎๆ่จญๅฎๆต็จ")
      const norole = new Discord.MessageEmbed()
      .setTitle("ไฝ ๆฒๆไฝฟ็จ้ๅๆไปคๆ้็่บซๅ็ต")
      .setDescription(`ไฝ ้่ฆ<@&${botapproverroleid}> ๆ่ฝๆฅๆถ/ๆ็ตๆฉๅจไบบ`)
      .setColor("FF0F00")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setFooter("ไฝ ๆฒๆไฝฟ็จ้ๅๆไปคๆ้็่บซๅ็ต", message.author.displayAvatarURL())
    if (!message.member.roles.cache.find(r => r.id === `${botapproverroleid}`)) return message.lineReply(norole)
    const botid = args.slice(1, 2).join("")
    if (!botid || isNaN(botid)) return message.lineReply("่ซ็ตฆไธๅๆญฃ็ขบ็ๆฉๅจไบบID")
    const ownerid = db.get(`newbot${botid}_${message.guild.id}`)
    if (!ownerid) return message.lineReply("that's not a queued bot")
    await fetch(`https://discord.com/api/v6/users/${botid}`, {
      headers: {
				authorization: `Bot ${process.env.TOKEN}`,
			},
    })
      .then(res => res.json())
      .then(async data => {
        const user = client.users.cache.find(u => u.id === `${db.get(`newbot${botid}_${message.guild.id}`)}`)
        const userid = db.get(`newbot${botid}_${message.guild.id}`)
        const userlang = db.get(`language_${userid}`)
        const channel = client.channels.cache.find(c => c.id === botlogcid)
        if (!channel) return console.log("no such channel")
        db.delete(`newbot${botid}_${message.guild.id}`)
        const botembed = new Discord.MessageEmbed()
          .setTitle("bot approved")
          .addField("bot id", `${data.id}`)
          .addField("name", `${data.username}`)
          .addField("discriminator", `${data.discriminator}`)
          .addField("bot approver", message.author.tag)
          .setThumbnail(`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`)
          .addField("bot owner", `<@${ownerid}>`)
        message.lineReply("ๆฅๆถไบ" + `${data.username}${data.discriminator}`)
        const botuser = message.guild.members.cache.find(u => u.id === botid)
        const botrole = message.guild.roles.cache.find(r => r.id === db.get(`botrole_${message.guild.id}`))
        const developeruser = message.guild.members.cache.find(u => u.id === ownerid)
        const botdeveloperrole = message.guild.roles.cache.find(r => r.id === db.get(`developerrole_${message.guild.id}`))
        botuser.roles.add(botrole)
        await developeruser.roles.add(botdeveloperrole).catch(err => {
          message.author.send(`i got some errors doing that error is ${err}`)
        })
        channel.send(`<@${ownerid}> your bot got approved`, { embed: botembed })
        if (userlang === "chinese") {
          user.send(`ไฝ ็ๆฉๅจไบบ${data.username}#${data.discriminator}่ขซๆฉๅจไบบ็ฎก็่${message.author.tag}ๆฅๆถไบ`)
        } else if (userlang === "english") {
          user.send(`your bot ${data.username}#${data.discriminator} was approved by approver ${message.author.tag}`)
        }
      }).catch(err => {
        console.log(err)
        message.lineReply(`ๆๅจ่็ๆธๆๆ็ผ็ไบ้ฏ่ชค\nๆฌ่ซ่ฆ่ซ`)
        db.delete(`newbot${botid}_${message.guild.id}`)
        })
    }
  } else if (message.content.startsWith(guildPrefix + "help") || message.content.startsWith(privateprefix + "help")) {
    let pprefix = prefix.getPrefix(message.author.id)
    if (!pprefix) pprefix = guildPrefix
    const language = db.get(`language_${message.author.id}`)
    if (language === "english") {
      let addbot = new disbut.MessageButton()
        .setStyle('url')
        .setLabel('add me to your servers') 
        .setURL("https://discord.com/api/oauth2/authorize?client_id=804651902896963584&permissions=8&scope=bot%20applications.commands")
        let embed =  new Discord.MessageEmbed()
          .setTitle('help')
          .setColor('#12d8f3')
          .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
          .setThumbnail(client.user.displayAvatarURL());
        if (!args[1])
          embed
            .addField("Symbols", "<> Argument is required\n[] - Argument is optional")
            .setDescription(Object.keys(ecommands).map(command => `\`${command.padEnd(Object.keys(ecommands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` <a:arrow:875628899604762624> ${ecommands[command].description}\ncategory: ${ecommands[command].category}`).join('\n'));
        else {
          if (Object.keys(ecommands).includes(args[1].toLowerCase()) || Object.keys(ecommands).map(c => ecommands[c].aliases || []).flat().includes(args[1].toLowerCase())) {
            let command = Object.keys(ecommands).includes(args[1].toLowerCase())? args[1].toLowerCase() : Object.keys(ecommands).find(c => ecommands[c].aliases && ecommands[c].aliases.includes(args[1].toLowerCase()));
            embed
              .setTitle(`COMMAND - ${command}`)
              .addField("Symbols", "<> Argument is required\n[] - Argument is optional")
            if (ecommands[command].aliases)
              embed.addField('Command aliases', `\`${ecommands[command].aliases.join('`, `')}\``);
              if (!ecommands[command].category && pprefix !== guildPrefix)
              embed
              .addField('DESCRIPTION', ecommands[command].description)
              .addField('FORMAT-private prefix', `\`\`\`${pprefix}${ecommands[command].format}\`\`\``)
              .addField("FORMAT-guild prefix", `\`\`\`${guildPrefix}${ecommands[command].format}\`\`\``)
              if (!ecommands[command].category && pprefix == guildPrefix)
              embed
              .addField('DESCRIPTION', ecommands[command].description)
              .addField("FORMAT-guild prefix", `\`\`\`${guildPrefix}${ecommands[command].format}\`\`\``)
              if (pprefix !== guildPrefix)
            embed
              .addField('DESCRIPTION', ecommands[command].description)
              .addField("CATEGORY", ecommands[command].category)
              .addField('FORMAT-private prefix', `\`\`\`${pprefix}${ecommands[command].format}\`\`\``)
              .addField("FORMAT-guild prefix", `\`\`\`${guildPrefix}${ecommands[command].format}\`\`\``)
              if (pprefix == guildPrefix)
            embed
              .addField('DESCRIPTION', ecommands[command].description)
              .addField("CATEGORY", ecommands[command].category)
              .addField("FORMAT-guild prefix", `\`\`\`${guildPrefix}${ecommands[command].format}\`\`\``)
          } else {
            embed
              .setColor('RED')
              .setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
          }
        }
        message.channel.send(embed, addbot);
    } else if (language === "chinese") {
      let addbot = new disbut.MessageButton()
        .setStyle('url')
        .setLabel('้่ซๆ')
        .setURL("https://discord.com/api/oauth2/authorize?client_id=804651902896963584&permissions=8&scope=bot%20applications.commands")
        let embed =  new Discord.MessageEmbed()
          .setTitle('ๆไปคๅ่กจ')
          .setColor('#12d8f3')
          .setFooter(`ไฝฟ็จ่: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
          .setThumbnail(client.user.displayAvatarURL());
        if (!args[1])
          embed
            .addField("็ฌฆ่", "<> ้่ฆ็\n[] - ไธไธๅฎ่ฆ็")
            .setDescription(Object.keys(ccommands).map(command => `\`${command.padEnd(Object.keys(ccommands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` <a:arrow:875628899604762624> ${ccommands[command].description}\n้กๅฅ: ${ccommands[command].category}`).join('\n'));
        else {
          if (Object.keys(ccommands).includes(args[1].toLowerCase()) || Object.keys(ccommands).map(c => ccommands[c].aliases || []).flat().includes(args[1].toLowerCase())) {
            let command = Object.keys(ccommands).includes(args[1].toLowerCase())? args[1].toLowerCase() : Object.keys(ccommands).find(c => ccommands[c].aliases && ccommands[c].aliases.includes(args[1].toLowerCase()));
            embed
              .setTitle(`ๆไปค - ${command}`)
              .addField("็ฌฆ่", "<> ้่ฆ็\n[] - ไธไธๅฎ่ฆ็")
            if (ccommands[command].aliases)
              embed.addField('ๆไปคๅฅๅ', `\`${ccommands[command].aliases.join('`, `')}\``);
              if (!ccommands[command].category && pprefix != guildPrefix)
              embed
              .addField('ๆไปคไป็ดน', ccommands[command].description)
              .addField('็ง็จๅ่ผ', `\`\`\`${pprefix}${ccommands[command].format}\`\`\``)
              .addField("ไผบๆๅจๅ่ผ", `\`\`\`${guildPrefix}${ccommands[command].format}\`\`\``)
              if (!ccommands[command].category && pprefix == guildPrefix)
              embed
              .addField('ๆไปคไป็ดน', ccommands[command].description)
              .addField("ไผบๆๅจๅ่ผ", `\`\`\`${guildPrefix}${ccommands[command].format}\`\`\``)
              if (pprefix !== guildPrefix)
            embed
              .addField('ๆไปคไป็ดน', ccommands[command].description)
              .addField("้กๅฅ", ccommands[command].category)
              .addField('็ง็จๅ่ผ', `\`\`\`${pprefix}${ccommands[command].format}\`\`\``)
              .addField("ไผบๆๅจๅ่ผ", `\`\`\`${guildPrefix}${ccommands[command].format}\`\`\``)
              if (pprefix == guildPrefix)
            embed
              .addField('ๆไปคไป็ดน', ccommands[command].description)
              .addField("้กๅฅ", ccommands[command].category)
              .addField("ไผบๆๅจๅ่ผ", `\`\`\`${guildPrefix}${ccommands[command].format}\`\`\``)
          } else {
            embed
              .setColor('RED')
              .setDescription('้ไธๆฏไธๅๆญฃ็ขบ็ๆไปค\n่ซ็จๅถไป็ๆไปคๆ็ฉบ่ไพ็ๅจ้จ็ๆไปค');
          }
        }
        message.channel.send(embed, addbot);
    }
      } else if (message.content.startsWith(guildPrefix + "set-bot-prefix-name") || message.content.startsWith(privateprefix + "set-bot-prefix-name")) {
    const language = db.get(`language_${message.author.id}`)
    if (language === "english") {
      if (!db.has(`botrole_${message.guild.id}`)) return message.lineReply("Please use d.setup to setup the bot")
        const norole = new Discord.MessageEmbed()
      .setTitle("Missing roles")
      .setDescription(`You need <@&${botapproverroleid}> role to the edit bot's prefix name`)
      .setColor("FF0F00")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setFooter("Missing roles", message.author.displayAvatarURL())
    if (!message.member.roles.cache.find(r => r.id === `${botapproverroleid}`)) return message.lineReply(norole)
        const bot = message.mentions.members.last()
        const prefix = args.slice(2).join(" ")
        if (!bot || !bot.user.bot) return message.lineReply("please mention a bot")
        if (!prefix) return message.lineReply("please give a prefix")
        await bot.setNickname("").catch(err => {
          return message.lineReply(`i got some errors doing that the error is ${err}`)
        })
        await bot.setNickname(prefix + "|" + bot.displayName).catch(err => {
          return message.lineReply(`i got some errors doing that the error is ${err}`)
        })
        await message.lineReply(`done the prefix bot name for this bot is now set to ${bot.displayName}`)
    } else if (language === "chinese") {
      if (!db.has(`botrole_${message.guild.id}`)) return message.lineReply("่ซ็จd.setupๅฎๆ่จญๅฎๆต็จ")
      const norole = new Discord.MessageEmbed()
      .setTitle("ไฝ ๆฒๆไฝฟ็จ้ๅๆไปคๆ้็่บซๅ็ต")
      .setDescription(`ไฝ ้่ฆ<@&${botapproverroleid}>ๆ่ฝ่ชฟๆดๆฉๅจไบบ็ๅ่ผๆฑ็จฑ`)
      .setColor("FF0F00")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setFooter("ไฝ ๆฒๆไฝฟ็จ้ๅๆไปคๆ้็่บซๅ็ต", message.author.displayAvatarURL())
    if (!message.member.roles.cache.find(r => r.id === `${botapproverroleid}`)) return message.lineReply(norole)
        if (!message.member.roles.cache.find(r => r.id === `${botapproverroleid}`)) return message.lineReply(`ไฝ ้่ฆ<@&${botapproverroleid}>ๆ่ฝๆฅๆถ/ๆ็ตๆฉๅจไบบ`)
        const bot = message.mentions.members.last()
        const prefix = args.slice(2).join(" ")
        if (!bot || !bot.user.bot) return message.lineReply("่ซmentionไธๅฐๆฉๅจไบบ")
        if (!prefix) return message.lineReply("่ซ็ตฆไบไธๅๅ่ผ")
        await bot.setNickname("").catch(err => {
          return message.lineReply(`ๆๅจ่็ๆธๆๆ็ผ็ไบ้ฏ่ชค\nๆฌ่ซ่ฆ่ซ\nๆธๆ้ฏ่ชค: ${err}`)
        })
        await bot.setNickname(prefix + "|" + bot.displayName).catch(err => {
          return message.lineReply(`ๆๅจ่็ๆธๆๆ็ผ็ไบ้ฏ่ชค\nๆฌ่ซ่ฆ่ซ\nๆธๆ้ฏ่ชค: ${err}`)
        })
        await message.lineReply(`้ๅฐๆฉๅจไบบ็ๅ่ผๆฑ็จฑ็พๅจๆฏ${bot.displayName}`)
    }
      } else if (message.content.startsWith(guildPrefix + "setup") || message.content.startsWith(privateprefix + "setup")) {
    const language = db.get(`language_${message.author.id}`)
    if (language === "english") {
      if (!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply('you don\'t have admin perm to use this command');
        if (db.has(`setup_running_${message.guild.id}`)) return message.lineReply("the setup is already running please wait until the setup is done or cancel the first one")
        db.set(`setuping${message.guild.id}`, "true")
        message.channel.send("please give a role ID for the bot approver role\ntype `cancel` to cancel").then(() => {
    message.channel.awaitMessages(m => m.author.id === message.author.id, {
					max: 1,
					time: 30000,
					errors: ['time']
				})
    .then(col => {
      const msg = col.first().content.toString()
      if (msg.includes("cancel")) return message.lineReply("setup canceled").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      if (isNaN(msg)) return message.lineReply("invalid role ID provided").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      db.set(`approverroleid_${message.guild.id}`, msg)
      message.lineReply("done now please give a bot logging channel id\ntype `cancel` to cancel").then(() => {
    message.channel.awaitMessages(m => m.author.id === message.author.id, {
					max: 1,
					time: 30000,
					errors: ['time']
				})
    .then(col => {
      const msg = col.first().content.toString()
      if (msg.includes("cancel")) return message.lineReply("setup canceled").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      if (isNaN(msg)) return message.lineReply("invalid channel ID provided").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      db.set(`botlogcid_${message.guild.id}`, msg)
      message.lineReply("done now please give a role ID for the bot developer role\ntype `cancel` to cancel").then(() => {
    message.channel.awaitMessages(m => m.author.id === message.author.id, {
					max: 1,
					time: 30000,
					errors: ['time']
				})
    .then(col => {
      const msg = col.first().content.toString()
      if (msg.includes("cancel")) return message.lineReply("setup canceled").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      if (isNaN(msg)) return message.lineReply("invalid role ID provided").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      db.set(`developerrole_${message.guild.id}`, msg)
      message.lineReply("done now please give a role ID for the bot role\ntype `cancel` to cancel").then(() => {
    message.channel.awaitMessages(m => m.author.id === message.author.id, {
					max: 1,
					time: 30000,
					errors: ['time']
				})
    .then(col => {
      const msg = col.first().content.toString()
      if (msg.includes("cancel")) return message.lineReply("setup canceled").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      if (isNaN(msg)) return message.lineReply("invalid role ID provided").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      db.set(`botrole_${message.guild.id}`, msg)
      message.lineReply("the setup is done")
      
    })
    .catch(err => {
      message.channel.send("you didn't answer the bot developer role ID in time please try again")
      console.log(err)
    })
    })
      
    })
    .catch(err => {
      message.channel.send("you didn't answer the bot role ID in time please try again")
      console.log(err)
    })
    })
      
    })
    .catch(err => {
      message.channel.send("you didn't answer the channel ID in time please try again")
      console.log(err)
    })
    })
      
      
    })
    .catch(err => {
      message.channel.send("you didn't answer the bot approver ID in time please try again")
      console.log(err)
    })
    })
    } else if (language === "chinese") {
      if (!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply('ไฝ ้่ฆ`็ฎก็่`ๅฑค็ด็ๆฌ้ๆ่ฝ็จ้ๅๆไปค');
        if (db.has(`setup_running_${message.guild.id}`)) return message.lineReply("ๆไบบๆญฃๅจ่จญๅฎ่ซๆพๆฃ็ฌฌไธๅๆ็ญๅพ้ไธๆฌกๅฎๆ")
        db.set(`setuping${message.guild.id}`, "true")
        message.channel.send("่ซๅ็ญๆฉๅจไบบ็ฎก็่็่บซๅ็ตID").then(() => {
    message.channel.awaitMessages(m => m.author.id === message.author.id, {
					max: 1,
					time: 30000,
					errors: ['time']
				})
    .then(col => {
      const msg = col.first().content.toString()
      if (msg.includes("cancel")) return message.lineReply("ๅทฒๆพๆฃ่ฎๆด").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      if (isNaN(msg)) return message.lineReply("่ซๅ็ญไธๅๆญฃ็ขบ็่บซๅ็ตID").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      db.set(`approverroleid_${message.guild.id}`, msg)
      message.lineReply("่ซๅ็ญๆฉๅจไบบๆฅ่ช็้ ป้ID\n่ผธๅฅ`cancel`ไพๆพๆฃ่ฎๆด").then(() => {
    message.channel.awaitMessages(m => m.author.id === message.author.id, {
					max: 1,
					time: 30000,
					errors: ['time']
				})
    .then(col => {
      const msg = col.first().content.toString()
      if (msg.includes("cancel")) return message.lineReply("ๅทฒๆพๆฃ่ฎๆด").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      if (isNaN(msg)) return message.lineReply("่ซๅ็ญไธๅๆญฃ็ขบ็ๆฉๅจไบบๆฅ่ช็้ ป้ID").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      db.set(`botlogcid_${message.guild.id}`, msg)
      message.lineReply("่ซๅ็ญๆฉๅจไบบ่ฃฝ้ ่็่บซๅ็ตID\n่ผธๅฅ`cancel`ไพๆพๆฃ่ฎๆด").then(() => {
    message.channel.awaitMessages(m => m.author.id === message.author.id, {
					max: 1,
					time: 30000,
					errors: ['time']
				})
    .then(col => {
      const msg = col.first().content.toString()
      if (msg.includes("cancel")) return message.lineReply("ๅทฒๆพๆฃ่ฎๆด").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      if (isNaN(msg)) return message.lineReply("่ซๅ็ญไธๅๆญฃ็ขบ็่บซๅ็ตID").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      db.set(`developerrole_${message.guild.id}`, msg)
      message.lineReply("่ซๅ็ญๆฉๅจไบบ็่บซๅ็ตID\n่ผธๅฅ`cancel`ไพๆพๆฃ่ฎๆด").then(() => {
    message.channel.awaitMessages(m => m.author.id === message.author.id, {
					max: 1,
					time: 30000,
					errors: ['time']
				})
    .then(col => {
      const msg = col.first().content.toString()
      if (msg.includes("cancel")) return message.lineReply("ๅทฒๆพๆฃ่ฎๆด").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      if (isNaN(msg)) return message.lineReply("่ซๅ็ญไธๅๆญฃ็ขบ็่บซๅ็ตID").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      db.set(`botrole_${message.guild.id}`, msg)
      message.lineReply("่จญๅฎๆต็จๅฎๆ")
      
    })
    .catch(err => {
      message.channel.send("ไฝ ๆฒๆๅจๆ้ๅงๅ็ญๆฉๅจไบบ็่บซๅ็ตID")
      console.log(err)
    })
    })
      
    })
    .catch(err => {
      message.channel.send("ไฝ ๆฒๆๅจๆ้ๅงๅ็ญๆฉๅจไบบ่ฃฝ้ ่็่บซๅ็ตID")
      console.log(err)
    })
    })
      
    })
    .catch(err => {
      message.channel.send("ไฝ ๆฒๆๅจๆ้ๅงๅ็ญๆฉๅจไบบๆฅ่ช็้ ป้ID")
      console.log(err)
    })
    })
      
      
    })
    .catch(err => {
      message.channel.send("ไฝ ๆฒๆๅจๆ้ๅงๅ็ญๆฉๅจไบบ็ฎก็่็่บซๅ็ตID")
      console.log(err)
    })
    })
    }
      } else if (message.content.startsWith(guildPrefix + "stats") || message.content.startsWith(privateprefix + "stats")) {
    const avgusersnf = client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c) / client.guilds.cache.size
    const avgusers = avgusersnf.toFixed()
    const language = db.get(`language_${message.author.id}`)
    if (language === "english") {
      let addbot = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('add ๐๐ฌ๐ฑ ๐ช๐๐ซ๐๐ค๐ข๐ฏโขยฎ to your servers')
      .setURL("https://top.gg/bot/804651902896963584")
      let serverlist = ''
    client.guilds.cache.forEach((guild) => {
      serverlist = serverlist.concat(`${guild.name} - ${guild.memberCount}\n`)
    })
    const psembed = new Discord.MessageEmbed()
      .setColor("GOLD")
      .setTitle(`Server count is ${client.guilds.cache.size} servers`, '')
      .setDescription(serverlist)
      .addField("Total users", client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c))
      .addField("Average users per server", avgusers)
      .addField("Support server", "[click here](https://mczgodpiggyio.addbot.repl.co/dc)")
      const sembed = new Discord.MessageEmbed()
      .setColor("GOLD")
      .setTitle(`Server count is ${client.guilds.cache.size} servers`, '')
      .addField("total users", client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c))
        .addField("Average users per server", avgusers)
      .addField("support server", "[click here](https://mczgodpiggyio.addbot.repl.co/dc)")

      if (message.guild.id !== "855730108371042315" || message.author.id !== "599050023669334037") return message.channel.send(sembed, addbot)
    if (message.guild.id === "855730108371042315" && message.author.id === "599050023669334037") return message.channel.send(psembed, addbot)
    } else if (language === "chinese") {
      let addbot = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('add ๐๐ฌ๐ฑ ๐ช๐๐ซ๐๐ค๐ข๐ฏโขยฎ to your servers')
      .setURL("https://top.gg/bot/804651902896963584")
      let serverlist = ''
    client.guilds.cache.forEach((guild) => {
      serverlist = serverlist.concat(`${guild.name} - ${guild.memberCount}\n`)
    })
    const psembed = new Discord.MessageEmbed()
      .setColor("GOLD")
      .setTitle(`ไผบๆๅจ้ๆฏ${client.guilds.cache.size}`, '')
      .setDescription(serverlist)
      .addField("ไฝฟ็จ่ๆธ", client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c))
      .addField("ไผบๆๅจ", "[ๆ้](https://mczgodpiggyio.addbot.repl.co/dc)")
      const sembed = new Discord.MessageEmbed()
      .setColor("GOLD")
      .setTitle(`ไผบๆๅจ้ๆฏ${client.guilds.cache.size}`, '')
      .addField("ไฝฟ็จ่ๆธ", client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c))
      .addField("ไผบๆๅจ", "[ๆ้](https://mczgodpiggyio.addbot.repl.co/dc)")

      if (message.guild.id !== "855730108371042315" || message.author.id !== "599050023669334037") return message.channel.send(sembed, addbot)
      if (message.guild.id === "855730108371042315" && message.author.id === "599050023669334037") return message.channel.send(psembed, addbot)
    }    
  } else if (message.content.startsWith(guildPrefix + "support-server") || message.content.startsWith(privateprefix + "support-server")) {
    const language = db.get(`language_${message.author.id}`)
    if (language === "english") {
      let addbot = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('add ๐๐ฌ๐ฑ ๐ช๐๐ซ๐๐ค๐ข๐ฏโขยฎ to your servers')
      .setURL("https://top.gg/bot/804651902896963584")
    const supporte = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setTitle(`Join ${client.user.tag}'s support server by clicking here`)
    .setURL("https://discord.gg/vbKauQ4")
    message.channel.send(supporte, addbot)
    } else if (language === "chinese") {
      let addbot = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('ๆ๐๐ฌ๐ฑ ๐ช๐๐ซ๐๐ค๐ข๐ฏโขยฎๅ ๅฅไฝ ็ไผบๆๅจ')
      .setURL("https://top.gg/bot/804651902896963584")
    const supporte = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setTitle(`ๆ้่ฃกๅ ๅฅ${client.user.tag}็ไผบๆๅจ`)
    .setURL("https://discord.gg/vbKauQ4")
    message.channel.send(supporte, addbot)
    }
  } else if (message.content.startsWith("<@") && message.content.endsWith("804651902896963584>")) {
    const language = db.get(`language_${message.author.id}`) 
    if (language === "english") {
      const prefix = new Discord.MessageEmbed()
    .setTitle(`Invite me`)
    .setURL("https://discord.com/oauth2/authorize?client_id=804651902896963584&scope=bot%20applications.commands&permissions=8")
    .addField("my prefix for this guild is:", `${guildPrefix}`)
    if (privateprefix && privateprefix !== guildPrefix) prefix.addField("private prefix for you is:", privateprefix)
    message.lineReply(prefix)
    } else if (language === "chinese") {
      const prefix = new Discord.MessageEmbed()
    .setTitle(`้่ซๆ`)
    .setURL("https://discord.com/oauth2/authorize?client_id=804651902896963584&scope=bot%20applications.commands&permissions=8")
    .addField("้ๅไผบๆๅจ็ๅ่ผๆฏ:", `${guildPrefix}`)
    if (privateprefix && privateprefix !== guildPrefix) prefix.addField("ไฝ ็็ง็จๅ่ผๆฏ:", privateprefix)
    message.lineReply(prefix)
    }
  } else if (message.content.startsWith(guildPrefix + "bot-info") || message.content.startsWith(privateprefix + "bot-info")) {
    const language = db.get(`language_${message.author.id}`)
    const bot = message.mentions.users.last()
    if (language === "english") {
      if (!bot && !args[1]) return message.lineReply("Please mention a bot or give a bot ID")
    } else if (language === "chinese") {
      if (!bot && !args[1]) return message.lineReply("่ซmentionๆญฃ็ขบ็ๆฉๅจไบบๆ็ตฆไธๅๆญฃ็ขบ็ๆฉๅจไบบID")
    }
    if (language === "english") {
      const list = args.slice(2,3).join("")
    if (list !== "top.gg" && list !== "discordz.xyz" && list !== "disbotlist.xyz") return message.lineReply("Please select a bot list\nSupported bot lists:\n`top.gg`,\n`discordz.xyz`,\n`disbotlist.xyz`")
      if (bot) {
      if (!bot.bot) return message.lineReply("Please mention a bot not a user")
      const botid = bot.id
      if (list == "top.gg") {
        await fetch(`https://top.gg/api/bots/${botid}`, {
      headers: {
        authorization: process.env.Topggtoken
      }
    }) 
    .then(res => res.json())
    .then(data => {
      if (data.error) return message.lineReply("Sorry the bot is not on top.gg.\nPlease try again!")
      const botembed = new Discord.MessageEmbed()
      .setTitle(`Bot info of ${data.username}#${data.discriminator}`)
      .addField("Short Description", data.shortdesc, true)
      .addField("Prefix", data.prefix, true)
      .addField("Tags", data.tags, true)
      .addField("Owners", data.owners, true)
      .setThumbnail(`https://cdn.discordapp.com/avatars/${botid}/${data.defAvatar}.webp`)
      .addField("Votes This Month", data.monthlyPoints, true)
      .addField("Invite", `Invite link for ${data.username}#${data.discriminator}\n[Click here](${data.invite})`)
      .addField("Total Votes", data.points, true)
      if (data.support && data.support !== "null") {
        botembed.addField("Support Server", `${data.username}#${data.discriminator}'s support server\n[Click here](https://discord.gg/${data.support})`, true)
      
      }

      if (data.website && data.website !== "null") {
       botembed.addField("Website", `${data.username}#${data.discriminator}'s website\n[Click here](${data.website})`, true) 
      }

      if (data.server_count && data.server_count !== "null") {
       botembed.addField("Server Count", data.server_count, true) 
      }
      message.channel.send(botembed)
      //top.gg
    })
      } else if (list == "discordz.xyz") {
        await fetch(`https://discordz.xyz/api/bots/${botid}`)
        .then(res => res.json())
        .then(async data => {
          if (data.error) return message.lineReply("Sorry the bot is not on discordz.xyz.\nPlease try again!")
          const botinfo = dapi.duserinfo(`${botid}`).then(botinfo => {
            const botembed = new Discord.MessageEmbed()
      .setTitle(`Bot info of ${botinfo.username}#${botinfo.discriminator}`)
      .addField("Short Description", data.shortDesc, true)
      .addField("Prefix", data.prefix, true)
      .addField("Tags", data.tags, true)
      .addField("Owners", data.ownerID, true)
      .setThumbnail(`${data.avatar}`)
      .addField("Votes", data.votes, true)
      .addField("Invite", `Invite link for ${botinfo.username}#${botinfo.discriminator}\n[Click here](https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot%20applications.commands&permissions=8)`)
      if (data.support && data.support !== "null") {
        botembed.addField("Support Server", `${botinfo.username}#${botinfo.discriminator}'s support server\n[Click here](${data.support})`, true)
      
      }

      if (data.website && data.website !== "null") {
       botembed.addField("Website", `${botinfo.username}#${botinfo.discriminator}'s website\n[Click here](${data.website})`, true) 
      }

      if (data.serverCount && data.serverCount !== "null") {
       botembed.addField("Server Count", data.serverCount, true) 
      }
      message.channel.send(botembed)
            //discordz.xyz
          })
        })
      } else if (list == "disbotlist.xyz") {
        await fetch(`https://disbotlist.xyz/api/bots/${botid}`)
        .then(res => res.json())
        .then(async data => {
          if (data.error) return message.lineReply("Sorry the bot is not on disbotlist.xyz.\nPlease try again!")
          const botinfo = dapi.duserinfo(`${botid}`).then(botinfo => {
            const botembed = new Discord.MessageEmbed()
      .setTitle(`Bot info of ${botinfo.username}#${botinfo.discriminator}`)
      .addField("Short Description", data.shortDesc, true)
      .addField("Prefix", data.prefix, true)
      .addField("Tags", data.tags, true)
      .addField("Owners", data.ownerID, true)
      .setThumbnail(`${data.avatar}`)
      .addField("Votes", data.votes, true)
      .addField("Invite", `Invite link for ${botinfo.username}#${botinfo.discriminator}\n[Click here](${data.invite})`)
      if (data.support && data.support !== "") {
        botembed.addField("Support Server", `${botinfo.username}#${botinfo.discriminator}'s support server\n[Click here](${data.support})`, true)
      
      }

      if (data.website && data.website !== "") {
       botembed.addField("Website", `${botinfo.username}#${botinfo.discriminator}'s website\n[Click here](${data.website})`, true) 
      }

      if (data.github && data.github !== "") {
       botembed.addField("Github", `[Click here](${data.github})`, true) 
      }
      message.channel.send(botembed)
            //disbotlist.xyz
          })
        })
      }
    } else {
      const botid = args.slice(1,2).join("")
      if (!botid || isNaN(botid)) return message.lineReply("Please give a bot id")
      if (list == "top.gg") {
        await fetch(`https://top.gg/api/bots/${botid}`, {
      headers: {
        authorization: process.env.Topggtoken
      }
    }) 
    .then(res => res.json())
    .then(data => {
      if (data.error) return message.lineReply("Sorry the bot is not on top.gg.\nPlease try again!")
      const botembed = new Discord.MessageEmbed()
      .setTitle(`Bot info of ${data.username}#${data.discriminator}`)
      .addField("Short Description", data.shortdesc, true)
      .addField("Prefix", data.prefix, true)
      .addField("Tags", data.tags, true)
      .addField("Owners", data.owners, true)
      .setThumbnail(`https://cdn.discordapp.com/avatars/${botid}/${data.defAvatar}.webp`)
      .addField("Votes This Month", data.monthlyPoints, true)
      .addField("Invite", `Invite link for ${data.username}#${data.discriminator}\n[Click here](${data.invite})`)
      .addField("Total Votes", data.points, true)
      if (data.support && data.support !== "null") {
        botembed.addField("Support Server", `${data.username}#${data.discriminator}'s support server\n[Click here](https://discord.gg/${data.support})`, true)
      
      }

      if (data.website && data.website !== "null") {
       botembed.addField("Website", `${data.username}#${data.discriminator}'s website\n[Click here](${data.website})`, true) 
      }

      if (data.server_count && data.server_count !== "null") {
       botembed.addField("Server Count", data.server_count, true) 
      }
      message.channel.send(botembed)
    })
      } else if (list == "discordz.xyz") {
        await fetch(`https://discordz.xyz/api/bots/${botid}`)
        .then(res => res.json())
        .then(async data => {
          if (data.error) return message.lineReply("Sorry the bot is not on discordz.xyz.\nPlease try again!")
          const botinfo = dapi.duserinfo(`${botid}`).then(botinfo => {
            const botembed = new Discord.MessageEmbed()
      .setTitle(`Bot info of ${botinfo.username}#${botinfo.discriminator}`)
      .addField("Short Description", data.shortDesc, true)
      .addField("Prefix", data.prefix, true)
      .addField("Tags", data.tags, true)
      .addField("Owners", data.ownerID, true)
      .setThumbnail(`${data.avatar}`)
      .addField("Votes", data.votes, true)
      .addField("Invite", `Invite link for ${botinfo.username}#${botinfo.discriminator}\n[Click here](https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot%20applications.commands&permissions=8)`)
      if (data.support && data.support !== "null") {
        botembed.addField("Support Server", `${botinfo.username}#${botinfo.discriminator}'s support server\n[Click here](${data.support})`, true)
      
      }

      if (data.website && data.website !== "null") {
       botembed.addField("Website", `${botinfo.username}#${botinfo.discriminator}'s website\n[Click here](${data.website})`, true) 
      }

      if (data.serverCount && data.serverCount !== "null") {
       botembed.addField("Server Count", data.serverCount, true) 
      }
      message.channel.send(botembed)
          })
        })
      } else if (list == "disbotlist.xyz") {
        await fetch(`https://disbotlist.xyz/api/bots/${botid}`)
        .then(res => res.json())
        .then(async data => {
          if (data.error) return message.lineReply("Sorry the bot is not on disbotlist.xyz.\nPlease try again!")
          const botinfo = dapi.duserinfo(`${botid}`).then(botinfo => {
            const botembed = new Discord.MessageEmbed()
      .setTitle(`Bot info of ${botinfo.username}#${botinfo.discriminator}`)
      .addField("Short Description", data.shortDesc, true)
      .addField("Prefix", data.prefix, true)
      .addField("Tags", data.tags, true)
      .addField("Owners", data.ownerID, true)
      .setThumbnail(`${data.avatar}`)
      .addField("Votes", data.votes, true)
      .addField("Invite", `Invite link for ${botinfo.username}#${botinfo.discriminator}\n[Click here](${data.invite})`)
      if (data.support && data.support !== "") {
        botembed.addField("Support Server", `${botinfo.username}#${botinfo.discriminator}'s support server\n[Click here](${data.support})`, true)
      
      }

      if (data.website && data.website !== "") {
       botembed.addField("Website", `${botinfo.username}#${botinfo.discriminator}'s website\n[Click here](${data.website})`, true) 
      }

      if (data.github && data.github !== "") {
       botembed.addField("Github", `[Click here](${data.github})`, true) 
      }
      message.channel.send(botembed)
            //disbotlist.xyz
          })
        })
      }
    }
    } else if (language === "chinese") {
      if (bot) {
      if (!bot.bot) return message.lineReply("่ซmentionๆญฃ็ขบ็ๆฉๅจไบบ\nๅ้ๆจฃ <@!804651902896963584>")
      const botid = bot.id
      const list = args.slice(2,3).join("")
    if (list !== "top.gg" && list !== "discordz.xyz" && list !== "disbotlist.xyz") return message.lineReply("่ซ็ตฆไบไธๅๆๆฏๆด็ๆฉๅจไบบ็ฎ้\nๆๆฏๆด็ๆฉๅจไบบ็ฎ้:\n`top.gg`,\n`discordz.xyz`,\n`disbotlist.xyz`")
      if (list == "top.gg") {
        await fetch(`https://top.gg/api/bots/${botid}`, {
      headers: {
        authorization: process.env.Topggtoken
      }
    }) 
    .then(res => res.json())
    .then(data => {
      if (data.error) return message.lineReply("้ฃๅๆฉๅจไบบไธๅtop.ggไธ\n่ซ่ฉฆ่ฉฆๅถไป็ๆฉๅจไบบ")
      const botembed = new Discord.MessageEmbed()
      .setTitle(`${data.username}#${data.discriminator}็่ณๆ`)
      .addField("็ฐกไป", data.shortdesc, true)
      .addField("ๅ่ผ", data.prefix, true)
      .addField("้กๅฅ", data.tags, true)
      .addField("ๆๆ่ & ๅตไฝ่ๅ", data.owners, true)
      .setThumbnail(`https://cdn.discordapp.com/avatars/${botid}/${data.defAvatar}.webp`)
      .addField("้ๅๆ็ๆ็ฅจ้", data.monthlyPoints, true)
      .addField("ๆฉๅจไบบ้่ซ", `${data.username}#${data.discriminator}็ๆฉๅจไบบ้่ซ\n[ๆ้่ฃก](${data.invite})`)
      .addField("็ธฝๆ็ฅจ", data.points, true)
      if (data.support && data.support !== "null") {
        botembed.addField("ๆฉๅจไบบๆดๅฉไผบๆๅจ", `${data.username}#${data.discriminator}็ๆดๅฉไผบๆๅจ\n[ๆ้่ฃก](https://discord.gg/${data.support})`, true)
      
      }

      if (data.website && data.website !== "null") {
       botembed.addField("็ถฒ็ซ", `${data.username}#${data.discriminator}็็ถฒ็ซ\n[ๆ้่ฃก](${data.website})`, true) 
      }

      if (data.server_count && data.server_count !== "null") {
       botembed.addField("ไผบๆๅจ้", data.server_count, true) 
      }
      message.channel.send(botembed)
    })
      } else if (list == "discordz.xyz") {
        await fetch(`https://discordz.xyz/api/bots/${botid}`)
        .then(res => res.json())
        .then(async data => {
          if (data.error) return message.lineReply("้ฃๅๆฉๅจไบบไธๅdiscordz.xyzไธ\n่ซ่ฉฆ่ฉฆๅถไป็ๆฉๅจไบบ")
          const done = dapi.duserinfo(`${botid}`).then(botinfo => {
            const botembed = new Discord.MessageEmbed()
      .setTitle(`${botinfo.username}#${botinfo.discriminator}็่ณๆ`)
      .addField("็ฐกไป", data.shortDesc, true)
      .addField("ๅ่ผ", data.prefix, true)
      .addField("้กๅฅ", data.tags, true)
      .addField("ๆๆ่", data.ownerID, true)
      .setThumbnail(`${data.avatar}`)
      .addField("ๆ็ฅจ้", data.votes, true)
      .addField("ๆฉๅจไบบ้่ซ", `${botinfo.username}#${botinfo.discriminator}็ๆฉๅจไบบ้่ซ\n[ๆ้่ฃก](https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot%20applications.commands&permissions=8)`)
      if (data.support && data.support !== "null") {
        botembed.addField("ๆฉๅจไบบๆดๅฉไผบๆๅจ", `${botinfo.username}#${botinfo.discriminator}็ๆดๅฉไผบๆๅจ\n[ๆ้่ฃก](${data.support})`, true)
      
      }

      if (data.website && data.website !== "null") {
       botembed.addField("็ถฒ็ซ", `${botinfo.username}#${botinfo.discriminator}็็ถฒ็ซ\n[ๆ้่ฃก](${data.website})`, true) 
      }

      if (data.serverCount && data.serverCount !== "null") {
       botembed.addField("ไผบๆๅจ้", data.serverCount, true) 
      }
      message.channel.send(botembed)
          })
        })
      } else if (list == "disbotlist.xyz") {
        await fetch(`https://disbotlist.xyz/api/bots/${botid}`)
        .then(res => res.json())
        .then(async data => {
          if (data.error) return message.lineReply("disbotlist.xyzไธ\n่ซ่ฉฆ่ฉฆๅถไป็ๆฉๅจไบบ")
          const done = dapi.duserinfo(`${botid}`).then(botinfo => {
            const botembed = new Discord.MessageEmbed()
      .setTitle(`${botinfo.username}#${botinfo.discriminator}็่ณๆ`)
      .addField("็ฐกไป", data.shortDesc, true)
      .addField("ๅ่ผ", data.prefix, true)
      .addField("้กๅฅ", data.tags, true)
      .addField("ๆๆ่", data.ownerID, true)
      .setThumbnail(`${data.avatar}`)
      .addField("ๆ็ฅจ้", data.votes, true)
      .addField("ๆฉๅจไบบ้่ซ", `${botinfo.username}#${botinfo.discriminator}็ๆฉๅจไบบ้่ซ\n[ๆ้่ฃก](${data.invite})`)
      if (data.support && data.support !== "") {
        botembed.addField("ๆฉๅจไบบๆดๅฉไผบๆๅจ", `${botinfo.username}#${botinfo.discriminator}็ๆดๅฉไผบๆๅจ\n[ๆ้่ฃก](${data.support})`, true)
      
      }

      if (data.website && data.website !== "") {
       botembed.addField("็ถฒ็ซ", `${botinfo.username}#${botinfo.discriminator}็็ถฒ็ซ\n[ๆ้่ฃก](${data.website})`, true) 
      }

      if (data.github && data.github !== "") {
       botembed.addField("Github", `[ๆ้่ฃก](${data.github})`, true) 
      }
      message.channel.send(botembed)
          })
        })
    } else {
      const botid = args.slice(1,2).join("")
      if (!botid || isNaN(botid)) return message.lineReply("่ซ็ตฆไธๅๆญฃ็ขบ็ๆฉๅจไบบID")
      if (list == "top.gg") {
        await fetch(`https://top.gg/api/bots/${botid}`, {
      headers: {
        authorization: process.env.Topggtoken
      }
    }) 
    .then(res => res.json())
    .then(data => {
      if (data.error) return message.lineReply("้ฃๅๆฉๅจไบบไธๅtop.ggไธ\n่ซ่ฉฆ่ฉฆๅถไป็ๆฉๅจไบบ")
      const botembed = new Discord.MessageEmbed()
      .setTitle(`${data.username}#${data.discriminator}็่ณๆ`)
      .addField("็ฐกไป", data.shortdesc, true)
      .addField("ๅ่ผ", data.prefix, true)
      .addField("้กๅฅ", data.tags, true)
      .addField("ๆๆ่ & ๅตไฝ่ๅ", data.owners, true)
      .setThumbnail(`https://cdn.discordapp.com/avatars/${botid}/${data.defAvatar}.webp`)
      .addField("้ๅๆ็ๆ็ฅจ้", data.monthlyPoints, true)
      .addField("ๆฉๅจไบบ้่ซ", `${data.username}#${data.discriminator}็ๆฉๅจไบบ้่ซ\n[ๆ้่ฃก](${data.invite})`)
      .addField("็ธฝๆ็ฅจ", data.points, true)
      if (data.support && data.support !== "null") {
        botembed.addField("ๆฉๅจไบบๆดๅฉไผบๆๅจ", `${data.username}#${data.discriminator}็ๆดๅฉไผบๆๅจ\n[ๆ้่ฃก](https://discord.gg/${data.support})`, true)
      
      }

      if (data.website && data.website !== "null") {
       botembed.addField("็ถฒ็ซ", `${data.username}#${data.discriminator}็็ถฒ็ซ\n[ๆ้่ฃก](${data.website})`, true) 
      }

      if (data.server_count && data.server_count !== "null") {
       botembed.addField("ไผบๆๅจ้", data.server_count, true) 
      }
      message.channel.send(botembed)
    })
      } else if (list == "discordz.xyz") {
        await fetch(`https://discordz.xyz/api/bots/${botid}`)
        .then(res => res.json())
        .then(async data => {
          if (data.error) return message.lineReply("้ฃๅๆฉๅจไบบไธๅdiscordz.xyzไธ\n่ซ่ฉฆ่ฉฆๅถไป็ๆฉๅจไบบ")
          const done = dapi.duserinfo(`${botid}`).then(botinfo => {
            const botembed = new Discord.MessageEmbed()
      .setTitle(`${botinfo.username}#${botinfo.discriminator}็่ณๆ`)
      .addField("็ฐกไป", data.shortDesc, true)
      .addField("ๅ่ผ", data.prefix, true)
      .addField("้กๅฅ", data.tags, true)
      .addField("ๆๆ่", data.ownerID, true)
      .setThumbnail(`${data.avatar}`)
      .addField("ๆ็ฅจ้", data.votes, true)
      .addField("ๆฉๅจไบบ้่ซ", `${botinfo.username}#${botinfo.discriminator}็ๆฉๅจไบบ้่ซ\n[ๆ้่ฃก](https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot%20applications.commands&permissions=8)`)
      if (data.support && data.support !== "null") {
        botembed.addField("ๆฉๅจไบบๆดๅฉไผบๆๅจ", `${botinfo.username}#${botinfo.discriminator}็ๆดๅฉไผบๆๅจ\n[ๆ้่ฃก](${data.support})`, true)
      
      }

      if (data.website && data.website !== "null") {
       botembed.addField("็ถฒ็ซ", `${botinfo.username}#${botinfo.discriminator}็็ถฒ็ซ\n[ๆ้่ฃก](${data.website})`, true) 
      }

      if (data.serverCount && data.serverCount !== "null") {
       botembed.addField("ไผบๆๅจ้", data.serverCount, true) 
      }
      message.channel.send(botembed)
          })
        })
      } else if (list == "disbotlist.xyz") {
        await fetch(`https://disbotlist.xyz/api/bots/${botid}`)
        .then(res => res.json())
        .then(async data => {
          if (data.error) return message.lineReply("disbotlist.xyzไธ\n่ซ่ฉฆ่ฉฆๅถไป็ๆฉๅจไบบ")
          const done = dapi.duserinfo(`${botid}`).then(botinfo => {
            const botembed = new Discord.MessageEmbed()
      .setTitle(`${botinfo.username}#${botinfo.discriminator}็่ณๆ`)
      .addField("็ฐกไป", data.shortDesc, true)
      .addField("ๅ่ผ", data.prefix, true)
      .addField("้กๅฅ", data.tags, true)
      .addField("ๆๆ่", data.ownerID, true)
      .setThumbnail(`${data.avatar}`)
      .addField("ๆ็ฅจ้", data.votes, true)
      .addField("ๆฉๅจไบบ้่ซ", `${botinfo.username}#${botinfo.discriminator}็ๆฉๅจไบบ้่ซ\n[ๆ้่ฃก](${data.invite})`)
      if (data.support && data.support !== "") {
        botembed.addField("ๆฉๅจไบบๆดๅฉไผบๆๅจ", `${botinfo.username}#${botinfo.discriminator}็ๆดๅฉไผบๆๅจ\n[ๆ้่ฃก](${data.support})`, true)
      
      }

      if (data.website && data.website !== "") {
       botembed.addField("็ถฒ็ซ", `${botinfo.username}#${botinfo.discriminator}็็ถฒ็ซ\n[ๆ้่ฃก](${data.website})`, true) 
      }

      if (data.github && data.github !== "") {
       botembed.addField("Github", `[ๆ้่ฃก](${data.github})`, true) 
      }
      message.channel.send(botembed)
          })
        })
    }
      }
      }
    }
  }
})

client.on("message", async message => {
  if (message.author.bot) return;
  if (!db.has(`language_${message.author.id}`)) {
    db.set(`language_${message.author.id}`, "english")
  }
  let privateprefix = prefix.getPrefix(message.author.id)
  let guildPrefix = prefix.getPrefix(message.guild.id)
  if (!privateprefix) privateprefix = guildPrefix
  if (!guildPrefix) guildPrefix = defaultPrefix;

  let args = message.content.slice(guildPrefix.length || privateprefix.length).split(' ');
  
   if (message.content.startsWith(guildPrefix + "info") || message.content.startsWith(privateprefix + "info")) {
    const language = db.get(`language_${message.author.id}`)
    if (language === "english") {
      await fetch(`https://top.gg/api/bots/${client.user.id}`, {
      headers: {
        authorization: process.env.Topggtoken
      }
    }) 
    .then(res => res.json())
    .then(data => {
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `Online for ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    const infoembed = new Discord.MessageEmbed()
    .setTitle(`**My info**`)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setFooter(`Info for ${client.user.tag}`, client.user.displayAvatarURL())
    .addField("Owner & Developer", "๐ฏ๐ฝ๐ฌ๐ฒ๐บ๐น๐ณ๐๐น๐ฟ๐ฐ๐ฝโขยฎ-๐ช๐ ๐ท๐ค๐ฌ๐ก๐ญ๐ฆ๐ค๐ค๐ถแดฐแตแต#4992", true)
    .addField("Server Count", `${client.guilds.cache.size}`, true)
    .addField("User Count", `${client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)}`, true)
      .addField("Uptime", uptime)
    .addField("Votes This Month", data.monthlyPoints, true)
    .addField("Total Votes", data.points, true)
    .addField("Support Server", "Join my support server [here](https://discord.gg/vbKauQ4)", true)
    .addField("Website", "Docs [click here](https://mczgodpiggy.github.io/bot-manager/index.html)", true)
    .addField("Vote for me at", "<:top_gg:942249210181476452> [top.gg](https://top.gg/bot/804651902896963584)\n<:discordz_xyz:942250139794415726> [discordz.xyz](https://discordz.xyz/bot/804651902896963584)\n<:consteagle_com:942250753916022835> [consteagle.com](https://consteagle.com/bots/like/804651902896963584)\n<:disbotlist_xyz:942249586490224650> [disbotlist.xyz](https://disbotlist.xyz/bot/804651902896963584/vote)", true)
    .addField("Invite Link", "Invite me [here](https://discord.com/api/oauth2/authorize?client_id=804651902896963584&permissions=8&scope=bot%20applications.commands)", true)
    message.lineReply(infoembed)
    })
    } else if (language === "chinese") {
      await fetch(`https://top.gg/api/bots/${client.user.id}`, {
      headers: {
        authorization: process.env.Topggtoken
      }
    }) 
    .then(res => res.json())
    .then(data => {
      let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `ๆๅทฒ็ถ้ฃ็บไธ็ทไบ${days}ๅคฉ ${hours}ๅฐๆ${minutes}ๅ้ๅ${seconds}็ง`;
    const infoembed = new Discord.MessageEmbed()
    .setTitle(`**ๆ็่ณๆ**`)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setFooter(`${client.user.tag}็่ณๆ`, client.user.displayAvatarURL())
    .addField("ๆๆ่ & ่ฃฝไฝ่", "๐ฏ๐ฝ๐ฌ๐ฒ๐บ๐น๐ณ๐๐น๐ฟ๐ฐ๐ฝโขยฎ-๐ช๐ ๐ท๐ค๐ฌ๐ก๐ญ๐ฆ๐ค๐ค๐ถแดฐแตแต#4992", true)
    .addField("ไผบๆๅจ้", `${client.guilds.cache.size}`, true)
    .addField("ไฝฟ็จ่ๆธ", `${client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)}`, true)
      .addField("้ฃ็บไธ็ทๆ้", uptime)
    .addField("้ๅๆ็ๆ็ฅจ้", data.monthlyPoints, true)
    .addField("็ธฝๆ็ฅจ", data.points, true)
    .addField("ๆดๅฉไผบๆๅจ็้่ซ", "้ปๆ[้](https://discord.gg/vbKauQ4)ๅ ๅฅๆ็ๆดๅฉไผบๆๅจ", true)
    .addField("็ถฒ็ซ", "็ฐกไป [click here](https://mczgodpiggy.github.io/bot-manager/index.html)", true)
    .addField("ๆๆไธ็ฅจ", "<:top_gg:942249210181476452> [top.gg](https://top.gg/bot/804651902896963584)\n<:discordz_xyz:942250139794415726> [discordz.xyz](https://discordz.xyz/bot/804651902896963584)\n<:consteagle_com:942250753916022835> [consteagle.com](https://consteagle.com/bot/804651902896963584)\n<:disbotlist_xyz:942249586490224650> [disbotlist.xyz](https://disbotlist.xyz/bot/804651902896963584/vote)", true)
    .addField("ๆฉๅจไบบ้่ซ", "ๅ ๆ[้่ฃก](https://discord.com/api/oauth2/authorize?client_id=804651902896963584&permissions=8&scope=bot%20applications.commands)", true)
    message.lineReply(infoembed)
    })
    }
  } else if (message.content.startsWith(guildPrefix + "set-language") || message.content.startsWith(privateprefix + "set-language")) {
    const language = db.get(`language_${message.author.id}`)
    if (language == "english") {
      
    const langembed = new Discord.MessageEmbed()
    .setTitle("Choose your language")
      .addField("Use 1 to pick", "English", true)
      .addField("็จ2้ธ", "ไธญๆ", true)
      .addField("** **", "Type cancel or ๅๆถ to cancel")
    message.channel.send(langembed).then(() => {
      message.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max: 1,
                    time: 10000,
                    errors: ['time']
                })โ.then(col => {
        const answer = col.first().content.toString()
        
        if (answer !== "1" && answer !== "2" && answer.toLowerCase() !== "cancel" && answer !== "ๅๆถ") return message.lineReply("please give a valid option from the list above")

        if (answer.toLowerCase() == "cancel" || answer == "ๅๆถ") return message.lineReply("language selection cancelled")
        if (answer == "1") {
          db.set(`language_${message.author.id}`, "english")
          message.lineReply("Your language has been updated to English")
        } else if (answer == "2") {
          db.set(`language_${message.author.id}`, "chinese")
          message.lineReply("ไฝ ็่ช่จๅทฒ่ขซๆดๆฐ็บไธญๆ")
        }
                }).catch(err => {
        message.lineReply("You didn't pick a selection in time please try again")
                })

    })
    } else if (language == "chinese") {
      
    const langembed = new Discord.MessageEmbed()
    .setTitle("้ธๆไฝ ็่ช่จ")
      .addField("Use 1 to pick", "English", true)
      .addField("็จ2้ธ", "ไธญๆ", true)
      .addField("** **", "็จๅๆถๆcancelไพๅๆถ")
    message.channel.send(langembed).then(() => {
      message.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max: 1,
                    time: 10000,
                    errors: ['time']
                })โ.then(col => {
        const answer = col.first().content.toString()
        if (answer !== "1" && answer !== "2" && answer !== "cancel" && answer !== "ๅๆถ") return message.lineReply("่ซ็ตฆ่ๅ่กจไธ็็ญๆก")

        if (answer == "cancel" || answer == "ๅๆถ") return message.lineReply("่ช่จๆดๆฐๅทฒๅๆถ")
        if (answer == "1") {
          db.set(`language_${message.author.id}`, "english")
          message.lineReply("Your language has been updated to English")
        } else if (answer == "2") {
          db.set(`language_${message.author.id}`, "chinese")
          message.lineReply("ไฝ ็่ช่จๅทฒ่ขซๆดๆฐ็บไธญๆ")
        }
                }).catch(err => {
        message.lineReply("ไฝ ๆฒๆๅจๆ้ๅง็ตฆๅบ็ญๆก\n่ซๅ่ฉฆไธๆฌก")
                })

    })
    }
  } else if (message.content.startsWith(guildPrefix + "eval") || message.content.startsWith(privateprefix + "eval")) {
    owners = [`599050023669334037`]
  if (!owners.includes(message.author.id)) return message.lineReply("your not my owner you can't use this command")
  
  let msg = message
  const {
    MessageEmbed
  } = require('discord.js')
  const {
    inspect
  } = require('util')
  const givecode = new MessageEmbed()
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
  .setTitle(`${message.author.tag} please give the code you want to eval in javascript/js format`)
  .setDescription("You have 2 minutes to type the code")
  .setFooter("I will wait until 2 minutes have gone by or you cancelled {by typing cacnel in chat}", message.author.displayAvatarURL())
  message.channel.send(givecode).then(() => {
    message.channel.awaitMessages(m => m.author.id === message.author.id, {
					max: 1,
					time: 120000,
					errors: ['time']
				})
        .then(col => {
          const answer = col.first().content.toString()
          const cancelled = new MessageEmbed()
          .setTitle("Javascript code eval cancelled")
          .setDescription("Successfully cancelled the eval")
          .setTimestamp()
          if (answer.startsWith("cancel") || answer.startsWith("Cancel")) return message.lineReply(cancelled)
          if (answer.includes("client.token") || answer.includes("process.env.TOKEN")) return message.lineReply("Only noobs will allow that to be evaled")
const embed = new MessageEmbed()
    .setFooter(msg.author.tag, msg.author.displayAvatarURL({
      dynamic: true,
      format: 'png',
      size: 4096
    }))

  const query = answer
  const code = (lang, code) => (`\`\`\`${lang}\n${String(code).slice(0, 1000) + (code.length >= 1000 ? '...' : '')}\n\`\`\``).replace(client.token, '*'.repeat(client.token.length))

  if (!query) {
    const embed1 = new MessageEmbed()
      .setColor(`#f04947`)
      .setDescription("<a:NO:867066462027907072> **| Please give me something for evaluation!**")
    return message.channel.send(embed1)
  }
  else {
    try {
      const evald = eval(query)
      const res = typeof evald === 'string' ? evald : inspect(evald, {
        depth: 0
      })

      embed.addField('Result', code('js', res))

      if (!Boolean(res) || (!Boolean(evald) && evald !== 0)) embed.setColor('RED')
      else {
        embed
          .addField('Type', code('css', typeof evald))
          .setColor('GREEN')
      }
    } catch (error) {
      embed
        .addField('Error', code('js', error))
        .setColor('RED')
    } finally {
      msg.channel.send(embed).catch(error => {
        msg.channel.send(`There was an error while displaying the eval result! ${error.message}`)
      })
    }
  }
        }).catch(err => {
    const error = new Discord.MessageEmbed()
    .setTitle("2 minutes have gone by time is up")
    .setDescription("The 2 minutes timer have gone by\nPlease re-do the command")
    .setTimestamp()
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setFooter("Time is up", message.author.displayAvatarURL())
    message.lineReply(error)
    console.log(err)
  })
  })
  }
})

client.ws.on("INTERACTION_CREATE", async interaction => {
  const command = interaction.data.name.toLowerCase();
  const args = interaction.data.options;
  if (command === "stats") {
    let serverlist = ''
    client.guilds.cache.forEach((guild) => {
      serverlist = serverlist.concat(guild.name + "\n")
    })
    const avgusersnf = client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c) / client.guilds.cache.size
    const avgusers = avgusersnf.toFixed()
    const sembed = new Discord.MessageEmbed()
      .setColor("GOLD")
      .setTitle(`Server count is ${client.guilds.cache.size} servers`, '')
      .addField("Total users", client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c))
      .addField("Average users per server", avgusers)
      .addField("Support server", "[click here](https://mczgodpiggyio.addbot.repl.co/dc)")
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            embeds: [sembed]
          }
        }
      })
  }
})
client.login(process.env.TOKEN)