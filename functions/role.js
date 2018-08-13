/**
 * 
 * @param {object} message - The message object
 * @param {object} role - The role object
 * @returns boolean
 */
module.exports.main = (message, role) => {
    const this_role = message.guild.roles.find(r => r.name.toLowerCase() === role) || message.guild.roles.find(r => r.name.toLowerCase().includes(r.toLowerCase())) || message.guild.roles.get(role);
    return message.guild.me.highestRole.calculatedPosition >= this_role.calculatedPosition;
};

/**
 * 
 * @param {object} message The message object
 * @param {object} member The member object
 * @returns boolean
 */
module.exports.member = (message, member) => {
    return member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition;
};
