const fetch = require("node-fetch")

function duserinfo(id){
  if (id) {
    return fetch(`https://discord.com/api/v6/users/${id}`, {
      headers: {
				  authorization: `Bot ${process.env.TOKEN}`,
			  },
      })
      .then(res => res.json())
      .then(data => {
        if (data.message) return data.message
        return data
      })
  } else if (!id) return "Error no id given"
}

function dsmbinfo(sid, id){
  if (sid && !isNaN(sid) && id && !isNaN(id)) {
    return fetch(`https://discord.com/api/v6/guilds/${sid}/members/${id}`, {
      headers: {
				  authorization: `Bot ${process.env.TOKEN}`,
			  },
    })
    .then(res => res.json())
    .then(data => {
      if (data.message) return data.message
      return data;
    })
  } else if (isNaN(sid) || !sid) {
    return "Please give a server ID"
  } else if (isNaN(id) || !id) {
    return "Please give a member's user ID"
  }
}

function dguildinfo(sid){
  if (sid && !isNaN(sid)) {
    return fetch(`https://discord.com/api/v6/guilds/${sid}`, {
      headers: {
        authorization: `Bot ${process.env.TOKEN}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.message) return data.message
      return data
    })
  } else if (!sid || isNaN(sid)) return "Please give a guild id"
}

module.exports = {
  duserinfo,
  dsmbinfo,
  dguildinfo
}