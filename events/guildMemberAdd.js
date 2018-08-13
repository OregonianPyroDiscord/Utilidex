const { RichEmbed } = require('discord.js');
const ms = require('ms');

class GuildMemberAdd {
    constructor(client) {
        this.client = client;
    };

    async run(member) {
        const { welcome_config, autorole } = this.client.settings.get(member.guild.id);
        let msg = welcome_config.message;
        msg = msg.replace('{user}', member.user.username);
        msg = msg.replace('{tag}', member.user.tag);
        msg = msg.replace('{mention}', member.toString());
        msg = msg.replace('{age}', this.client.moment(member.user.createdAt).fromNow());
        msg = msg.replace('{created}', this.client.moment(member.user.createdAt).format('dddd, MMMM Do, YYYY, hh:mm:ss A'));
        msg = msg.replace('{guild}', member.guild.name);
        msg = msg.replace('{size}', member.guild.members.size);
        //both disabled
        if (!welcome_config.enabled) return;
        const channel = member.guild.channels.get(welcome_config.channel);
        if (!channel) return;
        if (welcome_config.type === 'text') {
            return channel.send(msg);
        } else {
            const embed = new RichEmbed()
                .setAuthor(member.user.username, member.user.displayAvatarURL)
                .setThumbnail(member.user.displayAvatarURL)
                .setDescription(msg)
                .setColor(welcome_config.color !== null ? this.client.color : welcome_config.color)
                .setFooter(!welcome_config.footer ? '' : (welcome_config.footer.includes('{size}') ? welcome_config.footer.replace('{size}', member.guild.members.size) : welcome_config.footer));
            return channel.send(member.toString(), embed);
        };
    };
};

module.exports = GuildMemberAdd;