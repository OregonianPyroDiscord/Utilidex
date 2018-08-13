const { RichEmbed } = require('discord.js');

module.exports = (client, message, reason) => {
    const embed = new RichEmbed()
        .setColor('RED')
        .setDescription(`${client.emotes.x} This command has been disabled globally by the bot developer.\n\n**Reason: ${reason}**`);
    return message.delete(), message.channel.send(embed);
};