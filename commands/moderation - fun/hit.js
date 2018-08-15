const Command = require('../base/command.js');

class Hit extends Command {
    constructor(client) {
        super(client, {
            name: 'hit',
            category: 'moderation-fun',
            description: 'Hits a user, if slapping them isn\'t your thing.',
            usage: '{prefix}hit <@user|user ID> [object]',
            parameters: 'snowflakeGuildMember, stringObject',
            extended: false,
            enabled: true,
            reason: null,
            permission: 'KICK_MEMBERS',
            aliases: []
        });
    };

    async run(message, args) {
        if (!args[0]) return this.client.help(this.client, message, 'hit');
        const member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) return this.client.args(this.client, message, 'USER MENTION OR ID')
        if (member.user.id === message.author.id) {
            return message.delete(), message.channel.send('You can\'t hit yourself, that would hurt!');
        };
        let object = [
            'house',
            'train',
            'book',
            'prosthetic leg',
            'flag pole'
        ];
        if (args.slice(1).join(' ').length > 1) {
            object = args.slice(1).join(' ');
        } else {
            object = object[Math.floor(Math.random() * object.length)];
        };
        return message.delete(), message.channel.send(`${member.toString()} has been hit with a ${object} by **${message.author.username}**`);
    };
};

module.exports = Hit;