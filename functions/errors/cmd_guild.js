const { RichEmbed } = require('discord.js');

module.exports = (client, message) => {
    const embed = new RichEmbed()
        .setColor('RED')
        .setDescription(`${client.emotes.x} This command has been disabled in this server by an administrator and cannot be ran.`);
    return message.delete(), message.channel.send(embed);
};