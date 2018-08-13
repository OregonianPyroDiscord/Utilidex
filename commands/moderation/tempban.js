const Command = require('../base/command.js');
const { RichEmbed } = require('discord.js');
const role = require('../../functions/role.js');
let Temp_Ban = require('../../modules/moderation/dm.js');
Temp_Ban = Temp_Ban.tempban;
const ms = require('ms')
class TempBan extends Command {
    constructor(client) {
        super(client, {
            name: 'tempban',
            category: 'moderation',
            description: 'Temporarily Bans a user from the server.',
            usage: '{prefix}tempban <@user|user ID> <time> <reason>',
            parameters: 'snowflakeGuildMember, integerTime, stringReason',
            extended: false,
            enabled: true,
            reason: null,
            permission: 'BAN_MEMBERS',
            aliases: ['tban']
        });
    };

    async run(message, args) {
        if (!message.member.permissions.has('BAN_MEMBERS')) return this.client.mod_only(this.client, message);
        if (!message.guild.me.permissions.has('BAN_MEMBERS')) return this.client.bot_perm(this.client, message, 'BAN_MEMBERS');
        if (!args[0]) return this.client.help(this.client, message, 'ban');
        const member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) return this.client.args(this.client, message, 'USER MENTION OR ID');
        if (role.member(message, member)) return message.delete(), message.channel.send(`${this.client.emotes.x} That user cannot be moderated as they have or equal role to the bot's highest role.`);
        if (member.user.id === message.author.id) return message.delete(), message.channel.send(`${this.client.emotes.x} You cannot ban yourself - selfharm is bad!`);
        const ban_time = args[1];
        if (!ban_time || isNaN(parseInt(ms(ban_time)))) return this.client.args(this.client, message, 'VALID TIME');
        const reason = args.slice(2).join(' ');
        if (reason.length < 1) return this.client.args(this.client, message, 'REASON');
        message.delete();
        await Temp_Ban(message, reason, ms(ms(ban_time), { long: true }));
        const embed = new RichEmbed()
            .setColor('RED')
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setTitle('User Banned')
            .setDescription(`**${member.user.username}** has been for ms(ms(ban_time), { long: true }) banned by ${message.author.username}`)
            .addField('Reason', reason)
            .setThumbnail('https://vignette.wikia.nocookie.net/pufflescp/images/6/68/Red_Warning_Triangle.png/revision/latest?cb=20160718024653');
        await message.channel.send(member.user, embed);
        try {
            await member.ban(`Banned by ${message.author.tag} | Reason: ${reason}`);
        } catch (e) {
            return message.channel.send(`${this.client.emotes.x} **Error Banning:** \`${e.message}\``);
        };
        this.client.history.get(member.user.id).push({
            type: 'TEMP BAN',
            user: member.user.tag,
            moderator: message.author.tag,
            reason: reason,
            time: this.client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A'),
            duration: ms(ms(ban_time), { long: true })
        });
        this.client.history.set(member.user.id, this.client.history.get(member.user.id));
        if (!message.guild.settings.logging.modlog.enabled) return;
        let modlog = message.guild.settings.logging.modlog.channel;
        modlog = message.guild.channels.find(c => c.name === modlog) || message.guild.channels.get(modlog);
        if (!modlog) return;
        message.cases.cases++;
        this.client.cases.set(message.guild.id, message.cases);
        const time = this.client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A');
        const log = new RichEmbed()
            .setColor('RED')
            .setAuthor(`${member.user.username} | Temp-Ban`, member.user.displayAvatarURL)
            .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was banned for ${ms(ms(ban_time), { long: true })} by ${message.author.tag}`)
            .addField('Reason', reason)
            .setFooter(`Case #${message.cases.cases} | ${time}`, message.author.displayAvatarURL);
        return modlog.send(log);
    };
};

module.exports = TempBan;