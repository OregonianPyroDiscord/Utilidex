const Command = require('../base/command.js');

class Dehoist extends Command {
    constructor(client) {
        super(client, {
            name: 'dehoist',
            category: 'moderation',
            description: 'Changes the nickname of users who have characters in their name to hoist.',
            usage: '{prefix}dehoist',
            parameters: 'None',
            extended: false,
            enabled: true,
            reason: null,
            permission: 'MANAGE_NICKNAMES',
            aliases: []
        });
    };

    async run(message, args) {
        if (!message.member.permissions.has('MANAGE_NICKNAMES')) return this.client.mod_only(this.client, message);
        if (!message.guild.me.permissions.has('MANAGE_NICKNAMES')) return this.client.bot_perm(this.client, message, 'MANAGE_NICKNAMES');
        const members = message.guild.members.filter(m => m.displayName.startsWith('!')
            || m.displayName.startsWith('?') 
            || m.displayName.startsWith('@')
            || m.displayName.startsWith('#')
            || m.displayName.startsWith('$')
            || m.displayName.startsWith('%')
            || m.displayName.startsWith('^')
            || m.displayName.startsWith('&')
            || m.displayName.startsWith('*'))
        const sandbox = [];
        if (members.size < 1) return message.channel.send(`${this.client.emotes.x} No user appears to be hoisting in this server.`);
        const msg = await message.channel.send(`Attempting to dehoist \`${members.size}\` members.`);
        const dehoisting = await members.forEach(async mem => {
            if (mem.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition) return sandbox.push(mem.user.id);
            await mem.setNickname('No Hoisting');
        });
        return msg.edit(`${this.client.emotes.check} Successfully dehoisted \`${members.size - sandbox.length}\` members. (Failed to dehoist \`${sandbox.length}\` members)`);
    };
};

module.exports = Dehoist;