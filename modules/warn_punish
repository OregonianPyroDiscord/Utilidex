const { RichEmbed } = require('discord.js');
const dm = require('./moderation/dm.js');
const ms = require('ms');

module.exports = async (client, message, member) => {
    const filter = client.history.get(member.user.id).filter(element => element.type === 'WARN').length;
    if (filter < 3) return;
    if (filter === 3) {
        //24 hour mute
        // const mute_role = message.guild.roles.find(r => r.name.toLowerCase().includes(message.guild.settings.mute_role)) || message.guild.roles.get(message.guild.settings.mute_role);
        // if (!mute_role) return console.error(`Error: No mute role ('${mute_role}') found in ${message.guild.name}`);
        // if (mute_role.calculatedPosition >= message.guild.me.highestRole.calculatedPosition) {
        //     return console.error(`Error: Mute role is to high to assign (${message.guild.name})`);
        // };
        const mute_role = message.guild.roles.find(r => r.name === 'Muted');
        try {
            await member.addRole(mute_role);
        } catch (e) {
            return console.error(`Error Assigning mute Role in ${message.guild.name}\n${e.stack}`);
        };
        await dm.mute(message, member, '3rd Warning - Automated Mute', '1 day');
        const embed = new RichEmbed()
            .setColor('BLUE')
            .setTitle('User Muted')
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(`**${member.user.username}** has been muted for 1 day by ${client.user.username}`)
            .addField('Reason', '3rd Warning - Automated Mute')
            .setThumbnail('https://goo.gl/HNsDw1')
            .setFooter('Automated Mute for 3 Warnings');
        await message.channel.send(member.toString(), embed);
        try {
            await client.history.get(member.user.id).push({
                type: 'MUTE',
                moderator: client.user.tag,
                reason: '3rd Warning - Automated Mute',
                time: client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A'),
                duration: '1 day'
            });
            await client.history.set(member.user.id, client.history.get(member.user.id));
        } catch (e) {
            console.log(client.chalk.redBright(e.stack));
            message.channel.send(`${client.emotes.x} Error: Database Error: \`${e.message}\``);
        };
        setTimeout(async () => {
            try {
                await member.removeRole(mute_role.id);
            } catch (e) {
                return console.error(`Error Removing Mute Role in ${message.guild.name}\n${e.stack}`);
            };
            await dm.unmute(message, client.user.tag, member, 'Mute Expired');
            try {
                await client.history.get(member.user.id).push({
                    type: 'UNMUTE',
                    moderator: client.user.tag,
                    reason: 'Mute Expired',
                    time: client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')
                });
                await client.history.set(member.user.id, client.history.get(member.user.id));
            } catch (e) {
                console.log(client.chalk.redBright(e.stack));
                message.channel.send(`${client.emotes.x} Error: Database Error: \`${e.message}\``);
            };
        }, ms('1 day'));
        if (!message.guild.settings.logging.modlog.enabled) return;
        const modlog = message.guild.channels.find(c => c.name === message.guild.settings.logging.modlog.channel) || message.guild.channels.get(message.guild.settings.logging.modlog.channel);
        message.cases.cases++;
        client.cases.set(message.guild.id, message.cases);
        const log = new RichEmbed()
            .setColor('BLUE')
            .setAuthor(`${member.user.username} | Mute`, member.user.displayAvatarURL)
            .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was muted for 1 day by ${client.user.tag}`)
            .addField('Reason', '3rd Warning - Automated Mute')
            .setFooter(`Case #${message.cases.cases} | ${client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')}`, message.author.displayAvatarURL);
        modlog.send(log);
        setTimeout(async () => {
            message.cases.cases++;
            client.cases.set(message.guild.id, message.cases);
            const log = new RichEmbed()
                .setColor('BLUE')
                .setAuthor(`${member.user.username} | Unmute`, member.user.displayAvatarURL)
                .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was unmuted by ${client.user.tag}`)
                .addField('Reason', 'Mute Expired')
                .setFooter(`Case #${message.cases.cases} | ${client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')}`, message.author.displayAvatarURL);
            modlog.send(log);
        }, ms('1 day'));
        return null;
    };
    if (filter === 4) {
        //72 hour mute
        // const mute_role = message.guild.roles.find(r => r.name.toLowerCase().includes(message.guild.settings.mute_role)) || message.guild.roles.get(message.guild.settings.mute_role);
        // if (!mute_role) return console.error(`Error: No mute role ('${mute_role}') found in ${message.guild.name}`);
        // if (mute_role.calculatedPosition >= message.guild.me.highestRole.calculatedPosition) {
        //     return console.error(`Error: Mute role is to high to assign (${message.guild.name})`);
        // };
        const mute_role = message.guild.roles.find(r => r.name === 'Muted');
        try {
            await member.addRole(mute_role);
        } catch (e) {
            return console.error(`Error Assigning mute Role in ${message.guild.name}\n${e.stack}`);
        };
        await dm.mute(message, member, '4th Warning - Automated Mute', '3 days');
        const embed = new RichEmbed()
            .setColor('BLUE')
            .setTitle('User Muted')
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(`**${member.user.username}** has been muted for 3 days by ${client.user.username}`)
            .addField('Reason', '4th Warning - Automated Mute')
            .setThumbnail('https://goo.gl/HNsDw1')
            .setFooter('Automated Mute for 4 Warnings');
        await message.channel.send(member.toString(), embed);
        try {
            await client.history.get(member.user.id).push({
                type: 'MUTE',
                moderator: client.user.tag,
                reason: '4th Warning - Automated Mute',
                time: client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A'),
                duration: '3 days'
            });
            await client.history.set(member.user.id, client.history.get(member.user.id));
        } catch (e) {
            console.log(client.chalk.redBright(e.stack));
            message.channel.send(`${client.emotes.x} Error: Database Error: \`${e.message}\``);
        };
        setTimeout(async () => {
            try {
                await member.removeRole(mute_role.id);
            } catch (e) {
                return console.error(`Error Removing Mute Role in ${message.guild.name}\n${e.stack}`);
            };
            await dm.unmute(message, client.user.tag, member, 'Mute Expired');
            try {
                await client.history.get(member.user.id).push({
                    type: 'UNMUTE',
                    moderator: client.user.tag,
                    reason: 'Mute Expired',
                    time: client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')
                });
                await client.history.set(member.user.id, client.history.get(member.user.id));
            } catch (e) {
                console.log(client.chalk.redBright(e.stack));
                message.channel.send(`${client.emotes.x} Error: Database Error: \`${e.message}\``);
            };
        }, ms('3 days'));
        if (!message.guild.settings.logging.modlog.enabled) return;
        const modlog = message.guild.channels.find(c => c.name === message.guild.settings.logging.modlog.channel) || message.guild.channels.get(message.guild.settings.logging.modlog.channel);
        message.cases.cases++;
        client.cases.set(message.guild.id, message.cases);
        const log = new RichEmbed()
            .setColor('BLUE')
            .setAuthor(`${member.user.username} | Mute`, member.user.displayAvatarURL)
            .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was muted for 3 days by ${client.user.tag}`)
            .addField('Reason', '4th Warning - Automated Mute')
            .setFooter(`Case #${message.cases.cases} | ${client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')}`, message.author.displayAvatarURL);
        modlog.send(log);
        setTimeout(async () => {
            message.cases.cases++;
            client.cases.set(message.guild.id, message.cases);
            const log = new RichEmbed()
                .setColor('BLUE')
                .setAuthor(`${member.user.username} | Unmute`, member.user.displayAvatarURL)
                .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was unmuted by ${client.user.tag}`)
                .addField('Reason', 'Mute Expired')
                .setFooter(`Case #${message.cases.cases} | ${client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')}`, message.author.displayAvatarURL);
            modlog.send(log);
        }, ms('3 days'));
        return null;
    };
    if (filter === 5) {
        //kick
        await dm.kick(message, member, '5th Warning - Automated Kick');
        const embed = new RichEmbed()
            .setColor('BLUE')
            .setTitle('User Kicked')
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(`**${member.user.username}** has been kicked by ${client.user.username}`)
            .addField('Reason', '5th Warning - Automated Kick')
            .setThumbnail('https://goo.gl/HNsDw1')
            .setFooter('Automated Kick for 5 Warnings');
        await message.channel.send(member.toString(), embed);
        try {
            await member.kick('5th Warning - Automated Kick');
        } catch (e) {
            console.error(e.stack);
        };
        try {
            await client.history.get(member.user.id).push({
                type: 'KICK',
                moderator: client.user.tag,
                reason: '5th Warning - Automated Kick',
                time: client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')
            });
            await client.history.set(member.user.id, client.history.get(member.user.id));
        } catch (e) {
            console.log(client.chalk.redBright(e.stack));
            message.channel.send(`${client.emotes.x} Error: Database Error: \`${e.message}\``);
        };
        if (!message.guild.settings.logging.modlog.enabled) return;
        const modlog = message.guild.channels.find(c => c.name === message.guild.settings.logging.modlog.channel) || message.guild.channels.get(message.guild.settings.logging.modlog.channel);
        message.cases.cases++;
        client.cases.set(message.guild.id, message.cases);
        const log = new RichEmbed()
            .setColor('ORANGE')
            .setAuthor(`${member.user.username} | Kick`, member.user.displayAvatarURL)
            .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was kicked by ${client.user.tag}`)
            .addField('Reason', '5th Warning - Automated Kick')
            .setFooter(`Case #${message.cases.cases} | ${client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')}`, message.author.displayAvatarURL);
        return modlog.send(log);
    };
    if (filter === 6) {
        //72 hour ban
        //https://goo.gl/35DMwK
        await dm.tempban(message, member, '6th Warning - Automated Temp-Ban', '3 days');
        const embed = new RichEmbed()
            .setColor('RED')
            .setTitle('User Banned')
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(`**${member.user.username}** has been banned for 3 days by ${client.user.username}`)
            .addField('Reason', '6th Warning - Automated Temp-Ban')
            .setThumbnail('https://goo.gl/35DMwK')
            .setFooter('Automated Temp-Ban for 6 Warnings');
        await message.channel.send(member.toString(), embed);
        try {
            await member.ban('6th Warning - Automated Temp-Ban');
        } catch (e) {
            console.error(e.stack);
        };
        try {
            await client.history.get(member.user.id).push({
                type: 'TEMP-BAN',
                moderator: client.user.tag,
                reason: '6th Warning - Automated Temp-Ban',
                time: client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A'),
                duration: '3 days'
            });
            await client.history.set(member.user.id, client.history.get(member.user.id));
        } catch (e) {
            console.log(client.chalk.redBright(e.stack));
            message.channel.send(`${client.emotes.x} Error: Database Error: \`${e.message}\``);
        };
        setTimeout(async () => {
            try {
                await message.guild.unban(member.user.id, 'Ban Expired');
            } catch (e) {
                return console.error(`Error Removing the Ban for ${member.user.tag} in ${message.guild.name}\n${e.stack}`);
            };
            try {
                await client.history.get(member.user.id).push({
                    type: 'UNBAN',
                    moderator: client.user.tag,
                    reason: 'Ban Expired',
                    time: client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')
                });
                await client.history.set(member.user.id, client.history.get(member.user.id));
            } catch (e) {
                console.log(client.chalk.redBright(e.stack));
                message.channel.send(`${client.emotes.x} Error: Database Error: \`${e.message}\``);
            };
        }, ms('3 days'));
        if (!message.guild.settings.logging.modlog.enabled) return;
        const modlog = message.guild.channels.find(c => c.name === message.guild.settings.logging.modlog.channel) || message.guild.channels.get(message.guild.settings.logging.modlog.channel);
        message.cases.cases++;
        client.cases.set(message.guild.id, message.cases);
        const log = new RichEmbed()
            .setColor('RED')
            .setAuthor(`${member.user.username} | Temp-Ban`, member.user.displayAvatarURL)
            .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was banned for 3 days by ${client.user.tag}`)
            .addField('Reason', '6th Warning - Automated Temp-Ban')
            .setFooter(`Case #${message.cases.cases} | ${client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')}`, message.author.displayAvatarURL);
        modlog.send(log);
        setTimeout(async () => {
            message.cases.cases++;
            client.cases.set(message.guild.id, message.cases);
            const log = new RichEmbed()
                .setColor('GREEN')
                .setAuthor(`${member.user.username} | Unban`, member.user.displayAvatarURL)
                .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was unbanned by ${client.user.tag}`)
                .addField('Reason', 'Ban Expired')
                .setFooter(`Case #${message.cases.cases} | ${client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')}`, message.author.displayAvatarURL);
            modlog.send(log);
        }, ms('3 days'));
        return null;
    };
    if (filter === 7) {
        //7 week ban
        //https://goo.gl/35DMwK
        await dm.tempban(message, member, '7th Warning - Automated Temp-Ban', '7 days');
        const embed = new RichEmbed()
            .setColor('RED')
            .setTitle('User Banned')
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(`**${member.user.username}** has been banned for 7 days by ${client.user.username}`)
            .addField('Reason', '7th Warning - Automated Temp-Ban')
            .setThumbnail('https://goo.gl/35DMwK')
            .setFooter('Automated Temp-Ban for 7 Warnings');
        await message.channel.send(member.toString(), embed);
        try {
            await member.ban('7th Warning - Automated Temp-Ban');
        } catch (e) {
            console.error(e.stack);
        };
        try {
            await client.history.get(member.user.id).push({
                type: 'TEMP-BAN',
                moderator: client.user.tag,
                reason: '7th Warning - Automated Temp-Ban',
                time: client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A'),
                duration: '7 days'
            });
            await client.history.set(member.user.id, client.history.get(member.user.id));
        } catch (e) {
            console.log(client.chalk.redBright(e.stack));
            message.channel.send(`${client.emotes.x} Error: Database Error: \`${e.message}\``);
        };
        setTimeout(async () => {
            try {
                await message.guild.unban(member.user.id, 'Ban Expired');
            } catch (e) {
                return console.error(`Error Removing the Ban for ${member.user.tag} in ${message.guild.name}\n${e.stack}`);
            };
            try {
                await client.history.get(member.user.id).push({
                    type: 'UNBAN',
                    moderator: client.user.tag,
                    reason: 'Ban Expired',
                    time: client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')
                });
                await client.history.set(member.user.id, client.history.get(member.user.id));
            } catch (e) {
                console.log(client.chalk.redBright(e.stack));
                message.channel.send(`${client.emotes.x} Error: Database Error: \`${e.message}\``);
            };
        }, ms('7 days'));
        if (!message.guild.settings.logging.modlog.enabled) return;
        const modlog = message.guild.channels.find(c => c.name === message.guild.settings.logging.modlog.channel) || message.guild.channels.get(message.guild.settings.logging.modlog.channel);
        message.cases.cases++;
        client.cases.set(message.guild.id, message.cases);
        const log = new RichEmbed()
            .setColor('RED')
            .setAuthor(`${member.user.username} | Temp-Ban`, member.user.displayAvatarURL)
            .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was banned for 7 days by ${client.user.tag}`)
            .addField('Reason', '7th Warning - Automated Temp-Ban')
            .setFooter(`Case #${message.cases.cases} | ${client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')}`, message.author.displayAvatarURL);
        modlog.send(log);
        setTimeout(async () => {
            message.cases.cases++;
            client.cases.set(message.guild.id, message.cases);
            const log = new RichEmbed()
                .setColor('GREEN')
                .setAuthor(`${member.user.username} | Unban`, member.user.displayAvatarURL)
                .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was unbanned by ${client.user.tag}`)
                .addField('Reason', 'Ban Expired')
                .setFooter(`Case #${message.cases.cases} | ${client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')}`, message.author.displayAvatarURL);
            modlog.send(log);
        }, ms('7 days'));
        return null;
    };
    if (filter === 8) {
        //perm ban
        await dm.ban(message, member, '8th Warning - Automated Ban');
        const embed = new RichEmbed()
            .setColor('RED')
            .setTitle('User Bannd')
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(`**${member.user.username}** has been banned by ${client.user.username}`)
            .addField('Reason', '8th Warning - Automated Ban')
            .setThumbnail('https://goo.gl/35DMwK')
            .setFooter('Automated Ban for 8 Warnings');
        await message.channel.send(member.toString(), embed);
        try {
            await member.ban('8th Warning - Automated Ban');
        } catch (e) {
            console.error(e.stack);
        };
        try {
            await client.history.get(member.user.id).push({
                type: 'BAN',
                moderator: client.user.tag,
                reason: '8th Warning - Automated Ban',
                time: client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')
            });
            await client.history.set(member.user.id, client.history.get(member.user.id));
        } catch (e) {
            console.log(client.chalk.redBright(e.stack));
            message.channel.send(`${client.emotes.x} Error: Database Error: \`${e.message}\``);
        };
        if (!message.guild.settings.logging.modlog.enabled) return;
        const modlog = message.guild.channels.find(c => c.name === message.guild.settings.logging.modlog.channel) || message.guild.channels.get(message.guild.settings.logging.modlog.channel);
        message.cases.cases++;
        client.cases.set(message.guild.id, message.cases);
        const log = new RichEmbed()
            .setColor('RED')
            .setAuthor(`${member.user.username} | Ban`, member.user.displayAvatarURL)
            .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was banned by ${client.user.tag}`)
            .addField('Reason', '8th Warning - Automated Ban')
            .setFooter(`Case #${message.cases.cases} | ${client.moment().format('dddd, MMMM Do, YYYY, hh:mm:ss A')}`, message.author.displayAvatarURL);
        return modlog.send(log);
    };
};  
