const db = require("quick.db")
module.exports = {
    "help": {
        description: "指令表/指令使用方式",
        format: "help [指令名稱]",
        category: "<a:dh_utility:911867886384078848>多功能"
    },
    "setprefix": {
        description: "設定伺服器的新前輟",
        format: "setprefix <伺服器新前輟>",
        category: `<a:dh_utility:911867886384078848>多功能`
    },
    "setprivateprefix": {
        aliases: ["setpprefix"],
        description: "設定你的新前輟",
        format: "setprivateprefix <你的新前輟>",
        category: `<a:dh_utility:911867886384078848>多功能`
    },
    "setup": {
        description: "設定好機器人管理所需的東西",
        format: "setup",
        category: "<:dh_admin:911866293416779836>管理者"
    },
    "addbot": {
        description: "要求一個機器人",
        format: "addbot <機器人ID> <機器人前輟>",
        category: "<:dh_plus:911868793872076860>要求一個新的機器人"
    },
    "approve": {
        description: "接受一台機器人",
        format: "approve <機器人清單裡的機器人ID>",
        category: `<:dh_manage:911867047347126283>機器人管理者`
    },
    "reject": {
        description: "拒絕一台機器人",
        format: "reject <機器人清單裡的機器人ID> <原因>",
        category: `<:dh_manage:911867047347126283>機器人管理者`
    },
    "set-bot-prefix-name": {
        description: "設定一台機器人的前輟暱稱",
        format: "set-bot-prefix-name <mention一個機器人> <前輟>",
        category: `<:dh_manage:911867047347126283>機器人管理者`
    },
    "support-server": {
        description: "我的援助伺服器的邀請",
        format: "support-server",
        category: `<:dh_Support:893893781127045202>援助`
    },
    "info": {
      description: "我的資料",
      format: "info",
      category: "<a:dh_info:868436375081467904>資料"
    },
    "bot-info": {
        description: "找一台機器人在top.gg上的資料",
        format: "bot-info <機器人ID或mention一個機器人>",
        category: "<:dh_beta:911865545106817054>測試版"
    },
    "set-language": {
        description: "設定你的語言",
        format: "set-language",
        category: "<:dh_beta:911865545106817054>測試版"
    },
}