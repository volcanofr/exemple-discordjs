const Discord = require("discord.js");

/**
 * @param {Discord.CommandInteraction} interaction 
 * @param {string | Discord.MessagePayload | Discord.InteractionReplyOptions | Discord.InteractionEditReplyOptions} data `InteractionEditReplyOptions` si après defer ou edit = true
 * @param {boolean?} edit 
 */
function sendInteraction(interaction, data, edit) {
  if ((interaction.deferred && !interaction.replied) || edit == true) {
    interaction.editReply(data)
  } else if (interaction.replied) {
    interaction.followUp(data);
  } else if (interaction.isRepliable()) {
    interaction.reply(data)
  } else {
    throw new Error("Unknown command status.");
  };
};

module.exports = { sendInteraction };