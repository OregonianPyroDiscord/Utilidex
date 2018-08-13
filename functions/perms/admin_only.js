const { RichEmbed } = require('discord.js');

module.exports = (client, message) => {
    const embed = new RichEmbed()
        .setColor('RED')
        .setDescription(`${client.emotes.x} This command can only be ran by a server administrator.`);
    return message.delete(), message.channel.send(embed);
};