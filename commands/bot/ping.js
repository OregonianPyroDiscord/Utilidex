const Command = require('../base/command.js');
const { RichEmbed } = require('discord.js');

class Ping extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            category: 'bot',
            description: 'Checks the bot\'s connection to the Discord API and response time.',
            usage: '{prefix}ping',
            parameters: 'None',
            extended: false,
            enabled: true,
            reason: null,
            permission: 'SEND_MESSAGES',
            aliases: ['p', 'ding', 'dong']
        });
    };

    async run(message, args) {
        const msg = await message.channel.send('Pinging...');
        const embed = new RichEmbed()
            .setColor(this.client.color)
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
            .setDescription(`Pong! It took me **${msg.createdTimestamp - message.createdTimestamp}**ms to edit that message!`)
            .addField(':heartbeat: Discord Hearbeat', `**${this.client.ping.toFixed()}**ms`);
        msg.edit(embed);
    };
};

module.exports = Ping;