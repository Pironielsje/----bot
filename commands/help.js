const { MessageEmbed } = require('discord.js');
const db = require('quick.db')

module.exports.run = async(client, message, args) => {
    var commandsList = []
    const prefix = db.get(`prefix_${message.guild.id}`)

    client.commands.forEach((command) => {
        var constructor = {
            name: command.help.name,
            description: command.help.description,
            category: command.help.category,
            aliases: command.help.aliases
        }

        commandsList.push(constructor)
    });

    let response = new MessageEmbed()
        .setTitle("**Help - (☞ﾟヮﾟ)☞      ☜(ﾟヮﾟ☜)**")
        .setDescription("All commands for (☞ﾟヮﾟ)☞      ☜(ﾟヮﾟ☜).")
        .setColor("RANDOM")
        .setFooter(message.author.tag, message.author.displayAvatarURL())

    let info = response.addField("Info", "Information commands. \n")

    for (let i = 0; i < commandsList.length; i++) {
        let command = commandsList[i]

        if (command["category"] == "Info") {
            info += `**${prefix}${command["name"]}** - Description: ${command["description"]} Aliases: ${command["aliases"]}\ns`
        }

    }

    response.addField(info)

    message.channel.send(response)

}

module.exports.help = {
    name: "help",
    description: "Send the help message.",
    category: "Info",
    aliases: ["yeet", "h"]
}