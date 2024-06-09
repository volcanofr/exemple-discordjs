require("dotenv").config();
const Discord = require("discord.js");

const path = require("path"); const fs = require("fs");

const Client = new Discord.Client({
  intents: [
    Discord.IntentsBitField.Flags.GuildMembers,
    Discord.IntentsBitField.Flags.GuildMessages,
    Discord.IntentsBitField.Flags.GuildWebhooks,
    Discord.IntentsBitField.Flags.MessageContent
  ]
});

Client.login(process.env.DISCORD_TOKEN);

const events = path.join(__dirname, "events");
fs.readdir(path.join(events), (err, files) => {
  if (err) { throw new Error(err) };

  files.forEach(file => {
    const event = require(path.join(events, file));
    if (event.once == true) { Client.once(Discord.Events[file.split(".")[0]], (...args) => event.execute(...args)) }
    else { Client.on(Discord.Events[file.split(".")[0]], (...args) => event.execute(...args)) }
  });
});