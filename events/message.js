const { RichEmbed } = require('discord.js');
const ms = require('ms');
const guild_disabled = require('../functions/errors/cmd_guild.js');
const global_disabled = require('../functions/errors/cmd_global.js');
const dev_only = require('../functions/errors/dev_only.js');
const cmd_error = require('../functions/errors/cmd_error.js');
const automod = require('../automod/automod.js');
const spam = automod.spam;
class Message {
    constructor(client) {
        this.client = client;
    };

    async run(message) {
        if (message.author.bot) return;
        if (message.channel.type !== 'text') return;
        message.guild.settings = this.client.settings.get(message.guild.id);
        message.cases = this.client.cases.get(message.guild.id);
        const { prefix, disabled_commands, ignored, automod } = this.client.settings.get(message.guild.id);
        //automod
        await spam(this.client, message);
        // await automod.bad_words(this.client, message);
        // await automod.invite_links(this.client, message);
        if (message.content.indexOf(prefix) !== 0) return;
        const args = message.content.split(' ').slice(1);
        let command = message.content.split(' ')[0];
        command = command.slice(prefix.length).toLowerCase();
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
        if (!cmd) return;
        if (ignored.users.includes(message.author.id) || ignored.channels.includes(message.channel.id) || message.member.roles.some(r => ignored.roles.includes(r.id))) return;
        if (disabled_commands.includes(cmd.help.name.toLowerCase())) return guild_disabled(this.client, message);
        if (!cmd.conf.enabled) return global_disabled(this.client, message, cmd.conf.reason);
        try {
            await cmd.run(message, args);
        } catch (e) {
            await console.log(e.stack);
            return cmd_error(this.client, message, e.message);
        };
    };
};

module.exports = Message;
