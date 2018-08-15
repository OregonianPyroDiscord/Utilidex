const Command = require('../base/command.js');
const { RichEmbed } = require('discord.js');
const url = 'https://cdn.shopify.com/s/files/1/1061/1924/products/Poop_Emoji_2_large.png';
class BrownStar extends Command {
    constructor(client) {
        super(client, {
            name: 'brownstar',
            category: 'moderation-fun',
            description: 'Awards a brown star to a user.',
            usage: '{prefix}brownstar <@user|user ID> <reason>',
            parameters: 'snowflakeGuildMember, stringReason',
            extended: false,
            enabled: true,
            reason: null,
            permission: 'KICK_MEMBERS',
            aliases: ['bstar']
        });
    };

    async run(message, args) {
        if (!args[0]) return this.client.help(this.client, message, 'brownstar');
        const member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) return this.client.args(this.client, message, 'USER MENTION OR ID');
        const reason = args.slice(1).join(' ');
        if (reason.length < 1) return this.client.args(this.client, message, 'REASON');
        await message.delete();
        this.client.stars.get(member.user.id).push({
            type: 'BROWN',
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
            .setColor('DARK_ORANGE')
            .setThumbnail(url)
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setTitle('Brown Star!')
            .setDescription(`**${member.user.username}** has been awarded a star by ${message.author.username}...but it ain't gold! :poop:`)
            .addField('Reason', reason)
        return message.channel.send(member.toString(), embed);
    };
};

module.exports = BrownStar;