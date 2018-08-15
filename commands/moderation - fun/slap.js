const Command = require('../base/command.js');

class Slap extends Command {
    constructor(client) {
        super(client, {
            name: 'slap',
            category: 'moderation-fun',
            description: 'Slaps a user.',
            usage: '{prefix}slap <@user|user ID> [object]',
            parameters: 'snowflakeGuildMember, stringObject',
            extended: false,
            enabled: true,
            reason: null,
            permission: 'KICK_MEMBERS',
            aliases: []
        });
    };

    async run(message, args) {
        if (!args[0]) return this.client.help(this.client, message, 'slap');
        const member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) return this.client.args(this.client, message, 'USER MENTION OR ID')
        if (member.user.id === message.author.id) {
            return message.delete(), message.channel.send('You can\'t slap yourself, that would hurt!');
        };
        let object = [
            'dead fish',
            'cactus',
            'sledgehammer',
            'pineapple',
            'penguin'
        ];
        if (args.slice(1).join(' ').length > 1) {
            object = args.slice(1).join(' ');
        } else {
            object = object[Math.floor(Math.random() * object.length)];
        };
        return message.delete(), message.channel.send(`**${message.author.username}** slaps ${member.toString()} with a ${object}`);
    };
};

module.exports = Slap;