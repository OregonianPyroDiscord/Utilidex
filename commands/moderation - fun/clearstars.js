const Command = require('../base/command.js');
const { RichEmbed } = require('discord.js');

class ClearStars extends Command {
    constructor(client) {
        super(client, {
            name: 'clearstars',
            category: 'moderation-fun',
            description: 'Removes all previous stars for a user.',
            usage: '{prefix}clearstars <@user|user ID> [reason]',
            parameters: 'snowflakeGuildMember, stringReason',
            extended: false,
            enabled: true,
            reason: null,
            permission: 'KICK_MEMBERS',
            aliases: ['cstars', 'nostars']
        });
    };

    async run(message, args) {
        if (!args[0]) return this.client.help(this.client, message, 'clearstars');
        const member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) return this.client.args(this.client, message, 'USER MENTION OR ID');
        if (member.user.id === message.author.id) {
            return message.delete(), message.channel.send(`${this.client.emotes.x} You cannot clear your own stars.`);
        };
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition) {
            return message.delete(), message.channel.send(`${this.client.emotes.x} You cannot clear the stars for a user that has a higher or equal role than you.`);
        };
        const reason = args.slice(1).join(' ').length > 1 ? args.slice(1).join(' ') : 'N/A';
        if (!this.client.stars.has(member.user.id) || this.client.stars.get(member.user.id).length < 1) {
            const embed = new RichEmbed()
                .setAuthor(member.user.username, member.user.displayAvatarURL)
                .setDescription('No star history found.')
                .setColor(this.client.color);
            return message.delete(), message.channel.send(embed);
        };
        await message.delete();
        try {
            await this.client.stars.set(member.user.id, []);
        } catch(e) {
            throw new Error(`Database Error: ${e.message}`), this.client.emit('error', e.stack);
        };
        const embed = new RichEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setTitle('Stars Cleared')
            .setColor('BLUE')
            .setDescription(`${message.author.username} cleared all stars for **${member.user.username}**`)
            .addField('Reason', reason)
            .setThumbnail('https://goo.gl/HNsDw1');
        return message.channel.send(member.toString(), embed);
    };
};

module.exports = ClearStars;
