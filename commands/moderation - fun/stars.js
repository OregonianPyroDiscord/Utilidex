const Command = require('../base/command.js');
const { RichEmbed } = require('discord.js');
const wtf = '\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_';

class Stars extends Command {
    constructor(client) {
        super(client, {
            name: 'stars',
            category: 'moderation-fun',
            description: 'Views a user\'s star history.',
            usage: '{prefix}stars <@user|user ID>',
            parameters: 'snowflakeGuildMember',
            extended: false,
            enabled: true,
            reason: null,
            permission: 'KICK_MEMBERS',
            aliases: []
        });
    };

    async run(message, args) {
        if (!args[0]) return this.client.help(this.client, message, 'stars');
        const member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) return this.client.args(this.client, message, 'USER MENTION OR ID')
        message.delete();
        if (!this.client.stars.has(member.user.id) || this.client.stars.get(member.user.id).length < 1) {
            const embed = new RichEmbed()
                .setColor(this.client.color)
                .setAuthor(member.user.username, member.user.displayAvatarURL)
                .setDescription('No star history found.');
            return message.channel.send(embed);
        };
            if (this.client.stars.get(member.user.id).length > 25) {
                const embed = new RichEmbed()
                    .setColor(this.client.color)
                    .setAuthor(member.user.username, member.user.displayAvatarURL)
                    .setDescription(`Found \`${this.client.stars.get(member.user.id).length}\` stars for that user - only displaying the most recent 25 actions.`);
                const add_field = (type, mod, date, reason) => {
                    embed.addField(wtf, `Type: ${type === 'GOLD' ? '\\⭐`GOLD`' : '\\💩`BROWN`'}\nModerator: ${mod}\nTime: ${date}\`\`\`${reason}\`\`\``);
                };
                    this.client.stars.get(member.user.id).slice(this.client.stars.get(member.user.id).length - 25).forEach(element => {
                    add_field(element.type, element.moderator, element.time, element.reason);
                });
                return message.channel.send(embed);
        } else {
            const embed = new RichEmbed()
                .setColor(this.client.color)
                .setAuthor(member.user.username, member.user.displayAvatarURL)
                .setDescription(`Found \`${this.client.stars.get(member.user.id).length}\` stars for that user.`);
            const add_field = (type, mod, date, reason) => {
                embed.addField(wtf, `Type: ${type === 'GOLD' ? '\\⭐`GOLD`' : '\\💩`BROWN`'}\nModerator: ${mod}\nTime: ${date}\`\`\`${reason}\`\`\``);
            };
            this.client.stars.get(member.user.id).forEach(element => {
                add_field(element.type, element.moderator, element.time, element.reason);
            });
            return message.channel.send(embed);
        };
    };
};

module.exports = Stars;