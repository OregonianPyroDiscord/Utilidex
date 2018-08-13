const { RichEmbed } = require('discord.js');

module.exports = (client, message, err) => {
    const embed = new RichEmbed()
        .setColor('RED')
        .setDescription(`${client.emotes.x} Something went wrong while trying to execute that command:\`\`\`${err}\`\`\``);
    return message.delete(), message.channel.send(embed);
};