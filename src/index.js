const {
  REST,
  Routes,
  Client,
  IntentsBitField,
  messageLink,
  ChannelType,
} = require("discord.js");
const main = require("./flock-api");
require("dotenv").config();
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online.`);
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) {
    return;
  }

  if (msg.content == "hello") msg.reply(`hello`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    if (interaction.commandName === "chatbot") {
      const message = await interaction.reply({
        content: "Preparing your personal thread...",
        fetchReply: true,
        ephemeral: false,
      });

      const prompt = interaction.options.getString("prompt");
      const thread = await message.startThread({
        name: prompt,
        autoArchiveDuration: 60,
        type: ChannelType.PrivateThread,
        reason: "Needed a separate thread for User Prompt",
      });

    
      const response = await main(prompt);

      // Option
      await interaction.followUp({
        content: `Your personal thread ${prompt} is ready!`,
        ephemeral: true,
      });
      thread.send(response.answer);
    }
  } catch (error) {
    console.log("this is the worst error", error);
  }
});

client.login(process.env.DISCORD_TOKEN);
// const commands = [
//   {
//     name: "hey",
//     description: "reply with hey",
//   },
// ];

// const rest = new REST().setToken(process.env.DISCORD_TOKEN);

//   (async () => {
//     try {
//       console.log(
//         `Started refreshing ${commands.length} application (/) commands.`
//       );

//       const data = await rest.put(
//         Routes.applicationGuildCommands(
//           process.env.CLIENT_ID,
//           process.env.GUILD_ID
//         ),
//         { body: commands }
//       );

//       console.log(
//         `Successfully reloaded ${data.length} application (/) commands.`
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   })();

// client.on("interactionCreate", async (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === "chatbot") {
//     // Reply with a non-ephemeral message
//     const message = await interaction.reply({
//       content: "Preparing your personal thread...",
//       fetchReply: true,
//       ephemeral: false,
//     });

//     // Get the prompt from the user
//     const prompt = interaction.options.getString("prompt");
//     v;
//     // Starting a thread from the bot's message
//     const thread = await message.startThread({
//       name: prompt,
//       autoArchiveDuration: 60,
//       type: "GUILD_PRIVATE_THREAD",
//       reason: "Needed a separate thread for User Prompt",
//     });

//     // Send a message to the thread using the flock-api.js file
//     const response = await main(prompt);
//     thread.send(response.answer);

//     // Option
//     await interaction.followUp({
//       content: `Your personal thread ${prompt} is ready!`,
//       ephemeral: true,
//     });
//   }
// });

// Move the client.login() call here
// client.login(process.env.DISCORD_TOKEN);
