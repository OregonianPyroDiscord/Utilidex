const Command = require('../base/command.js');
const warn_punish = require('../../modules/warn_punish.js');
const { RichEmbed } = require('discord.js');

class Warn extends Command {
    constructor(client) {
        super(client, {
            name: 'warn',
            category: 'moderation',
            description: 'Issues a warning to a user.',
            usage: '{prefix}warn <@user|user ID> <reason>',
            parameters: 'snowflakeGuildMember, stringReason',
            extended: false,
            enabled: true,
            reason: null,
            permission: 'KICK_MEMBERS',
            aliases: []
        });
    };

    async run(message, args) {
        if (!message.member.permissions.has('KICK_MEMBERS')) return this.client.mod_only(this.client, message);
        if (!args[0]) return this.client.help(this.client, message, 'warn');
        const member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) return this.client.args(this.client, message, 'USER MENTION OR ID');
        if (member.user.id === message.author.id) return message.channel.send(`${this.client.emotes.x} You are one pathetic excuse of a moderator if you have to warn yourself.`);
        const reason = args.slice(1).join(' ');
        if (reason.length < 1) return this.client.args(this.client, message, 'REASON');
        message.delete();
        const embed = new RichEmbed()
            .setColor('BLUE')
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setTitle('Warning Issued')
            .setDescription(`**${member.user.username}** has been warned by ${message.author.username}\n\nPlease familiarize yourself with the server rules and warning thresholds!`)
            .addField('Reason', reason)
            .setThumbnail('https://goo.gl/HNsDw1');
        const time = this.client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A');
        try {
            await this.client.history.get(member.user.id).push({
                type: 'WARN',
                moderator: message.author.tag,
                reason: reason,
                time: time
            });
            await this.client.history.set(member.user.id, this.client.history.get(member.user.id));
        } catch (e) {
            console.log(this.client.chalk.redBright(e.stack));
            message.channel.send(`${this.client.emotes.x} Error: Database Error: \`${e.message}\``);
        };
        await message.channel.send(member.toString(), embed);
        await warn_punish(this.client, message, member);
        if (!message.guild.settings.logging.modlog.enabled) return;
        const modlog = message.guild.channels.find(c => c.name === message.guild.settings.logging.modlog.channel) || message.guild.channels.get(message.guild.settings.logging.modlog.channel);
        if (!modlog) return;
        message.cases.cases++;
        this.client.cases.set(message.guild.id, message.cases);
        const log = new RichEmbed()
            .setColor('GOLD')
            .setAuthor(`${member.user.username} | Warn`, member.user.displayAvatarURL)
            .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was warned by ${message.author.tag}`)
            .addField('Reason', reason)
            .setFooter(`Case #${message.cases.cases} | ${time}`, message.author.displayAvatarURL);
        return modlog.send(log);
    };
};

module.exports = Warn;
