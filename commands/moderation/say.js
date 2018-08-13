const Command = require('../base/command.js');

class Say extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            category: 'moderation',
            description: 'Make the bot repeat something you say, either in a specific channel or the current channel.',
            usage: '{prefix}say <#channel|no channel> <message>',
            parameters: 'snowflakeGuildChannel, stringMessage',
            extended: true,
            extended_help: 'If no channel is mentioned or if the channel is invalid, the bot will send the message to the current channel.',
            enabled: true,
            reason: null,
            permission: 'MANAGE_MESSAGES',
            aliases: ['repeat', 'echo']
        });
    };

    async run(message, args) {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return this.client.mod_only(this.client, message);
        if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) return this.client.bot_perm(this.client, message, 'MANAGE_MESSAGES');
        if (!args[0]) return this.client.help(this.client, message, 'say');
        let channel = message.mentions.channels.first() || message.channel;
        let msg = message.mentions.channels ? args.join(' ') : args.slice(1).join(' ');
        if (msg.length < 1) return this.client.args(this.client, message, 'MESSAGE');
        message.delete();
        return message.guild.channels.get(channel.id).send(msg);
    };
};

module.exports = Say;