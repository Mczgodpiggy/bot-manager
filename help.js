const roleid = "your_role_id_here"
module.exports = {
    "help": {
        description: "help for a command",
        format: "help [command-name]",
        category: "unity"
    },
    "setprefix": {
        description: "sets the prefix for that guild",
        format: "setprefix <new-prefix-for-guild>",
        category: "unity"
    },
    "setprivateprefix": {
        aliases: ["setpprefix"],
        description: "sets the prefix for you",
        format: "setprivateprefix <new-prefix-for-you>",
        category: "unity"
    },
    "addbot": {
        description: "add a bot to this server if the bot get approved",
        format: "addbot <bot-id> <bot-prefix>",
        category: "bot adding"
    },
    "approve": {
        description: `approve a bot if you have <@&${roleid}> role`,
        format: "approve <queued-bot-id>",
        category: "bot managers"
    },
    "reject": {
        description: `reject a bot if you have <@&${roleid}> role`,
        format: "reject <queued-bot-id>",
        category: "bot managers"
    },
    "set-bot-prefix-name": {
        description: `sets the bots prefix nickname if you have <@&${roleid}> role`,
        format: "set-bot-prefix-name <@bot> <prefix>",
        category: "bot managers"
    },
}
