const Discord = require("discord.js")
const client = new Discord.Client()
const Topgg = require("@top-gg/sdk")
const express = require("express")
const app = express()
const port = 3000;

app.get('/', (req, res) => res.send('https://website.mczgodpiggy.repl.co'));




const webhook = new Topgg.Webhook(process.env.Topggtoken)

app.post("/dblwebhook", webhook.listener(vote => {
  
  console.log(vote.user) 

  // You can also throw an error to the listener callback in order to resend the webhook after a few seconds
}))

app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`)
);