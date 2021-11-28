require("./webhook.js")
const Discord = require("discord.js")
require("discord-reply")
const client = new Discord.Client({ totalShards: 88 })
const db = require("quick.db")
const prefix = require("discord-prefix")
const disbut = require("discord-buttons")
disbut(client)
const fetch = require("node-fetch")
const ecommands = require('./ehelp');
const ccommands = require("./chelp")
var defaultPrefix = 'd.';
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
    "5": "Made with ♥ by 𝕯𝕽𝕬𝕲𝕺𝕹𝕳𝖀𝕹𝕿𝕰𝕽™®-𝔪𝔠𝔷𝔤𝔬𝔡𝔭𝔦𝔤𝔤𝔶ᴰᵉᵛ#4992"
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
      }, 4000)
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
  
  if (message.content.startsWith(guildPrefix + "setprivateprefix") || message.content.startsWith(privateprefix + "setprivateprefix")) {
    const language = db.get(`language_${message.author.id}`)
    if (language === "english") {
    let newprefix = args.slice(1, 2).join("")
    if (!newprefix || newprefix.includes("1") || newprefix.includes("2") || newprefix.includes("3") || newprefix.includes("4") || newprefix.includes("5") || newprefix.includes("6") || newprefix.includes("7") || newprefix.includes("8") || newprefix.includes("9") || newprefix.includes("0") || newprefix.includes("9") || newprefix.includes("@here") || newprefix.includes("@everyone")) return message.lineReply("please give a prefix in text")
    prefix.setPrefix(newprefix, message.author.id)
    await message.lineReply("done now prefix for you is " + "`" + newprefix + "`")
    } else if (language === "chinese") {
    let newprefix = args.slice(1, 2).join("")
    if (!newprefix || newprefix.includes("1") || newprefix.includes("2") || newprefix.includes("3") || newprefix.includes("4") || newprefix.includes("5") || newprefix.includes("6") || newprefix.includes("7") || newprefix.includes("8") || newprefix.includes("9") || newprefix.includes("0") || newprefix.includes("9") || newprefix.includes("@here") || newprefix.includes("@everyone")) return message.lineReply("請給予一個前輟")
    prefix.setPrefix(newprefix, message.author.id)
    await message.lineReply("你的新前輟是" + "`" + newprefix + "`")
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
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply('你需要`管理者`層級的權限才能用這個指令');
    let newprefix = args.slice(1, 2).join("")
    if (!newprefix || newprefix.includes("1") || newprefix.includes("2") || newprefix.includes("3") || newprefix.includes("4") || newprefix.includes("5") || newprefix.includes("6") || newprefix.includes("7") || newprefix.includes("8") || newprefix.includes("9") || newprefix.includes("0") || newprefix.includes("@here") || newprefix.includes("@everyone")) return message.lineReply("請給予一個前輟")
    prefix.setPrefix(newprefix, message.guild.id)
    await message.lineReply("這個伺服器的新前輟是" + "`" + newprefix + "`")
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
          .addField("invite", `[invite here](https://discord.com/api/oauth2/authorize?client_id=${botid}&permissions=0&scope=bot%20applications.commands)`)
        message.lineReply("your bot has been submited to the queue please wait till other staffs review it")
        channel.send(`<@&${botapproverroleid}>`, { embed: botembed }
        ).then((msg) => msg.react("<a:check:850724870282674189>"))
        db.set(`newbot${botid}_${message.guild.id}`, message.author.id)
      }).catch(err => {
        console.log(err)
        message.lineReply(`I got some errors doing that the error is ${err}`)
        })
    } else if (language === "chinese") {
      if (!db.has(`botrole_${message.guild.id}`)) return message.lineReply("請用d.setup完成設定流程")
    const botid = args.slice(1, 2).join("")
    if (db.has(`newbot${botid}_${message.guild.id}`)) return message.lineReply("那個機器人仍在機器人清單裡，請等到那個機器人被接收/拒絕")
    const prefix = args.slice(2, 3).join("")
    if (!botid || isNaN(botid)) return message.lineReply("請給予一個機器人ID")
    if (!prefix) return message.lineReply("請給予一個前輟")
    
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
        message.lineReply("你的機器人已被加入機器人清單&日誌")
        channel.send(`<@&${botapproverroleid}>`, { embed: botembed }
        ).then((msg) => msg.react("<a:check:850724870282674189>"))
        db.set(`newbot${botid}_${message.guild.id}`, message.author.id)
      }).catch(err => {
        console.log(err)
        message.lineReply(`我在處理數據時發生了錯誤\n敬請見諒`)
        })
    }
  } else if (message.content.startsWith(guildPrefix + "reject") || message.content.startsWith(privateprefix + "reject")) {
    const language = db.get(`language_${message.author.id}`)
    if (language === "english") {
      if (!db.has(`botrole_${message.guild.id}`)) return message.lineReply("Please use d.setup to setup the bot")
    if (!message.member.roles.cache.find(r => r.id === `${botapproverroleid}`)) return message.lineReply(`you need <@&${botapproverroleid}> role to approve/reject bots`)
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
        if (userlang === "chinese") {
          user.send(`你的機器人${data.username}#${data.discriminator}被機器人管理者${message.author.tag}拒絕了\n因為${reason}`)
        } else if (userlang === "english") {
          user.send(`your bot ${data.username}#${data.discriminator} was rejected by approver ${message.author.tag}\nbecause of the reason ${reason}`)
        }
      }).catch(err => {
        console.log(err)
        message.lineReply(`I got some errors doing that the error is ${err}`)
        })
    } else if (language === "chinese") {
      if (!db.has(`botrole_${message.guild.id}`)) return message.lineReply("請用d.setup完成設定流程")
    if (!message.member.roles.cache.find(r => r.id === `${botapproverroleid}`)) return message.lineReply(`你需要<@&${botapproverroleid}>才能接收/拒絕機器人`)
    const botid = args.slice(1, 2).join("")
    if (!botid || isNaN(botid)) return message.lineReply("please give a bot ID")
    const reason = args.slice(2).join(" ")
    if (!reason) return message.lineReply("請給予拒絕的理由")
    const ownerid = db.get(`newbot${botid}_${message.guild.id}`)
    if (!ownerid) return message.lineReply("那個機器人不在機器人清單裡")
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
        message.lineReply("拒絕了" + `${data.username}#${data.discriminator}`)
        channel.send(`<@${ownerid}> your bot got rejected`, { embed: botembed })
        if (userlang === "chinese") {
          user.send(`你的機器人${data.username}#${data.discriminator}被機器人管理者${message.author.tag}拒絕了\n因為${reason}`)
        } else if (userlang === "english") {
          user.send(`your bot ${data.username}#${data.discriminator} was rejected by approver ${message.author.tag}\nbecause of the reason ${reason}`)
        }
      }).catch(err => {
        console.log(err)
        message.lineReply(`我在處理數據時發生了錯誤\n敬請見諒`)
        })
    }
  } else if (message.content.startsWith(guildPrefix + "approve") || message.content.startsWith(privateprefix + "approve")) {
    const language = db.get(`language_${message.author.id}`)
    if (language === "english") {
      if (!db.has(`botrole_${message.guild.id}`)) return message.lineReply("Please use d.setup to setup the bot")
    if (!message.member.roles.cache.find(r => r.id === `${botapproverroleid}`)) return message.lineReply(`you need <@&${botapproverroleid}> role to approve/reject bots`)
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
          user.send(`你的機器人${data.username}#${data.discriminator}被機器人管理者${message.author.tag}接收了`)
        } else if (userlang === "english") {
          user.send(`your bot ${data.username}#${data.discriminator} was approved by approver ${message.author.tag}`)
        }
      }).catch(err => {
        console.log(err)
        message.lineReply(`I got some errors doing that the error is ${err}`)
        })
    } else if (language === "chinese") {
      if (!db.has(`botrole_${message.guild.id}`)) return message.lineReply("請用d.setup完成設定流程")
    if (!message.member.roles.cache.find(r => r.id === `${botapproverroleid}`)) return message.lineReply(`你需要<@&${botapproverroleid}>才能接收/拒絕機器人`)
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
        message.lineReply("接收了" + `${data.username}${data.discriminator}`)
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
          user.send(`你的機器人${data.username}#${data.discriminator}被機器人管理者${message.author.tag}接收了`)
        } else if (userlang === "english") {
          user.send(`your bot ${data.username}#${data.discriminator} was approved by approver ${message.author.tag}`)
        }
      }).catch(err => {
        console.log(err)
        message.lineReply(`I got some errors doing that the error is ${err}`)
        })
    }
  } else if (message.content.startsWith(guildPrefix + "help") || message.content.startsWith(privateprefix + "help")) {
    const language = db.get(`language_${message.author.id}`)
    if (language === "english") {
      let addbot = new disbut.MessageButton()
        .setStyle('url')
        .setLabel('add me to your servers') 
        .setURL("https://discord.com/oauth2/authorize?client_id=804651902896963584&scope=bot%20applications.commands&permissions=8589934591")
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
              if (!ecommands[command].category && privateprefix != guildPrefix)
              embed
              .addField('DESCRIPTION', ecommands[command].description)
              .addField('FORMAT-private prefix', `\`\`\`${privateprefix}${ecommands[command].format}\`\`\``)
              .addField("FORMAT-guild prefix", `\`\`\`${guildPrefix}${ecommands[command].format}\`\`\``)
              if (!ecommands[command].category && privateprefix == guildPrefix)
              embed
              .addField('DESCRIPTION', ecommands[command].description)
              .addField("FORMAT-guild prefix", `\`\`\`${guildPrefix}${ecommands[command].format}\`\`\``)
              if (privateprefix != guildPrefix)
            embed
              .addField('DESCRIPTION', ecommands[command].description)
              .addField("CATEGORY", ecommands[command].category)
              .addField('FORMAT-private prefix', `\`\`\`${privateprefix}${ecommands[command].format}\`\`\``)
              .addField("FORMAT-guild prefix", `\`\`\`${guildPrefix}${ecommands[command].format}\`\`\``)
              if (privateprefix == guildPrefix)
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
        .setLabel('邀請我')
        .setURL("https://discord.com/oauth2/authorize?client_id=804651902896963584&scope=bot%20applications.commands&permissions=8589934591")
        let embed =  new Discord.MessageEmbed()
          .setTitle('指令列表')
          .setColor('#12d8f3')
          .setFooter(`使用者: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
          .setThumbnail(client.user.displayAvatarURL());
        if (!args[1])
          embed
            .addField("符號", "<> 需要的\n[] - 不一定要的")
            .setDescription(Object.keys(ccommands).map(command => `\`${command.padEnd(Object.keys(ccommands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` <a:arrow:875628899604762624> ${ccommands[command].description}\n類別: ${ccommands[command].category}`).join('\n'));
        else {
          if (Object.keys(ccommands).includes(args[1].toLowerCase()) || Object.keys(ccommands).map(c => ccommands[c].aliases || []).flat().includes(args[1].toLowerCase())) {
            let command = Object.keys(ccommands).includes(args[1].toLowerCase())? args[1].toLowerCase() : Object.keys(ccommands).find(c => ccommands[c].aliases && ccommands[c].aliases.includes(args[1].toLowerCase()));
            embed
              .setTitle(`指令 - ${command}`)
              .addField("符號", "<> 需要的\n[] - 不一定要的")
            if (ccommands[command].aliases)
              embed.addField('指令別名', `\`${ccommands[command].aliases.join('`, `')}\``);
              if (!ccommands[command].category && privateprefix != guildPrefix)
              embed
              .addField('指令介紹', ccommands[command].description)
              .addField('私用前輟', `\`\`\`${privateprefix}${ccommands[command].format}\`\`\``)
              .addField("伺服器前輟", `\`\`\`${guildPrefix}${ccommands[command].format}\`\`\``)
              if (!ccommands[command].category && privateprefix == guildPrefix)
              embed
              .addField('指令介紹', ccommands[command].description)
              .addField("伺服器前輟", `\`\`\`${guildPrefix}${ccommands[command].format}\`\`\``)
              if (privateprefix != guildPrefix)
            embed
              .addField('指令介紹', ccommands[command].description)
              .addField("類別", ccommands[command].category)
              .addField('私用前輟', `\`\`\`${privateprefix}${ccommands[command].format}\`\`\``)
              .addField("伺服器前輟", `\`\`\`${guildPrefix}${ccommands[command].format}\`\`\``)
              if (privateprefix == guildPrefix)
            embed
              .addField('指令介紹', ccommands[command].description)
              .addField("類別", ccommands[command].category)
              .addField("伺服器前輟", `\`\`\`${guildPrefix}${ccommands[command].format}\`\`\``)
          } else {
            embed
              .setColor('RED')
              .setDescription('這不是一個正確的指令\n請用其他的指令或空著來看全部的指令');
          }
        }
        message.channel.send(embed, addbot);
    }
      } else if (message.content.startsWith(guildPrefix + "set-bot-prefix-name") || message.content.startsWith(privateprefix + "set-bot-prefix-name")) {
    const language = db.get(`language_${message.author.id}`)
    if (language === "english") {
      if (!db.has(`botrole_${message.guild.id}`)) return message.lineReply("Please use d.setup to setup the bot")
        if (!message.member.roles.cache.find(r => r.id === `${botapproverroleid}`)) return message.lineReply(`you need <@&${botapproverroleid}> role to edit bots`)
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
      if (!db.has(`botrole_${message.guild.id}`)) return message.lineReply("請用d.setup完成設定流程")
        if (!message.member.roles.cache.find(r => r.id === `${botapproverroleid}`)) return message.lineReply(`你需要<@&${botapproverroleid}>才能接收/拒絕機器人`)
        const bot = message.mentions.members.last()
        const prefix = args.slice(2).join(" ")
        if (!bot || !bot.user.bot) return message.lineReply("請mention一台機器人")
        if (!prefix) return message.lineReply("請給予一個前輟")
        await bot.setNickname("").catch(err => {
          return message.lineReply(`我在處理數據時發生了錯誤\n敬請見諒\n數據錯誤: ${err}`)
        })
        await bot.setNickname(prefix + "|" + bot.displayName).catch(err => {
          return message.lineReply(`我在處理數據時發生了錯誤\n敬請見諒\n數據錯誤: ${err}`)
        })
        await message.lineReply(`這台機器人的前輟暱稱現在是${bot.displayName}`)
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
      if (!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply('你需要`管理者`層級的權限才能用這個指令');
        if (db.has(`setup_running_${message.guild.id}`)) return message.lineReply("有人正在設定請放棄第一個或等待這一次完成")
        db.set(`setuping${message.guild.id}`, "true")
        message.channel.send("請回答機器人管理者的身分組ID").then(() => {
    message.channel.awaitMessages(m => m.author.id === message.author.id, {
					max: 1,
					time: 30000,
					errors: ['time']
				})
    .then(col => {
      const msg = col.first().content.toString()
      if (msg.includes("cancel")) return message.lineReply("已放棄變更").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      if (isNaN(msg)) return message.lineReply("請回答一個正確的身分組ID").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      db.set(`approverroleid_${message.guild.id}`, msg)
      message.lineReply("請回答機器人日誌的頻道ID\n輸入`cancel`來放棄變更").then(() => {
    message.channel.awaitMessages(m => m.author.id === message.author.id, {
					max: 1,
					time: 30000,
					errors: ['time']
				})
    .then(col => {
      const msg = col.first().content.toString()
      if (msg.includes("cancel")) return message.lineReply("已放棄變更").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      if (isNaN(msg)) return message.lineReply("請回答一個正確的機器人日誌的頻道ID").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      db.set(`botlogcid_${message.guild.id}`, msg)
      message.lineReply("請回答機器人製造者的身分組ID\n輸入`cancel`來放棄變更").then(() => {
    message.channel.awaitMessages(m => m.author.id === message.author.id, {
					max: 1,
					time: 30000,
					errors: ['time']
				})
    .then(col => {
      const msg = col.first().content.toString()
      if (msg.includes("cancel")) return message.lineReply("已放棄變更").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      if (isNaN(msg)) return message.lineReply("請回答一個正確的身分組ID").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      db.set(`developerrole_${message.guild.id}`, msg)
      message.lineReply("請回答機器人的身分組ID\n輸入`cancel`來放棄變更").then(() => {
    message.channel.awaitMessages(m => m.author.id === message.author.id, {
					max: 1,
					time: 30000,
					errors: ['time']
				})
    .then(col => {
      const msg = col.first().content.toString()
      if (msg.includes("cancel")) return message.lineReply("已放棄變更").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      if (isNaN(msg)) return message.lineReply("請回答一個正確的身分組ID").then(() => {
        db.delete(`setup_running_${message.guild.id}`)
      })
      db.set(`botrole_${message.guild.id}`, msg)
      message.lineReply("設定流程完成")
      
    })
    .catch(err => {
      message.channel.send("你沒有在時間內回答機器人的身分組ID")
      console.log(err)
    })
    })
      
    })
    .catch(err => {
      message.channel.send("你沒有在時間內回答機器人製造者的身分組ID")
      console.log(err)
    })
    })
      
    })
    .catch(err => {
      message.channel.send("你沒有在時間內回答機器人日誌的頻道ID")
      console.log(err)
    })
    })
      
      
    })
    .catch(err => {
      message.channel.send("你沒有在時間內回答機器人管理者的身分組ID")
      console.log(err)
    })
    })
    }
      } else if (message.content.startsWith(guildPrefix + "stats") || message.content.startsWith(privateprefix + "stats")) {
    const language = db.get(`language_${message.author.id}`)
    if (language === "english") {
      let addbot = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('add 𝔟𝔬𝔱 𝔪𝔞𝔫𝔞𝔤𝔢𝔯™® to your servers')
      .setURL("https://top.gg/bot/804651902896963584")
      let serverlist = ''
    client.guilds.cache.forEach((guild) => {
      serverlist = serverlist.concat(`${guild.name} - ${guild.memberCount}\n`)
    })
    const psembed = new Discord.MessageEmbed()
      .setColor("GOLD")
      .setTitle(`Server count is ${client.guilds.cache.size} servers`, '')
      .setDescription(serverlist)
      .addField("total users", client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c))
      .addField("support server", "[click here](https://mczgodpiggyio.addbot.repl.co/dc)")
      const sembed = new Discord.MessageEmbed()
      .setColor("GOLD")
      .setTitle(`Server count is ${client.guilds.cache.size} servers`, '')
      .addField("total users", client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c))
      .addField("support server", "[click here](https://mczgodpiggyio.addbot.repl.co/dc)")

      if (message.guild.id !== "855730108371042315" || message.author.id !== "599050023669334037") return message.channel.send(sembed, addbot)
    if (message.guild.id === "855730108371042315" && message.author.id === "599050023669334037") return message.channel.send(psembed, addbot)
    } else if (language === "chinese") {
      let addbot = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('add 𝔟𝔬𝔱 𝔪𝔞𝔫𝔞𝔤𝔢𝔯™® to your servers')
      .setURL("https://top.gg/bot/804651902896963584")
      let serverlist = ''
    client.guilds.cache.forEach((guild) => {
      serverlist = serverlist.concat(`${guild.name} - ${guild.memberCount}\n`)
    })
    const psembed = new Discord.MessageEmbed()
      .setColor("GOLD")
      .setTitle(`伺服器量是${client.guilds.cache.size}`, '')
      .setDescription(serverlist)
      .addField("使用者數", client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c))
      .addField("伺服器", "[按這](https://mczgodpiggyio.addbot.repl.co/dc)")
      const sembed = new Discord.MessageEmbed()
      .setColor("GOLD")
      .setTitle(`伺服器量是${client.guilds.cache.size}`, '')
      .addField("使用者數", client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c))
      .addField("伺服器", "[按這](https://mczgodpiggyio.addbot.repl.co/dc)")

      if (message.guild.id !== "855730108371042315" || message.author.id !== "599050023669334037") return message.channel.send(sembed, addbot)
      if (message.guild.id === "855730108371042315" && message.author.id === "599050023669334037") return message.channel.send(psembed, addbot)
    }    
  } else if (message.content.startsWith(guildPrefix + "support-server") || message.content.startsWith(privateprefix + "support-server")) {
    const language = db.get(`language_${message.author.id}`)
    if (language === "english") {
      let addbot = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('add 𝔟𝔬𝔱 𝔪𝔞𝔫𝔞𝔤𝔢𝔯™® to your servers')
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
      .setLabel('把𝔟𝔬𝔱 𝔪𝔞𝔫𝔞𝔤𝔢𝔯™®加入你的伺服器')
      .setURL("https://top.gg/bot/804651902896963584")
    const supporte = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setTitle(`按這裡加入${client.user.tag}的伺服器`)
    .setURL("https://discord.gg/vbKauQ4")
    message.channel.send(supporte, addbot)
    }
  } else if (message.content.startsWith("<@") && message.content.endsWith("804651902896963584>")) {
    const prefix = new Discord.MessageEmbed()
    .setTitle(`Invite me`)
    .setURL("https://discord.com/oauth2/authorize?client_id=804651902896963584&scope=bot%20applications.commands&permissions=8589934591")
    .addField("my prefix for this guild is:", `${guildPrefix}`)
    if (privateprefix) prefix.addField("private prefix for you is:", privateprefix)
    message.lineReply(prefix)
  } else if (message.content.startsWith(guildPrefix + "bot-info") || message.content.startsWith(privateprefix + "bot-info")) {
    const language = db.get(`language_${message.author.id}`)
    const bot = message.mentions.users.last()
    if (!bot && !args[1]) return message.lineReply("Please mention a bot or give a bot ID")
    if (language === "english") {
      if (bot) {
      if (!bot.bot) return message.lineReply("Please mention a bot not a user")
      const botid = bot.id
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
      .addField("Inivte", `Invite link for ${data.username}#${data.discriminator}\n[Click here](${data.invite})`)
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
    } else {
      const botid = args.slice(1,2).join("")
      if (!botid || isNaN(botid)) return message.lineReply("Please give a bot id")
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
      .addField("Inivte", `Invite link for ${data.username}#${data.discriminator}\n[Click here](${data.invite})`)
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
    }
    } else if (language === "chinese") {
      if (bot) {
      if (!bot.bot) return message.lineReply("請mention正確的機器人\n像這樣 <@!804651902896963584>")
      const botid = bot.id
      await fetch(`https://top.gg/api/bots/${botid}`, {
      headers: {
        authorization: process.env.Topggtoken
      }
    }) 
    .then(res => res.json())
    .then(data => {
      if (data.error) return message.lineReply("那個機器人不再top.gg上\n請試試其他的機器人")
      const botembed = new Discord.MessageEmbed()
      .setTitle(`${data.username}#${data.discriminator}的資料`)
      .addField("簡介", data.shortdesc, true)
      .addField("前輟", data.prefix, true)
      .addField("類別", data.tags, true)
      .addField("擁有者 & 創作者們", data.owners, true)
      .setThumbnail(`https://cdn.discordapp.com/avatars/${botid}/${data.defAvatar}.webp`)
      .addField("這個月的投票量", data.monthlyPoints, true)
      .addField("機器人邀請", `${data.username}#${data.discriminator}的機器人邀請\n[按這裡](${data.invite}`)
      .addField("總投票", data.points, true)
      if (data.support && data.support !== "null") {
        botembed.addField("機器人伺服器", `${data.username}#${data.discriminator}'s support server\n[Click here](https://discord.gg/${data.support})`, true)
      
      }

      if (data.website && data.website !== "null") {
       botembed.addField("網站", `${data.username}#${data.discriminator}'s website\n[Click here](${data.website})`, true) 
      }

      if (data.server_count && data.server_count !== "null") {
       botembed.addField("伺服器量", data.server_count, true) 
      }
      message.channel.send(botembed)
    })
    } else {
      const botid = args.slice(1,2).join("")
      if (!botid || isNaN(botid)) return message.lineReply("請給一個正確的機器人ID")
      await fetch(`https://top.gg/api/bots/${botid}`, {
      headers: {
        authorization: process.env.Topggtoken
      }
    }) 
    .then(res => res.json())
    .then(data => {
      if (data.error) return message.lineReply("那個機器人不再top.gg上\n請試試其他的機器人")
      const botembed = new Discord.MessageEmbed()
      .setTitle(`${data.username}#${data.discriminator}的資料`)
      .addField("簡介", data.shortdesc, true)
      .addField("前輟", data.prefix, true)
      .addField("類別", data.tags, true)
      .addField("擁有者 & 創作者們", data.owners, true)
      .setThumbnail(`https://cdn.discordapp.com/avatars/${botid}/${data.defAvatar}.webp`)
      .addField("這個月的投票量", data.monthlyPoints, true)
      .addField("機器人邀請", `${data.username}#${data.discriminator}的機器人邀請\n[按這裡](${data.invite})`)
      .addField("總投票", data.points, true)
      if (data.support && data.support !== "null") {
        botembed.addField("機器人伺服器", `${data.username}#${data.discriminator}'s support server\n[Click here](https://discord.gg/${data.support})`, true)
      
      }

      if (data.website && data.website !== "null") {
       botembed.addField("網站", `${data.username}#${data.discriminator}'s website\n[Click here](${data.website})`, true) 
      }

      if (data.server_count && data.server_count !== "null") {
       botembed.addField("伺服器量", data.server_count, true) 
      }
      message.channel.send(botembed)
    })
    }
    }
  } else if (message.content.startsWith(guildPrefix + "info") || message.content.startsWith(privateprefix + "info")) {
    const language = db.get(`language_${message.author.id}`)
    if (language === "english") {
      await fetch(`https://top.gg/api/bots/${client.user.id}`, {
      headers: {
        authorization: process.env.Topggtoken
      }
    }) 
    .then(res => res.json())
    .then(data => {
    const infoembed = new Discord.MessageEmbed()
    .setTitle(`**My info**`)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setFooter(`Info for ${client.user.tag}`, client.user.displayAvatarURL())
    .addField("Owner & Developer", "𝕯𝕽𝕬𝕲𝕺𝕹𝕳𝖀𝕹𝕿𝕰𝕽™®-𝔪𝔠𝔷𝔤𝔬𝔡𝔭𝔦𝔤𝔤𝔶ᴰᵉᵛ#4992", true)
    .addField("Server Count", `${client.guilds.cache.size}`, true)
    .addField("User Count", `${client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)}`, true)
    .addField("Votes This Month", data.monthlyPoints, true)
    .addField("Total Votes", data.points, true)
    .addField("Support Server", "Join my support server [here](https://discord.gg/vbKauQ4)", true)
    .addField("Website", "Docs [click here](https://mczgodpiggy.github.io/bot-manager/index.html)", true)
    .addField("**  **", "** **", true)
    .addField("Invite Link", "Invite me [here](https://discord.com/oauth2/authorize?client_id=804651902896963584&scope=bot%20applications.commands&permissions=8589934591)", true)
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
    const infoembed = new Discord.MessageEmbed()
    .setTitle(`**我的資料**`)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setFooter(`${client.user.tag}的資料`, client.user.displayAvatarURL())
    .addField("擁有者 & 製作者", "𝕯𝕽𝕬𝕲𝕺𝕹𝕳𝖀𝕹𝕿𝕰𝕽™®-𝔪𝔠𝔷𝔤𝔬𝔡𝔭𝔦𝔤𝔤𝔶ᴰᵉᵛ#4992", true)
    .addField("伺服器量", `${client.guilds.cache.size}`, true)
    .addField("使用者數", `${client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)}`, true)
    .addField("這個月的投票量", data.monthlyPoints, true)
    .addField("總投票", data.points, true)
    .addField("援助伺服器的邀請", "點擊[這](https://discord.gg/vbKauQ4)加入我的援助伺服器", true)
    .addField("網站", "簡介 [click here](https://mczgodpiggy.github.io/bot-manager/index.html)", true)
    .addField("**  **", "** **", true)
    .addField("機器人邀請", "加我[這裡](https://discord.com/oauth2/authorize?client_id=804651902896963584&scope=bot%20applications.commands&permissions=8589934591)", true)
    message.lineReply(infoembed)
    })
    }
  } else if (message.content.startsWith(guildPrefix + "set-language") || message.content.startsWith(privateprefix + "set-language")) {
    const language = db.get(`language_${message.author.id}`)
    if (language == "english") {
      
    const langembed = new Discord.MessageEmbed()
    .setTitle("Choose your language")
      .addField("1 for", "English", true)
      .addField("2 for", "Chinese", true)
      .addField("** **", "cancel to cancel", true)
    message.channel.send(langembed).then(() => {
      message.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max: 1,
                    time: 10000,
                    errors: ['time']
                }) .then(col => {
        const answer = col.first().content.toString()
        if (answer !== "1" && answer !== "2" && answer !== "cancel") return message.lineReply("please give a valid option from the list above")

        if (answer == "cancel") return message.lineReply("language selection cancelled")
        if (answer == "1") {
          db.set(`language_${message.author.id}`, "english")
          message.lineReply("Your language has been updated to English")
        } else if (answer == "2") {
          db.set(`language_${message.author.id}`, "chinese")
          message.lineReply("你的語言已被更新為中文")
        }
                }).catch(err => {
        message.lineReply("You didn't pick a selection in time please try again")
                })

    })
    } else if (language == "chinese") {
      
    const langembed = new Discord.MessageEmbed()
    .setTitle("選擇你的語言")
      .addField("用1選", "英文", true)
      .addField("用2選", "中文", true)
      .addField("** **", "cancel to cancel", true)
    message.channel.send(langembed).then(() => {
      message.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max: 1,
                    time: 10000,
                    errors: ['time']
                }) .then(col => {
        const answer = col.first().content.toString()
        if (answer !== "1" && answer !== "2" && answer !== "cancel") return message.lineReply("請給與列表上的答案")

        if (answer == "cancel") return message.lineReply("語言更新停止")
        if (answer == "1") {
          db.set(`language_${message.author.id}`, "english")
          message.lineReply("Your language has been updated to English")
        } else if (answer == "2") {
          db.set(`language_${message.author.id}`, "chinese")
          message.lineReply("你的語言已被更新為中文")
        }
                }).catch(err => {
        message.lineReply("你沒有在時間內給出答案\n請再試一次")
                })

    })
    }
  } else if (message.content.startsWith(guildPrefix + "shard-status") || message.content.startsWith(privateprefix + "shard-status")) {
    const shardc = client.ws.totalShards
    let values = await client.shard.broadcastEval(`
    [
        this.shard.id,
        this.guilds.size
    ]
    `);
    let status = "";
    values.forEach((value) => {
    status += "• SHARD #"+value[0]+" | ServerCount: "+value[1]+"\n";
    });
    const embed = new Discord.MessageEmbed()
    .setTitle(`${client.user.tag} shard status`)
    .addField("SHARD STATUS", status)
    message.lineReply(embed)
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
    const sembed = new Discord.MessageEmbed()
      .setColor("GOLD")
      .setTitle(`Server count is ${client.guilds.cache.size} servers`, '')
      .addField("total users", client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c))
      .addField("support server", "[click here](https://mczgodpiggyio.addbot.repl.co/dc)")
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