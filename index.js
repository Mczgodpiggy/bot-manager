require("./webhook.js")
const Discord = require("discord.js")
require("discord-reply")
const client = new Discord.Client({ shards: "auto" })
const db = require("quick.db")
const prefix = require("discord-prefix")
const disbut = require("discord-buttons")
disbut(client)
const fetch = require("node-fetch")
const commands = require('./help');

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
  const botapproverroleid = db.get(`approverroleid_${message.guild.id}`)
  const botlogcid = db.get(`botlogcid_${message.guild.id}`)
  let privateprefix = prefix.getPrefix(message.author.id)
  let guildPrefix = prefix.getPrefix(message.guild.id)
  if (!privateprefix) privateprefix = guildPrefix
  if (!guildPrefix) guildPrefix = defaultPrefix;

  let args = message.content.slice(guildPrefix.length || privateprefix.length).split(' ');
  
  if (message.content.startsWith(guildPrefix + "setprivateprefix") || message.content.startsWith(privateprefix + "setprivateprefix")) {
    let newprefix = args.slice(1, 2).join("")
    if (!newprefix || newprefix.includes("1") || newprefix.includes("2") || newprefix.includes("3") || newprefix.includes("4") || newprefix.includes("5") || newprefix.includes("6") || newprefix.includes("7") || newprefix.includes("8") || newprefix.includes("9") || newprefix.includes("0") || newprefix.includes("9") || newprefix.includes("@here") || newprefix.includes("@everyone")) return message.lineReply("please give a prefix in text")
    prefix.setPrefix(newprefix, message.author.id)
    await message.lineReply("done now prefix for you is " + "`" + newprefix + "`")
  } else if (message.content.startsWith(guildPrefix + "setprefix") || message.content.startsWith(privateprefix + "setprefix")) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply('you don\'t have admin perm to use this command');
    let newprefix = args.slice(1, 2).join("")
    if (!newprefix || newprefix.includes("1") || newprefix.includes("2") || newprefix.includes("3") || newprefix.includes("4") || newprefix.includes("5") || newprefix.includes("6") || newprefix.includes("7") || newprefix.includes("8") || newprefix.includes("9") || newprefix.includes("0") || newprefix.includes("@here") || newprefix.includes("@everyone")) return message.lineReply("please give a prefix in text")
    prefix.setPrefix(newprefix, message.guild.id)
    await message.lineReply("done now prefix for this guild is " + "`" + newprefix + "`")
  } else if (message.content.startsWith(guildPrefix + "addbot") || message.content.startsWith(privateprefix + "addbot")) {
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
  } else if (message.content.startsWith(guildPrefix + "reject") || message.content.startsWith(privateprefix + "reject")) {
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
        user.send(`your bot ${data.username}#${data.discriminator} was rejected by approver ${message.author.tag}\nbecause of the reason ${reason}`)
      }).catch(err => {
        console.log(err)
        message.lineReply(`I got some errors doing that the error is ${err}`)
        })
  } else if (message.content.startsWith(guildPrefix + "approve") || message.content.startsWith(privateprefix + "approve")) {
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
        user.send(`your bot ${data.username}#${data.discriminator} was approved by approver ${message.author.tag}`)
      }).catch(err => {
        console.log(err)
        message.lineReply(`I got some errors doing that the error is ${err}`)
        })
  } else if (message.content.startsWith(guildPrefix + "help") || message.content.startsWith(privateprefix + "help")) {
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
            .setDescription(Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` <a:arrow:875628899604762624> ${commands[command].description}\ncategory: ${commands[command].category}`).join('\n'));
        else {
          if (Object.keys(commands).includes(args[1].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[1].toLowerCase())) {
            let command = Object.keys(commands).includes(args[1].toLowerCase())? args[1].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[1].toLowerCase()));
            embed
              .setTitle(`COMMAND - ${command}`)
              .addField("Symbols", "<> Argument is required\n[] - Argument is optional")
            if (commands[command].aliases)
              embed.addField('Command aliases', `\`${commands[command].aliases.join('`, `')}\``);
              if (!commands[command].category && privateprefix != guildPrefix)
              embed
              .addField('DESCRIPTION', commands[command].description)
              .addField('FORMAT-private prefix', `\`\`\`${privateprefix}${commands[command].format}\`\`\``)
              .addField("FORMAT-guild prefix", `\`\`\`${guildPrefix}${commands[command].format}\`\`\``)
              if (!commands[command].category && privateprefix == guildPrefix)
              embed
              .addField('DESCRIPTION', commands[command].description)
              .addField("FORMAT-guild prefix", `\`\`\`${guildPrefix}${commands[command].format}\`\`\``)
              if (privateprefix != guildPrefix)
            embed
              .addField('DESCRIPTION', commands[command].description)
              .addField("CATEGORY", commands[command].category)
              .addField('FORMAT-private prefix', `\`\`\`${privateprefix}${commands[command].format}\`\`\``)
              .addField("FORMAT-guild prefix", `\`\`\`${guildPrefix}${commands[command].format}\`\`\``)
              if (privateprefix == guildPrefix)
            embed
              .addField('DESCRIPTION', commands[command].description)
              .addField("CATEGORY", commands[command].category)
              .addField("FORMAT-guild prefix", `\`\`\`${guildPrefix}${commands[command].format}\`\`\``)
          } else {
            embed
              .setColor('RED')
              .setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
          }
        }
        message.channel.send(embed, addbot);
      } else if (message.content.startsWith(guildPrefix + "set-bot-prefix-name") || message.content.startsWith(privateprefix + "set-bot-prefix-name")) {
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
      } else if (message.content.startsWith(guildPrefix + "setup") || message.content.startsWith(privateprefix + "setup")) {
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
      } else if (message.content.startsWith(guildPrefix + "stats") || message.content.startsWith(privateprefix + "stats")) {
    if (message.author.bot) return;
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
  } else if (message.content.startsWith(guildPrefix + "support-server") || message.content.startsWith(privateprefix + "support-server")) {
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
  } else if (message.content.startsWith("<@") && message.content.endsWith("804651902896963584>")) {
    const prefix = new Discord.MessageEmbed()
    .setTitle(`Invite me`)
    .setURL("https://discord.com/oauth2/authorize?client_id=804651902896963584&scope=bot%20applications.commands&permissions=8589934591")
    .addField("my prefix for this guild is:", `${guildPrefix}`)
    if (privateprefix) prefix.addField("private prefix for you is:", privateprefix)
    message.lineReply(prefix)
  } else if (message.content.startsWith(guildPrefix + "bot-info") || message.content.startsWith(privateprefix + "bot-info")) {
    const bot = message.mentions.users.last()
    if (!bot && !args[1]) return message.lineReply("Please mention a bot or give a bot ID")
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
  } else if (message.content.startsWith(guildPrefix + "info") || message.content.startsWith(privateprefix + "info")) {
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