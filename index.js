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

Client.once("ready", (client) => {
  const commands = require("./commands/data");
  Client.application.commands.set(commands);
  
  console.log("Le client est prêt.");
});

Client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {

    let commandType;

    if (interaction.isChatInputCommand()) { commandType = "chat" }
    else if (interaction.isMessageContextMenuCommand()) { commandType = "message" }
    else if (interaction.isContextMenuCommand()) { commandType = "user" }
    else { throw new Error(`Unandled command type for:\n${interaction}`) }; // never

    const command = require(path.join(__dirname, "commands", commandType, interaction.commandName));

    try {

      console.log(`${interaction.commandName} (${interaction.commandId}) asked by ${interaction.user.username} (${interaction.user.id})`);
      command.execute(interaction);

    } catch (err) {
      console.error(err);

      const ErrorEmbed = new Discord.EmbedBuilder()
      .setColor(Discord.Colors.Red)
      .setFooter({text: "Volcano Shop", iconURL: Client.user.avatarURL({size: 512})})
      .setDescription("Une erreur est apparue lors de l'exécution de cette commande." +
        "\n" + "> Veuillez réessayer plus tard.")
      .setThumbnail("https://static-00.iconduck.com/assets.00/process-error-icon-512x512-zmcympnc.png");

      if (interaction.replied || interaction.deferred) { await interaction.followUp({ embeds: [ErrorEmbed], ephemeral: true }); }
      else { await interaction.reply({ embeds: [ErrorEmbed], ephemeral: true }); }
    };

  };

});