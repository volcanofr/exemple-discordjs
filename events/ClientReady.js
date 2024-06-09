const Discord = require("discord.js");

/**
 * @param {Discord.Client<true>} client 
 */
async function execute(client) {
  const commands = require("../commands/data");
  client.application.commands.set(commands);
  
  console.log("Le client est prêt.");
};

module.exports = { execute, once: true };