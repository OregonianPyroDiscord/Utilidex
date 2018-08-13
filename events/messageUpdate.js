const { RichEmbed } = require('discord.js');
const ms = require('ms');
const guild_disabled = require('../functions/errors/cmd_guild.js');
const global_disabled = require('../functions/errors/cmd_global.js');
const dev_only = require('../functions/errors/dev_only.js');
const cmd_error = require('../functions/errors/cmd_error.js');

class New_Message {
    constructor(client) {
        this.client = client;
    };

    async run(oldMessage, newMessage) {
        // newMessage.guild.settings = this.client.settings.get(newMessage.guild.id);
        // const { prefix, disabled_commands, ignored, automod } = this.client.settings.get(newMessage.guild.id);
        // if (newMessage.author.bot) return;
        // if (newMessage.channel.type !== 'text') return;
        // //automod
        // if (newMessage.content.indexOf(prefix) !== 0) return;
        // const args = newMessage.content.split(' ').slice(1);
        // let command = newMessage.content.split(' ')[0];
        // command = command.slice(prefix.length).toLowerCase();
        // const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
        // if (!cmd) return;
        // if (ignored.users.includes(newMessage.author.id) || ignored.channels.includes(newMessage.channel.id) || newMessage.member.roles.some(r => ignored.roles.includes(r.id))) return;
        // if (disabled_commands.includes(cmd.help.name.toLowerCase())) return guild_disabled(this.client, newMessage);
        // if (!cmd.conf.enabled) return global_disabled(this.client, newMessage, cmd.conf.reason);
        // try {
        //     await cmd.run(newMessage, args);
        // } catch (e) {
        //     return cmd_error(this.client, newMessage, e.message);
        // };
    };
};

module.exports = New_Message;