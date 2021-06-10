const { MessageEmbed, Message, MessageFlags } = require('discord.js');
const db = require('quick.db')

module.exports.run = async(client, message, args) => {
    const prefix = db.get(`prefix_${message.guild.id}`)

    let moderation = new MessageEmbed()
        .setTitle(`Moderation commands - ${client.user.username}`)
        .setColor("RANDOM")
        .addFields({ name: `${prefix}prefix`, value: "Description: Set a new prefix. Aliases: yeetix." })
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp()

    let info = new MessageEmbed()
        .setTitle(`Information commands - ${client.user.username}`)
        .setColor("RANDOM")
        .addFields({ name: `${prefix}hellp`, value: "Description: Give a help message of a specific category (info, moderation). Aliases: h, yeet." })
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp()

    if (!args[0]) return message.reply('Specify a category.')

    if (args[0] === "moderation") message.channel.send(moderation)
    if (args[0] === "info") message.channel.send(info)

}

module.exports.help = {
    name: "help",
    description: "Send the help message.",
    aliases: ["yeet", "h"]
}