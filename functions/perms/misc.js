const { RichEmbed } = require('discord.js');

module.exports = (client, message, perm) => {
    const embed = new RichEmbed()
        .setColor('RED')
        .setDescription(`${client.emotes.x} You lack the permission \`${perm}\` to run this command.`);
    return message.delete(), message.channel.send(embed);
};