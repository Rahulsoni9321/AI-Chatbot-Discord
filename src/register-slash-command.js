require("dotenv").config();
const {REST,Routes, SlashCommandBuilder}=require("discord.js")



const commands = [
    new SlashCommandBuilder()
      .setName("chatbot")
      .setDescription("Chat with the bot")
      .addStringOption((option) =>
        option
          .setName("prompt")
          .setDescription("Prompt for the chatbot")
          .setRequired(true)
      )
      .toJSON(),
  ];
  
  const rest=new REST().setToken(process.env.DISCORD_TOKEN);
  
  (async () => {
    try {
      console.log(
        `Started refreshing ${commands.length} application (/) commands.`
      );
  
      const data = await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID,process.env.GUILD_ID),
        { body: commands }
      );
  
      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`
      );
    } catch (error) {
      console.error(error);
    }
  })();

  
// const commands=[
//     {
//         name:'hey',
//         description:'this is a description!'
//     }
// ]

// const rest=new REST().setToken(process.env.DISCORD_TOKEN);

// (async ()=>{
//    try {
//     console.log("registration started.")
//    await rest.put(
//     Routes.applicationGuildCommands(process.env.CLIENT_ID,process.env.GUILD_ID),
//     { body:commands }
//    )
//    console.log("registration completed")
// } catch (error) {
//     console.error("error occured details:",error)
//    }
// })()

