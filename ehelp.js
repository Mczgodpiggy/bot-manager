const db = require("quick.db")
module.exports = {
    "help": {
        description: "Help for a command",
        format: "help [command-name]",
        category: "<a:dh_utility:911867886384078848>Utility"
    },
    "setprefix": {
        description: "Sets the prefix for that guild",
        format: "setprefix <new-prefix-for-guild>",
        category: `<a:dh_utility:911867886384078848>Utility`
    },
    "setprivateprefix": {
        aliases: ["setpprefix"],
        description: "Sets the prefix for you",
        format: "setprivateprefix <new-prefix-for-you>",
        category: `<a:dh_utility:911867886384078848>Utility`
    },
    "setup": {
        description: "Setup the add bot system if you are a server admin",
        format: "setup",
        category: "<:dh_admin:911866293416779836>Admins"
    },
    "addbot": {
        description: "Add a bot to this server if the bot get approved",
        format: "addbot <bot-id> <bot-prefix>",
        category: "<:dh_plus:911868793872076860>Bot adding"
    },
    "approve": {
        description: "Approve a bot if you have the bot approver role",
        format: "approve <queued-bot-id>",
        category: `<:dh_manage:911867047347126283>Bot Managers`
    },
    "reject": {
        description: "Reject a bot if you have the bot approver role",
        format: "reject <queued-bot-id>",
        category: `<:dh_manage:911867047347126283>Bot Managers`
    },
    "set-bot-prefix-name": {
        description: "Sets the bots prefix nickname if you have the bot approver role",
        format: "set-bot-prefix-name <@bot> <prefix>",
        category: `<:dh_manage:911867047347126283>Bot Managers`
    },
    "support-server": {
        description: "Sends my support server's invite link",
        format: "support-server",
        category: `<:dh_Support:893893781127045202>Support`
    },
    "info": {
      description: "Info about me",
      format: "info",
      category: "<a:dh_info:868436375081467904>Info"
    },
    "bot-info": {
        description: "Get a bot's info from top.gg",
        format: "bot-info <bot_ID or @bot>",
        category: "<:dh_beta:911865545106817054>Beta"
    },
    "set-language": {
        description: "Sets your language",
        format: "set-language",
        category: "<:dh_beta:911865545106817054>Beta"
    },
}