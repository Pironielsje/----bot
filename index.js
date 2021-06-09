const discord = require('discord.js')
const client = new discord.Client()
const db = require('quick.db')
const fs = require('fs')

client.commands = new discord.Collection()
client.aliases = new discord.Collection()

fs.readdir('./commands/', (err, file) => {
    if (err) return console.log(err)

    let jsFiles = file.filter(f => f.split('.').pop() === "js")

    if (jsFiles < 0) {
        console.log('No files found.')
        return
    }

    jsFiles.forEach((f, i) => {
        var getFile = require(`./commands/${f}`)

        console.log(`Succesfully loaded ${f}.`)

        client.commands.set(getFile.help.name, getFile)

        getFile.help.aliases.forEach(alias => {
            client.aliases.set(alias, getFile.help.name)
        })
    })
})

client.on('ready', () => {
    console.log('ready')

    client.user.setActivity("**yeeting** people away")
})

client.on('message', async message => {
    if (!db.get(`prefix_${message.guild.id}`)) {
        db.set(`prefix_${message.guild.id}`, '.')
    }

    let prefix = db.get(`prefix_${message.guild.id}`)

    let args = message.content.slice(prefix.length).trim().split(" ")
    let command = args.shift().toLowerCase()
    let commands = client.commands.get(command) || client.commands.get(client.aliases.get(command))

    if (commands) commands.run(client, message, args)
})

client.login(process.env.token)