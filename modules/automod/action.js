const { RichEmbed } = require('discord.js');
const ms = require('ms');
const dm = require('../moderation/dm.js');
const warn_punish = require('../warn_punish.js');

module.exports.spam = async (client, message) => {
    const embed = new RichEmbed()
        .setColor('BLUE')
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setTitle('Warning Issued')
        .setDescription(`**${message.author.username}** has been warned by ${client.user.username}\n\nPlease familiarize yourself with the server rules and warning thresholds!`)
        .addField('Reason', 'Spamming')
        .setThumbnail('https://goo.gl/HNsDw1');
    const time = client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A');
    try {
        await client.history.get(message.author.id).push({
            type: 'WARN',
            moderator: client.user.tag,
            reason: 'Spamming',
            time: time
        });
        await client.history.set(message.author.id, client.history.get(message.author.id));
    } catch (e) {
        console.log(client.chalk.redBright(e.stack));
        message.channel.send(`${client.emotes.x} Error: Database Error: \`${e.message}\``);
    };
    await message.channel.send(message.member.toString(), embed);
    await warn_punish(client, message, message.member);
    //mute
    const mute_role = message.guild.roles.find(r => r.name === 'Muted');
    try {
        await message.member.addRole(mute_role);
    } catch (e) {
        return console.error(`Error Assigning mute Role in ${message.guild.name}\n${e.stack}`);
    };
    await dm.mute(message, message.member, 'Spamming', '5 minutes');
    const embed_mute = new RichEmbed()
        .setColor('BLUE')
        .setTitle('User Muted')
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription(`**${message.member.user.username}** has been muted for 5 minutes by ${client.user.username}`)
        .addField('Reason', 'Spamming')
        .setThumbnail('https://goo.gl/HNsDw1')
        .setFooter('Automated Mute for Spamming');
    await message.channel.send(message.member.toString(), embed_mute);
    await message.channel.send(`<@&362824779570479104> Please check recent messages by ${message.member} - user appears to be spamming!`);
    try {
        await client.history.get(message.member.user.id).push({
            type: 'MUTE',
            moderator: client.user.tag,
            reason: 'Spamming - Automated Mute',
            time: client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A'),
            duration: '5 minutes'
        });
        await client.history.set(message.member.user.id, client.history.get(message.member.user.id));
    } catch (e) {
        console.log(client.chalk.redBright(e.stack));
        message.channel.send(`${client.emotes.x} Error: Database Error: \`${e.message}\``);
    };
    setTimeout(async () => {
        try {
            await message.member.removeRole(mute_role.id);
        } catch (e) {
            return console.error(`Error Removing Mute Role in ${message.guild.name}\n${e.stack}`);
        };
        await dm.unmute(message, client.user.tag, message.member, 'Mute Expired');
        try {
            await client.history.get(message.member.user.id).push({
                type: 'UNMUTE',
                moderator: client.user.tag,
                reason: 'Mute Expired',
                time: client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')
            });
            await client.history.set(message,member.user.id, client.history.get(message.member.user.id));
        } catch (e) {
            console.log(client.chalk.redBright(e.stack));
            message.channel.send(`${client.emotes.x} Error: Database Error: \`${e.message}\``);
        };
    }, ms('5 minutes'));
    if (!message.guild.settings.logging.modlog.enabled) return;
    const modlog = message.guild.channels.find(c => c.name === message.guild.settings.logging.modlog.channel) || message.guild.channels.get(message.guild.settings.logging.modlog.channel);
    message.cases.cases++;
    client.cases.set(message.guild.id, message.cases);
    const log = new RichEmbed()
        .setColor('BLUE')
        .setAuthor(`${message.member.user.username} | Mute`, message.member.user.displayAvatarURL)
        .setDescription(`**${message.member.user.tag}** (\`${message.member.user.id}\`) was muted for 5 minutes by ${client.user.tag}`)
        .addField('Reason', 'Spamming - Automated')
        .setFooter(`Case #${message.cases.cases} | ${client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')}`, message.author.displayAvatarURL);
    modlog.send(log);
    setTimeout(async () => {
        message.cases.cases++;
        client.cases.set(message.guild.id, message.cases);
        const log = new RichEmbed()
            .setColor('BLUE')
            .setAuthor(`${message.member.user.username} | Unmute`, message. member.user.displayAvatarURL)
            .setDescription(`**${message.member.user.tag}** (\`${message.member.user.id}\`) was unmuted by ${client.user.tag}`)
            .addField('Reason', 'Mute Expired')
            .setFooter(`Case #${message.cases.cases} | ${client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')}`, message.author.displayAvatarURL);
        modlog.send(log);
    }, ms('5 minutes'));
    message.cases.cases++;
    client.cases.set(message.guild.id, message.cases);
    const warn_log = new RichEmbed()
        .setColor('GOLD')
        .setAuthor(`${message.member.user.username} | Warn`, message.member.user.displayAvatarURL)
        .setDescription(`**${message.member.user.tag}** (\`${message.member.user.id}\`) was warned by ${client.user.tag}`)
        .addField('Reason', 'Spamming - Automated Warn')
        .setFooter(`Case #${message.cases.cases} | ${time}`, message.author.displayAvatarURL);
    return modlog.send(log);
};