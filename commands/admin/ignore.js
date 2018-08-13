const Command = require('../base/command.js');
const { RichEmbed } = require('discord.js');

class Ignore extends Command {
    constructor(client) {
        super(client, {
            name: 'ignore',
            category: 'admin',
            description: 'Add users, roles, or channels for the bot to ignore commands from, or remove a previusly blacklisted user, role, or channel.',
            usage: '{prefix}ignore <view|add|remove> <user|role|channel> <@user|@role|#channel>*',
            parameters: 'stringFlag, stringAction, string/snowflakeGuildMember/Role/Channel',
            extended: true,
            extended_help: '* You can provide either a user mention, role mention, channel mention, or a valid role/channel name or ID, or a valid user ID.',
            enabled: true,
            reason: null,
            permission: 'ADMINISTRATOR',
            aliases: ['blacklist', 'bl']
        });
    };

    async run(message, args) {
        const settings = message.guild.settings;
        if (!message.member.permissions.has('ADMINISTRATOR')) return this.client.admin_only(this.client, message);
        if (!args[0]) return this.client.help(this.client, message, 'ignore');
        const action = args[0].toLowerCase();
        if (action === 'add') {
            if (!args[1]) return this.client.help(this.client, message, 'ignore');
            const type = args[1].toLowerCase();
            if (!args[2]) return this.client.args(this.client, message, 'VALID USER, ROLE, OR CHANNEL MENTION, NAME, OR ID');
            if (type === 'user') {
                 const member = message.mentions.members.first() || message.guild.members.get(args[2]);
                 if (!member) return this.client.args(this.client, message, 'VALID USER MENTION OR ID');
                 if (message.guild.settings.ignored.users.includes(member.user.id)) {
                    return message.delete(), message.channel.send(`${this.client.emotes.x} That user is already being ignored.`);
                 };
                 settings.ignored.users.push(member.user.id);
                 this.client.settings.set(message.guild.id, settings);
                 return message.channel.send(`${this.client.emotes.check} The bot will now ignore commands ran by \`${member.user.tag}\``);
            } else if (type === 'role') {
                const role = message.mentions.roles.first() 
                    || message.guild.roles.find(r => r.name.toLowerCase() === args.slice(2).join(' ').toLowerCase())
                    || message.guild.roles.find(r => r.name.toLowerCase().includes(args.slice(2).join(' ').toLowerCase())) 
                    || message.guild.roles.get(args[2]);
                if (!role) return this.client.args(this.client, message, 'VALID ROLE MENTION, NAME,  OR ID');
                if (message.guild.settings.ignored.roles.includes(role.id)) {
                    return message.delete(), message.channel.send(`${this.client.emotes.x} That role is already being ignored.`);
                };
                settings.ignored.roles.push(role.id);
                this.client.settings.set(message.guild.id, settings);
                return message.channel.send(`${this.client.emotes.check} The bot will now ignore commands ran by users with the role \`${role.name}\``);
            } else if (type === 'channel') {
                const channel = message.mentions.channels.first()
                    || message.guild.channels.find(c => c.name.toLowerCase() === args.slice(2).join(' ').toLowerCase())
                    || message.guild.channels.find(c => c.name.toLowerCase().includes(args.slice(2).join(' ').toLowerCase()))
                    || message.guild.channels.get(args[2]);
                if (!channel) return this.client.args(this.client, message, 'VALID CHANNEL MENTION, NAME,  OR ID');
                if (message.guild.settings.ignored.channels.includes(channel.id)) {
                    return message.delete(), message.channel.send(`${this.client.emotes.x} That channel is already being ignored.`);
                };
                settings.ignored.channels.push(channel.id);
                this.client.settings.set(message.guild.id, settings);
                return message.channel.send(`${this.client.emotes.check} The bot will now ignore commands ran in ${channel}`);
            } else {
                return message.channel.send(`${this.client.emotes.x} Invalid Key. Applicable keys: \`user\`, \`role\`, \`channel\``);
            };
        } else if (action === 'remove') {
            if (!args[1]) return this.client.help(this.client, message, 'ignore');
            const type = args[1].toLowerCase();
            if (!args[2]) return this.client.args(this.client, message, 'VALID USER, ROLE, OR CHANNEL MENTION, NAME, OR ID');
            if (type === 'user') {
                const member = message.mentions.members.first() || message.guild.members.get(args[2]);
                if (!member) return this.client.args(this.client, message, 'VALID USER MENTION OR ID');
                if (!message.guild.settings.ignored.users.includes(member.user.id)) {
                    return message.delete(), message.channel.send(`${this.client.emotes.x} That user is not currently being ignored.`);
                };
                settings.ignored.users.splice(settings.ignored.users.indexOf(member.user.id), 1);
                this.client.settings.set(message.guild.id, settings);
                return message.channel.send(`${this.client.emotes.check} The bot will now execute commands ran by \`${member.user.tag}\``);
            } else if (type === 'role') {
                const role = message.mentions.roles.first()
                    || message.guild.roles.find(r => r.name.toLowerCase() === args.slice(2).join(' ').toLowerCase())
                    || message.guild.roles.find(r => r.name.toLowerCase().includes(args.slice(2).join(' ').toLowerCase()))
                    || message.guild.roles.get(args[2]);
                if (!role) return this.client.args(this.client, message, 'VALID ROLE MENTION, NAME,  OR ID');
                if (!message.guild.settings.ignored.roles.includes(role.id)) {
                    return message.delete(), message.channel.send(`${this.client.emotes.x} That role is not currently being ignored.`);
                };
                settings.ignored.roles.splice(settings.ignored.roles.indexOf(role.id), 1);
                this.client.settings.set(message.guild.id, settings);
                return message.channel.send(`${this.client.emotes.check} The bot will now execute  commands ran by users with the role \`${role.name}\``);
            } else if (type === 'channel') {
                const channel = message.mentions.channels.first()
                    || message.guild.channels.find(c => c.name.toLowerCase() === args.slice(2).join(' ').toLowerCase())
                    || message.guild.channels.find(c => c.name.toLowerCase().includes(args.slice(2).join(' ').toLowerCase()))
                    || message.guild.channels.get(args[2]);
                if (!channel) return this.client.args(this.client, message, 'VALID CHANNEL MENTION, NAME,  OR ID');
                if (!message.guild.settings.ignored.channels.includes(channel.id)) {
                    return message.delete(), message.channel.send(`${this.client.emotes.x} That channel is not currently being ignored.`);
                };
                settings.ignored.channels.splice(settings.ignored.channels.indexOf(channel.id), 1);
                this.client.settings.set(message.guild.id, settings);
                return message.channel.send(`${this.client.emotes.check} The bot will now execute commands ran in ${channel}`);
            } else {
                return message.channel.send(`${this.client.emotes.x} Invalid Key. Applicable keys: \`user\`, \`role\`, \`channel\``);
            };
        } else if (action === 'view') {
            return message.channel.send(`\`\`\`Ignored Users: [${settings.ignored.users.join(', ')}]\nIgnored Roles: [${settings.ignored.roles.join(', ')}]\nIgnored Channels: [${settings.ignored.channels.join(', ')}]\`\`\``);
        } else {
            return message.channel.send(`${this.client.emotes.x} Invalid Action. Applicable actions: \`add\`, \`remove\`, \`view\``);
       };
    };
};

module.exports = Ignore;