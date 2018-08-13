const Command = require('../base/command.js');
const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/ig;
const { RichEmbed } = require('discord.js');

class InviteCheck extends Command {
    constructor(client) {
        super(client, {
            name: 'invitecheck',
            category: 'moderation',
            description: 'Checks for users that have a Discord link in their name or playing status.',
            usage: '{prefix}invitecheck',
            parameters: 'None',
            extended: false,
            enabled: true,
            reason: null,
            permission: 'KICK_MEMBERS',
            aliases: ['check', 'ic']
        });
    };

    async run(message, args) {
        if (!message.member.permissions.has('KICK_MEMBERS')) return this.client.mod_only(this.client, message);
        const members = message.guild.members.filter(m => regex.test(m.displayName));
        const sandbox = [];
        await message.guild.members.forEach(m => {
            if (!m.user.presence.game) return;
            if (!regex.test(m.user.presence.game.name)) return;
            sandbox.push(m.user.tag);
        });
        const embed = new RichEmbed()
            .setColor(this.client.color)
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setDescription(`Found \`${members.size}\` members with an invite link in their name.\nFound \`${sandbox.length}\` members with an invite link in their playing status.`)
            .addField('Nicknames', members.size > 0 ? `\`\`\`${members.map(m => m.user.tag).join('\n')}\`\`\`` : 'No Members to Show')
            .addField('Playing Status', sandbox.length > 0 ? `\`\`\`${sandbox.join('\n')}\`\`\`` : 'No Members to Show');
        return message.channel.send(embed);
    };
};

module.exports = InviteCheck;