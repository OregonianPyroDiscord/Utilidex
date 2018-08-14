const { RichEmbed } = require('discord.js');
const ms = require('ms');
const automod = require('../modules/automod/action.js');

module.exports.spam = async (client, message) => {
    if (!message.guild.settings.automod.spamming.enabled) return;
    let spam = client.spam.get(message.author.id);
    spam++;
    client.spam.set(message.author.id, spam);
    if (client.spam.get(message.author.id) === message.guild.settings.automod.spamming.msg_threshold) {
        if (message.guild.settings.automod.spamming.ignored.users.includes(message.author.id)) return;
        if (message.guild.settings.automod.spamming.ignored.channels.includes(message.channel.id)) return;
        if (message.member.roles.some(r => message.guild.settings.automod.spamming.ignored.roles.includes(r.id))) return;
        await automod.spam(client, message);
    };
    setTimeout(() => {
        client.spam.set(message.author.id, 0);
    }, (message.guild.settings.automod.spamming.sec_threshold * 1000));
};

module.exports.bad_words = (client, message) => {
    if (!message.guild.settings.automod.bad_words.enabled) return;
    if (message.content.toLowerCase().split(' ').some(i => message.guild.settings.automod.bad_words.words.includes(i))) {
        if (message.guild.settings.automod.bad_words.ignored.users.includes(message.author.id)) return;
        if (message.guild.settings.automod.bad_words.ignored.channels.includes(message.channel.id)) return;
        if (message.member.roles.some(r => message.guild.settings.automod.bad_words.ignored.roles.includes(r.id))) return;
        return automod.bad_words(client, message);
    };
};

module.exports.invite_links = (client, message) => {
    const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/ig;
    if (!message.guild.settings.automod.invite_links.enabled) return;
    if (regex.test(message.content)) {
        if (message.guild.settings.automod.invite_links.ignored.users.includes(message.author.id)) return;
        if (message.guild.settings.automod.invite_links.ignored.channels.includes(message.channel.id)) return;
        if (message.member.roles.some(r => message.guild.settings.automod.invite_links.ignored.roles.includes(r.id))) return;
        return automod.invite_links(client, message);
    };
};