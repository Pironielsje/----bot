const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => {

    if (!args[0]) return message.reply('Please specify a new prefix to set.')

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You need the **ADMINISTRATOR** permissions to do this.")
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.reply("I need the **ADMINISTRATOR** permissions to do this.")

    db.set(`prefix_${message.guild.id}`, args[0])

    let embed = new MessageEmbed()
        .setTitle("New prefix.")
        .setDescription(`Prefix: ${args[0]}`)
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp()

    message.channel.send(embed)

}

module.exports.help = {
    name: "prefix",
    description: "Set the prefix of a server.",
    category: "Moderation",
    aliases: ["yeetix"]
}