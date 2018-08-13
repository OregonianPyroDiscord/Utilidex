const Command = require('../base/command.js');
const { RichEmbed } = require('discord.js');

class Settings extends Command {
    constructor(client) {
        super(client, {
            name: 'settings',
            category: 'admin',
            description: 'View, edit, or reset the bot\'s settings.',
            usage: '{prefix}settings <view|edit|reset> <key> <value>',
            parameters: 'stringFlag, stringKey, *value',
            extended: true,
            extended_help: 'Valid Keys:\n`prefix, modlog, msglog, nicklog, serverlog, muterole, welcome, leave, automod`\nIf you want to edit the welcome / leave config, use this template:\n`{prefix}settings edit <welcome/leave> <channel|enabled|type|color|message|footer> <value>`',
            enabled: true,
            reason: null,
            permission: 'ADMINISTRATOR',
            aliases: ['conf', 'set']
        });
    };

    async run(message, args) {
        const settings = this.client.settings.get(message.guild.id);
        /**
         * 
         * @param {string} key The key that was edited. 
         * @param {string} val The new value of said key. 
         */
        const success = (key, val) => {
            const embed = new RichEmbed()
                .setColor('GREEN')
                .setDescription(`${this.client.emotes.check} Successfully set your \`${key}\` to \`${val}\``);
            message.channel.send(embed);
        };
        /**
         * 
         * @param {string} err The error that occurred. 
         */
        const reject = (err) => {
            const embed = new RichEmbed()
                .setColor('RED')
                .setDescription(`${this.client.emotes.x} Error: \`${err}\``);
            message.channel.send(embed);
        };
        if (!message.member.permissions.has('ADMINISTRATOR')) return this.client.admin_only(this.client, message);
        if (!args[0] || !args[1] || !args[2]) return this.client.help(this.client, message, 'settings');
        let flag = args[0].toLowerCase();
        let key = args[1].toLowerCase();
        let val = args.slice(2).join(' ');
        switch (flag) {
            case 'reset': {

            };
            break;
            case 'edit': {
                switch (key) {
                    case 'prefix': {
                        let prefix = args.slice(2).join(' ');
                        if (prefix.length >= 10) return reject('Prefix is too long.');
                        settings.prefix = prefix;
                        this.client.settings.set(message.guild.id, settings);
                        return success('prefix', prefix);
                    };
                    break;
                    case 'modlog': {
                        let modlog = message.mentions.channels.first()
                            || message.guild.channels.find(c => c.name.toLowerCase() === val) 
                            || message.guild.channels.find(c => c.name.toLowerCase().includes(val))
                            || message.guild.channels.get(val);
                        if (!modlog) return reject('Invalid channel provided.');
                        settings.logging.modlog.enabled = true;
                        settings.logging.modlog.channel = modlog.id;
                        this.client.settings.set(message.guild.id, settings);
                        return success('modlog channel', `#${modlog.name}`);
                    };
                    break;
                    case 'msglog': {
                        let msglog = message.mentions.channels.first()
                            || message.guild.channels.find(c => c.name.toLowerCase() === val)
                            || message.guild.channels.find(c => c.name.toLowerCase().includes(val))
                            || message.guild.channels.get(val);
                        if (!msglog) return reject('Invalid channel provided.');
                        settings.logging.msglog.enabled = true;
                        settings.logging.msglog.channel = msglog.id;
                        this.client.settings.set(message.guild.id, settings);
                        return success('message log channel', `#${msglog.name}`);
                    };
                    break;
                    case 'nicklog': {
                        let nicklog = message.mentions.channels.first()
                            || message.guild.channels.find(c => c.name.toLowerCase() === val)
                            || message.guild.channels.find(c => c.name.toLowerCase().includes(val))
                            || message.guild.channels.get(val);
                        if (!nicklog) return reject('Invalid channel provided.');
                        settings.logging.nicklog.enabled = true;
                        settings.logging.nicklog.channel = nicklog.id;
                        this.client.settings.set(message.guild.id, settings);
                        return success('nickname log channel', `#${nicklog.name}`);
                    };
                    break;
                    case 'serverlog': {
                        let serverlog = message.mentions.channels.first()
                            || message.guild.channels.find(c => c.name.toLowerCase() === val)
                            || message.guild.channels.find(c => c.name.toLowerCase().includes(val))
                            || message.guild.channels.get(val);
                        if (!serverlog) return reject('Invalid channel provided.');
                        settings.logging.serverlog.enabled = true;
                        settings.logging.serverlog.channel = serverlog.id;
                        this.client.settings.set(message.guild.id, settings);
                        return success('server log channel', `#${serverlog.name}`);
                    };
                    break;
                    case 'muterole': {
                        let role = message.mentions.roles.first()
                            || message.guild.roles.find(c => c.name.toLowerCase() === val)
                            || message.guild.roles.find(c => c.name.toLowerCase().includes(val))
                            || message.guild.roles.get(val);
                        if (!role) return reject('Invalid role provided.');
                        settings.muterole = role.id;
                        this.client.settings.set(message.guild.id, settings);
                        return success('muted role', role.name);
                    };
                    break;
                    case 'welcome':
                    case 'join': {

                        if (!args[3]) return this.client.help(this.client, message, 'settings');
                        switch (args[2].toLowerCase()) {
                            case 'enabled': {
                                if (args[3].toLowerCase() !== 'true' && args[3].toLowerCase() !== 'false') return reject('\'enabled\' settings can only be \'true\' or \'false\'');
                                let status;
                                if (args[3].toLowerCase() === 'true') status = true;
                                if (args[3].toLowerCase() === 'false') status = false;
                                settings.welcome_config.enabled = status;
                                this.client.settings.set(message.guild.id, settings);
                                return success('welcome config', status);
                            };
                            break;
                            case 'channel': {
                                let channel = message.mentions.channels.first()
                                    || message.guild.channels.find(c => c.name.toLowerCase() === args.slice(3).join(' '))
                                    || message.guild.channels.find(c => c.name.toLowerCase().includes(args.slice(3).join(' ')))
                                    || message.guild.channels.get(args[3]);
                                if (!channel) return reject('Invalid channel provided.');
                                settings.welcome_config.channel = channel.id;
                                this.client.settings.set(message.guild.id, settings);
                                return success('welcome channel', `#${channel.name}`);
                            };
                            break;
                            case 'type': {
                                let type = args[3].toLowerCase();
                                if (type !== 'text' && type !== 'embed') return reject('Invalid type provided. Types should either be \'text\' or \'embed\'');
                                settings.welcome_config.type = type;
                                this.client.settings.set(message.guild.id, settings);
                                return success('welcome type', type);
                            };
                            break;
                            case 'message': {
                                let msg = args.slice(3).join(' ');
                                if (msg.length < 1) return reject('Welcome message appears to be missing.');
                                settings.welcome_config.message = msg;
                                this.client.settings.set(message.guild.id, settings);
                                return success('welcome message', msg);
                            };
                            break;
                            case 'footer': {
                                let msg = args.slice(3).join(' ');
                                if (msg.length < 1) return reject('Footer message appears to be missing.');
                                settings.welcome_config.footer = msg;
                                this.client.settings.set(message.guild.id, settings);
                                return success('welcome footer message', msg);
                            };
                            break;
                            case 'color': {
                                let color = args[3];
                                if (color.length < 1) return reject('Embed color appears to be missing.');
                                settings.welcome_config.color = color;
                                this.client.settings.set(message.guild.id, settings);
                                return success('welcome message embed color', color);
                            };
                            break;
                            default: {
                                return reject('Invalid key.');
                            };
                        };
                    };
                    break;
                    case 'leave': {
                        //leave config
                        if (!args[3]) return this.client.help(this.client, message, 'settings');
                        switch (args[2].toLowerCase()) {
                            case 'enabled': {
                                if (args[3].toLowerCase() !== 'true' && args[3].toLowerCase() !== 'false') return reject('\'enabled\' settings can only be \'true\' or \'false\'');
                                let status;
                                if (args[3].toLowerCase() === 'true') status = true;
                                if (args[3].toLowerCase() === 'false') status = false;
                                settings.leave_config.enabled = status;
                                this.client.settings.set(message.guild.id, settings);
                                return success('leave config', status);
                            };
                                break;
                            case 'channel': {
                                let channel = message.mentions.channels.first()
                                    || message.guild.channels.find(c => c.name.toLowerCase() === args.slice(3).join(' '))
                                    || message.guild.channels.find(c => c.name.toLowerCase().includes(args.slice(3).join(' ')))
                                    || message.guild.channels.get(args[3]);
                                if (!channel) return reject('Invalid channel provided.');
                                settings.leave_config.channel = channel.id;
                                this.client.settings.set(message.guild.id, settings);
                                return success('leave channel', `#${channel.name}`);
                            };
                                break;
                            case 'type': {
                                let type = args[3].toLowerCase();
                                if (type !== 'text' && type !== 'embed') return reject('Invalid type provided. Types should either be \'text\' or \'embed\'');
                                settings.leave_config.type = type;
                                this.client.settings.set(message.guild.id, settings);
                                return success('leave type', type);
                            };
                                break;
                            case 'message': {
                                let msg = args.slice(3).join(' ');
                                if (msg.length < 1) return reject('Leave message appears to be missing.');
                                settings.leave_config.message = msg;
                                this.client.settings.set(message.guild.id, settings);
                                return success('leave message', msg);
                            };
                                break;
                            case 'footer': {
                                let msg = args.slice(3).join(' ');
                                if (msg.length < 1) return reject('Footer message appears to be missing.');
                                settings.leave_config.footer = msg;
                                this.client.settings.set(message.guild.id, settings);
                                return success('leave footer message', msg);
                            };
                                break;
                            case 'color': {
                                let color = args[3];
                                if (color.length < 1) return reject('Embed color appears to be missing.');
                                settings.leave_config.color = color;
                                this.client.settings.set(message.guild.id, settings);
                                return success('leave message embed color', color);
                            };
                                break;
                            default: {
                                return reject('Invalid key.');
                            };
                        };
                    };
                    break;
                    default: {
                      return reject('Invalid key.');
                  }; 
                };
            };
            break;
            case 'view': {

            };
            break;
            default: {
                return reject('Invalid flag.');
            };
        };
    };
};

module.exports = Settings;