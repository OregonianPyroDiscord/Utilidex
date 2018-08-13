const { RichEmbed } = require('discord.js');
/**
 * 
 * @param {object} client The client object 
 * @param {object} message The message object 
 * @param {string} err The error message
 * @returns {object}
 */
module.exports = (client, message, err) => {
    const embed = new RichEmbed()
        .setColor('GOLD')
        .setDescription(`A required parameter appears to be missing: \`${err}\``);
    return message.delete(), message.channel.send(embed);
};
