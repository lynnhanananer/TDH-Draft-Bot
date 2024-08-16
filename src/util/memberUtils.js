const { constants } = require('./constants');

const getMemberRoles = (member) => member.roles.cache
const getMemberRoleNames = (member) =>
    getMemberRoles(member).map((role) => role.name)
const getMemberDivision = (member) =>
    getMemberRoleNames(member).find((roleName) => roleName.includes('division'))
const isMatchmaker = (member) => getMemberRoleNames(member).find((roleName) => constants.matchmakerRoles.includes(roleName))

module.exports = { getMemberDivision, getMemberRoleNames, getMemberRoleNames, isMatchmaker }
