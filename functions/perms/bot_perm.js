const { RichEmbed } = require('discord.js');

module.exports = (client, message, perm) => {
    const embed = new RichEmbed()
        .setColor('RED')
        .setDescription(`${client.emotes.x} The bot lacks the permission \`${perm}\` and cannot execute this command.`);
    return message.delete(), message.channel.send(embed);
};