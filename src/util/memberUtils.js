const getMemberRoles = (member) => member.roles.cache
const getMemberRoleNames = (member) =>
    getMemberRoles(member).map((role) => role.name)
const getMemberDivision = (member) =>
    getMemberRoleNames(member).find((roleName) => roleName.includes('division'))

module.exports = { getMemberDivision, getMemberRoleNames, getMemberRoleNames }
