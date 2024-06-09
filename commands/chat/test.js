const Discord = require("discord.js");
const path = require("path");

const { sendInteraction, sleep } = require("../../utils/_index");

/**
 * @type {Discord.ChatInputApplicationCommandData}
 */
const data = new Discord.SlashCommandBuilder()
.setName(path.parse(__filename).name)
.setDescription("Une commande permettant d'expérimenter.")
.addStringOption(option => option
  .setName("message")
  .setDescription("Afin d'afficher ce contenu.")
);

/**
 * @param {Discord.ChatInputCommandInteraction} interaction
 */
async function execute(interaction) {
  const optionMessage = interaction.options.getString("message");
  interaction.deferReply({ephemeral: true});

  await sleep(2_000);
  sendInteraction(interaction, {
    content: "Bonjour le monde !",
    ephemeral: true
  });

  await sleep(2_000);
  sendInteraction(interaction, {
    content: "2 secondes supplémentaire passées.",
    ephemeral: true
  }, true);
  if (optionMessage) { sendInteraction(interaction, optionMessage); }
  else sendInteraction(interaction, {
    content: "Aucun message entré.",
    ephemeral: true
  });
};

module.exports = { data, execute };