const { RichEmbed } = require('discord.js');

module.exports = async (client, message, command) => {
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    const embed = new RichEmbed()
        .setAuthor(`${client.user.username} | Command: ${cmd.help.name.split('')[0].toUpperCase()}${cmd.help.name.split('').slice(1).join('')}`, client.user.displayAvatarURL)
        .setColor(client.color)
        .setDescription('`< >` denotes a __required__ parameter.\n`[ ]` denotes an optional parameter.')
        .addField('Description', cmd.help.description)
        .addField('Usage', cmd.help.usage.replace('{prefix}', client.settings.get(message.guild.id).prefix))
        .addField('Parameters', `\`\`\`${cmd.help.parameters}\`\`\``)
        .addField('Aliases', `\`[${cmd.conf.aliases.join(', ')}]\``);
    if (!cmd.help.extended) {
        await message.delete(), message.channel.send(`${client.settings.get(message.guild.id).prefix}help ${cmd.help.name}`);
        return message.channel.send(embed);
    } else {
        embed.addField('Extended Help', cmd.help.extended_help.replace('{prefix}', client.settings.get(message.guild.id).prefix));
        await message.delete(), message.channel.send(`${client.settings.get(message.guild.id).prefix}help ${cmd.help.name}`);
        return message.channel.send(embed);
    };
};