const Command = require('../base/command.js');
const { RichEmbed } = require('discord.js');
const url = 'http://www.emoji.co.uk/files/google-emojis/animals-nature-android/7516-glowing-star.png';

class GoldStar extends Command {
    constructor(client) {
        super(client, {
            name: 'goldstar',
            category: 'moderation-fun',
            description: 'Awards a gold star to a user.',
            usage: '{prefix}goldstar <@user|user ID> <reason>',
            parameters: 'snowflakeGuildMember, stringReason',
            extended: false,
            enabled: true,
            reason: null,
            permission: 'KICK_MEMBERS',
            aliases: ['gstar']
        });
    };

    async run(message, args) {
        if (!args[0]) return this.client.help(this.client, message, 'goldstar');
        const member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) return this.client.args(this.client, message, 'USER MENTION OR ID');
        const reason = args.slice(1).join(' ');
        if (reason.length < 1) return this.client.args(this.client, message, 'REASON');
        await message.delete();
        this.client.stars.get(member.user.id).push({
            type: 'GOLD',
            moderator: message.author.tag,
            reason: reason,
            time: this.client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')
        });
        try {
            await this.client.stars.set(member.user.id, this.client.stars.get(member.user.id));
        } catch (e) {
            throw new Error(`Database Error: ${e.message}`);
        };
        const embed = new RichEmbed()
            .setColor('GOLD')
            .setThumbnail(url)
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setTitle('Gold Star!')
            .setDescription(`**${member.user.username}** has been awarded a gold star by ${message.author.username}, awesome!`)
            .addField('Reason', reason)
        return message.channel.send(member.toString(), embed);
    };
};

module.exports = GoldStar;