const { Client } = require('discord.js');
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const { promisify } = require('util');
const readdir = promisify(require("fs").readdir);
const klaw = require('klaw');
const path = require('path');
require('dotenv').config();

class Utilidex extends Client {
    constructor(options) {
        super(options);
        this.chalk = require('chalk');
        this.moment = require('moment');
        this.emotes = {
            x: '<:utilidexX:455495168334757898>',
            check: '<:utilidexSuccess:455495166183342090>'
        };
        this.default_settings = require('./modules/default_settings.js');
        this.commands = new Enmap();
        this.aliases = new Enmap();
        this.settings = new Enmap({ provider: new EnmapLevel({ name: 'settings'}) });
        this.custom_commands = new Enmap({ provider: new EnmapLevel({ name: 'custom commands'}) });
        this.history = new Enmap({ provider: new EnmapLevel({ name: 'history'}) });
        this.stars = new Enmap({ provider: new EnmapLevel({ name: 'stars'}) });
        this.cases = new Enmap({ provider: new EnmapLevel({ name: 'cases' }) });
        this.spam = new Enmap({ provider: new EnmapLevel({ name: 'spam'}) });
        this.color = '36393E';
        this.mod_only = require('./functions/perms/mod_only.js');
        this.admin_only = require('./functions/perms/admin_only.js');
        this.misc = require('./functions/perms/misc.js');
        this.bot_perm = require('./functions/perms/bot_perm.js');
        this.help = require('./functions/help.js');
        this.args = require('./functions/errors/args_error.js');
    };
    loadCommand(commandPath, commandName) {
        try {
            if (commandName === 'command.js') return;
            const props = new (require(`${commandPath}${path.sep}${commandName}`))(this);
            console.log(this.chalk.bgBlack.green(`Loaded Command: ${props.help.name} | Aliases: [${props.conf.aliases.join(', ')}]`));
            props.conf.location = commandPath;
            if (props.init) {
                props.init(this);
            }
            this.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                this.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (e) {
            if (commandName === 'command.js') return;
            return this.chalk.bgBlack.redBright(`Unable to load command ${commandName}: ${e.message}`);
        };
    };
    async unloadCommand(commandPath, commandName) {
        let command;
        if (this.cmds.has(commandName)) {
            command = this.cmds.get(commandName);
        } else if (this.aliases.has(commandName)) {
            command = this.cmds.get(this.aliases.get(commandName));
        }
        if (!command) return `The command \`${commandName}\` is not recognized by the bot.`;

        if (command.shutdown) {
            await command.shutdown(this);
        }
        delete require.cache[require.resolve(`${commandPath}${path.sep}${commandName}.js`)];
        return false;
    };
};

const client = new Utilidex();
const init = async () => {
    klaw("./commands").on("data", (item) => {
        const cmdFile = path.parse(item.path);
        if (!cmdFile.ext || cmdFile.ext !== ".js") return;
        const response = client.loadCommand(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`);
        if (response) console.error(response);
    });
    const evtFiles = await readdir("./events/");
    console.log(`Loading a total of ${evtFiles.length} events`);
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        console.log(client.chalk.bgBlack.green(`Loaded the event ${eventName}`));
        const event = new (require(`./events/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
};

init();

client.login(process.env.TOKEN);
process.on('unhandledRejection', error => {
    console.error(`Uncaught Promise Error: \n${error.stack}`);
});