const Command = require('../base/command.js');
const { RichEmbed } = require('discord.js');

class Help extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            category: 'bot',
            description: 'View all of the bot\'s commands, or get help on a specific command.',
            usage: '{prefix}help [command]',
            parameters: 'stringCommand',
            extended: false,
            enabled: true,
            reason: null,
            permission: 'SEND_MESSAGES',
            aliases: []
        });
    };

    async run(message, args) {
        let array = [];
        this.client.commands.forEach( i => {
            if (i.help.name === 'eval') return;
            array.push(`\`${i.help.name}\` - **${i.help.description}**`);
        });
        if (!args[0]) {
            const embed = new RichEmbed()
                .setColor(this.client.color)
                .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
                .setTitle(`${this.client.user.username} Help Menu`)
                .setDescription(array.join('\n'))
                .setFooter(`To get help on a specific command, run: ${message.guild.settings.prefix}help <command>`);
            return message.channel.send(embed);
        };
       let cmd = args[0].toLowerCase();
        cmd = this.client.commands.get(cmd) || this.client.commands.get(this.client.aliases.get(cmd));
        if (!cmd) return;
        const name = cmd.help.name.split('')[0].toUpperCase() + cmd.help.name.split('').slice(1).join('');
        const embed = new RichEmbed()
            .setColor(this.client.color)
            .setAuthor(`${this.client.user.username} | Command: ${name}`, this.client.user.displayAvatarURL)
            .setDescription('`< >` denotes a __required__ parameter.\n`[ ]` denotes an optional parameter.')
            .addField('Description', cmd.help.description.replace('{prefix}', message.guild.settings.prefix))
            .addField('Usage', cmd.help.usage.replace('{prefix}', message.guild.settings.prefix))
            .addField('Parameters', `\`\`\`${cmd.help.parameters}\`\`\``)
            .addField('Aliases', cmd.conf.aliases.length > 0 ? `\`[${cmd.conf.aliases.join(', ')}]\`` : 'No Aliases');
        if (!cmd.help.extended) return message.channel.send(embed);
        embed.addField('Extended Help', cmd.help.extended_help.replace('{prefix}', message.guild.settings.prefix));
        return message.channel.send(embed);
    };
};

module.exports = Help;