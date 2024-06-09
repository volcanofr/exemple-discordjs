const Discord = require("discord.js");

const { data: chatTest } = require("./chat/test");

/**
 * @type {Discord.ApplicationCommandDataResolvable[]}
 */
const data = [
  chatTest,
];

module.exports = data;