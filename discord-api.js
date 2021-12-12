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
        return data
      })
  } else if (!id) return "Error no id given"
}

module.exports = {
  duserinfo
}