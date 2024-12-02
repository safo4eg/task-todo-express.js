import Role from '../../app/models/Role.js'
class RoleSeeder {
    async handle() {
        const rolesCount = await Role.countDocuments();
        if(rolesCount === 0) {
            const roles = [
                {title: "Admin"},
                {title: "User"}
            ];

            await Role.insertMany(roles);
        } else {
            console.log('Роли уже посеяны.')
        }
    }
}

export default new RoleSeeder();