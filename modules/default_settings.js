module.exports = {
    prefix: '$',
    logging: {
        modlog: {
            channel: null,
            enabled: false
        },
        msglog: {
            channel: null,
            enabled: false
        },
        nicklog: {
            channel: null,
            enabled: false
        },
        serverlog: {
            channel: null,
            enabled: false
        } 
    },
    mute_role: null,
    welcome_config: {
        channel: null,
        enabled: false,
        type: 'text',
        color: null,
        message: null,
        footer: null
    },
    leave_config: {
        channel: null,
        enabled: false,
        type: 'text',
        color: null,
        message: null,
        footer: null
    },
    disabled_commands: [],
    ignored: {
        users: [],
        channels: [],
        roles:[]
    },
    automod: {
        bad_words: {
            enabled: false,
            words: [],
            ignored: {
                users: [],
                channels: [],
                roles: []
            }
        },
        invite_links: {
            enabled: false,
            ignored: {
                users: [],
                channels: [],
                roles: []
            }
        },
        nicknames: {
            characters: false,
            words: {
                words: [],
                enabled: false
            }
        },
        spamming: {
            enabled: false,
            msg_threshold: 5,
            sec_threshold: 8,
            ignored: {
                users: [],
                channels: [],
                roles: []
            }
        }
    }
};