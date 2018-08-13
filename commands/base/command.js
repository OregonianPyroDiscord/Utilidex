class Command {
    constructor(client, {
        name = null,
        category = null,
        description = null,
        usage = null,
        parameters = null,
        extended = false,
        extended_help = null,
        enabled = true,
        reason = null,
        permission = 'SEND_MESSAGES',
        aliases = []
    }) {
        this.client = client;
        this.help = { name, category, description, usage, parameters, extended, extended_help };
        this.conf = { enabled, reason, permission, aliases };
    };
};

module.exports = Command;