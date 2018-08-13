const Command = require('../base/command.js');
const { RichEmbed } = require('discord.js');
const role = require('../../functions/role.js');
let Kick_DM = require('../../modules/moderation/dm.js');
Kick_DM = Kick_DM.kick;

class Kick extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            category: 'moderation',
            description: 'Kicks a user from the server.',
            usage: '{prefix}kick <@user|user ID> <reason>',
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
        if (!message.guild.me.permissions.has('KICK_MEMBERS')) return this.client.bot_perm(this.client, message, 'KICK_MEMBERS');
        if (!args[0]) return this.client.help(this.client, message, 'kick');
        const member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) return this.client.args(this.client, message, 'USER MENTION OR ID');
        if (role.member(message, member)) return message.delete(), message.channel.send(`${this.client.emotes.x} That user cannot be moderated as they have or equal role to the bot's highest role.`);
        if (member.user.id === message.author.id) return message.delete(), message.channel.send(`${this.client.emotes.x} You cannot kick yourself - selfharm is bad!`);
        const reason = args.slice(1).join(' ');
        if (reason.length < 1) return this.client.args(this.client, message, 'REASON');
        message.delete();
        await Kick_DM(message, member, reason);
        const embed = new RichEmbed()
            .setColor('BLUE')
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setTitle('User Kicked')
            .setDescription(`**${member.user.username}** has been kicked by ${message.author.username}`)
            .addField('Reason', reason)
            .setThumbnail('https://images-ext-1.discordapp.net/external/7dH_uD2RFKRGBUwjrRDQfPQqHErC4FdtuQqEgSWGIKw/https/images-ext-2.discordapp.net/external/YOFq2c4Lm2QwcX9z0AbfW6eYUmb4puIwq7c2GCOI-hg/https/cdn.discordapp.com/emojis/407074394436009984.png');
        await message.channel.send(member.user, embed);
        try {
            await member.kick(`Kicked by ${message.author.tag} | Reason: ${reason}`);
        } catch (e) {
            return message.channel.send(`${this.client.emotes.x} **Error Kicking:** \`${e.message}\``);
        };
        if (!message.guild.settings.logging.modlog.enabled) return;
        let modlog = message.guild.settings.logging.modlog.channel;
        modlog = message.guild.channels.find(c => c.name === modlog) || message.guild.channels.get(modlog);
        if (!modlog) return;
        message.cases.cases++;
        this.client.cases.set(message.guild.id, message.cases);
        const time = this.client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A');
        const log = new RichEmbed()
            .setColor('ORANGE')
            .setAuthor(`${member.user.username} | Kick`, member.user.displayAvatarURL)
            .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was kicked by ${message.author.tag}`)
            .addField('Reason', reason)
            .setFooter(`Case #${message.cases.cases} | ${time}`, message.author.displayAvatarURL);
        return modlog.send(log);
    };
};

module.exports = Kick;