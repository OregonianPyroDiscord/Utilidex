const Command = require('../base/command.js');
const { RichEmbed } = require('discord.js');

class History extends Command {
    constructor(client) {
        super(client, {
            name: 'history',
            category: 'moderation',
            description: 'Retrieves moderation history for a specific user.',
            usage: '{prefix}history <@user|user ID>',
            parameters: 'snowflakeGuildMember',
            extended: false,
            enabled: true,
            reason: null,
            permission: 'KICK_MEMBERS',
            aliases: []
        });
    };

    async run(message, args) {
        const wtf = '\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_';
        const member = message.mentions.members.first();
        const history = this.client.history.get(member.user.id);
        if (!history || history.length < 1) return message.channel.send('No moderation results found.');
        const embed = new RichEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL)
            .setDescription(`Found \`${history.length}\` moderation results for that user.`)
            .setColor(this.client.color);
        const add = (type, moderator, time, reason, duration = false) => {
            if (duration) {
                embed.addField(wtf, `Type: \`${type}\`\nModerator: ${moderator}\nTime: ${time}\nDuration: ${duration}\nReason: \`\`\`${reason}\`\`\``);
            } else {
                embed.addField(wtf, `Type: \`${type}\`\nModerator: ${moderator}\nTime: ${time}\nReason: \`\`\`${reason}\`\`\``);
            };
        };
        await history.forEach(element => {
            if (element.hasOwnProperty('duration')) {
                add(element.type, element.moderator, element.time, element.reason, element.duration);
            } else {
                add(element.type, element.moderator, element.time, element.reason);
            };
        });
        return message.channel.send(embed);
    };
};

module.exports = History;