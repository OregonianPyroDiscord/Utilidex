class Ready {
    constructor(client) {
        this.client = client;
    };

    async run() {
        this.client.guilds.forEach(g => {
            console.log(this.client.chalk.bgBlack.greenBright(`Loaded data for ${g.name} (${g.id})`));
        });
        this.client.user.setActivity('myself being rewritten..finally', { type: 'WATCHING' });
        console.log(this.client.chalk.greenBright(`${this.client.user.tag} connected successfully.`));
    };
};

module.exports = Ready;